import {imagePreview, photoEffectsList, effectLevelValue, effectLevelSlider, effectLevelField} from './dom-elements.js';
import {hideElement, showElement} from './util.js';

const photoEffects = {
  'effect-chrome': {
    effect: 'chrome',
    filter: 'grayscale',
    units: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  'effect-sepia': {
    effect: 'sepia',
    filter: 'sepia',
    units: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  'effect-marvin': {
    effect: 'marvin',
    filter: 'invert',
    units: '%',
    min: 0,
    max: 100,
    step: 1
  },
  'effect-phobos': {
    effect: 'phobos',
    filter: 'blur',
    units: 'px',
    min: 0,
    max: 3,
    step: 0.1
  },
  'effect-heat': {
    effect: 'heat',
    filter: 'brightness',
    units: '',
    min: 1,
    max: 3,
    step: 0.1
  },
};

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

let filter;
let units;

effectLevelSlider.noUiSlider.on('update', (value) => {
  imagePreview.style.filter = `${filter}(${value}${units})`;
  effectLevelValue.value = value;
});

const updateSlider = ({min, max, step}) => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min,
      max,
    },
    start: max,
    step,
  });
};

photoEffectsList.addEventListener('click', (evt) => {
  if (evt.target.id !== 'effect-none') {
    const chosenEffect = photoEffects[evt.target.id];
    filter = chosenEffect.filter;
    units = chosenEffect.units;
    imagePreview.className = `effects__preview--${chosenEffect.effect}`;
    updateSlider(chosenEffect);
    showElement(effectLevelField);
  } else {
    hideElement(effectLevelField);
    imagePreview.className = '';
    imagePreview.style.filter = '';
  }
});

