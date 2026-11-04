import { useEffect, useState } from "react"
import { buscarCapturas, buscarMaterias } from "../services/api"

const useMaterias = () => {
  const [materias, setMaterias] = useState([])
  const [capturas, setCapturas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(false)

  useEffect(() => {
    let ignorar = false

    const carregar = async () => {
      try {
        const listaMaterias = await buscarMaterias()
        const listaCapturas = await buscarCapturas()

        if (!ignorar) {
          setMaterias(listaMaterias)
          setCapturas(listaCapturas)
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
  }, [])

  const materiasComTotal = materias.map((materia) => {
    const total = capturas.filter((captura) => captura.materiaId === materia.id).length
    return { id: materia.id, nome: materia.nome, professor: materia.professor, cor: materia.cor, total: total }
  })

  return { materias: materiasComTotal, capturas, carregando, erro }
}

export default useMaterias
