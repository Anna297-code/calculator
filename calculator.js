
let firstNum = null;
let operator = null;
let secondNum = null;

function add(x, y){
    return x + y
}

function subtract(x, y){
    return x - y
}

function multiply(x, y){
    return x * y
}

function divide(x, y){
    return x/y
}

function operate (a, b, c){
    if(b === +){
        add(a, c)
    }
    if(b === -){
        subtract(a, c)
    }
    if(b === *){
        multiply(a, c)
    }
    if(b === /){
        if (c = 0 ){
            return "Nice Try!"
        } else {
            divide(a, c)
        }




    }
}

numberButton.addEventListener("click", (e) => {
  if (firstNum === null && secondNum === null){
    display.textContent = e.target.textContent
    firstNum = e.target.textContent
  } 
  else if (firstNum !== null && secondNum === null){
    display.textContent = e.target.textContent
    secondNum = e.target.textContent
  }

  else if(firstNum !== null && secondNum !== null){
    display.textContent += e.target.textContent
    secondNum += e.target.textContent
  }
  
  else {
    display.textContent += e.target.textContent
    firstNum += e.target.textContent
  }

operatorButton.addEventListener("click", (e) => {
  if (operator === null) {
    operator = e.target.textContent;
  } else if (operator !== null && secondNum !== null){
    result = operate(firstNum, operator, secondNum)
    display.textContent = result
    firstNum = result
    operator = e.target.textContent
    secondNum = null
  } else {
    operator = e.target.textContent
  }
});

equalsButton.addEventListener("click", (e) => {
    if (secondNum !== null){
    result = operate(firstNum, operator, secondNum)
    display.textContent = result
    } else {
        display.textContent = firstNum
    }

})

clearButton.addEventListener("click", (e) => {
    display.textContent = null
    firstNum = null
    operator = null
    secondNum = null
})


