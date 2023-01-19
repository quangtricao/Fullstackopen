import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { useState } from "react";

const NewBlogForm = () => {
	const dispatch = useDispatch();
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? "none" : "" };
	const showWhenVisible = { display: visible ? "" : "none" };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const newBlog = {
			title: event.target.title.value,
			author: event.target.author.value,
			url: event.target.url.value,
			likes: 0,
		};

		event.target.title.value = "";
		event.target.author.value = "";
		event.target.url.value = "";

		dispatch(createBlog(newBlog));
	};

	return (
		<div>
			<div>
				<div style={hideWhenVisible}>
					<button onClick={toggleVisibility}>create new</button>
				</div>

				<div style={showWhenVisible}>
					<h2>Create new</h2>
					<form onSubmit={handleSubmit}>
						<div>
							title
							<input
								name="title"
								placeholder="title of the blog"
							/>
						</div>
						<div>
							author
							<input
								name="author"
								placeholder="author of the blog"
							/>
						</div>
						<div>
							url
							<input name="url" placeholder="url of the blog" />
						</div>
						<button type="submit" onClick={toggleVisibility}>
							create
						</button>
					</form>
					<button onClick={toggleVisibility}>cancel</button>
				</div>
			</div>
		</div>
	);
};

export default NewBlogForm;
