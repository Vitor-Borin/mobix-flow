import { useRef } from "react"
import { gsap, useGSAP } from "../../gsap"
import TituloSecao from "../TituloSecao"
import { apisGoogle } from "../../data/conteudo"

// Viabilidade técnica pedida pelo Challenge: cada etapa do FLOW apoiada numa API aberta do Google
const Viabilidade = () => {
  const secaoRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".api-linha",
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: ".api-lista", start: "top 75%" },
          }
        )
      })
    },
    { scope: secaoRef }
  )

  return (
    <section id="viabilidade" ref={secaoRef} className="bg-flow px-5 py-28 text-white sm:px-10" aria-labelledby="titulo-viabilidade">
      <div className="mx-auto max-w-7xl">
        <TituloSecao
          id="titulo-viabilidade"
          nome="Viabilidade"
          frase="Tudo o que o FLOW precisa já existe em APIs abertas do Google. O trabalho do grupo é juntar as peças dentro da câmera da JOVI."
        />

        <ol className="api-lista mt-14 border-t border-white/25">
          {apisGoogle.map((api, indice) => (
            <li
              key={api.nome}
              className="api-linha grid gap-2 border-b border-white/25 py-7 md:grid-cols-[9.5rem_1fr_1.1fr] md:items-baseline md:gap-8"
            >
              <span className="whitespace-nowrap font-mono text-sm text-white/70">
                {String(indice + 1).padStart(2, "0")} · {api.etapa}
              </span>
              <h3 className="font-display text-[clamp(1.6rem,3vw,2.6rem)] font-bold leading-tight tracking-[-0.03em]">{api.nome}</h3>
              <p className="max-w-md text-lg leading-7 text-white/80">{api.texto}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-2xl text-sm leading-6 text-white/70">
          No protótipo, essas etapas são simuladas com dados de exemplo. As APIs mostram que a proposta pode ser construída de verdade.
        </p>
      </div>
    </section>
  )
}

export default Viabilidade
