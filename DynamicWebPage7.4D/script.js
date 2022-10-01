const nameInput = document.querySelector('#name');
const feedbackInput = document.querySelector('#feedback');
const fdOptionsInput = document.querySelector('#feedback-options');

// The Form

const form = document.querySelector('form');

let negFeedbacks = [];
let posFeedbacks = [];

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const rating = fdOptionsInput.options[fdOptionsInput.selectedIndex].value;

	const feedback = {
		name: nameInput.value,
		feedback: feedbackInput.value,
		rating: rating,
	};

	if (rating === 'Excellent' || rating === 'Good') {
		let item = feedback;
		posFeedbacks.push(item);
	} else {
		let item = feedback;
		negFeedbacks.push(item);
	}
	updateTable();
});

function updateTable() {
	const negTableBody = document.querySelector('.negative-body');
	const posTableBody = document.querySelector('.positive-body');

	// clean existing data
	negTableBody.innerHTML = '';
	posTableBody.innerHTML = '';

	negFeedbacks.map((fd) => {
		const tr = document.createElement('tr');
		tr.innerHTML = `
    <td>${fd.name}</td>
    <td>${fd.feedback}</td>
    <td>${fd.rating}</td>
    `;
		negTableBody.appendChild(tr);
	});

	posFeedbacks.map((fd) => {
		const tr = document.createElement('tr');
		tr.innerHTML = `
    <td>${fd.name}</td>
    <td>${fd.feedback}</td>
    <td>${fd.rating}</td>
    `;

		posTableBody.appendChild(tr);
	});
}
