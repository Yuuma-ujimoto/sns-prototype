const express = require("express")
const router = express.Router()
const connection = require("../../config/mysql")

router.post("/fav",
    (req, res, next) => {
        const user_id = req.session.user_id
        const post_id = req.body.post_id
        const sql =  "select count(*) as count from fav where user_id = ? and post_id = ? ;select count(*) as count from post where user_id = ? and id = ?"
        connection.query(sql,[user_id,post_id,user_id,post_id],(err, result) => {
            if(err){
                console.log(err)
                res.json({error:true})
                return
            }
            // 0 = 0 1 = 0
            if(result[0][0].count||result[1][0].count){
                res.json({error:true})
                return
            }
            next()
        })
    },(req, res, next) => {
    const user_id = req.session.user_id
        const post_id = req.body.post_id
        const sql = "insert into fav(user_id,post_id) values(?,?)"
        connection.query(sql,[user_id,post_id],(err) => {
            if(err){
                console.log(err)
                res.json({error:true})
                return
            }
            res.json({error:false})
        })
    })


module.exports = router