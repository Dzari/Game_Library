const gameContainer = document.querySelector('.game__container');
const paddle = document.querySelector('.game__paddle');
const ball = document.querySelector('.game__ball');
const startButton = document.querySelector('.game__start-btn');
const gameInfo = document.querySelector('.game__info');
const backgroundMusic = document.getElementById('background-music');
const ball_bounce = document.getElementById('ball-bounce');
const brick_break = document.getElementById('break-brick');
const wall_bounce = document.getElementById('wall-bounce');

// Game settings
let paddleSpeed = 800;
let ballSpeedX = 4;
let ballSpeedY = -4;
let paddlePosition = 600;
let ballPositionX = 640;
let ballPositionY = 660;

//music settings
backgroundMusic.volume = 0.5;

function handleVisibilityChange() {
  if (document.visibilityState === 'visible') {
    backgroundMusic.play();
  } else {
    backgroundMusic.pause();
  }
}

document.addEventListener('visibilitychange', handleVisibilityChange);

let ballInterval;
let bricks = [];

// Function to create bricks dynamically
const createBricks = () => {
  const rows = 6;
  const cols = 20;
  const brickWidth = 60;
  const brickHeight = 20;
  const gap = 1;

  // Clear any existing bricks
  bricks.forEach((brick) => brick.remove());
  bricks = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const brick = document.createElement('div');
      brick.classList.add('game__brick');
      brick.style.top = `${row * (brickHeight + gap) + 30}px`;
      brick.style.left = `${col * (brickWidth + gap) + 30}px`;
      gameContainer.appendChild(brick);
      bricks.push(brick);
    }
  }
};

// Function to start the game
const startGame = () => {
  backgroundMusic.play();
  backgroundMusic.volume = 0.5;
  gameInfo.style.display = 'none';
  createBricks();
  bricks.forEach((brick) => (brick.style.display = 'block'));

  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);

  // Start ball movement
  ballInterval = setInterval(moveBall, 20);
};

let moveDirection = null;
let animationFrameId = null;
let lastTimeStamp = 0;

const movePaddle = (timestamp) => {
  const deltaTime = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  if (moveDirection === 'left') {
    paddlePosition -= paddleSpeed * deltaTime;
  } else if (moveDirection === 'right') {
    paddlePosition += paddleSpeed * deltaTime;
  }

  // Keep paddle within bounds
  const containerWidth = gameContainer.clientWidth;
  const paddleWidth = paddle.clientWidth;

  if (paddlePosition < 0) paddlePosition = 0;
  if (paddlePosition > containerWidth - paddleWidth)
    paddlePosition = containerWidth - paddleWidth;

  paddle.style.left = `${paddlePosition}px`;

  animationFrameId = requestAnimationFrame(movePaddle);
};

const moveBall = () => {
  ballPositionX += ballSpeedX;
  ballPositionY += ballSpeedY;

  ball.style.left = `${ballPositionX}px`;
  ball.style.top = `${ballPositionY}px`;

  // Wall collision
  if (
    ballPositionX <= 0 ||
    ballPositionX >= gameContainer.clientWidth - ball.clientWidth
  ) {
    wall_bounce.play();
    ballSpeedX *= -1;
  }

  // Paddle collision
  const paddleRect = paddle.getBoundingClientRect();
  const ballRect = ball.getBoundingClientRect();

  if (
    ballRect.bottom >= paddleRect.top &&
    ballRect.right >= paddleRect.left &&
    ballRect.left <= paddleRect.right
  ) {
    ball_bounce.play();
    ballSpeedY *= -1;
  }

  // Brick collision
  bricks.forEach((brick, index) => {
    const brickRect = brick.getBoundingClientRect();
    if (
      ballRect.bottom >= brickRect.top &&
      ballRect.top <= brickRect.bottom &&
      ballRect.right >= brickRect.left &&
      ballRect.left <= brickRect.right
    ) {
      brick_break.play();
      ballSpeedY *= -1;
      brick.remove();
      bricks.splice(index, 1);
    }
  });

  // Ball falls off the bottom
  if (ballPositionY >= gameContainer.clientHeight) {
    resetGame();
  }
};

// Function to reset the game
const resetGame = () => {
  backgroundMusic.volume = 0.1;
  clearInterval(ballInterval);
  gameInfo.style.display = 'block';
  bricks.forEach((brick) => brick.remove());
  moveDirection = null;

  document.removeEventListener('keydown', handleKeyDown);
  document.removeEventListener('keyup', handleKeyUp);

  // Reset ball position
  ballPositionX = 640;
  ballPositionY = 660;
  paddlePosition = 600;
  paddle.style.left = `${paddlePosition}px`;
  ball.style.left = `${ballPositionX}px`;
  ball.style.top = `${ballPositionY}px`;
};

// Event listener handlers
const handleKeyDown = (e) => {
  if (e.key === 'ArrowLeft' && moveDirection !== 'left') {
    moveDirection = 'left';
    if (!animationFrameId) {
      lastTimestamp = performance.now();
      animationFrameId = requestAnimationFrame(movePaddle);
    }
  } else if (e.key === 'ArrowRight' && moveDirection !== 'right') {
    moveDirection = 'right';
    if (!animationFrameId) {
      lastTimestamp = performance.now();
      animationFrameId = requestAnimationFrame(movePaddle);
    }
  }
};

const handleKeyUp = (e) => {
  if (e.key === 'ArrowLeft' && moveDirection === 'left') {
    moveDirection = null;
  } else if (e.key === 'ArrowRight' && moveDirection === 'right') {
    moveDirection = null;
  }

  if (!moveDirection) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
};

// Event listeners
startButton.addEventListener('click', startGame);
