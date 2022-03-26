// Arrays
const words = ['blue', 'green', 'red', 'orange', 'violet', 'indigo', 'yellow'];
const letters =['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let correct = [];

// Variable to use
let correctGuess = 0;
let wrongGuess = 0;
let winner = '';
let toPrint = ``;
let createButtons = ``;

// get the div to be able to print to screen
const board = document.getElementById('hangman');
const alphabet = document.getElementById('alphabet');
const score = document.getElementById('score');
const pic = document.getElementById('pic');
const play = document.getElementById('play');
const button = document.getElementsByClassName('button');

// Functions
// get a random word from the array of words
function getWord() {
  let num = Math.floor(Math.random() * words.length);
  return words[num];
}

// create the buttons on the board
function createLetters() {
  createButtons = '';
  for (let i = 0; i < letters.length; i++) {
    createButtons += `<button onclick="guessLetter('${letters[i]}')" id="${letters[i]}" class="m-1 button">${letters[i]}</button>`;
  }
  return createButtons;
}

// function to check for all indexes of a letter
function checkAll(winner, letter) {
  let indices = [];
  for (let i = 0; i < winner.length; i++) {
    if (winner[i] === letter) {
      indices.push(i);
    }
  }
  return indices
}

// create a function to guess the letter
function guessLetter (letter) {
  let status = '';
  let index = 0;
  //turn word into array
  let wordArray = winner.split('');

  // check if the clicked letter is included in the word
  if (winner.includes(letter)) {
    status = 'y';
    index = checkAll(winner, letter);
  } else {
    status = 'n';
  }
  removeLetter(letter);
  updateScore(status, index);
}

// Get the number of letters in the word, and print out the blank spaces and/or known letters.
function createGuessArray() {
  for (let i = 0; i < winner.length; i++) {
    correct.push('?');
  }
}

// Print the letGuessed to the screen
function printLeters() {
  toPrint = '';
  for (let i = 0; i < correct.length; i++) {
    toPrint += correct[i];
  }
}

// update the score
function updateScore(status, index) {
  if (status === 'y') {
    let tmp = 0;
    if (index.length > 1) {
      
      for (let i = 0; i < index.length; i++) {
        let x = index[i];
        correct[x] = winner[x];
        tmp++;
      }
    } else {
      correct[index] = winner[index];
      tmp = 1;
    }
    correctGuess += tmp;
    console.log('WinnerLength: ' + winner.length + ' correctguess: ' + correctGuess + ' tmp: ' + tmp);

    if (correctGuess === winner.length) {
      pic.innerHTML = '<img src="img/win.png" alt="">';
      alphabet.classList.add('clear');
    }
  } else {
    wrongGuess += 1;
    switch (wrongGuess) {
      case 1:
        pic.innerHTML = '<img src="img/hang2.png" alt="">';
        break;
      case 2:
        pic.innerHTML = '<img src="img/hang3.png" alt="">';
        break;
      case 3:
        pic.innerHTML = '<img src="img/hang4.png" alt="">';
        break;
      case 4:
        pic.innerHTML = '<img src="img/hang5.png" alt="">';
        break;
      case 5:
        pic.innerHTML = '<img src="img/hang6.png" alt="">';
        break;
      case 6:
        pic.innerHTML = '<img src="img/hang7.png" alt="">';
        alphabet.classList.add('clear');

        break;
    }
  }
  printLeters();
  score.innerHTML = '<p class="lead">Wrong Guess: ' + wrongGuess + ' Correct Guess: ' + correctGuess +'</p>';
  board.innerHTML = '<h3 class="text-center">' + toPrint + '</h3>';
}

// Remove the letter
function removeLetter(letter) {
  let tempBtn = document.getElementById(`${letter}`);
  tempBtn.classList.add('clear');
}

function removeButtons() {
  while (alphabet.firstChild) {
    alphabet.removeChild(alphabet.firstChild);
  }
  
}

// function to reset the game
function resetGame (){
  correctGuess = 0;
  wrongGuess = 0;
  alphabet.classList.remove('clear');
  removeButtons();
  play.classList.remove('clear');
  pic.innerHTML = '<img src="img/hang1.png" alt="">';
  board.innerHTML = '';
  toPrint = '';
  winner = '';
  correct = [];
  playGame();
}


// when the button on the main page is pressed this function starts the game
function playGame() {
  play.classList.add('clear');
  winner = getWord();
  createGuessArray();
  console.log(correct);
  printLeters();
  alphabet.innerHTML = createLetters();
  score.innerHTML = '<p class="lead">Correct Guess: ' + correctGuess + ' Wrong Guess: ' + wrongGuess + '</p>';
  board.innerHTML = '<h3 class="text-center">' + toPrint + '</h3>';
  console.log(winner);
}








