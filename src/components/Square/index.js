import styles from "@/styles/Square.module.css";

export default function Square({ value, onSquareClick, isWinSquare }) {
  let className;
  if (!isWinSquare) {
    className = styles.square;
  } else {
    className = styles.square + " " + styles.win_square;
  }
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}
