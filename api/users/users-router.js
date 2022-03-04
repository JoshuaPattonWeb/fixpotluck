const router = require('express').Router()
const Users = require('./users-model')
const { editUser } = require('../../api/users/users-middleware')

router.get('/', (req, res, next) => {
    Users.getAll()
        .then((usersList) => {
            res.status(200).json(usersList)
        })
        .catch((err) => {
            next({
                status: 500,
                message: err
            })
        })
})

router.get('/:id', (req, res, next) => {
    Users.getById(req.params.id)
        .then((user) => {
            res.status(200).json(user)
        })
        .catch((err) => {
            next({
                status: 500,
                message: err
            })
        })
})

router.put('/:id', editUser, (req, res, next) => {
    Users.updateUser(req.params.id, req.body)
        .then((user) => {
            res.status(200).json(user)
        })
        .catch((err) => {
            next({
                status: 500,
                message: err
            })
        })
})

module.exports = router