import {imagePreview, photoEffectsList, effectLevelValue, effectLevelSlider, effectLevelField} from './dom-elements.js';
import { EMPTY, photoEffects } from './data.js' ;
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

    // Изменение параметров слайдера в зависимости от выбранного эффекта
    const effectId = evt.target.id;
    switch (effectId) {
      case 'effect-chrome':
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          start: 1,
          step: 0.1,
        });
        showElement(effectLevelField);
        break;
      case 'effect-sepia':
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          start: 1,
          step: 0.1,
        });
        showElement(effectLevelField);
        break;
      case 'effect-marvin':
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100,
          },
          start: 100,
          step: 1,
        });
        effectLevelSlider.noUiSlider.on('update', (value) => {
          imagePreview.style.filter = `${photoEffects[evt.target.id][1]}(${value}%)`;
        });
        showElement(effectLevelField);
        break;
      case 'effect-phobos':
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3,
          },
          start: 3,
          step: 0.1,
        });
        effectLevelSlider.noUiSlider.on('update', (value) => {
          imagePreview.style.filter = `${photoEffects[evt.target.id][1]}(${value}px)`;
        });
        showElement(effectLevelField);
        break;
      case 'effect-heat':
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 1,
            max: 3,
          },
          start: 3,
          step: 0.1,
        });
        showElement(effectLevelField);
        break;
      case 'effect-none':
        imagePreview.style.filter = EMPTY;
        hideElement(effectLevelField);
        break;
    }
  }
});
