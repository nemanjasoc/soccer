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

function createFootballManager() {
	var inputValue = document.getElementById("current-manager").value;
	var inputValueManager = document.getElementById("snackbar-manager");

	if (inputValue === null || inputValue === undefined || inputValue.trim() === '') {
		inputValueManager.className = "show";
		setTimeout(function(){ inputValueManager.className = inputValueManager.className.replace("show", ""); }, 3000);
		return;
	}

	var manager = createManager(inputValue);
	managers = updateManagers(manager);
	dbFunc.saveToLocalStorage(managers, "managers");
	closeManagerModal();
	alert("Manager is created!");
	resetManagerForm();
}

function createManager(managerName) {
	var manager = {
		name: managerName
	}

	console.log(`Kreirani menadzer ${manager}`);
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
	document.getElementById('current-manager').value = '';
}

function getDataManagers() {
	var managers = dbFunc.getManagers();

	document.getElementById("table-manager").innerHTML = "<div class='caption-manager'><div class='caption'>Managers</div>" +
	"<div id='create-manager' onClick='showManagerForm()'>Create manager</div></div>" + 
	"<tr><th>ID</th><th>Name</th><th>Actions</th></tr>";

	for (var i = 0; i < managers.length; i++) {
		var manager = managers[i];

		document.getElementById("table-manager").innerHTML += "<tr><td>" + manager.id + "</td><td>" + manager.name + "</td>" + 
		`<td><div class='action-buttons'><div id='edit-button' onClick='dbFunc.editManager("${manager}")'>Edit</div><div id='delete-button' onClick='dbFunc.deleteManager("${manager.id}")'>Delete</div></div></td></tr>`;  
	}
}
