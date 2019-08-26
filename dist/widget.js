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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ping */
/* harmony export (immutable) */ __webpack_exports__["a"] = prechecker;
function ping() {
  return 'pong';
}
function prechecker(n) {
  var json = {
    0: "OK",
    1: "INVALID_TRANSACTION",
    2: "PAYER_ACCOUNT_NOT_FOUND",
    3: "INVALID_NODE_ACCOUNT",
    4: "TRANSACTION_EXPIRED",
    5: "INVALID_TRANSACTION_START",
    6: "INVALID_TRANSACTION_DURATION",
    7: "INVALID_SIGNATURE",
    8: "MEMO_TOO_LONG",
    9: "INSUFFICIENT_TX_FEE",
    10: "INSUFFICIENT_PAYER_BALANCE",
    11: "DUPLICATE_TRANSACTION",
    12: "BUSY",
    13: "NOT_SUPPORTED",
    14: "INVALID_FILE_ID",
    15: "INVALID_ACCOUNT_ID",
    16: "INVALID_CONTRACT_ID",
    17: "INVALID_TRANSACTION_ID",
    18: "RECEIPT_NOT_FOUND",
    19: "RECORD_NOT_FOUND",
    20: "INVALID_SOLIDITY_ID",
    21: "UNKNOWN",
    22: "SUCCESS",
    23: "FAIL_INVALID",
    24: "FAIL_FEE",
    25: "FAIL_BALANCE",
    26: "KEY_REQUIRED",
    27: "BAD_ENCODING",
    28: "INSUFFICIENT_ACCOUNT_BALANCE",
    29: "INVALID_SOLIDITY_ADDRESS",
    30: "INSUFFICIENT_GAS",
    31: "CONTRACT_SIZE_LIMIT_EXCEEDED",
    32: "LOCAL_CALL_MODIFICATION_EXCEPTION",
    33: "CONTRACT_REVERT_EXECUTED",
    34: "CONTRACT_EXECUTION_EXCEPTION",
    35: "INVALID_RECEIVING_NODE_ACCOUNT",
    36: "MISSING_QUERY_HEADER",
    37: "ACCOUNT_UPDATE_FAILED",
    38: "INVALID_KEY_ENCODING",
    39: "NULL_SOLIDITY_ADDRESS",
    40: "CONTRACT_UPDATE_FAILED",
    41: "INVALID_QUERY_HEADER",
    42: "INVALID_FEE_SUBMITTED",
    43: "INVALID_PAYER_SIGNATURE",
    44: "KEY_NOT_PROVIDED",
    45: "INVALID_EXPIRATION_TIME",
    46: "NO_WACL_KEY",
    47: "FILE_CONTENT_EMPTY",
    48: "INVALID_ACCOUNT_AMOUNTS",
    49: "EMPTY_TRANSACTION_BODY",
    50: "INVALID_TRANSACTION_BODY",
    51: "INVALID_SIGNATURE_TYPE_MISMATCHING_KEY",
    52: "INVALID_SIGNATURE_COUNT_MISMATCHING_KEY",
    53: "EMPTY_CLAIM_BODY",
    54: "EMPTY_CLAIM_HASH",
    55: "EMPTY_CLAIM_KEYS",
    56: "INVALID_CLAIM_HASH_SIZE",
    57: "EMPTY_QUERY_BODY",
    58: "EMPTY_CLAIM_QUERY",
    59: "CLAIM_NOT_FOUND",
    60: "ACCOUNT_ID_DOES_NOT_EXIST",
    61: "CLAIM_ALREADY_EXISTS",
    62: "INVALID_FILE_WACL",
    63: "SERIALIZATION_FAILED",
    64: "TRANSACTION_OVERSIZE",
    65: "TRANSACTION_TOO_MANY_LAYERS",
    66: "CONTRACT_DELETED",
    67: "PLATFORM_NOT_ACTIVE",
    68: "KEY_PREFIX_MISMATCH",
    69: "PLATFORM_TRANSACTION_NOT_CREATED",
    70: "INVALID_RENEWAL_PERIOD",
    71: "INVALID_PAYER_ACCOUNT_ID",
    72: "ACCOUNT_DELETED",
    73: "FILE_DELETED",
    74: "ACCOUNT_REPEATED_IN_ACCOUNT_AMOUNTS",
    75: "SETTING_NEGATIVE_ACCOUNT_BALANCE",
    76: "OBTAINER_REQUIRED",
    77: "OBTAINER_SAME_CONTRACT_ID",
    78: "OBTAINER_DOES_NOT_EXIST",
    79: "MODIFYING_IMMUTABLE_CONTRACT",
    80: "FILE_SYSTEM_EXCEPTION",
    81: "AUTORENEW_DURATION_NOT_IN_RANGE",
    82: "ERROR_DECODING_BYTESTRING",
    83: "CONTRACT_FILE_EMPTY",
    84: "CONTRACT_BYTECODE_EMPTY",
    85: "INVALID_INITIAL_BALANCE",
    86: "INVALID_RECEIVE_RECORD_THRESHOLD",
    87: "INVALID_SEND_RECORD_THRESHOLD",
    88: "ACCOUNT_IS_NOT_GENESIS_ACCOUNT"
  };
  return json[n];
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getmodalContent;
/* harmony export (immutable) */ __webpack_exports__["a"] = constructConfiguration;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(2);

var production = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].production;
var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
    time = today.getHours() + ":" + today.getMinutes(),
    dateTime = date + ' ' + time,
    timestamp = new Date(dateTime).getTime();
function getmodalContent() {
  return '<div class="popup_outer_wrap">\n' + '\t  \t<div class="popup_wrap">\n' + '\t  \t\t<div class="popup_header">Setup Task <a href="javascript:void(0)" class="popup_close" id="popup-close-btn">x</a></div>\n' + '\n' + '\t  \t\t<div class="popup_inner">\n' + '\t  \t\t\t<div class="popup_inner_left">\n' + '\n' + '\t  \t\t\t\t<form action="/action_page.php" class="popup_form">\n' + '\t\t\t\t\t  <input type="checkbox" onchange= "imgchangeFunction()" id="img_one" class="popup_chkbox toggle__input" name="img_chkbox" value="img_one">\n' + '\t\t\t\t\t  <label for="img_one">&nbsp; Install Hedera Wallet</label>\n' + '\t\t\t\t\t  <input type="checkbox" onchange= "imgchangeFunction()" id="img_two" class="popup_chkbox toggle__input" name="img_chkbox" value="img_two">\n' + '\t\t\t\t\t  <label for="img_two">&nbsp; "Pair your Account"</label>\n' + '\n' + '\t\t\t\t\t  <input type="checkbox" onchange= "imgchangeFunction()" id="img_three" class="popup_chkbox toggle__input" name="img_chkbox" value="img_three">\n' + '\t\t\t\t\t  <label for="img_three">&nbsp; "Allow Payment Requests"</label>\n' + '\n' + '\t\t\t\t\t  <input type="checkbox" onchange= "imgchangeFunction()" id="img_four" class="popup_chkbox toggle__input" name="img_chkbox" value="img_four">\n' + '\t\t\t\t\t  <label for="img_four">&nbsp; "Get some HBAR"</label>\n' + '\t\t\t\t\t</form>\n' + '\n' + '\t\t\t\t\t<div class="popup_logo">\n' + '\t\t\t\t\t\t<div class="logo_txt">Powered by</div>\n' + '\t\t\t\t\t\t<div class="logo_icon"><img src="//api.hashingsystems.com/img/popup_logo.png"></div>\n' + '\t\t\t\t\t</div>\n' + '\t  \t\t\t\t\n' + '\t  \t\t\t</div>\n' + '\t  \t\t\t<div class="popup_inner_right">\n' + '\n' + '\t  \t\t\t\t<div class="popup_img_sec">\n' + '\t  \t\t\t\t\t<img class="img_one" src="//api.hashingsystems.com/img/img_one.png">\n' + '\t  \t\t\t\t\t<img style="display: none;" class="img_two" src="//api.hashingsystems.com/img/img_two.png">\n' + '\t  \t\t\t\t\t<img style="display: none;" class="img_three" src="//api.hashingsystems.com/img/img_three.png">\n' + '\t  \t\t\t\t\t<img style="display: none;" class="img_four" src="//api.hashingsystems.com/img/img_four.png">\n' + '\t  \t\t\t\t</div>\n' + '\t  \t\t\t\t<div class="txt_wrap">\n' + '\t\t  \t\t\t\t<div class="txt_header">Lets get you started!</div>\n' + '\t\t  \t\t\t\t<div class="txt_content">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et </div>\n' + '\t\t  \t\t\t\t<div class="popup_btn">\n' + '\t\t  \t\t\t\t\t<a href="">I\'m Ready</a>\n' + '\t\t  \t\t\t\t</div>\n' + '\t\t  \t\t\t</div>\n' + '\t  \t\t\t\t\n' + '\t  \t\t\t</div>\n' + '\t  \t\t</div>\n' + '\t  \t</div>';
}
function constructConfiguration() {
  return {
    paymentserver: production ? "https://mps.hashingsystems.com" : 'http://localhost:9999',
    extensionid: "ligpaondaabclfigagcifobaelemiena",
    error: "/no-extension",
    type: "article",
    time: Date.now(),
    redirect: '{ "nonPayingAccount": "/insufficient-amount/", "noAccount": "/account-not-paired/", "homePage": "/"}',
    submissionnode: "0.0.11",
    memo: Date.now(),
    recipientlist: '[{ "to": "0.0.99", "tinybars": "1666667" }]',
    contentid: '79',
    attrID: 'article-1',
    timestamp: timestamp,

    /*this might make a good default id for the content*/
    id: window.location.pathname
  };
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var config = {
  production: true
};
/* harmony default export */ __webpack_exports__["a"] = (config);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = detectmob;
/* harmony export (immutable) */ __webpack_exports__["a"] = detect;
/* harmony export (immutable) */ __webpack_exports__["c"] = extendObject;
/* harmony export (immutable) */ __webpack_exports__["d"] = isChrome;
function detectmob() {
  return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i);
}
function detect(extensionId, notInstalledCallback, installedCallback) {
  var img = new Image();
  console.log(extensionId);
  img.onerror = notInstalledCallback;
  img.onload = installedCallback;
  img.src = 'chrome-extension://' + extensionId + '/icons/icon16.png';
}
function extendObject(a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) a[key] = b[key];
  }

  return a;
}
function isChrome() {
  return 'chrome' in window;
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__methods__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__general__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__apis__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__libraries__ = __webpack_require__(3);




 // enlist all methods supported by API (e.g. `mw('event', 'user-login');`)

var supportedAPI = __WEBPACK_IMPORTED_MODULE_1__methods__["a" /* methods */]();
/**
 * The main entry of the application
 */

var configurations = __WEBPACK_IMPORTED_MODULE_2__general__["a" /* constructConfiguration */]();

function app(window) {
  /* *
    * all methods that were called till now and stored in queue
    * needs to be called now
    * */
  var globalObject = window[window['HASH-JS']];
  var queue = globalObject.q;
  console.log(queue);

  if (queue) {
    for (var i = 0; i < queue.length; i++) {
      configurations = __WEBPACK_IMPORTED_MODULE_4__libraries__["c" /* extendObject */](configurations, queue[i][1]);
      var method = queue[i][0];
      var callback = void 0;

      if (typeof queue[i][1] === 'function') {
        callback = queue[i][1];
      } else if (typeof queue[i][queue[0].length - 1] === 'function') {
        callback = queue[i][queue[0].length - 1];
      } else {
        callback = false;
      }

      console.log(supportedAPI.indexOf(method));
      if (supportedAPI.indexOf(method) === -1) throw Error("Method ".concat(method, " is not supported"));
      __WEBPACK_IMPORTED_MODULE_3__apis__[method](configurations, callback);
    }
  } // override temporary (until the app loaded) handler
  // for widget's API calls


  globalObject = __WEBPACK_IMPORTED_MODULE_3__apis__;
  globalObject.configurations = configurations;
}

app(window);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = methods;
function methods() {
  return [//object creation methods
  'createhederaobject', 'createcontractobject', //main initial method
  'init', //transaction related methods
  'makepayment', 'makeTransaction', 'checktransaction', //modal related methods
  'getmodal'];
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["test"] = test;
/* harmony export (immutable) */ __webpack_exports__["createHederaObject"] = createHederaObject;
/* harmony export (immutable) */ __webpack_exports__["createContractObject"] = createContractObject;
/* harmony export (immutable) */ __webpack_exports__["checkTransaction"] = checkTransaction;
/* harmony export (immutable) */ __webpack_exports__["init"] = init;
/* harmony export (immutable) */ __webpack_exports__["getmodal"] = getmodal;
/* harmony export (immutable) */ __webpack_exports__["makeTransaction"] = makeTransaction;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__general__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modal__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__libraries__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services__ = __webpack_require__(0);





function test() {
  return 'ting';
}
function createHederaObject(params, callback) {
  var object = ['submissionnode', 'paymentserver', 'recipientlist', 'contentid', 'type', 'memo', 'extensionid', 'redirect', 'time'];
  var Hederaobject = '<hedera-micropayment ';

  for (var i in object) {
    var node = object[i];

    if (params.hasOwnProperty(node)) {
      Hederaobject += "data-" + node + "= '" + params[node] + "' , " + "\n";
    }
  }

  Hederaobject += '></hedera-micropayment>';
  var body = document.getElementById(params['attrID']);
  body.innerHTML += Hederaobject;
  callback(null, Hederaobject);
}
function createContractObject(params, callback) {
  var __construct = ['contractid', 'maximum', 'paymentserver', 'params', 'memo', 'abi', 'redirect', 'extensionid'];
  var object = {
    contractid: '0.0.1111',
    maximum: '422342343',
    paymentserver: params.paymentserver,
    params: ["869", "100000000", "216", "253", "27", "0x226b08976ad0dd982aeb6b21a44f3eacae579569c34e71725aff801a2fe68739", "0x333f991fa3a870575f819569e9f72a771ea790078d448cc8789120ee14abf3c5"],
    memo: 'a4a7c4329aab4b1fac474ff6f93d858c',
    abi: JSON.stringify({
      "constant": false,
      "inputs": [{
        "name": "propertyID",
        "type": "uint24"
      }, {
        "name": "amount",
        "type": "uint256"
      }, {
        "name": "x",
        "type": "uint16"
      }, {
        "name": "y",
        "type": "uint16"
      }, {
        "name": "v",
        "type": "uint8"
      }, {
        "name": "r",
        "type": "bytes32"
      }, {
        "name": "s",
        "type": "bytes32"
      }],
      "name": "buyProperty",
      "outputs": [{
        "name": "",
        "type": "string"
      }],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    }),
    redirect: '{"nonPayingAccount": "/insufficient-amount/","noAccount": "/account-not-paired","homePage": "/"}',
    extensionid: 'pdjjpcolgmmcifijpejkenpbbimedpic'
  };
  console.log(JSON.parse(object.abi));
  var extended = __WEBPACK_IMPORTED_MODULE_2__libraries__["c" /* extendObject */](object, params);
  console.log(extended);
  var Contractobject = '<hedera-contract ';

  for (var i in __construct) {
    var node = __construct[i];

    if (extended.hasOwnProperty(node)) {
      Contractobject += "data-" + node + "= '" + extended[node] + "' ";
    }
  }

  Contractobject += '></hedera-contract>';
  console.log(Contractobject);
  var body = document.getElementById(extended['attrID']);
  body.innerHTML += Contractobject;
  callback(null, Contractobject);
}
function checkTransaction(params, callback) {
  var memo_id = params.configuration.memo;
  var url = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].production ? "https://mps.hashingsystems.com" : 'http://localhost:9999';
  var structure = {
    baseurl: url,
    memo_id: memo_id,
    receiver_id: '',
    success: '/success',
    failure: '/payment-failed',
    timeout: 3000,
    limit: 1
  };

  for (var key in params.params) {
    if (params.params.hasOwnProperty(key) && params.params[key]) {
      structure[key] = params.params[key];
    }
  }

  if (structure.receiver_id && structure.memo_id) {
    URL = structure.baseurl + "/check/" + structure.receiver_id + "/" + structure.memo_id;
  } else {
    if (structure.timestamp) URL = structure.baseurl + "/memo/" + structure.memo_id + '?limit=' + structure.limit + '&timestamp=' + structure.timestamp;else URL = structure.baseurl + "/memo/" + structure.memo_id + '?limit=' + structure.limit;
  }

  console.log(structure.timeout); //setTimeout(performRequest(structure), structure.timeout)

  setTimeout(function () {
    performRequest(structure);
  }, structure.timeout);
}
function init(params, callback) {
  var response = {
    accountPaired: false,
    ismobile: null,
    validBrowser: null,
    extensionInstalled: null,
    accessToAccounts: null,
    accountId: null,
    submissionNode: params.submissionnode,
    error: null,
    txn_success: false
  };
  response.validBrowser = __WEBPACK_IMPORTED_MODULE_2__libraries__["d" /* isChrome */]();
  response.ismobile = __WEBPACK_IMPORTED_MODULE_2__libraries__["b" /* detectmob */]();
  __WEBPACK_IMPORTED_MODULE_2__libraries__["a" /* detect */](params.extensionid, function () {
    response.extensionInstalled = false;
    callback(null, response);
  }, function () {
    response.extensionInstalled = true;
    createHederaObject(params, function (err, hobject) {
      if (hobject) {
        var url = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].production ? "https://mps.hashingsystems.com" : 'http://localhost:9999';
        URL = url + "/memo/" + params.memo;
        setTimeout(function () {
          var xhttp = new XMLHttpRequest();

          xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
              if (this.status === 200) {
                var ajaxresp = JSON.parse(this.response);
                console.log(ajaxresp);

                if (ajaxresp.response.length > 0) {
                  console.log(__WEBPACK_IMPORTED_MODULE_4__services__["a" /* prechecker */](ajaxresp.response[0].nodeprecheck));
                  response.accountId = ajaxresp.response[0].sender;
                  response.accountPaired = true;
                  response.accessToAccounts = true;

                  if (ajaxresp.response[0].nodeprecheck === 0) {
                    response.txn_success = true;
                  }

                  response.error = __WEBPACK_IMPORTED_MODULE_4__services__["a" /* prechecker */](ajaxresp.response[0].nodeprecheck);
                  callback(null, response);
                } else {
                  console.log(response);
                  callback(null, response);
                }
              } else {
                response.accountPaired = false;
                response.accessToAccounts = false;
                callback(null, response);
              }
            }
          };

          xhttp.open("GET", URL, true);
          xhttp.send();
        }, 5000);
      } else {
        callback({
          'success': false,
          'message': 'Could not create hedera object'
        }, false);
      }
    }); //callback(null,response);
  });
}
function getmodal() {
  var myContent = __WEBPACK_IMPORTED_MODULE_0__general__["b" /* getmodalContent */]();
  var myModal = new __WEBPACK_IMPORTED_MODULE_1__modal__["Modal"]({
    content: myContent
  });
  myModal.open();
}
function makeTransaction(configuration, callback) {
  var params = {
    transaction_procesing: true,
    transaction_failed: false,
    transaction_success: false
  };
  init(configuration, function (err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);

      if (res) {
        callback(res);
      }
    }
  });
}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Define our constructor
function Modal() {
  // Create global element references
  this.closeButton = null;
  this.modal = null;
  this.overlay = null; // Determine proper prefix

  this.transitionEnd = transitionSelect(); // Define option defaults

  var defaults = {
    autoOpen: false,
    className: 'fade-and-drop',
    closeButton: true,
    content: "",
    maxWidth: 600,
    minWidth: 280,
    overlay: false
  }; // Create options by extending defaults with the passed in arugments

  if (arguments[0] && _typeof(arguments[0]) === "object") {
    this.options = extendDefaults(defaults, arguments[0]);
  }

  if (this.options.autoOpen === true) this.open();
} // Public Methods


