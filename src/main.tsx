import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { App } from "./App";
import "./styles.css";
import { LoginPage } from "./auth/pages";

const root = document.getElementById("root") as HTMLElement;

const router = createHashRouter([
	{
	  path: "/",
	  element: <App />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	}
  ]);

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
