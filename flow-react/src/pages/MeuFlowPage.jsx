import { useRef, useState } from "react"
import { Link } from "react-router"
import { PiArrowUpRight, PiMagnifyingGlass, PiSignOut } from "react-icons/pi"
import { gsap, useGSAP } from "../gsap"
import Estado from "../components/Estado"
import useAuth from "../hooks/useAuth"
import useMaterias from "../hooks/useMaterias"
import { dicasDeEstudo } from "../data/conteudo"

const formatarData = (data) => new Date(data).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })

const MeuFlowPage = () => {
  const { usuario, sair } = useAuth()
  const { materias, capturas, carregando, erro } = useMaterias()
  const [termo, setTermo] = useState("")
  const [dica] = useState(() => dicasDeEstudo[Math.floor(Math.random() * dicasDeEstudo.length)])
  const paginaRef = useRef(null)
  const buscaRef = useRef(null)

  useGSAP(
    () => {
      if (carregando) return
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".materia-cartao", { y: 30, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.06 })
      })
    },
    { dependencies: [carregando], scope: paginaRef }
  )

  const buscar = (evento) => {
    evento.preventDefault()
    setTermo(buscaRef.current.value.trim().toLowerCase())
  }

  const totalCapturas = capturas.length
  const mediaPorMateria = materias.length > 0 ? Math.round((totalCapturas / materias.length) * 10) / 10 : 0
  const maisCapturada = materias.length > 0
    ? materias.reduce((maior, materia) => (materia.total > maior.total ? materia : maior), materias[0])
    : null

  const resultados = termo
    ? capturas.filter((captura) => (captura.titulo + " " + captura.texto).toLowerCase().includes(termo))
    : []

  const nomeDaMateria = (id) => {
    const encontrada = materias.find((materia) => materia.id === id)
    return encontrada ? encontrada.nome : ""
  }

  return (
    <section ref={paginaRef} className="min-h-svh bg-tinta px-5 pb-28 pt-32 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase text-flow-claro">Meu FLOW · {usuario.curso}</p>
            <h1 className="mt-4 text-[clamp(2.6rem,6vw,4.8rem)] font-extrabold leading-[0.92] tracking-[-0.035em]">
              Oi, {usuario.nome}.
            </h1>
          </div>
          <button type="button" onClick={sair} className="botao botao-linha px-4 py-2.5 text-sm">
            <PiSignOut aria-hidden="true" />
            Sair
          </button>
        </div>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-xl border border-linha bg-linha sm:grid-cols-3">
          <div className="bg-grafite p-6">
            <dt className="text-sm text-cinza">Capturas</dt>
            <dd className="mt-2 font-mono text-4xl font-semibold">{carregando ? "..." : totalCapturas}</dd>
          </div>
          <div className="bg-grafite p-6">
            <dt className="text-sm text-cinza">Média por matéria</dt>
            <dd className="mt-2 font-mono text-4xl font-semibold">{carregando ? "..." : mediaPorMateria.toLocaleString("pt-BR")}</dd>
          </div>
          <div className="bg-grafite p-6">
            <dt className="text-sm text-cinza">Matéria com mais capturas</dt>
            <dd className="mt-2 text-2xl font-semibold leading-tight">{maisCapturada ? maisCapturada.nome : "..."}</dd>
          </div>
        </dl>

        <p className="mt-6 rounded-2xl border border-flow/40 p-5 leading-7 text-giz/80">
          <span className="font-mono text-xs uppercase text-flow-claro">Dica do dia</span>
          <br />
          {dica}
        </p>

        <form onSubmit={buscar} role="search" className="mt-14 flex gap-2">
          <label htmlFor="busca" className="sr-only">Buscar no texto das capturas</label>
          <input id="busca" ref={buscaRef} type="search" placeholder="Buscar no texto das capturas, ex.: grid" className="campo" />
          <button type="submit" className="botao botao-flow shrink-0 items-center gap-2 px-5 font-semibold text-white">
            <PiMagnifyingGlass aria-hidden="true" />
            <span className="hidden sm:inline">Buscar</span>
          </button>
        </form>

        {termo && (
          <div className="mt-6" aria-live="polite">
            <p className="text-sm text-cinza">
              {resultados.length} {resultados.length === 1 ? "captura encontrada" : "capturas encontradas"} para "{termo}"
            </p>
            <ul className="mt-4 grid gap-3">
              {resultados.map((captura) => (
                <li key={captura.id}>
                  <Link to={`/meu-flow/materia/${captura.materiaId}`} className="flex items-center justify-between gap-4 rounded-2xl border border-linha bg-grafite p-4 hover:border-flow-claro">
                    <span>
                      <span className="block font-semibold">{captura.titulo}</span>
                      <span className="text-sm text-cinza">{nomeDaMateria(captura.materiaId)} · {formatarData(captura.data)}</span>
                    </span>
                    <PiArrowUpRight aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <h2 className="mt-16 text-3xl font-bold tracking-tight">Matérias</h2>

        {carregando && <Estado tipo="carregando" mensagem="Buscando suas matérias..." />}
        {erro && <Estado tipo="erro" mensagem="Não deu para carregar as matérias agora. Confira sua conexão e recarregue a página." />}
        {!carregando && !erro && materias.length === 0 && <Estado tipo="vazio" mensagem="Nenhuma matéria cadastrada ainda." />}

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {materias.map((materia) => (
            <li key={materia.id} className="materia-cartao">
              <Link
                to={`/meu-flow/materia/${materia.id}`}
                className="group flex h-full flex-col justify-between gap-10 rounded-xl border border-linha bg-grafite p-6 transition-colors hover:border-giz/40"
              >
                <span className="flex items-center justify-between">
                  <span aria-hidden="true" className="h-2 w-10 rounded-full" style={{ backgroundColor: materia.cor }} />
                  <PiArrowUpRight aria-hidden="true" className="text-cinza transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-giz" />
                </span>
                <span>
                  <span className="block text-2xl font-semibold leading-tight tracking-tight">{materia.nome}</span>
                  <span className="mt-2 block text-sm text-cinza">{materia.professor}</span>
                  <span className="mt-6 block font-mono text-sm">
                    {materia.total} {materia.total === 1 ? "captura" : "capturas"}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default MeuFlowPage
