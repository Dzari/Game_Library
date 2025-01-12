const snake = document.querySelector('.game-snake');
const gridColumns = 32;
const gridRows = 24;

let snakePosition = { x: 12, y: 12 };
let snakeDirection = { x: 0, y: 0 };
let speed = 200;

function updateSnakePosition() {
  snakePosition.x += snakeDirection.x;
  snakePosition.y += snakeDirection.y;

  if (snakePosition.x < 1) restartGame();
  if (snakePosition.x > gridColumns) restartGame();
  if (snakePosition.y < 1) restartGame();
  if (snakePosition.y > gridRows) restartGame();

  snake.style.gridColumn = `${snakePosition.x} / span 1`;
  snake.style.gridRow = `${snakePosition.y} / span 1`;
}

function changeDirection(event) {
  switch (event.key) {
    case 'ArrowUp':
      if (snakeDirection.y === 0) snakeDirection = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (snakeDirection.y === 0) snakeDirection = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (snakeDirection.x === 0) snakeDirection = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (snakeDirection.x === 0) snakeDirection = { x: 1, y: 0 };
      break;
  }
}

function restartGame() {
  snakePosition = { x: 5, y: 10 };
  snakeDirection = { x: 0, y: 0 };
}

document.addEventListener('keydown', changeDirection);

setInterval(updateSnakePosition, speed);
