var pg = require( 'pg' );
var dbUrl = process.env.DATABASE_URL || {
	username: 'andrew',
	password: 'empty',
	database: 'watawiki_db',
	host: 'localhost',
	port: 5432
};

// var dbUrl = process.env.DATABASE_URL;

module.exports = {
	end: function() {
		pg.end();
	},

	findAritcle: function( table1, id, cb ) {
		pg.connect( dbUrl, function( err, client, done ) {
			if ( err ) throw err;
			queryString = 'select a.id, a.article_body, a.article_title, a.users_id, b.user_name, a.creation_date, a.tagged, a.edited from articles a, users b where a.id = $1 and a.users_id = b.id';
			client.query( queryString, [ id ], function( err, result ) {
				if ( err ) throw err;
				done();
				cb( result.rows[ 0 ] );
			} );
		} );
		this.end();
	},

	all: function( table, cb ) {
		pg.connect( dbUrl, function( err, client, done ) {
			client.query( 'SELECT * FROM ' + table, function( err, result ) {
				done();
				cb( result.rows );
			} );
		} );
		this.end();
	},

	find: function( table, id, cb ) {
		pg.connect( dbUrl, function( err, client, done ) {
			client.query( 'SELECT * FROM ' + table + ' WHERE id=' + id, function( err, result ) {
				done();
				cb( result.rows );
			} );
		} );
		this.end();
	},

	findUserName: function( table, user_name, cb ) {
		pg.connect( dbUrl, function( err, client, done ) {
			if ( err ) throw err;
			queryString = 'SELECT * FROM ' + table + ' WHERE user_name = $1';
			client.query( queryString, [ user_name ], function( err, result ) {
				if ( err ) throw err;
				done();
				cb( result.rows );
			} );
		} );
		this.end();
	},

	findRelations: function( table, column, id, cb ) {
		pg.connect( dbUrl, function( err, client, done ) {
			client.query( 'SELECT * FROM ' + table + ' WHERE ' + table + '.' + column + ' = ' + id, function( err, result ) {
				done();
				cb( result.rows );
			} );
		} );
		this.end();
	},
	delete: function( table, id, cb ) {
		pg.connect( dbUrl, function( err, client, done ) {
			client.query( 'DELETE FROM ' + table + ' WHERE id=' + id, function( err, result ) {
				done();
				cb( result );
			} );
		} );
		this.end();
	},
	create: function( table, obj, cb ) {
		pg.connect( dbUrl, function( err, client, done ) {
			if ( err ) throw err;
			var columns = [];
			var values = [];
			var dollars = [];
			Object.keys( obj ).forEach( function( key, i ) {
				columns.push( key );
				values.push( obj[ columns[ i ] ] );
				dollars.push( '$' + ( i + 1 ) );
			} );

			var query = 'INSERT INTO ' + table + '(' + columns.join( ', ' ) + ') VALUES(' + dollars.join( ', ' ) + ') RETURNING id AS id';
			client.query( query, values, function( err, result ) {
				done();
				cb( result.rows[ 0 ] );
			} );
		} );
		this.end();
	},
	update: function( table, obj, id, cb ) {
		pg.connect( dbUrl, function( err, client, done ) {
			if ( err ) throw err;
			var columns = [];
			var set = [];
			var values = [];
			Object.keys( obj ).forEach( function( key, i ) {
				columns.push( key );
				set.push( key + '=($' + ( i + 1 ) + ')' );
				values.push( obj[ columns[ i ] ] );
			} );
			client.query( 'UPDATE ' + table + ' SET ' + set.join( ', ' ) + ' WHERE id=' + id, values, function( err, result ) {
				if ( err ) throw err;
				done();
				cb( result );
			} );
		} );
		this.end();
	}
};