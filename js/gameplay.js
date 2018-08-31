/*Chose and show team*/

window.onload = function(){
	choseLeftTeam();
	choseRightTeam();

	resetLeftTeam();
	resetRightTeam();
}

var playerToBeReplaced;

function displayLeftTeamPlayers(teamID) {
	console.log("Display players teamID: ", teamID);
	
	var players = dbFunc.getPlayers();

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
	var positionInTeam = "left-team" + "-" + player.position;

	var template = '<div class="number">' + player.number +
	'</div><div class="name">' + player.firstName + " " + player.lastName + 
	'</div><div class="event-buttons"><div class="standard-position">' + player.position + '</div><div class="condition">' + getPlayerCondition() + '</div></div>' 

	document.getElementById(positionInTeam).innerHTML = template;
}

function appendLeftTeamReservePlayerPosition(player) {
	var leftTeamReserve = document.getElementById("left-team-reserve");

	var template = '<div class="reserve-player-data"><div class="reserve-position">' + player.position + '</div><div class="reserve-number">' + player.number +
	'</div><div class="reserve-name">' + player.firstName + " " + player.lastName + '</div><div class="condition">' + getPlayerCondition() + '</div></div>' 

	leftTeamReserve.innerHTML = leftTeamReserve.innerHTML + template;

}

function displayRightTeamPlayers(teamID) {
	console.log("Display players teamID: ", teamID);

	var players = dbFunc.getPlayers(); 

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
	var positionInTeam = "right-team" + "-" + player.position;

	var template = '<div class="number">' + player.number +
	'</div><div class="name">' + player.firstName + " " + player.lastName + 
	'</div><div class="event-buttons"><div class="standard-position">' + player.position + '</div><div class="condition">' + getPlayerCondition() + '</div></div>' 

	document.getElementById(positionInTeam).innerHTML = template;
}

function appendRightTeamReservePlayerPosition(player) {
	var rightTeamReserve = document.getElementById("right-team-reserve");

	var template = '<div class="reserve-player-data"><div class="reserve-position">' + player.position + '</div><div class="reserve-number">' + player.number +
	'</div><div class="reserve-name">' + player.firstName + " " + player.lastName + '</div><div class="condition">' + getPlayerCondition() + '</div></div>' 

	rightTeamReserve.innerHTML = rightTeamReserve.innerHTML + template;
}

function choseLeftTeam() {
	var teams = dbFunc.getTeams();

	document.getElementById("select-left-team").innerHTML = '<option value=""> -- select an option -- </option>';

    for (var i = 0; i < teams.length; i++) {
    	var currentTeam = teams[i];
     	var template = document.getElementById("select-left-team").innerHTML += "<option value=" + currentTeam.id + ">" + currentTeam.name + "</option>";
    }
}

function selectLeftTeam() {
	var mojTim = document.getElementById("select-left-team");

    resetLeftTeam();

    var teamID =  mojTim.options[mojTim.selectedIndex].value;

   	displayLeftTeamPlayers(teamID);
};

function choseRightTeam() {
	var teams = dbFunc.getTeams();

	document.getElementById("select-right-team").innerHTML = '<option value=""> -- select an option -- </option>';

    	for (var i = 0; i < teams.length; i++) {
    		var currentTeam = teams[i];

     		var template = document.getElementById("select-right-team").innerHTML += "<option value=" + currentTeam.id + ">" + currentTeam.name + "</option>";
    	}
}

function selectRightTeam() {
    var mojTim = document.getElementById("select-right-team");
    
    resetRightTeam();

    var teamID =  mojTim.options[mojTim.selectedIndex].value;

    displayRightTeamPlayers(teamID);
};

function getPlayerCondition() {
	var conditions = [1, 1, 2, 2, 3, 3, 3, 3, 3, 4, 4, 5, 5  ];
	var currentForm = conditions[Math.floor(Math.random()*conditions.length)];

	switch (currentForm) {
	    case 1:
	        return '<div class="arrow-down"><i class="fa fa-arrow-down" aria-hidden="true"></i></div>'; 
	    case 2:
	        return '<div class="arrow-lower-right"><i class="fa fa-arrow-right" aria-hidden="true"></i></div>';
        case 3:
	        return '<div class="arrow-right"><i class="fa fa-arrow-right" aria-hidden="true"></i></div>'; 
	    case 4:
	        return '<div class="arrow-upper-right"><i class="fa fa-arrow-up" aria-hidden="true"></i></div>'; 
	    case 5:
	        return '<div class="arrow-up"><i class="fa fa-arrow-up" aria-hidden="true"></i></div>'; 
	};
}

function resetLeftTeam() {
	 var template = `<img src="img/football-pitch.jpg">` +			
        				`<div id="left-team-GK" onClick="changePlayer('GK')">GK</div>` +
        				`<div id="left-team-RB" onClick="changePlayer('RB')">RB</div>` +
        				`<div id="left-team-LB" onClick="changePlayer('LB')">LB</div>` +
        				`<div id="left-team-RCB" onClick="changePlayer('RCB')">RCB</div>` +
        				`<div id="left-team-LCB" onClick="changePlayer('LCB')">LCB</div>` +
        				`<div id="left-team-RCM" onClick="changePlayer('RCM')">RCM</div>` +
        				`<div id="left-team-LCM" onClick="changePlayer('LCM')">LCM</div>` +
        				`<div id="left-team-RM" onClick="changePlayer('RM')">RM</div>` +
        				`<div id="left-team-LM" onClick="changePlayer('LM')">LM</div>` +
        				`<div id="left-team-RCF" onClick="changePlayer('RCF')">RCF</div>` +
        				`<div id="left-team-LCF" onClick="changePlayer('LCF')">LCF</div>` +

        				`<div id="left-team-reserve" onClick="changePlayer()"></div>`

   document.getElementById("left-team-standard").innerHTML = template;
}

function resetRightTeam(player) {
	 var template = `<img src="img/football-pitch.jpg">` +			
        				`<div id="right-team-GK" onClick="changePlayer('GK')">GK</div>` +
        				`<div id="right-team-RB" onClick="changePlayer('RB')">RB</div>` +
        				`<div id="right-team-LB" onClick="changePlayer('LB')">LB</div>` +
        				`<div id="right-team-RCB" onClick="changePlayer('RCB')">RCB</div>` +
        				`<div id="right-team-LCB" onClick="changePlayer('LCB')">LCB</div>` +
        				`<div id="right-team-RCM" onClick="changePlayer('RCM')">RCM</div>` +
        				`<div id="right-team-LCM" onClick="changePlayer('LCM')">LCM</div>` +
        				`<div id="right-team-RM" onClick="changePlayer('RM')">RM</div>` +
        				`<div id="right-team-LM" onClick="changePlayer('LM')">LM</div>` +
        				`<div id="right-team-RCF" onClick="changePlayer('RCF')">RCF</div>` +
        				`<div id="right-team-LCF" onClick="changePlayer('LCF')">LCF</div>` +

        				`<div id="right-team-reserve" onClick="changePlayer()"></div>`

    document.getElementById("right-team-standard").innerHTML = template;
}

function changePlayer(position) {
	console.log("Ja sam prosledjena pozicija igraca u change player funkciju: ", position);

	var players = dbFunc.getPlayers();

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
			} 

			if (currentPlayer.id == playerToReplace.id) {
				currentPlayer.position = playerToBeReplaced.position;
			} 
			
			newPlayerPositions.push(currentPlayer);

		}
		
		localStorage.setItem("players", JSON.stringify(newPlayerPositions));
	}
}







