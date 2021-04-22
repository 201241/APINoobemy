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

    const publicacion = {
        Id_user: req.body.idUser,
        titulo : req.body.titulo,
        seccion: req.body.seccion,
        comentario : req.body.comentario
    }

    publicarDAO.insertPublicacion(publicacion, (data) => {
        let status = {
            status: true,
            description: null
        }

        if(req.files.doc){
            const doc = req.files.doc;
            const fileName = doc.name;
            const path = __dirname + '/../public/uploads/' + fileName;

            try{
                doc.mv(path,(error)=> {
                    if (error) throw new Error("Problemas al mover el archivo")
                    publicarDAO.updatePublicacionDoc('/uploads/'+fileName, data.insertId,
                        data => {
                        status.description = "Registro almacenado correctamente"
                            res.status(200).send(status);
                        },
                        error =>{
                        status.description = "Hunieron problemas al actualizar la ruta del doc"
                            res.status(200).send(status);
                        })
                })
            } catch (e) {
                status.description = " Registro almacenado correctamente, pero hubieron problemas al mover el archivo"
                res.status(200).send(status);
            }
        } else {
            status.description = "Registro almacenado correctamente, sin doc (imagen)"
            res.send(status)
        }

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