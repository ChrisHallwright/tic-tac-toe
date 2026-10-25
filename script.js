const gameBoard = (() => {
  let squares = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']];

  let currentGame;

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
  };

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
  };

  const clear = () => {
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        squares[x][y] = '';
      }
    }
  };

  const setGame = (game) => {
    currentGame = game;
  };

  const getGame = () => {
    return currentGame;
  };

  const playerO = createPlayer('o');
  const playerX = createPlayer('x');
  const players = [playerO, playerX];

  return { setSquare, getSquare, setGame, getGame, 
    getEmptySquares, playerWon, clear, players };
})();

function createPlayer(player) {

  let name;

  const takeTurn = (x, y) => {

    const emptySquares = gameBoard.getEmptySquares();
    let found = false;
    for (square of emptySquares) {
      if (square[0] === x && square[1] === y) {
        found = true;
        break;
      }
    }
    if (found) {
      gameBoard.setSquare(x, y, player);
      return true;
    } else {
      return false;
    }
  };

  const setName = (enteredName) => {
    name = enteredName;
  }

  const getName = () => {
    if (name) {
      return name;
    } else {
      return `Player ${player.toUpperCase()}`;
    }
  }

  return { player, takeTurn, setName, getName };
}

function createGame() {

  const [playerO, playerX] = gameBoard.players;

  gameBoard.clear();
  let currentPlayer;

  if (Math.floor(Math.random() * 2) === 0) {
    currentPlayer = playerO;
  } else {
    currentPlayer = playerX;
  }

  const changePlayer = () => {
    currentPlayer.player === 'x' ? currentPlayer = playerO : currentPlayer = playerX;
  }

  const checkResult = () => {
    if (gameBoard.playerWon(currentPlayer.player)) {
      return `${currentPlayer.getName()} won!!!`;
    } else if (gameBoard.getEmptySquares().length === 0) {
      return 'Draw';
    } else {
      changePlayer();
      return `${currentPlayer.getName()}'s turn`;
    }
  }

  const getPlayer = () => {
    return currentPlayer;
  }

  const game = { getPlayer, checkResult };
  gameBoard.setGame(game);

  return game;
}

const display = (() => {

  const square = (x, y) => {
    const pos = 3 * x + y + 1;
    const element = document.querySelector(`[class^="square"]:nth-child(${pos})`);
    element.textContent = gameBoard.getSquare(x, y);
  };

  const board = () => {
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        square(x, y);
      }
    }
  }

  return { square, board }
})();

const ui = (() => {

  let x;
  let y;
  let game = createGame();
  let player;

  const p = document.querySelector('p');
  p.textContent = game.checkResult();

  for (sq of document.querySelectorAll('[class^="square"]')) {
    sq.addEventListener('click', (e) => {
      x = parseInt(e.target.className.slice(6, 7));
      y = parseInt(e.target.className.slice(7, 8));

      game = gameBoard.getGame();
      player = game.getPlayer();

      if (player.takeTurn(x, y)) {
        display.square(x, y, player.player);
        p.textContent = game.checkResult();
      }
    });
  }

  const btn = document.querySelector('button');
  btn.addEventListener('click', (e) => {
    const game = createGame();
    gameBoard.clear();
    display.board();
    p.textContent = game.checkResult();
  });

  const oname = document.querySelector('#oname');
  oname.addEventListener('change', (e) => {
    gameBoard.players[0].setName(oname.value);
  });

  const xname = document.querySelector('#xname');
  xname.addEventListener('change', (e) => {
    gameBoard.players[1].setName(xname.value);
  });

})();


