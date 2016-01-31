(function($) {
	$.fn.refreshLanguage = function(currentLanguageCode) {
		if (!currentLanguageCode) {
			console.error('No language code sent');
		}
		$(this).each(function() {
			var translateCode = $(this).attr('lang');
			if (translateCode) {
				langStr = getLanguageString(translateCode,currentLanguageCode);
				langStr = langStr.replace('%n','\\n');
				
				if ($(this).prop('tagName') == 'INPUT') {
					$(this).attr('placeholder',langStr);
				} else {
					$(this).html(langStr);
				}
			}
		});
	};
}(jQuery));

function getLanguageString(queryString,currentLanguageCode) {
	if (typeof currentLanguageCode !== "string") {
		console.error('No language code sent');
		return '%%NO LANGUAGE SET%%'; /* DONT RETURN FALSE HERE YOULL HAVE A BAD DAY */
	}

	var strArray = queryString.split(".");
	var currentObject = lang[currentLanguageCode];
	var ret_val = queryString;

	for (var i = 0; i < strArray.length; i++) {
		arrayItem = strArray[i];

		if (currentObject && currentObject[arrayItem] !== undefined) {
			if (typeof currentObject[arrayItem] === "string") {
				ret_val = currentObject[arrayItem];
			} else {
				currentObject = currentObject[arrayItem];
				
				if (i + 1 == strArray.length) {
					if (typeof currentObject[""] === "string") {
						return currentObject[""];
					}
				}
			}
		}
	}
	
	return ret_val;
}