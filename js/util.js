const ALERT_SHOW_TIME = 5000;
const RENDER_DELAY = 500;

const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '100';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '30px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = 'red';
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

function debounce (callback, timeoutDelay = RENDER_DELAY) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(data, count) {
  const allData = data.slice();
  const randomData = [];
  for (let i = 0; i < count; i++) {
    const randomImageIndex = getRandomInt(0, allData.length - 1);
    randomData.push(allData[randomImageIndex]);
    allData.splice(randomImageIndex, 1);
  }
  return randomData;
}

export { showAlert, debounce, shuffleArray };
