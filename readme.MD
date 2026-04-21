# 📝 Blog API

API de um sistema de blog desenvolvida com **Node.js**, **Express** e **Prisma**, utilizando **PostgreSQL** como banco de dados.

---

## 🚀 Tecnologias utilizadas

* Node.js
* Express
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT (autenticação)
* Bcrypt (hash de senha)
* Multer (upload de arquivos)
* Zod (validação)
* Slug (URLs amigáveis)

---

## 📂 Estrutura do projeto

```
src/
 ├── controllers/
 ├── routes/
 ├── services/
 ├── middlewares/
 ├── libs/
 ├── prisma/
 └── server.ts
```

---

## ⚙️ Instalação

Clone o repositório:

```bash
git clone <url-do-repositorio>
cd blog
```

Instale as dependências:

```bash
npm install
```

---

## 🔑 Configuração

Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/blog"
JWT_SECRET="sua_chave_secreta"
PORT=3000
```

---

## 🗄️ Banco de dados

Execute as migrations do Prisma:

```bash
npx prisma migrate dev
```

Gerar client:

```bash
npx prisma generate
```

---

## ▶️ Rodando o projeto

Modo desenvolvimento:

```bash
npm run dev
```

---

## 🔐 Autenticação

A API utiliza **JWT** para autenticação.

* Login retorna um token
* Rotas protegidas exigem envio no header:

```http
Authorization: Bearer seu_token
```

---

## 📌 Funcionalidades

* Cadastro de usuários
* Login/autenticação
* Criação de posts
* Edição de posts
* Listagem de posts
* Upload de imagens
* Geração de slug automático

---

## 📦 Scripts disponíveis

```bash
npm run dev
```

---

## 🧪 Validação

Validação de dados usando **Zod** para garantir integridade das requisições.

---

## 📷 Upload de arquivos

Utiliza **Multer** para upload de imagens associadas aos posts.

---

## 🛠️ Dependências principais

* `express`
* `@prisma/client`
* `jsonwebtoken`
* `bcryptjs`
* `multer`
* `zod`

---

## 📄 Licença

Este projeto está sob a licença ISC.

---

## ✍️ Autor

Desenvolvido por você @StyvenNoronha


