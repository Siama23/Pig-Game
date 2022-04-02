'use strict';

// Selecting elements
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');

  player0El.classList.remove('name');
  player0El.classList.remove('player--winner');

  player1El.classList.remove('name');
  player1El.classList.remove('player--winner');

  diceEl.classList.add('hidden');
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generating a random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    // Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // add to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // check if score is >= 100: current player wins
    } else {
      // lose all the score and switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // add the current score of the active player to its total score
  if (playing) {
    scores[activePlayer] += currentScore;
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.add('name');
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      console.log(currentScore);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.toggle('hidden');
    } else {
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];
      switchPlayer();
    }
  }

  btnNew.addEventListener('click', init);
});

// if (player0.classList.contains('player--active')) {
// }
// rollButton.addEventListener('click', function () {
//     dice.
// });
