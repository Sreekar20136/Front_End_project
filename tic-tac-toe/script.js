const boardCells = document.querySelectorAll(".board-cell");
const turn = document.querySelector(".turn");
const result = document.querySelector(".result");
const undoBtn = document.querySelector(".undo");

// set a symbol
const playerOne = "X";
const playerTwo = "O";
// board array
var board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

// previous moves array
var previousMoves = [];

// start the game
startGame();

function startGame() {
  boardCells.forEach((cell, index) => {
    cell.innerHTML = "";
    cell.addEventListener("click", handleClick.bind(null, cell, index));
    });
};

function handleClick(cell, index) {
  const cellValue = cell.innerHTML;
  if (cellValue === "") {
    if (turn.innerHTML === "Player 1") {
      cell.innerHTML = playerOne;
      turn.innerHTML = "Player 2";
      // insert into array and previous moves
      board[Math.floor(index / 3)][index % 3] = playerOne;
      previousMoves.push([Math.floor(index / 3), index % 3, playerOne]);
    } else {
      cell.innerHTML = playerTwo;
      turn.innerHTML = "Player 1";
      // insert into array and previous moves
      board[Math.floor(index / 3)][index % 3] = playerTwo;
      previousMoves.push([Math.floor(index / 3), index % 3, playerTwo]);
    }
  }
  // remove event listener
  cell.removeEventListener("click", handleClick);
  // check if someone won
  checkWinner();
}

function undoMove() {
  if (previousMoves.length > 0) {
    // get the previous move
    const prevMove = previousMoves.pop();
    const row = prevMove[0];
    const col = prevMove[1];
    // remove the symbol from the cell and board array
    board[row][col] = "";
    const cell = boardCells[row * 3 + col];
    cell.innerHTML = "";
    // add event listener back
    cell.addEventListener("click", handleClick.bind(null, cell, row * 3 + col));
    // switch turns
    turn.innerHTML = turn.innerHTML === "Player 1" ? "Player 2" : "Player 1";
  }
}

    function checkWinner() {
      // check for rows
      for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0] !== '') {
          showResult(board[i][0]);
          return;
        }
      }
      // check for columns
      for (let i = 0; i < 3; i++) {
        if (board[0][i] === board[1][i] && board[0][i] === board[2][i] && board[0][i] !== '') {
          showResult(board[0][i]);
          return;
        }
      }
      // check for diagonals
      if (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== '') {
        showResult(board[0][0]);
        return;
      }
      if (board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] !== '') {
        showResult(board[0][2]);
        return;
      }
      // check for a tie
      // if all cells are filled and no winner
      var count = 0;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] != '') {
            count++;
          }
        }
      }
      if (count == 9) {
        showResult('Tie');
        return;
      }
    }

    function showResult(symbol) {
      if (symbol === playerOne) {
        result.innerHTML = 'Player 1 Win!';
      } else if (symbol === playerTwo) {
        result.innerHTML = 'Player 2 Win!';
      } else {
        result.innerHTML = 'Tie!';
      }
      result.style.display = 'flex';
    }

    function restartGame() {
      result.style.display = 'none';
      turn.innerHTML = 'Player 1';

      board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];

      startGame();
    }
  
    window.onload = function() {
      var textElement = document.querySelector('.typewriter-text');
      textElement.classList.add('typewriter-animation');
    };