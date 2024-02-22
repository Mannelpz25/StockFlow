import { Component, ComponentProps } from "react";
import { Alert, AlertColor, AlertTitle, Snackbar } from "@mui/material";
import {
	CheckCircleOutline,
	ErrorOutline,
	InfoOutlined,
	WarningAmberOutlined,
} from "@mui/icons-material";

interface DropdownAlertProps {
	showAlert: boolean;
	alertMessage: string;
	alertType: string;
	alertTitle: string;
    delay?: number;
}

class DropdownAlert extends Component {
	static current: any;
	state: DropdownAlertProps;
	constructor(props: ComponentProps<any>) {
		super(props);
		this.state = {
			showAlert: false,
			alertMessage: "",
			alertType: "",
			alertTitle: "",
		};
	}

	show = ({ message = "", type = "info", title = "" , delay = 6000}) => {
		if (!this.state.showAlert) {
			this.setState({
				showAlert: true,
				alertMessage: message,
				alertType: type,
				alertTitle: title,
                delay
			});
		}
	};

	static setReference = (reference: any) => {
		this.current = reference;
	};

	icon = () => {
		switch (this.state.alertType) {
			case "info":
				return <InfoOutlined sx={{ fontSize: 45 }} />;
			case "success":
				return <CheckCircleOutline sx={{ fontSize: 45 }} />;
			case "warning":
				return <WarningAmberOutlined sx={{ fontSize: 45 }} />;
			case "error":
				return <ErrorOutline sx={{ fontSize: 45 }} />;
			default:
				return <InfoOutlined sx={{ fontSize: 45 }} />;
		}
	};

	render() {
		const { alertMessage, alertType, alertTitle, delay } = this.state;
		return (
			<Snackbar
				open={this.state.showAlert}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				autoHideDuration={delay || 5000}
				onClose={() => {
					this.setState({ showAlert: false });
				}}
			>
				<Alert
					icon={this.icon()}
					onClose={() => {
						this.setState({ showAlert: false });
					}}
					severity={alertType as AlertColor}
					variant="filled"
					sx={{ width: "100%" }}
				>
					<AlertTitle>{alertTitle}</AlertTitle>
					{alertMessage}
				</Alert>
			</Snackbar>
		);
	}
}

export default DropdownAlert;
