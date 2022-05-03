import { readFileSync } from "fs";
// variable d'environnement
import "dotenv/config";
const { URL_DATA } = process.env;

import { createInterface } from "readline";
import { avg, findStudent } from "./utils.js";

const students = JSON.parse( readFileSync(URL_DATA, "utf-8") ).students;

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("STUDENT> ");
rl.prompt();

rl.on("line", (line) => {
  line = line.trim();

  if(line === 'quit' || line === 'q') {
      rl.close();

      return;
  }

  const student = findStudent({ students, name: line });

  if (student != false)
    console.log(`La moyenne de ${line} est ${avg(student.notes)}`);
  else console.log(`Cet(te) étudiant(e) ${line} est inconu(e) !`);

  rl.prompt();

}).on("close", () => {
  console.log("Have a great day!");
  process.exit(0);
});
