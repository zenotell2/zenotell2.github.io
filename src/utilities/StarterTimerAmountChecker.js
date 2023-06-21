// checking if obj has initial data and it is not 0
// if it is a number and not 0 return true and stop the loop if not continue checking
export default function StarterTimerAmountChecker(string) {
  const splittedString = string.split(":");
  for (let i = 0; i < splittedString.length; i++) {
    if (
      !Number.isNaN(parseInt(splittedString[i])) &&
      parseInt(splittedString[i]) !== 0
    ) {
      return true;
    }
  }

  return false;
}
