var utFunc = {
	showSnack: function (id, message) {
		var element = document.getElementById(id);

		element.className = "show";
		element.innerHTML = message;
		setTimeout(function(){ element.className = element.className.replace("show", ""); }, 6000);
	}
};
