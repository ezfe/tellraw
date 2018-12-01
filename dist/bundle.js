/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "./src/classes/Snippet.tsx":
/*!*********************************!*\
  !*** ./src/classes/Snippet.tsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var uuid = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");
var Color;
(function (Color) {
    Color[Color["black"] = 0] = "black";
    Color[Color["dark_blue"] = 1] = "dark_blue";
    Color[Color["dark_green"] = 2] = "dark_green";
    Color[Color["dark_aqua"] = 3] = "dark_aqua";
    Color[Color["dark_red"] = 4] = "dark_red";
    Color[Color["dark_purple"] = 5] = "dark_purple";
    Color[Color["gold"] = 6] = "gold";
    Color[Color["gray"] = 7] = "gray";
    Color[Color["dark_gray"] = 8] = "dark_gray";
    Color[Color["blue"] = 9] = "blue";
    Color[Color["green"] = 10] = "green";
    Color[Color["aqua"] = 11] = "aqua";
    Color[Color["red"] = 12] = "red";
    Color[Color["light_purple"] = 13] = "light_purple";
    Color[Color["yellow"] = 14] = "yellow";
    Color[Color["white"] = 15] = "white";
    Color[Color["none"] = 16] = "none";
})(Color = exports.Color || (exports.Color = {}));
var SnippetType;
(function (SnippetType) {
    SnippetType[SnippetType["text"] = 0] = "text";
    SnippetType[SnippetType["selector"] = 1] = "selector";
    SnippetType[SnippetType["lineBreak"] = 2] = "lineBreak";
})(SnippetType = exports.SnippetType || (exports.SnippetType = {}));
var Snippet = /** @class */ (function () {
    function Snippet(id) {
        if (id === void 0) { id = null; }
        this.bold = false;
        this.italic = false;
        this.underlined = false;
        this.strikethrough = false;
        this.obfuscated = false;
        this.color = Color.none;
        if (id !== null) {
            this.id = id;
        }
        else {
            this.id = uuid();
        }
    }
    Snippet.prototype.copy = function () {
        var newValue = new Snippet(this.id);
        newValue.type = this.type;
        newValue.text = this.text;
        newValue.selector = this.selector;
        newValue.bold = this.bold;
        newValue.italic = this.italic;
        newValue.underlined = this.underlined;
        newValue.strikethrough = this.strikethrough;
        newValue.obfuscated = this.obfuscated;
        newValue.color = this.color;
        return newValue;
    };
    return Snippet;
}());
exports.Snippet = Snippet;


/***/ }),

/***/ "./src/components/CommandTemplatesController.tsx":
/*!*******************************************************!*\
  !*** ./src/components/CommandTemplatesController.tsx ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var templates_1 = __webpack_require__(/*! ../data/templates */ "./src/data/templates.tsx");
// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
var CommandTemplatesController = /** @class */ (function (_super) {
    __extends(CommandTemplatesController, _super);
    function CommandTemplatesController(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    CommandTemplatesController.prototype.render = function () {
        return (React.createElement("div", null, templates_1.templates.map(function (template, index) {
            return (React.createElement("label", { key: "command-template-" + index },
                React.createElement("input", { type: "radio", name: "mcj-type", value: template.id }),
                template.id));
        })));
    };
    return CommandTemplatesController;
}(React.Component));
exports.CommandTemplatesController = CommandTemplatesController;


/***/ }),

/***/ "./src/components/InlineSnippetController.tsx":
/*!****************************************************!*\
  !*** ./src/components/InlineSnippetController.tsx ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var Snippet_1 = __webpack_require__(/*! ../classes/Snippet */ "./src/classes/Snippet.tsx");
// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
var InlineSnippetController = /** @class */ (function (_super) {
    __extends(InlineSnippetController, _super);
    function InlineSnippetController(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            quickAction: "*"
        };
        _this.changeText = _this.changeText.bind(_this);
        _this.updateField = _this.updateField.bind(_this);
        _this.handleQuickActions = _this.handleQuickActions.bind(_this);
        return _this;
    }
    InlineSnippetController.prototype.changeText = function (event) {
        this.updateField("text", event.target.value);
    };
    InlineSnippetController.prototype.updateField = function (field, value) {
        var newSnippet = this.props.snippet.copy();
        newSnippet[field] = value;
        this.props.updateSnippet(newSnippet);
    };
    InlineSnippetController.prototype.handleQuickActions = function (event) {
        var target = event.target;
        var value = target.value;
        if (value != "*") {
            this.updateField(value, !this.props.snippet[value]);
        }
    };
    InlineSnippetController.prototype.render = function () {
        var _this = this;
        switch (+this.props.snippet.type) {
            case Snippet_1.SnippetType.text:
                return [
                    React.createElement("div", null,
                        React.createElement("input", { value: this.props.snippet.text, onChange: this.changeText }),
                        React.createElement("button", { onClick: function () { _this.props.editSnippet(_this.props.snippet); } }, "\u270F\uFE0F"),
                        React.createElement("br", null),
                        React.createElement("select", { name: "quick-actions", value: this.state.quickAction, onChange: this.handleQuickActions },
                            React.createElement("option", { value: "*" }, "Quick Actions..."),
                            React.createElement("option", { value: "bold" }, this.props.snippet.bold ? "Remove Bold" : "Add Bold"),
                            React.createElement("option", { value: "italic" }, this.props.snippet.italic ? "Remove Italic" : "Add Italic"),
                            React.createElement("option", { value: "underlined" }, this.props.snippet.underlined ? "Remove Underline" : "Add Underline"),
                            React.createElement("option", { value: "strikethrough" }, this.props.snippet.strikethrough ? "Remove Strikethrough" : "Add Strikethrough"),
                            React.createElement("option", { value: "obfuscated" }, this.props.snippet.obfuscated ? "Remove Obfuscation" : "Add Obfuscation")))
                ];
            case Snippet_1.SnippetType.lineBreak:
                return React.createElement("span", null,
                    "\u23CE",
                    React.createElement("br", null));
            default:
                return React.createElement("span", null,
                    "error ",
                    React.createElement("button", { onClick: function () { _this.props.editSnippet(_this.props.snippet); } }, "\u270F\uFE0F"));
        }
    };
    return InlineSnippetController;
}(React.Component));
exports.InlineSnippetController = InlineSnippetController;


/***/ }),

/***/ "./src/components/SnippetDetailController.tsx":
/*!****************************************************!*\
  !*** ./src/components/SnippetDetailController.tsx ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var Snippet_1 = __webpack_require__(/*! ../classes/Snippet */ "./src/classes/Snippet.tsx");
// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
var SnippetDetailController = /** @class */ (function (_super) {
    __extends(SnippetDetailController, _super);
    function SnippetDetailController(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        _this.changeText = _this.changeText.bind(_this);
        _this.changeSnippetType = _this.changeSnippetType.bind(_this);
        return _this;
    }
    SnippetDetailController.prototype.changeText = function (event) {
        var newSnippet = this.props.snippet.copy();
        newSnippet.text = event.target.value;
        this.props.updateSnippet(newSnippet);
    };
    SnippetDetailController.prototype.changeSnippetType = function (event) {
        var value = event.target.value;
        var newSnippet = this.props.snippet.copy();
        newSnippet.type = value;
        this.props.updateSnippet(newSnippet);
    };
    SnippetDetailController.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("select", { onChange: this.changeSnippetType, value: this.props.snippet.type },
                React.createElement("option", { value: Snippet_1.SnippetType.text }, "Plain Text"),
                React.createElement("option", { value: Snippet_1.SnippetType.selector }, "Selector")),
            React.createElement("input", { value: this.props.snippet.text, onChange: this.changeText }),
            React.createElement("button", { onClick: function () { _this.props.stopEditing(false); } }, "Cancel"),
            React.createElement("button", { onClick: function () { _this.props.stopEditing(true); } }, "Save")));
    };
    return SnippetDetailController;
}(React.Component));
exports.SnippetDetailController = SnippetDetailController;


/***/ }),

/***/ "./src/components/Tellraw.tsx":
/*!************************************!*\
  !*** ./src/components/Tellraw.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var Snippet_1 = __webpack_require__(/*! ../classes/Snippet */ "./src/classes/Snippet.tsx");
