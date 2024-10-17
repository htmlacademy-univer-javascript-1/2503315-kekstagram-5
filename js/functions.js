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


function isMeetingDuringWorktime (startWork, endWork, startMeeting, duration) {
  function convertToMinutes (time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  const startWorkMinutes = convertToMinutes(startWork);
  const endWorkMinutes = convertToMinutes(endWork);
  const startMeetingMinutes = convertToMinutes(startMeeting);
  const endMeetingMinutes = startMeetingMinutes + duration;

  return startMeetingMinutes >= startWorkMinutes & endMeetingMinutes <= endWorkMinutes;
}

console.log(isMeetingDuringWorktime('08:00', '17:30', '14:00', 90));
console.log(isMeetingDuringWorktime('8:0', '10:0', '8:00', 120));
console.log(isMeetingDuringWorktime('08:00', '17:30', '14:00', 300));
