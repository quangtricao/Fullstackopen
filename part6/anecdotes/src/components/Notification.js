// import { useSelector } from "react-redux";
import { connect } from "react-redux";

const Notification = ( { noti } ) => {
	// const notification = useSelector((state) => state.notification);
	const style = {
		border: "solid",
		padding: 10,
		borderWidth: 1,
	};

	if (noti.length === 0) {
		return null;
	}

	return (
		<>
			<div style={style}>{noti}</div>
		</>
	);
};

const mapStateToProps = (state) => {
	// mapStateToProps() in connect() must return a plain object
	return {
		noti: state.notification,
	};
};

export default connect(mapStateToProps)(Notification);