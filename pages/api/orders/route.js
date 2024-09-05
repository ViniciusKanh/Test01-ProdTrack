// src/app/api/orders/route.js

export async function GET(request) {
    return new Response(JSON.stringify({ message: 'API funcionando corretamente' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  