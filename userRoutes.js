var express = require('express')
var router = express.Router()

//Uma forma é utilizando router.use((req, res, next)) ....
router.all('*', (req, res, next) => {
    console.log('Simples filtro')
    next()
})

//Rota raiz de /user
router.get('/', (req, res) => {
    res.json({ resposta: 'Cheguei a raiz da API de usuários.' })
})

//http://localhost:3000/user/details
router.get('/details', (req, res) => {
    res.json({ resposta: 'Cheguei aos detalhes da API de usuários.' })
})

module.exports = router