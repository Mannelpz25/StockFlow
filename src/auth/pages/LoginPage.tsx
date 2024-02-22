import {
	Grid,
	TextField,
	Button,
	Alert,
	CircularProgress,
} from "@mui/material";
import { useForm } from "../../hooks";
import { AuthLayout } from "../layout/AuthLayout";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const formData = {
	username: "",
	password: "",
};

export const LoginPage = () => {
	const { login, errorMessage } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const { email, password, onInputChange } = useForm(formData);

	useEffect(() => {
		setIsLoading(false);
	}, [errorMessage]);

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		await login(email, password);
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
							label="Correo electrónico"
							type="email"
							placeholder="Correo electrónico"
							fullWidth
							name="email"
							disabled={isLoading}
							value={email ?? ""}
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
							disabled={isLoading}
							value={password ?? ""}
							onChange={onInputChange}
						/>
					</Grid>
					<Grid
						container
						spacing={2}
						sx={{ mb: 2, mt: 1, justifyContent: "center" }}
					>
						{!!errorMessage && !isLoading && (
							<Grid item xs={12}>
								<Alert severity="error">{errorMessage}</Alert>
							</Grid>
						)}
						<Grid item xs={12} sm={6}>
							{isLoading ? (
								<Grid container justifyContent="center">
									<CircularProgress color="secondary" />
								</Grid>
							) : (
								<Button
									disabled={isLoading || !email || !password}
									type="submit"
									variant="contained"
									color="secondary"
									fullWidth
									size="large"
								>
									Ingresar
								</Button>
							)}
						</Grid>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
