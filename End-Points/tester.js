const fs = require("fs")
const path = require("path")

let caminho = path.join(__dirname, "endpoints.json")

fs.readFile(caminho, "utf-8", (err, conteudo) => {
    if (err) {
        console.error(`Erro ler o arquivo: ${err}`)
    }

    let entpoint = JSON.parse(conteudo)
    console.log(entpoint)
})

let fakeResponose = {
    '/users': {
        GET: {
            status: 200,
            body: [
                { id: 1, name: "exemplo1" },
                { id: 2, name: "exemplo2" }
            ]
        }
    }
}