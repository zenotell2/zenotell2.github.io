import "./StaticTimersStyles.css";

export default function StaticTimers({
  buttonToStart,
  starterTimerData,
  startController,
  setTimerPomodoroAmount,
  setStartButton,
  pauseTimer,
  resetAmount,
}) {
  return (
    <div className="static-pomodoro">
      <div className="timer-minutes">{starterTimerData}</div>

      <div className="start-button-wrapper">
        <button
          className={buttonToStart ? "start-active" : "start"}
          onClick={startController}
        >
          {buttonToStart ? "PAUSE" : "START"}
        </button>

        <div className="reset-buttons-wrapper">
          <>
            {buttonToStart && (
              <button
                className="reset-pomodoro"
                onClick={() => {
                  setTimerPomodoroAmount(resetAmount);
                  setStartButton(false);
                  pauseTimer();
                }}
              >
                R
              </button>
            )}
          </>
        </div>
      </div>
    </div>
  );
}
