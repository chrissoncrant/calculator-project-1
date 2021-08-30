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
    let answer = operator(a, b); 
    return parseFloat(answer.toFixed(numOfDecimals));
}

console.log(operate(divide, 2.63, 3.4))
