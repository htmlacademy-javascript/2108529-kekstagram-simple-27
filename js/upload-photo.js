import {
  photoUploadInput,
  photoUploadModal,
  photoUploadCancel,
  commentSymbolsCount,
  commentField,
  commentSymbolsCountOutput
} from "./dom-elements.js";

import { lockScroll, unlockScroll, isEscKey, resetElement, hideElement, showElement } from './util.js';

const clearCommentSymbolsCount = () => {
  commentSymbolsCount.classList.remove('symbols-count--invalid');
  resetElement(commentSymbolsCountOutput);
}

const removeErrorMessage = () => {
  const errorMessage = photoUploadModal.querySelector('.form__error');
  if (errorMessage) {
    hideElement(errorMessage);
  }
}

function onPhotoUploadInputChange() {
  showElement(photoUploadModal);
  photoUploadCancel.addEventListener('click', onPhotoUploadCancelClick);
  document.addEventListener('keydown', onModalEscKeydown);

  clearCommentSymbolsCount();
  removeErrorMessage();
  resetElement(commentField);
  lockScroll();
}

function onPhotoUploadCancelClick() {
  hideElement(photoUploadModal);
  resetElement(photoUploadInput);
  unlockScroll();

  photoUploadCancel.removeEventListener('click', onPhotoUploadCancelClick);
  document.removeEventListener('keydown', onModalEscKeydown);
}

function onModalEscKeydown(evt) {
  if (isEscKey(evt)) {
    evt.preventDefault();

    hideElement(photoUploadModal)
    resetElement(photoUploadInput);
    unlockScroll();

    photoUploadCancel.removeEventListener('click', onPhotoUploadCancelClick);
    document.removeEventListener('keydown', onModalEscKeydown);
  }
}

photoUploadInput.addEventListener('change', onPhotoUploadInputChange);

export { removeErrorMessage, onModalEscKeydown }
