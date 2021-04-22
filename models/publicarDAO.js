const bd = require('../configMysql')

module.exports = {
    findBykeyword : (username, callback) => {
        let sql = 'SELECT * FROM user WHERE username=?'
        bd.query(sql,username, (err, data) => {
            if (err) throw err

            if (data.length>0)
                callback(data[0]) //Enviar el primer registro de la consulta
            else
                callback(null)
        })
    },
    getAllPublicacion : (callback) => {
        let sql = 'SELECT * FROM publicaciones'
        bd.query(sql,(err, data) => {
            if (err) throw err

            if (data.length > 0){
                callback(data)
            }
            else{
                callback(null)
            }

        })
    },
    getAllPublicacionWeb : (callback) => {
        condicion="programacion web";
        let sql = 'SELECT * FROM publicaciones WHERE seccion=?'
        bd.query(sql,condicion,(err, data) => {
            if (err) throw err

            if (data.length > 0){
                callback(data)
            }
            else{
                callback(null)
            }

        })
    },
    getAllPublicacionBD : (callback) => {
        condicion="base de datos";
        let sql = 'SELECT * FROM publicaciones WHERE seccion=?'
        bd.query(sql,condicion,(err, data) => {
            if (err) throw err

            if (data.length > 0){
                callback(data)
            }
            else{
                callback(null)
            }

        })
    },
    getAllPublicacionDiseno : (callback) => {
        condicion="diseño";
        let sql = 'SELECT * FROM publicaciones WHERE seccion=?'
        bd.query(sql,condicion,(err, data) => {
            if (err) throw err

            if (data.length > 0){
                callback(data)
            }
            else{
                callback(null)
            }
        })
    },

    getAllPublicacionPerfil : (idUser,callback) => {
        console.log("id user<<<>>>:" + idUser);
        let sql = 'SELECT * FROM publicaciones WHERE Id_user=?'
        bd.query(sql,idUser,(err, data) => {
            if (err) throw err

            console.log("si jala:" + data[0].titulo)

            if (data.length > 0){
                callback(data)
            }
            else{
                callback(null)
            }
        })
    }
    ,

    insertPublicacion : (publicacion, okCallback, failCallback) => {
        let sql = 'INSERT INTO publicaciones SET ?'
        bd.query(sql, publicacion, (err, data) => {
            if (err)
                return failCallback(err)
            else
                return okCallback(data)
        })
    },

    updatePublicacionDoc : (doc, idPub,okCallback, failCallback) => {
        let sql = 'UPDATE publicaciones SET doc=? WHERE Id_publicacion=?'
        bd.query(sql, [doc,idPub], (err, data) => {
            if (err)
                return failCallback(err)
            else
                return okCallback(data)
        })

    },

    deletePublicacion : (idPublicacion, callback) => {
        let sql = 'DELETE FROM publicaciones WHERE Id_publicacion = ?'
        bd.query(sql,idPublicacion, (err, data) => {
            console.log("err =>",err)
            console.log("data =>",data)
            try {
                if (err) throw new Err('Error en la eliminación')
                return callback(data)
            }
            catch (Err) {
                return callback(null)
            }
        })
    }
}