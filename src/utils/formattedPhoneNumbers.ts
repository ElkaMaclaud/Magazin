const PATTERN = /[^0-9]/g;
export const getInputNumbersValue = (value: string) => {
  if (value) {
    const newValue = value.replace(PATTERN, "");
    return newValue;
  }
  return "";
};
export const formatInputValue = (inputValue: string): string => {
  let inputNumbersValue = getInputNumbersValue(inputValue);
  let formatTempValue = "+7 (" + inputNumbersValue.slice(1, 4);

  if (inputNumbersValue[0] !== "7" && inputNumbersValue[0] !== "8") {
    inputNumbersValue = "7" + inputNumbersValue;
  }

  const middleThree = inputNumbersValue.slice(4, 7);
  const lastFour = inputNumbersValue.slice(7, 9);
  const latest = inputNumbersValue.slice(9, 11);

  if (inputNumbersValue.length > 9) {
    formatTempValue = `${formatTempValue}) ${middleThree}-${lastFour}-${latest}`;
  } else if (inputNumbersValue.length > 7) {
    formatTempValue = `${formatTempValue}) ${middleThree}-${lastFour}`;
  } else if (inputNumbersValue.length > 4) {
    formatTempValue = `${formatTempValue}) ${middleThree}`;
  }
  return formatTempValue;
};
