import { Outlet } from "react-router"
import Menu from "./components/Menu"
import Footer from "./components/Footer"
import RolarAoTrocarDePagina from "./components/RolarAoTrocarDePagina"

const App = () => {
  return (
    <>
      <a
        href="#conteudo"
        className="fixed left-4 top-4 z-[60] -translate-y-[200%] rounded-lg bg-giz px-4 py-3 text-sm font-semibold text-tinta focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <RolarAoTrocarDePagina />
      <Menu />
      <main id="conteudo">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
