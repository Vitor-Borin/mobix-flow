import { useRef } from "react"
import { gsap, SplitText, useGSAP } from "../../gsap"
import TituloSecao from "../TituloSecao"
import { ajustesModoAula, gradeHoraria } from "../../data/conteudo"

const Diferencial = () => {
  const secaoRef = useRef(null)
  const fraseRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        SplitText.create(fraseRef.current, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (partes) =>
            gsap.from(partes.lines, {
              yPercent: 100,
              duration: 1,
              ease: "power4.out",
              stagger: 0.1,
              scrollTrigger: { trigger: fraseRef.current, start: "top 80%" },
            }),
        })

        gsap.fromTo(
          ".diferencial-ajuste",
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: { trigger: ".diferencial-paineis", start: "top 70%" },
          }
        )

        gsap.fromTo(
          ".grade-agora",
          { backgroundColor: "rgba(46, 75, 255, 0)", color: "#2b2a27" },
          {
            backgroundColor: "rgba(46, 75, 255, 1)",
            color: "#ffffff",
            duration: 0.5,
            delay: 0.6,
            scrollTrigger: { trigger: ".diferencial-grade", start: "top 75%" },
          }
        )
        gsap.fromTo(
          ".grade-confirmado",
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: 1,
            ease: "back.out(2)",
            scrollTrigger: { trigger: ".diferencial-grade", start: "top 75%" },
          }
        )
      })
    },
    { scope: secaoRef }
  )

  return (
    <section id="diferencial" ref={secaoRef} className="bg-papel px-5 py-28 text-lapis sm:px-10" aria-labelledby="titulo-diferencial">
      <div className="mx-auto max-w-7xl">
        <TituloSecao
          id="titulo-diferencial"
          nome="Diferencial"
          frase="O FLOW não disputa com o Google quem faz o melhor OCR. Ele usa o que já existe e coloca dentro da câmera, na hora da aula."
        />

        <p ref={fraseRef} className="mt-16 max-w-5xl font-display text-[clamp(2rem,4.6vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
          Todo mundo já tem OCR. Ninguém tem uma câmera que sabe que você está em aula.
        </p>

        <div className="diferencial-paineis mt-16 grid gap-px overflow-hidden rounded-xl border border-lapis/15 bg-lapis/15 md:grid-cols-2">
          <article className="bg-papel p-7 sm:p-10">
            <span className="font-mono text-sm text-flow">01</span>
            <h3 className="mt-4 text-[clamp(1.6rem,2.6vw,2.2rem)] font-bold leading-tight tracking-[-0.02em]">O Modo Aula muda a captura</h3>
            <p className="mt-3 max-w-md leading-7 opacity-75">
              Não muda só o destino da foto. Quando reconhece uma lousa, a própria câmera fotografa de outro jeito.
            </p>
            <ul className="mt-8 border-t border-lapis/15">
              {ajustesModoAula.map((ajuste) => (
                <li key={ajuste.nome} className="diferencial-ajuste grid gap-1 border-b border-lapis/15 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <strong className="font-semibold">{ajuste.nome}</strong>
                  <span className="opacity-75">{ajuste.texto}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="bg-papel p-7 sm:p-10">
            <span className="font-mono text-sm text-flow">02</span>
            <h3 className="mt-4 text-[clamp(1.6rem,2.6vw,2.2rem)] font-bold leading-tight tracking-[-0.02em]">A grade horária confirma a matéria</h3>
            <p className="mt-3 max-w-md leading-7 opacity-75">
              O FLOW não adivinha de qual matéria é a foto. Ele confere a grade do estudante: terça às 10:00 é Cálculo I, na sala A-312.
            </p>

            <table className="diferencial-grade mt-8 w-full border-collapse font-mono text-xs sm:text-sm">
              <caption className="sr-only">Grade horária de exemplo</caption>
              <tbody>
                {gradeHoraria.map((aula) => (
                  <tr key={aula.dia} className={`border-b border-lapis/15 ${aula.dia === "Ter" ? "grade-agora" : ""}`}>
                    <td className="py-3 pl-3 pr-3">{aula.dia}</td>
                    <td className="py-3 pr-3">{aula.hora}</td>
                    <td className="py-3 pr-3 font-texto font-semibold">{aula.materia}</td>
                    <td className="py-3 pr-3 text-right">{aula.sala}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs">
              <span>Captura de terça, 10:14</span>
              <span aria-hidden="true">→</span>
              <span>Cálculo I / Derivadas</span>
              <span className="grade-confirmado rounded-full bg-lapis px-2.5 py-1 text-papel">confirmado</span>
            </p>
          </article>
        </div>

        <div className="mt-4 grid overflow-hidden rounded-xl md:grid-cols-2">
          <div className="border border-lapis/15 p-7 sm:p-10">
            <span className="font-mono text-xs opacity-60">Antes</span>
            <p className="mt-3 text-[clamp(1.4rem,2.4vw,2rem)] font-semibold leading-snug tracking-[-0.02em]">A câmera registra uma imagem.</p>
          </div>
          <div className="bg-lapis p-7 text-papel sm:p-10">
            <span className="font-mono text-xs opacity-60">Com o FLOW</span>
            <p className="mt-3 text-[clamp(1.4rem,2.4vw,2rem)] font-semibold leading-snug tracking-[-0.02em]">A câmera entende o contexto e começa o estudo.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Diferencial
