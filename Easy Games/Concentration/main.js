const cards = document.querySelectorAll('.game__card');

const cardFrontClasses = [
  'game__card--front-carrot',
  'game__card--front-beans',
  'game__card--front-beet',
  'game__card--front-pumpkin',
  'game__card--front-eggplant',
  'game__card--front-tomato',
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const shuffledClasses = shuffle([...cardFrontClasses, ...cardFrontClasses]);

cards.forEach((card, index) => {
  card.classList.add(shuffledClasses[index]);
});

document.querySelectorAll('.game__card').forEach((card) => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});
