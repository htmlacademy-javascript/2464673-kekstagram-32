import {isEscapeKey} from './util.js';
import { isHashtagValid, error } from './valid-hashtag';

const imageUploadForm = document.querySelector('.img-upload__form'); //форма
const fileUploadControl = document.querySelector('.img-upload__input'); //контрол загрузки нового изображения
const imgUploadOverlay = document.querySelector('.img-upload__overlay'); //форма для загрузки нового изображения
const fileUploadCloseBtn = document.querySelector('.img-upload__cancel'); // кнопка закрытия формы
const hashTagsInput = document.querySelector('.text__hashtags'); //поле для хэш тэгов
const commentInput = document.querySelector('.text__description');// поле для комментов
const imgUploadSubmit = document.querySelector('.img-upload__submit');


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
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadForm.reset();
  fileUploadCloseBtn.removeEventListener('click', closeBtnClick);//удаляем обработчик по клику с кнопки
  document.removeEventListener('keydown', closeFormOnEscKeydown);// удалить с документа прослушиватель нажатия на esc
}

//фу загрузки формы
const fileUploadFormOpen = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  fileUploadCloseBtn.addEventListener('click', closeBtnClick);
  document.addEventListener('keydown', closeFormOnEscKeydown);//обработчик закрытия формы по нажатию esc
};

fileUploadControl.addEventListener('change', fileUploadFormOpen);

//Объявляем пристин  и настраиваем
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
  imgUploadSubmit.disablet = true;
  imageUploadForm.textContent = 'Публикация...';
};

// const unblockSubmitBtn = () => {
//   imageUploadForm.disablet = false;
//   imageUploadForm.textContent = 'Опубликовать';
// };

//добавляем слушатель на форму. при неправильно введённых значениях в форму, отправить невозможно
//в форму передаём ('событие', функцию)
imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  //усл- Если "форма валидна", то выполни следующие действие
  if(pristine.validate()) {
    //У хештега убери пробелы по краям и множественные пробелы замени на одиночный и отправь форму
    hashTagsInput.value = hashTagsInput.value.trim().replaceAll(/\s+/g, ' ');
    imageUploadForm.submit();
    blockSubmitBtn();
  }
});

//добавляем валидатор, кладем (инпут функцию и сообщение об ошибке)
pristine.addValidator(hashTagsInput, isHashtagValid, error); //второе и третье нужно импортировать
