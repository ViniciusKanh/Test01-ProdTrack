export const GET = async () => {
  const orders = [
    { id: 1, description: 'Produto A', quantity: 10, status: 'Em espera' },
    { id: 2, description: 'Produto B', quantity: 20, status: 'Em produção' },
    { id: 3, description: 'Produto C', quantity: 5, status: 'Concluída' },
  ];

  return new Response(JSON.stringify(orders), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
