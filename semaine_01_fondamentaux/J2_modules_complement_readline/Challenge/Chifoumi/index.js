import "dotenv/config";
import { createInterface } from "readline";
import { Game } from "./src/game.js";

const { SHEET, ROCK, CHISEL, START, STOP, QUIT, RESPONSE_NO, RESPONSE_YES } = process.env;

const game = new Game({
  sheet: SHEET,
  rock: ROCK,
  chisel: CHISEL
});

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("CHIFOUMI> ");
rl.prompt();
console.log(game.message);

rl.on("line", (line) => {
  line = line.toLocaleLowerCase().trim();

  switch (line) {
    case STOP:
      game.status = false;
      console.log(`Voici votre bilan pour le jeu : ... ${game.bilan()}`);
      game.reset();
      console.log(`On rejoue ? \n répondez oui ou non ?`);
      break;

    case RESPONSE_NO:
      game.status = false;
      rl.close();

      return;

    case RESPONSE_YES:
    case START:
      game.status = true;
      console.log(`Choisissez un élément ?`);

      break;

    case QUIT:
      game.status = false;
      game.reset();
      rl.close();

      return;

    default:
      if (game.check(line) === false) console.log(game.error());
      else {
        const players = game.run(line);
        // console.log(players);
        console.log(game.getMessageBilan(players));
      }
  }

  rl.prompt();
}).on("close", () => {
  console.log(`Bilan du jeu : ... ${game.bilan()}`);
  process.exit(0);
});
