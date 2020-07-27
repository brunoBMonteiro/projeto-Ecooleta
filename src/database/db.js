// importar a dependencia do sqlite3
const sqlite3 = require ("sqlite3").verbose()

//criar o objeto que ira fazer operaçoes no banco de dados

const db = new sqlite3.Database("./src/database/database.db")

//ultilizar o objeto de banco de dados, para nossa operaçôes 
db.serialize(() => {
    // com comandos SQL eu vou:

    //1 criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT, 
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    //2 inserir dados na tabela
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
        "Colectoria",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Residuos Eletrônicos, Lâmpadas"

    ]

    function afterInsertData(err) {
        if(err) {
            return console.log (err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

    }
    
    db.run(query, values, afterInsertData) 
       
    //3 consultar os dados da tabela

    //4 Deletar um dado da tebala
})