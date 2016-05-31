//Helpers
//Select area range
function selectText(element) {
	var doc = document
		, text = element
		, range, selection
	;
	if (window.getSelection) {
		selection = window.getSelection();
		range = doc.createRange();
		range.selectNodeContents(text);
		selection.removeAllRanges();
		selection.addRange(range);
	}
}

var app = browser.extension.getBackgroundPage();

browser.windows.getCurrent(function(window) {
	//Capture
	app.API.snap(parseInt(window.id), function(data) {
		var container        = document.createElement("img");
			container.src    = data;
			container.width  = "1px";
			container.height = "1px";

		var copy = document.getElementById("tocopy");
			copy.appendChild(container);
		selectText(copy);
	});
});

document.addEventListener("keydown", function(e) {
	//CTRL + C (67) is pressed
	if (e.ctrlKey && e.keyCode === 67) {
		var cmd = document.getElementById("cmd").getElementsByTagName("img")[0];
			cmd.src = "../assets/ok.png";
	}
}, false);