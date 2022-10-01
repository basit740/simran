const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.static('public_html'));

app.get('/competition', (req, res) => {
	let prevStats = null;
	fs.readFile('stats.json', 'utf-8', (err, data) => {
		prevStats = JSON.parse(data);

		let visited = prevStats.visited;
		visited++;
		prevStats['visited'] = visited;
		const selectedNumber = Math.floor(Math.random() * (4 - 1) + 1);

		if (selectedNumber === 3) {
			let wins = prevStats.wins;
			wins++;
			prevStats['wins'] = wins;
			win = true;

			fs.writeFile('stats.json', JSON.stringify(prevStats), (err) => {
				if (err) console.log(err);
				console.log('writted successfully');
			});

			let successHTML = `
			<html>
			<head>
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
			</head>
			<body>
		<div class='container'>
		<h1>CONGRATULATIONS</h1>
		<p class='mb-5'>You are the lucky winner of our competition!!</p>

		<p>This page has been visited <strong>${prevStats.visited}</strong> times so far, with a total of <strong>${prevStats.wins}</strong> wins and <strong>${prevStats.loses}</strong> loses</p>

		<a href='/' class='btn btn-primary btn-lg'>Return</a>
		</div>
		</body>
		</html>
		`;
			res.send(successHTML);
			// success message
		} else {
			let loses = prevStats.loses;
			loses++;
			prevStats['loses'] = loses;

			fs.writeFile('stats.json', JSON.stringify(prevStats), (err) => {
				if (err) console.log(err);
				console.log('writted successfully');
			});

			let failureHTML = `
			<html>
			<head>
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
			</head>
			<body>
		<div class='container'>
		<h1>Sorry, no win</h1>
		<p class='mb-5'>Thanks for entering our compeition... you are not winner this time but may be on your next visit!</p>

		<p>This page has been visited <strong>${prevStats.visited}</strong> times so far, with a total of <strong>${prevStats.wins}</strong> wins and <strong>${prevStats.loses}</strong> loses</p>

		<a href='/' class='btn btn-primary btn-lg'>Return</a>
		</div>
			</body>
		</html>
		`;
			res.send(failureHTML);
		}
	});
});
app.listen(3000, () => {
	console.log('server is running at port: 3000');
});
