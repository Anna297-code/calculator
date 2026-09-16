const display = document.getElementById("display");
const container = document.getElementById("buttons");

for (let index = 0; index < 10; index++) {
  const numberButton = document.createElement("button");
  numberButton.textContent = index;
  container.appendChild(numberButton);
}
// creates number buttons from 0-9 and appends them to container div

const operatorSymbols = ["+", "-", "*", "/", "="];

for (let index = 0; index < operatorSymbols.length; index++) {
  const operatorButton = document.createElement("button");
  operatorButton.textContent = operatorSymbols[index];
  container.appendChild(operatorButton);
}

// creates the 4 operator buttons and appends them to contianer div

const clearButton = document.createElement("button");
clearButton.textContent = "Clear";
container.appendChild(clearButton);

// creates clear button and appends it to container div

let num1 = null;
let operatorInput = null;
let num2 = null;

// add event listener to number buttons that when clicked adds the number to the display and also updates a variable
container.addEventListener("click", (e) => {
  buttonText = e.target.textContent;
  display.textContent = buttonText;
  num1 = buttonText;
});
