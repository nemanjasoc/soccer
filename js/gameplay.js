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

function displayPlayers(selectedTeamID, newGame, side) {
	var players = dbFunc.getPlayers();
	var newPlayers = [];

	for (var i = 0; i < players.length; i++) {
		var player = players[i];

		if (player.team == selectedTeamID) {
			newPlayers.push(player);
			
			appendStandardAndReserveTeam(player, newGame, side);
		}
	}
}

function selectTeam(side) {
	tpFunc.resetTeam(side);

	document.getElementById(side + "-team-formation").innerHTML = "4-4-2";

	var selectedTeamID = tpFunc.getSelectedTeamID(side);

	if (side == 'left') {
		tpFunc.populateSelectTeamOptions('right', selectedTeamID);
	} 
	else if (side == 'right') {
		tpFunc.populateSelectTeamOptions('left', selectedTeamID);
	}
	
	displayPlayers(selectedTeamID, true, side);
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

function changePlayer(clickedElement, side) {
	var selectedTeamID = tpFunc.getSelectedTeamID(side);
	var players = dbFunc.getPlayers();
	var playerID = clickedElement.getAttribute('data-id');

	if (playerToBeReplaced) {
		console.log("Ja sam igrac u if na koga je prvo kliknuto i koji ce biti zamenjen: ", playerToBeReplaced);

		var playerToReplace = dbFunc.getPlayerByID(playerID);
		console.log("Ja sam igrac na koga je drugo kliknuto i koji ce da zameni prvog: ", playerToReplace);
		
		document.getElementById("text-message-" + side).innerHTML = '';
		
		if (playerToReplace.team == playerToBeReplaced.team) {
				playersSubstitution(playerToBeReplaced, playerToReplace, players);
				utFunc.showSnack("snackbar-message", "Player is replaced!");
				tpFunc.resetTeam(side);
				displayPlayers(selectedTeamID, false, side);
			} else {
				utFunc.showSnack("snackbar-message", "Selected change is not allowed!");
			}

			playerToBeReplaced = null;
	} else {
		playerToBeReplaced = dbFunc.getPlayerByID(playerID);

		if (!playerToBeReplaced.reserve) {
			console.log("Ja sam igrac na koga je prvo kliknuto i koji ce biti zamenjen: ", playerToBeReplaced);
			document.getElementById("text-message-" + side).innerHTML = "You have clicked on " + playerToBeReplaced.firstName + " " + playerToBeReplaced.lastName + " and he will be replaced by the next clicked player!";
		}
		else {
			utFunc.showSnack("snackbar-message", "If you want to replace player, you should click first on standard player!");
			playerToBeReplaced = undefined;
		}
	}

	function playersSubstitution(playerToBeReplaced, playerToReplace, players, selectedTeamID) {
		var newPlayerPositions = [];

		for (var i = 0; i < players.length; i++) {
			var currentPlayer = players[i];

			if (currentPlayer.id == playerToBeReplaced.id) {
				currentPlayer.position = playerToReplace.position;
				currentPlayer.reserve = playerToReplace.reserve;

				if (currentPlayer.reserve) {
					currentPlayer.position = playerToBeReplaced.originalPosition;
				}	
			}
			if (currentPlayer.id == playerToReplace.id) {
				currentPlayer.position = playerToBeReplaced.position;
				currentPlayer.reserve = playerToBeReplaced.reserve;

				if (currentPlayer.reserve) {
					currentPlayer.position = playerToReplace.originalPosition;
				}	
			}
			newPlayerPositions.push(currentPlayer);
		}

		localStorage.setItem("players", JSON.stringify(newPlayerPositions));
	}
}

function toHomepage() {
	window.location.href = './index.html';
}
