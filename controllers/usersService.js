const userDAO = require('../models/usersDAO')
const bcrypt = require('bcrypt')
const jwt = require('../utils/GenerateJWT')

const usernameValidate = (req, res) => {
    userDAO.findByUsername(req.params.username, (data) =>{
        try {
            if (!data) throw new Err("Usuario disponible")

            res.send({
                status: true,
                message: 'Usuario ocupado'
            })
        }
        catch(Err) {
            res.send({
                status: false,
                message: 'Usuario disponible'
            })
        }
    })
}

const signup = (req, res) => {
    console.log('Signup => in')

    const user = {
        nombre : req.body.nombre,
        apellidoPaterno : req.body.apellidoPaterno,
        username : req.body.username,
        password : bcrypt.hashSync(req.body.password,10)
    }

    userDAO.insertUser(user, (data) => {
        res.send({
            status: true,
            message: 'Usuario creado exitosamente'
        })
    }, err => {
        res.send({
            status:false,
            message: 'Ha ocurrido un error al crear la cuenta de usuario',
            errorMessage: err
        })
    })

}

const login = (req,res) => {
    let username = req.body.username
    let password = req.body.password
    userDAO.findByUsername(username, (data) => {
        if (data) {
            console.log('Data =>',data)
            if (bcrypt.compareSync(password, data.password)){
                res.send({
                    status: true,
                    message: 'Contraseña correcta',
                    token: jwt.generateToken(data),
                    idUser: data.idUser
                })
            } else {
                res.send({
                    status: false,
                    message: 'Contraseña incorrecta'
                })
            }
        } else {
            res.send({
                status: false,
                message: 'La cuenta de usuario no existe'
            })
        }
    })
}

const getDatos = (req, res) => {
//
    userDAO.getAllUsers(req.params.userId, (data) =>{
        try {
            if (!data) throw new Err("Usuario disponible")

            res.send({
                status: true,
                message: 'encontrados',
                datos: data.username
            })
        }
        catch(Err) {
            res.send({
                status: false,
                message: 'no encontrados'
            })
        }
    })
}

module.exports = {
    usernameValidate,
    signup,
    login,
    getDatos
}















