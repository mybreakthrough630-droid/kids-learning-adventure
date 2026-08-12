#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const root = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(root, "phonics-learning.html"), "utf8");
const words = new Set([...source.matchAll(/\bword:\s*"([^"]+)"/g)].map((match) => match[1]));
const trickyBlock = source.match(/const trickyWords = \{([\s\S]*?)\n    \};/);
if (trickyBlock) {
  for (const match of trickyBlock[1].matchAll(/"([^"]+)"/g)) {
    if (!match[1].startsWith("Phase ")) words.add(match[1]);
  }
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "ignore" });
    child.once("error", reject);
    child.once("exit", (code) => code === 0 ? resolve() : reject(new Error(`${command} exited with ${code}`)));
  });
}

const directory = path.join(root, "assets", "phonics-examples");
const force = process.argv.includes("--force");
const pending = [...words].filter((word) => {
  const file = path.join(directory, `${word}.m4a`);
  return force || !fs.existsSync(file) || fs.statSync(file).size < 1000;
});
let index = 0;

async function worker() {
  while (index < pending.length) {
    const word = pending[index++];
    const temporary = path.join(directory, `${word}.caf`);
    const output = path.join(directory, `${word}.m4a`);
    await run("/usr/bin/say", ["-v", "Daniel", "-r", "125", "-o", temporary, word]);
    await run("/usr/bin/afconvert", [temporary, output, "-f", "m4af", "-d", "aac", "-b", "64000", "-q", "127"]);
    fs.unlinkSync(temporary);
    process.stdout.write(`Created ${word}.m4a\n`);
  }
}

Promise.all(Array.from({ length: 4 }, worker))
  .then(() => process.stdout.write(`Finished: ${pending.length} new recordings; ${words.size} teaching words checked.\n`))
  .catch((error) => {
    process.stderr.write(`${error.stack || error}\n`);
    process.exitCode = 1;
  });
