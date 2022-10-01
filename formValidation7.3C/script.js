const form = document.querySelector('form');

const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const unitCodeInput = document.querySelector('#deakin-unit');
const phoneInput = document.querySelector('#phone');

// working
form.addEventListener('submit', (event) => {
	event.preventDefault();

	// FEEDBACK TAGS

	const nameFd = document.querySelector(
		'.feedback-' + nameInput.getAttribute('id')
	);
	const emailFd = document.querySelector(
		'.feedback-' + emailInput.getAttribute('id')
	);
	const unitCodeFd = document.querySelector(
		'.feedback-' + unitCodeInput.getAttribute('id')
	);
	const phoneFd = document.querySelector(
		'.feedback-' + phoneInput.getAttribute('id')
	);

	// NAME INPUT ERROR CHECK

	if (nameInput.value === '') {
		nameFd.classList.remove('invisible');
		nameFd.innerHTML = 'You did not enter your name';
	} else {
		nameFd.classList.remove('invisible');
		nameFd.classList.remove('text-danger');
		nameFd.classList.add('text-success');
		nameFd.innerHTML = 'Valid';
	}

	// EMAIL INPUT ERROR CHECK

	if (emailInput.value.split('@')[1] !== 'deakin.edu.au') {
		// const fdSelector = '.feedback-'+emailInput.getAttribute('id');
		emailFd.classList.remove('invisible');
		emailFd.innerHTML = "Must be your deakin email '@deakin.edu.au'";
	} else {
		emailFd.classList.remove('invisible');
		emailFd.classList.remove('text-danger');
		emailFd.classList.add('text-success');
		emailFd.innerHTML = 'Valid';
	}

	// UNIT CODE INPUT ERROR CHECK
	if (unitCodeInput.value.length === 6) {
		// check first three characters
		let error = false;

		let first3 = unitCodeInput.value.slice(0, 3);
		if (Boolean(first3.charAt(0).match(/[a-zA-Z]/)) === false) {
			unitCodeFd.classList.remove('invisible');
			unitCodeFd.innerHTML = "Unit code must be in format 'ABC123'";
			error = true;
		}
		let last3 = unitCodeInput.value.slice(3, 6);
		alert(last3);
		if (isNaN(last3) === true) {
			unitCodeFd.classList.remove('invisible');
			unitCodeFd.innerHTML = "Unit code must be in format 'ABC123'";
			error = true;
		}
		if (error === false) {
			unitCodeFd.classList.remove('invisible');
			unitCodeFd.classList.remove('text-danger');
			unitCodeFd.classList.add('text-success');
			unitCodeFd.innerHTML = 'Valid';
		}
	} else {
		unitCodeFd.classList.remove('invisible');
		unitCodeFd.innerHTML = "Unit code must be in format 'ABC123'";
	}

	// PHONE NUMBEER CHECK

	if (phoneInput.value !== '' && phoneInput.value.length === 10) {
		if (isNaN(phoneInput.value) === true) {
			phoneFd.classList.remove('invisible');

			var regexp = new RegExp('([^0-9])', 'g');
			var nonNumber = regexp.exec(phoneInput.value)[1];

			phoneFd.innerHTML = `Cotnainers character '${nonNumber}'. Numbers only`;
		} else {
			// valid input
			phoneFd.classList.remove('invisible');
			phoneFd.classList.remove('text-danger');
			phoneFd.classList.add('text-success');
			phoneFd.innerHTML = 'Valid';
		}
	} else {
		phoneFd.classList.remove('invisible');
		phoneFd.innerHTML = 'Phone Number must be 10 digits only';
	}
});
