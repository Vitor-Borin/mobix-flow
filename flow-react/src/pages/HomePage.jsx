import { useEffect } from "react"
import { ScrollTrigger } from "../gsap"
import Hero from "../components/home/Hero"
import Problema from "../components/home/Problema"
import Solucao from "../components/home/Solucao"
import Galeria from "../components/home/Galeria"
import Diferencial from "../components/home/Diferencial"
import Viabilidade from "../components/home/Viabilidade"
import Publico from "../components/home/Publico"
import Equipe from "../components/home/Equipe"
import Contato from "../components/home/Contato"

const HomePage = () => {
  // As imagens carregam aos poucos e mudam a altura da página: recalcula os gatilhos do scroll quando cada uma chega
  useEffect(() => {
    const imagens = document.querySelectorAll("main img")
    let espera

    const recalcular = () => {
      clearTimeout(espera)
      espera = setTimeout(() => ScrollTrigger.refresh(), 150)
    }

    imagens.forEach((imagem) => {
      if (!imagem.complete) {
        imagem.addEventListener("load", recalcular)
      }
    })

    return () => {
      clearTimeout(espera)
      imagens.forEach((imagem) => imagem.removeEventListener("load", recalcular))
    }
  }, [])

  return (
    <>
      <Hero />
      <Problema />
      <Solucao />
      <Diferencial />
      <Galeria />
      <Viabilidade />
      <Publico />
      <Equipe />
      <Contato />
    </>
  )
}

export default HomePage
