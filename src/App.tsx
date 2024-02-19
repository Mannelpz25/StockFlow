import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme/AppTheme";
import { AuthProvider } from './context/AuthContext';

export const App = () => {
	return (
		<AuthProvider>
			<AppTheme>
				<AppRouter />
			</AppTheme>
		</AuthProvider>
	);
};
