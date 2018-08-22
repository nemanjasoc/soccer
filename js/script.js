var managerModal;
var teamModal;
var playerModal;
var reservePlayerModal;

window.onload = function(){
	managerModal = document.getElementById("myManager");
	teamModal = document.getElementById("myTeam");
	playerModal = document.getElementById("myPlayer");
	reservePlayerModal = document.getElementById("myReservePlayer");	
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
    if (event.target == reservePlayerModal) {
        reservePlayerModal.style.display = "none";
    }
}

function playGame() {
	window.location.href = './gameplay.html';
}

function createFootballManager() {
	var inputValue = document.getElementById("currentManager").value;
	var inputValueManager = document.getElementById("snackbar-manager");
   
	if (inputValue === null || inputValue === undefined || inputValue.trim() === '') {
		inputValueManager.className = "show";
    	setTimeout(function(){ inputValueManager.className = inputValueManager.className.replace("show", ""); }, 3000);
    	return;
	}

	var manager = createManager(inputValue);
	managers = updateManagers(manager);
	saveToLocalStorage(managers, "managers");
	managerModal.style.display = "none";
	alert("Manager is created!");
	resetManagerForm();
}

function createManager(managerName) {
	var manager = {
		name: managerName
	}

	console.log("Kreirani menadzer: ", manager);
	manager.id = generateID('managers');

	return manager;
}

function updateManagers(manager) {
	console.log("Prosledjeni menadzer u Update manager funkciju: ", manager);

	var helper = localStorage.getItem("managers");

	if (helper) {
		managers = JSON.parse(helper);
	} else {
		managers = [];
	}

	var newManagers = [];

	for (var i = 0; i < managers.length; i++) {
		var currentManager = managers[i];
		if (currentManager != manager) {
			newManagers.push(currentManager);
		}
	}

	newManagers.push(manager);

	return newManagers;

	localStorage.setItem('managers', JSON.stringify(newManagers));
}

function saveToLocalStorage(arr, table) {
	console.log("Save to local storage!");
	localStorage.setItem(table, JSON.stringify(arr));
}

function resetManagerForm() {
	document.getElementById('currentManager').value = '';
}


/*Create Teams*/

function showTeamForm() {
	populateManagerOptions();
    teamModal.style.display = "flex";
}

function closeTeamModal() {
	teamModal.style.display = "none";
}

function createSoccerTeam() {
	console.log("Create soccer team!");
	
	var inputValue = document.getElementById("currentTeam").value;
	var inputValueTeam = document.getElementById("snackbar-team");

	if (inputValue === null || inputValue === undefined || inputValue.trim() === '') {
		inputValueTeam.className = "show";
    	setTimeout(function(){ inputValueTeam.className = inputValueTeam.className.replace("show", ""); }, 3000);
    	return;
	}

	var team = createTeam(inputValue);
	teams = updateTeams(team);
	saveToLocalStorage(teams, "teams");
	teamModal.style.display = "none";
	alert("Team is created!");
	resetTeamForm();
}

function createTeam() {
	console.log("Create team!");

	var tim = document.getElementById("currentTeam").value;
	var menadzer = document.getElementById("choseManager").value;

	var team = {
		name: tim,
		managerID: menadzer
	}

	console.log("Kreirani tim: ", team);
	team.id = generateID('teams');

	return team;
}

function updateTeams(team) {
	console.log("Prosledjeni tim u update teams funkciju: ", team);
	
	var helper = localStorage.getItem("teams");

	if (helper) {
		teams = JSON.parse(helper);
	} else {
		teams = [];
	}

	var newTeams = [];

	for (var i = 0; i < teams.length; i++) {
		var currentTeam = teams[i];
		console.log("Trazeni tim: ", currentTeam);

		if (currentTeam != team) {
			newTeams.push(currentTeam);
		}
	}

	newTeams.push(team);

	return newTeams;

	localStorage.setItem("teams", JSON.stringify(newTeams));
}

function resetTeamForm() {	
	document.getElementById("currentTeam").value = '';
}

function populateManagerOptions() {
	var helper = localStorage.getItem("managers");

	if (helper) {
		managers = JSON.parse(helper);
	} else {
		managers = [];
	}

	document.getElementById("choseManager").innerHTML = '';

    for (var i = 0; i < managers.length; i++) {
    	var currentManager = managers[i];
     	document.getElementById("choseManager").innerHTML += "<option value=" + currentManager.id + ">" + currentManager.name + "</option>";
    }
}


/*Create Players*/	

function showPlayerForm() {
	populateTeamOptions();
    playerModal.style.display = "flex";
} 

function closePlayerModal() {
	playerModal.style.display = "none";
}

