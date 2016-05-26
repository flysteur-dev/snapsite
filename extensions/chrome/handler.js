/* 
	CONTENT SCRIPT HANDLER 
*/
var manifest = chrome.runtime.getManifest();

//Send extension description to webpage
window.postMessage({
	__WEBUG_AVAILABLE: true,
	__WEBUG_REVISION : manifest.version,
	__WEBUG_PLATFORM : this.window.navigator.userAgent || undefined
}, "*");

//Catch snap event send through the webpage by the webug script
document.addEventListener("snap", function(data) {
	//Request screenshot from the main extension
	chrome.runtime.sendMessage(data, function(picture) {
		//Dispatch message to the webpage
		window.postMessage({snap: picture}, "*");
	});
});

//Catch event send through popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
	console.log("requested action from popup", msg);
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