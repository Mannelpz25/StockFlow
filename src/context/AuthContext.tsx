import React, { createContext, useContext, useEffect, useState } from "react";

import { login as loginApi } from "../api/jsonRPC";
import { useLocalStorage } from "../hooks/useLocalStorage";
import moment from "moment";

// Definir el tipo de usuario
export interface User {
	uid: string;
	name: string;
	email: string;
	employeeId: number;
	lastLogin: moment.Moment;
}

interface LoginResponse {
	success: boolean;
}

interface LoginResponseSuccess extends LoginResponse {
	uid: string;
	employeeId: number;
	name: string;
}

interface LoginResponseError extends LoginResponse {
	errorMessage: string;
}

// Definir el tipo de contexto para la autenticación
interface AuthContextType {
	errorMessage: string;
	user: User | null;
	login: (email: string, password: string) => void;
	logout: () => void;
	isAuthenticated: () => boolean;
}

// Crear el contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook para acceder al contexto de autenticación
export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error(
			"useAuth debe ser utilizado dentro de un AuthProvider"
		);
	}
	return context;
}

interface Props {
	children: React.ReactNode;
}
// Componente proveedor de autenticación
export const AuthProvider: React.FC<Props> = ({ children }) => {
	const [errorMessage, setErrorMessage] = useState("");

	const [user, setUser] = useState<User | null>(null);

	const { getItem, setItem } = useLocalStorage();

	useEffect(() => {
		const localUser = getItem("user");
		if (!localUser) return;

		const lastLogin = moment(JSON.parse(localUser).lastLogin);
		const now = moment();
		if (now.diff(lastLogin, "days") > 1) {
			setItem("user", "");
			return;
		}
		setUser(JSON.parse(localUser));
	}, []);

	// Función para iniciar sesión
	const login = async (email: string, password: string) => {
		const response = await loginApi(email, password);
		if (!response.success) {
			const { errorMessage } = response as LoginResponseError;
			setErrorMessage(errorMessage);
			return;
		}
		const { uid, employeeId, name } = response as LoginResponseSuccess;
		const user: User = {
			uid,
			employeeId,
			name,
			email: email,
			lastLogin: moment(),
		};
		setErrorMessage("");
		setUser(user);
		setItem("user", JSON.stringify(user));
	};

	// Función para cerrar sesión
	const logout = () => {
		setUser(null);
		setItem("user", "");
	};

	// Función para verificar si el usuario está autenticado
	const isAuthenticated = () => {
		return !!user?.uid;
	};

	// Valor proporcionado por el contexto
	const contextValue: AuthContextType = {
		errorMessage,
		user,
		login,
		logout,
		isAuthenticated,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	);
};
