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
