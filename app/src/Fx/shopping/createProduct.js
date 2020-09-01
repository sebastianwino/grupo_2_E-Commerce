function productObject(req,res) {
    let product = {}
    let sum = 0    
    let price = parseFloat(req.body.price);
    let cant = parseInt(req.body.cant);
    sum = parseInt(sum);
    sum = sum + cant;
    sum = sum.toString()
    let total = price * cant;
    total = total.toFixed(2)
     product = {
        id: req.body.id,
        cant: sum, 
        name: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        slices: req.body.slices,
        stock: req.body.stock,
        image_1: req.body.imageLg,
        image_2: req.body.image,
        total: total
        }

        return product
}

module.exports = productObject;

