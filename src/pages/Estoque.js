import { useState, useEffect } from 'react';

export default function Estoque() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/orders'); // Busca as OPs
        if (!response.ok) {
          throw new Error('Erro ao buscar as ordens de produção');
        }
        const data = await response.json();
        setProducts(data); // Define o array de ordens
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Carregando estoque...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  // Filtra estoque liberado (OPs concluídas) e bloqueado (em produção e em espera)
  const filteredProducts = products.filter(
    (product) =>
      selectedProduct === '' || product.product === selectedProduct
  );
  const estoqueLiberado = filteredProducts.filter((order) => order.status === 'Concluída');
  const estoqueBloqueado = filteredProducts.filter((order) => order.status !== 'Concluída');

  // Contagem de itens liberados e bloqueados
  const totalLiberado = estoqueLiberado.reduce((sum, item) => sum + item.quantity, 0);
  const totalBloqueado = estoqueBloqueado.reduce((sum, item) => sum + item.quantity, 0);
  const totalEstoque = totalLiberado + totalBloqueado;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Estoque de Produtos</h1>

      {/* Resumo do Estoque */}
      <div className="mb-6 bg-blue-50 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700">Resumo do Estoque</h2>
        <p className="text-lg text-gray-600">Estoque Total: {totalEstoque} itens</p>
        <p className="text-lg text-gray-600">Estoque Liberado: {totalLiberado} itens</p>
        <p className="text-lg text-gray-600">Estoque Bloqueado: {totalBloqueado} itens</p>
      </div>

      {/* Dropdown de Seleção de Produto */}
      <div className="mb-6">
        <label className="block text-xl font-medium text-gray-700">Selecione o Produto</label>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="w-full p-3 border rounded-lg mt-2 text-gray-700"
        >
          <option value="">Todos</option>
          {products.map((order) => (
            <option key={order.id} value={order.product}>
              {order.product}
            </option>
          ))}
        </select>
      </div>

      {/* Tabela de Estoque Liberado */}
      <div className="mb-10">
        <h2 className="text-3xl font-semibold text-green-600 mb-6">Estoque Liberado (Concluídas)</h2>
        {estoqueLiberado.length > 0 ? (
          <ul className="space-y-4">
            {estoqueLiberado.map((order) => (
              <li key={order.id} className="bg-white p-6 rounded-lg shadow-md transition transform hover:scale-105">
                <h3 className="text-2xl font-bold text-green-800">{order.product}</h3>
                <p className="text-lg text-gray-600">Quantidade: {order.quantity}</p>
                <p className="text-sm text-gray-500">Status: {order.status}</p>
                <p className="text-lg font-bold text-gray-700">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">OP: {order.orderNumber}</span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Nenhuma OP concluída.</p>
        )}
      </div>

      {/* Tabela de Estoque Bloqueado */}
      <div className="mb-10">
        <h2 className="text-3xl font-semibold text-red-600 mb-6">Estoque Bloqueado (Em Produção ou Em Espera)</h2>
        {estoqueBloqueado.length > 0 ? (
          <ul className="space-y-4">
            {estoqueBloqueado.map((order) => (
              <li key={order.id} className="bg-white p-6 rounded-lg shadow-md transition transform hover:scale-105">
                <h3 className="text-2xl font-bold text-red-800">{order.product}</h3>
                <p className="text-lg text-gray-600">Quantidade: {order.quantity}</p>
                <p className="text-sm text-gray-500">Status: {order.status}</p>
                <p className="text-lg font-bold text-gray-700">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded">OP: {order.orderNumber}</span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Nenhuma OP em produção ou em espera.</p>
        )}
      </div>
    </div>
  );
}
