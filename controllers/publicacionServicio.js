const publicarDAO=require('../models/publicarDAO')


const getAllPublicacion = (req,res) => {
    publicarDAO.getAllPublicacion((data) =>{
        try {
            if (!data) throw new Err("Publicacion vacío")

            res.send({
                status: true,
                data: data
            })
        }
        catch(Err) {
            res.send({
                status: false,
                message: 'Publicacion vacío'
            })
        }
    }, err=>{

    })
};

const addPublicacion = (req, res) => {
    console.log('addPublicacion => in')

        const publicacion = {
            titulo : req.body.titulo,
            seccion: req.body.seccion,
            comentario : req.body.comentario,
            doc : req.body.doc

        }
        console.log(publicacion.seccion)
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
    addPublicacion,
    getAllPublicacion
}