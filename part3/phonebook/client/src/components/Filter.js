const Filter = ({ show, persons, setShow }) => {
	const filterName = (event) => {
		setShow(event.target.value);

		for (const key in persons) {
			if (persons[key].name.includes(event.target.value)) {
				persons[key].show = true;
			} else {
				persons[key].show = false;
			}
		}
	};

	return (
		<div>
			filter shown with: <input value={show} onChange={filterName} />
		</div>
	);
};
export default Filter;
