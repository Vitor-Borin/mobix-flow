import { useEffect, useState } from "react"

// O menu some quando a página desce e volta quando sobe
const useMenuVisivel = () => {
  const [visivel, setVisivel] = useState(true)

  useEffect(() => {
    let ultimaPosicao = window.scrollY

    const aoRolar = () => {
      const posicao = window.scrollY
      const diferenca = posicao - ultimaPosicao

      if (Math.abs(diferenca) < 8) {
        return
      }

      setVisivel(posicao < 120 || diferenca < 0)
      ultimaPosicao = posicao
    }

    window.addEventListener("scroll", aoRolar, { passive: true })

    return () => {
      window.removeEventListener("scroll", aoRolar)
    }
  }, [])

  return visivel
}

export default useMenuVisivel
