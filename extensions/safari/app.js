/*
	EXTENSION APP
*/

var API = {
	snap: function(callback) {
		//Get current active tab
		var tab = safari.application.activeBrowserWindow.activeTab;
		//Capture the visible part of the webpage
		tab.visibleContentsAsDataURL(function(data) {
			//Callback with picture as data url
			callback(data);
		});
	}
}

/*
   HANDLERS
*/

//Catch message from content script
safari.application.addEventListener("message", function(data) {
	if (data.message !== "requestsnap") return;
	
	//Response to content script handler with picture as data url
	API.snap(function(picture) {
		data.target.page.dispatchMessage("snapanswer", picture);
	});
}, false);