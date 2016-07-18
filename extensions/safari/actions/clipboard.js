//Helpers
//Select area range
function selectText(element) {
	var doc    = document
		, text = element
		, range, selection
	;
	if (window.getSelection) {
		selection = window.getSelection();
		range     = doc.createRange();
		range.selectNodeContents(text);
		selection.removeAllRanges();
		selection.addRange(range);
	}
}

//Popover opened
safari.application.addEventListener("command", function(evt) {
	//Should match popover event
	if (evt.command == "action-clipboard") {
		//Capture
		safari.extension.globalPage.contentWindow.API.snap(function(data) {
			var container        = document.createElement("img");
				container.src    = data;
				container.width  = "1px";
				container.height = "1px";

			var copy = document.getElementById("tocopy");
				copy.appendChild(container);
			selectText(copy);
		});

		//Show popover
		safari.self.toolbarItem.showPopover();
	}	
});

document.addEventListener("keydown", function(e) {
	//CMD + C (67) is pressed
	if (e.metaKey && e.keyCode === 67) {
		var cmd = document.getElementById("cmd").getElementsByTagName("img")[0];
			cmd.src = "../assets/ok.png";
	}
}, false);

//Popover closed
window.onblur = function() {
	//Reset to initial state
	window.location.reload();
}

//Get popover associated
safari.self.toolbarItem = safari.extension.toolbarItems.filter(function (ti) {
	return ti.popover == safari.self;
})[0];