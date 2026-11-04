import { Navigate, Outlet } from "react-router"
import useAuth from "../hooks/useAuth"

const RotaPrivada = () => {
  const { usuario } = useAuth()

  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default RotaPrivada
