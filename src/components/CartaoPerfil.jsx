import './CartaoPerfil.css'

function CartaoPerfil() {
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

  const perfis = [
    {
      id: 1,
      nome: 'Felipe Cavalcante',
      curso: 'Engenharia de Software',
      idade: 22,
      cidade: 'Recife',
      matricula: '2023001',
      interesses: ['Programação', 'Futebol', 'Música'],
      avatar: gerarAvatar('Felipe Cavalcante', 1)
    },
    {
      id: 2,
      nome: 'Georgio',
      curso: 'Ciência da Computação',
      idade: 23,
      cidade: 'São Paulo',
      matricula: '2023002',
      interesses: ['Data Science', 'Leitura', 'Cinema'],
      avatar: gerarAvatar('Georgio', 2)
    },
    {
      id: 3,
      nome: 'Mario Sergio',
      curso: 'Sistemas de Informação',
      idade: 24,
      cidade: 'Rio de Janeiro',
      matricula: '2023003',
      interesses: ['Desenvolvimento Web', 'Games', 'Tecnologia'],
      avatar: gerarAvatar('Mario Sergio', 3)
    },
    {
      id: 4,
      nome: 'Eduardo',
      curso: 'Análise e Desenvolvimento de Sistemas',
      idade: 21,
      cidade: 'Belo Horizonte',
      matricula: '2023004',
      interesses: ['Mobile', 'UI/UX', 'Inovação'],
      avatar: gerarAvatar('Eduardo', 4)
    },
    {
      id: 5,
      nome: 'Isac Manoel',
      curso: 'Engenharia da Computação',
      idade: 25,
      cidade: 'Porto Alegre',
      matricula: '2023005',
      interesses: ['Robótica', 'IoT', 'Hardware'],
      avatar: gerarAvatar('Isac Manoel', 5)
    },
    {
      id: 6,
      nome: 'Pedro Formiga',
      curso: 'Ciência de Dados',
      idade: 22,
      cidade: 'Salvador',
      matricula: '2023006',
      interesses: ['Machine Learning', 'Estatística', 'Python'],
      avatar: gerarAvatar('Pedro Formiga', 6)
    },
    {
      id: 7,
      nome: 'Gleyco',
      curso: 'Sistemas para Internet',
      idade: 23,
      cidade: 'Fortaleza',
      matricula: '2023007',
      interesses: ['Frontend', 'Design', 'Marketing Digital'],
      avatar: gerarAvatar('Gleyco', 7)
    },
    {
      id: 8,
      nome: 'Lucas Cavalcanti',
      curso: 'Jogos Digitais',
      idade: 24,
      cidade: 'Brasília',
      matricula: '2023008',
      interesses: ['Game Dev', 'Arte Digital', 'Animação'],
      avatar: gerarAvatar('Lucas Cavalcanti', 8)
    },
    {
      id: 9,
      nome: 'Malone',
      curso: 'Inteligência Artificial',
      idade: 22,
      cidade: 'Curitiba',
      matricula: '2023009',
      interesses: ['AI', 'Deep Learning', 'Pesquisa'],
      avatar: gerarAvatar('Malone', 9)
    },
    {
      id: 10,
      nome: 'Victor Ricardo',
      curso: 'Segurança da Informação',
      idade: 23,
      cidade: 'Manaus',
      matricula: '2023010',
      interesses: ['Cybersecurity', 'Ethical Hacking', 'Redes'],
      avatar: gerarAvatar('Victor Ricardo', 10)
    },
    {
      id: 11,
      nome: 'Victor Gabriel',
      curso: 'Redes de Computadores',
      idade: 24,
      cidade: 'Belém',
      matricula: '2023011',
      interesses: ['Infraestrutura', 'Cloud', 'DevOps'],
      avatar: gerarAvatar('Victor Gabriel', 11)
    },
    {
      id: 12,
      nome: 'Maciel',
      curso: 'Engenharia de Software',
      idade: 25,
      cidade: 'Goiânia',
      matricula: '2023012',
      interesses: ['Arquitetura de Software', 'Clean Code', 'Agile'],
      avatar: gerarAvatar('Maciel', 12)
    },
    {
      id: 13,
      nome: 'Alessandro',
      curso: 'Ciência da Computação',
      idade: 21,
      cidade: 'Campinas',
      matricula: '2023013',
      interesses: ['Algoritmos', 'Competitive Programming', 'Matemática'],
      avatar: gerarAvatar('Alessandro', 13)
    },
    {
      id: 14,
      nome: 'Isac Gomes',
      curso: 'Sistemas de Informação',
      idade: 22,
      cidade: 'São Luís',
      matricula: '2023014',
      interesses: ['Banco de Dados', 'SQL', 'Business Intelligence'],
      avatar: gerarAvatar('Isac Gomes', 14)
    },
    {
      id: 15,
      nome: 'Luiz',
      curso: 'Análise e Desenvolvimento de Sistemas',
      idade: 23,
      cidade: 'Natal',
      matricula: '2023015',
      interesses: ['Full Stack', 'JavaScript', 'Startups'],
      avatar: gerarAvatar('Luiz', 15)
    },
    {
      id: 16,
      nome: 'Ykaro Cardoso',
      curso: 'Engenharia da Computação',
      idade: 24,
      cidade: 'Florianópolis',
      matricula: '2023016',
      interesses: ['Embedded Systems', 'Electronics', 'Research'],
      avatar: gerarAvatar('Ykaro Cardoso', 16)
    },
    {
      id: 17,
      nome: 'Jacksson',
      curso: 'Ciência de Dados',
      idade: 25,
      cidade: 'Vitória',
      matricula: '2023017',
      interesses: ['Big Data', 'Analytics', 'Visualization'],
      avatar: gerarAvatar('Jacksson', 17)
    }
  ]

  return (
    <div className="cartoes-container">
      {perfis.map(perfil => (
        <div key={perfil.id} className="cartao-perfil">
          <div className="cartao-header">
            <div className="foto-container">
              <img 
                src={perfil.avatar} 
                alt={perfil.nome}
                className="foto-perfil"
                onError={(e) => {
                  e.target.src = `data:image/svg+xml;base64,${btoa(`
                    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="50" r="50" fill="#667eea"/>
                      <text x="50" y="60" font-family="Arial" font-size="36" text-anchor="middle" fill="white">
                        ${perfil.nome.charAt(0)}
                      </text>
                    </svg>
                  `)}`
                }}
              />
              <div className="status-online"></div>
            </div>
            <h3>{perfil.nome}</h3>
            <p className="curso">{perfil.curso}</p>
            <span className="matricula-badge">{perfil.matricula}</span>
          </div>
          
          <div className="cartao-body">
            <div className="info-item">
              <span className="info-icon">🎂</span>
              <div className="info-content">
                <strong>Idade:</strong>
                <span>{perfil.idade} anos</span>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">🏠</span>
              <div className="info-content">
                <strong>Cidade:</strong>
                <span>{perfil.cidade}</span>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">🎓</span>
              <div className="info-content">
                <strong>Matrícula:</strong>
                <span>{perfil.matricula}</span>
              </div>
            </div>
            
            <div className="interesses">
              <div className="interesses-header">
                <span className="info-icon">🎯</span>
                <strong>Interesses:</strong>
              </div>
              <div className="tags">
                {perfil.interesses.map((interesse, index) => (
                  <span key={index} className="tag">{interesse}</span>
                ))}
              </div>
            </div>

            <div className="contato-botoes">
              <button className="botao-contato email" title="Enviar email">
                📧
              </button>
              <button className="botao-contato mensagem" title="Enviar mensagem">
                💬
              </button>
              <button className="botao-contato perfil" title="Ver perfil completo">
                👁️
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartaoPerfil