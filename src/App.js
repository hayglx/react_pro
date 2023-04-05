import React from "react";
import { useState } from "react";

function Square({ value, setValue }) {
  return (
    <button className="square" onClick={setValue}>
      {value}
    </button>
  )
}

function Board({ xIsNext, squares, onPlay }) {

  function getWinner() {
    const a = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < a.length; i += 1) {
      if (squares && squares[a[i][0]] && squares[a[i][0]] === squares[a[i][1]] && squares[a[i][0]] === squares[a[i][2]])
        return squares[a[i][0]]
    }
    return null
  }

  function handleClick(i) {
    if (squares[i] != null || getWinner() != null) {
      return
    }
    const newsquares = squares.slice();

    newsquares[i] = xIsNext ? 'X' : 'O'
    onPlay(newsquares)
  }

  let winner = getWinner()
  let status;
  if (winner) {
    status = 'The winner is ' + winner
  }
  else {
    status = 'The next player is ' + (xIsNext ? 'X' : 'O')
  }
  return (
    <React.Fragment>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} setValue={() => handleClick(0)} />
        <Square value={squares[1]} setValue={() => handleClick(1)} />
        <Square value={squares[2]} setValue={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} setValue={() => handleClick(3)} />
        <Square value={squares[4]} setValue={() => handleClick(4)} />
        <Square value={squares[5]} setValue={() => handleClick(5)} />
      </div><div className="board-row">
        <Square value={squares[6]} setValue={() => handleClick(6)} />
        <Square value={squares[7]} setValue={() => handleClick(7)} />
        <Square value={squares[8]} setValue={() => handleClick(8)} />
      </div>

    </React.Fragment>
  );
}



export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function jumpTo(i) {
    setCurrentMove(i)
  }

  const moves = history.map((v, i) => {
    let description;
    if (i === 0) {
      description = 'go to game start'
    }
    else {
      description = 'go to move #' + i
    }
    return (
      <li key={i}>
        <button onClick={() => jumpTo(i)}>{description}</button>
      </li>
    )
  });

  function handlePlay(nextSquares) {
    setHistory([...history.slice(0, currentMove + 1), nextSquares]);
    setCurrentMove(currentMove + 1);
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}