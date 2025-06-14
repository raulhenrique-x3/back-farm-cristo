# 📚 **Documentação — API FarmCristo**

---

## 🚀 **Como rodar o projeto**

---

### ✅ **Rodando sem Docker (modo local)**

1. Instale as dependências:

```bash
npm install
```

2. Certifique-se de que você tenha o PostgreSQL rodando localmente com as seguintes credenciais:

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

📍 A aplicação estará disponível em:

```
http://localhost:8000
```

---

### 🐳 **Rodando com Docker**

1. Suba os containers com Docker Compose:

```bash
docker-compose up --build
```

2. Acesse a aplicação no navegador:

```
http://localhost:8000
```

📌 **Importante:**
O banco de dados PostgreSQL estará disponível internamente para a aplicação via o host `postgres` (nome do serviço no `docker-compose`) na porta `5432`.

3. **String de conexão recomendada no `.env`:**

```env
DATABASE_URL=postgres://postgres:postgres@postgres:5432/farm_cristo
```

---

## 🗄️ **Como conectar no PostgreSQL via DBeaver**

---

### ✅ Dados de conexão:

- **Host:** `localhost`
- **Porta:** `5432`
- **Database:** `farm_cristo`
- **Usuário:** `postgres`
- **Senha:** `postgres`

---

### ✅ Passo a passo:

1. Abra o DBeaver.
2. Clique em ➕ **Nova Conexão**.
3. Escolha **PostgreSQL**.
4. Preencha os dados:

   - **Host:** `localhost`
   - **Port:** `5432`
   - **Database:** `farm_cristo`
   - **Usuário:** `postgres`
   - **Senha:** `postgres`

5. Clique em **Testar Conexão**.
   Se aparecer verde ✅, clique em **Finalizar**.
6. No painel lateral, navegue até:

```
farm_cristo ➝ Schemas ➝ public ➝ Tables ➝ users
```

7. Clique com o botão direito em `users` ➝ **Visualizar Dados** ➝ **Todas as linhas**.

---

## 🏗️ **Estrutura de Pastas Atual do Projeto**

```plaintext
src/
│
├── config/                # Configurações globais
│   ├── database.ts        # Conexão com o PostgreSQL
│   └── swagger.ts         # Configuração da documentação Swagger
│
├── modules/               # Domínios do sistema
│   └── auth/              # Módulo de autenticação
│       ├── controller/    # Controllers (AuthController.ts)
│       ├── dtos/          # Data Transfer Objects (validação/tipos)
│       ├── entities/      # Modelos/Entidades (separação futura)
│       ├── middlewares/   # Middlewares de autenticação e roles
│       ├── repositories/  # Acesso ao banco (UserRepository.ts)
│       ├── routes/        # Rotas do módulo
│       ├── services/      # Lógica de negócio (AuthService.ts)
│       └── utils/         # Funções auxiliares
│
├── routes/                # Agrupamento de rotas principais
│   └── index.ts           # Registro global das rotas
│
├── shared/                # Middlewares e helpers globais
│
├── app.ts                 # Configuração do app Express
├── server.ts              # Inicialização do servidor
│
├── Dockerfile             # Build da aplicação
├── docker-compose.yml     # Orquestração dos containers
├── .env                   # Variáveis de ambiente
│
└── README.md              # Documentação
```

---

## 🔥 **Alterações realizadas:**

- 🔹 Criação de toda a estrutura modularizada usando **classes** para Controllers, Services e Repositories.
- 🔹 Implementação do endpoint `/auth/register` com validação de **Master Key**.
- 🔹 Criação de middlewares de autenticação (`AuthMiddleware`) e validação de role (`RoleMiddleware`).
- 🔹 Adição da documentação **Swagger** acessível via:

```
http://localhost:8000/api-docs
```

- 🔹 Correção da conexão Docker com PostgreSQL utilizando:

```env
DATABASE_URL=postgres://postgres:postgres@postgres:5432/farm_cristo
```

- 🔹 Adição do passo a passo para conectar o banco via DBeaver.

---

## 🔥 **Próximos passos sugeridos:**

- 🔑 Implementar `/auth/login` com JWT.
- 👥 CRUD de usuários (listar, editar, excluir).
- 👵 CRUD de idosos.
- 📦 CRUD de produtos.
- 🔄 Funcionalidade de retirada de produtos por idosos, com baixa automática de estoque.
- 📊 Dashboard de estoque.
- 🔒 Refinar autenticação, roles e permissions.
