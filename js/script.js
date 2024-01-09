"use strict";

import { EnglishPuzzle } from "./puzzle.js";

const puzzleContainer = document.getElementById("puzzle");
const puzzleItemsContainer = document.getElementById("puzzleItems");
const feedbackContainer = document.getElementById("feedback");

const checkPhraseButton = document.getElementById("checkPhraseButton");
const pronouncePhraseButton = document.getElementById("pronouncePhraseButton");
const showNextPhraseButton = document.getElementById("showNextPhraseButton");

const phrases = [
  "Hello, how are you today?",
  "Good morning, have a great day!",
  "What's your favorite programming language?",
  "Thank you for your kind words.",
  "I enjoy coding and solving problems.",
  "Have a nice and relaxing weekend!",
  "Where is the nearest coffee shop?",
  "Learn new things every day.",
  "My name is John, what's yours?",
];

const puzzleGame = new EnglishPuzzle(
  phrases,
  puzzleContainer,
  puzzleItemsContainer,
  feedbackContainer,
  showNextPhrase
);
puzzleGame.startGame();

checkPhraseButton.addEventListener("click", () => {
  puzzleGame.check();
});

pronouncePhraseButton.addEventListener("click", () => {
  puzzleGame.speak();
});

function allowDrop(event) {
  event.preventDefault();
}

puzzleContainer.addEventListener("dragover", allowDrop);
puzzleContainer.addEventListener("drop", (event) => {
  puzzleGame.handleDrop(event);
});

function showNextPhrase(isShown) {
  checkPhraseButton.style.display = isShown ? "none" : "inline";
  pronouncePhraseButton.style.display = isShown ? "none" : "inline";
  showNextPhraseButton.style.display = isShown ? "inline" : "none";
}

showNextPhraseButton.addEventListener("click", () => {
  puzzleGame.startGame();
  puzzleContainer.innerHTML = "";
  showNextPhrase(false);
});
