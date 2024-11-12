import "./App.css";

import { useState } from "react";
import Button from "./Button";

const buttons = [
  "AC",
  "+/-",
  "%",
  "÷",
  "7",
  "8",
  "9",
  "x",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "=",
];

function App() {
  // You can use this to maintain the calculator buffer
  const [calcBuffer, setCalcBuffer] = useState("0");
  const [lastNegatedNumber, setLastNegatedNumber] = useState("");

  const isDigit = (key) => {
    return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ")"].includes(
      key
    );
  };

  const isOperator = (key) => {
    return ["+", "-", "x", "/", "÷", "*", ".", "/100"].includes(key);
  };

  const getLastChar = (buffer) => {
    return buffer.slice(-1);
  };

  const replaceLastChar = (buffer, char) => {
    const newBuffer = buffer.slice(0, -1);
    return newBuffer + char;
  };

  const evalable = (value) => {
    if (value === "÷") {
      return "/";
    }
    if (value === "x") {
      return "*";
    }
    if (value === "%") {
      return "/100";
    }
    return value;
  };

  const getLastFloat = (buffer) => {
    var floatRegex = /\d+(\.\d+)?/g;
    const floats = buffer.match(floatRegex).map(function (v) {
      return parseFloat(v);
    });
    return floats[floats.length - 1];
  };

  // Handle button clicks here
  function handleClick(rawValue) {
    const value = evalable(rawValue);
    if (value === "=") {
      // if = then eval calcBuffer
      // NOTE: eval can be dangerous but isn't in this use case
      setCalcBuffer(String(eval(calcBuffer)));
      return;
    }
    if (value === "AC") {
      // if AC all clear
      setCalcBuffer("0");
      return;
    }
    if (value === "." && isDigit(getLastChar(calcBuffer))) {
      // if value is . and last entry is a digit, add . to buffer
      setCalcBuffer(calcBuffer + value);
      return;
    }
    if (
      value === "+/-" &&
      isDigit(getLastChar(calcBuffer)) &&
      calcBuffer !== "0"
    ) {
      // if value is +/- and last entry is a digit, put the last float in a "(-FLOAT)" string
      // if value was negated on the last entry, reverse this
      if (lastNegatedNumber) {
        setCalcBuffer(
          calcBuffer.substring(0, calcBuffer.lastIndexOf(lastNegatedNumber)) +
            String(getLastFloat(lastNegatedNumber))
        );
        setLastNegatedNumber("");
      } else {
        setCalcBuffer(
          calcBuffer.substring(
            0,
            calcBuffer.lastIndexOf(getLastFloat(calcBuffer))
          ) + `(-${getLastFloat(calcBuffer)})`
        );
        setLastNegatedNumber(`(-${getLastFloat(calcBuffer)})`);
      }
      return;
    }
    if (isDigit(value) && calcBuffer === "0") {
      // if calcBuffer is 0 like at start, adding a digit will replace instead of concatenate to avoid f.e "01"
      setCalcBuffer(value);
      return;
    }
    if (
      isDigit(value) &&
      (isDigit(getLastChar(calcBuffer)) || getLastChar(calcBuffer) === "")
    ) {
      // if both new and previous entry were digits, add digit to buffer
      setCalcBuffer(calcBuffer + value);
      return;
    }
    if (
      (isOperator(value) && isDigit(getLastChar(calcBuffer))) ||
      (isOperator(getLastChar(calcBuffer)) && isDigit(value))
    ) {
      // if one entry is operator and other was digit, add operator to buffer
      setCalcBuffer(calcBuffer + value);
      return;
    }
    if (isOperator(value) && isOperator(getLastChar(calcBuffer))) {
      // if both new and previous entry were operators, replace last char with new operator
      setCalcBuffer(replaceLastChar(calcBuffer, value));
      return;
    }

    return;
  }

  return (
    <div className="App">
      <div>
        <header className="App-header">
          <h1>Calculator</h1>
        </header>
      </div>
      <main className="calculator">
        <div className="display">{calcBuffer}</div>
        <div className="keypad">
          {buttons.map((button, index) => {
            return (
              <Button label={button} handleClick={() => handleClick(button)} />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
