export default function Sidebar({ selectedPage, setSelectedPage }) {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col p-6 min-h-screen">
      <div className="flex flex-col items-center mb-10">
        {/* Caminho atualizado para a imagem do usuário localizada na pasta public */}
        <img
          src="/user.jpg"  // Caminho correto para a imagem dentro da pasta public
          alt="Foto do usuário"
          className="rounded-full mb-4 border-4 border-gray-700"
        />
        <h2 className="text-xl font-bold">Vinicius Santos</h2>
      </div>
      <nav className="space-y-4">
        <button
          className={`block w-full text-left p-4 rounded-lg text-lg hover:bg-gray-700 transition ${
            selectedPage === 'CadastroProduto' ? 'bg-gray-700' : ''
          }`}
          onClick={() => setSelectedPage('CadastroProduto')}
        >
          Cadastro de Produto
        </button>
        <button
          className={`block w-full text-left p-4 rounded-lg text-lg hover:bg-gray-700 transition ${
            selectedPage === 'Cadastro' ? 'bg-gray-700' : ''
          }`}
          onClick={() => setSelectedPage('Cadastro')}
        >
          Cadastro de OP
        </button>
        <button
          className={`block w-full text-left p-4 rounded-lg text-lg hover:bg-gray-700 transition ${
            selectedPage === 'Acompanhamento' ? 'bg-gray-700' : ''
          }`}
          onClick={() => setSelectedPage('Acompanhamento')}
        >
          Acompanhamento de OP
        </button>
        <button
          className={`block w-full text-left p-4 rounded-lg text-lg hover:bg-gray-700 transition ${
            selectedPage === 'Estoque' ? 'bg-gray-700' : ''
          }`}
          onClick={() => setSelectedPage('Estoque')}
        >
          Estoque
        </button>
        <button
          className={`block w-full text-left p-4 rounded-lg text-lg hover:bg-gray-700 transition ${
            selectedPage === 'Dashboard' ? 'bg-gray-700' : ''
          }`}
          onClick={() => setSelectedPage('Dashboard')}
        >
          Dashboard
        </button>
      </nav>
    </div>
  );
}
