import { checkStringLength } from './util.js';
import { onModalEscKeydown } from './upload-photo.js';

import {
  photoUploadForm,
  commentField,
  commentSymbolsCount,
  commentSymbolsCountOutput
} from './dom-elements.js';

const pristine = new Pristine(photoUploadForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const  MIN_COMMENT_LENGTH = 20;
const  MAX_COMMENT_LENGTH = 140;

// Валидация поля ввода комментария
function validateComment(value) {
  return checkStringLength(value, MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH);
}
pristine.addValidator(commentField, validateComment, `от ${MIN_COMMENT_LENGTH} до ${MAX_COMMENT_LENGTH} символов`);

// Обработчик ввода в поле комментария
const onCommentFieldChange = () => commentSymbolsCountOutput.textContent = commentField.value.length;
commentField.addEventListener('input', onCommentFieldChange);

// Отключаем esc при фокусе в поле комментария
commentField.onfocus = () => document.removeEventListener('keydown', onModalEscKeydown);
commentField.onblur = () => document.addEventListener('keydown', onModalEscKeydown);

// Отправка формы
photoUploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});


