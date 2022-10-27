import {getRandomPositiveInteger} from './util.js'

// Создаем посты
let postsAmount = 25;

const createPost = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: 'chillin',
  likes: getRandomPositiveInteger(15, 200),
  comments: getRandomPositiveInteger(0, 200)
});

const createPosts = () => Array.from({ length: postsAmount }, (_, post) => createPost(post + 1));
const createdPosts = createPosts();

export {createdPosts};
