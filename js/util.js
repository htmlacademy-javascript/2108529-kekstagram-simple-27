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

// Функция для очистки поля
const clearField = (field) => field.value = '';

export { getRandomPositiveInteger, lockScroll, unlockScroll, isEscKey, checkStringLength, clearField }
