import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newPhone, setNewPhone] = useState("");
	const [show, setShow] = useState("");
	const [fetchAgain, setFetchAgain] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	useEffect(() => {
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, [fetchAgain]);

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification
				errorMessage={errorMessage}
				successMessage={successMessage}
				setErrorMessage={setErrorMessage}
				setSuccessMessage={setSuccessMessage}
			/>

			<Filter persons={persons} show={show} setShow={setShow} />

			<h3>Add a new</h3>
			<PersonForm
				persons={persons}
				setPersons={setPersons}
				newName={newName}
				setNewName={setNewName}
				newPhone={newPhone}
				setNewPhone={setNewPhone}
				setErrorMessage={setErrorMessage}
				setSuccessMessage={setSuccessMessage}
			/>

			<h3>Numbers</h3>
			<Persons
				persons={persons}
				fetchAgain={fetchAgain}
				setFetchAgain={setFetchAgain}
				setSuccessMessage={setSuccessMessage}
			/>
		</div>
	);
};

export default App;
