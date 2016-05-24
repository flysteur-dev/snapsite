/* 
	CONTENT SCRIPT HANDLER 
*/

//Send availability message to webpage
window.postMessage({__WEBUG__AVAILABLE: true}, "*");

//Catch snap event send through the webpage by the webug script
document.addEventListener("snap", function(data) {
	//Request screenshot from the main extension
	chrome.runtime.sendMessage(data, function(picture) {
		//Dispatch message to the webpage
		window.postMessage({snap: picture}, "*");
	});
});