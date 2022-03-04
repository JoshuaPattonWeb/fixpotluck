const Users = require('../users/users-model')
const bcrypt = require('bcryptjs')

const validateBody = (req, res, next) => {
    const test = req.body

    if(!test.username) {
        return res.status(401).json({
            message: 'Username and password are required.'
        })
    }
    if(!test.password) {
        return res.status(401).json({
            message: 'Username and password are required.'
        })
    }
    next()
}

const checkUser = async (req, res, next) => {
    const { username } = req.body 
    const [user] = await Users.getBy({ username })

    if(user) {
        return res.status(401).json({
            message: 'Username taken'
        })
    }
    next()
}

const checkUserExists = async (req, res, next) => {
    const { username, password } = req.body 
    const [user] = await Users.getBy({ username })

    if(user && bcrypt.compareSync(password, user.password)) {
        next()
    } else {
        return res.status(401).json({
            message: 'Invalid credentials'
        })
    }
}

const editUser = (req, res, next) => {
    const user = req.body

    if(user.password) {
        const hash = bcrypt.hashSync(user.password, 4)
        user.password = hash
    }
    if(!user.password && !user.name) {
        return req.status(401).json ({
            message: 'Please change username or password'
        })
    }
    next()
}

module.exports = {
    validateBody,
    checkUser,
    checkUserExists,
    editUser,
}