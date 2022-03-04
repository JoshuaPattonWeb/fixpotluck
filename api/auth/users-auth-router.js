const router = require('express').Router()
const bcrypt = require('bcryptjs')
const tokenBuilder = require('./token-builder')
const Users = require('../users/users-model.js')

const {
    validateBody,
    checkUser,
    checkUserExists
} = require('../../api/users/users-middleware')

router.post('/register', validateBody, checkUser, (req, res, next) => {
    let user = req.body

    const hash = bcrypt.hashSync(user.password, 4)
    user.password = hash

    Users.add(user)
        .then((newUser) => {
            res.status(200).json(newUser)
        })
        .catch((err) => {
            next({
                status: 500,
                message: err
            })
        })
})

router.post('/login', validateBody, checkUserExists, (req, res, next) => {
    let { username, password } = req.body

    Users.getBy({ username })
        .then(([user]) => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = tokenBuilder(user)
                res.status(200).json({
                    message: `Hello! Welcome to our POTLUCK, ${user.username}`,
                    token,
                })
            }
        })
        .catch((err) => {
            next({
                status: 500,
                message: err
            })
        })
})

module.exports = router