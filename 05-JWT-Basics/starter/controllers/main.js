const { BadRequestError } = require("../errors")

const jwt = require('jsonwebtoken')
require('express-async-errors')

const login = async (req,res) => {

    const {username, password} = req.body
    
    if (username && password) {

        const id = new Date().getDate()

        const token = jwt.sign({username, id}, process.env.JWT_SECRET, {expiresIn: '30d'})
        
        return res.status(200).json({msg: `user ${username} created`, token})

    }


    throw new BadRequestError("PLease provide email and password")

}

const dashboard = async (req,res) => {

    console.log(req.user);

    const luckyNumber = Math.floor(Math.random()*100)

    return res.status(200).json({msg: `Hello, ${req.user.username}`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}`})


}


module.exports = {login, dashboard}