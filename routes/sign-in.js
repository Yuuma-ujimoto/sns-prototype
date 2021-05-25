const express = require("express")
const router = express.Router()
const mysql_config = require("../config/mysql")
const connection = mysql_config



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
    next()
},(req, res, next) => {

})

module.exports = router