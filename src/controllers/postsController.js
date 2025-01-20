import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";
import { getTodosPosts, criarPost, atualizarPost, deletarPost } from "../models/postsModels.js";

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

export async function atualizarNovoPost(req, res) {
    // Obtém o ID do post a partir dos parâmetros da rota
    const id = req.params.id;

    // Constrói a URL da imagem
    const urlImagem = `http://localhost:3000/${id}.png`;
    

    try {
        // Lê o buffer da imagem do sistema de arquivos.
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
        
        // Gera a descrição do post usando a API Gemini
        const descricao = await gerarDescricaoComGemini(imageBuffer);

        // Cria o objeto do post com os dados
        const post = {
                imgUrl: urlImagem,
                descricao: descricao,
                alt: req.body.alt
        }

        // Atualiza o post no banco de dados usando a funÃ§Ã£o atualizarPost
        const postCriado = await atualizarPost(id, post);
        
        // Retorna o post criado como resposta com status 200 (sucesso)
        res.status(200).json(postCriado);
    } catch (erro) {
        // Loga o erro no console
        console.error(erro.message);

        // Retorna uma mensagem de erro genérica com status 500 (erro interno do servidor)
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}

export async function deletarNovoPost(req, res) {
    // Obtém o ID do post a partir dos parâmetros da rota
    const id = req.params.id;

    try {
        // Chama a função `deletarPost` para remover o post do banco de dados
        const postDeletado = await deletarPost(id);

        // Verifica se a deleção do post foi bem-sucedida
        if (postDeletado){
            res.status(200).json({message: "Post deletado com sucesso", id: id});
        } else {
            res.status(404).json({message: "Post não encontrado"});
        }
    } catch (erro) {
        // Se ocorrer um erro durante o processo de deleção, responde com status 500 e uma mensagem de erro genérica
        res.status(500).json({"Erro": "Erro ao deletar post"});
    }
}