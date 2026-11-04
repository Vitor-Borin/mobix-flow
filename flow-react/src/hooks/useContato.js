import { useState } from "react"

const useContato = () => {
  const [status, setStatus] = useState({ tipo: "parado", mensagem: "" })
  const [enviando, setEnviando] = useState(false)

  const enviar = async (formulario) => {
    if (enviando) return

    const dados = Object.fromEntries(new FormData(formulario).entries())
    dados._subject = "Novo contato pelo site MOBIX / FLOW"

    setEnviando(true)
    setStatus({ tipo: "enviando", mensagem: "Enviando sua mensagem..." })

    try {
      const resposta = await fetch("https://formsubmit.co/ajax/mobix.fiap@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      })
      const resultado = await resposta.json()

      if (!resposta.ok || (resultado.success !== true && resultado.success !== "true")) {
        throw new Error(resultado.message || "O serviço não conseguiu enviar sua mensagem.")
      }

      formulario.reset()
      setStatus({ tipo: "enviado", mensagem: "Mensagem enviada. A equipe MOBIX responde pelo seu e-mail." })
    } catch (falha) {
      console.log(falha)
      setStatus({
        tipo: "erro",
        mensagem: "Não foi possível enviar agora. Tente de novo ou escreva para mobix.fiap@gmail.com.",
      })
    } finally {
      setEnviando(false)
    }
  }

  return { status, enviando, enviar }
}

export default useContato
