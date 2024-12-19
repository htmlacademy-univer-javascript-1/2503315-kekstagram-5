const template = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();

const renderPictures = (pictures) => {
  pictures.forEach(({ url, description, likes, comments, id }) => {
    const picture = template.cloneNode(true);
    const image = picture.querySelector('.picture__img');
    image.src = url;
    image.alt = description;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.dataset.id = id;
    picturesFragment.append(picture);
  });
  picturesList.append(picturesFragment);
};

const deletePictures = () => {
  const images = picturesList.querySelectorAll('a');
  for (let i = 0; i < images.length; i++) {
    picturesList.removeChild(images[i]);
  }
};

export { renderPictures, deletePictures };
