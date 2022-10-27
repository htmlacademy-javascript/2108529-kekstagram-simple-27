import {
  photoUploadInput,
  photoUploadModal,
  photoUploadCancel,
  commentSymbolsCount,
  commentField
} from "./dom-elements.js";

import { lockScroll, unlockScroll, isEscKey, clearField } from './util.js';

const clearCommentSymbolsCount = () => {
  commentSymbolsCount.classList.remove('symbols-count--invalid');
  commentSymbolsCount.querySelector('output').textContent = '';
}

const removeErrorMessage = () => {
  const errorMessage = photoUploadModal.querySelector('.form__error');
  if (errorMessage) {
    errorMessage.style.display = 'none';
  }
}

function onPhotoUploadInputChange() {
  photoUploadModal.classList.remove('hidden');
  photoUploadCancel.addEventListener('click', onPhotoUploadCancelClick);
  document.addEventListener('keydown', onModalEscKeydown);

  clearCommentSymbolsCount();
  removeErrorMessage();
  clearField(commentField);
  lockScroll();
}

function onPhotoUploadCancelClick() {
  photoUploadModal.classList.add('hidden');
  photoUploadCancel.removeEventListener('click', onPhotoUploadCancelClick);
  document.removeEventListener('keydown', onModalEscKeydown);
  photoUploadInput.value = '';
  unlockScroll();
}

function onModalEscKeydown(evt) {
  if (isEscKey(evt)) {
    evt.preventDefault();
    photoUploadModal.classList.add('hidden');
    photoUploadCancel.removeEventListener('click', onPhotoUploadCancelClick);
    document.removeEventListener('keydown', onModalEscKeydown);
    photoUploadInput.value = '';
    unlockScroll();
  }
}

photoUploadInput.addEventListener('change', onPhotoUploadInputChange);

export { removeErrorMessage, onModalEscKeydown }
