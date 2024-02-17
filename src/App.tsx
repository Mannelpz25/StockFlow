import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme/AppTheme";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";
import { useUser } from "./hooks/useUser";
import { useLocalStorage } from "./hooks/useLocalStorage";

export const App = () => {
	const { user } = useAuth();

  const { addUser } = useUser();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem("user");
    console.log(user, "user");
    if (user) {
      addUser(JSON.parse(user));
    }
  }, []);
	return (
		<AuthContext.Provider value={{ user, setUser: () => {} }}>
			<AppTheme>
				<AppRouter />
			</AppTheme>
		</AuthContext.Provider>
	);
};
