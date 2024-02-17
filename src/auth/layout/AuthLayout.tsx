import { Grid, Typography } from "@mui/material";

interface AuthLayoutProps {
	children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			sx={{
				minHeight: "100vh",
				backgroundColor: "primary.dark",
				padding: 4,
			}}
		>
			<img
				src="/src/assets/logo.png"
				alt="StockFlow"
				width="200"
				height="200"
				style={{ display: "block", margin: 25 }}
			/>
			<Typography
				variant="h3"
				sx={{ color: "secondary.main", mb: 4, fontWeight: "bold" }}
			>
				Stock
				<Typography
					variant="h3"
					component="span"
					sx={{ color: "primary.light" }}
				>
					Flow
				</Typography>
			</Typography>

			<Grid
				item
				className="box-shadow"
				xs={3}
				sx={{
					width: { sm: 450 },
					backgroundColor: "grey.300",
					padding: 3,
					borderRadius: 2,
				}}
			>
				{children}
			</Grid>
			<Typography variant="body2" sx={{ mt: 2, color: "secondary.main" }}>
				© 2024 StockFlow
			</Typography>
		</Grid>
	);
};
