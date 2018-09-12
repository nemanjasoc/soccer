var tpFunc = {
	populateManagerOptions: function () {
		var managers = dbFunc.getManagers();

		document.getElementById("choose-manager").innerHTML = '';

		for (var i = 0; i < managers.length; i++) {
			var currentManager = managers[i];
			document.getElementById("choose-manager").innerHTML += "<option value=" + currentManager.id + ">" + currentManager.name + "</option>";
		}
	},
	populatePositionOptions: function () {
		var positions = dbFunc.getPositions();

		document.getElementById("position").innerHTML = '';

		for (var i = 0; i < positions.length; i++) {
			var currentPosition = positions[i];
			document.getElementById("position").innerHTML += "<option value=" + currentPosition.position + ">" + currentPosition.position + "</option>";
		}
	},
	populateTeamOptions: function () {
		var teams = dbFunc.getTeams();

		document.getElementById("choose-team").innerHTML = '';

		for (var i = 0; i < teams.length; i++) {
			var currentTeam = teams[i];
			document.getElementById("choose-team").innerHTML += "<option value=" + currentTeam.id + ">" + currentTeam.name + "</option>";
		}
	},
	populateSelectTeamOptions: function (side) {
		var teams = dbFunc.getTeams();
		var template = '<option value=""> -- select an option -- </option>';

		for (var i = 0; i < teams.length; i++) {
			var currentTeam = teams[i];

			template += "<option value=" + currentTeam.id + ">" + currentTeam.name + "</option>";
		}

		document.getElementById("select-" + side + "-team").innerHTML = template;
	},
	appendPlayerToPitch: function (player, newGame, side) {
		console.log("Ja sam prosledjeni igrac u append funkciju: ", player);

		var positionInTeam = side + "-team" + "-" + player.position;

		var template = '<div class="number">' + player.number +
		'</div><div class="name">' + player.firstName + " " + player.lastName + 
		'</div><div class="event-buttons"><div class="standard-position">' + player.position + '</div><div class="condition">' + getPlayerCondition(newGame, player.id) + '</div></div>' 

		document.getElementById(positionInTeam).innerHTML = template;
	},
	appendReservePlayerToPitch: function (player, newGame, side) {
		var leftTeamReserve = document.getElementById(side + "-team-reserve");

		var template = '<div class="reserve-player-data"><div class="reserve-position">' + player.position + '</div><div class="reserve-number">' + player.number +
		'</div><div class="reserve-name">' + player.firstName + " " + player.lastName + '</div><div class="condition">' + getPlayerCondition(newGame, player.id) + '</div></div>' 

		leftTeamReserve.innerHTML = leftTeamReserve.innerHTML + template;
	},
	resetLeftTeam: function () {
		var template = `<img src="img/football-pitch.jpg">` +			
							`<div id="left-team-GK" onClick="changePlayer('GK', 'left')">GK</div>` +
							`<div id="left-team-RB" onClick="changePlayer('RB', 'left')">RB</div>` +
							`<div id="left-team-LB" onClick="changePlayer('LB', 'left')">LB</div>` +
							`<div id="left-team-RCB" onClick="changePlayer('RCB', 'left')">RCB</div>` +
							`<div id="left-team-LCB" onClick="changePlayer('LCB', 'left')">LCB</div>` +
							`<div id="left-team-RCM" onClick="changePlayer('RCM', 'left')">RCM</div>` +
							`<div id="left-team-LCM" onClick="changePlayer('LCM', 'left')">LCM</div>` +
							`<div id="left-team-RM" onClick="changePlayer('RM', 'left')">RM</div>` +
							`<div id="left-team-LM" onClick="changePlayer('LM', 'left')">LM</div>` +
							`<div id="left-team-RCF" onClick="changePlayer('RCF', 'left')">RCF</div>` +
							`<div id="left-team-LCF" onClick="changePlayer('LCF', 'left')">LCF</div>` +

							`<div id="left-team-reserve" onClick="changePlayer()"></div>`

		document.getElementById("left-team-standard").innerHTML = template;
	},
	resetRightTeam: function () {
		var template = `<img src="img/football-pitch.jpg">` +			
							`<div id="right-team-GK" onClick="changePlayer('GK', 'right')">GK</div>` +
							`<div id="right-team-RB" onClick="changePlayer('RB', 'right')">RB</div>` +
							`<div id="right-team-LB" onClick="changePlayer('LB', 'right')">LB</div>` +
							`<div id="right-team-RCB" onClick="changePlayer('RCB', 'right')">RCB</div>` +
							`<div id="right-team-LCB" onClick="changePlayer('LCB', 'right')">LCB</div>` +
				 			`<div id="right-team-RCM" onClick="changePlayer('RCM', 'right')">RCM</div>` +
							`<div id="right-team-LCM" onClick="changePlayer('LCM', 'right')">LCM</div>` +
							`<div id="right-team-RM" onClick="changePlayer('RM', 'right')">RM</div>` +
							`<div id="right-team-LM" onClick="changePlayer('LM', 'right')">LM</div>` +
							`<div id="right-team-RCF" onClick="changePlayer('RCF', 'right')">RCF</div>` +
							`<div id="right-team-LCF" onClick="changePlayer('LCF', 'right')">LCF</div>` +

							`<div id="right-team-reserve" onClick="changePlayer()"></div>`

		document.getElementById("right-team-standard").innerHTML = template;
	}
};
