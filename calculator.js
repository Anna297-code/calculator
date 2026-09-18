let firstNum = null;
let operator = null;
let secondNum = null;

const containerBox = document.querySelector(".container");
const displayBox = document.getElementById("display");
const buttonsBox = document.getElementById("buttons");

containerBox.appendChild(displayBox);
containerBox.appendChild(buttonsBox);

for (let index = 0; index < 10; index++) {
  const numberButton = document.createElement("button");
  numberButton.textContent = index;
  numberButton.classList.add("num-btn");
  buttonsBox.appendChild(numberButton);
}

const operatorSymbols = ["+", "-", "*", "/"];

for (let index = 0; index < operatorSymbols.length; index++) {
  const operatorButton = document.createElement("button");
  operatorButton.textContent = operatorSymbols[index];
  operatorButton.classList.add("oper-btn");
  buttonsBox.appendChild(operatorButton);
}

const decimalButton = document.createElement("button");
decimalButton.textContent = ".";
decimalButton.classList.add("decimal-btn");
buttonsBox.appendChild(decimalButton);

const equalsButton = document.createElement("button");
equalsButton.textContent = "=";
buttonsBox.appendChild(equalsButton);

const clearButton = document.createElement("button");
clearButton.textContent = "CLEAR";
buttonsBox.appendChild(clearButton);

const backSpaceButton = document.createElement("button");
backSpaceButton.textContent = "Del";
backSpaceButton.classList.add("backspace-btn");
buttonsBox.appendChild(backSpaceButton);

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function operate(a, b, c) {
  if (b === "+") {
    return add(a, c);
  }
  if (b === "-") {
    return subtract(a, c);
  }
  if (b === "*") {
    return multiply(a, c);
  }
  if (b === "/") {
    if (c === 0) {
      return "Nice Try!";
    } else {
      return divide(a, c);
    }
  }
}

function roundResult(number) {
  return Math.round(number * 10000) / 10000;
}

const allNumberButtons = document.querySelectorAll(".num-btn");

allNumberButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    console.log("Number button listener triggered by:", e.target.textContent);

    if (operator === null) {
      if (firstNum === null || firstNum === "0") {
        displayBox.textContent = e.target.textContent;
        firstNum = e.target.textContent;
      } else {
        displayBox.textContent += e.target.textContent;
        firstNum += e.target.textContent;
      }
    } else {
      if (secondNum === null) {
        displayBox.textContent = e.target.textContent;
        secondNum = e.target.textContent;
      } else {
        displayBox.textContent += e.target.textContent;
        secondNum += e.target.textContent;
      }
    }
  });
});

const allOperatorButtons = document.querySelectorAll(".oper-btn");

allOperatorButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (operator === null) {
      operator = e.target.textContent;
    } else if (operator !== null && secondNum !== null) {
      const num1 = parseFloat(firstNum);
      const num2 = parseFloat(secondNum);

      const result = operate(num1, operator, num2);

      if (result === "Nice Try!") {
        displayBox.textContent = result;

        firstNum = null;
        operator = null;
        secondNum = null;
      } else {
        const roundedResult = roundResult(result);
        displayBox.textContent = roundedResult;
        firstNum = roundedResult.toString();
        operator = e.target.textContent;
        secondNum = null;
      }
    } else {
      operator = e.target.textContent;
    }
  });
});

decimalButton.addEventListener("click", () => {
  if (operator === null) {
    if (!firstNum) {
      displayBox.textContent = "0.";
      firstNum = "0.";
    } else if (!firstNum.includes(".")) {
      displayBox.textContent += ".";
      firstNum += ".";
    }
  } else {
    if (!secondNum) {
      displayBox.textContent = "0.";
      secondNum = "0.";
    } else if (!secondNum.includes(".")) {
      displayBox.textContent += ".";
      secondNum += ".";
    }
  }
});

equalsButton.addEventListener("click", () => {
  if (firstNum === null) {
    displayBox.textContent = null;
    return;
  }

  if (operator === null || secondNum === null) {
    displayBox.textContent = firstNum;
    firstNum = null;
    return;
  }

  const num1 = parseFloat(firstNum);
  const num2 = parseFloat(secondNum);
  const result = operate(num1, operator, num2);

  if (result === "Nice Try!") {
    displayBox.textContent = result;

    firstNum = null;
    operator = null;
    secondNum = null;
  } else {
    const roundedResult = roundResult(result);
    displayBox.textContent = roundedResult;
    firstNum = roundedResult.toString();
    firstNum = null;
    operator = null;
    secondNum = null;
  }
});

clearButton.addEventListener("click", () => {
  displayBox.textContent = null;
  firstNum = null;
  operator = null;
  secondNum = null;
});

backSpaceButton.addEventListener("click", () => {
    if(operator === null){
        if (firstNum !== null && firstNum !== "") {
        firstNum = firstNum.slice(0, -1);
        displayBox.textContent = firstNum;
        }

        if (firstNum === "") {
        firstNum = null;
        displayBox.textContent = null;
    }
  }


    if (operator !== null){
        if (secondNum !== null && secondNum !== ""){
            secondNum = secondNum.slice(0, -1);
            displayBox.textContent = secondNum;
        }

        if (secondNum === ""){
            secondNum = null
            displayBox.textContent = null
        }
    }

  
});
