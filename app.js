//諸々のPackage読み込み
const express = require("express")
const path = require("path")
const cookieParser = require('cookie-parser');
const session = require("express-session")


//app init
const app = express()

// appの各種設定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true, limit: "50mb"}));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie:{
        httpOnly: true,
        secure: false,
        maxage: 1000 * 60 * 60 * 24 * 30
    }
}))

// routing

const IndexRouter = require("./routes/index")
const SignUpRouter = require("./routes/sign-up")
const SignInRouter = require("./routes/sign-in")

const PostAPI = require("./routes/api/post_api")
const TimeLineAPI = require("./routes/api/timeline")
const FollowAPI = require("./routes/api/follow")

app.use("/sign-up",SignUpRouter)
app.use("/sign-in",SignInRouter)
app.use("/post-api",PostAPI)
app.use("/timeline-api",TimeLineAPI)
app.use("/follow-api",FollowAPI)
app.use("/",IndexRouter)


//　ポート番号3000番で起動
app.listen(3000);
//一応Logにローカルホストのアドレスを表示させておく
console.log("http://localhost:3000/")