var InlineSnippetController_1 = __webpack_require__(/*! ./InlineSnippetController */ "./src/components/InlineSnippetController.tsx");
var CommandTemplatesController_1 = __webpack_require__(/*! ./CommandTemplatesController */ "./src/components/CommandTemplatesController.tsx");
var helpers_1 = __webpack_require__(/*! ../helpers */ "./src/helpers/index.ts");
var SnippetDetailController_1 = __webpack_require__(/*! ./SnippetDetailController */ "./src/components/SnippetDetailController.tsx");
// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
var Tellraw = /** @class */ (function (_super) {
    __extends(Tellraw, _super);
    function Tellraw(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            snippets: new Array(),
            editing: null,
            compiled: ""
        };
        _this.startEditing = _this.startEditing.bind(_this);
        _this.updateEditing = _this.updateEditing.bind(_this);
        _this.stopEditing = _this.stopEditing.bind(_this);
        _this.addTextSnippet = _this.addTextSnippet.bind(_this);
        _this.addLineBreak = _this.addLineBreak.bind(_this);
        _this.addSnippet = _this.addSnippet.bind(_this);
        _this.updateSnippet = _this.updateSnippet.bind(_this);
        _this.recompile = _this.recompile.bind(_this);
        _this.editor = _this.editor.bind(_this);
        _this.listView = _this.listView.bind(_this);
        _this.mainView = _this.mainView.bind(_this);
        return _this;
    }
    /**
     * Start editing a snippet.
     *
     * @param snippet The snippet to start editing
     */
    Tellraw.prototype.startEditing = function (snippet) {
        this.setState({ editing: snippet });
    };
    /**
     * Update the snippet being edited without propagating it to the
     * main snippet list.
     *
     * @param snippet The new snippet state
     */
    Tellraw.prototype.updateEditing = function (snippet) {
        this.setState({ editing: snippet });
    };
    /**
     * Stop editing a snippet.
     *
     * @param save Whether to save the new snippet state back to the main snippet list.
     */
    Tellraw.prototype.stopEditing = function (save) {
        if (save && this.state.editing !== null) {
            this.updateSnippet(this.state.editing);
        }
        this.setState({ editing: null });
    };
    Tellraw.prototype.addTextSnippet = function () {
        var snip = new Snippet_1.Snippet(null);
        snip.type = Snippet_1.SnippetType.text;
        snip.text = prompt("Enter text:");
        this.addSnippet(snip);
    };
    Tellraw.prototype.addLineBreak = function () {
        var snip = new Snippet_1.Snippet(null);
        snip.type = Snippet_1.SnippetType.lineBreak;
        snip.text = "\n";
        this.addSnippet(snip);
    };
    Tellraw.prototype.addSnippet = function (newSnippet) {
        var updated = this.state.snippets.concat([newSnippet]);
        this.setState({ snippets: updated });
        this.recompile(updated);
    };
    Tellraw.prototype.updateSnippet = function (newSnippet) {
        var updatedSnippets = this.state.snippets.map(function (currentSnippet) {
            if (currentSnippet.id === newSnippet.id) {
                return newSnippet;
            }
            else {
                return currentSnippet;
            }
        });
        this.setState({ snippets: updatedSnippets });
        this.recompile(updatedSnippets);
    };
    Tellraw.prototype.recompile = function (snippets) {
        if (snippets === void 0) { snippets = null; }
        if (snippets === null)
            snippets = this.state.snippets;
        this.setState({ compiled: helpers_1.compile(snippets) });
    };
    Tellraw.prototype.editor = function () {
        return React.createElement(SnippetDetailController_1.SnippetDetailController, { snippet: this.state.editing, updateSnippet: this.updateEditing, stopEditing: this.stopEditing });
    };
    Tellraw.prototype.listView = function () {
        var _this = this;
        return (React.createElement("div", null,
            this.state.snippets.map(function (s) {
                return React.createElement(InlineSnippetController_1.InlineSnippetController, { key: s.id, snippet: s, updateSnippet: _this.updateSnippet, editSnippet: _this.startEditing });
            }),
            React.createElement("button", { onClick: this.addTextSnippet }, "Add"),
            React.createElement("button", { onClick: this.addLineBreak }, "New Line")));
    };
    Tellraw.prototype.mainView = function () {
        if (this.state.editing === null) {
            return this.listView();
        }
        else {
            return this.editor();
        }
    };
    Tellraw.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("label", null,
                "Player and Command",
                React.createElement("input", null)),
            React.createElement("br", null),
            React.createElement(CommandTemplatesController_1.CommandTemplatesController, null),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("hr", null),
            React.createElement("br", null),
            React.createElement("br", null),
            this.mainView(),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("span", null, this.state.compiled)));
    };
    return Tellraw;
}(React.Component));
exports.default = Tellraw;


