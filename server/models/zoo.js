// require mongoose
var mongoose = require('mongoose');

var ZooSchema = new mongoose.Schema({
	name: String,
	type: String,
	color: String,
	weight: String
});

// validations
ZooSchema.path('name').required(true, 'Name cannot be blank');
ZooSchema.path('type').required(true, 'Type cannot be blank');
ZooSchema.path('color').required(true, 'Color cannot be blank');
ZooSchema.path('weight').required(true, 'Weight cannot be blank');

mongoose.model('Zoo', ZooSchema);