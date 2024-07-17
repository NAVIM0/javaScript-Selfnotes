// @flow
"use strict";


//utility function to fix flow errors but honestly not worth it!
function setTextContext(element: ?HTMLElement, text: string, elementName: string) {
  if (element) {
    element.textContent = text;
  } else {
    console.error(`${elementName} not found`);
  }
}


const numberElement: ?HTMLElement = document.querySelector(".number");
const guessElement: ?HTMLElement = document.querySelector(".guess");
const scoreElement: ?HTMLElement = document.querySelector(".score");
const messageElement: ?HTMLElement = document.querySelector(".message");
const highScoreElement: ?HTMLElement = document.querySelector(".highscore");
const checkElement: ?HTMLElement = document.querySelector(".check");
const bodyElement: ?HTMLElement = document.querySelector("body");
const againElement: ?HTMLElement = document.querySelector(".again");

let secretNumber: number = Math.trunc(Math.random() * 20) + 1;


let score = 20;
console.log(secretNumber);

checkElement.addEventListener("click", function() {

  const guess = Number(guessElement.value);

  //case no input
  if (!guess) {
    messageElement.textContent = `No Number!⛔ Please Enter a Valid Number`;
  }

  if (guess === secretNumber) {

    bodyElement.style.backgroundColor = "Green";
    numberElement.style.width = "30rem";
    setTextContext(numberElement, String(guess), "numberElement");
    setTextContext(messageElement, "Congrats! You Guessed it! 🎉", "messageElement");
    highScoreElement.textContent = Number(highScoreElement.textContent) > score ?
      highScoreElement.textContent : score;

  } else {
    messageElement.textContent = guess > secretNumber ? "📉 Too High! Try Lower." : "📈 Too Low! Try Higher.";
    scoreElement.textContent = --score;
  }

  if (score <= 0) {
    bodyElement.style.backgroundColor = "Red";
    messageElement.textContent = "😤 You Lost The Game Moron! Tough Luck!";
    scoreElement.textContent = 0;
  }

});


againElement.addEventListener("click", () => {

  secretNumber = Math.trunc(Math.random() * 20) + 1;
  console.log(secretNumber);
  document.querySelector("body").style.backgroundColor = "#222";
  scoreElement.textContent = score = 20;
  messageElement.textContent = "Start guessing...";
  numberElement.textContent = "?";
  numberElement.style.width = "15rem";
  guessElement.value = "";
});