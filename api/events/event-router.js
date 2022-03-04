const router = require('express').Router()
const Events = require('./event-model.js')

router.get('/', (req, res, next) => {
    Events.getEvents()
        .then((events) => {
            res.status(200).json(events)
        })
        .catch((err) => {
            next({
                status: 500,
                message: err
            })
        })
})

router.post('/', (req, res, next) => {
    Events.addEvent(req.body)
        .then((newEvent) => {
            res.status(201).json(newEvent)
        })
        .catch((err) => {
            next({
                status: 500,
                message: err
            })
        })
})

module.exports = router