require('dotenv').config();
const sql = require('mssql/msnodesqlv8')

function textoDeConexao(banco){
    const servidor = process.env.DB_SERVER || 'localhost\\SQLEXPRESS';
    const driver = process.env.DB_DRIVER || 'SQL Server';
    const database = banco ? `Database=${banco};` : '';


    const confiar = /ODBC Driver|Native Client/.test(driver) ?
                                    'TrustServerCertificate=Yes;' : '';

    return `Driver = {${driver}}; Server=${servidor};
                                ${database}Trusted_Connection=Yes; ${confiar}`;
}


const pool = new sql.ConnectionPool({
    conectionString: textoDeConexao(process.env.DB_NAME),
    pool: {max: 10}, 
});


let conectanto;
function conectar(){ //tenta conectar, se der certo, ele exibe a conexão, se não, ele tenta outra vez
    if(!conectando){
        conectando = pool.connect().catch((erro) => {
            conectanto = undefined;
            throw erro;
        });
    }
    return conectanto;
}

async function consultar (texto,parametros ={}) {
    await conectar();

    const pedido = pool.request();
    for(const[nome, valor] of Object.entries(parametros)) pedido.input(nome,valor);
    return pedido.query(texto);
}

async function fechar() {
    await pool.close();
}

const erroDeBanco = (erro) => erro instanceof sql.MSSQLError;

module.exports = { consultar, fechar, erroDeBanco, textoDeConexao,sql}; 