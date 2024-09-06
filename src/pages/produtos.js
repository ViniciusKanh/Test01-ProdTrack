import { useState } from 'react';

export default function CadastroProduto() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');

  // Função para formatar o preço como Real Brasileiro
  const formatPriceInput = (value) => {
    const numberValue = value.replace(/\D/g, ''); // Remove tudo que não for número
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numberValue / 100); // Divide por 100 para ter o valor correto em centavos
    return formattedValue;
  };

  const handlePriceChange = (e) => {
    const formattedPrice = formatPriceInput(e.target.value);
    setProductPrice(formattedPrice);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Remove os símbolos de moeda para enviar apenas o valor numérico
    const priceToSend = parseFloat(
      productPrice.replace(/[R$\s]/g, '').replace(',', '.')
    );

    const productData = {
      name: productName,
      description: productDescription,
      price: priceToSend,
    };

    console.log('Enviando dados para o servidor:', productData); // Log dos dados sendo enviados

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const result = await response.json();
      console.log('Resposta do servidor:', result); // Verificar a resposta do servidor

      if (response.ok) {
        alert('Produto cadastrado com sucesso!');
        setProductName('');
        setProductDescription('');
        setProductPrice('');
      } else {
        alert(`Erro: ${result.message}`);
      }
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error); // Log dos erros no console
      alert('Erro ao cadastrar produto. Tente novamente.');
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Cadastro de Produto</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xl font-medium text-gray-700">Nome do Produto</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg mt-2 text-gray-700"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-xl font-medium text-gray-700">Descrição</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg mt-2 text-gray-700"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-xl font-medium text-gray-700">Preço</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg mt-2 text-gray-700"
            value={productPrice}
            onChange={handlePriceChange}
            required
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
}
