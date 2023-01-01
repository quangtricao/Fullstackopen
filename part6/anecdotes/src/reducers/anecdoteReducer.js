import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const reducerSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		voting(state, action) {
			const id = action.payload;
			const anecdoteToVote = state.find((a) => a.id === id);
			const updateAnecdote = {
				...anecdoteToVote,
				votes: anecdoteToVote.votes + 1,
			};

			return state.map((anecdote) =>
				anecdote.id !== id ? anecdote : updateAnecdote
			);
		},
		adding(state, action) {
			const newAnecdote = {
				content: action.payload.content,
				id: action.payload.id,
				votes: 0,
			};
			return [...state, newAnecdote];
		},
		initializing(state, action) {
			return action.payload;
		},
	},
});

export const initializeAnecdote = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		dispatch(initializing(anecdotes));
	};
};

export const addAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = {
			content,
			votes: 0
		}
		const response = await anecdoteService.create(newAnecdote);
		dispatch(adding(response));
	}

}

export const voteAnecdote = (anecdote) => {
	return async (dispatch) => {
		const voteAnecdote = {
			...anecdote,
			votes: anecdote.votes + 1
		};
		const response = await anecdoteService.update( voteAnecdote.id, voteAnecdote );
		dispatch(voting(response.id));
	};
};

export const { voting, adding, initializing } = reducerSlice.actions;
export default reducerSlice.reducer;
