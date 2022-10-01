const express = require('express');

const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const app = express();
app.use(express.static('public_html'));

// facilate Form Submission

// for parsing application/json
app.use(express.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
// for formata
app.use(upload.array());

app.post('/users', (req, res) => {
	const { name, password, feedback, contact } = req.body;

	res.send(formatHTML(req.body));
});

app.listen(3000, () => {
	console.log('server is running at port: 3000');
});

// utility functions

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
      <h1>Express Server</h1>

			<p>We will respond to you within 48 hours, For confirmation, you entered the following information<p>

			<ul>
				<li>Name: <span class="text-primary">${params.name}<span></li>
				<li>Password: <span class="text-primary">${params.password}</span</li>
				<li>Feedback: <span class="text-primary">${params.feedback}</span></li>
				<li>Contact: <span class="text-primary">${params.contact}</span></li>
			</ul>
      

			<p>To return to the home page, please click here: <a class="text-uppercase" href="/">Return Home</a>
    </div>
  </body>

</html>
	`;

	return responseHTML;
};
