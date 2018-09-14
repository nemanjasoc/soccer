/*Choose and show team*/

window.onload = function(){
	tpFunc.populateSelectTeamOptions('left');
	tpFunc.populateSelectTeamOptions('right');

	tpFunc.resetTeam('left');
	tpFunc.resetTeam('right');
}

var playerToBeReplaced;

function appendStandardAndReserveTeam(player, newGame, side) {
	if (player.reserve) {
 		tpFunc.appendReservePlayerToBench(player, newGame, side);
	} else {
		tpFunc.appendPlayerToPitch(player, newGame, side);
	}
}

function displayPlayers(teamID, newGame, side) {
	console.log(`Display players teamID ${teamID}`);
	
	var players = dbFunc.getPlayers();
	var newPlayers = [];

	for (var i = 0; i < players.length; i++) {
		var player = players[i];

		if (player.team == teamID) {
			newPlayers.push(player);
			
			appendStandardAndReserveTeam(player, newGame, side);
		}
	}
}

function getSelectedTeamID(side) {
	var mojTim = document.getElementById(`select-${side}-team`);
	var teamID =  mojTim.options[mojTim.selectedIndex].value;

	return teamID;
}

function selectTeam(side) {
	tpFunc.resetTeam(side);

	var teamID = getSelectedTeamID(side);
	
	displayPlayers(teamID, true, side);
};

function getPlayerCondition(newGame, playerID) {
	var conditions = [1, 1, 2, 2, 3, 3, 3, 3, 3, 4, 4, 5, 5];
	var currentForm;

	if (newGame) {
		currentForm = conditions[Math.floor(Math.random()*conditions.length)];
		dbFunc.setPlayersForm(playerID, currentForm);
	} else {
		currentForm = dbFunc.getPlayersForm(playerID);
	}

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

function changePlayer(position, side) {
	console.log(`Ja sam prosledjena pozicija igraca u change player funkciju ${position}`);
	console.log(`Ja sam prosledjena strana tima u change player funkciju ${side}`);

	var selectedTeam = getSelectedTeamID(side);

	var players = dbFunc.getPlayers();

	if (playerToBeReplaced) {
		console.log("Ja sam igrac u if na koga je prvo kliknuto i koji ce biti zamenjen: ", playerToBeReplaced);

		var playerToReplace;
		for (var i = 0; i < players.length; i++) {
			var player = players[i];

			if (player.position == position && player.team == selectedTeam && player.reserve == false) {
				playerToReplace = Object.assign({}, player);
				console.log("Ja sam igrac u if na koga je drugo kliknuto i koji ce da zameni prvog: ", playerToReplace);
			}
		}

		playersSubstitution(playerToBeReplaced, playerToReplace, players);
		
		tpFunc.resetTeam(side);
		displayPlayers(selectedTeam, false, side);
	
		playerToBeReplaced = null;

	} else {
		for (var i = 0; i < players.length; i++) {
			var currentPlayer = players[i];

			if (currentPlayer.position == position && currentPlayer.team == selectedTeam && currentPlayer.reserve == false) {
				playerToBeReplaced = Object.assign({}, currentPlayer);
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

function toHomepage() {
	window.location.href = './index.html';
}
