/**Selected Page**/
document.querySelectorAll('.index-body .sidebar a')[0].classList.add('selected');

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
document.querySelector('#new-class').addEventListener('submit', addClass);

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
		xhr.onload = function() {
			if (this.status === 200) {
				var response = JSON.parse(xhr.responseText);

				if (response.response === 'success') {
					//Add Class Div
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
						background: '#0c1015'
					});
				}
			}
		}
		xhr.send(data);
	}
}

//Delete Class
document.querySelector('.classes').addEventListener('click', deleteClass);

function deleteClass(e) {
	if (e.target.parentElement.classList.contains('icon')) {
		const idClass = e.target.parentElement.parentElement.parentElement.getAttribute('class-id');
		
		Swal.fire({
			title: 'Do You Want Delete This Class?',
			icon: 'warning',
			background: '#0c1015',
			confirmButtonText: 'Yes',
			showCancelButton: true,
			confirmButtonColor: '#5889fa',
			cancelButtonColor: '#ca4761'
		}).then((confirm) => {
			if (confirm.value) {
				const xhr = new XMLHttpRequest();
				xhr.open('GET', `includes/models/model.php?id-class=${idClass}&action=delete`, true);
				xhr.onload = function () {
					if (this.status === 200) {
						const response = JSON.parse(xhr.responseText);

						if (response.response === 'success') {
							e.target.parentElement.parentElement.parentElement.remove();

							Swal.fire({
								title: 'Class Deleted',
								icon: 'success',
								background: '#0c1015',
								showConfirmButton: false,
								timer: 2000
							});
						} else {
							showNotification('Something Went Wrong', 'error');
						}
					}
				}
				xhr.send();
			}
		});
	}
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