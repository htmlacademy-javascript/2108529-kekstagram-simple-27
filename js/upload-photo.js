import {
  photoUploadInput,
  photoUploadModal,
  photoUploadCancel,
  commentSymbolsCount,
  commentField,
  commentSymbolsCountOutput,
  imagePreview,
  photoEffectsList,
  effectLevelField,
  imageScaleSmaller,
  imageScaleBigger
} from './dom-elements.js';

import {
  lockScroll,
  unlockScroll,
  isEscKey,
  resetElement,
  hideElement,
  showElement,
  unlockSubmitButton,
  enableElement,
  disableElement
} from './util.js';

import { EMPTY } from './data.js';

import { resetScaleValue, setControlValue } from './photo-scale.js';

const clearCommentSymbolsCount = () => {
  commentSymbolsCount.classList.remove('symbols-count--invalid');
  resetElement(commentSymbolsCountOutput);
};

const clearEffects = () => {
  const effects = photoEffectsList.querySelectorAll('.effects__radio');
  for (const effect of effects) {
    effect.checked = effect.matches('#effect-none');
  }
  imagePreview.style.filter = EMPTY;
  imagePreview.className = EMPTY;
  imagePreview.style.transform = EMPTY;
};

const removeErrorMessage = () => {
  const errorMessage = photoUploadModal.querySelector('.form__error');
  if (errorMessage) {
    resetElement(errorMessage);
  }
};

// Сброс сброс всех предыдущих изменений
const resetPhotoUploadWindow = () => {
  clearEffects();
  hideElement(effectLevelField);
  clearCommentSymbolsCount();
  removeErrorMessage();
  resetElement(commentField);
  resetScaleValue();
  setControlValue();
  enableElement(imageScaleSmaller);
  disableElement(imageScaleBigger);
};

function onPhotoUploadInputChange() {

  //Подставляем выбранное изображение в окно редактирования
  imagePreview.src = URL.createObjectURL(photoUploadInput.files[0]);

  showElement(photoUploadModal);
  unlockSubmitButton();
  lockScroll();

  photoUploadCancel.addEventListener('click', onPhotoUploadCancelClick);
  document.addEventListener('keydown', onModalEscKeydown);
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

    hideElement(photoUploadModal);
    resetElement(photoUploadInput);
    unlockScroll();

    photoUploadCancel.removeEventListener('click', onPhotoUploadCancelClick);
    document.removeEventListener('keydown', onModalEscKeydown);
  }
}

photoUploadInput.addEventListener('change', onPhotoUploadInputChange);

export { onModalEscKeydown, onPhotoUploadCancelClick };
