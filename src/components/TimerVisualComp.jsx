////////////////////////////////////////ATTENTION////////////////////////////////////////

// GUYS, I'M SO SORRY FOR SHIT CODE BELOW, JUST STARTED LEARNING THIS TECHNOLOGY, SORRY AGAIN :)
// good have a good day! :)
////////////////////////////////////////ATTENTION////////////////////////////////////////

// styles
import "./TimerVisualStyles.css";
//

// react imports
import { useState, useEffect, useRef, useMemo } from "react";
//

// components
// static timers
import StaticTimers from "./StaticPomodoro/StaticTimers";
//
// custom timers
import CustomTimers from "./CustomPomodoro/CustomTimers";
import CustomStaticTimer from "./CustomPomodoro/StaticTimer/CustomStaticTimer";
//
//

// utilities
import {
  TimerFunctionality,
  STATUS_BLOCK,
} from "../utilities/TimerFunctionality";

import ChangeStylesMenuTab from "../utilities/ChangeMenuTabStyleLoop";
import StarterTimerAmountChecker from "../utilities/StarterTimerAmountChecker";
//

// img import
import customs from "../icons/211670_b_gear_icon.png";
//

export default function Timer() {
  // variables to change styles
  // static
  const [pomodoroStatus, setPomodoroStatus] = useState(true);
  const [shortBreakStatus, setshortBreakStatus] = useState(false);
  const [longBreakStatus, setlongBreakStatus] = useState(false);
  //
  // custom
  const [customPomodoroStatusWrapper, setCustomPomodoroStatusWrapper] =
    useState(false);
  const [customPomodoroStatus, setCustomPomodoroStatus] = useState(true);
  const [establishCustomPomodoro, setEstablishedCustPomodoro] = useState(false);

  const [customShortBreakWrapper, setCustomShortBreakWrapper] = useState(false);
  const [customShortBreakStatus, setCustomShortBreakStatus] = useState(true);
  const [establishCustomShortBreak, setEstablishedCustomShortBreak] =
    useState(false);

  const [customLongBreakWrapper, setCustomLongBreakWrapper] = useState(false);
  const [customLongBreakStatus, setCustomLongBreakStatus] = useState(true);
  const [establishCustomLongBreak, setEstablishedCustomLongBreak] =
    useState(false);
  //
  //////////////////////////////////////////////////

  // button status
  const [startButton, setStartButton] = useState(false);
  ////////////////////////////////////////////////////

  // started time amount
  const [timerAmount, setTimerAmount] = useState("25:00");
  //////////////////////////////////////////////////////

  // custom timer
  const [customMinutes, setCustomMinutes] = useState(0);
  const [customSeconds, setcustomSeconds] = useState(0);

  const [customShortBreakMin, setCustomShortBreakMin] = useState(0);
  const [customShortBreakSec, setCustomShortBreakSec] = useState(0);

  const [customLongBreakMin, setCustomLongBreakMin] = useState(0);
  const [customLongBreakSec, setCustomLongBreakSec] = useState(0);
  //////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////
  const [timerStatus, setTimerStatus] = useState(STATUS_BLOCK.basic);

  // open/close modal custom window
  const [showCustomModal, setShowCustomModal] = useState(false);

  const intervar = useRef(null);

  useEffect(() => {
    if (timerStatus === STATUS_BLOCK.start) {
      intervar.current = setInterval(() => {
        TimerFunctionality(setTimerAmount, setStartButton, setTimerStatus);
      }, 1000);
    } else if (timerStatus === STATUS_BLOCK.basic && intervar.current) {
      clearInterval(intervar.current);
    }
    return () => {
      clearInterval(intervar.current);
    };
  });

  const startTimer = () => setTimerStatus(STATUS_BLOCK.start);
  const pauseTimer = () => setTimerStatus(STATUS_BLOCK.pause);

  function StartOrGoTimer() {
    if (startButton) {
      setStartButton(false);
      pauseTimer();
    } else {
      setStartButton(true);
      startTimer();
    }
  }
  ////////////////////////////////////////////////////

  // creating BLOCKS_STATUS_MEMORY to write each menu tab its identify data
  // wrapping it in useMemo hook to cache it and recache it when statuses or other data has changed
  const BLOCKS_STATUS_MEMORY = useMemo(() => {
    return {
      staticPomodoro: {
        id: "staticPomodoro",
        status: pomodoroStatus,
        function: setPomodoroStatus,
        starterTimerAmount: "25:00",
      },
      staticShortBreaks: {
        id: "staticShortBreaks",
        status: shortBreakStatus,
        function: setshortBreakStatus,
        starterTimerAmount: "5:00",
      },
      staticLongBreaks: {
        id: "staticLongBreaks",
        status: longBreakStatus,
        function: setlongBreakStatus,
        starterTimerAmount: "15:00",
      },
      customPomodoro: {
        id: "customPomodoro",
        status: customPomodoroStatusWrapper,
        function: setCustomPomodoroStatusWrapper,
        starterTimerAmount: `${customMinutes}:${customSeconds}`,
      },
      customShortBreak: {
        id: "customShortBreak",
        status: customShortBreakWrapper,
        function: setCustomShortBreakWrapper,
        starterTimerAmount: `${customShortBreakMin}:${customShortBreakSec}`,
      },
      customLongBreak: {
        id: "customLongBreak",
        status: customLongBreakWrapper,
        function: setCustomLongBreakWrapper,
        starterTimerAmount: `${customLongBreakMin}:${customLongBreakSec}`,
      },
    };
  }, [
    pomodoroStatus,
    shortBreakStatus,
    longBreakStatus,

    customPomodoroStatusWrapper,
    customMinutes,
    customSeconds,

    customShortBreakWrapper,
    customShortBreakMin,
    customShortBreakSec,

    customLongBreakWrapper,
    customLongBreakMin,
    customLongBreakSec,
  ]);

  // if user click static (not custom tabs) this function will be called
  function GetButtonClicked(choseId) {
    // after its calling we get values of BLOCKS_STATUS_MEMORY obj
    const values = Object.values(BLOCKS_STATUS_MEMORY);

    // stopping previous timer and move him to another timer with another data
    setTimerStatus(STATUS_BLOCK.basic);
    // change button style
    setStartButton(false);

    // calling fuction that set 'active' class for chosen tab and disable othres
    ChangeStylesMenuTab(values, choseId, setTimerAmount);
  }

  // if user click custom tabs this function will be called with parameters as:
  // chosenId - parametr which we will use in another funtion to find obj by id in BLOCKS_STATUS_MEMORY and change status in it

  // style parameters:
  // starterTimerAmount - this parameter need for cheching if obj has inputed seconds and minutes if not, use specific styles (hidden styles)
  // setEstablished - this parameter need for showing person's entered minutes/seconds (but it shows only if 'starterTimerAmount' has inputed minutes and seconds in other case it hidden)
  // setCustomStatus - and this one show or hide entering fields (if person enter data and set it hide it in other case show)
  function GetCustomButtonClicked(
    chosenId,
    starterTimerAmount,
    setEstablished,
    setCustomStatus
  ) {
    const values = Object.values(BLOCKS_STATUS_MEMORY);

    // checking if starterTimerAmount has initial data
    if (StarterTimerAmountChecker(starterTimerAmount)) {
      // show timer only
      setEstablished(true);
    } else {
      // if not, close timer and simultaneously null data in entering fields and show entering data block
      setEstablished(false);
      setCustomStatus(true);
    }

    ChangeStylesMenuTab(values, chosenId, setTimerAmount);
  }

  return (
    <div className="timer-wrapper">
      <div
        className="timer"
        style={
          showCustomModal
            ? {
                borderRadius: "0px",
                borderTopLeftRadius: "6px",
                borderBottomLeftRadius: "6px",
              }
            : null
        }
      >
        <div className="timer-type-wrapper">
          <button
            className={pomodoroStatus ? "timer-type-active" : "timer-type"}
            onClick={() => GetButtonClicked("staticPomodoro")}
          >
            Pomodoro
          </button>
          <button
            className={shortBreakStatus ? "timer-type-active" : "timer-type"}
            onClick={() => GetButtonClicked("staticShortBreaks")}
          >
            Short Break
          </button>
          <button
            className={longBreakStatus ? "timer-type-active" : "timer-type"}
            onClick={() => GetButtonClicked("staticLongBreaks")}
          >
            Long Break
          </button>

          <div
            style={{ display: "flex" }}
            onClick={
              showCustomModal
                ? () => setShowCustomModal(false)
                : () => setShowCustomModal(true)
            }
          >
            <img src={customs} alt="custom" width={18}></img>
          </div>

          <>
            {showCustomModal && (
              <div className="custom-modal-wrapper-win">
                <div className="custom-blocks-optionally">
                  {/* *optionally* */}
                  <button
                    className={
                      customPomodoroStatusWrapper
                        ? "timer-type-active"
                        : "timer-type"
                    }
                    onClick={() =>
                      GetCustomButtonClicked(
                        "customPomodoro",
                        BLOCKS_STATUS_MEMORY.customPomodoro.starterTimerAmount,
                        setEstablishedCustPomodoro,
                        setCustomPomodoroStatus
                      )
                    }
                  >
                    Custom Pomodoro
                  </button>

                  <button
                    className={
                      customShortBreakWrapper
                        ? "timer-type-active"
                        : "timer-type"
                    }
                    onClick={() =>
                      GetCustomButtonClicked(
                        "customShortBreak",
                        BLOCKS_STATUS_MEMORY.customShortBreak
                          .starterTimerAmount,
                        setEstablishedCustomShortBreak,
                        setCustomShortBreakStatus
                      )
                    }
                  >
                    Custom Short Break
                  </button>

                  <button
                    className={
                      customLongBreakWrapper
                        ? "timer-type-active"
                        : "timer-type"
                    }
                    onClick={() =>
                      GetCustomButtonClicked(
                        "customLongBreak",
                        BLOCKS_STATUS_MEMORY.customLongBreak.starterTimerAmount,
                        setEstablishedCustomLongBreak,
                        setCustomLongBreakStatus
                      )
                    }
                  >
                    Custom Long Break
                  </button>
                  {/*  */}
                </div>
              </div>
            )}
          </>
        </div>

        {/* static timers --start*/}
        <>
          {(pomodoroStatus || shortBreakStatus || longBreakStatus) && (
            <StaticTimers
              buttonToStart={startButton}
              starterTimerData={timerAmount}
              startController={StartOrGoTimer}
              setTimerPomodoroAmount={setTimerAmount}
              setStartButton={setStartButton}
              pauseTimer={pauseTimer}
              resetAmount={
                pomodoroStatus
                  ? BLOCKS_STATUS_MEMORY.staticPomodoro.starterTimerAmount
                  : shortBreakStatus
                  ? BLOCKS_STATUS_MEMORY.staticShortBreaks.starterTimerAmount
                  : BLOCKS_STATUS_MEMORY.staticLongBreaks.starterTimerAmount
              }
            ></StaticTimers>
          )}
        </>
        {/* --end */}

        {/* custom pomodoro */}
        <>
          {customPomodoroStatusWrapper && (
            <>
              {customPomodoroStatus && (
                <CustomTimers
                  customMinutes={customMinutes}
                  customSeconds={customSeconds}
                  setCustomMinutes={setCustomMinutes}
                  setCustomSeconds={setcustomSeconds}
                  setCustomPomodoroStatus={setCustomPomodoroStatus}
                  setEstablishedCustPomodoro={setEstablishedCustPomodoro}
                  setTimerAmount={setTimerAmount}
                ></CustomTimers>
              )}
              {establishCustomPomodoro && (
                <CustomStaticTimer
                  buttonToStart={startButton}
                  starterTimerData={timerAmount}
                  startController={StartOrGoTimer}
                  setCustomPomodoroStatus={setCustomPomodoroStatus}
                  setEstablishedCustPomodoro={setEstablishedCustPomodoro}
                  setStartButton={setStartButton}
                  pauseTimer={pauseTimer}
                  setCustomMinutes={setCustomMinutes}
                  setCustomSeconds={setcustomSeconds}
                ></CustomStaticTimer>
              )}
            </>
          )}
        </>
        {/*  */}

        {/* custom pomodoro short break */}
        <>
          {customShortBreakWrapper && (
            <>
              {customShortBreakStatus && (
                <CustomTimers
                  customMinutes={customShortBreakMin}
                  customSeconds={customShortBreakSec}
                  setCustomMinutes={setCustomShortBreakMin}
                  setCustomSeconds={setCustomShortBreakSec}
                  setCustomPomodoroStatus={setCustomShortBreakStatus}
                  setEstablishedCustPomodoro={setEstablishedCustomShortBreak}
                  setTimerAmount={setTimerAmount}
                ></CustomTimers>
              )}
              {establishCustomShortBreak && (
                <CustomStaticTimer
                  buttonToStart={startButton}
                  starterTimerData={timerAmount}
                  startController={StartOrGoTimer}
                  setCustomPomodoroStatus={setCustomShortBreakStatus}
                  setEstablishedCustPomodoro={setEstablishedCustomShortBreak}
                  setStartButton={setStartButton}
                  pauseTimer={pauseTimer}
                  setCustomMinutes={setCustomShortBreakMin}
                  setCustomSeconds={setCustomShortBreakSec}
                ></CustomStaticTimer>
              )}
            </>
          )}
        </>
        {/*  */}

        {/* custom pomodoro short long */}
        <>
          {customLongBreakWrapper && (
            <>
              {customLongBreakStatus && (
                <CustomTimers
                  customMinutes={customLongBreakMin}
                  customSeconds={customLongBreakSec}
                  setCustomMinutes={setCustomLongBreakMin}
                  setCustomSeconds={setCustomLongBreakSec}
                  setCustomPomodoroStatus={setCustomLongBreakStatus}
                  setEstablishedCustPomodoro={setEstablishedCustomLongBreak}
                  setTimerAmount={setTimerAmount}
                ></CustomTimers>
              )}
              {establishCustomLongBreak && (
                <CustomStaticTimer
                  buttonToStart={startButton}
                  starterTimerData={timerAmount}
                  startController={StartOrGoTimer}
                  setCustomPomodoroStatus={setCustomLongBreakStatus}
                  setEstablishedCustPomodoro={setEstablishedCustomLongBreak}
                  setStartButton={setStartButton}
                  pauseTimer={pauseTimer}
                  setCustomMinutes={setCustomLongBreakMin}
                  setCustomSeconds={setCustomLongBreakSec}
                ></CustomStaticTimer>
              )}
            </>
          )}
        </>
        {/*  */}
      </div>
    </div>
  );
}
