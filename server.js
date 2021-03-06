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
	var mode = req.body.mode;
	var params = {"start": start, "end": end, "mode": mode}
	res.render('maps.ejs', params);
});

app.post('/directionsList', function(req, res) {
	res.render('list.ejs', req.body);
});

app.post('/carousel', function(req, res) {
	res.render('carousel.ejs', req.body);
});

app.post('/panorama', function(req, res) {
	console.log(req.body);
	res.render('panorama.ejs', req.body);
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port 3000');