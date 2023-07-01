import "./styles.css";
import React, { useState } from 'react';

export default function App() {
  const [num, setNum] = useState(0);
  const [result, setResult] = useState(0);
  const [operator, setOperator] = useState('');

  function handleNumberClick(number) {
    setNum(num * 10 + number);
  }

  function handleOperatorClick(operator) {
    setResult(num);
    setNum(0);
    setOperator(operator);
  }

  function calculate() {
    if (operator === '+') {
      setResult(result + num);
    } else if (operator === '-') {
      setResult(result - num);
    } else if (operator === '*') {
      setResult(result * num);
    } else if (operator === '/') {
      setResult(result / num);
    }

    setNum(0);
    setOperator('');
  }

  return (
    <div className="App">
      <div className="display">
        <div className="input">{num}</div>
        <div className="result">Result: {result}</div>
      </div>
      <div className="buttons">
        <button onClick={() => handleNumberClick(1)}>1</button>
        <button onClick={() => handleNumberClick(2)}>2</button>
        <button onClick={() => handleNumberClick(3)}>3</button>
        <br />
        <button onClick={() => handleNumberClick(4)}>4</button>
        <button onClick={() => handleNumberClick(5)}>5</button>
        <button onClick={() => handleNumberClick(6)}>6</button>
        <br />
        <button onClick={() => handleNumberClick(7)}>7</button>
        <button onClick={() => handleNumberClick(8)}>8</button>
        <button onClick={() => handleNumberClick(9)}>9</button>
        <br />
        <button onClick={() => handleOperatorClick('+')}>+</button>
        <button onClick={() => handleOperatorClick('-')}>-</button>
        <button onClick={() => handleOperatorClick('*')}>*</button>
        <button onClick={() => handleOperatorClick('/')}>/</button>
        <br />
        <button onClick={calculate}>=</button>
      </div>
    </div>
  );
}
