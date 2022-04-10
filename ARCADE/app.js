//each player with an assigned variable, beginning with Xs turn
const player1 = "X";
const player2 = "O";
let turn = player1;

//the state of the board begins with each tile being null
const tiles = document.querySelectorAll(".tile");
const boardState = Array(tiles.length);
boardState.fill(null);

//elements
const gameOverArea = document.getElementById("gameOverContent");
const gameOverText = document.getElementById("gameOverMessage");
const newGame = document.getElementById("reset");

//event listener for each individual tile selected
tiles.forEach((tile) => tile.addEventListener('click', tileClick));

//create event to determine which tile was clicked. 
function tileClick(event) {

  //if game over area is shown, cannot click a tile anymore
  if (gameOverArea.classList.contains("visible")) {
    return;
  }
  //if tile is clicked, event to determine which tile was clicked. 
  const tile = event.target;
  const tileNumber = tile.dataset.index;

  //if the tile does not have a value, return
  if (tile.innerText != "") {
    return;
  }
  //player 1 begins the turn. The player can put an X and the turn is now player 2.
  if (turn === player1) {
    tile.innerText = player1;
    boardState[tileNumber - 1] = player1;
    turn = player2;
  }
  //if player 2, the player can put an O and the turn is now player 1.
  else {
    tile.innerText = player2;
    boardState[tileNumber - 1] = player2
    turn = player1;
  }
  //determine who wins
  checkForWinner();
}

//array of winning combinations for players
const winningCombinations = [
  //rows
  { combo: [1,2,3] },
  { combo: [4,5,6] },
  { combo: [7,8,9] },

  //columns 
  { combo: [1,4,7] },
  { combo: [2,5,8] },
  { combo: [3,6,9] },

  //diagnolly
  { combo: [1,5,9] },
  { combo: [3,5,7] },
];

//check if there is a winner by iterating through the combos
function checkForWinner() {

//loop over winning combinations array
  for (const winningCombination of winningCombinations) {
    const combo = winningCombination.combo;
    const tileValue1 = boardState[combo[0] - 1];
    const tileValue2 = boardState[combo[1] - 1];
    const tileValue3 = boardState[combo[2] - 1];

//check if tile values are equal to determine a winner. If so, game over screen appears.
    if (
      tileValue1 != null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
      ) {
        gameOverScreen(tileValue1);
        return;
      }
  }
  //if all tiles filled in and no winner, it is a draw
  const allTileFilledIn = boardState.every((tile) => tile !== null);
  if (allTileFilledIn) {
    gameOverScreen(null);
  }
}

//statement appears in the game over area who the player winner is. draw being the default.
function gameOverScreen(winnerText) {
  let text = "DRAW!";
  if(winnerText != null) {
    text = `${winnerText} WINS!`;
  }
  gameOverArea.className = "visible";
  gameOverText.innerText = text;
}

//start a new game by clicking the button, resetting the board state, hiding the game over text, and beginning with player 1.
newGame.addEventListener('click', startNewGame);

function startNewGame() {
  gameOverArea.className = "hidden";
  boardState.fill(null);
  tiles.forEach ((tile) => (tile.innerText = ""));
  turn = player1;
}


