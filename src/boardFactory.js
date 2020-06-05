const battleshipFactory = require("./battleshipFactory.js");
// boardsize refers to one side of the board
const BOARDSIZE = 10;
function boardFactory() {
  let state = [];
  for (let i = 0; i < BOARDSIZE * 10; i++) {
    state.push({ ship: false, hit: false });
  }
  return {
    //initializes 10 by 10 array of an empty game board
    state: state,
    addShip(position, size, align) {
      //checks if the position can hold a ship
      // if true the ship gets added, otherwise returns false
      if (align === "horiz") {
        if (
          Math.floor(position / 10) !== Math.floor((position + size) / 10) ||
          position + size > 99
        ) {
          return false;
        } else {
          for (let i = 0; i < size; i++) {
            if (this.state.ship === true) {
              return false;
            }
          }
        }
        for (let i = 0; i < size; i++) {
          this.state[position + i].ship = true;
        }
      } else {
        if (position + size * 10 > 99) {
          return false;
        } else {
          for (i = 0; i < size; i++) {
            if (this.state[position + 10 * i].ship === true) {
              return false;
            }
          }
        }
        for (i = 0; i < size; i++) {
          this.state[position + 10 * i].ship = true;
        }
      }
    },
    receiveAttack(position) {
      if (this.state[position].ship === false) {
        this.state[position].hit = true;
      }
    },
  };
}
module.exports = boardFactory;
