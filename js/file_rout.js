var express = require('express');
var app = express();
var fs = require('fs');

app.get('/', function(req,res){
  res.send('Hello World');
});

var seq = 0;

app.get('/log', function(req,res){
  console.log("%j",req.query);
//  res.end(seq++);
//  console.log(seq);

  fs.appendFile('test.txt', 'data to append', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  res.send('hello!');
});

app.listen(8080, function () {
    console.log('Baisc Rout app listening on port 3000!');
});
