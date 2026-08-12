#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { execFile } = require("child_process");

const root = path.resolve(__dirname, "..");
const page = fs.readFileSync(path.join(root, "phonics-learning.html"), "utf8");
const errors = [];

function literalBetween(start, end) {
  const value = page.match(new RegExp(`${start} = ([\\s\\S]*?)\\n    ${end}`));
  if (!value) throw new Error(`Could not read ${start}`);
  return vm.runInNewContext(`(${value[1].replace(/;\s*$/, "")})`);
}

const sounds = literalBetween("const sounds", "const levelNotes");
const blendLevels = literalBetween("const blendLevels", "const segmentLevels");
const segmentLevels = literalBetween("const segmentLevels", "const trickyWords");
const trickyWords = literalBetween("const trickyWords", "const phonemeAudioFiles");
const phonemeAudioFiles = literalBetween("const phonemeAudioFiles", "const graphemeIpa");
const graphemeIpa = literalBetween("const graphemeIpa", "const state");

const libraryContext = { window: {} };
vm.createContext(libraryContext);
for (const file of ["word-recognition-data.js", "word-recognition-extra-data.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), libraryContext, { filename: file });
}
const library = libraryContext.window.WORD_LIBRARY;

function addFile(file, minimumDuration, label) {
  if (!fs.existsSync(file)) {
    errors.push(`Missing ${label}: ${path.relative(root, file)}`);
    return null;
  }
  if (fs.statSync(file).size < 1000) {
    errors.push(`Empty or tiny ${label}: ${path.relative(root, file)}`);
    return null;
  }
  return { file, minimumDuration, label };
}

const filesToInspect = [];
const soundIpas = new Set(sounds.map((sound) => sound.ipa));
if (soundIpas.size !== Object.keys(phonemeAudioFiles).length) {
  errors.push(`Expected all ${Object.keys(phonemeAudioFiles).length} phonemes on cards; found ${soundIpas.size}.`);
}

for (const sound of sounds) {
  const mapped = phonemeAudioFiles[sound.ipa];
  if (!mapped) {
    errors.push(`No phoneme mapping for ${sound.g} ${sound.ipa}.`);
    continue;
  }
  const file = path.resolve(root, "assets", "phonemes", `${mapped}.m4a`);
  const result = addFile(file, 0.1, `phoneme ${sound.ipa}`);
  if (result) filesToInspect.push(result);
}

function ipaForPart(part, word) {
  if (part === "th") return word === "this" ? "/ð/" : "/θ/";
  if (part === "oo") return ["moon", "spoon"].includes(word) ? "/uː/" : "/ʊ/";
  return graphemeIpa[part];
}

const teachingItems = [...blendLevels.flat(), ...segmentLevels.flat()];
for (const item of teachingItems) {
  for (const part of item.parts) {
    const ipa = ipaForPart(part, item.word);
    if (!ipa) errors.push(`No IPA mapping for ${item.word}: ${part}.`);
    else if (!soundIpas.has(ipa)) errors.push(`No playable sound card for ${item.word}: ${part} ${ipa}.`);
  }
}

const exampleWords = new Set([
  ...sounds.map((sound) => sound.word),
  ...teachingItems.map((item) => item.word),
  ...Object.values(trickyWords).flat()
]);
for (const word of exampleWords) {
  const result = addFile(path.join(root, "assets", "phonics-examples", `${word}.m4a`), 0.15, `example ${word}`);
  if (result) filesToInspect.push(result);
}

let vocabularyTotal = 0;
for (const category of library.categories) {
  const items = library.items[category.id];
  vocabularyTotal += items.length;
  const minimum = category.id === "feelings" ? 35 : category.id === "festivals" ? 15 : 25;
  if (items.length < minimum) errors.push(`${category.id} has ${items.length} words; needs at least ${minimum}.`);
  const ids = new Set();
  for (const item of items) {
    if (ids.has(item.id)) errors.push(`Duplicate vocabulary id: ${category.id}-${item.id}.`);
    ids.add(item.id);
    if (item.chunks.length !== item.phonemes.length) errors.push(`Chunk mismatch: ${category.id}-${item.id}.`);
    for (const language of ["en", "zh"]) {
      const result = addFile(path.join(root, "assets", "word-audio", language, `${category.id}-${item.id}.m4a`), 0.15, `${language} word ${category.id}-${item.id}`);
      if (result) filesToInspect.push(result);
    }
  }
}

function duration(file) {
  return new Promise((resolve) => {
    execFile("/usr/bin/afinfo", [file], (error, stdout) => {
      if (error) return resolve(null);
      const match = stdout.match(/estimated duration:\s*([\d.]+) sec/);
      resolve(match ? Number(match[1]) : null);
    });
  });
}

let next = 0;
async function inspectWorker() {
  while (next < filesToInspect.length) {
    const item = filesToInspect[next++];
    const seconds = await duration(item.file);
    if (seconds === null) errors.push(`Unreadable audio: ${path.relative(root, item.file)}.`);
    else if (seconds < item.minimumDuration) errors.push(`${item.label} is only ${seconds.toFixed(3)} seconds.`);
  }
}

Promise.all(Array.from({ length: 12 }, inspectWorker)).then(() => {
  if (errors.length) {
    process.stderr.write(`${errors.join("\n")}\n`);
    process.exitCode = 1;
    return;
  }
  process.stdout.write([
    `Vocabulary: ${vocabularyTotal} bilingual concepts across ${library.categories.length} categories.`,
    `Word recordings: ${vocabularyTotal * 2} valid fixed recordings.`,
    `Phonics: ${sounds.length} sounds, ${exampleWords.size} teaching words, ${teachingItems.length} blend/segment activities.`,
    `Audio inspected: ${filesToInspect.length} referenced files; no missing, unreadable, tiny or inaudibly short files.`
  ].join("\n") + "\n");
});
