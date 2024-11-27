import express from "express";
import routes from "./src/routes/postsRouts.js";

// Cria uma instância do aplicativo Express.
const app = express();

// Define a pasta "uploads" como estática, permitindo acesso direto a arquivos nessa pasta via URL
app.use(express.static("uploads"));

// Registra as rotas da aplicação no express
routes(app);

// Inicia o servidor na porta 3000 e exibe uma mensagem
app.listen(3000, () => {
  console.log("Servidor escutando...");
});