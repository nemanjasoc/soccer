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
	deleteManager: function (managerId) {
		var managers = this.getManagers();
		var newManagers = [];

		for (var i = 0; i < managers.length; i++) {
			var currentManager = managers[i];

			if (currentManager.id != managerId) {
				newManagers.push(currentManager);
			}
		}
		this.saveToLocalStorage(newManagers, 'managers');
	},
	addManagers: function (manager) {
		var managers = this.getManagers();
		
		managers.push(manager);
		this.saveToLocalStorage(managers, 'managers');
	},
	updateManager: function (manager) {
		console.log("Prosledjeni manager u update: ", manager);
		var managers = this.getManagers();
		var newManagers = [];

		for (var i = 0; i < managers.length; i++) {
			var currentManager = managers[i];
			console.log("currentManager u update: ", currentManager);

			if (currentManager.id == manager.id) {
				newManagers.push(manager);
				console.log("newManagers u if: ", newManagers);
			} else {
				newManagers.push(currentManager);
				console.log("newManagers u else: ", newManagers);
			}
		}
		
		this.saveToLocalStorage(newManagers, "managers");
	}
};
