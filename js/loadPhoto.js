const preview = document.querySelector('.img-upload__preview img');
const fileChooser = document.querySelector('#upload-file');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((ext) => fileName.endsWith(ext));
  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});
