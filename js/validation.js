import { resetScale } from './changeScale.js';
import { resetSlider } from './setFilter.js';
import { postData } from './api.js';
import { showErrorMessage, showSuccessMessage } from './message.js';


const form = document.querySelector('#upload-select-image');
const imageUpload = form.querySelector('.img-upload__input');
const imageUploadCancel = form.querySelector('#upload-cancel');
const imageOverlay = form.querySelector('.img-upload__overlay');
const hashtags = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');
const imageUploadSubmit = form.querySelector('#upload-submit');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...'
};

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

function validateDescription(value) {
  if (value.length > 140) {
    return {valid: false, message: 'Максимальная длина описания: 140 символов.'};
  }
  return {valid: true};
}

const blockSubmitButton = () => {
  imageUploadSubmit.disabled = true;
  imageUploadSubmit.textContent = SubmitButtonText.SENDING;
};

const unlockSubmitButton = () => {
  imageUploadSubmit.disabled = false;
  imageUploadSubmit.textContent = SubmitButtonText.IDLE;
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      const data = new FormData(evt.target);
      postData(data)
        .then(() => {
          showSuccessMessage();
          onSuccess();
          unlockSubmitButton();
        })
        .catch(() => {
          showErrorMessage();
          unlockSubmitButton();
        });
    }
  });
};

pristine.addValidator(hashtags,
  (value) => validateHashtags(value).valid,
  (value) => validateHashtags(value).message
);

pristine.addValidator(description,
  (value) => validateDescription(value).valid,
  (value) => validateDescription(value).message
);

export { setUserFormSubmit, closeForm };
