import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
	const request = axios.get(baseUrl);

	return request.then((response) => {
		let personArr = response.data.map((person) => {
			const personObj = {
				...person,
				show: true,
			};
			return personObj;
		});
		return personArr;
	}, []);
};

const create = (newObject) => {
	const request = axios.post(baseUrl, newObject);
	return request.then((response) => response.data);
};

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject);
	return request.then((response) => response.data);
};

const Delete = (id) => {
	axios
		.delete(`${baseUrl}/${id}`)
		.then((response) => response.data)
		.catch((error) => console.log("fail"));
};

export default { getAll, create, update, Delete };
