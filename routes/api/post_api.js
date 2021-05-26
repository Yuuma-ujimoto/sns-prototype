const express = require("express")
const router = express.Router()

const mysql_config = require("../../config/mysql")
const connection = mysql_config


router.post("/post-re-tweet",
    (req, res, next) => {
        const user_id = req.session.user_id
        const type = req.body.type
        const rt_id = req.body.rt_id

        if(type==="rt"){
            const sql = "insert into post(user_id,type,rt_id) value(?,?,?)"
            connection.query(sql,[user_id,type,rt_id],(err) => {
                if(err){
                    console.log(err)
                    res.json({error:true})
                    return
                }
                res.json({error:false})
            })
            return
        }
        res.json({error:true})

    })

router.post("/post-tweet",(req, res, next) => {
    const user_id = req.session.user_id
    const text = req.body.text
    const type = req.body.type
})

module.exports = router