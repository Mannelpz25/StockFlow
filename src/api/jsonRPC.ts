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

export const getStockPicking = async (uid: string, password: string) => {
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
						"stock.picking",
						"search_read",
						[
							["picking_type_code", "=", "outgoing"],
							["state", "!=", "done"],
							["user_id", "=", false],
						],
						[
							"id",
							"name",
							"state",
							"origin",
							"date",
							"date_done",
							"picking_type_code",
							"partner_id",
							"move_line_ids",
							"write_uid",
							"write_date",
						],
					],
				},
			}),
		}
	);

	const data = await response.json();

	const stockPicking = data.result.map((picking: any) => {
		return {
			id: picking.id,
			pickingOrder: picking.name,
			creationDate: picking.date,
			client: picking.partner_id[1],
			purchaseOrder: picking.origin,
			priority: picking.priority,
			moveLines: picking.move_line_ids,
			notes: picking.notes,
		};
	});

	return stockPicking;
};

export const getMoveLines = async (
	uid: string,
	password: string,
	id: number,
	pickingOrder: string
) => {
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
						"stock.move.line",
						"search_read",
						[["picking_id", "=", [id.toString(), pickingOrder]]],
						["id", "product_id", "quantity"],
					],
				},
			}),
		}
	);

	const data = await response.json();
	console.log(data);

	const moveLines = await Promise.all(
		data.result.map(async (moveLine: any) => {
			const barcode = await getProductBarcode(
				uid,
				password,
				moveLine.product_id[0]
			);
			return {
				id: moveLine.id,
				productId: moveLine.product_id[0],
				productName: moveLine.product_id[1],
				quantity: moveLine.quantity,
				quantityDone: 0,
				productBarcode: barcode,
			};
		})
	);

	return moveLines;
};

const getProductBarcode = async (
	uid: string,
	password: string,
	id: number
) => {
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
						"product.template",
						"search_read",
						[["id", "=", id]],
						["barcode"],
					],
				},
			}),
		}
	);

	const data = await response.json();

	return data.result[0].barcode;
};

export const setStockPickingResponsible = async (
	uid: string,
	password: string,
	pickingId: number,
) => {
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
						"stock.picking",
						"write",
						[pickingId], { user_id: Number(uid)},
					],
				},
			}),
		}
	);

	const data = await response.json();
	return data.result;
}

export const setStockPickingDone = async (
	uid: string,
	password: string,
	pickingId: number,
) => {
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
						"stock.picking",
						"button_validate",
						[pickingId]
					],
				},
			}),
		}
	);
		
	const data = await response.json();
	return data.result;
}

export const getProducts = async (uid: string, password: string) => {
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
						"product.template",
						"search_read",
						[],
						["id", "name", "barcode"],
					],
				},
			}),
		}
	);

	const data = await response.json();
	return data.result;
}

