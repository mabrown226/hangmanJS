
// Variables
let correctGuess = 0;
let wrongGuess = 0;



// get the div to print game to 
const board = document.getElementById('hangman');
const alphabet = document.getElementById('alphabet');
const score = document.getElementById('score');

// Create an array of words to be used
const words = ['red'];
const letters =['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// Get the word
let winner = words[0];
let toPrint = ``;
let createButtons = ``;

// FUNCTIONS
// create the buttons on the board
function createLetters() {
  for (let i = 0; i < letters.length; i++) {
    createButtons += `<button onclick="guessLetter('${letters[i]}')" id="${letters[i]}" class="m-1">${letters[i]}</button>`;
  }
  return createButtons;
}

// create a function to guess the letter
function guessLetter (letter) {
  let match = '';
  let status = '';
  //turn word into array
  let wordArray = winner.split('');
  // Loop thru the array of letters
  for (let i = 0; i < wordArray.length; i++) {
    if (letter == wordArray[i]) {  
      match = 'y';
      console.log('yep');
    } else {
      match = 'n';
      console.log('no');
    }
  }
  // decide if the word contains the letter and then update score
  if (match === 'y') {
    status = 'match'
  } else {
    status = 'no';
  }
  removeLetter(letter);
  updateScore(status);
}

// Remove the letter
function removeLetter(letter) {
  let tempBtn = document.getElementById(`${letter}`);
  tempBtn.classList.add('clear');
}

// Get the number of letters in the word, and print out the blank spaces
function printLetters() {
  for (let i = 0; i < winner.length; i++) {
    toPrint += `-`
  }
}

// update the score
function updateScore(status) {
  if (status === 'match') {
    correctGuess += 1;
  } else {
    wrongGuess += 1;
  }
  score.innerHTML = '<p class="lead">Wrong Guess: ' + wrongGuess + ' Correct Guess: ' + correctGuess +'</p>';

}


// print stuff on screen
printLetters();
board.innerHTML += `<h5 class="lead text-center">${toPrint}</h5>`;
alphabet.innerHTML = createLetters();
score.innerHTML = '<p class="lead">Correct Guess: ' + correctGuess + ' Wrong Guess: ' + wrongGuess + '</p>';


