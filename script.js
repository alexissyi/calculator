let arg1; //string
let arg2; //string
let op; //string
let displayValue = "";
const display = document.querySelector(".display");
const keys = document.querySelector(".keys");

const opMap = {};
opMap["+"] = add;
opMap["x"] = multiply;
opMap["-"] = subtract;
opMap["/"] = divide;

function add(num1, num2) {
  return num1 + num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}
function divide(num1, num2) {
  if (num2 !== 0) {
    return num1 / num2;
  }
}

function operate(op, num1, num2) {
  return opMap[op](num1, num2);
}

function updateDisplay(event) {
  const newContent = event.target.textContent;
  if (newContent === "Clear") {
    displayValue = "";
    arg1 = null;
    arg2 = null;
    op = null;
  } else if (newContent === "=") {
    if (op && arg1 && arg2) {
      processDisplay();
    }
  } else if (newContent in opMap) {
    if (op) {
      if (op && arg1 && arg2) {
        processDisplay();
      }
    }
    op = newContent;
  } else if (event.target.tagName === "BUTTON") {
    if (op) {
      if (arg2) {
        if (newContent !== "." || !arg2.includes(newContent)) {
          arg2 += newContent;
        }
      } else if (newContent !== ".") {
        arg2 = newContent;
      }
      displayValue = arg2;
    } else {
      if (arg1) {
        if (newContent !== "." || !arg1.includes(newContent)) {
          arg1 += newContent;
        }
      } else if (newContent != ".") {
        arg1 = newContent;
      }
      displayValue = arg1;
    }
  }
  display.textContent = displayValue;
  console.log("arg1: ", arg1);
  console.log("arg2: ", arg2);
  console.log("op: ", op);
}

keys.addEventListener("click", updateDisplay);

function processDisplay() {
  const num1 = parseFloat(arg1);
  const num2 = parseFloat(arg2);
  if (op === "/" && num2 === 0) {
    displayValue = "Can't divide by 0";
    arg1 = null;
    arg2 = null;
    op = null;
  } else {
    displayValue = String(opMap[op](num1, num2));
    arg1 = displayValue;
    arg2 = null;
    op = null;
  }
}
