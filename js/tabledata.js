function backToHomepage() {
	window.location.href = './index.html';
}

var managerModal;
var teamModal;
var playerModal;

window.onload = function(){
	managerModal = document.getElementById("my-manager");
	teamModal = document.getElementById("my-team");
	playerModal = document.getElementById("my-player");
	createInitialPositions();
}

/*Create Managers*/

function showManagerForm() {
	managerModal.style.display = "flex";
} 

function closeManagerModal() {
	managerModal.style.display = "none";
}

window.onclick = function(event) {
	if (event.target == managerModal) {
		managerModal.style.display = "none";
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
	managers = updateManagers(manager);
	dbFunc.saveToLocalStorage(managers, "managers");
	getDataManagers();
	closeManagerModal();
	alert("Manager is created!");
	resetManagerForm();
}

function createManager(managerFirstName, managerLastName) {
	console.log("Prosledjeno: ",  managerFirstName, managerLastName)
	var manager = {
		firstName: managerFirstName,
		lastName:  managerLastName
	}

	console.log(`Kreirani menadzer: `, manager);
	manager.id = dbFunc.generateID('managers');
	return manager;
}

function updateManagers(manager) {
	var managers = dbFunc.getManagers();
	var newManagers = [];

	for (var i = 0; i < managers.length; i++) {
		var currentManager = managers[i];

		if (currentManager != manager) {
			newManagers.push(currentManager);
		}
	}

	newManagers.push(manager);
	return newManagers;
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

function getDataManagers() {
	var managers = dbFunc.getManagers();

	document.getElementById("caption-manager").innerHTML = "<div>Managers</div><div id='create-manager' onClick='showManagerForm()'>Create manager</div>"

	document.getElementById("table-manager").innerHTML = "<tr><th>ID</th><th>Name</th><th>Actions</th></tr>";

	for (var i = 0; i < managers.length; i++) {
		var manager = managers[i];

		document.getElementById("table-manager").innerHTML += "<tr><td>" + manager.id + "</td><td>" + manager.firstName + " " + manager.lastName + "</td>" + 
		`<td><div class='action-buttons'><div id='edit-button' onClick='editManager("${manager}")'>Edit</div><div id='delete-button' onClick='deleteManager("${manager.id}")'>Delete</div></div></td></tr>`;  
	}
}
