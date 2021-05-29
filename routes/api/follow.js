const express = require("express")
const router = express.Router()
const connection = require("../../config/mysql")



router.get("/follow",
    (req, res, next) => {
        const user_id = req.session.user_id;
        const followed_user_id = req.body.followed_user_id
        const sql = "select count(*) from follow where follow_id = ? and followed_id = ?"

    })

module.exports = router