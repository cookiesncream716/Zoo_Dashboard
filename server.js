var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, './client/static')));
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// require the mongoose configuration file which does the rest for us
require('./server/config/mongoose.js');

// Store function in variable and then invoke it and pass it app variable
var routes_setter = require('./server/config/routes.js');
routes_setter(app);

app.listen(6789, function(){
	console.log("Listening for Zoos on Port 6789");
})