(function() {
	function timecode() {
		return function(s) {
			var seconds = Number.parseFloat(s);
		   if (Number.isNaN(s)) {
				return '-:--';
		  	}
			var wholeSeconds = Math.floor(s);
			var minutes = Math.floor(wholeSeconds / 60);
			var remainingSeconds = wholeSeconds % 60;

			var output = minutes + ':';

			if (remainingSeconds < 10) {
				output += '0';
			}

			output += remainingSeconds;
			return output;
		};
	}

	angular
		.module('blocTime')
		.filter('timecode', timecode);
})();
