import { renderGallery } from './gallery.js';
import { getData } from './api.js';

const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const data = await getData();
const RENDER_DELAY = 500;

function debounce (callback, timeoutDelay = 500) {
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

function chooseFilter(images, filter) {
  renderGallery(images);
  filterDefault.classList.remove('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');
  filter.classList.add('img-filters__button--active');
}

filterDefault.addEventListener('click', debounce(() => {
  chooseFilter(data, filterDefault);
}, RENDER_DELAY));

filterRandom.addEventListener('click', debounce(() => {
  const allData = data.slice();
  const randomData = [];
  for (let i = 0; i < 10; i++) {
    const randomImageIndex = getRandomInt(0, allData.length - 1);
    randomData.push(allData[randomImageIndex]);
    allData.splice(randomImageIndex, 1);
  }
  chooseFilter(randomData, filterRandom);
}, RENDER_DELAY));

filterDiscussed.addEventListener('click', debounce(() => {
  const allData = data.slice();
  allData.sort((a, b) => b.comments.length - a.comments.length);
  chooseFilter(allData, filterDiscussed);
}, RENDER_DELAY));
