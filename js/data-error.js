const REMOVE_MESSAGE_TIMEOUT = 5000;

const dataError = document.querySelector('#data-error').content;

const body = document.body;

const showErrorMessage = (message) => {//проблема с получением данных ошибка
  const errorArea = dataError.cloneNode(true);
  if (message) {
    errorArea.querySelector('.data-error__title').textContent = message;
  }
  document.body.append(errorArea);


  const error = body.querySelector('.data-error');//добавляется в body ф

  setTimeout(() => { //устанавливаем таймер
    error.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

export { showErrorMessage };
