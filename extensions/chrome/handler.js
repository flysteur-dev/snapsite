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