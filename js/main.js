const NAMES = ['Софи', 'Максимилиан', 'Ромео', 'Сантьяго', 'Марио', 'Колумб', 'Юпитер', 'Доминго', 'Олимпия', 'Юлианна'
];
const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально. ', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];//комменты
const DESCRIPTION = ['Ничего личного', 'Просто так', 'Пусть будет здесь', 'Прекрасный вид', 'На чиле', 'Ноу коммент', 'Такая вот история', 'Жить хорошо', 'Могло быть и лучше', 'Мгновение - ты прекрасно!'
];
// функция, которая создает объект фото
const createPhotoObject = (id, url, description, likes, comments) => ({
  id: id,
  url: url,
  description: description,
  likes: likes,
  comments: comments
});
// функция, которая создает объект комментария к фото

const createCommentObject = (id, avatar, message, name) => ({
  id: id,
  avatar: avatar,
  message: message,
  name: name
});


// функция - генератор случайных чисел
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};


// функция, которая выбирает случайный элемент массива
const getRandomArreyElement = (array) => {
  const min = 0;
  const max = array.length - 1;
  const random = getRandomInteger(min, max);
  return array[random];
};
// проверка Escape
// const isEscapeKey = (evt) => evt.key === 'Escape';

let commentId = 0;

const getCommentObjectArray = (qtt) => {
  const arrayResult = [];
  for (let i = 0; i < qtt; i++) {
    const ind = getRandomInteger(1, 6);
    const randomCommentObject = createCommentObject(
      commentId,
      `img/avatar-${ind}.svg`,
      getRandomArreyElement(MESSAGES),
      getRandomArreyElement(NAMES)
    );
    commentId++;
    arrayResult.push(randomCommentObject);
  }
  return arrayResult;
};

const createPhotoObjectArray = () => {
  const arrayResultFinish = [];
  for (let i = 0; i < 25; i++) {
    const id = i + 1;
    arrayResultFinish.push(
      createPhotoObject(
        id,
        `photos/${id}`.jpg,
        getRandomArreyElement(DESCRIPTION),
        getRandomInteger(15, 200),
        getCommentObjectArray(getRandomInteger(0,30))
      )
    );
  }
  return arrayResultFinish;
};

createPhotoObjectArray();
