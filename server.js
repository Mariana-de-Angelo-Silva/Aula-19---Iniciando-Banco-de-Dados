const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000; // variável de ambiente:  prop sistema - variáveis enquanto o sismtema funiciona // confere se o sistema tem a rota, se não, ele usa o 3000


app.use(express.json());

 // aqui ele responde, mas vamos verificar se é um erro de banco - ele não expõe a tabela, ele mostra apenas o erro para não expor o banco
function responderErro(res,status, erro){
    if(erroDeBanco(erro)) throw erro;
    res.status(status).json({erro: erro.message})
}

// ========== CRUD - CATEGORIA ==========

    // Get:

    app.get('/categorias', async (req,res) =>{
        res.json(await TarefaService.listarCategorias()); // como estamos puxando info. de BD, precisamos do await pra indicar que o sistema deve esperar um retorno, se não, travaria a tela
    });


//========== CRUD - TAREFA ==========

    //Get

    //Get - tarefas concluídas: /tarefas?concluidas=true -> somente as tarefas concluídas --- o filtro ? vira um WHERE com "@concluidas"


    app.get('/tarefas', async (req,res) =>{
        const { concluida } = req.query;
        if(concluida !== undefined  // testando se a requisisão tem um desses valores
            && concluida !== 'true'
            && concluida !== 'false') {
                return res.status(400).json({
                    erro: '"Concluida" deve ser true ou false.'
                });
            }
        res.json(await  // enviando a resposta para undefined e true (o false já foi barrado no if)
            TarefaService.listarTarefas(concluida === undefined 
                ? undefined : concluida = 'true'
            ));
    });



app.listen(PORT, () => {
    console.log(`Demo MySQL em http://localhost:${PORT}`)
})