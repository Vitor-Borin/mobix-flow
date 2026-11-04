import { useRef, useState } from "react"
import { Link } from "react-router"
import { PiArrowDown, PiArrowRight } from "react-icons/pi"
import { gsap, useGSAP } from "../../gsap"
import Visor from "../Visor"
import { modos } from "../../data/conteudo"

// A tela inteira é o visor da câmera: o título atravessa o celular e muda com o modo escolhido
const Hero = () => {
  const heroRef = useRef(null)
  const tituloRef = useRef(null)
  const tempoRef = useRef(null)
  const [modo, setModo] = useState(0)
  const [pausado, setPausado] = useState(false)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Abertura: os cantos fecham na tela, o celular entra em foco e o obturador dispara
        const abertura = gsap.timeline({ defaults: { ease: "power3.out" } })
        abertura
          .from(".hero-tela .canto", { scale: 3, opacity: 0, duration: 0.9, stagger: 0.06 }, 0)
          .from(".hero-celular img", { filter: "blur(22px)", scale: 1.12, duration: 1.3 }, 0.1)
          .fromTo(tituloRef.current, { "--largura": 75 }, { "--largura": 100, duration: 1.4, ease: "power2.inOut" }, 0)
          .from(".hero-linha", { yPercent: 105, duration: 1, stagger: 0.12 }, 0.2)
          .from(".hero-foco", { scale: 1.6, opacity: 0, duration: 0.6, ease: "back.out(2)" }, 1)
          .fromTo(".hero-flash", { opacity: 0.8 }, { opacity: 0, duration: 0.5, ease: "power1.out" }, 1.3)
          .from(".hero-entra", { y: 16, opacity: 0, duration: 0.7, stagger: 0.07 }, 0.9)

        // Contador de gravação
        const relogio = { segundos: 0 }
        gsap.to(relogio, {
          segundos: 3599,
          duration: 3599,
          ease: "none",
          onUpdate: () => {
            const total = Math.floor(relogio.segundos)
            const minutos = String(Math.floor(total / 60)).padStart(2, "0")
            const segundos = String(total % 60).padStart(2, "0")
            tempoRef.current.textContent = `00:${minutos}:${segundos}`
          },
        })

        // Ao rolar, as duas linhas do título se afastam e o celular chega mais perto
        const saida = gsap.timeline({
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
        })
        saida
          .to(".hero-linha-1", { xPercent: -14, ease: "none" }, 0)
          .to(".hero-linha-2", { xPercent: 14, ease: "none" }, 0)
          .to(".hero-celular", { scale: 1.25, yPercent: 8, ease: "none" }, 0)
      })
    },
    { scope: heroRef }
  )

  // Troca de modo: a palavra nova sobe por baixo e, sem clique, o próximo modo entra sozinho
  useGSAP(
    () => {
      gsap.from(".hero-palavra", { yPercent: 100, duration: 0.6, ease: "power3.out" })
      gsap.fromTo(".hero-foco", { scale: 1.25 }, { scale: 1, duration: 0.5, ease: "back.out(2)" })

      if (!pausado && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.delayedCall(2.8, () => setModo((modo + 1) % modos.length))
      }
    },
    { dependencies: [modo, pausado], scope: heroRef, revertOnUpdate: true }
  )

  const escolherModo = (indice) => {
    setModo(indice)
    setPausado(true)
  }

  return (
    <section ref={heroRef} className="relative isolate flex min-h-svh flex-col overflow-hidden bg-black px-5 pb-8 pt-24 text-giz sm:px-10 sm:pb-10 sm:pt-28">
      <Visor className="hero-tela pointer-events-none absolute inset-3 text-giz/40 sm:inset-5" />

      <div aria-hidden="true" className="hero-celular pointer-events-none absolute left-1/2 top-[42%] -z-10 w-[56vw] -translate-x-1/2 -translate-y-1/2 sm:top-1/2 sm:w-[min(48vw,26rem)] lg:w-[min(34vw,32rem)]">
        <img src="/img/mobixcapa.png" alt="" width="1024" height="1536" fetchPriority="high" className="w-full" />
        <Visor className="hero-foco absolute left-[21%] top-[9%] h-[34%] w-[29%] text-rec" />
      </div>
      <div aria-hidden="true" className="hero-flash pointer-events-none absolute inset-0 z-20 bg-white opacity-0" />

      <div className="hero-entra flex items-center justify-between font-mono text-[0.68rem] text-giz/70 sm:text-xs">
        <p className="flex items-center gap-2">
          <span className="size-2 animate-pulse rounded-full bg-rec" />
          REC <span ref={tempoRef}>00:00:00</span>
        </p>
        <p>Challenge FIAP 2026 × JOVI</p>
      </div>

      <h1
        ref={tituloRef}
        aria-label={`${modos[modo].titulo} vira texto antes do professor apagar.`}
        style={{ fontVariationSettings: "'wdth' var(--largura, 100)" }}
        className="flex flex-1 flex-col justify-between py-8 text-[clamp(3.1rem,12.5vw,12.5rem)] font-extrabold leading-[0.86] tracking-[-0.045em] text-white mix-blend-difference"
      >
        <span aria-hidden="true" className="block overflow-hidden pb-[0.06em]">
          <span className="hero-linha hero-linha-1 block">
            <span key={modo} className="hero-palavra inline-block">
              {modos[modo].titulo}
            </span>
          </span>
        </span>
        <span aria-hidden="true" className="block overflow-hidden pb-[0.06em] text-right">
          <span className="hero-linha hero-linha-2 block">vira texto.</span>
        </span>
      </h1>

      <div className="relative z-10 grid gap-7 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
        <p className="hero-entra max-w-xs text-[0.95rem] leading-6 text-giz/75">
          Antes do professor apagar. O FLOW é a câmera da JOVI para quem estuda: lê a foto, corrige e guarda na pasta da matéria.
        </p>

        <div role="group" aria-label="Modo da câmera" className="hero-entra flex gap-1 font-mono lg:justify-center text-[0.7rem] uppercase sm:text-xs">
          {modos.map((item, indice) => (
            <button
              key={item.nome}
              type="button"
              aria-pressed={indice === modo}
              onClick={() => escolherModo(indice)}
              className={`relative px-2.5 py-2 transition-colors ${indice === modo ? "text-giz" : "text-giz/45 hover:text-giz/80"}`}
            >
              <span
                aria-hidden="true"
                className={`absolute left-1/2 top-0 size-1 -translate-x-1/2 rounded-full bg-rec transition-opacity ${indice === modo ? "opacity-100" : "opacity-0"}`}
              />
              {item.nome}
            </button>
          ))}
        </div>

        <div className="hero-entra flex flex-wrap items-center gap-2 sm:gap-3 lg:justify-end">
          <a href="#solucao" className="botao botao-linha px-4 py-3 text-sm sm:px-5">
            Como funciona
            <PiArrowDown aria-hidden="true" />
          </a>
          <Link to="/login" className="botao botao-claro px-4 py-3 text-sm sm:px-5">
            Testar o Meu FLOW
            <PiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