Modal.prototype.close = function () {
  var _ = this;

  this.modal.className = this.modal.className.replace(" hash-open", "");
  this.overlay.className = this.overlay.className.replace(" hash-open", "");
  this.modal.addEventListener(this.transitionEnd, function () {
    _.modal.parentNode.removeChild(_.modal);
  });
  this.overlay.addEventListener(this.transitionEnd, function () {
    if (_.overlay.parentNode) _.overlay.parentNode.removeChild(_.overlay);
  });
};

Modal.prototype.open = function () {
  buildOut.call(this);
  initializeEvents.call(this);
  window.getComputedStyle(this.modal).height;
  this.modal.className = this.modal.className + (this.modal.offsetHeight > window.innerHeight ? " hash-open hash-anchored" : " hash-open"); //this.overlay.className = this.overlay.className + " hash-open";

  document.querySelector('.popup_close').onclick = function () {
    document.querySelector('.popup_outer_wrap').style.display = "none";
  };
}; // Private Methods


function buildOut() {
  var content, contentHolder, docFrag;
  /*
   * If content is an HTML string, append the HTML string.
   * If content is a domNode, append its content.
   */

  if (typeof this.options.content === "string") {
    content = this.options.content;
  } else {
    content = this.options.content.innerHTML;
  } // Create a DocumentFragment to build with


  docFrag = document.createDocumentFragment(); // Create modal element

  this.modal = document.createElement("div");
  this.modal.className = "hash-modal " + this.options.className;
  /*this.modal.style.minWidth = this.options.minWidth + "px";
  this.modal.style.maxWidth = this.options.maxWidth + "px";*/
  // If closeButton option is true, add a close button

  if (this.options.closeButton === true) {
    this.closeButton = document.getElementById('popup-close-btn');
  } // Create content area and append to modal


  contentHolder = document.createElement("div");
  contentHolder.className = "hash-content";
  contentHolder.innerHTML = content;
  this.modal.appendChild(contentHolder); // Append modal to DocumentFragment

  docFrag.appendChild(this.modal); // Append DocumentFragment to body

  document.body.appendChild(docFrag);
}

imgchangeFunction = function imgchangeFunction() {
  var chboxs = document.getElementsByName("img_chkbox");
  var var_check = "";
  var img_all = document.getElementsByClassName("img_all");

  for (var i = 0; i < chboxs.length; i++) {
    if (chboxs[i].checked) {
      var_check = var_check.concat(chboxs[i].value);
    }
  }

  if (var_check == 'img_one') {
    document.querySelector('.img_two').style.display = "none";
    document.querySelector('.img_three').style.display = "none";
    document.querySelector('.img_four').style.display = "none";
    document.querySelector('.img_one').style.display = "block";
  }

  if (var_check == 'img_oneimg_two') {
    document.querySelector('.img_one').style.display = "none";
    document.querySelector('.img_three').style.display = "none";
    document.querySelector('.img_four').style.display = "none";
    document.querySelector('.img_two').style.display = "block";
  }

  if (var_check == 'img_oneimg_twoimg_three') {
    document.querySelector('.img_one').style.display = "none";
    document.querySelector('.img_two').style.display = "none";
    document.querySelector('.img_four').style.display = "none";
    document.querySelector('.img_three').style.display = "block";
  }

  if (var_check == 'img_oneimg_twoimg_threeimg_four') {
    document.querySelector('.img_one').style.display = "none";
    document.querySelector('.img_two').style.display = "none";
    document.querySelector('.img_three').style.display = "none";
    document.querySelector('.img_four').style.display = "block";
  }
};

function extendDefaults(source, properties) {
  var property;

  for (property in properties) {
    if (properties.hasOwnProperty(property)) {
      source[property] = properties[property];
    }
  }

  return source;
}

function initializeEvents() {
  if (this.closeButton) {
    this.closeButton.addEventListener('click', this.close.bind(this));
  }

  if (this.overlay) {
    this.overlay.addEventListener('click', this.close.bind(this));
  }
}

function transitionSelect() {
  var el = document.createElement("div");
  if (el.style.WebkitTransition) return "webkitTransitionEnd";
  if (el.style.OTransition) return "oTransitionEnd";
  return 'transitionend';
} //exporting module


