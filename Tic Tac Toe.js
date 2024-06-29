document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const cells = document.querySelectorAll(".cell");
  const restartButton = document.getElementById("restartButton");
  let currentPlayer = "X";
  let gameState = ["", "", "", "", "", "", "", "", ""];
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleCellClick = (e) => {
    const cell = e.target;
    const cellIndex = cell.getAttribute("data-index");

    if (
      gameState[cellIndex] !== "" ||
      checkWin() ||
      gameState.includes("") === false
    ) {
      return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
      setTimeout(() => alert(`${currentPlayer} wins!`), 10);
    } else if (gameState.includes("") === false) {
      setTimeout(() => alert(`It's a draw!`), 10);
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  };

  const checkWin = () => {
    return winningConditions.some((condition) => {
      return condition.every((index) => gameState[index] === currentPlayer);
    });
  };

  const restartGame = () => {
    gameState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    cells.forEach((cell) => {
      cell.textContent = "";
    });
  };

  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });

  restartButton.addEventListener("click", restartGame);
});
