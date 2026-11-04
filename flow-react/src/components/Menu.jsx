import { useRef, useState } from "react"
import { Link } from "react-router"
import { PiArrowUpRight, PiList, PiX } from "react-icons/pi"
import { gsap, useGSAP } from "../gsap"
import Logo from "./Logo"
import useAuth from "../hooks/useAuth"
import useMenuVisivel from "../hooks/useMenuVisivel"
import { navegacao } from "../data/conteudo"

// Menu em retângulo flutuante: some ao descer, volta ao subir e abre expandindo o próprio retângulo
const Menu = () => {
  const { usuario } = useAuth()
  const visivel = useMenuVisivel()
  const [aberto, setAberto] = useState(false)
  const menuRef = useRef(null)
  const painelRef = useRef(null)

  useGSAP(
    () => {
      if (aberto) {
        gsap.timeline()
          .to(painelRef.current, { height: "auto", duration: 0.55, ease: "power3.inOut" })
          .fromTo(".item-painel", { yPercent: 110 }, { yPercent: 0, duration: 0.5, stagger: 0.05, ease: "power3.out" }, "-=0.3")
      } else if (painelRef.current.offsetHeight > 0) {
        gsap.to(painelRef.current, { height: 0, duration: 0.4, ease: "power3.inOut" })
      }
    },
    { dependencies: [aberto], scope: menuRef }
  )

  const fechar = () => setAberto(false)
  const escondido = !visivel && !aberto

  return (
    <header
      ref={menuRef}
      className={`fixed inset-x-3 top-3 z-50 mx-auto max-w-[56rem] transition-transform duration-500 ease-[var(--ease-obturador)] sm:inset-x-6 sm:top-5 ${
        escondido ? "-translate-y-[140%]" : "translate-y-0"
      }`}
    >
      <nav aria-label="Principal" className="rounded-xl border border-white/10 bg-tinta px-2 py-2 shadow-[0_18px_40px_-20px_rgb(0_0_0/0.7)]">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" onClick={fechar} className="rounded-lg px-3 py-2 text-giz" aria-label="FLOW, página inicial">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-1 text-sm text-giz/80 md:flex">
            {navegacao.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="relative px-3 py-2 transition-colors after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-giz after:transition-transform after:duration-300 hover:text-giz hover:after:scale-x-100">
                  {item.nome}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              to={usuario ? "/meu-flow" : "/login"}
              onClick={fechar}
              className="botao botao-flow px-4 py-2 text-sm"
            >
              {usuario ? "Meu FLOW" : "Entrar"}
              <PiArrowUpRight aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={() => setAberto(!aberto)}
              aria-expanded={aberto}
              aria-controls="painel-menu"
              aria-label={aberto ? "Fechar menu" : "Abrir menu"}
              className="botao-icone size-10 text-xl text-giz md:hidden"
            >
              {aberto ? <PiX /> : <PiList />}
            </button>
          </div>
        </div>

        <div ref={painelRef} id="painel-menu" className="h-0 overflow-hidden md:hidden" inert={!aberto}>
          <ul className="px-3 pb-4 pt-6">
            {navegacao.map((item) => (
              <li key={item.href} className="overflow-hidden border-t border-white/10">
                <Link
                  to={item.href}
                  onClick={fechar}
                  className="item-painel flex items-baseline justify-between py-3 font-display text-3xl font-semibold text-giz"
                >
                  {item.nome}
                  <PiArrowUpRight aria-hidden="true" className="text-lg text-giz/50" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Menu
