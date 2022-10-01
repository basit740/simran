const express = require('express');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

app.use(express.static('public_html'));
app.use(cors());
app.use(express.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
// for formata
app.use(upload.array());

// import database file and create database

const db = require('./createDB.js');

app.get('/users', (req, res) => {
	let sql = 'select * from user';

	let params = [];

	db.all(sql, params, (err, rows) => {
		if (err) {
			res.status(400).json({ success: false, error: err.message });
			return;
		} else {
			res.json({
				success: true,
				data: rows,
			});
		}
	});
});

app.post('/users', (req, res) => {
	let sql =
		'INSERT INTO user (name, title, comment, email) VALUES (?, ?, ?, ?)';
	var params = [
		req.body.name,
		req.body.title,
		req.body.comment,
		req.body.email,
	];

	db.run(sql, params, (err, result) => {
		if (err) {
			res.status(400).json({ success: false, error: err.message });
		} else {
			console.log(result);

			res.json({
				success: true,
				message: 'user added in the datbase successfully',
				data: result,
				id: this.lastID,
			});
		}
	});
});

// delete a single

app.delete('/users/:id', (req, res, next) => {
	db.run(
		'DELETE FROM user WHERE id = ?',
		req.params.id,
		function (err, result) {
			if (err) {
				res.status(400).json({ error: res.message });
				return;
			}
			res.json({ message: 'deleted', changes: this.changes });
		}
	);
});

app.listen(3000, () => {
	console.log('server is running at port 5000');
});

// UTILITY FUNCTIONS

// FOR HTML FORMATING
const formatHTML = (params) => {
	const responseHTML = `
	<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <title>Document</title>
    <style>
      .input--full {
        width: 100%;
        padding: 5px 10px;
        margin-bottom: 10px;

      }
    </style>
  </head>

  <body>
    <div class="container">

		<div class="alert alert-success" role="alert">
  New user has been added into the database
</div>
			
			<p>To return to the home page, please click here: <a class="text-uppercase" href="/">Return</a>
    </div>
  </body>

</html>
	`;

	return responseHTML;
};
