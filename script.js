const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const clear = document.getElementById("clear");
const equals = document.getElementById("equals");
const decimal = document.getElementById("decimal");
const add = document.getElementById("add");
const subtract = document.getElementById("subtract");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");
const isSymbol = /[-+/*]/;
const zero = document.getElementById("zero");

for (let button of buttons) {
  button.addEventListener("click", setCharacters, false);
}

function setCharacters() {
  let that = this;
  let displayValue = display.innerHTML;
  let character = that.getAttribute("data-value");
  let lastCharacter = displayValue[displayValue.length - 1];
  let hasSymbolCharacter = isSymbol.test(displayValue);

  that.classList.add("active");

  setTimeout(() => {
    that.classList.remove("active");
  }, 100);

  if (that === clear) {
    display.innerHTML = 0;
    return false;
  } else if (displayValue === "0" && that === zero || displayValue === "0" && that === equals || displayValue === "0" && that === multiply || displayValue === "0" && that === divide || displayValue === "0" && that === add) {
    return false;
  } else if (displayValue === "0" && that !== decimal) {
    display.innerHTML = "";
  } else if (
    (lastCharacter === "." && that === decimal) ||
    (lastCharacter === "+" && that === add) ||
    (lastCharacter === "-" && that === subtract) ||
    (lastCharacter === "*" && that === multiply) ||
    (lastCharacter === "/" && that === divide)
  ) {
    return false;
  } else if (
    (lastCharacter === "-" && that === add) ||
    (lastCharacter === "+" && that === multiply) ||
    (lastCharacter === "+" && that === divide) ||
    (lastCharacter === "*" && that === add) ||
    (lastCharacter === "/" && that === add)
  ) {
    displayValue =
      displayValue.substring(0, displayValue.length - 1) + character;
    display.innerHTML = displayValue;

    let lastChar = displayValue[displayValue.length - 1];
    let penultimateChar = displayValue[displayValue.length - 2];

    if (
      (penultimateChar === "*" && lastChar === "+") ||
      (penultimateChar === "/" && lastChar === "+")
    ) {
      displayValue = displayValue.substring(0, displayValue.length - 2) + "+";
      display.innerHTML = displayValue;
    }

    return false;
  } else if (that === decimal) {
    let cutString = displayValue.split(isSymbol);
    cutString = cutString[cutString.length - 1];
    if (cutString.includes(".")) {
      return false;
    }
  } else if (that === equals) {
    display.innerHTML = parse(displayValue);
    return false;
  }

  display.innerHTML += character;
}

function parse(str) {
  return Function(`'use strict'; return (${str})`)();
}