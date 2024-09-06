// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import * as XLSX from 'xlsx';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('/api/orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Erro ao buscar ordens de produção:', error);
      }
    }
    fetchOrders();
  }, []);

  const statusCounts = {
    Concluída: 0,
    'Em produção': 0,
    'Em espera': 0,
  };

  orders.forEach((order) => {
    statusCounts[order.status] += order.quantity;
  });

  const chartData = {
    labels: ['Concluída', 'Em Produção', 'Em Espera'],
    datasets: [
      {
        label: 'Quantidade de OPs',
        data: [statusCounts.Concluída, statusCounts['Em produção'], statusCounts['Em espera']],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'],
      },
    ],
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(orders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ordens');
    XLSX.writeFile(workbook, 'ordens_producao.xlsx');
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Dashboard de Produção</h1>

      {/* Gráfico */}
      <div className="mb-10 w-full flex justify-center">
        <div className="bg-white p-6 shadow-lg rounded-lg w-full md:w-3/4 lg:w-1/2">
          <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">Status das OPs</h2>
          <Bar data={chartData} />
        </div>
      </div>

      {/* Tabela com as OPs */}
      <div className="mb-10 overflow-x-auto">
        <div className="bg-white p-6 shadow-lg rounded-lg w-full">
          <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">Tabela de Produtos e Status</h2>
          <table className="min-w-full bg-white text-gray-800">
            <thead>
              <tr>
                <th className="p-4 border-b text-left">ID</th>
                <th className="p-4 border-b text-left">Produto</th>
                <th className="p-4 border-b text-left">Status</th>
                <th className="p-4 border-b text-left">Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="p-4 border-b">{order.id}</td>
                  <td className="p-4 border-b">{order.product}</td>
                  <td className="p-4 border-b">{order.status}</td>
                  <td className="p-4 border-b">{order.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Botão para exportar para Excel */}
      <div className="flex justify-center mt-4">
        <button
          onClick={exportToExcel}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Exportar para Excel
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
