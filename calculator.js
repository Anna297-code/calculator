let firstNum = null;
let operator = null;
let secondNum = null;
let isCalculated = false;
//  this is so my number buttons know to clear the screen when you type a brand new number instead of an operator after hitting equals

const displayBox = document.getElementById("display");
const buttonsBox = document.getElementById("buttons");

function createButton(text, className) {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add(className);
  buttonsBox.appendChild(button);
  return button;
}

for (let index = 0; index < 10; index++) {
  createButton(index, "num-btn");
}

const operatorSymbols = ["+", "-", "*", "/"];
for (let index = 0; index < operatorSymbols.length; index++) {
  createButton(operatorSymbols[index], "oper-btn");
}

const decimalButton = createButton(".", "decimal-btn");
const equalsButton = createButton("=", "equals-btn");
const clearButton = createButton("CLEAR", "clear-btn");
const backSpaceButton = createButton("Del", "backspace-btn");

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

function operate(num1, operator, num2) {
  if (operator === "+") {
    return add(num1, num2);
  }
  if (operator === "-") {
    return subtract(num1, num2);
  }
  if (operator === "*") {
    return multiply(num1, num2);
  }
  if (operator === "/") {
    if (num2 === 0) {
      return "Nice Try!";
    } else {
      return divide(num1, num2);
    }
  }
}

function roundResult(number) {
  return Math.round(number * 10000) / 10000;
}

function clearCalculator() {
  firstNum = null;
  operator = null;
  secondNum = null;
  isCalculated = false;
}
const allNumberButtons = document.querySelectorAll(".num-btn");

allNumberButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (isCalculated) {
      displayBox.textContent = e.target.textContent;
      firstNum = e.target.textContent;
      operator = null;
      secondNum = null;
      isCalculated = false;
      return;
    }
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
    if (isCalculated) {
      isCalculated = false;
      operator = e.target.textContent;
      return;
    }
    if (operator === null) {
      operator = e.target.textContent;
    } else if (secondNum !== null) {
      const num1 = parseFloat(firstNum);
      const num2 = parseFloat(secondNum);

      const result = operate(num1, operator, num2);

      if (result === "Nice Try!") {
        displayBox.textContent = result;
        clearCalculator();
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
    return;
  }

  const num1 = parseFloat(firstNum);
  const num2 = parseFloat(secondNum);
  const result = operate(num1, operator, num2);

  if (result === "Nice Try!") {
    displayBox.textContent = result;
    clearCalculator();
  } else {
    const roundedResult = roundResult(result);
    displayBox.textContent = roundedResult;
    firstNum = roundedResult.toString();
    operator = null;
    secondNum = null;
    isCalculated = true;
  }
});

clearButton.addEventListener("click", () => {
  displayBox.textContent = null;
  clearCalculator();
});

backSpaceButton.addEventListener("click", () => {
  if (operator === null) {
    if (firstNum !== null && firstNum !== "") {
      firstNum = firstNum.slice(0, -1);
      displayBox.textContent = firstNum;
    }

    if (firstNum === "") {
      firstNum = null;
      displayBox.textContent = null;
    }
  }

  if (operator !== null) {
    if (secondNum !== null && secondNum !== "") {
      secondNum = secondNum.slice(0, -1);
      displayBox.textContent = secondNum;
    }

    if (secondNum === "") {
      secondNum = null;
      displayBox.textContent = null;
    }
  }
});
