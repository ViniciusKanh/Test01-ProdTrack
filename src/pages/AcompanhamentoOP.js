import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function AcompanhamentoOP() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de pesquisa

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) {
          throw new Error('Erro ao buscar ordens de produção');
        }
        const data = await response.json();
        
        // Define os dados corretamente
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const updateOrderStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/orders`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      });
      
      if (!response.ok) {
        throw new Error('Erro ao atualizar o status da OP.');
      }
  
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      Swal.fire('Erro', 'Não foi possível atualizar o status. Tente novamente.', 'error');
    }
  };

  const handleStatusChange = (id, currentStatus, newStatus) => {
    if (currentStatus === 'Concluída') {
      Swal.fire({
        title: 'OP Concluída',
        text: 'Digite a senha do responsável para alterar o status:',
        input: 'password',
        inputAttributes: {
          autocapitalize: 'off',
        },
        showCancelButton: true,
        confirmButtonText: 'Enviar',
        showLoaderOnConfirm: true,
      }).then((result) => {
        if (result.value !== 'senha123') {
          Swal.fire('Senha incorreta', 'A alteração não foi realizada.', 'error');
        } else {
          proceedWithStatusChange(id, currentStatus, newStatus);
        }
      });
    } else {
      proceedWithStatusChange(id, currentStatus, newStatus);
    }
  };

  const proceedWithStatusChange = (id, currentStatus, newStatus) => {
    Swal.fire({
      title: 'Confirmar mudança de status',
      text: `Tem certeza que deseja alterar o status de "${currentStatus}" para "${newStatus}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, alterar!',
      cancelButtonText: 'Não, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        updateOrderStatus(id, newStatus);
        Swal.fire('Alterado!', `O status foi alterado para "${newStatus}".`, 'success');
      }
    });
  };

  if (loading) {
    return <div>Carregando ordens de produção...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  // Filtra as ordens com base no termo de pesquisa
  const filteredOrders = orders.filter((order) =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Separar as ordens por status
  const ordersInProduction = filteredOrders.filter((order) => order.status === 'Em produção');
  const ordersCompleted = filteredOrders.filter((order) => order.status === 'Concluída');
  const ordersOnHold = filteredOrders.filter((order) => order.status === 'Em espera');

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Acompanhamento de OP - Segmento de Móveis</h1>

      {/* Campo de pesquisa */}
      <div className="mb-6">
        <label className="block text-xl font-medium text-gray-700">Pesquisar por OP ou Produto:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border rounded-lg mt-2 text-gray-700"
          placeholder="Digite o número da OP ou o nome do produto"
        />
      </div>

      {/* Bloco de ordens "Em Produção" */}
      <div className="mb-10">
        <h2 className="text-3xl font-semibold text-blue-600 mb-6">Em Produção</h2>
        <ul className="space-y-6">
          {ordersInProduction.length > 0 ? (
            ordersInProduction.map((order) => (
              <li
                key={order.id}
                className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
              >
                <h3 className="text-2xl font-semibold text-gray-800">
                  {order.orderNumber} - {order.product}
                </h3>
                <p className="text-gray-600">Descrição: {order.description}</p>
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
            ))
          ) : (
            <p className="text-gray-600">Nenhuma OP em produção.</p>
          )}
        </ul>
      </div>

      {/* Bloco de ordens "Concluída" */}
      <div className="mb-10">
        <h2 className="text-3xl font-semibold text-green-600 mb-6">Concluída</h2>
        <ul className="space-y-6">
          {ordersCompleted.length > 0 ? (
            ordersCompleted.map((order) => (
              <li
                key={order.id}
                className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
              >
                <h3 className="text-2xl font-semibold text-gray-800">
                  {order.orderNumber} - {order.product}
                </h3>
                <p className="text-gray-600">Descrição: {order.description}</p>
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
            ))
          ) : (
            <p className="text-gray-600">Nenhuma OP concluída.</p>
          )}
        </ul>
      </div>

      {/* Bloco de ordens "Em Espera" */}
      <div className="mb-10">
        <h2 className="text-3xl font-semibold text-gray-600 mb-6">Em Espera</h2>
        <ul className="space-y-6">
          {ordersOnHold.length > 0 ? (
            ordersOnHold.map((order) => (
              <li
                key={order.id}
                className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
              >
                <h3 className="text-2xl font-semibold text-gray-800">
                  {order.orderNumber} - {order.product}
                </h3>
                <p className="text-gray-600">Descrição: {order.description}</p>
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
            ))
          ) : (
            <p className="text-gray-600">Nenhuma OP em espera.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
