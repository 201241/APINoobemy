const mysql = require('mysql');

const config = {
    host : 'localhost',
    user : 'user.nodejs',
    database: 'bdwebstorn',
    password: '201241',
};

const conn = mysql.createConnection(config);

conn.connect(function(err) {
    if (err) throw err;
    console.log('Conexión a la base de datos exitosa!');
});


module.exports = conn;