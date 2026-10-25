const gameBoard = (() => {
  let squares = [['', '', ''],
                 ['', '', ''],
                 ['', '', '']];

  const setSquare = (x, y, piece) => {
    if (getSquare(x, y) === '') {
      squares[x][y] = piece;
    } else {
      alert(`Board position ${x}, ${y} is already set to ${getSquare(x, y)}`)
    }
  }

  const getSquare = (x, y) => {
    return squares[x][y];
  }

  const getSquares = () => {
    return squares;
  }

  return { setSquare, getSquare, getSquares };
})();

