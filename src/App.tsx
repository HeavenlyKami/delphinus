import React from 'react';
import { Triangle } from './features/triangle/Triangle';
import { Eth } from './features/eth/Eth';
import { Q3testCase } from './features/promises';
import './App.css';

function App() {
	console.log(Q3testCase); // Activate Q3 function
	return (
		<div className="App">
			<header className="App-header">
				<h2>Question 1</h2>
				<Triangle />
				<br />
				<h2>Question 2</h2>
				<Eth />
				<br />
				<h2>Question 3 and 4</h2>
				<div>
					<div>Q3: Sequential behavior could be observed from console panel</div>
					<div>Q4: See test file</div>
				</div>
			</header>
		</div>
	);
}

export default App;
