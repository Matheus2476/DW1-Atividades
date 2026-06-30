// =====================================================
// SERVIDOR EXPRESS PRINCIPAL
// Arquivo: server.js
// =====================================================

const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

// Importar rotas
const livrosRoutes = require('./routes/livros');
const categoriasRoutes = require('./routes/categorias');
const clientesRoutes = require('./routes/clientes');
const operacoesRoutes = require('./routes/operacoes');
const authRoutes = require('./routes/auth');
const carrinhoRoutes = require('./routes/carrinho');
const checkoutRoutes = require('./routes/checkout');
const { testConnection } = require('./database/connection');
const { initializeDatabase } = require('./database/init');

// Criar aplicação Express
const app = express();
const DEFAULT_PORT = Number(process.env.PORT) || 3000;

// =====================================================
// MIDDLEWARE
// =====================================================

// CORS - Permitir requisições de diferentes origens
app.use(cors());

// Middleware para servir arquivos estáticos (HTML, CSS, JS, imagens)
app.use(express.static('public'));

// Middleware para parsear JSON
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'livraria-dw1-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 8 }
}));

// =====================================================
// ROTAS
// =====================================================

// Rota de teste (GET /)
app.get('/', (req, res) => {
    res.json({ 
        mensagem: 'Bem-vindo ao API da Livraria DW1',
        versao: '1.0.0',
        endpoints: {
            livros: 'GET /api/livros',
            livrosPorCategoria: 'GET /api/livros/:id',
            categorias: 'GET /api/categorias'
        }
    });
});

// Usar rotas de livros
app.use('/api/livros', livrosRoutes);
app.use('/livros', livrosRoutes);

// Usar rotas de categorias
app.use('/api/categorias', categoriasRoutes);
app.use('/categorias', categoriasRoutes);

// Usar rotas de clientes e operações
app.use('/api/clientes', clientesRoutes);
app.use('/api/operacoes', operacoesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/carrinho', carrinhoRoutes);
app.use('/api/checkout', checkoutRoutes);

// =====================================================
// TRATAMENTO DE ERROS - Rota não encontrada (404)
// =====================================================

app.use((req, res) => {
    res.status(404).json({ 
        erro: 'Rota não encontrada',
        caminho: req.originalUrl,
        metodo: req.method
    });
});

// =====================================================
// INICIAR SERVIDOR
// =====================================================

async function startServer(port = DEFAULT_PORT) {
    try {
        await testConnection();
        await initializeDatabase();

        const server = app.listen(port, () => {
            process.env.PORT = String(port);
            console.log(`
            ╔════════════════════════════════════════╗
            ║   🚀 SERVIDOR LIVRARIA DW1 INICIADO   ║
            ║                                        ║
            ║   📍 http://localhost:${port}           ║
            ║   🗄️  PostgreSQL conectado              ║
            ║                                        ║
            ╚════════════════════════════════════════╝
            `);
        });

        server.on('error', (erro) => {
            if (erro.code === 'EADDRINUSE') {
                const nextPort = port + 1;
                console.warn(`⚠️ Porta ${port} já está em uso. Tentando usar a porta ${nextPort}...`);
                startServer(nextPort);
            } else {
                console.error('Erro ao iniciar o servidor:', erro.message);
                process.exit(1);
            }
        });
    } catch (erro) {
        console.error('Falha ao iniciar o servidor:', erro.message);
        process.exit(1);
    }
}

startServer();

// Exportar para uso em testes (se necessário)
module.exports = app;
