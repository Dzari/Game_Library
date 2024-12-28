const playerHand = document.getElementById('player-hand');
const computerHand = document.getElementById('computer-hand');
const gameHistoryEl = document.getElementById('game-history');
const scoreEl = document.getElementById('score');
let playerChoice = '';
let winner = '';
let playerChoices = [];

let playerScore = 0;
let computerScore = 0;
let tie = 0;

const hands = ['rock', 'paper', 'scissors'];

document.querySelectorAll('.choice').forEach((button) => {
  button.addEventListener('click', () => {
    playerChoice = button.getAttribute('data-choice');
    startGame();
  });
});

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const startGame = () => {
  playerHand.classList.add('animate-hand');
  computerHand.classList.add('animate-right-hand');
  playerHand.src = './hand_svgs/rock.svg';
  computerHand.src = './hand_svgs/rock.svg';

  setTimeout(() => {
    playerHand.classList.remove('animate-hand');
    computerHand.classList.remove('animate-right-hand');

    const computerChoice = getComputerChoice();

    playerHand.src = `./hand_svgs/${playerChoice}.svg`;
    computerHand.src = `./hand_svgs/${computerChoice}.svg`;

    winner = determineWinner(playerChoice, computerChoice);
    updateGameHistory(winner, playerChoice, computerChoice);
    playerChoices.push(playerChoice);
  }, 3000);
};

function determineWinner(player, computer) {
  if (player === computer) {
    return 'Tie';
  } else if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) {
    return 'Player';
  } else {
    return 'Computer';
  }
}

function updateGameHistory(winner, playerChoice, computerChoice) {
  const historyItem = document.createElement('li');
  historyItem.innerHTML = `
    Player: <strong>${capitalize(playerChoice)}</strong>, <br />
    Computer: <strong>${capitalize(computerChoice)}</strong> - 
    <span style="color: ${
      winner === 'Player' ? 'green' : winner === 'Computer' ? 'red' : 'black'
    };">${winner}</span>
  `;
  gameHistoryEl.prepend(historyItem);

  if (winner === 'Player') {
    playerScore++;
  } else if (winner === 'Computer') {
    computerScore++;
  } else {
    tie++;
  }
  scoreEl.textContent = `Player: ${playerScore} | Computer: ${computerScore} | Tie: ${tie}`;
}

function getComputerChoice() {
  if (playerChoices.length === 0 || Math.floor(Math.random() * 10) > 7) {
    console.log('random');
    return hands[Math.floor(Math.random() * hands.length)];
  }

  const counts = { rock: 0, paper: 0, scissors: 0 };
  playerChoices.forEach((choice) => {
    counts[choice]++;
  });

  const predictedPlayerChoice = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );

  if (predictedPlayerChoice === 'rock') return 'paper';
  if (predictedPlayerChoice === 'paper') return 'scissors';
  if (predictedPlayerChoice === 'scissors') return 'rock';
}
