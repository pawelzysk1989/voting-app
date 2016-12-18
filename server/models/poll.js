const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const pollSchema = new Schema({
	email: String,
	password: String,
	title: String,
	author: String,
	options: [
		{
			optionFieldName : String,
      		optionValue : String,
      		votes : Number
		}
	]
});

// Create the model class
const ModelClass = mongoose.model('poll', pollSchema);

// Export the model
module.exports = ModelClass;