import { errorMessageTemplate, successMessageTemplate, submitButton } from './dom-elements.js';
import { onPhotoUploadCancelClick } from './upload-photo.js';

// Генерация случайного целого положительного числа
const getRandomPositiveInteger = (a, b) => {
  if (a < 0 || b < 0) {
    return NaN;
  }

  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// Проверка длины строки
const checkStringLength = (string, minLength, maxLength) => string.length >= minLength && string.length <= maxLength;

// Блокируем скролл
const lockScroll = () => document.body.classList.add('modal-open');

// Разблокируем скролл
const unlockScroll = () => document.body.classList.remove('modal-open');

// Проверка что нажат esc
const isEscKey = evt => evt.key === 'Escape';

// Сбросить значения элемента
const resetElement = (elem) => {
  if (elem.value) {
    elem.value = '';
    return
  }
  elem.innerHTML = '';
}

//  Скрыть элемент
const hideElement = elem => elem.classList.add('hidden');

// Показать элемент
const showElement = elem => elem.classList.remove('hidden');

const disableElement = elem => elem.setAttribute('disabled', true);
const enableElement = elem => elem.removeAttribute('disabled');

// Показ сообщения об ошибке при загрузке/отправке данных
const showErrorMessage = (message) => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorWindowButton = errorMessage.querySelector('.error__button');
  errorMessage.querySelector('.error__title').textContent = message;
  errorWindowButton.addEventListener('click', () => {
    errorMessage.remove();
  });
  document.body.append(errorMessage);
  onPhotoUploadCancelClick();
}

// Показ сообщения об успешной отправке данных
const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  const successWindowButton = successMessage.querySelector('.success__button');
  successWindowButton.addEventListener('click', () => {
    successMessage.remove();
  });
  document.body.append(successMessage);
  onPhotoUploadCancelClick();
}

const blockSubmitButton = () => {
  submitButton.setAttribute('disabled', true);
  submitButton.textContent = 'Отправляю...';
}

const unlockSubmitButton = () => {
  submitButton.removeAttribute('disabled');
  submitButton.textContent = 'Отправить';
}

export {
  getRandomPositiveInteger,
  lockScroll,
  unlockScroll,
  isEscKey,
  checkStringLength,
  resetElement,
  hideElement,
  showElement,
  disableElement,
  enableElement,
  showErrorMessage,
  showSuccessMessage,
  blockSubmitButton,
  unlockSubmitButton
}
