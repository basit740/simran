// database things here

var sqlite3 = require('sqlite3').verbose();
var md5 = require('md5');

const DBSOURCE = 'db.users';

let db = new sqlite3.Database(DBSOURCE, (err) => {
	if (err) {
		// Cannot open database
		console.error(err.message);
		throw err;
	} else {
		console.log('Connected to the SQLite database.');
		db.run(
			`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            title text, 
            comment text,
            email text
            )`,
			(err) => {
				if (err) {
					// Table already created
					console.log(err.message);
				} else {
					// Table just created, creating some rows
					// var insert =
					// 	'INSERT INTO user (name, title, comment, email) VALUES (?,?,?,?)';
					// db.run(insert, [
					// 	'admin',
					// 	'this is',
					// 	'this is comment',
					// 	'admin@example.com',
					// 	md5('admin123456'),
					// ]);
				}
			}
		);
	}
});

module.exports = db;
