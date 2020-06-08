const boardFactory = require("./boardFactory");
const player = (turn, name = "default") => {
  let plays = [];
  return {
    name: name,
    board: boardFactory(),
    turn: turn,
    plays: plays,
    makeMove(coordinates, opponent) {
      //refuses to make a move if it's not the player's turn
      if (legalPlay(coordinates, this.turn, opponent, plays)) {
        //passes turn
        this.turn = false;
        opponent.turn = true;
        this.plays.push(coordinates);
        opponent.board.receiveAttack(coordinates);
        return true;
      } else if (legalPlay(coordinates, this.turn, opponent) === false) {
        return false;
      }
    },
    aiPlay(opponent) {
      //if the previous move hit a ship
      if (!findLastShipHit(this.plays, opponent.board)) {
        // chooses random number between 0 and 99
        let choice = Math.floor(Math.random() * 100);
        while (choice in this.plays) {
          choice = Math.floor(Math.random() * 100);
        }
      }
      else {
        choice = (findLastShipHit(this.plays, opponent.board));
      }
      this.makeMove(choice, opponent);
      return choice;
    },
  };
};

//verifies if a move is legal
legalPlay = (position, turn, opponent, plays) => {
  if (
    position < 0 ||
    position > 99 ||
    turn === false ||
    opponent.board.state[position].hit === true ||
    position in plays
  ) {
    return false;
  } else {
    return true;
  }
};

//searches for the last ship it hit that didn't sink
//returns false if it doesn't find one
//returns the position of the last successful hit on unsunk ship otherwise
findLastShipHit = (plays, board, counter = 0) => {
  //if the counter is larger than the array of plays return false
  if (counter > plays.length) {
    return false;
  }
  //if it found a sunk ship try again to look for a ship
  if (board.state[plays[plays.length-counter]].ship === false || board.state[plays[plays.length - counter]].sunk() === true) {
    counter++;
    findLastShipHit(plays, board, counter);
  } else {
    //randomizes an adjacent spot
    let choice = -1;
    while (!legalPlay(choice)) {
      let random = Math.floor(Math.random() * 4);
      switch (random) {
        case 0:
          choice = plays[plays.lenght - counter] - 1;
          break;
        case 1:
          choice = plays[plays.lenght - counter] + 1;
          break;
        case 2:
          choice = plays[plays.lenght - counter] - 10;
          break;
        case 3:
          choice = plays[plays.lenght - counter] + 10;
          break;
      }
    }
    return choice;
  }
};
module.exports = player;
