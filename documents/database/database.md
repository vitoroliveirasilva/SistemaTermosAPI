# Documentação do Banco de Dados

Este documento descreve a estrutura de tabelas do sistema de **Termos de Responsabilidade** e **Gerenciamento de Estoque**, sem uso de `ENUM`, utilizando tabelas de referência para status e tipos.

## Índice

- [Visão Geral](#visão-geral)
- [Tabelas de Referência](#tabelas-de-referência)
  - [auth_providers](#auth_providers)
  - [equipamento_status](#equipamento_status)
  - [term_types](#term_types)
  - [term_status](#term_status)
  - [movement_actions](#movement_actions)
- [Tabelas Principais](#tabelas-principais)
  - [filiais](#filiais)
  - [categorias](#categorias)
  - [modelos](#modelos)
  - [usuarios](#usuarios)
  - [equipamentos](#equipamentos)
  - [termos](#termos)
  - [historico_movimentacoes](#historico_movimentacoes)
- [Tabelas para Geração de PDFs](#tabelas-para-geração-de-pdfs)
  - [templates_termos](#templates_termos)
  - [termos_gerados](#termos_gerados)
- [Fluxo de Dados Simplificado](#fluxo-de-dados-simplificado)
- [Script Completo](#script-completo)
- [Como Utilizar](#como-utilizar)

---

## Visão Geral

Este banco de dados foi projetado para:

- **Gerenciar filiais** (locais onde equipamentos e usuários estão alocados).  
- **Armazenar categorias** e **modelos** de equipamentos de modo normalizado.  
- **Controlar a entrega/devolução** de equipamentos através de **termos** e **histórico** de movimentações.  
- **Gerar PDFs** de termos, guardando **templates** e **referências** aos arquivos criados.  
- **Permitir autenticação** local ou de terceiros via tabelas de referência (`auth_providers`).

---

## Tabelas de Referência

Estas tabelas guardam valores fixos ou de configuração, evitando o uso de `ENUM`. Cada tabela pode crescer ao longo do tempo, permitindo maior flexibilidade.

### **auth_providers**

| Campo            | Tipo         | Descrição                                                      |
|------------------|-------------|----------------------------------------------------------------|
| **id**           | INT (PK)     | Identificador único do provedor de autenticação.               |
| **nome**         | VARCHAR(50)  | Nome do provedor (ex.: `local`, `google`, `github`).           |
| **criado_em**    | TIMESTAMP    | Data/hora de criação do registro.                              |

Exemplo de registros: `local`, `google`, `github`, `outro`.

---

### **equipamento_status**

| Campo         | Tipo         | Descrição                                                                        |
|---------------|-------------|------------------------------------------------------------------------------------|
| **id**        | INT (PK)     | Identificador único do status do equipamento.                                     |
| **nome**      | VARCHAR(50)  | Nome do status (ex.: `disponivel`, `atribuido`, `em_manutencao`, `devolvido`).     |
| **criado_em** | TIMESTAMP    | Data/hora de criação do registro.                                                |

---

### **term_types**

| Campo         | Tipo         | Descrição                                              |
|---------------|-------------|--------------------------------------------------------|
| **id**        | INT (PK)     | Identificador único do tipo de termo.                  |
| **nome**      | VARCHAR(50)  | Nome do tipo (ex.: `responsabilidade`, `devolucao`).   |
| **criado_em** | TIMESTAMP    | Data/hora de criação do registro.                     |

---

### **term_status**

| Campo         | Tipo         | Descrição                                              |
|---------------|-------------|--------------------------------------------------------|
| **id**        | INT (PK)     | Identificador único do status do termo.                |
| **nome**      | VARCHAR(50)  | Nome do status (ex.: `pendente`, `assinado`, `cancelado`). |
| **criado_em** | TIMESTAMP    | Data/hora de criação do registro.                     |

---

### **movement_actions**

| Campo         | Tipo         | Descrição                                                      |
|---------------|-------------|----------------------------------------------------------------|
| **id**        | INT (PK)     | Identificador único da ação de movimentação.                    |
| **nome**      | VARCHAR(50)  | Nome da ação (ex.: `entrega`, `devolucao`, `manutencao`, etc.). |
| **criado_em** | TIMESTAMP    | Data/hora de criação do registro.                              |

---

## Tabelas Principais

### **filiais**

| Campo         | Tipo         | Descrição                                                   |
|---------------|-------------|-------------------------------------------------------------|
| **id**        | INT (PK)     | Identificador único da filial.                             |
| **nome**      | VARCHAR(100) | Nome da filial (ex.: `Filial Central`).                    |
| **endereco**  | VARCHAR(255) | Endereço ou localização da filial.                         |
| **criado_em** | TIMESTAMP    | Data/hora de criação do registro.                          |

---

### **categorias**

| Campo         | Tipo         | Descrição                                                 |
|---------------|-------------|-----------------------------------------------------------|
| **id**        | INT (PK)     | Identificador único da categoria.                        |
| **nome**      | VARCHAR(50)  | Nome da categoria (ex.: `Notebook`, `Celular`).          |
| **descricao** | VARCHAR(255) | Descrição adicional.                                     |
| **criado_em** | TIMESTAMP    | Data/hora de criação do registro.                        |

---

### **modelos**

Relaciona-se com `categorias`. Armazena informações gerais de marca/modelo para evitar duplicação de dados em equipamentos.

| Campo              | Tipo         | Descrição                                                            |
|--------------------|-------------|----------------------------------------------------------------------|
| **id**             | INT (PK)     | Identificador único do modelo.                                       |
| **categoria_id**   | INT (FK)     | Relaciona com `categorias(id)`.                                      |
| **marca**          | VARCHAR(100) | Ex.: `Dell`, `Apple`, `Samsung`.                                     |
| **modelo**         | VARCHAR(100) | Ex.: `Inspiron X`, `iPhone 13`, etc.                                 |
| **descricao**      | TEXT         | Detalhes adicionais do modelo.                                       |
| **criado_em**      | TIMESTAMP    | Data/hora de criação do registro.                                    |
| **fk_modelos_categorias** | FK   | `ON DELETE RESTRICT`, `ON UPDATE CASCADE` (não remove modelos caso a categoria seja removida). |

---

### **usuarios**

Armazena tanto usuários com login local quanto via terceiros. Relaciona-se com `filiais` e `auth_providers`.

| Campo                | Tipo         | Descrição                                                                  |
|----------------------|-------------|----------------------------------------------------------------------------|
| **id**              | INT (PK)     | Identificador único do usuário.                                            |
| **filial_id**       | INT (FK)     | Relaciona com `filiais(id)`.                                               |
| **auth_provider_id**| INT (FK)     | Relaciona com `auth_providers(id)` (ex.: `local`, `google`, etc.).         |
| **nome**            | VARCHAR(100) | Nome completo do usuário.                                                 |
| **email**           | VARCHAR(100) | E-mail único.                                                              |
| **senha**           | VARCHAR(255) | Para login local (hash da senha). Pode ser `NULL` se usar apenas SSO.      |
| **telefone**        | VARCHAR(20)  | Telefone de contato.                                                       |
| **criado_em**       | TIMESTAMP    | Data/hora de criação do registro.                                          |
| **fk_usuarios_filiais** | FK       | `ON DELETE RESTRICT`, `ON UPDATE CASCADE`.                                 |
| **fk_usuarios_authproviders** | FK | `ON DELETE RESTRICT`, `ON UPDATE CASCADE`.                                 |

---

### **equipamentos**

Cada linha representa **um item físico** (ex.: um notebook específico). Relaciona-se com `modelos`, `filiais` e `equipamento_status`.

| Campo                  | Tipo         | Descrição                                                                         |
|------------------------|-------------|-----------------------------------------------------------------------------------|
| **id**                | INT (PK)     | Identificador único do equipamento.                                               |
| **modelo_id**         | INT (FK)     | Relaciona com `modelos(id)`.                                                      |
| **filial_id**         | INT (FK)     | Indica a filial onde o equipamento está alocado; relaciona com `filiais(id)`.      |
| **status_id**         | INT (FK)     | Relaciona com `equipamento_status(id)` (ex.: `disponivel`, `atribuido`).          |
| **numero_serie**      | VARCHAR(50)  | Identificador único de cada item (número de série).                               |
| **criado_em**         | TIMESTAMP    | Data/hora de criação do registro.                                                 |
| **fk_equipamentos_modelos** | FK     | `ON DELETE RESTRICT`, `ON UPDATE CASCADE`.                                        |
| **fk_equipamentos_filiais** | FK     | `ON DELETE RESTRICT`, `ON UPDATE CASCADE`.                                        |
| **fk_equipamentos_status**  | FK     | `ON DELETE RESTRICT`, `ON UPDATE CASCADE`.                                        |

---

### **termos**

Cada **Termo** registra uma ação formal (ex.: entrega de equipamento). Relaciona-se com `usuarios`, `equipamentos`, `term_types` e `term_status`.

| Campo               | Tipo          | Descrição                                                                                          |
|---------------------|--------------|----------------------------------------------------------------------------------------------------|
| **id**             | INT (PK)      | Identificador único do termo.                                                                      |
| **usuario_id**      | INT (FK)      | Usuário que está recebendo ou devolvendo o equipamento.                                            |
| **equipamento_id**  | INT (FK)      | Equipamento relacionado ao termo.                                                                  |
| **criador_id**      | INT (FK)      | Usuário que **gerou** o termo (geralmente um admin ou gestor).                                      |
| **tipo_id**         | INT (FK)      | Relaciona com `term_types(id)` (ex.: `responsabilidade`, `devolucao`).                             |
| **status_id**       | INT (FK)      | Relaciona com `term_status(id)` (ex.: `pendente`, `assinado`, `cancelado`).                        |
| **data_criacao**    | TIMESTAMP     | Data/hora em que o termo foi criado.                                                               |
| **data_assinatura** | TIMESTAMP     | Data/hora em que o termo foi efetivamente assinado (pode ser `NULL` se estiver pendente).          |
| **observacoes**     | TEXT          | Informações adicionais (ex.: condições de uso, observações do responsável).                        |
| **fk_termos_usuario**      | FK      | `ON DELETE CASCADE`, `ON UPDATE CASCADE`.                                                          |
| **fk_termos_equipamento**  | FK      | `ON DELETE CASCADE`, `ON UPDATE CASCADE`.                                                          |
| **fk_termos_criador**      | FK      | `ON DELETE RESTRICT`, `ON UPDATE CASCADE`.                                                         |
| **fk_termos_tipo**         | FK      | `ON DELETE RESTRICT`, `ON UPDATE CASCADE`.                                                         |
| **fk_termos_status**       | FK      | `ON DELETE RESTRICT`, `ON UPDATE CASCADE`.                                                         |

---

### **historico_movimentacoes**

Registra as **ações** feitas em um determinado equipamento ao longo do tempo (ex.: entrega, devolução, manutenção). Liga-se a `equipamentos`, `usuarios` e `movement_actions`.

| Campo                   | Tipo       | Descrição                                                                 |
|-------------------------|-----------|---------------------------------------------------------------------------|
| **id**                 | INT (PK)   | Identificador único do registro no histórico.                             |
| **equipamento_id**     | INT (FK)   | Identifica qual equipamento sofreu a ação.                                |
| **usuario_id**         | INT (FK)   | Usuário relacionado à ação (pode ser `NULL` para manutenções externas).    |
| **acao_id**            | INT (FK)   | Relaciona com `movement_actions(id)` (ex.: `entrega`, `devolucao`).        |
| **data_movimentacao**  | TIMESTAMP  | Data/hora em que a movimentação ocorreu.                                  |
| **observacoes**        | TEXT       | Comentários adicionais (ex.: “Troca de bateria”, “Notebook entregue ao usuário X”). |
| **fk_hist_equipamento**| FK         | `ON DELETE CASCADE`, `ON UPDATE CASCADE`.                                  |
| **fk_hist_usuario**    | FK         | `ON DELETE SET NULL`, `ON UPDATE CASCADE`.                                 |
| **fk_hist_acao**       | FK         | `ON DELETE RESTRICT`, `ON UPDATE CASCADE`.                                 |

---

## Tabelas para Geração de PDFs

### **templates_termos**

Armazena **templates** (HTML ou texto) para gerar PDFs de termos de responsabilidade ou devolução.

| Campo                 | Tipo          | Descrição                                                          |
|-----------------------|--------------|--------------------------------------------------------------------|
| **id**               | INT (PK)      | Identificador único do template.                                   |
| **nome**             | VARCHAR(100)  | Nome do template (ex.: “Termo Responsabilidade Básico”).           |
| **conteudo_template**| TEXT          | Conteúdo do template (HTML, placeholders etc.).                    |
| **criado_em**        | TIMESTAMP     | Data/hora de criação do registro.                                  |

---

### **termos_gerados**

Registra **cada PDF** criado para um termo específico, relacionando-o a um template.

| Campo               | Tipo         | Descrição                                                                      |
|---------------------|-------------|--------------------------------------------------------------------------------|
| **id**             | INT (PK)     | Identificador único do registro.                                               |
| **termo_id**       | INT (FK)     | Relaciona com `termos(id)` para saber qual termo gerou este PDF.               |
| **template_id**    | INT (FK)     | Indica qual template foi utilizado.                                            |
| **caminho_pdf**    | VARCHAR(255) | Caminho ou URL onde o PDF foi armazenado (ex.: `/pdfs/termo_123.pdf`).          |
| **data_geracao**   | TIMESTAMP    | Data/hora em que o PDF foi criado.                                             |
| **fk_termos_gerados_termo**   | FK | `ON DELETE CASCADE`, `ON UPDATE CASCADE`.                                      |
| **fk_termos_gerados_template**| FK | `ON DELETE RESTRICT`, `ON UPDATE CASCADE`.                                     |

> Observação: se preferir, você pode armazenar o PDF em binário (BLOB). Nesse caso, troque o campo `caminho_pdf` por algo como `pdf_data LONGBLOB`.

---

## Fluxo de Dados Simplificado

1. **Usuário é cadastrado** na tabela `usuarios`, vinculado a uma `filial` e um `auth_provider`.  
2. **Equipamento é cadastrado** na tabela `equipamentos`, definindo `modelo`, `filial` e `status`.  
3. **Termo é criado** na tabela `termos`, relacionando `usuario_id` e `equipamento_id`.  
4. A aplicação **gera PDF** usando um registro de `templates_termos`, substituindo placeholders e salvando o resultado em `termos_gerados` (com `caminho_pdf` ou BLOB).  
5. **Movimentações** (ex.: entrega, devolução) são registradas em `historico_movimentacoes`, relacionando `equipamento_id`, `acao_id` e (opcionalmente) `usuario_id`.

---

## Script Completo

Veja o script SQL de referência no arquivo [`database.sql`](#) (ou no local onde você deseja armazená-lo). Ele contém:

- Criação das tabelas de referência.  
- Criação das tabelas principais.  
- Criação das tabelas auxiliares para geração de PDF.  
- Inserções de exemplo em tabelas de referência (status, providers etc.).

**[Clique aqui](#)** para acessar o script completo (ou simplesmente inclua o conteúdo em um arquivo `.sql` no seu repositório).

---

## Como Utilizar

1. **Criar um banco de dados** no MySQL (ex.: `CREATE DATABASE sistema_termos; USE sistema_termos;`).  
2. **Executar** o script para criar todas as tabelas.  
3. **Preencher** tabelas de referência (caso queira adicionar mais status, provedores etc.).  
4. **Inserir registros** em `filiais`, `categorias`, `modelos`, `usuarios` e `equipamentos` para começar a usar o sistema.  
5. **Gerar termos** via aplicação (Node.js). Ao criar um novo `termo`, atualize `termos` e, caso finalize a assinatura, modifique o `status_id` e a `data_assinatura`.  
6. **Gerar PDFs**: a aplicação renderiza o conteúdo de `templates_termos` e salva o resultado em `termos_gerados`.
