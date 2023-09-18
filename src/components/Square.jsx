import { getSquares } from "../context/GameContexts/GameSquareContext";

function Square({ makeMove,squareIndex }) {
  const squares = getSquares()

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
