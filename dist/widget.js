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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modal__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__modal__);

 // enlist all methods supported by API (e.g. `mw('event', 'user-login');`)

var supportedAPI = ['makepayment', 'test', 'createhederaobject', 'checktransaction', 'getmodal', 'createcontractobject', 'init', 'transactionnodechecker'];
/**
 The main entry of the application
 */

var production = true;

function app(window) {
  console.log('HASH-JS starting');
  var today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
      time = today.getHours() + ":" + today.getMinutes(),
      dateTime = date + ' ' + time,
      timestamp = new Date(dateTime).getTime();
  var configurations = {
    paymentserver: production ? "https://mps.hashingsystems.com" : 'http://localhost:9999',
    extensionid: "ligpaondaabclfigagcifobaelemiena",
    error: "/no-extension",
    type: "article",
    time: Date.now(),
    redirect: '{ "nonPayingAccount": "/insufficient-amount/", "noAccount": "/account-not-paired/", "homePage": "/"}',
    // this might make a good default id for the content
    id: window.location.pathname,
    submissionnode: "0.0.11",
    memo: Date.now(),
    recipientlist: '[{ "to": "0.0.99", "tinybars": "1666667" }]',
    contentid: '79',
    attrID: 'article-1',
    timestamp: timestamp //redirect:'{ "nonPayingAccount": "/insufficient-amount/", "noAccount": "/account-not-paired/", "homePage": "/" }',

  }; // all methods that were called till now and stored in queue
  // needs to be called now

  var globalObject = window[window['HASH-JS']];
  var queue = globalObject.q;

  if (queue) {
    for (var i = 0; i < queue.length; i++) {
      if (typeof queue[i][0] !== 'undefined' && queue[i][0].toLowerCase() == 'makepayment') {
        configurations = extendObject(configurations, queue[i][1]);
        createHederaObject(configurations);
        console.log('HASH-JS started', configurations);
        checkForExtension(configurations);
      } else if (typeof queue[i][0] !== 'undefined' && queue[i][0].toLowerCase() == 'createcontractobject') {
        configurations = extendObject(configurations, queue[i][1]);
        apiHandler(configurations, queue[i][0], queue[i][1], queue[i][2]);
        checkForExtension(configurations);
      } else {
        var callback = void 0;

        if (typeof queue[i][1] == 'function') {
          callback = queue[i][1];
        } else {
          callback = queue[i][queue[0].length - 1];
        }

        configurations = extendObject(configurations, queue[i][1]);
        apiHandler(configurations, queue[i][0], queue[i][1], callback);
      }
    }
  } // override temporary (until the app loaded) handler
  // for widget's API calls


  globalObject = apiHandler;
  globalObject.configurations = configurations;
}

function checkForExtension(configurations) {
  if (!isChrome()) {
    redirectToError('/isnotChrome');
  } else {
    var tags = configurations; // if tags.amount is null or undefined, we should assume that this is a free page and do nothing more

    if (tags.amount === null) return null;
    var EXTENSION_ID = tags.extensionid;
    detect(EXTENSION_ID, function () {
      redirectToError(tags.error);
    }, function (response) {
      console.log('detect: user has extension installed');
      recordResponse(response);
    }); //console.log(chrome.runtime.connect(EXTENSION_ID,'version'));

    /*chrome.runtime.sendMessage(EXTENSION_ID, 'version', response => {
        console.log(response)
        return;
        if (!response) {
            redirectToError(tags.error);
        } else {
            recordResponse(response);
        }
    })*/
  }
}

function detect(extensionId, notInstalledCallback, installedCallback) {
  var img = new Image();
  console.log(extensionId);
  img.onerror = notInstalledCallback;
  img.onload = installedCallback;
  img.src = 'chrome-extension://' + extensionId + '/icons/icon16.png';
}

function recordResponse(res) {
  if (typeof res != 'undefined') {
    var body = document.getElementsByTagName('body');
    body.innerHTML += '<div style="width:100%;height:5%;opacity:0.3;z-index:100;background:yellow;">' + res + '</div>';
    return true;
  }

  return false;
}

function redirectToError(err) {
  if (window.location.pathname != err) {
    window.location.replace(window.origin + err);
  }
}

function isChrome() {
  return 'chrome' in window;
}
/**
 Method that handles all API calls
 */


function apiHandler(configuration, api, params) {
  var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  if (!api) throw Error('API method required');
  api = api.toLowerCase();
  if (supportedAPI.indexOf(api) === -1) throw Error("Method ".concat(api, " is not supported"));
  console.log("Handling API call ".concat(api), params); //return api+'('+params+')';

  switch (api) {
    // TODO: add API implementation
    case 'createhederaobject':
      return createHederaObject(params);

    case 'checktransaction':
      return checkTransaction({
        configuration: configuration,
        params: params
      }, callback);

    case 'createcontractobject':
      return createContractObject({
        configuration: configuration,
        params: params
      }, callback);

    case 'init':
      return init(configuration, callback);

    case 'getmodal':
      return getmodal();

    case 'test':
      return params;

    default:
      console.warn("No handler defined for ".concat(api));
  }
}

function extendObject(a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) a[key] = b[key];
  }

  return a;
}

function createHederaObject(params) {
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
  return Hederaobject;
}

function createContractObject(params) {
  var __construct = ['contractid', 'maximum', 'paymentserver', 'params', 'memo', 'abi', 'redirect', 'extensionid'];
  var object = {
    contractid: '0.0.1111',
    maximum: '422342343',
    paymentserver: params.configuration.paymentserver,
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
  var extended = extendObject(object, params.params);
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
  body.innerHTML += Contractobject; //console.log((Hederaobject))

  return Contractobject; //callback(Hederaobject);
}

function checkTransaction(params) {
  var memo_id = params.configuration.memo;
  var url = production ? "https://mps.hashingsystems.com" : 'http://localhost:9999';
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

var performRequest = function performRequest(structure) {
  console.log(structure);
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        var response = JSON.parse(this.response);
        console.log(response);
        console.log(response.response.length);

        if (response.response.length >= 1) {
          if (response.response[0].nodeprecheck == 0) window.location.replace(window.origin + structure.success);
          /*else if(prechecker(response.response[0].nodeprecheck)=='INSUFFICIENT_TX_FEE')
              window.location.replace(window.origin + 'insufficient-amount');*/
          else console.log(Object(__WEBPACK_IMPORTED_MODULE_0__services__["a" /* prechecker */])(response.response[0].nodeprecheck));
        } else {
          console.log(response); //window.location.replace(window.origin + structure.failure);
        } //window.location.replace(window.origin + structure.success);
        //callback(null, this.response);

      } else {
        //callback({error: true, data: this.response}, null);
        window.location.replace(window.origin + structure.failure);
      }
    }
  };

  xhttp.open("GET", URL, true);
  xhttp.send();
};

function init(params, callback) {
  var response = {
    ischrome: true,
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
  var checkIsChrome = isChrome();
  response.ischrome = checkIsChrome;
  var mob = detectmob();
  response.ismobile = mob;
  detect(params.extensionid, function () {
    response.extensionInstalled = false;
    callback(null, response);
  }, function () {
    console.log("sucked");
    response.extensionInstalled = true;
    var object = createHederaObject(params);
    var url = production ? "https://mps.hashingsystems.com" : 'http://localhost:9999';
    URL = url + "/memo/" + params.memo;
    setTimeout(function () {
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            var ajaxresp = JSON.parse(this.response);
            console.log(ajaxresp);

            if (ajaxresp.response.length > 0) {
              console.log(Object(__WEBPACK_IMPORTED_MODULE_0__services__["a" /* prechecker */])(ajaxresp.response[0].nodeprecheck));
              response.accountId = ajaxresp.response[0].sender;
              response.accountPaired = true;
              response.accessToAccounts = true;

              if (ajaxresp.response[0].nodeprecheck === 0) {
                response.txn_success = true;
              }

              response.error = Object(__WEBPACK_IMPORTED_MODULE_0__services__["a" /* prechecker */])(ajaxresp.response[0].nodeprecheck);
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
    }, 5000); //callback(null,response);
  });
}

function detectmob() {
  if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
    return true;
  } else {
    return false;
  }
}

function getmodal() {
  var myContent = '<div class="popup_outer_wrap">\n' + '\t  \t<div class="popup_wrap">\n' + '\t  \t\t<div class="popup_header">Setup Task <a href="javascript:void(0)" class="popup_close">x</a></div>\n' + '\n' + '\t  \t\t<div class="popup_inner">\n' + '\t  \t\t\t<div class="popup_inner_left">\n' + '\n' + '\t  \t\t\t\t<form action="/action_page.php" class="popup_form">\n' + '\t\t\t\t\t  <input type="checkbox" id="img_one" class="popup_chkbox toggle__input" name="img_one" value="img_one" checked>\n' + '\t\t\t\t\t  <label for="img_one">&nbsp; Install Hedera Wallet</label>\n' + '\t\t\t\t\t  <input type="checkbox" id="img_two" class="popup_chkbox toggle__input" name="img_two" value="img_two">\n' + '\t\t\t\t\t  <label for="img_two">&nbsp; "Pair your Account"</label>\n' + '\n' + '\t\t\t\t\t  <input type="checkbox" id="img_three" class="popup_chkbox toggle__input" name="img_three" value="img_three">\n' + '\t\t\t\t\t  <label for="img_three">&nbsp; "Allow Payment Requests"</label>\n' + '\n' + '\t\t\t\t\t  <input type="checkbox" id="img_four" class="popup_chkbox toggle__input" name="img_four" value="img_four">\n' + '\t\t\t\t\t  <label for="img_four">&nbsp; "Get some HBAR"</label>\n' + '\t\t\t\t\t</form>\n' + '\n' + '\t\t\t\t\t<div class="popup_logo">\n' + '\t\t\t\t\t\t<div class="logo_txt">Powered by</div>\n' + '\t\t\t\t\t\t<div class="logo_icon"><img src="//api.hashingsystems.com/img/popup_logo.png"></div>\n' + '\t\t\t\t\t</div>\n' + '\t  \t\t\t\t\n' + '\t  \t\t\t</div>\n' + '\t  \t\t\t<div class="popup_inner_right">\n' + '\n' + '\t  \t\t\t\t<div class="popup_img_sec">\n' + '\t  \t\t\t\t\t<img class="img_one" src="//api.hashingsystems.com/img/img_one.png">\n' + '\t  \t\t\t\t\t<img style="display: none;" class="img_two" src="//api.hashingsystems.com/img/img_two.png">\n' + '\t  \t\t\t\t\t<img style="display: none;" class="img_three" src="//api.hashingsystems.com/img/img_three.png">\n' + '\t  \t\t\t\t\t<img style="display: none;" class="img_four" src="//api.hashingsystems.com/img/img_four.png">\n' + '\t  \t\t\t\t</div>\n' + '\t  \t\t\t\t<div class="txt_wrap">\n' + '\t\t  \t\t\t\t<div class="txt_header">Lets get you started!</div>\n' + '\t\t  \t\t\t\t<div class="txt_content">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et </div>\n' + '\t\t  \t\t\t\t<div class="popup_btn">\n' + '\t\t  \t\t\t\t\t<a href="">I\'m Ready</a>\n' + '\t\t  \t\t\t\t</div>\n' + '\t\t  \t\t\t</div>\n' + '\t  \t\t\t\t\n' + '\t  \t\t\t</div>\n' + '\t  \t\t</div>\n' + '\t  \t</div>\n' + '\t</div>\n';
  var myModal = new __WEBPACK_IMPORTED_MODULE_1__modal__["Modal"]({
    content: myContent
  });
  myModal.open();
}

app(window);

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Define our constructor
function Modal() {
  console.log("test"); // Create global element references

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
    overlay: true
  };
  console.log(this); // Create options by extending defaults with the passed in arugments

  if (arguments[0] && _typeof(arguments[0]) === "object") {
    this.options = extendDefaults(defaults, arguments[0]);
  }

  if (this.options.autoOpen === true) this.open();
} // Public Methods


