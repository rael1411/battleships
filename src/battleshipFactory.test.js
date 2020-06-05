const battleshipFactory = require("./battleshipFactory");
let mockShip = battleshipFactory(3);
let expected = 
mockShip.hit(1);
it("checks if hit works correctly", () => {
    expect(mockShip).toMatchObject({health: [0, 1, 0]});
})

it("checks that the sunk works", () => {
    expect(mockShip.sunk()).toBe(false)
})
let mockShip2 = battleshipFactory(3);
mockShip2.hit(0)
mockShip2.hit(1)
mockShip2.hit(2)

it("checks that the sunk works", () => {
    expect(mockShip2.sunk()).toBe(true)
})