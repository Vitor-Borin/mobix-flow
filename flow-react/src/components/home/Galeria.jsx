import { useRef } from "react"
import { gsap, useGSAP } from "../../gsap"
import TituloSecao from "../TituloSecao"
import { telas } from "../../data/conteudo"

const Galeria = () => {
  const secaoRef = useRef(null)

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".galeria-item", {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".galeria-grade", start: "top 75%" },
        })
      })
    },
    { scope: secaoRef }
  )

  const inclinar = contextSafe((evento) => {
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) {
      return
    }
    const cartao = evento.currentTarget
    const area = cartao.getBoundingClientRect()
    const x = (evento.clientX - area.left) / area.width - 0.5
    const y = (evento.clientY - area.top) / area.height - 0.5
    gsap.to(cartao.querySelector(".galeria-tela"), {
      rotateY: x * 10,
      rotateX: -y * 10,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 900,
    })
  })

  const soltar = contextSafe((evento) => {
    gsap.to(evento.currentTarget.querySelector(".galeria-tela"), { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power3.out" })
  })

  const formatos = [
    "md:col-span-7 md:row-span-2",
    "md:col-span-5",
    "md:col-span-5",
    "md:col-span-12 lg:col-span-12",
  ]

  return (
    <section id="galeria" ref={secaoRef} className="bg-grafite px-5 py-28 sm:px-10" aria-labelledby="titulo-galeria">
      <div className="mx-auto max-w-7xl">
        <TituloSecao
          id="titulo-galeria"
          nome="Galeria"
          frase="As telas do protótipo, desenhadas pelo grupo para o app FLOW. Passe o mouse para ver de perto."
        />

        <ul className="galeria-grade mt-14 grid gap-4 md:grid-cols-12 md:gap-5">
          {telas.map((tela, indice) => (
            <li
              key={tela.imagem}
              onPointerMove={inclinar}
              onPointerLeave={soltar}
              className={`galeria-item group relative flex flex-col overflow-hidden rounded-xl border border-linha bg-tinta ${formatos[indice]} ${
                indice === 3 ? "md:flex-row md:items-center" : ""
              }`}
            >
              <div className={`flex flex-1 items-center justify-center p-8 ${indice === 0 ? "md:p-14" : ""}`}>
                <img
                  src={tela.imagem}
                  alt={tela.alt}
                  loading="lazy"
                  className={`galeria-tela rounded-2xl border border-white/10 object-contain shadow-[0_30px_60px_-25px_rgb(0_0_0/0.8)] will-change-transform ${
                    indice === 0 ? "max-h-[38rem]" : "max-h-[19rem]"
                  }`}
                />
              </div>
              <div className={`border-t border-linha p-6 ${indice === 3 ? "md:max-w-md md:border-l md:border-t-0 md:p-10" : ""}`}>
                <h3 className="text-xl font-semibold tracking-tight">{tela.titulo}</h3>
                <p className="mt-2 leading-7 text-giz/60">{tela.texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Galeria
