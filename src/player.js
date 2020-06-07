const boardFactory = require("./boardFactory");
const player = function (turn, name = "default") {
  return {
    name: name,
    board: boardFactory(),
    turn: turn,
    makeMove(coordinates, opponent) {
      if (this.turn === true) {
        if (
          opponent.board.state[coordinates].hit === false ||
          opponent.board.receiveAttack(coordinates) != false
        ) {
          opponent.board.receiveAttack(coordinates);
          this.turn = false;
          opponent.turn = true;
        } else {
          this.turn = true;
        }
      } else {
        return false;
      }
    },
  };
};
module.exports = player;
