const express = require("express")
const router = express.Router()
const connection = require("../../config/mysql")

router.post("/search",(req, res, next) => {
    const sql = "select from post where text like %?%"
})


module.exports = router