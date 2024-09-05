// src/pages/CadastroOP.js

import { useState } from 'react';

export default function CadastroOP() {
  const [orderNumber, setOrderNumber] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newOrder = {
      orderNumber,
      description,
      quantity,
      status: 'Em espera', // Novo OP sempre começa como 'Em espera'
    };

    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder),
    });

    if (response.ok) {
      alert(`OP cadastrada com sucesso:\nNúmero: ${orderNumber}\nDescrição: ${description}\nQuantidade: ${quantity}`);
      setOrderNumber('');
      setDescription('');
      setQuantity('');
    } else {
      alert('Erro ao cadastrar OP. Tente novamente.');
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Cadastro de OP</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xl font-medium text-gray-700">Número da OP</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg mt-2 text-gray-700"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-xl font-medium text-gray-700">Descrição</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg mt-2 text-gray-700"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-xl font-medium text-gray-700">Quantidade</label>
          <input
            type="number"
            className="w-full p-3 border rounded-lg mt-2 text-gray-700"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Cadastrar OP
        </button>
      </form>
    </div>
  );
}
