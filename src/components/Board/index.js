import Square from "@/components/Square";
import styles from "@/styles/Board.module.css";
import { useState } from "react";

export default function Board({ xIsNext, squares, onPlay, currentMove }) {
  const winSquare = [];

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        // winner found
        winSquare.push(a);
        winSquare.push(b);
        winSquare.push(c);
        return squares[a];
      }
    }
    // draw
    if (currentMove === 9) {
      return -1;
    }

    // continue playing
    return null;
  };

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    console.log("click: ", i);
    onPlay(nextSquares, i);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner === -1) {
    status = "Got no winner, draw game!";
  } else if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  let PlayBoard = [];
  for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
    let Row = [];
    for (let i = 0; i < 3; i++) {
      let squareIndex = rowIndex * 3 + i;
      let isWinSquare = false;
      if (winSquare.includes(squareIndex)) {
        isWinSquare = true;
      }
      Row.push(
        <Square
          key={squareIndex}
          value={squares[squareIndex]}
          onSquareClick={() => handleClick(squareIndex)}
          isWinSquare={isWinSquare}
        />
      );
    }
    PlayBoard.push(
      <div key={rowIndex} className={styles.board_row}>
        {Row}
      </div>
    );
  }

  return (
    <>
      <div className={styles.status}>{status}</div>
      {PlayBoard}
    </>
  );
}
