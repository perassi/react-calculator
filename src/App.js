import './App.css';

import { useState } from 'react';
import Button from './Button';

const buttons = [
  "AC", "+/-", "%", "÷",
  "7", "8", "9", "x",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "0", ".", "="];

function App() {

  // You can use this to maintain the calculator buffer
  const [calcBuffer, setCalcBuffer] = useState([]);

  // Handle button clicks here
  function handleClick(value) {
   
  }

  return (
    <div className="App">
      <div>
        <header className="App-header">
          <h1>Calculator</h1>
        </header>
      </div>
      <main className="calculator">
        <div className="display">0</div>
        <div className="keypad">
          {buttons.map((button, index) => {
            return <Button label={button} handleClick={handleClick} />
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
