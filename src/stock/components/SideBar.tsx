import {
	SwipeableDrawer,
	Box,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
} from "@mui/material";
import {
	Workspaces,
	Label,
	Help,
	DeleteSweep,
	Logout,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
// import {useState } from "react";

export const SideBar = ({ open, toggleDrawer }: any) => {
	const { logout } = useAuth();
	// const dispatch = useDispatch();
	// const [anchorEl, setAnchorEl] = useState(null);
	// const onClickButton = (event) => {
	// 	setAnchorEl(event.currentTarget);
	// 	dispatch(openMenu());
	// };

	// const onOpenTrash = (event) => {
	// 	dispatch(setActiveTrash(true));
	// 	dispatch(setActiveWorkspace(null));
	// };

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
						width: 60,
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
					<ListItem disablePadding>
						<ListItemButton
							id="workspaces"
							sx={{ minHeight: 50 }}
							onClick={() => {
								console.log("workspaces");
							}}
						>
							<ListItemIcon
								sx={{
									color: "white",
									minWidth: 24,
								}}
							>
								<Workspaces />
							</ListItemIcon>
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton
							id="tags"
							sx={{ minHeight: 50 }}
							onClick={() => {
								console.log("tags");
							}}
						>
							<ListItemIcon
								sx={{
									color: "white",
									minWidth: 24,
								}}
							>
								<Label />
							</ListItemIcon>
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton
							onClick={() => {
								console.log("trash");
							}}
							sx={{ minHeight: 50 }}
						>
							<ListItemIcon
								sx={{
									color: "white",
									minWidth: 24,
								}}
							>
								<DeleteSweep />
							</ListItemIcon>
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton sx={{ minHeight: 50 }}>
							<ListItemIcon
								sx={{
									color: "white",
									minWidth: 24,
								}}
							>
								<Help />
							</ListItemIcon>
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
							}}
							onClick={logout}
						>
							<ListItemIcon
								sx={{
									color: "white",
									minWidth: 24,
								}}
							>
								<Logout />
							</ListItemIcon>
						</ListItemButton>
					</ListItem>
				</List>
			</SwipeableDrawer>
		</>
	);
};
