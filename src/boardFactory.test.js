const boardFactory = require("./boardFactory");
const battleshipFactory = require("./battleshipFactory");
let mockBoard = boardFactory();

mockBoard.receiveAttack(33);
it("hits the empty board", () => {
  expect(mockBoard.state[33].hit).toBe(true);
});
mockBoard.addShip(2, 3, "horiz");
let testShip = { health: [0, 0, 0] };
it("adds an horizontal ship", () => {
  expect(mockBoard.state[2]).toMatchObject(testShip);
  expect(mockBoard.state[3]).toMatchObject(testShip);
  expect(mockBoard.state[4]).toMatchObject(testShip);
});
mockBoard.addShip(15, 4, "vert");
let testShip2 = { health: [0, 0, 0, 0] };
it("adds a vertical ship", () => {
  expect(mockBoard.state[15]).toMatchObject(testShip2);
  expect(mockBoard.state[25]).toMatchObject(testShip2);
  expect(mockBoard.state[35]).toMatchObject(testShip2);
  expect(mockBoard.state[45]).toMatchObject(testShip2);
});
it("doesn't allow incorrect placing", () => {
  expect(mockBoard.addShip(9, 3, "horiz")).toBe(false);
  expect(mockBoard.addShip(90, 3, "vert")).toBe(false);
});

secondMockBoard = boardFactory();
secondMockBoard.addShip(2, 3, "horiz");
secondMockBoard.addShip(12, 4, "vert");
let testShip3 = battleshipFactory(3, "horiz");
testShip3.hit(1);
secondMockBoard.receiveAttack(3);
secondMockBoard.receiveAttack(32);
it("checks that ships are hit correctly", () => {
  expect(secondMockBoard.ships[0].health).toStrictEqual([0,1,0]);
  expect(secondMockBoard.ships[1].health).toStrictEqual([0,0,1,0]);
});
it("checks if every ship is sunk (before)", () => {
  expect(secondMockBoard.allSunk()).toBe(false);
});
let thirdMockBoard = boardFactory();
thirdMockBoard.addShip(0, 3, "horiz");
thirdMockBoard.addShip(5, 4, "vert");
thirdMockBoard.receiveAttack(0)
thirdMockBoard.receiveAttack(1)
thirdMockBoard.receiveAttack(2)
thirdMockBoard.receiveAttack(5)
thirdMockBoard.receiveAttack(15)
thirdMockBoard.receiveAttack(25)
thirdMockBoard.receiveAttack(35)

it("checks if every ship is sunk (after)", () => {
  expect(thirdMockBoard.allSunk()).toBe(true);
});
