const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi);

const productValidate = {
    save : async (data) => {
       const schema =  Joi.object({
            "name" : Joi.string().min(3).max(255).required(),  
            "category_id" : Joi.objectId().required(),       
        })
       return schema.validate(data);
    },
    update : async (id,data)=>{
        data.id = id
        const schema =  Joi.object({   
            "id" : Joi.objectId().required(),
            "category_id" : Joi.objectId().required(),              
            "name" : Joi.string().min(3).max(255).required(),        
        })
       return schema.validate(data);
    },
    findById : async (id)=>{
        const schema =  Joi.object({
            "id" : Joi.objectId().required()           
        })
       return schema.validate({id : id});
    },
    delete : async (id)=>{
        const schema =  Joi.object({
            "id" : Joi.objectId().required()           
        })
        return schema.validate({id : id});
    },
}

module.exports = productValidate;