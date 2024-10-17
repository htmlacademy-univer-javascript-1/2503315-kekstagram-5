import { getRandomInteger } from './util';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Кекс',
  'Борис',
  'Круглик',
  'КастомСторис',
  'Либрариум',
  'Дискорд',
  'Юбуст',
  'Наггетс',
  'Александр Бурко'
];

const DESCRIPTIONS = [
  'Тёплый берег',
  'Оживлённая улица',
  'Цветущий луг',
  'Зимняя тишина',
  'Ночной город',
  'Суровый берег',
  'Роскошный интерьер',
  'Туманный лес',
  'Песчаные дюны',
  'Уютная хижина'
];

function generateComments() {
  const commentsCount = getRandomInteger(0, 30);
  const comments = [];
  for (let i = 0; i <= commentsCount; i++) {
    comments.push({
      id: i,
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
      name: NAMES[getRandomInteger(0, NAMES.length - 1)]
    });
  }
  return comments;
}

export function generatePhotos() {
  const photos = [];
  for (let i = 1; i <= 25; i++) {
    photos.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
      likes: getRandomInteger(15, 200),
      comments: generateComments()
    });
  }
  return photos;
}
