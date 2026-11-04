import { useEffect } from "react"
import { useLocation } from "react-router"

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
