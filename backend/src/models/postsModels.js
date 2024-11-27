import { ObjectId } from "mongodb";
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

// Função assíncrona para criar um post na coleção "posts"
export async function criarPost(novoPost) {
    // Conecta ao banco de dados "imersao-instabytes"
    const db = conexao.db("imersao-instabytes");

    // Seleciona a coleção "posts" dentro do banco de dados
    const colecao = db.collection("posts");

    // Insere um novo documento (post) na coleção e retorna um objeto com informações sobre a inserção
    return colecao.insertOne(novoPost);
}

// Função assíncrona para atualizar um post na coleção "posts"
export async function atualizarPost(id, novoPost) {
    // Conecta ao banco de dados "imersao-instabytes"
    const db = conexao.db("imersao-instabytes");
    
    // Seleciona a coleção "posts" dentro do banco de dados
    const colecao = db.collection("posts");

    // Converte o ID hexadecimal para um ObjectId do MongoDB
    const objID = ObjectId.createFromHexString(id);
    
    // Executa a atualização no banco de dados
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novoPost});
}