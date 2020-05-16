//VARIABLES
const cards = document.querySelectorAll('.card');
const status = document.querySelector('.status');
const tries = document.querySelector('.tries');
const innerText = document.querySelectorAll('.inner-text');
const button = document.querySelector('button');
let wins = numTries = 0;
let selectedValues = [];
let values = generateValues();
let gameStarted = false;

//FUNCTIONS
function generateValues(){
    let values = []
    for(i = 0; i < cards.length / 2; i++){
        values.push(Math.floor(Math.random() * 100))
    }
    return [...values, ...values]
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startGame(){
    gameStarted = true;
    values = generateValues();
    shuffleArray(values)
    innerText.forEach((card, i) => {
        card.classList.remove('show');
        card.textContent = values[i];
    })
    button.classList.remove('play-again');
    selectedValues = [];
    numTries = wins = 0;
    status.textContent = '';
    tries.textContent = `Number of Tries: ${numTries}`;
}

function wonGame(){
    status.textContent = 'YOU WON!!';
    button.classList.add('play-again');
    button.textContent = 'Play Again';
    gameStarted = false;
}

function incrementTry(){
    numTries ++;
    tries.textContent = `Number of Tries: ${numTries}`;
}

function checkGuess(e){
    const guessedCard = e.target.children[0];
    selectedValues.push(guessedCard);
    guessedCard.classList.add('show');
    if(selectedValues.length == 2){
        if(selectedValues[0].textContent === selectedValues[1].textContent){
            status.textContent = 'Its a match!';
            selectedValues = [];
            wins++;
        } else {
            status.textContent = 'Try Again';
            setTimeout(() => {
                selectedValues.forEach(value => value.classList.remove('show'))
                selectedValues = [];
            }, 250)
        }
        incrementTry();
    }
}

//EVENT LISTENERS
button.addEventListener('click', startGame);
cards.forEach(card => card.addEventListener('click', (e) => {
    if(gameStarted){
        checkGuess(e);
        (wins === (cards.length / 2)) ? wonGame() : null;
    }
}))