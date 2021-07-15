'use strict'

/*
PSUEDO Code
    1. Define a Class called calculator or a function   xx
    2. There are arrays called leftSide and RightSide where the numbers will be stored  xx
    3. When a user clicks a number, define a function isLeftSideEmpty to check if LeftSide is empty xx
    4. If it is empty, then stores the number on leftSide until an operand is clicked
    5. Define a variable called operandClicked that checks if an operand is clicked
    6. if clicked, check if isleftSideEmpty = false, if user clicks a number btn, save on rightSide.
    7. If another operator is clicked, replace operator and repeat (6)
    8. Check if both array is filled after a user clicks another operator or =
    9. If so run operate(operator, leftSide, rightSide)
    
Additional for accuracy
    1. When operate() runs, the result is saved on leftSide
    2. Whenever any btn is clicked its value is displayed on screen
*/


const numberBtn = document.querySelectorAll('.number');
const operator = document.querySelectorAll('.operator');
const decimal = document.querySelector('.decimal');
const displayCurrentOp = document.querySelector('.current-operand');
let displayPrevOp = document.querySelector('.previous-operand');

let leftSide = [];
let rightSide = []
let currentOperator;
// let checkOperator = () => {
//     const period = leftSide.includes('.') ?
// }
let operatorIsClicked = false;
let savedResult = []

let clearResults = () => {
    leftSide = [];
    rightSide = [];
}

let saveResults = (c) => {
    let savedOperation = [c];
    displayCurrentOp.textContent = c;
}


let add = (a, b) => {
    let c = parseFloat(a) + parseFloat(b);
    leftSide = [c];
    rightSide = [];
    operatorIsClicked = false;
    displayCurrentOp.textContent = c;
    return console.log(c)
}

let subtract = (a, b) => {
    let c = parseFloat(a) - parseFloat(b);
    leftSide = [c];
    rightSide = [];
    operatorIsClicked = false;
    displayCurrentOp.textContent = c;
    return console.log(c);
}

let multiply = (a, b) => {
    let c = parseFloat(a) * parseFloat(b)
    leftSide = [c]
    rightSide = [];
    operatorIsClicked = false;
    displayCurrentOp.textContent = c;
    return console.log(c)
}

let divide = (a, b) => {
    let c = parseFloat(a) / parseFloat(b)
    leftSide = [c];
    rightSide = [];
    operatorIsClicked = false;
    displayCurrentOp.textContent = c;
    return console.log(c);
}

function operate(operator, leftSide, rightSide) {
    let left = parseInt(leftSide.join(""))
    let right = parseInt(rightSide.join(""))
    if (isNaN(left) || isNaN(right)) return
    switch (operator) {
        case "+":
            add(left, right);
            break;
        case "-":
            subtract(left, right);
            break;
        case "/":
            divide(left, right)
            break;
        case "x":
            multiply(left, right);
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

        //check if operator is clicked
        // if (operatorIsclicked == false) {
        //     event.preventDefault();
        // }
    })
})