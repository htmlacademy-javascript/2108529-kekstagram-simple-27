import {
  imagePreview,
  imageScaleControl,
  imageScaleSmaller,
  imageScaleBigger
} from './dom-elements.js';

import { disableElement, enableElement } from './util.js';

const SCALE_STEP = 0.25;
const MIN_SCALE = 0.25;
const MAX_SCALE = 1;

let scaleValue = MAX_SCALE;

const resetScaleValue = () => scaleValue = MAX_SCALE;

const setControlValue = () => imageScaleControl.value = `${scaleValue * 100 }%`;
const setImageScale = () => imagePreview.style.transform = `scale(${imageScaleControl.value})`;

imageScaleSmaller.addEventListener('click', () => {
  scaleValue -= SCALE_STEP;
  setControlValue();
  if (scaleValue === MIN_SCALE) {
    disableElement(imageScaleSmaller);
  }
  enableElement(imageScaleBigger);
  setImageScale();
});

imageScaleBigger.addEventListener('click', () => {
  scaleValue += SCALE_STEP;
  setControlValue();
  if (scaleValue === MAX_SCALE) {
    disableElement(imageScaleBigger);
  }
  enableElement(imageScaleSmaller);
  setImageScale();
});

export { resetScaleValue, setControlValue };
