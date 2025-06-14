# 📚 **FarmCristo — API Backend**

---

## 🚀 **Como rodar o projeto**

---

### ✅ **Rodando localmente (sem Docker)**

1. Instale as dependências:

```bash
npm install
```

2. Configure seu banco PostgreSQL local com os seguintes dados:

```
Host:     localhost
Porta:    5432
Usuário:  postgres
Senha:    postgres
Banco:    farm_cristo
```

3. Inicie o servidor em modo desenvolvimento:

```bash
npm run dev
```

Acesse a aplicação em:
📍 `http://localhost:8000`

---

### 🐳 **Rodando com Docker**

1. Suba os containers:

```bash
docker-compose up --build
```

2. Acesse a API:
   📍 `http://localhost:8000`

3. String de conexão utilizada no ambiente Docker:

```env
DATABASE_URL=postgres://postgres:postgres@postgres:5432/farm_cristo
```

---

## 🗄️ **Acessando o Banco de Dados via DBeaver**

1. Abra o DBeaver.
2. Clique em ➕ **Nova Conexão**.
3. Escolha **PostgreSQL**.
4. Preencha os dados de conexão:

```
Host:     localhost
Porta:    5432
Database: farm_cristo
Usuário:  postgres
Senha:    postgres
```

5. Clique em **Testar Conexão** → Se der OK, clique em **Finalizar**.
6. No painel lateral navegue em:

```
farm_cristo ➝ Schemas ➝ public ➝ Tables ➝ users
```

7. Clique com o botão direito em **users** → **Visualizar Dados** → **Todas as linhas**.

---

## 🧠 **Acessando a documentação Swagger**

Acesse via navegador:
📍 `http://localhost:8000/api-docs`

Na interface do Swagger você pode:

- Visualizar a documentação dos endpoints.
- Realizar testes diretamente pela interface.
- Validar payloads, respostas e headers.

---

## 🏗️ **Estrutura de Pastas**

```plaintext
src/
│
├── config/                # Configurações (DB, Swagger)
│
├── modules/               # Domínios da aplicação
│   └── auth/              # Módulo de autenticação
│       ├── controller/    # Controllers
│       ├── dtos/          # Tipagens
│       ├── entities/      # Models (separação futura)
│       ├── middlewares/   # Middlewares
│       ├── repositories/  # Acesso ao banco
│       ├── routes/        # Rotas
│       ├── services/      # Lógica de negócio
│       └── utils/         # Utilitários
│
├── routes/                # Agrupamento de rotas globais
├── shared/                # Middlewares e helpers globais
│
├── app.ts                 # Configuração da aplicação
├── server.ts              # Inicialização do servidor
│
├── Dockerfile             # Build do container
├── docker-compose.yml     # Orquestração dos serviços
├── .env                   # Variáveis de ambiente
│
└── README.md              # Documentação
```

---

## 🔑 **Variáveis de ambiente obrigatórias (.env)**

```env
DATABASE_URL=postgres://postgres:postgres@postgres:5432/farm_cristo
JWT_SECRET=sua_chave_secreta
MASTER_KEY=sua_master_key_secreta
```

---

## 🔥 **URLs importantes**

- API Base: `http://localhost:8000`
- Swagger (Documentação): `http://localhost:8000/api-docs`
