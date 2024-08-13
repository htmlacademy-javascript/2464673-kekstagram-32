// import { showAlert } from './util';
import { showErrorMessage } from './data-error';
// import { showErrorMessageUpload } from './error';


const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET', //получать данные(прикреплять к BASE_URL)
  POST: 'POST', //отправлять данные
};
const ErrorText = { //динамический ключ
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз'
};
const load = (route, errorText, method = Method.GET, body = null) => //м который отпр на сервер({}конкатеация происходит)
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      // showErrorMessageUpload(errorText);
      showErrorMessage(errorText);
      throw new Error(errorText);
    });

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);
const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export { getData, sendData };
