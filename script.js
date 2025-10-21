// Select the display
const display = document.getElementById('display');

// Initialize variables
let currentInput = '';
let operator = '';
let firstNumber = null;

// Number buttons
const numberButtons = document.querySelectorAll('[data-num]');
numberButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Prevent multiple decimals
        if (btn.dataset.num === '.' && currentInput.includes('.')) return;

        currentInput += btn.dataset.num;
        updateDisplay(currentInput);
    });
});

// Operator buttons
const operatorButtons = document.querySelectorAll('[data-op]');
operatorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if(currentInput === '' && firstNumber === null) return; // Do nothing if no input
        if(firstNumber !== null && currentInput !== '') {
            calculate();
        } else {
            firstNumber = parseFloat(currentInput);
        }
        operator = btn.dataset.op;
        currentInput = '';
    });
});

// Equals button
document.getElementById('equals').addEventListener('click', () => {
    if(currentInput === '' || operator === '') return;
    calculate();
    operator = '';
});

// Clear button
document.getElementById('clear').addEventListener('click', () => {
    currentInput = '';
    operator = '';
    firstNumber = null;
    updateDisplay('0');
});

// Square button
document.getElementById('square').addEventListener('click', () => {
    if(currentInput === '') return;
    currentInput = (parseFloat(currentInput) ** 2).toString();
    updateDisplay(currentInput);
});

// Modulo button
document.getElementById('modulo').addEventListener('click', () => {
    if(currentInput === '' || firstNumber === null) return;
    operator = '%';
    calculate();
});

// Function to update display
function updateDisplay(value) {
    display.innerText = value;
}

// Function to perform calculation
function calculate() {
    let secondNumber = parseFloat(currentInput);
    let result;

    switch(operator) {
        case '+':
            result = firstNumber + secondNumber;
            break;
        case '-':
            result = firstNumber - secondNumber;
            break;
        case '*':
            result = firstNumber * secondNumber;
            break;
        case '/':
            if(secondNumber === 0){
                alert("Cannot divide by zero");
                clearAll();
                return;
            }
            result = firstNumber / secondNumber;
            break;
        case '%':
            result = firstNumber % secondNumber;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    firstNumber = result;
    updateDisplay(currentInput);
}

// Function to clear all
function clearAll() {
    currentInput = '';
    operator = '';
    firstNumber = null;
    updateDisplay('0');
}
