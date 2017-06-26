const express = require('express')
const app = express()

//Arquivos de rotas separados
var userRouter = require('./userRoutes')
//Parser
var bodyParser = require('body-parser')
//Inclusão do parser
app.use(bodyParser.json())

//Meu Primeiro middleware
app.use( (req, res, next) => {
    console.log('Incluído um primeiro Middleware que intercepta as chamadas as APIs.')
    next()
}, (req, res, next) => {
    console.log('Incluído um segundo Middleware que intercepta as chamadas as APIs.')
    next()
} ) 

//Outro Middleware
app.use((req, res, next) => {
    console.log('Incluído um terceiro Middleware que intercepta as chamadas as APIs.')
    next()
} )

//Inclusão das rotas na cadeia de rotas
app.use('/user', userRouter)

//Primeira API com resposta normal
app.get('/', (req, res) => {
    console.log('Nossa primeira API.')
    res.send('Seja bem vindo ao express.')
})

//Retorna os dados em JSON
app.get('/json/resp', (req, res) => {
    var obj = {
        date: Date.now(),
        resposta: 'Chamada bem sucedida.'
    }
    res.send(obj)//res.json(obj)
})

//API enviando parametros
//Muito utilizado para os métodos DELETE e PUT para remoção ou atualização
app.get('/parametrouri/:userId', (req, res) => {
    console.log(req.params)
    var obj = {
        idRecebido: req.params.userId
    }
    res.send(obj)//res.json(obj)
})

//Utilizado para criação de objetos
app.post('/incluir', (req, res) => {
    console.log(req.body)
    var obj = {
        nomeRecebido: req.body.nome
    }
    res.send(obj)//res.json(obj)
})

//Tratamento de erros
var handleErrors = (err, req, res, next) => {
    console.log('Tratar qualquer erro de alto nível aqui.')
    console.log(err)
    res.status(500).json({resposta: 'Algo está errado'})
}
//Erro tratado aqui
//Deve estar depois de todas as rotas
app.use(handleErrors)



const PORT = 3000
const HOST = 'localhost'
//Inicializa o Servidor
app.listen(PORT, () => {
    console.log('O servidor está respondendo em http://%s:%s', HOST, PORT )
})