import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const principalTheme = createTheme ({
    palette: {
        primary: {
            dark: '#1D3557',
            main: '#457B9D',
            light: '#A8DADC',
            
        },
        secondary: {
            main: '#E63946'
        },
        error: {
            main: red.A400
        },
    }
})