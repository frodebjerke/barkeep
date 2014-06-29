var mongoose	= require('mongoose');


exports.connectToMongo = function() {

	var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/barkeep';

	// Makes connection asynchronously.  Mongoose will queue up database
	// operations and release them when the connection is complete.
	mongoose.connect(uristring, function (err, res) {
		if (err) {
			console.log ('ERROR connecting to: ' + uristring + '. ' + err);
		} else {
			console.log ('Succeeded connected to: ' + uristring);
		}
	});

	return uristring;
};

exports.getDbUrl = function(){
	return  process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/barkeep';
};
