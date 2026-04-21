import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';

const PORT = 3000;

// Data Statis untuk Latihan
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
];

const products = [
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Mouse' }
];

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    // --- 3. MIDDLEWARE: LOG WAKTU & DURASI ---
    const start = process.hrtime(); 
    const url = req.url || '/';
    const method = req.method || 'GET';

    // Event saat respons selesai terkirim
    res.on('finish', () => {
        const duration = process.hrtime(start);
        const durationInMs = (duration[0] * 1000 + duration[1] / 1e6).toFixed(2);
        console.log(`[NODEJS] [${new Date().toLocaleTimeString()}] ${method} ${url} - ${durationInMs}ms`);
    });

    // --- ROUTING ---

    // Rute: GET /
    if (url === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>🏠 Halaman Utama (Node.js)</h1><p>Server ini berjalan di port 3000.</p>');
    }

    // Latihan 1: GET /products
    else if (url === '/products' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(products));
    }

    // Latihan 1: POST /products (Simulasi)
    else if (url === '/products' && method === 'POST') {
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Produk berhasil ditambahkan (Node.js)' }));
    }

    // Latihan 2: GET /users/:id (Parameter Dinamis)
    else if (url.startsWith('/users/') && method === 'GET') {
        const parts = url.split('/'); 
        const userId = parseInt(parts[2]); 
        const user = users.find(u => u.id === userId);

        if (user) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'User tidak ditemukan di Node.js' }));
        }
    }

    // Rute: GET /about
    else if (url === '/about' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>📄 Tentang Kami</h1>');
    }

    // Default 404
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>❌ 404 - Not Found</h1>');
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Server Node.js berjalan di http://localhost:${PORT}`);
});