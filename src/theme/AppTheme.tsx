import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { principalTheme } from "./PrincipalTheme"


export const AppTheme = ({children}: {children: React.ReactNode}) => {
  return (
    <ThemeProvider theme={principalTheme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
  )
}