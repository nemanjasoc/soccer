/*Chose and show team*/

window.onload = function(){
	choseLeftTeam();
	choseRightTeam();
}

var playerToBeReplaced;

function displayLeftTeamPlayers(teamID) {
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

			appendLeftStandardAndReserveTeam(player);
		}

		function appendLeftStandardAndReserveTeam(player) {
			var helper;
			if (!player.reserve) {
				helper = false;
				appendLeftTeamPlayerPosition(player);
			} else {
				helper = true;
				appendLeftTeamReservePlayerPosition(player);
			}
			return helper;
		}
	}
}

function appendLeftTeamPlayerPosition(player) {
	console.log("Ja sam prosledjeni igrac u append funkciju: ", player);
	var positionInTeam = "leftTeam" + "-" + player.position;

	var template = '<div class="number">' + player.number +
	'</div><div class="name">' + player.firstName + " " + player.lastName + 
	'</div><div class="event-buttons"><div class="standard-position">' + player.position + '</div><div class="condition">' + player.condition + '</div></div>' 

	document.getElementById(positionInTeam).innerHTML = template;
}

function appendLeftTeamReservePlayerPosition(player) {
	var resetSelectLeftTeamReserve = document.getElementById("selectLeftTeam");

	var template = '<div class="reserve-player-data"><div class="reserve-position">' + player.position + '</div><div class="reserve-number">' + player.number +
	'</div><div class="reserve-name">' + player.firstName + " " + player.lastName + '</div><div class="condition">' + player.condition + '</div></div>' 

	leftTeamReserve.innerHTML = leftTeamReserve.innerHTML + template;

	resetSelectLeftTeamReserve.value = "";
}

function displayRightTeamPlayers(teamID) {
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

			appendRightStandardAndReserveTeam(player);
		}

		function appendRightStandardAndReserveTeam(player) {
			var helper;
			if (!player.reserve) {
				helper = false;
				appendRightTeamPlayerPosition(player);
			} else {
				helper = true;
				appendRightTeamReservePlayerPosition(player);
			}
			return helper;
		}
	}
}

function appendRightTeamPlayerPosition(player) {
	console.log("Ja sam prosledjeni igrac u append funkciju: ", player);
	var positionInTeam = "rightTeam" + "-" + player.position;

	var template = '<div class="number">' + player.number +
	'</div><div class="name">' + player.firstName + " " + player.lastName + 
	'</div><div class="event-buttons"><div class="standard-position">' + player.position + '</div><div class="condition">' + player.condition + '</div></div>' 

	document.getElementById(positionInTeam).innerHTML = template;
}

function appendRightTeamReservePlayerPosition(player) {
	var resetSelectRightTeamReserve = document.getElementById("selectRightTeam");

	var template = '<div class="reserve-player-data"><div class="reserve-position">' + player.position + '</div><div class="reserve-number">' + player.number +
	'</div><div class="reserve-name">' + player.firstName + " " + player.lastName + '</div><div class="condition">' + player.condition + '</div></div>' 

	rightTeamReserve.innerHTML = rightTeamReserve.innerHTML + template;

	resetSelectRightTeamReserve.value = "";
}

function choseLeftTeam() {
	var helper = localStorage.getItem("teams");

	if (helper) {
		teams = JSON.parse(helper);
	} else {
		teams = [];

		alert("There have not teams at the base, you should create teams!");
	}

	document.getElementById("selectLeftTeam").innerHTML = '';

    for (var i = 0; i < teams.length; i++) {
    	var currentTeam = teams[i];
     	var template = document.getElementById("selectLeftTeam").innerHTML += "<option value=" + currentTeam.id + ">" + currentTeam.name + "</option>";
    }
}

function selectLeftTeam() {
    var mojTim = document.getElementById("selectLeftTeam");
    var teamID =  mojTim.options[mojTim.selectedIndex].value;
    console.log("!!!: ", teamID);
    displayLeftTeamPlayers(teamID);
};

function choseRightTeam() {
	var helper = localStorage.getItem("teams");

	if (helper) {
		teams = JSON.parse(helper);
	} else {
		teams = [];

		alert("There have not teams at the base, you should create teams!");
	}

	document.getElementById("selectRightTeam").innerHTML = '';

    for (var i = 0; i < teams.length; i++) {
    	var currentTeam = teams[i];

     	var template = document.getElementById("selectRightTeam").innerHTML += "<option value=" + currentTeam.id + ">" + currentTeam.name + "</option>";
    }
}

function selectRightTeam() {
    var mojTim = document.getElementById("selectRightTeam");
    var teamID =  mojTim.options[mojTim.selectedIndex].value;
    console.log("!!!: ", teamID);
    displayRightTeamPlayers(teamID);
};

function changePlayer(position) {
	console.log("Ja sam prosledjena pozicija igraca u change player funkciju: ", position);

	var helper = localStorage.getItem("players");

	if (helper) {
		players = JSON.parse(helper);
	} else {
		players = [];
	}

	if (playerToBeReplaced) {
		console.log("if");
		console.log("Ja sam igrac u if na koga je prvo kliknuto i koji ce biti zamenjen: ", playerToBeReplaced);

		var playerToReplace;
		for (var i = 0; i < players.length; i++) {
			var player = players[i];

			if (player.position == position && player.reserve == false) {
				playerToReplace = player;
				console.log("Ja sam igrac u if na koga je drugo kliknuto i koji ce da zameni prvog: ", playerToReplace);
			}
		}
		playersSubstitution(playerToBeReplaced, playerToReplace, players);

		playerToBeReplaced = null;

	} else {
		console.log("else");
		for (var i = 0; i < players.length; i++) {
			var currentPlayer = players[i];

			if (currentPlayer.position == position && currentPlayer.reserve == false) {
				playerToBeReplaced = currentPlayer;
				console.log("Ja sam igrac u else na koga je prvo kliknuto i koji ce biti zamenjen: ", playerToBeReplaced);
			}
		}
	}

	function playersSubstitution(playerToBeReplaced, playerToReplace, players) {
		console.log("Prosledjeni prvi kliknuti igrac u players substitution funkciju: ", playerToBeReplaced);
		console.log("Prosledjeni drugi kliknuti igrac u players substitution funkciju: ", playerToReplace);
		console.log("Prosledjeni niz u players substitution funkciju: ", players);

		var newPlayerPositions = [];

		for (var i = 0; i < players.length; i++) {
			var currentPlayer = players[i];

			if (currentPlayer.id == playerToBeReplaced.id) {
				currentPlayer.position = playerToReplace.position;
				newPlayerPositions.push(currentPlayer);
			} 
			

			if (currentPlayer.id == playerToReplace.id) {
				currentPlayer.position = playerToBeReplaced.position;
				newPlayerPositions.push(currentPlayer);
			} 
			
			else {
				newPlayerPositions.push(currentPlayer);
			}
		}

		localStorage.setItem("players", JSON.stringify(newPlayerPositions));
	}
}


/*
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
}
*/

