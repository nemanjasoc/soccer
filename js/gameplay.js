window.onload = function(){
	choseLowerTeam();
	choseUpperTeam();
}

function choseLowerTeam() {
	var helper = localStorage.getItem("teams");

	if (helper) {
		teams = JSON.parse(helper);
	} else {
		teams = [];

		alert("There have not teams at the base, you should create teams!");
	}

	document.getElementById("selectLowerTeam").innerHTML = '';

    for (var i = 0; i < teams.length; i++) {
    	var currentTeam = teams[i];
     	var template = document.getElementById("selectLowerTeam").innerHTML += "<option value=" + currentTeam.id + ">" + currentTeam.name + "</option>";
    }
}

function choseUpperTeam() {
	var helper = localStorage.getItem("teams");

	if (helper) {
		teams = JSON.parse(helper);
	} else {
		teams = [];

		alert("There have not teams at the base, you should create teams!");
	}

	document.getElementById("selectUpperTeam").innerHTML = '';

    for (var i = 0; i < teams.length; i++) {
    	var currentTeam = teams[i];

     	var template = document.getElementById("selectUpperTeam").innerHTML += "<option value=" + currentTeam.id + ">" + currentTeam.name + "</option>";
    }
}

function selectLowerTeam() {
    var mojTim = document.getElementById("selectLowerTeam");
    var teamID =  mojTim.options[mojTim.selectedIndex].value;
    console.log("!!!: ", teamID);
    displayLowerPlayers(teamID);
};

function selectUpperTeam() {
    var mojTim = document.getElementById("selectUpperTeam");
    var teamID =  mojTim.options[mojTim.selectedIndex].value;
    console.log("!!!: ", teamID);
    displayUpperPlayers(teamID);
};