// users routes.js
var db = require( '../models/orm/db.js' );
var User = require( '../models/user_model.js' ).User;
var userMsg;


module.exports.controller = function( app ) {
	// INDEX users route
	app.get( '/users', function( req, res ) {
		console.log( req.session.username );
		if ( ( req.session.user_name === null ) || ( req.session.user_name === undefined ) ) {
			res.redirect( '/users/login' );
		} else {


			User.all( 'users', function( data ) {
				res.render( 'usersIndex', data );
			} );
		}

	} );

	// surface login form
	app.get( '/users/login', function( req, res ) {
		res.render( 'usersLogin' );
	} );

	// check if login form is valid.
	app.post( '/users/login', function( req, res ) {
		console.log( 'post /users/login' );
		user_name = req.body.user_name;
		password = req.body.user_pword;
		User.findUserName( 'users', user_name, function( data ) {
			// if no rows returned user does not exist
			if ( data.users.length === 0 ) {

				userMsg = {
					msg: 'No user by that name : ' + user_name
				};

				return res.render( 'usersLogin', userMsg );
			}

			// if passwords do not match invalid login.
			if ( password === data.users[ 0 ].user_pword ) {
				// user valid. create session, retrieve articles and surface articlesIndex

				// store the user name and id in the session.
				req.session.user_name = user_name;
				req.session.user_id = data.users[ 0 ].id;
				console.log( req.session );
				res.redirect( '/articles' ); // eventually bring up articles page
			} else {

				userMsg = {
					msg: 'password invalid'
				};
				return res.render( 'usersLogin', userMsg );

			}

		} );
	} );

	// surface registration form

	app.get( '/users/register', function( req, res ) {
		res.render( 'usersRegister' );
	} );

	// validate and create user

	app.post( '/users/register', function( req, res ) {
		user_name = req.body.user_name;
		password = req.body.user_pword;
		password2 = req.body.user_pword2;
		user_email = req.body.user_email;
		user = {
			user_name: user_name,
			user_pword: password,
			user_email: user_email

		};


		//check if passwords match
		if ( password !== password2 ) {
			userMsg = {
				msg: 'Passwords do not match'
			};
			console.log( 'return1' );
			return res.render( 'usersRegister', userMsg );
		} else {

			// check if user already exists.
			User.findUserName( 'users', user_name, function( data ) {

				// if no rows returned user does not exist
				if ( data.users.length !== 0 ) {
					console.log( 'return2' );
					userMsg = {
						msg: 'User Name already exists : ' + user_name
					};

					return res.render( 'usersRegister', userMsg );

				} else {

					User.createUser( 'users', user, function( data ) {
						console.log( 'made new user' );
						res.redirect( '/articles' ); // eventually bring up articles page
					} );
				}

			} );
		}

		// user valid. Inser tinto database, create session, retrieve articles and surface articlesIndex
	} );
};