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
  aiShipPlacement(computer);
  DOM.renderBoard(user, user.name + "Board", computer);
  DOM.renderBoard(computer, computer.name + "Board", user);
  computer.makeMove(4, user);
};

const gameLoop = (computer, user) => {
  if (computer.turn === false && user.turn === false) {
    return false;
  }
  if (!gameOver(user, computer)) {
    if ((computer.turn = true)) {
      DOM.modifyCell(user, computer.aiPlay(user));
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

const aiShipPlacement = (player) => {
  while (player.board.ships.length < 1) {
    player.board.addShip((Math.floor(Math.random() * 100)), 5, "horiz");
  }
  console.log(player.board.ships)
  while (player.board.ships.length < 2) {
    player.board.addShip((Math.floor(Math.random() * 100)), 4, "horiz");
  }
  console.log(player.board.ships)

  while (player.board.ships.length < 4) {
    player.board.addShip((Math.floor(Math.random() * 100)), 3, "horiz");
  }
  console.log(player.board.ships)

  while (player.board.ships.length < 5) {
    player.board.addShip((Math.floor(Math.random() * 100)), 2, "horiz");
  }
  console.log(player.board.ships)

};
exports.aiShipPlacement = aiShipPlacement;
exports.sampleGame = sampleGame;
exports.gameOver = gameOver;
exports.gameLoop = gameLoop;
