var languageObject = new Object;
for (var i = Object.keys(translationStrings).length - 1; i >= 0; i--) {
	var key = Object.keys(translationStrings)[i];
	var value = translationStrings[Object.keys(translationStrings)[i]];
	var keyArray = key.split(".");
	if (languageObject[keyArray[0]] == undefined) {
		languageObject[keyArray[0]] = new Object;
	}
	if (keyArray.length == 1) {
		languageObject[keyArray[0]]['__head'] = value;
	} else {
		if (languageObject[keyArray[0]][keyArray[1]] == undefined) {
			languageObject[keyArray[0]][keyArray[1]] = new Object;
		}
		if (keyArray.length == 2) {
			languageObject[keyArray[0]][keyArray[1]]['__head'] = value;
		} else {
			if (languageObject[keyArray[0]][keyArray[1]][keyArray[2]] == undefined) {
				languageObject[keyArray[0]][keyArray[1]][keyArray[2]] = new Object;
			}
			if (keyArray.length == 3) {
				languageObject[keyArray[0]][keyArray[1]][keyArray[2]]['__head'] = value;
			} else {
				if (languageObject[keyArray[0]][keyArray[1]][keyArray[2]][keyArray[3]] == undefined) {
					languageObject[keyArray[0]][keyArray[1]][keyArray[2]][keyArray[3]] = new Object;
				}
				if (keyArray.length == 4) {
					languageObject[keyArray[0]][keyArray[1]][keyArray[2]][keyArray[3]]['__head'] = value;
				} else {
					if (languageObject[keyArray[0]][keyArray[1]][keyArray[2]][keyArray[3]][keyArray[4]] == undefined) {
						languageObject[keyArray[0]][keyArray[1]][keyArray[2]][keyArray[3]][keyArray[4]] = new Object;
					}
					if (keyArray.length == 5) {
						languageObject[keyArray[0]][keyArray[1]][keyArray[2]][keyArray[3]][keyArray[4]]['__head'] = value;
					} else {
						if (languageObject[keyArray[0]][keyArray[1]][keyArray[2]][keyArray[3]][keyArray[4]][keyArray[5]] == undefined) {
							languageObject[keyArray[0]][keyArray[1]][keyArray[2]][keyArray[3]][keyArray[4]][keyArray[5]] = new Object;
						}
						if (keyArray.length == 6) {
							languageObject[keyArray[0]][keyArray[1]][keyArray[2]][keyArray[3]][keyArray[4]][keyArray[5]]['__head'] = value;
						} else {
							if (languageObject[keyArray[0]][keyArray[1]][keyArray[2]][keyArray[3]][keyArray[4]][keyArray[5]][keyArray[6]] == undefined) {
								languageObject[keyArray[0]][keyArray[1]][keyArray[2]][keyArray[3]][keyArray[4]][keyArray[5]][keyArray[6]] = new Object;
							}
							if (keyArray.length == 7) {
								languageObject[keyArray[0]][keyArray[1]][keyArray[2]][keyArray[3]][keyArray[4]][keyArray[5]][keyArray[6]]['__head'] = value;
							} else {
								console.log('An error occured :(');
							}
						}
					}
				}
			}
		}
	}
};
console.log('An object has been made.');