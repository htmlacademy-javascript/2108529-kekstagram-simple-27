const picturesContainer = document.querySelector('.pictures'),
  pictureTemplate = document.querySelector('#picture').content.querySelector('.picture'),
  photoUploadInput = picturesContainer.querySelector('#upload-file'),
  photoUploadModal = picturesContainer.querySelector('.img-upload__overlay'),
  photoUploadCancel = photoUploadModal.querySelector('#upload-cancel'),
  photoUploadForm = picturesContainer.querySelector('.img-upload__form'),
  commentField = photoUploadForm.querySelector('.text__description'),
  commentSymbolsCount = photoUploadForm.querySelector('.symbols-count');

export {
  picturesContainer,
  pictureTemplate,
  photoUploadInput,
  photoUploadModal,
  photoUploadCancel,
  photoUploadForm,
  commentField,
  commentSymbolsCount
}
