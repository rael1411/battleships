const player = require("./player.js");
const boardFactory = require("./boardFactory.js");
let playerA;
let computer;

beforeEach(() => {
  playerA = player(true, "alessio");
  computer = player(false, "computer");

  playerA.board = boardFactory();
  computer.board = boardFactory();
});
it("refuses to attack if the turn is wrong", () => {
  expect(computer.makeMove(5, playerA)).toBe(false);
});
it("attacks correctly", () => {
  playerA.makeMove(4, computer);
  expect(computer.board.state[4].shot).toBe(true);
});
it("passes the turn", () => {
  playerA.makeMove(4, computer);
  expect(playerA.turn).toBe(false);
  expect(computer.turn).toBe(true);
});

it("AI can hit empty space", () => {
  computer.turn = true;
  computer.aiPlay(playerA);
  expect(playerA.board.state).toEqual(
    expect.arrayContaining([{shot: true, presence: false, ship: {}}])
  );
});

it("AI tries to sink ships", () => {
  playerA.board.addShip(1, 4, "horiz");
  computer.turn = true;
  computer.makeMove(2, playerA);
  computer.turn = true;
  testplay = computer.aiPlay(playerA);
  expect(testplay === 1 || testplay === 3).toBeTruthy();
});
