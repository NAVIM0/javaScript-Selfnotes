// @flow
'use strict';

function resetGame() {

  if (modalElement) modalElement.classList.remove('hidden');
  if (overlayElement) overlayElement.classList.remove('hidden');
  currentPlayer = 0;
  currentScore = 0;
  if (diceElement) diceElement.classList.add('hidden');
  if (temp1score) temp1score.textContent = '0';
  if (temp0score) temp0score.textContent = '0';
  if (current0scoreElement) current0scoreElement.textContent = '0';
  if (current1scoreElement) current1scoreElement.textContent = '0';
}

function closeModal() {
  if (modalElement) modalElement.classList.add('hidden'); else console.error('modal Not Found');
  if (overlayElement) overlayElement.classList.add('hidden'); else console.error('overlay Not Found');
}

function switchPlayer() {

  currentScore = 0;

  if (currentPlayer) {

    if (temp1score) temp1score.textContent = '0';
    currentPlayer--;
    if(player0Element) player0Element.classList.add('player--active'); else console.error('player0Element Not Found');
    if(player1Element) player1Element.classList.remove('player--active'); else console.error('player1Element Not Found');

  } else {

    if (temp0score) temp0score.textContent = '0';
    currentPlayer++;
    if(player0Element) player0Element.classList.remove('player--active'); else console.error('player0Element Not Found');
    if(player1Element) player1Element.classList.add('player--active'); else console.error('player1Element Not Found');
  }
}

const player0Element :?HTMLElement = document.querySelector('.player--0');
const player1Element :?HTMLElement = document.querySelector('.player--1');
const btnCloseModalElement: ?HTMLElement = document.querySelector('.close-modal');
const modalElement: ?HTMLElement = document.querySelector('.modal');
const overlayElement: ?HTMLElement = document.querySelector('.overlay');
const diceElement: ?HTMLImageElement = (document.querySelector('.dice'): any);
const btnRollDice: ?HTMLElement = document.querySelector('.btn--roll');
const current0scoreElement: ?HTMLElement = document.getElementById('score--0');
const current1scoreElement: ?HTMLElement = document.getElementById('score--1');
const newBtnElement: ?HTMLElement = document.querySelector('.btn--new');
const btnHoldElement: ?HTMLElement = document.querySelector('.btn--hold');
const temp0score: ?HTMLElement = document.getElementById('current--0');
const temp1score: ?HTMLElement = document.getElementById('current--1');
const confirmBtnElement: ?HTMLElement = document.querySelector('.confirm');
const cancelBtnElement: ?HTMLElement = document.querySelector('.cancel');
let currentScore = 0;
let currentPlayer = 0;

if (btnRollDice) btnRollDice.addEventListener('click', () => {

  let dice = Math.trunc(Math.random() * 6 + 1);

  if (diceElement) {
    diceElement.src = `dice-${dice}.png`;
    diceElement.classList.remove('hidden');
  }

  if (dice === 1) {

    switchPlayer();

  } else {

    currentScore += dice;

    //update the current score
    if (currentPlayer) {
      if (temp1score) temp1score.textContent = currentScore.toString(); else console.error('element not found');

    } else {
      if (temp0score) temp0score.textContent = currentScore.toString(); else console.error('element not found');
    }
  }
}); else console.error('element Not Found');


if (btnHoldElement) btnHoldElement.addEventListener('click', () => {

  if (currentPlayer) {

    if (current1scoreElement) {

      let tempScore = Number(current1scoreElement.textContent) + currentScore;
      current1scoreElement.textContent = tempScore >= 100 ? "Winner!" : String(tempScore);

    } else console.error('element Not Found');

  } else {

    if (current0scoreElement) {

      let tempScore = Number(current0scoreElement.textContent) + currentScore;
      current0scoreElement.textContent = tempScore >= 100 ? "Winner!" : String(tempScore);

    } else console.error('element Not Found');
  }
  switchPlayer();

}); else console.error('element Not Found');


if (newBtnElement) newBtnElement.addEventListener('click', () => {

  resetGame();

}); else console.error('element Not Found');


if (btnCloseModalElement) btnCloseModalElement.addEventListener('click', () => {
  closeModal();

}); else console.error('overlay Not Found');


document.addEventListener('keydown', (e: KeyboardEvent) => {

  if (modalElement && e.code === 'Escape' && !modalElement.classList.contains('hidden')) {
    closeModal();
  }

});

if (overlayElement) overlayElement.addEventListener('click', () => {
  closeModal();
});

if (confirmBtnElement) confirmBtnElement.addEventListener('click', () => {
  resetGame();
  closeModal();
});

if (cancelBtnElement) cancelBtnElement.addEventListener('click', () => {
  closeModal();
});


