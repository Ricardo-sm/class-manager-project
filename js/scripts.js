/**Selected Page**/
if (document.querySelector('.index-body')) {
	document.querySelectorAll('.index-body .sidebar a')[0].classList.add('selected');
}

/**Modal Function**/
var modal = document.querySelector('#modal');

var btnModal = document.querySelector('#btn-modal');

btnModal.onclick = function () {
	modal.style.display = 'flex';
};

window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = 'none';
	}
};

/**Add New Class**/
if (document.querySelector('#new-class')) {
	document.querySelector('#new-class').addEventListener('submit', addClass);
}

function addClass(e) {
	e.preventDefault();

	var type = document.querySelector('#add-class').value;
	var className = document.querySelector('#class-name').value;

	if (className === '') {
		showNotification('Write a Name for Your Class', 'error');
	} else {
		//Data
		var data = new FormData();
		data.append('class-name', className);
		data.append('action', type);

		//AJAX
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'includes/models/model.php', true);
		xhr.onload = function () {
			if (this.status === 200) {
				var response = JSON.parse(xhr.responseText);

				if (response.response === 'success') {
					const classes = document.querySelector('.classes');
					const newClass = document.createElement('div');
					newClass.classList.add('class');
					newClass.innerHTML = `<h5>${response.class_name}</h5>`;
					newClass.setAttribute('class-id', response.id_inserted);

					const iconBar = document.createElement('div');
					iconBar.classList.add('icon-bar');

					const icon = document.createElement('div');
					icon.classList.add('icon');
					const iconDelete = document.createElement('i');
					iconDelete.classList.add('fas', 'fa-trash-alt');

					icon.appendChild(iconDelete);
					iconBar.appendChild(icon);
					newClass.appendChild(iconBar);
					classes.appendChild(newClass);

					Swal.fire({
						title: 'Class Created',
						icon: 'success',
						background: '#101225e6',
						showConfirmButton: false,
						timer: 2000
					});

					//Close & Reset Modal
					document.querySelector('#new-class').reset();
					modal.style.display = 'none';
				} else if (response.response === 'repeated') {
					showNotification('You Have a Class With Same Name', 'error');
				} else {
					Swal.fire({
						title: 'Error',
						text: 'Something Went Wrong',
						icon: 'error',
						background: '#101225e6'
					});
				}
			}
		};
		xhr.send(data);
	}
}

//Delete Class Or Open Class Page
if (document.querySelector('.classes')) {
	document.querySelector('.classes').addEventListener('click', deleteClass);
}

function deleteClass(e) {
	if (e.target.parentElement.classList.contains('icon')) {
		const idClass = e.target.parentElement.parentElement.parentElement.getAttribute(
			'class-id'
		);

		Swal.fire({
			title: 'Do You Want Delete This Class?',
			icon: 'warning',
			background: '#101225e6',
			confirmButtonText: 'Yes',
			showCancelButton: true,
			confirmButtonColor: '#5889fa',
			cancelButtonColor: '#ca4761'
		}).then((confirm) => {
			if (confirm.value) {
				const xhr = new XMLHttpRequest();
				xhr.open(
					'GET',
					`includes/models/model.php?id-class=${idClass}&action=delete`,
					true
				);
				xhr.onload = function () {
					if (this.status === 200) {
						const response = JSON.parse(xhr.responseText);

						if (response.response === 'success') {
							e.target.parentElement.parentElement.parentElement.remove();

							Swal.fire({
								title: 'Class Deleted',
								icon: 'success',
								background: '#101225e6',
								showConfirmButton: false,
								timer: 2000
							});
						} else {
							showNotification('Something Went Wrong', 'error');
						}
					}
				};
				xhr.send();
			}
		});
	} else if (e.target.classList.contains('class')) {
		var idClass = e.target.getAttribute('class-id');
		window.location.href = `students.php?class=${idClass}`;
	}
}

/**Students Page Functions**/
numberStudents();

//Read Form
if (document.querySelector('#new-student')) {
	document.querySelector('#new-student').addEventListener('submit', readForm);
}

if (document.querySelector('#student-list tbody')) {
	document.querySelector('#student-list tbody').addEventListener('click', function (e) {
		if (e.target.parentElement.classList.contains('edit')) {
			e.target.onclick = changeModal(e.target.parentElement.getAttribute('student-id'));
		}
	});
}

