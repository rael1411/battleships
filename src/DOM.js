const renderBoard = (state, player) => {
  const container = document.getElementById("container");
  const playerBoard = document.createElement("div");
  playerBoard.id = player;
  playerBoard.classList.add("board");
  for (let i = 0, len = state.length; i < len; i++) {
    let element = document.createElement("div");
    element.setAttribute("position", i);
    element.classList.add("cell");
    playerBoard.appendChild(element);
  }
  container.appendChild(playerBoard);
};

module.exports = renderBoard;
