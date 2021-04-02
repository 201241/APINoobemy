const publicarDAO=require('../models/publicarDAO')


const getAllPublicacion = (req,res) => {
    publicarDAO.getAllPublicacion((data) =>{

        res.send({
            status: true,
            body: data
        })

    },err => {
        res.send({
            status:false,
            body: null
        })
    })
};

const getAllPublicacionWeb = (req,res) => {
    publicarDAO.getAllPublicacionWeb((data) =>{

        res.send({
            status: true,
            body: data
        })

    },err => {
        res.send({
            status:false,
            body: null
        })
    })
};

const getAllPublicacionBD = (req,res) => {
    publicarDAO.getAllPublicacionBD((data) =>{

        res.send({
            status: true,
            body: data
        })

    },err => {
        res.send({
            status:false,
            body: null
        })
    })
};

const getAllPublicacionDiseno = (req,res) => {
    publicarDAO.getAllPublicacionDiseno((data) =>{

        res.send({
            status: true,
            body: data
        })

    },err => {
        res.send({
            status:false,
            body: null
        })
    })
};

const addPublicacion = (req, res) => {
    console.log('addPublicacion => in')

        const publicacion = {
            Id_user: req.body.idUser,
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

const getAllPublicacionPerfil = (req,res) => {
    let idUser=req.params.idUser;
    publicarDAO.getAllPublicacionPerfil(idUser,(data) =>{

        res.send({
            status: true,
            body: data
        })

    },err => {
        res.send({
            status:false,
            body: null
        })
    })
};

const deletePublicacion = (req, res) => {
    publicarDAO.deletePublicacion(req.params.idPublicacion, data => {
        try {
            if (!data) throw new Err("Hubo un error en el proceso")
            if (data.affectedRows === 0) throw new Err(`Falló la eliminación del idPublicacion: ${req.params.idPublicacion}`)
            res.send({
                status: true,
                message: `Eliminación de idPublicacion: ${req.params.idPublicacion} fue exitosa`
            })
        }
        catch (Err) {
            res.send({
                status: false,
                message: '<Personalizar el mensaje de error'
            })
        }
    })
}

module.exports = {
    addPublicacion,
    getAllPublicacion,
    getAllPublicacionWeb,
    getAllPublicacionBD,
    getAllPublicacionDiseno,
    getAllPublicacionPerfil,
    deletePublicacion
}