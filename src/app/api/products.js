import { promises as fs } from 'fs';
import path from 'path';

// Caminho para o arquivo JSON onde os produtos serão armazenados
const productsFilePath = path.join(process.cwd(), 'products.json');

// Função para carregar os produtos
async function loadProducts() {
  try {
    const data = await fs.readFile(productsFilePath, 'utf8');
    console.log('Dados carregados do arquivo JSON:', data); // Verifica o conteúdo do arquivo
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('Arquivo products.json não encontrado. Criando um novo arquivo...');
      await fs.writeFile(productsFilePath, JSON.stringify([], null, 2));
      return [];
    } else {
      console.error('Erro ao carregar os produtos:', error);
      throw error;
    }
  }
}

// Função para salvar os produtos
async function saveProducts(products) {
  const data = JSON.stringify(products, null, 2);
  console.log('Salvando produtos no arquivo JSON:', data); // Verifica o que está sendo salvo
  try {
    await fs.writeFile(productsFilePath, data, 'utf8');
    console.log('Produtos salvos com sucesso.');
  } catch (error) {
    console.error('Erro ao salvar os produtos:', error);
    throw error;
  }
}

// POST: Adiciona um novo produto
export async function POST(request) {
  try {
    const { name, description, price } = await request.json();
    console.log('Dados recebidos no servidor:', { name, description, price });

    if (!name || !description || !price) {
      console.log('Erro: campos obrigatórios faltando');
      return new Response(JSON.stringify({ message: 'Todos os campos são obrigatórios.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Carregar produtos existentes
    const products = await loadProducts();
    console.log('Produtos antes de adicionar:', products);

    // Criar novo produto
    const newProduct = {
      id: products.length + 1,
      name,
      description,
      price: parseFloat(price),
    };

    // Adicionar novo produto
    products.push(newProduct);
    console.log('Novo produto adicionado:', newProduct);

    // Salvar produtos atualizados
    await saveProducts(products);

    return new Response(JSON.stringify({ message: 'Produto cadastrado com sucesso.' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    return new Response(JSON.stringify({ message: 'Erro ao cadastrar produto.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
