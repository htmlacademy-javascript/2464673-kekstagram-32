//изначальное состояние с типом файл
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const inputUpload = document.querySelector('#upload-file');

// //куда поместим
const picturePreview = document.querySelector('.img-upload__preview').querySelector('img');

inputUpload.addEventListener('change', () => {
  const file = inputUpload.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if(matches) {
    picturePreview.src = URL.createObjectURL(file);
  }
});
