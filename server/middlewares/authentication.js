function checkAuthentication(req, res) {
    try {
        
        if (req.isAuthenticated()){
            return res.status(200).json({success: true, message : "Already Logged in", user: req.user, cart: req.session.cart})
        }
        return res.status(200).json({success: false, message: "Not logged in"})
    } catch (err) {
        return res.status(400).json({success: false, errors: "Something went wrong, please try again"})
    }
}

module.exports = {checkAuthentication}