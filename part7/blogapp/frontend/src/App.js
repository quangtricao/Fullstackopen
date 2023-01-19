import { useState, useEffect } from "react";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";

import loginService from "./services/login";
import userService from "./services/user";
import blogService from "./services/blogs";

import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { setBlogs } from "./reducers/blogReducer";

const App = () => {
	const [user, setUser] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
		blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
	}, [dispatch])

	useEffect(() => {
		const userFromStorage = userService.getUser();
		if (userFromStorage) {
			setUser(userFromStorage);
		}
	}, []);

	const login = async (username, password) => {
		loginService
			.login({
				username,
				password,
			})
			.then((user) => {
				setUser(user);
				userService.setUser(user);
				dispatch(setNotification(`${user.username} logged in!`));
			})
			.catch(() => {
				dispatch(setNotification("wrong username/password", "error"));
			});
	};

	const logout = () => {
		setUser(null);
		userService.clearUser();
		dispatch(setNotification("Log out!"));
	};

	return (
		<>
			<Notification />

			{user === null
			? <LoginForm onLogin={login} />
			: (<div>
				<h2>blogs</h2>
				<div>
					{user.username} {"  "} logged in
					<button id="log-out-button" onClick={logout}>logout</button>
				</div>
				<br />
				<NewBlogForm />
				<br />

				<Blog id="blogs"/>
			</div> )}

		</>
	);
};

export default App;
