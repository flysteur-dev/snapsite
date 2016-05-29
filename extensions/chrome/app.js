/*
	EXTENSION APP
*/

var API = {
	snap: function(windowId, callback) {
		//Capture the visible part of the webpage
		chrome.tabs.captureVisibleTab(windowId, {format: 'png'}, function(data) {
			//Callback with picture as data url
			callback(data);
		});
	}
}

/*
   HANDLERS
*/

//Catch message from content script
chrome.runtime.onMessage.addListener(
	function(request, sender, callback) {

		//Response to content script handler with picture as data url
		API.snap(sender.tab.windowId, function(data) {
			callback(data);
		});

		//Async
		return true;
	}
);

//Catch browser action click
chrome.browserAction.onClicked.addListener(
	function(sender) {
		//TODO: Customize output (clipboard, download) with settings
		chrome.browserAction.setPopup({
			popup: "actions/clipboard.html?tab=" + sender.windowId
		});
	}
);