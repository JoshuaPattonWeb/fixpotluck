
const db = require('../data/db-config')

const getAll = () => {
    return db('users')
}

const getBy = (filter) => {
    return db('users').where(filter)
}

const getById = async (id) => {
    const user = await db('users').where('user_id', id)
    return user
}

const add = async (newUser) => {
    const [ newObject ] = await db('users').insert(newUser, ['user_id', 'username'])
    return newObject
}

const updateUser = async (id, updatedUser) => {
    if(updatedUser.username) {
    return db('users')
    .where('user_id', id)
    .first()
    .update({
        username: updatedUser.username
    })
    } else {
        return db('users')
        .where('user_id', id)
        .first()
        .update({
            password: updatedUser.password
        })
    }
}

module.exports = {
    getAll,
    getBy,
    getById,
    add,
    updateUser,
}