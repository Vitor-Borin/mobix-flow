import { useRef } from "react"
import { gsap, useGSAP } from "../../gsap"
import { diaDoEstudante } from "../../data/conteudo"

// Um dia de aula: a seção trava, os momentos passam de lado e a galeria do celular vai enchendo
const Problema = () => {
  const secaoRef = useRef(null)
  const trilhaRef = useRef(null)
  const contadorRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const trilha = trilhaRef.current
        const distancia = () => trilha.scrollWidth - window.innerWidth + 80
        const totais = diaDoEstudante.map((momento) => momento.fotos)
        contadorRef.current.textContent = totais[0]

        const linha = gsap.timeline({
          scrollTrigger: {
            trigger: secaoRef.current,
            start: "top top",
            end: () => `+=${distancia()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (gatilho) => {
              // Interpola o número de fotos entre um momento e o próximo
              const posicao = gatilho.progress * (totais.length - 1)
              const atual = Math.floor(posicao)
              const proximo = Math.min(atual + 1, totais.length - 1)
              const fracao = posicao - atual
              const fotos = Math.round(totais[atual] + (totais[proximo] - totais[atual]) * fracao)
              contadorRef.current.textContent = fotos.toLocaleString("pt-BR")
            },
          },
        })

        linha
          .to(trilha, { x: () => -distancia(), ease: "none", duration: 1 }, 0)
          // A noite chega só no último momento do dia
          .to(secaoRef.current, { backgroundColor: "#0b0c0f", color: "#f3f1ec", ease: "power2.in", duration: 0.18 }, 0.8)
          .to(".problema-pauta", { opacity: 0, ease: "none", duration: 0.18 }, 0.8)
      })
    },
    { scope: secaoRef }
  )

  return (
    <section ref={secaoRef} className="relative overflow-hidden bg-papel text-lapis" aria-labelledby="titulo-problema">
      <div aria-hidden="true" className="problema-pauta pauta pointer-events-none absolute inset-0" />

      <div className="relative flex min-h-svh flex-col justify-center gap-12 py-24">
        <div className="flex flex-col gap-6 px-5 sm:px-10 md:flex-row md:items-end md:justify-between">
          <h2 id="titulo-problema" className="max-w-2xl text-[clamp(2.4rem,5.4vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.03em]">
            Foto de aula some no meio da galeria.
          </h2>
          <p className="font-mono text-sm">
            Fotos na galeria: <strong ref={contadorRef} className="text-2xl font-semibold">1.284</strong>
          </p>
        </div>

        <ol ref={trilhaRef} className="flex flex-col gap-5 px-5 sm:px-10 md:w-max md:flex-row md:gap-8">
          {diaDoEstudante.map((momento, indice) => (
            <li
              key={momento.hora}
              className={`flex w-full flex-col justify-between rounded-sm border border-current/15 bg-white/60 p-6 shadow-[0_1px_0_rgb(0_0_0/0.06)] md:h-[26rem] md:w-[24rem] ${
                indice % 2 === 0 ? "md:-rotate-1" : "md:rotate-1"
              } ${indice === diaDoEstudante.length - 1 ? "md:bg-grafite md:text-giz" : ""}`}
            >
              <div className="flex items-baseline justify-between font-mono text-sm">
                <span className="text-4xl font-semibold tracking-tight md:text-5xl">{momento.hora}</span>
                <span className="opacity-60">{momento.lugar}</span>
              </div>
              <div className="mt-10">
                <h3 className="text-2xl font-semibold tracking-tight">{momento.registro}</h3>
                <p className="mt-3 leading-7 opacity-75">{momento.detalhe}</p>
              </div>
            </li>
          ))}
          <li className="flex w-full items-center md:h-[26rem] md:w-[30rem]">
            <p className="text-[clamp(1.8rem,3.4vw,2.8rem)] font-display font-semibold leading-tight tracking-tight">
              A informação estava lá. Só não dava para achar.
            </p>
          </li>
        </ol>
      </div>
    </section>
  )
}

export default Problema
