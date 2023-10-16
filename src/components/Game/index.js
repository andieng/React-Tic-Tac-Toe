import { useState } from "react";
import Board from "@/components/Board";
import styles from "@/styles/Game.module.css";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscendingOrder, setIsAscendingOrder] = useState(true);
  const [playSquare, setPlaySquare] = useState(0);
  const [locationHistory, setLocationHistory] = useState([Array(9).fill({})]);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares, recentPlaySquare) {
    setPlaySquare(recentPlaySquare);
    let row = Math.floor(recentPlaySquare / 3);
    let col = recentPlaySquare % 3;
    const currentLocation = {
      row,
      col,
    };
    const nextLocationHistory = [
      ...locationHistory.slice(0, currentMove + 1),
      currentLocation,
    ];
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setLocationHistory(nextLocationHistory);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleToggleSortOrder() {
    setIsAscendingOrder(!isAscendingOrder);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    let { row, col } = locationHistory[move];
    if (move === currentMove && move == 0) {
      description = `You are at move #${move}`;
    } else if (move === currentMove) {
      description = `You are at move #${move} - location (${row},${col})`;
    } else if (move > 0) {
      description = `Go to move #${move} - location (${row},${col})`;
    } else {
      description = "Go to game start";
    }
    return move !== currentMove ? (
      <li key={move} className={styles.move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    ) : (
      <li key={move} className={styles.move}>
        <p className={styles.current_move}>{description}</p>
      </li>
    );
  });

  return (
    <div className={styles.game}>
      <div className={styles.game_board}>
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          currentMove={currentMove}
        />
      </div>
      <div className={styles.game_info}>
        <ol>{isAscendingOrder ? moves : moves.toReversed()}</ol>
      </div>
      <button
        type="button"
        className={styles.toggle}
        onClick={handleToggleSortOrder}
      >
        Sort in {isAscendingOrder ? "Descending" : "Ascending"} Order
      </button>
    </div>
  );
}
