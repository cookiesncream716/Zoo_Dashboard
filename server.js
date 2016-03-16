var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoose_dashboard');

var ZooSchema = new mongoose.Schema({
	name: String,
	type: String,
	color: String,
	weight: String
});

ZooSchema.path('name').required(true, 'Name cannot be blank');
ZooSchema.path('type').required(true, 'Type cannot be blank');
ZooSchema.path('color').required(true, 'Color cannot be blank');
ZooSchema.path('weight').required(true, 'Weight cannot be blank');

mongoose.model('Zoo', ZooSchema);

var Zoo = mongoose.model('Zoo');

app.get('/', function(req, res){
	Zoo.find({}, function(err, animals){
		if(err){
			console.log(err);
			res.render('index');
		} else{
			res.render('index', {animals: animals});
		};
	});
})

app.get('/zoo/new', function(req, res){
	res.render('new');
})

app.post('/zoo', function(req, res){
	console.log("POST DATA" + req.body.name + req.body.type + req.body.color + req.body.weight);
	var animal = new Zoo({name: req.body.name, type: req.body.type, color: req.body.color, weight: req.body.weight});
	animal.save(function(err){
		if(err){
			console.log('did not save' + err);
			res.render('new', {errors: animal.errors})
		} else{
			console.log('saved')
			res.redirect('/')
		}
	})
})

app.get('/zoo/:id', function(req, res){
	console.log("show");
	Zoo.findOne({_id: req.params.id}, function(err, animal){
		res.render('show', {animal: animal});
	});
});

app.get('/zoo/:id/edit', function(req, res){
	console.log('edit');
	Zoo.findOne({_id: req.params.id}, function(err, animal){
		res.render('edit', {animal: animal});
	});
})

app.post('/zoo/:id', function(req, res){
	console.log("save edit");
	Zoo.update({_id: req.params.id}, {name: req.body.name, type: req.body.type, color: req.body.color, weight: req.body.weight}, function(err, animal){
		res.redirect('/');
	})
})

app.post('/zoo/:id/destroy', function(req, res){
	console.log('destroy');
	Zoo.remove({_id: req.params.id}, function(err, user){
		res.redirect('/');
	})
})

app.listen(6789, function(){
	console.log("Listening for Zoos on Port 6789");
})