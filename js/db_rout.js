var express = require('express');
var app = express();

mysql = require('mysql');

var connection = mysql.createConnection(
  {
    host :'localhost',
    user : 'ubuntu',
    password : '비번',
    database : 'mydb'
  }
)

connection.connect();

function insert_sensor(device,unit,type,value,seq,ip){
  obj = {};
  obj.device = device;
  obj.unit   = unit;
  obj.type   = type;
  obj.value  = value;
  obj.seq    = seq;
  obj.ip     = ip.replace(/^.*:/, '');

  var query = connection.query('insert into sensors set ?',obj
  ,function(err,rows,cols){
    if(err) throw err;
    console.log("database insertion ok = %j",obj);
  });
}

app.get('/log', function(req,res){
  r=req.query;
  console.log("GET %j",r);

  insert_sensor(r.device,r.unit,r.type,r.value,r.seq,r.ip);
  res.end('OK:'+JSON.stringify(req.query));


});

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening at http://%s:%s',host,port);
});
