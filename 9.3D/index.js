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

	let extras = 0;
	if (data.add !== undefined) {
		console.log('hi again');
	}
	if (data.add !== undefined) {
		if (typeof data.add === 'string') {
			extras = 1;
		} else {
			extras = data.add.length;
		}
	}

	console.log(data.promotionCode);
	const result = calculateCost(
		data['pizza-type'],
		data['pizza-size'],
		extras,
		parseInt(data['pizza-qty']),
		data.promotionCode
	);

	//extras as options for html formatting

	data['options'] = extras;
	res.send(formatHTML(data, result));
	res.send('done');
});

app.listen(3000, () => {
	console.log('server is running at port: 3000');
});

// utility functions

const calculateCost = (
	pizzaType,
	pizzaSize,
	extras,
	pizzaQty,
	promotionCode
) => {
	console.warn('here');
	let totalCost = 0;
	let promotionName = 'None';
	let cost = 0;

	if (pizzaType === 'Cheese Pizza') {
		totalCost += 12.55;
	} else if (pizzaType === 'Veggie Pizza') {
		totalCost += 12.75;
	} else if (pizzaType === 'Marinara Pizza') {
		totalCost += 15.55;
	} else if (pizzaType === 'Super Supreme') {
		totalCost += 16.25;
	} else if (pizzaType === 'Tropical Pizza') {
		totalCost += 11.75;
	} else if (pizzaType === 'Veggie Supreme') {
		totalCost += 13.75;
	}

	// pizza size factor

	if (pizzaSize === 'Medium') {
		totalCost += 1.5;
	} else if (pizzaSize === 'Large') {
		totalCost += 2.0;
	} else if (pizzaSize === 'Extra Large') {
		totalCost += 3.5;
	}

	// extras factor

	for (let i = 1; i <= extras; i++) {
		totalCost += 0.5;
	}

	// Quantity Factor

	totalCost *= pizzaQty;
	console.log('Cost without Promotion', totalCost);
	cost = totalCost;
	// promotion code factor
	let discount = 0;
	if (promotionCode === '7342418') {
		promotionName = 'Dinner-4-All, 10%';
		discount = (totalCost * 10) / 100;
		totalCost -= discount;
	} else if (promotionCode === '8403979') {
		promotionName = 'Winter-Special, 25%';
		discount = (totalCost * 25) / 100;
		totalCost -= discount;
	} else if (promotionCode === '2504647') {
		promotionName = 'Midweek-Deal, 50%';
		discount = (totalCost * 50) / 100;
		totalCost -= discount;
	} else if (promotionCode === '8406800') {
		promotionName = 'Special-Gift, 75%';
		discount = (totalCost * 75) / 100;
		totalCost -= discount;
	} else {
		promotionName = 'None';
	}

	// add Delivery charges
	totalCost += 5;

	return {
		cost: cost.toFixed(2),
		totalCost: totalCost.toFixed(2),
		promotionName,
		discount: discount.toFixed(2),
	};
};

const formatHTML = (params, costParams) => {
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
        <li><span class="text-primary">${params['pizza-qty']} x ${params['pizza-size']} ${params['pizza-type']}</span> [Options: ${params.add}]</li>
      </ul>
      
      <h3>Customer Details</h3>

      <ul>
        <li>Customer: <span class="text-primary">${params['first-name']} ${params['last-name']}<span></li>
        <li>Address: <span class="text-primary">${params.address}, ${params.city}, ${params.state} , ${params.postcode}</span></li>
        <li>Contact Mobile: <span class="text-primary">${params.mobile}</span></li>
        <li>Contact Email: <span class="text-primary">${params.email}</span></li>
      </ul>





			<div class="row mt-5">

			<div class="col-md-12">
				<h3>Pizza Cost</h3>
				<p>The total cost of your pizza is:</p>
				<div class="table-responsive">
					<table class="table">
						<thead></thead>
						<tbody>
							<tr>
								<td>Pizza(s): ${params['pizza-qty']} x ${params['pizza-type']} (${params['pizza-size']}, ${params.options} options)</td>
								<td class="text-md-right">${costParams.cost}</td>
							</tr>
							<tr>
								<td>Delivery</td>
								<td class="text-md-right">$5.00</td>
							</tr>
							<tr>
								<td>Discount (${costParams.promotionName})</td>
								<td class="text-md-right">$${costParams.discount}</td>
							</tr>

							<tr class="table-active">
							<td>Total</td>
							<td class="text-md-right">$${costParams.totalCost}</td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>



      <h3>Estimated Delivery Timne</h3>
      <p>Delivery expected by <strong>${params.deliveryTimeString}</strong>${params.deliveryDateString}</p>

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
