import { getBoardContext } from "../context/GameContext";

function Square({ makeMove, squareIndex }) {
  const {board} = getBoardContext();
  const { squares } = board;
  return (
    <div className="square">
      <button
        onClick={() => {
          makeMove(squareIndex);
        }}
      >
        {squares[squareIndex]}
      </button>
    </div>
  );
}

export default Square;
