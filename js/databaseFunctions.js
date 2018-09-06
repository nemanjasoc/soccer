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

function generateID(table) {
	console.log("Table: ", table);

	var helper = localStorage.getItem(table);
	var tables; 

	if (helper) {
		tables = JSON.parse(helper);
	} else {
		tables = [];
	}

	var id = 1;
	var max = 0;

	for (var i = 0; i < tables.length; i++) {
		var currentTable = tables[i];
		console.log("Ja sam trenutni id u nizu: ", currentTable.id);

		if (currentTable.id > max) {
			max = currentTable.id;
			console.log("MAX: ", max);
		}
	}

	return max + 1;
}

function saveToLocalStorage(arr, table) {
	console.log("Save to local storage!");
	localStorage.setItem(table, JSON.stringify(arr));
}
