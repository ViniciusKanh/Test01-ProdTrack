// src/app/api/orders/route.js

let orders = [
    { id: 1, orderNumber: 'OP001', description: 'Cadeira de Madeira', quantity: 10, status: 'Concluída' },
    { id: 2, orderNumber: 'OP002', description: 'Mesa de Jantar', quantity: 5, status: 'Em produção' },
    { id: 3, orderNumber: 'OP003', description: 'Sofá de Couro', quantity: 2, status: 'Em espera' },
    { id: 4, orderNumber: 'OP004', description: 'Armário de Cozinha', quantity: 7, status: 'Concluída' },
    { id: 5, orderNumber: 'OP005', description: 'Cama de Casal', quantity: 3, status: 'Em espera' },
    { id: 6, orderNumber: 'OP006', description: 'Estante para Livros', quantity: 12, status: 'Em produção' },
    { id: 7, orderNumber: 'OP007', description: 'Mesa de Centro', quantity: 8, status: 'Concluída' },
    { id: 8, orderNumber: 'OP008', description: 'Poltrona de Madeira', quantity: 6, status: 'Em produção' },
    { id: 9, orderNumber: 'OP009', description: 'Mesa de Escritório', quantity: 4, status: 'Em espera' },
    { id: 10, orderNumber: 'OP010', description: 'Guarda-Roupa de Madeira', quantity: 1, status: 'Concluída' },
  ];
  
  export async function GET(request) {
    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  export async function POST(request) {
    const newOrder = await request.json();
    newOrder.id = orders.length + 1;
    orders.push(newOrder);
  
    return new Response(JSON.stringify({ message: 'OP criada com sucesso' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  