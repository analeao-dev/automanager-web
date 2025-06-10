import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:5274",
	headers: {
		"Content-Type": "application/json",
	},
	paramsSerializer: {
		indexes: null,
	},
});

export default api;
