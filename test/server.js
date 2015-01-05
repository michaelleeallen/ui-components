var express = require('express');
var fs = require('fs');
var path = require('path');
var cors = require('connect-cors');
var app = express();
var IP = process.env.IP;
var PORT = process.env.PORT;

app.get('/lib/data/pages/:pageId', function(req, res){
  res.writeHead(200, {"Content-Type": "application/json"});
  fs.createReadStream(path.join(process.cwd(), 'test/lib/data', req.params.pageId+'.json')).pipe(res);
});

app.use(cors());
app.use(express.static('dist'));
app.use(express.static('test'));
app.use(express.static('node_modules'));

app.listen(PORT, IP, console.log.bind(null, 'test server started at', IP+':'+PORT));
