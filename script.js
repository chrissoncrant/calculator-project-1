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

let displayValue = "0";
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
    console.log(e.keyCode);
    let key = document.querySelector(`button[data-key="${e.keyCode}"]`);
    key.click();
})

function updateDisplay() {
    // console.log("+++++++++++++++");
    // console.log("Display value: " + displayValue);
    // console.log(typeof displayValue);
    const display = document.querySelector("#display-content");
    displayValue = displayValue.toString();
    display.textContent = displayValue;
    // if (displayValue.length > 9) {
    //     display.textContent = displayValue.substring(0, 9);
    // }
}

updateDisplay();

let operandCheck = 0;
let operatorCheck = 0;
let decimalCheck = 0;
let signCheck = 0;

function testDisplay() {
    console.log("=========================");
    console.log("first operator: " + firstOperator);
    console.log("first operand: " + firstOperand);
    console.log("second operator: " + secondOperator);
    console.log("second operand: " + secondOperand);
    console.log("operand check: " + operandCheck);
    console.log("operator check: " + operatorCheck);
}

function clearDisplay() {
    displayValue = "0";
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    operandCheck = 0;
    decimalCheck = 0;
    operatorCheck = 0;
    signCheck = 0;   
    return updateDisplay();
}


function clickButton() {
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            
            //Operand Buttons:
            if (button.classList.contains("operand")) {
                // testDisplay();
                document.querySelector("#clear").textContent = "Clear";
                if (firstOperator === null) {
                    if (displayValue === "0") {
                        displayValue = button.value;
                    } else if (displayValue === "-0") {
                        displayValue = "-" + button.value;
                    } else {
                        displayValue += button.value
                    };
                } else if (operandCheck === 0) {
                    signCheck = 0;
                    if (displayValue === "-0") {
                        displayValue = "-" + button.value;
                    } else {
                        displayValue = button.value;
                    }   
                    operandCheck = 1;
                    decimalCheck = 1;
                    operatorCheck = 0;
                    } else {
                        displayValue += button.value;
                    }
                return updateDisplay();
            };

            //Sign Button:
            if (button.classList.contains("sign")) {
                if (signCheck === 1) {
                    console.log("yes3");
                    displayValue = "-0";
                    signCheck = 0;
                    return updateDisplay();
                }
                if (displayValue.includes("-")) {
                    displayValue = displayValue.replace("-", "");
                    return updateDisplay();
                } else {
                    console.log("yes2");
                    displayValue = "-" + displayValue;
                    return updateDisplay();
                }
            }

            //Decimal Button:
            if (button.classList.contains("decimal")) {
                if ((firstOperand != null || secondOperand != null) && (firstOperand === null || secondOperand === null)) {
                    if (decimalCheck === 0) {
                        displayValue = "0" + button.value;
                        operandCheck = 1;
                        operatorCheck = 0;
                        decimalCheck = 1;
                        return updateDisplay();
                    } else if (decimalCheck === 1) {
                        if (displayValue.includes(".")) {
                            return updateDisplay();
                        };
                        displayValue += button.value;
                        return updateDisplay();
                    }
                } else {
                    if (displayValue.includes(".")) {
                        return updateDisplay();
                    } else {
                        displayValue += button.value;
                        return updateDisplay();
                    };
                };  
            };

            //Operator Buttons:
            if (button.classList.contains("operator")) {
                signCheck = 1;
                if (firstOperator === "/" && displayValue == 0) {
                    displayValue = "Can't divide by zero!";
                    updateDisplay();
                    return setTimeout(() => {
                        return clearDisplay();
                    }, 1500);
                };
                if (operatorCheck === 1) {
                    firstOperand = displayValue;
                    firstOperator = button.value;
                    operatorCheck = 1;
                    decimalCheck = 0;
                } else if (firstOperator === null) {
                    firstOperand = displayValue;
                    firstOperator = button.value;
                    operatorCheck = 1;
                    decimalCheck = 0;
                } else if (firstOperand === null) {
                    firstOperator = button.value;
                    firstOperand = displayValue;
                    secondOperand = null;
                    operandCheck = 0;
                    operatorCheck = 1;
                    decimalCheck = 0;
                } else {
                    secondOperand = displayValue;
                    displayValue = operate(firstOperator, firstOperand, secondOperand);
                    firstOperator = button.value;
                    firstOperand = displayValue;
                    secondOperand = null;
                    operandCheck = 0;
                    operatorCheck = 1;
                    decimalCheck = 0;
                    return updateDisplay();
                };
            };

            //Enter Button:
            if (button.id === "enter") {
                operatorCheck = 0;
                decimalCheck = 0;
                signCheck = 1;
                if (firstOperator === "/" && displayValue == 0) {
                    displayValue = "Can't divide by zero!";
                    updateDisplay();
                    return setTimeout(() => {
                        return clearDisplay();
                    }, 1500);
                };
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
                if (button.textContent === "Clear") {
                    displayValue = 0;
                    button.textContent = "Clear All";
                    operandCheck = 0;
                    return updateDisplay();
                } else {
                    return clearDisplay();
                }
            };
        })
    })
}

clickButton();


