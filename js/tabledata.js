function backToHomepage() {
	window.location.href = './index.html';
}

function getDataManagers() {
	var managers = dbFunc.getManagers();

	document.getElementById("table-manager").innerHTML = "Managers<tr><th>ID</th><th>Name</th><th>Actions</th></tr>";

	for (var i = 0; i < managers.length; i++) {
		var manager = managers[i];

	document.getElementById("table-manager").innerHTML += "<tr><td>" + manager.id + "</td><td>" + manager.name + "</td>" + 
	"<td><div class='action-buttons'><div id='edit-button'>Edit</div><div id='delete-button'>Delete</div></div></td></tr>";  
	}
}
