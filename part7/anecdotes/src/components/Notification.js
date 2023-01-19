const Notification = ({ notification }) => {
	if (notification === null) {
		return null;
	}
	return (
		<>
			<p>a new {notification} created!</p>
		</>
	);
};

export default Notification;