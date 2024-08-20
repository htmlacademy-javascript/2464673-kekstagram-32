//Фильтрация изображений от других пользователей
const filterElement = document.querySelector('.img-filters');
const PICTURE_COUNT = 10;//кол-во фоток при рандомном фильтре

//Объект с фильтрами
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

//фильтр по умолчанию
let currentFilter = Filter.DEFAULT;

//массив картинок
let pictures = [];

//функция рандомайзер
const sortRandomly = () => Math.random() - 0.5;


//функция для сортировки по кол-ву комментариев
const sortByComments = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

//основная функция фильтр
const getFilteredPicture = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(sortRandomly).slice(0, PICTURE_COUNT);
    case Filter.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};
//функция переключающая кнопки
const setOnFilterClick = (callback) => {
  filterElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    if (clickedButton.id === currentFilter) {
      return;
    }
    //активируем нужную кнопку
    filterElement
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;
    callback(getFilteredPicture());
  });
};

//блок с инициализацией компонента
const initImgInfo = (loadedPicture, callback) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPicture];
  setOnFilterClick(callback);
};

export { initImgInfo, getFilteredPicture };

