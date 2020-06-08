const battleshipFactory = require("./battleshipFactory.js");
// boardsize refers to one side of the board
const BOARDSIZE = 10;
const boardFactory = () => {
  let state = [];
  //initializes 10 by 10 array of an empty game board
  for (let i = 0; i < BOARDSIZE * 10; i++) {
    state.push({ ship: false, hit: false });
  }
  let ships = [];
  return {
    ships: ships,
    state: state,
    addShip(position, size, align) {
      //checks if the position can hold a ship
      // if true the ship gets added, otherwise returns false
      if (checkValidPosition(position, size, align, state) === false) {
        return false;
      } else {
        if (align === "horiz") {
          this.state.fill(
            battleshipFactory(size, align),
            position,
            position + size
          );
          ships.push(state[position]);
        } else {
          this.state[position] = battleshipFactory(size, align);
          ships.push(state[position]);
          for (let i = 0; i < size; i++) {
            this.state[position + i * 10] = this.state[position];
          }
        }
      }
    },
    receiveAttack(position) {
      //hits the empty board, only if it wasn't hit already
      if (this.state[position].ship === false) {
        this.state[position].hit = true;
      } else {
        //finds first place, used to determine where the ship was hit
        let firstPlace = firstPosition(
          this.state,
          position,
          this.state[position].align
        );
        //finds the correct ship
        for (let i = 0; i < this.ships.length; i++) {
          if (this.ships[i] === this.state[position]) {
            if (this.ships[i].align === "horiz") {
              //hits correct position for an horizontal ship
              this.ships[i].hit(position - firstPlace);
            } else {
              //hits correct position for vertical ship

              this.ships[i].hit((position - firstPlace) / 10);
            }
          }
        }
      }
    },
    allSunk() {
      len = this.ships.length;
      for (let i = 0; i < len; i++) {
        if (this.ships[i].sunk() === false) {
          return false;
        }
      }
      return true;
    },
  };
};

function firstPosition(state, position, align) {
  if (align === "horiz") {
    if (state[position] !== state[position - 1]) {
      return position;
    } else {
      return firstPosition(state, position - 1, align);
    }
  } else {
    if (state[position] !== state[position - 10]) {
      return position;
    } else {
      return firstPosition(state, position - 10, align);
    }
  }
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
