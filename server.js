var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/static'));
app.use(express.bodyParser());

app.get('/', function(req, res) {
	res.render('index.ejs');
});

app.post('/showDirections', function(req, res) {
	var start = req.body.start;
	var end = req.body.end;
	res.render('maps.ejs', {"start": start, "end": end});
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port 3000');