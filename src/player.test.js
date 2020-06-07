const player = require("./player.js")
const boardFactory = require("./boardFactory.js");
let playerA;
let computer;

beforeEach(() => {
    playerA = player("alessio");
    computer = player();
    playerA.turn = true;
    computer.turn = false;
    playerA.board = boardFactory();
    computer.board = boardFactory()
})
it ("refuses to attack if the turn is wrong", () => {
    expect(computer.makeMove(5, playerA)).toBe(false);
})
it ("attacks correctly", () => {
    playerA.makeMove(4, computer);
    expect(computer.board.state[4].hit).toBe(true);
})
it ("passes the turn", () => {
    playerA.makeMove(4, computer);
    expect(playerA.turn).toBe(false);
    expect(computer.turn).toBe(true);
})