// The Calculations:

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return (a / b);
}

let numOfDecimals = 2;

function operate(operator, a, b) {
    let answer = null;
    a = parseFloat(a);
    b = parseFloat(b);
    switch(operator){
        case "*":
            answer = multiply(a, b); 
            return parseFloat(answer.toFixed(numOfDecimals));
        case "/":
            answer = divide(a, b);
            return parseFloat(answer.toFixed(numOfDecimals));
        case "+":
            answer = add(a, b); 
            return parseFloat(answer.toFixed(numOfDecimals));
        case "-":
            answer = subtract(a, b);
            return parseFloat(answer.toFixed(numOfDecimals));
    }
    
}

// console.log(operate(divide, 2.63, 3.4))

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

let displayValue = 0;
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;

const buttons = document.querySelectorAll('button');
const number = document.querySelectorAll(".operand");
const operator = document.querySelectorAll(".operator");
const enter = document.querySelector("#enter");
const clear = document.querySelector("#clear");


// sets the corresponding key presses to perform the click operation:
window.addEventListener('keydown', (e) => {
    let key = document.querySelector(`button[data-key="${e.keyCode}"]`);
    key.click();
})

function updateDisplay() {
    const display = document.querySelector("#display-content");
    display.textContent = displayValue;
    // if (displayValue.length > 9) {
    //     display.textContent = displayValue.substring(0, 9);
    // }
}

updateDisplay();

let operandCheck = 0;

function testDisplay() {
    console.log("=========================");
    console.log("first operator: " + firstOperator);
    console.log("first operand: " + firstOperand);
    console.log("second operator: " + secondOperator);
    console.log("second operand: " + secondOperand);
    console.log("operand check: " + operandCheck);
}

function clickButton() {
    buttons.forEach((button) => {
        
        button.addEventListener('click', () => {
            
            //Operand Buttons:
            if (button.classList.contains("operand")) {
                if (firstOperator === null) {
                    if (displayValue == 0) {
                        displayValue = button.value;
                    } else {
                        displayValue += button.value
                    };
                } else if (operandCheck === 0) {
                        operandCheck = 1;
                        displayValue = button.value;
                    } else {
                        displayValue += button.value;
                    }
                return updateDisplay();
            }

            //Operator Buttons:
            if (button.classList.contains("operator")) {
                // testDisplay();
                if (firstOperator === null) {
                    firstOperand = displayValue;
                    firstOperator = button.value;
                } else if (firstOperand === null) {
                    firstOperator = button.value;
                    firstOperand = displayValue;
                    secondOperand = null;
                    operandCheck = 0;
                } else {
                    // secondOperator = button.value;
                    secondOperand = displayValue;
                    displayValue = operate(firstOperator, firstOperand, secondOperand);
                    firstOperator = button.value;
                    firstOperand = displayValue;
                    secondOperand = null;
                    operandCheck = 0;
                    return updateDisplay();
                }

            }

            //Enter Button:
            if (button.id === "enter") {
                if (firstOperand === null && firstOperator === null) {
                    return updateDisplay();
                } else if (secondOperand === null) {
                    secondOperand = displayValue;
                    // testDisplay();
                    displayValue = operate(firstOperator, firstOperand, secondOperand);
                    operandCheck = 0;
                    firstOperand = null;
                    return updateDisplay();
                } else if (firstOperand === null) {
                    firstOperand = displayValue;
                    displayValue = operate(firstOperator, firstOperand, secondOperand);
                    operandCheck = 0;
                    firstOperand = null;
                    return updateDisplay();
                }                
            }

            //Clear Button:
            if (button.id === "clear") {
                displayValue = 0;
                firstOperand = null;
                secondOperand = null;
                firstOperator = null;
                secondOperator = null;
                operandCheck = 0;          
                return updateDisplay();
            };

        })
    })
}

clickButton();


