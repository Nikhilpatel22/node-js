const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
	name : {
		type : String	
	},
	email : {
		type : String
	},
	password : {
		type : String	
	},
	cpassword : {
		type : String	
	},
	gender : {
		type : String	
	},
	image : {
		type : String	
	},
})

var std = mongoose.model('Student',studentSchema);
module.exports = std;


