var errorsPrinted = {};
var errorString = '';

(function($) {
	$.fn.refreshLanguage = function(currentLanguageCode) {
		if (!currentLanguageCode) {
			currentLanguageCode = localStorage.getItem('langCode');
		}
		$(this).each(function() {
			var translateCode = $(this).attr('lang');
			if (translateCode) {
				langStr = getLanguageString(translateCode,currentLanguageCode);
				if ($(this).prop('tagName') == 'INPUT') {
					$(this).attr('placeholder',langStr);
				} else {
					$(this).html(langStr);
				}
			}
		});
	};
}(jQuery));

function getLanguageString(string,currentLanguageCode,enTest,do_encode) {
	if (currentLanguageCode == undefined) {
		return 'language_not_set'; /* DONT RETURN FALSE HERE YOULL HAVE A BAD DAY */
	}
	var oldLanguageCode = '';
	if (enTest) {
		oldLanguageCode = currentLanguageCode;
		currentLanguageCode = 'en_US';
	}
	var strArray = string.split(".");
	var curobj = lang[currentLanguageCode];
	for (var i = 0; i < strArray.length; i++) {
		if (curobj[strArray[i]] != undefined) {
			curobj = curobj[strArray[i]];
			if (curobj === undefined) {
				if (currentLanguageCode != 'en_US') {
					return getLanguageString(string,currentLanguageCode,true);
				}
				else {
					return string;
				}
			}
			if (typeof curobj == 'string') {
				var ret_val;
				/*ENDCODE*/
				if (!do_encode) {
					ret_val = curobj;
				} else {
					ret_val = '';
					for (var x = 0; x < string.length; x++) { 
						if (string.codePointAt(x) > 127) {
							ret_val += '&#' + string.codePointAt(x) + ';';
						} else {
							ret_val += string.charAt(x);
						}
					}
				}
				/*END ENCODE*/
				/*LOG NEEDED TRANSLATIONS*/
				if (enTest) {
					if (errorsPrinted[oldLanguageCode] == undefined || errorsPrinted[oldLanguageCode][string] == undefined) {
						console.log('Translation Needed! :: ' + string + ' :: ' + ret_val);
						errorString += string + ' :: ' + ret_val + '<br>';
						if (errorsPrinted[oldLanguageCode] == undefined) {
							errorsPrinted[oldLanguageCode] = {};
						}
						errorsPrinted[oldLanguageCode][string] = true;
					}
				}
				/*END LOG NEEDED TRANSLATIONS*/
				return ret_val;
			}
		}
	}
	if (!enTest) {
		return getLanguageString(string,currentLanguageCode,true,do_encode);
	} else {
		return string;
	}
}