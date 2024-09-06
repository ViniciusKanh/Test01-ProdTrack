import { promises as fs } from 'fs';
import path from 'path';

// Caminho para o arquivo JSON onde as ordens de produção são armazenadas
const ordersFilePath = path.join(process.cwd(), 'orders.json');

// Função para carregar as ordens de produção
async function loadOrders() {
  try {
    const data = await fs.readFile(ordersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('Arquivo orders.json não encontrado. Criando um novo arquivo...');
      await fs.writeFile(ordersFilePath, JSON.stringify([], null, 2));
      return [];
    } else {
      throw error;
    }
  }
}

// Função para salvar as ordens de produção
async function saveOrders(orders) {
  const data = JSON.stringify(orders, null, 2);
  await fs.writeFile(ordersFilePath, data, 'utf8');
}

// GET: Retorna todas as ordens de produção
export async function GET(request) {
  try {
    const orders = await loadOrders();
    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erro ao carregar ordens de produção:', error);
    return new Response(JSON.stringify({ message: 'Erro ao carregar ordens de produção.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// POST: Adiciona uma nova ordem de produção
export async function POST(request) {
  try {
    const newOrder = await request.json();
    
    if (!newOrder.orderNumber || !newOrder.product || !newOrder.quantity || !newOrder.status) {
      return new Response(JSON.stringify({ message: 'Campos obrigatórios ausentes.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const orders = await loadOrders();
    
    // Atribui um ID incremental para cada nova OP
    newOrder.id = orders.length ? orders[orders.length - 1].id + 1 : 1;
    
    // Adiciona a nova ordem à lista
    orders.push(newOrder);
    await saveOrders(orders);

    return new Response(JSON.stringify({ message: 'Ordem de produção cadastrada com sucesso.' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erro ao cadastrar ordem de produção:', error);
    return new Response(JSON.stringify({ message: 'Erro ao cadastrar ordem de produção.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// PUT: Atualiza o status de uma ordem de produção
export async function PUT(request) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return new Response(JSON.stringify({ message: 'ID e status são obrigatórios.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const orders = await loadOrders();
    const orderIndex = orders.findIndex((order) => order.id === id);

    if (orderIndex === -1) {
      return new Response(JSON.stringify({ message: 'Ordem não encontrada.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Atualiza o status da ordem
    orders[orderIndex].status = status;
    await saveOrders(orders);

    return new Response(JSON.stringify({ message: 'Status atualizado com sucesso.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erro ao atualizar a ordem:', error);
    return new Response(JSON.stringify({ message: 'Erro ao atualizar a ordem.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
