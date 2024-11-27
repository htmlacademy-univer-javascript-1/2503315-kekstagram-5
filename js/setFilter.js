const FILTERS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 1,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }];

const effectValue = document.querySelector('.effect-level__value');
const image = document.querySelector('.img-upload__preview img');
const effects = document.querySelector('.effects');
const slider = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');

const DEFAULT_VALUE = FILTERS[0];
let chosenEffect = DEFAULT_VALUE;
const isDefault = () => chosenEffect === DEFAULT_VALUE;

const openSlider = () => {
  sliderContainer.classList.remove('hidden');
};

const closeSlider = () => {
  sliderContainer.classList.add('hidden');
};

const updateSlider = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max
    },
    step: chosenEffect.step,
    start: chosenEffect.max
  });
  if (isDefault()) {
    closeSlider();
  } else {
    openSlider();
  }
};

effects.addEventListener('change', (evt) => {
  chosenEffect = FILTERS.find((filter) => evt.target.value === filter.name);
  image.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
});

noUiSlider.create(slider, {
  range: {
    min: DEFAULT_VALUE.min,
    max: DEFAULT_VALUE.max
  },
  start: DEFAULT_VALUE.max,
  step: DEFAULT_VALUE.step,
  connect: 'lower'
});

slider.noUiSlider.on('update', () => {
  const sliderValue = slider.noUiSlider.get();
  if (isDefault()) {
    image.style.filter = DEFAULT_VALUE.style;
  } else {
    image.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  }
  effectValue.value = sliderValue;
});

closeSlider();

const resetSlider = () => {
  chosenEffect = DEFAULT_VALUE;
  updateSlider();
};

export {resetSlider};
