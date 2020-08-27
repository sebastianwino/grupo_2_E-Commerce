const faker = require('faker')

module.exports = (n = 1) => {
    let products = []
    let description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio totam consequuntur sunt molestias ad asperiores explicabo non vel. Voluptatibus possimus aliquid neque laborum, doloremque non atque aut ea illo veritatis, aliquam ab error porro fuga consectetur dolor! Perspiciatis repudiandae quibusdam veniam laudantium, quia obcaecati officiis similique perferendis, nam reiciendis architecto cupiditate. Repellendus vitae mollitia iure temporibus? Repellendus dolorum veniam unde minima autem voluptates ipsa, esse molestias mollitia laboriosam nesciunt provident sed quibusdam! Vitae quod, nostrum voluptas nemo cum rem blanditiis fugiat quasi repudiandae corrupti voluptatum quia, illo qui recusandae consequatur deleniti quibusdam ratione enim corporis dignissimos unde odio! Illo, quos.'
    
    for (let i = 0; i < n; i++) {
        let prices = faker.commerce.price();
        let discount = faker.random.number({ min: 0, max: 30})
        let slice = faker.random.number({ min: 0, max: 12})
        let category = faker.random.number({ min: 1, max: 6})

        products.push({
            name: faker.commerce.productName(),
            description: description,
            gross_price: prices,
            discount: discount,
            price: prices - (discount*prices/100),
            stock: faker.random.number({ min: 0, max: 200}),
            slices: slice,
            image_1: 'product-image-1595193271792.jpg',
            image_2: 'product-image-1595193271799.jpg',
            image_3: 'product-image-1595193271792.jpg',
            image_4: 'product-image-1595193271799.jpg',
            category_id: category
        })
        
    }
    return products
}                                                                                 