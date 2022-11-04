import { renderPictures } from './rendering-gallery.js';
import { showErrorMessage, showSuccessMessage } from './util.js';

const getData = () => {
  fetch('https://27.javascript.pages.academy/kekstagram-simple/data')
    .then(response => response.json())
    .then(posts => renderPictures(posts))
    .catch(() => {
      showErrorMessage('Ошибка при загрузке данных с сервера');
    });
}

const sendData = (body) => {
  fetch('https://27.javascript.pages.academy/kekstagram-simple',
    {
      method: 'POST',
      body: body
    },
  )
    .then((response) => {
      if (response.ok) {
        showSuccessMessage();
      } else {
        showErrorMessage('Не удалось отправить форму');
      }
    })
    .catch(() => {
      showErrorMessage('Не удалось отправить форму');
    });
}

export { getData, sendData }
