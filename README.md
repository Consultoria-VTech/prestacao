<h1 align="center">
    <img src="https://github.com/Consultoria-VTech/vtech-app/blob/main/public/img/logo-light.svg">
</h1>

<h4 align="center">
🚧  VTech - Em desenvolvimento...  🚧
</h4>

# Indice

<!--ts-->
* [Sobre](#sobre-o-projeto)
* [Funcionalidades](#funcionalidades)
* [Como executar o projeto](#como-executar-o-projeto)
  * [Pré Requisitos](#pré-requisitos)
  * [Rodando a aplicação](#rodando-a-aplicacao)
* [Tecnologias](#tecnologias)
<!--te-->

## Sobre o projeto

VTech App - é um sistema voltado para a gestão financeira dos clientes da Consultoria VTech.

O principal objetivo é auxiliar e gerenciar as finanças, controles de estoque e geração de contas a pagar e receber de forma simples e objetiva.

---

## Funcionalidades

* [ ] O módulo de administrativo permite:
  * [ ] Cadastrar usuários
  * [ ] Cadastrar empresas

* [ ] O módulo de gestão financeira permite:
  * [X] Análisar dados
  * [ ] Cadastrar
    * [X] Bancos
    * [ ] Cliente
    * [X] Contas a receber
    * [X] Contas a pagar
    * [ ] Contratos
      * [ ] No cadastro de contrato deve-se permitir o cadastro de responsáveis
      * [ ] No cadastro de contrato deve-se permitir o cadastro de impostos
    * [X] Conciliação bancária
    * [ ] Fornecedores
    * [ ] Centro de custos
    * [ ] Conta bancária
    * [ ] Controladoria
    * [ ] Funcionários
    * [ ] Integrações
    * [ ] Impostos
    * [ ] Parâmetros de cobrança
    * [ ] Plano de contas
    * [ ] Prestação de contas
  * [ ] Consultar vencimentos

* [ ] Timesheet
* [ ] Budget
* [ ] CRM
* [ ] Controle de estoque

---

## Como executar o projeto

💡 Antes de iniciar os passos posteriores configure a API acessando o repositório da [API](https://github.com/Consultoria-VTech/vtech-api.git)

---

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

* [Git](https://git-scm.com)
* [Node.js](https://nodejs.org/en/)
* [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)

💡 Se preferir também é possível utilizar o [Docker](https://www.docker.com/). Nesse caso não é necessário a instalação do Node.js e do Yarn.

Por fim, recomendamos o editor de código [VSCode](https://code.visualstudio.com/) para a implementação.

---

### Rodando a aplicação

```bash
# Clone este repositório
$ git clone https://github.com/Consultoria-VTech/vtech-app.git

# Acesse a pasta do projeto no terminal/cmd
$ cd vtech-app

# Instale as dependências
$ yarn install ou yarn

# Execute a aplicação em modo de desenvolvimento
$ yarn dev

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>
```

### Rodando a aplicação no Docker

```bash
# Clone este repositório
$ git clone https://github.com/Consultoria-VTech/vtech-app.git

# Acesse a pasta do projeto no terminal/cmd
$ cd vtech-app

# Efetua o build do projeto e copiar os arquivos para o container do docker
$ docker-compose -f "docker-compose.yml" up -d --build

# Executa o terminal do container node
$ docker exec -it node sh

# Instale as dependências
$ yarn install ou yarn

# Normalmente o servidor inicia automaticamente. Caso não esteja rodando, execute
# o comando abaixo
$ yarn dev

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>
```

---

## Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

* [Axios](https://github.com/axios/axios)
* [Bootstrap](https://getbootstrap.com/)
* [Formik](https://formik.org/docs/overview)
* [Next.js](https://nextjs.org/)
* [Node.js](https://nodejs.org/)
* [React Datepicker](https://reactdatepicker.com/)
* [React Dropzone](https://github.com/react-dropzone/react-dropzone)
* [React Icons](https://react-icons.github.io/react-icons/)
* [React Table](https://react-table.tanstack.com/)
* [React Toastify](https://fkhadra.github.io/react-toastify/introduction)
* [React](https://pt-br.reactjs.org/)
* [Styled-Components](https://styled-components.com/)
* [TypeScript](https://www.typescriptlang.org/)

> Veja o arquivo [package.json](https://github.com/Consultoria-VTech/vtech-app/blob/main/package.json)

---
