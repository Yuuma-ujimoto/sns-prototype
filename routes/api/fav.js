const express = require("express")
const router = express.Router()


router.post("/",
    (req, res, next) => {
        const user_id = req.session.user_id
        const fav_id = req.body.post_id
        const sql =  "select count(*)"
    })

module.exports = router