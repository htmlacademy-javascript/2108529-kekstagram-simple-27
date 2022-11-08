import { showErrorMessage, showSuccessMessage, reloadPage } from './util.js';

const getData = async () => {
  const response = await fetch('https://27.javascript.pages.academy/kekstagram-simple/data');
  if (response.ok) {
    return await response.json();
  }
  showErrorMessage('Ошибка при загрузке данных с сервера', reloadPage);
};

const sendData = (body) => {
  fetch('https://27.javascript.pages.academy/kekstagram-simple',
    {
      method: 'POST',
      body
    },
  )
    .then((response) => {
      if (response.ok) {
        showSuccessMessage();
        return
      }
      showErrorMessage('Не удалось отправить форму', false, true);
    })
    .catch(() => {
      showErrorMessage('Не удалось отправить форму', false, true);
    });
};

export { getData, sendData };
