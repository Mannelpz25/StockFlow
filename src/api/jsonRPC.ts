export const login = async (username: string, password: string) => {
	const response = await fetch(
		"https://corsreverse.onrender.com/" +
			import.meta.env.VITE_API_URL +
			"/jsonrpc",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"User-Agent": "PostmanRuntime/7.26.8",
			},
			credentials: "same-origin",

			body: JSON.stringify({
				jsonrpc: "2.0",
				method: "call",
				params: {
					service: "common",
					method: "login",
					args: [import.meta.env.VITE_DB_NAME, username, password],
				},
			}),
		}
	);

	const data = await response.json();

	const uid = data.result;
	if (!uid) {
		return {
			success: false,
			errorMessage: "Correo electrónico o contraseña incorrectos",
		};
	}

	const { employeeId, name } = await getNameEmployee(
		uid,
		username,
		password
	);

	return { uid, employeeId, name, success: true };
};

const getNameEmployee = async (
	uid: string,
	email: string,
	password: string
): Promise<{ employeeId: number; name: string }> => {
	const response = await fetch(
		"https://corsreverse.onrender.com/" +
			import.meta.env.VITE_API_URL +
			"/jsonrpc",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"User-Agent": "PostmanRuntime/7.26.8",
			},
			credentials: "same-origin",

			body: JSON.stringify({
				jsonrpc: "2.0",
				method: "call",
				params: {
					service: "object",
					method: "execute",
					args: [
						import.meta.env.VITE_DB_NAME,
						uid,
						password,
						"hr.employee",
						"search_read",
						[["email", "=", email]],
						["name"],
					],
				},
			}),
		}
	);

	const data = await response.json();
	const employeeId = data.result[0].id;
	const name = data.result[0].name;
	return { employeeId, name };
};

export const isAuthenticated = () => {
	const user = localStorage.getItem("user");
	if (!user) {
		return {};
	}
	return JSON.parse(user);
};
