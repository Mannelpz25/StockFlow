import { Button } from "@mui/material";
import StockPickingCard from "../components/StockPickingCard";
import { StockLayout } from "../layout/StockLayout";
import { useState } from "react";
import { NothingStockPickingView } from "../views/NothingStockPickingView";
import { useStock } from "../../context/StockContext";
import { getMoveLines, setStockPickingResponsible } from "../../api/jsonRPC";
import { useAuth } from "../../context/AuthContext";
import { Modal } from "../components/Modal";

export const StockPickingPage = () => {
	const { user } = useAuth();
	const [selectedCard, setSelectedCard] = useState<number | null>(null);

	const [showModal, setShowModal] = useState(false);

	const {
		activeStockPicking,
		stockPicking,
		setActiveStockPicking,
		setActiveScreen,
	} = useStock();

	const startStockPicking = async () => {
		if (selectedCard === null) return;
		setStockPickingResponsible(user?.uid!, user?.password!, selectedCard);
		const selectedStockPicking = stockPicking.find(
			(picking) => picking.id === selectedCard
		);
		const moveLines = await getMoveLines(
			user?.uid!,
			user?.password!,
			selectedCard,
			selectedStockPicking?.pickingOrder!!
		);
		selectedStockPicking!.moveLines = moveLines;
		setActiveStockPicking(selectedStockPicking);
		setActiveScreen("stockPickingValidate");
	};

	const ButtonStart = () => {
		return (
			<Button
				key={"start"}
				variant="contained"
				disabled={
					selectedCard === null || activeStockPicking !== undefined
				}
				onClick={async () => {
					setShowModal(true);
				}}
			>
				Atender
			</Button>
		);
	};

	return (
		<StockLayout title="Ordenes de surtido" components={[<ButtonStart />]}>
			{stockPicking?.length === 0 ? (
				<NothingStockPickingView />
			) : (
				stockPicking?.map((order: any) => (
					<StockPickingCard
						key={order.id}
						id={order.id}
						pickingOrder={order.pickingOrder}
						creationDate={order.creationDate}
						client={order.client}
						purchaseOrder={order.purchaseOrder}
						selectedCard={selectedCard}
						setSelectedCard={setSelectedCard}
						moveLines={order.moveLines}
					/>
				))
			)}
			<Modal
				title={
					"Orden de surtido: " +
					stockPicking.find((picking) => picking.id === selectedCard)
						?.pickingOrder
				}
				open={showModal}
				onClose={() => setShowModal(false)}
				content="¿Desea atender la orden de surtido seleccionada?"
				buttons={[
					{
						onClick: () => setShowModal(false),
						text: "Cancelar",
					},
					{
						onClick: () => {
							startStockPicking();
							setShowModal(false);
						},
						text: "Atender",
					},
				]}
			/>
		</StockLayout>
	);
};
