// src/pages/pages.js
'use client';
// src/pages/page.js
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import CadastroOP from '../pages/CadastroOP';
import AcompanhamentoOP from '../pages/AcompanhamentoOP';
import CadastroProduto from '../pages/CadastroProduto';
import Estoque from '../pages/Estoque'; // Importa o componente Estoque
import Dashboard from '../pages/Dashboard'; // Importa o Dashboard

export default function Home() {
  const [selectedPage, setSelectedPage] = useState('Acompanhamento');

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar selectedPage={selectedPage} setSelectedPage={setSelectedPage} />

      <div className="flex-1 p-10 bg-white shadow-lg rounded-lg">
        {selectedPage === 'Dashboard' && <Dashboard />}
        {selectedPage === 'Cadastro' && <CadastroOP />}
        {selectedPage === 'Acompanhamento' && <AcompanhamentoOP />}
        {selectedPage === 'CadastroProduto' && <CadastroProduto />}
        {selectedPage === 'Estoque' && <Estoque />} {/* Adiciona o Estoque */}
      </div>
    </div>
  );
}
