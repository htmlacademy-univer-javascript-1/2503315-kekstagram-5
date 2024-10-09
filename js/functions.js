const isLengthSuitable = function(string, maxLength) {
  return string.length <= maxLength;
};

const isStringPalindrome = (string) => {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = normalizedString.length; i > 0; i--) {
    reversedString += normalizedString[i];
  }
  return normalizedString === reversedString;
};

const getNumber = (value) => {
  const stringValue = value.toString();
  let result = '';
  for (let i = 0; i < stringValue.length; i++) {
    if (Number(stringValue[i])) {
      result += stringValue[i];
    }
  }
  return Number(result);
};
