import {
  photoUploadInput,
  photoUploadModal,
  photoUploadCancel,
  commentSymbolsCount,
  commentField,
  commentSymbolsCountOutput,
  imagePreview,
  effectLevelSlider,
  photoEffectsList,
  imageScaleControl
} from "./dom-elements.js";

import {
  lockScroll,
  unlockScroll,
  isEscKey,
  resetElement,
  hideElement,
  showElement,
  unlockSubmitButton
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
      effect.removeAttribute('checked');
    }
  }
  imagePreview.style.filter = empty;
  imagePreview.className = empty;
  imagePreview.style.transform = empty;
}

const removeErrorMessage = () => {
  const errorMessage = photoUploadModal.querySelector('.form__error');
  if (errorMessage) {
    resetElement(errorMessage);
  }
}

const resetPhotoUploadWindow = () => {
  clearEffects();
  hideElement(effectLevelSlider);
  clearCommentSymbolsCount();
  removeErrorMessage();
  resetElement(commentField);
  imageScaleControl.value = '100%';
}

function onPhotoUploadInputChange() {

  showElement(photoUploadModal);
  unlockSubmitButton();
  lockScroll();

  photoUploadCancel.addEventListener('click', onPhotoUploadCancelClick);
  document.addEventListener('keydown', onModalEscKeydown);

  // Сброс сброс всех предыдущих изменений
  resetPhotoUploadWindow();
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

export { onModalEscKeydown, onPhotoUploadCancelClick }
