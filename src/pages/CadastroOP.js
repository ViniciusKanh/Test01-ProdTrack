import { useState, useEffect } from 'react';

export default function CadastroOP() {
  const [orderNumber, setOrderNumber] = useState(''); // O número da OP gerado automaticamente
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [lastOrderNumber, setLastOrderNumber] = useState(0); // Para armazenar o último número de OP registrado
  const [products, setProducts] = useState([]); // Lista de produtos carregados da API
  const [selectedProduct, setSelectedProduct] = useState(''); // Produto selecionado

  // Função para buscar o último número de OP
  useEffect(() => {
    async function fetchLastOrderNumber() {
      try {
        const response = await fetch('/api/orders');
        const data = await response.json();
        const lastOrder = data[data.length - 1]; // Pega o último OP registrado
        if (lastOrder) {
          const lastNumber = parseInt(lastOrder.orderNumber.replace('OP', '')); // Remove 'OP' e pega o número
          setLastOrderNumber(lastNumber);
        } else {
          setLastOrderNumber(0); // Se não houver nenhuma OP, começa de 0
        }
      } catch (error) {
        console.error('Erro ao buscar o último número de OP:', error);
      }
    }
    fetchLastOrderNumber();
  }, []);

  // Função para buscar os produtos da API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data); // Armazena os produtos carregados
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    }
    fetchProducts();
  }, []);

  // Geração automática do número da OP
  useEffect(() => {
    setOrderNumber(`OP${String(lastOrderNumber + 1).padStart(3, '0')}`);
  }, [lastOrderNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newOrder = {
      orderNumber,
      description,
      quantity: parseInt(quantity), // Garante que a quantidade seja um número
      product: selectedProduct,
      status: 'Em espera', // Novo OP sempre começa como 'Em espera'
    };
  
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });
  
      if (response.ok) {
        alert(`OP cadastrada com sucesso:\nNúmero: ${orderNumber}\nProduto: ${selectedProduct}\nDescrição: ${description}\nQuantidade: ${quantity}`);
        setLastOrderNumber(lastOrderNumber + 1); // Atualiza o número da última OP para a próxima geração
        setDescription('');
        setQuantity('');
        setSelectedProduct(''); // Reseta a seleção do produto
      } else {
        const result = await response.json();
        alert(`Erro: ${result.message}`);
      }
    } catch (error) {
      console.error('Erro ao cadastrar OP:', error);
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
            disabled // O número da OP é gerado automaticamente e não pode ser alterado manualmente
          />
        </div>
        <div>
          <label className="block text-xl font-medium text-gray-700">Produto</label>
          <select
            className="w-full p-3 border rounded-lg mt-2 text-gray-700"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            required
          >
            <option value="">Selecione um produto</option>
            {products.map((product) => (
              <option key={product.id} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
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
