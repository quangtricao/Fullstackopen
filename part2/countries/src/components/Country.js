const Country = ({ countryName }) => {
	return (
		<>
			{countryName.map((country) => {
				if (country.show) {
					return (
						<div key="1">
							<h2>{country.name}</h2>
							<div>capital {country.capital[0]}</div>
							<div>area {country.area}</div>{" "}
							<div>
								<h3>languages</h3>
								{Object.values(country.languages).map(
									(lang) => {
										return <li key={lang}> {lang}</li>;
									}
								)}
							</div>
							<br />
							<img
								src={country.flags}
								style={{ height: "200px" }}
							></img>
						</div>
					);
				}
			})}
		</>
	);
};

export default Country;
