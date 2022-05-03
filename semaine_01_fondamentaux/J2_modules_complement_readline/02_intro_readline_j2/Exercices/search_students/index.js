import { students } from "./students.js";
import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("OHAI> ");
rl.prompt();

rl.on("line", (line) => {
  line = line.toLocaleLowerCase().trim();

  const search = students
    .map((student) => student.toLocaleLowerCase())
    .find((student) => student === line);

  if (search) {
    console.log(`Bravo vous avez trouvez ${line}`);
    rl.close();
  } else {
    console.log(`Perdu cet étudiant : ${line} n'existe pas`);
    rl.prompt();
  }
}).on("close", () => {
  console.log("Salut !");
  process.exit(0);
});
