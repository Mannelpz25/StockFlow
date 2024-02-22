import {
	SwipeableDrawer,
	Box,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	Typography,
} from "@mui/material";
import {
	Label,
	Logout,
	Description,
	Inventory,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import { useStock } from "../../context/StockContext";

export const SideBar = ({ open, toggleDrawer }: any) => {
	const { logout } = useAuth();
	const { activeStockPicking, setActiveScreen, activeScreen } = useStock();

	return (
		<>
			<SwipeableDrawer
				anchor={"left"}
				variant="temporary"
				open={open}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}
				ModalProps={{
					keepMounted: false,
				}}
				PaperProps={{ sx: { backgroundColor: "primary.dark" } }}
				sx={{
					flexShrink: 0,
					display: { xs: "block" },
					"& .MuiDrawer-paper": {
						boxSizing: "border-box",
						width: 240,
					},
				}}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						height: 60,
					}}
				>
					<img
						src="/src/assets/logo.png"
						alt="StockFlow"
						width="50"
						height="50"
						style={{ display: "block", margin: 5 }}
					/>
				</Box>
				<Divider />
				<List disablePadding sx={{ height: "100%" }}>
					{activeStockPicking != undefined && (
						<ListItem disablePadding>
							<ListItemButton sx={{ minHeight: 50 }} onClick={() => {
								setActiveScreen("stockPickingValidate");
							}}
							disabled={activeScreen === "stockPickingValidate"}>	
								<ListItemIcon
									sx={{
										color: "white",
										minWidth: 24,
									}}
								>
									<Inventory />
								</ListItemIcon>
								<Typography
									sx={{
										marginLeft: 1,
										color: "white",
										fontSize: 18,
									}}
								>
									{activeStockPicking.pickingOrder}
								</Typography>
							</ListItemButton>
						</ListItem>
					)}
					<ListItem disablePadding>
						<ListItemButton
							id="description"
							sx={{ minHeight: 50 }}
							onClick={() => {
								setActiveScreen("stockPicking");
							}}
							disabled={activeScreen === "stockPicking"}
						>
							<ListItemIcon
								sx={{
									color: "white",
									minWidth: 24,
								}}
							>
								<Description />
							</ListItemIcon>
							<Typography
								sx={{
									marginLeft: 1,
									color: "white",
									fontSize: 18,
								}}
							>
								Ordenes de surtido
							</Typography>
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton
							id="tags"
							sx={{ minHeight: 50 }}
							onClick={() => {
								setActiveScreen("tagsAssign");
							}}
							disabled={activeScreen === "tagsAssign"}
						>
							<ListItemIcon
								sx={{
									color: "white",
									minWidth: 24,
								}}
							>
								<Label />
							</ListItemIcon>
							<Typography
								sx={{
									marginLeft: 1,
									color: "white",
									fontSize: 18,
								}}
							>
								Asignar etiquetas
							</Typography>
						</ListItemButton>
					</ListItem>

					<ListItem
						disablePadding
						sx={{ position: "absolute", bottom: 0 }}
					>
						<ListItemButton
							sx={{
								minHeight: 50,
								bgcolor: "secondary.main",
								":hover": { bgcolor: "secondary.dark" },
								paddingX: 2,
								justifyContent: "center",
							}}
							onClick={logout}
							disabled={activeStockPicking != undefined}
						>
							<Logout sx={{ color: "white" }} />
							<Typography
								sx={{
									marginLeft: 1,
									color: "white",
									fontSize: 18,
									fontWeight: "bold",
								}}
							>
								Salir
							</Typography>
						</ListItemButton>
					</ListItem>
				</List>
			</SwipeableDrawer>
		</>
	);
};