/***/ }),

/***/ "./src/data/templates.tsx":
/*!********************************!*\
  !*** ./src/data/templates.tsx ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MOUSE_ACTION_HOVER = "MA_HOVER";
exports.MOUSE_ACTION_CLICK = "MA_CLICK";
exports.MOUSE_ACTION_INSERTION = "MA_INSERTION";
exports.templates = [
    {
        id: "tellraw",
        command: "/tellraw @p %s",
        version: "1.7",
        formatType: "standardjson",
        mouseActionOptions: [exports.MOUSE_ACTION_HOVER, exports.MOUSE_ACTION_CLICK, exports.MOUSE_ACTION_INSERTION]
    },
    {
        id: "execute_tellraw",
        command: "/execute @a ~ ~ ~ tellraw @p %s",
        version: "1.8",
        formatType: "standardjson",
        mouseActionOptions: [exports.MOUSE_ACTION_HOVER, exports.MOUSE_ACTION_CLICK, exports.MOUSE_ACTION_INSERTION]
    },
    {
        id: "title",
        command: "/title @a title %s",
        version: "1.8",
        formatType: "standardjson",
        mouseActionOptions: []
    },
    {
        id: "subtitle",
        command: "/title @a subtitle %s",
        version: "1.8",
        formatType: "standardjson",
        mouseActionOptions: []
    },
    {
        id: "actionbar",
        command: "/title @a actionbar %s",
        version: "1.11",
        formatType: "standardjson",
        mouseActionOptions: []
    },
    {
        id: "sign_item",
        command: '/give @p sign 1 0 {BlockEntityTag:{%s,id:"Sign"}}',
        version: "1.8",
        formatType: "signset",
        mouseActionOptions: []
    },
    {
        id: "sign_block",
        command: "/blockdata [x] [y] [z] {%s}",
        version: "1.8",
        formatType: "signset",
        mouseActionOptions: []
    },
    {
        id: "book",
        command: "/give @p written_book{pages:%s,title:CustomBook,author:Player}",
        version: "1.13",
        formatType: "bookarray",
        mouseActionOptions: [exports.MOUSE_ACTION_HOVER, exports.MOUSE_ACTION_CLICK, exports.MOUSE_ACTION_INSERTION]
    }
];


/***/ }),

/***/ "./src/helpers/index.ts":
/*!******************************!*\
  !*** ./src/helpers/index.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Snippet_1 = __webpack_require__(/*! ../classes/Snippet */ "./src/classes/Snippet.tsx");
function compile(snippets) {
    var results = Array();
    results.push("");
    for (var _i = 0, snippets_1 = snippets; _i < snippets_1.length; _i++) {
        var snippet = snippets_1[_i];
        var pending = {};
        if (snippet.type == Snippet_1.SnippetType.text || snippet.type == Snippet_1.SnippetType.lineBreak) {
            pending["text"] = snippet.text;
        }
        if (snippet.type == Snippet_1.SnippetType.selector) {
            pending["selector"] = snippet.selector;
        }
        /* Style Transfer */
        if (snippet.bold)
            pending["bold"] = true;
        if (snippet.italic)
            pending["italic"] = true;
        if (snippet.underlined)
            pending["underlined"] = true;
        if (snippet.strikethrough)
            pending["strikethrough"] = true;
        if (snippet.obfuscated)
            pending["obfuscated"] = true;
        if (snippet.color != Snippet_1.Color.none)
            pending["color"] = snippet.color;
        results.push(pending);
    }
    return "tellraw @a " + JSON.stringify(results);
}
exports.compile = compile;


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var ReactDOM = __webpack_require__(/*! react-dom */ "react-dom");
var Tellraw_1 = __webpack_require__(/*! ./components/Tellraw */ "./src/components/Tellraw.tsx");
ReactDOM.render(React.createElement(Tellraw_1.default, null), document.getElementById("app"));


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map