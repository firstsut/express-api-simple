const {Product} = require('../model/product_model')

const ProductService =  {
    findById : async (id) => {
        const product = Product.findById(id);
        return product;
    },
    getList : async (page,pageSize) => {
        const products = Product.find({}).skip((page-1)*pageSize).limit(pageSize);
        return products;
    },
    save : async (payload) => {        
        let product = new Product(payload);
        return product.save();
    },
    update : async (id,payload) => {
        payload.updated_at = Date.now()
        return Product.findByIdAndUpdate(id,payload,{new : true});
    },
    delete : async (id) => {
        return Product.deleteOne({_id : id});
    },
}

module.exports = ProductService