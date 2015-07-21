// article_model.js

// require the ORM. In this case that is db.js
var db = require( '../models/orm/db.js' );


module.exports.Article = {

	// index article module
	all: function( table, cb ) {
		db.all( table, function( articles ) {
			var data = {

				articles: articles
			};
			cb( data );
		} );

	},

	// get an article object that already has author  in it
	find: function( id, cb ) {

		db.find( 'articles', id, function( data ) {
			db.findRelations( 'articles', 'user_id', id, function( articlesData ) {

				var data = {
					user: userData[ 0 ],
					articles: articlesData
				};

				cb( data );
			} );
		} );
	},

	// get an article object that already has author  in it
	createArticle: function( table, obj, cb ) {

		db.create( table, obj, function( data ) {

			cb( data );

		} );
	},

};