var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Shopping = mongoose.model('Shopping');

router.param('product', function(req, res, next, id) {
  var query = Shopping.findById(id);
  query.exec(function (err, product){
    if (err) { return next(err); }
    if (!product) { return next(new Error("we can't find this product")); }
    req.product = product;
    return next();
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/shopping', function(req, res, next) {
    Shopping.find(function(err, products){
        if(err){ console.log("Error"); return next(err); }
        res.json(products);
    });
});

router.post('/shopping', function(req, res, next) {
    var product = new Shopping(req.body);
    product.save(function(err, product){
	    if(err){  return next(err); }
	    res.json(product);
    });
});

router.delete('/shopping/:product',function(req,res) {
    Shopping.deleteOne({ _id: req.params.product }, function (err) {
        if (err) return console.log(err);
    });
});

router.put('/shopping/:product/order', function(req, res, next) {
    req.product.order(function(err, product){
        if (err) { return next(err); }
        res.json(product);
    });
});

module.exports = router;
