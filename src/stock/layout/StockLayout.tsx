import { Box, Divider } from "@mui/material";
import { SideBar } from "../components/SideBar";
import { TopBar } from "../components/TopBar";
import { useState } from "react";
interface StockLayoutProps {
    title: string;
	children: React.ReactNode;
}

export const StockLayout = ({ children, title }: StockLayoutProps) => {
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
		<>
			<Box sx={{ display: "flex", m: 0, p: 0 }}>
				<TopBar toggleDrawer={toggleDrawer} title={title} />
			</Box>
			<SideBar open={open} toggleDrawer={toggleDrawer} />
			<Divider />

			<Box sx={{ pl: 2 }}>{children}</Box>
		</>
	);
};
