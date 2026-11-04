// MockAPI com dois recursos: materias e capturas (cada captura tem o materiaId)
const API_URL = import.meta.env.VITE_API_URL

const pedir = async (caminho, opcoes) => {
  const resposta = await fetch(`${API_URL}${caminho}`, opcoes)

  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status}`)
  }

  return resposta.json()
}

export const buscarMaterias = () => pedir("/materias")

export const buscarMateria = (id) => pedir(`/materias/${id}`)

export const buscarCapturas = () => pedir("/capturas")

// A MockAPI responde 404 quando o filtro não encontra nada: nesse caso a matéria só está vazia
export const buscarCapturasDaMateria = async (materiaId) => {
  const resposta = await fetch(`${API_URL}/capturas?materiaId=${materiaId}`)

  if (resposta.status === 404) {
    return []
  }

  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status}`)
  }

  return resposta.json()
}

export const criarCaptura = (captura) =>
  pedir("/capturas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(captura),
  })

export const apagarCaptura = (id) => pedir(`/capturas/${id}`, { method: "DELETE" })
