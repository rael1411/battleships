const battleshipFactory = require("./battleshipFactory");
beforeEach(() => {
  mockShip = battleshipFactory(3, "horiz");
});
it("checks if hit works correctly", () => {
  mockShip.hit(1);
  expect(mockShip).toMatchObject({ health: [0, 1, 0] });
});

it("checks that the sunk works", () => {
  expect(mockShip.sunk()).toBe(false);
});

it("checks that the sunk works", () => {
  mockShip.hit(0);
  mockShip.hit(1);
  mockShip.hit(2);
  expect(mockShip.sunk()).toBe(true);
});
