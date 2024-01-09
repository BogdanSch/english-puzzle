export class EnglishPuzzle {
  constructor(
    phrases,
    puzzleContainer,
    puzzleItemsContainer,
    feedbackContainer,
    showNextPhraseButton
  ) {
    this.phrases = phrases;
    this.puzzleContainer = puzzleContainer;
    this.puzzleItemsContainer = puzzleItemsContainer;
    this.feedbackContainer = feedbackContainer;
    this.showNextPhraseButton = showNextPhraseButton;
    this.currentPhrase = "";
    this.originalPhrase = "";
    this.shuffledWords = [];
  }

  startGame() {
    this.getRandomPhrase();
    this.shufflePhrase();
    this.render();
  }

  getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * this.phrases.length);
    this.originalPhrase = this.phrases[randomIndex];
    this.currentPhrase = this.phrases[randomIndex].split(" ");
  }

  shufflePhrase() {
    this.shuffledWords = [...this.currentPhrase];
    for (let i = this.shuffledWords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shuffledWords[i], this.shuffledWords[j]] = [
        this.shuffledWords[j],
        this.shuffledWords[i],
      ];
    }
  }

  render() {
    this.puzzleItemsContainer.innerHTML = "";
    this.shuffledWords.forEach((word) => {
      const card = this.createCard(word, true);
      this.puzzleItemsContainer.appendChild(card);
    });
  }

  createCard(text, isDraggable) {
    const card = document.createElement("div");
    card.className = `card${isDraggable ? "" : " word-card"} p-2`;
    card.textContent = text;
    if (isDraggable) {
      card.draggable = true;
      card.addEventListener("dragstart", (e) => this.dragStart(e));
    } else {
      card.onclick = this.takeCardBack;
    }
    return card;
  }

  dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.textContent);
  }

  handleDrop(event) {
    event.preventDefault();
    const draggedText = event.dataTransfer.getData("text/plain");
    const card = this.createCard(draggedText, false);
    this.puzzleContainer.appendChild(card);
    this.removePuzzleCard(draggedText);
  }

  takeCardBack = (event) => {
    const targetCard = event.target;
    const card = this.createCard(targetCard.textContent, true);
    this.puzzleItemsContainer.appendChild(card);
    this.puzzleContainer.removeChild(targetCard);
  };

  removePuzzleCard(draggedText) {
    const cards = Array.from(this.puzzleItemsContainer.children);
    const indexToRemove = cards.findIndex((c) => c.textContent === draggedText);
    if (indexToRemove !== -1) {
      cards[indexToRemove].remove();
    }
  }

  check() {
    const userOrder = Array.from(document.querySelectorAll(".word-card")).map(
      (card) => card.textContent
    );
    const isCorrect = this.arraysEqual(userOrder, this.currentPhrase);

    this.feedbackContainer.textContent = isCorrect
      ? "You did that. Correct!"
      : "Incorrect try again!";

    this.feedbackContainer.classList.remove("text-success", "text-danger");
    this.feedbackContainer.classList.add(
      isCorrect ? "text-success" : "text-danger"
    );

    this.showNextPhraseButton(isCorrect);
  }

  speak() {
    const utterance = new SpeechSynthesisUtterance(this.originalPhrase);
    window.speechSynthesis.speak(utterance);
  }

  arraysEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  }
}
