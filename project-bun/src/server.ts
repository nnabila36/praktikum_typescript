// Data Statis untuk Latihan
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
];

const products = [
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Mouse' }
];

const server = Bun.serve({
  port: 3001, // Latihan 4: Port berbeda dengan Node.js

  fetch(request) {
    // --- 3. MIDDLEWARE: LOG WAKTU ---
    const start = performance.now();
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // Fungsi Log yang dipanggil sebelum mengembalikan response
    const logInfo = () => {
        const duration = (performance.now() - start).toFixed(2);
        console.log(`[BUN] [${new Date().toLocaleTimeString()}] ${method} ${path} - ${duration}ms`);
    };

    // --- ROUTING ---

    // Rute: GET /
    if (path === '/' && method === 'GET') {
      logInfo();
      return new Response('<h1>🏠 Halaman Utama (Bun)</h1><p>Server ini berjalan di port 3001.</p>', {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    // Latihan 1: GET /products
    else if (path === '/products' && method === 'GET') {
      logInfo();
      return new Response(JSON.stringify(products), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Latihan 1: POST /products
    else if (path === '/products' && method === 'POST') {
      logInfo();
      return new Response(JSON.stringify({ message: 'Produk berhasil dibuat di Bun' }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Latihan 2: GET /users/:id (Parameter Dinamis)
    else if (path.startsWith('/users/') && method === 'GET') {
      const parts = path.split('/'); 
      
      // Menggunakan parts[2]! untuk meyakinkan TypeScript bahwa nilai ini ada
      const userId = parseInt(parts[2]!);
      const user = users.find(u => u.id === userId);

      logInfo();
      if (user) {
        return new Response(JSON.stringify(user), {
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        return new Response(JSON.stringify({ error: 'User tidak ditemukan di Bun' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // Default 404
    logInfo();
    return new Response('<h1>❌ 404 - Not Found (Bun)</h1>', {
      status: 404,
      headers: { 'Content-Type': 'text/html' },
    });
  },
});

console.log(`🚀 Server Bun berjalan di http://localhost:${server.port}`);