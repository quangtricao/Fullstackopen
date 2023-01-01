import { createSlice } from "@reduxjs/toolkit";

const notiSlice = createSlice({
	name: "noti",
	initialState: "",
	reducers: {
		noti(state, action) {
			return action.payload;
		},
	},
});

export const setNotification = (content, time) => {
	return async (dispatch) => {
		dispatch(noti(content));

		setTimeout(() => {
			dispatch(noti(""));
		}, time * 1000);
	};
};

export const { noti } = notiSlice.actions;

export default notiSlice.reducer;
