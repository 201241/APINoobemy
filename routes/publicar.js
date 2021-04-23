const express = require('express');
const router = express.Router();
const usersService = require('../controllers/usersService')
const publicacionServicio = require('../controllers/publicacionServicio')
const jwt = require('jsonwebtoken')
const configuration = require('../ConfigServer')

//Zona de Middleware
router.use('/', (req, res, next) => {
    //Paso 1.
    const token =req.headers['authorization']
    if (!token){
        next()
        req.user = null
        return
    }
    jwt.verify(token,configuration.jwt.secret,(err, user)=>{
        if (err)
            req.user = null
        else
            req.user = user
        next()
    })
})

//Zona de Routing
router.get('/getAllPublicacion/',publicacionServicio.getAllPublicacion);
router.get('/getAllPublicacionWeb/',publicacionServicio.getAllPublicacionWeb);
router.get('/getAllPublicacionBD/',publicacionServicio.getAllPublicacionBD);
router.get('/getAllPublicacionDiseno/',publicacionServicio.getAllPublicacionDiseno);
router.get('/getAllPublicacionMatematicas',publicacionServicio.getAllPublicacionMatematicas);
router.post('/addPublicacion',publicacionServicio.addPublicacion)  //Servicio exclusivo para usuarios validados
router.get('/getAllPublicacionPerfil/:idUser',publicacionServicio.getAllPublicacionPerfil)
router.delete('/deletePublicacion/:idPublicacion',publicacionServicio.deletePublicacion)

//publicar/getAllPublicacionDiseño
// getAll
// getAllWeb
//getAllPublicacionBD
//router.post('/login',usersService.login)


module.exports = router;