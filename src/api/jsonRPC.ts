export const login = async (username: string, password: string) => {
    console.log(import.meta.env.VITE_API_URL, "import.meta.env.VITE_API_URL");
    console.log(import.meta.env.VITE_DB_NAME, "import.meta.env.VITE_DB_NAME");
	const response = await fetch("https://cors-anywhere.herokuapp.com/"+ import.meta.env.VITE_API_URL + "/jsonrpc", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},

		body: JSON.stringify({
			jsonrpc: "2.0",
			method: "call",
			params: {
				service: "common",
				method: "login",
				args: [import.meta.env.VITE_DB_NAME, username, password],
			},
		}),
	});

	const data = await response.json();
    console.log(data);

	const uid = data.result;
	if (!uid) {
        console.log('error');
	}

	return uid;
};

export const isAuthenticated = () => {
	const user = localStorage.getItem("user");
	if (!user) {
		return {};
	}
	return JSON.parse(user);
};
