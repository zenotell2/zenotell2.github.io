import "./CustomTimersStyles.css";

export default function CustomTimers({
  customMinutes,
  customSeconds,
  setCustomMinutes,
  setCustomSeconds,
  setCustomPomodoroStatus,
  setEstablishedCustPomodoro,
  setTimerAmount,
}) {
  function CheckingValitadion(data, typeDataSet) {
    if (data.length <= 2 && parseInt(data) >= 0) {
      typeDataSet(data);
    }
  }

  function SubmittingPersonalTimerSet(e) {
    e.preventDefault();
    setCustomPomodoroStatus(false);
    setEstablishedCustPomodoro(true);

    setTimerAmount(
      `${e.target.custom_pomodoro_min.value}:${e.target.custom_pomodoro_sec.value}`
    );
  }

  return (
    <div className="set-personal-pomodoro">
      <form onSubmit={SubmittingPersonalTimerSet}>
        <div className="inputs-parent-wrapper">
          <div className="inputs-wrapper">
            <label htmlFor="pomodoro-min">Minutes</label>
            <input
              className="pomodoro-input"
              id="pomodoro-min"
              type="number"
              value={customMinutes}
              name="custom_pomodoro_min"
              onChange={(e) =>
                CheckingValitadion(e.target.value, setCustomMinutes)
              }
            ></input>
          </div>
          <div className="inputs-wrapper">
            <label htmlFor="pomodoro-sec">Seconds</label>
            <input
              className="pomodoro-input"
              id="pomodoro-sec"
              type="number"
              value={customSeconds}
              name="custom_pomodoro_sec"
              onChange={(e) =>
                CheckingValitadion(e.target.value, setCustomSeconds)
              }
            ></input>
          </div>
        </div>

        <div className="start-button-wrapper">
          <button className="start" type="submit">
            Set Timer!
          </button>
        </div>
      </form>
    </div>
  );
}
