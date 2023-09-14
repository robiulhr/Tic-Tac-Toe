import Game from "../components/Game";
import PlayerMoveProvider from "../context/GameContexts/PlayerMoveContext";
import TimeTravelProvider from "../context/GameContexts/TimeTravelContext";
import HistoryProvider from "../context/GameContexts/HistoryContext";
import TimerProvider from "../context/GameContexts/TimerContext";
import SquaresProvider from "../context/GameContexts/GameSquareContext";
import WinnerProvider from "../context/GameContexts/WinnerContext";
function PlayDual() {
  return (
    <div>
      <PlayerMoveProvider>
        <TimeTravelProvider>
          <HistoryProvider>
            <TimerProvider>
              <WinnerProvider>
                <SquaresProvider>
                  <Game />
                </SquaresProvider>
              </WinnerProvider>
            </TimerProvider>
          </HistoryProvider>
        </TimeTravelProvider>
      </PlayerMoveProvider>
    </div>
  );
}

export default PlayDual;
