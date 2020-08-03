// DOM elements (found in the index.html page)
const passwordEl = document.getElementById('password');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};


// 2 events: generate password event and clipboard event

//Generate event listener
//When you click button generate password it generates a password
//The +sign changes string value to number
//checked property sees if the boxes are checked or not identifying it by true/ false
//passing parameters into generate password function to see if they satisfy these values
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value; 
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    passwordEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

//copy password to clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const result = passwordEl.innerText;

    if(!result) {
        return;
    }

    textarea.value = result;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard');
});

//password container contains result of generate password

//Generate password function
//1.Initialise password(pw) variable
//2. Filter out unchecked types(if it is unchecked don't include)
//3.Loop over length call generator function for each type
//4.Add final pw to pw var and return
function generatePassword(lower, upper, number, symbol, length){

    let generatedPassword = '';

    const typesCount = lower + upper + number + symbol;
    //tells you how many boxes are checked
    console.log('typesCount: ', typesCount); 

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
    //filters out which parameter is unchecked
    

    //tell you which specifically is checked indicating with true
    console.log('typesArr: ', typesArr); 

    if(typesCount === 0) {
        return '';
    }

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            console.log('funcName: ', funcName);

            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

//Generator functions to generate different characters
//https://www.net-comber.com/charset.html

//Gets random lowercase letters from CharCode 
//lower case range has indexes 97-122 and there are 26 letters to choose
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

//Gets random uppercase letters from CharCode 
//upper case range has indexes 65-90 and there are 26 letters to choose
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

//Gets random numbers from CharCode 
//upper case range has indexes 48-58 and there are 10 numbers to choose
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

//Gets random symbols from the variable defined with const
function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

//ball circling event

var ball = document.getElementById('animating-ball');

var STYLES = {
  SCALE_UP: 'ball--scale-up',
  SCALE_DOWN: 'ball--scale-down',
  CIRCLING: 'ball--circling',
};

ball.addEventListener('animationend', function() {
  if (ball.classList.contains(STYLES.SCALE_DOWN)) {
    ball.classList.remove(STYLES.SCALE_DOWN)
    ball.classList.remove(STYLES.SCALE_UP)
    ball.classList.remove(STYLES.CIRCLING);
  } else if (ball.classList.contains(STYLES.CIRCLING)) {
    ball.classList.add(STYLES.SCALE_DOWN);
  } else if (ball.classList.contains(STYLES.SCALE_UP)) {
    ball.classList.add(STYLES.CIRCLING);
  }
});

generateEl.onclick = function() {
  ball.classList.add(STYLES.SCALE_UP);
}



