import { useState, useEffect } from "react";
import axios from "axios";
import FindCountry from "./components/FindCountry";
import Countries from "./components/Countries";

const App = () => {
	const [countryName, setCountryName] = useState([]);
	const [input, setInput] = useState("");

	useEffect(() => {
		axios.get("https://restcountries.com/v3.1/all").then((response) => {
			let countries = response.data.map((country) => {
				const countryObj = {
					name: country.name.common,
					capital: country.capital,
					area: country.area,
					languages: country.languages,
					flags: country.flags.svg,
				};
				return countryObj;
			});
			setCountryName(countryName.concat(countries));
		});
	}, []);

	return (
		<>
			<FindCountry
				countryName={countryName}
				input={input}
				setInput={setInput}
			/>
			<Countries countryName={countryName} />
		</>
	);
};

export default App;
