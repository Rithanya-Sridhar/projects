var express=require("express");
var mongo=require("mongodb");
var bodyParser=require("body-parser");
var a=express();
var db="mongodb://localhost:27017/login";
a.get('/',function(req,res){
    res.set({
        'Access-Control-Allow-origin':'*'
    });
    return res.redirect('/public/index.html')
}).listen(8001);

console.log("server started");
a.use('/public',express.static(__dirname+'/public'));
a.use(bodyParser.json());
a.use(bodyParser.urlencoded({
    extended:true
}));

a.post('/submit',function(req,res){
    var username=req.body.username;
    var password=req.body.password;

    var data={
        "username":username,
        "password":password,
    };
    mongo.connect(db,function(err,db){
        if (err) throw err;
        console.log("db created");
        var dbo=db.db("login");
        dbo.collection("details").insertOne(data,function(err,res){
            if (err) throw err;
            console.log("data inserted");
        });
    });
    res.set({
        'Access-Control-Allow-Origin':'*'
    });
    return res.redirect('/public/profile.html');
});