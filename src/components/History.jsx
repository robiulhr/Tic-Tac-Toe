import GoToMove from './GoToMove'


function History({ timeTravelStateHandler, history, squareHandler }) {
    const goToGameStartHandler = () => {
      timeTravelStateHandler(-1);
      squareHandler(true, new Array(9).fill(null));
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
              timeTravelStateHandler={timeTravelStateHandler}
              history={history}
              squareHandler={squareHandler}
            />
          );
        })}
      </div>
    );
  }

export default History