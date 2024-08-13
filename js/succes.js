import { isEscapeKey } from './util.js';

const successTemplate = document.querySelector('#success').content;
const body = document.body;


//фу-я, которая удаляет сообщение по клику на экране
const closeAlertClickScreen = (evt) => {
  const sun = evt.target.closest('.success');
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
    document.body.lastElementChild.remove();
  }
  document.body.removeEventListener('keydown', closeAlertClickEsc);
};

//фу-я, которая удаляет сообщение по клику на кнопку
const closeAlertClickBtn = () => {
  document.body.lastElementChild.remove();
};


const showSuccesMessage = () => {
  const successArea = successTemplate.cloneNode(true);
  body.append(successArea);
  const btn = body.querySelector('.success__button');
  btn.addEventListener('click', closeAlertClickBtn);
  document.body.addEventListener('click', closeAlertClickScreen);
  document.body.addEventListener('keydown', closeAlertClickEsc);
};

export { showSuccesMessage };
