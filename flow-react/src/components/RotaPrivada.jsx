import { Navigate, Outlet } from "react-router"
import useAuth from "../hooks/useAuth"

// Só deixa passar quem entrou; quem não entrou vai para o login
const RotaPrivada = () => {
  const { usuario } = useAuth()

  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default RotaPrivada
