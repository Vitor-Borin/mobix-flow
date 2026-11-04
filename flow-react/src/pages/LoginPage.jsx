import { useRef, useState } from "react"
import { Navigate, useNavigate } from "react-router"
import Visor from "../components/Visor"
import useAuth from "../hooks/useAuth"

const LoginPage = () => {
  const { usuario, entrar } = useAuth()
  const navigate = useNavigate()
  const emailRef = useRef(null)
  const senhaRef = useRef(null)
  const [erro, setErro] = useState("")

  if (usuario) {
    return <Navigate to="/meu-flow" replace />
  }

  const enviar = (evento) => {
    evento.preventDefault()

    const deuCerto = entrar(emailRef.current.value, senhaRef.current.value)

    if (deuCerto) {
      navigate("/meu-flow")
    } else {
      setErro("E-mail ou senha não conferem. Confira os dados de teste abaixo.")
      senhaRef.current.focus()
    }
  }

  return (
    <section className="flex min-h-svh items-center bg-tinta px-5 pb-16 pt-32 sm:px-10">
      <div className="mx-auto grid w-full max-w-5xl gap-14 md:grid-cols-2 md:items-center">
        <div>
          <p className="font-mono text-xs uppercase text-flow-claro">Área do estudante</p>
          <h1 className="mt-5 text-[clamp(2.6rem,6vw,4.8rem)] font-extrabold leading-[0.92] tracking-[-0.035em]">
            Entre no seu FLOW.
          </h1>
          <p className="mt-6 max-w-sm text-lg leading-8 text-giz/70">
            Veja suas capturas separadas por matéria, busque pelo texto da lousa e adicione novas capturas.
          </p>
        </div>

        <Visor className="p-4 text-flow-claro sm:p-6">
          <form onSubmit={enviar} className="grid gap-5 rounded-xl border border-linha bg-grafite p-6 text-giz sm:p-8">
            <label className="grid gap-2 text-sm font-medium">
              E-mail
              <input ref={emailRef} type="email" required autoComplete="username" placeholder="ana@flow.com" className="campo" />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Senha
              <input ref={senhaRef} type="password" required autoComplete="current-password" className="campo" />
            </label>

            {erro && (
              <p role="alert" className="text-sm text-rec">
                {erro}
              </p>
            )}

            <button type="submit" className="botao botao-flow min-h-12 px-5 py-3 font-semibold text-white">
              Entrar
            </button>

            <p className="rounded-xl border border-linha p-4 font-mono text-[0.72rem] leading-5 text-cinza">
              Teste: ana@flow.com · flow123
            </p>
          </form>
        </Visor>
      </div>
    </section>
  )
}

export default LoginPage
