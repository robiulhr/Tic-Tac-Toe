import Board from "./Board";
import History from "./History";
import PlayAgain from "./PlayAgain";
import { useWinnerContext } from "../context/GameContexts/WinnerContext";
import { useHistoriesContext } from "../context/GameContexts/HistoryContext";

function Game() {
  const winner = useWinnerContext();
  const histories = useHistoriesContext();
  return (
    <div className="game_wrapper">
      <div className="title">
        <h1 className="game_title">Tic Tac Toe Game </h1>
      </div>
      <div className="gameContents_upper">
        <Board />
        {histories.length > 0 && <History />}
      </div>
      <div className="gameContents_bottom">{winner && <PlayAgain />}</div>
    </div>
  );
}

export default Game;
