function playGame() {
	window.location.href = './gameplay.html';
}

var managerModal;
var managerEditModal;
var teamModal;
var teamEditModal;
var playerModal;
var playerEditModal;

window.onload = function() {
	managerModal = document.getElementById("my-manager");
	managerEditModal = document.getElementById("manager-edit");
	teamModal = document.getElementById("my-team");
	teamEditModal = document.getElementById("team-edit");
	playerModal = document.getElementById("my-player");
	playerEditModal = document.getElementById("player-edit");
	createInitialPositions();

	switch (location.hash) {
		case "#managers":
			getDataManagers();
			break;
		case "#teams":
			getDataTeams();
			break;
		case "#players":
			getDataPlayers();
			break;
		default:
			getDataManagers();
			break;
	};
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
	if (event.target == teamEditModal) {
		teamEditModal.style.display = "none";
	}
	if (event.target == playerModal) {
		playerModal.style.display = "none";
	}
	if (event.target == playerEditModal) {
		playerEditModal.style.display = "none";
	}
}

function createFootballManager() {
	var inputValueFirstName = document.getElementById("current-manager-firstname").value;
	var inputValueLastName = document.getElementById("current-manager-lastname").value;
	
	if (inputValueFirstName === null || inputValueFirstName === undefined || inputValueFirstName.trim() === ''  || inputValueLastName === null || inputValueLastName === undefined || inputValueLastName.trim() === '' ) {
		utFunc.showSnack("snackbar-manager", "You did't create manager!");
		return;
	}
	
	var manager = createManager(inputValueFirstName, inputValueLastName);
	dbFunc.addManagers(manager);
	tpFunc.getDataManagers();
	closeManagerModal();
	resetManagerForm();

	if (inputValueFirstName && inputValueLastName) {
		utFunc.showSnack("snackbar-manager", "Manager is created!");
		return;
	}
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
		utFunc.showSnack("snackbar-manager", "Manager is deleted!");
		tpFunc.getDataManagers();
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

	if (managerFirstName === null || managerFirstName === undefined || managerFirstName.trim() === ''  || managerLastName === null || managerLastName === undefined || managerLastName.trim() === '' ) {
		utFunc.showSnack("snackbar-manager", "You did't edit manager!");
		return;
	}

	dbFunc.updateManager(manager);
	closeManagerEditModal();
	tpFunc.getDataManagers();

	if (managerFirstName && managerLastName) {
		utFunc.showSnack("snackbar-manager", "Manager is edited!");
		return;
	}
}

function getDataManagers() {
	tpFunc.getDataManagers();
	location.hash = "managers";
}

function resetData() {
	document.querySelector("#caption").innerHTML = '';
	document.querySelector("#table > tbody").innerHTML = '';
	document.querySelector("#table > thead").innerHTML = '';
}

/*Create Teams*/

function showTeamForm() {
	tpFunc.populateManagerOptions();
	teamModal.style.display = "flex";
}

function showTeamEditForm() {
	tpFunc.populateEditManagerOptions();
	teamEditModal.style.display = "flex";
}

function closeTeamModal() {
	teamModal.style.display = "none";
}

function closeTeamEditModal() {
	teamEditModal.style.display = "none";
}

function createSoccerTeam() {
	var inputValue = document.getElementById("current-team").value;

	if (inputValue === null || inputValue === undefined || inputValue.trim() === '') {
		utFunc.showSnack("snackbar-team", "You did't create team!");
		return;
	}

	var team = createTeam(inputValue);
	dbFunc.addTeams(team);
	closeTeamModal();
	resetTeamForm();
	tpFunc.getDataTeams();

	if (inputValue) {
		utFunc.showSnack("snackbar-team", "Team is created!");
		return;
	}
}

function createTeam(tim) {
	var menadzer = document.getElementById("choose-manager").value;

	var team = {
		name: tim,
		managerID: menadzer
	}

	console.log(`Kreirani tim ${team}`);
	team.id = dbFunc.generateID('teams');
	return team;
}

function resetTeamForm() {	
	document.getElementById("current-team").value = '';
}

function deleteTeam(teamId) {
	if (confirm("Are you sure you want to delete this row?")) {
		dbFunc.deleteTeam(teamId);
		utFunc.showSnack("snackbar-team", "Team is deleted!");
		tpFunc.getDataTeams();
	}
}

function editTeam(teamId) {
	showTeamEditForm();

	var team = dbFunc.getTeamByID(teamId);

	document.getElementById("current-team-edit").value = team.name;
	document.getElementById("team-id").value = team.id;
}

function updateTeam() {
	var tim = document.getElementById("current-team-edit").value;
	var menadzer = document.getElementById("choose-manager-edit").value;
	var teamId = document.getElementById("team-id").value;

	var team = {
		name: tim,
		managerID: menadzer,
		id: teamId
	}

	if (tim === null || tim === undefined || tim.trim() === '') {
		utFunc.showSnack("snackbar-team", "You did't edit team!");
		return;
	}

	dbFunc.updateTeam(team);
	closeTeamEditModal();
	tpFunc.getDataTeams();

	if (tim) {
		utFunc.showSnack("snackbar-team", "Team is edited!");
		return;
	}
}

