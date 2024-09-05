// src/pages/AcompanhamentoOP.js

import { useState, useEffect } from 'react';

export default function AcompanhamentoOP() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) {
          throw new Error('Erro ao buscar ordens de produção');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const updateOrderStatus = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleStatusChange = (id, currentStatus, newStatus) => {
    if (currentStatus === 'Concluída') {
      if (newStatus !== 'Concluída') {
        const confirmation = window.confirm('Esta OP já está concluída. Você tem certeza que quer mudar o status?');
        if (confirmation) {
          const password = window.prompt('Digite a senha do responsável pela produção:');
          if (password === 'senha123') {
            updateOrderStatus(id, newStatus);
            alert('Status alterado com sucesso.');
          } else {
            alert('Senha incorreta. Alteração não realizada.');
          }
        }
      }
    } else if (newStatus === 'Concluída') {
      const confirmation = window.confirm('Você está prestes a concluir esta OP. Tem certeza?');
      if (confirmation) {
        updateOrderStatus(id, newStatus);
        alert('OP marcada como concluída.');
      }
    } else {
      updateOrderStatus(id, newStatus);
    }
  };

  if (loading) {
    return <div>Carregando ordens de produção...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  // Separar as ordens por status
  const ordersInProduction = orders.filter((order) => order.status === 'Em produção');
  const ordersCompleted = orders.filter((order) => order.status === 'Concluída');
  const ordersOnHold = orders.filter((order) => order.status === 'Em espera');

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Acompanhamento de OP - Segmento de Móveis</h1>

      {/* Bloco de ordens "Em Produção" */}
      <div className="mb-10">
        <h2 className="text-3xl font-semibold text-blue-600 mb-6">Em Produção</h2>
        <ul className="space-y-6">
          {ordersInProduction.map((order) => (
            <li
              key={order.id}
              className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
            >
              <h3 className="text-2xl font-semibold text-gray-800">{order.orderNumber} - {order.description}</h3>
              <p className="text-gray-600">Quantidade: {order.quantity}</p>
              <p className="text-gray-600">Status: {order.status}</p>
              <div className="mt-4 flex space-x-4">
                <button
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => handleStatusChange(order.id, order.status, 'Em produção')}
                >
                  Em produção
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                  onClick={() => handleStatusChange(order.id, order.status, 'Concluída')}
                >
                  Concluída
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
                  onClick={() => handleStatusChange(order.id, order.status, 'Em espera')}
                >
                  Em espera
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Bloco de ordens "Concluída" */}
      <div className="mb-10">
        <h2 className="text-3xl font-semibold text-green-600 mb-6">Concluída</h2>
        <ul className="space-y-6">
          {ordersCompleted.map((order) => (
            <li
              key={order.id}
              className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
            >
              <h3 className="text-2xl font-semibold text-gray-800">{order.orderNumber} - {order.description}</h3>
              <p className="text-gray-600">Quantidade: {order.quantity}</p>
              <p className="text-gray-600">Status: {order.status}</p>
              <div className="mt-4 flex space-x-4">
                <button
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                  onClick={() => handleStatusChange(order.id, order.status, 'Em produção')}
                >
                  Em produção
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-green-600 text-white"
                  onClick={() => handleStatusChange(order.id, order.status, 'Concluída')}
                >
                  Concluída
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
                  onClick={() => handleStatusChange(order.id, order.status, 'Em espera')}
                >
                  Em espera
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Bloco de ordens "Em Espera" */}
      <div className="mb-10">
        <h2 className="text-3xl font-semibold text-gray-600 mb-6">Em Espera</h2>
        <ul className="space-y-6">
          {ordersOnHold.map((order) => (
            <li
              key={order.id}
              className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
            >
              <h3 className="text-2xl font-semibold text-gray-800">{order.orderNumber} - {order.description}</h3>
              <p className="text-gray-600">Quantidade: {order.quantity}</p>
              <p className="text-gray-600">Status: {order.status}</p>
              <div className="mt-4 flex space-x-4">
                <button
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                  onClick={() => handleStatusChange(order.id, order.status, 'Em produção')}
                >
                  Em produção
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                  onClick={() => handleStatusChange(order.id, order.status, 'Concluída')}
                >
                  Concluída
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-gray-600 text-white"
                  onClick={() => handleStatusChange(order.id, order.status, 'Em espera')}
                >
                  Em espera
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
