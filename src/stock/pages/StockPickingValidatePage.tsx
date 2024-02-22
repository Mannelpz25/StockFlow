import {
	Alert,
	Button,
	Divider,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { MoveLine, useStock } from "../../context/StockContext";
import { StockLayout } from "../layout/StockLayout";
import moment from "moment";
import { useEffect, useState } from "react";
import { NfcRounded } from "@mui/icons-material";

import useSound from "use-sound";
import beep from "../../assets/beep.mp3";
import DropdownAlert from "../components/DropdownAlert";
import { setStockPickingDone } from "../../api/jsonRPC";
import { useAuth } from "../../context/AuthContext";

let AbortSignal = new AbortController();

export const StockPickingValidatePage = () => {
	const { user } = useAuth();
	const { activeStockPicking, setActiveStockPicking, setActiveScreen } = useStock();
	const [moveLines, setMoveLines] = useState<MoveLine[]>(
		activeStockPicking?.moveLines!!
	);

	const [nfcSupported, setNfcSupported] = useState(true);
	const [stockPickingValidated, setStockPickingValidated] = useState(false);
	// const [nfcPermission, setNfcPermission] = useState(false);
	const [nfcReading, setNfcReading] = useState(false);
	const [play] = useSound(beep, {
		volume: 1,
		interrupt: true,
		playbackRate: 1,
	});

	useEffect(() => {
		if (moveLines.every((line) => line.quantity === line.quantityDone)) {
			setStockPickingValidated(true);
			AbortSignal.abort();
		}
	}, [moveLines]);

	const scanNFC = () => {
		if (window.NDEFReader) {
			setNfcSupported(true);
			navigator.permissions //@ts-ignore
				.query({ name: "nfc" })
				.then((nfcStatus) => {
					if (nfcStatus.state === "granted") {
						// setNfcPermission(true);
						startScan();
					} else {
						// setNfcPermission(false);
					}
				})
				.catch((error) => {
					alert(`Error! ${error}`);
				});
		} else {
			setNfcSupported(false);
		}
	};

	const startScan = () => {
		//@ts-ignore
		let reader = new NDEFReader();
		AbortSignal = new AbortController();

		reader
			.scan({ signal: AbortSignal.signal })
			.then(() => {
				setNfcReading(true);
				reader.onreadingerror = () => {
					alert(
						"Cannot read data from the NFC tag. Try another one?"
					);
				};
				reader.onreading = (event: any) => {
					play();
					const decoder = new TextDecoder();
					let data = "";
					for (const record of event.message.records) {
						data += decoder.decode(record.data);
					}
					const productScanned = moveLines.find(
						(line) => line.productId.toString() === data
					);
					if (!productScanned) {
						DropdownAlert.current.show({
							message: `El producto escaneado no existe en la orden de surtido`,
							type: "error",
							title: "Producto no encontrado",
						});
						return;
					}

					if (
						productScanned?.quantityDone ===
						productScanned?.quantity
					) {
						DropdownAlert.current.show({
							message: `Producto: ${productScanned?.productName} completamente surtido`,
							type: "success",
							title: "Producto surtido",
						});
						return;
					}

					if (productScanned) {
						productScanned.quantityDone += 1;
						setMoveLines([...moveLines]);
						setActiveStockPicking({
							...activeStockPicking!!,
							moveLines: moveLines,
						});
						return;
					}
				};
			})
			.catch((error: any) => {
				setNfcReading(false);
				alert(`Error! Scan failed to start: ${error}.`);
			});

		reader.removeEventListener("reading", () => {
			setNfcReading(false);
		});
	};

	const stopScan = () => {
		AbortSignal.abort();
		setNfcReading(false);
	};

	

	useEffect(() => {
		scanNFC();
	}, []);

	return (
		<StockLayout title={activeStockPicking?.pickingOrder!!}>
			{!nfcSupported && (
				<Alert
					severity="error"
					variant="filled"
					sx={{ width: "100%", marginBottom: 2 }}
				>
					El dispositivo no soporta NFC
				</Alert>
			)}
			{nfcReading && !stockPickingValidated && (
				<Alert
					severity="info"
					variant="filled"
					sx={{ width: "100%", marginBottom: 2 }}
					onClose={() => {
						stopScan();
					}}
				>
					Acerca el dispositivo al tag para escanear
				</Alert>
			)}
			{stockPickingValidated && (
				<Alert
					severity="success"
					variant="filled"
					sx={{ width: "100%", marginBottom: 2 }}
				>
					Orden de surtido completada
				</Alert>
			)}
			<Grid
				container
				spacing={0}
				direction="column"
				sx={{
					backgroundColor: "grey.200",
					borderRadius: 3,
				}}
			>
				<Grid
					container
					direction={"row"}
					justifyContent={"space-between"}
					alignItems={"center"}
					sx={{ padding: 2 }}
				>
					<Typography
						variant="h6"
						align="left"
						color="text.secondary"
						sx={{ width: "100%" }}
					>
						Cliente: {activeStockPicking?.client}
					</Typography>
					<Typography
						variant="subtitle1"
						align="center"
						color="text.secondary"
					>
						Orden de compra: {activeStockPicking?.purchaseOrder}
					</Typography>
					<Typography
						variant="subtitle2"
						align="right"
						color="text.secondary"
					>
						{moment(activeStockPicking?.creationDate).format(
							"DD/MM/YYYY HH:mm"
						)}
					</Typography>
				</Grid>
				<Divider />
				<TableContainer sx={{ width: "100%" }}>
					<Table sx={{ backgroundColor: "grey.200" }}>
						<TableHead>
							<TableRow>
								<TableCell sx={{ width: "60%" }}>
									Producto
								</TableCell>
								<TableCell align="center">Cantidad</TableCell>
								<TableCell align="center">
									Cantidad surtida
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{moveLines.map((row) => (
								<TableRow
									key={row.id}
									sx={[
										{
											"&:last-child td, &:last-child th":
												{
													border: 0,
												},
										},
										row.quantityDone === row.quantity && {
											backgroundColor: "success.main",
										},
									]}
								>
									<TableCell
										component="th"
										scope="row"
										sx={
											row.quantityDone === row.quantity
												? {
														color: "white",
												  }
												: {}
										}
									>
										{row.productName}
									</TableCell>
									<TableCell
										align="center"
										sx={
											row.quantityDone === row.quantity
												? {
														color: "white",
												  }
												: {}
										}
									>
										{row.quantity}
									</TableCell>
									<TableCell
										align="center"
										sx={
											row.quantityDone === row.quantity
												? {
														color: "white",
												  }
												: {}
										}
									>
										{row.quantityDone}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
			{nfcSupported && !stockPickingValidated && (
				<Button
					variant="contained"
					color="primary"
					sx={{ width: "100%", marginTop: 2 }}
					disabled={!nfcSupported || nfcReading}
					onClick={startScan}
				>
					Comenzar a escanear
				</Button>
			)}
			{nfcReading && !stockPickingValidated && (
				<Grid
					container
					direction="column"
					justifyContent="center"
					alignItems="center"
					sx={{ marginTop: 2 }}
				>
					<NfcRounded
						sx={{ fontSize: 100, color: "primary.main" }}
					/>
					<Typography variant="h6" align="center">
						Escaneando ...
					</Typography>
				</Grid>
			)}
			{stockPickingValidated && (
				<Button
					variant="contained"
					color="primary"
					sx={{ width: "100%", marginTop: 2 }}
					disabled={!stockPickingValidated}
					onClick={async () => {
						if (!user) return;
						await setStockPickingDone(
							user.uid,
							user.password!,
							activeStockPicking?.id as number
						);
						setActiveStockPicking(undefined);
						setActiveScreen("stockPicking");
						DropdownAlert.current.show({
							message: `Se ha completado la orden de surtido`,
							type: "success",
							title: "Orden de surtido completada",
						});
					}}
				>
					Completar orden de surtido
				</Button>
			)}
		</StockLayout>
	);
};
