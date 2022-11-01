import { imagePreview, photoEffectsList, effectLevelSlider, effectLevelValue } from './dom-elements.js';
import { photoEffects } from './data.js' ;
import { hideElement, showElement } from './util.js';


noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  step: 0.1,
  start: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

photoEffectsList.addEventListener('change', (evt) => {

  if (evt.target.matches('.effects__radio')) {

    // Добавляем эффект на фото
    imagePreview.className = photoEffects[evt.target.id][0];

    // Описание работы слайдера
    effectLevelSlider.noUiSlider.on('update', (value) => {
      imagePreview.style.filter = `${photoEffects[evt.target.id][1]}(${value})`;
      effectLevelValue.value = value;
    });

    // Хром
    if (evt.target.matches('#effect-chrome')) {
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
    }

    // Сепия
    if (evt.target.matches('#effect-sepia')) {
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
    }

    // Марвин
    if (evt.target.matches('#effect-marvin')) {
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      effectLevelSlider.noUiSlider.on('update', (value) => {
        imagePreview.style.filter = `${photoEffects[evt.target.id][1]}(${value + '%'})`;
      });
    }

    // Фобос
    if (evt.target.matches('#effect-phobos')) {
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      effectLevelSlider.noUiSlider.on('update', (value) => {
        imagePreview.style.filter = `${photoEffects[evt.target.id][1]}(${value + 'px'})`;
      });
    }

    // Зной
    if (evt.target.matches('#effect-heat')) {
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    }

    // Оригинал
    if (evt.target.matches('#effect-none')) {
      imagePreview.style.filter = '';
      hideElement(effectLevelSlider);
    } else {
      showElement(effectLevelSlider);
    }

  }
});