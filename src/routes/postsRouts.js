import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost, deletarNovoPost } from "../controllers/postsController.js";

// Define as opções para CORS (Cross-Origin Resource Sharing)
const corsOptions = {
  origin: "http://localhost:8000",
  optinsSucessStatus: 200
}

// Configura o armazenamento para arquivos enviados
const storage = multer.diskStorage({
    // Define a pasta de destino para os arquivos salvos
    destination: function (req, file, cb) {
      cb(null, 'uploads/');  // Callback com o caminho da pasta 'uploads'
    },

    // Define o nome do arquivo salvo
    filename: function (req, file, cb) {
      cb(null, file.originalname);  // Callback com o nome original do arquivo
    }
});
  
// Configura o middleware multer para upload de arquivos
const upload = multer({dest: "./uploads", storage});
  
// Define as rotas da aplicação
const routes = (app) => {
    // Habilita o parsing de dados JSON no corpo das requisições
    app.use(express.json());

    // Utiliza o CORS no servidor
    app.use(cors(corsOptions));
    
    // Rota GET para listar todos os posts 
    app.get("/posts", listarPosts);
  
    // Rota POST para criar um novo post
    app.post("/posts", postarNovoPost);
  
    // Rota POST para upload de imagem com middleware 'upload'
    app.post("/upload", upload.single("imagem"), uploadImagem);
    
    // Rota PUT para atualizar um post no banco de dados
    app.put("/upload/:id", atualizarNovoPost);

    // Rota DELETE para deletar um post no banco de dados
    app.delete("/upload/:id", deletarNovoPost);
};

export default routes;