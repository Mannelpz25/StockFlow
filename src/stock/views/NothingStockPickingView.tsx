import { Description } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";

export const NothingStockPickingView = () => {
	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			sx={{
				minHeight: "calc(100vh - 110px)",
				borderRadius: 3,
			}}
		>
            <Grid item xs={12}>
                <Description
                    sx={{
                        fontSize: `calc(100% * ${10})`,
                        color: "grey.500",
                    }}
                />
            </Grid>
			<Grid item xs={12}>
				<Typography variant="h5" align="center" color="text.secondary">
					No hay ordenes de surtido disponibles
				</Typography>
			</Grid>
		</Grid>
	);
};
