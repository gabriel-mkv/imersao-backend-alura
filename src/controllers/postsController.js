import fs from "fs";
import { getTodosPosts, criarPost } from "../models/postsModels.js";

export async function listarPosts(req, res) {
    // Busca os posts usando a função getTodosPosts
    const posts = await getTodosPosts();

    // Envia os posts como resposta JSON com status 200 (OK)
    res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
    // Extrai os dados do novo post a partir do corpo da requisição
    const novoPost = req.body;

    try {
        // Chama a função `criarPost` para inserir o novo post no banco de dados
        const postCriado = await criarPost(novoPost);

        // Retorna o post criado como resposta com status 200 (sucesso)
        res.status(200).json(postCriado);
    } catch (erro) {
        // Loga o erro no console
        console.error(erro.message);

        // Retorna uma mensagem de erro genérica com status 500 (erro interno do servidor)
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}

export async function uploadImagem(req, res) {
    // Cria um objeto com os dados do novo post, incluindo a imagem
    const novoPost = {
        descricao: "", 
        imgUrl: req.file.originalname, 
        alt: "" 
    };

    try {
        // Cria o novo post no banco de dados
        const postCriado = await criarPost(novoPost);

        // Constrói o novo nome do arquivo com o ID do post
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;

        // Renomeia o arquivo para o novo nome
        fs.renameSync(req.file.path, imagemAtualizada);

        // Retorna o post criado como resposta
        res.status(200).json(postCriado);
    } catch (erro) {
        // Loga o erro no console
        console.error(erro.message);

        // Retorna uma mensagem de erro genérica com status 500 (erro interno do servidor)
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}