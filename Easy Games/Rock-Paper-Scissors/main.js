const playerHand = document.getElementById('player-hand');
const computerHand = document.getElementById('computer-hand');
const startButton = document.getElementById('start-button');

const hands = ['./hand_svgs/rock.svg', './hand_svgs/paper.svg', './hand_svgs/scissors.svg'];

startButton.addEventListener('click', () => {
  playerHand.classList.add('animate-hand');
  computerHand.classList.add('animate-right-hand');
  playerHand.src = './hand_svgs/rock.svg';
  computerHand.src = './hand_svgs/rock.svg';

  setTimeout(() => {
    playerHand.classList.remove('animate-hand');
    computerHand.classList.remove('animate-right-hand');
    const playerChoice = hands[Math.floor(Math.random() * hands.length)];
    const computerChoice = hands[Math.floor(Math.random() * hands.length)];
    playerHand.src = playerChoice;
    computerHand.src = computerChoice;
  }, 3000);
});
