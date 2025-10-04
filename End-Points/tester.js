const fs = require("fs")
const path = require("path")

let caminho = path.join(__dirname, "endpoints.json")

fs.readFile(caminho, "utf-8", (err, conteudo) => {
    if (err) {
        console.error(`Erro ler o arquivo: ${err}`)
    }

    let endpoints = JSON.parse(conteudo)

    let fakeResponses  = {
        '/users': {
            GET: {
                status: 200,
                body: [
                    { id: 1, name: "exemplo1" },
                    { id: 2, name: "exemplo2" }
                ]
            },
            POST: {
                status: 201,
                body: [
                    { id: 3, name: "exemplo3", email: "exemplo3@gmail.com" },
                    { id: 4, name: "exemplo4", email: "exemplo4@gmail.com" },
                ]
            }
        }
    }

    let getEndPointGet = endpoints.find(api => api.method === "GET");

    let responseGet = fakeResponses[getEndPointGet.url][getEndPointGet.method]

    let statusReturnedGet;
    if (responseGet.status === getEndPointGet.expectedStatus) {
        statusReturnedGet = "pass"
    } else {
        statusReturnedGet = "fail"
    }

const fieldsTestGet = responseGet.body.every(user => getEndPointGet.expectedField.every(field => field in user)
) ? "pass" : "fail"


    let getPointPost = endpoints.find(api => api.method === "POST")

    let responsePost = fakeResponses[getPointPost.url][getPointPost.method]
    let statusReturnedPost;
    if(responsePost.status === getPointPost.expectedStatus) {
        statusReturnedPost = "pass"
    } else {
        statusReturnedPost = "fail"
    }

    const fieldsTestPost = responsePost.body.every(user => getPointPost.expectedField.every(field => field in user)
) ? "pass" : "fail"

    console.log({ statusReturnedGet, fieldsTestGet })
    console.log({ statusReturnedPost, fieldsTestPost })
})