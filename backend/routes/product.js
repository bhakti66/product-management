var express = require('express'),
    Schema = require('../models'),
    router = express.Router();

//add products API
router.post('/addEdit', (req, res) => {
    if(req.body._id){
        var edited = {
            title: req.body.title,
            price: req.body.price,
            stock: req.body.stock
        }
        Schema.Products.updateOne({_id:req.body._id},edited,(err,result)=>{
            if(!err){
                res.send({status:200})
            }
            else{
                res.send({status:500})
            }
        })
    }
    else{
        product = new Schema.Products({
            title: req.body.title,
            stock: req.body.stock,
            price: req.body.price
        })
        product.save(product).then((result)=>{
            res.send({status:200})
        },(err)=>{
            res.send({status:500})
        })
    }
});

//get all products API
router.get('/all', (req, res) => {
    Schema.Products.find({isDeleted:false},(err,result)=>{
        res.send(result)
    })
});

router.put('/delete',(req,res)=>{
    Schema.Products.updateOne({_id:req.body._id},{$set:{isDeleted: true}},(err,result)=>{
        if(!err){
            res.send({status:200})
        }
        else{
            res.send({status:500})
        }
    })
})

module.exports = router