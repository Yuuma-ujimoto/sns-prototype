const mysql = require("mysql2")

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"sns",
    multipleStatements: true

})

module.exports = connection