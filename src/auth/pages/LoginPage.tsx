import { Grid, TextField, Button, Alert } from "@mui/material";
import { useForm } from "../../hooks";
import { AuthLayout } from "../layout/AuthLayout";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const formData = {
	username: "",
	password: "",
};

export const LoginPage = () => {
	const {login} = useAuth();
	const [errorMessage, _setErrorMessage] = useState("");
	const [isAuthenticating, _setIsAuthenticating] = useState(false);
	const { username, password, onInputChange } = useForm(formData);

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		login({ username, password })
	};

	return (
		<AuthLayout>
			<form
				onSubmit={onSubmit}
				className="animate__animated animate__fadeIn animate__faster"
			>
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Usuario"
							type="text"
							placeholder="Usuario"
							fullWidth
							name="username"
							value={username}
							onChange={onInputChange}
						/>
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Contraseña"
							type="password"
							placeholder="Contraseña"
							fullWidth
							name="password"
							value={password}
							onChange={onInputChange}
						/>
					</Grid>
					<Grid
						container
						spacing={2}
						sx={{ mb: 2, mt: 1, justifyContent: "center" }}
					>
						<Grid
							item
							xs={12}
							display={!!errorMessage ? "" : "none"}
						>
							<Alert severity="error">{errorMessage}</Alert>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button
								disabled={isAuthenticating}
								type="submit"
								variant="contained"
								color="secondary"
								fullWidth
								size="large"
							>
								Ingresar
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
