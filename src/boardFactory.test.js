const boardFactory = require("./boardFactory");
let mockBoard = boardFactory();

mockBoard.receiveAttack(33);
it("hits the empty board", () => {
  expect(mockBoard.state[33].hit).toBe(true);
});
mockBoard.addShip(2, 3, "horiz");
let testShip = { length: 3, health: [0, 0, 0] };
it("adds an horizontal ship", () => {
  expect(mockBoard.state[2].ship).toMatchObject(testShip);
  expect(mockBoard.state[3].ship).tomatchObject(testShip);
  expect(mockBoard.state[4].ship).toMatchObject(testShip);
});
mockBoard.addShip(15, 4, "vert");
it("adds a vertical ship", () => {
  expect(mockBoard.state[15].ship).toMatchObject(testShip);
  expect(mockBoard.state[25].ship).toMatchObject(testShip);
  expect(mockBoard.state[35].ship).toMatchObject(testShip);
  expect(mockBoard.state[45].ship).toMatchObject(testShip);
});
it("doesn't allow incorrect placing", () => {
  expect(mockBoard.addShip(9, 3, "horiz")).toBe(false);
  expect(mockBoard.addShip(90, 3, "vert")).toBe(false);
});
