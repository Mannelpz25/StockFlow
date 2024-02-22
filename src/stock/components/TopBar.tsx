import { Grid, IconButton, Toolbar, Box, Typography } from "@mui/material";
import { MenuRounded } from "@mui/icons-material";

export const TopBar = ({ toggleDrawer, title, components }: any) => {
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
				{components?.length > 0 && (
					<Grid
						item
						sx={{
							display: "flex",
							justifyContent: "flex-end",
							alignItems: "center",
							gap: 2,
						}}
					>
						{components.map((component: any, index: number) => (
							<div key={index}>{component}</div>
						))}
					</Grid>
				)}
			</Toolbar>
		</Box>
	);
};
