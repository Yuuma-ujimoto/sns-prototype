const express = require("express")
const router = express.Router()

const mysql_config = require("../../config/mysql")
const connection = mysql_config


router.post("/post-re-tweet",
    (req, res, next) => {
        const user_id = req.session.user_id
        const type = req.body.type
        const rt_id = req.body.rt_id

        if (type === "rt") {
            const sql = "insert into post(user_id,type,rt_id) value(?,?,?)"
            connection.query(sql, [user_id, type, rt_id], (err) => {
                if (err) {
                    console.log(err)
                    res.json({error: true})
                    return
                }
                res.json({error: false})
            })
            return
        }
        res.json({error: true})

    })

router.post("/post-tweet",
    (req, res, next) => {
    const type = req.body.type
    if (type !== "tweet") {
        res.json({error: true})
        return
    }
    next()
},
    (req, res, next) => {
        const user_id = req.session.user_id
        const text = req.body.text
        const type = req.body.type
        const sql = "insert into post(user_id,text,type) value(?,?,?)"
        connection.query(sql,
            [user_id,text,type],
            (err) => {
            if(err){
                console.log(err)
                res.json({error:true})
                return
            }
            res.json({error:false})
        })

})

router.post("/delete-post",(req, res, next) => {
    const user_id = req.session.user_id
    const post_id = req.body.post_id
    const sql = "select count(*) as count from post where user_id = ? and id = ?"
    connection.query(sql,[user_id,post_id],(err, result) => {
        if(err){
            console.log(err)
            res.json({error:true})
            return
        }
        if(!result[0].count){
            console.log("存在しないIDの組み合わせ")
            res.json({error:true})
            return;
        }
        next()
    })
},(req, res, next) => {
    const post_id = req.body.post_id
    const sql = "update post set soft_delete = 1 where id = ?"
    connection.query(sql,[post_id],(err, result) => {
        if(err){
            console.log(err)
            res.json({error:true})
            return
        }
        res.json({error:false})
    })
})

module.exports = router