import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";

interface ModalProps {
	open: boolean;
	onClose: () => void;
	title: string;
	icon?: JSX.Element;
	placeholder?: string;
	content: string;
	buttons: {
		text: string;
		onClick: () => void;
	}[];
}

export const Modal = ({
	open,
	onClose,
	title,
	icon,
	content,
	placeholder,
	buttons,
}: ModalProps) => {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle sx={{ textAlign: "center" }}>{title}</DialogTitle>
			{icon && (
				<DialogContent
					sx={{ display: "flex", justifyContent: "center" }}
				>
					{icon}
				</DialogContent>
			)}
			<DialogContent>
				<DialogContentText
					sx={{ fontSize: 18, color: "text.primary" }}
				>
					{content}
				</DialogContentText>
				{placeholder && (
					<DialogContentText>{placeholder}</DialogContentText>
				)}
			</DialogContent>

			<DialogActions>
				{buttons.map((button, index) => (
					<Button key={index} onClick={button.onClick}>
						{button.text}
					</Button>
				))}
			</DialogActions>
		</Dialog>
	);
};
