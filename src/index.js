const player = require("./player")
const renderBoard = require("./DOM")
test = player(false, "test");
renderBoard(test.board.state, test.name)

