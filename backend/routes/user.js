var express = require('express'),
    Schema = require('../models'),
    router = express.Router(),
    bcrypt = require('bcrypt'),
    jwt = require('../auth');

router.get("/",(req,res)=>{
    console.log('IN GET')
})

//register api
router.post('/register', (req, res) => {
    var user = new Schema.Users({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
    })
    var findUser = {
        email: req.body.email
    }
    Schema.Users.find(findUser,(err,result) => {
        if (result.length==0) {
            user.save(user).then((result)=>{
                res.send({status:200})
            },(err)=>{
                res.send({status:500})
            })
        }
        else {
            res.send({ message: "User exists" })
        }
    })

})

//login api 
router.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    Schema.Users.findOne({"email":email},(err,data)=>{
        if(data && bcrypt.compareSync(password, data.password)){
            token = jwt.encode(data)
            res.json({
                token: token,
                email: data.email,
                favProducts: data.favProducts,
                cartProducts: data.cartProducts
            })
        }
        else{
            res.sendStatus(401);  //401 - invalid credentials
        }
    });
});


router.put('/markFavCart',(req,res)=>{
    email = req.body.email
    productId = req.body.productId
    key = req.body.key  //wheather to add product to fav or cart
    //check if user is valid
    Schema.Users.findOne({"email":email},(err,userData)=>{
        if(userData){
            //if user found then check if product exists
            Schema.Products.findOne({"_id":productId},(err,productData)=>{
                if(productData){
                    if(key=='favProducts' && userData[key].indexOf(productId)>=0){
                        userData[key].splice(userData[key].indexOf(productId),1)
                    }
                    else{
                        userData[key].push(productId)
                    }
                    userData.save().then((result)=>{
                        res.sendStatus(200)
                    },(err)=>{
                        res.send({status:500})
                    })
                }
                else{
                    res.sendStatus(404)
                }
            })
        }
        else{
            res.sendStatus(404)
        }
    })
})

router.post('/markedProducts',(req,res)=>{
    key = req.body.key
    email = req.body.email
    //check if user is valid
    Schema.Users.findOne({"email":email}).populate(key).exec((err,result)=>{
        if(!err){
            res.send(result[key])
        }else{
            res.send({status:500})
        }
    })
});

router.post('/currentDetails', (req, res) => {
    var email = req.body.email;
    Schema.Users.findOne({"email":email},(err,data)=>{
        if(data){
            res.json({
                favProducts: data.favProducts,
                cartProducts: data.cartProducts
            })
        }
        else{
            res.sendStatus(404); 
        }
    });
});

module.exports=router;