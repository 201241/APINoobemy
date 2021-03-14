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
    insertPublicacion : (publicacion, okCallback, failCallback) => {
        let sql = 'INSERT INTO publicaciones SET ?'
        bd.query(sql, publicacion, (err, data) => {
            if (err)
                return failCallback(err)
            else
                return okCallback(data)
        })
    }
}