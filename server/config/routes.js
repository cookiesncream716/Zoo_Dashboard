var zoos = require('../controllers/zoos.js')

module.exports = function(app){
	app.get('/', function(req, res){
		zoos.index(req, res);
	})
	app.get('/zoo/new', function(req, res){
		res.render('new');
	})
	app.post('/zoo', function(req, res){
		zoos.create(req, res);
	})
	app.get('/zoo/:id', function(req, res){
		zoos.show(req, res);
	})
	app.get('/zoo/:id/edit', function(req, res){
		zoos.edit(req, res);
	})
	app.post('/zoo/:id', function(req, res){
		zoos.update(req, res);
	})
	app.post('/zoo/:id/destroy', function(req, res){
		zoos.destroy(req, res);
	})

}