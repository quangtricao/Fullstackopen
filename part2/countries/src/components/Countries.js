import Country from "./Country";

const Countries = ({ countryName }) => {
	let showCount = 0;
	const showCountry = () => {
		console.log("show country");
	};

	countryName.map((country) => {
		if (country.show) {
			showCount += 1;
		}
	});

	if (showCount === 1) {
		return <Country countryName={countryName} />;
	} else if (showCount <= 10) {
		return (
			<>
				{countryName.map((country) => {
					if (country.show) {
						return (
							<div key={country.name}>
								{country.name}{" "}
								<button onClick={showCountry}> show </button>
							</div>
						);
					}
				})}
			</>
		);
	} else {
		return <>Too much</>;
	}
};

export default Countries;
