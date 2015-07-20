// routes.js
var db = require( '../models/orm/db.js' );
var User = require( '../models/user_model.js' ).User;
var userMsg;


module.exports.controller = function( app ) {

	// INDEX users route
	app.get( '/users', function( req, res ) {
		User.all( 'users', function( data ) {
			res.render( 'usersIndex', data );
		} );

	} );

	// surface login form
	app.get( '/users/login', function( req, res ) {
		res.render( 'usersLogin' );
	} );

	// check if login form is valid.
	app.post( '/users/login', function( req, res ) {
		user_name = req.body.user_name;
		password = req.body.user_pword;
		User.findUserName( 'users', user_name, function( data ) {
			// if no rows returned user does not exist
			if ( data.users.length === 0 ) {

				userMsg = {
					msg: 'No user by that name : ' + user_name
				};

				res.render( 'usersLogin', userMsg );
			}

			// if passwords do not match invalid login.
			if ( password === data.users[ 0 ].user_pword ) {
				res.redirect( '/users/login' ); // eventually bring up articles page
			} else {

				userMsg = {
					msg: 'password invalid'
				};
				res.render( 'usersLogin', userMsg );
			}

		} );
	} );

	// surface registration form

	app.get( '/users/register', function( req, res ) {
		res.render( 'usersRegister' );
	} );

	// valiate and create user

	app.post( '/users/register', function( req, res ) {
		user_name = req.body.user_name;
		password = req.body.user_pword;
		password2 = req.body.user_pword2;


		//check if passwords match
		if ( password !== password2 ) {
			userMsg = {
				msg: 'Passwords do not match'
			};
			res.render( 'usersRegister', userMsg );
		}

		// check if user already exists.
		User.findUserName( 'users', user_name, function( data ) {
			// if no rows returned user does not exist
			if ( data.users.length !== 0 ) {

				userMsg = {
					msg: 'User Name already exists : ' + user_name
				};

				res.render( 'usersRegister', userMsg );
			} else {
				if ( password === data.users[ 0 ].user_pword ) {
					res.redirect( '/users/login' ); // eventually bring up articles page
				} else {

					userMsg = {
						msg: 'password invalid'
					};
					res.render( 'usersLogin', userMsg );
				}

			}
		} );
	} );
};