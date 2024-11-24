const form = document.querySelector('#upload-select-image');
const imageUpload = form.querySelector('.img-upload__input');
const imageUploadCancel = form.querySelector('#upload-cancel');
const imageOverlay = form.querySelector('.img-upload__overlay');
const hashtags = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');
const pristine = new Pristine(form);

imageUpload.addEventListener('change', () => {
  imageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
});

function closeForm() {
  imageOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
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
  const tags = value.split(' ').map((tag) => tag.toLowerCase());
  const isMatchRegular = tags.every((tag) => /^#[a-z0-9]{1,19}$/i.test(tag)) || tags[0] === '';
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

pristine.addValidator(description,
  (value) => value.length <= 140,
  'Комментарий не может быть больше 140 символов');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    form.submit();
  }
});
