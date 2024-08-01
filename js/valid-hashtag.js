const MAX_NUMBER_HASHTAG = 5;
const MAX_NUMBER_SYMBOL = 20;

let textErrorMessage = '';//переменная для текста ошибки

const error = () => textErrorMessage;//функция, которая вернет текст ошибки

const isHashtagValid = (value) => {
  //обнуляем предыдушие ошибки
  textErrorMessage = '';

  //берем значение приводим к нижнему регистру(toLowerCase) и обрезаем пробелов по бокам(trim)
  const inputText = value.toLowerCase().trim();

  //проверка на обязательность хештегов, если нет верни тру
  if (!inputText) {
    return true;
  }
  //разделяем строку на массив с элементами, разделенными пробелом (split)
  const inputArray = inputText.split(' ');

  //получаем массив из хэштегов
  //some() проверяет, удовлетворяет ли какой-либо элемент массива условию, заданному в передаваемой функции.
  //slice() возвращает новый массив, содержащий копию части исходного массива
  //includes() определяет, содержит ли массив определённый элемент, возвращая в зависимости от этого true или false.
  const rules = [
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэштег должен начинаться с символа \'#\'!'
    },
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хештег не может состоять только из решётки!'
    },
    {
      check: inputArray.some((item) => item.length > MAX_NUMBER_SYMBOL),
      error: `Максимальная длина одного хэштега ${MAX_NUMBER_SYMBOL} символов, включая решётку!`
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      error: 'Хэштеги должны разделяться пробелами!'
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хештеги не должны повторяться!'
    },
    {
      check: inputArray.length > MAX_NUMBER_HASHTAG,
      error: `Нельзя указывать больше ${MAX_NUMBER_HASHTAG} хэштегов!`
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хештег содержит недопустимые символы! Хэштег должен состоять только из букв и чисел.'
    },
  ];
  //вызываем у массива every который вернет тру только если каждый элемент массива соответсвует всем условиям
  //every() проверяет, удовлетворяют ли все элементы массива условию, заданному в передаваемой функции.
  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      textErrorMessage = rule.error;
    }
    return !isInvalid;
  });
};

export { isHashtagValid, error };
