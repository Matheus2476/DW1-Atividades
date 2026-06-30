# 📚 Livraria DW1 - Sistema de Catálogo de Livros

## 📋 Descrição do Projeto

Projeto desenvolvido para a disciplina de **Desenvolvimento Web 1 (DW1)** do **2º Bimestre de 2026**.

Sistema completo de catálogo de livros com:
- **Front-end**: HTML5 semântico, CSS responsivo, JavaScript com Fetch API
- **Back-end**: Node.js com Express
- **Banco de Dados**: PostgreSQL com relacionamento entre tabelas

---

## 🎯 Requisitos Atendidos

✅ **Front-end:**
- HTML5 semântico com tags obrigatórias: `<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`
- CSS separado e responsivo
- JavaScript separado com Fetch API
- 3 chamadas ao servidor usando Fetch API
- Mínimo 2 imagens (ícones de livros)
- Cabeçalho com nome do projeto
- Rodapé com nome do aluno

✅ **Back-end:**
- Node.js com Express
- 3 rotas GET que retornam JSON
- Consultas no banco de dados

✅ **Banco de Dados:**
- PostgreSQL
- 2 tabelas relacionadas: `categorias` e `livros`
- Arquivo DDL com definição das tabelas
- Arquivo de INSERTs com dados de teste (12 categorias, 30 livros)
- Apenas SELECTs no sistema

---

## 📁 Estrutura do Projeto

```
Livraria-dw1/
│
├── server.js                  # Servidor Express principal
├── package.json               # Dependências do projeto
├── .env                      # Variáveis de ambiente
├── .gitignore               # Arquivos ignorados no Git
│
├── database/
│   ├── ddl.sql              # Estrutura do banco de dados
│   ├── inserts.sql          # Dados de teste
│   └── connection.js        # Conexão com PostgreSQL
│
├── routes/
│   ├── livros.js            # Rotas de livros
│   └── categorias.js        # Rotas de categorias
│
├── controllers/
│   ├── livrosController.js      # Lógica de livros
│   └── categoriasController.js  # Lógica de categorias
│
├── public/
│   ├── index.html           # Página principal
│   ├── css/
│   │   └── style.css        # Estilos da aplicação
│   ├── js/
│   │   └── script.js        # JavaScript com Fetch API
│   └── imagens/             # Pasta para imagens
│
└── README.md                # Este arquivo
```

---

## 🚀 Como Configurar e Executar

### 1️⃣ Pré-requisitos

- **Node.js** (v14 ou superior)
- **PostgreSQL** (v12 ou superior)
- **npm** (gerenciador de pacotes)

### 2️⃣ Instalação do PostgreSQL e Criação do Banco

```bash
# Criar o banco de dados
CREATE DATABASE livraria_dw1;

# Conectar ao banco
\c livraria_dw1;

# Executar o DDL (copiar conteúdo de database/ddl.sql)
# Executar os INSERTs (copiar conteúdo de database/inserts.sql)
```

### 3️⃣ Configurar Variáveis de Ambiente

Editar o arquivo `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui
DB_NAME=livraria_dw1
PORT=3000
NODE_ENV=development
```

### 4️⃣ Instalar Dependências

```bash
npm install
```

### 5️⃣ Executar o Servidor

```bash
npm start
```

A aplicação estará disponível em: **http://localhost:3000**

---

## 📡 Endpoints da API

### 1. Listar Todos os Livros
```
GET http://localhost:3000/api/livros
```

**Resposta:**
```json
{
  "sucesso": true,
  "mensagem": "30 livros encontrados",
  "quantidade": 30,
  "dados": [
    {
      "id_livro": 1,
      "titulo": "Fundação",
      "autor": "Isaac Asimov",
      "ano_publicacao": 1951,
      "preco": "89.90",
      "descricao": "Clássico da ficção científica...",
      "id_categoria": 1,
      "categoria": "Ficção Científica"
    },
    ...
  ]
}
```

### 2. Buscar um Livro Específico por ID
```
GET http://localhost:3000/api/livros/:id
```

**Exemplo:**
```
GET http://localhost:3000/api/livros/1
```

**Resposta:**
```json
{
  "sucesso": true,
  "mensagem": "Livro encontrado",
  "dados": {
    "id_livro": 1,
    "titulo": "Fundação",
    "autor": "Isaac Asimov",
    "ano_publicacao": 1951,
    "preco": "89.90",
    "descricao": "Clássico da ficção científica sobre impérios galácticos",
    "id_categoria": 1,
    "categoria": "Ficção Científica"
  }
}
```

