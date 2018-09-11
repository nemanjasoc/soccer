var tpFunc = {
	populateManagerOptions: function () {
		var managers = dbFunc.getManagers();

		document.getElementById("chose-manager").innerHTML = '';

		for (var i = 0; i < managers.length; i++) {
			var currentManager = managers[i];
			document.getElementById("chose-manager").innerHTML += "<option value=" + currentManager.id + ">" + currentManager.name + "</option>";
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

		document.getElementById("chose-team").innerHTML = '';

		for (var i = 0; i < teams.length; i++) {
			var currentTeam = teams[i];
			document.getElementById("chose-team").innerHTML += "<option value=" + currentTeam.id + ">" + currentTeam.name + "</option>";
		}
	},
	choseLeftTeam: function () {
		var teams = dbFunc.getTeams();

		document.getElementById("select-left-team").innerHTML = '<option value=""> -- select an option -- </option>';

		for (var i = 0; i < teams.length; i++) {
			var currentTeam = teams[i];
			var template = document.getElementById("select-left-team").innerHTML += "<option value=" + currentTeam.id + ">" + currentTeam.name + "</option>";
		}
	},
	choseRightTeam: function () {
		var teams = dbFunc.getTeams();

		document.getElementById("select-right-team").innerHTML = '<option value=""> -- select an option -- </option>';

		for (var i = 0; i < teams.length; i++) {
			var currentTeam = teams[i];

			var template = document.getElementById("select-right-team").innerHTML += "<option value=" + currentTeam.id + ">" + currentTeam.name + "</option>";
		}
	},
	appendLeftTeamPlayerPosition: function (player, newGame) {
		console.log("Ja sam prosledjeni igrac u append funkciju: ", player);

		var positionInTeam = "left-team" + "-" + player.position;

		var template = '<div class="number">' + player.number +
		'</div><div class="name">' + player.firstName + " " + player.lastName + 
		'</div><div class="event-buttons"><div class="standard-position">' + player.position + '</div><div class="condition">' + getPlayerCondition(newGame, player.id) + '</div></div>' 

		document.getElementById(positionInTeam).innerHTML = template;
	},
	appendLeftTeamReservePlayerPosition: function (player, newGame) {
		var leftTeamReserve = document.getElementById("left-team-reserve");

		var template = '<div class="reserve-player-data"><div class="reserve-position">' + player.position + '</div><div class="reserve-number">' + player.number +
		'</div><div class="reserve-name">' + player.firstName + " " + player.lastName + '</div><div class="condition">' + getPlayerCondition(newGame, player.id) + '</div></div>' 

		leftTeamReserve.innerHTML = leftTeamReserve.innerHTML + template;
	},
	appendRightTeamPlayerPosition: function (player,newGame) {
		console.log("Ja sam prosledjeni igrac u append funkciju: ", player);

		var positionInTeam = "right-team" + "-" + player.position;

		var template = '<div class="number">' + player.number +
		'</div><div class="name">' + player.firstName + " " + player.lastName + 
		'</div><div class="event-buttons"><div class="standard-position">' + player.position + '</div><div class="condition">' + getPlayerCondition(newGame, player.id) + '</div></div>' 

		document.getElementById(positionInTeam).innerHTML = template;
	},
	appendRightTeamReservePlayerPosition: function (player, newGame) {
		var rightTeamReserve = document.getElementById("right-team-reserve");

		var template = '<div class="reserve-player-data"><div class="reserve-position">' + player.position + '</div><div class="reserve-number">' + player.number +
		'</div><div class="reserve-name">' + player.firstName + " " + player.lastName + '</div><div class="condition">' + getPlayerCondition(newGame, player.id) + '</div></div>' 

		rightTeamReserve.innerHTML = rightTeamReserve.innerHTML + template;
	},
	resetLeftTeam: function () {
		var template = `<img src="img/football-pitch.jpg">` +			
							`<div id="left-team-GK" onClick="changePlayer('GK', 'L')">GK</div>` +
							`<div id="left-team-RB" onClick="changePlayer('RB', 'L')">RB</div>` +
							`<div id="left-team-LB" onClick="changePlayer('LB', 'L')">LB</div>` +
							`<div id="left-team-RCB" onClick="changePlayer('RCB', 'L')">RCB</div>` +
							`<div id="left-team-LCB" onClick="changePlayer('LCB', 'L')">LCB</div>` +
							`<div id="left-team-RCM" onClick="changePlayer('RCM', 'L')">RCM</div>` +
							`<div id="left-team-LCM" onClick="changePlayer('LCM', 'L')">LCM</div>` +
							`<div id="left-team-RM" onClick="changePlayer('RM', 'L')">RM</div>` +
							`<div id="left-team-LM" onClick="changePlayer('LM', 'L')">LM</div>` +
							`<div id="left-team-RCF" onClick="changePlayer('RCF', 'L')">RCF</div>` +
							`<div id="left-team-LCF" onClick="changePlayer('LCF', 'L')">LCF</div>` +

							`<div id="left-team-reserve" onClick="changePlayer()"></div>`

		document.getElementById("left-team-standard").innerHTML = template;
	},
	resetRightTeam: function () {
		var template = `<img src="img/football-pitch.jpg">` +			
							`<div id="right-team-GK" onClick="changePlayer('GK', 'R')">GK</div>` +
							`<div id="right-team-RB" onClick="changePlayer('RB', 'R')">RB</div>` +
							`<div id="right-team-LB" onClick="changePlayer('LB', 'R')">LB</div>` +
							`<div id="right-team-RCB" onClick="changePlayer('RCB', 'R')">RCB</div>` +
							`<div id="right-team-LCB" onClick="changePlayer('LCB', 'R')">LCB</div>` +
				 			`<div id="right-team-RCM" onClick="changePlayer('RCM', 'R')">RCM</div>` +
							`<div id="right-team-LCM" onClick="changePlayer('LCM', 'R')">LCM</div>` +
							`<div id="right-team-RM" onClick="changePlayer('RM', 'R')">RM</div>` +
							`<div id="right-team-LM" onClick="changePlayer('LM', 'R')">LM</div>` +
							`<div id="right-team-RCF" onClick="changePlayer('RCF', 'R')">RCF</div>` +
							`<div id="right-team-LCF" onClick="changePlayer('LCF', 'R')">LCF</div>` +

							`<div id="right-team-reserve" onClick="changePlayer()"></div>`

		document.getElementById("right-team-standard").innerHTML = template;
	}
};








