import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme/AppTheme";
import { AuthProvider } from "./context/AuthContext";
import { StockProvider } from "./context/StockContext";

import DropdownAlert from "./stock/components/DropdownAlert";

export const App = () => {
	return (
		<AuthProvider>
			<StockProvider>
				<AppTheme>

					<DropdownAlert ref={(reference) => DropdownAlert.setReference(reference)} />
					<AppRouter />
				</AppTheme>

			</StockProvider>
		</AuthProvider>
	);
};
