var documentReady = function(funcBody) {
	var st = setInterval( function () {
	    if (document.readyState === 'complete') {
			clearInterval(st);
			funcBody();
	    }
	}, 100);
}