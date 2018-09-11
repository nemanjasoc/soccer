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
	managerModal.style.display = "none";
	alert("Manager is created!");
	resetManagerForm();
}

function createManager(managerName) {
	var manager = {
		name: managerName
	}

	console.log("Kreirani menadzer: ", manager);
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

/*Create Teams*/

function showTeamForm() {
	tpFunc.populateManagerOptions();
	teamModal.style.display = "flex";
}

function closeTeamModal() {
	teamModal.style.display = "none";
}

function createSoccerTeam() {
	var inputValue = document.getElementById("current-team").value;
	var inputValueTeam = document.getElementById("snackbar-team");

	if (inputValue === null || inputValue === undefined || inputValue.trim() === '') {
		inputValueTeam.className = "show";
		setTimeout(function(){ inputValueTeam.className = inputValueTeam.className.replace("show", ""); }, 3000);
		return;
	}

	var team = createTeam(inputValue);
	teams = updateTeams(team);
	dbFunc.saveToLocalStorage(teams, "teams");
	teamModal.style.display = "none";
	alert("Team is created!");
	resetTeamForm();
}

function createTeam() {
	var tim = document.getElementById("current-team").value;
	var menadzer = document.getElementById("chose-manager").value;

	var team = {
		name: tim,
		managerID: menadzer
	}

	console.log("Kreirani tim: ", team);
	team.id = dbFunc.generateID('teams');
	return team;
}

function updateTeams(team) {
	var teams = dbFunc.getTeams();
	var newTeams = [];

	for (var i = 0; i < teams.length; i++) {
		var currentTeam = teams[i]
		if (currentTeam != team) {
			newTeams.push(currentTeam);
		}
	}

	newTeams.push(team);
	return newTeams;
}

function resetTeamForm() {	
	document.getElementById("current-team").value = '';
}

/*Create Positions*/

function createInitialPositions() {
	var positions = [
		{id: 1, position: "GK"},
		{id: 2, position: "RB"},
		{id: 3, position: "LB"},
		{id: 4, position: "RCB"},
		{id: 5, position: "LCB"},
		{id: 6, position: "RCM"},
		{id: 7, position: "LCM"},
		{id: 8, position: "RM"},
		{id: 9, position: "LM"},
		{id: 10, position: "RCF"},
		{id: 11, position: "LCF"}
	];

	localStorage.setItem("positions", JSON.stringify(positions));
}

/*Create Players*/	

function showPlayerForm() {
	tpFunc.populateTeamOptions();
	tpFunc.populatePositionOptions();
	playerModal.style.display = "flex";
} 

function closePlayerModal() {
	playerModal.style.display = "none";
}

function createFootballer() { 
	var inputFirstName = document.getElementById("first-name").value;
	var inputLastName = document.getElementById("last-name").value;
	var inputNumber = document.getElementById("number").value;
	var playerSnackbar = document.getElementById("snackbar-player");

	if (inputFirstName === null || inputFirstName === undefined || inputFirstName.trim() === '') {
		playerSnackbar.className = "show";
		setTimeout(function(){ playerSnackbar.className = playerSnackbar.className.replace("show", ""); }, 3000);
		return;
	}
	if (inputLastName === null || inputLastName === undefined || inputLastName.trim() === '') {
		playerSnackbar.className = "show";
		setTimeout(function(){ playerSnackbar.className = playerSnackbar.className.replace("show", ""); }, 3000);
		return;
	}
	if (inputNumber === null || inputNumber === undefined || inputNumber.trim() === '') {
		playerSnackbar.className = "show";
		setTimeout(function(){ playerSnackbar.className = playerSnackbar.className.replace("show", ""); }, 3000);
		return;
	}

	var player = createPlayer(inputFirstName, inputLastName, inputNumber);

	var existingPlayer = checkPlayerNumber(player);
	if (existingPlayer) {
		alert("That number alredy exist on the football team. The player who has that number is:" + existingPlayer.firstName + " " + existingPlayer.lastName);
		return;
	}

	players = updatePlayers(player);
	dbFunc.saveToLocalStorage(players, "players");
	playerModal.style.display = "none";
	alert("Player is created!");
	resetPlayerForm();
}

function createPlayer() {
	var ime = document.getElementById("first-name").value;
	var prezime = document.getElementById("last-name").value;
	var broj = document.getElementById("number").value;
	var rezerva = document.getElementById("reserve-player").checked;
	var tim = document.getElementById("chose-team");
	var izabraniTim = tim.options[tim.selectedIndex].value;
	var pozicija = document.getElementById("position");
	var izabranaPozicija = pozicija.options[pozicija.selectedIndex].value;

	var player = { 
		firstName: ime,
		lastName: prezime,
		number: broj,
		reserve: rezerva,
		team: izabraniTim,
		position: izabranaPozicija
	};

	console.log("Kreirani igrac: ", player);
	player.id = dbFunc.generateID('players');
	return player;
}

function updatePlayers(player) {
	var players = dbFunc.getPlayers();
	var newPlayers = [];

	for (var i = 0; i < players.length; i++) {
		var currentPlayer = players[i];
		if (currentPlayer != player) {
			newPlayers.push(currentPlayer);
		}
	}

	newPlayers.push(player);
	return newPlayers;
}

function resetPlayerForm() {
	document.getElementById("first-name").value = ''; 
	document.getElementById("last-name").value = ''; 
	document.getElementById("number").value = '';
}

function checkPlayerNumber(player) {
	var players = dbFunc.getPlayers();

	for (var i = 0; i < players.length; i++) {
		var currentPlayer = players[i];
		if (currentPlayer.number == player.number && currentPlayer.team == player.team) {
			return currentPlayer;
		}
	}

	return false;
}