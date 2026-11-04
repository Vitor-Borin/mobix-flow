import { useEffect, useState } from "react"

// Estado que sobrevive ao recarregar a página
const useLocalStorage = (chave, valorInicial) => {
  const [valor, setValor] = useState(() => {
    const salvo = localStorage.getItem(chave)
    return salvo ? JSON.parse(salvo) : valorInicial
  })

  useEffect(() => {
    if (valor === null) {
      localStorage.removeItem(chave)
    } else {
      localStorage.setItem(chave, JSON.stringify(valor))
    }
  }, [chave, valor])

  return [valor, setValor]
}

export default useLocalStorage
