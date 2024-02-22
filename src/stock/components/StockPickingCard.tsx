import { Button, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import moment from "moment";

interface StockPickingCardProps {
	id: number;
	pickingOrder: string;
	creationDate: string;
	client: string;
	purchaseOrder: string;
	moveLines: number[];
	selectedCard: number | null;
	setSelectedCard: (id: number | null) => void;
}

export const StockPickingCard = (props: StockPickingCardProps) => {
	const {
		pickingOrder,
		creationDate,
		client,
		purchaseOrder,
		selectedCard,
		setSelectedCard,
	} = props;
	const date = moment(creationDate).format("DD/MM/YYYY HH:mm");
	return (
		<Button
			sx={{ width: "100%", p: 0, mb: 2 }}
			onClick={() => {
				if (selectedCard === props.id) {
					setSelectedCard(null);
					return;
				}
				setSelectedCard(props.id);
			}}
		>
			<Card
				sx={{
					width: "100%",
					bgcolor: "grey.100",
					border: 2,
					borderColor:
						selectedCard === props.id
							? "primary.main"
							: "grey.100",
					borderRadius: 1,
				}}
			>
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						background: "#457B9D",
						width: 10,
						height: "100%",
						borderTopLeftRadius: 3,
						borderBottomLeftRadius: 3,
					}}
				/>
				<CardContent>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: 10,
						}}
					>
						<Typography variant="h5" align="left">
							{pickingOrder}
						</Typography>

						<Typography color="text.secondary" align="right">
							{date}
						</Typography>
					</div>
					<Typography color="text.secondary" align="left">
						Cliente: {client}
					</Typography>
					<Typography color="text.secondary" align="left">
						Orden de compra: {purchaseOrder}
					</Typography>
				</CardContent>
			</Card>
		</Button>
	);
};

export default StockPickingCard;
