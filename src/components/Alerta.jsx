import './Alerta.css'

function Alerta({ tipo, mensagem }) {
  return (
    <div className={`alerta ${tipo}`}>
      <span className="alerta-mensagem">{mensagem}</span>
    </div>
  )
}

export default Alerta