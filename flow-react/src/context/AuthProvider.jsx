import AuthContext from "./AuthContext"
import useLocalStorage from "../hooks/useLocalStorage"
import usuarios from "../data/usuarios"

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useLocalStorage("flow:usuario", null)

  const entrar = (email, senha) => {
    const encontrado = usuarios.find(
      (item) => item.email === email.trim().toLowerCase() && item.senha === senha
    )

    if (!encontrado) {
      return false
    }

    setUsuario({ id: encontrado.id, nome: encontrado.nome, curso: encontrado.curso })
    return true
  }

  const sair = () => {
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
