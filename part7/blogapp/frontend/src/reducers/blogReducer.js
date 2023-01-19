import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
	name: "blog",
	initialState: [],
	reducers: {
		newBlog(state, action) {
			return state.concat(action.payload);
		},
		removeBlog(state, action) {
			const newState = state.filter((b) => b.id !== action.payload);
			return newState;
		},
		likeBlog(state, action) {
			return state.map((blog) => blog.id === action.payload.id ? action.payload : blog);
		},
		setBlogs(state, action) {
			return action.payload;
		},
	},
});

export const initialBlog = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll();
		dispatch(setBlogs(blogs));
	};
};

export const createBlog = (blog) => {
	return async (dispatch) => {
		const savedBlog = await blogService.create(blog);
		dispatch(newBlog(savedBlog));
	};
};

export const deleteBlog = (id) => {
	return async (dispatch) => {
		await blogService.remove(id);
		dispatch(removeBlog(id));
	};
};

export const updateLike = (liked) => {
	return async (dispatch) => {
		const updatedBlog = await blogService.update(liked.id, liked);
		dispatch(likeBlog(updatedBlog));
	};
};

export const { newBlog, removeBlog, likeBlog, setBlogs } = blogSlice.actions;
export default blogSlice.reducer;
