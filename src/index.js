const battleshipFactory = require("./battleshipFactory")
const boardFactory = require("./boardFactory")
const player = require("./player");
alessio = player(false, "alessio");
computer = player(true, "computer");
computer.makeMove(5, alessio);
computer.move = true;
computer.makeMove(5, alessio);
console.log("computer turn after second play " + computer.turn)
alessio.board.addShip(13, 4, "horiz");
computer.move = true;
computer.makeMove(13, alessio);
computer.move = true;
computer.makeMove(13, alessio);
console.log("computer turn after second attack on ship " + computer.turn)