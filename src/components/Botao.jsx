import './Botao.css'

function Botao({ texto, onClick, tipo = 'default', desabilitado = false }) {
  return (
    <button 
      className={`botao ${tipo} ${desabilitado ? 'desabilitado' : ''}`}
      onClick={onClick}
      disabled={desabilitado}
    >
      {texto}
    </button>
  )
}

export default Botao