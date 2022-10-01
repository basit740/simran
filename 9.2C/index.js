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

app.post('/order', (req, res) => {
	// const { name, password, feedback, contact } = req.body;

	const data = { ...req.body };
	const orderDate = new Date();

	// console.log(orderDate.toString());
	// console.log(addMinutes(orderDate, 45).toLocaleTimeString());

	const deliveryDate = addMinutes(orderDate, 45);

	data['datetime'] = orderDate.toString();
	data['deliveryDateTimeString'] =
		deliveryDate.toLocaleTimeString() +
		`(${deliveryDate.toLocaleDateString()})`;
	data['deliveryDateString'] = deliveryDate.toLocaleDateString();
	data['deliveryTimeString'] = deliveryDate.toLocaleTimeString();

	console.log(data);

	res.send(formatHTML(data));
	// res.send('done');
});

app.listen(3000, () => {
	console.log('server is running at port: 3000');
});

// utility functions

// FOR CALCULATING PIZZA COST

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
      <h1>Order Confirmation</h1>

			<p>Thank you for order recieved on: <strong>${params.datetime}</strong><p>


      <h3>Pizza Details</h3>
      <ul>
        <li><span class="text-primary">${params['pizza-qty']} x ${
		params['pizza-size']
	} ${params['pizza-type']}</span> [Options: ${params.add.toString()}]</li>
      </ul>
      
      <h3>Customer Details</h3>

      <ul>
        <li>Customer: <span class="text-primary">${params['first-name']} ${
		params['last-name']
	}<span></li>
        <li>Address: <span class="text-primary">${params.address}, ${
		params.city
	}, ${params.state} , ${params.postcode}</span></li>
        <li>Contact Mobile: <span class="text-primary">${
					params.mobile
				}</span></li>
        <li>Contact Email: <span class="text-primary">${
					params.email
				}</span></li>
      </ul>

      <h3>Estimated Delivery Timne</h3>
      <p>Delivery expected by <strong>${params.deliveryTimeString}</strong>${
		params.deliveryDateString
	}</p>

			<p>To return to the home page, please click here: <a class="text-uppercase" href="/">Return</a>
    </div>
  </body>

</html>
	`;

	return responseHTML;
};

const addMinutes = (date, minutes) => {
	return new Date(date.getTime() + minutes * 60000);
};
