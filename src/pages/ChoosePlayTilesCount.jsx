import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { getPlayingSettingsContext } from "../context/PlaySettingsContext";
import { setTileCount } from "../actions/PlayingSettingsActions";

const boardValueArr = ["", 0, "X"];
const threeBoardArray = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => boardValueArr[Math.round(Math.random() * 2)]));
const fourBoardArray = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => boardValueArr[Math.round(Math.random() * 2)]));
const fiveBoardArray = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => boardValueArr[Math.round(Math.random() * 2)]));

function ChoosePlayTilesCount() {
  const {playingSettings, dispatchPlayingSettings} = getPlayingSettingsContext();
  if (!playingSettings.playingType) return <Navigate to="/" replace={true} />;
  const [boardContainerHover, setBoardContainerHover] = useState(null);
  const [boardContainerSelected, setBoardContainerSelected] = useState(null);
  const [threeBoardItemHover, setthreeBoardItemHover] = useState(null);
  const [fourBoardItemHover, setFourBoardItemHover] = useState(null);
  const [fiveBoardItemHover, setFiveBoardItemHover] = useState(null);

  let threeBoardIndex = 0;
  let fourBoardIndex = 0;
  let fiveBoardIndex = 0;

  return (
    <div style={style.chooseTilesCount}>
      <h2>Choose Tiles Count</h2>
      <div style={style.allTilesContainer}>
        <div
          onMouseOver={() => {
            setBoardContainerHover(0);
          }}
          onMouseLeave={() => {
            setBoardContainerHover(null);
          }}
          onClick={() => {
            setBoardContainerSelected(0);
            setTileCount(dispatchPlayingSettings, 3);
          }}
          style={boardContainerHover === 0 || boardContainerSelected === 0 ? { ...style.boardContainer } : { ...boardContainerHovered }}
        >
          {threeBoardArray.map((ele, ind) => {
            return (
              <div key={`threeBoard${ind}row`} style={style.boardRow}>
                {ele.map((element, index) => {
                  const boardItemIndex = threeBoardIndex;
                  const threeBoardItem = (
                    <div
                      key={`threeBoard${threeBoardIndex}column`}
                      onMouseOver={() => {
                        setthreeBoardItemHover(boardItemIndex);
                      }}
                      onMouseLeave={() => {
                        setthreeBoardItemHover(null);
                      }}
                      style={threeBoardItemHover !== threeBoardIndex ? { ...style.boardItem } : { ...boardItemHovered }}
                    >
                      {element}
                    </div>
                  );
                  threeBoardIndex++;
                  return threeBoardItem;
                })}
              </div>
            );
          })}
          <h4 style={style.boardTitle}>3 by 3 Tiles</h4>
        </div>

        <div
          style={boardContainerHover === 1 || boardContainerSelected === 1 ? { ...style.boardContainer } : { ...boardContainerHovered }}
          onMouseOver={() => {
            setBoardContainerHover(1);
          }}
          onMouseLeave={() => {
            setBoardContainerHover(null);
          }}
          onClick={() => {
            setBoardContainerSelected(1);
            setTileCount(dispatchPlayingSettings, 4);
          }}
        >
          {fourBoardArray.map((ele, ind) => {
            return (
              <div key={`fourBoard${ind}row`} style={style.boardRow}>
                {ele.map((element, index) => {
                  const boardItemIndex = fourBoardIndex;
                  const fourBoardItem = (
                    <div
                      key={`fourBoard${fourBoardIndex}column`}
                      onMouseOver={() => {
                        setFourBoardItemHover(boardItemIndex);
                      }}
                      onMouseLeave={() => {
                        setFourBoardItemHover(null);
                      }}
                      style={fourBoardItemHover !== fourBoardIndex ? { ...style.boardItem } : { ...boardItemHovered }}
                    >
                      {element}
                    </div>
                  );
                  fourBoardIndex++;
                  return fourBoardItem;
                })}
              </div>
            );
          })}
          <h4 style={style.boardTitle}>4 by 4 Tiles</h4>
        </div>
        <div
          onMouseOver={() => {
            setBoardContainerHover(2);
          }}
          onMouseLeave={() => {
            setBoardContainerHover(null);
          }}
          onClick={() => {
            setBoardContainerSelected(2);
            setTileCount(dispatchPlayingSettings, 5);
          }}
          style={boardContainerHover === 2 || boardContainerSelected === 2 ? { ...style.boardContainer } : { ...boardContainerHovered }}
        >
          {fiveBoardArray.map((ele, ind) => {
            return (
              <div key={`fiveBoard${ind}row`} style={style.boardRow}>
                {ele.map((element, index) => {
                  const boardItemIndex = fiveBoardIndex;
                  const fiveBoardItem = (
                    <div
                      key={`fiveBoard${fiveBoardIndex}column`}
                      onMouseOver={() => {
                        setFiveBoardItemHover(boardItemIndex);
                      }}
                      onMouseLeave={() => {
                        setFiveBoardItemHover(null);
                      }}
                      style={fiveBoardItemHover !== fiveBoardIndex ? { ...style.boardItem } : { ...boardItemHovered }}
                    >
                      {element}
                    </div>
                  );
                  fiveBoardIndex++;
                  return fiveBoardItem;
                })}
              </div>
            );
          })}
          <h4 style={style.boardTitle}>5 by 5 Tiles</h4>
        </div>
      </div>
      <div>
        <Link to={"/chooseplayinglevel"}>
          <button type="submit" style={style.goBtn}>
            Go
          </button>
        </Link>
      </div>
    </div>
  );
}

const style = {
  chooseTilesCount: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  allTilesContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  boardContainer: {
    margin: "80px 40px",
    padding: "20px",
    border: "3px solid black",
    cursor: "pointer",
    background: "#ffffff45",
  },
  tileImg: {
    height: "200px",
  },
  goBtn: {
    minWidth: "100px",
  },
  boardRow: {
    display: "flex",
    alignItems: "center",
  },
  boardItem: {
    padding: "10px",
    border: "2px solid black",
    minWidth: "50px",
    minHeight: "50px",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    fontSize: "15px",
    fontWeight: 900,
  },
  boardTitle: {
    paddingTop: "20px",
    textAlign: "center",
  },
};
const boardContainerHovered = {
  ...style.boardContainer,
  border: "3px solid #00000024",
  background: "#ffffff1a",
};
const boardItemHovered = {
  ...style.boardItem,
  border: "3px solid black",
  background: "#282c34",
};

export default ChoosePlayTilesCount;
