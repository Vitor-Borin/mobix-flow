import { useState } from "react"
import { PiArrowUpRight } from "react-icons/pi"
import TituloSecao from "../TituloSecao"

// Formulário da Sprint 3, mantido: envia pelo FormSubmit para o e-mail da equipe
const Contato = () => {
  const [status, setStatus] = useState({ tipo: "parado", mensagem: "" })
  const [enviando, setEnviando] = useState(false)

  const enviar = async (evento) => {
    evento.preventDefault()

    if (enviando) return

    const formulario = evento.currentTarget
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

  const coresStatus = {
    parado: "",
    enviando: "text-cinza",
    enviado: "text-flow-claro",
    erro: "text-rec",
  }

  return (
    <section id="contato" className="bg-tinta px-5 py-28 sm:px-10" aria-labelledby="titulo-contato">
      <div className="mx-auto max-w-7xl">
        <TituloSecao id="titulo-contato" nome="Contato" frase="Quer saber mais do FLOW? Fale com o grupo." />
      </div>
      <div className="mx-auto mt-14 grid max-w-7xl gap-14 lg:grid-cols-2 lg:gap-24">
        <div>
          <p className="max-w-md text-lg leading-8 text-giz/70">
            Mande uma mensagem para o grupo. Dúvida sobre a proposta, sugestão ou interesse em testar o protótipo.
          </p>
          <a href="mailto:mobix.fiap@gmail.com" className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-giz underline decoration-linha underline-offset-4 hover:decoration-giz">
            mobix.fiap@gmail.com
            <PiArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <form onSubmit={enviar} className="grid gap-5 rounded-xl border border-linha bg-grafite p-6 sm:p-10">
          <label className="grid gap-2 text-sm font-medium">
            Nome
            <input name="name" required maxLength={100} autoComplete="name" placeholder="Como podemos te chamar" className="campo" />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            E-mail
            <input name="email" type="email" required maxLength={254} autoComplete="email" placeholder="voce@exemplo.com" className="campo" />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Mensagem
            <textarea name="message" required maxLength={3000} rows={5} placeholder="Escreva aqui" className="campo min-h-32 resize-y" />
          </label>

          <label aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
            Não preencha este campo
            <input name="_honey" tabIndex={-1} autoComplete="off" />
          </label>

          <button
            type="submit"
            disabled={enviando}
            className="botao botao-flow mt-2 min-h-12 px-5 py-3 disabled:cursor-wait disabled:opacity-60"
          >
            {enviando ? "Enviando..." : "Enviar mensagem"}
          </button>

          <p aria-live="polite" role={status.tipo === "erro" ? "alert" : "status"} className={`min-h-5 text-sm ${coresStatus[status.tipo]}`}>
            {status.mensagem}
          </p>
        </form>
      </div>
    </section>
  )
}

export default Contato
