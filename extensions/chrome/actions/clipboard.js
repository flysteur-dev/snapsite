//Helpers
//Select area range
function selectText(element) {
	var doc = document
		, text = element
		, range, selection
	;
	if (window.getSelection) {
		selection = window.getSelection();
		range = doc.createRange();
		range.selectNodeContents(text);
		selection.removeAllRanges();
		selection.addRange(range);
	}
}

chrome.tabs.query({
	active: true,
	currentWindow: true
}, function (tabs) {
	chrome.tabs.sendMessage(
		tabs[0].id,
		{from: 'popup', action: 'clipboard'},
		function(data) {
			var container        = document.createElement("img");
				container.src    = data.snap;
				container.width  = "1px";
				container.height = "1px";

			var copy = document.getElementById("tocopy");
				copy.appendChild(container);
			selectText(copy);
		}
	);
});