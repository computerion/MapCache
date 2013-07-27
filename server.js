var express = require('express');
var app = express();

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port 3000');

app.use(express.static(__dirname + '/static'));
app.use(express.bodyParser());

app.get('/', function(req, res) {
	res.sendfile('index.html');
});

app.post('/showDirections', function(req, res) {
	var start = req.body.start;
	var end = req.body.end;
	
});