import { Grid, IconButton, Toolbar, Box, Typography } from "@mui/material";
import { MenuRounded } from "@mui/icons-material";

export const TopBar = ({ toggleDrawer, title }: any) => {
	return (
		<Box
			sx={{
				width: `100%`,
			}}
		>
			<Toolbar
				sx={{
					m: 0,
					bgcolor: "grey.200",
					minHeight: {
						xs: 60,
						md: 60,
					},
				}}
			>
				<IconButton
					onClick={toggleDrawer(true)}
					size="small"
					sx={{ mr: 1, bgcolor: "primary.main" }}
				>
					{
						<MenuRounded
							sx={{
								fontSize: `calc(100% * ${1.5})`,
								color: "white",
							}}
						/>
					}
				</IconButton>
				<Grid
					container
					justifyContent="space-between"
					alignItems="center"
				>
					<Grid item>
						<Typography
							color="DimGray"
							sx={{ fontSize: `calc(100% * ${1.4})`, ml: 1 }}
						>
							{title}
						</Typography>
					</Grid>
				</Grid>
			</Toolbar>
		</Box>
	);
};
