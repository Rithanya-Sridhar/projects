var mongoose= require('mongoose');
mongoose.connect('mongodb://localhost:27017/jewel');
var Product=require('../model/product');
var products=[
    new Product({
        imgpath:'http://blog.southindiajewels.com/wp-content/uploads/2018/02/gold-jewellery-sets-for-marriage-1.jpg',
        title:'Gold',
        desc:'Buy Gold Jewellery Design and Shop from our large range of beautiful contemporary and ethnic Gold Jewellery Designs',
        price:'50000'
    }),
    new Product({
        imgpath:'http://blog.southindiajewels.com/wp-content/uploads/2018/10/diamond-jewellery-sets-8.jpg',
        title:'Diamond',
        desc:'Buy Diamond Jewellery Design and Shop from our large range of beautiful contemporary and ethnic Diamond Jewellery Designs',
        price:'80000'
    }),
    new Product({
        imgpath:'https://www.langantiques.com/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/a/n/antique-pear-shaped-diamond-negligee-necklace_1_90-1-4271.jpg',
        title:'Platinum',
        desc:'Buy Platinum Jewellery Design and Shop from our large range of beautiful contemporary and ethnic Platinum Jewellery Designs',
        price:'70000'
    }),
];
var done=0;
for(var i=0;i<products.length;i++){
    products[i].save(function(err,res){
        done++;
        if(done==products.length){
            exit();
        }
    });
}
function exit(){
    mongoose.disconnect();
}