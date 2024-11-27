const scaleValue = document.querySelector('.scale__control--value');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const image = document.querySelector('.img-upload__preview img');

const STANDART_VALUE = 100;
const STEP = 25;

function changeScale(value) {
  image.style.transform = `scale(${value / STANDART_VALUE})`;
  scaleValue.value = `${value}%`;
}

scaleSmaller.addEventListener('click', () => {
  const value = parseInt(scaleValue.value, 10);
  const newValue = value === STEP ? STEP : value - STEP;
  changeScale(newValue);
});

scaleBigger.addEventListener('click', () => {
  const value = parseInt(scaleValue.value, 10);
  const newValue = value === STANDART_VALUE ? STANDART_VALUE : value + STEP;
  changeScale(newValue);
});

const resetScale = () => changeScale(STANDART_VALUE);

export {resetScale};
