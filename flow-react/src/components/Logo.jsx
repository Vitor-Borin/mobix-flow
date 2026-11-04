const Logo = ({ tamanho = "text-xl" }) => {
  return (
    <span className={`inline-flex items-center gap-2 font-display font-bold tracking-tight ${tamanho}`}>
      <span aria-hidden="true" className="relative inline-block size-[0.9em] rounded-[0.22em] border-2 border-current">
        <span className="absolute left-1/2 top-1/2 size-[0.28em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rec" />
      </span>
      flow
    </span>
  )
}

export default Logo
