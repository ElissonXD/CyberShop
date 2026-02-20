const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs")
const query = require('../db/query')


const validateUser = [
    body("username").trim().notEmpty().withMessage("Name must not be empty")
    .isAlpha().withMessage("Name must only contain letters")
    .isLength({min: 4, max: 15}).withMessage("Name must be 4 to 15 characters long"),
    body("email").trim().isEmail().withMessage("Must use a valid email"),
    body("password").trim().notEmpty().withMessage("Password must not be empty")
    .isLength({min:8}).withMessage("Password must contain at least 8 characters")
]

async function postForm(req, res) {
    console.log(req.body)
    const {username, email, password} = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        console.log("oof")
        return res.status(400).json({sucess : false, errors: errors.array()})
    }
    else {
        try{
            const hasUser = await query.searchUserbyEmail(req.body.email)

            if (hasUser){
                return res.status(400).json({errors: [{msg: "A account with this email already exists"}]})
            }

            req.body.password = await bcrypt.hash(req.body.password, 10)
            await query.createUser(req.body)
            res.status(201).json({sucess: true, errors: null})
        } catch (error){
            return res.status(400).json({errors: [{msg: 'Something went wrong, please try again'}]})
        }
    }
}




module.exports = {
    postForm,
    validateUser
}