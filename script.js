let arg1; //string
let arg2; //string
let op; //string
let displayValue = "";
const display = document.querySelector(".display");
const calculator = document.querySelector(".calculator");

const opMap = {};
opMap["+"] = add;
opMap["x"] = multiply;
opMap["-"] = subtract;
opMap["/"] = divide;

const nonOpKeys = new Set([
  ".",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
]);

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

function updateDisplayFromClick(event) {
  const key = event.target.textContent;
  updateDisplay(key);
  console.log("arg1: ", arg1);
  console.log("arg2: ", arg2);
  console.log("op: ", op);
}

function updateDisplayFromKey(event) {
  const key = event.key;
  console.log("key press: " + key);
  updateDisplay(key);
  console.log("arg1: ", arg1);
  console.log("arg2: ", arg2);
  console.log("op: ", op);
}

function updateDisplay(key) {
  if (key === "Clear" || key === "Delete") {
    displayValue = "";
    arg1 = null;
    arg2 = null;
    op = null;
  } else if (key === "=" || key === "Enter") {
    if (op && arg1 && arg2) {
      processDisplay();
    }
  } else if (key in opMap) {
    if (op) {
      if (op && arg1 && arg2) {
        processDisplay();
      }
    }
    op = key;
  } else if (nonOpKeys.has(key)) {
    if (op) {
      if (arg2) {
        if (key !== "." || !arg2.includes(key)) {
          arg2 += key;
        }
      } else if (key !== ".") {
        arg2 = key;
      }
      displayValue = arg2;
    } else {
      if (arg1) {
        if (key !== "." || !arg1.includes(key)) {
          arg1 += key;
        }
      } else if (key !== ".") {
        arg1 = key;
      }
      displayValue = arg1;
    }
  }
  display.textContent = displayValue;
}

function processDisplay() {
  const num1 = parseFloat(arg1);
  const num2 = parseFloat(arg2);
  if (op === "/" && num2 === 0) {
    displayValue = "Can't divide by 0";
    arg1 = null;
    arg2 = null;
    op = null;
  } else {
    displayValue = truncate(String(opMap[op](num1, num2)));
    arg1 = displayValue;
    arg2 = null;
    op = null;
  }
}

function truncate(str) {
  const num = parseFloat(str);
  return String(Math.round(num * 10 ** 5) / 10 ** 5);
}

calculator.addEventListener("click", updateDisplayFromClick);

document.addEventListener("keyup", updateDisplayFromKey);
