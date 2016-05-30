/* 
	CONTENT SCRIPT HANDLER 
*/

var manifest = chrome.runtime.getManifest();
var config   = {
	__SNAPSITE_AVAILABLE: true,
	__SNAPSITE_REVISION : manifest.version,
	__SNAPSITE_PLATFORM : this.window.navigator.userAgent || undefined
};

//Send extension configuration to webpage
window.postMessage(config, "*");

//Catch snap event send through the webpage by the snapsite library
document.addEventListener("snap", function(data) {
	//Request screenshot from the main extension
	chrome.runtime.sendMessage(data, function(picture) {
		//Dispatch message to the webpage
		window.postMessage({
			snap:      picture,
			platform:  config.__SNAPSITE_PLATFORM
		}, "*");
	});
});