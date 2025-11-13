const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken') 
const asyncHandler = require('express-async-handler')  
const User = require('../models/usersModel')

const login = asyncHandler (async(req, res) => {
    //destructuramos el body
    const {email, password} = req.body

    //verificar si el usuario existe
    const user = await User.findOne({email})
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            nombre: user.nombre,
            email: user.email,
            token: generarToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Credenciales invalidas :(')
    }
})

const register = asyncHandler(async(req, res) => {
    const {nombre, email, password} = req.body
    if(!nombre || !email || !password){
        res.status(400)
        throw new Error('Porfi, rellena todos los campos <3')
    }

    //vemos si esta conectado ya el usuario a la base de datos
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('El usuario ya existe, prueba con otro email :D')
    } else {
        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //crear usuario
        const user = await User.create({
            nombre,
            email,
            password: hashedPassword
        })

        if(user){
            res.status(201).json({
                _id: user.id,
                nombre : user.nombre,
                email:user.email,
                password: user.password
            })
        } else{
            res.status(400)
            throw new Error ("No se pudieron guardar los datos")
        }    
    }
})

const data = (req, res) => {
    res.status(200).json({message:'login'})
}

const generarToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    login, register, data
}
