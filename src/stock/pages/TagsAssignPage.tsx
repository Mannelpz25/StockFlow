import { useEffect, useState } from "react";
import { StockLayout } from "../layout/StockLayout";
import {
	Alert,
	Button,
	CircularProgress,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { getProducts } from "../../api/jsonRPC";
import { useAuth } from "../../context/AuthContext";
import { Modal } from "../components/Modal";
import { NfcRounded } from "@mui/icons-material";
import DropdownAlert from "../components/DropdownAlert";
let AbortSignal = new AbortController();

export const TagsAssignPage = () => {
	const { user } = useAuth();
	const [isLoading, setIsLoading] = useState(true);

	const [showModal, setShowModal] = useState(false);

	const [selectedProduct, setSelectedProduct] = useState<any>(null);

	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		const data = await getProducts(user?.uid!, user?.password!);
		setProducts(data);
		setIsLoading(false);
	};

	async function writeTag() {
        
		//@ts-ignore
		const writer = new NDEFReader();
        

		AbortSignal = new AbortController();
		try {
            await writer.scan({ signal: AbortSignal.signal }).then(() => {
                writer.onreading = () => {
                    writer.write(selectedProduct.id, { signal: AbortSignal.signal, overwrite: true })
                    .then(() => {
                        DropdownAlert.current.show({
                            message: "Etiqueta asignada",
                            type: "success",
                            title: "Etiqueta asignada correctamente",
                            delay: 1000,
                        });
                    })
                    .catch((error: any) => {
                        DropdownAlert.current.show({
                            message: error,
                            type: "error",
                            title: "Error al asignar etiqueta, intente de nuevo",
                        });
                    });
                }

            });

			
		} catch (error) {
			DropdownAlert.current.show({
                message: error,
                type: "error",
                title: "Error con el dispositivo NFC",
            });
		}
	}

	return (
		<StockLayout title="Asignar etiquetas">
			{isLoading ? (
				<Grid container justifyContent="center">
					<CircularProgress />
				</Grid>
			) : (
				<>
					{!selectedProduct && (
						<Alert
							severity="info"
							variant="filled"
							sx={{ width: "100%", marginBottom: 2 }}
						>
							Seleccione un producto para asignarle etiquetas
						</Alert>
					)}
					<Grid
						container
						spacing={0}
						direction="column"
						sx={{
							backgroundColor: "grey.100",
							borderRadius: 3,
							padding: 2,
                            marginBottom: 10
						}}
					>
						<Typography
							variant="h5"
							align="center"
							color="text.secondary"
						>
							Productos
						</Typography>

						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Nombre</TableCell>
									<TableCell>Código de barras</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{products.map((product: any) => (
									<TableRow
										key={product.id}
										onClick={() =>
											setSelectedProduct(product)
										}
										sx={[
											selectedProduct?.id ===
												product.id && {
												backgroundColor: "grey.300",
											},
										]}
									>
										<TableCell>{product.name}</TableCell>
										<TableCell>
											{product.barcode}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Grid>
					<Button
						variant="contained"
						color="primary"
						sx={{
							position: "fixed",
							bottom: 16,
							right: 16,
							width: 200,
							height: 50,
                            "&:disabled": {
                                backgroundColor: "grey.300",
                            }
						}}
                        disabled={!selectedProduct}
						onClick={() => {
							writeTag();
							setShowModal(true);
						}}
					>
						Asignar etiquetas
					</Button>
				</>
			)}
			<Modal
				title={"Asignar etiquetas"}
				open={showModal}
				onClose={() => {
					setShowModal(false);
					AbortSignal.abort();
					setSelectedProduct(null);
				}}
				icon={
					<NfcRounded sx={{ fontSize: 80, color: "primary.main" }} />
				}
				content={"Producto: " + selectedProduct?.name}
				placeholder={"Acerca el dispositivo al tag para asignar"}
				buttons={[
					{
						onClick: () => {
							setShowModal(false);
							AbortSignal.abort();
							setSelectedProduct(null);
						},
						text: "Finalizar",
					},
				]}
			/>
		</StockLayout>
	);
};
