const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const query = require('../db/query')

function initializePassport(passport){
    passport.use(new LocalStrategy({usernameField: 'email'}, async function verify(email, password, done){
        try{
            console.log('local')
            const user = await query.searchUserbyEmail(email)
            if (!user){
                return done(null, false, {message: "Incorrect username or password"})
            }

            const match = await bcrypt.compare(password, user.password)

            if (!match){
                return done(null, false, {message: "Incorrect username or password"})
            }

            return done(null, user)

        } catch(error){
            return done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await query.getUserbyId(id)
            done(null, user);
        } catch(err){
            done(err)
        }
    })
}
module.exports = initializePassport