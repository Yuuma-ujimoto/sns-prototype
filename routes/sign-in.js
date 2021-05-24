const express = require("express")
const router = express.Router()
const mysql = require("mysql2/promise")

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db-name",
    multipleStatements: true
})


router.get("/", (req, res) => {
    res.render("sign-in", {error: false})
})

router.post("/", async (req, res, next) => {
    const mail_address = req.body.mail_address
    const password = req.body.password
    const post_data_check = !mail_address || !password
    if (post_data_check) {
        res.render("sign-in", {error: true,})
        return
    }

    try {
        const check_auth_sql = "select count(*) as count from user where mail_address = ? and password = ?"
        const [rows0, field0] = await connection.query(sql, [mail_address, password])
        if(!rows[0].count){
            res.render("sign-in",{error:false,result:false})
            return
        }
        const get_user_id_sql = "select id from user where mail_address = ? and password = ?"
        const [rows1, field1] = await connection.query(sql, [mail_address, password])
        req.session.user_id = rows1[0].id
        res.redirect("/")
    } catch (e) {
        console.log(e)
        res.render("sign-in", {error: true})
    }
})

module.exports = router