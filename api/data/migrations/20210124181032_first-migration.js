exports.up = async (knex) => {
  await knex.schema
    .createTable('events', (event) => {
      event.increments('event_id')
      event.string('event_name', 200).notNullable()
      event.string('event_date').notNullable()
      event.string('event_time').notNullable()
      event.string('event_location').notNullable()
    })

    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable()
      users.string('password', 200).notNullable()
      users.timestamps(false, true)
      users
        .integer('event_id')
        .unsigned()
        .references('events.event_id')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
    })
    .createTable('food_list', (food) => {
      food.increments('id')
      food.string('name').notNullable()
      food
        .integer('event_id')
        .unsigned()
        .references('events.event_id')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
      food
        .integer('user_id')
        .unsigned()
        .references('users.user_id')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('food_list')
  await knex.schema.dropTableIfExists('users')
  await knex.schema.dropTableIfExists('events')
}
