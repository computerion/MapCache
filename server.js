var express = require('express');
var app = express();

app.listen(3000);
console.log('Listening on port 3000');

app.use("/css", express.static(__dirname + '/css'));

app.get('/', function(req, res) {
	res.sendfile('index.html');
});