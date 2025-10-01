import { useState, useEffect } from 'react'
import Botao from './Botao'
import Alerta from './Alerta'
import './ListaAlunos.css'

function ListaAlunos() {
  // Função para gerar avatar baseado no nome
  const gerarAvatar = (nome, id) => {
    const avatares = [
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${nome.replace(' ', '')}`,
      `https://api.dicebear.com/7.x/personas/svg?seed=${nome.replace(' ', '')}`,
      `https://api.dicebear.com/7.x/micah/svg?seed=${nome.replace(' ', '')}`,
      `https://api.dicebear.com/7.x/miniavs/svg?seed=${nome.replace(' ', '')}`
    ];
    return avatares[id % avatares.length];
  };

  const [alunos, setAlunos] = useState(() => {
    const salvos = localStorage.getItem('alunos-react')
    return salvos ? JSON.parse(salvos) : [
      { id: 1, nome: 'Felipe Cavalcante', curso: 'Engenharia de Software', idade: 22, matricula: '2023001', presente: true, avatar: gerarAvatar('Felipe Cavalcante', 1), email: 'felipe@email.com', telefone: '(11) 99999-9999' },
      { id: 2, nome: 'Georgio', curso: 'Ciência da Computação', idade: 23, matricula: '2023002', presente: false, avatar: gerarAvatar('Georgio', 2), email: 'georgio@email.com', telefone: '(11) 98888-8888' },
      { id: 3, nome: 'Mario Sergio', curso: 'Sistemas de Informação', idade: 24, matricula: '2023003', presente: true, avatar: gerarAvatar('Mario Sergio', 3), email: 'mario@email.com', telefone: '(11) 97777-7777' },
      { id: 4, nome: 'Eduardo', curso: 'Análise e Desenvolvimento de Sistemas', idade: 21, matricula: '2023004', presente: false, avatar: gerarAvatar('Eduardo', 4), email: 'eduardo@email.com', telefone: '(11) 96666-6666' },
      { id: 5, nome: 'Isac Manoel', curso: 'Engenharia da Computação', idade: 25, matricula: '2023005', presente: true, avatar: gerarAvatar('Isac Manoel', 5), email: 'isac@email.com', telefone: '(11) 95555-5555' },
      { id: 6, nome: 'Pedro Formiga', curso: 'Ciência de Dados', idade: 22, matricula: '2023006', presente: true, avatar: gerarAvatar('Pedro Formiga', 6), email: 'pedro@email.com', telefone: '(11) 94444-4444' },
      { id: 7, nome: 'Gleyco', curso: 'Sistemas para Internet', idade: 23, matricula: '2023007', presente: false, avatar: gerarAvatar('Gleyco', 7), email: 'gleyco@email.com', telefone: '(11) 93333-3333' },
      { id: 8, nome: 'Lucas Cavalcanti', curso: 'Jogos Digitais', idade: 24, matricula: '2023008', presente: true, avatar: gerarAvatar('Lucas Cavalcanti', 8), email: 'lucas@email.com', telefone: '(11) 92222-2222' },
      { id: 9, nome: 'Malone', curso: 'Inteligência Artificial', idade: 22, matricula: '2023009', presente: true, avatar: gerarAvatar('Malone', 9), email: 'malone@email.com', telefone: '(11) 91111-1111' },
      { id: 10, nome: 'Victor Ricardo', curso: 'Segurança da Informação', idade: 23, matricula: '2023010', presente: false, avatar: gerarAvatar('Victor Ricardo', 10), email: 'victor.r@email.com', telefone: '(11) 90000-0000' },
      { id: 11, nome: 'Victor Gabriel', curso: 'Redes de Computadores', idade: 24, matricula: '2023011', presente: true, avatar: gerarAvatar('Victor Gabriel', 11), email: 'victor.g@email.com', telefone: '(11) 91000-0000' },
      { id: 12, nome: 'Maciel', curso: 'Engenharia de Software', idade: 25, matricula: '2023012', presente: true, avatar: gerarAvatar('Maciel', 12), email: 'maciel@email.com', telefone: '(11) 92000-0000' },
      { id: 13, nome: 'Alessandro', curso: 'Ciência da Computação', idade: 21, matricula: '2023013', presente: false, avatar: gerarAvatar('Alessandro', 13), email: 'alessandro@email.com', telefone: '(11) 93000-0000' },
      { id: 14, nome: 'Isac Gomes', curso: 'Sistemas de Informação', idade: 22, matricula: '2023014', presente: true, avatar: gerarAvatar('Isac Gomes', 14), email: 'isac.g@email.com', telefone: '(11) 94000-0000' },
      { id: 15, nome: 'Luiz', curso: 'Análise e Desenvolvimento de Sistemas', idade: 23, matricula: '2023015', presente: true, avatar: gerarAvatar('Luiz', 15), email: 'luiz@email.com', telefone: '(11) 95000-0000' },
      { id: 16, nome: 'Ykaro Cardoso', curso: 'Engenharia da Computação', idade: 24, matricula: '2023016', presente: false, avatar: gerarAvatar('Ykaro Cardoso', 16), email: 'ykaro@email.com', telefone: '(11) 96000-0000' },
      { id: 17, nome: 'Jacksson', curso: 'Ciência de Dados', idade: 25, matricula: '2023017', presente: true, avatar: gerarAvatar('Jacksson', 17), email: 'jacksson@email.com', telefone: '(11) 97000-0000' }
    ]
  })

  const [mostrarAlerta, setMostrarAlerta] = useState(false)
  const [tipoAlerta, setTipoAlerta] = useState('success')
  const [mensagemAlerta, setMensagemAlerta] = useState('')
  const [filtroCurso, setFiltroCurso] = useState('todos')
  const [filtroPresenca, setFiltroPresenca] = useState('todos')
  const [busca, setBusca] = useState('')
  const [alunoSelecionado, setAlunoSelecionado] = useState(null)
  const [visualizacao, setVisualizacao] = useState('grid') // 'grid' ou 'lista'

  // Salvar alunos no localStorage
  useEffect(() => {
    localStorage.setItem('alunos-react', JSON.stringify(alunos))
  }, [alunos])

  // Funções para os botões de ação
  const registrarPresenca = () => {
    const alunosAusentes = alunos.filter(aluno => !aluno.presente)
    if (alunosAusentes.length === 0) {
      setTipoAlerta('success')
      setMensagemAlerta('✅ Todos os alunos já estão presentes!')
    } else {
      const novosAlunos = alunos.map(aluno => ({
        ...aluno,
        presente: true
      }))
      setAlunos(novosAlunos)
      setTipoAlerta('success')
      setMensagemAlerta(`✅ Presença registrada para todos os ${alunosAusentes.length} alunos ausentes!`)
    }
    setMostrarAlerta(true)
    setTimeout(() => setMostrarAlerta(false), 4000)
  }

  const exportarLista = () => {
    const dadosExportacao = alunos.map(aluno => ({
      Nome: aluno.nome,
      Curso: aluno.curso,
      Idade: aluno.idade,
      Matrícula: aluno.matricula,
      Presente: aluno.presente ? 'Sim' : 'Não',
      Email: aluno.email,
      Telefone: aluno.telefone
    }))
    
    console.log('Dados para exportação:', dadosExportacao)
    setTipoAlerta('success')
    setMensagemAlerta('📊 Lista de alunos exportada com sucesso! (ver console)')
    setMostrarAlerta(true)
    setTimeout(() => setMostrarAlerta(false), 4000)
  }

  const limparPresencas = () => {
    const novosAlunos = alunos.map(aluno => ({
      ...aluno,
      presente: false
    }))
    setAlunos(novosAlunos)
    setTipoAlerta('error')
    setMensagemAlerta('🗑️ Todas as presenças foram resetadas!')
    setMostrarAlerta(true)
    setTimeout(() => setMostrarAlerta(false), 4000)
  }

  const gerarRelatorio = () => {
    const totalAlunos = alunos.length
    const presentes = alunos.filter(aluno => aluno.presente).length
    const ausentes = totalAlunos - presentes
    const percentualPresenca = ((presentes / totalAlunos) * 100).toFixed(1)

    setTipoAlerta('success')
    setMensagemAlerta(
      `📈 Relatório: ${presentes} presentes (${percentualPresenca}%), ${ausentes} ausentes`
    )
    setMostrarAlerta(true)
    setTimeout(() => setMostrarAlerta(false), 5000)
  }

  // Alternar presença individual
  const togglePresenca = (id) => {
    const novosAlunos = alunos.map(aluno =>
      aluno.id === id ? { ...aluno, presente: !aluno.presente } : aluno
    )
    setAlunos(novosAlunos)
    
    const aluno = alunos.find(a => a.id === id)
    setTipoAlerta(!aluno.presente ? 'success' : 'error')
    setMensagemAlerta(
      !aluno.presente 
        ? `✅ ${aluno.nome} marcado como presente` 
        : `❌ ${aluno.nome} marcado como ausente`
    )
    setMostrarAlerta(true)
    setTimeout(() => setMostrarAlerta(false), 3000)
  }

  // Visualizar perfil do aluno
  const visualizarPerfil = (aluno) => {
    setAlunoSelecionado(aluno)
  }

  const fecharPerfil = () => {
    setAlunoSelecionado(null)
  }

  // Filtrar alunos
  const alunosFiltrados = alunos.filter(aluno => {
    const cursoMatch = filtroCurso === 'todos' || aluno.curso === filtroCurso
    const presencaMatch = filtroPresenca === 'todos' || 
      (filtroPresenca === 'presentes' && aluno.presente) ||
      (filtroPresenca === 'ausentes' && !aluno.presente)
    const buscaMatch = aluno.nome.toLowerCase().includes(busca.toLowerCase()) ||
                     aluno.curso.toLowerCase().includes(busca.toLowerCase()) ||
                     aluno.matricula.includes(busca)
    return cursoMatch && presencaMatch && buscaMatch
  })

  const cursosUnicos = ['todos', ...new Set(alunos.map(aluno => aluno.curso))]
  const totalPresentes = alunos.filter(aluno => aluno.presente).length
  const totalAusentes = alunos.length - totalPresentes

  return (
    <div className="lista-alunos">
      {/* Header com Estatísticas */}
      <div className="alunos-header">
        <div className="stats-grid">
          <div className="stat-card total">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <span className="stat-number">{alunos.length}</span>
              <span className="stat-label">Total de Alunos</span>
            </div>
          </div>
          <div className="stat-card presentes">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <span className="stat-number">{totalPresentes}</span>
              <span className="stat-label">Presentes</span>
            </div>
          </div>
          <div className="stat-card ausentes">
            <div className="stat-icon">❌</div>
            <div className="stat-info">
              <span className="stat-number">{totalAusentes}</span>
              <span className="stat-label">Ausentes</span>
            </div>
          </div>
          <div className="stat-card cursos">
            <div className="stat-icon">🎓</div>
            <div className="stat-info">
              <span className="stat-number">{cursosUnicos.length - 1}</span>
              <span className="stat-label">Cursos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Painel de Controle */}
      <div className="controle-panel">
        <div className="controle-esquerda">
          <div className="busca-container">
            <input
              type="text"
              placeholder="🔍 Buscar por nome, curso ou matrícula..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="input-busca"
            />
          </div>
          
          <div className="filtros-rapidos">
            <select 
              value={filtroCurso} 
              onChange={(e) => setFiltroCurso(e.target.value)}
              className="select-filtro"
            >
              {cursosUnicos.map(curso => (
                <option key={curso} value={curso}>
                  {curso === 'todos' ? '🎓 Todos os cursos' : curso}
                </option>
              ))}
            </select>

            <select 
              value={filtroPresenca} 
              onChange={(e) => setFiltroPresenca(e.target.value)}
              className="select-filtro"
            >
              <option value="todos">👥 Todos</option>
              <option value="presentes">✅ Presentes</option>
              <option value="ausentes">❌ Ausentes</option>
            </select>
          </div>
        </div>

        <div className="controle-direita">
          <div className="visualizacao-botoes">
            <button 
              className={`visualizacao-btn ${visualizacao === 'grid' ? 'ativo' : ''}`}
              onClick={() => setVisualizacao('grid')}
              title="Visualização em Grid"
            >
              ⏹️
            </button>
            <button 
              className={`visualizacao-btn ${visualizacao === 'lista' ? 'ativo' : ''}`}
              onClick={() => setVisualizacao('lista')}
              title="Visualização em Lista"
            >
              📋
            </button>
          </div>

          <div className="botoes-acoes">
            <Botao 
              texto="Registrar Presenças"
              onClick={registrarPresenca}
              tipo="success"
            />
            <Botao 
              texto="Exportar"
              onClick={exportarLista}
              tipo="primary"
            />
            <Botao 
              texto="Relatório"
              onClick={gerarRelatorio}
              tipo="primary"
            />
            <Botao 
              texto="Limpar"
              onClick={limparPresencas}
              tipo="error"
            />
          </div>
        </div>
      </div>

      {mostrarAlerta && (
        <Alerta 
          tipo={tipoAlerta}
          mensagem={mensagemAlerta}
        />
      )}

      {/* Contador de Resultados */}
      <div className="resultados-info">
        <span className="contador">
          {alunosFiltrados.length} aluno{alunosFiltrados.length !== 1 ? 's' : ''} encontrado{alunosFiltrados.length !== 1 ? 's' : ''}
        </span>
        {busca && (
          <span className="termo-busca">
            para "{busca}"
          </span>
        )}
      </div>

      {/* Lista/Grid de Alunos */}
      <div className={`alunos-container ${visualizacao}`}>
        {alunosFiltrados.length === 0 ? (
          <div className="lista-vazia">
            <div className="vazia-icon">🔍</div>
            <h3>Nenhum aluno encontrado</h3>
            <p>Tente ajustar os filtros ou termos da busca.</p>
          </div>
        ) : visualizacao === 'grid' ? (
          <div className="alunos-grid">
            {alunosFiltrados.map(aluno => (
              <div key={aluno.id} className="aluno-card">
                <div className="card-header">
                  <div 
                    className="foto-aluno"
                    onClick={() => visualizarPerfil(aluno)}
                  >
                    <img 
                      src={aluno.avatar} 
                      alt={aluno.nome}
                      onError={(e) => {
                        e.target.src = `data:image/svg+xml;base64,${btoa(`
                          <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="40" cy="40" r="40" fill="#667eea"/>
                            <text x="40" y="48" font-family="Arial" font-size="24" text-anchor="middle" fill="white">
                              ${aluno.nome.charAt(0)}
                            </text>
                          </svg>
                        `)}`
                      }}
                    />
                    <div className={`status-indicator ${aluno.presente ? 'presente' : 'ausente'}`}></div>
                  </div>
                  <div className="aluno-info">
                    <h3 className="aluno-nome">{aluno.nome}</h3>
                    <p className="aluno-curso">{aluno.curso}</p>
                    <span className="aluno-matricula">{aluno.matricula}</span>
                  </div>
                </div>

                <div className="card-body">
                  <div className="aluno-detalhes">
                    <div className="detalhe-item">
                      <span className="detalhe-icon">🎂</span>
                      <span>{aluno.idade} anos</span>
                    </div>
                    <div className="detalhe-item">
                      <span className="detalhe-icon">📧</span>
                      <span className="detalhe-email">{aluno.email}</span>
                    </div>
                    <div className="detalhe-item">
                      <span className="detalhe-icon">📱</span>
                      <span>{aluno.telefone}</span>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <div className={`status-badge ${aluno.presente ? 'presente' : 'ausente'}`}>
                    {aluno.presente ? '✅ Presente' : '❌ Ausente'}
                  </div>
                  <div className="card-acoes">
                    <Botao 
                      texto={aluno.presente ? "Ausente" : "Presente"}
                      onClick={() => togglePresenca(aluno.id)}
                      tipo={aluno.presente ? "error" : "success"}
                    />
                    <button 
                      className="botao-perfil"
                      onClick={() => visualizarPerfil(aluno)}
                      title="Ver perfil completo"
                    >
                      👁️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alunos-lista">
            <div className="lista-header">
              <span>Aluno</span>
              <span>Curso</span>
              <span>Idade</span>
              <span>Matrícula</span>
              <span>Status</span>
              <span>Ações</span>
            </div>
            {alunosFiltrados.map(aluno => (
              <div key={aluno.id} className="lista-item">
                <div className="lista-aluno-info">
                  <div 
                    className="foto-aluno-lista"
                    onClick={() => visualizarPerfil(aluno)}
                  >
                    <img 
                      src={aluno.avatar} 
                      alt={aluno.nome}
                      onError={(e) => {
                        e.target.src = `data:image/svg+xml;base64,${btoa(`
                          <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="20" fill="#667eea"/>
                            <text x="20" y="26" font-family="Arial" font-size="14" text-anchor="middle" fill="white">
                              ${aluno.nome.charAt(0)}
                            </text>
                          </svg>
                        `)}`
                      }}
                    />
                  </div>
                  <div className="aluno-info-lista">
                    <span className="aluno-nome">{aluno.nome}</span>
                    <span className="aluno-email">{aluno.email}</span>
                  </div>
                </div>
                <span className="lista-curso">{aluno.curso}</span>
                <span className="lista-idade">{aluno.idade} anos</span>
                <span className="lista-matricula">{aluno.matricula}</span>
                <span className={`lista-status ${aluno.presente ? 'presente' : 'ausente'}`}>
                  {aluno.presente ? '✅ Presente' : '❌ Ausente'}
                </span>
                <div className="lista-acoes">
                  <Botao 
                    texto={aluno.presente ? "Ausente" : "Presente"}
                    onClick={() => togglePresenca(aluno.id)}
                    tipo={aluno.presente ? "error" : "success"}
                  />
                  <button 
                    className="botao-perfil"
                    onClick={() => visualizarPerfil(aluno)}
                    title="Ver perfil completo"
                  >
                    👁️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Perfil do Aluno */}
      {alunoSelecionado && (
        <div className="modal-overlay" onClick={fecharPerfil}>
          <div className="modal-perfil" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Perfil do Aluno</h3>
              <button className="fechar-modal" onClick={fecharPerfil}>×</button>
            </div>
            <div className="modal-body">
              <div className="perfil-foto">
                <img 
                  src={alunoSelecionado.avatar} 
                  alt={alunoSelecionado.nome}
                  onError={(e) => {
                    e.target.src = `data:image/svg+xml;base64,${btoa(`
                      <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="60" cy="60" r="60" fill="#667eea"/>
                        <text x="60" y="70" font-family="Arial" font-size="40" text-anchor="middle" fill="white">
                          ${alunoSelecionado.nome.charAt(0)}
                        </text>
                      </svg>
                    `)}`
                  }}
                />
              </div>
              <div className="perfil-info">
                <h2>{alunoSelecionado.nome}</h2>
                <div className="info-grid">
                  <div className="info-item">
                    <strong>Curso:</strong> {alunoSelecionado.curso}
                  </div>
                  <div className="info-item">
                    <strong>Idade:</strong> {alunoSelecionado.idade} anos
                  </div>
                  <div className="info-item">
                    <strong>Matrícula:</strong> {alunoSelecionado.matricula}
                  </div>
                  <div className="info-item">
                    <strong>Email:</strong> {alunoSelecionado.email}
                  </div>
                  <div className="info-item">
                    <strong>Telefone:</strong> {alunoSelecionado.telefone}
                  </div>
                  <div className="info-item">
                    <strong>Status:</strong>
                    <span className={`status ${alunoSelecionado.presente ? 'presente' : 'ausente'}`}>
                      {alunoSelecionado.presente ? '✅ Presente' : '❌ Ausente'}
                    </span>
                  </div>
                </div>
                <div className="acoes-perfil">
                  <Botao 
                    texto={alunoSelecionado.presente ? "Marcar como Ausente" : "Marcar como Presente"}
                    onClick={() => {
                      togglePresenca(alunoSelecionado.id)
                      fecharPerfil()
                    }}
                    tipo={alunoSelecionado.presente ? "error" : "success"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ListaAlunos