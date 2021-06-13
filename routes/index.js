const express = require("express")
const router = express.Router()
const connection = require("../config/mysql")


router.get("/",
    (req, res) => {
        const user_id = req.session.user_id
        if (!!user_id) {
            res.render("index/login-vue")
        } else {
            res.render("index/nologin")
        }
    })

router.get("/status/:id",(req, res) => {
    res.render("index/status",{status:req.params.id})
})

router.get("/user/:id", (req, res, next) => {
        const user_id = req.params.id
        res.render("index/user-page", {user_id: user_id})
    }
)

module.exports = router