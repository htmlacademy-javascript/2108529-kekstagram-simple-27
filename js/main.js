
// Больше функций
function getRandomPositiveInteger(a, b) {
  if (a < 0 || b < 0) {
    return NaN;
  }

  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function checkStringLength(string, length) {
  return string.length <= length;
}

// Больше деталей
let postsAmount = 25;

const createPost = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: 'chillin',
  likes: getRandomPositiveInteger(15, 200),
  comments: getRandomPositiveInteger(0, 200)
});

let posts = Array.from({ length: postsAmount }, (_, post) => createPost(post + 1));
