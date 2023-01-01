import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";

const initialState = {
	good: 0,
	ok: 0,
	bad: 0,
};

const counterReducer = (state = initialState, action) => {
	switch (action.type) {
		case "GOOD":
			return { ...state, good: state.good + 1 };
		case "OK":
			return { ...state, ok: state.ok + 1 };
		case "BAD":
			return { ...state, bad: state.bad + 1 };
		case "ZERO":
			return { good: 0, ok: 0, bad: 0 };
		default:
			return state;
	}
};

const store = createStore(counterReducer);

const StatisticLine = ({ text, value }) => (
	<tr>
		<td>{text}</td>
		<td>{value}</td>
	</tr>
);

const App = () => {
	return (
		<div>
			<button onClick={(e) => store.dispatch({ type: "GOOD" })}> good </button>
			<button onClick={(e) => store.dispatch({ type: "OK" })}> ok </button>
			<button onClick={(e) => store.dispatch({ type: "BAD" })}> bad </button>
			<button onClick={(e) => store.dispatch({ type: "ZERO" })}> reset stats </button>
			<br />
			<br />
			<table>
				<tbody>
					<StatisticLine text="good" value={store.getState().good} />
					<StatisticLine text="ok" value={store.getState().ok} />
					<StatisticLine text="bad" value={store.getState().bad} />
				</tbody>
			</table>
		</div>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
const renderApp = () => root.render(<App />);

renderApp();
store.subscribe(renderApp);
