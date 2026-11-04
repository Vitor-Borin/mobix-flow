// Cabeçalho padrão das seções da home: o nome da seção em destaque e uma frase curta ao lado
const TituloSecao = ({ id, nome, frase }) => {
  return (
    <header className="titulo-secao grid gap-6 border-t border-current/15 pt-6 md:grid-cols-2 md:gap-10">
      <h2 id={id} className="text-[clamp(2.8rem,7.4vw,7rem)] font-extrabold leading-[0.88] tracking-[-0.045em]">
        {nome}
      </h2>
      <p className="max-w-md text-lg leading-8 opacity-70 md:self-end md:justify-self-end">{frase}</p>
    </header>
  )
}

export default TituloSecao
