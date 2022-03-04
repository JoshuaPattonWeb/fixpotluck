const db = require('../data/db-config')

const getEvents = () => {
    return db('events')
}

const addEvent = async (newEvent) => {
    const [event] = await db('events').insert(newEvent, ['event_id', 'event_name', 'event_date', 'event_time', 'event_location'])
    return event
}

module.exports = {
    getEvents,
    addEvent,
}