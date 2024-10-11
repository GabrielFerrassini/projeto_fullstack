const express = require('express')
const app = express()
app.use(express.json())
const cors = require("cors")
app.use(cors())

//GET http://localhost:3000/hey
app.get('/hey', (req, res) => {
    res.send('hey')
})

let filmes = [
    {
        titulo: "Divertidamente",
        sinopse: "Com a mudança para uma nova cidade, as emoções de Riley, que tem apenas 11 anos de idade, ficam extremamente agitadas. Uma confusão na sala de controle do seu cérebro deixa a Alegria e a Tristeza de fora, afetando a vida de Riley radicalmente.",
    },
    {
        titulo: "Indiana Jones e o Chamado do Destino",
        sinopse: "O lendário herói arqueólogo está de volta neste aguardado capítulo final da icônica franquia, uma incrível e empolgante aventura cinematográfica."
    }
]

app.post("/filmes", (req, res) => {
    //obtém os dados enviados pelo cliente
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    //monta um objeto agrupando os dados. Ele representa um novo filme
    const filme = { titulo: titulo, sinopse: sinopse }
    //adiciona o novo filme à base
    filmes.push(filme)
    //responde ao cliente. Aqui, optamos por devolver a base inteira ao cliente, embora não seja obrigatório.
    res.json(filmes)
})

app.get('/filmes', (req, res) => {
    res.json(filmes)
})


app.listen(3000, () => console.log("up and running"))