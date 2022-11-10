import { picturesContainer, pictureTemplate } from './dom-elements.js';
import { getData } from './api.js';

const createPicture = ({ url, comments, likes }) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__comments').textContent = comments;
  picture.querySelector('.picture__likes').textContent = likes;
  return picture;
};

const renderPictures = (posts) => {
  const picturesGalleryFragment = document.createDocumentFragment();
  posts.forEach((post) => {
    const picture = createPicture(post);
    picturesGalleryFragment.append(picture);
  });
  picturesContainer.append(picturesGalleryFragment);
};

getData()
  .then((posts) => renderPictures(posts));