module.exports.Modal = Modal;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTQ4MzIwZTZkODdkZDhjMTI0YjEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9nZW5lcmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYnJhcmllcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWV0aG9kcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kYWwuanMiXSwibmFtZXMiOlsicGluZyIsInByZWNoZWNrZXIiLCJuIiwianNvbiIsInByb2R1Y3Rpb24iLCJDb25maWciLCJ0b2RheSIsIkRhdGUiLCJkYXRlIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImdldERhdGUiLCJ0aW1lIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZGF0ZVRpbWUiLCJ0aW1lc3RhbXAiLCJnZXRUaW1lIiwiZ2V0bW9kYWxDb250ZW50IiwiY29uc3RydWN0Q29uZmlndXJhdGlvbiIsInBheW1lbnRzZXJ2ZXIiLCJleHRlbnNpb25pZCIsImVycm9yIiwidHlwZSIsIm5vdyIsInJlZGlyZWN0Iiwic3VibWlzc2lvbm5vZGUiLCJtZW1vIiwicmVjaXBpZW50bGlzdCIsImNvbnRlbnRpZCIsImF0dHJJRCIsImlkIiwid2luZG93IiwibG9jYXRpb24iLCJwYXRobmFtZSIsImNvbmZpZyIsImRldGVjdG1vYiIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIm1hdGNoIiwiZGV0ZWN0IiwiZXh0ZW5zaW9uSWQiLCJub3RJbnN0YWxsZWRDYWxsYmFjayIsImluc3RhbGxlZENhbGxiYWNrIiwiaW1nIiwiSW1hZ2UiLCJjb25zb2xlIiwibG9nIiwib25lcnJvciIsIm9ubG9hZCIsInNyYyIsImV4dGVuZE9iamVjdCIsImEiLCJiIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJpc0Nocm9tZSIsInN1cHBvcnRlZEFQSSIsIm1ldGhvZHMiLCJjb25maWd1cmF0aW9ucyIsImdlbmVyYWwiLCJhcHAiLCJnbG9iYWxPYmplY3QiLCJxdWV1ZSIsInEiLCJpIiwibGVuZ3RoIiwibGlicmFyaWVzIiwibWV0aG9kIiwiY2FsbGJhY2siLCJpbmRleE9mIiwiRXJyb3IiLCJBcGlzIiwidGVzdCIsImNyZWF0ZUhlZGVyYU9iamVjdCIsInBhcmFtcyIsIm9iamVjdCIsIkhlZGVyYW9iamVjdCIsIm5vZGUiLCJib2R5IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsImNyZWF0ZUNvbnRyYWN0T2JqZWN0IiwiX19jb25zdHJ1Y3QiLCJjb250cmFjdGlkIiwibWF4aW11bSIsImFiaSIsIkpTT04iLCJzdHJpbmdpZnkiLCJwYXJzZSIsImV4dGVuZGVkIiwiQ29udHJhY3RvYmplY3QiLCJjaGVja1RyYW5zYWN0aW9uIiwibWVtb19pZCIsImNvbmZpZ3VyYXRpb24iLCJ1cmwiLCJzdHJ1Y3R1cmUiLCJiYXNldXJsIiwicmVjZWl2ZXJfaWQiLCJzdWNjZXNzIiwiZmFpbHVyZSIsInRpbWVvdXQiLCJsaW1pdCIsIlVSTCIsInNldFRpbWVvdXQiLCJwZXJmb3JtUmVxdWVzdCIsImluaXQiLCJyZXNwb25zZSIsImFjY291bnRQYWlyZWQiLCJpc21vYmlsZSIsInZhbGlkQnJvd3NlciIsImV4dGVuc2lvbkluc3RhbGxlZCIsImFjY2Vzc1RvQWNjb3VudHMiLCJhY2NvdW50SWQiLCJzdWJtaXNzaW9uTm9kZSIsInR4bl9zdWNjZXNzIiwiZXJyIiwiaG9iamVjdCIsInhodHRwIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwiYWpheHJlc3AiLCJzZXJ2aWNlcyIsIm5vZGVwcmVjaGVjayIsInNlbmRlciIsIm9wZW4iLCJzZW5kIiwiZ2V0bW9kYWwiLCJteUNvbnRlbnQiLCJteU1vZGFsIiwiTW9kYWwiLCJjb250ZW50IiwibWFrZVRyYW5zYWN0aW9uIiwidHJhbnNhY3Rpb25fcHJvY2VzaW5nIiwidHJhbnNhY3Rpb25fZmFpbGVkIiwidHJhbnNhY3Rpb25fc3VjY2VzcyIsInJlcyIsImNsb3NlQnV0dG9uIiwibW9kYWwiLCJvdmVybGF5IiwidHJhbnNpdGlvbkVuZCIsInRyYW5zaXRpb25TZWxlY3QiLCJkZWZhdWx0cyIsImF1dG9PcGVuIiwiY2xhc3NOYW1lIiwibWF4V2lkdGgiLCJtaW5XaWR0aCIsImFyZ3VtZW50cyIsIm9wdGlvbnMiLCJleHRlbmREZWZhdWx0cyIsInByb3RvdHlwZSIsImNsb3NlIiwiXyIsInJlcGxhY2UiLCJhZGRFdmVudExpc3RlbmVyIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiYnVpbGRPdXQiLCJjYWxsIiwiaW5pdGlhbGl6ZUV2ZW50cyIsImdldENvbXB1dGVkU3R5bGUiLCJoZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJpbm5lckhlaWdodCIsInF1ZXJ5U2VsZWN0b3IiLCJvbmNsaWNrIiwic3R5bGUiLCJkaXNwbGF5IiwiY29udGVudEhvbGRlciIsImRvY0ZyYWciLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiaW1nY2hhbmdlRnVuY3Rpb24iLCJjaGJveHMiLCJnZXRFbGVtZW50c0J5TmFtZSIsInZhcl9jaGVjayIsImltZ19hbGwiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY2hlY2tlZCIsImNvbmNhdCIsInZhbHVlIiwic291cmNlIiwicHJvcGVydGllcyIsInByb3BlcnR5IiwiYmluZCIsImVsIiwiV2Via2l0VHJhbnNpdGlvbiIsIk9UcmFuc2l0aW9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUFBO0FBQU8sU0FBU0EsSUFBVCxHQUFnQjtBQUNuQixTQUFPLE1BQVA7QUFDSDtBQUVNLFNBQVNDLFVBQVQsQ0FBb0JDLENBQXBCLEVBQXVCO0FBQzFCLE1BQUlDLElBQUksR0FBRztBQUFDLE9BQUcsSUFBSjtBQUFVLE9BQUcscUJBQWI7QUFBb0MsT0FBRyx5QkFBdkM7QUFBa0UsT0FBRyxzQkFBckU7QUFBNkYsT0FBRyxxQkFBaEc7QUFBdUgsT0FBRywyQkFBMUg7QUFBdUosT0FBRyw4QkFBMUo7QUFBMEwsT0FBRyxtQkFBN0w7QUFBa04sT0FBRyxlQUFyTjtBQUFzTyxPQUFHLHFCQUF6TztBQUFnUSxRQUFJLDRCQUFwUTtBQUFrUyxRQUFJLHVCQUF0UztBQUErVCxRQUFJLE1BQW5VO0FBQTJVLFFBQUksZUFBL1U7QUFBZ1csUUFBSSxpQkFBcFc7QUFBdVgsUUFBSSxvQkFBM1g7QUFBaVosUUFBSSxxQkFBclo7QUFBNGEsUUFBSSx3QkFBaGI7QUFBMGMsUUFBSSxtQkFBOWM7QUFBbWUsUUFBSSxrQkFBdmU7QUFBMmYsUUFBSSxxQkFBL2Y7QUFBc2hCLFFBQUksU0FBMWhCO0FBQXFpQixRQUFJLFNBQXppQjtBQUFvakIsUUFBSSxjQUF4akI7QUFBd2tCLFFBQUksVUFBNWtCO0FBQXdsQixRQUFJLGNBQTVsQjtBQUE0bUIsUUFBSSxjQUFobkI7QUFBZ29CLFFBQUksY0FBcG9CO0FBQW9wQixRQUFJLDhCQUF4cEI7QUFBd3JCLFFBQUksMEJBQTVyQjtBQUF3dEIsUUFBSSxrQkFBNXRCO0FBQWd2QixRQUFJLDhCQUFwdkI7QUFBb3hCLFFBQUksbUNBQXh4QjtBQUE2ekIsUUFBSSwwQkFBajBCO0FBQTYxQixRQUFJLDhCQUFqMkI7QUFBaTRCLFFBQUksZ0NBQXI0QjtBQUF1NkIsUUFBSSxzQkFBMzZCO0FBQW04QixRQUFJLHVCQUF2OEI7QUFBZytCLFFBQUksc0JBQXArQjtBQUE0L0IsUUFBSSx1QkFBaGdDO0FBQXloQyxRQUFJLHdCQUE3aEM7QUFBdWpDLFFBQUksc0JBQTNqQztBQUFtbEMsUUFBSSx1QkFBdmxDO0FBQWduQyxRQUFJLHlCQUFwbkM7QUFBK29DLFFBQUksa0JBQW5wQztBQUF1cUMsUUFBSSx5QkFBM3FDO0FBQXNzQyxRQUFJLGFBQTFzQztBQUF5dEMsUUFBSSxvQkFBN3RDO0FBQW12QyxRQUFJLHlCQUF2dkM7QUFBa3hDLFFBQUksd0JBQXR4QztBQUFnekMsUUFBSSwwQkFBcHpDO0FBQWcxQyxRQUFJLHdDQUFwMUM7QUFBODNDLFFBQUkseUNBQWw0QztBQUE2NkMsUUFBSSxrQkFBajdDO0FBQXE4QyxRQUFJLGtCQUF6OEM7QUFBNjlDLFFBQUksa0JBQWorQztBQUFxL0MsUUFBSSx5QkFBei9DO0FBQW9oRCxRQUFJLGtCQUF4aEQ7QUFBNGlELFFBQUksbUJBQWhqRDtBQUFxa0QsUUFBSSxpQkFBemtEO0FBQTRsRCxRQUFJLDJCQUFobUQ7QUFBNm5ELFFBQUksc0JBQWpvRDtBQUF5cEQsUUFBSSxtQkFBN3BEO0FBQWtyRCxRQUFJLHNCQUF0ckQ7QUFBOHNELFFBQUksc0JBQWx0RDtBQUEwdUQsUUFBSSw2QkFBOXVEO0FBQTZ3RCxRQUFJLGtCQUFqeEQ7QUFBcXlELFFBQUkscUJBQXp5RDtBQUFnMEQsUUFBSSxxQkFBcDBEO0FBQTIxRCxRQUFJLGtDQUEvMUQ7QUFBbTRELFFBQUksd0JBQXY0RDtBQUFpNkQsUUFBSSwwQkFBcjZEO0FBQWk4RCxRQUFJLGlCQUFyOEQ7QUFBdzlELFFBQUksY0FBNTlEO0FBQTQrRCxRQUFJLHFDQUFoL0Q7QUFBdWhFLFFBQUksa0NBQTNoRTtBQUErakUsUUFBSSxtQkFBbmtFO0FBQXdsRSxRQUFJLDJCQUE1bEU7QUFBeW5FLFFBQUkseUJBQTduRTtBQUF3cEUsUUFBSSw4QkFBNXBFO0FBQTRyRSxRQUFJLHVCQUFoc0U7QUFBeXRFLFFBQUksaUNBQTd0RTtBQUFnd0UsUUFBSSwyQkFBcHdFO0FBQWl5RSxRQUFJLHFCQUFyeUU7QUFBNHpFLFFBQUkseUJBQWgwRTtBQUEyMUUsUUFBSSx5QkFBLzFFO0FBQTAzRSxRQUFJLGtDQUE5M0U7QUFBazZFLFFBQUksK0JBQXQ2RTtBQUF1OEUsUUFBSTtBQUEzOEUsR0FBWDtBQUNDLFNBQU9BLElBQUksQ0FBQ0QsQ0FBRCxDQUFYO0FBQ0osQzs7Ozs7OztBQ1BEO0FBQUE7QUFBQTtBQUFBO0FBRUEsSUFBSUUsVUFBVSxHQUFHQyx3REFBQSxDQUFlRCxVQUFoQztBQUVBLElBQUlFLEtBQUssR0FBRyxJQUFJQyxJQUFKLEVBQVo7QUFBQSxJQUNJQyxJQUFJLEdBQUdGLEtBQUssQ0FBQ0csV0FBTixLQUFzQixHQUF0QixJQUE2QkgsS0FBSyxDQUFDSSxRQUFOLEtBQW1CLENBQWhELElBQXFELEdBQXJELEdBQTJESixLQUFLLENBQUNLLE9BQU4sRUFEdEU7QUFBQSxJQUVJQyxJQUFJLEdBQUdOLEtBQUssQ0FBQ08sUUFBTixLQUFtQixHQUFuQixHQUF5QlAsS0FBSyxDQUFDUSxVQUFOLEVBRnBDO0FBQUEsSUFHSUMsUUFBUSxHQUFHUCxJQUFJLEdBQUcsR0FBUCxHQUFhSSxJQUg1QjtBQUFBLElBSUlJLFNBQVMsR0FBRyxJQUFJVCxJQUFKLENBQVNRLFFBQVQsRUFBbUJFLE9BQW5CLEVBSmhCO0FBTU8sU0FBU0MsZUFBVCxHQUEyQjtBQUM5QixTQUFPLHFDQUNQLGtDQURPLEdBRVAsa0lBRk8sR0FHUCxJQUhPLEdBSVAscUNBSk8sR0FLUCw0Q0FMTyxHQU1QLElBTk8sR0FPUCxtRUFQTyxHQVFQLHlKQVJPLEdBU1AseUVBVE8sR0FVUCx5SkFWTyxHQVdQLHVFQVhPLEdBWVAsSUFaTyxHQWFQLDZKQWJPLEdBY1AsOEVBZE8sR0FlUCxJQWZPLEdBZ0JQLDJKQWhCTyxHQWlCUCxvRUFqQk8sR0FrQlAscUJBbEJPLEdBbUJQLElBbkJPLEdBb0JQLHNDQXBCTyxHQXFCUCxzREFyQk8sR0FzQlAsb0dBdEJPLEdBdUJQLG9CQXZCTyxHQXdCUCxnQkF4Qk8sR0F5QlAsb0JBekJPLEdBMEJQLDZDQTFCTyxHQTJCUCxJQTNCTyxHQTRCUCwyQ0E1Qk8sR0E2QlAsc0ZBN0JPLEdBOEJQLDZHQTlCTyxHQStCUCxpSEEvQk8sR0FnQ1AsK0dBaENPLEdBaUNQLHNCQWpDTyxHQWtDUCxzQ0FsQ08sR0FtQ1AscUVBbkNPLEdBb0NQLHlKQXBDTyxHQXFDUCx5Q0FyQ08sR0FzQ1AsNkNBdENPLEdBdUNQLHdCQXZDTyxHQXdDUCxzQkF4Q08sR0F5Q1AsZ0JBekNPLEdBMENQLG9CQTFDTyxHQTJDUCxrQkEzQ08sR0E0Q1AsY0E1Q0E7QUE2Q0g7QUFFTSxTQUFTQyxzQkFBVCxHQUFpQztBQUNwQyxTQUFPO0FBQ0hDLGlCQUFhLEVBQUVoQixVQUFVLEdBQUcsZ0NBQUgsR0FBc0MsdUJBRDVEO0FBRUhpQixlQUFXLEVBQUUsa0NBRlY7QUFHSEMsU0FBSyxFQUFFLGVBSEo7QUFJSEMsUUFBSSxFQUFFLFNBSkg7QUFLSFgsUUFBSSxFQUFFTCxJQUFJLENBQUNpQixHQUFMLEVBTEg7QUFNSEMsWUFBUSxFQUFFLHNHQU5QO0FBT0hDLGtCQUFjLEVBQUUsUUFQYjtBQVFIQyxRQUFJLEVBQUVwQixJQUFJLENBQUNpQixHQUFMLEVBUkg7QUFTSEksaUJBQWEsRUFBRSw2Q0FUWjtBQVVIQyxhQUFTLEVBQUUsSUFWUjtBQVdIQyxVQUFNLEVBQUUsV0FYTDtBQVlIZCxhQUFTLEVBQUVBLFNBWlI7O0FBYUg7QUFDQWUsTUFBRSxFQUFFQyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDO0FBZGpCLEdBQVA7QUFnQkgsQzs7Ozs7OztBQzNFRCxJQUFNQyxNQUFNLEdBQUc7QUFDVi9CLFlBQVUsRUFBRztBQURILENBQWY7QUFJZStCLCtEQUFmLEU7Ozs7Ozs7QUNKQTtBQUFBO0FBQUE7QUFBQTtBQUFPLFNBQVNDLFNBQVQsR0FBcUI7QUFDeEIsU0FBUUMsU0FBUyxDQUFDQyxTQUFWLENBQW9CQyxLQUFwQixDQUEwQixVQUExQixLQUNERixTQUFTLENBQUNDLFNBQVYsQ0FBb0JDLEtBQXBCLENBQTBCLFFBQTFCLENBREMsSUFFREYsU0FBUyxDQUFDQyxTQUFWLENBQW9CQyxLQUFwQixDQUEwQixTQUExQixDQUZDLElBR0RGLFNBQVMsQ0FBQ0MsU0FBVixDQUFvQkMsS0FBcEIsQ0FBMEIsT0FBMUIsQ0FIQyxJQUlERixTQUFTLENBQUNDLFNBQVYsQ0FBb0JDLEtBQXBCLENBQTBCLE9BQTFCLENBSkMsSUFLREYsU0FBUyxDQUFDQyxTQUFWLENBQW9CQyxLQUFwQixDQUEwQixhQUExQixDQUxDLElBTURGLFNBQVMsQ0FBQ0MsU0FBVixDQUFvQkMsS0FBcEIsQ0FBMEIsZ0JBQTFCLENBTlA7QUFRSDtBQUVNLFNBQVNDLE1BQVQsQ0FBZ0JDLFdBQWhCLEVBQTZCQyxvQkFBN0IsRUFBbURDLGlCQUFuRCxFQUFzRTtBQUN6RSxNQUFJQyxHQUFHLEdBQUcsSUFBSUMsS0FBSixFQUFWO0FBQ0FDLFNBQU8sQ0FBQ0MsR0FBUixDQUFZTixXQUFaO0FBQ0FHLEtBQUcsQ0FBQ0ksT0FBSixHQUFjTixvQkFBZDtBQUNBRSxLQUFHLENBQUNLLE1BQUosR0FBYU4saUJBQWI7QUFDQUMsS0FBRyxDQUFDTSxHQUFKLEdBQVUsd0JBQXdCVCxXQUF4QixHQUFzQyxtQkFBaEQ7QUFDSDtBQUVNLFNBQVNVLFlBQVQsQ0FBc0JDLENBQXRCLEVBQXlCQyxDQUF6QixFQUE0QjtBQUMvQixPQUFLLElBQUlDLEdBQVQsSUFBZ0JELENBQWhCO0FBQ0ksUUFBSUEsQ0FBQyxDQUFDRSxjQUFGLENBQWlCRCxHQUFqQixDQUFKLEVBQTJCRixDQUFDLENBQUNFLEdBQUQsQ0FBRCxHQUFTRCxDQUFDLENBQUNDLEdBQUQsQ0FBVjtBQUQvQjs7QUFFQSxTQUFPRixDQUFQO0FBQ0g7QUFFTSxTQUFTSSxRQUFULEdBQW9CO0FBQ3ZCLFNBQU8sWUFBWXhCLE1BQW5CO0FBQ0gsQzs7Ozs7OztBQzNCRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtDQUdBOztBQUNBLElBQU15QixZQUFZLEdBQUdDLHlEQUFBLEVBQXJCO0FBQ0E7Ozs7QUFJQSxJQUFJQyxjQUFjLEdBQUdDLHdFQUFBLEVBQXJCOztBQUVBLFNBQVNDLEdBQVQsQ0FBYTdCLE1BQWIsRUFBcUI7QUFDakI7Ozs7QUFJQSxNQUFJOEIsWUFBWSxHQUFHOUIsTUFBTSxDQUFDQSxNQUFNLENBQUMsU0FBRCxDQUFQLENBQXpCO0FBQ0EsTUFBSStCLEtBQUssR0FBR0QsWUFBWSxDQUFDRSxDQUF6QjtBQUNBbEIsU0FBTyxDQUFDQyxHQUFSLENBQVlnQixLQUFaOztBQUNBLE1BQUlBLEtBQUosRUFBVztBQUNQLFNBQUssSUFBSUUsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0YsS0FBSyxDQUFDRyxNQUExQixFQUFrQ0QsQ0FBQyxFQUFuQyxFQUF1QztBQUVuQ04sb0JBQWMsR0FBR1EsZ0VBQUEsQ0FBdUJSLGNBQXZCLEVBQXVDSSxLQUFLLENBQUNFLENBQUQsQ0FBTCxDQUFTLENBQVQsQ0FBdkMsQ0FBakI7QUFDQSxVQUFJRyxNQUFNLEdBQUdMLEtBQUssQ0FBQ0UsQ0FBRCxDQUFMLENBQVMsQ0FBVCxDQUFiO0FBQ0EsVUFBSUksUUFBUSxTQUFaOztBQUNBLFVBQUksT0FBT04sS0FBSyxDQUFDRSxDQUFELENBQUwsQ0FBUyxDQUFULENBQVAsS0FBdUIsVUFBM0IsRUFBdUM7QUFDbkNJLGdCQUFRLEdBQUdOLEtBQUssQ0FBQ0UsQ0FBRCxDQUFMLENBQVMsQ0FBVCxDQUFYO0FBQ0gsT0FGRCxNQUVPLElBQUksT0FBT0YsS0FBSyxDQUFDRSxDQUFELENBQUwsQ0FBU0YsS0FBSyxDQUFDLENBQUQsQ0FBTCxDQUFTRyxNQUFULEdBQWtCLENBQTNCLENBQVAsS0FBeUMsVUFBN0MsRUFBeUQ7QUFDNURHLGdCQUFRLEdBQUdOLEtBQUssQ0FBQ0UsQ0FBRCxDQUFMLENBQVNGLEtBQUssQ0FBQyxDQUFELENBQUwsQ0FBU0csTUFBVCxHQUFrQixDQUEzQixDQUFYO0FBQ0gsT0FGTSxNQUVBO0FBQ0hHLGdCQUFRLEdBQUcsS0FBWDtBQUNIOztBQUNEdkIsYUFBTyxDQUFDQyxHQUFSLENBQVlVLFlBQVksQ0FBQ2EsT0FBYixDQUFxQkYsTUFBckIsQ0FBWjtBQUNBLFVBQUlYLFlBQVksQ0FBQ2EsT0FBYixDQUFxQkYsTUFBckIsTUFBaUMsQ0FBQyxDQUF0QyxFQUNJLE1BQU1HLEtBQUssa0JBQVdILE1BQVgsdUJBQVg7QUFDSkkseUNBQUksQ0FBQ0osTUFBRCxDQUFKLENBQWFULGNBQWIsRUFBNkJVLFFBQTdCO0FBQ0g7QUFDSixHQTFCZ0IsQ0EyQmpCO0FBQ0E7OztBQUNBUCxjQUFZLEdBQUdVLG1DQUFmO0FBQ0FWLGNBQVksQ0FBQ0gsY0FBYixHQUE4QkEsY0FBOUI7QUFDSDs7QUFFREUsR0FBRyxDQUFDN0IsTUFBRCxDQUFILEM7Ozs7Ozs7QUMvQ0E7QUFBTyxTQUFTMEIsT0FBVCxHQUFtQjtBQUN0QixTQUFPLENBQ0g7QUFDQSxzQkFGRyxFQUVtQixzQkFGbkIsRUFJSDtBQUNBLFFBTEcsRUFPSDtBQUNBLGVBUkcsRUFRWSxpQkFSWixFQVErQixrQkFSL0IsRUFVSDtBQUNBLFlBWEcsQ0FBUDtBQWFILEM7Ozs7Ozs7QUNkRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLFNBQVNlLElBQVQsR0FBZTtBQUNsQixTQUFPLE1BQVA7QUFDSDtBQUVNLFNBQVNDLGtCQUFULENBQTRCQyxNQUE1QixFQUFvQ04sUUFBcEMsRUFBOEM7QUFDakQsTUFBSU8sTUFBTSxHQUFHLENBQUMsZ0JBQUQsRUFBbUIsZUFBbkIsRUFBb0MsZUFBcEMsRUFBcUQsV0FBckQsRUFBa0UsTUFBbEUsRUFBMEUsTUFBMUUsRUFBa0YsYUFBbEYsRUFBaUcsVUFBakcsRUFBNkcsTUFBN0csQ0FBYjtBQUNBLE1BQUlDLFlBQVksR0FBRyx1QkFBbkI7O0FBQ0EsT0FBSyxJQUFJWixDQUFULElBQWNXLE1BQWQsRUFBc0I7QUFDbEIsUUFBSUUsSUFBSSxHQUFHRixNQUFNLENBQUNYLENBQUQsQ0FBakI7O0FBQ0EsUUFBSVUsTUFBTSxDQUFDcEIsY0FBUCxDQUFzQnVCLElBQXRCLENBQUosRUFBaUM7QUFDN0JELGtCQUFZLElBQUksVUFBVUMsSUFBVixHQUFpQixLQUFqQixHQUF5QkgsTUFBTSxDQUFDRyxJQUFELENBQS9CLEdBQXdDLE1BQXhDLEdBQWlELElBQWpFO0FBQ0g7QUFDSjs7QUFDREQsY0FBWSxJQUFJLHlCQUFoQjtBQUNBLE1BQUlFLElBQUksR0FBR0MsUUFBUSxDQUFDQyxjQUFULENBQXdCTixNQUFNLENBQUMsUUFBRCxDQUE5QixDQUFYO0FBQ0FJLE1BQUksQ0FBQ0csU0FBTCxJQUFrQkwsWUFBbEI7QUFDQVIsVUFBUSxDQUFDLElBQUQsRUFBTVEsWUFBTixDQUFSO0FBQ0g7QUFFTSxTQUFTTSxvQkFBVCxDQUE4QlIsTUFBOUIsRUFBc0NOLFFBQXRDLEVBQWdEO0FBQ25ELE1BQUllLFdBQVcsR0FBRyxDQUFDLFlBQUQsRUFBZSxTQUFmLEVBQTBCLGVBQTFCLEVBQTJDLFFBQTNDLEVBQXFELE1BQXJELEVBQTZELEtBQTdELEVBQW9FLFVBQXBFLEVBQWdGLGFBQWhGLENBQWxCO0FBQ0EsTUFBSVIsTUFBTSxHQUFHO0FBQ1RTLGNBQVUsRUFBRSxVQURIO0FBRVRDLFdBQU8sRUFBRSxXQUZBO0FBR1RsRSxpQkFBYSxFQUFFdUQsTUFBTSxDQUFDdkQsYUFIYjtBQUlUdUQsVUFBTSxFQUFFLENBQUMsS0FBRCxFQUFRLFdBQVIsRUFBcUIsS0FBckIsRUFBNEIsS0FBNUIsRUFBbUMsSUFBbkMsRUFBeUMsb0VBQXpDLEVBQStHLG9FQUEvRyxDQUpDO0FBS1RoRCxRQUFJLEVBQUUsa0NBTEc7QUFNVDRELE9BQUcsRUFBRUMsSUFBSSxDQUFDQyxTQUFMLENBQWU7QUFDaEIsa0JBQVksS0FESTtBQUVoQixnQkFBVSxDQUFDO0FBQUMsZ0JBQVEsWUFBVDtBQUF1QixnQkFBUTtBQUEvQixPQUFELEVBQTJDO0FBQUMsZ0JBQVEsUUFBVDtBQUFtQixnQkFBUTtBQUEzQixPQUEzQyxFQUFrRjtBQUN4RixnQkFBUSxHQURnRjtBQUV4RixnQkFBUTtBQUZnRixPQUFsRixFQUdQO0FBQUMsZ0JBQVEsR0FBVDtBQUFjLGdCQUFRO0FBQXRCLE9BSE8sRUFHMEI7QUFBQyxnQkFBUSxHQUFUO0FBQWMsZ0JBQVE7QUFBdEIsT0FIMUIsRUFHMEQ7QUFDaEUsZ0JBQVEsR0FEd0Q7QUFFaEUsZ0JBQVE7QUFGd0QsT0FIMUQsRUFNUDtBQUFDLGdCQUFRLEdBQVQ7QUFBYyxnQkFBUTtBQUF0QixPQU5PLENBRk07QUFTaEIsY0FBUSxhQVRRO0FBVWhCLGlCQUFXLENBQUM7QUFBQyxnQkFBUSxFQUFUO0FBQWEsZ0JBQVE7QUFBckIsT0FBRCxDQVZLO0FBV2hCLGlCQUFXLElBWEs7QUFZaEIseUJBQW1CLFNBWkg7QUFhaEIsY0FBUTtBQWJRLEtBQWYsQ0FOSTtBQXFCVGhFLFlBQVEsRUFBRSxrR0FyQkQ7QUFzQlRKLGVBQVcsRUFBRTtBQXRCSixHQUFiO0FBeUJBeUIsU0FBTyxDQUFDQyxHQUFSLENBQVl5QyxJQUFJLENBQUNFLEtBQUwsQ0FBV2QsTUFBTSxDQUFDVyxHQUFsQixDQUFaO0FBQ0EsTUFBSUksUUFBUSxHQUFHeEIsZ0VBQUEsQ0FBdUJTLE1BQXZCLEVBQStCRCxNQUEvQixDQUFmO0FBQ0E3QixTQUFPLENBQUNDLEdBQVIsQ0FBWTRDLFFBQVo7QUFDQSxNQUFJQyxjQUFjLEdBQUcsbUJBQXJCOztBQUNBLE9BQUssSUFBSTNCLENBQVQsSUFBY21CLFdBQWQsRUFBMkI7QUFDdkIsUUFBSU4sSUFBSSxHQUFHTSxXQUFXLENBQUNuQixDQUFELENBQXRCOztBQUNBLFFBQUkwQixRQUFRLENBQUNwQyxjQUFULENBQXdCdUIsSUFBeEIsQ0FBSixFQUFtQztBQUMvQmMsb0JBQWMsSUFBSSxVQUFVZCxJQUFWLEdBQWlCLEtBQWpCLEdBQXlCYSxRQUFRLENBQUNiLElBQUQsQ0FBakMsR0FBMEMsSUFBNUQ7QUFDSDtBQUNKOztBQUNEYyxnQkFBYyxJQUFJLHFCQUFsQjtBQUNBOUMsU0FBTyxDQUFDQyxHQUFSLENBQVk2QyxjQUFaO0FBRUEsTUFBSWIsSUFBSSxHQUFHQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0JVLFFBQVEsQ0FBQyxRQUFELENBQWhDLENBQVg7QUFDQVosTUFBSSxDQUFDRyxTQUFMLElBQWtCVSxjQUFsQjtBQUNBdkIsVUFBUSxDQUFDLElBQUQsRUFBTXVCLGNBQU4sQ0FBUjtBQUNIO0FBRU0sU0FBU0MsZ0JBQVQsQ0FBMEJsQixNQUExQixFQUFrQ04sUUFBbEMsRUFBNEM7QUFDL0MsTUFBSXlCLE9BQU8sR0FBR25CLE1BQU0sQ0FBQ29CLGFBQVAsQ0FBcUJwRSxJQUFuQztBQUNBLE1BQUlxRSxHQUFHLEdBQUczRix3REFBQSxDQUFlRCxVQUFmLEdBQTRCLGdDQUE1QixHQUErRCx1QkFBekU7QUFDQSxNQUFJNkYsU0FBUyxHQUFHO0FBQ1pDLFdBQU8sRUFBRUYsR0FERztBQUVaRixXQUFPLEVBQUVBLE9BRkc7QUFHWkssZUFBVyxFQUFFLEVBSEQ7QUFJWkMsV0FBTyxFQUFFLFVBSkc7QUFLWkMsV0FBTyxFQUFFLGlCQUxHO0FBTVpDLFdBQU8sRUFBRSxJQU5HO0FBT1pDLFNBQUssRUFBRTtBQVBLLEdBQWhCOztBQVVBLE9BQUssSUFBSWpELEdBQVQsSUFBZ0JxQixNQUFNLENBQUNBLE1BQXZCLEVBQStCO0FBQzNCLFFBQUlBLE1BQU0sQ0FBQ0EsTUFBUCxDQUFjcEIsY0FBZCxDQUE2QkQsR0FBN0IsS0FBcUNxQixNQUFNLENBQUNBLE1BQVAsQ0FBY3JCLEdBQWQsQ0FBekMsRUFBNkQ7QUFDekQyQyxlQUFTLENBQUMzQyxHQUFELENBQVQsR0FBaUJxQixNQUFNLENBQUNBLE1BQVAsQ0FBY3JCLEdBQWQsQ0FBakI7QUFDSDtBQUNKOztBQUVELE1BQUkyQyxTQUFTLENBQUNFLFdBQVYsSUFBeUJGLFNBQVMsQ0FBQ0gsT0FBdkMsRUFBZ0Q7QUFDNUNVLE9BQUcsR0FBR1AsU0FBUyxDQUFDQyxPQUFWLEdBQW9CLFNBQXBCLEdBQWdDRCxTQUFTLENBQUNFLFdBQTFDLEdBQXdELEdBQXhELEdBQThERixTQUFTLENBQUNILE9BQTlFO0FBQ0gsR0FGRCxNQUVPO0FBQ0gsUUFBSUcsU0FBUyxDQUFDakYsU0FBZCxFQUNJd0YsR0FBRyxHQUFHUCxTQUFTLENBQUNDLE9BQVYsR0FBb0IsUUFBcEIsR0FBK0JELFNBQVMsQ0FBQ0gsT0FBekMsR0FBbUQsU0FBbkQsR0FBK0RHLFNBQVMsQ0FBQ00sS0FBekUsR0FBaUYsYUFBakYsR0FBaUdOLFNBQVMsQ0FBQ2pGLFNBQWpILENBREosS0FHSXdGLEdBQUcsR0FBR1AsU0FBUyxDQUFDQyxPQUFWLEdBQW9CLFFBQXBCLEdBQStCRCxTQUFTLENBQUNILE9BQXpDLEdBQW1ELFNBQW5ELEdBQStERyxTQUFTLENBQUNNLEtBQS9FO0FBQ1A7O0FBRUR6RCxTQUFPLENBQUNDLEdBQVIsQ0FBWWtELFNBQVMsQ0FBQ0ssT0FBdEIsRUE1QitDLENBNkIvQzs7QUFDQUcsWUFBVSxDQUFDLFlBQVk7QUFDbkJDLGtCQUFjLENBQUNULFNBQUQsQ0FBZDtBQUNILEdBRlMsRUFFUEEsU0FBUyxDQUFDSyxPQUZILENBQVY7QUFHSDtBQUVNLFNBQVNLLElBQVQsQ0FBY2hDLE1BQWQsRUFBc0JOLFFBQXRCLEVBQWdDO0FBQ25DLE1BQUl1QyxRQUFRLEdBQUc7QUFDWEMsaUJBQWEsRUFBRSxLQURKO0FBRVhDLFlBQVEsRUFBRSxJQUZDO0FBR1hDLGdCQUFZLEVBQUUsSUFISDtBQUlYQyxzQkFBa0IsRUFBRSxJQUpUO0FBS1hDLG9CQUFnQixFQUFFLElBTFA7QUFNWEMsYUFBUyxFQUFFLElBTkE7QUFPWEMsa0JBQWMsRUFBRXhDLE1BQU0sQ0FBQ2pELGNBUFo7QUFRWEosU0FBSyxFQUFFLElBUkk7QUFTWDhGLGVBQVcsRUFBRTtBQVRGLEdBQWY7QUFXQVIsVUFBUSxDQUFDRyxZQUFULEdBQXdCNUMsNERBQUEsRUFBeEI7QUFDQXlDLFVBQVEsQ0FBQ0UsUUFBVCxHQUFvQjNDLDZEQUFBLEVBQXBCO0FBQ0FBLDREQUFBLENBQWlCUSxNQUFNLENBQUN0RCxXQUF4QixFQUFxQyxZQUFZO0FBQzdDdUYsWUFBUSxDQUFDSSxrQkFBVCxHQUE4QixLQUE5QjtBQUNBM0MsWUFBUSxDQUFDLElBQUQsRUFBT3VDLFFBQVAsQ0FBUjtBQUNILEdBSEQsRUFHRyxZQUFZO0FBQ1hBLFlBQVEsQ0FBQ0ksa0JBQVQsR0FBOEIsSUFBOUI7QUFDQXRDLHNCQUFrQixDQUFDQyxNQUFELEVBQVMsVUFBUzBDLEdBQVQsRUFBY0MsT0FBZCxFQUFzQjtBQUM3QyxVQUFHQSxPQUFILEVBQVc7QUFDUCxZQUFJdEIsR0FBRyxHQUFHM0Ysd0RBQUEsQ0FBZUQsVUFBZixHQUE0QixnQ0FBNUIsR0FBK0QsdUJBQXpFO0FBQ0FvRyxXQUFHLEdBQUdSLEdBQUcsR0FBRyxRQUFOLEdBQWlCckIsTUFBTSxDQUFDaEQsSUFBOUI7QUFDQThFLGtCQUFVLENBQUMsWUFBWTtBQUNuQixjQUFJYyxLQUFLLEdBQUcsSUFBSUMsY0FBSixFQUFaOztBQUNBRCxlQUFLLENBQUNFLGtCQUFOLEdBQTJCLFlBQVk7QUFDbkMsZ0JBQUksS0FBS0MsVUFBTCxLQUFvQixDQUF4QixFQUEyQjtBQUN2QixrQkFBSSxLQUFLQyxNQUFMLEtBQWdCLEdBQXBCLEVBQXlCO0FBQ3JCLG9CQUFJQyxRQUFRLEdBQUdwQyxJQUFJLENBQUNFLEtBQUwsQ0FBVyxLQUFLa0IsUUFBaEIsQ0FBZjtBQUNBOUQsdUJBQU8sQ0FBQ0MsR0FBUixDQUFZNkUsUUFBWjs7QUFDQSxvQkFBSUEsUUFBUSxDQUFDaEIsUUFBVCxDQUFrQjFDLE1BQWxCLEdBQTJCLENBQS9CLEVBQWtDO0FBQzlCcEIseUJBQU8sQ0FBQ0MsR0FBUixDQUFZOEUsNkRBQUEsQ0FBb0JELFFBQVEsQ0FBQ2hCLFFBQVQsQ0FBa0IsQ0FBbEIsRUFBcUJrQixZQUF6QyxDQUFaO0FBQ0FsQiwwQkFBUSxDQUFDTSxTQUFULEdBQXFCVSxRQUFRLENBQUNoQixRQUFULENBQWtCLENBQWxCLEVBQXFCbUIsTUFBMUM7QUFDQW5CLDBCQUFRLENBQUNDLGFBQVQsR0FBeUIsSUFBekI7QUFDQUQsMEJBQVEsQ0FBQ0ssZ0JBQVQsR0FBNEIsSUFBNUI7O0FBQ0Esc0JBQUlXLFFBQVEsQ0FBQ2hCLFFBQVQsQ0FBa0IsQ0FBbEIsRUFBcUJrQixZQUFyQixLQUFzQyxDQUExQyxFQUE2QztBQUN6Q2xCLDRCQUFRLENBQUNRLFdBQVQsR0FBdUIsSUFBdkI7QUFDSDs7QUFDRFIsMEJBQVEsQ0FBQ3RGLEtBQVQsR0FBaUJ1Ryw2REFBQSxDQUFvQkQsUUFBUSxDQUFDaEIsUUFBVCxDQUFrQixDQUFsQixFQUFxQmtCLFlBQXpDLENBQWpCO0FBQ0F6RCwwQkFBUSxDQUFDLElBQUQsRUFBT3VDLFFBQVAsQ0FBUjtBQUNILGlCQVZELE1BVU87QUFDSDlELHlCQUFPLENBQUNDLEdBQVIsQ0FBWTZELFFBQVo7QUFDQXZDLDBCQUFRLENBQUMsSUFBRCxFQUFPdUMsUUFBUCxDQUFSO0FBQ0g7QUFDSixlQWpCRCxNQWlCTztBQUNIQSx3QkFBUSxDQUFDQyxhQUFULEdBQXlCLEtBQXpCO0FBQ0FELHdCQUFRLENBQUNLLGdCQUFULEdBQTRCLEtBQTVCO0FBQ0E1Qyx3QkFBUSxDQUFDLElBQUQsRUFBT3VDLFFBQVAsQ0FBUjtBQUNIO0FBQ0o7QUFDSixXQXpCRDs7QUEwQkFXLGVBQUssQ0FBQ1MsSUFBTixDQUFXLEtBQVgsRUFBa0J4QixHQUFsQixFQUF1QixJQUF2QjtBQUNBZSxlQUFLLENBQUNVLElBQU47QUFDSCxTQTlCUyxFQThCUCxJQTlCTyxDQUFWO0FBK0JILE9BbENELE1Ba0NLO0FBQ0Q1RCxnQkFBUSxDQUFDO0FBQUMscUJBQVUsS0FBWDtBQUFpQixxQkFBVTtBQUEzQixTQUFELEVBQStELEtBQS9ELENBQVI7QUFDSDtBQUNKLEtBdENpQixDQUFsQixDQUZXLENBeUNYO0FBQ0gsR0E3Q0Q7QUErQ0g7QUFFTSxTQUFTNkQsUUFBVCxHQUFvQjtBQUN2QixNQUFJQyxTQUFTLEdBQUd2RSxpRUFBQSxFQUFoQjtBQUNBLE1BQUl3RSxPQUFPLEdBQUcsSUFBSUMsNkNBQUosQ0FBVTtBQUNwQkMsV0FBTyxFQUFFSDtBQURXLEdBQVYsQ0FBZDtBQUdBQyxTQUFPLENBQUNKLElBQVI7QUFDSDtBQUVNLFNBQVNPLGVBQVQsQ0FBeUJ4QyxhQUF6QixFQUF3QzFCLFFBQXhDLEVBQWtEO0FBQ3JELE1BQUlNLE1BQU0sR0FBRztBQUNUNkQseUJBQXFCLEVBQUUsSUFEZDtBQUVUQyxzQkFBa0IsRUFBRSxLQUZYO0FBR1RDLHVCQUFtQixFQUFFO0FBSFosR0FBYjtBQUtBL0IsTUFBSSxDQUFDWixhQUFELEVBQWdCLFVBQVNzQixHQUFULEVBQWNzQixHQUFkLEVBQWtCO0FBQ2xDLFFBQUd0QixHQUFILEVBQU87QUFDSHZFLGFBQU8sQ0FBQ0MsR0FBUixDQUFZc0UsR0FBWjtBQUNILEtBRkQsTUFFSztBQUNEdkUsYUFBTyxDQUFDQyxHQUFSLENBQVk0RixHQUFaOztBQUNBLFVBQUdBLEdBQUgsRUFBTztBQUNIdEUsZ0JBQVEsQ0FBQ3NFLEdBQUQsQ0FBUjtBQUNIO0FBQ0o7QUFDSixHQVRHLENBQUo7QUFXSCxDOzs7Ozs7OztBQ2hNRDtBQUNBLFNBQVNOLEtBQVQsR0FBaUI7QUFDYjtBQUNBLE9BQUtPLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxPQUFLQyxLQUFMLEdBQWEsSUFBYjtBQUNBLE9BQUtDLE9BQUwsR0FBZSxJQUFmLENBSmEsQ0FNYjs7QUFDQSxPQUFLQyxhQUFMLEdBQXFCQyxnQkFBZ0IsRUFBckMsQ0FQYSxDQVNiOztBQUNBLE1BQUlDLFFBQVEsR0FBRztBQUNYQyxZQUFRLEVBQUUsS0FEQztBQUVYQyxhQUFTLEVBQUUsZUFGQTtBQUdYUCxlQUFXLEVBQUUsSUFIRjtBQUlYTixXQUFPLEVBQUUsRUFKRTtBQUtYYyxZQUFRLEVBQUUsR0FMQztBQU1YQyxZQUFRLEVBQUUsR0FOQztBQU9YUCxXQUFPLEVBQUU7QUFQRSxHQUFmLENBVmEsQ0FvQmI7O0FBQ0EsTUFBSVEsU0FBUyxDQUFDLENBQUQsQ0FBVCxJQUFnQixRQUFPQSxTQUFTLENBQUMsQ0FBRCxDQUFoQixNQUF3QixRQUE1QyxFQUFzRDtBQUNsRCxTQUFLQyxPQUFMLEdBQWVDLGNBQWMsQ0FBQ1AsUUFBRCxFQUFXSyxTQUFTLENBQUMsQ0FBRCxDQUFwQixDQUE3QjtBQUNIOztBQUVELE1BQUksS0FBS0MsT0FBTCxDQUFhTCxRQUFiLEtBQTBCLElBQTlCLEVBQW9DLEtBQUtsQixJQUFMO0FBRXZDLEMsQ0FFRDs7O0FBQ0FLLEtBQUssQ0FBQ29CLFNBQU4sQ0FBZ0JDLEtBQWhCLEdBQXdCLFlBQVk7QUFDaEMsTUFBSUMsQ0FBQyxHQUFHLElBQVI7O0FBQ0EsT0FBS2QsS0FBTCxDQUFXTSxTQUFYLEdBQXVCLEtBQUtOLEtBQUwsQ0FBV00sU0FBWCxDQUFxQlMsT0FBckIsQ0FBNkIsWUFBN0IsRUFBMkMsRUFBM0MsQ0FBdkI7QUFDQSxPQUFLZCxPQUFMLENBQWFLLFNBQWIsR0FBeUIsS0FBS0wsT0FBTCxDQUFhSyxTQUFiLENBQXVCUyxPQUF2QixDQUErQixZQUEvQixFQUE2QyxFQUE3QyxDQUF6QjtBQUNBLE9BQUtmLEtBQUwsQ0FBV2dCLGdCQUFYLENBQTRCLEtBQUtkLGFBQWpDLEVBQWdELFlBQVk7QUFDeERZLEtBQUMsQ0FBQ2QsS0FBRixDQUFRaUIsVUFBUixDQUFtQkMsV0FBbkIsQ0FBK0JKLENBQUMsQ0FBQ2QsS0FBakM7QUFDSCxHQUZEO0FBR0EsT0FBS0MsT0FBTCxDQUFhZSxnQkFBYixDQUE4QixLQUFLZCxhQUFuQyxFQUFrRCxZQUFZO0FBQzFELFFBQUlZLENBQUMsQ0FBQ2IsT0FBRixDQUFVZ0IsVUFBZCxFQUEwQkgsQ0FBQyxDQUFDYixPQUFGLENBQVVnQixVQUFWLENBQXFCQyxXQUFyQixDQUFpQ0osQ0FBQyxDQUFDYixPQUFuQztBQUM3QixHQUZEO0FBR0gsQ0FWRDs7QUFZQVQsS0FBSyxDQUFDb0IsU0FBTixDQUFnQnpCLElBQWhCLEdBQXVCLFlBQVk7QUFDL0JnQyxVQUFRLENBQUNDLElBQVQsQ0FBYyxJQUFkO0FBQ0FDLGtCQUFnQixDQUFDRCxJQUFqQixDQUFzQixJQUF0QjtBQUNBakksUUFBTSxDQUFDbUksZ0JBQVAsQ0FBd0IsS0FBS3RCLEtBQTdCLEVBQW9DdUIsTUFBcEM7QUFDQSxPQUFLdkIsS0FBTCxDQUFXTSxTQUFYLEdBQXVCLEtBQUtOLEtBQUwsQ0FBV00sU0FBWCxJQUF3QixLQUFLTixLQUFMLENBQVd3QixZQUFYLEdBQTBCckksTUFBTSxDQUFDc0ksV0FBakMsR0FBK0MsMEJBQS9DLEdBQTRFLFlBQXBHLENBQXZCLENBSitCLENBSy9COztBQUNBdEYsVUFBUSxDQUFDdUYsYUFBVCxDQUF1QixjQUF2QixFQUF1Q0MsT0FBdkMsR0FBaUQsWUFBVztBQUN4RHhGLFlBQVEsQ0FBQ3VGLGFBQVQsQ0FBdUIsbUJBQXZCLEVBQTRDRSxLQUE1QyxDQUFrREMsT0FBbEQsR0FBNEQsTUFBNUQ7QUFDSCxHQUZEO0FBR0gsQ0FURCxDLENBV0E7OztBQUNBLFNBQVNWLFFBQVQsR0FBb0I7QUFFaEIsTUFBSTFCLE9BQUosRUFBYXFDLGFBQWIsRUFBNEJDLE9BQTVCO0FBRUE7Ozs7O0FBS0EsTUFBSSxPQUFPLEtBQUtyQixPQUFMLENBQWFqQixPQUFwQixLQUFnQyxRQUFwQyxFQUE4QztBQUMxQ0EsV0FBTyxHQUFHLEtBQUtpQixPQUFMLENBQWFqQixPQUF2QjtBQUNILEdBRkQsTUFFTztBQUNIQSxXQUFPLEdBQUcsS0FBS2lCLE9BQUwsQ0FBYWpCLE9BQWIsQ0FBcUJwRCxTQUEvQjtBQUNILEdBYmUsQ0FlaEI7OztBQUNBMEYsU0FBTyxHQUFHNUYsUUFBUSxDQUFDNkYsc0JBQVQsRUFBVixDQWhCZ0IsQ0FrQmhCOztBQUNBLE9BQUtoQyxLQUFMLEdBQWE3RCxRQUFRLENBQUM4RixhQUFULENBQXVCLEtBQXZCLENBQWI7QUFDQSxPQUFLakMsS0FBTCxDQUFXTSxTQUFYLEdBQXVCLGdCQUFnQixLQUFLSSxPQUFMLENBQWFKLFNBQXBEO0FBQ0E7O0FBR0E7O0FBQ0EsTUFBSSxLQUFLSSxPQUFMLENBQWFYLFdBQWIsS0FBNkIsSUFBakMsRUFBdUM7QUFDbkMsU0FBS0EsV0FBTCxHQUFtQjVELFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixpQkFBeEIsQ0FBbkI7QUFDSCxHQTNCZSxDQTZCaEI7OztBQUNBMEYsZUFBYSxHQUFHM0YsUUFBUSxDQUFDOEYsYUFBVCxDQUF1QixLQUF2QixDQUFoQjtBQUNBSCxlQUFhLENBQUN4QixTQUFkLEdBQTBCLGNBQTFCO0FBQ0F3QixlQUFhLENBQUN6RixTQUFkLEdBQTBCb0QsT0FBMUI7QUFDQSxPQUFLTyxLQUFMLENBQVdrQyxXQUFYLENBQXVCSixhQUF2QixFQWpDZ0IsQ0FtQ2hCOztBQUNBQyxTQUFPLENBQUNHLFdBQVIsQ0FBb0IsS0FBS2xDLEtBQXpCLEVBcENnQixDQXNDaEI7O0FBQ0E3RCxVQUFRLENBQUNELElBQVQsQ0FBY2dHLFdBQWQsQ0FBMEJILE9BQTFCO0FBRUg7O0FBRURJLGlCQUFpQixHQUFHLDZCQUFZO0FBQzVCLE1BQUlDLE1BQU0sR0FBR2pHLFFBQVEsQ0FBQ2tHLGlCQUFULENBQTJCLFlBQTNCLENBQWI7QUFDQSxNQUFJQyxTQUFTLEdBQUcsRUFBaEI7QUFFQSxNQUFJQyxPQUFPLEdBQUdwRyxRQUFRLENBQUNxRyxzQkFBVCxDQUFnQyxTQUFoQyxDQUFkOztBQUVBLE9BQUksSUFBSXBILENBQUMsR0FBQyxDQUFWLEVBQVlBLENBQUMsR0FBQ2dILE1BQU0sQ0FBQy9HLE1BQXJCLEVBQTRCRCxDQUFDLEVBQTdCLEVBQWlDO0FBQzdCLFFBQUdnSCxNQUFNLENBQUNoSCxDQUFELENBQU4sQ0FBVXFILE9BQWIsRUFBcUI7QUFDakJILGVBQVMsR0FBR0EsU0FBUyxDQUFDSSxNQUFWLENBQWlCTixNQUFNLENBQUNoSCxDQUFELENBQU4sQ0FBVXVILEtBQTNCLENBQVo7QUFDSDtBQUNKOztBQUVELE1BQUdMLFNBQVMsSUFBSSxTQUFoQixFQUEwQjtBQUN0Qm5HLFlBQVEsQ0FBQ3VGLGFBQVQsQ0FBdUIsVUFBdkIsRUFBbUNFLEtBQW5DLENBQXlDQyxPQUF6QyxHQUFtRCxNQUFuRDtBQUNBMUYsWUFBUSxDQUFDdUYsYUFBVCxDQUF1QixZQUF2QixFQUFxQ0UsS0FBckMsQ0FBMkNDLE9BQTNDLEdBQXFELE1BQXJEO0FBQ0ExRixZQUFRLENBQUN1RixhQUFULENBQXVCLFdBQXZCLEVBQW9DRSxLQUFwQyxDQUEwQ0MsT0FBMUMsR0FBb0QsTUFBcEQ7QUFDQTFGLFlBQVEsQ0FBQ3VGLGFBQVQsQ0FBdUIsVUFBdkIsRUFBbUNFLEtBQW5DLENBQXlDQyxPQUF6QyxHQUFtRCxPQUFuRDtBQUNIOztBQUNELE1BQUdTLFNBQVMsSUFBSSxnQkFBaEIsRUFBa0M7QUFDOUJuRyxZQUFRLENBQUN1RixhQUFULENBQXVCLFVBQXZCLEVBQW1DRSxLQUFuQyxDQUF5Q0MsT0FBekMsR0FBbUQsTUFBbkQ7QUFDQTFGLFlBQVEsQ0FBQ3VGLGFBQVQsQ0FBdUIsWUFBdkIsRUFBcUNFLEtBQXJDLENBQTJDQyxPQUEzQyxHQUFxRCxNQUFyRDtBQUNBMUYsWUFBUSxDQUFDdUYsYUFBVCxDQUF1QixXQUF2QixFQUFvQ0UsS0FBcEMsQ0FBMENDLE9BQTFDLEdBQW9ELE1BQXBEO0FBQ0ExRixZQUFRLENBQUN1RixhQUFULENBQXVCLFVBQXZCLEVBQW1DRSxLQUFuQyxDQUF5Q0MsT0FBekMsR0FBbUQsT0FBbkQ7QUFDSDs7QUFDRCxNQUFHUyxTQUFTLElBQUkseUJBQWhCLEVBQTBDO0FBQ3RDbkcsWUFBUSxDQUFDdUYsYUFBVCxDQUF1QixVQUF2QixFQUFtQ0UsS0FBbkMsQ0FBeUNDLE9BQXpDLEdBQW1ELE1BQW5EO0FBQ0ExRixZQUFRLENBQUN1RixhQUFULENBQXVCLFVBQXZCLEVBQW1DRSxLQUFuQyxDQUF5Q0MsT0FBekMsR0FBbUQsTUFBbkQ7QUFDQTFGLFlBQVEsQ0FBQ3VGLGFBQVQsQ0FBdUIsV0FBdkIsRUFBb0NFLEtBQXBDLENBQTBDQyxPQUExQyxHQUFvRCxNQUFwRDtBQUNBMUYsWUFBUSxDQUFDdUYsYUFBVCxDQUF1QixZQUF2QixFQUFxQ0UsS0FBckMsQ0FBMkNDLE9BQTNDLEdBQXFELE9BQXJEO0FBQ0g7O0FBQ0QsTUFBR1MsU0FBUyxJQUFJLGlDQUFoQixFQUFtRDtBQUMvQ25HLFlBQVEsQ0FBQ3VGLGFBQVQsQ0FBdUIsVUFBdkIsRUFBbUNFLEtBQW5DLENBQXlDQyxPQUF6QyxHQUFtRCxNQUFuRDtBQUNBMUYsWUFBUSxDQUFDdUYsYUFBVCxDQUF1QixVQUF2QixFQUFtQ0UsS0FBbkMsQ0FBeUNDLE9BQXpDLEdBQW1ELE1BQW5EO0FBQ0ExRixZQUFRLENBQUN1RixhQUFULENBQXVCLFlBQXZCLEVBQXFDRSxLQUFyQyxDQUEyQ0MsT0FBM0MsR0FBcUQsTUFBckQ7QUFDQTFGLFlBQVEsQ0FBQ3VGLGFBQVQsQ0FBdUIsV0FBdkIsRUFBb0NFLEtBQXBDLENBQTBDQyxPQUExQyxHQUFvRCxPQUFwRDtBQUNIO0FBQ0osQ0FwQ0Q7O0FBc0NBLFNBQVNsQixjQUFULENBQXdCaUMsTUFBeEIsRUFBZ0NDLFVBQWhDLEVBQTRDO0FBQ3hDLE1BQUlDLFFBQUo7O0FBQ0EsT0FBS0EsUUFBTCxJQUFpQkQsVUFBakIsRUFBNkI7QUFDekIsUUFBSUEsVUFBVSxDQUFDbkksY0FBWCxDQUEwQm9JLFFBQTFCLENBQUosRUFBeUM7QUFDckNGLFlBQU0sQ0FBQ0UsUUFBRCxDQUFOLEdBQW1CRCxVQUFVLENBQUNDLFFBQUQsQ0FBN0I7QUFDSDtBQUNKOztBQUNELFNBQU9GLE1BQVA7QUFDSDs7QUFFRCxTQUFTdkIsZ0JBQVQsR0FBNEI7QUFDeEIsTUFBSSxLQUFLdEIsV0FBVCxFQUFzQjtBQUNsQixTQUFLQSxXQUFMLENBQWlCaUIsZ0JBQWpCLENBQWtDLE9BQWxDLEVBQTJDLEtBQUtILEtBQUwsQ0FBV2tDLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBM0M7QUFDSDs7QUFFRCxNQUFJLEtBQUs5QyxPQUFULEVBQWtCO0FBQ2QsU0FBS0EsT0FBTCxDQUFhZSxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxLQUFLSCxLQUFMLENBQVdrQyxJQUFYLENBQWdCLElBQWhCLENBQXZDO0FBQ0g7QUFFSjs7QUFFRCxTQUFTNUMsZ0JBQVQsR0FBNEI7QUFDeEIsTUFBSTZDLEVBQUUsR0FBRzdHLFFBQVEsQ0FBQzhGLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBVDtBQUNBLE1BQUllLEVBQUUsQ0FBQ3BCLEtBQUgsQ0FBU3FCLGdCQUFiLEVBQStCLE9BQU8scUJBQVA7QUFDL0IsTUFBSUQsRUFBRSxDQUFDcEIsS0FBSCxDQUFTc0IsV0FBYixFQUEwQixPQUFPLGdCQUFQO0FBQzFCLFNBQU8sZUFBUDtBQUNILEMsQ0FDRDs7O0FBQ0FDLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlNUQsS0FBZixHQUF1QkEsS0FBdkIsQyIsImZpbGUiOiJ3aWRnZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1NDgzMjBlNmQ4N2RkOGMxMjRiMSIsImV4cG9ydCBmdW5jdGlvbiBwaW5nKCkge1xuICAgIHJldHVybiAncG9uZyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmVjaGVja2VyKG4pIHtcbiAgICBsZXQganNvbiA9IHswOiBcIk9LXCIsIDE6IFwiSU5WQUxJRF9UUkFOU0FDVElPTlwiLCAyOiBcIlBBWUVSX0FDQ09VTlRfTk9UX0ZPVU5EXCIsIDM6IFwiSU5WQUxJRF9OT0RFX0FDQ09VTlRcIiwgNDogXCJUUkFOU0FDVElPTl9FWFBJUkVEXCIsIDU6IFwiSU5WQUxJRF9UUkFOU0FDVElPTl9TVEFSVFwiLCA2OiBcIklOVkFMSURfVFJBTlNBQ1RJT05fRFVSQVRJT05cIiwgNzogXCJJTlZBTElEX1NJR05BVFVSRVwiLCA4OiBcIk1FTU9fVE9PX0xPTkdcIiwgOTogXCJJTlNVRkZJQ0lFTlRfVFhfRkVFXCIsIDEwOiBcIklOU1VGRklDSUVOVF9QQVlFUl9CQUxBTkNFXCIsIDExOiBcIkRVUExJQ0FURV9UUkFOU0FDVElPTlwiLCAxMjogXCJCVVNZXCIsIDEzOiBcIk5PVF9TVVBQT1JURURcIiwgMTQ6IFwiSU5WQUxJRF9GSUxFX0lEXCIsIDE1OiBcIklOVkFMSURfQUNDT1VOVF9JRFwiLCAxNjogXCJJTlZBTElEX0NPTlRSQUNUX0lEXCIsIDE3OiBcIklOVkFMSURfVFJBTlNBQ1RJT05fSURcIiwgMTg6IFwiUkVDRUlQVF9OT1RfRk9VTkRcIiwgMTk6IFwiUkVDT1JEX05PVF9GT1VORFwiLCAyMDogXCJJTlZBTElEX1NPTElESVRZX0lEXCIsIDIxOiBcIlVOS05PV05cIiwgMjI6IFwiU1VDQ0VTU1wiLCAyMzogXCJGQUlMX0lOVkFMSURcIiwgMjQ6IFwiRkFJTF9GRUVcIiwgMjU6IFwiRkFJTF9CQUxBTkNFXCIsIDI2OiBcIktFWV9SRVFVSVJFRFwiLCAyNzogXCJCQURfRU5DT0RJTkdcIiwgMjg6IFwiSU5TVUZGSUNJRU5UX0FDQ09VTlRfQkFMQU5DRVwiLCAyOTogXCJJTlZBTElEX1NPTElESVRZX0FERFJFU1NcIiwgMzA6IFwiSU5TVUZGSUNJRU5UX0dBU1wiLCAzMTogXCJDT05UUkFDVF9TSVpFX0xJTUlUX0VYQ0VFREVEXCIsIDMyOiBcIkxPQ0FMX0NBTExfTU9ESUZJQ0FUSU9OX0VYQ0VQVElPTlwiLCAzMzogXCJDT05UUkFDVF9SRVZFUlRfRVhFQ1VURURcIiwgMzQ6IFwiQ09OVFJBQ1RfRVhFQ1VUSU9OX0VYQ0VQVElPTlwiLCAzNTogXCJJTlZBTElEX1JFQ0VJVklOR19OT0RFX0FDQ09VTlRcIiwgMzY6IFwiTUlTU0lOR19RVUVSWV9IRUFERVJcIiwgMzc6IFwiQUNDT1VOVF9VUERBVEVfRkFJTEVEXCIsIDM4OiBcIklOVkFMSURfS0VZX0VOQ09ESU5HXCIsIDM5OiBcIk5VTExfU09MSURJVFlfQUREUkVTU1wiLCA0MDogXCJDT05UUkFDVF9VUERBVEVfRkFJTEVEXCIsIDQxOiBcIklOVkFMSURfUVVFUllfSEVBREVSXCIsIDQyOiBcIklOVkFMSURfRkVFX1NVQk1JVFRFRFwiLCA0MzogXCJJTlZBTElEX1BBWUVSX1NJR05BVFVSRVwiLCA0NDogXCJLRVlfTk9UX1BST1ZJREVEXCIsIDQ1OiBcIklOVkFMSURfRVhQSVJBVElPTl9USU1FXCIsIDQ2OiBcIk5PX1dBQ0xfS0VZXCIsIDQ3OiBcIkZJTEVfQ09OVEVOVF9FTVBUWVwiLCA0ODogXCJJTlZBTElEX0FDQ09VTlRfQU1PVU5UU1wiLCA0OTogXCJFTVBUWV9UUkFOU0FDVElPTl9CT0RZXCIsIDUwOiBcIklOVkFMSURfVFJBTlNBQ1RJT05fQk9EWVwiLCA1MTogXCJJTlZBTElEX1NJR05BVFVSRV9UWVBFX01JU01BVENISU5HX0tFWVwiLCA1MjogXCJJTlZBTElEX1NJR05BVFVSRV9DT1VOVF9NSVNNQVRDSElOR19LRVlcIiwgNTM6IFwiRU1QVFlfQ0xBSU1fQk9EWVwiLCA1NDogXCJFTVBUWV9DTEFJTV9IQVNIXCIsIDU1OiBcIkVNUFRZX0NMQUlNX0tFWVNcIiwgNTY6IFwiSU5WQUxJRF9DTEFJTV9IQVNIX1NJWkVcIiwgNTc6IFwiRU1QVFlfUVVFUllfQk9EWVwiLCA1ODogXCJFTVBUWV9DTEFJTV9RVUVSWVwiLCA1OTogXCJDTEFJTV9OT1RfRk9VTkRcIiwgNjA6IFwiQUNDT1VOVF9JRF9ET0VTX05PVF9FWElTVFwiLCA2MTogXCJDTEFJTV9BTFJFQURZX0VYSVNUU1wiLCA2MjogXCJJTlZBTElEX0ZJTEVfV0FDTFwiLCA2MzogXCJTRVJJQUxJWkFUSU9OX0ZBSUxFRFwiLCA2NDogXCJUUkFOU0FDVElPTl9PVkVSU0laRVwiLCA2NTogXCJUUkFOU0FDVElPTl9UT09fTUFOWV9MQVlFUlNcIiwgNjY6IFwiQ09OVFJBQ1RfREVMRVRFRFwiLCA2NzogXCJQTEFURk9STV9OT1RfQUNUSVZFXCIsIDY4OiBcIktFWV9QUkVGSVhfTUlTTUFUQ0hcIiwgNjk6IFwiUExBVEZPUk1fVFJBTlNBQ1RJT05fTk9UX0NSRUFURURcIiwgNzA6IFwiSU5WQUxJRF9SRU5FV0FMX1BFUklPRFwiLCA3MTogXCJJTlZBTElEX1BBWUVSX0FDQ09VTlRfSURcIiwgNzI6IFwiQUNDT1VOVF9ERUxFVEVEXCIsIDczOiBcIkZJTEVfREVMRVRFRFwiLCA3NDogXCJBQ0NPVU5UX1JFUEVBVEVEX0lOX0FDQ09VTlRfQU1PVU5UU1wiLCA3NTogXCJTRVRUSU5HX05FR0FUSVZFX0FDQ09VTlRfQkFMQU5DRVwiLCA3NjogXCJPQlRBSU5FUl9SRVFVSVJFRFwiLCA3NzogXCJPQlRBSU5FUl9TQU1FX0NPTlRSQUNUX0lEXCIsIDc4OiBcIk9CVEFJTkVSX0RPRVNfTk9UX0VYSVNUXCIsIDc5OiBcIk1PRElGWUlOR19JTU1VVEFCTEVfQ09OVFJBQ1RcIiwgODA6IFwiRklMRV9TWVNURU1fRVhDRVBUSU9OXCIsIDgxOiBcIkFVVE9SRU5FV19EVVJBVElPTl9OT1RfSU5fUkFOR0VcIiwgODI6IFwiRVJST1JfREVDT0RJTkdfQllURVNUUklOR1wiLCA4MzogXCJDT05UUkFDVF9GSUxFX0VNUFRZXCIsIDg0OiBcIkNPTlRSQUNUX0JZVEVDT0RFX0VNUFRZXCIsIDg1OiBcIklOVkFMSURfSU5JVElBTF9CQUxBTkNFXCIsIDg2OiBcIklOVkFMSURfUkVDRUlWRV9SRUNPUkRfVEhSRVNIT0xEXCIsIDg3OiBcIklOVkFMSURfU0VORF9SRUNPUkRfVEhSRVNIT0xEXCIsIDg4OiBcIkFDQ09VTlRfSVNfTk9UX0dFTkVTSVNfQUNDT1VOVFwifVxuICAgICByZXR1cm4ganNvbltuXTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy5qcyIsImltcG9ydCAqIGFzIENvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5cbmxldCBwcm9kdWN0aW9uID0gQ29uZmlnLmRlZmF1bHQucHJvZHVjdGlvbjtcblxubGV0IHRvZGF5ID0gbmV3IERhdGUoKSxcbiAgICBkYXRlID0gdG9kYXkuZ2V0RnVsbFllYXIoKSArICctJyArICh0b2RheS5nZXRNb250aCgpICsgMSkgKyAnLScgKyB0b2RheS5nZXREYXRlKCksXG4gICAgdGltZSA9IHRvZGF5LmdldEhvdXJzKCkgKyBcIjpcIiArIHRvZGF5LmdldE1pbnV0ZXMoKSxcbiAgICBkYXRlVGltZSA9IGRhdGUgKyAnICcgKyB0aW1lLFxuICAgIHRpbWVzdGFtcCA9IG5ldyBEYXRlKGRhdGVUaW1lKS5nZXRUaW1lKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRtb2RhbENvbnRlbnQoKSB7XG4gICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwicG9wdXBfb3V0ZXJfd3JhcFwiPlxcbicgK1xuICAgICdcXHQgIFxcdDxkaXYgY2xhc3M9XCJwb3B1cF93cmFwXCI+XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0PGRpdiBjbGFzcz1cInBvcHVwX2hlYWRlclwiPlNldHVwIFRhc2sgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwicG9wdXBfY2xvc2VcIiBpZD1cInBvcHVwLWNsb3NlLWJ0blwiPng8L2E+PC9kaXY+XFxuJyArXG4gICAgJ1xcbicgK1xuICAgICdcXHQgIFxcdFxcdDxkaXYgY2xhc3M9XCJwb3B1cF9pbm5lclwiPlxcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJwb3B1cF9pbm5lcl9sZWZ0XCI+XFxuJyArXG4gICAgJ1xcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdFxcdDxmb3JtIGFjdGlvbj1cIi9hY3Rpb25fcGFnZS5waHBcIiBjbGFzcz1cInBvcHVwX2Zvcm1cIj5cXG4nICtcbiAgICAnXFx0XFx0XFx0XFx0XFx0ICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgb25jaGFuZ2U9IFwiaW1nY2hhbmdlRnVuY3Rpb24oKVwiIGlkPVwiaW1nX29uZVwiIGNsYXNzPVwicG9wdXBfY2hrYm94IHRvZ2dsZV9faW5wdXRcIiBuYW1lPVwiaW1nX2Noa2JveFwiIHZhbHVlPVwiaW1nX29uZVwiPlxcbicgK1xuICAgICdcXHRcXHRcXHRcXHRcXHQgIDxsYWJlbCBmb3I9XCJpbWdfb25lXCI+Jm5ic3A7IEluc3RhbGwgSGVkZXJhIFdhbGxldDwvbGFiZWw+XFxuJyArXG4gICAgJ1xcdFxcdFxcdFxcdFxcdCAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG9uY2hhbmdlPSBcImltZ2NoYW5nZUZ1bmN0aW9uKClcIiBpZD1cImltZ190d29cIiBjbGFzcz1cInBvcHVwX2Noa2JveCB0b2dnbGVfX2lucHV0XCIgbmFtZT1cImltZ19jaGtib3hcIiB2YWx1ZT1cImltZ190d29cIj5cXG4nICtcbiAgICAnXFx0XFx0XFx0XFx0XFx0ICA8bGFiZWwgZm9yPVwiaW1nX3R3b1wiPiZuYnNwOyBcIlBhaXIgeW91ciBBY2NvdW50XCI8L2xhYmVsPlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnXFx0XFx0XFx0XFx0XFx0ICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgb25jaGFuZ2U9IFwiaW1nY2hhbmdlRnVuY3Rpb24oKVwiIGlkPVwiaW1nX3RocmVlXCIgY2xhc3M9XCJwb3B1cF9jaGtib3ggdG9nZ2xlX19pbnB1dFwiIG5hbWU9XCJpbWdfY2hrYm94XCIgdmFsdWU9XCJpbWdfdGhyZWVcIj5cXG4nICtcbiAgICAnXFx0XFx0XFx0XFx0XFx0ICA8bGFiZWwgZm9yPVwiaW1nX3RocmVlXCI+Jm5ic3A7IFwiQWxsb3cgUGF5bWVudCBSZXF1ZXN0c1wiPC9sYWJlbD5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJ1xcdFxcdFxcdFxcdFxcdCAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG9uY2hhbmdlPSBcImltZ2NoYW5nZUZ1bmN0aW9uKClcIiBpZD1cImltZ19mb3VyXCIgY2xhc3M9XCJwb3B1cF9jaGtib3ggdG9nZ2xlX19pbnB1dFwiIG5hbWU9XCJpbWdfY2hrYm94XCIgdmFsdWU9XCJpbWdfZm91clwiPlxcbicgK1xuICAgICdcXHRcXHRcXHRcXHRcXHQgIDxsYWJlbCBmb3I9XCJpbWdfZm91clwiPiZuYnNwOyBcIkdldCBzb21lIEhCQVJcIjwvbGFiZWw+XFxuJyArXG4gICAgJ1xcdFxcdFxcdFxcdFxcdDwvZm9ybT5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJ1xcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJwb3B1cF9sb2dvXCI+XFxuJyArXG4gICAgJ1xcdFxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJsb2dvX3R4dFwiPlBvd2VyZWQgYnk8L2Rpdj5cXG4nICtcbiAgICAnXFx0XFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cImxvZ29faWNvblwiPjxpbWcgc3JjPVwiLy9hcGkuaGFzaGluZ3N5c3RlbXMuY29tL2ltZy9wb3B1cF9sb2dvLnBuZ1wiPjwvZGl2PlxcbicgK1xuICAgICdcXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHRcXHRcXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHQ8L2Rpdj5cXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfaW5uZXJfcmlnaHRcIj5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cInBvcHVwX2ltZ19zZWNcIj5cXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHRcXHRcXHQ8aW1nIGNsYXNzPVwiaW1nX29uZVwiIHNyYz1cIi8vYXBpLmhhc2hpbmdzeXN0ZW1zLmNvbS9pbWcvaW1nX29uZS5wbmdcIj5cXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHRcXHRcXHQ8aW1nIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIiBjbGFzcz1cImltZ190d29cIiBzcmM9XCIvL2FwaS5oYXNoaW5nc3lzdGVtcy5jb20vaW1nL2ltZ190d28ucG5nXCI+XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0XFx0XFx0PGltZyBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCIgY2xhc3M9XCJpbWdfdGhyZWVcIiBzcmM9XCIvL2FwaS5oYXNoaW5nc3lzdGVtcy5jb20vaW1nL2ltZ190aHJlZS5wbmdcIj5cXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHRcXHRcXHQ8aW1nIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIiBjbGFzcz1cImltZ19mb3VyXCIgc3JjPVwiLy9hcGkuaGFzaGluZ3N5c3RlbXMuY29tL2ltZy9pbWdfZm91ci5wbmdcIj5cXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHRcXHQ8L2Rpdj5cXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwidHh0X3dyYXBcIj5cXG4nICtcbiAgICAnXFx0XFx0ICBcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwidHh0X2hlYWRlclwiPkxldHMgZ2V0IHlvdSBzdGFydGVkITwvZGl2PlxcbicgK1xuICAgICdcXHRcXHQgIFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJ0eHRfY29udGVudFwiPkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LCBzZWQgZG8gZWl1c21vZCB0ZW1wb3IgaW5jaWRpZHVudCB1dCBsYWJvcmUgZXQgPC9kaXY+XFxuJyArXG4gICAgJ1xcdFxcdCAgXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cInBvcHVwX2J0blwiPlxcbicgK1xuICAgICdcXHRcXHQgIFxcdFxcdFxcdFxcdFxcdDxhIGhyZWY9XCJcIj5JXFwnbSBSZWFkeTwvYT5cXG4nICtcbiAgICAnXFx0XFx0ICBcXHRcXHRcXHRcXHQ8L2Rpdj5cXG4nICtcbiAgICAnXFx0XFx0ICBcXHRcXHRcXHQ8L2Rpdj5cXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHRcXHRcXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHQ8L2Rpdj5cXG4nICtcbiAgICAnXFx0ICBcXHRcXHQ8L2Rpdj5cXG4nICtcbiAgICAnXFx0ICBcXHQ8L2Rpdj4nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uc3RydWN0Q29uZmlndXJhdGlvbigpe1xuICAgIHJldHVybiB7XG4gICAgICAgIHBheW1lbnRzZXJ2ZXI6IHByb2R1Y3Rpb24gPyBcImh0dHBzOi8vbXBzLmhhc2hpbmdzeXN0ZW1zLmNvbVwiIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6OTk5OScsXG4gICAgICAgIGV4dGVuc2lvbmlkOiBcImxpZ3Bhb25kYWFiY2xmaWdhZ2NpZm9iYWVsZW1pZW5hXCIsXG4gICAgICAgIGVycm9yOiBcIi9uby1leHRlbnNpb25cIixcbiAgICAgICAgdHlwZTogXCJhcnRpY2xlXCIsXG4gICAgICAgIHRpbWU6IERhdGUubm93KCksXG4gICAgICAgIHJlZGlyZWN0OiAneyBcIm5vblBheWluZ0FjY291bnRcIjogXCIvaW5zdWZmaWNpZW50LWFtb3VudC9cIiwgXCJub0FjY291bnRcIjogXCIvYWNjb3VudC1ub3QtcGFpcmVkL1wiLCBcImhvbWVQYWdlXCI6IFwiL1wifScsXG4gICAgICAgIHN1Ym1pc3Npb25ub2RlOiBcIjAuMC4xMVwiLFxuICAgICAgICBtZW1vOiBEYXRlLm5vdygpLFxuICAgICAgICByZWNpcGllbnRsaXN0OiAnW3sgXCJ0b1wiOiBcIjAuMC45OVwiLCBcInRpbnliYXJzXCI6IFwiMTY2NjY2N1wiIH1dJyxcbiAgICAgICAgY29udGVudGlkOiAnNzknLFxuICAgICAgICBhdHRySUQ6ICdhcnRpY2xlLTEnLFxuICAgICAgICB0aW1lc3RhbXA6IHRpbWVzdGFtcCxcbiAgICAgICAgLyp0aGlzIG1pZ2h0IG1ha2UgYSBnb29kIGRlZmF1bHQgaWQgZm9yIHRoZSBjb250ZW50Ki9cbiAgICAgICAgaWQ6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSxcbiAgICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dlbmVyYWwuanMiLCJjb25zdCBjb25maWcgPSB7XG4gICAgIHByb2R1Y3Rpb24gOiB0cnVlXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWdcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb25maWcuanMiLCJleHBvcnQgZnVuY3Rpb24gZGV0ZWN0bW9iKCkge1xuICAgIHJldHVybiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC93ZWJPUy9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGhvbmUvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBhZC9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUG9kL2kpXG4gICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0JsYWNrQmVycnkvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvV2luZG93cyBQaG9uZS9pKVxuICAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3QoZXh0ZW5zaW9uSWQsIG5vdEluc3RhbGxlZENhbGxiYWNrLCBpbnN0YWxsZWRDYWxsYmFjaykge1xuICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBjb25zb2xlLmxvZyhleHRlbnNpb25JZCk7XG4gICAgaW1nLm9uZXJyb3IgPSBub3RJbnN0YWxsZWRDYWxsYmFjaztcbiAgICBpbWcub25sb2FkID0gaW5zdGFsbGVkQ2FsbGJhY2s7XG4gICAgaW1nLnNyYyA9ICdjaHJvbWUtZXh0ZW5zaW9uOi8vJyArIGV4dGVuc2lvbklkICsgJy9pY29ucy9pY29uMTYucG5nJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZE9iamVjdChhLCBiKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGIpXG4gICAgICAgIGlmIChiLmhhc093blByb3BlcnR5KGtleSkpIGFba2V5XSA9IGJba2V5XTtcbiAgICByZXR1cm4gYTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2hyb21lKCkge1xuICAgIHJldHVybiAnY2hyb21lJyBpbiB3aW5kb3dcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9saWJyYXJpZXMuanMiLCJpbXBvcnQge3BpbmcsIHByZWNoZWNrZXJ9IGZyb20gJy4vc2VydmljZXMnO1xuaW1wb3J0ICogYXMgbWV0aG9kcyBmcm9tICcuL21ldGhvZHMnO1xuaW1wb3J0ICogYXMgZ2VuZXJhbCBmcm9tICcuL2dlbmVyYWwnO1xuaW1wb3J0ICogYXMgQXBpcyBmcm9tICcuL2FwaXMnO1xuaW1wb3J0ICogYXMgbGlicmFyaWVzIGZyb20gJy4vbGlicmFyaWVzJztcblxuLy8gZW5saXN0IGFsbCBtZXRob2RzIHN1cHBvcnRlZCBieSBBUEkgKGUuZy4gYG13KCdldmVudCcsICd1c2VyLWxvZ2luJyk7YClcbmNvbnN0IHN1cHBvcnRlZEFQSSA9IG1ldGhvZHMubWV0aG9kcygpO1xuLyoqXG4gKiBUaGUgbWFpbiBlbnRyeSBvZiB0aGUgYXBwbGljYXRpb25cbiAqL1xuXG5sZXQgY29uZmlndXJhdGlvbnMgPSBnZW5lcmFsLmNvbnN0cnVjdENvbmZpZ3VyYXRpb24oKTtcblxuZnVuY3Rpb24gYXBwKHdpbmRvdykge1xuICAgIC8qICpcbiAgICAgICogYWxsIG1ldGhvZHMgdGhhdCB3ZXJlIGNhbGxlZCB0aWxsIG5vdyBhbmQgc3RvcmVkIGluIHF1ZXVlXG4gICAgICAqIG5lZWRzIHRvIGJlIGNhbGxlZCBub3dcbiAgICAgICogKi9cbiAgICBsZXQgZ2xvYmFsT2JqZWN0ID0gd2luZG93W3dpbmRvd1snSEFTSC1KUyddXTtcbiAgICBsZXQgcXVldWUgPSBnbG9iYWxPYmplY3QucTtcbiAgICBjb25zb2xlLmxvZyhxdWV1ZSk7XG4gICAgaWYgKHF1ZXVlKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgY29uZmlndXJhdGlvbnMgPSBsaWJyYXJpZXMuZXh0ZW5kT2JqZWN0KGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gcXVldWVbaV1bMF07XG4gICAgICAgICAgICBsZXQgY2FsbGJhY2s7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHF1ZXVlW2ldWzFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBxdWV1ZVtpXVsxXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHF1ZXVlW2ldW3F1ZXVlWzBdLmxlbmd0aCAtIDFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBxdWV1ZVtpXVtxdWV1ZVswXS5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHN1cHBvcnRlZEFQSS5pbmRleE9mKG1ldGhvZCkpO1xuICAgICAgICAgICAgaWYgKHN1cHBvcnRlZEFQSS5pbmRleE9mKG1ldGhvZCkgPT09IC0xKVxuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKGBNZXRob2QgJHttZXRob2R9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgICAgICAgICAgIEFwaXNbbWV0aG9kXShjb25maWd1cmF0aW9ucywgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIG92ZXJyaWRlIHRlbXBvcmFyeSAodW50aWwgdGhlIGFwcCBsb2FkZWQpIGhhbmRsZXJcbiAgICAvLyBmb3Igd2lkZ2V0J3MgQVBJIGNhbGxzXG4gICAgZ2xvYmFsT2JqZWN0ID0gQXBpcztcbiAgICBnbG9iYWxPYmplY3QuY29uZmlndXJhdGlvbnMgPSBjb25maWd1cmF0aW9ucztcbn1cblxuYXBwKHdpbmRvdyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsImV4cG9ydCBmdW5jdGlvbiBtZXRob2RzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAgIC8vb2JqZWN0IGNyZWF0aW9uIG1ldGhvZHNcbiAgICAgICAgJ2NyZWF0ZWhlZGVyYW9iamVjdCcsICdjcmVhdGVjb250cmFjdG9iamVjdCcsXG5cbiAgICAgICAgLy9tYWluIGluaXRpYWwgbWV0aG9kXG4gICAgICAgICdpbml0JyxcblxuICAgICAgICAvL3RyYW5zYWN0aW9uIHJlbGF0ZWQgbWV0aG9kc1xuICAgICAgICAnbWFrZXBheW1lbnQnLCAnbWFrZVRyYW5zYWN0aW9uJywgJ2NoZWNrdHJhbnNhY3Rpb24nLFxuXG4gICAgICAgIC8vbW9kYWwgcmVsYXRlZCBtZXRob2RzXG4gICAgICAgICdnZXRtb2RhbCdcbiAgICBdO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21ldGhvZHMuanMiLCJpbXBvcnQgKiBhcyBnZW5lcmFsIGZyb20gJy4vZ2VuZXJhbCc7XG5pbXBvcnQge01vZGFsfSBmcm9tICcuL21vZGFsJztcbmltcG9ydCAqIGFzIGxpYnJhcmllcyBmcm9tICcuL2xpYnJhcmllcyc7XG5pbXBvcnQgKiBhcyBDb25maWcgZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0ICogYXMgc2VydmljZXMgZnJvbSAnLi9zZXJ2aWNlcyc7XG5leHBvcnQgZnVuY3Rpb24gdGVzdCgpe1xuICAgIHJldHVybiAndGluZyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVIZWRlcmFPYmplY3QocGFyYW1zLCBjYWxsYmFjaykge1xuICAgIGxldCBvYmplY3QgPSBbJ3N1Ym1pc3Npb25ub2RlJywgJ3BheW1lbnRzZXJ2ZXInLCAncmVjaXBpZW50bGlzdCcsICdjb250ZW50aWQnLCAndHlwZScsICdtZW1vJywgJ2V4dGVuc2lvbmlkJywgJ3JlZGlyZWN0JywgJ3RpbWUnXTtcbiAgICBsZXQgSGVkZXJhb2JqZWN0ID0gJzxoZWRlcmEtbWljcm9wYXltZW50ICc7XG4gICAgZm9yICh2YXIgaSBpbiBvYmplY3QpIHtcbiAgICAgICAgbGV0IG5vZGUgPSBvYmplY3RbaV07XG4gICAgICAgIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkobm9kZSkpIHtcbiAgICAgICAgICAgIEhlZGVyYW9iamVjdCArPSBcImRhdGEtXCIgKyBub2RlICsgXCI9ICdcIiArIHBhcmFtc1tub2RlXSArIFwiJyAsIFwiICsgXCJcXG5cIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBIZWRlcmFvYmplY3QgKz0gJz48L2hlZGVyYS1taWNyb3BheW1lbnQ+JztcbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmFtc1snYXR0cklEJ10pO1xuICAgIGJvZHkuaW5uZXJIVE1MICs9IEhlZGVyYW9iamVjdDtcbiAgICBjYWxsYmFjayhudWxsLEhlZGVyYW9iamVjdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb250cmFjdE9iamVjdChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgbGV0IF9fY29uc3RydWN0ID0gWydjb250cmFjdGlkJywgJ21heGltdW0nLCAncGF5bWVudHNlcnZlcicsICdwYXJhbXMnLCAnbWVtbycsICdhYmknLCAncmVkaXJlY3QnLCAnZXh0ZW5zaW9uaWQnXTtcbiAgICBsZXQgb2JqZWN0ID0ge1xuICAgICAgICBjb250cmFjdGlkOiAnMC4wLjExMTEnLFxuICAgICAgICBtYXhpbXVtOiAnNDIyMzQyMzQzJyxcbiAgICAgICAgcGF5bWVudHNlcnZlcjogcGFyYW1zLnBheW1lbnRzZXJ2ZXIsXG4gICAgICAgIHBhcmFtczogW1wiODY5XCIsIFwiMTAwMDAwMDAwXCIsIFwiMjE2XCIsIFwiMjUzXCIsIFwiMjdcIiwgXCIweDIyNmIwODk3NmFkMGRkOTgyYWViNmIyMWE0NGYzZWFjYWU1Nzk1NjljMzRlNzE3MjVhZmY4MDFhMmZlNjg3MzlcIiwgXCIweDMzM2Y5OTFmYTNhODcwNTc1ZjgxOTU2OWU5ZjcyYTc3MWVhNzkwMDc4ZDQ0OGNjODc4OTEyMGVlMTRhYmYzYzVcIl0sXG4gICAgICAgIG1lbW86ICdhNGE3YzQzMjlhYWI0YjFmYWM0NzRmZjZmOTNkODU4YycsXG4gICAgICAgIGFiaTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgXCJjb25zdGFudFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiaW5wdXRzXCI6IFt7XCJuYW1lXCI6IFwicHJvcGVydHlJRFwiLCBcInR5cGVcIjogXCJ1aW50MjRcIn0sIHtcIm5hbWVcIjogXCJhbW91bnRcIiwgXCJ0eXBlXCI6IFwidWludDI1NlwifSwge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcInhcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ1aW50MTZcIlxuICAgICAgICAgICAgfSwge1wibmFtZVwiOiBcInlcIiwgXCJ0eXBlXCI6IFwidWludDE2XCJ9LCB7XCJuYW1lXCI6IFwidlwiLCBcInR5cGVcIjogXCJ1aW50OFwifSwge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcInJcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJieXRlczMyXCJcbiAgICAgICAgICAgIH0sIHtcIm5hbWVcIjogXCJzXCIsIFwidHlwZVwiOiBcImJ5dGVzMzJcIn1dLFxuICAgICAgICAgICAgXCJuYW1lXCI6IFwiYnV5UHJvcGVydHlcIixcbiAgICAgICAgICAgIFwib3V0cHV0c1wiOiBbe1wibmFtZVwiOiBcIlwiLCBcInR5cGVcIjogXCJzdHJpbmdcIn1dLFxuICAgICAgICAgICAgXCJwYXlhYmxlXCI6IHRydWUsXG4gICAgICAgICAgICBcInN0YXRlTXV0YWJpbGl0eVwiOiBcInBheWFibGVcIixcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImZ1bmN0aW9uXCJcbiAgICAgICAgfSksXG4gICAgICAgIHJlZGlyZWN0OiAne1wibm9uUGF5aW5nQWNjb3VudFwiOiBcIi9pbnN1ZmZpY2llbnQtYW1vdW50L1wiLFwibm9BY2NvdW50XCI6IFwiL2FjY291bnQtbm90LXBhaXJlZFwiLFwiaG9tZVBhZ2VcIjogXCIvXCJ9JyxcbiAgICAgICAgZXh0ZW5zaW9uaWQ6ICdwZGpqcGNvbGdtbWNpZmlqcGVqa2VucGJiaW1lZHBpYycsXG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKEpTT04ucGFyc2Uob2JqZWN0LmFiaSkpO1xuICAgIGxldCBleHRlbmRlZCA9IGxpYnJhcmllcy5leHRlbmRPYmplY3Qob2JqZWN0LCBwYXJhbXMpO1xuICAgIGNvbnNvbGUubG9nKGV4dGVuZGVkKTtcbiAgICBsZXQgQ29udHJhY3RvYmplY3QgPSAnPGhlZGVyYS1jb250cmFjdCAnO1xuICAgIGZvciAodmFyIGkgaW4gX19jb25zdHJ1Y3QpIHtcbiAgICAgICAgbGV0IG5vZGUgPSBfX2NvbnN0cnVjdFtpXTtcbiAgICAgICAgaWYgKGV4dGVuZGVkLmhhc093blByb3BlcnR5KG5vZGUpKSB7XG4gICAgICAgICAgICBDb250cmFjdG9iamVjdCArPSBcImRhdGEtXCIgKyBub2RlICsgXCI9ICdcIiArIGV4dGVuZGVkW25vZGVdICsgXCInIFwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIENvbnRyYWN0b2JqZWN0ICs9ICc+PC9oZWRlcmEtY29udHJhY3Q+JztcbiAgICBjb25zb2xlLmxvZyhDb250cmFjdG9iamVjdCk7XG5cbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGV4dGVuZGVkWydhdHRySUQnXSk7XG4gICAgYm9keS5pbm5lckhUTUwgKz0gQ29udHJhY3RvYmplY3Q7XG4gICAgY2FsbGJhY2sobnVsbCxDb250cmFjdG9iamVjdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1RyYW5zYWN0aW9uKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICBsZXQgbWVtb19pZCA9IHBhcmFtcy5jb25maWd1cmF0aW9uLm1lbW87XG4gICAgbGV0IHVybCA9IENvbmZpZy5kZWZhdWx0LnByb2R1Y3Rpb24gPyBcImh0dHBzOi8vbXBzLmhhc2hpbmdzeXN0ZW1zLmNvbVwiIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6OTk5OSc7XG4gICAgbGV0IHN0cnVjdHVyZSA9IHtcbiAgICAgICAgYmFzZXVybDogdXJsLFxuICAgICAgICBtZW1vX2lkOiBtZW1vX2lkLFxuICAgICAgICByZWNlaXZlcl9pZDogJycsXG4gICAgICAgIHN1Y2Nlc3M6ICcvc3VjY2VzcycsXG4gICAgICAgIGZhaWx1cmU6ICcvcGF5bWVudC1mYWlsZWQnLFxuICAgICAgICB0aW1lb3V0OiAzMDAwLFxuICAgICAgICBsaW1pdDogMVxuICAgIH07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gcGFyYW1zLnBhcmFtcykge1xuICAgICAgICBpZiAocGFyYW1zLnBhcmFtcy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHBhcmFtcy5wYXJhbXNba2V5XSkge1xuICAgICAgICAgICAgc3RydWN0dXJlW2tleV0gPSBwYXJhbXMucGFyYW1zW2tleV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3RydWN0dXJlLnJlY2VpdmVyX2lkICYmIHN0cnVjdHVyZS5tZW1vX2lkKSB7XG4gICAgICAgIFVSTCA9IHN0cnVjdHVyZS5iYXNldXJsICsgXCIvY2hlY2svXCIgKyBzdHJ1Y3R1cmUucmVjZWl2ZXJfaWQgKyBcIi9cIiArIHN0cnVjdHVyZS5tZW1vX2lkXG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHN0cnVjdHVyZS50aW1lc3RhbXApXG4gICAgICAgICAgICBVUkwgPSBzdHJ1Y3R1cmUuYmFzZXVybCArIFwiL21lbW8vXCIgKyBzdHJ1Y3R1cmUubWVtb19pZCArICc/bGltaXQ9JyArIHN0cnVjdHVyZS5saW1pdCArICcmdGltZXN0YW1wPScgKyBzdHJ1Y3R1cmUudGltZXN0YW1wO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBVUkwgPSBzdHJ1Y3R1cmUuYmFzZXVybCArIFwiL21lbW8vXCIgKyBzdHJ1Y3R1cmUubWVtb19pZCArICc/bGltaXQ9JyArIHN0cnVjdHVyZS5saW1pdDtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhzdHJ1Y3R1cmUudGltZW91dCk7XG4gICAgLy9zZXRUaW1lb3V0KHBlcmZvcm1SZXF1ZXN0KHN0cnVjdHVyZSksIHN0cnVjdHVyZS50aW1lb3V0KVxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBwZXJmb3JtUmVxdWVzdChzdHJ1Y3R1cmUpO1xuICAgIH0sIHN0cnVjdHVyZS50aW1lb3V0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQocGFyYW1zLCBjYWxsYmFjaykge1xuICAgIGxldCByZXNwb25zZSA9IHtcbiAgICAgICAgYWNjb3VudFBhaXJlZDogZmFsc2UsXG4gICAgICAgIGlzbW9iaWxlOiBudWxsLFxuICAgICAgICB2YWxpZEJyb3dzZXI6IG51bGwsXG4gICAgICAgIGV4dGVuc2lvbkluc3RhbGxlZDogbnVsbCxcbiAgICAgICAgYWNjZXNzVG9BY2NvdW50czogbnVsbCxcbiAgICAgICAgYWNjb3VudElkOiBudWxsLFxuICAgICAgICBzdWJtaXNzaW9uTm9kZTogcGFyYW1zLnN1Ym1pc3Npb25ub2RlLFxuICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgdHhuX3N1Y2Nlc3M6IGZhbHNlXG4gICAgfTtcbiAgICByZXNwb25zZS52YWxpZEJyb3dzZXIgPSBsaWJyYXJpZXMuaXNDaHJvbWUoKTtcbiAgICByZXNwb25zZS5pc21vYmlsZSA9IGxpYnJhcmllcy5kZXRlY3Rtb2IoKTtcbiAgICBsaWJyYXJpZXMuZGV0ZWN0KHBhcmFtcy5leHRlbnNpb25pZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXNwb25zZS5leHRlbnNpb25JbnN0YWxsZWQgPSBmYWxzZTtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UpO1xuICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVzcG9uc2UuZXh0ZW5zaW9uSW5zdGFsbGVkID0gdHJ1ZTtcbiAgICAgICAgY3JlYXRlSGVkZXJhT2JqZWN0KHBhcmFtcywgZnVuY3Rpb24oZXJyLCBob2JqZWN0KXtcbiAgICAgICAgICAgIGlmKGhvYmplY3Qpe1xuICAgICAgICAgICAgICAgIGxldCB1cmwgPSBDb25maWcuZGVmYXVsdC5wcm9kdWN0aW9uID8gXCJodHRwczovL21wcy5oYXNoaW5nc3lzdGVtcy5jb21cIiA6ICdodHRwOi8vbG9jYWxob3N0Ojk5OTknO1xuICAgICAgICAgICAgICAgIFVSTCA9IHVybCArIFwiL21lbW8vXCIgKyBwYXJhbXMubWVtbztcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHhodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWpheHJlc3AgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhamF4cmVzcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhamF4cmVzcC5yZXNwb25zZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzZXJ2aWNlcy5wcmVjaGVja2VyKGFqYXhyZXNwLnJlc3BvbnNlWzBdLm5vZGVwcmVjaGVjaykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuYWNjb3VudElkID0gYWpheHJlc3AucmVzcG9uc2VbMF0uc2VuZGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuYWNjb3VudFBhaXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5hY2Nlc3NUb0FjY291bnRzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhamF4cmVzcC5yZXNwb25zZVswXS5ub2RlcHJlY2hlY2sgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS50eG5fc3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5lcnJvciA9IHNlcnZpY2VzLnByZWNoZWNrZXIoYWpheHJlc3AucmVzcG9uc2VbMF0ubm9kZXByZWNoZWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmFjY291bnRQYWlyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuYWNjZXNzVG9BY2NvdW50cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB4aHR0cC5vcGVuKFwiR0VUXCIsIFVSTCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHhodHRwLnNlbmQoKTtcbiAgICAgICAgICAgICAgICB9LCA1MDAwKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHsnc3VjY2Vzcyc6ZmFsc2UsJ21lc3NhZ2UnOidDb3VsZCBub3QgY3JlYXRlIGhlZGVyYSBvYmplY3QnfSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy9jYWxsYmFjayhudWxsLHJlc3BvbnNlKTtcbiAgICB9KTtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0bW9kYWwoKSB7XG4gICAgdmFyIG15Q29udGVudCA9IGdlbmVyYWwuZ2V0bW9kYWxDb250ZW50KCk7XG4gICAgdmFyIG15TW9kYWwgPSBuZXcgTW9kYWwoe1xuICAgICAgICBjb250ZW50OiBteUNvbnRlbnRcbiAgICB9KTtcbiAgICBteU1vZGFsLm9wZW4oKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VUcmFuc2FjdGlvbihjb25maWd1cmF0aW9uLCBjYWxsYmFjaykge1xuICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgIHRyYW5zYWN0aW9uX3Byb2Nlc2luZzogdHJ1ZSxcbiAgICAgICAgdHJhbnNhY3Rpb25fZmFpbGVkOiBmYWxzZSxcbiAgICAgICAgdHJhbnNhY3Rpb25fc3VjY2VzczogZmFsc2VcbiAgICB9O1xuICAgIGluaXQoY29uZmlndXJhdGlvbiwgZnVuY3Rpb24oZXJyLCByZXMpe1xuICAgICAgICBpZihlcnIpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgICAgaWYocmVzKXtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcGlzLmpzIiwiLy8gRGVmaW5lIG91ciBjb25zdHJ1Y3RvclxuZnVuY3Rpb24gTW9kYWwoKSB7XG4gICAgLy8gQ3JlYXRlIGdsb2JhbCBlbGVtZW50IHJlZmVyZW5jZXNcbiAgICB0aGlzLmNsb3NlQnV0dG9uID0gbnVsbDtcbiAgICB0aGlzLm1vZGFsID0gbnVsbDtcbiAgICB0aGlzLm92ZXJsYXkgPSBudWxsO1xuXG4gICAgLy8gRGV0ZXJtaW5lIHByb3BlciBwcmVmaXhcbiAgICB0aGlzLnRyYW5zaXRpb25FbmQgPSB0cmFuc2l0aW9uU2VsZWN0KCk7XG5cbiAgICAvLyBEZWZpbmUgb3B0aW9uIGRlZmF1bHRzXG4gICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICBhdXRvT3BlbjogZmFsc2UsXG4gICAgICAgIGNsYXNzTmFtZTogJ2ZhZGUtYW5kLWRyb3AnLFxuICAgICAgICBjbG9zZUJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgY29udGVudDogXCJcIixcbiAgICAgICAgbWF4V2lkdGg6IDYwMCxcbiAgICAgICAgbWluV2lkdGg6IDI4MCxcbiAgICAgICAgb3ZlcmxheTogZmFsc2VcbiAgICB9O1xuXG4gICAgLy8gQ3JlYXRlIG9wdGlvbnMgYnkgZXh0ZW5kaW5nIGRlZmF1bHRzIHdpdGggdGhlIHBhc3NlZCBpbiBhcnVnbWVudHNcbiAgICBpZiAoYXJndW1lbnRzWzBdICYmIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gZXh0ZW5kRGVmYXVsdHMoZGVmYXVsdHMsIGFyZ3VtZW50c1swXSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvT3BlbiA9PT0gdHJ1ZSkgdGhpcy5vcGVuKCk7XG5cbn1cblxuLy8gUHVibGljIE1ldGhvZHNcbk1vZGFsLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgXyA9IHRoaXM7XG4gICAgdGhpcy5tb2RhbC5jbGFzc05hbWUgPSB0aGlzLm1vZGFsLmNsYXNzTmFtZS5yZXBsYWNlKFwiIGhhc2gtb3BlblwiLCBcIlwiKTtcbiAgICB0aGlzLm92ZXJsYXkuY2xhc3NOYW1lID0gdGhpcy5vdmVybGF5LmNsYXNzTmFtZS5yZXBsYWNlKFwiIGhhc2gtb3BlblwiLCBcIlwiKTtcbiAgICB0aGlzLm1vZGFsLmFkZEV2ZW50TGlzdGVuZXIodGhpcy50cmFuc2l0aW9uRW5kLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF8ubW9kYWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChfLm1vZGFsKTtcbiAgICB9KTtcbiAgICB0aGlzLm92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLnRyYW5zaXRpb25FbmQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKF8ub3ZlcmxheS5wYXJlbnROb2RlKSBfLm92ZXJsYXkucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChfLm92ZXJsYXkpO1xuICAgIH0pO1xufTtcblxuTW9kYWwucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgYnVpbGRPdXQuY2FsbCh0aGlzKTtcbiAgICBpbml0aWFsaXplRXZlbnRzLmNhbGwodGhpcyk7XG4gICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5tb2RhbCkuaGVpZ2h0O1xuICAgIHRoaXMubW9kYWwuY2xhc3NOYW1lID0gdGhpcy5tb2RhbC5jbGFzc05hbWUgKyAodGhpcy5tb2RhbC5vZmZzZXRIZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQgPyBcIiBoYXNoLW9wZW4gaGFzaC1hbmNob3JlZFwiIDogXCIgaGFzaC1vcGVuXCIpO1xuICAgIC8vdGhpcy5vdmVybGF5LmNsYXNzTmFtZSA9IHRoaXMub3ZlcmxheS5jbGFzc05hbWUgKyBcIiBoYXNoLW9wZW5cIjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfY2xvc2UnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9vdXRlcl93cmFwJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH07XG59O1xuXG4vLyBQcml2YXRlIE1ldGhvZHNcbmZ1bmN0aW9uIGJ1aWxkT3V0KCkge1xuXG4gICAgdmFyIGNvbnRlbnQsIGNvbnRlbnRIb2xkZXIsIGRvY0ZyYWc7XG5cbiAgICAvKlxuICAgICAqIElmIGNvbnRlbnQgaXMgYW4gSFRNTCBzdHJpbmcsIGFwcGVuZCB0aGUgSFRNTCBzdHJpbmcuXG4gICAgICogSWYgY29udGVudCBpcyBhIGRvbU5vZGUsIGFwcGVuZCBpdHMgY29udGVudC5cbiAgICAgKi9cblxuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLmNvbnRlbnQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgY29udGVudCA9IHRoaXMub3B0aW9ucy5jb250ZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRlbnQgPSB0aGlzLm9wdGlvbnMuY29udGVudC5pbm5lckhUTUw7XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIGEgRG9jdW1lbnRGcmFnbWVudCB0byBidWlsZCB3aXRoXG4gICAgZG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgIC8vIENyZWF0ZSBtb2RhbCBlbGVtZW50XG4gICAgdGhpcy5tb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5tb2RhbC5jbGFzc05hbWUgPSBcImhhc2gtbW9kYWwgXCIgKyB0aGlzLm9wdGlvbnMuY2xhc3NOYW1lO1xuICAgIC8qdGhpcy5tb2RhbC5zdHlsZS5taW5XaWR0aCA9IHRoaXMub3B0aW9ucy5taW5XaWR0aCArIFwicHhcIjtcbiAgICB0aGlzLm1vZGFsLnN0eWxlLm1heFdpZHRoID0gdGhpcy5vcHRpb25zLm1heFdpZHRoICsgXCJweFwiOyovXG5cbiAgICAvLyBJZiBjbG9zZUJ1dHRvbiBvcHRpb24gaXMgdHJ1ZSwgYWRkIGEgY2xvc2UgYnV0dG9uXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jbG9zZUJ1dHRvbiA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcHVwLWNsb3NlLWJ0bicpO1xuICAgIH1cblxuICAgIC8vIENyZWF0ZSBjb250ZW50IGFyZWEgYW5kIGFwcGVuZCB0byBtb2RhbFxuICAgIGNvbnRlbnRIb2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnRlbnRIb2xkZXIuY2xhc3NOYW1lID0gXCJoYXNoLWNvbnRlbnRcIjtcbiAgICBjb250ZW50SG9sZGVyLmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgdGhpcy5tb2RhbC5hcHBlbmRDaGlsZChjb250ZW50SG9sZGVyKTtcblxuICAgIC8vIEFwcGVuZCBtb2RhbCB0byBEb2N1bWVudEZyYWdtZW50XG4gICAgZG9jRnJhZy5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsKTtcblxuICAgIC8vIEFwcGVuZCBEb2N1bWVudEZyYWdtZW50IHRvIGJvZHlcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvY0ZyYWcpO1xuXG59XG5cbmltZ2NoYW5nZUZ1bmN0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjaGJveHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShcImltZ19jaGtib3hcIik7XG4gICAgdmFyIHZhcl9jaGVjayA9IFwiXCI7XG5cbiAgICB2YXIgaW1nX2FsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJpbWdfYWxsXCIpO1xuXG4gICAgZm9yKHZhciBpPTA7aTxjaGJveHMubGVuZ3RoO2krKykge1xuICAgICAgICBpZihjaGJveHNbaV0uY2hlY2tlZCl7XG4gICAgICAgICAgICB2YXJfY2hlY2sgPSB2YXJfY2hlY2suY29uY2F0KGNoYm94c1tpXS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZih2YXJfY2hlY2sgPT0gJ2ltZ19vbmUnKXtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ190d28nKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfdGhyZWUnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfZm91cicpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ19vbmUnKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBpZih2YXJfY2hlY2sgPT0gJ2ltZ19vbmVpbWdfdHdvJykge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX29uZScpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ190aHJlZScpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ19mb3VyJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX3R3bycpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIGlmKHZhcl9jaGVjayA9PSAnaW1nX29uZWltZ190d29pbWdfdGhyZWUnKXtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ19vbmUnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfdHdvJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX2ZvdXInKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfdGhyZWUnKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBpZih2YXJfY2hlY2sgPT0gJ2ltZ19vbmVpbWdfdHdvaW1nX3RocmVlaW1nX2ZvdXInKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfb25lJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX3R3bycpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ190aHJlZScpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ19mb3VyJykuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBleHRlbmREZWZhdWx0cyhzb3VyY2UsIHByb3BlcnRpZXMpIHtcbiAgICB2YXIgcHJvcGVydHk7XG4gICAgZm9yIChwcm9wZXJ0eSBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICAgICAgc291cmNlW3Byb3BlcnR5XSA9IHByb3BlcnRpZXNbcHJvcGVydHldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2U7XG59XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVFdmVudHMoKSB7XG4gICAgaWYgKHRoaXMuY2xvc2VCdXR0b24pIHtcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2UuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3ZlcmxheSkge1xuICAgICAgICB0aGlzLm92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlLmJpbmQodGhpcykpO1xuICAgIH1cblxufVxuXG5mdW5jdGlvbiB0cmFuc2l0aW9uU2VsZWN0KCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgaWYgKGVsLnN0eWxlLldlYmtpdFRyYW5zaXRpb24pIHJldHVybiBcIndlYmtpdFRyYW5zaXRpb25FbmRcIjtcbiAgICBpZiAoZWwuc3R5bGUuT1RyYW5zaXRpb24pIHJldHVybiBcIm9UcmFuc2l0aW9uRW5kXCI7XG4gICAgcmV0dXJuICd0cmFuc2l0aW9uZW5kJztcbn1cbi8vZXhwb3J0aW5nIG1vZHVsZVxubW9kdWxlLmV4cG9ydHMuTW9kYWwgPSBNb2RhbDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb2RhbC5qcyJdLCJzb3VyY2VSb290IjoiIn0=