import { checkStringLength } from './util.js';
import { removeErrorMessage } from './upload-photo.js';

import {
  photoUploadForm,
  commentField,
  commentSymbolsCount
} from './dom-elements.js';

// вопрос: как в пристине обращаться в classTo к любому элементу, а не только первой вложенности в валидируемой форме и почему если убрать этот параметр то следующие не будут работать?
const pristine = new Pristine(photoUploadForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
}, false);


let minCommentLength = 20;
let maxCommentLength = 140;

// Валидация поля ввода комментария
function validateComment(value) {
  return checkStringLength(value, minCommentLength, maxCommentLength);
}
pristine.addValidator(commentField, validateComment, `от ${minCommentLength} до ${maxCommentLength} символов`);

// Обработчик ввода в поле комментария
function onCommentFieldChange() {
  commentSymbolsCount.querySelector('output').textContent = commentField.value.length;
  commentSymbolsCount.classList.remove('symbols-count--invalid');
  removeErrorMessage();
}
commentField.addEventListener('input', onCommentFieldChange);

// Отправка формы
photoUploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
    commentSymbolsCount.classList.add('symbols-count--invalid');
  }
});


