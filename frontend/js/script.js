const protocolo = 'http://'
const baseURL = 'localhost:3000'
const filmesEndpoint = '/filmes'

async function obterFilmes() {
    const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`
    const filmes = (await axios.get(URLcompleta)).data

    let tabela = document.querySelector('.filmes')
    let corpoTabela = tabela.getElementsByTagName('tbody')[0]
    for (let filme of filmes) {
        //para cada filme, inserir uma linha 
        let linha = corpoTabela.insertRow(0)
        //para cada linha insere duas celulas
        let celulaTitulo = linha.insertCell(0)
        let celulaSinopse = linha.insertCell(1)
        //atribui o html para cada celula
        celulaTitulo.innerHTML = filme.titulo
        celulaSinopse.innerHTML = filme.sinopse
    }





    //console.log(filmes)
    
}
