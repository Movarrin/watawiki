// articles routes.js
var db = require( '../models/orm/db.js' );
var Article = require( '../models/article_model.js' ).Article;
var Tag = require( '../models/tag_model.js' ).Tag;
var marked = require( 'marked' );
var userMsg;


module.exports.controller = function( app ) {
	// index articles route
	app.get( '/articles', function( req, res ) {
		Article.all( 'articles', function( data ) {
			console.log( '******************************************' );
			console.log( data )
			console.log( '^^^^^^^^^^^^^^^^^^^^^^^^^' );
			res.render( 'articlesIndex', data );
		} );

	} );

	app.get( '/article/:id', function( req, res ) {



	} );

	app.get( '/articles/new', function( req, res ) {
		res.render( 'articlesWrite' );
	} );

	app.post( '/articles/write', function( req, res ) {
		// get req.body ready for insert(s);
		var tagsArray = [];
		var data = {
			article_body: req.body.article_body,
			article_title: marked( req.body.article_title ),
			edited: false,
			users_id: req.session.user_id,
			tagged: false
		}; // end of data object

		if ( req.body.article_tags ) {
			data.tagged = true;

			tagsArray = req.body.article_tags.split( ',' );

			for ( var i = 0; i < tagsArray.length; i++ ) {
				tagsArray[ i ] = tagsArray[ i ].trim();
			} // end of for

			for ( var k = 0; k < tagsArray.length; k++ ) {
				tagObj = {};
				tagObj.tag = tagsArray[ k ];

				Tag.createTag( 'tags', tagObj, function( data ) {} );

			} // end of for

		}

		Article.createArticle( 'articles', data, function( data ) {
			// insert the article and then redirect to the read article page.
			res.redirect( '/article/:' + id );
		} );


	} ); // end of app.post



}; // end of module.exports