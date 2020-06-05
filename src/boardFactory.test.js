const boardFactory = require("./boardFactory")
let mockBoard = boardFactory();

mockBoard.receiveAttack(33);
it("hits the empty board", () => {
    expect(mockBoard.state[33].hit).toBe(true);
})
mockBoard.addShip(2, 3, "horiz");
it("adds an horizontal ship", () => {
    expect(mockBoard.state[2].ship).toBe(true);
    expect(mockBoard.state[3].ship).toBe(true);
    expect(mockBoard.state[4].ship).toBe(true);
})
mockBoard.addShip(15, 4, "vert");
it("adds a vertical ship", () => {
    expect(mockBoard.state[15].ship).toBe(true);
    expect(mockBoard.state[25].ship).toBe(true);
    expect(mockBoard.state[35].ship).toBe(true);
    expect(mockBoard.state[45].ship).toBe(true);
    expect(mockBoard.state[55].ship).toBe(false);
})
it("doesn't allow incorrect placing", () => {
    expect(mockBoard.addShip(9, 3, "horiz")).toBe(false);
    expect(mockBoard.addShip(90, 3, "vert")).toBe(false);
})