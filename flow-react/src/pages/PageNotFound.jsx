import { Link } from "react-router"
import Visor from "../components/Visor"

const PageNotFound = () => {
  return (
    <section className="flex min-h-svh items-center justify-center bg-tinta px-5 py-32 text-giz">
      <div className="text-center">
        <Visor className="mx-auto w-fit px-10 py-8 text-flow-claro">
          <p className="font-display text-[clamp(4rem,14vw,9rem)] font-extrabold leading-none tracking-[-0.05em] text-giz blur-[3px]">404</p>
        </Visor>
        <h1 className="mt-8 text-3xl font-bold tracking-tight">Não deu para focar nesta página.</h1>
        <p className="mt-3 text-giz/60">O endereço não existe ou mudou de lugar.</p>
        <Link to="/" className="botao botao-flow mt-8 px-5 py-3 font-semibold text-white">
          Voltar para o início
        </Link>
      </div>
    </section>
  )
}

export default PageNotFound
