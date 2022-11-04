// import { getRandomPositiveInteger } from './util.js'

const empty = '';


// Создаем посты
// const POSTS_AMOUNT = 25;


// const createPost = (index) => ({
//   id: index,
//   url: `photos/${index}.jpg`,
//   description: 'chillin',
//   likes: getRandomPositiveInteger(15, 200),
//   comments: getRandomPositiveInteger(0, 200)
// });

// const createPosts = () => Array.from({ length: POSTS_AMOUNT }, (_, post) => createPost(post + 1));
// const createdPosts = createPosts();

const photoEffects = {
  'effect-none': ['effects__preview--none'],
  'effect-chrome': ['effects__preview--chrome', 'grayscale'],
  'effect-sepia': ['effects__preview--sepia', 'sepia'],
  'effect-marvin': ['effects__preview--marvin', 'invert'],
  'effect-phobos': ['effects__preview--phobos', 'blur'],
  'effect-heat': ['effects__preview--heat', 'brightness']
}

export { empty, photoEffects };
