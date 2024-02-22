import { Route, Routes, Navigate } from "react-router-dom";
import { StockPickingPage } from "../pages/StockPickingPage";
import { useStock } from "../../context/StockContext";
import { StockPickingValidatePage } from "../pages/StockPickingValidatePage";
import { TagsAssignPage } from "../pages/TagsAssignPage";

export const StockRoutes = () => {
	const { activeStockPicking, activeScreen } = useStock();
	return (
		<Routes>
			{activeStockPicking && activeScreen === "stockPickingValidate" ? (
				<Route path="/" element={<StockPickingValidatePage />} />
			) : activeScreen === "stockPicking" ? (
				<Route path="/" element={<StockPickingPage />} />
			) : activeScreen === "tagsAssign" && (
        <Route path="/" element={<TagsAssignPage />} />
      )}

			<Route path="/*" element={<Navigate to="/" />} />
		</Routes>
	);
};
