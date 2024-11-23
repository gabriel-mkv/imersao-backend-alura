import { getTodosPosts } from "../models/postsModels.js";

export async function listarPosts(req, res) {
    // Busca os posts usando a função getTodosPosts
    const posts = await getTodosPosts();

    // Envia os posts como resposta JSON com status 200 (OK)
    res.status(200).json(posts);
}