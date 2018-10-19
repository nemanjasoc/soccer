var tpFunc = {
	populateManagerOptions: function () {
		var managers = dbFunc.getManagers();

		document.getElementById("choose-manager").innerHTML = '';

		for (var i = 0; i < managers.length; i++) {
			var currentManager = managers[i];
			document.getElementById("choose-manager").innerHTML += "<option value=" + currentManager.id + ">" + currentManager.firstName +  " " + currentManager.lastName + "</option>";
		}
	},
	populateEditManagerOptions: function () {
		var managers = dbFunc.getManagers();

		document.getElementById("choose-manager-edit").innerHTML = '';

		for (var i = 0; i < managers.length; i++) {
			var currentManager = managers[i];
			document.getElementById("choose-manager-edit").innerHTML += "<option value=" + currentManager.id + ">" + currentManager.firstName +  " " + currentManager.lastName + "</option>";
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
	populatePositionEditOptions: function () {
		var positions = dbFunc.getPositions();

		document.getElementById("position-edit").innerHTML = '';

		for (var i = 0; i < positions.length; i++) {
			var currentPosition = positions[i];
			document.getElementById("position-edit").innerHTML += "<option value=" + currentPosition.position + ">" + currentPosition.position + "</option>";
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
	populateTeamEditOptions: function () {
		var teams = dbFunc.getTeams();

		document.getElementById("choose-team-edit").innerHTML = '';

		for (var i = 0; i < teams.length; i++) {
			var currentTeam = teams[i];
			document.getElementById("choose-team-edit").innerHTML += "<option value=" + currentTeam.id + ">" + currentTeam.name + "</option>";
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

							`<div id="${side}-team-reserve"></div>` +

							`<div id="${side}-team-formation"></div>`

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
	},
	getDataManagers: function () {
		resetGetDataTeams();
		resetGetDataPlayers();

		var managers = dbFunc.getManagers();

		document.getElementById("caption-manager").innerHTML = "<div class='managers'>Managers</div><div id='create-manager' onClick='showManagerForm()'>Create manager</div>"

		document.getElementById("table-manager").innerHTML = "<tr><th>ID</th><th>Name</th><th>Actions</th></tr>";

		for (var i = 0; i < managers.length; i++) {
			var manager = managers[i];

			document.getElementById("table-manager").innerHTML += "<tr><td>" + manager.id + "</td><td>" + manager.firstName + " " + manager.lastName + "</td>" + 
			`<td><div class='action-buttons'><div id='edit-button' onClick='editManager("${manager.id}")'>Edit</div><div id='delete-button' onClick='deleteManager("${manager.id}")'>Delete</div></div></td></tr>`;  
		}
	},
	getDataTeams: function () {
		resetGetDataManagers();
		resetGetDataPlayers();

		var teams = dbFunc.getTeams();

		document.getElementById("caption-team").innerHTML = "<div class='teams'>Teams</div><div id='create-team' onClick='showTeamForm()'>Create team</div>"

		document.getElementById("table-team").innerHTML = "<tr><th>ID</th><th>Name</th><th>Manager</th><th>Actions</th></tr>";

		for (var i = 0; i < teams.length; i++) {
			var team = teams[i];
			var manager = dbFunc.getManagerByID(team.managerID);
			var managerName;

			if (manager) {
				managerName = manager.firstName + " " + manager.lastName;
			} else {
				managerName = "";
			}

			document.getElementById("table-team").innerHTML += "<tr><td>" + team.id + "</td><td>" + team.name + "</td><td>" + managerName + "</td>" + 
			`<td><div class='action-buttons'><div id='edit-button' onClick='editTeam("${team.id}")'>Edit</div><div id='delete-button' onClick='deleteTeam("${team.id}")'>Delete</div></div></td></tr>`;  
		}
	},
	getDataPlayers: function () {
		resetGetDataManagers();
		resetGetDataTeams();

		var players = dbFunc.getPlayers();

		document.getElementById("caption-player").innerHTML = "<div class='players'>Players</div><div id='create-player' onClick='showPlayerForm()'>Create player</div>"

		document.getElementById("table-player").innerHTML = "<tr><th>ID</th><th>Name</th><th>Number</th><th>Team</th><th>Reserve</th><th>Position</th><th>Actions</th></tr>";

		for (var i = 0; i < players.length; i++) {
			var player = players[i];
			var team = dbFunc.getTeamByID(player.team);
			var playerTeam;

			if (player.reserve == true) {
				player.reserve = "Yes";
			} else {
				player.reserve = "No";
			}

			if (team) {
				playerTeam = team.name
			} else {
				playerTeam = "";
			}

			document.getElementById("table-player").innerHTML += "<tr><td>" + player.id + "</td><td>" + player.firstName + " " + player.lastName + "</td><td>" + player.number + "</td><td>" + playerTeam + "</td><td>" + player.reserve + "</td><td>" + player.originalPosition + "</td>" + 
			`<td><div class='action-buttons'><div id='edit-button' onClick='editPlayer("${player.id}")'>Edit</div><div id='delete-button' onClick='deletePlayer("${player.id}")'>Delete</div></div></td></tr>`;  
		}
	}
};
