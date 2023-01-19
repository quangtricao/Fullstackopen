import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, updateLike } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
	const dispatch = useDispatch();
	const [visible, setVisible] = useState(false);

	const hideAtStart = { display: visible ? "none" : "" };
	const showWhenClick = { display: visible ? "" : "none" };

	const blogStyle = {
		padding: 10,
		margin: 10,
		borderStyle: "solid",
		borderWidth: 1,
	};

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const handleDelete = (blog) => {
		if (window.confirm(`remove '${blog.title}' by ${blog.author}?`)) {
			dispatch(deleteBlog(blog.id));
		}
	};

	const handleLike = (blog) => {
		const liked = {
			...blog,
			likes: blog.likes + 1,
			user: blog.user.id,
		};
		dispatch(updateLike(liked));
	};

	return (
		<>
			<div style={hideAtStart} className="view">
				<div style={blogStyle}>
					{blog.title}{" "}
					<button id="view-button" onClick={toggleVisibility}>view</button>
				</div>
			</div>

			<div style={showWhenClick} className="hide">
				<div style={blogStyle}>
					Title: {blog.title}{" "}
					<button id="hide-button" onClick={toggleVisibility}>hide</button>
					<div>
						URL: <a href={blog.url}>{blog.url}</a>
					</div>
					<div>
						likes: {blog.likes}{" "}
						<button
							id="like-button"
							style={{ color: "red" }}
							onClick={() => {handleLike(blog)}}>like</button>
					</div>
					<div>Author: {blog.author ? blog.author : "Anonymous"}</div>
					{blog.user.username === JSON.parse(window.localStorage.getItem("loggedBlogAppUser")).username
					? (<button
							id="remove-button"
							style={{ color: "blue" }}
							onClick={() => {handleDelete(blog)}}>remove</button>
					) : ( <></> )}
				</div>
			</div>
		</>
	);
};

const Blogs = () => {
	const blogs = useSelector(({ blog }) => blog);

	// if (blogs.length === 0) {
	// 	return <></>;
	// }

	return (
		<>
			{blogs.map((blog) => {
				return <Blog key={blog.id} blog={blog} />;
			})}
		</>
	);
};

export default Blogs;
