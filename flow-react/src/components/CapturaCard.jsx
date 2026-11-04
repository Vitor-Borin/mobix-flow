import { PiPushPin, PiPushPinFill, PiTrash } from "react-icons/pi"

const nomesDosTipos = { lousa: "Lousa", slide: "Slide", livro: "Livro", caderno: "Caderno" }

const CapturaCard = ({ captura, fixada, aoFixar, aoApagar }) => {
  const data = new Date(captura.data).toLocaleDateString("pt-BR", { day: "2-digit", month: "long" })

  return (
    <article className={`captura-cartao flex h-full flex-col rounded-xl border bg-grafite p-6 ${fixada ? "border-flow" : "border-linha"}`}>
      <div className="flex items-center justify-between gap-3 font-mono text-xs text-cinza">
        <span className="rounded-md border border-linha px-2 py-1 uppercase">{nomesDosTipos[captura.tipo] || captura.tipo}</span>
        <span>{data}</span>
      </div>

      <h3 className="mt-5 text-xl font-semibold leading-snug tracking-tight">{captura.titulo}</h3>
      <p className="mt-3 flex-1 whitespace-pre-line rounded-xl bg-tinta p-4 font-mono text-[0.78rem] leading-6 text-giz/80">{captura.texto}</p>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-flow-claro">+{captura.nitidez}% de nitidez</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => aoFixar(captura.id)}
            aria-pressed={fixada}
            aria-label={fixada ? "Desafixar captura" : "Fixar captura no topo"}
            className="botao-icone grid size-10 place-items-center text-lg"
          >
            {fixada ? <PiPushPinFill className="text-flow-claro" /> : <PiPushPin />}
          </button>
          <button
            type="button"
            onClick={() => aoApagar(captura.id)}
            aria-label="Apagar captura"
            className="botao-icone grid size-10 place-items-center text-lg hover:text-rec"
          >
            <PiTrash />
          </button>
        </div>
      </div>
    </article>
  )
}

export default CapturaCard
