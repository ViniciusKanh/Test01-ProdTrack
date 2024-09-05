'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import CadastroOP from '../pages/CadastroOP';
import AcompanhamentoOP from '../pages/AcompanhamentoOP';

export default function Home() {
  const [selectedPage, setSelectedPage] = useState('Acompanhamento');

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar selectedPage={selectedPage} setSelectedPage={setSelectedPage} />

      {/* Conteúdo Principal */}
      <div className="flex-1 p-10 bg-white shadow-lg rounded-lg">
        {selectedPage === 'Cadastro' && <CadastroOP />}
        {selectedPage === 'Acompanhamento' && <AcompanhamentoOP />}
      </div>
    </div>
  );
}
