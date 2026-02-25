const passport = require("passport")

function logUser(req, res, next) {
    
    passport.authenticate('local', (err, user, info) => {
        
        if (err) return res.status(400).json({success: false, errors: "Something went wrong, please try again later"})

        if (!user) return res.status(400).json({success: false, errors: info.message})

        req.login(user, (err) => {
            if (err) return res.status(400).json({success: false, errors: "Failed to login, please try again later"})
            console.log(req.user)
            if (!req.session.cart) {
                 req.session.cart = [];
            }

            return res.status(200).json({success: true, errors: null, user: req.user})
        })
    }) (req, res, next);
}

module.exports = {
    logUser
}