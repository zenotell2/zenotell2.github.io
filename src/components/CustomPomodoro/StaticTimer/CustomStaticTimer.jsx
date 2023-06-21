import "../../StaticPomodoro/StaticTimersStyles.css";
export default function CustomStaticTimer({
  buttonToStart,
  starterTimerData,
  startController,
  setCustomPomodoroStatus,
  setEstablishedCustPomodoro,
  setStartButton,
  pauseTimer,
  setCustomMinutes,
  setCustomSeconds,
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
                  setCustomPomodoroStatus(true);
                  setEstablishedCustPomodoro(false);
                  setCustomMinutes(0);
                  setCustomSeconds(0);
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
