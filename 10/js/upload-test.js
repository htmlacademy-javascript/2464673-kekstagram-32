import { isEscapeKey } from './util.js';
import { isHashtagValid, error } from './valid-hashtag';
import { sendData } from './api';
import { showSuccesMessage } from './succes.js';
import { showErrorMessageUpload } from './error.js';


const imageUploadForm = document.querySelector('.img-upload__form');//форма
const imageUploadOverlay = document.querySelector('.img-upload__overlay');//Форма редактирования изображения
const fileUploadCloseBtn = document.querySelector('.img-upload__cancel');//кнопка закрытия формы для загрузки
const fileUploadControl = document.querySelector('.img-upload__input');//Изначальное состояние поля для загрузки  изображения
const hashTagsInput = document.querySelector('.text__hashtags'); //поле для хэш тэгов
const commentInput = document.querySelector('.text__description');// поле для комментов
const imgUploadSubmit = document.querySelector('.img-upload__submit'); //кнопка для публикации
// const imgUploadPreviewContainer = document.querySelector('.img-upload__preview-container');// контейнер со всеми настройками
const effectControlContainer = document.querySelector('.img-upload__effect-level');//контейнер со слайдером
// const scaleControlValue= imgUploadPreviewContainer.querySelector('.scale__control--value');// инпут, внутри конт, в котором размер изображения
// const effectLevelValue = imgUploadPreviewContainer.querySelector('.effect-level__value');//инпут внутри контейнера, в который будет записываться значение
const picturePreview = document.querySelector('.img-upload__preview').querySelector('img');

const closeBtnClick = () => {
  fileUploadFormClose();
};

const closeFormOnEscKeydown = (evt) => {
  //иф ловит фокус на поле для х.т и комментов с помощью document.activeElement
  if(hashTagsInput === document.activeElement || commentInput === document.activeElement) {
    evt.stopPropagation();//останавливает выполнение сценария
  } else if(isEscapeKey(evt)) {
    evt.preventDefault();
    fileUploadFormClose();
  }
};

//фу закрытия формы
function fileUploadFormClose() {
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-oppen');
  imageUploadForm.reset();
  picturePreview.classList = '';//обнуление поля
  picturePreview.style.filter = '';//обнуление поля
  picturePreview.style.transform = 'scale(1)';
  effectControlContainer.classList.add('hidden');//скрываем слайдер
  fileUploadCloseBtn.removeEventListener('click', closeBtnClick);//удаляем обработчик по клику с кнопки
  document.removeEventListener('keydown', closeFormOnEscKeydown);// удалить с документа прослушиватель нажатия на esc
}

//фу загрузки формы
const fileUploadFormOpen = () => {
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-oppen');
  fileUploadCloseBtn. addEventListener('click', closeBtnClick);//обработчик на закрытие формы
  document.addEventListener('keydown', closeFormOnEscKeydown);//обработчик закрытия формы по нажатию esc
};

fileUploadControl.addEventListener('change', fileUploadFormOpen);//обработчик показывает форму для загрузки фото

//Объявляем Pristine и настраиваем
const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',// добавление класс дива
  errorTextClass: 'img-upload__field-wrapper--error', //класс для элемента с ошибкой
  errorTextParent: 'img-upload__field-wrapper', //куда выводится текст с ошибкой
  errorTextTag: 'div', //обрамляет текст с ошибкой
});

//добавляем пристин-валидатор на комментарии
pristine.addValidator(commentInput, (value) => {
  const isCorrectLength = value.length <= 140;
  return isCorrectLength;
},'Длина комментария не может превышать 140 символов.');

const blockSubmitBtn = () => {
  imgUploadSubmit.disabled = true;
  imgUploadSubmit.textContent = 'Публикация...';
};

const unblockSubmitBtn = () => {
  imgUploadSubmit.disabled = false;
  imgUploadSubmit.textContent = 'Опубликовать';
};

//добавляем слушатель на форму. при неправильно введённых значениях в форму, отправить невозможно
//в форму передаём ('событие', функцию)
imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  //усл- Если "форма валидна", то выполни следующие действие
  if(pristine.validate()) {
    //У хештега убери пробелы по краям и множественные пробелы замени на одиночный и отправь форму
    hashTagsInput.value = hashTagsInput.value.trim().replaceAll(/\s+/g, ' ');
    // imageUploadForm.submit();
    blockSubmitBtn();
    const formData = new FormData(evt.target);
    sendData(formData)
      .then(() => {
        fileUploadFormClose();
        showSuccesMessage();
        // throw new Error();
      })
      .catch(() => {
        showErrorMessageUpload();
        // throw new Error('ОШИБКА!!!');
      })
      .finally(unblockSubmitBtn);
  }
});

//добавляем валидатор, кладем (инпут функцию и сообщение об ошибке)
pristine.addValidator(hashTagsInput, isHashtagValid, error); //второе и третье нужно импортировать
