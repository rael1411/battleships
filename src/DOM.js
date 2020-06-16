const game = require("./game");
const renderBoard = (player, boardID, opponent) => {
  const container = document.getElementById("container");
  const playerBoard = document.createElement("div");
  playerBoard.id = boardID;
  playerBoard.classList.add("board");
  for (let i = 0, len = player.board.state.length; i < len; i++) {
    let element = document.createElement("div");
    element.setAttribute("position", i);
    element.classList.add("cell");
    element.addEventListener("click", (e) => {
      let position = element.getAttribute("position");
      //when the board is clicked the opponent has made a move
      if (opponent.makeMove(position, player)) {
        game.gameLoop(player, opponent);
        if (player.board.state[position].presence === true) {
          if (player.board.state[position].ship.sunk() === true) {
            for (
              let i = 0;
              i < player.board.state[position].ship.coordinates.length;
              i++
            ) {
              let sunkShip =  document.querySelector(`div#${boardID} > div.cell[position='${player.board.state[position].ship.coordinates[i]}']`);
              sunkShip.classList.add("sunk");
              sunkShip.classList.remove("hit");
            }
          } else {
            element.classList.add("hit");
          }
        } else {
          element.classList.add("shot");
        }
      }
    });
    playerBoard.appendChild(element);
  }
  container.appendChild(playerBoard);
};

const makeHit = (position) => {}
const makeShot = (position) => {}
const makeSunk = (position) => {}
exports.makeHit = makeHit;
exports.makeShot = makeShot;
exports.makeSunk = makeSunk;
exports.renderBoard = renderBoard;
