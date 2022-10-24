import PersonDelete from "../components/PersonDelete";

const Persons = ({ persons, fetchAgain, setFetchAgain, setSuccessMessage }) => {
	return (
		<>
			{persons.map((name) => {
				if (name.show) {
					return (
						<div key={name.id}>
							{name.name} {name.number}
							<PersonDelete
								name={name.name}
								id={name.id}
								fetchAgain={fetchAgain}
								setFetchAgain={setFetchAgain}
								setSuccessMessage={setSuccessMessage}
							/>
						</div>
					);
				}
			})}
		</>
	);
};

export default Persons;
