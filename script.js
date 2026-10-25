const gameBoard = (() => {
  let squares = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']];

  const setSquare = (x, y, piece) => {
    if (getSquare(x, y) === '') {
      squares[x][y] = piece;
    } else {
      alert(`Board position ${x}, ${y} is already set to ${getSquare(x, y)}`)
    }
  };

  const getSquare = (x, y) => {
    return squares[x][y];
  };

  const getEmptySquares = () => {
    let result = [];
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (getSquare(x, y) === '') {
          result.push([x, y]);
        }
      }
    };
    return result;
  }

  const playerWon = (player) => {

    const linesOf3 = [
      // rows
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // columns
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // diagonals
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]]]

    let win;

    for (let line of linesOf3) {
      win = true;
      for (let square of line) {
        if (getSquare(square[0], square[1]) != player) {
          win = false;
        }
      }
      if (win) {
        return true;
      }
    }
    return false;
  }

  return { setSquare, getSquare, getEmptySquares, playerWon };
})();

function createPlayer(player) {

  const takeTurn = (x, y) => {

    const emptySquares = gameBoard.getEmptySquares();
    let found = false;
    for (square of emptySquares) {
      if (square[0] === x && square[1] === y) {
        found = true;
        break;
      }
    }
    if (!found) {
      alert(`Board position ${x}, ${y} is already set to ${gameBoard.getSquare(x, y)}`);
    }

    gameBoard.setSquare(x, y, player);
    
  };

  return { player, takeTurn };
}

