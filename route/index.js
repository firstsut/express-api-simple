const product_route = require('./products')
const category_route = require('./categories')

const Routes = {
    product : ()=>{
        return product_route;
    },
    category : ()=>{
        return category_route;
    }
}

module.exports.product = Routes.product();
module.exports.category = Routes.category();