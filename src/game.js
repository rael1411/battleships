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
  console.log(computer.board.state)
  DOM.renderBoard(user, "playerBoard", computer);
  DOM.renderBoard(computer, "computerBoard", user);
  computer.makeMove(4, user);
};

const gameOver = (playerOne, playerTwo) => {
  if (playerOne.board.allSunk()){
    return playerTwo;
  }
  else if (playerTwo.board.allSunk()){
    return playerOne;
  }
  else {
    return false;
  }
}

const gameLoop = (computer, user) => {
  if (gameOver(user, computer) === user || gameOver(user, computer) === computer){
    console.log(`The winner is: ${gameOver(user, computer).name}`)
  }
  computer.board.state;
  if (computer.turn = true){
    computer.aiPlay(user);
  }
}
exports.sampleGame = sampleGame;
exports.gameOver = gameOver;
exports.gameLoop = gameLoop;

