function backToHomepage() {
	window.location.href = './index.html';
}

var managerModal;
var managerEditModal;
var teamModal;
var playerModal;

window.onload = function(){
	managerModal = document.getElementById("my-manager");
	managerEditModal = document.getElementById("manager-edit");
	teamModal = document.getElementById("my-team");
	playerModal = document.getElementById("my-player");
	createInitialPositions();
}

/*Create Managers*/

function showManagerForm() {
	managerModal.style.display = "flex";
}

function showManagerEditForm() {
	managerEditModal.style.display = "flex";
}  

function closeManagerModal() {
	managerModal.style.display = "none";
}

function closeManagerEditModal() {
	managerEditModal.style.display = "none";
}

window.onclick = function(event) {
	if (event.target == managerModal) {
		managerModal.style.display = "none";
	}
	if (event.target == managerEditModal) {
		managerEditModal.style.display = "none";
	}
	if (event.target == teamModal) {
		teamModal.style.display = "none";
	}
	if (event.target == playerModal) {
		playerModal.style.display = "none";
	}
}

function playGame() {
	window.location.href = './gameplay.html';
}

function createFootballManager() {
	var inputValueFirstName = document.getElementById("current-manager-firstname").value;
	var inputValueLastName = document.getElementById("current-manager-lastname").value;
	var inputValueManager = document.getElementById("snackbar-manager");

	if (inputValueFirstName === null || inputValueFirstName === undefined || inputValueFirstName.trim() === ''  || inputValueLastName === null || inputValueLastName === undefined || inputValueLastName.trim() === '' ) {
		inputValueManager.className = "show";
		setTimeout(function(){ inputValueManager.className = inputValueManager.className.replace("show", ""); }, 3000);
		return;
	}

	var manager = createManager(inputValueFirstName, inputValueLastName);
	dbFunc.addManagers(manager);
	getDataManagers();
	closeManagerModal();
	alert("Manager is created!");
	resetManagerForm();
}

function createManager(managerFirstName, managerLastName) {
	var manager = {
		firstName: managerFirstName,
		lastName:  managerLastName
	}

	console.log(`Kreirani menadzer: `, manager);
	manager.id = dbFunc.generateID('managers');
	return manager;
}

function resetManagerForm() {
	document.getElementById('current-manager-firstname').value = '';
	document.getElementById('current-manager-lastname').value = '';
}

function deleteManager(managerId) {
	if (confirm("Are you sure you want to delete this row?")) {
		dbFunc.deleteManager(managerId);
		getDataManagers();
	}
}

function editManager(managerId) {
	showManagerEditForm();

	var manager = dbFunc.getManagerByID(managerId);

	document.getElementById("current-manager-firstname-edit").value = manager.firstName;
	document.getElementById("current-manager-lastname-edit").value = manager.lastName;
	document.getElementById("manager-id").value = manager.id;
}

function updateManager() {
	var managerFirstName = document.getElementById("current-manager-firstname-edit").value;
	var managerLastName = document.getElementById("current-manager-lastname-edit").value;
	var managerId = document.getElementById("manager-id").value;

	var manager = {
		firstName: managerFirstName,
		lastName: managerLastName,
		id: managerId 
	}

	dbFunc.updateManager(manager);
	closeManagerEditModal();
	getDataManagers();
}

function getDataManagers() {
	var managers = dbFunc.getManagers();

	document.getElementById("caption-manager").innerHTML = "<div>Managers</div><div id='create-manager' onClick='showManagerForm()'>Create manager</div>"

	document.getElementById("table-manager").innerHTML = "<tr><th>ID</th><th>Name</th><th>Actions</th></tr>";

	for (var i = 0; i < managers.length; i++) {
		var manager = managers[i];

		document.getElementById("table-manager").innerHTML += "<tr><td>" + manager.id + "</td><td>" + manager.firstName + " " + manager.lastName + "</td>" + 
		`<td><div class='action-buttons'><div id='edit-button' onClick='editManager("${manager.id}")'>Edit</div><div id='delete-button' onClick='deleteManager("${manager.id}")'>Delete</div></div></td></tr>`;  
	}
}
