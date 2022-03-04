const jwt = require('jsonwebtoken')
const { SECRET } = require('./secrets/secrets')

module.exports = function tokenBuilder(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    }
    const options = {
        expiresIn: '3d',
    }
    return jwt.sign(payload, SECRET, options)
}