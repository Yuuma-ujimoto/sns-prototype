const express = require("express")
const path = require("path")
const cookieParser = require('cookie-parser');
const session = require("express-session")

const app = express()

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

const index_router = require("./router/index")


app.use("/",index_router)


app.listen(3000)