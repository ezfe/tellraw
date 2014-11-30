var chars = [1,2,3,4,5,6,7,8,9,0,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var matchLength = 0;
var version = 2;
var tos_version = 1;
var notice = {
	"id": 3,
	"message": "Some formats have changed. %e is no longer a valid marker, use %s now.\n\nIt is recommended you reset to the templates."
};
var jobject = [];
var selectedHover;
var selectedClick;
var selectedHover_edit;
var selectedClick_edit;
var downButton;
var upButton;
var extraTextFormat = 'raw';
var lang = {"status":"init"};
var translationStrings;
var currentEdit;
var hasAlertedTranslationObjects = false;
var webLangRelations;
var editing = false;
var issueLog = [];

function reportAnIssue() {
	if (confirm("Is your output being incorrectly formed, such as having too many \\ characters?\n\nNote: Cancel means no, OK means yes, etc, depending on your browser.")) {
		localStorage.setItem('jtemplate','tellraw');
		refreshOutput();
		alert('Please check if you are still experiencing the issue. If you are, you may file an issue report as you were attempting to do.');
		return;
	}
	var title = "";
	var body = "";
	if (issueLog.length > 0) {
		title = "Issue Report - " + issueLog[issueLog.length - 1].name;
		body = 'Please enter steps to reproduce the issue below, as well as any other information you want to include%0A%0A%0A%0A%0A%0A Provided Data - Do not modify below this line%0A%0A```%0A' + JSON.stringify(issueLog) + '%0A```';
	}
	var win = window.open('http://github.com/ezfe/tellraw/issues/new?body=' + body + '&title=' + title, '_blank');
	win.focus();
}
function logIssue(name,data,solution) {
	issueLog.push({"name":name,"data":data});
	$('#issue-info-span').html('<small><br>' + name + ' - <a href="#" onclick="alert(JSON.stringify(issueLog[issueLog.length - 1].data))">Issue Data</a></small>');
}
function showView(viewname,suppressAnimation,hideOthers,hideMenubar) {
	var toHide = $('.view-container').not('.view-container[view="' + viewname + '"]');
	if (!hideMenubar) {
		toHide = toHide.not('.view-container[view="pageheader"]');
	}
	var toShow = $('.view-container[view="' + viewname + '"]');
	if (!hideMenubar) {
		$($('.view-container[view="pageheader"]')).show();
	}
	if (localStorage.getItem('jtosaccept') == undefined || localStorage.getItem('jtosaccept') != tos_version && viewname != 'tos' && viewname != 'tos-header') {
		toHide = toHide.not('.view-container[view="tos-header"]');
	}
	if (hideOthers === false) {
		toHide = $('');
	}
	if (suppressAnimation) {
		toHide.hide();
		toShow.show();
	} else {
		toHide.slideUp();
		toShow.slideDown();
	}
	if (viewname != "loading" && viewname != "pageheader" && viewname != "tos-header" && viewname != "issue") {
		localStorage.setItem('jview',JSON.stringify({"viewname":viewname,"suppressAnimation":suppressAnimation,"hideOthers":hideOthers,"hideMenubar":hideMenubar}));
	}
	if (toShow.length == 0) {
		logIssue('Missing View',viewname);
		showView('issue');
	}
}
function getURL(url){
	return $.ajax({
		type: "GET",
		url: url,
		cache: false,
		async: false
	}).responseText;
}
function donateAlert(state,hasDonated) {
	if (state) {
		localStorage.setItem('donateAlertShown',true)
		showView('donate')
	} else {
		showView('tellraw')
	}
}
function verify_jobject_format(jdata) {
	if (get_type(jdata) != "[object Array]") {
		logIssue('Stored Variable Corrupted',jdata);
		showView('issue');
	}
	if (jdata.text != '' && get_type(jdata) != "[object Array]") {
		jdata.unshift(new Object());
		jdata[0].text = jdata.text;
		jdata[0].color = jdata.color;
		delete(jdata.color);
		jdata[0].bold = jdata.bold;
		delete(jdata.bold);
		jdata[0].italic = jdata.italic;
		delete(jdata.italic);
		jdata[0].underlined = jdata.underlined;
		delete(jdata.underline);
		jdata[0].strikethrough = jdata.strikethrough;
		delete(jdata.strikethrough);
		jdata[0].obfuscated = jdata.obfuscated;
		delete(jdata.obfuscated);
		jdata.text = '';
	}

	for (var i = 0; i < jdata.length; i++) {
		if (jdata[i].hoverEvent != undefined) {
			if (jdata[i].hoverEvent.action == "show_text") {
				if (typeof jdata[i].hoverEvent.value == "object") {
					if (jdata[i].hoverEvent.value.text != "") {
						jdata[i].hoverEvent.value = {"text":"", "extra":[jdata[i].hoverEvent.value]};
					}
				} else if (typeof jdata[i].hoverEvent.value == "string") {
					jdata[i].hoverEvent.value = {"text":"", "extra":[{"text":jdata[i].hoverEvent.value}]};
				}
			}
		}
	}

	return jdata;
}

function formatJObjectList(data) {
	if (data.length == 0) {
		return [];
	}
	var ret_val = [];
	var currentDataToPlug = {"text":"","extra":[]};
	for (var i = 0; i < data.length; i++) {
		if (data[i].NEW_ITERATE_FLAG) {
			ret_val.push(JSON.stringify(currentDataToPlug));
			currentDataToPlug = {"text":"","extra":[]};
		} else {
			currentDataToPlug.extra.push(data[i]);
		}
	}
	if (!data[data.length - 1].NEW_ITERATE_FLAG) {
		ret_val.push(JSON.stringify(currentDataToPlug));
	}
	return ret_val;
}

function closeExport() {
	$('#exporter').remove();
}
function isScrolledIntoView(elem) {
	elem = '#' + elem;
	var docViewTop = $(window).scrollTop();
	var docViewBottom = docViewTop + $(window).height();

	var elemTop = $(elem).offset().top;
	var elemBottom = elemTop + $(elem).height();

	return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
function goToByScroll(id){
	if (!isScrolledIntoView(id)) {
		$('html,body').animate({scrollTop: $("#"+id).offset().top},'slow');
	}
}

var templates = 
{
	"tellraw": {
		"command": "/tellraw @a %s",
		"version": "1.7",
		"formatType": "standardjson"
	},
	"execute_tellraw": {
		"command": "/execute @a ~ ~ ~ tellraw @p %s",
		"version": "1.8",
		"formatType": "standardjson"
	},
	"title": {
		"command": "/title @a title %s",
		"version": "1.8",
		"formatType": "standardjson"
	},
	"subtitle": {
		"command": "/title @a subtitle %s",
		"version": "1.8",
		"formatType": "standardjson"
	},
	"sign_item": {
		"command": "/give @a sign 1 0 {BlockEntityTag:{%s,id:\"Sign\"}}",
		"version": "1.8",
		"formatType": "signset"
	},
	"sign_block": {
		"command": "/blockdata [x] [y] [z] {%s}",
		"version": "1.8",
		"formatType": "signset"
	},
	"book": {
		"command": "/give @a written_book 1 0 {pages:%s,title:Book,author:TellrawGenerator}",
		"version": "1.8",
		"formatType": "bookarray"
	}
}
/*
(c) 2012 Steven Levithan <http://slevithan.com/>
MIT license
*/
if (!String.prototype.codePointAt) {
	String.prototype.codePointAt = function (pos) {
		pos = isNaN(pos) ? 0 : pos;
		var str = String(this),
		code = str.charCodeAt(pos),
		next = str.charCodeAt(pos + 1);
        // If a surrogate pair
        if (0xD800 <= code && code <= 0xDBFF && 0xDC00 <= next && next <= 0xDFFF) {
        	return ((code - 0xD800) * 0x400) + (next - 0xDC00) + 0x10000;
        }
        return code;
    };
}

function setObfuscatedString(string) {
	var output = "";
	for (var i = string.length - 1; i >= 0; i--) {
		string[i]
		output = output + chars[Math.floor(Math.random() * chars.length)];
	};
	return output;
}
function saveJObject() {
	if (localStorage.getItem('currentSaveSlot') != null) {
		var saveTo = prompt('Please enter a save name. If you choose an existing one, it will overwrite it.', localStorage.getItem('currentSaveSlot'));
	} else {
		var saveTo = prompt('Please enter a save name. If you choose an existing one, it will overwrite it.');
	}
	if (saveTo == '' || saveTo == undefined || new RegExp('[^a-zA-Z0-9]').test(saveTo)) {
		alert('You didn\'t enter a valid save name! Please omit special characters');
		return false;
	}
	var saveSlot = 'saveSlot_' + saveTo;
	var overwrite = false;
	if (localStorage.getItem(saveSlot) != undefined) {
		overwrite = true;
	}
	localStorage.setItem('currentSaveSlot',saveTo);
	localStorage.setItem(saveSlot, JSON.stringify({"command": $('#command').val(), "jobject": jobject}));
	if (overwrite) {
		alert('Saved your current revision to `' + saveTo + '`, overwriting your previous save to that slot');	
	} else {
		alert('Saved your current revision to `' + saveTo + '`, which created a new saveSlot');
	}
	refreshSavesList();
	refreshOutput();
}
function loadJObject(saveName) {
	var saveItem = getJObject(saveName);
	jobject = saveItem.jobject;
	$('#command').val(saveItem.command);
	alert('Loaded save `' + saveName + '`');
	refreshSavesList();
	refreshOutput();
}
function doesJObjectExist(saveName) {
	var saveSlot = 'saveSlot_' + saveName;
	return localStorage.getItem(saveSlot) != undefined;

}
function getJObject(saveName) {
	var saveSlot = 'saveSlot_' + saveName;
	return JSON.parse(localStorage.getItem(saveSlot));
}
function deleteAll() {
	$('#deleteConfirm').remove();
	$('.alerts').append('<div id="deleteConfirm" class="alert alert-danger"><h4 lang="settings.deleteall.heading"></h4><p lang="settings.deleteall.body"></p><p><button type="button" onclick="deleteAllConfirmed()" class="btn btn-danger" lang="settings.deleteall.yes"></button> <button type="button" onclick="deleteAllCancel()" class="btn btn-default" lang="settings.deleteall.no"></button></p></div>');
	goToByScroll('deleteConfirm');
	refreshLanguage();
}
function deleteAllConfirmed() {
	$('#deleteConfirm').slideUp();
	$('#deleteConfirm');
	jobject = [];
	$('#command').val('/tellraw @a %s');
	localStorage.setItem('jtemplate','book');
	refreshOutput();
}
function deleteAllCancel() {
	$('#deleteConfirm').slideUp();
}
function clearJObjectSaves() {
	$('#deleteJObjectConfirm').remove();
	$('.alerts').append('<div id="deleteJObjectConfirm" class="alert alert-danger"><h4 lang="saves.deleteall.heading"></h4><p lang="saves.deleteall.body"></p><p><button type="button" onclick="clearJObjectSavesConfirmed()" class="btn btn-danger" lang="saves.deleteall.yes"></button> <button type="button" onclick="clearJObjectSavesCancel()" class="btn btn-default" lang="saves.deleteall.no"></button></p></div>');
	refreshLanguage();
}
function clearJObjectSavesConfirmed() {
	for (var i = 0; i < Object.keys(localStorage).length; i++) {
		var key = Object.keys(localStorage)[i];
		if (key.indexOf('saveSlot_') != -1) {
			localStorage.removeItem(key);
		}
	};
	$('#deleteJObjectConfirm').slideUp();
	refreshSavesList();
}
function clearJObjectSavesCancel() {
	$('#deleteJObjectConfirm').slideUp();
}
function obfuscationPreviewHandler() {
	$('.jsonPreviewObfuscated').html(setObfuscatedString($('.jsonPreviewObfuscated').html()));
	if ($('.jsonPreviewObfuscated').length > 0) {
		setTimeout(obfuscationPreviewHandler, 20);
	}
}
function getCSSHEXFromWord(w) {
	if (w == "black") return("#000000");
	if (w == "dark_blue") return("#0000B2");
	if (w == "dark_green") return("#14AB00");
	if (w == "dark_aqua") return("#13AAAB");
	if (w == "dark_red") return("#A90400");
	if (w == "dark_purple") return("#A900B2");
	if (w == "gold") return("#FEAC00");
	if (w == "gray") return("#AAAAAA");
	if (w == "dark_gray") return("#555555");
	if (w == "blue") return("#544CFF");
	if (w == "green") return("#5CFF00");
	if (w == "aqua") return("#5BFFFF");
	if (w == "red") return("#FD5650");
	if (w == "light_purple") return("#FD4DFF");
	if (w == "yellow") return("#FFFF00");
	if (w == "white") return("#FFFFFF");
	if (w == "none") return("#FFFFFF");
	return("#FFFFFF");
}
function removeWhiteSpace(s) {
	return s;
	//BROKEN return s.replace(/ /g, '');
}
function deleteIndex(index) {
	jobject.splice(index, 1);
	refreshOutput();
}
function moveUp(index) {
	jobject.splice(index+1, 0, jobject.splice(index, 1)[0]);
	refreshOutput();
}
function getSelected(object) {
	if ($('#'+object).length != 0) {
		var e = document.getElementById(object);
		return e.options[e.selectedIndex].value;
	} else {
		return false;
	}
}
function getSelectedIndex(object) {
	var e = document.getElementById(object);
	return e.selectedIndex;
}
function getChecked(id) {
	return document.getElementById(id).checked;
}
function clearExtra() {
	$('#fmtExtraRaw').click();
	$("#clickEventText").val("");
	$("#hoverEventText").val("");
	$("#hoverEventValue").val("");
	$("#hoverEventTextSnippet").val("");
	$("#snippetcolor").val("none");
	$("#text_extra").val("");
	$("#color_extra").val("none");
	$("#clickEvent").val('none');
	$("#hoverEvent").val('none');
	$("#insertion_text").val('');
	$("#bold_text_extra").prop("checked",false);
	$("#italic_text_extra").prop("checked",false);
	$("#underlined_text_extra").prop("checked",false);
	$("#strikethrough_text_extra").prop("checked",false);
	$("#obfuscated_text_extra").prop("checked",false);
	$('#hoverEventEntityName').val('');
	$('#hoverEventEntityID').val('');
	$('#hoverEventEntityType').val('');
	$('#textsnippets_add').html(getLanguageString('textsnippets.addsnippet'),localStorage.getItem('langCode'));
	$('#textsnippets-add-button').addClass('btn-default');
	$('#textsnippets-add-button').removeClass('btn-danger');
	$('#obj_player').val('');
	$('#obj_score').val('');
	$('#text_extra_container').removeClass('has-error');
	refreshOutput();
}
function editExtra(index) {
	editing = true;
	$('#snippetsWell').hide();
	$('#editModalData').show();

	currentEdit = index;

	if (jobject[index].text != undefined) {
		$('#obj_extra_container_edit').hide();
		$('#text_extra_container_edit').show();
		$('#translate_selector_container_edit').hide();
		$('#selector_extra_container_edit').hide();
		$('#text_extra_edit').val(jobject[index].text);
	} else if (jobject[index].selector != undefined) {
		$('#obj_extra_container_edit').hide();
		$('#selector_extra_container_edit').show();
		$('#text_extra_container_edit').hide();
		$('#translate_selector_container_edit').hide();
		$('#selector_edit').val(jobject[index].selector);
	} else if (jobject[index].translate != undefined) {
		$('#obj_extra_container_edit').hide();
		$('#text_extra_container_edit').hide();
		$('#selector_extra_container_edit').hide();
		$('#translate_selector_container_edit').show();
		if (!hasAlertedTranslationObjects) {
			alert('Translation objects are currently broken and may crash your game. Please test your translation before publishing it.');
			hasAlertedTranslationObjects = true;
		}
	} else if (jobject[index].score != undefined) {
		$('#obj_extra_container_edit').show();
		$('#text_extra_container_edit').hide();
		$('#translate_selector_container_edit').hide();
		$('#selector_extra_container_edit').hide();
		$('#obj_player_edit').val(jobject[index].score.name);
		$('#obj_score_edit').val(jobject[index].score.objective);
	}

	refreshLanguage();

	$('#colorPreviewColor_edit').css('background-color',getCSSHEXFromWord(jobject[index].color));
	if (jobject[index].color != undefined) {
		$("#color_extra_edit").val(jobject[index].color);
	} else {
		$("#color_extra_edit").val('none');
	}

	if (jobject[index].bold != undefined) {
		$('#bold_text_extra_edit').prop('checked',true);
	}
	if (jobject[index].italic != undefined) {
		$('#italic_text_extra_edit').prop('checked',true);
	}
	if (jobject[index].underlined != undefined) {
		$('#underlined_text_extra_edit').prop('checked',true);
	}
	if (jobject[index].strikethrough != undefined) {
		$('#strikethrough_text_extra_edit').prop('checked',true);
	}
	if (jobject[index].obfuscated != undefined) {
		$('#obfuscated_text_extra_edit').prop('checked',true);
	}

	if (jobject[index].clickEvent != undefined) {
		$('#clickEvent_edit').val(jobject[index].clickEvent.action);
		$('#clickEventText_edit').val(jobject[index].clickEvent.value);
	} else {
		$('#clickEvent_edit').val('none');
		$('#clickEventText_edit').val('');
	}


	if (jobject[index].hoverEvent != undefined) {
		$('#hoverEvent_edit').val(jobject[index].hoverEvent.action);
		if ($('#hoverEvent_edit').val() != 'show_entity') {
			if (jobject[index].hoverEvent.action == 'show_text') {
				$('#hoverEventText_edit').val(JSON.stringify(jobject[index].hoverEvent.value));
			} else {
				$('#hoverEventText_edit').val(jobject[index].hoverEvent.value);
			}
		} else {
			$('#hoverEventEntityID_edit').val(jobject[index].hoverEvent.value.match(/id:([a-zA-Z0-9]+)/g )[0].replace('id:',''));
			$('#hoverEventEntityName_edit').val(jobject[index].hoverEvent.value.match(/name:([a-zA-Z0-9]+)/g )[0].replace('name:',''));
			$('#hoverEventEntityType_edit').val(jobject[index].hoverEvent.value.match(/type:([a-zA-Z0-9]+)/g )[0].replace('type:',''));
		}
	} else {
		$('#hoverEvent_edit').val('none');
		$('#hoverEventText_edit').val('');
	}

	if (jobject[index].insertion != undefined) {
		$('#insertion_text_edit').val(jobject[index].insertion);
	}

	refreshOutput();
}
function cancelExtraEdit() {
	$('#editModalData').hide();
	$('#snippetsWell').show();
}
function saveExtraEdit() {
	editing = false;	
	extraIndex = currentEdit;
	jobject[extraIndex].color = getSelected("color_extra_edit");

	if (jobject[extraIndex].color == 'none') {
		delete jobject[extraIndex].color;
	}

	if ($('#obj_extra_container_edit').is(":visible")) {
		jobject[extraIndex].score = new Object;
		jobject[extraIndex].score.name = $('#obj_player_edit').val();
		jobject[extraIndex].score.objective = $('#obj_score_edit').val();
	} else if ($('#text_extra_container_edit').is(":visible")) {
		jobject[extraIndex].text = $('#text_extra_edit').val();
	} else if ($('#selector_extra_container_edit').is(":visible")) {
		jobject[extraIndex].selector = $('#selector_edit').val();
	} else if ($('#translate_selector_container_edit').is(":visible")) {
		jobject[extraIndex].translate = $('#translate_input_edit').val();
		if (matchLength != 0) {
			if (get_type(jobject.with) != "[object Array]") {
				jobject[extraIndex].with = new Array();
			}
			for (var i = 0; i < matchLength; i++) {
				jobject[extraIndex].with[i] = $('#extraTranslationParameter'+i+'_edit').val();
			};
		}
	} else {
		alert('An unexpected error occured.');
	}

	delete jobject[extraIndex].bold;
	delete jobject[extraIndex].italic;
	delete jobject[extraIndex].underlined;
	delete jobject[extraIndex].strikethrough;
	delete jobject[extraIndex].obfuscated;

	if (getChecked("bold_text_extra_edit")) {
		jobject[extraIndex].bold = "true";
	}
	if (getChecked("italic_text_extra_edit")) {
		jobject[extraIndex].italic = "true";
	}
	if (getChecked("underlined_text_extra_edit")) {
		jobject[extraIndex].underlined = "true";
	}
	if (getChecked("strikethrough_text_extra_edit")) {
		jobject[extraIndex].strikethrough = "true";
	}
	if (getChecked("obfuscated_text_extra_edit")) {
		jobject[extraIndex].obfuscated = "true";
	}

	delete jobject[extraIndex].clickEvent;
	delete jobject[extraIndex].hoverEvent;

	var clickEventType_edit = $("#clickEvent_edit").val();
	var hoverEventType_edit = $("#hoverEvent_edit").val();

	if (clickEventType_edit != "none") {
		jobject[extraIndex].clickEvent = new Object();
		jobject[extraIndex].clickEvent.action = clickEventType_edit;
		jobject[extraIndex].clickEvent.value = $('#clickEventText_edit').val();
		if (clickEventType_edit == "run_command" || clickEventType_edit == "suggest_command") {
			if ($('#clickEventText_edit').val().length > 90) {
				alert('Commands cannot be longer than 90 characters! You should edit the length of your command before using this in game.')
			}
		}
	}
	if (hoverEventType_edit != "none") {
		jobject[extraIndex].hoverEvent = new Object();
		jobject[extraIndex].hoverEvent.action = hoverEventType_edit;
		if (hoverEventType_edit == 'show_text') {
			try {
				jobject[extraIndex].hoverEvent.value = JSON.parse($('#hoverEventText_edit').val());
			} catch(err) {
				jobject[extraIndex].hoverEvent.value = {"text":"","extra":[{"text":$('#hoverEventText_edit').val()}]};
			}
		} else {
			jobject[extraIndex].hoverEvent.value = $('#hoverEventText_edit').val();
		}
	}
	if (hoverEventType_edit == "show_entity") {
		if ($('#hoverEventEntityID_edit').val() == '') {
			$('#hoverEventEntityID_edit').val('(ID)')
		}
		if ($('#hoverEventEntityName_edit').val() == '') {
			$('#hoverEventEntityName_edit').val('(Name)')
		}
		if ($('#hoverEventEntityType_edit').val() == '') {
			$('#hoverEventEntityType_edit').val('(Type)')
		}
		jobject[extraIndex].hoverEvent.value = '{id:'+removeWhiteSpace($('#hoverEventEntityID_edit').val())+',name:'+removeWhiteSpace($('#hoverEventEntityName_edit').val())+',type:'+removeWhiteSpace($('#hoverEventEntityType_edit').val())+'}';
	}
	if ($('#insertion_text_edit').val() != '') {
		jobject[extraIndex].insertion = $('#insertion_text_edit').val();
	} else {
		delete jobject[extraIndex].insertion;
	}

	$('#editModalData').hide();
	$('#snippetsWell').show();

	refreshOutput();
}
function clearExtraText() {
	delete jobject;
	refreshOutput();
}
function get_type(thing){
	if (thing===null) {
		return "[object Null]";
	}
	return Object.prototype.toString.call(thing);
}
function modifyExtraText(index,text) {
	if (text != "" && text != null) {
		jobject[index].text = text;
	}
	refreshOutput();
}
function cancelAddExtra() {
	showView('tellraw');
	clearExtra();
}
function addExtra() {
	editing = false;
	if (extraTextFormat == 'raw' && $('#text_extra').val() == '') {
		$('#text_extra_container').addClass('has-error');
		$('#text_extra').focus();
		$('#textsnippets-add-button').removeClass('btn-default');
		$('#textsnippets-add-button').addClass('btn-danger');
		return false;
	} else if ($("#hoverEvent").val() == 'show_text' && $('#hoverEventTextSnippet').val() != '') {
		alert('You entered text, but never added it!');
		$('#hoverEventTextSnippet').focus();
		$('#textsnippets-add-button').removeClass('btn-default');
		$('#textsnippets-add-button').addClass('btn-danger');
		return false;
	} else {
		showView('tellraw');
	}
	if (get_type(jobject) != "[object Array]") {
		jobject = [];
	}
	if (extraTextFormat == 'NEW_ITERATE_FLAG') {
		jobject.push({"NEW_ITERATE_FLAG":true});
	} else {
		var clickEventType = $("#clickEvent").val();
		var hoverEventType = $("#hoverEvent").val();

		jobject.push(new Object());
		var extraIndex = jobject.length - 1;
		if (extraTextFormat == 'trn') {
			jobject[extraIndex].translate = $('#translate_input').val();
			if (matchLength != 0) {
				if (get_type(jobject.with) != "[object Array]") {
					jobject[extraIndex].with = new Array();
				}
				for (var i = 0; i < matchLength; i++) {
					jobject[extraIndex].with[i] = $('#extraTranslationParameter'+i).val();
				};
			}
		} else if (extraTextFormat == 'raw') {
			jobject[extraIndex].text = $('#text_extra').val();
		} else if (extraTextFormat == 'obj') {
			jobject[extraIndex].score = new Object;
			jobject[extraIndex].score.name = $('#obj_player').val();
			jobject[extraIndex].score.objective = $('#obj_score').val();
		} else if (extraTextFormat == 'sel') {
			jobject[extraIndex].selector = $('#selector').val();
		}


		jobject[extraIndex].color = getSelected("color_extra");
		if (jobject[extraIndex].color == 'none') {
			delete jobject[extraIndex].color;
		}

		if (getChecked("bold_text_extra")) {
			jobject[extraIndex].bold = "true";
		}
		if (getChecked("italic_text_extra")) {
			jobject[extraIndex].italic = "true";
		}
		if (getChecked("underlined_text_extra")) {
			jobject[extraIndex].underlined = "true";
		}
		if (getChecked("strikethrough_text_extra")) {
			jobject[extraIndex].strikethrough = "true";
		}
		if (getChecked("obfuscated_text_extra")) {
			jobject[extraIndex].obfuscated = "true";
		}

		if (clickEventType != "none") {
			jobject[extraIndex].clickEvent = new Object();
			jobject[extraIndex].clickEvent.action = clickEventType;
			jobject[extraIndex].clickEvent.value = $('#clickEventText').val();
			if (clickEventType == "run_command" || clickEventType == "suggest_command") {
				if ($('#clickEventText').val().length > 90) {
					alert('Commands cannot be longer than 90 characters! You should edit the length of your command before using this in game.')
				}
			}

		}
		if (hoverEventType != "none") {
			jobject[extraIndex].hoverEvent = new Object();
			jobject[extraIndex].hoverEvent.action = hoverEventType;
			if (hoverEventType == 'show_text') {
				jobject[extraIndex].hoverEvent.value = JSON.parse($('#hoverEventText').val());
				if ($('#color_hover').val() != 'none') {
					jobject[extraIndex].hoverEvent.value.color = $('#color_hover').val();
				}
			} else {
				jobject[extraIndex].hoverEvent.value = $('#hoverEventValue').val();
			}
		}
		if (hoverEventType == "show_entity") {
			if ($('#hoverEventEntityID').val() == '') {
				$('#hoverEventEntityID').val('(ID)')
			}
			if ($('#hoverEventEntityName').val() == '') {
				$('#hoverEventEntityName').val('(Name)')
			}
			if ($('#hoverEventEntityType').val() == '') {
				$('#hoverEventEntityType').val('(Type)')
			}
			jobject[extraIndex].hoverEvent.value = '{id:'+removeWhiteSpace($('#hoverEventEntityID').val())+',name:'+removeWhiteSpace($('#hoverEventEntityName').val())+',type:'+removeWhiteSpace($('#hoverEventEntityType').val())+'}';
		}
		if ($('#insertion_text').val() != '') jobject[extraIndex].insertion = $('#insertion_text').val();
	}
	clearExtra();
	refreshOutput();

}
function refreshSavesList() {
	$('.savesContainer').html('');
	for (var i = 0; i < Object.keys(localStorage).length; i++) {
		var key = Object.keys(localStorage)[i];
		if (key.indexOf('saveSlot_') != -1) {
			$('.savesContainer').append('<div class="row" saveKey="' + key.substring('9') + '"><div class="col-xs-3"><a href="#" onclick="loadJObject(\'' + key.substring('9') + '\')">Load ' + key.substring('9') + '</a></div><div class="col-xs-6">' + localStorage.getItem(key).substring(0,90) + ' ...</div><div class="div class="col-xs-3"><a href="#" onclick="deleteJObjectSave(\'' + key.substring('9') + '\')">Delete ' + key.substring('9') + '</a></div></div>')
		}
	};
	if ($('.savesContainer').html() == '') {
		$('.savesContainer').html('<div class="row"><div class="col-xs-12"><h4 lang="saves.nosaves"></h4></div></div>');
	}
	refreshLanguage();
}
function deleteJObjectSave(saveName) {
	var saveSlot = 'saveSlot_' + saveName;
	if (confirm('Are you sure you want to delete ' + saveName + '?')) {
		localStorage.removeItem(saveSlot);
	}
	refreshSavesList();
}
function refreshOutput(input) {
	try {
		/*VERIFY CONTENTS*/
		jobject = verify_jobject_format(jobject);

		if ($('#command').val().indexOf('%s') == -1) {
			$('#command').val('/tellraw @a %s');
			localStorage.setItem('jtemplate','tellraw');
		}

		refreshSavesList();

		/*LANGUAGE SELECTIONS*/

		$('.langSelect').removeClass('label label-success');
		$('.' + localStorage.getItem('langCode')).addClass('label label-success');

		/*EXTRA MODAL COLOR PREVIEW MANAGER*/
		$('#colorPreviewColor').css({ 'background-color': getCSSHEXFromWord(getSelected('color_extra')) });

		/*EXTRA VIEWER MANAGER*/
		$('#textsnippets_header').html(getLanguageString('textsnippets.header',localStorage.getItem('langCode')));
		if (input != 'previewLineChange') {
			if (get_type(jobject) == "[object Array]") {
				var extraOutputPreview = "";
				$('.extraContainer div.extraRow').remove();
				$('.extraContainer').html('');
				for (var i = 0; i <= jobject.length - 1; i++) {
					if (jobject.length-1 > i) {
						downButton = '<i onclick="moveUp(' + i + ')" class="fa fa-arrow-circle-down"></i> ';
					} else {
						downButton = "";
					}
					if (i > 0) {
						upButton = '<i onclick="moveUp(' + (i-1) + ')" class="fa fa-arrow-circle-up"></i> ';
					} else {
						upButton = "";
					}
					if (jobject[i].NEW_ITERATE_FLAG) {
						if (templates[localStorage.getItem('jtemplate')].formatType != 'bookarray' && templates[localStorage.getItem('jtemplate')].formatType != 'signset') {
							var tempJSON = '<span style="color:gray;text-decoration:line-through;" lang="textsnippets.NEW_ITERATE_FLAG"></span>';
						} else {
							var tempJSON = '<span lang="textsnippets.NEW_ITERATE_FLAG"></span>';
						}
						var saveButton = '';
					} else {
						if (get_type(jobject[i].text) != "[object Undefined]") {
							var tempJSON = '<input id="previewLine'+i+'" onkeyup="jobject['+i+'].text = $(\'#previewLine'+i+'\').val(); refreshOutput(\'previewLineChange\')" type="text" class="form-control previewLine" value="'+jobject[i].text+'">';
							var saveButton = '';
						} else if (get_type(jobject[i].translate) != "[object Undefined]") {
							var tempJSON = '<input type="text" class="form-control previewLine" disabled value="'+jobject[i].translate+'">';
							var saveButton = '';
						} else if (get_type(jobject[i].score) != "[object Undefined]") {
							var tempJSON = '<input type="text" class="form-control previewLine" disabled value="'+jobject[i].score.name+'\'s '+jobject[i].score.objective+' score">';
							var saveButton = '';
						} else if (get_type(jobject[i].selector) != "[object Undefined]") {
							var tempJSON = '<input type="text" class="form-control previewLine" disabled value="Selector: '+jobject[i].selector+'">';
							var saveButton = '';
						}
						if (input == 'noEditIfMatches' && jobject[i].text != $('#previewLine'+matchTo).val()) {
							var blah = 'blah'; /* wtf */
						} else {
							tempJSON = '<div class="row"><div class="col-xs-10 col-md-11">'+tempJSON+'</div><div class="col-xs-2 col-md-1"><div class="colorPreview"><div class="colorPreviewColor" style="background-color:'+getCSSHEXFromWord(jobject[i].color)+'"></div></div></div></div>';
						}
					}
					var deleteButton = '<i id="'+i+'RowEditButton" onclick="editExtra('+i+');" class="fa fa-pencil"></i> <i onclick="deleteIndex('+ i +');" class="fa fa-times-circle"></i> ';
					if (jobject[i].NEW_ITERATE_FLAG) {
						deleteButton = '<i style="color:gray;" class="fa fa-pencil"></i> <i onclick="deleteIndex('+ i +');" class="fa fa-times-circle"></i> ';
					}
					$('.extraContainer').append('<div class="row extraRow row-margin-top row-margin-bottom RowIndex' + i + '"><div class="col-xs-4 col-sm-2 col-lg-1">'+deleteButton+downButton+upButton+'</div><div class="col-xs-8 col-sm-10 col-lg-11" style="padding:none;">'+tempJSON+'</div></div>');
				}
				if (jobject.length == 0) {
					delete jobject;
					$('.extraContainer').html('<br><br>');
					refreshLanguage();
				}
			} else {
				$('.extraContainer div.extraRow').remove();
				$('.extraContainer').html('<div class="row"><div class="col-xs-12"><h4>'+getLanguageString('textsnippets.nosnippets',localStorage.getItem('langCode'))+'</h4></div></div>');
			}
			refreshLanguage();
		}

		/*HIDE HOVER/CLICK EVENTS FOR SIGNS*/
		if (templates[localStorage.getItem('jtemplate')].formatType == 'signset') {
			$('.hoverEventContainer_edit').hide();
			$('.clickEventContainer_edit').hide();
			$('.insertionContainer_edit').hide();
			$('.hoverEventContainer').hide();
			$('.clickEventContainer').hide();
			$('.insertionContainer').hide();
		} else {
			$('.hoverEventContainer_edit').show();
			$('.clickEventContainer_edit').show();
			$('.insertionContainer_edit').show();
			$('.hoverEventContainer').show();
			$('.clickEventContainer').show();
			$('.insertionContainer').show();
		}


		/*EXTRA TRANSLATE STRING MANAGER*/

		if (extraTextFormat == "trn") {
			$('#obj_extra_container').hide();
			$('#text_extra_container').hide();
			$('#selector_extra_container').hide();
			$('#translate_selector_container').show();
			if (!hasAlertedTranslationObjects) {
				alert('Translation objects are currently broken and may crash your game. Please test your translation before publishing it.');
				hasAlertedTranslationObjects = true;
			}
		} else if (extraTextFormat == "obj") {
			$('#text_extra_container').hide();
			$('#translate_selector_container').hide();
			$('#selector_extra_container').hide();
			$('#obj_extra_container').show();
		} else if (extraTextFormat == "sel") {
			$('#text_extra_container').hide();
			$('#translate_selector_container').hide();
			$('#selector_extra_container').show();
			$('#obj_extra_container').hide();
		} else if (extraTextFormat == "raw") {
			$('#text_extra_container').show();
			$('#obj_extra_container').hide();
			$('#translate_selector_container').hide();
			$('#selector_extra_container').hide();
			$('.extraTranslationParameterRow').hide();
		}
		if (extraTextFormat == 'NEW_ITERATE_FLAG') {
			if (templates[localStorage.getItem('jtemplate')].formatType != 'bookarray' && templates[localStorage.getItem('jtemplate')].formatType != 'signset') {
				alert('You must be using the book or sign template(s)');
				if (confirm('Do you want to go to the home page and change your template?\n\nYou will loose any text entered in the current window.')) {
					cancelAddExtra();
				}
				$('#fmtExtraRaw').click();
			}
			$('.NEW_ITERATE_FLAG_not_container').hide();
		} else {
			$('.NEW_ITERATE_FLAG_not_container').show();
		}

		/*COMMAND MANAGER*/
		if ($("#command").val() == "") $("#command").val(templates[localStorage.getItem('jtemplate')]['command']);

		/*HOVEREVENT SUGGESTION MANAGER*/
		$('#hoverEventValue').removeAttr('disabled');
		selectedHover = getSelected("hoverEvent");
		if (selectedHover == "show_achievement") {
			$('#hoverEventValue').autocomplete({
				source: achievements
			});
		} else if (selectedHover == "show_item") {
			$('#hoverEventValue').autocomplete({
				source: []
			});
		} else if (selectedHover == "show_entity") {
			$('.hovertext_default').hide();
			$('.hovertext_entity').show();
		} else if (selectedHover == "none") {
			$('#hoverEventValue').attr('disabled','true');
			$('#hoverEventValue').autocomplete({
				source: []
			});
		}
		if (selectedHover != "show_entity") {
			$('.hovertext_default').show();
			$('.hovertext_entity').hide();
		}
		if (selectedHover == "show_text") {
			$('.hovertext_default').hide();
			$('.hovertext_text').show();
			$('#hoverEventText').val(JSON.stringify({"text":"","extra":[]}));
		} else {
			$('.hovertext_text').hide();
		}

		/*HOVEREVENT EDIT SUGGESTION MANAGER*/
		$('#hoverEventText_edit').removeAttr('disabled');
		selectedHover_edit = getSelected('hoverEvent_edit');
		if (selectedHover_edit == "show_achievement") {
			$('#hoverEventText_edit').autocomplete({
				source: achievements
			});
		} else if (selectedHover_edit == "show_item") {
			$('#hoverEventText_edit').autocomplete({
				source: []
			});
		} else if (selectedHover_edit == "show_entity") {
			$('.hovertext_default_edit').hide();
			$('.hovertext_entity_edit').show();
		} else if (selectedHover_edit == "none") {
			$('#hoverEventText_edit').attr('disabled','true');
			$('#hoverEventText_edit').autocomplete({
				source: []
			});
		}
		if (selectedHover_edit != "show_entity") {
			$('.hovertext_default_edit').show();
			$('.hovertext_entity_edit').hide();
		}
		if (selectedHover_edit != "show_text") {
			$('.hovertext_text_edit').hide();
		} else {
			$('.hovertext_text_edit').show();
		}

		/*CLICKEVENT SUGGESTION MANAGER*/
		$('#clickEventText').removeAttr('disabled');
		selectedClick = getSelected("clickEvent");
		if (selectedClick == "run_command" || selectedClick == "suggest_command") {
			$('#clickEventText').autocomplete({
				source: commands
			});
		} else if (selectedClick == "open_url") {
			$('#clickEventText').autocomplete({
				source: ["https://", "http://", "http://apple.com", "https://minecraft.net", "https://mojang.com", "http://ezekielelin.com", "https://reddit.com"]
			});
		} else if (selectedClick == "none") {
			$('#clickEventText').attr('disabled','true');
			$('#clickEventText').autocomplete({
				source: []
			});
		}

		/*CLICKEVENT EDIT SUGGESTION MANAGER*/
		$('#clickEventText_edit').removeAttr('disabled');
		selectedClick_edit = getSelected('clickEvent_edit');
		if (selectedClick_edit == "run_command" || selectedClick_edit == "suggest_command") {
			$('#clickEventText_edit').autocomplete({
				source: commands
			});
		} else if (selectedClick_edit == "open_url") {
			$('#clickEventText_edit').autocomplete({
				source: ["http://apple.com", "https://minecraft.net", "https://mojang.com", "http://ezekielelin.com", "https://", "https://reddit.com", "http://"]
			});
		} else if (selectedClick_edit == "none") {
			$('#clickEventText_edit').attr('disabled','true');
			$('#clickEventText_edit').autocomplete({
				source: []
			});
		}

		/*PREPARING OUTPUT*/

		var commandString = $('#command').val();

		var JSONOutputString = '';
		var EscapedJSONOutputString = '';
		var formattedJObject = formatJObjectList(jobject);

		var newLineExpressions = {
			"bookarray": /\\\\\\\\n/g,
			"standardjson": /\\\\n/g,
			"signset": /\\\\\\\\n/g
		}
		if (!formattedJObject.length > 0) {
			JSONOutputString = '{}';
		} else {
			if (templates[localStorage.getItem('jtemplate')].formatType == 'bookarray') {
				JSONOutputString = JSON.stringify(formattedJObject);
				JSONOutputString = JSONOutputString.replace(newLineExpressions.bookarray,'\\n');
			} else if (templates[localStorage.getItem('jtemplate')].formatType == 'standardjson') {
				JSONOutputString = formattedJObject[0];
				JSONOutputString = JSONOutputString.replace(newLineExpressions.standardjson,'\\n');
			} else if (templates[localStorage.getItem('jtemplate')].formatType == 'signset') {
				JSONOutputString = 'Text1:' + JSON.stringify(formattedJObject[0]);
				if (formattedJObject.length > 1) {
					JSONOutputString += ',Text2:' + JSON.stringify(formattedJObject[1])
				} 
				if (formattedJObject.length > 2) {
					JSONOutputString += ',Text3:' + JSON.stringify(formattedJObject[2])
				}
				if (formattedJObject.length > 3) {
					JSONOutputString += ',Text4:' + JSON.stringify(formattedJObject[3])
				}
				JSONOutputString = JSONOutputString.replace(newLineExpressions.signset,'\\n');
			}
		}

		commandString = commandString.replace('%s',JSONOutputString);

		outputString = commandString;

		$('#outputtextfield').val(outputString);
		if ($('#showNiceLookingOutput').is(':checked')) {
			localStorage.setItem('nlOutput','yes');
			$('#nicelookingoutput').show().html(JSON.stringify(jobject, null, 4).replace(newLineExpressions.standardjson,'\\n'));
		} else {
			localStorage.setItem('nlOutput','no');
			$('#nicelookingoutput').hide();
		}
		jsonParse();

		/*COMMAND BLOCK WARNING*/
		if ($('#outputtextfield').val().length > 90) {
			$('#commandblock').show();
		} else {
			$('#commandblock').hide();
		}

		/*SAVE VARIABLES*/
		localStorage['jobject'] = JSON.stringify(jobject);
		localStorage['jcommand'] = $('#command').val();

		/*RERUN*/
		if (input != 'noLoop' && input != 'previewLineChange') {
			refreshOutput('noLoop');
		}
	} catch(err) {
		logIssue('Unknown Error',err);
	}
}
function jsonParse() {
	$('#jsonPreview').css('background-color','#'+$('#previewcolor').val());
	$('#jsonPreview').css('font-size',$('#previewFontSize').val() + 'px');
	localStorage["color"] = $('#previewcolor').val();
	$('#jsonPreview').html('');
	if (get_type(jobject) == "[object Array]") {
		for (var i = 0; i < jobject.length; i++) {
			if (jobject[i].NEW_ITERATE_FLAG) {
				if (templates[localStorage.getItem('jtemplate')].formatType == 'bookarray' || templates[localStorage.getItem('jtemplate')].formatType == 'signset') {
					$('#jsonPreview').append('<span id="jsonPreviewSpanElement'+ i +'"><hr></span>');
				}
			} else {
				var doClickEvent = false;
				var doHoverEvent = false;
				var popoverTitle = "";
				var popoverContentClick = "";
				var popoverContentHover = "";
				var hoverEventType = "";
				var hoverEventValue = "";
				var clickEventType = "";
				var clickEventValue = "";
				$('#jsonPreview').append('<span id="jsonPreviewSpanElement'+ i +'"></span>');
				
				if (jobject[i].text) {
					$('#jsonPreviewSpanElement'+i).html(jobject[i].text.replace(/\\\\n/g,'<br>').replace(/\\n/g,'<br>'));
				} else if (jobject[i].score) {
					$('#jsonPreviewSpanElement'+i).html('<span class="label label-info">' + jobject[i].score.name + ':' + jobject[i].score.objective + '</span>');
				} else if (jobject[i].translate) {
					$('#jsonPreviewSpanElement'+i).html('<span class="label label-warning">Translation</span>');
				} else if (jobject[i].selector) {
					$('#jsonPreviewSpanElement'+i).html('<span class="label label-primary">' + jobject[i].selector + '</span>');
				} else {
					$('#jsonPreviewSpanElement'+i).html('<span class="label label-danger">Unknown Element</span>');
				}

				if (jobject[i].bold == "true") {
					$('#jsonPreviewSpanElement'+i).addClass('bold');
				}
				if (jobject[i].italic == "true") {
					$('#jsonPreviewSpanElement'+i).addClass('italic');
				}
				if (jobject[i].underlined == "true") {
					$('#jsonPreviewSpanElement'+i).addClass('underlined');
				}
				if (jobject[i].strikethrough == "true") {
					if ($('#jsonPreviewSpanElement'+i).hasClass('underlined')) {
						$('#jsonPreviewSpanElement'+i).removeClass('underlined');
						$('#jsonPreviewSpanElement'+i).addClass('strikethroughunderlined');
					} else {
						$('#jsonPreviewSpanElement'+i).addClass('strikethrough');
					}
				}
				if (jobject[i].obfuscated == "true") {
					$('#jsonPreviewSpanElement'+i).addClass('jsonPreviewObfuscated');
				}

				/*COLORS*/
				$('#jsonPreviewSpanElement'+i).css('color',getCSSHEXFromWord(jobject[i].color));

				/*CLICK & HOVER EVENTS*/

				if (get_type(jobject[i].clickEvent) != "[object Undefined]" || get_type(jobject[i].hoverEvent) != "[object Undefined]") {
					if (get_type(jobject[i].clickEvent) != "[object Undefined]") doClickEvent = true;
					if (get_type(jobject[i].hoverEvent) != "[object Undefined]") doHoverEvent = true;
					if (doHoverEvent && doClickEvent) {
						popoverTitle = getLanguageString('textsnippets.hoverevent.header',localStorage.getItem('langCode')) + ' and ' + getLanguageString('textsnippets.clickevent.header',localStorage.getItem('langCode'));
						hoverEventType = jobject[i].hoverEvent.action;
						hoverEventValue = jobject[i].hoverEvent.value;
						clickEventType = jobject[i].clickEvent.action;
						clickEventValue = jobject[i].clickEvent.value;
					}
					if (doHoverEvent && !doClickEvent) {
						popoverTitle = getLanguageString('textsnippets.hoverevent.header',localStorage.getItem('langCode'));
						hoverEventType = jobject[i].hoverEvent.action;
						hoverEventValue = jobject[i].hoverEvent.value;
					}
					if (!doHoverEvent && doClickEvent) {
						popoverTitle = getLanguageString('textsnippets.clickevent.header',localStorage.getItem('langCode'));
						clickEventType = jobject[i].clickEvent.action;
						clickEventValue = jobject[i].clickEvent.value;
					}
					if (doClickEvent) {
						if (clickEventType == "open_url") {
							popoverContentClick = clickEventType+':<a href="'+clickEventValue+'">'+clickEventValue+'</a>';
						} else {
							popoverContentClick = clickEventType+':'+clickEventValue;
						}
					}
					if (doHoverEvent) {
						popoverContentHover = hoverEventType+':'+hoverEventValue;
					}
					if (doHoverEvent && doClickEvent) {
						popoverContentClick = popoverContentClick + '<br>';
					}
					$('#jsonPreviewSpanElement'+i).attr('rel','popover');
				}
				$('#jsonPreviewSpanElement'+ i).popover({ title: popoverTitle, content: popoverContentClick+popoverContentHover, html:true});
			}
		}
	} else {
		$('#jsonPreview').html(getLanguageString('output.nothing',localStorage.getItem('langCode')));
		$('#jsonPreview').css('color','white');
	}
	if ($('.jsonPreviewObfuscated').length > 0) {
		setTimeout(obfuscationPreviewHandler, 20);
	}
}
function refreshLanguage(dropdownSelection) {
	if (lang[localStorage.getItem('langCode')]) {
		$('*').refreshLanguage(localStorage.getItem('langCode'));
	} else {
		localStorage.setItem('langCode','en_us')
	}
	$('*').each(function(){
		//if ($(this).attr('version') != undefined && (localStorage['versionIndicators'] == "true" || localStorage['versionIndicators'] == undefined)) {
		if (false) {
			var labelLevel = 'success';
			if ($(this).attr('version') == '1.9') {
				labelLevel = 'danger';
			}
			if ($(this).prop('tagName') == 'OPTION') {
				$(this).prepend('('+$(this).attr('version')+') ');
			} else {
				$(this).append(' <span class="label label-'+labelLevel+'">'+$(this).attr('version')+'</span>');
			}
		}
	});
}

function initialize() {
	if (localStorage.getItem('initialTimestamp') == undefined) {
		localStorage.setItem('initialTimestamp',new Date().getTime())
	}

	if (localStorage.getItem('langCode') == undefined) {
		if (lang[navigator.language.toLowerCase()] != undefined) {
			localStorage.setItem('langCode',navigator.language.toLowerCase());
		} else {
			if (webLangRelations[navigator.language.toLowerCase()] != undefined) {
				localStorage.setItem('langCode',webLangRelations[navigator.language.toLowerCase()]);
			}
		}
	}

	if (localStorage.getItem('langCode') == undefined) {
		localStorage.setItem('langCode','en_us');
	}

	/*check if alert isn't correctly set. Do not show the alert is jformat isn't set – that means the user hasn't been here before*/
	if (localStorage.getItem('jalert') != notice.id && localStorage.getItem('jformat') != undefined) {
		alert(notice.message);
	}
	localStorage.setItem('jalert',notice.id);

	if (localStorage.getItem('jformat') != version && localStorage.getItem('jformat') != undefined) {
		if (confirm('Your cookie format is old and may cause issues. Would you like to reset them? You won\'t be asked again until the format changes again')) {
			localStorage.clear();
			location.reload();
		} else {
			alert('You won\'t be asked again until the cookie format changes. If you experience an issue, please clear your coookies for this website');
		}
	}
	localStorage.setItem('jformat',version);

	for (var i = 0; i < Object.keys(templates).length; i++) {
		var key = Object.keys(templates)[i]
		if (key == localStorage.getItem('jtemplate')) {
			var classString = 'btn-success';
		} else {
			var classString = 'btn-default';
		}
		$('#templateButtons').append('<button class="btn btn-xs ' + classString + ' templateButton" lang="template.' + key + '" version="' + templates[key]['version'] + '" template="'+ key +'"></button> ');
	}
	if (localStorage.getItem('jtemplate') == undefined) {
		localStorage.setItem('jtemplate', 'tellraw');
	}
	if (lang[localStorage.getItem('langCode')]) {
		errorString = lang[localStorage.getItem('langCode')].language.name+'<br><br>';
	} else {
		errorString = '&lt;language unknown&gt;<br><br>';
	}
	/*var enCount = JSON.stringify(lang['en_us']).length;*/
	for (var i = 0; i < Object.keys(lang).length; i++) {
		/*var langKey = Object.keys(lang)[i];
		var currentCount = JSON.stringify(lang[langKey]).length;
		var currentPercentage = Math.round(currentCount/enCount*100);
		console.log(currentPercentage);*/
		$('#language_keys').append('<li><a onclick="errorString = \''+lang[Object.keys(lang)[i]].language.name+'<br><br>\'; localStorage.setItem(\'langCode\',\''+Object.keys(lang)[i]+'\'); refreshLanguage(true); refreshOutput();"><span class="'+Object.keys(lang)[i]+' langSelect" id="language_select_'+Object.keys(lang)[i]+'">'+lang[Object.keys(lang)[i]].language.name+'</span></a></li>');
	};
	$('#language_keys').append('<li class="divider"></li>');
	$('#language_keys').append('<li><a href="http://www.minecraftforum.net/topic/1980545-"><span class="language_area" lang="language.translate"></span></a></li>');

	$('.extraTranslationParameterRow').hide();

	if (localStorage['color'] != undefined) {
		$('#previewcolor').val(localStorage["color"]);	
	} else {
		$('#previewcolor').val('617A80');
	}
	$('#previewcolor').css('background-color','#'+$('#previewcolor').val());
	
	jsonParse();
	
	if (localStorage['jobject'] != undefined) {
		jobject = verify_jobject_format(JSON.parse(localStorage["jobject"]));
	}

	if (localStorage.getItem('nlOutput') == undefined) {
		localStorage.setItem('nlOutput','no');
	}

	if (localStorage.getItem('nlOutput') == 'no') {
		$('#showNiceLookingOutput').prop('checked', false);
	} else {
		$('#showNiceLookingOutput').prop('checked', true);
	}
	
	showView('pageheader',true,false);
	//JSON.stringify({"viewname":viewname,"suppressAnimation":suppressAnimation,"hideOthers":hideOthers,"hideMenubar":hideMenubar})
	if (localStorage.getItem('jview') != undefined && typeof JSON.stringify(localStorage.getItem('jview')) != "string") {
		var viewObject = JSON.parse(localStorage.getItem('jview'));
		showView(viewObject.viewname,viewObject.suppressAnimation,viewObject.hideOthers,viewObject.hideMenubar);
	} else {
		showView('tellraw')
	}
	if (localStorage.getItem('jtosaccept') == undefined || localStorage.getItem('jtosaccept') != tos_version) {
		//showView('tos-header',true,false,true);
	}
	$('.templateButton').click(function(){
		$('.templateButton').removeClass('btn-success').removeClass('btn-default').addClass('btn-default');
		$(this).addClass('btn-success').removeClass('btn-default');

		var template = $(this).attr('template');

		localStorage.setItem('jtemplate',template);
		$('#command').val(templates[localStorage.getItem('jtemplate')]['command']);

		refreshOutput();
	});

	$('#command').val(localStorage.getItem('jcommand'));

	$('#command').change(function(){refreshOutput()});

	$('#import').click(function() {
		if (confirm("Would you like to import an \"exported\" command? Press Ok if you made the string by using the export option")) {
			var inpt = prompt(getLanguageString('settings.importtext.exported',localStorage.getItem('langCode'),false,false));
			inpt = JSON.parse(inpt)
			jobject = inpt['jobject'];
			if (inpt['jtemplate']) {
				localStorage.setItem('jtemplate',inpt['jtemplate'])
			}
			$('#command').val(inpt['command']);
			refreshOutput();
		} else {
			var inpt = prompt(getLanguageString('settings.importtext.default',localStorage.getItem('langCode'),false,false));
			$('#command').val(inpt.substring(0,inpt.indexOf("{")-1));
			try {
				jobject = JSON.parse(inpt.substring(inpt.indexOf("{")))['extra'];
			} catch(err) {
				alert(err.message);
				jobject = [];
			}
			refreshOutput();
		}
	});
	$('#export').click(function(){
		$('#exporter').remove();
		$('.alerts').append('<div id="exporter" class="alert alert-info"><h4 lang="export.heading"></h4><p>' + JSON.stringify({"command":$('#command').val(),"jobject":jobject,"jtemplate":localStorage.getItem('jtemplate')}) + '</p><p><button type="button" onclick="closeExport()" class="btn btn-default" lang="export.close"></button></p></div>');
		goToByScroll('exporter');
		refreshLanguage();
	});
	$('#translate_input').change(function(){
		var val = translationStrings[$('#translate_input').val()];
		var match = val.match(/%./g);
		matchLength = match.length
		var c = getSelected('translate_selector');
		$('.extraTranslationParameterRow').hide();
		$('.extraTranslationParameterRow').val('');
		if (match != null) {
			for (var i = matchLength - 1; i >= 0; i--) {
				if (matchLength > 5) {
					alert('An unexpected error has occured. EID-more than 5 matches');
				}
				for (var i = matchLength - 1; i >= 0; i--) {
					$('#parameter'+i+'row').show();
				};
			};
		}
	});
	refreshLanguage();
	refreshOutput();
	$('.fmtExtra').on('click', function(){
		extraTextFormat = $(this).attr('tellrawType');
		$('.fmtExtra').removeClass('active');
		$(this).addClass('active');
		refreshOutput();
	});
	$('#addHoverTextText').on('click',function(){
		textobj = JSON.parse($('#hoverEventText').val());
		snipobj = {"text":$('#hoverEventTextSnippet').val()};
		if ($('#snippetcolor').val() != 'none') {
			snipobj.color = $('#snippetcolor').val();
		}
		$('#hoverEventTextSnippet').val('');
		textobj.extra.push(snipobj)
		$('#hoverEventText').val(JSON.stringify(textobj));
	});
	$('#removeHoverTextText').on('click',function(){
		textobj = JSON.parse($('#hoverEventText').val());
		textobj.extra.splice(-1,1)
		$('#hoverEventText').val(JSON.stringify(textobj));
	});
	$('#addExtraButton').on('click',function(){
		showView('add-extra')
		editing = true;
	});
	$( "#translate_input" ).autocomplete({
		source: Object.keys(translationStrings)
	});
	$( "#translate_input_edit" ).autocomplete({
		source: Object.keys(translationStrings)
	});
	$('#show-saves').on('click',function(){
		showView('saves');
	});
	$('#hide-saves').on('click',function(){
		showView('tellraw');
	});
	$('#lang_request').on('click',function(){
		showView('lang-request');
		$('#lang-request-errorstring').html(errorString);
	});
	$('#helptoggle').click(function(){
		$('.help-box').toggle();
	});
	$('#enable_dark_mode').on('click',function(){
		localStorage.setItem('darkMode','true');
		$('body').addClass('black-theme');
		$(this).hide();
		$('#disable_dark_mode').show();
	});
	$('#disable_dark_mode').on('click',function(){
		localStorage.setItem('darkMode','false');
		$('body').removeClass('black-theme');
		$(this).hide();
		$('#enable_dark_mode').show();
	});
	$('.report-issue').on('click',function(){
		reportAnIssue();
	});
	if (localStorage.getItem('darkMode') && localStorage.getItem('darkMode') == 'true') {
		$('#enable_dark_mode').click(); //Finish setting up dark mode after handlers exist
	}
}
$(document).ready(function(){
	if (localStorage.getItem('darkMode') && localStorage.getItem('darkMode') == 'true') {
		$('body').addClass('black-theme'); //Rest of "dark mode" is handled later, color scheme handled early for appearance
	} else if (localStorage.getItem('darkMode') == undefined) {
		$('body').addClass('black-theme');
		localStorage.setItem('darkMode','true');
	}
	$('.view-container').hide();
	showView('loading',true,true,true);
	$('#loadingtxt').html('Loading Assets');
	try {
		data = getURL('resources.json');
	} catch(err) {
		alert('An error occured loading page assets. Please try again later.');
	}
	if (typeof data == 'string') {
		try {
			data = JSON.parse(data);
		} catch(err) {
			alert('An error occured loading page assets. Please try again later.');
		}
	}
	translationStrings = data['minecraft_language_strings']['en_us'];
	webLangRelations = data['web_language_relations'];
	achievements = data['achievements'];
	commands = data['commands'];
	for (var i = 0; i < data['web_language_urls'].length; i++) {
		try {
			var urlFetch = getURL('lang/' + data['web_language_urls'][i] + '.json');
		} catch(err) {
			if (data['web_language_urls'][i] == 'en_us') {
				var urlFetch = {"language":{"name":"English"}};
			} else {
				continue;
			}
		}
		if (typeof urlFetch == 'string') {
			try {
				urlFetch = JSON.parse(urlFetch);
			} catch(err) {
				if (data['web_language_urls'][i] == 'en_us') {
					var urlFetch = {"language":{"name":"English"}};
				} else {
					continue;
				}
			}
		}
		lang[data['web_language_urls'][i]] = urlFetch;
	}
	delete lang.status;
	setTimeout(initialize,500);
});