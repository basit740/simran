const express = require('express');

const app = express();
app.use(express.static('public_html'));

app.use('/isprime/:number', (req, res) => {
	const number = Number(req.params.number);

	if (isPrime(number)) {
		let html = `
		<html>
		<head>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css"
		integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
		</head>
		<body>
	<div class='container'>
	<h1>Prime Number Check</h1>
		<p>The input parameter <strong>${req.params.number}</strong>... is <a class='text-primary'>IS a Prime Number<a></p>
	</div>
	</body>
	</html>`;
		res.send(html);
	} else {
		let html = `
		<html>
		<head>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css"
		integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
		</head>
		<body>
	<div class='container'>
	<h1>Prime Number Check</h1>
		<p>The input parameter <strong>${req.params.number}</strong>... <span class='text-danger'>IS NOT a Prime Number</span></p>
	</div>
	</body>
	</html>`;
		res.send(html);
	}
});

///utility function

function isPrime(num) {
	for (var i = 2; i < num; i++) {
		if (num % i === 0) return false;
	}
	return num > 1;
}

app.listen(3000, () => {
	console.log('server is running at port: 3000');
});
