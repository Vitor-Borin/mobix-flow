import { useEffect, useState } from "react"
import { apagarCaptura, buscarCapturasDaMateria, buscarMateria, criarCaptura } from "../services/api"

// Capturas de uma matéria: carregar, adicionar e apagar
const useCapturas = (materiaId) => {
  const [materia, setMateria] = useState(null)
  const [capturas, setCapturas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(false)
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    let ignorar = false

    const carregar = async () => {
      setCarregando(true)
      setErro(false)

      try {
        const dadosMateria = await buscarMateria(materiaId)
        const lista = await buscarCapturasDaMateria(materiaId)

        if (!ignorar) {
          setMateria(dadosMateria)
          setCapturas(lista)
          setCarregando(false)
        }
      } catch (falha) {
        console.log(falha)
        if (!ignorar) {
          setErro(true)
          setCarregando(false)
        }
      }
    }

    carregar()

    return () => {
      ignorar = true
    }
  }, [materiaId])

  const adicionarCaptura = async (dados) => {
    setSalvando(true)

    try {
      const nova = await criarCaptura({
        materiaId: materiaId,
        titulo: dados.titulo,
        tipo: dados.tipo,
        texto: dados.texto,
        data: new Date().toISOString(),
        // Estimativa simulada da melhora de nitidez entre 40% e 80%
        nitidez: Math.round(40 + Math.random() * 40),
      })
      setCapturas(capturas.concat(nova))
      setSalvando(false)
      return true
    } catch (falha) {
      console.log(falha)
      setSalvando(false)
      return false
    }
  }

  const removerCaptura = async (id) => {
    try {
      await apagarCaptura(id)
      setCapturas(capturas.filter((captura) => captura.id !== id))
      return true
    } catch (falha) {
      console.log(falha)
      return false
    }
  }

  return { materia, capturas, carregando, erro, salvando, adicionarCaptura, removerCaptura }
}

export default useCapturas
