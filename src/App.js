import React from "react";
import { useState } from "react";

function Square({ value, setValue }) {
  return (
    <button className="square" onClick={setValue}>{value}</button>
  )
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setxIsNext] = useState(true)

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
        return squares[a[0][0]]
    }
    return null
  }

  function handleClick(i) {
    if (squares[i] != null || getWinner() != null) {
      return
    }
    const newsquares = squares.slice();

    newsquares[i] = xIsNext ? 'X' : 'O'
    setSquares(newsquares)
    setxIsNext(!xIsNext)
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
