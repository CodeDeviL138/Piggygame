'use strict';

//selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');

//selecting dice
const diceEl = document.querySelector('.dice');

//selecting buttons
const newGame = document.querySelector('.btn--new');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');

let score, currentScore, activePlayer, playing;

// Starting Conditions

const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--');
};

init();

//Enter player Names Manually
const playername1 = prompt('Please Enter Player 1 Name');
const playername2 = prompt('Please Enter Player 2 Name');
document.querySelector('#name--0').textContent = playername1;
document.querySelector('#name--1').textContent = playername2;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;

  //switch the active player class to opposite team which will be active
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

/// rolling dice

roll.addEventListener('click', function () {
  if (playing) {
    //1 generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2 display dice image accordingly
    diceEl.classList.remove('hidden'); // removing hidden class
    diceEl.src = `dice-${dice}.png`;

    //3 check for rolled dice value
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

hold.addEventListener('click', function () {
  if (playing) {
    //1 add currentScore to score
    score[activePlayer] += currentScore;

    console.log(activePlayer, score[activePlayer], currentScore);
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    //2. check if player's score in >= 100

    if (score[activePlayer] >= 100) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else switchPlayer(); //switch to the otherplayer
  }
});

newGame.addEventListener('click', init);
