const boardFactory = require("./boardFactory");
const game = require("./game");
const DOM = require("./DOM");

const player = (turn, name = "default") => {
  let plays = [];
  return {
    name: name,
    board: boardFactory(),
    turn: turn,
    plays: plays,
    makeMove(coordinates, opponent) {
      //refuses to make a move if it's not the player's turn
      if (legalPlay(coordinates, this.turn, opponent.board.state, plays)) {
        //passes turn
        this.turn = false;
        opponent.turn = true;
        this.plays.push(coordinates);
        opponent.board.receiveAttack(coordinates);
        DOM.modifyCell(opponent, coordinates);
        if (game.gameOver(this, opponent) != false){
          this.turn = false;
          opponent.turn = false;
        }        return true;
      } else {
        return false;
      }

    },
    aiPlay(opponent) {
      //if the previous move hit a ship
      if (findFirstShip(this.plays, opponent.board.state) === false) {
        // chooses random number between 0 and 99 that it hasn't already chosen
        let choice = Math.floor(Math.random() * 100);
        while (this.plays.includes(choice)) {
          choice = Math.floor(Math.random() * 100);
        }
        this.makeMove(choice, opponent);
        return choice;
      } else {
        let choice = findAHit(
          findFirstShip(this.plays, opponent.board.state),
          opponent.board.state,
          this.plays
        );
        this.makeMove(choice, opponent);
        return choice;
      }
    },
  };
};

//verifies if a move is legal
legalPlay = (position, turn, state, plays) => {
  if (
    position < 0 ||
    position > 99 ||
    turn === false ||
    state[position] === undefined ||
    state[position].shot === true ||
    plays.includes(position)
  ) {
    return false;
  } else {
    return true;
  }
};

//searches for the last ship it hit that didn't sink
//returns false if it doesn't find one or it's the first play
//returns the position of the last successful hit and unsunk ship otherwise
findFirstShip = (plays, state) => {
  if (plays.length <= 0) {
    return false;
  }
  for (let i = 0; i < plays.length; i++) {
    if (state[plays[i]].presence) {
      if (!state[plays[i]].ship.sunk()) {
        return plays[i];
      }
    }
  }
  return false;
};
findAHit = (firstShip, state, plays) => {
  let choice = -1;

  while (!legalPlay(choice, true, state, plays)) {
    let random = Math.floor(Math.random() * 4);
    switch (random) {
      case 0:
        choice = firstShip - 1;
        break;
      case 1:
        choice = firstShip + 1;
        break;
      case 2:
        choice = firstShip - 10;
        break;
      case 3:
        choice = firstShip + 10;
        break;
    }
    let firstChoice = choice;
    //try incrementing
    while (plays.includes(choice)) {
      choice += firstChoice;
    }
      //if it can't find a valid play randomize again
    if (!legalPlay((choice), true, state, plays)) {
      choice = Math.floor(Math.random() * 100);
    }
  }
  return choice;
};

module.exports = player;
