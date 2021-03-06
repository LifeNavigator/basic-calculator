'use strict'

const numberBtn = document.querySelectorAll('.number');
const operator = document.querySelectorAll('.operator');
const decimal = document.querySelector('.decimal');
const del = document.querySelector('.delete');
const clr = document.querySelector('.resetBtn');
const displayCurrentOp = document.querySelector('.current-operand');
const displayPrevOp = document.querySelector('.previous-operand');

let leftSide = [],
    rightSide = [];
let prevOperator, currentOperator, prevResult, result = '';
let operatorIsClicked = false;

//computational functions
let add = (a, b) => {
    result = parseFloat(a) + parseFloat(b);
    return result.toFixed(6)
}

let subtract = (a, b) => {
    result = parseFloat(a) - parseFloat(b);
    return result.toFixed(6)
}

let multiply = (a, b) => {
    result = parseFloat(a) * parseFloat(b)
    return result.toFixed(6)
}

let divide = (a, b) => {
    if (a == 0) {
        alert('Divisible by 0 is not possible')
        clearAll();
    } else {
        result = parseFloat(a) / parseFloat(b)
        return result.toFixed(6)
    }
}

function clearAll() {
    leftSide = [];
    rightSide = [];
    currentOperator = '';
    prevOperator = '';
    displayCurrentOp.textContent = '';
    displayPrevOp.textContent = ''
}

//compute function
function operate(operator, leftSide, rightSide) {
    let left = parseFloat(leftSide.join(""))
    let right = parseFloat(rightSide.join(""))

    switch (operator) {
        case '+':
            add(left, right);

            break;
        case "-":
            subtract(left, right);
            break;
        case "/":
            divide(left, right)
            break;
        case "x":
            multiply(left, right)
            break;

        default:
            console.log('error calling the operators. Check the event handlers');
            break;
    }
    //check if results is 
    displayResult(result);
}

function append(number) {
    // if(number.classList.contains(number)) return;
    displayCurrentOp.textContent += number;
}

function newOperation(a) {
    leftSide = [a];
    rightSide = [];
    prevOperator = currentOperator;
    currentOperator = '';
}

// Things to do:
//     1. Prevent multiple operators being appended
//     2. Make clear and delete btn Worker
//     3. Add bullet

function displayResult(result) {
    if (currentOperator) {
        displayPrevOp.textContent = result;
        if (currentOperator == '=') {
            displayCurrentOp.textContent = result;
        } else {
            displayCurrentOp.textContent = result + currentOperator;
        }
        newOperation(result);
    } else {
        displayCurrentOp.textContent = result;
        newOperation(result);
    }

}

numberBtn.forEach(btn => {
    btn.addEventListener('click', (event) => {
        let number = event.target.textContent;

        if (!prevOperator) {
            leftSide.push(number);
            append(number);
            console.log('leftside:', leftSide);

        } else {
            rightSide.push(number)
            append(number);
            console.log('rightside:', rightSide);
        }

    })
})

operator.forEach(op => {
    op.addEventListener('click', (event) => {

        let operand = event.target.textContent;

        if (operand == '=' || (prevOperator && rightSide.length > 0)) {
            checkOperation()
            operate(prevOperator, leftSide, rightSide);
        } else {
            const check = !leftSide
            checkOperation();
        }

        function checkOperation() {
            if (prevOperator && rightSide.length > 0) {
                return currentOperator = operand;
            } else if (operand !== '=') {
                prevOperator = operand;
                append(operand);
            } else {
                return currentOperand = ''
            }
        }

    })
})

del.addEventListener('click', (event) => {
    if (leftSide.length > 0 && !prevOperator) {
        leftSide.pop()
        displayResult();
    } else if (rightSide.length > 0 && prevOperator) {
        rightSide.pop();
        displayResult();
    } else {
        return
    }
})

clr.addEventListener('click', clearAll)

//check if an