import { useState } from "react";
import "./App.css";

const Button = (props) => {
	return (
		<div>
			<button onClick={props.handleClick}> {props.text} </button>
		</div>
	);
};
const StatisticLine = ({ text, good, neutral, bad }) => {
	let results;
	const all = good + neutral + bad;
	const average = (good - bad) / (good + neutral + bad);
	const positive = (good / (good + neutral + bad)) * 100;

	if (text === "good") {
		results = " " + good;
	} else if (text === "neutral") {
		results = " " + neutral;
	} else if (text === "bad") {
		results = " " + bad;
	} else if (text === "all") {
		results = " " + all;
	} else if (text === "average") {
		results = " " + average.toFixed(1);
	} else if (text === "positive") {
		results = " " + positive.toFixed(1) + " %";
	}

	return (
		<div>
			<table>
				<tbody>
					<tr>
						<td width="60"> {text} </td>
						<td width="60"> {results}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	if (good === 0 && neutral === 0 && bad === 0) {
		return (
			<div>
				<h2>give feedback</h2>
				<div id="button">
					<Button handleClick={() => setGood(good + 1)} text="good" />
					<Button
						handleClick={() => setNeutral(neutral + 1)}
						text="neutral"
					/>
					<Button handleClick={() => setBad(bad + 1)} text="bad" />
				</div>
				<h2>statistics</h2>
				<p>No feedback given</p>
			</div>
		);
	} else {
		return (
			<div>
				<h2>give feedback</h2>
				<div id="button">
					<Button handleClick={() => setGood(good + 1)} text="good" />
					<Button
						handleClick={() => setNeutral(neutral + 1)}
						text="neutral"
					/>
					<Button handleClick={() => setBad(bad + 1)} text="bad" />
				</div>
				<h2>statistics</h2>
				<StatisticLine
					text="good"
					good={good}
					neutral={neutral}
					bad={bad}
				/>
				<StatisticLine
					text="neutral"
					good={good}
					neutral={neutral}
					bad={bad}
				/>
				<StatisticLine
					text="bad"
					good={good}
					neutral={neutral}
					bad={bad}
				/>
				<StatisticLine
					text="all"
					good={good}
					neutral={neutral}
					bad={bad}
				/>
				<StatisticLine
					text="average"
					good={good}
					neutral={neutral}
					bad={bad}
				/>
				<StatisticLine
					text="positive"
					good={good}
					neutral={neutral}
					bad={bad}
				/>
			</div>
		);
	}
};

export default App;
