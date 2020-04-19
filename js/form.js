var click = false;

eventListeners();

function eventListeners() {
	document.querySelector('#form').addEventListener('submit', validateAccount);

	document.querySelector('#btn').addEventListener('click', changeFun);
}

function validateAccount(e) {
	e.preventDefault();

	var type = document.querySelector('#type').value;
	var password = document.querySelector('#password').value;
	var mail = document.querySelector('#mail').value;

	if (type === 'login') {
		if (mail === '' || password === '') {
			showNotification('All fields are required', 'error');
		} else {
			//Data
			var data = new FormData();
			data.append('mail', mail);
			data.append('password', password);
			data.append('action', type);

			//AJAX
			var xhr = new XMLHttpRequest();
			xhr.open('POST', 'includes/models/model.php', true);
			xhr.onload = function () {
				if (this.status === 200) {
					var response = JSON.parse(xhr.responseText);

					if (response.response === 'success') {
						document.querySelector('#form').reset();
						Swal.fire({
							title: 'Success LogIn',
							text: 'Click "OK" to Continue',
							icon: 'success',
							background: '#0c1015'
						}).then((result) => {
							if (result.value) {
								window.location.href = 'index.php';
							}
						});
					} else if (response.response === 'incorrect data') {
						showNotification('E-Mail or Password Incorrect', 'error');
					} else {
						Swal.fire({
							title: 'Error',
							text: 'Something Went Wrong',
							icon: 'error',
							background: '#0c1015'
						});
					}
				}
			};
			xhr.send(data);
		}
	} else {
		var username = document.querySelector('#username').value;

		if (mail === '' || password === '' || username === '') {
			showNotification('All fields are required', 'error');
		} else {
			//Data
			var data = new FormData();
			data.append('username', username);
			data.append('mail', mail);
			data.append('password', password);
			data.append('action', type);

			//AJAX
			var xhr = new XMLHttpRequest();
			xhr.open('POST', 'includes/models/model.php', true);
			xhr.onload = function () {
				if (this.status == 200) {
					var response = JSON.parse(xhr.responseText);

					if (response.response === 'success') {
						document.querySelector('#form').reset();
						Swal.fire({
							title: 'SignIn Successfully',
							text: 'Account Created Successfully',
							icon: 'success',
							background: '#0c1015'
						}).then((result) => {
							if (result.value) {
								window.location.href = 'index.php';
							}
						});
					} else if (response.response === 'repeated') {
						showNotification('E-Mail is Already Registered', 'error');
                    } else if (response.response === 'password') {
                        showNotification('Password Should Contain at Least 8 Characters', 'error');
                    } else {
						Swal.fire({
							title: 'Error',
							text: 'Something Went Wrong',
							icon: 'error',
							background: '#0c1015'
						});
					}
				}
			};
			xhr.send(data);
		}
	}
}

//Show Notification
function showNotification(message, status) {
	const formContacts = document.querySelector('.main');
	const notification = document.createElement('div');
	notification.classList.add(status, 'notification', 'shadow');
	notification.textContent = message;

	//Form
	formContacts.insertBefore(notification, document.querySelector('.account-container'));

	//Show & Hidden notification
	setTimeout(() => {
		notification.classList.add('visible');

		setTimeout(() => {
			notification.classList.remove('visible');

			setTimeout(() => {
				notification.remove();
			}, 500);
		}, 3000);
	}, 100);
}

//Change LogIn or SignIn
function changeFun() {

	var type = document.querySelector('#type');
	let container = document.querySelector('#account-container');
	let title = document.querySelector('.account-container span')
	let subtitle = document.querySelector('#message h1');
	let form = document.querySelector('#form .field');
	let forgot = document.querySelector('#form .forgot');
	let legend = document.querySelector('#form legend');
	let button = document.querySelector('#btn');
	let send = document.querySelector('#send');

	if (!click) {
		container.classList.add('transition-signin');

		setTimeout(() => {
			type.value = 'signin';
			send.value = 'SignIn';

			legend.textContent = 'You Can Create an Account'
			subtitle.textContent = 'Welcome Back!';
			button.textContent = 'LogIn';
			title.textContent = '| SignIn';

			document.querySelector('#form').reset();

			form.style.display = 'flex';
			forgot.style.display = 'none';
		}, 300)
		setTimeout(() => {
			container.classList.add('signin');
			container.classList.remove('transition-signin');
		}, 1000)
		click = true;
	} else {
		container.classList.add('transition-login');

		setTimeout(() => {
			type.value = 'login';
			send.value = 'LogIn';

			legend.textContent = 'Please LogIn to Your Account';
			subtitle.textContent = 'Hello, Teacher!';
			button.textContent = 'SignIn';
			title.textContent = '| LogIn';

			document.querySelector('#form').reset();

			form.style.display = 'none';
			forgot.style.display = 'block';
		}, 300);

		setTimeout(() => {
			container.classList.remove('transition-login');
			container.classList.remove('signin');
		}, 1000);
		click = false;
	}
}
