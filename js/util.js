import { errorMessageTemplate, successMessageTemplate, submitButton } from './dom-elements.js';
import { onModalEscKeydown, onPhotoUploadCancelClick } from './upload-photo.js';

// Проверка длины строки
const checkStringLength = (string, minLength, maxLength) => string.length >= minLength && string.length <= maxLength;

// Блокируем скролл
const lockScroll = () => document.body.classList.add('modal-open');

// Разблокируем скролл
const unlockScroll = () => document.body.classList.remove('modal-open');

// Проверка что нажат esc
const isEscKey = (evt) => evt.key === 'Escape';

// Сбросить значения элемента
const resetElement = (elem) => {
  if (elem.value) {
    elem.value = '';
    return;
  }
  elem.innerHTML = '';
};

//  Скрыть элемент
const hideElement = (elem) => elem.classList.add('hidden');

// Показать элемент
const showElement = (elem) => elem.classList.remove('hidden');

const disableElement = (elem) => elem.setAttribute('disabled', true);
const enableElement = (elem) => elem.removeAttribute('disabled');

// Показ сообщения об ошибке при загрузке/отправке данных
const showErrorMessage = (message, action, escEnable) => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');
  errorMessage.querySelector('.error__title').textContent = message;
  errorButton.addEventListener('click', () => {
    errorMessage.remove();
    if (action) {
      action();
    }
  });
  document.body.append(errorMessage);
  document.removeEventListener('keydown', onModalEscKeydown);
  unlockSubmitButton();
  // Чтобы при ошибке загрузки данных с сервера окно ошибки нельзя было закрыть
  if (escEnable) {
    document.addEventListener('keydown', onErrorModalEsc);
    errorMessage.addEventListener('click', onModalMouseClick);
  }
};

function onErrorModalEsc(evt) {
  if (isEscKey(evt)) {
    const errorMessage = document.querySelector('.error');
    errorMessage.remove();
    document.removeEventListener('keydown', onErrorModalEsc);
    document.addEventListener('keydown', onModalEscKeydown);
  }
}

function onSuccessModalEsc(evt) {
  if (isEscKey(evt)) {
    const successMessage = document.querySelector('.success');
    successMessage.remove();
    document.removeEventListener('keydown', onSuccessModalEsc);
  }
}

function onModalMouseClick(evt) {
  if (!evt.target.matches('.success__inner') && !evt.target.matches('.error__inner')) {
    evt.target.remove();
    evt.target.removeEventListener('click', onModalMouseClick);
    document.removeEventListener('keydown', onErrorModalEsc);
    document.removeEventListener('keydown', onSuccessModalEsc);
    // Слушатель нажатия esc должен добавляться обратно только в случае с окном ошибки, чтобы пользователь мог
    // закрыть окно редактирования фото, но при успехе слушатель не нужен, тк окно закрывается
    if (!(evt.target.matches('.success__button') || evt.target.matches('.success'))) {
      document.addEventListener('keydown', onModalEscKeydown);
    }
  }
}

// Показ сообщения об успешной отправке данных
const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');
  successButton.addEventListener('click', () => {
    successMessage.remove();
  });
  document.body.append(successMessage);
  onPhotoUploadCancelClick();
  document.addEventListener('keydown', onSuccessModalEsc);
  successMessage.addEventListener('click', onModalMouseClick);
};

const blockSubmitButton = () => {
  submitButton.setAttribute('disabled', true);
  submitButton.textContent = 'Отправляю...';
};

function unlockSubmitButton() {
  submitButton.removeAttribute('disabled');
  submitButton.textContent = 'Отправить';
}

const reloadPage = () => document.location.reload();

export {
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
  unlockSubmitButton,
  reloadPage
};
