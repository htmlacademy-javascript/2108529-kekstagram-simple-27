import {createPosts} from './data.js'

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createdPosts = createPosts();
const picturesListFragment = document.createDocumentFragment();

createdPosts.forEach(({url, likes, comments}) => {
  const newPicture = pictureTemplate.cloneNode(true);
  newPicture.querySelector('.picture__img').src = url;
  newPicture.querySelector('.picture__comments').textContent = comments;
  newPicture.querySelector('.picture__likes').textContent = likes;
  picturesListFragment.appendChild(newPicture);
});

picturesContainer.append(picturesListFragment);
