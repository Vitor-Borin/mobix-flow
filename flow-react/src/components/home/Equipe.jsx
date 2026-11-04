import { useRef } from "react"
import { gsap, useGSAP } from "../../gsap"
import TituloSecao from "../TituloSecao"
import { equipe } from "../../data/conteudo"

const Equipe = () => {
  const secaoRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(".equipe-nome", { yPercent: 100 }, {
          yPercent: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.07,
          scrollTrigger: { trigger: secaoRef.current, start: "top 60%" },
        })
      })
    },
    { scope: secaoRef }
  )

  return (
    <section id="equipe" ref={secaoRef} className="bg-papel px-5 py-28 text-lapis sm:px-10" aria-labelledby="titulo-equipe">
      <div className="mx-auto max-w-7xl">
        <TituloSecao
          id="titulo-equipe"
          nome="Nossa equipe"
          frase="Grupo MOBIX: cinco estudantes de Engenharia de Software da FIAP, turma 1ESPX."
        />

        <ul className="equipe-lista mt-14 border-t border-lapis/20">
          {equipe.map((pessoa) => (
            <li key={pessoa.rm} className="group overflow-hidden border-b border-lapis/20">
              <div className="equipe-nome flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5">
                <span className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold tracking-[-0.02em] transition-colors duration-300 group-hover:text-flow">
                  {pessoa.nome}
                </span>
                <span className="font-mono text-sm opacity-70">
                  {pessoa.funcao ? `${pessoa.funcao} · ` : ""}
                  {pessoa.rm}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Equipe
