import express from "express";
import routes from "./src/routes/postsRouts.js";

const app = express();
routes(app);

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor escutando na porta 3000");
});