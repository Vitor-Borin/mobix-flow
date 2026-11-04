import { useRef, useState } from "react"
import { Link, useParams } from "react-router"
import { PiArrowLeft } from "react-icons/pi"
import { gsap, useGSAP } from "../gsap"
import CapturaCard from "../components/CapturaCard"
import Estado from "../components/Estado"
import useCapturas from "../hooks/useCapturas"
import useLocalStorage from "../hooks/useLocalStorage"

const MateriaPage = () => {
  const { id } = useParams()
  const { materia, capturas, carregando, erro, salvando, adicionarCaptura, removerCaptura } = useCapturas(id)
  const [fixadas, setFixadas] = useLocalStorage("flow:fixadas", [])
  const [aviso, setAviso] = useState("")
  const paginaRef = useRef(null)
  const formularioRef = useRef(null)
  const tituloRef = useRef(null)
  const tipoRef = useRef(null)
  const textoRef = useRef(null)

  useGSAP(
    () => {
      if (carregando) return
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".captura-cartao", { y: 30, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.06 })
      })
    },
    { dependencies: [carregando], scope: paginaRef }
  )

  const alternarFixada = (capturaId) => {
    if (fixadas.includes(capturaId)) {
      setFixadas(fixadas.filter((item) => item !== capturaId))
    } else {
      setFixadas(fixadas.concat(capturaId))
    }
  }

  const apagar = async (capturaId) => {
    const deuCerto = await removerCaptura(capturaId)
    setAviso(deuCerto ? "Captura apagada." : "Não deu para apagar agora. Tente de novo.")
  }

  const salvar = async (evento) => {
    evento.preventDefault()

    const deuCerto = await adicionarCaptura({
      titulo: tituloRef.current.value.trim(),
      tipo: tipoRef.current.value,
      texto: textoRef.current.value.trim(),
    })

    if (deuCerto) {
      formularioRef.current.reset()
      setAviso("Captura salva nesta matéria.")
    } else {
      setAviso("Não deu para salvar agora. Confira sua conexão e tente de novo.")
    }
  }

  // Fixadas primeiro, depois as mais recentes
  const ordenadas = capturas.slice().sort((a, b) => {
    const fixadaA = fixadas.includes(a.id) ? 1 : 0
    const fixadaB = fixadas.includes(b.id) ? 1 : 0
    if (fixadaA !== fixadaB) return fixadaB - fixadaA
    return new Date(b.data) - new Date(a.data)
  })

  return (
    <section ref={paginaRef} className="min-h-svh bg-tinta px-5 pb-28 pt-32 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <Link to="/meu-flow" className="inline-flex items-center gap-2 text-sm text-cinza hover:text-giz">
          <PiArrowLeft aria-hidden="true" />
          Minhas matérias
        </Link>

        {carregando && <Estado tipo="carregando" mensagem="Abrindo a pasta da matéria..." />}
        {erro && (
          <div className="mt-8">
            <Estado tipo="erro" mensagem="Não deu para abrir esta matéria. Ela pode ter sido removida, ou a conexão caiu." />
          </div>
        )}

        {materia && (
          <>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span aria-hidden="true" className="block h-2 w-12 rounded-full" style={{ backgroundColor: materia.cor }} />
                <h1 className="mt-5 text-[clamp(2.4rem,5.4vw,4.4rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">{materia.nome}</h1>
                <p className="mt-3 text-cinza">{materia.professor}</p>
              </div>
              <p className="font-mono text-sm text-cinza">
                {capturas.length} {capturas.length === 1 ? "captura" : "capturas"} · {fixadas.filter((item) => capturas.some((captura) => captura.id === item)).length} fixadas
              </p>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_22rem]">
              <div>
                {capturas.length === 0 && <Estado tipo="vazio" mensagem="Nenhuma captura nesta matéria ainda. Adicione a primeira no formulário." />}
                <ul className="grid gap-4 md:grid-cols-2">
                  {ordenadas.map((captura) => (
                    <li key={captura.id}>
                      <CapturaCard
                        captura={captura}
                        fixada={fixadas.includes(captura.id)}
                        aoFixar={alternarFixada}
                        aoApagar={apagar}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <form ref={formularioRef} onSubmit={salvar} className="grid h-fit gap-4 rounded-xl border border-linha bg-grafite p-6 lg:sticky lg:top-28">
                <h2 className="text-xl font-semibold tracking-tight">Nova captura</h2>
                <label className="grid gap-2 text-sm font-medium">
                  Título
                  <input ref={tituloRef} required maxLength={80} placeholder="Ex.: Aula 12, limites" className="campo" />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Tipo
                  <select ref={tipoRef} className="campo" defaultValue="lousa">
                    <option value="lousa">Lousa</option>
                    <option value="slide">Slide</option>
                    <option value="livro">Livro</option>
                    <option value="caderno">Caderno</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Texto reconhecido
                  <textarea ref={textoRef} required rows={5} maxLength={1200} placeholder="Cole aqui o texto lido da foto" className="campo resize-y" />
                </label>
                <button type="submit" disabled={salvando} className="botao botao-flow min-h-12 px-5 py-3 font-semibold text-white disabled:cursor-wait disabled:opacity-60">
                  {salvando ? "Salvando..." : "Salvar captura"}
                </button>
                <p aria-live="polite" className="min-h-5 text-sm text-flow-claro">{aviso}</p>
              </form>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default MateriaPage
