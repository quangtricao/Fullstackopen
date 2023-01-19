import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useMatch } from "react-router-dom";

import Footer from "./components/Footer";
import Menu from "./components/Menu";
import CreateNew from "./components/CreateNew";
import About from "./components/About";
import AnecdoteList from "./components/AnecdoteList";
import Anecdote from "./components/Anecdote";
import Notification from "./components/Notification";

const App = () => {
	const [anecdotes, setAnecdotes] = useState([
		{
			content: "If it hurts, do it more often",
			author: "Jez Humble",
			info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
			votes: 0,
			id: 1,
		},
		{
			content: "Premature optimization is the root of all evil",
			author: "Donald Knuth",
			info: "http://wiki.c2.com/?PrematureOptimization",
			votes: 0,
			id: 2,
		},
	]);

	const [notification, setNotification] = useState(null);
	const notify = (message) => {
		setNotification(message);
		setTimeout(() => {
			setNotification(null);
		}, 5000);
	};

	const addNew = (anecdote) => {
		anecdote.id = Math.round(Math.random() * 10000);
		setAnecdotes(anecdotes.concat(anecdote));
		notify(anecdote.content);
	};

	const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

	const vote = (id) => {
		const anecdote = anecdoteById(id);

		const voted = {
			...anecdote,
			votes: anecdote.votes + 1,
		};

		setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
	};

	const match = useMatch("/anecdotes/:id");
	const anecdote = match
		? anecdotes.find((n) => n.id === Number(match.params.id))
		: null;

	return (
		<div>
			<h1>Software anecdotes</h1>
			<Menu />
			<Notification notification={notification}/>
			<Routes>
				<Route
					path="/"
					element={<AnecdoteList anecdotes={anecdotes} />}
				/>
				<Route
					path="/anecdotes/:id"
					element={<Anecdote anecdote={anecdote} />}
				/>
				<Route
					path="/anecdotes"
					element={<AnecdoteList anecdotes={anecdotes} />}
				/>
				<Route path="/about" element={<About />} />
				<Route path="/create" element={<CreateNew addNew={addNew} />} />
			</Routes>

			<Footer />
		</div>
	);
};

export default App;
