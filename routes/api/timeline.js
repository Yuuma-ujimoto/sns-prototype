const express = require("express")
const router = express.Router()
const connection = require("../../config/mysql")


router.post("/get-timeline",
    (req, res, next) => {
        const user_id = req.session.user_id
        const sql = "select * from post where user_id in (select F.followed_id from follow F inner join user U on U.id = F.follow_id where user_id = ?) limit 100"
        connection.query(sql, user_id, (err, result) => {
            if (err) {
                console.log(err)
                res.json({error: true})
                return
            }
            res.json({error: false, result: result})
        })
    })

router.get("/get-global-timeline", (req, res) => {
    if (!req.session.user_id) {
        res.json({error: true})
        return
    }
    const sql = "select * from post P inner join user U on P.user_id = U.id"
    connection.query(sql,(err, result) => {
        if(err){
            console.log(err)
            res.json({error:true})
            return
        }
        res.json({error:false,result:result})
    })
})

module.exports = router