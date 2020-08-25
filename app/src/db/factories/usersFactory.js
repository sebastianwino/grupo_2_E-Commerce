const faker = require('faker')
const bcrypt = require('bcrypt')

module.exports = (n = 1) => {
    let users = []

    for (let i = 0; i < n; i++) {
      users.push({
        name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync('secret', 10),
        admin: 0,
        phone_id: i
      })
    }
    return users
}