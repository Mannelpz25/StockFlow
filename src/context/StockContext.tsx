import React, { createContext, useContext, useEffect, useState } from "react";

import { getStockPicking } from "../api/jsonRPC";
import { useAuth } from "./AuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

export interface StockPicking {
	id: number;
	pickingOrder: string;
	creationDate: string;
	client: string;
	purchaseOrder: string;
	priority: number;
	moveLines: MoveLine[];
	notes: string;
}

export interface MoveLine {
	id: number;
	productId: number;
	productName: string;
	quantity: number;
    quantityDone: number;
	productBarcode: string;
}

// Definir el tipo de contexto para la autenticación
interface StockContextType {
	stockPicking: StockPicking[];
	setStockPicking: React.Dispatch<React.SetStateAction<StockPicking[]>>;
	activeStockPicking: StockPicking | undefined;
	setActiveStockPicking: (stockPicking: StockPicking | undefined) => void;
    activeScreen: string;
    setActiveScreen: (screen: string) => void;
}

// Crear el contexto stock picking
const StockContext = createContext<StockContextType | undefined>(undefined);

// Hook para acceder al contexto de stock picking
export function useStock() {
	const context = useContext(StockContext);
	if (!context) {
		throw new Error(
			"useStock debe ser utilizado dentro de un StockProvider"
		);
	}
	return context;
}

interface Props {
	children: React.ReactNode;
}
// Componente proveedor de stock picking
export const StockProvider: React.FC<Props> = ({ children }) => {
	const { user } = useAuth();
    const { getItem, setItem } = useLocalStorage();
	const [stockPicking, setStockPicking] = useState<StockPicking[]>([]);
	const [activeStockPicking, setActStockPicking] = useState<
		StockPicking | undefined
	>(undefined);

    const [activeScreen, setActiveScreen] = useState("stockPicking");

	useEffect(() => {
		if (!user) return;
        const activeStockPicking = getItem("activeStockPicking");
        if (activeStockPicking) {
            setActiveStockPicking(JSON.parse(activeStockPicking));
            setActiveScreen("stockPickingValidate");
        }

		const interval = setInterval(async () => {
			const result = await getStockPicking(user?.uid!, user?.password!);
			setStockPicking(result);
		}, 5000);

		return () => clearInterval(interval);
	}, [user]);


    const setActiveStockPicking = (stockPicking: StockPicking | undefined) => {
        setActStockPicking(stockPicking);
        if (stockPicking) {
            setItem("activeStockPicking", JSON.stringify(stockPicking));
            return
        } 
            setItem("activeStockPicking", "");
        
    }

	const contextValue: StockContextType = {
        setActiveScreen,
        activeScreen,
		stockPicking,
		setStockPicking,
		activeStockPicking,
		setActiveStockPicking,
	};

	return (
		<StockContext.Provider value={contextValue}>
			{children}
		</StockContext.Provider>
	);
};
