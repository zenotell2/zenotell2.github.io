function TimerFunctionality(hook, stopButton, timerStatus) {
  let [minutes, seconds] = document
    .querySelector(".timer-minutes")
    .innerHTML.split(":");
  [minutes, seconds] = [parseInt(minutes), parseInt(seconds)];

  if ((minutes || seconds) !== 0) {
    if (seconds === 0) {
      seconds = 59;
      minutes -= 1;
      hook(`${minutes}:${seconds}`);
    } else {
      seconds -= 1;
      hook(`${minutes}:${seconds}`);
    }
  } else {
    stopButton(false);
    timerStatus(STATUS_BLOCK.basic);
  }
}

const STATUS_BLOCK = {
  start: 1,
  pause: 0,
  basic: 2,
};

export { STATUS_BLOCK, TimerFunctionality };
