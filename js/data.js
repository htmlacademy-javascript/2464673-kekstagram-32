import {DESCRIPTION, MESSAGES, NAMES} from './util.js';
import {createPhotoObject, createCommentObject, getRandomInteger, getRandomArreyElement} from './util.js';

let commentId = 0;

const getCommentObjectArray = (qtt) => {
  const arrayResult = [];
  for (let i = 0; i < qtt; i++) {
    const ind = getRandomInteger(1, 6);
    arrayResult.push(
      createCommentObject(
        commentId,
        `img/avatar-${ind}.svg`,
        getRandomArreyElement(MESSAGES),
        getRandomArreyElement(NAMES)
      )
    );
    commentId++;
  }
  return arrayResult;
};

const createPhotoObjectArray = () => {
  const arrayResultFinish = [];
  for (let i = 0; i < 25; i++) {
    const id = i + 1;
    arrayResultFinish.push(
      createPhotoObject(
        id,
        `photos/${id}.jpg`,
        getRandomArreyElement(DESCRIPTION),
        getRandomInteger(15, 200),
        getCommentObjectArray(getRandomInteger(0,30))
      )
    );
  }
  return arrayResultFinish;
};

console.log(createPhotoObjectArray());
export {createPhotoObjectArray};
// export {arrayResultFinish};
