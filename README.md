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

## ✍️ **Como criar um novo Endpoint**

Este guia mostra como criar um novo módulo completo (Controller, Service, Repository, DTO, Entity, Swagger e Rota).

---

### 🚀 **Exemplo: Criando o módulo de Produtos (`Product`)**

### 🗂️ **1. Crie a estrutura de pastas**

Dentro de `src/modules`, crie a pasta `product` com as seguintes subpastas:

```plaintext
src/modules/product/
├── controller/
├── dtos/
├── entities/
├── repositories/
├── routes/
├── services/
└── docs/
```

---

### 🏛️ **2. Crie o Entity (Entidade)**

Arquivo: `entities/Product.ts`

```ts
export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
```

---

### 🗒️ **3. Crie os DTOs (validação dos dados)**

Arquivo: `dtos/CreateProductDto.ts`

```ts
export interface CreateProductDto {
  name: string;
  price: number;
  quantity: number;
}
```

---

### 🏦 **4. Crie o Repository (Acesso ao banco)**

Arquivo: `repositories/ProductRepository.ts`

```ts
import { Product } from "../entities/Product";

const products: Product[] = []; // 🔥 Simulação de banco em memória

export const ProductRepository = {
  create(product: Product) {
    products.push(product);
    return product;
  },

  findAll() {
    return products;
  },
};
```

---

### 🔥 **5. Crie o Service (Regra de negócio)**

Arquivo: `services/ProductService.ts`

```ts
import { CreateProductDto } from "../dtos/CreateProductDto";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/ProductRepository";
import { randomUUID } from "crypto";

export const ProductService = {
  create({ name, price, quantity }: CreateProductDto): Product {
    const product: Product = {
      id: randomUUID(),
      name,
      price,
      quantity,
    };

    return ProductRepository.create(product);
  },

  list() {
    return ProductRepository.findAll();
  },
};
```

---

### 🎯 **6. Crie o Controller (Recebe as requisições)**

Arquivo: `controller/ProductController.ts`

```ts
import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";

export const ProductController = {
  create(req: Request, res: Response) {
    const product = ProductService.create(req.body);
    return res.status(201).json(product);
  },

  list(req: Request, res: Response) {
    const products = ProductService.list();
    return res.json(products);
  },
};
```

---

### 🌐 **7. Crie as Rotas**

Arquivo: `routes/product.routes.ts`

```ts
import { Router } from "express";
import { ProductController } from "../controller/ProductController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API de Produtos
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProduct'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 */
router.post("/", ProductController.create);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
router.get("/", ProductController.list);

export { router as productRoutes };
```

---

### 📑 **8. Crie a Documentação Swagger**

Arquivo: `docs/product.docs.ts`

```ts
/**
 * @swagger
 * components:
 *   schemas:
 *     CreateProduct:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - quantity
 *       properties:
 *         name:
 *           type: string
 *           example: Maçã
 *         price:
 *           type: number
 *           example: 9.99
 *         quantity:
 *           type: number
 *           example: 50
 */
```

---

### 🔗 **9. Adicione no arquivo de rotas principal**

Arquivo: `src/routes/index.ts`

```ts
import { Router } from "express";
import { authRoutes } from "../modules/auth/routes/auth.routes";
import { productRoutes } from "../modules/product/routes/product.routes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/products", productRoutes);

export { routes };
```

---

## ✅ **Resumindo o Fluxo**

1. Crie uma pasta no `modules` com o nome do módulo.
2. Crie:

   - **Entity:** Descreve a estrutura dos dados.
   - **DTO:** Valida os dados recebidos.
   - **Repository:** Acesso e manipulação dos dados (simulado ou real com DB).
   - **Service:** Contém as regras de negócio.
   - **Controller:** Recebe requisições, chama o service e retorna respostas.
   - **Routes:** Define os endpoints da API.
   - **Docs:** Descreve os endpoints no Swagger.

3. Registre a rota no `routes/index.ts`.
4. O endpoint estará documentado em:
   📍 `http://localhost:8000/api-docs`
