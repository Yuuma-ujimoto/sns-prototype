const express = require("express")
const router = express.Router()
const crypto = require("crypto")

const connection = require("../config/mysql")

router.get("/", (req, res) => {
    res.render("sign-in")
})

router.post("/check", async (req, res, next) => {
        const mail_address = req.body.mail_address
        const password = req.body.password

        const hash = crypto.createHash("sha1")
        hash.update(password)
        const crypto_password = hash.digest("hex")

        const sql = "select count(*) as count from user_data where mail_address = ? and password = ?"
        const result =  await connection.query(sql, [mail_address, crypto_password])

    }
    , (req, res) => {
        const sql = "select id from user_data where mail_address = ?"
        const mail_address = req.body.mail_address
        connection.query(sql,
            [mail_address],
            (err, result) => {
            if (err) {
                console.log(err)
                res.render("error", {error: 6})
            }
            console.log(result)
            req.session.user_id = result[0].id
            res.redirect("/")
        })
    }
)

module.exports = router