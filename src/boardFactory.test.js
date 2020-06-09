const boardFactory = require("./boardFactory");
const battleshipFactory = require("./battleshipFactory");
beforeEach(() => {
  mockBoard = boardFactory();
});

it("hits the empty board", () => {
  mockBoard.receiveAttack(33);
  expect(mockBoard.state[33].shot).toBe(true);
});

it("adds an horizontal ship", () => {
  mockBoard.addShip(2, 3, "horiz");
  let testShip = { health: [0, 0, 0] };
  expect(mockBoard.state[2].ship).toMatchObject(testShip);
  expect(mockBoard.state[3].ship).toMatchObject(testShip);
  expect(mockBoard.state[4].ship).toMatchObject(testShip);
  expect(mockBoard.state[4].presence).toBe(true);
});

it("adds a vertical ship", () => {
  mockBoard.addShip(15, 4, "vert");
  let testShip2 = { health: [0, 0, 0, 0] };
  expect(mockBoard.state[15].ship).toMatchObject(testShip2);
  expect(mockBoard.state[25].ship).toMatchObject(testShip2);
  expect(mockBoard.state[35].ship).toMatchObject(testShip2);
  expect(mockBoard.state[45].ship).toMatchObject(testShip2);
});
it("doesn't allow incorrect placing", () => {
  expect(mockBoard.addShip(9, 3, "horiz")).toBe(false);
  expect(mockBoard.addShip(90, 3, "vert")).toBe(false);
});

mockBoard = boardFactory();

it("hits ships correctly", () => {
  mockBoard.addShip(2, 3, "horiz");
  mockBoard.addShip(12, 4, "vert");
  let testShip3 = battleshipFactory(3, "horiz");
  testShip3.hit(1);
  mockBoard.receiveAttack(3);
  mockBoard.receiveAttack(32);
  expect(mockBoard.ships[0].health).toStrictEqual([0, 1, 0]);
  expect(mockBoard.ships[1].health).toStrictEqual([0, 0, 1, 0]);
});
it("checks if every ship is sunk (before)", () => {
  mockBoard.addShip(2, 3, "horiz");
  expect(mockBoard.allSunk()).toBe(false);
});

it("checks if every ship is sunk (after)", () => {
  mockBoard.addShip(0, 3, "horiz");
  mockBoard.addShip(5, 4, "vert");
  mockBoard.receiveAttack(0);
  mockBoard.receiveAttack(1);
  mockBoard.receiveAttack(2);
  mockBoard.receiveAttack(5);
  mockBoard.receiveAttack(15);
  mockBoard.receiveAttack(25);
  mockBoard.receiveAttack(35);

  expect(mockBoard.allSunk()).toBe(true);
});
