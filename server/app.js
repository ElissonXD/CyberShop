const express = require("express")
const session = require("express-session")
const initializePassport = require("./middlewares/passport")
const passport = require('passport')
const authentication = require('./middlewares/authentication')
const dotenv = require('dotenv')
const cors = require("cors")

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
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        httpOnly: true,
        sameSite: 'none'
    }
}))
app.use(passport.initialize())
app.use(passport.session())

//Setup Cors

const corsOptions = {
    credentials: true,
    origin: [process.env.VITE_API_URL]
}

app.use(cors(corsOptions))


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

app.listen( process.env.PORT, () => {
    console.log('Server on!')
})