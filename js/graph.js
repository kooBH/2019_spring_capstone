var express = require('express');
var app = express();
var fs = require('fs');

mysql = require('mysql');

moment = require('moment');

//계정 정보
secret = require('./secret.js');

var connection = mysql.createConnection(
  {
    host : secret.host(),
    user : secret.user(),
    password : secret.password(),
    database : secret.database()
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

app.get('/graph', function (req, res) {
      console.log('got app.get(graph)');
      var html = fs.readFile('./graph.html', function (err, html) {
            html = " "+ html
            console.log('read file');

 //           var qstr = 'select * from sensors ';
 var qstr = 'select * from (select * from sensors order by time desc limit 120)recent order by time asc';
            connection.query(qstr, function(err, rows, cols) {
                    if (err) throw err;

                    var data = "data.addRows([";
                    var comma = "";
                    for (var i=0; i< rows.length; i++) {
                               r = rows[i];
                               //data += comma +" ["+ r.id +",00,38),"+ r.value +"]";
                               data += comma +" ['"+moment(r.time).format('h:mm:ss a') +"',"+ r.value +"]";
                               comma = ",";
                            }
                    //var header = "['number','temperature']"
                    //var header = "data.addColumn('date', 'Date/Time');"
                    var header = "data.addColumn('string', '시간');"
                    header += "data.addColumn('number', '온도');"

                    data += "]);"
                    html = html.replace("<%HEADER%>", header);
                    html = html.replace("<%DATA%>", data);

        var qstr2 = 'select * from sensors order by time desc limit 1';
        connection.query(qstr2,function(err,rows,cols){
          if (err) throw err;
            r = rows[0];
            html = html.replace("<%LAST%>", moment(r.time).format('MM월 DD일 - h:mm:ss a'));


          var qstr3 = 'select * from sensors order by time asc limit 1';
          connection.query(qstr3,function(err,rows,cols){
              if (err) throw err;
              r = rows[0];
              html = html.replace("<%FIRST%>", moment(r.time).format('MM월 DD일 - h:mm:ss a'));
            //2개 바꾸니까 2번 돌림
              html = html.replace("<%NODEJS%>","https://github.com/kooBH/2019_spring_capstone/blob/master/js/graph.js");
              html = html.replace("<%ARDUINO%>","https://github.com/kooBH/2019_spring_capstone/tree/master/ino");
              html = html.replace("<%NODEJS%>","https://github.com/kooBH/2019_spring_capstone/blob/master/js/graph.js");
              html = html.replace("<%ARDUINO%>","https://github.com/kooBH/2019_spring_capstone/tree/master/ino");

              res.writeHeader(200, {"Content-Type": "text/html"});
              res.write(html);
              res.end();
          });//query 3
        });//query 2
      });//query 1
   });//html
})


var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening at http://%s:%s',host,port);
});
