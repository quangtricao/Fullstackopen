const Notification = ({
	errorMessage,
	successMessage,
	setErrorMessage,
	setSuccessMessage,
}) => {
	if (errorMessage === null && successMessage === null) {
		return null;
	} else if (errorMessage === null) {
		setTimeout(() => {
			setErrorMessage(null);
			setSuccessMessage(null);
		}, 2000);
		return <div className="success">{successMessage}</div>;
	} else if (successMessage === null) {
		setTimeout(() => {
			setErrorMessage(null);
			setSuccessMessage(null);
		}, 2000);
		return <div className="error">{errorMessage}</div>;
	}
};

export default Notification;
