const Visor = ({ children, className = "" }) => {
  return (
    <div className={`visor ${className}`}>
      <span aria-hidden="true" className="canto canto-1" />
      <span aria-hidden="true" className="canto canto-2" />
      <span aria-hidden="true" className="canto canto-3" />
      <span aria-hidden="true" className="canto canto-4" />
      {children}
    </div>
  )
}

export default Visor
