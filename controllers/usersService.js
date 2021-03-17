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
    let idUser= req.params.idUser;
    userDAO.getAllUsers(idUser, (data) =>{

        res.send({
            status: true,
            message: 'Usuario datos...',
            body: data
        })
    },err =>{
        res.send({
            status:false,
            body:null
        })
    })
}

const update = (req, res) => {
    console.log('update => in')

    const userUpDate = {
        idUser: req.body.idUser,
        nombre : req.body.nombre,
        apellidoPaterno : req.body.apellidoPaterno,
        username : req.body.username,
        password : bcrypt.hashSync(req.body.password,10)
    }

    userDAO.upDate(userUpDate, (data) => {
        res.send({
            status: true,
            message: 'Usuario actualizado exitosamente'
        })
    }, err => {
        res.send({
            status:false,
            message: 'Ha ocurrido un error al actualizar la cuenta de usuario',
            errorMessage: err
        })
    })
}

module.exports = {
    usernameValidate,
    signup,
    login,
    getDatos,
    update
}















