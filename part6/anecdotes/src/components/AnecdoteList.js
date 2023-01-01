import { useSelector, useDispatch } from "react-redux";

import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdotes = () => {
	const anecdotes = useSelector((state) => state.anecdote);
	const filter = useSelector((state) => state.filter);
	const dispatch = useDispatch();

	const vote = (anecdote) => {
		dispatch(voteAnecdote(anecdote));
		dispatch(setNotification(`you voted '${anecdote.content}'`, 2));
	};

	const newArr = [...anecdotes];
	const sortAnecdotes = newArr.sort((a, b) => b.votes - a.votes);

	const filterAnecdotes =
		filter.length === 0
			? sortAnecdotes
			: sortAnecdotes.filter((p) =>
					p.content.toLowerCase().includes(filter.toLowerCase())
			  );

	return (
		<>
			{filterAnecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote)}>vote</button>
					</div>
					<br />
				</div>
			))}
		</>
	);
};

export default Anecdotes;
