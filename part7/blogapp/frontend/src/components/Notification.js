import { useSelector } from "react-redux";

const Notification = () => {
	const notification = useSelector((store) => store.noti);
	if (notification.length === 0) {
		return null;
	}

	const style = {
		color: notification.type === "alert" ? "red" : "green",
		background: "lightgrey",
		fontSize: 20,
		borderStyle: "solid",
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	};

	return (
		<div id="notification" style={style}>
			{notification}
		</div>
	);
};

export default Notification;
