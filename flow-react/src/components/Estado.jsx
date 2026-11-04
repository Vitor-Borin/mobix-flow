import Visor from "./Visor"

const Estado = ({ tipo, mensagem }) => {
  if (tipo === "carregando") {
    return (
      <div role="status" className="flex items-center gap-4 py-16 text-cinza">
        <Visor className="size-10 animate-pulse text-flow-claro" />
        <span className="font-mono text-sm">{mensagem || "Focando..."}</span>
      </div>
    )
  }

  return (
    <p role={tipo === "erro" ? "alert" : "status"} className={`rounded-2xl border p-6 leading-7 ${tipo === "erro" ? "border-rec/40 text-rec" : "border-linha text-cinza"}`}>
      {mensagem}
    </p>
  )
}

export default Estado
