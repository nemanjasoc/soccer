var managerModal;
var teamModal;
var playerModal;

window.onload = function(){
	managerModal = document.getElementById("myManager");
	teamModal = document.getElementById("myTeam");
	playerModal = document.getElementById("myPlayer");	
}

/*Create Managers*/

function showManagerForm() {
    managerModal.style.display = "flex";
} 

function closeManagerModal() {
	managerModal.style.display = "none";
}

window.onclick = function(event) {

	if (event.target == playerModal) {
        playerModal.style.display = "none";
    }
    if (event.target == teamModal) {
        teamModal.style.display = "none";
    }
    if (event.target == managerModal) {
        managerModal.style.display = "none";
    }
}

function playGame() {
	window.location.href = './gameplay.html';
}

function createFootballManager() {
	// provera da li je korisnik uneo nesto u input polje, ne pustati ga dalje ako nije
	// return prekida metodu i ne nastavalja njeno izvrsavanje posle te komande
	var inputValue = document.getElementById("currentManager").value;
	if (inputValue === null || inputValue === undefined || inputValue.trim() === '') {
		alert("Please add manger name!");
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
	
	var team = createTeam();
	/*
	var existingTeam = checkTeam(team);

	if (existingTeam) {
		alert("That team alredy exist on the football pitch. That team is:" + existingTeam.name);
		return;
	}
	*/
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
	var player = createPlayer();
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
	var tim = document.getElementById("choseTeam");
	var izabraniTim = tim.options[tim.selectedIndex].value;
	var pozicija = document.getElementById("position");
	var izabranaPozicija = pozicija.options[pozicija.selectedIndex].value;

	var player = { 
		firstName: ime,
		lastName: prezime,
		number: broj,
		team: izabraniTim,
		position: izabranaPozicija
	};

	console.log("Kreirani igrac: ", player);
	player.id = generateID('players');

	return player;
}

function updatePlayers(player) {
	console.log("Prosledjeni igrac u update player funkciju: ", player);
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


/*Chose Team*/



function displayLowerPlayers(teamID) {
	console.log("Display players teamID: ", teamID);

	var helper = localStorage.getItem("players");

	if (helper) {
		players = JSON.parse(helper);
	} else {
		players = [];
	}

	var newPlayers = [];

	for (var i = 0; i < players.length; i++) {
		var player = players[i];
		console.log("Trenutni igrac u display players: ", player);

		if (player.team == teamID) {
			newPlayers.push(player);
			console.log("Pushovani igraci: ", newPlayers);

			appendLowerPlayerPosition(player);
		}
	}
}

function displayUpperPlayers(teamID) {
	console.log("Display players teamID: ", teamID);
	var helper = localStorage.getItem("players");

	if (helper) {
		players = JSON.parse(helper);
	} else {
		players = [];
	}

	var newPlayers = [];

	for (var i = 0; i < players.length; i++) {
		var player = players[i];
		console.log("Trenutni igrac u display players: ", player);

		if (player.team == teamID) {
			newPlayers.push(player);
			console.log("Pushovani igraci: ", newPlayers);

			appendUpperPlayerPosition(player);
		}
	}
}

function appendLowerPlayerPosition(player) {
	console.log("Ja sam prosledjeni igrac u append funkciju: ", player);
	var positionInTeam = "LOWER" + "-" + player.position;

	var template = '<div class="number">' + player.number +
	'</div><div class="name">' + player.firstName + " " + player.lastName + 
	'</div><div class="event-buttons"><div class="remove"><button class="remove-button" onClick=removePosition("'+ positionInTeam +'")><i class="fa fa-trash-o" aria-hidden="true"></i></button></div></div>' 

	document.getElementById(positionInTeam).innerHTML = template;
}

function appendUpperPlayerPosition(player) {
	console.log("Ja sam prosledjeni igrac u append funkciju: ", player);
	var positionInTeam = "UPPER" + "-" + player.position;

	var template = '<div class="number">' + player.number +
	'</div><div class="name">' + player.firstName + " " + player.lastName + 
	'</div><div class="event-buttons"><div class="remove"><button class="remove-button" onClick=removePosition("'+ positionInTeam +'")><i class="fa fa-trash-o" aria-hidden="true"></i></button></div></div>' 

	document.getElementById(positionInTeam).innerHTML = template;
}

function removePosition(positionInTeam) {
	var playerTeam = positionInTeam.split("-")[0];
	var playerPosition = positionInTeam.split("-")[1];

	console.log("Tim: ", playerTeam);
	console.log("Pozicija: ", playerPosition);

	var helper = localStorage.getItem("players");

	if (helper) {
		players = JSON.parse(helper);
	} else {
		players = [];
	}

	var newPlayers = [];
	
	for (var i = 0; i < players.length; i++) {
		var currentPlayer = players[i];

		if (currentPlayer.team != playerTeam || currentPlayer.position != playerPosition) {
			newPlayers.push(currentPlayer);
		}
	}

	localStorage.setItem("players", JSON.stringify(newPlayers));
	document.getElementById(positionInTeam).innerHTML = '';
	//displayLowerPlayers();
	//displayUpperPlayers();
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

function checkTeam(team) {
	console.log("Ovo je prosledjeni tim u check team funkciju: ", team);

	var helper = localStorage.getItem("teams");

	if (helper) {
		teams = JSON.parse(helper);
	} else {
		teams = [];
	}

	for (var i = 0; i < teams.length; i++) {
		var currentTeam = teams[i];
		console.log("Ja sam current team: ", currentTeam);

		if (currentTeam.name == team.name) {
			return currentTeam;
		}
	}

	return false;
}
