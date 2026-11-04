import { useEffect } from "react"
import { useLocation } from "react-router"

// Ao trocar de rota, volta para o topo; com âncora (/#galeria), vai até a seção
const RolarAoTrocarDePagina = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const alvo = document.querySelector(hash)
      if (alvo) {
        alvo.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default RolarAoTrocarDePagina
