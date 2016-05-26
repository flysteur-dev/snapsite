/* 
	CONTENT SCRIPT HANDLER 
*/
var manifest = chrome.runtime.getManifest();
var config   = {
	__WEBUG_AVAILABLE: true,
	__WEBUG_REVISION : manifest.version,
	__WEBUG_PLATFORM : this.window.navigator.userAgent || undefined
};

//Send extension configuration to webpage
window.postMessage(config, "*");

//Catch snap event send through the webpage by the webug script
document.addEventListener("snap", function(data) {
	//Request screenshot from the main extension
	chrome.runtime.sendMessage(data, function(picture) {
		//Dispatch message to the webpage
		window.postMessage({
			snap:      picture,
			platform:  config.__WEBUG_PLATFORM
		}, "*");
	});
});

//Catch event send through popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
	if (msg.from === 'popup') {
		switch (msg.action) {
			case "clipboard":
				chrome.runtime.sendMessage({}, function(picture) {
					response({snap: picture});
				});
				break;
			default:
				console.error("Unknown popup action", msg);
				break;
		}
	}

	//Async
	return true;
});