### 3. Listar Todas as Categorias
```
GET http://localhost:3000/api/categorias
```

**Resposta:**
```json
{
  "sucesso": true,
  "mensagem": "12 categorias encontradas",
  "quantidade": 12,
  "dados": [
    {
      "id_categoria": 1,
      "nome": "Ficção Científica",
      "descricao": "Livros de ficção científica e futurismos",
      "data_criacao": "2026-06-25T..."
    },
    ...
  ]
}
```

---

## 🧪 Como Testar a Aplicação

### 1. Testar via Interface Web
1. Abra o navegador em: **http://localhost:3000**
2. Clique nas abas para navegar entre seções
3. Use o botão "Recarregar" para buscar dados novamente
4. Digite um ID na seção "Buscar por ID" para procurar um livro específico

### 2. Testar via cURL (terminal)

```bash
# Listar todos os livros
curl http://localhost:3000/api/livros

# Buscar livro com ID 1
curl http://localhost:3000/api/livros/1

# Listar categorias
curl http://localhost:3000/api/categorias
```

### 3. Testar via Postman
1. Abra o Postman
2. Crie uma nova requisição GET
3. Cole a URL: `http://localhost:3000/api/livros`
4. Clique em "Send"

---

## 🔍 Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| **Node.js** | 14+ | Runtime JavaScript |
| **Express** | 4.18.2 | Framework para servidor web |
| **PostgreSQL** | 12+ | Banco de dados relacional |
| **pg** | 8.11.3 | Driver PostgreSQL para Node.js |
| **dotenv** | 16.3.1 | Gerenciador de variáveis de ambiente |
| **CORS** | 2.8.5 | Habilitação de requisições entre origens |

---

## 📊 Modelo de Dados

### Tabela: categorias
```sql
- id_categoria (PK)
- nome (VARCHAR, UNIQUE)
- descricao (VARCHAR)
- data_criacao (TIMESTAMP)
```

### Tabela: livros
```sql
- id_livro (PK)
- titulo (VARCHAR)
- autor (VARCHAR)
- ano_publicacao (INTEGER)
- preco (DECIMAL)
- descricao (TEXT)
- id_categoria (FK → categorias)
- data_cadastro (TIMESTAMP)
```

**Relacionamento:** Muitos Livros para Uma Categoria (Many-to-One)

---

## ✨ Funcionalidades do Front-end

1. **Listar Todos os Livros**
   - Exibe todos os livros em cards com informações
   - Mostra autor, categoria, preço e ano de publicação

2. **Listar Categorias**
   - Exibe todas as categorias de livros
   - Mostra nome e descrição

3. **Buscar Livro por ID**
   - Campo de entrada para ID
   - Exibe detalhes completos do livro
   - Mensagem de erro se não encontrado

4. **Status da API**
   - Indicador visual se servidor está online/offline
   - Contagem de livros e categorias carregadas

---

## 🎨 Design Responsivo

- ✅ Funciona em desktops
- ✅ Funciona em tablets
- ✅ Funciona em dispositivos móveis
- ✅ Interface intuitiva e amigável

---

## 🐛 Troubleshooting

### "Connection refused"
Verifique se:
- PostgreSQL está rodando
- As credenciais em `.env` estão corretas
- O banco de dados `livraria_dw1` foi criado

### "Cannot find module 'express'"
Execute:
```bash
npm install
```

### "Port 3000 already in use"
Mude a porta em `.env` ou encerre o processo que está usando a porta 3000

---

## 📝 Notas Importantes

- O projeto foi desenvolvido seguindo os requisitos exatos da disciplina DW1
- Não utiliza frameworks front-end (apenas HTML, CSS, JS vanilla)
- Utiliza apenas operações SELECT no banco (sem INSERT, UPDATE, DELETE nas rotas)
- A aplicação está pronta para apresentação e demonstração

---

## 👨‍💻 Autor

**Seu Nome**  
Disciplina: Desenvolvimento Web 1  
Período: 2º Bimestre / 2026  
Instituição: [Seu Instituto]

---

## 📄 Licença

MIT License - Veja LICENSE para mais detalhes

---

## 📞 Contato

Para dúvidas ou sugestões sobre este projeto, entre em contato com o desenvolvedor.

---

**Última atualização:** 25 de junho de 2026
