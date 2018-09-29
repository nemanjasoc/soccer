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
	populateSelectTeamOptions: function (side, opositeTeamID) {
		var teamID = this.getSelectedTeamID(side);

		var teams = dbFunc.getTeams();
		
		var template = '<option value="0">  select an option  </option>';

		for (var i = 0; i < teams.length; i++) {
			var currentTeam = teams[i];

			if (currentTeam.id != opositeTeamID) {
				template += "<option value=" + currentTeam.id + ">" + currentTeam.name + "</option>";
			}
		}

		document.getElementById("select-" + side + "-team").innerHTML = template;

		this.setSelectedTeamID(side, teamID);
	},
	appendPlayerToPitch: function (player, newGame, side) {
		console.log('Ja sam prosledjeni igrac u append funkciju: ', player);

		var positionInTeam = document.getElementById(side + "-team-" + player.position);
		positionInTeam.setAttribute('data-id', player.id);

		var template = '<div class="number">' + player.number +
		'</div><div class="name">' + player.firstName + " " + player.lastName + 
		'</div><div class="event-buttons"><div class="standard-position">' + player.position + '</div><div class="condition">' + getPlayerCondition(newGame, player.id) + '</div></div>' 

		positionInTeam.innerHTML += template;
	},
	appendReservePlayerToBench: function (player, newGame, side) {
		var reserveTeam = document.getElementById(side + "-team-reserve");

		var template = `<div id="reserve-player-data" onClick="changePlayer(this, '${side}')" data-id="${player.id}"><div class="reserve-position">` + player.position + '</div><div class="reserve-number">' + player.number +
		'</div><div class="reserve-name">' + player.firstName + " " + player.lastName + '</div><div class="condition">' + getPlayerCondition(newGame, player.id) + '</div></div>' 

		reserveTeam.innerHTML += template;
	},
	resetTeam: function (side) {
		var template = `<img src="img/football_pitch.jpg">` +			
							`<div id="${side}-team-GK" onClick="changePlayer(this, '${side}')"></div>` +
							`<div id="${side}-team-RB" onClick="changePlayer(this, '${side}')"></div>` +
							`<div id="${side}-team-LB" onClick="changePlayer(this, '${side}')"></div>` +
							`<div id="${side}-team-RCB" onClick="changePlayer(this, '${side}')"></div>` +
							`<div id="${side}-team-LCB" onClick="changePlayer(this, '${side}')"></div>` +
							`<div id="${side}-team-RCM" onClick="changePlayer(this, '${side}')"></div>` +
							`<div id="${side}-team-LCM" onClick="changePlayer(this, '${side}')"></div>` +
							`<div id="${side}-team-RM" onClick="changePlayer(this, '${side}')"></div>` +
							`<div id="${side}-team-LM" onClick="changePlayer(this, '${side}')"></div>` +
							`<div id="${side}-team-RCF" onClick="changePlayer(this, '${side}')"></div>` +
							`<div id="${side}-team-LCF" onClick="changePlayer(this, '${side}')"></div>` +

							`<div id="${side}-team-reserve"></div>`

		document.getElementById(`${side}-team-standard`).innerHTML = template;
	},
	getSelectedTeamID: function (side, teamID) {
		var mojTim = document.getElementById(`select-${side}-team`);
		var selectedTeamID = 0;

		if (mojTim.options[mojTim.selectedIndex] !== undefined) {
			selectedTeamID = mojTim.options[mojTim.selectedIndex].value;
		} 
	
		return selectedTeamID;
	},
	setSelectedTeamID: function (side, teamID) {
		document.getElementById(`select-${side}-team`).value = teamID;
	}
};
