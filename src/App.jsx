import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ListaAlunos from './components/ListaAlunos'
import TodoList from './components/TodoList'
import CartaoPerfil from './components/CartaoPerfil'

function App() {
  const [nome] = useState('João') // Substitua pelo seu primeiro nome
  const [abaAtiva, setAbaAtiva] = useState('alunos') // 'alunos' ou 'tarefas'

  return (
    <div className="App">
      <Header />
      
      <main className="main-content">
        <section className="welcome-section">
          <h2>Bem-vindo, {nome}!</h2>
          <p>Esta é sua aplicação de gerenciamento de tarefas e alunos.</p>
        </section>

        {/* Navegação entre abas */}
        <div className="navegacao-abas">
          <button 
            className={`aba ${abaAtiva === 'alunos' ? 'ativa' : ''}`}
            onClick={() => setAbaAtiva('alunos')}
          >
            👥 Gestão de Alunos
          </button>
          <button 
            className={`aba ${abaAtiva === 'tarefas' ? 'ativa' : ''}`}
            onClick={() => setAbaAtiva('tarefas')}
          >
            ✅ Lista de Tarefas
          </button>
        </div>

        {/* Conteúdo das abas */}
        {abaAtiva === 'alunos' ? (
          <div className="aba-conteudo">
            <div className="coluna-lista">
              <div className="secao">
                <h3>📊 Lista de Alunos</h3>
                <ListaAlunos />
              </div>
            </div>
            
            <div className="coluna-perfis">
              <div className="secao">
                <h3>👤 Perfis dos Alunos</h3>
                <CartaoPerfil />
              </div>
            </div>
          </div>
        ) : (
          <div className="aba-conteudo">
            <div className="coluna-tarefas">
              <div className="secao">
                <h3>✅ Minhas Tarefas</h3>
                <TodoList />
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App