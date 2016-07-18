/* 
	CONTENT SCRIPT HANDLER 
*/

var config   = {
	__SNAPSITE_AVAILABLE: true,
	__SNAPSITE_REVISION : "0.1",
	__SNAPSITE_PLATFORM : this.window.navigator.userAgent || undefined
};

//Send extension configuration to webpage
window.postMessage(config, "*");

//Catch snap event send through the webpage by the snapsite library
document.addEventListener("snap", function() {
	//Request screenshot from the main extension
	safari.self.tab.dispatchMessage("snap", "requestsnap");
});

//Catch snap response from global script
safari.self.addEventListener("message", function(picture) {
	if (picture.name !== "snapanswer") return;

	//Dispatch message to the webpage
	window.postMessage({
		snap:      picture.message,
		platform:  config.__SNAPSITE_PLATFORM
	}, "*");
}, false);