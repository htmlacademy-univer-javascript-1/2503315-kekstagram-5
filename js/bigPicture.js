const bigPicture = document.querySelector('.big-picture');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsList = bigPicture.querySelector('social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const createComment = ({ avatar, name, message }) => {
  const comment = commentTemplate.cloneNode(true);
  const image = comment.querySelector('.social__img');

  image.src = avatar;
  image.alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};

const renderComments = (comments, commentsListElement) => {
  commentsListElement.innerHTML = '';

  const fragment = document.createDocumentFragment();
  comments.forEach((item) => {
    const comment = createComment(item);
    fragment.append(comment);
  });
  commentsListElement.append(fragment);
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
};

function onDocumentKeyDown(evt){
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCancelButton = () => {
  hideBigPicture();
};

const createBigPicture = ({ url, description, likes }) => {
  const image = bigPicture.querySelector('.big-picture__img img');
  image.src = url;
  image.alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  commentsCount.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeyDown);

  createBigPicture(data);
  renderComments(data.comments, commentsList);
};

cancelButton.addEventListener('click', onCancelButton);
export {showBigPicture};
