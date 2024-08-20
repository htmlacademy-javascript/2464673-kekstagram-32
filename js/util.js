const ALERT_SHOW_TIME = 5000;

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
const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Функция устранения дребезга

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

// Функция пропуска кадров
function throttle (callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export {DESCRIPTION, MESSAGES, NAMES};
export {showAlert, isEscapeKey, createPhotoObject, createCommentObject, getRandomInteger, getRandomArreyElement, debounce, throttle};
