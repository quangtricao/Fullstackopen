import personService from "../services/persons";

const PersonDelete = ({
	name,
	id,
	fetchAgain,
	setFetchAgain,
	setSuccessMessage,
}) => {
	const deletePerson = () => {
		if (window.confirm(`Delete ${name} ?`)) {
			personService.Delete(id);
			setFetchAgain(!fetchAgain);
			setSuccessMessage(`${name} is deleted`);
		}
	};

	return <button onClick={deletePerson}> delete </button>;
};

export default PersonDelete;
