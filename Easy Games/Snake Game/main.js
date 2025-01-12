const snake = document.querySelector('.game-snake');
const apple = document.querySelector('.game-apple');
const gridColumns = 32;
const gridRows = 24;

const snakeData = {
  length: 1,
  position: { x: 12, y: 12 },
  direction: { x: 0, y: 0 },
  speed: 200,
};

let applePosition = { x: 18, y: 12 };

function updateSnakePosition() {
  snakeData.position.x += snakeData.direction.x;
  snakeData.position.y += snakeData.direction.y;

  if (
    snakeData.position.x < 1 ||
    snakeData.position.x > gridColumns ||
    snakeData.position.y < 1 ||
    snakeData.position.y > gridRows
  )
    restartGame();

  if (
    snakeData.position.x === applePosition.x &&
    snakeData.position.y === applePosition.y
  ) {
    snakeData.length += 1;
    apple.style.visibility = 'hidden';
  }

  snake.style.gridColumn = `${snakeData.position.x} / span 1`;
  snake.style.gridRow = `${snakeData.position.y} / span 1`;
}

function setApplePosition() {
  apple.style.gridColumn = `${applePosition.x} / span 1`;
  apple.style.gridRow = `${applePosition.y} / span 1`;
}

function changeDirection(event) {
  switch (event.key) {
    case 'ArrowUp':
      if (snakeData.direction.y === 0) snakeData.direction = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (snakeData.direction.y === 0) snakeData.direction = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (snakeData.direction.x === 0) snakeData.direction = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (snakeData.direction.x === 0) snakeData.direction = { x: 1, y: 0 };
      break;
  }
}

function restartGame() {
  setApplePosition();
  snakeData.position = { x: 12, y: 12 };
  snakeData.direction = { x: 0, y: 0 };
  apple.style.visibility = 'visible';
}

document.addEventListener('keydown', changeDirection);

setInterval(updateSnakePosition, snakeData.speed);
