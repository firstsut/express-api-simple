const mongoose = require('mongoose')
const {CategorySchema} = require('./category_model');

const productSchema = new mongoose.Schema({
    name : {
        type :String,
        required : true,
        minLength : 3,
        maxLength : 255
    },
    price : {
        type : Number,
        default : 0.00,
        set: v => Math.round(v * 100) / 100
    },
    category_id : {
        type : CategorySchema,
        required : true
    },
    created_at : {
        type : Date,
        default : Date.now
    },
    updated_at : {
        type : Date,
        default : null       
    },
    in_stock : {
        type : Number,
        default : 0
    }
})

const Product = mongoose.model('Products',productSchema)
module.exports.Product = Product;
module.exports.ProductSchema = productSchema;