// tag_model.js

// require the ORM. In this case that is db.js
var db = require( '../models/orm/db.js' );

module.exports.Tag = {
	createTag: function( table, obj, cb ) {
		console.log( obj );

		db.create( table, obj, function( users ) {

			cb( users );
		} );
	},



}; // end of module.exports