Modal.prototype.close = function () {
  var _ = this;

  console.log(this.modal.className);
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
  this.modal.className = this.modal.className + (this.modal.offsetHeight > window.innerHeight ? " hash-open hash-anchored" : " hash-open");
  this.overlay.className = this.overlay.className + " hash-open";
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
  this.modal.style.minWidth = this.options.minWidth + "px";
  this.modal.style.maxWidth = this.options.maxWidth + "px"; // Create content area and append to modal

  contentHolder = document.createElement("div");
  contentHolder.className = "hash-content";
  contentHolder.innerHTML = content;
  this.modal.appendChild(contentHolder); // Append modal to DocumentFragment

  docFrag.appendChild(this.modal); // Append DocumentFragment to body

  document.body.appendChild(docFrag);
}

function extendDefaults(source, properties) {
  var property;

  for (property in properties) {
    if (properties.hasOwnProperty(property)) {
      source[property] = properties[property];
    }
  }

  console.log(source);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGRkMjIzMzdkNjlkYTA4MjczOTYiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2RhbC5qcyJdLCJuYW1lcyI6WyJzdXBwb3J0ZWRBUEkiLCJwcm9kdWN0aW9uIiwiYXBwIiwid2luZG93IiwiY29uc29sZSIsImxvZyIsInRvZGF5IiwiRGF0ZSIsImRhdGUiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsInRpbWUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJkYXRlVGltZSIsInRpbWVzdGFtcCIsImdldFRpbWUiLCJjb25maWd1cmF0aW9ucyIsInBheW1lbnRzZXJ2ZXIiLCJleHRlbnNpb25pZCIsImVycm9yIiwidHlwZSIsIm5vdyIsInJlZGlyZWN0IiwiaWQiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwic3VibWlzc2lvbm5vZGUiLCJtZW1vIiwicmVjaXBpZW50bGlzdCIsImNvbnRlbnRpZCIsImF0dHJJRCIsImdsb2JhbE9iamVjdCIsInF1ZXVlIiwicSIsImkiLCJsZW5ndGgiLCJ0b0xvd2VyQ2FzZSIsImV4dGVuZE9iamVjdCIsImNyZWF0ZUhlZGVyYU9iamVjdCIsImNoZWNrRm9yRXh0ZW5zaW9uIiwiYXBpSGFuZGxlciIsImNhbGxiYWNrIiwiaXNDaHJvbWUiLCJyZWRpcmVjdFRvRXJyb3IiLCJ0YWdzIiwiYW1vdW50IiwiRVhURU5TSU9OX0lEIiwiZGV0ZWN0IiwicmVzcG9uc2UiLCJyZWNvcmRSZXNwb25zZSIsImV4dGVuc2lvbklkIiwibm90SW5zdGFsbGVkQ2FsbGJhY2siLCJpbnN0YWxsZWRDYWxsYmFjayIsImltZyIsIkltYWdlIiwib25lcnJvciIsIm9ubG9hZCIsInNyYyIsInJlcyIsImJvZHkiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwiZXJyIiwicmVwbGFjZSIsIm9yaWdpbiIsImNvbmZpZ3VyYXRpb24iLCJhcGkiLCJwYXJhbXMiLCJFcnJvciIsImluZGV4T2YiLCJjaGVja1RyYW5zYWN0aW9uIiwiY3JlYXRlQ29udHJhY3RPYmplY3QiLCJpbml0IiwiZ2V0bW9kYWwiLCJ3YXJuIiwiYSIsImIiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsIm9iamVjdCIsIkhlZGVyYW9iamVjdCIsIm5vZGUiLCJnZXRFbGVtZW50QnlJZCIsIl9fY29uc3RydWN0IiwiY29udHJhY3RpZCIsIm1heGltdW0iLCJhYmkiLCJKU09OIiwic3RyaW5naWZ5IiwicGFyc2UiLCJleHRlbmRlZCIsIkNvbnRyYWN0b2JqZWN0IiwibWVtb19pZCIsInVybCIsInN0cnVjdHVyZSIsImJhc2V1cmwiLCJyZWNlaXZlcl9pZCIsInN1Y2Nlc3MiLCJmYWlsdXJlIiwidGltZW91dCIsImxpbWl0IiwiVVJMIiwic2V0VGltZW91dCIsInBlcmZvcm1SZXF1ZXN0IiwieGh0dHAiLCJYTUxIdHRwUmVxdWVzdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJub2RlcHJlY2hlY2siLCJwcmVjaGVja2VyIiwib3BlbiIsInNlbmQiLCJpc2Nocm9tZSIsImFjY291bnRQYWlyZWQiLCJpc21vYmlsZSIsInZhbGlkQnJvd3NlciIsImV4dGVuc2lvbkluc3RhbGxlZCIsImFjY2Vzc1RvQWNjb3VudHMiLCJhY2NvdW50SWQiLCJzdWJtaXNzaW9uTm9kZSIsInR4bl9zdWNjZXNzIiwiY2hlY2tJc0Nocm9tZSIsIm1vYiIsImRldGVjdG1vYiIsImFqYXhyZXNwIiwic2VuZGVyIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwibWF0Y2giLCJteUNvbnRlbnQiLCJteU1vZGFsIiwiTW9kYWwiLCJjb250ZW50IiwicGluZyIsIm4iLCJqc29uIiwiY2xvc2VCdXR0b24iLCJtb2RhbCIsIm92ZXJsYXkiLCJ0cmFuc2l0aW9uRW5kIiwidHJhbnNpdGlvblNlbGVjdCIsImRlZmF1bHRzIiwiYXV0b09wZW4iLCJjbGFzc05hbWUiLCJtYXhXaWR0aCIsIm1pbldpZHRoIiwiYXJndW1lbnRzIiwib3B0aW9ucyIsImV4dGVuZERlZmF1bHRzIiwicHJvdG90eXBlIiwiY2xvc2UiLCJfIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImJ1aWxkT3V0IiwiY2FsbCIsImluaXRpYWxpemVFdmVudHMiLCJnZXRDb21wdXRlZFN0eWxlIiwiaGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJjb250ZW50SG9sZGVyIiwiZG9jRnJhZyIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJhcHBlbmRDaGlsZCIsInNvdXJjZSIsInByb3BlcnRpZXMiLCJwcm9wZXJ0eSIsImJpbmQiLCJlbCIsIldlYmtpdFRyYW5zaXRpb24iLCJPVHJhbnNpdGlvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM3REE7QUFBQTtBQUFBO0FBQUE7QUFBQTtDQU1BOztBQUNBLElBQU1BLFlBQVksR0FBRyxDQUFDLGFBQUQsRUFBZ0IsTUFBaEIsRUFBd0Isb0JBQXhCLEVBQThDLGtCQUE5QyxFQUFrRSxVQUFsRSxFQUNq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LFlBQU0sQ0FBQ0UsUUFBRCxDQUFOLEdBQW1CRCxVQUFVLENBQUNDLFFBQUQsQ0FBN0I7QUFDSDtBQUNKOztBQUNEMUssU0FBTyxDQUFDQyxHQUFSLENBQVl1SyxNQUFaO0FBQ0EsU0FBT0EsTUFBUDtBQUNIOztBQUVELFNBQVNYLGdCQUFULEdBQTRCO0FBRXhCLE1BQUksS0FBS3JCLFdBQVQsRUFBc0I7QUFDbEIsU0FBS0EsV0FBTCxDQUFpQmdCLGdCQUFqQixDQUFrQyxPQUFsQyxFQUEyQyxLQUFLRixLQUFMLENBQVdxQixJQUFYLENBQWdCLElBQWhCLENBQTNDO0FBQ0g7O0FBRUQsTUFBSSxLQUFLakMsT0FBVCxFQUFrQjtBQUNkLFNBQUtBLE9BQUwsQ0FBYWMsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUMsS0FBS0YsS0FBTCxDQUFXcUIsSUFBWCxDQUFnQixJQUFoQixDQUF2QztBQUNIO0FBRUo7O0FBRUQsU0FBUy9CLGdCQUFULEdBQTRCO0FBQ3hCLE1BQUlnQyxFQUFFLEdBQUdsSCxRQUFRLENBQUMyRyxhQUFULENBQXVCLEtBQXZCLENBQVQ7QUFDQSxNQUFJTyxFQUFFLENBQUNOLEtBQUgsQ0FBU08sZ0JBQWIsRUFBK0IsT0FBTyxxQkFBUDtBQUMvQixNQUFJRCxFQUFFLENBQUNOLEtBQUgsQ0FBU1EsV0FBYixFQUEwQixPQUFPLGdCQUFQO0FBQzFCLFNBQU8sZUFBUDtBQUNILEMsQ0FFRDs7O0FBQ0FDLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlN0MsS0FBZixHQUF1QkEsS0FBdkIsQyIsImZpbGUiOiJ3aWRnZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkZGQyMjMzN2Q2OWRhMDgyNzM5NiIsImltcG9ydCB7XG4gICAgcGluZywgcHJlY2hlY2tlclxufSBmcm9tICcuL3NlcnZpY2VzJ1xuXG5pbXBvcnQge01vZGFsfSBmcm9tICcuL21vZGFsJztcblxuLy8gZW5saXN0IGFsbCBtZXRob2RzIHN1cHBvcnRlZCBieSBBUEkgKGUuZy4gYG13KCdldmVudCcsICd1c2VyLWxvZ2luJyk7YClcbmNvbnN0IHN1cHBvcnRlZEFQSSA9IFsnbWFrZXBheW1lbnQnLCAndGVzdCcsICdjcmVhdGVoZWRlcmFvYmplY3QnLCAnY2hlY2t0cmFuc2FjdGlvbicsICdnZXRtb2RhbCcsXG4gICAgJ2NyZWF0ZWNvbnRyYWN0b2JqZWN0JywgJ2luaXQnLCAndHJhbnNhY3Rpb25ub2RlY2hlY2tlciddO1xuLyoqXG4gVGhlIG1haW4gZW50cnkgb2YgdGhlIGFwcGxpY2F0aW9uXG4gKi9cbmNvbnN0IHByb2R1Y3Rpb24gPSB0cnVlO1xuXG5mdW5jdGlvbiBhcHAod2luZG93KSB7XG4gICAgY29uc29sZS5sb2coJ0hBU0gtSlMgc3RhcnRpbmcnKTtcbiAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpLFxuICAgICAgICBkYXRlID0gdG9kYXkuZ2V0RnVsbFllYXIoKSArICctJyArICh0b2RheS5nZXRNb250aCgpICsgMSkgKyAnLScgKyB0b2RheS5nZXREYXRlKCksXG4gICAgICAgIHRpbWUgPSB0b2RheS5nZXRIb3VycygpICsgXCI6XCIgKyB0b2RheS5nZXRNaW51dGVzKCksXG4gICAgICAgIGRhdGVUaW1lID0gZGF0ZSArICcgJyArIHRpbWUsXG4gICAgICAgIHRpbWVzdGFtcCA9IG5ldyBEYXRlKGRhdGVUaW1lKS5nZXRUaW1lKCk7XG5cbiAgICBsZXQgY29uZmlndXJhdGlvbnMgPSB7XG4gICAgICAgIHBheW1lbnRzZXJ2ZXI6IHByb2R1Y3Rpb24gPyBcImh0dHBzOi8vbXBzLmhhc2hpbmdzeXN0ZW1zLmNvbVwiIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6OTk5OScsXG4gICAgICAgIGV4dGVuc2lvbmlkOiBcImxpZ3Bhb25kYWFiY2xmaWdhZ2NpZm9iYWVsZW1pZW5hXCIsXG4gICAgICAgIGVycm9yOiBcIi9uby1leHRlbnNpb25cIixcbiAgICAgICAgdHlwZTogXCJhcnRpY2xlXCIsXG4gICAgICAgIHRpbWU6IERhdGUubm93KCksXG4gICAgICAgIHJlZGlyZWN0OiAneyBcIm5vblBheWluZ0FjY291bnRcIjogXCIvaW5zdWZmaWNpZW50LWFtb3VudC9cIiwgXCJub0FjY291bnRcIjogXCIvYWNjb3VudC1ub3QtcGFpcmVkL1wiLCBcImhvbWVQYWdlXCI6IFwiL1wifScsXG4gICAgICAgIC8vIHRoaXMgbWlnaHQgbWFrZSBhIGdvb2QgZGVmYXVsdCBpZCBmb3IgdGhlIGNvbnRlbnRcbiAgICAgICAgaWQ6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgICAgc3VibWlzc2lvbm5vZGU6IFwiMC4wLjExXCIsXG4gICAgICAgIG1lbW86IERhdGUubm93KCksXG4gICAgICAgIHJlY2lwaWVudGxpc3Q6ICdbeyBcInRvXCI6IFwiMC4wLjk5XCIsIFwidGlueWJhcnNcIjogXCIxNjY2NjY3XCIgfV0nLFxuICAgICAgICBjb250ZW50aWQ6ICc3OScsXG4gICAgICAgIGF0dHJJRDogJ2FydGljbGUtMScsXG4gICAgICAgIHRpbWVzdGFtcDogdGltZXN0YW1wLFxuICAgICAgICAvL3JlZGlyZWN0Oid7IFwibm9uUGF5aW5nQWNjb3VudFwiOiBcIi9pbnN1ZmZpY2llbnQtYW1vdW50L1wiLCBcIm5vQWNjb3VudFwiOiBcIi9hY2NvdW50LW5vdC1wYWlyZWQvXCIsIFwiaG9tZVBhZ2VcIjogXCIvXCIgfScsXG4gICAgfTtcbiAgICAvLyBhbGwgbWV0aG9kcyB0aGF0IHdlcmUgY2FsbGVkIHRpbGwgbm93IGFuZCBzdG9yZWQgaW4gcXVldWVcbiAgICAvLyBuZWVkcyB0byBiZSBjYWxsZWQgbm93XG4gICAgbGV0IGdsb2JhbE9iamVjdCA9IHdpbmRvd1t3aW5kb3dbJ0hBU0gtSlMnXV07XG4gICAgbGV0IHF1ZXVlID0gZ2xvYmFsT2JqZWN0LnE7XG4gICAgaWYgKHF1ZXVlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcXVldWVbaV1bMF0gIT09ICd1bmRlZmluZWQnICYmIHF1ZXVlW2ldWzBdLnRvTG93ZXJDYXNlKCkgPT0gJ21ha2VwYXltZW50Jykge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25zID0gZXh0ZW5kT2JqZWN0KGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgICAgICAgICAgY3JlYXRlSGVkZXJhT2JqZWN0KGNvbmZpZ3VyYXRpb25zKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSEFTSC1KUyBzdGFydGVkJywgY29uZmlndXJhdGlvbnMpO1xuICAgICAgICAgICAgICAgIGNoZWNrRm9yRXh0ZW5zaW9uKGNvbmZpZ3VyYXRpb25zKVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcXVldWVbaV1bMF0gIT09ICd1bmRlZmluZWQnICYmIHF1ZXVlW2ldWzBdLnRvTG93ZXJDYXNlKCkgPT0gJ2NyZWF0ZWNvbnRyYWN0b2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25zID0gZXh0ZW5kT2JqZWN0KGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgICAgICAgICAgYXBpSGFuZGxlcihjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMF0sIHF1ZXVlW2ldWzFdLCBxdWV1ZVtpXVsyXSk7XG4gICAgICAgICAgICAgICAgY2hlY2tGb3JFeHRlbnNpb24oY29uZmlndXJhdGlvbnMpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBjYWxsYmFjaztcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHF1ZXVlW2ldWzFdID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBxdWV1ZVtpXVsxXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayA9IHF1ZXVlW2ldW3F1ZXVlWzBdLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9ucyA9IGV4dGVuZE9iamVjdChjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMV0pO1xuICAgICAgICAgICAgICAgIGFwaUhhbmRsZXIoY29uZmlndXJhdGlvbnMsIHF1ZXVlW2ldWzBdLCBxdWV1ZVtpXVsxXSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIG92ZXJyaWRlIHRlbXBvcmFyeSAodW50aWwgdGhlIGFwcCBsb2FkZWQpIGhhbmRsZXJcbiAgICAvLyBmb3Igd2lkZ2V0J3MgQVBJIGNhbGxzXG4gICAgZ2xvYmFsT2JqZWN0ID0gYXBpSGFuZGxlcjtcbiAgICBnbG9iYWxPYmplY3QuY29uZmlndXJhdGlvbnMgPSBjb25maWd1cmF0aW9ucztcbn1cblxuZnVuY3Rpb24gY2hlY2tGb3JFeHRlbnNpb24oY29uZmlndXJhdGlvbnMpIHtcbiAgICBpZiAoIWlzQ2hyb21lKCkpIHtcbiAgICAgICAgcmVkaXJlY3RUb0Vycm9yKCcvaXNub3RDaHJvbWUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgdGFncyA9IGNvbmZpZ3VyYXRpb25zO1xuICAgICAgICAvLyBpZiB0YWdzLmFtb3VudCBpcyBudWxsIG9yIHVuZGVmaW5lZCwgd2Ugc2hvdWxkIGFzc3VtZSB0aGF0IHRoaXMgaXMgYSBmcmVlIHBhZ2UgYW5kIGRvIG5vdGhpbmcgbW9yZVxuICAgICAgICBpZiAodGFncy5hbW91bnQgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBFWFRFTlNJT05fSUQgPSB0YWdzLmV4dGVuc2lvbmlkO1xuXG4gICAgICAgIGRldGVjdChFWFRFTlNJT05fSUQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJlZGlyZWN0VG9FcnJvcih0YWdzLmVycm9yKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZGV0ZWN0OiB1c2VyIGhhcyBleHRlbnNpb24gaW5zdGFsbGVkJyk7XG4gICAgICAgICAgICByZWNvcmRSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coY2hyb21lLnJ1bnRpbWUuY29ubmVjdChFWFRFTlNJT05fSUQsJ3ZlcnNpb24nKSk7XG4gICAgICAgIC8qY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoRVhURU5TSU9OX0lELCAndmVyc2lvbicsIHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJlZGlyZWN0VG9FcnJvcih0YWdzLmVycm9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVjb3JkUmVzcG9uc2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSovXG4gICAgfVxufVxuXG5mdW5jdGlvbiBkZXRlY3QoZXh0ZW5zaW9uSWQsIG5vdEluc3RhbGxlZENhbGxiYWNrLCBpbnN0YWxsZWRDYWxsYmFjaykge1xuICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBjb25zb2xlLmxvZyhleHRlbnNpb25JZCk7XG4gICAgaW1nLm9uZXJyb3IgPSBub3RJbnN0YWxsZWRDYWxsYmFjaztcbiAgICBpbWcub25sb2FkID0gaW5zdGFsbGVkQ2FsbGJhY2s7XG4gICAgaW1nLnNyYyA9ICdjaHJvbWUtZXh0ZW5zaW9uOi8vJyArIGV4dGVuc2lvbklkICsgJy9pY29ucy9pY29uMTYucG5nJztcbn1cblxuZnVuY3Rpb24gcmVjb3JkUmVzcG9uc2UocmVzKSB7XG4gICAgaWYgKHR5cGVvZiByZXMgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpO1xuICAgICAgICBib2R5LmlubmVySFRNTCArPSAnPGRpdiBzdHlsZT1cIndpZHRoOjEwMCU7aGVpZ2h0OjUlO29wYWNpdHk6MC4zO3otaW5kZXg6MTAwO2JhY2tncm91bmQ6eWVsbG93O1wiPicgKyByZXMgKyAnPC9kaXY+JztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gcmVkaXJlY3RUb0Vycm9yKGVycikge1xuICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgIT0gZXJyKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBlcnIpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNDaHJvbWUoKSB7XG4gICAgcmV0dXJuICdjaHJvbWUnIGluIHdpbmRvd1xufVxuXG4vKipcbiBNZXRob2QgdGhhdCBoYW5kbGVzIGFsbCBBUEkgY2FsbHNcbiAqL1xuZnVuY3Rpb24gYXBpSGFuZGxlcihjb25maWd1cmF0aW9uLCBhcGksIHBhcmFtcywgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgaWYgKCFhcGkpIHRocm93IEVycm9yKCdBUEkgbWV0aG9kIHJlcXVpcmVkJyk7XG4gICAgYXBpID0gYXBpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHN1cHBvcnRlZEFQSS5pbmRleE9mKGFwaSkgPT09IC0xKSB0aHJvdyBFcnJvcihgTWV0aG9kICR7YXBpfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgY29uc29sZS5sb2coYEhhbmRsaW5nIEFQSSBjYWxsICR7YXBpfWAsIHBhcmFtcyk7XG5cbiAgICAvL3JldHVybiBhcGkrJygnK3BhcmFtcysnKSc7XG5cbiAgICBzd2l0Y2ggKGFwaSkge1xuICAgICAgICAvLyBUT0RPOiBhZGQgQVBJIGltcGxlbWVudGF0aW9uXG5cbiAgICAgICAgY2FzZSAnY3JlYXRlaGVkZXJhb2JqZWN0JzpcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVIZWRlcmFPYmplY3QocGFyYW1zKTtcblxuICAgICAgICBjYXNlICdjaGVja3RyYW5zYWN0aW9uJzpcbiAgICAgICAgICAgIHJldHVybiBjaGVja1RyYW5zYWN0aW9uKHtjb25maWd1cmF0aW9uLCBwYXJhbXN9LCBjYWxsYmFjayk7XG5cbiAgICAgICAgY2FzZSAnY3JlYXRlY29udHJhY3RvYmplY3QnOlxuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUNvbnRyYWN0T2JqZWN0KHtjb25maWd1cmF0aW9uLCBwYXJhbXN9LCBjYWxsYmFjayk7XG5cbiAgICAgICAgY2FzZSAnaW5pdCc6XG4gICAgICAgICAgICByZXR1cm4gaW5pdChjb25maWd1cmF0aW9uLCBjYWxsYmFjayk7XG5cbiAgICAgICAgY2FzZSAnZ2V0bW9kYWwnOlxuICAgICAgICAgICAgcmV0dXJuIGdldG1vZGFsKCk7XG5cbiAgICAgICAgY2FzZSAndGVzdCc6XG4gICAgICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBObyBoYW5kbGVyIGRlZmluZWQgZm9yICR7YXBpfWApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZXh0ZW5kT2JqZWN0KGEsIGIpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gYilcbiAgICAgICAgaWYgKGIuaGFzT3duUHJvcGVydHkoa2V5KSkgYVtrZXldID0gYltrZXldO1xuICAgIHJldHVybiBhO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVIZWRlcmFPYmplY3QocGFyYW1zKSB7XG4gICAgbGV0IG9iamVjdCA9IFsnc3VibWlzc2lvbm5vZGUnLCAncGF5bWVudHNlcnZlcicsICdyZWNpcGllbnRsaXN0JywgJ2NvbnRlbnRpZCcsICd0eXBlJywgJ21lbW8nLCAnZXh0ZW5zaW9uaWQnLCAncmVkaXJlY3QnLCAndGltZSddO1xuICAgIGxldCBIZWRlcmFvYmplY3QgPSAnPGhlZGVyYS1taWNyb3BheW1lbnQgJztcbiAgICBmb3IgKHZhciBpIGluIG9iamVjdCkge1xuICAgICAgICBsZXQgbm9kZSA9IG9iamVjdFtpXTtcbiAgICAgICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShub2RlKSkge1xuICAgICAgICAgICAgSGVkZXJhb2JqZWN0ICs9IFwiZGF0YS1cIiArIG5vZGUgKyBcIj0gJ1wiICsgcGFyYW1zW25vZGVdICsgXCInICwgXCIgKyBcIlxcblwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIEhlZGVyYW9iamVjdCArPSAnPjwvaGVkZXJhLW1pY3JvcGF5bWVudD4nO1xuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyYW1zWydhdHRySUQnXSk7XG4gICAgYm9keS5pbm5lckhUTUwgKz0gSGVkZXJhb2JqZWN0O1xuICAgIHJldHVybiBIZWRlcmFvYmplY3Q7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbnRyYWN0T2JqZWN0KHBhcmFtcykge1xuICAgIGxldCBfX2NvbnN0cnVjdCA9IFsnY29udHJhY3RpZCcsICdtYXhpbXVtJywgJ3BheW1lbnRzZXJ2ZXInLCAncGFyYW1zJywgJ21lbW8nLCAnYWJpJywgJ3JlZGlyZWN0JywgJ2V4dGVuc2lvbmlkJ107XG4gICAgbGV0IG9iamVjdCA9IHtcbiAgICAgICAgY29udHJhY3RpZDogJzAuMC4xMTExJyxcbiAgICAgICAgbWF4aW11bTogJzQyMjM0MjM0MycsXG4gICAgICAgIHBheW1lbnRzZXJ2ZXI6IHBhcmFtcy5jb25maWd1cmF0aW9uLnBheW1lbnRzZXJ2ZXIsXG4gICAgICAgIHBhcmFtczogW1wiODY5XCIsIFwiMTAwMDAwMDAwXCIsIFwiMjE2XCIsIFwiMjUzXCIsIFwiMjdcIiwgXCIweDIyNmIwODk3NmFkMGRkOTgyYWViNmIyMWE0NGYzZWFjYWU1Nzk1NjljMzRlNzE3MjVhZmY4MDFhMmZlNjg3MzlcIiwgXCIweDMzM2Y5OTFmYTNhODcwNTc1ZjgxOTU2OWU5ZjcyYTc3MWVhNzkwMDc4ZDQ0OGNjODc4OTEyMGVlMTRhYmYzYzVcIl0sXG4gICAgICAgIG1lbW86ICdhNGE3YzQzMjlhYWI0YjFmYWM0NzRmZjZmOTNkODU4YycsXG4gICAgICAgIGFiaTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgXCJjb25zdGFudFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiaW5wdXRzXCI6IFt7XCJuYW1lXCI6IFwicHJvcGVydHlJRFwiLCBcInR5cGVcIjogXCJ1aW50MjRcIn0sIHtcIm5hbWVcIjogXCJhbW91bnRcIiwgXCJ0eXBlXCI6IFwidWludDI1NlwifSwge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcInhcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ1aW50MTZcIlxuICAgICAgICAgICAgfSwge1wibmFtZVwiOiBcInlcIiwgXCJ0eXBlXCI6IFwidWludDE2XCJ9LCB7XCJuYW1lXCI6IFwidlwiLCBcInR5cGVcIjogXCJ1aW50OFwifSwge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcInJcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJieXRlczMyXCJcbiAgICAgICAgICAgIH0sIHtcIm5hbWVcIjogXCJzXCIsIFwidHlwZVwiOiBcImJ5dGVzMzJcIn1dLFxuICAgICAgICAgICAgXCJuYW1lXCI6IFwiYnV5UHJvcGVydHlcIixcbiAgICAgICAgICAgIFwib3V0cHV0c1wiOiBbe1wibmFtZVwiOiBcIlwiLCBcInR5cGVcIjogXCJzdHJpbmdcIn1dLFxuICAgICAgICAgICAgXCJwYXlhYmxlXCI6IHRydWUsXG4gICAgICAgICAgICBcInN0YXRlTXV0YWJpbGl0eVwiOiBcInBheWFibGVcIixcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImZ1bmN0aW9uXCJcbiAgICAgICAgfSksXG4gICAgICAgIHJlZGlyZWN0OiAne1wibm9uUGF5aW5nQWNjb3VudFwiOiBcIi9pbnN1ZmZpY2llbnQtYW1vdW50L1wiLFwibm9BY2NvdW50XCI6IFwiL2FjY291bnQtbm90LXBhaXJlZFwiLFwiaG9tZVBhZ2VcIjogXCIvXCJ9JyxcbiAgICAgICAgZXh0ZW5zaW9uaWQ6ICdwZGpqcGNvbGdtbWNpZmlqcGVqa2VucGJiaW1lZHBpYycsXG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKEpTT04ucGFyc2Uob2JqZWN0LmFiaSkpO1xuICAgIGxldCBleHRlbmRlZCA9IGV4dGVuZE9iamVjdChvYmplY3QsIHBhcmFtcy5wYXJhbXMpO1xuICAgIGNvbnNvbGUubG9nKGV4dGVuZGVkKTtcbiAgICBsZXQgQ29udHJhY3RvYmplY3QgPSAnPGhlZGVyYS1jb250cmFjdCAnO1xuICAgIGZvciAodmFyIGkgaW4gX19jb25zdHJ1Y3QpIHtcbiAgICAgICAgbGV0IG5vZGUgPSBfX2NvbnN0cnVjdFtpXTtcbiAgICAgICAgaWYgKGV4dGVuZGVkLmhhc093blByb3BlcnR5KG5vZGUpKSB7XG4gICAgICAgICAgICBDb250cmFjdG9iamVjdCArPSBcImRhdGEtXCIgKyBub2RlICsgXCI9ICdcIiArIGV4dGVuZGVkW25vZGVdICsgXCInIFwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIENvbnRyYWN0b2JqZWN0ICs9ICc+PC9oZWRlcmEtY29udHJhY3Q+JztcbiAgICBjb25zb2xlLmxvZyhDb250cmFjdG9iamVjdCk7XG5cbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGV4dGVuZGVkWydhdHRySUQnXSk7XG4gICAgYm9keS5pbm5lckhUTUwgKz0gQ29udHJhY3RvYmplY3Q7XG4gICAgLy9jb25zb2xlLmxvZygoSGVkZXJhb2JqZWN0KSlcbiAgICByZXR1cm4gQ29udHJhY3RvYmplY3Q7XG4gICAgLy9jYWxsYmFjayhIZWRlcmFvYmplY3QpO1xufVxuXG5mdW5jdGlvbiBjaGVja1RyYW5zYWN0aW9uKHBhcmFtcykge1xuXG4gICAgbGV0IG1lbW9faWQgPSBwYXJhbXMuY29uZmlndXJhdGlvbi5tZW1vO1xuICAgIGxldCB1cmwgPSBwcm9kdWN0aW9uID8gXCJodHRwczovL21wcy5oYXNoaW5nc3lzdGVtcy5jb21cIiA6ICdodHRwOi8vbG9jYWxob3N0Ojk5OTknO1xuICAgIGxldCBzdHJ1Y3R1cmUgPSB7XG4gICAgICAgIGJhc2V1cmw6IHVybCxcbiAgICAgICAgbWVtb19pZDogbWVtb19pZCxcbiAgICAgICAgcmVjZWl2ZXJfaWQ6ICcnLFxuICAgICAgICBzdWNjZXNzOiAnL3N1Y2Nlc3MnLFxuICAgICAgICBmYWlsdXJlOiAnL3BheW1lbnQtZmFpbGVkJyxcbiAgICAgICAgdGltZW91dDogMzAwMCxcbiAgICAgICAgbGltaXQ6IDFcbiAgICB9O1xuXG4gICAgZm9yICh2YXIga2V5IGluIHBhcmFtcy5wYXJhbXMpIHtcbiAgICAgICAgaWYgKHBhcmFtcy5wYXJhbXMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBwYXJhbXMucGFyYW1zW2tleV0pIHtcbiAgICAgICAgICAgIHN0cnVjdHVyZVtrZXldID0gcGFyYW1zLnBhcmFtc1trZXldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN0cnVjdHVyZS5yZWNlaXZlcl9pZCAmJiBzdHJ1Y3R1cmUubWVtb19pZCkge1xuICAgICAgICBVUkwgPSBzdHJ1Y3R1cmUuYmFzZXVybCArIFwiL2NoZWNrL1wiICsgc3RydWN0dXJlLnJlY2VpdmVyX2lkICsgXCIvXCIgKyBzdHJ1Y3R1cmUubWVtb19pZFxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzdHJ1Y3R1cmUudGltZXN0YW1wKVxuICAgICAgICAgICAgVVJMID0gc3RydWN0dXJlLmJhc2V1cmwgKyBcIi9tZW1vL1wiICsgc3RydWN0dXJlLm1lbW9faWQgKyAnP2xpbWl0PScgKyBzdHJ1Y3R1cmUubGltaXQgKyAnJnRpbWVzdGFtcD0nICsgc3RydWN0dXJlLnRpbWVzdGFtcDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgVVJMID0gc3RydWN0dXJlLmJhc2V1cmwgKyBcIi9tZW1vL1wiICsgc3RydWN0dXJlLm1lbW9faWQgKyAnP2xpbWl0PScgKyBzdHJ1Y3R1cmUubGltaXQ7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coc3RydWN0dXJlLnRpbWVvdXQpO1xuICAgIC8vc2V0VGltZW91dChwZXJmb3JtUmVxdWVzdChzdHJ1Y3R1cmUpLCBzdHJ1Y3R1cmUudGltZW91dClcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcGVyZm9ybVJlcXVlc3Qoc3RydWN0dXJlKTtcbiAgICB9LCBzdHJ1Y3R1cmUudGltZW91dCk7XG59XG5cbnZhciBwZXJmb3JtUmVxdWVzdCA9IGZ1bmN0aW9uIChzdHJ1Y3R1cmUpIHtcbiAgICBjb25zb2xlLmxvZyhzdHJ1Y3R1cmUpXG4gICAgdmFyIHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5yZXNwb25zZS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZXNwb25zZS5sZW5ndGggPj0gMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UucmVzcG9uc2VbMF0ubm9kZXByZWNoZWNrID09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cub3JpZ2luICsgc3RydWN0dXJlLnN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAvKmVsc2UgaWYocHJlY2hlY2tlcihyZXNwb25zZS5yZXNwb25zZVswXS5ub2RlcHJlY2hlY2spPT0nSU5TVUZGSUNJRU5UX1RYX0ZFRScpXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cub3JpZ2luICsgJ2luc3VmZmljaWVudC1hbW91bnQnKTsqL1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwcmVjaGVja2VyKHJlc3BvbnNlLnJlc3BvbnNlWzBdLm5vZGVwcmVjaGVjaykpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgLy93aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cub3JpZ2luICsgc3RydWN0dXJlLmZhaWx1cmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL3dpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBzdHJ1Y3R1cmUuc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgLy9jYWxsYmFjayhudWxsLCB0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9jYWxsYmFjayh7ZXJyb3I6IHRydWUsIGRhdGE6IHRoaXMucmVzcG9uc2V9LCBudWxsKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cub3JpZ2luICsgc3RydWN0dXJlLmZhaWx1cmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICB4aHR0cC5vcGVuKFwiR0VUXCIsIFVSTCwgdHJ1ZSk7XG4gICAgeGh0dHAuc2VuZCgpO1xufTtcblxuZnVuY3Rpb24gaW5pdChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgbGV0IHJlc3BvbnNlID0ge1xuICAgICAgICBpc2Nocm9tZTogdHJ1ZSxcbiAgICAgICAgYWNjb3VudFBhaXJlZDogZmFsc2UsXG4gICAgICAgIGlzbW9iaWxlOiBudWxsLFxuICAgICAgICB2YWxpZEJyb3dzZXI6IG51bGwsXG4gICAgICAgIGV4dGVuc2lvbkluc3RhbGxlZDogbnVsbCxcbiAgICAgICAgYWNjZXNzVG9BY2NvdW50czogbnVsbCxcbiAgICAgICAgYWNjb3VudElkOiBudWxsLFxuICAgICAgICBzdWJtaXNzaW9uTm9kZTogcGFyYW1zLnN1Ym1pc3Npb25ub2RlLFxuICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgdHhuX3N1Y2Nlc3M6IGZhbHNlXG4gICAgfTtcbiAgICBsZXQgY2hlY2tJc0Nocm9tZSA9IGlzQ2hyb21lKCk7XG4gICAgcmVzcG9uc2UuaXNjaHJvbWUgPSBjaGVja0lzQ2hyb21lO1xuICAgIGxldCBtb2IgPSBkZXRlY3Rtb2IoKTtcbiAgICByZXNwb25zZS5pc21vYmlsZSA9IG1vYjtcbiAgICBkZXRlY3QocGFyYW1zLmV4dGVuc2lvbmlkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlc3BvbnNlLmV4dGVuc2lvbkluc3RhbGxlZCA9IGZhbHNlO1xuICAgICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2tlZFwiKVxuICAgICAgICByZXNwb25zZS5leHRlbnNpb25JbnN0YWxsZWQgPSB0cnVlO1xuICAgICAgICBsZXQgb2JqZWN0ID0gY3JlYXRlSGVkZXJhT2JqZWN0KHBhcmFtcyk7XG4gICAgICAgIGxldCB1cmwgPSBwcm9kdWN0aW9uID8gXCJodHRwczovL21wcy5oYXNoaW5nc3lzdGVtcy5jb21cIiA6ICdodHRwOi8vbG9jYWxob3N0Ojk5OTknO1xuICAgICAgICBVUkwgPSB1cmwgKyBcIi9tZW1vL1wiICsgcGFyYW1zLm1lbW87XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhamF4cmVzcCA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhamF4cmVzcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWpheHJlc3AucmVzcG9uc2UubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHByZWNoZWNrZXIoYWpheHJlc3AucmVzcG9uc2VbMF0ubm9kZXByZWNoZWNrKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuYWNjb3VudElkID0gYWpheHJlc3AucmVzcG9uc2VbMF0uc2VuZGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmFjY291bnRQYWlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmFjY2Vzc1RvQWNjb3VudHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhamF4cmVzcC5yZXNwb25zZVswXS5ub2RlcHJlY2hlY2sgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UudHhuX3N1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5lcnJvciA9IHByZWNoZWNrZXIoYWpheHJlc3AucmVzcG9uc2VbMF0ubm9kZXByZWNoZWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5hY2NvdW50UGFpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5hY2Nlc3NUb0FjY291bnRzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGh0dHAub3BlbihcIkdFVFwiLCBVUkwsIHRydWUpO1xuICAgICAgICAgICAgeGh0dHAuc2VuZCgpO1xuICAgICAgICB9LCA1MDAwKTtcbiAgICAgICAgLy9jYWxsYmFjayhudWxsLHJlc3BvbnNlKTtcbiAgICB9KTtcblxufVxuXG5mdW5jdGlvbiBkZXRlY3Rtb2IoKSB7XG4gICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0FuZHJvaWQvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvd2ViT1MvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBob25lL2kpXG4gICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQYWQvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBvZC9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9CbGFja0JlcnJ5L2kpXG4gICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1dpbmRvd3MgUGhvbmUvaSlcbiAgICApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0bW9kYWwoKSB7XG4gICAgdmFyIG15Q29udGVudCA9ICc8ZGl2IGNsYXNzPVwicG9wdXBfb3V0ZXJfd3JhcFwiPlxcbicgK1xuICAgICAgICAnXFx0ICBcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfd3JhcFwiPlxcbicgK1xuICAgICAgICAnXFx0ICBcXHRcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfaGVhZGVyXCI+U2V0dXAgVGFzayA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJwb3B1cF9jbG9zZVwiPng8L2E+PC9kaXY+XFxuJyArXG4gICAgICAgICdcXG4nICtcbiAgICAgICAgJ1xcdCAgXFx0XFx0PGRpdiBjbGFzcz1cInBvcHVwX2lubmVyXCI+XFxuJyArXG4gICAgICAgICdcXHQgIFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJwb3B1cF9pbm5lcl9sZWZ0XCI+XFxuJyArXG4gICAgICAgICdcXG4nICtcbiAgICAgICAgJ1xcdCAgXFx0XFx0XFx0XFx0PGZvcm0gYWN0aW9uPVwiL2FjdGlvbl9wYWdlLnBocFwiIGNsYXNzPVwicG9wdXBfZm9ybVwiPlxcbicgK1xuICAgICAgICAnXFx0XFx0XFx0XFx0XFx0ICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJpbWdfb25lXCIgY2xhc3M9XCJwb3B1cF9jaGtib3ggdG9nZ2xlX19pbnB1dFwiIG5hbWU9XCJpbWdfb25lXCIgdmFsdWU9XCJpbWdfb25lXCIgY2hlY2tlZD5cXG4nICtcbiAgICAgICAgJ1xcdFxcdFxcdFxcdFxcdCAgPGxhYmVsIGZvcj1cImltZ19vbmVcIj4mbmJzcDsgSW5zdGFsbCBIZWRlcmEgV2FsbGV0PC9sYWJlbD5cXG4nICtcbiAgICAgICAgJ1xcdFxcdFxcdFxcdFxcdCAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiaW1nX3R3b1wiIGNsYXNzPVwicG9wdXBfY2hrYm94IHRvZ2dsZV9faW5wdXRcIiBuYW1lPVwiaW1nX3R3b1wiIHZhbHVlPVwiaW1nX3R3b1wiPlxcbicgK1xuICAgICAgICAnXFx0XFx0XFx0XFx0XFx0ICA8bGFiZWwgZm9yPVwiaW1nX3R3b1wiPiZuYnNwOyBcIlBhaXIgeW91ciBBY2NvdW50XCI8L2xhYmVsPlxcbicgK1xuICAgICAgICAnXFxuJyArXG4gICAgICAgICdcXHRcXHRcXHRcXHRcXHQgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImltZ190aHJlZVwiIGNsYXNzPVwicG9wdXBfY2hrYm94IHRvZ2dsZV9faW5wdXRcIiBuYW1lPVwiaW1nX3RocmVlXCIgdmFsdWU9XCJpbWdfdGhyZWVcIj5cXG4nICtcbiAgICAgICAgJ1xcdFxcdFxcdFxcdFxcdCAgPGxhYmVsIGZvcj1cImltZ190aHJlZVwiPiZuYnNwOyBcIkFsbG93IFBheW1lbnQgUmVxdWVzdHNcIjwvbGFiZWw+XFxuJyArXG4gICAgICAgICdcXG4nICtcbiAgICAgICAgJ1xcdFxcdFxcdFxcdFxcdCAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiaW1nX2ZvdXJcIiBjbGFzcz1cInBvcHVwX2Noa2JveCB0b2dnbGVfX2lucHV0XCIgbmFtZT1cImltZ19mb3VyXCIgdmFsdWU9XCJpbWdfZm91clwiPlxcbicgK1xuICAgICAgICAnXFx0XFx0XFx0XFx0XFx0ICA8bGFiZWwgZm9yPVwiaW1nX2ZvdXJcIj4mbmJzcDsgXCJHZXQgc29tZSBIQkFSXCI8L2xhYmVsPlxcbicgK1xuICAgICAgICAnXFx0XFx0XFx0XFx0XFx0PC9mb3JtPlxcbicgK1xuICAgICAgICAnXFxuJyArXG4gICAgICAgICdcXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfbG9nb1wiPlxcbicgK1xuICAgICAgICAnXFx0XFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cImxvZ29fdHh0XCI+UG93ZXJlZCBieTwvZGl2PlxcbicgK1xuICAgICAgICAnXFx0XFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cImxvZ29faWNvblwiPjxpbWcgc3JjPVwiLy9hcGkuaGFzaGluZ3N5c3RlbXMuY29tL2ltZy9wb3B1cF9sb2dvLnBuZ1wiPjwvZGl2PlxcbicgK1xuICAgICAgICAnXFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxuJyArXG4gICAgICAgICdcXHQgIFxcdFxcdFxcdFxcdFxcbicgK1xuICAgICAgICAnXFx0ICBcXHRcXHRcXHQ8L2Rpdj5cXG4nICtcbiAgICAgICAgJ1xcdCAgXFx0XFx0XFx0PGRpdiBjbGFzcz1cInBvcHVwX2lubmVyX3JpZ2h0XCI+XFxuJyArXG4gICAgICAgICdcXG4nICtcbiAgICAgICAgJ1xcdCAgXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cInBvcHVwX2ltZ19zZWNcIj5cXG4nICtcbiAgICAgICAgJ1xcdCAgXFx0XFx0XFx0XFx0XFx0PGltZyBjbGFzcz1cImltZ19vbmVcIiBzcmM9XCIvL2FwaS5oYXNoaW5nc3lzdGVtcy5jb20vaW1nL2ltZ19vbmUucG5nXCI+XFxuJyArXG4gICAgICAgICdcXHQgIFxcdFxcdFxcdFxcdFxcdDxpbWcgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiIGNsYXNzPVwiaW1nX3R3b1wiIHNyYz1cIi8vYXBpLmhhc2hpbmdzeXN0ZW1zLmNvbS9pbWcvaW1nX3R3by5wbmdcIj5cXG4nICtcbiAgICAgICAgJ1xcdCAgXFx0XFx0XFx0XFx0XFx0PGltZyBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCIgY2xhc3M9XCJpbWdfdGhyZWVcIiBzcmM9XCIvL2FwaS5oYXNoaW5nc3lzdGVtcy5jb20vaW1nL2ltZ190aHJlZS5wbmdcIj5cXG4nICtcbiAgICAgICAgJ1xcdCAgXFx0XFx0XFx0XFx0XFx0PGltZyBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCIgY2xhc3M9XCJpbWdfZm91clwiIHNyYz1cIi8vYXBpLmhhc2hpbmdzeXN0ZW1zLmNvbS9pbWcvaW1nX2ZvdXIucG5nXCI+XFxuJyArXG4gICAgICAgICdcXHQgIFxcdFxcdFxcdFxcdDwvZGl2PlxcbicgK1xuICAgICAgICAnXFx0ICBcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwidHh0X3dyYXBcIj5cXG4nICtcbiAgICAgICAgJ1xcdFxcdCAgXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cInR4dF9oZWFkZXJcIj5MZXRzIGdldCB5b3Ugc3RhcnRlZCE8L2Rpdj5cXG4nICtcbiAgICAgICAgJ1xcdFxcdCAgXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cInR4dF9jb250ZW50XCI+TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQsIHNlZCBkbyBlaXVzbW9kIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZSBldCA8L2Rpdj5cXG4nICtcbiAgICAgICAgJ1xcdFxcdCAgXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cInBvcHVwX2J0blwiPlxcbicgK1xuICAgICAgICAnXFx0XFx0ICBcXHRcXHRcXHRcXHRcXHQ8YSBocmVmPVwiXCI+SVxcJ20gUmVhZHk8L2E+XFxuJyArXG4gICAgICAgICdcXHRcXHQgIFxcdFxcdFxcdFxcdDwvZGl2PlxcbicgK1xuICAgICAgICAnXFx0XFx0ICBcXHRcXHRcXHQ8L2Rpdj5cXG4nICtcbiAgICAgICAgJ1xcdCAgXFx0XFx0XFx0XFx0XFxuJyArXG4gICAgICAgICdcXHQgIFxcdFxcdFxcdDwvZGl2PlxcbicgK1xuICAgICAgICAnXFx0ICBcXHRcXHQ8L2Rpdj5cXG4nICtcbiAgICAgICAgJ1xcdCAgXFx0PC9kaXY+XFxuJyArXG4gICAgICAgICdcXHQ8L2Rpdj5cXG4nO1xuXG4gICAgdmFyIG15TW9kYWwgPSBuZXcgTW9kYWwoe1xuICAgICAgICBjb250ZW50OiBteUNvbnRlbnRcbiAgICB9KTtcbiAgICBteU1vZGFsLm9wZW4oKTtcbn1cblxuXG5hcHAod2luZG93KTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21haW4uanMiLCJleHBvcnQgZnVuY3Rpb24gcGluZygpIHtcbiAgICByZXR1cm4gJ3BvbmcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJlY2hlY2tlcihuKSB7XG4gICAgbGV0IGpzb24gPSB7MDogXCJPS1wiLCAxOiBcIklOVkFMSURfVFJBTlNBQ1RJT05cIiwgMjogXCJQQVlFUl9BQ0NPVU5UX05PVF9GT1VORFwiLCAzOiBcIklOVkFMSURfTk9ERV9BQ0NPVU5UXCIsIDQ6IFwiVFJBTlNBQ1RJT05fRVhQSVJFRFwiLCA1OiBcIklOVkFMSURfVFJBTlNBQ1RJT05fU1RBUlRcIiwgNjogXCJJTlZBTElEX1RSQU5TQUNUSU9OX0RVUkFUSU9OXCIsIDc6IFwiSU5WQUxJRF9TSUdOQVRVUkVcIiwgODogXCJNRU1PX1RPT19MT05HXCIsIDk6IFwiSU5TVUZGSUNJRU5UX1RYX0ZFRVwiLCAxMDogXCJJTlNVRkZJQ0lFTlRfUEFZRVJfQkFMQU5DRVwiLCAxMTogXCJEVVBMSUNBVEVfVFJBTlNBQ1RJT05cIiwgMTI6IFwiQlVTWVwiLCAxMzogXCJOT1RfU1VQUE9SVEVEXCIsIDE0OiBcIklOVkFMSURfRklMRV9JRFwiLCAxNTogXCJJTlZBTElEX0FDQ09VTlRfSURcIiwgMTY6IFwiSU5WQUxJRF9DT05UUkFDVF9JRFwiLCAxNzogXCJJTlZBTElEX1RSQU5TQUNUSU9OX0lEXCIsIDE4OiBcIlJFQ0VJUFRfTk9UX0ZPVU5EXCIsIDE5OiBcIlJFQ09SRF9OT1RfRk9VTkRcIiwgMjA6IFwiSU5WQUxJRF9TT0xJRElUWV9JRFwiLCAyMTogXCJVTktOT1dOXCIsIDIyOiBcIlNVQ0NFU1NcIiwgMjM6IFwiRkFJTF9JTlZBTElEXCIsIDI0OiBcIkZBSUxfRkVFXCIsIDI1OiBcIkZBSUxfQkFMQU5DRVwiLCAyNjogXCJLRVlfUkVRVUlSRURcIiwgMjc6IFwiQkFEX0VOQ09ESU5HXCIsIDI4OiBcIklOU1VGRklDSUVOVF9BQ0NPVU5UX0JBTEFOQ0VcIiwgMjk6IFwiSU5WQUxJRF9TT0xJRElUWV9BRERSRVNTXCIsIDMwOiBcIklOU1VGRklDSUVOVF9HQVNcIiwgMzE6IFwiQ09OVFJBQ1RfU0laRV9MSU1JVF9FWENFRURFRFwiLCAzMjogXCJMT0NBTF9DQUxMX01PRElGSUNBVElPTl9FWENFUFRJT05cIiwgMzM6IFwiQ09OVFJBQ1RfUkVWRVJUX0VYRUNVVEVEXCIsIDM0OiBcIkNPTlRSQUNUX0VYRUNVVElPTl9FWENFUFRJT05cIiwgMzU6IFwiSU5WQUxJRF9SRUNFSVZJTkdfTk9ERV9BQ0NPVU5UXCIsIDM2OiBcIk1JU1NJTkdfUVVFUllfSEVBREVSXCIsIDM3OiBcIkFDQ09VTlRfVVBEQVRFX0ZBSUxFRFwiLCAzODogXCJJTlZBTElEX0tFWV9FTkNPRElOR1wiLCAzOTogXCJOVUxMX1NPTElESVRZX0FERFJFU1NcIiwgNDA6IFwiQ09OVFJBQ1RfVVBEQVRFX0ZBSUxFRFwiLCA0MTogXCJJTlZBTElEX1FVRVJZX0hFQURFUlwiLCA0MjogXCJJTlZBTElEX0ZFRV9TVUJNSVRURURcIiwgNDM6IFwiSU5WQUxJRF9QQVlFUl9TSUdOQVRVUkVcIiwgNDQ6IFwiS0VZX05PVF9QUk9WSURFRFwiLCA0NTogXCJJTlZBTElEX0VYUElSQVRJT05fVElNRVwiLCA0NjogXCJOT19XQUNMX0tFWVwiLCA0NzogXCJGSUxFX0NPTlRFTlRfRU1QVFlcIiwgNDg6IFwiSU5WQUxJRF9BQ0NPVU5UX0FNT1VOVFNcIiwgNDk6IFwiRU1QVFlfVFJBTlNBQ1RJT05fQk9EWVwiLCA1MDogXCJJTlZBTElEX1RSQU5TQUNUSU9OX0JPRFlcIiwgNTE6IFwiSU5WQUxJRF9TSUdOQVRVUkVfVFlQRV9NSVNNQVRDSElOR19LRVlcIiwgNTI6IFwiSU5WQUxJRF9TSUdOQVRVUkVfQ09VTlRfTUlTTUFUQ0hJTkdfS0VZXCIsIDUzOiBcIkVNUFRZX0NMQUlNX0JPRFlcIiwgNTQ6IFwiRU1QVFlfQ0xBSU1fSEFTSFwiLCA1NTogXCJFTVBUWV9DTEFJTV9LRVlTXCIsIDU2OiBcIklOVkFMSURfQ0xBSU1fSEFTSF9TSVpFXCIsIDU3OiBcIkVNUFRZX1FVRVJZX0JPRFlcIiwgNTg6IFwiRU1QVFlfQ0xBSU1fUVVFUllcIiwgNTk6IFwiQ0xBSU1fTk9UX0ZPVU5EXCIsIDYwOiBcIkFDQ09VTlRfSURfRE9FU19OT1RfRVhJU1RcIiwgNjE6IFwiQ0xBSU1fQUxSRUFEWV9FWElTVFNcIiwgNjI6IFwiSU5WQUxJRF9GSUxFX1dBQ0xcIiwgNjM6IFwiU0VSSUFMSVpBVElPTl9GQUlMRURcIiwgNjQ6IFwiVFJBTlNBQ1RJT05fT1ZFUlNJWkVcIiwgNjU6IFwiVFJBTlNBQ1RJT05fVE9PX01BTllfTEFZRVJTXCIsIDY2OiBcIkNPTlRSQUNUX0RFTEVURURcIiwgNjc6IFwiUExBVEZPUk1fTk9UX0FDVElWRVwiLCA2ODogXCJLRVlfUFJFRklYX01JU01BVENIXCIsIDY5OiBcIlBMQVRGT1JNX1RSQU5TQUNUSU9OX05PVF9DUkVBVEVEXCIsIDcwOiBcIklOVkFMSURfUkVORVdBTF9QRVJJT0RcIiwgNzE6IFwiSU5WQUxJRF9QQVlFUl9BQ0NPVU5UX0lEXCIsIDcyOiBcIkFDQ09VTlRfREVMRVRFRFwiLCA3MzogXCJGSUxFX0RFTEVURURcIiwgNzQ6IFwiQUNDT1VOVF9SRVBFQVRFRF9JTl9BQ0NPVU5UX0FNT1VOVFNcIiwgNzU6IFwiU0VUVElOR19ORUdBVElWRV9BQ0NPVU5UX0JBTEFOQ0VcIiwgNzY6IFwiT0JUQUlORVJfUkVRVUlSRURcIiwgNzc6IFwiT0JUQUlORVJfU0FNRV9DT05UUkFDVF9JRFwiLCA3ODogXCJPQlRBSU5FUl9ET0VTX05PVF9FWElTVFwiLCA3OTogXCJNT0RJRllJTkdfSU1NVVRBQkxFX0NPTlRSQUNUXCIsIDgwOiBcIkZJTEVfU1lTVEVNX0VYQ0VQVElPTlwiLCA4MTogXCJBVVRPUkVORVdfRFVSQVRJT05fTk9UX0lOX1JBTkdFXCIsIDgyOiBcIkVSUk9SX0RFQ09ESU5HX0JZVEVTVFJJTkdcIiwgODM6IFwiQ09OVFJBQ1RfRklMRV9FTVBUWVwiLCA4NDogXCJDT05UUkFDVF9CWVRFQ09ERV9FTVBUWVwiLCA4NTogXCJJTlZBTElEX0lOSVRJQUxfQkFMQU5DRVwiLCA4NjogXCJJTlZBTElEX1JFQ0VJVkVfUkVDT1JEX1RIUkVTSE9MRFwiLCA4NzogXCJJTlZBTElEX1NFTkRfUkVDT1JEX1RIUkVTSE9MRFwiLCA4ODogXCJBQ0NPVU5UX0lTX05PVF9HRU5FU0lTX0FDQ09VTlRcIn1cbiAgICAgcmV0dXJuIGpzb25bbl07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmljZXMuanMiLCIvLyBEZWZpbmUgb3VyIGNvbnN0cnVjdG9yXG5mdW5jdGlvbiBNb2RhbCgpIHtcbiAgICBjb25zb2xlLmxvZyhcInRlc3RcIilcbiAgICAvLyBDcmVhdGUgZ2xvYmFsIGVsZW1lbnQgcmVmZXJlbmNlc1xuICAgIHRoaXMuY2xvc2VCdXR0b24gPSBudWxsO1xuICAgIHRoaXMubW9kYWwgPSBudWxsO1xuICAgIHRoaXMub3ZlcmxheSA9IG51bGw7XG5cbiAgICAvLyBEZXRlcm1pbmUgcHJvcGVyIHByZWZpeFxuICAgIHRoaXMudHJhbnNpdGlvbkVuZCA9IHRyYW5zaXRpb25TZWxlY3QoKTtcblxuICAgIC8vIERlZmluZSBvcHRpb24gZGVmYXVsdHNcbiAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgIGF1dG9PcGVuOiBmYWxzZSxcbiAgICAgICAgY2xhc3NOYW1lOiAnZmFkZS1hbmQtZHJvcCcsXG4gICAgICAgIGNsb3NlQnV0dG9uOiB0cnVlLFxuICAgICAgICBjb250ZW50OiBcIlwiLFxuICAgICAgICBtYXhXaWR0aDogNjAwLFxuICAgICAgICBtaW5XaWR0aDogMjgwLFxuICAgICAgICBvdmVybGF5OiB0cnVlXG4gICAgfVxuXG4gICAgY29uc29sZS5sb2codGhpcyk7XG5cbiAgICAvLyBDcmVhdGUgb3B0aW9ucyBieSBleHRlbmRpbmcgZGVmYXVsdHMgd2l0aCB0aGUgcGFzc2VkIGluIGFydWdtZW50c1xuICAgIGlmIChhcmd1bWVudHNbMF0gJiYgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBleHRlbmREZWZhdWx0cyhkZWZhdWx0cywgYXJndW1lbnRzWzBdKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmF1dG9PcGVuID09PSB0cnVlKSB0aGlzLm9wZW4oKTtcblxufVxuXG4vLyBQdWJsaWMgTWV0aG9kc1xuTW9kYWwucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBfID0gdGhpcztcbiAgICBjb25zb2xlLmxvZyh0aGlzLm1vZGFsLmNsYXNzTmFtZSk7XG4gICAgdGhpcy5tb2RhbC5jbGFzc05hbWUgPSB0aGlzLm1vZGFsLmNsYXNzTmFtZS5yZXBsYWNlKFwiIGhhc2gtb3BlblwiLCBcIlwiKTtcbiAgICB0aGlzLm92ZXJsYXkuY2xhc3NOYW1lID0gdGhpcy5vdmVybGF5LmNsYXNzTmFtZS5yZXBsYWNlKFwiIGhhc2gtb3BlblwiLCBcIlwiKTtcbiAgICB0aGlzLm1vZGFsLmFkZEV2ZW50TGlzdGVuZXIodGhpcy50cmFuc2l0aW9uRW5kLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF8ubW9kYWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChfLm1vZGFsKTtcbiAgICB9KTtcbiAgICB0aGlzLm92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLnRyYW5zaXRpb25FbmQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKF8ub3ZlcmxheS5wYXJlbnROb2RlKSBfLm92ZXJsYXkucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChfLm92ZXJsYXkpO1xuICAgIH0pO1xufTtcblxuTW9kYWwucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgYnVpbGRPdXQuY2FsbCh0aGlzKTtcbiAgICBpbml0aWFsaXplRXZlbnRzLmNhbGwodGhpcyk7XG4gICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5tb2RhbCkuaGVpZ2h0O1xuICAgIHRoaXMubW9kYWwuY2xhc3NOYW1lID0gdGhpcy5tb2RhbC5jbGFzc05hbWUgKyAodGhpcy5tb2RhbC5vZmZzZXRIZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQgPyBcIiBoYXNoLW9wZW4gaGFzaC1hbmNob3JlZFwiIDogXCIgaGFzaC1vcGVuXCIpO1xuICAgIHRoaXMub3ZlcmxheS5jbGFzc05hbWUgPSB0aGlzLm92ZXJsYXkuY2xhc3NOYW1lICsgXCIgaGFzaC1vcGVuXCI7XG59O1xuXG4vLyBQcml2YXRlIE1ldGhvZHNcbmZ1bmN0aW9uIGJ1aWxkT3V0KCkge1xuXG4gICAgdmFyIGNvbnRlbnQsIGNvbnRlbnRIb2xkZXIsIGRvY0ZyYWc7XG5cbiAgICAvKlxuICAgICAqIElmIGNvbnRlbnQgaXMgYW4gSFRNTCBzdHJpbmcsIGFwcGVuZCB0aGUgSFRNTCBzdHJpbmcuXG4gICAgICogSWYgY29udGVudCBpcyBhIGRvbU5vZGUsIGFwcGVuZCBpdHMgY29udGVudC5cbiAgICAgKi9cblxuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLmNvbnRlbnQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgY29udGVudCA9IHRoaXMub3B0aW9ucy5jb250ZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRlbnQgPSB0aGlzLm9wdGlvbnMuY29udGVudC5pbm5lckhUTUw7XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIGEgRG9jdW1lbnRGcmFnbWVudCB0byBidWlsZCB3aXRoXG4gICAgZG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgIC8vIENyZWF0ZSBtb2RhbCBlbGVtZW50XG4gICAgdGhpcy5tb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5tb2RhbC5jbGFzc05hbWUgPSBcImhhc2gtbW9kYWwgXCIgKyB0aGlzLm9wdGlvbnMuY2xhc3NOYW1lO1xuICAgIHRoaXMubW9kYWwuc3R5bGUubWluV2lkdGggPSB0aGlzLm9wdGlvbnMubWluV2lkdGggKyBcInB4XCI7XG4gICAgdGhpcy5tb2RhbC5zdHlsZS5tYXhXaWR0aCA9IHRoaXMub3B0aW9ucy5tYXhXaWR0aCArIFwicHhcIjtcblxuICAgIC8vIENyZWF0ZSBjb250ZW50IGFyZWEgYW5kIGFwcGVuZCB0byBtb2RhbFxuICAgIGNvbnRlbnRIb2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnRlbnRIb2xkZXIuY2xhc3NOYW1lID0gXCJoYXNoLWNvbnRlbnRcIjtcbiAgICBjb250ZW50SG9sZGVyLmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgdGhpcy5tb2RhbC5hcHBlbmRDaGlsZChjb250ZW50SG9sZGVyKTtcblxuICAgIC8vIEFwcGVuZCBtb2RhbCB0byBEb2N1bWVudEZyYWdtZW50XG4gICAgZG9jRnJhZy5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsKTtcblxuICAgIC8vIEFwcGVuZCBEb2N1bWVudEZyYWdtZW50IHRvIGJvZHlcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvY0ZyYWcpO1xuXG59XG5cbmZ1bmN0aW9uIGV4dGVuZERlZmF1bHRzKHNvdXJjZSwgcHJvcGVydGllcykge1xuICAgIHZhciBwcm9wZXJ0eTtcbiAgICBmb3IgKHByb3BlcnR5IGluIHByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgICAgICBzb3VyY2VbcHJvcGVydHldID0gcHJvcGVydGllc1twcm9wZXJ0eV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2coc291cmNlKTtcbiAgICByZXR1cm4gc291cmNlO1xufVxuXG5mdW5jdGlvbiBpbml0aWFsaXplRXZlbnRzKCkge1xuXG4gICAgaWYgKHRoaXMuY2xvc2VCdXR0b24pIHtcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2UuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3ZlcmxheSkge1xuICAgICAgICB0aGlzLm92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlLmJpbmQodGhpcykpO1xuICAgIH1cblxufVxuXG5mdW5jdGlvbiB0cmFuc2l0aW9uU2VsZWN0KCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgaWYgKGVsLnN0eWxlLldlYmtpdFRyYW5zaXRpb24pIHJldHVybiBcIndlYmtpdFRyYW5zaXRpb25FbmRcIjtcbiAgICBpZiAoZWwuc3R5bGUuT1RyYW5zaXRpb24pIHJldHVybiBcIm9UcmFuc2l0aW9uRW5kXCI7XG4gICAgcmV0dXJuICd0cmFuc2l0aW9uZW5kJztcbn1cblxuLy9leHBvcnRpbmcgbW9kdWxlXG5tb2R1bGUuZXhwb3J0cy5Nb2RhbCA9IE1vZGFsO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZGFsLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==