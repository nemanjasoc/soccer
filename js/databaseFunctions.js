var dbFunc = {
	getPlayers: function () {
		var helper = localStorage.getItem("players");
		var players;

		if (helper) {
			players = JSON.parse(helper);
		} else {
			players = [];
		}

		return players;
	},
	getTeams: function () {
		var helper = localStorage.getItem("teams");
		var teams;

		if (helper) {
			teams = JSON.parse(helper);
		} else {
			teams = [];
		}

		return teams;
	},
	getManagers: function () {
		var helper = localStorage.getItem("managers");
		var managers;

		if (helper) {
			managers = JSON.parse(helper);
		} else {
			managers = [];
		}

		return managers;
	},
	getPositions: function () {
		var helper = localStorage.getItem("positions");
		var positions;

		if (helper) {
			positions = JSON.parse(helper);
		} else {
			positions = [];
		}

		return positions;
	},
	getItems: function (itemName) {
		var helper = localStorage.getItem(itemName);
		var items;

		if (helper) {
			items = JSON.parse(helper);
		} else {
			items = [];
		}

		return items
	},
	generateID: function (item) {
		var helper = localStorage.getItem(item);
		var items; 

		if (helper) {
			items = JSON.parse(helper);
		} else {
			items = [];
		}

		var id = 1;
		var max = 0;

		for (var i = 0; i < items.length; i++) {
			var currentItem = items[i];

			if (currentItem.id > max) {
				max = currentItem.id;
			}
		}

		return max + 1;
	},
	saveToLocalStorage: function (arr, item) {
		console.log("Save to local storage!");
		localStorage.setItem(item, JSON.stringify(arr));
	},
	setPlayersForm: function (playerID, currentForm) {
		var players = this.getPlayers();
		var newPlayers = [];

		for (var i = 0; i < players.length; i++) {
			var currentPlayer = players[i];

			if (currentPlayer.id == playerID) {
				currentPlayer.form = currentForm; 
			}
			newPlayers.push(currentPlayer);
		}

		this.saveToLocalStorage(newPlayers, 'players');
	},
	getPlayersForm: function (playerID) {
		var players = this.getPlayers();

		for (var i = 0; i < players.length; i++) {
			var currentPlayer = players[i];

			if (currentPlayer.id == playerID) {
				return currentPlayer.form;
			}
		}
	},
	getPlayerByID: function (playerID) {
		var players = this.getPlayers();

		for (var i = 0; i < players.length; i++) {
			var currentPlayer = players[i];

			if (currentPlayer.id == playerID) {
				return currentPlayer;
			}
		}
	},
	getManagerByID: function (managerId) {
		var managers = this.getManagers();

		for (var i = 0; i < managers.length; i++) {
			var currentManager = managers[i]; 

			if (currentManager.id == managerId) {
				return currentManager;
			}
		}
	},
	getTeamByID: function (teamId) {
		var teams = this.getTeams();

		for (var i = 0; i < teams.length; i++) {
			var currentTeam = teams[i];

			if (currentTeam.id == teamId) {
				return currentTeam;
			}
		}
	},
	addManagers: function (manager) {
		var managers = this.getManagers();
		
		managers.push(manager);
		this.saveToLocalStorage(managers, 'managers');
	},
	deleteManager: function (managerId) {
		var managers = this.getManagers();
		var newManagers = [];

		for (var i = 0; i < managers.length; i++) {
			var currentManager = managers[i];

			if (currentManager.id != managerId) {
				newManagers.push(currentManager);
			}
		}

		this.resetTeamManagerByManagerID(managerId);
		this.saveToLocalStorage(newManagers, 'managers');
	},
	updateManager: function (manager) {
		var managers = this.getManagers();
		var newManagers = [];

		for (var i = 0; i < managers.length; i++) {
			var currentManager = managers[i];

			if (currentManager.id == manager.id) {
				newManagers.push(manager);
			} else {
				newManagers.push(currentManager);
			}
		}
		
		this.saveToLocalStorage(newManagers, "managers");
	},
	addTeams: function (team) {
		var teams = this.getTeams();

		teams.push(team);
		this.saveToLocalStorage(teams, "teams");
	},
	deleteTeam: function (teamId) {
		var teams = this.getTeams();
		var newTeams = [];

		for (var i = 0; i < teams.length; i++) {
			var currentTeam = teams[i];

			if (currentTeam.id != teamId) {
				newTeams.push(currentTeam);
			}
		}

		this.resetPlayerTeamByTeamID(teamId);
		this.saveToLocalStorage(newTeams, "teams");
	}, 
	updateTeam: function (team) {
		var teams = this.getTeams();
		var newTeams = [];

		for (var i = 0; i < teams.length; i++) {
			var currentTeam = teams[i];

			if (currentTeam.id == team.id) {
				newTeams.push(team);
			} else {
				newTeams.push(currentTeam);
			}
		}

		this.saveToLocalStorage(newTeams, "teams");
	},
	resetTeamManagerByManagerID: function (managerId) {
		console.log("prosledjeno u resetTeamManagerByManagerID: ", managerId)
		var teams = this.getTeams();
		var newTeams = [];

		for (var i = 0; i < teams.length; i++) {
			var currentTeam = teams[i];
			console.log("currentTeam u resetTeamManagerByManagerID: ", currentTeam)

			if (currentTeam.managerID == managerId) {
				currentTeam.managerID = undefined;
				console.log("currentTeam.managerID: ", currentTeam.managerID)	
			}
			newTeams.push(currentTeam);
			console.log("newTeams u resetTeamManagerByManagerID: ", newTeams)
		}

		this.saveToLocalStorage(newTeams, "teams"); 
	},
	addPlayers: function (player) {
		var players = this.getPlayers();

		players.push(player);
		this.saveToLocalStorage(players, "players");
	},
	deletePlayer: function (playerId) {
		var players = this.getPlayers();
		var newPlayers = [];

		for (var i = 0; i < players.length; i++) {
			var currentPlayer = players[i];

			if (currentPlayer.id != playerId) {
				newPlayers.push(currentPlayer);
			}
		}

		this.saveToLocalStorage(newPlayers, "players");
	},
	updatePlayer: function (player) {
		var players = this.getPlayers();
		var newPlayers = [];

		for (var i = 0; i < players.length; i++) {
			var currentPlayer = players[i];

			if (currentPlayer.id == player.id) {
				newPlayers.push(player);
			} else {
				newPlayers.push(currentPlayer);
			}
		}

		this.saveToLocalStorage(newPlayers, "players");
	},
	resetPlayerTeamByTeamID: function (teamId) {
		console.log("Prosledjeno u resetPlayerTeamByTeamID: ", teamId);
		var players = this.getPlayers();
		var newPlayers = [];

		for (var i = 0; i < players.length; i++) {
			var currentPlayer = players[i];
			console.log("currentPlayer u resetPlayerTeamByTeamID: ", currentPlayer);

			if (currentPlayer.team == teamId) {
				currentPlayer.team = undefined;
				console.log("currentPlayer.team: ", currentPlayer.team);
			} 
			newPlayers.push(currentPlayer);
			console.log("newPlayers u resetPlayerTeamByTeamID: ", newPlayers);
		}

		this.saveToLocalStorage(newPlayers, "players");
	}
};
