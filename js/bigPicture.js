const bigPicture = document.querySelector('.big-picture');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const COMMENT_STEP = 5;
let commentShown = 0;
let currentComments = {};
let allComments = document.createDocumentFragment();

const createComment = ({ avatar, name, message }) => {
  const comment = commentTemplate.cloneNode(true);
  const image = comment.querySelector('.social__picture');

  image.src = avatar;
  image.alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};

const renderComments = (comments) => {
  commentsList.innerHTML = '';
  const fragment = document.createDocumentFragment();
  comments.forEach((item) => {
    const comment = createComment(item);
    fragment.append(comment);
  });
  allComments = fragment;
  const pictureCommentsCount = allComments.childNodes.length;
  commentShown = (pictureCommentsCount <= COMMENT_STEP) ? pictureCommentsCount : COMMENT_STEP;
  if (commentShown === pictureCommentsCount) {
    commentsLoader.classList.add('hidden');
  }
  commentsCount.childNodes[0].textContent = `${commentShown} из `;
  const showingComments = Array.from(allComments.cloneNode(true).childNodes).slice(0, commentShown);
  const newFragment = document.createDocumentFragment();
  showingComments.forEach((comment) => {
    newFragment.append(comment);
  });
  currentComments = newFragment;
  commentsList.append(currentComments);
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
};

function showPartComments() {
  commentsList.innerHTML = '';
  const pictureComentsCount = allComments.childNodes.length;
  if (currentComments.length !== 0) {
    commentShown = (commentShown + COMMENT_STEP >= pictureComentsCount) ? pictureComentsCount : commentShown + COMMENT_STEP;
  }
  if (commentShown === pictureComentsCount) {
    commentsLoader.classList.add('hidden');
  }
  commentsCount.childNodes[0].textContent = `${commentShown} из `;
  const showingComments = Array.from(allComments.cloneNode(true).childNodes).slice(0, commentShown);
  const fragment = document.createDocumentFragment();
  showingComments.forEach((comment) => {
    fragment.append(comment);
  });
  currentComments = fragment;
  commentsList.append(currentComments);
}

function onDocumentKeyDown(evt){
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

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
  commentsLoader.classList.remove('hidden');
  commentsCount.classList.remove('hidden');
  document.querySelector('.comments-count').textContent = data.comments.length;
  document.addEventListener('keydown', onDocumentKeyDown);

  createBigPicture(data);
  renderComments(data.comments);
};

cancelButton.addEventListener('click', () => {
  hideBigPicture();
});

commentsLoader.addEventListener('click', () => {
  showPartComments();
});

export {showBigPicture};