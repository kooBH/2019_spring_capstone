var express = require('express');
var app = express();

app.get('/', function(req,res){
  res.send('Hello World');
});

var seq = 0;

app.get('/log', function(req,res){
  console.log("%j",req.query);
//  res.end(seq++);
//  console.log(seq);
});



app.listen(3000, function () {
    console.log('Baisc Rout app listening on port 3000!');
});
