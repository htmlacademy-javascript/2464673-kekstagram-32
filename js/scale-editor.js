const maxValue = 100;
const minValue = 25;
const scaleStep = 25;

const scaleSmallerBtn = document.querySelector('.scale__control--smaller');//кнопка уменьшения масштаба
const scaleBiggerBtn = document.querySelector('.scale__control--bigger');//кнопка увеличения масштаба
const scaleValue = document.querySelector('.scale__control--value');//инпут, в котором стоит цифра текущего масштаба
const picturePreview = document.querySelector('.img-upload__preview').querySelector('img');//превью фотки;

let currentValue = parseFloat(scaleValue.value);

//функция - контроль + увеличение превью
const scaleBiggerControl = () => {
  if(currentValue === maxValue) {
    return false;
  }
  scaleValue.value = `${currentValue += scaleStep}%`;//в значение поля scaleValue записывается строка вида: 75% (число с процентом)
  picturePreview.style.transform = `scale(${parseFloat(scaleValue.value) / 100})`; //превьюшке добавляется css стиль непосредственно в HTML-разметку (style="transform: scale(0.5);")
  // scaleBiggerBtn.removeEventListener('click', scaleBiggerControl);
  // scaleBiggerImg(); //запускает увеличение, если изначально размер меньше 100
};

//функция - контроль + уменьшение превью
const scaleSmallerControl = () => {
  if(currentValue === minValue) {
    return false;
  }
  scaleValue.value = `${currentValue -= scaleStep}%`;
  picturePreview.style.transform = `scale(${parseFloat(scaleValue.value) / 100})`; // scale(75 / 100)
  scaleSmallerBtn.removeEventListener('click', scaleSmallerControl);
  // scaleSmallerImg();
};


// //-функция, которая увеличивает превью
// const scaleBiggerImg = () => {
//   scaleValue.value = `${currentValue += scaleStep}%`;//в значение поля scaleValue записывается строка вида: 75% (число с процентом)
//   picturePreview.style.transform = `scale(${parseFloat(scaleValue.value) / 100})`; //превьюшке добавляется css стиль непосредственно в HTML-разметку (style="transform: scale(0.5);")
//   scaleBiggerBtn.removeEventListener('click', scaleBiggerControl);
// };

// //-функция, которая уменьшает превью
// const scaleSmallerImg = () => {
//   scaleValue.value = `${currentValue -= scaleStep}%`;
//   picturePreview.style.transform = `scale(${parseFloat(scaleValue.value) / 100})`; // scale(75 / 100)
//   scaleSmallerBtn.removeEventListener('click', scaleSmallerControl);
// };

scaleBiggerBtn.addEventListener('click', scaleBiggerControl);// подумать как удалять обработчики
scaleSmallerBtn.addEventListener('click', scaleSmallerControl);

export { picturePreview };
