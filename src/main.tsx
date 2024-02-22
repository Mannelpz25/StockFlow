// import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "./styles.css";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
);
