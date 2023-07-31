const blocks = document.querySelectorAll(".block");
const turn = document.querySelector(".show-turn");
const restartBtn = document.querySelector("#restart");
const announcer = document.querySelector("#announcer"); // Corrected selector
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = 'X';
let gameOn = false;

initializeGame();

function initializeGame() {
  blocks.forEach(block => block.addEventListener("click", blockClicked));
  restartBtn.addEventListener("click", refreshGame);
  turn.textContent = `${currentPlayer}'s turn`;
  gameOn = true;
}

function blockClicked() {
  const blockIndex = this.getAttribute("blockIndex");

  if (options[blockIndex] != "" || !gameOn) {
    return;
  }

  updateBlock(this, blockIndex);
  checkWinner();
}

function updateBlock(block, index) {
  options[index] = currentPlayer;
  block.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = (currentPlayer == 'X') ? "O" : "X";
  turn.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  let wonGame = false;
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const blockA = options[condition[0]];
    const blockB = options[condition[1]];
    const blockC = options[condition[2]];

    if (blockA == "" || blockB == "" || blockC == "") {
      continue;
    }
    if (blockA == blockB && blockB == blockC) {
      wonGame = true;
      break;
    }
  }

  if (wonGame) {
    turn.textContent = `${currentPlayer} wins!`;
    gameOn = false;
  } else if (!options.includes("")) {
    turn.textContent = 'Draw!';
    gameOn = false;
  } else {
    changePlayer();
  }
}

function refreshGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  turn.textContent = `${currentPlayer}'s turn! `;
  blocks.forEach(block => block.textContent = "");
  gameOn = true; 
}