function getDataTeams() {
	tpFunc.getDataTeams();
	location.hash = "teams";
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

function showPlayerEditForm() {
	tpFunc.populateTeamEditOptions();
	tpFunc.populatePositionEditOptions();
	playerEditModal.style.display = "flex";
}

function closePlayerEditModal() {
	playerEditModal.style.display = "none";
}

function createFootballer() { 
	var inputFirstName = document.getElementById("first-name").value;
	var inputLastName = document.getElementById("last-name").value;
	var inputNumber = document.getElementById("number").value;

	if (inputFirstName === null || inputFirstName === undefined || inputFirstName.trim() === '') {
		utFunc.showSnack("snackbar-player", "You did't create player!");
		return;
	}
	if (inputLastName === null || inputLastName === undefined || inputLastName.trim() === '') {
		utFunc.showSnack("snackbar-player", "You did't create player!");
		return;
	}
	if (inputNumber === null || inputNumber === undefined || inputNumber.trim() === '') {
		utFunc.showSnack("snackbar-player", "You did't create player!");
		return;
	}

	var player = createPlayer(inputFirstName, inputLastName, inputNumber);

	var existingPlayer = checkPlayerNumber(player);
	if (existingPlayer) {
		alert("That number alredy exist on the football team. The player who has that number is:" + existingPlayer.firstName + " " + existingPlayer.lastName);
		return;
	}

	dbFunc.addPlayers(player);
	closePlayerModal();
	resetPlayerForm();
	tpFunc.getDataPlayers();
	
	if (inputFirstName && inputLastName && inputNumber) {
		utFunc.showSnack("snackbar-player", "Player is created!");
		return;
	}
}

function createPlayer(ime, prezime, broj) {
	var rezerva = document.getElementById("reserve-player").checked;
	var tim = document.getElementById("choose-team");
	var izabraniTim = tim.options[tim.selectedIndex].value;
	var pozicija = document.getElementById("position");
	var izabranaPozicija = pozicija.options[pozicija.selectedIndex].value;

	var player = { 
		firstName: ime,
		lastName: prezime,
		number: broj,
		reserve: rezerva,
		team: izabraniTim,
		position: izabranaPozicija,
		originalPosition: izabranaPozicija
	};

	console.log(`Kreirani igrac ${player}`);
	player.id = dbFunc.generateID('players');
	return player;
}

function resetPlayerForm() {
	document.getElementById("first-name").value = ''; 
	document.getElementById("last-name").value = ''; 
	document.getElementById("number").value = '';
}

function deletePlayer(playerId) {
	if (confirm("Are you sure you want to delete this row?")) {
		dbFunc.deletePlayer(playerId);
		utFunc.showSnack("snackbar-player", "Player is deleted!");
		tpFunc.getDataPlayers();
	}
}

function editPlayer(playerID) {
	showPlayerEditForm();

	var player = dbFunc.getPlayerByID(playerID);

	document.getElementById("first-name-edit").value = player.firstName;
	document.getElementById("last-name-edit").value = player.lastName;
	document.getElementById("number-edit").value = player.number;
	document.getElementById("reserve-player-edit").checked = player.reserve;
	var tim = document.getElementById("choose-team-edit");
	var izabraniTim = tim.options[tim.selectedIndex].value;
	document.getElementById("position-edit").value = player.originalPosition;
	document.getElementById("player-id").value = player.id;
}

function updatePlayer() {
	var ime = document.getElementById("first-name-edit").value;
	var prezime = document.getElementById("last-name-edit").value;
	var broj = document.getElementById("number-edit").value;
	var rezerva = document.getElementById("reserve-player-edit").checked;
	var tim = document.getElementById("choose-team-edit");
	var izabraniTim = tim.options[tim.selectedIndex].value;
	var pozicija = document.getElementById("position-edit");
	var izabranaPozicija = pozicija.options[pozicija.selectedIndex].value;
	var playerId = Number(document.getElementById("player-id").value);

	var player = { 
		firstName: ime,
		lastName: prezime,
		number: broj,
		reserve: rezerva,
		team: izabraniTim,
		position: izabranaPozicija,
		originalPosition: izabranaPozicija,
		id: playerId
	};

	if (ime === null || ime === undefined || ime.trim() === '') {
		utFunc.showSnack("snackbar-player", "You did't edit player!");
		return;
	}
	if (prezime === null || prezime === undefined || prezime.trim() === '') {
		utFunc.showSnack("snackbar-player", "You did't edit player!");
		return;
	}
	if (broj === null || broj === undefined || broj.trim() === '') {
		utFunc.showSnack("snackbar-player", "You did't edit player!");
		return;
	}

	dbFunc.updatePlayer(player);
	closePlayerEditModal();
	tpFunc.getDataPlayers();

	if (ime && prezime && broj) {
		utFunc.showSnack("snackbar-player", "Player is edited!");
		return;
	}
}

function getDataPlayers() {
	tpFunc.getDataPlayers();
	location.hash = "players";
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

	dbFunc.saveToLocalStorage(positions, "positions");
}
