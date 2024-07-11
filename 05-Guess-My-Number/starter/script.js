// @flow
'use strict';

const numberElement = document.querySelector('.number');
const guessElement = document.querySelector('.guess');
const scoreElement = document.querySelector('.score');
const messageElement = document.querySelector('.message');
const highScoreElement = document.querySelector('.highscore');
let secretNumber = Math.trunc(Math.random() * 20) + 1;


let score = 20;
console.log(secretNumber);


document.querySelector('.check').addEventListener('click', function() {

  const guess = Number(guessElement.value);

  //case no input
  if (!guess) {
    messageElement.textContent = `No Number!⛔ Please Enter a Valid Number`;
  }

  if (guess === secretNumber) {

    document.querySelector('body').style.backgroundColor = 'Green';
    numberElement.style.width = '30rem';
    numberElement.textContent = guess;
    messageElement.textContent = 'Congrats! You Guessed it! 🎉';
    highScoreElement.textContent = Number(highScoreElement.textContent) > score ?
      highScoreElement.textContent : score;

  } else {
    messageElement.textContent = guess > secretNumber ? '📉 Too High! Try Lower.' : '📈 Too Low! Try Higher.';
    scoreElement.textContent = --score;
  }

  if (score <= 0) {
    document.querySelector('body').style.backgroundColor = 'Red';
    messageElement.textContent = '😤 You Lost The Game Moron! Tough Luck!';
    scoreElement.textContent = 0;
  }

});


document.querySelector('.again').addEventListener('click', () => {

  secretNumber = Math.trunc(Math.random() * 20) + 1;
  console.log(secretNumber);
  document.querySelector('body').style.backgroundColor = '#222';
  scoreElement.textContent = score = 20;
  messageElement.textContent = 'Start guessing...';
  numberElement.textContent = '?';
  numberElement.style.width = '15rem';
  guessElement.value = '';
});