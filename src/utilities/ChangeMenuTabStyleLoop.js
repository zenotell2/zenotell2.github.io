export default function ChangeStylesMenuTab(values, chosenId, setTimerAmount) {
  for (let i = 0; i < values.length; i++) {
    // checking if chosenId equal id in the obj to
    if (values[i].id === chosenId) {
      setTimerAmount(values[i].starterTimerAmount);
      values[i].function(true);
      // for others set false state
    } else {
      values[i].function(false);
    }
  }
}
