function Square({ squares, squareCount, makeMove}) {
  return (
    <div className="square">
      <button onClick={()=>{ makeMove(squareCount)}}>{squares[squareCount]}</button>
    </div>
  );
}

export default Square;
