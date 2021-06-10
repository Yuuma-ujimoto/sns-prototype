const express = require("express")
const router = express.Router()
const connection = require("../../config/mysql")


router.post("/follow",
    (req, res, next) => {
        const user_id = req.session.user_id;
        const followed_user_id = req.body.followed_user_id
        const sql = "select count(*) as count from follow where follow_user_id = ? and followed_user_id = ?"
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

router.post("/un-follow", (req, res, next) => {
    const user_id = req.session.user_id
    const followed_user_id = req.body.followed_user_id
    if (!user_id || !followed_user_id) {
        res.json({error: true})
        return
    }
    const sql = "select count(*) as count from follow where follow_user_id = ? and followed_user_id = ?"
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
    const sql = "delete from follow where  follow_user_id = ? and followed_user_id = ?"
    connection.query(sql, [user_id, followed_user_id], err => {
        if (err) {
            console.log(err)
            res.json({error: true})
            return
        }
        res.json({error: false})
    })
})

module.exports = router