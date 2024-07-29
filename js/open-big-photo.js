import {pictureContainer, photoObjectArray} from './photos25';

import {isEscapeKey} from './util.js';
let comments = [];

const bigPictureSection = document.querySelector('.big-picture');//большое окно, которое мы будем заполнять данными
const bigPictureImg = bigPictureSection.querySelector('.big-picture__img').querySelector('img'); //адрес изображения
const likesCount = bigPictureSection.querySelector('.likes-count'); //Количество лайков
const socialCommentCount = bigPictureSection.querySelector('.social__comment-count'); //блок счетчик комментариев
const socialcommentsShownCount = socialCommentCount.querySelector('.social__comment-shown-count');//количество показанных комментариев
const socialCommentTotalCount = socialCommentCount.querySelector('.social__comment-total-count'); //Общее количество комментариев к фотографии
const socialComments = bigPictureSection.querySelector('.social__comments'); //блок для комментариев
const socialComment = bigPictureSection.querySelector('.social__comment');//сам коммент
const socialCaption = bigPictureSection.querySelector('.social__caption'); //блок с опис
const newCommentsLoader = bigPictureSection.querySelector('.comments-loader');//кнопка загрузки новых комментариев
const userModalCanselElement = bigPictureSection.querySelector('.big-picture__cancel'); //кнопка закрытия полноэкранного просмотра

//функция которя закрывает окно
const onBigPictureCancelClick = () => {
  closePhoto();
};

//если мы нажали escape только в это случае делаем closePhoto
//будет использована в обработчике
const onEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    closePhoto();
  }
};
// //функция генератор комментариев
const renderсomments = () => {
  const socialCommentsFragment = document.createDocumentFragment();//создаем фрагмент - ящик для комментариев
  comments.forEach((comment) => { //проходимся по комментариям через .forEach
    const userCommentElement = socialComment.cloneNode(true); //записываем в новую переменную клон блока комментов,
    userCommentElement.querySelector('.social__picture').src = comment.avatar; //добавляем аватар комментатора
    userCommentElement.querySelector('.social__picture').alt = comment.name; // добавляем имя комментатора
    userCommentElement.querySelector('.social__text').textContent = comment.message; //добавляем сам коммент
    socialCommentsFragment.append(userCommentElement);//добавляем заполненный li во фрагмент
  });
  socialComments.append(socialCommentsFragment); // дабавляем фрагмент в блок комментов
};

//функция, которая заполняет большое фото
const openBigPicture = (pictureId) => {
  const currentPhoto = photoObjectArray.find((photo) => photo.id === Number(pictureId)); //находим объект = id;
  //дальше, заполняем адрес, лайки, комменты и пр.
  bigPictureImg.src = currentPhoto.url;
  likesCount.textContent = currentPhoto.likes;
  socialcommentsShownCount.textContent = currentPhoto.comments.length;
  socialCommentTotalCount.textContent = currentPhoto.comments.length;
  // socialComments
  socialCaption.textContent = currentPhoto.description;
  socialComments.innerHTML = '';
  comments = currentPhoto.comments;
  renderсomments();
  bigPictureSection.classList.remove('hidden');
  userModalCanselElement.addEventListener('click', onBigPictureCancelClick);
  document.addEventListener('keydown', onEscKeydown);// добавляем обработчик событий для закрытия фото по нажатию esc
  socialCommentCount.classList.add('hidden');
  newCommentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
};

// основная функция, которая ловит фото на контейнере где все фото вешаем обработчик с target
const openPicture = () => {
  pictureContainer.addEventListener('click', (evt) => {
    // проверка, что точно нажали по пикчер либо на эл внутри по отношению к нему
    const currentPhoto = evt.target.closest('.picture');
    //проверка - тот ли элемент
    if (currentPhoto) {
      evt.preventDefault();
      //если trye тогда вызываем функцию и добавляем по id (data-picture-id (html)  === dataset.pictureId (js)
      openBigPicture(currentPhoto.dataset.pictureId);
    }
  });
};


// //функция закрытия большого фото
function closePhoto() {
  bigPictureSection.classList.add('hidden'); //добавляем класс, который скрывает окно
  userModalCanselElement.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', onEscKeydown);
}


export { openPicture };
