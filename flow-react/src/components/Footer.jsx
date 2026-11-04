import { Link } from "react-router"
import Logo from "./Logo"
import { navegacao } from "../data/conteudo"

const Footer = () => {
  return (
    <footer className="border-t border-linha bg-tinta px-5 pb-8 pt-14 sm:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo tamanho="text-3xl" />
          <p className="mt-4 max-w-xs text-sm leading-6 text-cinza">
            Proposta do grupo MOBIX para o Challenge FIAP 2026 com a JOVI.
          </p>
        </div>

        <ul className="grid gap-2 text-sm">
          {navegacao.map((item) => (
            <li key={item.href}>
              <Link to={item.href} className="text-giz/80 transition-colors hover:text-giz">
                {item.nome}
              </Link>
            </li>
          ))}
        </ul>

        <div className="text-sm text-cinza">
          <p>FIAP · Engenharia de Software</p>
          <p className="mt-1">Front-End Design + Web Development</p>
          <a href="mailto:mobix.fiap@gmail.com" className="mt-4 inline-block text-giz/80 underline decoration-linha underline-offset-4 hover:text-giz">
            mobix.fiap@gmail.com
          </a>
        </div>
      </div>

      <p className="mx-auto mt-14 max-w-7xl font-mono text-[0.7rem] text-cinza">
        Projeto acadêmico. As telas do app são protótipos.
      </p>
    </footer>
  )
}

export default Footer
