/*

SNAPSITE LIBRARY
VERSION 0.1

*/

"use strict";

var SnapSite = function (callback, options, error) {

	//Library/Extension status
	var isStarted    = false;
	var hasExtension = false; 

	//Custom options
	options = options || {};	
	//Use your own html selector
	options.selector = options.selector || "feedback";
	//Start only if extension is installed
	options.withExtension = options.withExtension || false;

	//Listen response extension
	window.addEventListener('message', function(event) {
		if (event.source != window) return;

		//Check availability of the extension
		if (event.data.__SNAPSITE_AVAILABLE  &&
			event.data.__SNAPSITE_AVAILABLE == true) {
			hasExtension = true;
			start();
		}

		//Check if message is sent through the extension
		if (event.data.snap) {
			//Take snap
			callback(event.data);
		}
	}, false);

	//Private
	function start() {
		//Extension is required
		//Library won't be launched until browser client install extension
		if (options.withExtension === true && !hasExtension) return;

		if (isStarted === false) {
			//Ready to catch event
			var catcher = document.getElementById(options.selector);
				catcher.addEventListener('click', function() {

				if (hasExtension === true) {
					//Dispatch event
					//Will be catched by extension
					var event = new Event('snap');
					document.dispatchEvent(event);
				} else {
					//Extension is not ready, install extension first.
					error({"no-extension":"Please install extension first."});
				}
			}, false);

			//Library is started
			isStarted = true;
		}
	}
	start();
}