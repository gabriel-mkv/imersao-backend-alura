import  conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados MongoDB usando a string de conexão fornecida
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);


// Função assíncrona para buscar todos os posts da coleção "posts"
export async function getTodosPosts() {
    // Obtém o banco de dados "imersao-instabytes"
    const db = conexao.db("imersao-instabytes");
    // Obtém a coleção "posts"
    const colecao = db.collection("posts");
    // Busca todos os documentos da coleção e retorna como um array
    return colecao.find({}).toArray();
}