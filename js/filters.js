import { renderGallery } from './gallery.js';
import { debounce, shuffleArray } from './util.js';
import { data } from './main.js';

const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');

const ACTIVE_CLASS = 'img-filters__button--active';
const COUNT_RANDOM_PICTURES = 10;

const availableFilters = {
  'filter-default': () => data.slice(),
  'filter-random': () => shuffleArray(data.slice(), COUNT_RANDOM_PICTURES),
  'filter-discussed': () => data.slice().sort((first, second) => first.comments.length - second.comments.length)
};

const isButton = (evt) => evt.target.tagName === 'BUTTON';

const onImageFormClick = debounce((evt) => {
  if (isButton(evt)) {
    renderGallery(availableFilters[evt.target.id]());
  }
});

const onButtonClick = (evt) => {
  if (isButton(evt)) {
    const selectedButton = document.querySelector(`.${ACTIVE_CLASS}`);

    if (selectedButton) {
      selectedButton.classList.remove(ACTIVE_CLASS);
    }
    evt.target.classList.add(ACTIVE_CLASS);
  }
};

imgFiltersForm.addEventListener('click', onImageFormClick);

imgFiltersForm.addEventListener('click', onButtonClick);
