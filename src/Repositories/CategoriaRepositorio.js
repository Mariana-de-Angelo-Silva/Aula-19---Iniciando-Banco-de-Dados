const {consultar} = require('../conexao');

const SELEC_TAREFA =` 
    SELECT t.id, 
    t.titulo, 
    t.concluida, 
    t.id_categoria AS idCategoria
    c.nome AS categoria
    FROM tarefas t
    JOIN categorias c ON c.id = t.id_categoria 
`;

const paramJson = (linha) => ({
    ...linha, concluida: Boolean(linha.concluida)
});

const TarefaRepositorio ={
    async listar(){

    },

    async buscarPorId(){

    },

    async criar(){

    },

    async atualizar(){

    },

    async remover(){

    },

    async contarPorCategoria(){

    },

    
};

module.exports = TarefaRepositorio