import renderBoard from "./DOM.js";
const player = require("./player");
export const sampleGame = () => {
  let user = player(true, "user");
  let computer = player(false, "computer");
  user.board.addShip(4, 5, "horiz");
  user.board.addShip(16, 4, "horiz");
  user.board.addShip(43, 3, "horiz");
  user.board.addShip(23, 3, "horiz");
  user.board.addShip(78, 2, "horiz");
  computer.board.addShip(50, 5, "horiz");
  computer.board.addShip(22, 4, "horiz");
  computer.board.addShip(86, 3, "horiz");
  computer.board.addShip(96, 3, "horiz");
  computer.board.addShip(40, 2, "horiz");
  renderBoard(user.board.state, user.name);
  renderBoard(computer.board.state, computer.name);
};

