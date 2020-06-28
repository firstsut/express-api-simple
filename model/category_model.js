const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name : {
        type :String,
        required : true,
        minLength : 3,
        maxLength : 255
    }
})

const Category = mongoose.model('Categories',categorySchema)
module.exports.Category = Category;
module.exports.CategorySchema = categorySchema;