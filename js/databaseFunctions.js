var dbFunc = {
	getPlayers: function () {
		var helper = localStorage.getItem("players");
		var players;

		if (helper) {
			players = JSON.parse(helper);
		} else {
			players = [];

			//alert("There are no players at the database, you should create some!");
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

			//alert("There are no teams at the database, you should create some!");
		}

		return teams;
	},
	getManagers: function () {
		var helper = localStorage.getItem("managers");
		var managers;

		var helper = localStorage.getItem("managers");

		if (helper) {
			managers = JSON.parse(helper);
		} else {
			managers = [];

			//alert("There are no managers at the database, you should create some!");
		}

		return managers;
	},
	getItems: function (itemName) {
		var helper = localStorage.getItem(itemName);
		var items;

		var helper = localStorage.getItem(itemName);

		if (helper) {
			items = JSON.parse(helper);
		} else {
			items = [];

			//alert("There are no " + itemName + " at the database, you should create some!");
		}

		return items;
	}
};