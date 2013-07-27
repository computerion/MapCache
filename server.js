var express = require('express');
var app = express();

app.listen(3000);
console.log('Listening on port 3000');

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
	res.sendfile('index.html');
});