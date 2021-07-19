'use strict'

const numberBtn = document.querySelectorAll('.number');
const operator = document.querySelectorAll('.operator');
const decimal = document.querySelector('.decimal');
const displayCurrentOp = document.querySelector('.current-operand');
let displayPrevOp = document.querySelector('.previous-operand');

let leftSide = [];
let rightSide = []
let currentOperator;
let operatorIsClicked = false;
let savedResult = ''

let clearResults = () => {
    leftSide = [];
    rightSide = [];
    displayCurrentOp.textContent = '';
}

let add = (a, b) => {
    let c = parseFloat(a) + parseFloat(b);
    return c;
}

let subtract = (a, b) => {
    let c = parseFloat(a) - parseFloat(b);
    return c
}

let multiply = (a, b) => {
    let c = parseFloat(a) * parseFloat(b)
    return c
}

let display = (c) => {
    leftSide = [c]
    rightSide = [];
    operatorIsClicked = false;
    displayCurrentOp.textContent = c;
}

let divide = (a, b) => {
    let c = parseFloat(a) / parseFloat(b)
    return c
}

function operate(operator, leftSide, rightSide) {
    let left = parseInt(leftSide.join(""))
    let right = parseInt(rightSide.join(""))
    if (isNaN(left) || isNaN(right)) return
    switch (operator) {
        case "+":
            add(left, right)
            display(c)
            break;
        case "-":
            subtract(left, right)
            display(c)
            break;
        case "/":
            divide(left, right)
            display(c)
            break;
        case "x":
            multiply(left, right)
            display(c)
            break;

        default:
            console.log('error calling the operations');
            break;
    }

}

numberBtn.forEach(btn => {
    btn.addEventListener('click', (event) => {

        //if btn is clicked, its value is displayed and added to array
        const btnValue = btn.textContent;
        console.log(btnValue)
        // if (leftSide.includes())
        if (operatorIsClicked) {
            displayCurrentOp.textContent += btnValue;
            rightSide.push(btnValue)
            console.log(rightSide);

        } else {
            displayCurrentOp.textContent += btnValue;
            leftSide.push(btnValue);
            console.log(leftSide);
            operatorIsClicked = false;

        }

        //the case if an operator is already clicked
    })
})

operator.forEach(op => {
    op.addEventListener('click', (event) => {
        let operand = event.target.textContent;


        if (operand == '=') {
            operate(currentOperator, leftSide, rightSide);
            console.log(operand);

        } else if (leftSide.length > 0 && rightSide.length > 0) {
            operate(currentOperator, leftSide, rightSide);
            operatorIsClicked = true;
            currentOperator = operand;

        } else if (operatorIsClicked & rightSide.length == 0) {
            currentOperator = operand;


        } else {
            operatorIsClicked = true;
            displayCurrentOp.textContent += operand;
            console.log(operand);
            console.log(`left arr`, leftSide, `rightSide`, rightSide);
            currentOperator = event.target.textContent
        }

    })
})