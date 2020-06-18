const DOM = require("./DOM");
const player = require("./player");
const sampleGame = () => {
  let user = player(false, "user");
  let computer = player(true, "computer");
  user.board.addShip(4, 5, "horiz");
  user.board.addShip(15, 4, "horiz");
  user.board.addShip(43, 3, "horiz");
  user.board.addShip(23, 3, "horiz");
  user.board.addShip(77, 2, "horiz");
  computer.board.addShip(0, 5, "horiz");
  computer.board.addShip(20, 4, "horiz");
  computer.board.addShip(80, 3, "horiz");
  computer.board.addShip(90, 3, "horiz");
  computer.board.addShip(40, 2, "horiz");
  DOM.renderBoard(user, user.name + "Board", computer);
  DOM.renderBoard(computer, computer.name + "Board", user);
  computer.makeMove(4, user);
};

const gameLoop = (computer, user) => {

  if (computer.turn === false && user.turn === false){
    return false;
  }
  if (!gameOver(user, computer)) {
    if ((computer.turn = true)) {
      computer.aiPlay(user);
    }
  }
};
const gameOver = (playerOne, playerTwo) => {
  if (playerOne.board.allSunk()) {
    DOM.gameOverScreen(playerTwo);
    playerOne.turn = false;
    playerTwo.turn = false;
  } else if (playerTwo.board.allSunk()) {
    DOM.gameOverScreen(playerOne);
    playerOne.turn = false;
    playerTwo.turn = false;
  } else {
    return false;
  }
};
exports.sampleGame = sampleGame;
exports.gameOver = gameOver;
exports.gameLoop = gameLoop;
