#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { spawn } = require("child_process");

const root = path.resolve(__dirname, "..");
const context = { window: {} };
vm.createContext(context);
for (const file of ["word-recognition-data.js", "word-recognition-extra-data.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
}

const jobs = [];
for (const category of context.window.WORD_LIBRARY.categories) {
  for (const item of context.window.WORD_LIBRARY.items[category.id]) {
    jobs.push({ language: "en", voice: "Daniel", text: item.en, stem: `${category.id}-${item.id}` });
    jobs.push({ language: "zh", voice: "Sinji", text: item.zh, stem: `${category.id}-${item.id}` });
  }
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "ignore" });
    child.once("error", reject);
    child.once("exit", (code) => code === 0 ? resolve() : reject(new Error(`${command} exited with ${code}`)));
  });
}

let created = 0;
let nextIndex = 0;

async function worker() {
  while (nextIndex < jobs.length) {
    const job = jobs[nextIndex++];
    const directory = path.join(root, "assets", "word-audio", job.language);
    const output = path.join(directory, `${job.stem}.m4a`);
    if (fs.existsSync(output) && fs.statSync(output).size > 1000) continue;
    fs.mkdirSync(directory, { recursive: true });
    const temporary = path.join(directory, `${job.stem}.caf`);
    await run("/usr/bin/say", ["-v", job.voice, "-r", job.language === "en" ? "150" : "145", "-o", temporary, job.text]);
    await run("/usr/bin/afconvert", [temporary, output, "-f", "m4af", "-d", "aac", "-b", "64000", "-q", "127"]);
    fs.unlinkSync(temporary);
    created += 1;
    if (created % 50 === 0) process.stdout.write(`Created ${created} recordings\n`);
  }
}

Promise.all(Array.from({ length: 4 }, worker))
  .then(() => process.stdout.write(`Finished: ${created} new recordings; ${jobs.length} total entries checked.\n`))
  .catch((error) => {
    process.stderr.write(`${error.stack || error}\n`);
    process.exitCode = 1;
  });
