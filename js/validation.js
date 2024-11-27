import { resetScale } from './changeScale.js';
import {resetSlider} from './setFilter.js';


const form = document.querySelector('#upload-select-image');
const imageUpload = form.querySelector('.img-upload__input');
const imageUploadCancel = form.querySelector('#upload-cancel');
const imageOverlay = form.querySelector('.img-upload__overlay');
const hashtags = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

imageUpload.addEventListener('change', () => {
  imageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
});

function closeForm() {
  imageOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  form.reset();
  resetScale();
  resetSlider();
  pristine.reset();

  document.removeEventListener('keydown', onDocumentKeyDown);
}

function onDocumentKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    const isTextFieldFocused = document.activeElement === hashtags
  || document.activeElement === description;
    if (!isTextFieldFocused) {
      closeForm();
    }
  }
}

imageUploadCancel.addEventListener('click', closeForm);

function validateHashtags(value) {
  const tags = value.split(' ').map((tag) => tag.toLowerCase()).filter((item) => item && item.trim() !== '');
  const isMatchRegular = tags.every((tag) => /^#[a-zа-яё0-9]{1,19}$/i.test(tag));
  if (tags.length > 5) {
    return {valid: false, message: 'Максимальное количество хэш-тегов: 5'};
  } else if (new Set(tags).size !== tags.length) {
    return {valid: false, message: 'Хэш-теги не могут повторяться'};
  } else if (!isMatchRegular) {
    return {valid: false, message: 'Некорректный формат хэш-тегов'};
  }
  return {valid: true};
}

pristine.addValidator(hashtags,
  (value) => validateHashtags(value).valid,
  (value) => validateHashtags(value).message
);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    form.submit();
  }
});
