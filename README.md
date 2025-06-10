## 🚀 Como rodar o projeto

### ✅ Rodando **sem Docker** (modo local)

1. Instale as dependências:

```bash
npm install
```

2. Certifique-se de que você tenha o PostgreSQL rodando localmente com as seguintes credenciais:

```
Host:     localhost
Porta:    5432
Usuário:  postgres
Senha:   postgres
Banco:    farm_cristo
```

3. Inicie o servidor em modo desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em:
📍 `http://localhost:8000`

---

### 🐳 Rodando **com Docker**

1. Suba os containers com Docker Compose:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

2. Acesse a aplicação no navegador:

📍 `http://localhost:8000`

> O banco de dados PostgreSQL estará disponível internamente para a aplicação via o host `postgres`, na porta `5432`.

3. String de conexão recomendada:

```env
DATABASE_URL=postgres://postgres:postgres@postgres:5432/farm_cristo
```
