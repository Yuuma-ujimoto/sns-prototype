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
                    res.json({error: true,message:"server error"})
                    return
                }
                res.json({error: false})
            })
            return
        }
        res.json({error: true,message:"data error"})

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
            [user_id, text, type],
            (err) => {
                if (err) {
                    console.log(err)
                    res.json({error: true})
                    return
                }
                res.json({error: false})
            })

    })

router.post("/get-status", (req, res, next) => {
    const post_id = req.body.post_id
    const sql = "select count(*) as count from post where id = ?"
    connection.query(sql, [post_id], (err, result) => {
        if (err) {
            res.json({error: true})
            return
        }
        if (!result[0].count) {
            res.json({error: true})
            return
        }
        next()
    })
}, (req, res, next) => {
    const post_id = req.body.post_id
    const sql = "select * from post P inner join user U on P.user_id = U.id where P.id = ?;"+
                "select * from post P inner join user U on P.user_id = U.id where P.type = 'reply' and P.activity_id = ?"
    connection.query(sql, [post_id,post_id], (err, result) => {
        if (err) {
            res.json({error: true})
            return
        }
        res.json({error: false, result: result[0][0],reply:result[1]})
    })
})



router.post("/delete-post", (req, res, next) => {
    const user_id = req.session.user_id
    const post_id = req.body.post_id
    const sql = "select count(*) as count from post where user_id = ? and id = ?"
    connection.query(sql, [user_id, post_id], (err, result) => {
        if (err) {
            console.log(err)
            res.json({error: true})
            return
        }
        if (!result[0].count) {
            console.log("存在しないIDの組み合わせ")
            res.json({error: true})
            return;
        }
        next()
    })
}, (req, res, next) => {
    const post_id = req.body.post_id
    const sql = "update post set soft_delete = 1 where id = ?"
    connection.query(sql, [post_id], (err, result) => {
        if (err) {
            console.log(err)
            res.json({error: true})
            return
        }
        res.json({error: false})
    })
})


router.post("/post-reply", (req, res, next) => {
    const user_id = req.session.user_id
    const post_id = req.body.post_id

    const text = req.body.text

    if (!user_id || !post_id || !text) {
        res.json({error: true})
        return
    }

    connection.query("select count(*) as count from post where id = ?", [post_id], (err, result) => {
        if (err) {
            console.log(err)
            res.json({error: true})
            return
        }
        if (!result[0].count) {
            res.json({error: true})
            return
        }
        next()
    })
}, (req, res, next) => {
    const user_id = req.session.user_id
    const text = req.body.text

    // 返信先
    const activity_id = req.body.post_id


    const sql = "insert into post(user_id,text,type,activity_id) values(?,?,'reply',?)"
    connection.query(sql,[user_id,text,activity_id],err => {
        if(err){
            console.log(err)
            res.json({error:true})
            return
        }
        res.json({error:false})
    })
})

module.exports = router