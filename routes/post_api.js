const express = require("express")
const router = express.Router()



router.post("/post-tweet",
    (req, res, next) => {
        const user_id = req.session.user_id

    })

module.exports = router