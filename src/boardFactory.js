const battleshipFactory = require("./battleshipFactory.js");
// boardsize refers to one side of the board
const BOARDSIZE = 10;
const boardFactory = () => {
  let state = [];
  //initializes 10 by 10 array of an empty game board
  for (let i = 0; i < BOARDSIZE * 10; i++) {
    state.push({ presence: false, shot: false, ship: {} });
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
        let thisShip = battleshipFactory(size, align, position);
        this.state[position + 1].ship = Object.assign(
          this.state[position].ship,
          thisShip
        );
        if (align === "horiz") {
          for (let i = 0; i < size; i++) {
            this.state[position + i].ship = Object.assign(
              this.state[position].ship,
              thisShip
            );
            this.state[position + i].presence = true;
          }
          ships.push(state[position].ship);
          return true;
        } else {
          this.state[position].ship = Object.assign(
            this.state[position].ship,
            thisShip
          );
          this.state[position].presence = true;
          ships.push(state[position].ship);
          for (let i = 0; i < size; i++) {
            this.state[position + i * 10].presence = true;
            this.state[position + i * 10].ship = this.state[position].ship;
          }
          return true;
        }
      }
    },
    receiveAttack(position) {
      //hits the empty board, only if it wasn't hit already
      this.state[position].shot = true;
      if (this.state[position].presence === true) {
        //finds first place, used to determine where the ship was hit
        let firstPlace = firstPosition(
          this.state,
          position,
          this.state[position].ship.align
        );
        //finds the correct ship
        for (let i = 0; i < this.ships.length; i++) {
          if (this.ships[i] === this.state[position].ship) {
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
  if (align == "horiz") {
    if (position - 1 < 0 || state[position].ship !== state[position - 1].ship) {
      return position;
    } else {
      return firstPosition(state, position - 1, align);
    }
  } else {
    if (
      position - 10 < 0 ||
      state[position].ship !== state[position - 10].ship
    ) {
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
    //checks if it gets out of bounds
    if (
      Math.floor(position / 10) !== Math.floor((position + size) / 10) ||
      position + size > 99
    ) {
      return false;
    }
    //checks if another ship occupies that space
    for (let i = 0; i < size; i++) {
      if (state[position+i].presence === true) {
        console.log("found another ship");
        return false;
      }
    }
  } else if (align === "vert") {
    if (position + size * 10 > 99) {
      return false;
    }
    for (i = 0; i < size; i++) {
      if (state[position + 10 * i].presence === true) {
        return false;
      }
    }
    return true;
  }
}
module.exports = boardFactory;
