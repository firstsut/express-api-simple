const express = require('express')
const router = express.Router()
const validateProduct = require('../validate/product_validate')
const webDebug = require('debug')('app:web')
const ProductService = require('../service/product_service')
const CategoryService = require('../service/category_service')

router.get('/',async (req,res)=>{
    try{
       let products = await ProductService.getList(1,10)  
       return res.status(200).send({'success':true,'data':products,'msg' : ''})
    }catch(err){
        webDebug("Product.getList Error : {} ",err)
    }
    res.status(200).send({'success':false,'data':[],'msg' : ''})
})

router.get('/:id',async (req,res)=>{
    const {error} = await validateProduct.findById(req.params.id)
    if(error){
        webDebug("Product.findById Error "+req.params.id+" : ",error.details[0].message)
        return res.status(400).send({
            "success" : false,
            'data' : null,
            "msg" : error.details[0].message
        })
    }
    try{
        const product = await ProductService.findById(req.params.id)       
        res.status(200).send({
            "success" : true,
            "msg" : "",
            "data" : product
        })
    }catch(err){    
        webDebug("Product.findById Error "+req.params.id+" : ",err)
        res.status(400).send({
            "success" : false,
            'data' : null,
            "msg" : err
        })
    }    
})

router.post('/',async (req,res) =>{
    const {error} = await validateProduct.save(req.body)
    if(error){
        webDebug("Product.save Error : ",error.details[0].message)
        return res.status(400).send({
            "success" : false,
            'data' : null,
            "msg" : error.details[0].message
        })
    }
    try{

        const category_chk = await CategoryService.findById(req.body.category_id);
        if(!category_chk) return res.status(400).send({
            "success" : false,
            "msg" : "",
            "data" : "Invaid Category ID"
        });

        const product = await ProductService.save(req.body)       
        res.status(201).send({
            "success" : true,
            "msg" : "",
            "data" : product
        })
    }catch(err){    
        webDebug("Product.save Error : ",err)
        res.status(400).send({
            "success" : false,
            'data' : null,
            "msg" : err
        })
    }        
})

router.put('/:id',async (req,res) =>{
    const {error} = await validateProduct.update(req.params.id,req.body)
    if(error){
        webDebug("Product.update Error "+req.params.id+" : ",error.details[0].message)
        return res.status(400).send({
            "success" : false,
            'data' : null,
            "msg" : error.details[0].message
        })
    }
    try{

        const product_chk = await ProductService.findById(req.params.id);
        if(!product_chk) return res.status(400).send({
            "success" : false,
            "msg" : "",
            "data" : "Invaid Product ID"
        });

        const category_chk = await CategoryService.findById(req.body.category_id);
        if(!category_chk) return res.status(400).send({
            "success" : false,
            "msg" : "",
            "data" : "Invaid Category ID"
        });

        req.body.category_id = category_chk;
        const product = await ProductService.update(req.params.id,req.body)       
        res.status(200).send({
            "success" : true,
            "msg" : "",
            "data" : product
        })

    }catch(err){    
        webDebug("Product.update Error "+req.params.id+" : ",err)
        res.status(400).send({
            "success" : false,
            'data' : null,
            "msg" : err
        })
    }        
})


router.delete('/:id',async (req,res) =>{
    const {error} = await validateProduct.delete(req.params.id)
    if(error){
        webDebug("Product.delete Error "+req.params.id+" : ",error.details[0].message)
        return res.status(400).send({
            "success" : false,
            'data' : null,
            "msg" : error.details[0].message
        })
    }
    try{

        const product_chk = await ProductService.findById(req.params.id);
        if(!product_chk) return res.status(400).send({
            "success" : false,
            "msg" : "",
            "data" : "Invaid Product ID"
        });

        const product = await ProductService.delete(req.params.id)       
        res.status(200).send({
            "success" : true,
            "msg" : "",
            "data" : product
        })

    }catch(err){    
        webDebug("Product.delete Error "+req.params.id+" : ",err)
        res.status(400).send({
            "success" : false,
            'data' : null,
            "msg" : err
        })
    }        
})

module.exports = router;