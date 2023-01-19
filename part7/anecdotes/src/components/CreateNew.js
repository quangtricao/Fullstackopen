import { useNavigate } from "react-router-dom";

import useField from "../hooks/useField";

const CreateNew = ({ addNew }) => {
	// const [content, setContent] = useState("");
	// const [author, setAuthor] = useState("");
	// const [info, setInfo] = useState("");

	const content = useField("text");
	const author = useField("text");
	const info = useField("text");

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		addNew({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0,
		});
		navigate("/");
	};

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input
						name="content"
						type={content.type}
						value={content.value}
						onChange={content.onChange}
					/>
				</div>
				<div>
					author
					<input
						name="author"
						type={author.type}
						value={author.value}
						onChange={author.onChange}
					/>
				</div>
				<div>
					url for more info
					<input
						name="info"
						type={info.type}
						value={info.value}
						onChange={info.onChange}
					/>
				</div>
				<button>create</button>
				<button type="button" onClick={() => {
					content.reset();
					author.reset();
					info.reset();
					console.log(content);
				}}>reset</button>
			</form>
		</div>
	);
};

export default CreateNew;
