const faker = require('faker')

module.exports = (n = 1) => {
    let phones = []
      for (let i = 0; i < n; i++) {
        let num = faker.phone.phoneNumber({format: es_MX})
        let num2 = faker.phone.phoneNumber({format: es_MX})
        let num3
        
        if((num2 % 3)==0){
            num3 = null
        } else {
            num3 = num2
        }

        if(prices)
        phones.push({
           cell_phone: num,
           cell_phone_2: num3,
           phone: num3
        })
        
    }
    return phones


}                                                                                 