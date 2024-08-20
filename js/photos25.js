import { getData } from './api';
import { initImgInfo } from './filter.js';
import { debounce } from './util.js';

const pictureContainer = document.querySelector('.pictures'); //контейнер для фото пользователей
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture'); //шаблон
const photoObjectPromise = getData();
let data = [];
const listFragment = document.createDocumentFragment();


let photoObjectArray = [];

const paintPicture = ({id, url, description, comments, likes}) => {
  const similarPicture = pictureTemplate.cloneNode(true); // клонируем шаблон
  similarPicture.dataset.pictureId = id;
  similarPicture.querySelector('.picture__img').src = url;
  similarPicture.querySelector('.picture__img').alt = description;
  similarPicture.querySelector('.picture__comments').textContent = comments.length;
  similarPicture.querySelector('.picture__likes').textContent = likes;
  listFragment.appendChild(similarPicture);
  pictureContainer.appendChild(listFragment); //вставляем клон шаблона в конец контейнера
};

const clearContainer = () => {
  pictureContainer.querySelectorAll('.picture').forEach((elem) => elem.remove());
};

const paintPictures = (array) => {
  clearContainer();
  array.forEach((picture) => {
    paintPicture(picture);
  });
  photoObjectArray = array;
};


photoObjectPromise.then((array) => {
  data = array;
  initImgInfo(data, (filtredArray) => debounce(paintPictures(filtredArray)));
  paintPictures(data);
});


export {pictureContainer, photoObjectArray, data};
export { paintPicture, paintPictures };
