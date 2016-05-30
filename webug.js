/*

SNAPSITE LIBRARY
VERSION 0.1

*/

"use strict";

var Webug = function (callback, options) {

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
		if (options.withExtension === true && !hasExtension) {
			return;
		}

		if (isStarted === false) {
			//Add trigger
			var trigger = document.createElement('div');
			trigger.setAttribute("id", options.selector);

			var  button = document.createElement("img");
			button.src  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAABJklEQVR4Ae3VPYrbUBRA4a+RJ1VSJswvGG8mhYsswRhtxT/YmNEuhtEiAmpcJjBJOQsYyyBMsF0qXcjDjNF7pAnJOd0tTqN3r/yLfPCsFfrsvUje+ao91RdvRfBGpX3Fzy6c4UKh0Ua6U+gJKLSJFgKa5FAjoE23W6hRWpp4UKeHNnIZgMzIS0rom1shXHqKDW3cgoHC2tq9PriyiQvl4JPjr8nBEIxjQo0MA8dguneHTN09VL7ySBfgsXtoCdYnoQpMu4cmZ0Oz7qEHcH8SmoOye6iWoe8QTH+4QWYb8/lHYGj/W+YjyOPe0YtLcGehUpm7Adfq2BV5coWQa9/TlnYcLG2uTj8jtUdTM6VtxBlJNGCXnGn+1PFfCegl/Y4aKz1/Lf/5CShXgVKz4A8DAAAAAElFTkSuQmCC";
			button.style.cssText = "position:absolute;bottom:0;right:0;width:30px;height:30px;z-index:999;background:#DEDEDE;border-left:1px solid grey;border-top:1px solid grey";
			trigger.appendChild(button);

			//Insert to the webpage
			document.body.appendChild(trigger);

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
					fallback();
				}
			}, false);

			//Library is started
			isStarted = true;
		}
		
		function fallback() {
			console.warn("fallback, install extension first!");
		}
	}
	
	start();
}