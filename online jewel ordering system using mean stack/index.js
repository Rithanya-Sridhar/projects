var express = require('express');
var router = express.Router();
var Cart=require('../model/cart');
var Product = require('../model/product');
var Order=require('../model/order');

/* GET home page. */
router.get('/', function(req, res, next) {
  var successMsg=req.flash('success')[0];
    Product.find(function(err,docs){
    var productchunks=[];
    var chucksize=3;
    for(var i=0;i<docs.length;i+=chucksize){
      productchunks.push(docs.slice(i,i+chucksize));
    }

  res.render('shop/index', { title: 'Jewelshop',products:productchunks,successMsg:successMsg,noMessages:!successMsg });
});
});
router.get('/addtocart/:id',function(req,res,next){
  var productId=req.params.id;
  var cart=new Cart(req.session.cart ? req.session.cart:{});
  Product.findById(productId,function(err,product) {
    if(err){
      return res.redirect('/');

    }
    cart.add(product,product.id)
    req.session.cart=cart;
    console.log(req.session.cart);
    res.redirect('/');
    
  });
});
router.get('/add',function(req,res,next){
  if(!req.session.cart){
    return res.render('shop/add',{products:null});

  }
  var cart=new Cart(req.session.cart);
  res.render('shop/add',{products:cart.generateArray(),totalPrice:cart.totalPrice});
  
});
router.get('/checkout',isLoggedIn, function(req,res,next){
  if(!req.session.cart){
    return res.redirect('/add');
  }
  var cart=new Cart(req.session.cart);
  var miserr=req.flash('error')[0];
  res.render('shop/checkout',{total:cart.totalPrice, miserr:miserr, noError:!miserr});
});

router.post('/checkout',isLoggedIn, function(req,res,next){
  if(!req.session.cart){
    return res.redirect('/add');
  }
  var cart=new Cart(req.session.cart);

var stripe = require('stripe')
('sk_test_51IYPqfSCynaQHqorjIEdTUCpGaq0rjAlCGoE6XgPGMrsNsYJRq5g5l5xM2Lz0Bg7yWSFuxklvmEeRn6diWzSQ8ML00xWDlVH3o');

stripe.charges.create({
  amount: cart.totalPrice *100,
  currency: 'inr',
  source: 'tok_visa',
  description: 'Jshop',
},function(err,charge){
  if(err) {
    req.flash('error', err.message);
  return res.redirect('/checkout');
}
var order=new Order({
  user:req.user,
  cart:cart,
  address:req.body.address,
  name:req.body.name,
  paymentId:charge.id
});
order.save(function(err,result){

req.flash('success','Payment successfull');
req.session.cart=null;
res.redirect('/');
});
});
})

module.exports = router;
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/user/signin');
}
