const FindCountry = ({ countryName, input, setInput }) => {
	const filterCountry = (event) => {
		setInput(event.target.value);

		for (const key in countryName) {
			if (
				countryName[key].name.toLowerCase().includes(event.target.value)
			) {
				countryName[key].show = true;
			} else {
				countryName[key].show = false;
			}
		}
	};

	return (
		<div>
			find countries: <input value={input} onChange={filterCountry} />
		</div>
	);
};

export default FindCountry;
