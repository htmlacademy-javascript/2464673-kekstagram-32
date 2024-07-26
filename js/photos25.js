import {createPhotoObjectArray} from './data.js';

const photoObjectArray = createPhotoObjectArray();


const pictureContainer = document.querySelector('.pictures'); //контейнер для фото пользователей
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture'); //шаблон

const listFragment = document.createDocumentFragment();

const fillsTemplate = (array) => {
  array.forEach(({id, url, description, comments, likes}) => {
    const similarPicture = pictureTemplate.cloneNode(true); // клонируем шаблон
    similarPicture.dataset.pictureId = id;
    similarPicture.querySelector('.picture__img').src = url;
    similarPicture.querySelector('.picture__img').alt = description;
    similarPicture.querySelector('.picture__comments').textContent = comments.length;
    similarPicture.querySelector('.picture__likes').textContent = likes;
    listFragment.appendChild(similarPicture);
  });
  pictureContainer.appendChild(listFragment); //вставляем клон шаблона в конец контейнера
};
fillsTemplate(photoObjectArray);


// export {pictureContainer, photoObjectArray};
