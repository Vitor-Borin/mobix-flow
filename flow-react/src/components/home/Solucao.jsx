import { useRef } from "react"
import { gsap, ScrollTrigger, useGSAP } from "../../gsap"
import TituloSecao from "../TituloSecao"
import { etapas, textoReconhecido } from "../../data/conteudo"

const telasPorEtapa = ["/img/img4.png", "/img/img4.png", "/img/img2.png", "/img/img5.png"]

const Solucao = () => {
  const secaoRef = useRef(null)
  const rotuloRef = useRef(null)
  const ocrRef = useRef(null)

  useGSAP(
    () => {
      const telas = gsap.utils.toArray(".solucao-tela")
      const itens = gsap.utils.toArray(".solucao-etapa")

      const mostrarEtapa = (indice) => {
        gsap.to(telas, { autoAlpha: 0, duration: 0.35, overwrite: true })
        gsap.to(telas[indice], { autoAlpha: 1, duration: 0.35, overwrite: true })
        gsap.to(".solucao-tela-corrigida", { filter: indice === 1 ? "contrast(1.25) saturate(1.2)" : "contrast(0.85) blur(1.2px)", duration: 0.6 })
        gsap.to(itens, { opacity: 0.35, duration: 0.3 })
        gsap.to(itens[indice], { opacity: 1, duration: 0.3 })
        gsap.to(rotuloRef.current, { duration: 0.6, scrambleText: { text: etapas[indice].rotulo, chars: "01#/·", speed: 0.6 } })

        if (indice === 2) {
          gsap.to(ocrRef.current, { duration: 1.4, scrambleText: { text: textoReconhecido, chars: "lousa0123456789", revealDelay: 0.2 } })
        }
      }

      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        itens.forEach((item, indice) => {
          ScrollTrigger.create({
            trigger: item,
            start: "top 60%",
            end: "bottom 60%",
            onToggle: (gatilho) => {
              if (gatilho.isActive) {
                mostrarEtapa(indice)
              }
            },
          })
        })

        gsap.fromTo(".solucao-scanner", { yPercent: -10 }, { yPercent: 1000, duration: 2.4, ease: "none", repeat: -1 })
      })

      mm.add("(prefers-reduced-motion: reduce)", () => {
        ocrRef.current.textContent = textoReconhecido
      })
    },
    { scope: secaoRef }
  )

  return (
    <section id="solucao" ref={secaoRef} className="relative bg-tinta px-5 py-28 sm:px-10" aria-labelledby="titulo-solucao">
      <div className="mx-auto max-w-7xl">
        <TituloSecao
          id="titulo-solucao"
          nome="A solução"
          frase="O FLOW muda a câmera da JOVI para a sala de aula. Do clique à pasta da matéria em quatro passos."
        />

        <div className="mt-20 grid gap-16 md:grid-cols-[minmax(0,21rem)_1fr] md:gap-20 lg:gap-32">
          <div className="md:sticky md:top-28 md:self-start">
            <div className="relative mx-auto aspect-[9/18] w-full max-w-[min(21rem,38svh)] overflow-hidden rounded-[2.6rem] border-[7px] border-[#22252c] bg-[#0c0c14] shadow-[0_40px_80px_-30px_rgb(46_75_255/0.45)]">
              {telasPorEtapa.map((imagem, indice) => (
                <img
                  key={indice}
                  src={imagem}
                  alt=""
                  loading="lazy"
                  className={`solucao-tela absolute inset-0 h-full w-full object-contain object-top ${indice === 1 ? "solucao-tela-corrigida" : ""} ${indice === 0 ? "" : "invisible opacity-0"}`}
                />
              ))}
              <div aria-hidden="true" className="solucao-scanner absolute inset-x-0 top-0 h-[10%] bg-gradient-to-b from-transparent via-flow/30 to-transparent" />
              <p className="absolute inset-x-3 bottom-3 rounded-lg bg-tinta/85 px-3 py-2 font-mono text-[0.7rem] text-giz" aria-live="polite">
                <span ref={rotuloRef}>{etapas[0].rotulo}</span>
              </p>
            </div>
            <p className="mx-auto mt-5 max-w-[min(21rem,38svh)] font-mono text-[0.72rem] leading-5 text-cinza">
              Texto lido: <span ref={ocrRef} className="text-giz">...</span>
            </p>
          </div>

          <ol className="grid gap-[30vh] pb-[20vh]">
            {etapas.map((etapa) => (
              <li key={etapa.numero} className="solucao-etapa">
                <span className="font-mono text-sm text-flow-claro">Passo {etapa.numero}</span>
                <h3 className="mt-3 text-[clamp(2.2rem,4.4vw,3.6rem)] font-bold tracking-[-0.03em]">{etapa.titulo}</h3>
                <p className="mt-4 max-w-md text-lg leading-8 text-giz/70">{etapa.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default Solucao
