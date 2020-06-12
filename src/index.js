const battleshipFactory = require("./battleshipFactory")
const boardFactory = require("./boardFactory")
const player = require("./player");
mockShip = battleshipFactory(3, "horiz")
alessio = player(false, "alessio");
computer = player(true, "computer");
alessio.board.addShip(0, 3, "horiz");
computer.makeMove(1, alessio);
computer.turn = true;