function readForm(e) {
	e.preventDefault();

	//Reads Input Data
	const name = document.querySelector('#name').value;
	const lastName = document.querySelector('#last-name').value;
	const mail = document.querySelector('#mail').value;
	const type = document.querySelector('#add-student');

	if (name === '' || lastName === '' || mail === '') {
		showNotification('All fields are required', 'error');
	} else {
		//Add Data
		const data = new FormData();
		data.append('name', name);
		data.append('last-name', lastName);
		data.append('mail', mail);
		data.append('class-id', type.getAttribute('class-id'));
		data.append('action', type.value);

		if (type.value == 'add-student') {
			addStudent(data);
		} else {
			const idStudent = document.querySelector('#add-student').getAttribute('student-id');
			data.append('student-id', idStudent);
			editStudent(data);
		}
	}
}

//Add Student
function addStudent(data) {
	//AJAX
	const xhr = new XMLHttpRequest();
	xhr.open('POST', 'includes/models/model.php', true);
	xhr.onload = function () {
		if (this.status === 200) {
			const response = JSON.parse(xhr.responseText);

			if (response.response === 'success') {
				//Create tr for Table
				const newStudent = document.createElement('tr');
				newStudent.innerHTML = `
						<td>${response.name}</td>
						<td>${response.last_name}</td>
						<td>${response.mail}</td>
					`;

				const actionContainer = document.createElement('td');
				actionContainer.classList.add('icon-action');

				//Create Edit Button
				const iconEdit = document.createElement('i');
				iconEdit.classList.add('fas', 'fa-pen');

				const btnEdit = document.createElement('button');
				btnEdit.appendChild(iconEdit);
				btnEdit.setAttribute('student-id', response.id_inserted);
				btnEdit.classList.add('btn', 'btn-actions', 'edit');

				actionContainer.appendChild(btnEdit);

				//Create Delete Button
				const iconDelete = document.createElement('i');
				iconDelete.classList.add('fas', 'fa-trash-alt');

				const btnDelete = document.createElement('button');
				btnDelete.appendChild(iconDelete);
				btnDelete.setAttribute('student-id', response.id_inserted);
				btnDelete.classList.add('btn', 'btn-actions', 'delete');

				const iconD = document.createElement('div');
				iconD.classList.add('icon');
				const iconE = document.createElement('div');
				iconE.classList.add('icon');

				iconE.appendChild(btnEdit);
				iconD.appendChild(btnDelete);

				actionContainer.appendChild(iconE);
				actionContainer.appendChild(iconD);

				//Insert into 'td'
				newStudent.appendChild(actionContainer);
				document.querySelector('#student-list tbody').appendChild(newStudent);

				//Update Number Students
				numberStudents();

				//Reset Form
				modal.style.display = 'none';
				document.querySelector('#new-student').reset();

				Swal.fire({
					title: 'Student Added',
					icon: 'success',
					background: '#101225e6',
					showConfirmButton: false,
					timer: 2000
				});
			} else if (response.response === 'repeated') {
				showNotification('You Have a Student With Same Mail', 'error');
			} else {
				Swal.fire({
					title: 'Error',
					text: 'Something Went Wrong',
					icon: 'error',
					background: '#101225e6'
				});
			}
		}
	};
	xhr.send(data);
}

//Delete Student
if (document.querySelector('#student-list tbody')) {
	document.querySelector('#student-list tbody').addEventListener('click', deleteStudent);
}

function deleteStudent(e) {
	if (e.target.parentElement.classList.contains('delete')) {
		const id = e.target.parentElement.getAttribute('student-id');
		const idClass = document.querySelector('.main-content').getAttribute('class-id');

		Swal.fire({
			title: 'Do You Want Delete This Student?',
			icon: 'warning',
			background: '#101225e6',
			confirmButtonText: 'Yes',
			showCancelButton: true,
			confirmButtonColor: '#5889fa',
			cancelButtonColor: '#ca4761'
		}).then((confirm) => {
			if (confirm.value) {
				//AJAX
				const xhr = new XMLHttpRequest();
				xhr.open(
					'GET',
					`includes/models/model.php?student=${id}&class=${idClass}&action=delete-student`,
					true
				);
				xhr.onload = function () {
					if (this.status === 200) {
						const response = JSON.parse(xhr.responseText);

						if (response.response === 'success') {
							console.log(
								e.target.parentElement.parentElement.parentElement.parentElement
							);
							e.target.parentElement.parentElement.parentElement.parentElement.remove();

							//Update Number Students
							numberStudents();

							Swal.fire({
								title: 'Student Deleted',
								icon: 'success',
								background: '#101225e6',
								showConfirmButton: false,
								timer: 2000
							});
						} else {
							Swal.fire({
								title: 'Something Went Wrong',
								icon: 'error',
								background: '#101225e6',
								showConfirmButton: false,
								timer: 2000
							});
						}
					}
				};
				xhr.send();
			}
		});
	}
}

