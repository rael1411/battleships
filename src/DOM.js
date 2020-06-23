const game = require("./game");
const renderBoard = (player, boardID, opponent) => {
  let container = document.getElementById("container");
  if (container === null){
    container = document.createElement("div");
    container.id = "container";
  }
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
        modifyCell(player, position);
        game.gameLoop(player, opponent);
      }
    });
    playerBoard.appendChild(element);
  }
  container.appendChild(playerBoard);
};

const modifyCell = (player, position) => {
  let cell = player.board.state[position];
  let place = document.querySelector(
    `div#${player.name + "Board"} > div.cell[position='${position}']`
  );
  if (cell.presence === false) {
    place.classList.add("shot");
  } else if (cell.presence === true) {
    if (cell.ship.sunk() === true) {
      sinkShip(position, player);
    } else {
      place.classList.add("hit");
    }
  }
};

const sinkShip = (position, player) => {
  for (
    let i = 0;
    i < player.board.state[position].ship.coordinates.length;
    i++
  ) {

    let sunkShip = document.querySelector(
      `div#${player.name + "Board"} > div.cell[position='${player.board.state[position].ship.coordinates[i]}']`
    );
    sunkShip.classList.add("sunk");
    sunkShip.classList.remove("hit");
  }
};

const gameOverScreen = (result) => {
  name = result.name;
  const container = document.getElementById("container");
  let winner = document.createElement("h1");
  winner.classList.add("winner");
  winner.textContent = `${name} has won!`;
  container.appendChild(winner);
}

exports.gameOverScreen = gameOverScreen;
exports.renderBoard = renderBoard;
exports.modifyCell = modifyCell;
