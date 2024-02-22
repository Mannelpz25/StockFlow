import { Box, Divider } from "@mui/material";
import { SideBar } from "../components/SideBar";
import { TopBar } from "../components/TopBar";
import { useState } from "react";
interface StockLayoutProps {
    title: string;
	children: React.ReactNode;
  components?: React.ReactNode[];
}

export const StockLayout = ({ children, title, components }: StockLayoutProps) => {
    const [open, setOpen] = useState(false);
    const toggleDrawer =(open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setOpen(open );
    };
	return (
		<div style={{ display: "flex" }}>
			<Box sx={{ display: "flex", m: 0, p: 0, position: "fixed", zIndex: 1, width: "100%" }}>
				<TopBar toggleDrawer={toggleDrawer} title={title} components={components} />
			</Box>
			<SideBar open={open} toggleDrawer={toggleDrawer} />
			<Divider />

			<Box sx={{ p: 2, ml: 0, mt: 8, width: "100%" }}>
        {children}
      </Box>
		</div>
	);
};
