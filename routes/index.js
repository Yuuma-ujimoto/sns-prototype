const express = require("express")
const router = express.Router()
const connection = require("../config/mysql")


router.get("/",
    (req, res) => {
        const user_id = req.session.user_id
        if (!!user_id) {
            res.render("index/login")
        } else {
            res.render("index/nologin")
        }
    })

router.get("/user/:id", (req, res, next) => {
        const user_id = req.params.id
        res.render("index/user-page", {user_id: user_id})
    }
)

module.exports = router