const battleshipFactory = require("./battleshipFactory.js");
// boardsize refers to one side of the board
const BOARDSIZE = 10;
function boardFactory() {
  let state = [];
  //initializes 10 by 10 array of an empty game board
  for (let i = 0; i < BOARDSIZE * 10; i++) {
    state.push({ ship: false, hit: false });
  }
  let ships = [];
  return {
    state: state,
    addShip(position, size, align) {
      //checks if the position can hold a ship
      // if true the ship gets added, otherwise returns false
      if (checkValidPosition(position, size, align, state) === false) {
        return false;
      } else {
        if (align === "horiz") {
          this.state.fill(battleshipFactory(size), position, position + size);
        } else {
        this.state[position] = battleshipFactory(size)
          for (let i = 0; i < size; i++) {
            this.state[position + (i * 10)] = this.state[position]
          }
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

function checkValidPosition(position, size, align, state) {
  if (align === "horiz") {
    //working around the 0 edge case
    if (position === 0 && size <= 9) {
      return true;
    }
    if (
      Math.floor(position / 10) !== Math.floor((position + size) / 10) ||
      position + size > 99
    ) {
      return false;
    }
    for (let i = 0; i < size; i++) {
      if (state.ship === true) {
        return false;
      }
    }
  }
  if (position + size * 10 > 99) {
    return false;
  }
  for (i = 0; i < size; i++) {
    if (state[position + 10 * i].ship === true) {
      return false;
    }
  }
  return true;
}
module.exports = boardFactory;
