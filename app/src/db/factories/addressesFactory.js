const faker = require('faker')

module.exports = (n = 1) => {
    let addresses = []
    
    for (let i = 1; i <= n; i++) {
        addresses.push({
            user_id: i,
            street: faker.address.streetName(),
            city: faker.address.city(),
            floor:faker.random.number({ min: 1, max: 10}),
            departament: 'A',
            prov: faker.address.state(),
            alias: faker.name.firstName(),
            number: faker.random.number({ min: 1, max: 9999}),
            zip_code: faker.random.number({ min: 1111, max: 9999}),       
        })
        
    }
    return addresses
}                                                                                 