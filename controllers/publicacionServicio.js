const publicarDAO=require('../models/publicarDAO')

const addPublicacion = (req, res) => {
    console.log('addPublicacion => in')

        const publicacion = {
            titulo : req.body.titulo,
            comentario : req.body.comentario,
            doc : req.body.doc

        }

        publicarDAO.insertPublicacion(publicacion, (data) => {
            res.send({
                status: true,
                message: 'Publicacion completa'
            })
        }, err => {
            res.send({
                status:false,
                message: 'Publicacion no pudo ser subida',
                errorMessage: err
            })
        })

}


module.exports = {
    addPublicacion
}