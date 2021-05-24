const express = require("express")
const router = express.Router()
const mysql = require("mysql2/promise")

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db-name",
    multipleStatements: true
})

router.get("/",(req, res) => {
    res.render("sign-up",{error:false})
})

router.post("/",async (req, res, next) => {
    const mail_address = req.body.mail_address
    const user_name = req.body.user_name
    const password = req.body.password

    // メールアドレス正規表現チェック
    const mail_pattern = /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+$/
    if(!mail_address.match(mail_pattern)){
        res.render("sign-up",{error:true})
        return
    }

    const post_data_check =  !mail_address||!password||!user_name
    if(post_data_check){
        res.render("sign-up",{error:true})
        return
    }

    try {
        const check_mail_address_sql = "select count(*) as count from user where mail_address = ?"

        res.redirect("/")
    }

    catch (e) {
        console.log(e)
        res.render("sign-up",{error:true})
    }
    finally {
       await client.close()
    }
})

module.exports = router