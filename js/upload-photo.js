import {
  photoUploadInput,
  photoUploadModal,
  photoUploadCancel,
  commentSymbolsCount,
  commentField,
  commentSymbolsCountOutput,
  imagePreview,
  effectLevelSlider,
  photoEffectsList
} from "./dom-elements.js";

import {
  lockScroll,
  unlockScroll,
  isEscKey,
  resetElement,
  hideElement,
  showElement
} from './util.js';

import { empty } from "./data.js";

const clearCommentSymbolsCount = () => {
  commentSymbolsCount.classList.remove('symbols-count--invalid');
  resetElement(commentSymbolsCountOutput);
}

const clearEffects = () => {
  const effects = photoEffectsList.querySelectorAll('.effects__radio');
  for (let effect of effects) {
    if (effect.matches('#effect-none')) {
      effect.setAttribute('checked', true);
    } else {
      effect.removeAttribute('checked')
    }
  }
  imagePreview.style.filter = empty;
  imagePreview.className = empty;
}

const removeErrorMessage = () => {
  const errorMessage = photoUploadModal.querySelector('.form__error');
  if (errorMessage) {
    resetElement(errorMessage);
  }
}

function onPhotoUploadInputChange() {
  showElement(photoUploadModal);
  photoUploadCancel.addEventListener('click', onPhotoUploadCancelClick);
  document.addEventListener('keydown', onModalEscKeydown);

  hideElement(effectLevelSlider);
  clearCommentSymbolsCount();
  removeErrorMessage();
  resetElement(commentField);
  lockScroll();

  // Сброс наложенных ранее фильтров
  clearEffects();
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

export { onModalEscKeydown }
