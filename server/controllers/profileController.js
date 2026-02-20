const { body, validationResult } = require("express-validator");
const passport = require("passport")
const query = require("../db/query")

async function postPfp(req, res) {

    await body("picture").trim().run(req)

    try{
        await query.setPfp(req.body.picture, req.user.id);
        console.log(req.body)

        return res.status(200).json({success: true})


    }catch(error){
        console.log(error)
        return res.status(400).json({errors: "Something went wrong, please try again"})
    }

}

async function logOut(req, res) {

    try{
        req.logout((err) => {
            if (err) {
                return next(err)
            }
        })

        res.status(200).json({success: true})
    } catch(error){
        return res.status(400).json({errors: "Something went wrong, please try again"})
    }
    
}


module.exports = {
    postPfp,
    logOut
}