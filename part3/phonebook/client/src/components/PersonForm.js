import personService from "../services/persons";

const PersonForm = ({
	persons,
	setPersons,
	newName,
	setNewName,
	newPhone,
	setNewPhone,
	fetchAgain,
	setFetchAgain,
	setErrorMessage,
	setSuccessMessage,
}) => {
	const addNewName = (event) => {
		event.preventDefault();
		const personObj = {
			name: newName,
			number: newPhone,
			show: true,
		};

		const newPersonsArr = persons.map((person) => {
			return person.name;
		});

		if (newPersonsArr.includes(newName)) {
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				const findPerson = persons.find((person) => {
					return person.name === newName;
				});
				console.log(findPerson.id);
				personService
					.update(findPerson.id, personObj)
					.then((returnedPer) => {
						setPersons(
							persons.map((person) =>
								person.id !== findPerson.id
									? person
									: returnedPer
							)
						);
						setSuccessMessage(
							`${newName}'s phone number is changed`
						);
						setFetchAgain(!fetchAgain);
						setNewName("");
						setNewPhone("");
					})
					.catch((error) => {
						setErrorMessage(error.response.data.error);
					});
			}
		} else {
			personService
				.create(personObj)
				.then((responeData) => {
					setPersons(persons.concat(responeData));
					setSuccessMessage(`${newName} is added`);
					setFetchAgain(!fetchAgain);
					setNewName("");
					setNewPhone("");
				})
				.catch((error) => {
					setErrorMessage(error.response.data.error);
				});
		}
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handlePhoneChange = (event) => {
		setNewPhone(event.target.value);
	};
	return (
		<>
			<form onSubmit={addNewName}>
				<div>
					name:
					<input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					number:
					<input value={newPhone} onChange={handlePhoneChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
		</>
	);
};

export default PersonForm;
