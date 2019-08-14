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
  var myContent = '<div class="popup_outer_wrap">\n' + '\t  \t<div class="popup_wrap">\n' + '\t  \t\t<div class="popup_header">Setup Task <a href="javascript:void(0)" class="popup_close">x</a></div>\n' + '\n' + '\t  \t\t<div class="popup_inner">\n' + '\t  \t\t\t<div class="popup_inner_left">\n' + '\n' + '\t  \t\t\t\t<form action="/action_page.php" class="popup_form">\n' + '\t\t\t\t\t  <input type="checkbox" onchange= "imgchangeFunction()" id="img_one" class="popup_chkbox toggle__input" name="img_chkbox" value="img_one">\n' + '\t\t\t\t\t  <label for="img_one">&nbsp; Install Hedera Wallet</label>\n' + '\t\t\t\t\t  <input type="checkbox" onchange= "imgchangeFunction()" id="img_two" class="popup_chkbox toggle__input" name="img_chkbox" value="img_two">\n' + '\t\t\t\t\t  <label for="img_two">&nbsp; "Pair your Account"</label>\n' + '\n' + '\t\t\t\t\t  <input type="checkbox" onchange= "imgchangeFunction()" id="img_three" class="popup_chkbox toggle__input" name="img_chkbox" value="img_three">\n' + '\t\t\t\t\t  <label for="img_three">&nbsp; "Allow Payment Requests"</label>\n' + '\n' + '\t\t\t\t\t  <input type="checkbox" onchange= "imgchangeFunction()" id="img_four" class="popup_chkbox toggle__input" name="img_chkbox" value="img_four">\n' + '\t\t\t\t\t  <label for="img_four">&nbsp; "Get some HBAR"</label>\n' + '\t\t\t\t\t</form>\n' + '\n' + '\t\t\t\t\t<div class="popup_logo">\n' + '\t\t\t\t\t\t<div class="logo_txt">Powered by</div>\n' + '\t\t\t\t\t\t<div class="logo_icon"><img src="//api.hashingsystems.com/img/popup_logo.png"></div>\n' + '\t\t\t\t\t</div>\n' + '\t  \t\t\t\t\n' + '\t  \t\t\t</div>\n' + '\t  \t\t\t<div class="popup_inner_right">\n' + '\n' + '\t  \t\t\t\t<div class="popup_img_sec">\n' + '\t  \t\t\t\t\t<img class="img_one" src="//api.hashingsystems.com/img/img_one.png">\n' + '\t  \t\t\t\t\t<img style="display: none;" class="img_two" src="//api.hashingsystems.com/img/img_two.png">\n' + '\t  \t\t\t\t\t<img style="display: none;" class="img_three" src="//api.hashingsystems.com/img/img_three.png">\n' + '\t  \t\t\t\t\t<img style="display: none;" class="img_four" src="//api.hashingsystems.com/img/img_four.png">\n' + '\t  \t\t\t\t</div>\n' + '\t  \t\t\t\t<div class="txt_wrap">\n' + '\t\t  \t\t\t\t<div class="txt_header">Lets get you started!</div>\n' + '\t\t  \t\t\t\t<div class="txt_content">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et </div>\n' + '\t\t  \t\t\t\t<div class="popup_btn">\n' + '\t\t  \t\t\t\t\t<a href="">I\'m Ready</a>\n' + '\t\t  \t\t\t\t</div>\n' + '\t\t  \t\t\t</div>\n' + '\t  \t\t\t\t\n' + '\t  \t\t\t</div>\n' + '\t  \t\t</div>\n' + '\t  \t</div>';
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
    console.log(this.closeButton);
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
  console.log("test");
  console.log(this.closeButton);

  if (this.closeButton) {
    console.log("test");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmM0NmQ0NGI4NTQyY2Q4ODgwYTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2RhbC5qcyJdLCJuYW1lcyI6WyJzdXBwb3J0ZWRBUEkiLCJwcm9kdWN0aW9uIiwiYXBwIiwid2luZG93IiwiY29uc29sZSIsImxvZyIsInRvZGF5IiwiRGF0ZSIsImRhdGUiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsInRpbWUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJkYXRlVGltZSIsInRpbWVzdGFtcCIsImdldFRpbWUiLCJjb25maWd1cmF0aW9ucyIsInBheW1lbnRzZXJ2ZXIiLCJleHRlbnNpb25pZCIsImVycm9yIiwidHlwZSIsIm5vdyIsInJlZGlyZWN0IiwiaWQiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwic3VibWlzc2lvbm5vZGUiLCJtZW1vIiwicmVjaXBpZW50bGlzdCIsImNvbnRlbnRpZCIsImF0dHJJRCIsImdsb2JhbE9iamVjdCIsInF1ZXVlIiwicSIsImkiLCJsZW5ndGgiLCJ0b0xvd2VyQ2FzZSIsImV4dGVuZE9iamVjdCIsImNyZWF0ZUhlZGVyYU9iamVjdCIsImNoZWNrRm9yRXh0ZW5zaW9uIiwiYXBpSGFuZGxlciIsImNhbGxiYWNrIiwiaXNDaHJvbWUiLCJyZWRpcmVjdFRvRXJyb3IiLCJ0YWdzIiwiYW1vdW50IiwiRVhURU5TSU9OX0lEIiwiZGV0ZWN0IiwicmVzcG9uc2UiLCJyZWNvcmRSZXNwb25zZSIsImV4dGVuc2lvbklkIiwibm90SW5zdGFsbGVkQ2FsbGJhY2siLCJpbnN0YWxsZWRDYWxsYmFjayIsImltZyIsIkltYWdlIiwib25lcnJvciIsIm9ubG9hZCIsInNyYyIsInJlcyIsImJvZHkiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwiZXJyIiwicmVwbGFjZSIsIm9yaWdpbiIsImNvbmZpZ3VyYXRpb24iLCJhcGkiLCJwYXJhbXMiLCJFcnJvciIsImluZGV4T2YiLCJjaGVja1RyYW5zYWN0aW9uIiwiY3JlYXRlQ29udHJhY3RPYmplY3QiLCJpbml0IiwiZ2V0bW9kYWwiLCJ3YXJuIiwiYSIsImIiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsIm9iamVjdCIsIkhlZGVyYW9iamVjdCIsIm5vZGUiLCJnZXRFbGVtZW50QnlJZCIsIl9fY29uc3RydWN0IiwiY29udHJhY3RpZCIsIm1heGltdW0iLCJhYmkiLCJKU09OIiwic3RyaW5naWZ5IiwicGFyc2UiLCJleHRlbmRlZCIsIkNvbnRyYWN0b2JqZWN0IiwibWVtb19pZCIsInVybCIsInN0cnVjdHVyZSIsImJhc2V1cmwiLCJyZWNlaXZlcl9pZCIsInN1Y2Nlc3MiLCJmYWlsdXJlIiwidGltZW91dCIsImxpbWl0IiwiVVJMIiwic2V0VGltZW91dCIsInBlcmZvcm1SZXF1ZXN0IiwieGh0dHAiLCJYTUxIdHRwUmVxdWVzdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJub2RlcHJlY2hlY2siLCJwcmVjaGVja2VyIiwib3BlbiIsInNlbmQiLCJpc2Nocm9tZSIsImFjY291bnRQYWlyZWQiLCJpc21vYmlsZSIsInZhbGlkQnJvd3NlciIsImV4dGVuc2lvbkluc3RhbGxlZCIsImFjY2Vzc1RvQWNjb3VudHMiLCJhY2NvdW50SWQiLCJzdWJtaXNzaW9uTm9kZSIsInR4bl9zdWNjZXNzIiwiY2hlY2tJc0Nocm9tZSIsIm1vYiIsImRldGVjdG1vYiIsImFqYXhyZXNwIiwic2VuZGVyIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwibWF0Y2giLCJteUNvbnRlbnQiLCJteU1vZGFsIiwiTW9kYWwiLCJjb250ZW50IiwicGluZyIsIm4iLCJqc29uIiwiY2xvc2VCdXR0b24iLCJtb2RhbCIsIm92ZXJsYXkiLCJ0cmFuc2l0aW9uRW5kIiwidHJhbnNpdGlvblNlbGVjdCIsImRlZmF1bHRzIiwiYXV0b09wZW4iLCJjbGFzc05hbWUiLCJtYXhXaWR0aCIsIm1pbldpZHRoIiwiYXJndW1lbnRzIiwib3B0aW9ucyIsImV4dGVuZERlZmF1bHRzIiwicHJvdG90eXBlIiwiY2xvc2UiLCJfIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImJ1aWxkT3V0IiwiY2FsbCIsImluaXRpYWxpemVFdmVudHMiLCJnZXRDb21wdXRlZFN0eWxlIiwiaGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJxdWVyeVNlbGVjdG9yIiwib25jbGljayIsInN0eWxlIiwiZGlzcGxheSIsImNvbnRlbnRIb2xkZXIiLCJkb2NGcmFnIiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImltZ2NoYW5nZUZ1bmN0aW9uIiwiY2hib3hzIiwiZ2V0RWxlbWVudHNCeU5hbWUiLCJ2YXJfY2hlY2siLCJpbWdfYWxsIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImNoZWNrZWQiLCJjb25jYXQiLCJ2YWx1ZSIsInNvdXJjZSIsInByb3BlcnRpZXMiLCJwcm9wZXJ0eSIsImJpbmQiLCJlbCIsIldlYmtpdFRyYW5zaXRpb24iLCJPVHJhbnNpdGlvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhE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YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDJjNDZkNDRiODU0MmNkODg4MGEwIiwiaW1wb3J0IHtcbiAgICBwaW5nLCBwcmVjaGVja2VyXG59IGZyb20gJy4vc2VydmljZXMnXG5cbmltcG9ydCB7TW9kYWx9IGZyb20gJy4vbW9kYWwnO1xuXG4vLyBlbmxpc3QgYWxsIG1ldGhvZHMgc3VwcG9ydGVkIGJ5IEFQSSAoZS5nLiBgbXcoJ2V2ZW50JywgJ3VzZXItbG9naW4nKTtgKVxuY29uc3Qgc3VwcG9ydGVkQVBJID0gWydtYWtlcGF5bWVudCcsICd0ZXN0JywgJ2NyZWF0ZWhlZGVyYW9iamVjdCcsICdjaGVja3RyYW5zYWN0aW9uJywgJ2dldG1vZGFsJyxcbiAgICAnY3JlYXRlY29udHJhY3RvYmplY3QnLCAnaW5pdCcsICd0cmFuc2FjdGlvbm5vZGVjaGVja2VyJ107XG4vKipcbiBUaGUgbWFpbiBlbnRyeSBvZiB0aGUgYXBwbGljYXRpb25cbiAqL1xuY29uc3QgcHJvZHVjdGlvbiA9IHRydWU7XG5cbmZ1bmN0aW9uIGFwcCh3aW5kb3cpIHtcbiAgICBjb25zb2xlLmxvZygnSEFTSC1KUyBzdGFydGluZycpO1xuICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCksXG4gICAgICAgIGRhdGUgPSB0b2RheS5nZXRGdWxsWWVhcigpICsgJy0nICsgKHRvZGF5LmdldE1vbnRoKCkgKyAxKSArICctJyArIHRvZGF5LmdldERhdGUoKSxcbiAgICAgICAgdGltZSA9IHRvZGF5LmdldEhvdXJzKCkgKyBcIjpcIiArIHRvZGF5LmdldE1pbnV0ZXMoKSxcbiAgICAgICAgZGF0ZVRpbWUgPSBkYXRlICsgJyAnICsgdGltZSxcbiAgICAgICAgdGltZXN0YW1wID0gbmV3IERhdGUoZGF0ZVRpbWUpLmdldFRpbWUoKTtcblxuICAgIGxldCBjb25maWd1cmF0aW9ucyA9IHtcbiAgICAgICAgcGF5bWVudHNlcnZlcjogcHJvZHVjdGlvbiA/IFwiaHR0cHM6Ly9tcHMuaGFzaGluZ3N5c3RlbXMuY29tXCIgOiAnaHR0cDovL2xvY2FsaG9zdDo5OTk5JyxcbiAgICAgICAgZXh0ZW5zaW9uaWQ6IFwibGlncGFvbmRhYWJjbGZpZ2FnY2lmb2JhZWxlbWllbmFcIixcbiAgICAgICAgZXJyb3I6IFwiL25vLWV4dGVuc2lvblwiLFxuICAgICAgICB0eXBlOiBcImFydGljbGVcIixcbiAgICAgICAgdGltZTogRGF0ZS5ub3coKSxcbiAgICAgICAgcmVkaXJlY3Q6ICd7IFwibm9uUGF5aW5nQWNjb3VudFwiOiBcIi9pbnN1ZmZpY2llbnQtYW1vdW50L1wiLCBcIm5vQWNjb3VudFwiOiBcIi9hY2NvdW50LW5vdC1wYWlyZWQvXCIsIFwiaG9tZVBhZ2VcIjogXCIvXCJ9JyxcbiAgICAgICAgLy8gdGhpcyBtaWdodCBtYWtlIGEgZ29vZCBkZWZhdWx0IGlkIGZvciB0aGUgY29udGVudFxuICAgICAgICBpZDogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgICBzdWJtaXNzaW9ubm9kZTogXCIwLjAuMTFcIixcbiAgICAgICAgbWVtbzogRGF0ZS5ub3coKSxcbiAgICAgICAgcmVjaXBpZW50bGlzdDogJ1t7IFwidG9cIjogXCIwLjAuOTlcIiwgXCJ0aW55YmFyc1wiOiBcIjE2NjY2NjdcIiB9XScsXG4gICAgICAgIGNvbnRlbnRpZDogJzc5JyxcbiAgICAgICAgYXR0cklEOiAnYXJ0aWNsZS0xJyxcbiAgICAgICAgdGltZXN0YW1wOiB0aW1lc3RhbXAsXG4gICAgICAgIC8vcmVkaXJlY3Q6J3sgXCJub25QYXlpbmdBY2NvdW50XCI6IFwiL2luc3VmZmljaWVudC1hbW91bnQvXCIsIFwibm9BY2NvdW50XCI6IFwiL2FjY291bnQtbm90LXBhaXJlZC9cIiwgXCJob21lUGFnZVwiOiBcIi9cIiB9JyxcbiAgICB9O1xuICAgIC8vIGFsbCBtZXRob2RzIHRoYXQgd2VyZSBjYWxsZWQgdGlsbCBub3cgYW5kIHN0b3JlZCBpbiBxdWV1ZVxuICAgIC8vIG5lZWRzIHRvIGJlIGNhbGxlZCBub3dcbiAgICBsZXQgZ2xvYmFsT2JqZWN0ID0gd2luZG93W3dpbmRvd1snSEFTSC1KUyddXTtcbiAgICBsZXQgcXVldWUgPSBnbG9iYWxPYmplY3QucTtcbiAgICBpZiAocXVldWUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBxdWV1ZVtpXVswXSAhPT0gJ3VuZGVmaW5lZCcgJiYgcXVldWVbaV1bMF0udG9Mb3dlckNhc2UoKSA9PSAnbWFrZXBheW1lbnQnKSB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbnMgPSBleHRlbmRPYmplY3QoY29uZmlndXJhdGlvbnMsIHF1ZXVlW2ldWzFdKTtcbiAgICAgICAgICAgICAgICBjcmVhdGVIZWRlcmFPYmplY3QoY29uZmlndXJhdGlvbnMpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdIQVNILUpTIHN0YXJ0ZWQnLCBjb25maWd1cmF0aW9ucyk7XG4gICAgICAgICAgICAgICAgY2hlY2tGb3JFeHRlbnNpb24oY29uZmlndXJhdGlvbnMpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBxdWV1ZVtpXVswXSAhPT0gJ3VuZGVmaW5lZCcgJiYgcXVldWVbaV1bMF0udG9Mb3dlckNhc2UoKSA9PSAnY3JlYXRlY29udHJhY3RvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbnMgPSBleHRlbmRPYmplY3QoY29uZmlndXJhdGlvbnMsIHF1ZXVlW2ldWzFdKTtcbiAgICAgICAgICAgICAgICBhcGlIYW5kbGVyKGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVswXSwgcXVldWVbaV1bMV0sIHF1ZXVlW2ldWzJdKTtcbiAgICAgICAgICAgICAgICBjaGVja0ZvckV4dGVuc2lvbihjb25maWd1cmF0aW9ucylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhbGxiYWNrO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcXVldWVbaV1bMV0gPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayA9IHF1ZXVlW2ldWzFdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gcXVldWVbaV1bcXVldWVbMF0ubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25zID0gZXh0ZW5kT2JqZWN0KGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgICAgICAgICAgYXBpSGFuZGxlcihjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMF0sIHF1ZXVlW2ldWzFdLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gb3ZlcnJpZGUgdGVtcG9yYXJ5ICh1bnRpbCB0aGUgYXBwIGxvYWRlZCkgaGFuZGxlclxuICAgIC8vIGZvciB3aWRnZXQncyBBUEkgY2FsbHNcbiAgICBnbG9iYWxPYmplY3QgPSBhcGlIYW5kbGVyO1xuICAgIGdsb2JhbE9iamVjdC5jb25maWd1cmF0aW9ucyA9IGNvbmZpZ3VyYXRpb25zO1xufVxuXG5mdW5jdGlvbiBjaGVja0ZvckV4dGVuc2lvbihjb25maWd1cmF0aW9ucykge1xuICAgIGlmICghaXNDaHJvbWUoKSkge1xuICAgICAgICByZWRpcmVjdFRvRXJyb3IoJy9pc25vdENocm9tZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB0YWdzID0gY29uZmlndXJhdGlvbnM7XG4gICAgICAgIC8vIGlmIHRhZ3MuYW1vdW50IGlzIG51bGwgb3IgdW5kZWZpbmVkLCB3ZSBzaG91bGQgYXNzdW1lIHRoYXQgdGhpcyBpcyBhIGZyZWUgcGFnZSBhbmQgZG8gbm90aGluZyBtb3JlXG4gICAgICAgIGlmICh0YWdzLmFtb3VudCA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IEVYVEVOU0lPTl9JRCA9IHRhZ3MuZXh0ZW5zaW9uaWQ7XG5cbiAgICAgICAgZGV0ZWN0KEVYVEVOU0lPTl9JRCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmVkaXJlY3RUb0Vycm9yKHRhZ3MuZXJyb3IpO1xuICAgICAgICB9LCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkZXRlY3Q6IHVzZXIgaGFzIGV4dGVuc2lvbiBpbnN0YWxsZWQnKTtcbiAgICAgICAgICAgIHJlY29yZFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhjaHJvbWUucnVudGltZS5jb25uZWN0KEVYVEVOU0lPTl9JRCwndmVyc2lvbicpKTtcbiAgICAgICAgLypjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShFWFRFTlNJT05fSUQsICd2ZXJzaW9uJywgcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmVkaXJlY3RUb0Vycm9yKHRhZ3MuZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWNvcmRSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKi9cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRldGVjdChleHRlbnNpb25JZCwgbm90SW5zdGFsbGVkQ2FsbGJhY2ssIGluc3RhbGxlZENhbGxiYWNrKSB7XG4gICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGNvbnNvbGUubG9nKGV4dGVuc2lvbklkKTtcbiAgICBpbWcub25lcnJvciA9IG5vdEluc3RhbGxlZENhbGxiYWNrO1xuICAgIGltZy5vbmxvYWQgPSBpbnN0YWxsZWRDYWxsYmFjaztcbiAgICBpbWcuc3JjID0gJ2Nocm9tZS1leHRlbnNpb246Ly8nICsgZXh0ZW5zaW9uSWQgKyAnL2ljb25zL2ljb24xNi5wbmcnO1xufVxuXG5mdW5jdGlvbiByZWNvcmRSZXNwb25zZShyZXMpIHtcbiAgICBpZiAodHlwZW9mIHJlcyAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5Jyk7XG4gICAgICAgIGJvZHkuaW5uZXJIVE1MICs9ICc8ZGl2IHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6NSU7b3BhY2l0eTowLjM7ei1pbmRleDoxMDA7YmFja2dyb3VuZDp5ZWxsb3c7XCI+JyArIHJlcyArICc8L2Rpdj4nO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiByZWRpcmVjdFRvRXJyb3IoZXJyKSB7XG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSAhPSBlcnIpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uod2luZG93Lm9yaWdpbiArIGVycik7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0Nocm9tZSgpIHtcbiAgICByZXR1cm4gJ2Nocm9tZScgaW4gd2luZG93XG59XG5cbi8qKlxuIE1ldGhvZCB0aGF0IGhhbmRsZXMgYWxsIEFQSSBjYWxsc1xuICovXG5mdW5jdGlvbiBhcGlIYW5kbGVyKGNvbmZpZ3VyYXRpb24sIGFwaSwgcGFyYW1zLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBpZiAoIWFwaSkgdGhyb3cgRXJyb3IoJ0FQSSBtZXRob2QgcmVxdWlyZWQnKTtcbiAgICBhcGkgPSBhcGkudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoc3VwcG9ydGVkQVBJLmluZGV4T2YoYXBpKSA9PT0gLTEpIHRocm93IEVycm9yKGBNZXRob2QgJHthcGl9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgICBjb25zb2xlLmxvZyhgSGFuZGxpbmcgQVBJIGNhbGwgJHthcGl9YCwgcGFyYW1zKTtcblxuICAgIC8vcmV0dXJuIGFwaSsnKCcrcGFyYW1zKycpJztcblxuICAgIHN3aXRjaCAoYXBpKSB7XG4gICAgICAgIC8vIFRPRE86IGFkZCBBUEkgaW1wbGVtZW50YXRpb25cblxuICAgICAgICBjYXNlICdjcmVhdGVoZWRlcmFvYmplY3QnOlxuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUhlZGVyYU9iamVjdChwYXJhbXMpO1xuXG4gICAgICAgIGNhc2UgJ2NoZWNrdHJhbnNhY3Rpb24nOlxuICAgICAgICAgICAgcmV0dXJuIGNoZWNrVHJhbnNhY3Rpb24oe2NvbmZpZ3VyYXRpb24sIHBhcmFtc30sIGNhbGxiYWNrKTtcblxuICAgICAgICBjYXNlICdjcmVhdGVjb250cmFjdG9iamVjdCc6XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlQ29udHJhY3RPYmplY3Qoe2NvbmZpZ3VyYXRpb24sIHBhcmFtc30sIGNhbGxiYWNrKTtcblxuICAgICAgICBjYXNlICdpbml0JzpcbiAgICAgICAgICAgIHJldHVybiBpbml0KGNvbmZpZ3VyYXRpb24sIGNhbGxiYWNrKTtcblxuICAgICAgICBjYXNlICdnZXRtb2RhbCc6XG4gICAgICAgICAgICByZXR1cm4gZ2V0bW9kYWwoKTtcblxuICAgICAgICBjYXNlICd0ZXN0JzpcbiAgICAgICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYE5vIGhhbmRsZXIgZGVmaW5lZCBmb3IgJHthcGl9YCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBleHRlbmRPYmplY3QoYSwgYikge1xuICAgIGZvciAodmFyIGtleSBpbiBiKVxuICAgICAgICBpZiAoYi5oYXNPd25Qcm9wZXJ0eShrZXkpKSBhW2tleV0gPSBiW2tleV07XG4gICAgcmV0dXJuIGE7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUhlZGVyYU9iamVjdChwYXJhbXMpIHtcbiAgICBsZXQgb2JqZWN0ID0gWydzdWJtaXNzaW9ubm9kZScsICdwYXltZW50c2VydmVyJywgJ3JlY2lwaWVudGxpc3QnLCAnY29udGVudGlkJywgJ3R5cGUnLCAnbWVtbycsICdleHRlbnNpb25pZCcsICdyZWRpcmVjdCcsICd0aW1lJ107XG4gICAgbGV0IEhlZGVyYW9iamVjdCA9ICc8aGVkZXJhLW1pY3JvcGF5bWVudCAnO1xuICAgIGZvciAodmFyIGkgaW4gb2JqZWN0KSB7XG4gICAgICAgIGxldCBub2RlID0gb2JqZWN0W2ldO1xuICAgICAgICBpZiAocGFyYW1zLmhhc093blByb3BlcnR5KG5vZGUpKSB7XG4gICAgICAgICAgICBIZWRlcmFvYmplY3QgKz0gXCJkYXRhLVwiICsgbm9kZSArIFwiPSAnXCIgKyBwYXJhbXNbbm9kZV0gKyBcIicgLCBcIiArIFwiXFxuXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgSGVkZXJhb2JqZWN0ICs9ICc+PC9oZWRlcmEtbWljcm9wYXltZW50Pic7XG4gICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJhbXNbJ2F0dHJJRCddKTtcbiAgICBib2R5LmlubmVySFRNTCArPSBIZWRlcmFvYmplY3Q7XG4gICAgcmV0dXJuIEhlZGVyYW9iamVjdDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29udHJhY3RPYmplY3QocGFyYW1zKSB7XG4gICAgbGV0IF9fY29uc3RydWN0ID0gWydjb250cmFjdGlkJywgJ21heGltdW0nLCAncGF5bWVudHNlcnZlcicsICdwYXJhbXMnLCAnbWVtbycsICdhYmknLCAncmVkaXJlY3QnLCAnZXh0ZW5zaW9uaWQnXTtcbiAgICBsZXQgb2JqZWN0ID0ge1xuICAgICAgICBjb250cmFjdGlkOiAnMC4wLjExMTEnLFxuICAgICAgICBtYXhpbXVtOiAnNDIyMzQyMzQzJyxcbiAgICAgICAgcGF5bWVudHNlcnZlcjogcGFyYW1zLmNvbmZpZ3VyYXRpb24ucGF5bWVudHNlcnZlcixcbiAgICAgICAgcGFyYW1zOiBbXCI4NjlcIiwgXCIxMDAwMDAwMDBcIiwgXCIyMTZcIiwgXCIyNTNcIiwgXCIyN1wiLCBcIjB4MjI2YjA4OTc2YWQwZGQ5ODJhZWI2YjIxYTQ0ZjNlYWNhZTU3OTU2OWMzNGU3MTcyNWFmZjgwMWEyZmU2ODczOVwiLCBcIjB4MzMzZjk5MWZhM2E4NzA1NzVmODE5NTY5ZTlmNzJhNzcxZWE3OTAwNzhkNDQ4Y2M4Nzg5MTIwZWUxNGFiZjNjNVwiXSxcbiAgICAgICAgbWVtbzogJ2E0YTdjNDMyOWFhYjRiMWZhYzQ3NGZmNmY5M2Q4NThjJyxcbiAgICAgICAgYWJpOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBcImNvbnN0YW50XCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJpbnB1dHNcIjogW3tcIm5hbWVcIjogXCJwcm9wZXJ0eUlEXCIsIFwidHlwZVwiOiBcInVpbnQyNFwifSwge1wibmFtZVwiOiBcImFtb3VudFwiLCBcInR5cGVcIjogXCJ1aW50MjU2XCJ9LCB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwieFwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInVpbnQxNlwiXG4gICAgICAgICAgICB9LCB7XCJuYW1lXCI6IFwieVwiLCBcInR5cGVcIjogXCJ1aW50MTZcIn0sIHtcIm5hbWVcIjogXCJ2XCIsIFwidHlwZVwiOiBcInVpbnQ4XCJ9LCB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiclwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ5dGVzMzJcIlxuICAgICAgICAgICAgfSwge1wibmFtZVwiOiBcInNcIiwgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwifV0sXG4gICAgICAgICAgICBcIm5hbWVcIjogXCJidXlQcm9wZXJ0eVwiLFxuICAgICAgICAgICAgXCJvdXRwdXRzXCI6IFt7XCJuYW1lXCI6IFwiXCIsIFwidHlwZVwiOiBcInN0cmluZ1wifV0sXG4gICAgICAgICAgICBcInBheWFibGVcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwic3RhdGVNdXRhYmlsaXR5XCI6IFwicGF5YWJsZVwiLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgICAgICB9KSxcbiAgICAgICAgcmVkaXJlY3Q6ICd7XCJub25QYXlpbmdBY2NvdW50XCI6IFwiL2luc3VmZmljaWVudC1hbW91bnQvXCIsXCJub0FjY291bnRcIjogXCIvYWNjb3VudC1ub3QtcGFpcmVkXCIsXCJob21lUGFnZVwiOiBcIi9cIn0nLFxuICAgICAgICBleHRlbnNpb25pZDogJ3BkampwY29sZ21tY2lmaWpwZWprZW5wYmJpbWVkcGljJyxcbiAgICB9O1xuXG4gICAgY29uc29sZS5sb2coSlNPTi5wYXJzZShvYmplY3QuYWJpKSk7XG4gICAgbGV0IGV4dGVuZGVkID0gZXh0ZW5kT2JqZWN0KG9iamVjdCwgcGFyYW1zLnBhcmFtcyk7XG4gICAgY29uc29sZS5sb2coZXh0ZW5kZWQpO1xuICAgIGxldCBDb250cmFjdG9iamVjdCA9ICc8aGVkZXJhLWNvbnRyYWN0ICc7XG4gICAgZm9yICh2YXIgaSBpbiBfX2NvbnN0cnVjdCkge1xuICAgICAgICBsZXQgbm9kZSA9IF9fY29uc3RydWN0W2ldO1xuICAgICAgICBpZiAoZXh0ZW5kZWQuaGFzT3duUHJvcGVydHkobm9kZSkpIHtcbiAgICAgICAgICAgIENvbnRyYWN0b2JqZWN0ICs9IFwiZGF0YS1cIiArIG5vZGUgKyBcIj0gJ1wiICsgZXh0ZW5kZWRbbm9kZV0gKyBcIicgXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQ29udHJhY3RvYmplY3QgKz0gJz48L2hlZGVyYS1jb250cmFjdD4nO1xuICAgIGNvbnNvbGUubG9nKENvbnRyYWN0b2JqZWN0KTtcblxuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZXh0ZW5kZWRbJ2F0dHJJRCddKTtcbiAgICBib2R5LmlubmVySFRNTCArPSBDb250cmFjdG9iamVjdDtcbiAgICAvL2NvbnNvbGUubG9nKChIZWRlcmFvYmplY3QpKVxuICAgIHJldHVybiBDb250cmFjdG9iamVjdDtcbiAgICAvL2NhbGxiYWNrKEhlZGVyYW9iamVjdCk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrVHJhbnNhY3Rpb24ocGFyYW1zKSB7XG5cbiAgICBsZXQgbWVtb19pZCA9IHBhcmFtcy5jb25maWd1cmF0aW9uLm1lbW87XG4gICAgbGV0IHVybCA9IHByb2R1Y3Rpb24gPyBcImh0dHBzOi8vbXBzLmhhc2hpbmdzeXN0ZW1zLmNvbVwiIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6OTk5OSc7XG4gICAgbGV0IHN0cnVjdHVyZSA9IHtcbiAgICAgICAgYmFzZXVybDogdXJsLFxuICAgICAgICBtZW1vX2lkOiBtZW1vX2lkLFxuICAgICAgICByZWNlaXZlcl9pZDogJycsXG4gICAgICAgIHN1Y2Nlc3M6ICcvc3VjY2VzcycsXG4gICAgICAgIGZhaWx1cmU6ICcvcGF5bWVudC1mYWlsZWQnLFxuICAgICAgICB0aW1lb3V0OiAzMDAwLFxuICAgICAgICBsaW1pdDogMVxuICAgIH07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gcGFyYW1zLnBhcmFtcykge1xuICAgICAgICBpZiAocGFyYW1zLnBhcmFtcy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHBhcmFtcy5wYXJhbXNba2V5XSkge1xuICAgICAgICAgICAgc3RydWN0dXJlW2tleV0gPSBwYXJhbXMucGFyYW1zW2tleV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3RydWN0dXJlLnJlY2VpdmVyX2lkICYmIHN0cnVjdHVyZS5tZW1vX2lkKSB7XG4gICAgICAgIFVSTCA9IHN0cnVjdHVyZS5iYXNldXJsICsgXCIvY2hlY2svXCIgKyBzdHJ1Y3R1cmUucmVjZWl2ZXJfaWQgKyBcIi9cIiArIHN0cnVjdHVyZS5tZW1vX2lkXG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHN0cnVjdHVyZS50aW1lc3RhbXApXG4gICAgICAgICAgICBVUkwgPSBzdHJ1Y3R1cmUuYmFzZXVybCArIFwiL21lbW8vXCIgKyBzdHJ1Y3R1cmUubWVtb19pZCArICc/bGltaXQ9JyArIHN0cnVjdHVyZS5saW1pdCArICcmdGltZXN0YW1wPScgKyBzdHJ1Y3R1cmUudGltZXN0YW1wO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBVUkwgPSBzdHJ1Y3R1cmUuYmFzZXVybCArIFwiL21lbW8vXCIgKyBzdHJ1Y3R1cmUubWVtb19pZCArICc/bGltaXQ9JyArIHN0cnVjdHVyZS5saW1pdDtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhzdHJ1Y3R1cmUudGltZW91dCk7XG4gICAgLy9zZXRUaW1lb3V0KHBlcmZvcm1SZXF1ZXN0KHN0cnVjdHVyZSksIHN0cnVjdHVyZS50aW1lb3V0KVxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBwZXJmb3JtUmVxdWVzdChzdHJ1Y3R1cmUpO1xuICAgIH0sIHN0cnVjdHVyZS50aW1lb3V0KTtcbn1cblxudmFyIHBlcmZvcm1SZXF1ZXN0ID0gZnVuY3Rpb24gKHN0cnVjdHVyZSkge1xuICAgIGNvbnNvbGUubG9nKHN0cnVjdHVyZSlcbiAgICB2YXIgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gNCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgICAgIGxldCByZXNwb25zZSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLnJlc3BvbnNlLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZXNwb25zZVswXS5ub2RlcHJlY2hlY2sgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBzdHJ1Y3R1cmUuc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIC8qZWxzZSBpZihwcmVjaGVja2VyKHJlc3BvbnNlLnJlc3BvbnNlWzBdLm5vZGVwcmVjaGVjayk9PSdJTlNVRkZJQ0lFTlRfVFhfRkVFJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyAnaW5zdWZmaWNpZW50LWFtb3VudCcpOyovXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHByZWNoZWNrZXIocmVzcG9uc2UucmVzcG9uc2VbMF0ubm9kZXByZWNoZWNrKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAvL3dpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBzdHJ1Y3R1cmUuZmFpbHVyZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uod2luZG93Lm9yaWdpbiArIHN0cnVjdHVyZS5zdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAvL2NhbGxiYWNrKG51bGwsIHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL2NhbGxiYWNrKHtlcnJvcjogdHJ1ZSwgZGF0YTogdGhpcy5yZXNwb25zZX0sIG51bGwpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBzdHJ1Y3R1cmUuZmFpbHVyZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHhodHRwLm9wZW4oXCJHRVRcIiwgVVJMLCB0cnVlKTtcbiAgICB4aHR0cC5zZW5kKCk7XG59O1xuXG5mdW5jdGlvbiBpbml0KHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICBsZXQgcmVzcG9uc2UgPSB7XG4gICAgICAgIGlzY2hyb21lOiB0cnVlLFxuICAgICAgICBhY2NvdW50UGFpcmVkOiBmYWxzZSxcbiAgICAgICAgaXNtb2JpbGU6IG51bGwsXG4gICAgICAgIHZhbGlkQnJvd3NlcjogbnVsbCxcbiAgICAgICAgZXh0ZW5zaW9uSW5zdGFsbGVkOiBudWxsLFxuICAgICAgICBhY2Nlc3NUb0FjY291bnRzOiBudWxsLFxuICAgICAgICBhY2NvdW50SWQ6IG51bGwsXG4gICAgICAgIHN1Ym1pc3Npb25Ob2RlOiBwYXJhbXMuc3VibWlzc2lvbm5vZGUsXG4gICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICB0eG5fc3VjY2VzczogZmFsc2VcbiAgICB9O1xuICAgIGxldCBjaGVja0lzQ2hyb21lID0gaXNDaHJvbWUoKTtcbiAgICByZXNwb25zZS5pc2Nocm9tZSA9IGNoZWNrSXNDaHJvbWU7XG4gICAgbGV0IG1vYiA9IGRldGVjdG1vYigpO1xuICAgIHJlc3BvbnNlLmlzbW9iaWxlID0gbW9iO1xuICAgIGRldGVjdChwYXJhbXMuZXh0ZW5zaW9uaWQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVzcG9uc2UuZXh0ZW5zaW9uSW5zdGFsbGVkID0gZmFsc2U7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic3Vja2VkXCIpXG4gICAgICAgIHJlc3BvbnNlLmV4dGVuc2lvbkluc3RhbGxlZCA9IHRydWU7XG4gICAgICAgIGxldCBvYmplY3QgPSBjcmVhdGVIZWRlcmFPYmplY3QocGFyYW1zKTtcbiAgICAgICAgbGV0IHVybCA9IHByb2R1Y3Rpb24gPyBcImh0dHBzOi8vbXBzLmhhc2hpbmdzeXN0ZW1zLmNvbVwiIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6OTk5OSc7XG4gICAgICAgIFVSTCA9IHVybCArIFwiL21lbW8vXCIgKyBwYXJhbXMubWVtbztcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHhodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFqYXhyZXNwID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFqYXhyZXNwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhamF4cmVzcC5yZXNwb25zZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocHJlY2hlY2tlcihhamF4cmVzcC5yZXNwb25zZVswXS5ub2RlcHJlY2hlY2spKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5hY2NvdW50SWQgPSBhamF4cmVzcC5yZXNwb25zZVswXS5zZW5kZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuYWNjb3VudFBhaXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuYWNjZXNzVG9BY2NvdW50cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFqYXhyZXNwLnJlc3BvbnNlWzBdLm5vZGVwcmVjaGVjayA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS50eG5fc3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmVycm9yID0gcHJlY2hlY2tlcihhamF4cmVzcC5yZXNwb25zZVswXS5ub2RlcHJlY2hlY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmFjY291bnRQYWlyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmFjY2Vzc1RvQWNjb3VudHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4aHR0cC5vcGVuKFwiR0VUXCIsIFVSTCwgdHJ1ZSk7XG4gICAgICAgICAgICB4aHR0cC5zZW5kKCk7XG4gICAgICAgIH0sIDUwMDApO1xuICAgICAgICAvL2NhbGxiYWNrKG51bGwscmVzcG9uc2UpO1xuICAgIH0pO1xuXG59XG5cbmZ1bmN0aW9uIGRldGVjdG1vYigpIHtcbiAgICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC93ZWJPUy9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGhvbmUvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBhZC9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUG9kL2kpXG4gICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0JsYWNrQmVycnkvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvV2luZG93cyBQaG9uZS9pKVxuICAgICkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRtb2RhbCgpIHtcbiAgICB2YXIgbXlDb250ZW50ID0gJzxkaXYgY2xhc3M9XCJwb3B1cF9vdXRlcl93cmFwXCI+XFxuJyArXG4gICAgICAgICdcXHQgIFxcdDxkaXYgY2xhc3M9XCJwb3B1cF93cmFwXCI+XFxuJyArXG4gICAgICAgICdcXHQgIFxcdFxcdDxkaXYgY2xhc3M9XCJwb3B1cF9oZWFkZXJcIj5TZXR1cCBUYXNrIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBjbGFzcz1cInBvcHVwX2Nsb3NlXCI+eDwvYT48L2Rpdj5cXG4nICtcbiAgICAgICAgJ1xcbicgK1xuICAgICAgICAnXFx0ICBcXHRcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfaW5uZXJcIj5cXG4nICtcbiAgICAgICAgJ1xcdCAgXFx0XFx0XFx0PGRpdiBjbGFzcz1cInBvcHVwX2lubmVyX2xlZnRcIj5cXG4nICtcbiAgICAgICAgJ1xcbicgK1xuICAgICAgICAnXFx0ICBcXHRcXHRcXHRcXHQ8Zm9ybSBhY3Rpb249XCIvYWN0aW9uX3BhZ2UucGhwXCIgY2xhc3M9XCJwb3B1cF9mb3JtXCI+XFxuJyArXG4gICAgICAgICdcXHRcXHRcXHRcXHRcXHQgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBvbmNoYW5nZT0gXCJpbWdjaGFuZ2VGdW5jdGlvbigpXCIgaWQ9XCJpbWdfb25lXCIgY2xhc3M9XCJwb3B1cF9jaGtib3ggdG9nZ2xlX19pbnB1dFwiIG5hbWU9XCJpbWdfY2hrYm94XCIgdmFsdWU9XCJpbWdfb25lXCI+XFxuJyArXG4gICAgICAgICdcXHRcXHRcXHRcXHRcXHQgIDxsYWJlbCBmb3I9XCJpbWdfb25lXCI+Jm5ic3A7IEluc3RhbGwgSGVkZXJhIFdhbGxldDwvbGFiZWw+XFxuJyArXG4gICAgICAgICdcXHRcXHRcXHRcXHRcXHQgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBvbmNoYW5nZT0gXCJpbWdjaGFuZ2VGdW5jdGlvbigpXCIgaWQ9XCJpbWdfdHdvXCIgY2xhc3M9XCJwb3B1cF9jaGtib3ggdG9nZ2xlX19pbnB1dFwiIG5hbWU9XCJpbWdfY2hrYm94XCIgdmFsdWU9XCJpbWdfdHdvXCI+XFxuJyArXG4gICAgICAgICdcXHRcXHRcXHRcXHRcXHQgIDxsYWJlbCBmb3I9XCJpbWdfdHdvXCI+Jm5ic3A7IFwiUGFpciB5b3VyIEFjY291bnRcIjwvbGFiZWw+XFxuJyArXG4gICAgICAgICdcXG4nICtcbiAgICAgICAgJ1xcdFxcdFxcdFxcdFxcdCAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG9uY2hhbmdlPSBcImltZ2NoYW5nZUZ1bmN0aW9uKClcIiBpZD1cImltZ190aHJlZVwiIGNsYXNzPVwicG9wdXBfY2hrYm94IHRvZ2dsZV9faW5wdXRcIiBuYW1lPVwiaW1nX2Noa2JveFwiIHZhbHVlPVwiaW1nX3RocmVlXCI+XFxuJyArXG4gICAgICAgICdcXHRcXHRcXHRcXHRcXHQgIDxsYWJlbCBmb3I9XCJpbWdfdGhyZWVcIj4mbmJzcDsgXCJBbGxvdyBQYXltZW50IFJlcXVlc3RzXCI8L2xhYmVsPlxcbicgK1xuICAgICAgICAnXFxuJyArXG4gICAgICAgICdcXHRcXHRcXHRcXHRcXHQgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBvbmNoYW5nZT0gXCJpbWdjaGFuZ2VGdW5jdGlvbigpXCIgaWQ9XCJpbWdfZm91clwiIGNsYXNzPVwicG9wdXBfY2hrYm94IHRvZ2dsZV9faW5wdXRcIiBuYW1lPVwiaW1nX2Noa2JveFwiIHZhbHVlPVwiaW1nX2ZvdXJcIj5cXG4nICtcbiAgICAgICAgJ1xcdFxcdFxcdFxcdFxcdCAgPGxhYmVsIGZvcj1cImltZ19mb3VyXCI+Jm5ic3A7IFwiR2V0IHNvbWUgSEJBUlwiPC9sYWJlbD5cXG4nICtcbiAgICAgICAgJ1xcdFxcdFxcdFxcdFxcdDwvZm9ybT5cXG4nICtcbiAgICAgICAgJ1xcbicgK1xuICAgICAgICAnXFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cInBvcHVwX2xvZ29cIj5cXG4nICtcbiAgICAgICAgJ1xcdFxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJsb2dvX3R4dFwiPlBvd2VyZWQgYnk8L2Rpdj5cXG4nICtcbiAgICAgICAgJ1xcdFxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJsb2dvX2ljb25cIj48aW1nIHNyYz1cIi8vYXBpLmhhc2hpbmdzeXN0ZW1zLmNvbS9pbWcvcG9wdXBfbG9nby5wbmdcIj48L2Rpdj5cXG4nICtcbiAgICAgICAgJ1xcdFxcdFxcdFxcdFxcdDwvZGl2PlxcbicgK1xuICAgICAgICAnXFx0ICBcXHRcXHRcXHRcXHRcXG4nICtcbiAgICAgICAgJ1xcdCAgXFx0XFx0XFx0PC9kaXY+XFxuJyArXG4gICAgICAgICdcXHQgIFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJwb3B1cF9pbm5lcl9yaWdodFwiPlxcbicgK1xuICAgICAgICAnXFxuJyArXG4gICAgICAgICdcXHQgIFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJwb3B1cF9pbWdfc2VjXCI+XFxuJyArXG4gICAgICAgICdcXHQgIFxcdFxcdFxcdFxcdFxcdDxpbWcgY2xhc3M9XCJpbWdfb25lXCIgc3JjPVwiLy9hcGkuaGFzaGluZ3N5c3RlbXMuY29tL2ltZy9pbWdfb25lLnBuZ1wiPlxcbicgK1xuICAgICAgICAnXFx0ICBcXHRcXHRcXHRcXHRcXHQ8aW1nIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIiBjbGFzcz1cImltZ190d29cIiBzcmM9XCIvL2FwaS5oYXNoaW5nc3lzdGVtcy5jb20vaW1nL2ltZ190d28ucG5nXCI+XFxuJyArXG4gICAgICAgICdcXHQgIFxcdFxcdFxcdFxcdFxcdDxpbWcgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiIGNsYXNzPVwiaW1nX3RocmVlXCIgc3JjPVwiLy9hcGkuaGFzaGluZ3N5c3RlbXMuY29tL2ltZy9pbWdfdGhyZWUucG5nXCI+XFxuJyArXG4gICAgICAgICdcXHQgIFxcdFxcdFxcdFxcdFxcdDxpbWcgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiIGNsYXNzPVwiaW1nX2ZvdXJcIiBzcmM9XCIvL2FwaS5oYXNoaW5nc3lzdGVtcy5jb20vaW1nL2ltZ19mb3VyLnBuZ1wiPlxcbicgK1xuICAgICAgICAnXFx0ICBcXHRcXHRcXHRcXHQ8L2Rpdj5cXG4nICtcbiAgICAgICAgJ1xcdCAgXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cInR4dF93cmFwXCI+XFxuJyArXG4gICAgICAgICdcXHRcXHQgIFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJ0eHRfaGVhZGVyXCI+TGV0cyBnZXQgeW91IHN0YXJ0ZWQhPC9kaXY+XFxuJyArXG4gICAgICAgICdcXHRcXHQgIFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJ0eHRfY29udGVudFwiPkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LCBzZWQgZG8gZWl1c21vZCB0ZW1wb3IgaW5jaWRpZHVudCB1dCBsYWJvcmUgZXQgPC9kaXY+XFxuJyArXG4gICAgICAgICdcXHRcXHQgIFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJwb3B1cF9idG5cIj5cXG4nICtcbiAgICAgICAgJ1xcdFxcdCAgXFx0XFx0XFx0XFx0XFx0PGEgaHJlZj1cIlwiPklcXCdtIFJlYWR5PC9hPlxcbicgK1xuICAgICAgICAnXFx0XFx0ICBcXHRcXHRcXHRcXHQ8L2Rpdj5cXG4nICtcbiAgICAgICAgJ1xcdFxcdCAgXFx0XFx0XFx0PC9kaXY+XFxuJyArXG4gICAgICAgICdcXHQgIFxcdFxcdFxcdFxcdFxcbicgK1xuICAgICAgICAnXFx0ICBcXHRcXHRcXHQ8L2Rpdj5cXG4nICtcbiAgICAgICAgJ1xcdCAgXFx0XFx0PC9kaXY+XFxuJyArXG4gICAgICAgICdcXHQgIFxcdDwvZGl2Pic7XG5cbiAgICB2YXIgbXlNb2RhbCA9IG5ldyBNb2RhbCh7XG4gICAgICAgIGNvbnRlbnQ6IG15Q29udGVudFxuICAgIH0pO1xuICAgIG15TW9kYWwub3BlbigpO1xufVxuXG5cbmFwcCh3aW5kb3cpO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsImV4cG9ydCBmdW5jdGlvbiBwaW5nKCkge1xuICAgIHJldHVybiAncG9uZyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmVjaGVja2VyKG4pIHtcbiAgICBsZXQganNvbiA9IHswOiBcIk9LXCIsIDE6IFwiSU5WQUxJRF9UUkFOU0FDVElPTlwiLCAyOiBcIlBBWUVSX0FDQ09VTlRfTk9UX0ZPVU5EXCIsIDM6IFwiSU5WQUxJRF9OT0RFX0FDQ09VTlRcIiwgNDogXCJUUkFOU0FDVElPTl9FWFBJUkVEXCIsIDU6IFwiSU5WQUxJRF9UUkFOU0FDVElPTl9TVEFSVFwiLCA2OiBcIklOVkFMSURfVFJBTlNBQ1RJT05fRFVSQVRJT05cIiwgNzogXCJJTlZBTElEX1NJR05BVFVSRVwiLCA4OiBcIk1FTU9fVE9PX0xPTkdcIiwgOTogXCJJTlNVRkZJQ0lFTlRfVFhfRkVFXCIsIDEwOiBcIklOU1VGRklDSUVOVF9QQVlFUl9CQUxBTkNFXCIsIDExOiBcIkRVUExJQ0FURV9UUkFOU0FDVElPTlwiLCAxMjogXCJCVVNZXCIsIDEzOiBcIk5PVF9TVVBQT1JURURcIiwgMTQ6IFwiSU5WQUxJRF9GSUxFX0lEXCIsIDE1OiBcIklOVkFMSURfQUNDT1VOVF9JRFwiLCAxNjogXCJJTlZBTElEX0NPTlRSQUNUX0lEXCIsIDE3OiBcIklOVkFMSURfVFJBTlNBQ1RJT05fSURcIiwgMTg6IFwiUkVDRUlQVF9OT1RfRk9VTkRcIiwgMTk6IFwiUkVDT1JEX05PVF9GT1VORFwiLCAyMDogXCJJTlZBTElEX1NPTElESVRZX0lEXCIsIDIxOiBcIlVOS05PV05cIiwgMjI6IFwiU1VDQ0VTU1wiLCAyMzogXCJGQUlMX0lOVkFMSURcIiwgMjQ6IFwiRkFJTF9GRUVcIiwgMjU6IFwiRkFJTF9CQUxBTkNFXCIsIDI2OiBcIktFWV9SRVFVSVJFRFwiLCAyNzogXCJCQURfRU5DT0RJTkdcIiwgMjg6IFwiSU5TVUZGSUNJRU5UX0FDQ09VTlRfQkFMQU5DRVwiLCAyOTogXCJJTlZBTElEX1NPTElESVRZX0FERFJFU1NcIiwgMzA6IFwiSU5TVUZGSUNJRU5UX0dBU1wiLCAzMTogXCJDT05UUkFDVF9TSVpFX0xJTUlUX0VYQ0VFREVEXCIsIDMyOiBcIkxPQ0FMX0NBTExfTU9ESUZJQ0FUSU9OX0VYQ0VQVElPTlwiLCAzMzogXCJDT05UUkFDVF9SRVZFUlRfRVhFQ1VURURcIiwgMzQ6IFwiQ09OVFJBQ1RfRVhFQ1VUSU9OX0VYQ0VQVElPTlwiLCAzNTogXCJJTlZBTElEX1JFQ0VJVklOR19OT0RFX0FDQ09VTlRcIiwgMzY6IFwiTUlTU0lOR19RVUVSWV9IRUFERVJcIiwgMzc6IFwiQUNDT1VOVF9VUERBVEVfRkFJTEVEXCIsIDM4OiBcIklOVkFMSURfS0VZX0VOQ09ESU5HXCIsIDM5OiBcIk5VTExfU09MSURJVFlfQUREUkVTU1wiLCA0MDogXCJDT05UUkFDVF9VUERBVEVfRkFJTEVEXCIsIDQxOiBcIklOVkFMSURfUVVFUllfSEVBREVSXCIsIDQyOiBcIklOVkFMSURfRkVFX1NVQk1JVFRFRFwiLCA0MzogXCJJTlZBTElEX1BBWUVSX1NJR05BVFVSRVwiLCA0NDogXCJLRVlfTk9UX1BST1ZJREVEXCIsIDQ1OiBcIklOVkFMSURfRVhQSVJBVElPTl9USU1FXCIsIDQ2OiBcIk5PX1dBQ0xfS0VZXCIsIDQ3OiBcIkZJTEVfQ09OVEVOVF9FTVBUWVwiLCA0ODogXCJJTlZBTElEX0FDQ09VTlRfQU1PVU5UU1wiLCA0OTogXCJFTVBUWV9UUkFOU0FDVElPTl9CT0RZXCIsIDUwOiBcIklOVkFMSURfVFJBTlNBQ1RJT05fQk9EWVwiLCA1MTogXCJJTlZBTElEX1NJR05BVFVSRV9UWVBFX01JU01BVENISU5HX0tFWVwiLCA1MjogXCJJTlZBTElEX1NJR05BVFVSRV9DT1VOVF9NSVNNQVRDSElOR19LRVlcIiwgNTM6IFwiRU1QVFlfQ0xBSU1fQk9EWVwiLCA1NDogXCJFTVBUWV9DTEFJTV9IQVNIXCIsIDU1OiBcIkVNUFRZX0NMQUlNX0tFWVNcIiwgNTY6IFwiSU5WQUxJRF9DTEFJTV9IQVNIX1NJWkVcIiwgNTc6IFwiRU1QVFlfUVVFUllfQk9EWVwiLCA1ODogXCJFTVBUWV9DTEFJTV9RVUVSWVwiLCA1OTogXCJDTEFJTV9OT1RfRk9VTkRcIiwgNjA6IFwiQUNDT1VOVF9JRF9ET0VTX05PVF9FWElTVFwiLCA2MTogXCJDTEFJTV9BTFJFQURZX0VYSVNUU1wiLCA2MjogXCJJTlZBTElEX0ZJTEVfV0FDTFwiLCA2MzogXCJTRVJJQUxJWkFUSU9OX0ZBSUxFRFwiLCA2NDogXCJUUkFOU0FDVElPTl9PVkVSU0laRVwiLCA2NTogXCJUUkFOU0FDVElPTl9UT09fTUFOWV9MQVlFUlNcIiwgNjY6IFwiQ09OVFJBQ1RfREVMRVRFRFwiLCA2NzogXCJQTEFURk9STV9OT1RfQUNUSVZFXCIsIDY4OiBcIktFWV9QUkVGSVhfTUlTTUFUQ0hcIiwgNjk6IFwiUExBVEZPUk1fVFJBTlNBQ1RJT05fTk9UX0NSRUFURURcIiwgNzA6IFwiSU5WQUxJRF9SRU5FV0FMX1BFUklPRFwiLCA3MTogXCJJTlZBTElEX1BBWUVSX0FDQ09VTlRfSURcIiwgNzI6IFwiQUNDT1VOVF9ERUxFVEVEXCIsIDczOiBcIkZJTEVfREVMRVRFRFwiLCA3NDogXCJBQ0NPVU5UX1JFUEVBVEVEX0lOX0FDQ09VTlRfQU1PVU5UU1wiLCA3NTogXCJTRVRUSU5HX05FR0FUSVZFX0FDQ09VTlRfQkFMQU5DRVwiLCA3NjogXCJPQlRBSU5FUl9SRVFVSVJFRFwiLCA3NzogXCJPQlRBSU5FUl9TQU1FX0NPTlRSQUNUX0lEXCIsIDc4OiBcIk9CVEFJTkVSX0RPRVNfTk9UX0VYSVNUXCIsIDc5OiBcIk1PRElGWUlOR19JTU1VVEFCTEVfQ09OVFJBQ1RcIiwgODA6IFwiRklMRV9TWVNURU1fRVhDRVBUSU9OXCIsIDgxOiBcIkFVVE9SRU5FV19EVVJBVElPTl9OT1RfSU5fUkFOR0VcIiwgODI6IFwiRVJST1JfREVDT0RJTkdfQllURVNUUklOR1wiLCA4MzogXCJDT05UUkFDVF9GSUxFX0VNUFRZXCIsIDg0OiBcIkNPTlRSQUNUX0JZVEVDT0RFX0VNUFRZXCIsIDg1OiBcIklOVkFMSURfSU5JVElBTF9CQUxBTkNFXCIsIDg2OiBcIklOVkFMSURfUkVDRUlWRV9SRUNPUkRfVEhSRVNIT0xEXCIsIDg3OiBcIklOVkFMSURfU0VORF9SRUNPUkRfVEhSRVNIT0xEXCIsIDg4OiBcIkFDQ09VTlRfSVNfTk9UX0dFTkVTSVNfQUNDT1VOVFwifVxuICAgICByZXR1cm4ganNvbltuXTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy5qcyIsIi8vIERlZmluZSBvdXIgY29uc3RydWN0b3JcbmZ1bmN0aW9uIE1vZGFsKCkge1xuICAgIC8vIENyZWF0ZSBnbG9iYWwgZWxlbWVudCByZWZlcmVuY2VzXG4gICAgdGhpcy5jbG9zZUJ1dHRvbiA9IG51bGw7XG4gICAgdGhpcy5tb2RhbCA9IG51bGw7XG4gICAgdGhpcy5vdmVybGF5ID0gbnVsbDtcblxuICAgIC8vIERldGVybWluZSBwcm9wZXIgcHJlZml4XG4gICAgdGhpcy50cmFuc2l0aW9uRW5kID0gdHJhbnNpdGlvblNlbGVjdCgpO1xuXG4gICAgLy8gRGVmaW5lIG9wdGlvbiBkZWZhdWx0c1xuICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgYXV0b09wZW46IGZhbHNlLFxuICAgICAgICBjbGFzc05hbWU6ICdmYWRlLWFuZC1kcm9wJyxcbiAgICAgICAgY2xvc2VCdXR0b246IHRydWUsXG4gICAgICAgIGNvbnRlbnQ6IFwiXCIsXG4gICAgICAgIG1heFdpZHRoOiA2MDAsXG4gICAgICAgIG1pbldpZHRoOiAyODAsXG4gICAgICAgIG92ZXJsYXk6IGZhbHNlXG4gICAgfTtcblxuICAgIC8vIENyZWF0ZSBvcHRpb25zIGJ5IGV4dGVuZGluZyBkZWZhdWx0cyB3aXRoIHRoZSBwYXNzZWQgaW4gYXJ1Z21lbnRzXG4gICAgaWYgKGFyZ3VtZW50c1swXSAmJiB0eXBlb2YgYXJndW1lbnRzWzBdID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGV4dGVuZERlZmF1bHRzKGRlZmF1bHRzLCBhcmd1bWVudHNbMF0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b09wZW4gPT09IHRydWUpIHRoaXMub3BlbigpO1xuXG59XG5cbi8vIFB1YmxpYyBNZXRob2RzXG5Nb2RhbC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF8gPSB0aGlzO1xuICAgIHRoaXMubW9kYWwuY2xhc3NOYW1lID0gdGhpcy5tb2RhbC5jbGFzc05hbWUucmVwbGFjZShcIiBoYXNoLW9wZW5cIiwgXCJcIik7XG4gICAgdGhpcy5vdmVybGF5LmNsYXNzTmFtZSA9IHRoaXMub3ZlcmxheS5jbGFzc05hbWUucmVwbGFjZShcIiBoYXNoLW9wZW5cIiwgXCJcIik7XG4gICAgdGhpcy5tb2RhbC5hZGRFdmVudExpc3RlbmVyKHRoaXMudHJhbnNpdGlvbkVuZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICBfLm1vZGFsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoXy5tb2RhbCk7XG4gICAgfSk7XG4gICAgdGhpcy5vdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIodGhpcy50cmFuc2l0aW9uRW5kLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChfLm92ZXJsYXkucGFyZW50Tm9kZSkgXy5vdmVybGF5LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoXy5vdmVybGF5KTtcbiAgICB9KTtcbn07XG5cbk1vZGFsLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgIGJ1aWxkT3V0LmNhbGwodGhpcyk7XG4gICAgaW5pdGlhbGl6ZUV2ZW50cy5jYWxsKHRoaXMpO1xuICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMubW9kYWwpLmhlaWdodDtcbiAgICB0aGlzLm1vZGFsLmNsYXNzTmFtZSA9IHRoaXMubW9kYWwuY2xhc3NOYW1lICsgKHRoaXMubW9kYWwub2Zmc2V0SGVpZ2h0ID4gd2luZG93LmlubmVySGVpZ2h0ID8gXCIgaGFzaC1vcGVuIGhhc2gtYW5jaG9yZWRcIiA6IFwiIGhhc2gtb3BlblwiKTtcbiAgICAvL3RoaXMub3ZlcmxheS5jbGFzc05hbWUgPSB0aGlzLm92ZXJsYXkuY2xhc3NOYW1lICsgXCIgaGFzaC1vcGVuXCI7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX2Nsb3NlJykub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfb3V0ZXJfd3JhcCcpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9O1xufTtcblxuLy8gUHJpdmF0ZSBNZXRob2RzXG5mdW5jdGlvbiBidWlsZE91dCgpIHtcblxuICAgIHZhciBjb250ZW50LCBjb250ZW50SG9sZGVyLCBkb2NGcmFnO1xuXG4gICAgLypcbiAgICAgKiBJZiBjb250ZW50IGlzIGFuIEhUTUwgc3RyaW5nLCBhcHBlbmQgdGhlIEhUTUwgc3RyaW5nLlxuICAgICAqIElmIGNvbnRlbnQgaXMgYSBkb21Ob2RlLCBhcHBlbmQgaXRzIGNvbnRlbnQuXG4gICAgICovXG5cbiAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5jb250ZW50ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGNvbnRlbnQgPSB0aGlzLm9wdGlvbnMuY29udGVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb250ZW50ID0gdGhpcy5vcHRpb25zLmNvbnRlbnQuaW5uZXJIVE1MO1xuICAgIH1cblxuICAgIC8vIENyZWF0ZSBhIERvY3VtZW50RnJhZ21lbnQgdG8gYnVpbGQgd2l0aFxuICAgIGRvY0ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICAvLyBDcmVhdGUgbW9kYWwgZWxlbWVudFxuICAgIHRoaXMubW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMubW9kYWwuY2xhc3NOYW1lID0gXCJoYXNoLW1vZGFsIFwiICsgdGhpcy5vcHRpb25zLmNsYXNzTmFtZTtcbiAgICAvKnRoaXMubW9kYWwuc3R5bGUubWluV2lkdGggPSB0aGlzLm9wdGlvbnMubWluV2lkdGggKyBcInB4XCI7XG4gICAgdGhpcy5tb2RhbC5zdHlsZS5tYXhXaWR0aCA9IHRoaXMub3B0aW9ucy5tYXhXaWR0aCArIFwicHhcIjsqL1xuXG4gICAgLy8gSWYgY2xvc2VCdXR0b24gb3B0aW9uIGlzIHRydWUsIGFkZCBhIGNsb3NlIGJ1dHRvblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2VCdXR0b24gPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3B1cC1jbG9zZS1idG4nKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbG9zZUJ1dHRvbilcbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgY29udGVudCBhcmVhIGFuZCBhcHBlbmQgdG8gbW9kYWxcbiAgICBjb250ZW50SG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb250ZW50SG9sZGVyLmNsYXNzTmFtZSA9IFwiaGFzaC1jb250ZW50XCI7XG4gICAgY29udGVudEhvbGRlci5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgIHRoaXMubW9kYWwuYXBwZW5kQ2hpbGQoY29udGVudEhvbGRlcik7XG5cbiAgICAvLyBBcHBlbmQgbW9kYWwgdG8gRG9jdW1lbnRGcmFnbWVudFxuICAgIGRvY0ZyYWcuYXBwZW5kQ2hpbGQodGhpcy5tb2RhbCk7XG5cbiAgICAvLyBBcHBlbmQgRG9jdW1lbnRGcmFnbWVudCB0byBib2R5XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb2NGcmFnKTtcblxufVxuXG5pbWdjaGFuZ2VGdW5jdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2hib3hzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoXCJpbWdfY2hrYm94XCIpO1xuICAgIHZhciB2YXJfY2hlY2sgPSBcIlwiO1xuXG4gICAgdmFyIGltZ19hbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaW1nX2FsbFwiKTtcblxuICAgIGZvcih2YXIgaT0wO2k8Y2hib3hzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgaWYoY2hib3hzW2ldLmNoZWNrZWQpe1xuICAgICAgICAgICAgdmFyX2NoZWNrID0gdmFyX2NoZWNrLmNvbmNhdChjaGJveHNbaV0udmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYodmFyX2NoZWNrID09ICdpbWdfb25lJyl7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfdHdvJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX3RocmVlJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX2ZvdXInKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfb25lJykuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgaWYodmFyX2NoZWNrID09ICdpbWdfb25laW1nX3R3bycpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ19vbmUnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfdGhyZWUnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfZm91cicpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ190d28nKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBpZih2YXJfY2hlY2sgPT0gJ2ltZ19vbmVpbWdfdHdvaW1nX3RocmVlJyl7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfb25lJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX3R3bycpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ19mb3VyJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX3RocmVlJykuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgaWYodmFyX2NoZWNrID09ICdpbWdfb25laW1nX3R3b2ltZ190aHJlZWltZ19mb3VyJykge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX29uZScpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ190d28nKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfdGhyZWUnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfZm91cicpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gZXh0ZW5kRGVmYXVsdHMoc291cmNlLCBwcm9wZXJ0aWVzKSB7XG4gICAgdmFyIHByb3BlcnR5O1xuICAgIGZvciAocHJvcGVydHkgaW4gcHJvcGVydGllcykge1xuICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgIHNvdXJjZVtwcm9wZXJ0eV0gPSBwcm9wZXJ0aWVzW3Byb3BlcnR5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc291cmNlO1xufVxuXG5mdW5jdGlvbiBpbml0aWFsaXplRXZlbnRzKCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdFwiKVxuICAgIGNvbnNvbGUubG9nKHRoaXMuY2xvc2VCdXR0b24pXG4gICAgaWYgKHRoaXMuY2xvc2VCdXR0b24pIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJ0ZXN0XCIpO1xuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vdmVybGF5KSB7XG4gICAgICAgIHRoaXMub3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2UuYmluZCh0aGlzKSk7XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIHRyYW5zaXRpb25TZWxlY3QoKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBpZiAoZWwuc3R5bGUuV2Via2l0VHJhbnNpdGlvbikgcmV0dXJuIFwid2Via2l0VHJhbnNpdGlvbkVuZFwiO1xuICAgIGlmIChlbC5zdHlsZS5PVHJhbnNpdGlvbikgcmV0dXJuIFwib1RyYW5zaXRpb25FbmRcIjtcbiAgICByZXR1cm4gJ3RyYW5zaXRpb25lbmQnO1xufVxuXG4vL2V4cG9ydGluZyBtb2R1bGVcbm1vZHVsZS5leHBvcnRzLk1vZGFsID0gTW9kYWw7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kYWwuanMiXSwic291cmNlUm9vdCI6IiJ9