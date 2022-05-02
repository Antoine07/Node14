let count = 1;
const searchNumber = 19;

console.log(
  "Vous devez commencer le jeu, choisissez un nombre compris entre 1 à 100"
);

process.stdin.on("data", (chunk) => {
  const number = parseFloat(chunk);

  if (isNaN(number) === true) {
    console.log("ce n'est pas un nombre");
  }

  if (count > 5) {
    console.log(`Vous avez dépasser les ${5} tentatives`);
    process.exit(0);
  }

  if (number > searchNumber) {
    console.log(`Le nombre est plus petit que ${number}`);
    count++;
  } else if (number < searchNumber) {
    console.log(`Le nombre est plus grand que ${number}`);
    count++;
  } else {
    console.log(
      `Vous avez gagnez en ${count}, c'était bien le nombre ${searchNumber}`
    );
    process.exit(0);
  }
});
