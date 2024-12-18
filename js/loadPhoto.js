const preview = document.querySelector('.img-upload__preview img');
const fileChooser = document.querySelector('#upload-file');
const filterPreviews = document.querySelectorAll('.effects__preview');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((ext) => fileName.endsWith(ext));
  if (matches) {
    const url = URL.createObjectURL(file);
    preview.src = url;
    filterPreviews.forEach((item) => {
      item.style.backgroundImage = `url(${url})`;
    });
  }
});
