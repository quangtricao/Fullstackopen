import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAnecdote } from "./reducers/anecdoteReducer";

import Anecdotes from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(initializeAnecdote());
	}, [dispatch]);

	return (
		<>
			<h2>Anecdotes</h2>
			<Notification />
			<Filter />
			<Anecdotes />
			<AnecdoteForm />
		</>
	);
};

export default App;
