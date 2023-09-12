function Timer({ timerHandler, timerRunning,timerValue }) {
  return (
    <div>
      {timerRunning === "stoped" && (
        <button
          onClick={() => {
            timerHandler("running");
          }}
        >
          Start Timer
        </button>
      )}

      {timerRunning === "running" && (
        <>
          <button
            onClick={() => {
              timerHandler("stoped");
            }}
          >
            Stop Timer
          </button>
          <div>{`${timerValue} second`}</div>
        </>
      )}
    </div>
  );
}

export default Timer;
