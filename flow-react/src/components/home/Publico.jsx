import { useRef } from "react"
import { gsap, SplitText, useGSAP } from "../../gsap"
import TituloSecao from "../TituloSecao"
import { publico } from "../../data/conteudo"

const Coluna = ({ titulo, itens, escura }) => {
  return (
    <div className={`publico-coluna flex flex-col justify-between gap-16 p-8 sm:p-12 ${escura ? "bg-flow text-white" : "bg-papel text-lapis"}`}>
      <h3 className="text-[clamp(2.6rem,6vw,5.2rem)] font-extrabold leading-none tracking-[-0.04em]">{titulo}</h3>
      <ul className="grid gap-5">
        {itens.map((item) => (
          <li key={item} className="publico-item border-t border-current/20 pt-5 text-lg leading-7">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

const Publico = () => {
  const secaoRef = useRef(null)
  const textoRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        SplitText.create(textoRef.current, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (partes) =>
            gsap.from(partes.lines, {
              yPercent: 100,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: { trigger: textoRef.current, start: "top 80%" },
            }),
        })

        gsap.from(".publico-coluna", {
          yPercent: 12,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: ".publico-grade", start: "top 80%" },
        })

        gsap.from(".publico-item", {
          x: -16,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ".publico-grade", start: "top 55%" },
        })
      })
    },
    { scope: secaoRef }
  )

  return (
    <section id="publico" ref={secaoRef} className="bg-tinta px-5 py-28 sm:px-10" aria-labelledby="titulo-publico">
      <div className="mx-auto max-w-7xl">
        <TituloSecao id="titulo-publico" nome="Público-alvo" frase="Para quem passa o dia inteiro estudando." />
        <p ref={textoRef} className="mt-14 max-w-3xl text-[clamp(1.4rem,2.4vw,2rem)] font-medium leading-snug tracking-[-0.01em]">
          Estudantes em tempo integral, que dividem o dia entre aula, grupo de estudo e vida social e usam o celular como caderno. Eles já fotografam tudo. O que falta é encontrar depois.
        </p>

        <div className="publico-grade mt-16 grid overflow-hidden rounded-xl md:grid-cols-2">
          <Coluna titulo="Na aula" itens={publico.naAula} escura={false} />
          <Coluna titulo="Na revisão" itens={publico.naRevisao} escura={true} />
        </div>
      </div>
    </section>
  )
}

export default Publico
