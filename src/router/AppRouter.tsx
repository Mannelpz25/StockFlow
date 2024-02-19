import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRotes";
import { StockRoutes } from "../stock/routes/StockRoutes";
import { useAuth } from "../context/AuthContext";
export const AppRouter = () => {
	const { isAuthenticated } = useAuth();
	return (
		<Routes>
			{isAuthenticated() ? (
				<Route path="/*" element={<StockRoutes />} />
			) : (
				<Route path="/login/*" element={<AuthRoutes />} />
			)}
			<Route path="/*" element={<Navigate to="/login" />} />
		</Routes>
	);
};
