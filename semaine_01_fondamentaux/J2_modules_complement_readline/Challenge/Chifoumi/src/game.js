export class Game {
  constructor({ sheet, rock, chisel }) {
    this.sheet = sheet;
    this.rock = rock;
    this.chisel = chisel;
    this.count = 0;
    this.choices = [this.sheet, this.rock, this.chisel];

    this.status = false;
    this.choiceUser = null;

    this.players = { computer: 0, user: 0, winner: null };

    this.message =`\nPour lancer le jeu tapez start, \pour stopper la partie stop,.\nVous devez choisir parmi les choix suivants : ${this.choices.join(' ')}`
  }

  choice() {
    const i = Math.floor(Math.random() * 3);

    return this.choices[i];
  }

  // Logic game
  run(choiceUser) {
    this.players.winner = "computer";
    choiceUser = choiceUser.toLowerCase();
    this.choiceUser = choiceUser;
    const choiceComputer = this.choice();

    if (choiceUser === choiceComputer) {
      this.players.winner = null;
    } else {
      if (choiceUser === this.rock) {
        if (choiceComputer === this.chisel) {
          this.players.user++;
          this.players.winner = "user";
        } else {
          this.players.computer++;
        }
      }

      if (choiceUser === this.sheet) {
        if (choiceComputer === this.rock) {
          this.players.user++;
          this.players.winner = "user";
        } else {
          this.players.computer++;
        }
      }

      if (choiceUser === this.chisel) {
        if (choiceComputer === this.sheet) {
          this.players.user++;
          this.players.winner = "user";
        } else {
          this.players.computer++;
        }
      }
    }

    return this.players;
  }

  check(choice) {
    choice = choice.toLowerCase();
    this.choiceUser = choice;

    return this.choices.find((c) => c === choice) === choice;
  }

  bilan() {
    const { computer, user } = this.players;

    if (computer > user) {
      return `Dommage c'est le computer qui gagne avec ${computer} contre ${user}`;
    } else if (computer < user) {
      return `Bravo vous gagnez ${user} contre ${computer}`;
    } else {
      return `égalité !!!!`;
    }
  }

  reset(){
    this.players = {  computer: 0, user: 0, winner: null };
  }

  getMessageBilan(players){
    const { computer, user, winner } = players;

    if(winner === null) 
      return `Match null on recommence`;

    return `Resultat de ce tour computer : ${computer} user : ${user} winner is : ${winner}`
  }

  error(){

    return `Votre choix ${this.choiceUser} n'est pas acceptable dans le jeu recommencez `
  }
}
