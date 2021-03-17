const bd = require('../configMysql')

module.exports = {
    findByUsername : (username, callback) => {
        let sql = 'SELECT * FROM user WHERE username=?'
        bd.query(sql,username, (err, data) => {
            if (err) throw err

            if (data.length>0)
                 callback(data[0])  //Enviar el primer registro de la consulta
            else
                 callback(null)
        })
    },
    getAllUsers : (idUser, callback) => {
        console.log("id user:" + idUser);
        let sql = 'SELECT * FROM user WHERE idUser=?'
        bd.query(sql,idUser, (err, data) => {
            if (err) throw err

            console.log("si jala:" + data[0])

            if (data.length>0)
                callback(data[0]) //Enviar el primer registro de la consulta

            else
                callback(null)
        })
    },
    insertUser : (user, okCallback, failCallback) => {
        let sql = 'INSERT INTO user SET ?'
        bd.query(sql, user, (err, data) => {
            if (err)
                return failCallback(err)
            else
                return okCallback(data)
        })
    },
    upDate : (userUpDate, okCallback, failCallback) => {
        idUser = userUpDate.idUser;
                                                    //UPDATE Persona SET Direccion='Calle 15 # 12 - 89' WHERE Apellido = 'Gil';
        let sql = 'UPDATE user SET ? WHERE idUser=?'
        //UPDATE user SET ? where idUser=14;
        bd.query(sql, userUpDate,idUser, (err, data) => {
            if (err)
                return failCallback(err)
            else
                return okCallback(data)
        })
    }

}
