import GoToMove from "./GoToMove";

function History({ timeTravelHandler, history }) {
  const goToGameStartHandler = () => {
    timeTravelHandler(-1);
  };
  return (
    <div className="history">
      <h3>History</h3>
      <div className="goToMove">
        <button onClick={goToGameStartHandler}>Go to game start</button>
      </div>
      {history.map((ele, ind) => {
        return (
          <GoToMove
            key={ind}
            moveCount={ind}
            timeTravelHandler={timeTravelHandler}
            history={history}
          />
        );
      })}
    </div>
  );
}

export default History;
