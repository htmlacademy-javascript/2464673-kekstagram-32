import { isEscapeKey } from './util.js';

const error = document.querySelector('#error').content;
const body = document.body;

//фу-я, которая удаляет сообщение по клику на экране
const closeAlertClickScreen = (evt) => {
  const sun = evt.target.closest('.error');
  if (evt.target !== sun) {
    return;
  }
  document.body.lastElementChild.remove();
  document.body.removeEventListener('click', closeAlertClickScreen);
};

//фу-я, которая удаляет сообщение по клику на эсп
const closeAlertClickEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
    document.body.lastElementChild.remove();
  }
  document.body.removeEventListener('keydown', closeAlertClickEsc);
};

//фу-я, которая удаляет сообщение по клику на кнопку
const closeAlertClickBtn = () => {
  document.body.lastElementChild.remove();
};

const showErrorMessageUpload = () => {//проблема с отправкой данных ошибка
  const errorUpload = error.cloneNode(true);
  body.append(errorUpload);
  const btn = body.querySelector('.error__button');
  btn.addEventListener('click', closeAlertClickBtn);
  document.body.addEventListener('click', closeAlertClickScreen);
  document.body.addEventListener('keydown', closeAlertClickEsc);
};

export { showErrorMessageUpload };
