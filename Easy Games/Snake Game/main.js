const gameField = document.querySelector(".game__field");
const gridSize = 25;
const gridColumns = 32;
const gridRows = 24;
let gameInterval;
let speed = 200; 

// Snake Class
class Snake {
  constructor(startPosition) {
    this.segments = [startPosition];
    this.direction = { x: 0, y: 0 }; 
    this.nextDirection = null;
  }

  move() {
    if (this.nextDirection) {
      this.direction = this.nextDirection;
      this.nextDirection = null;
    }

    const newHead = {
      x: this.segments[0].x + this.direction.x,
      y: this.segments[0].y + this.direction.y,
    };

    this.segments.unshift(newHead);

    return this.segments.pop();
  }

  grow() {
    const lastSegment = this.segments[this.segments.length - 1];
    this.segments.push({ ...lastSegment });
  }

  collidesWith(position) {
    return this.segments.some(segment => segment.x === position.x && segment.y === position.y);
  }

  render() {
    gameField.innerHTML = "";
    this.segments.forEach((segment, index) => {
      const segmentDiv = document.createElement("div");
      segmentDiv.style.width = `${gridSize}px`;
      segmentDiv.style.height = `${gridSize}px`;
      segmentDiv.style.position = "absolute";
      segmentDiv.style.transform = `translate(${(segment.x - 1) * gridSize}px, ${(segment.y - 1) * gridSize}px)`;
      segmentDiv.style.backgroundColor = index === 0 ? "#4caf50" : "#81c784";
      segmentDiv.style.borderRadius = "5px";
      gameField.appendChild(segmentDiv);
    });
  }
}

// Apple Class
class Apple {
  constructor(position) {
    this.position = position;
  }

  randomizePosition() {
    this.position = {
      x: Math.floor(Math.random() * gridColumns) + 1,
      y: Math.floor(Math.random() * gridRows) + 1,
    };
  }

  render() {
    const appleDiv = document.createElement("div");
    appleDiv.style.width = `${gridSize}px`;
    appleDiv.style.height = `${gridSize}px`;
    appleDiv.style.position = "absolute";
    appleDiv.style.transform = `translate(${(this.position.x - 1) * gridSize}px, ${(this.position.y - 1) * gridSize}px)`;
    appleDiv.style.backgroundColor = "#e74c3c";
    appleDiv.style.borderRadius = "50%";
    gameField.appendChild(appleDiv);
  }
}

const snake = new Snake({ x: 12, y: 12 });
const apple = new Apple({ x: 18, y: 12 });

function moveSnake() {
  snake.move();

  const head = snake.segments[0];
  if (head.x < 1 || head.x > gridColumns || head.y < 1 || head.y > gridRows) {
    alert("Game Over! The snake hit the wall.");
    resetGame();
    return;
  }

  if (snake.segments.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
    alert("Game Over! The snake collided with itself.");
    resetGame();
    return;
  }

  if (head.x === apple.position.x && head.y === apple.position.y) {
    snake.grow();
    apple.randomizePosition();
  }

  snake.render();
  apple.render();
}

function handleDirectionChange(event) {
  const newDirection = { ...snake.direction };

  switch (event.key) {
    case "ArrowUp":
      if (snake.direction.y === 0) newDirection.x = 0, newDirection.y = -1;
      break;
    case "ArrowDown":
      if (snake.direction.y === 0) newDirection.x = 0, newDirection.y = 1;
      break;
    case "ArrowLeft":
      if (snake.direction.x === 0) newDirection.x = -1, newDirection.y = 0;
      break;
    case "ArrowRight":
      if (snake.direction.x === 0) newDirection.x = 1, newDirection.y = 0;
      break;
  }

  //if (newDirection.x !== -snake.direction.x || newDirection.y !== -snake.direction.y) {
    snake.nextDirection = newDirection;
  //}
}

function resetGame() {
  clearInterval(gameInterval);
  snake.segments = [{ x: 5, y: 10 }];
  snake.direction = { x: 0, y: 0 };
  apple.randomizePosition();
  startGame();
}

function startGame() {
  gameInterval = setInterval(moveSnake, speed);
  snake.render();
  apple.render();
}

document.addEventListener("keydown", handleDirectionChange);

startGame();
