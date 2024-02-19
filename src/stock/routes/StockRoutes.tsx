import { Route, Routes, Navigate } from "react-router-dom"
import { HomePage } from "../pages/HomePage"

export const StockRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/*" element={<Navigate to="/"/>} />
    </Routes>
  )
}