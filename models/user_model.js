// user_model.js

// require the ORM. In this case that is db.js
var db = require( '../models/orm/db.js' );

module.exports.User = {

	// index artist module
	all: function( table, cb ) {
		db.all( table, function( users ) {

			var data = {
				users: users
			};
			cb( data );
		} );

	},

	// get an artist object that already has paintings in it
	find: function( id, cb ) {

		db.find( 'users', id, function( data ) {
			db.findRelations( 'users', 'user_id', id, function( usersData ) {

				var data = {
					user: userData[ 0 ],
					articles: articlesData
				};

				cb( data );
			} );
		} );
	},

	findUserName: function( table, user_name, cb ) {
		db.findUserName( table, user_name, function( users ) {

			var data = {
				users: users
			};
			cb( data );
		} );

	},

};