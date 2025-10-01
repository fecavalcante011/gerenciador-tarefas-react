import Botao from './Botao'

function Acoes({ onAcao }) {
  return (
    <div className="acoes-container">
      <Botao 
        texto="Registrar Presenças"
        onClick={() => onAcao('positiva')}
        tipo="success"
      />
      <Botao 
        texto="Limpar Tudo"
        onClick={() => onAcao('negativa')}
        tipo="error"
      />
    </div>
  )
}

export default Acoes