const {Category} = require('../model/category_model')

const CategoryService =  {
    findById : async (id) => {
        const category = Category.findById(id);
        return category;
    },
    getList : async (page,pageSize) => {
        const categorys = Category.find({}).skip((page-1)*pageSize).limit(pageSize);
        return categorys;
    },
    save : async (payload) => {        
        let category = new Category(payload);
        return category.save();
    },
    update : async (id,payload) => {    
        return Category.findByIdAndUpdate(id,payload,{new : true});
    },
    delete : async (id) => {
        return Category.remove(id);
    },
}

module.exports = CategoryService