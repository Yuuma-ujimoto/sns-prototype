const express = require("express")
const router = express.Router()
const connection = require("../../config/mysql")


router.post("/follow",(req, res, next) => {
        const user_id = req.session.user_id;
        const followed_user_id = req.body.followed_user_id
        const sql = "select id from user where user_set_id = ?"
        connection.query(sql,[followed_user_id],(err, result) => {
            if(err){
                console.log(err)
                res.json({error:true})
                return
            }
            if(result[0].id === user_id){
                res.json({error:true,message:"自分をフォローすることは出来ません。"})
                return
            }
            next()
        })
    },
    (req, res, next) => {
        const user_id = req.session.user_id;
        const followed_user_id = req.body.followed_user_id

        const sql = "select count(*) as count from follow where follow_user_id = ? and followed_user_id = (select id from user where user_set_id = ?)"
        connection.query(sql, [user_id, followed_user_id], (err, result) => {
            if (err) {
                console.log(err)
                res.json({error: true})
                return
            }
            if (result[0].count) {
                res.json({error: true})
                return
            }

            next()
        })
    }, (req, res) => {
        const user_id = req.session.user_id;
        const followed_user_id = req.body.followed_user_id
        const sql = "insert into follow values(?,(select id from user where user_set_id = ?))"
        connection.query(sql, [user_id, followed_user_id], (err, result) => {
            if (err) {
                console.log(err)
                res.json({error: true})
            }
            res.json({error: false})
        })
    })



// follow解除
router.post("/un-follow", (req, res, next) => {
    const user_id = req.session.user_id
    const followed_user_id = req.body.followed_user_id
    if (!user_id || !followed_user_id) {
        res.json({error: true})
        return
    }
    const sql = "select count(*) as count from follow where follow_user_id = ? and followed_user_id = (select id from user where user_set_id = ?)"
    connection.query(sql, [user_id, followed_user_id], (err, result) => {
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
    const followed_user_id = req.body.followed_user_id
    const sql = "delete from follow where  follow_user_id = ? and followed_user_id = (select id from user where user_set_id = ?)"
    connection.query(sql, [user_id, followed_user_id], err => {
        if (err) {
            console.log(err)
            res.json({error: true})
            return
        }
        res.json({error: false})
    })
})

// フォローしてるか確認
router.post("/check-follow",(req, res,next) => {
    const user_id = req.session.user_id;
    const followed_user_id = req.body.followed_user_id;
    const sql = "select count(*) as count from follow where follow_user_id = ? and followed_user_id = (select id from user where user_set_id = ?)"
    connection.query(sql,[user_id,followed_user_id],(err, result) => {
        if(err){
            console.log(err)
            res.json({error:true})
            return
        }
        if(result[0].count){
            res.json({error:false,follow:true})
            return
        }
        res.json({error:false,follow:false})
    })
})


// followしてる人
router.post("/get-follow-list",(req, res) => {
//    const user_id = req.session.user_id
    const follow_user_id = req.body.followed_user_id
    const sql = "select * from follow where follow_user_id = ?"
    connection.query(sql,[follow_user_id],(err, result) => {
        if(err){
            console.log(err)
            res.json({error:true})
            return
        }
        res.json({error:false,result:result})
    })
})

//フォロワー
router.post("/get-followed-list",(req, res) => {
//    const user_id = req.session.user_id
    const follow_user_id = req.body.followed_user_id
    const sql = "select F.follow_id from follow F inner join user U on F.follow_user_id = U.user_set_id where F.followed_user_id = ?"
    connection.query(sql,[follow_user_id],(err, result) => {
        if(err){
            console.log(err)
            res.json({error:true})
            return
        }
        res.json({error:false,result:result})
    })
})

router.post("/get-follow-count",(req, res, next) => {
    const follow_id = req.body.follow_user_id
    const sql = "se"
})

module.exports = router