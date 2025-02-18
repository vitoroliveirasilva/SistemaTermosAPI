# Estrutura de Diretórios da API

Este documento descreve a organização das pastas e arquivos de uma API desenvolvida em **Node.js**. O objetivo é manter o código **modularizado**, **escalável** e **fácil de manter**.

## Visão Geral

```
meu-projeto/
├─ src/
│  ├─ config/
│  ├─ controllers/
│  ├─ services/
│  ├─ repositories/
│  ├─ models/
│  ├─ routes/
│  ├─ middlewares/
│  ├─ utils/
│  ├─ app.js
│  └─ server.js
├─ tests/
│  ├─ unit/
│  ├─ integration/
│  └─ ...
├─ .env
├─ .gitignore
├─ package.json
└─ README.md
```

### Descrição Resumida

- **src/**: Pasta principal do código-fonte da aplicação.  
- **tests/**: Local onde são armazenados os testes (unitários, de integração etc.).  
- **.env**: Arquivo de variáveis de ambiente.  
- **package.json**: Declara dependências e scripts para execução da aplicação.  
- **README.md**: Documentação principal do projeto.

---

## src/

### 1. config/
Armazena configurações de banco de dados, serviços externos, loggers, ou qualquer outra configuração global.

**Exemplos de arquivos**:
- `database.js`: arquivo que faz conexão com o banco de dados MySQL ou outro SGBD.
- `logger.js`: configura um logger (como Winston, pino, etc.) para logar as atividades.

### 2. controllers/
Os **controllers** recebem as requisições HTTP e coordenam a chamada dos **services**. Eles lidam com `req` e `res` do Express (ou outro framework HTTP).

**Exemplos de métodos**:
- `createUser(req, res)`
- `getUserById(req, res)`
- `updateEquipment(req, res)`

**Exemplo de arquivo**:
- `usuarioController.js`
- `equipamentoController.js`

> **Obs**: Aqui **não** fica lógica de negócio. Apenas encaminhamos dados para a camada de service e formatamos a resposta.

### 3. services/
Camada responsável pela **lógica de negócio**.  
Os **services** recebem dados do controller, aplicam validações e regras, e acessam o **repository** (se necessário).

**Exemplos**:
- `usuarioService.js`
- `equipamentoService.js`
- `termoService.js`

**Funções típicas**:
- `validateUserData(userData)`
- `assignEquipmentToUser(userId, equipmentId)`

### 4. repositories/
Camada de **acesso a dados**.  
Gerencia as operações de CRUD (Create, Read, Update, Delete) no banco de dados, geralmente via **ORM** (Sequelize, TypeORM, etc.) ou queries manuais.

**Exemplos**:
- `usuarioRepository.js`
  - `createUser()`
  - `findUserByEmail()`
- `equipamentoRepository.js`
  - `findEquipmentsByStatus()`
  - `updateEquipmentStatus()`

### 5. models/
Contém as **definições das entidades** do banco de dados (caso utilize ORM).  
Cada arquivo representa um **Model** com colunas, tipos, relacionamentos.

**Exemplos**:
- `Usuario.js` (Sequelize ou TypeORM definindo tabela “usuarios”)
- `Equipamento.js`
- `Termo.js`

> **Obs**: Em alguns projetos, o Model pode ficar junto do Repository. Porém, separar ajuda na organização e na clareza de onde definimos as estruturas de dados e onde fazemos as operações.

### 6. routes/
Define as **rotas** da aplicação.  
Cada arquivo de rota importa o controller específico e mapeia as URLs.

**Exemplos**:
- `usuarioRoutes.js`
  - `router.post('/usuarios', usuarioController.createUser)`
  - `router.get('/usuarios/:id', usuarioController.getUserById)`
- `equipamentoRoutes.js`
- `index.js` → arquivo que consolida todas as rotas e exporta para `app.js`.

### 7. middlewares/
Contém funções que interceptam as requisições **antes** de chegar ao controller ou **após** sair dele.  
Aqui vão coisas como autenticação, autorização, logging ou tratamento de erros.

**Exemplos**:
- `autenticacaoMiddleware.js`
  - Verifica token JWT antes de chamar o controller
- `erroMiddleware.js`
  - Centraliza o tratamento de erros, retornando respostas padronizadas

### 8. utils/
Local para **funções utilitárias** ou helpers que não se encaixam nas camadas anteriores.  
Por exemplo, geração de PDF, envio de e-mail, formatação de datas.

**Exemplo**:
- `gerarPDF.js`
- `enviarEmail.js`

### 9. app.js
Arquivo principal de configuração da sua aplicação Express (ou outro framework).  
- Importa as rotas, middlewares gerais, body parser, etc.  
- Exemplo:
  ```js
  const express = require('express');
  const app = express();
  // middlewares
  // routes
  module.exports = app;
  ```

### 10. server.js
Arquivo que **inicia** o servidor (escuta em determinada porta).  
Geralmente, importa o `app.js`.

Exemplo:
```js
const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## tests/
Guarda testes automatizados, usando frameworks como **Jest** ou **Mocha**.

- **unit/**: testes de unidade para funções (services, utils etc.).  
- **integration/**: testes que envolvem endpoints e/ou integração com o banco de dados.

---

## Boas Práticas

- **.env**: Use este arquivo para armazenar variáveis de ambiente (chaves de API, credenciais de banco). Não faça commit em repositórios públicos.
- **Padronização de código**: Utilize ferramentas como **ESLint** e **Prettier** para manter um estilo uniforme.
- **Documentação**: Considere integrar **Swagger** (OpenAPI) para documentar os endpoints da sua API.
- **Scripts**: No `package.json`, inclua scripts úteis (ex.: `"start": "node src/server.js"`, `"dev": "nodemon src/server.js"`, `"test": "jest"`).

---

## Exemplos de Passo a Passo

1. **Instalação**:
   ```bash
   git clone https://github.com/seu-usuario/seu-repo.git
   cd seu-repo
   npm install
   ```

2. **Configuração**:
   - Duplique `.env.example` para `.env` e preencha as variáveis (porta, string de conexão do BD, etc.).

3. **Executar em Desenvolvimento**:
   ```bash
   npm run dev
   # ou node src/server.js
   ```

4. **Rodar Testes**:
   ```bash
   npm run test
   ```

---

## Conclusão

Esta estrutura segue o padrão de **camadas** (controllers, services, repositories), facilitando a manutenção e escalabilidade. Conforme o projeto crescer, você poderá criar mais pastas ou dividir ainda mais cada camada (por módulo/funcionalidade), mantendo sempre a **separação de responsabilidades** e evitando arquivos gigantes.

Sinta-se à vontade para ajustar nomes de pastas, adicionar novas camadas ou remover partes que não se aplicam ao seu projeto. O mais importante é **manter a consistência** e garantir que todos na equipe entendam onde o código deve ficar!