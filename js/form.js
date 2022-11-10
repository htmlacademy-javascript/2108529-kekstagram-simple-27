import { checkStringLength, blockSubmitButton } from './util.js';
import {photoUploadForm, commentField, commentSymbolsCountOutput} from './dom-elements.js';
import { sendData } from './api.js';

const MIN_COMMENT_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;

const pristine = new Pristine(photoUploadForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

// Валидация поля ввода комментария
const validateComment = (value) => checkStringLength(value, MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH);
pristine.addValidator(commentField, validateComment, `от ${MIN_COMMENT_LENGTH} до ${MAX_COMMENT_LENGTH} символов`);

// Обработчик ввода в поле комментария
const onCommentFieldChange = () => {
  commentSymbolsCountOutput.textContent = commentField.value.length;
};

commentField.addEventListener('input', onCommentFieldChange);

// Отправка формы
photoUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    const formData = new FormData(evt.target);
    sendData(formData);
    blockSubmitButton();
  }
});
