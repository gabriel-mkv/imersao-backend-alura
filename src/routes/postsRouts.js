import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js";

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
  
    // Rota GET para listar todos os posts 
    app.get("/posts", listarPosts);
  
    // Rota POST para criar um novo post
    app.post("/posts", postarNovoPost);
  
    // Rota POST para upload de imagem com middleware 'upload'
    app.post("/upload", upload.single("imagem"), uploadImagem);
      // O middleware 'upload.single("imagem")' espera um arquivo com a chave 'imagem'
      // A função 'uploadImagem' recebe a requisição após o upload ser processado
};

export default routes;