'use strict'

const numberBtn = document.querySelectorAll('.number');
const operator = document.querySelectorAll('.operator');
const decimal = document.querySelector('.decimal');
const displayCurrentOp = document.querySelector('.current-operand');
let displayPrevOp = document.querySelector('.previous-operand');

let leftSide = [];
let rightSide = [];
let prevOperator, currentOperator, prevResult, result = '';
let operatorIsClicked = false;


//computational functions
let add = (a, b) => {
    let c = parseFloat(a) + parseFloat(b);
    return result = c
}

let subtract = (a, b) => {
    let c = parseFloat(a) - parseFloat(b);
    return result = c;
}

let multiply = (a, b) => {
    let c = parseFloat(a) * parseFloat(b)
    return result = c
}

let divide = (a, b) => {
    let c = parseFloat(a) / parseFloat(b)
    return result = c;
}

//compute function
function operate(operator, leftSide, rightSide) {
    let left = parseFloat(leftSide.join(""))
    let right = parseFloat(rightSide.join(""))

    if (isNaN(left) || isNaN(right)) {
        console.error("array not a float", left, right);

    }

    switch (operator) {
        case '+':
            add(left, right);
            console.log(result);
            break;
        case "-":
            subtract(left, right);
            console.log(result);
            break;
        case "/":
            divide(left, right)
            console.log(result);
            break;
        case "x":
            multiply(left, right)
            console.log(result);
            break;

        default:
            console.log('error calling the operators. Check the event handlers');
            break;
    }

    //check if results is 
    isNaN(result) ? alert('check operate function') : displayResult(result);

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

function displayResult(result) {
    if (currentOperator && prevOperator) {
        displayPrevOp.textContent = result;
        displayCurrentOp.textContent = result + currentOperator;
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
        // console.log(typeof operand)

        if (operand == '=' ||
            (prevOperator && currentOperator)
        ) {
            operate(prevOperator, leftSide, rightSide);
        } else {
            checkOperation();
        }

        function checkOperation() {
            if (prevOperator) {
                currentOperator = operand;
                prevOperator = '';
                operate(prevOperator, leftSide, rightSide);
            } else {
                prevOperator = operand;
                append(operand);
                console.log(operand)
            }
        }

    })
})

//tests
// module.exports = {
//     add,
//     subtract,
//     divide,
//     multiply
// };