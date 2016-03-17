var mongoose = require('mongoose');
var Zoo = mongoose.model('Zoo');

module.exports = {
	index: function(req, res){
		Zoo.find({}, function(err, animals){
			if(err){
				console.log(err);
				res.render('index');
			} else{
				res.render('index', {animals: animals});
			};
		});
	},
	create: function(req, res){
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
	},
	show: function(req, res){
		Zoo.findOne({_id: req.params.id}, function(err, animal){
			res.render('show', {animal: animal});
		})
	},
	edit: function(req, res){
		Zoo.findOne({_id: req.params.id}, function(err, animal){
			res.render('edit', {animal: animal});
		})
	},
	update: function(req, res){
		Zoo.update({_id: req.params.id}, {name: req.body.name, type: req.body.type, color: req.body.color, weight: req.body.weight}, function(err, animal){
			res.redirect('/');
		})
	},
	destroy: function(req, res){
		Zoo.remove({_id: req.params.id}, function(err, user){
			res.redirect('/');
		})
	}

}