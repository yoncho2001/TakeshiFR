import React from 'react'
import addNumbers from './utils';
import './App.less'

function App() {
  const sum = addNumbers(5, 10);

  return (
    <div>
      <h1>Welcome to Vite  !</h1>
      <p>The sum of 5 and 10 is {sum}.</p>
    </div>
  );
}

export default App
