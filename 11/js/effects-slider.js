import { picturePreview } from './scale-editor';

const effectControlList = document.querySelector('.effects__list');//список эффектов
const effectControlContainer = document.querySelector('.img-upload__effect-level');//контейнер со слайдером
const effectLevelSlider = document.querySelector('.effect-level__slider');//слайдер
const effectLevelValue = document.querySelector('.effect-level__value');//инпут внутри контейнера, в который будет записываться значение

effectLevelValue.value = 1;
effectControlContainer.classList.add('hidden');//скрываем слайдер здесь зачем-то

//создаем элемент с ноуюайслайдером
noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start:1,
  step: 0.1,
  connect: 'lower'
});
//основная функция
//filter() создаёт новый массив со всеми элементами, прошедшими проверку, задаваемую в передаваемой функции.
//Свойство style получает и устанавливает инлайновые стили элемента, то есть те, что записываются через HTML-атрибут style
//updateOptions - обновление настроек
const chageFilter = (evt) => {
  picturePreview.classList = `effects__preview--${evt.target.value}`;//конкатенируем префикс класса эффекта с значением (название эффекта) полученным из события, сработавшего на чекбоксе. Отлавливаем его через evt.target.value, где value - это название эффекта. И добавляем полученный класс к превью
  switch (evt.target.value) {
    case 'chrome':
    case 'sepia':
      effectLevelSlider.noUiSlider.updateOptions ({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1
      });
      effectControlContainer.classList.remove('hidden');
      break;
    case 'marvin':
      effectLevelSlider.noUiSlider.updateOptions ({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1
      });
      effectControlContainer.classList.remove('hidden');
      break;
    case 'phobos':
      effectLevelSlider.noUiSlider.updateOptions ({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1
      });// разобраться с px
      effectControlContainer.classList.remove('hidden');
      break;
    case 'heat':
      effectLevelSlider.noUiSlider.updateOptions ({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1
      });
      effectControlContainer.classList.remove('hidden');
      break;
    default:
      picturePreview.classList = '';//обнуление поля
      picturePreview.style.filter = '';//обнуление поля
      effectControlContainer.classList.add('hidden');//скрываем слайдер
  }
};

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();

  if (picturePreview.classList.value === 'effects__preview--chrome') {
    picturePreview.style.filter = `grayscale(${effectLevelValue.value})`;
  } else if (picturePreview.classList.value === 'effects__preview--sepia') {
    picturePreview.style.filter = `sepia(${effectLevelValue.value})`;
  } else if (picturePreview.classList.value === 'effects__preview--marvin') {
    picturePreview.style.filter = `invert(${effectLevelValue.value}%)`;
  } else if (picturePreview.classList.value === 'effects__preview--phobos') {
    picturePreview.style.filter = `blur(${effectLevelValue.value}px)`;
  } else if (picturePreview.classList.value === 'effects__preview--heat') {
    picturePreview.style.filter = `brightness(${effectLevelValue.value})`;
  }
});

effectControlList.addEventListener('change', chageFilter);
