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

		return items;
	}
};