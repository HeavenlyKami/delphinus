import React from 'react';
import { Triangle } from './features/triangle/Triangle';
import { Eth } from './features/eth/Eth';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
		<h2>Question 1</h2>
		<Triangle />
		<br />
		<h2>Question 2</h2>
		<Eth />
      </header>
    </div>
  );
}

export default App;
