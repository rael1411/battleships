const player = require("./player.js");
const boardFactory = require("./boardFactory.js");


beforeEach(() => {
  user = player(true, "user");
  computer = player(false, "computer");
  user.board = boardFactory();
  computer.board = boardFactory();
  user.board.addShip(42, 5, "vert");
  computer.board.addShip(42, 5, "vert");


  
});
it("refuses to attack if the turn is wrong", () => {
  expect(computer.makeMove(5, user)).toBe(false);
});
it("attacks correctly", () => {
  user.makeMove(4, computer);
  expect(computer.board.state[4].shot).toBe(true);
});
it("passes the turn", () => {
  user.makeMove(4, computer);
  expect(user.turn).toBe(false);
  expect(computer.turn).toBe(true);
});

it("AI can hit empty space", () => {
  computer.turn = true;
  computer.aiPlay(user);
  expect(user.board.state).toEqual(
    expect.arrayContaining([{shot: true, presence: false, ship: {}}])
  );
});

it("AI tries to sink ships", () => {
  user.board.addShip(1, 4, "horiz");
  computer.turn = true;
  computer.makeMove(2, user);
  computer.turn = true;
  testplay = computer.aiPlay(user);
  expect(testplay === 1 || testplay === 3 || testplay == 12).toBeTruthy();
});
