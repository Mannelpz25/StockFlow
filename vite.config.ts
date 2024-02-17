import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugIn: Partial<VitePWAOptions> = {
	registerType: "prompt",
	includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
	manifest: {
		name: "StockFlow",
		short_name: "StockFlow",
		description: "App to manage your stocks",
		icons: [
			{
				src: "/android-chrome-192x192.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "favicon",
			},
			{
				src: "/android-chrome-512x512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "favicon",
			},
			{
				src: "/apple-touch-icon.png",
				sizes: "180x180",
				type: "image/png",
				purpose: "apple touch icon",
			},
			{
				src: "/maskable_icon.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "any maskable",
			},
		],
    lang: "es_MX",
		theme_color: "#171717",
		background_color: "#171717",
    display_override: ["window-controls-overlay"],
		display: "standalone",
		scope: "/",
		start_url: "/",
    id: "com.stockflow.app",
		orientation: "portrait",
	},
}

export default defineConfig({
	plugins: [react(), VitePWA(manifestForPlugIn)],
});