function createFootballer() { 
	console.log("Create footballer!");

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
	saveToLocalStorage(players, "players");
    playerModal.style.display = "none";
	alert("Player is created!");
	resetPlayerForm();
}

function createPlayer() {

	var ime = document.getElementById("first-name").value;
	var prezime = document.getElementById("last-name").value;
	var broj = document.getElementById("number").value;
	var rezerva = document.getElementById("reserve-player").checked;
	var raspolozenje = playerCondition();
	var tim = document.getElementById("choseTeam");
	var izabraniTim = tim.options[tim.selectedIndex].value;
	var pozicija = document.getElementById("position");
	var izabranaPozicija = pozicija.options[pozicija.selectedIndex].value;

	var player = { 
		firstName: ime,
		lastName: prezime,
		number: broj,
		reserve: rezerva,
		condition: raspolozenje,
		team: izabraniTim,
		position: izabranaPozicija
	};

	console.log("Kreirani igrac: ", player);
	player.id = generateID('players');

	return player;
}

function updatePlayers(player) {
	console.log("Prosledjeni igrac u update players funkciju: ", player);
	var helper = localStorage.getItem("players");

	if (helper) {
		players = JSON.parse(helper);
	} else {
		players = [];
	}

	var newPlayers = [];

	for (var i = 0; i < players.length; i++) {
		var currentPlayer = players[i];
		console.log("Trazeni igrac: ", currentPlayer);

		if (currentPlayer != player) {
			newPlayers.push(currentPlayer);
		}
	}

	newPlayers.push(player);
	return newPlayers;
	localStorage.setItem("players", JSON.stringify(newPlayers));
}

function generateID(table) {
	console.log("Table: ", table);
	var helper = localStorage.getItem(table);
	var tables; 

	if (helper) {
		tables = JSON.parse(helper);
	} else {
		tables = [];
	}

	var id = 1;

	var max = 0;

	for (var i = 0; i < tables.length; i++) {
		var currentTable = tables[i];
		console.log("Ja sam trenutni id u nizu: ", currentTable.id);

		if (currentTable.id > max) {
			max = currentTable.id;
			console.log("MAX: ", max);
		}
	}

	return max + 1;
}

function resetPlayerForm() {
	document.getElementById("first-name").value = ''; 
	document.getElementById("last-name").value = ''; 
	document.getElementById("number").value = '';
}

function populateTeamOptions() {
	var helper = localStorage.getItem("teams");

	if (helper) {
		teams = JSON.parse(helper);
	} else {
		teams = [];
	}

	document.getElementById("choseTeam").innerHTML = '';

    for (var i = 0; i < teams.length; i++) {
    	var currentTeam = teams[i];
     	document.getElementById("choseTeam").innerHTML += "<option value=" + currentTeam.id + ">" + currentTeam.name + "</option>";
    }
}

function checkPlayerNumber(player) {
	var helper = localStorage.getItem("players");

	if (helper) {
		players = JSON.parse(helper);
	} else {
		players = [];
	}

	for (var i = 0; i < players.length; i++) {
		var currentPlayer = players[i];

		if (currentPlayer.number == player.number && currentPlayer.team == player.team) {
			return currentPlayer;
		}
	}

	return false;
}

function playerCondition() {
	var condition = [
					'<div class="arrow-down"><i class="fa fa-arrow-down" aria-hidden="true"></i></div>', 
					'<div class="arrow-down"><i class="fa fa-arrow-down" aria-hidden="true"></i></div>',
					'<div class="arrow-lower-right"><i class="fa fa-arrow-right" aria-hidden="true"></i></div>',
					'<div class="arrow-lower-right"><i class="fa fa-arrow-right" aria-hidden="true"></i></div>', 
					'<div class="arrow-right"><i class="fa fa-arrow-right" aria-hidden="true"></i></div>', 
					'<div class="arrow-right"><i class="fa fa-arrow-right" aria-hidden="true"></i></div>', 
					'<div class="arrow-right"><i class="fa fa-arrow-right" aria-hidden="true"></i></div>', 
					'<div class="arrow-right"><i class="fa fa-arrow-right" aria-hidden="true"></i></div>', 
					'<div class="arrow-right"><i class="fa fa-arrow-right" aria-hidden="true"></i></div>',
					'<div class="arrow-upper-right"><i class="fa fa-arrow-up" aria-hidden="true"></i></div>',
					'<div class="arrow-upper-right"><i class="fa fa-arrow-up" aria-hidden="true"></i></div>',
					'<div class="arrow-up"><i class="fa fa-arrow-up" aria-hidden="true"></i></div>', 
					'<div class="arrow-up"><i class="fa fa-arrow-up" aria-hidden="true"></i></div>', 
					];

	return condition[Math.floor(Math.random()*condition.length)];
}