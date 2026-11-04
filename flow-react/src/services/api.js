const API_URL = import.meta.env.VITE_API_URL || "https://6aea801e3d3dd3d37be6ae89.mockapi.io/api/v1"

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
