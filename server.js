// watawiki application

var express = require( 'express' );
var app = express();
// var port = process.env || 3000;

var logger = require( 'morgan' );
var pg = require( 'pg' );
var bodyParser = require( 'body-parser' );
var exphbs = require( 'express-handlebars' );
var fs = require( 'fs' );
var path = require( 'path' );
var methodOverride = require( 'method-override' );
var session = require( 'express-session' );
var flash = require( 'connect-flash' );
var bcrypt = require( 'bcrypt' );

app.use( express.static( 'public' ) );

app.use( logger( 'dev' ) );
app.engine( 'handlebars', exphbs( {
	defaultLayout: 'main',
	extname: 'handlebars'
} ) );

app.set( 'view engine', 'handlebars' );
app.set( 'views', path.join( __dirname, 'views' ) );


app.use( bodyParser.urlencoded( {
	extended: false
} ) );

app.use( session( {
	secret: 'anystringoftext',
	saveUninitialized: true,
	resave: true
} ) );

fs.readdirSync( './controllers' ).forEach( function( file ) {
	if ( file.substr( -3 ) == '.js' ) {
		route = require( './controllers/' + file );
		route.controller( app );
	}
} );
app.use( methodOverride( function( req, res ) {
	if ( req.body && typeof req.body === 'object' && '_method' in req.body ) {
		// look in urlencoded POST bodies and delete it
		var method = req.body._method;
		delete req.body._method;
		return method;
	}
} ) );


// app.listen( port );
app.set( 'port', ( process.env.PORT || 3000 ) );
app.listen( app.get( 'port' ), function() {
	console.log( "App running on port : ", app.get( 'port' ) );
} );

app.get( '/', function( req, res ) {
	res.render( 'home' );
} );