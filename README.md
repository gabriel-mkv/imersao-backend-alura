# InstaBytes 📷

> Clone de Interface de Instagram: Back-end em Gemini com MongoDB, criando rotas e manipulando dados, com Docker para desenvolvimento local.

## Descrição 📝

Este repositório contém o código para um clone da interface de perfil do Instagram, criado durante a Imersão 
Backend da Alura utilizando a tecnologia Gemini. O projeto se concentra na construção de uma API responsável 
por gerenciar a interação com o banco de dados MongoDB integrada a API do Google Gemini. A interface frontend foi fornecida como base, permitindo 
que o desenvolvimento se concentrasse inteiramente na arquitetura do backend, na construção das rotas da API, 
e na otimização do acesso aos dados no banco de dados. Embora o projeto utilize o serviço em cloud do MongoDB Atlas, 
optei por utilizar o Docker para containerizar o banco de dados localmente durante o desenvolvimento. Isso me permitiu 
praticar com o Docker e ter um ambiente de desenvolvimento mais controlado e replicável. Este projeto demonstra habilidades 
em desenvolvimento de APIs REST, manipulação de dados em MongoDB, e boas práticas de desenvolvimento back-end.

Código do front-end da API: https://github.com/alura-cursos/imersao-backend-gemini-2024-front.git

## Tecnologias 💻

| Tecnologia          | Descrição                                    |
|----------------------|------------------------------------------------|
| ![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) | Ambiente de execução JavaScript                 |
| ![Express.js](https://img.shields.io/badge/express.js-%23404040.svg?style=for-the-badge&logo=express&logoColor=white) | Framework web para Node.js                      |
| ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)  | Banco de dados NoSQL                             |
| ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=F7DF1E) | Linguagem de programação para interatividade      |
| ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) | Ferramenta de containerização                     |

## Funcionalidades 🔧

Esta API oferece funcionalidades para gerenciar posts, incluindo criação, leitura, atualização e deleção.  As operações são realizadas através das seguintes rotas:

### Rotas Disponíveis:

| Método | Rota             | Descrição                                                                |
|--------|--------------------|----------------------------------------------------------------------------|
| `GET`  | `/posts`          | Lista todos os posts existentes no banco de dados.                         |
| `POST` | `/posts`          | Cria um novo post.  O corpo da requisição deve conter os dados do post.     |
| `POST` | `/upload`         | Faz upload de uma imagem para o servidor. |
| `PUT`  | `/upload/:id`     | Atualiza um post existente com um novo ID e imagem. |
| `DELETE`| `/upload/:id`     | Deleta um post existente. |


## Detalhes das Rotas: 📑

### `/posts` (GET)

Retorna um array JSON contendo todos os posts, cada um com seus respectivos dados (ex: `id`, `imgUrl`, `descricao`, `alt`).

### `/posts` (POST)

Requisição:  Um objeto JSON com os dados do novo post (ex: `imgUrl`, `descricao`, `alt`).  `imgUrl` deve ser o caminho para a imagem no servidor.

Resposta: Retorna um objeto JSON com o `id` do novo post criado ou um código de erro se a criação falhar.


### `/upload` (POST)

Requisição: Um formulário com uma imagem no campo `imagem`.

Resposta: Retorna um objeto JSON com o `id` da imagem que foi enviada com sucesso.


### `/upload/:id` (PUT)

Requisição: Um objeto JSON contendo os dados atualizados do post.  O ID do post é um parâmetro na URL. O corpo da requisição deve conter os dados do post: `imgUrl`, `descricao`, `alt`.

Resposta: Retorna o objeto JSON do post atualizado, ou um código de erro caso ocorra algum problema.


### `/upload/:id` (DELETE)

Requisição: O ID do post a ser deletado é passado como parâmetro na URL.

Resposta:  Retorna uma mensagem de confirmação ("Post deletado com sucesso") ou uma mensagem de erro ("Post não encontrado") ou outro erro (ex: erro de servidor).
