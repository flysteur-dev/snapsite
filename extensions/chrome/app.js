/*
	EXTENSION APP
*/

chrome.runtime.onMessage.addListener(
  function(request, sender, reponse) {
 	//Capture the visible part of the webpage
	chrome.tabs.captureVisibleTab(sender.tab.windowId, {format: 'png'}, function(data) {
		//Response to content script handler with picture as data url
		reponse(data);
	});

	//Async response
	return true;
  }
);