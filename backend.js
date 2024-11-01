const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const e = require('express')
const app = express()
app.use(express.json())
app.use(cors())



const Filme = mongoose.model("Filme", mongoose.Schema({
    titulo: {type: String},
    sinopse: {type: String}
}))
const usuarioSchema = mongoose.Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model ("Usuario", usuarioSchema)

async function conectarAoMongo() {
    await mongoose.connect(`mongodb+srv://alu_gab:1234@gabrielferrassini.s9b3q.mongodb.net/?retryWrites=true&w=majority&appName=GabrielFerrassini`)
}


app.get ('/filmes', async (req, res) => {
    const filmes = await Filme.find()
    res.json(filmes)
})

app.post ('/filmes', async (req, res) => {
    //capturar as informações enviadas e trazer para o contexto
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    //montar um json novo com as informações recebidas
    // const filme_novo = {titulo: titulo, sinopse:sinopse}
    // //acrescenta o novo filme à base de dados
    // filmes.push(filme_novo)
    // //exibir a base atualizada
    const filme = new Filme({titulo: titulo, sinopse: sinopse})
    await filme.save()
    const filmes = await Filme.find
    res.json(filmes)
})

app.post ('/signup', async (req, res) => {
    try {
        const login = req.body.login
        const password = req.body.password
        const password_criptografada = await bcrypt.hash(password, 10)
        const usuario = new Usuario ({login: login, password: password_criptografada})
        const respMongo = await usuario.save()
        console.log(respMongo)
        res.status(201).end()
    }
    catch (e) {
        console.log(e)
        res.status(409).end()
    }
    
})
app.post ('/login', async (req, res) => {
    const login = req.body.login
    const password = req.body.password
    //verificar se o usuario existe
    const usuarioExiste = await Usuario.findOne({login:login})
    if (!usuarioExiste) {
        return res.status(401).json({mensagem: "Login inválido"})
    }
    //verificar senha e dar continuidade 
    const senhaValida = await bcrypt.compare (password, usuarioExiste.password)
    if (!senhaValida) {
        return res.status(401).json({menssagem: "senha invalida"})

    }
        const token = jwt.sign (
        {logi: login},
        "id-secreto",
        {expiresIn: "1h"}
    )
    res.status(200).json({token: token})


})

app.listen (3000, () => {
    try{
        conectarAoMongo()
        console.log("server up & running & connection ok")
    }
    catch{
        console.log("erro de conexão", e)
    }
})