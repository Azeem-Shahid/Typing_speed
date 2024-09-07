// Get DOM elements
const word = document.getElementById("word"); // Element to display the current word to type
const text = document.getElementById("text"); // Input field where user types the words
const scoreEl = document.getElementById("score"); // Element to display the score
const timeEl = document.getElementById("time"); // Element to display the remaining time
const endgameEl = document.getElementById("end-game-container"); // Container for the end game screen
const settingsBtn = document.getElementById("settings-btn"); // Button to toggle settings visibility
const settings = document.getElementById("settings"); // Settings container
const settingsForm = document.getElementById("settings-form"); // Settings form element
const difficultySelect = document.getElementById("difficulty"); // Difficulty select element
const startBtn = document.getElementById("start-btn"); // Start button

// Disable the text input and hide it initially
text.disabled = true;
text.style.display = "none";

// List of words for the game
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

// Initialize word
let randomWord;

// Initialize score
let score = 0;

// Initialize time
let time = 10;

// Set difficulty to value in localStorage or default to 'medium'
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Set difficulty select value to the stored or default difficulty
difficultySelect.value = difficulty;

// Variable to hold the interval for the countdown timer
let timeInterval;

// Start button click event
startBtn.addEventListener("click", () => {
  text.disabled = false; // Enable the text input
  text.style.display = "block"; // Show the text input
  startBtn.style.display = "none"; // Hide the start button
  text.focus(); // Focus on the text input
  timeInterval = setInterval(updateTime, 1000); // Start the countdown timer
  addWordToDOM(); // Display the first word
});

// Generate a random word from the array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add a new word to the DOM
function addWordToDOM() {
  randomWord = getRandomWord(); // Get a random word
  word.innerHTML = randomWord; // Set the word element's content to the new word
}

// Update the score
function updateScore() {
  score++; // Increment score
  scoreEl.innerHTML = score; // Update the score element with the new score
}

// Update the remaining time
function updateTime() {
  time--; // Decrease time by 1 second
  timeEl.innerHTML = time + "s"; // Display the remaining time

  // Check if time has run out
  if (time === 0) {
    clearInterval(timeInterval); // Stop the countdown timer
    gameOver(); // End the game
  }
}

// Display the end game screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `; // Show final score and a reload button

  endgameEl.style.display = "flex"; // Display the end game container
}

// Event listener for typing input
text.addEventListener("input", (e) => {
  const insertedText = e.target.value; // Get the typed text

  // Check if the typed text matches the random word
  if (insertedText === randomWord) {
    addWordToDOM(); // Display a new word
    updateScore(); // Increment the score

    // Clear the input field
    e.target.value = "";

    // Adjust time based on difficulty
    if (difficulty === "hard") {
      time += 2; // Add 2 seconds for hard difficulty
    } else if (difficulty === "medium") {
      time += 3; // Add 3 seconds for medium difficulty
    } else {
      time += 5; // Add 5 seconds for easy difficulty
    }

    updateTime(); // Update the time display
  }
});

// Settings button click event to toggle settings visibility
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// Settings select change event to update difficulty
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value; // Get the selected difficulty
  localStorage.setItem("difficulty", difficulty); // Store the difficulty in localStorage
});
