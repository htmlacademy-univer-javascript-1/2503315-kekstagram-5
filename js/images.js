import { generatePhotos } from './data';


const template = document.querySelector('#pictures').textContent.querySelector('.picture');
const picturesList = document.querySelector('.pictures');
const pictures = generatePhotos();
const picturesFragment = document.createDocumentFragment();

export const drawPictures = function() {
  pictures.forEach(({url, description, likes, comments}) => {
    const picture = template.cloneNode(true);
    const pictureImage = picture.querySelector('.picture__img');
    pictureImage.src = url;
    pictureImage.alt = description;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments;
    picturesFragment.append(picture);
  });

  picturesList.appendChild(picturesFragment);
};
