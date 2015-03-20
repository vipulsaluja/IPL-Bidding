var app = require("express");



app.use(function (req, res, next) {
	// body...


	next();
})

app.use(function (req, res, next) {
	// body...


	next();
})

app.get('/adminacess', function(req, res){
	req.query
	req.body

	//process

	res.json({});
});

app.post
app.put


app.listenTo('5000', function (argument) {
	// body...
	
})