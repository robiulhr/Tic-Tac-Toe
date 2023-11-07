import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import { startTimer } from "../actions/GameActions";
import { getTimerContext } from "../context/GameContext";
export default function GamePopup() {
  const { timer, dispatchTimer } = getTimerContext();
  return (
    <Popup defaultOpen modal>
      {(close) => (
        <div className="modal">
          <button className="close">
            <Link to={"/"}>&times;</Link>
          </button>
          <div className="header"> Wanna Start Playing? </div>
          <div className="actions">
            <button
              className="button"
              onClick={() => {
                close();
                startTimer(dispatchTimer);
              }}
            >
              Yes
            </button>
            <Link to={"/"}>
              <button className="button">No</button>
            </Link>
          </div>
        </div>
      )}
    </Popup>
  );
}