//Edit Student
function editStudent(data) {
	//AJAX
	const xhr = new XMLHttpRequest();
	xhr.open('POST', 'includes/models/model.php', true);
	xhr.onload = function () {
		if (this.status === 200) {
			const response = JSON.parse(xhr.responseText);

			if (response.response === 'success') {
				const editBtn = document.querySelectorAll('.edit');
				editBtn.forEach((element) => {
					if (element.getAttribute('student-id') === data.get('student-id')) {
						const row = element.parentElement.parentElement.parentElement;
						row.childNodes[1].textContent = response.name;
						row.childNodes[3].textContent = response.last_name;
						row.childNodes[5].textContent = response.mail;
					}
				});

				modal.style.display = 'none';
				Swal.fire({
					title: 'Student Updated',
					icon: 'success',
					background: '#101225e6',
					showConfirmButton: false,
					timer: 2000
				});
			} else if (response.response === 'repeated') {
				showNotification('You Have a Student With Same Mail', 'error');
			} else {
				Swal.fire({
					title: 'Something Went Wrong',
					icon: 'error',
					background: '#101225e6',
					showConfirmButton: false,
					timer: 2000
				});
			}
		}
	};
	xhr.send(data);
}

//Search Functions
if (document.querySelector('#search')) {
	document.querySelector('#search').addEventListener('input', searchStudents);
}

function searchStudents(e) {
	const expression = new RegExp(e.target.value, "i");
	const students = document.querySelectorAll('tbody tr');

	students.forEach(element => {
		element.style.display = 'none';
		const info = element.childNodes[1].textContent + ' ' + element.childNodes[3].textContent;

		if (
			element.childNodes[1].textContent.replace(/\s/g, ' ').search(expression) != -1 ||
			element.childNodes[3].textContent.replace(/\s/g, ' ').search(expression) != -1 ||
			info.replace(/\s/g, ' ').search(expression) != -1
		) {
			element.style.display = 'table-row';
		}

		numberStudents();
	});
}

function numberStudents() {
	const totalStudents = document.querySelectorAll('tbody tr');
	const numberCont = document.querySelector('.total-students span');
	let total = 0;

	totalStudents.forEach((element) => {
		if (element.style.display === '' || element.style.display === 'table-row') {
			total++;
		}
	});

	numberCont.textContent = total;
}

//Change Modal For Edit
function changeModal(id) {
	const title = document.querySelector('#modal-content h1');
	title.textContent = 'Edit Student';
	const action = document.querySelector('#add-student');
	action.value = 'edit-student';
	const subm = document.querySelector('.btn-send');
	subm.value = 'Edit';

	//Add Data
	const data = new FormData();
	data.append('student-id', id);

	//AJAX
	const xhr = new XMLHttpRequest();
	xhr.open('GET', `includes/models/model.php?student=${id}&action=read-form`, true);
	xhr.onload = function () {
		if (this.status === 200) {
			const response = JSON.parse(xhr.responseText);

			if (response.response === 'success') {
				//Insert Info On Inputs
				const name = document.querySelector('#name');
				name.value = response.name;

				const lastName = document.querySelector('#last-name');
				lastName.value = response.last_name;

				const mail = document.querySelector('#mail');
				mail.value = response.mail;

				action.setAttribute('student-id', id);

				modal.style.display = 'flex';
			}
		}
	};
	xhr.send();
}

//Show Notification
function showNotification(message, status) {
	const formClass = document.querySelector('#modal');
	const notification = document.createElement('div');
	notification.classList.add(status, 'notification', 'shadow');
	notification.textContent = message;

	//Form
	formClass.insertBefore(notification, document.querySelector('#modal-content'));

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
