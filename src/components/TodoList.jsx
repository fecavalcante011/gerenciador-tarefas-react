import { useState, useEffect } from 'react'
import Botao from './Botao'
import './TodoList.css'

function TodoList() {
  const [tarefas, setTarefas] = useState(() => {
    const salvas = localStorage.getItem('tarefas-react')
    return salvas ? JSON.parse(salvas) : [
      { id: 1, texto: 'Estudar React Hooks', concluida: true, categoria: 'estudos', prioridade: 'alta', data: '2024-01-15' },
      { id: 2, texto: 'Fazer exercícios físicos', concluida: false, categoria: 'saude', prioridade: 'media', data: '2024-01-16' },
      { id: 3, texto: 'Preparar apresentação do projeto', concluida: false, categoria: 'trabalho', prioridade: 'alta', data: '2024-01-17' },
      { id: 4, texto: 'Ler livro técnico', concluida: false, categoria: 'estudos', prioridade: 'baixa', data: '2024-01-18' }
    ]
  })
  
  const [novaTarefa, setNovaTarefa] = useState('')
  const [categoria, setCategoria] = useState('geral')
  const [prioridade, setPrioridade] = useState('media')
  const [filtro, setFiltro] = useState('todas')
  const [busca, setBusca] = useState('')

  // Salvar tarefas no localStorage
  useEffect(() => {
    localStorage.setItem('tarefas-react', JSON.stringify(tarefas))
  }, [tarefas])

  const adicionarTarefa = () => {
    if (novaTarefa.trim()) {
      const novaTarefaObj = {
        id: Date.now(),
        texto: novaTarefa,
        concluida: false,
        categoria,
        prioridade,
        data: new Date().toISOString().split('T')[0]
      }
      setTarefas([...tarefas, novaTarefaObj])
      setNovaTarefa('')
      setCategoria('geral')
      setPrioridade('media')
    }
  }

  const toggleConcluida = (id) => {
    setTarefas(tarefas.map(tarefa =>
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    ))
  }

  const removerTarefa = (id) => {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id))
  }

  const limparConcluidas = () => {
    setTarefas(tarefas.filter(tarefa => !tarefa.concluida))
  }

  // Filtrar tarefas
  const tarefasFiltradas = tarefas.filter(tarefa => {
    const textoMatch = tarefa.texto.toLowerCase().includes(busca.toLowerCase())
    const filtroMatch = 
      filtro === 'todas' ? true :
      filtro === 'pendentes' ? !tarefa.concluida :
      filtro === 'concluidas' ? tarefa.concluida :
      filtro === tarefa.categoria
    
    return textoMatch && filtroMatch
  })

  const tarefasPendentes = tarefas.filter(t => !t.concluida).length
  const tarefasConcluidas = tarefas.filter(t => t.concluida).length
  const tarefasAltaPrioridade = tarefas.filter(t => t.prioridade === 'alta' && !t.concluida).length

  const categorias = ['todas', 'pendentes', 'concluidas', ...new Set(tarefas.map(t => t.categoria))]

  return (
    <div className="todo-list">
      {/* Header com Estatísticas */}
      <div className="todo-header">
        <div className="stats-grid">
          <div className="stat-card total">
            <div className="stat-icon">📝</div>
            <div className="stat-info">
              <span className="stat-number">{tarefas.length}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>
          <div className="stat-card pendentes">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <span className="stat-number">{tarefasPendentes}</span>
              <span className="stat-label">Pendentes</span>
            </div>
          </div>
          <div className="stat-card concluidas">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <span className="stat-number">{tarefasConcluidas}</span>
              <span className="stat-label">Concluídas</span>
            </div>
          </div>
          <div className="stat-card prioridade">
            <div className="stat-icon">🚨</div>
            <div className="stat-info">
              <span className="stat-number">{tarefasAltaPrioridade}</span>
              <span className="stat-label">Alta Prioridade</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="filtros-section">
        <div className="busca-container">
          <input
            type="text"
            placeholder="🔍 Buscar tarefas..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="input-busca"
          />
        </div>
        <div className="filtros-container">
          <select 
            value={filtro} 
            onChange={(e) => setFiltro(e.target.value)}
            className="select-filtro"
          >
            {categorias.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'todas' ? '📋 Todas as tarefas' : 
                 cat === 'pendentes' ? '⏳ Pendentes' : 
                 cat === 'concluidas' ? '✅ Concluídas' : 
                 `📁 ${cat.charAt(0).toUpperCase() + cat.slice(1)}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Adicionar Nova Tarefa */}
      <div className="nova-tarefa-section">
        <div className="input-group">
          <input
            type="text"
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            placeholder="✏️ Digite uma nova tarefa..."
            onKeyPress={(e) => e.key === 'Enter' && adicionarTarefa()}
            className="input-tarefa"
          />
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="select-categoria"
          >
            <option value="geral">📁 Geral</option>
            <option value="estudos">🎓 Estudos</option>
            <option value="trabalho">💼 Trabalho</option>
            <option value="saude">❤️ Saúde</option>
            <option value="pessoal">🏠 Pessoal</option>
            <option value="outros">📦 Outros</option>
          </select>
          <select
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value)}
            className="select-prioridade"
          >
            <option value="baixa">🟢 Baixa</option>
            <option value="media">🟡 Média</option>
            <option value="alta">🔴 Alta</option>
          </select>
          <Botao 
            texto="Adicionar"
            onClick={adicionarTarefa}
            tipo="primary"
            desabilitado={!novaTarefa.trim()}
            className="botao-adicionar"
          />
        </div>
      </div>

      {/* Lista de Tarefas */}
      <div className="lista-tarefas-container">
        {tarefasFiltradas.length === 0 ? (
          <div className="lista-vazia">
            <div className="vazia-icon">📭</div>
            <h3>Nenhuma tarefa encontrada</h3>
            <p>{busca ? 'Tente ajustar os termos da busca.' : 'Adicione uma nova tarefa para começar!'}</p>
          </div>
        ) : (
          <div className="lista-tarefas">
            {tarefasFiltradas.map(tarefa => (
              <div 
                key={tarefa.id} 
                className={`tarefa-item ${tarefa.concluida ? 'concluida' : ''} prioridade-${tarefa.prioridade}`}
              >
                <div className="tarefa-content">
                  <div className="tarefa-checkbox">
                    <input
                      type="checkbox"
                      checked={tarefa.concluida}
                      onChange={() => toggleConcluida(tarefa.id)}
                      className="checkbox"
                    />
                  </div>
                  
                  <div className="tarefa-info">
                    <span className="tarefa-texto">{tarefa.texto}</span>
                    <div className="tarefa-metadados">
                      <span className={`categoria-badge categoria-${tarefa.categoria}`}>
                        {tarefa.categoria === 'estudos' ? '🎓' :
                         tarefa.categoria === 'trabalho' ? '💼' :
                         tarefa.categoria === 'saude' ? '❤️' :
                         tarefa.categoria === 'pessoal' ? '🏠' : '📦'} {tarefa.categoria}
                      </span>
                      <span className={`prioridade-badge prioridade-${tarefa.prioridade}`}>
                        {tarefa.prioridade === 'alta' ? '🔴 Alta' :
                         tarefa.prioridade === 'media' ? '🟡 Média' : '🟢 Baixa'}
                      </span>
                      <span className="tarefa-data">
                        📅 {new Date(tarefa.data).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="tarefa-acoes">
                  <Botao 
                    texto="Remover"
                    onClick={() => removerTarefa(tarefa.id)}
                    tipo="error"
                    className="botao-remover"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ações em Lote */}
      {tarefasConcluidas > 0 && (
        <div className="acoes-lote">
          <div className="lote-info">
            <span>{tarefasConcluidas} tarefa{tarefasConcluidas !== 1 ? 's' : ''} concluída{tarefasConcluidas !== 1 ? 's' : ''}</span>
          </div>
          <Botao 
            texto={`Limpar Concluídas (${tarefasConcluidas})`}
            onClick={limparConcluidas}
            tipo="error"
            className="botao-limpar"
          />
        </div>
      )}

      {/* Progresso */}
      {tarefas.length > 0 && (
        <div className="progresso-section">
          <div className="progresso-info">
            <span>
              {tarefasConcluidas} de {tarefas.length} tarefas concluídas 
              ({Math.round((tarefasConcluidas / tarefas.length) * 100)}%)
            </span>
          </div>
          <div className="progresso-bar">
            <div 
              className="progresso-fill"
              style={{ width: `${(tarefasConcluidas / tarefas.length) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TodoList