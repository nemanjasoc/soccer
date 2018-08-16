/*Chose and show team*/

window.onload = function(){
	choseLeftTeam();
	choseRightTeam();
}

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
	'</div><div class="event-buttons"><div class="standard-position">' + player.position + '</div><div class="remove"><button class="remove-button" onClick=removePosition("'+ positionInTeam +'")><i class="fa fa-trash-o" aria-hidden="true"></i></button></div></div>' 

	document.getElementById(positionInTeam).innerHTML = template;
}

function appendLeftTeamReservePlayerPosition(player) {
	console.log("Ja sam prosledjeni rezervni igrac u append funkciju: ", player);
	var positionInTeam = "leftTeamReserve" + "-" + player.position;

	var template = '<div class="reserve-position">' + player.position + '</div><div class="reserve-number">' + player.number +
	'</div><div class="reserve-name">' + player.firstName + " " + player.lastName + 
	'</div><div class="event-buttons"><div class="remove"><button class="remove-button" onClick=removePosition("'+ positionInTeam +'")><i class="fa fa-trash-o" aria-hidden="true"></i></button></div></div>' 

	document.getElementById(positionInTeam).innerHTML = template;
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
	'</div><div class="event-buttons"><div class="standard-position">' + player.position + '</div><div class="remove"><button class="remove-button" onClick=removePosition("'+ positionInTeam +'")><i class="fa fa-trash-o" aria-hidden="true"></i></button></div></div>' 

	document.getElementById(positionInTeam).innerHTML = template;
}

function appendRightTeamReservePlayerPosition(player) {
	console.log("Ja sam prosledjeni igrac u append funkciju: ", player);
	var positionInTeam = "rightTeamReserve" + "-" + player.position;

	var template = '<div class="reserve-position">' + player.position + '</div><div class="reserve-number">' + player.number +
	'</div><div class="reserve-name">' + player.firstName + " " + player.lastName + 
	'</div><div class="event-buttons"><div class="remove-reserve"><button class="remove-button" onClick=removePosition("'+ positionInTeam +'")><i class="fa fa-trash-o" aria-hidden="true"></i></button></div></div>' 

	document.getElementById(positionInTeam).innerHTML = template;
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


