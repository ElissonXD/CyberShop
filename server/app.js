const express = require("express")
const session = require("express-session")
const initializePassport = require("./middlewares/passport")
const passport = require('passport')
const authentication = require('./middlewares/authentication')

// Routes
const signUp = require("./routes/sign-up")
const logIn = require("./routes/log-in")
const fakestore = require('./routes/fakestore')
const cart = require("./routes/cart")
const history = require('./routes/history')
const profile = require('./routes/profile')

const app = express()

initializePassport(passport)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: "something", //change later
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true
    }
}))
app.use(passport.initialize())
app.use(passport.session())

app.get("/api", (req, res) =>{
    console.log("sending")
    res.json({sucess: false})
})

app.use("/api/sign-up", signUp)

app.use("/api/login", logIn)

app.use("/api/check", authentication.checkAuthentication)

app.use("/api/fakestore", fakestore)

app.use('/api/cart', cart)

app.use('/api/history', history)

app.use("/api/profile", profile)

app.listen( 5000, () => {
    console.log('Server on!')
})