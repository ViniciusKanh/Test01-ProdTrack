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
      throw error; // Lança o erro para ser capturado mais adiante
    }
  }
}

// Função para salvar os produtos
async function saveProducts(products) {
  const data = JSON.stringify(products, null, 2);
  console.log('Tentando salvar os produtos no arquivo JSON:', data); // Verifica o que está sendo salvo
  try {
    await fs.writeFile(productsFilePath, data, 'utf8');
    console.log('Produtos salvos com sucesso no arquivo JSON.');
  } catch (error) {
    console.error('Erro ao salvar os produtos:', error);
    throw error; // Lança o erro para ser capturado mais adiante
  }
}

// Função principal que lida com requisições HTTP
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Lidar com requisições POST para adicionar um novo produto
    try {
      const { name, description, price } = req.body;

      console.log('Dados recebidos no servidor:', { name, description, price });

      if (!name || !description || !price) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
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

      res.status(201).json({ message: 'Produto cadastrado com sucesso.' });
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      res.status(500).json({ message: 'Erro ao cadastrar produto.' });
    }
  } else if (req.method === 'GET') {
    // Lidar com requisições GET para obter todos os produtos
    try {
      const products = await loadProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      res.status(500).json({ message: 'Erro ao carregar produtos.' });
    }
  } else {
    // Método não suportado
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
