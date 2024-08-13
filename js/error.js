// import { isEscapeKey } from './util.js';

const error = document.querySelector('#error').textContent;
const body = document.body;

const showErrorMessageUpload = () => {//проблема с отправкой данных ошибка
  const errorUpload = error.cloneNode(true);
  body.append(errorUpload);
};

export { showErrorMessageUpload };
