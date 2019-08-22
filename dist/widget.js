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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__methods__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__general__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modal__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__modal__);



 // enlist all methods supported by API (e.g. `mw('event', 'user-login');`)

var supportedAPI = __WEBPACK_IMPORTED_MODULE_1__methods__["a" /* methods */]();
/**
 * The main entry of the application
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
    submissionnode: "0.0.11",
    memo: Date.now(),
    recipientlist: '[{ "to": "0.0.99", "tinybars": "1666667" }]',
    contentid: '79',
    attrID: 'article-1',
    timestamp: timestamp,

    /*this might make a good default id for the content*/
    id: window.location.pathname
  };
  /* *
    * all methods that were called till now and stored in queue
    * needs to be called now
    * */

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
    });
    /**
     * @INFO : This was used in order to check if the extension was installed or not,
     * Now replace by
     * @detect()
     * */

    /*
    chrome.runtime.sendMessage(EXTENSION_ID, 'version', response => {
        console.log(response)
        return;
        if (!response) {
            redirectToError(tags.error);
        } else {
            recordResponse(response);
        }
    })
    */
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
 * Method that handles all API calls
 * @TODO : Can be implemented next way
 * */


function apiHandler(configuration, api, params) {
  var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  if (!api) throw Error('API method required');
  api = api.toLowerCase();
  console.log(supportedAPI);
  if (supportedAPI.indexOf(api) === -1) throw Error("Method ".concat(api, " is not supported"));
  console.log("Handling API call ".concat(api), params);

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

    case 'makeTransaction':
      return makeTransaction(configuration, callback);

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
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        var response = JSON.parse(this.response);
        console.log(response);
        console.log(response.response.length);

        if (response.response.length >= 1) {
          if (response.response[0].nodeprecheck === 0) window.location.replace(window.origin + structure.success);
          /**
           * @TODO : Need to check for returning appropriate values or redirection
           * else if(prechecker(response.response[0].nodeprecheck)=='INSUFFICIENT_TX_FEE')
           * window.location.replace(window.origin + 'insufficient-amount');
           * */
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
  response.validBrowser = isChrome();
  response.ismobile = detectmob();
  detect(params.extensionid, function () {
    response.extensionInstalled = false;
    callback(null, response);
  }, function () {
    response.extensionInstalled = true;
    createHederaObject(params);
    var url = production ? "https://mps.hashingsystems.com" : 'http://localhost:9999';
    URL = url + "/memo/" + params.memo;
    setTimeout(function () {
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
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
  var myContent = __WEBPACK_IMPORTED_MODULE_2__general__["a" /* getmodalContent */]();
  var myModal = new __WEBPACK_IMPORTED_MODULE_3__modal__["Modal"]({
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getmodalContent;
function getmodalContent() {
  return '<div class="popup_outer_wrap">\n' + '\t  \t<div class="popup_wrap">\n' + '\t  \t\t<div class="popup_header">Setup Task <a href="javascript:void(0)" class="popup_close">x</a></div>\n' + '\n' + '\t  \t\t<div class="popup_inner">\n' + '\t  \t\t\t<div class="popup_inner_left">\n' + '\n' + '\t  \t\t\t\t<form action="/action_page.php" class="popup_form">\n' + '\t\t\t\t\t  <input type="checkbox" onchange= "imgchangeFunction()" id="img_one" class="popup_chkbox toggle__input" name="img_chkbox" value="img_one">\n' + '\t\t\t\t\t  <label for="img_one">&nbsp; Install Hedera Wallet</label>\n' + '\t\t\t\t\t  <input type="checkbox" onchange= "imgchangeFunction()" id="img_two" class="popup_chkbox toggle__input" name="img_chkbox" value="img_two">\n' + '\t\t\t\t\t  <label for="img_two">&nbsp; "Pair your Account"</label>\n' + '\n' + '\t\t\t\t\t  <input type="checkbox" onchange= "imgchangeFunction()" id="img_three" class="popup_chkbox toggle__input" name="img_chkbox" value="img_three">\n' + '\t\t\t\t\t  <label for="img_three">&nbsp; "Allow Payment Requests"</label>\n' + '\n' + '\t\t\t\t\t  <input type="checkbox" onchange= "imgchangeFunction()" id="img_four" class="popup_chkbox toggle__input" name="img_chkbox" value="img_four">\n' + '\t\t\t\t\t  <label for="img_four">&nbsp; "Get some HBAR"</label>\n' + '\t\t\t\t\t</form>\n' + '\n' + '\t\t\t\t\t<div class="popup_logo">\n' + '\t\t\t\t\t\t<div class="logo_txt">Powered by</div>\n' + '\t\t\t\t\t\t<div class="logo_icon"><img src="//api.hashingsystems.com/img/popup_logo.png"></div>\n' + '\t\t\t\t\t</div>\n' + '\t  \t\t\t\t\n' + '\t  \t\t\t</div>\n' + '\t  \t\t\t<div class="popup_inner_right">\n' + '\n' + '\t  \t\t\t\t<div class="popup_img_sec">\n' + '\t  \t\t\t\t\t<img class="img_one" src="//api.hashingsystems.com/img/img_one.png">\n' + '\t  \t\t\t\t\t<img style="display: none;" class="img_two" src="//api.hashingsystems.com/img/img_two.png">\n' + '\t  \t\t\t\t\t<img style="display: none;" class="img_three" src="//api.hashingsystems.com/img/img_three.png">\n' + '\t  \t\t\t\t\t<img style="display: none;" class="img_four" src="//api.hashingsystems.com/img/img_four.png">\n' + '\t  \t\t\t\t</div>\n' + '\t  \t\t\t\t<div class="txt_wrap">\n' + '\t\t  \t\t\t\t<div class="txt_header">Lets get you started!</div>\n' + '\t\t  \t\t\t\t<div class="txt_content">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et </div>\n' + '\t\t  \t\t\t\t<div class="popup_btn">\n' + '\t\t  \t\t\t\t\t<a href="">I\'m Ready</a>\n' + '\t\t  \t\t\t\t</div>\n' + '\t\t  \t\t\t</div>\n' + '\t  \t\t\t\t\n' + '\t  \t\t\t</div>\n' + '\t  \t\t</div>\n' + '\t  \t</div>';
}

/***/ }),
/* 4 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGFjMTU5ODg2NWM0M2FmOGUxN2EiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9tZXRob2RzLmpzIiwid2VicGFjazovLy8uL3NyYy9nZW5lcmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2RhbC5qcyJdLCJuYW1lcyI6WyJzdXBwb3J0ZWRBUEkiLCJtZXRob2RzIiwicHJvZHVjdGlvbiIsImFwcCIsIndpbmRvdyIsImNvbnNvbGUiLCJsb2ciLCJ0b2RheSIsIkRhdGUiLCJkYXRlIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImdldERhdGUiLCJ0aW1lIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZGF0ZVRpbWUiLCJ0aW1lc3RhbXAiLCJnZXRUaW1lIiwiY29uZmlndXJhdGlvbnMiLCJwYXltZW50c2VydmVyIiwiZXh0ZW5zaW9uaWQiLCJlcnJvciIsInR5cGUiLCJub3ciLCJyZWRpcmVjdCIsInN1Ym1pc3Npb25ub2RlIiwibWVtbyIsInJlY2lwaWVudGxpc3QiLCJjb250ZW50aWQiLCJhdHRySUQiLCJpZCIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJnbG9iYWxPYmplY3QiLCJxdWV1ZSIsInEiLCJpIiwibGVuZ3RoIiwidG9Mb3dlckNhc2UiLCJleHRlbmRPYmplY3QiLCJjcmVhdGVIZWRlcmFPYmplY3QiLCJjaGVja0ZvckV4dGVuc2lvbiIsImFwaUhhbmRsZXIiLCJjYWxsYmFjayIsImlzQ2hyb21lIiwicmVkaXJlY3RUb0Vycm9yIiwidGFncyIsImFtb3VudCIsIkVYVEVOU0lPTl9JRCIsImRldGVjdCIsInJlc3BvbnNlIiwicmVjb3JkUmVzcG9uc2UiLCJleHRlbnNpb25JZCIsIm5vdEluc3RhbGxlZENhbGxiYWNrIiwiaW5zdGFsbGVkQ2FsbGJhY2siLCJpbWciLCJJbWFnZSIsIm9uZXJyb3IiLCJvbmxvYWQiLCJzcmMiLCJyZXMiLCJib2R5IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImlubmVySFRNTCIsImVyciIsInJlcGxhY2UiLCJvcmlnaW4iLCJjb25maWd1cmF0aW9uIiwiYXBpIiwicGFyYW1zIiwiRXJyb3IiLCJpbmRleE9mIiwiY2hlY2tUcmFuc2FjdGlvbiIsImNyZWF0ZUNvbnRyYWN0T2JqZWN0IiwiaW5pdCIsImdldG1vZGFsIiwibWFrZVRyYW5zYWN0aW9uIiwid2FybiIsImEiLCJiIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJvYmplY3QiLCJIZWRlcmFvYmplY3QiLCJub2RlIiwiZ2V0RWxlbWVudEJ5SWQiLCJfX2NvbnN0cnVjdCIsImNvbnRyYWN0aWQiLCJtYXhpbXVtIiwiYWJpIiwiSlNPTiIsInN0cmluZ2lmeSIsInBhcnNlIiwiZXh0ZW5kZWQiLCJDb250cmFjdG9iamVjdCIsIm1lbW9faWQiLCJ1cmwiLCJzdHJ1Y3R1cmUiLCJiYXNldXJsIiwicmVjZWl2ZXJfaWQiLCJzdWNjZXNzIiwiZmFpbHVyZSIsInRpbWVvdXQiLCJsaW1pdCIsIlVSTCIsInNldFRpbWVvdXQiLCJwZXJmb3JtUmVxdWVzdCIsInhodHRwIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwibm9kZXByZWNoZWNrIiwicHJlY2hlY2tlciIsIm9wZW4iLCJzZW5kIiwiYWNjb3VudFBhaXJlZCIsImlzbW9iaWxlIiwidmFsaWRCcm93c2VyIiwiZXh0ZW5zaW9uSW5zdGFsbGVkIiwiYWNjZXNzVG9BY2NvdW50cyIsImFjY291bnRJZCIsInN1Ym1pc3Npb25Ob2RlIiwidHhuX3N1Y2Nlc3MiLCJkZXRlY3Rtb2IiLCJhamF4cmVzcCIsInNlbmRlciIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIm1hdGNoIiwibXlDb250ZW50IiwiZ2VuZXJhbCIsIm15TW9kYWwiLCJNb2RhbCIsImNvbnRlbnQiLCJ0cmFuc2FjdGlvbl9wcm9jZXNpbmciLCJ0cmFuc2FjdGlvbl9mYWlsZWQiLCJ0cmFuc2FjdGlvbl9zdWNjZXNzIiwicGluZyIsIm4iLCJqc29uIiwiZ2V0bW9kYWxDb250ZW50IiwiY2xvc2VCdXR0b24iLCJtb2RhbCIsIm92ZXJsYXkiLCJ0cmFuc2l0aW9uRW5kIiwidHJhbnNpdGlvblNlbGVjdCIsImRlZmF1bHRzIiwiYXV0b09wZW4iLCJjbGFzc05hbWUiLCJtYXhXaWR0aCIsIm1pbldpZHRoIiwiYXJndW1lbnRzIiwib3B0aW9ucyIsImV4dGVuZERlZmF1bHRzIiwicHJvdG90eXBlIiwiY2xvc2UiLCJfIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImJ1aWxkT3V0IiwiY2FsbCIsImluaXRpYWxpemVFdmVudHMiLCJnZXRDb21wdXRlZFN0eWxlIiwiaGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJxdWVyeVNlbGVjdG9yIiwib25jbGljayIsInN0eWxlIiwiZGlzcGxheSIsImNvbnRlbnRIb2xkZXIiLCJkb2NGcmFnIiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImltZ2NoYW5nZUZ1bmN0aW9uIiwiY2hib3hzIiwiZ2V0RWxlbWVudHNCeU5hbWUiLCJ2YXJfY2hlY2siLCJpbWdfYWxsIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImNoZWNrZWQiLCJjb25jYXQiLCJ2YWx1ZSIsInNvdXJjZSIsInByb3BlcnRpZXMiLCJwcm9wZXJ0eSIsImJpbmQiLCJlbCIsIldlYmtpdFRyYW5zaXRpb24iLCJPVHJhbnNpdGlvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFF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QUFzQjtBQUNsQjNJLFdBQU8sQ0FBQ0MsR0FBUixDQUFZLE1BQVo7QUFDQSxTQUFLMEksV0FBTCxDQUFpQmdCLGdCQUFqQixDQUFrQyxPQUFsQyxFQUEyQyxLQUFLRixLQUFMLENBQVdpQyxJQUFYLENBQWdCLElBQWhCLENBQTNDO0FBQ0g7O0FBRUQsTUFBSSxLQUFLN0MsT0FBVCxFQUFrQjtBQUNkLFNBQUtBLE9BQUwsQ0FBYWMsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUMsS0FBS0YsS0FBTCxDQUFXaUMsSUFBWCxDQUFnQixJQUFoQixDQUF2QztBQUNIO0FBRUo7O0FBRUQsU0FBUzNDLGdCQUFULEdBQTRCO0FBQ3hCLE1BQUk0QyxFQUFFLEdBQUdqSSxRQUFRLENBQUNrSCxhQUFULENBQXVCLEtBQXZCLENBQVQ7QUFDQSxNQUFJZSxFQUFFLENBQUNwQixLQUFILENBQVNxQixnQkFBYixFQUErQixPQUFPLHFCQUFQO0FBQy9CLE1BQUlELEVBQUUsQ0FBQ3BCLEtBQUgsQ0FBU3NCLFdBQWIsRUFBMEIsT0FBTyxnQkFBUDtBQUMxQixTQUFPLGVBQVA7QUFDSCxDLENBRUQ7OztBQUNBQyxNQUFNLENBQUNDLE9BQVAsQ0FBZTdELEtBQWYsR0FBdUJBLEtBQXZCLEMiLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMGFjMTU5ODg2NWM0M2FmOGUxN2EiLCJpbXBvcnQge3BpbmcsIHByZWNoZWNrZXJ9IGZyb20gJy4vc2VydmljZXMnO1xuaW1wb3J0ICogYXMgbWV0aG9kcyBmcm9tICcuL21ldGhvZHMnO1xuaW1wb3J0ICogYXMgZ2VuZXJhbCBmcm9tICcuL2dlbmVyYWwnO1xuaW1wb3J0IHtNb2RhbH0gZnJvbSAnLi9tb2RhbCc7XG5cbi8vIGVubGlzdCBhbGwgbWV0aG9kcyBzdXBwb3J0ZWQgYnkgQVBJIChlLmcuIGBtdygnZXZlbnQnLCAndXNlci1sb2dpbicpO2ApXG5jb25zdCBzdXBwb3J0ZWRBUEkgPSBtZXRob2RzLm1ldGhvZHMoKTtcbi8qKlxuICogVGhlIG1haW4gZW50cnkgb2YgdGhlIGFwcGxpY2F0aW9uXG4gKi9cbmNvbnN0IHByb2R1Y3Rpb24gPSB0cnVlO1xuXG5mdW5jdGlvbiBhcHAod2luZG93KSB7XG4gICAgY29uc29sZS5sb2coJ0hBU0gtSlMgc3RhcnRpbmcnKTtcbiAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpLFxuICAgICAgICBkYXRlID0gdG9kYXkuZ2V0RnVsbFllYXIoKSArICctJyArICh0b2RheS5nZXRNb250aCgpICsgMSkgKyAnLScgKyB0b2RheS5nZXREYXRlKCksXG4gICAgICAgIHRpbWUgPSB0b2RheS5nZXRIb3VycygpICsgXCI6XCIgKyB0b2RheS5nZXRNaW51dGVzKCksXG4gICAgICAgIGRhdGVUaW1lID0gZGF0ZSArICcgJyArIHRpbWUsXG4gICAgICAgIHRpbWVzdGFtcCA9IG5ldyBEYXRlKGRhdGVUaW1lKS5nZXRUaW1lKCk7XG5cbiAgICBsZXQgY29uZmlndXJhdGlvbnMgPSB7XG4gICAgICAgIHBheW1lbnRzZXJ2ZXI6IHByb2R1Y3Rpb24gPyBcImh0dHBzOi8vbXBzLmhhc2hpbmdzeXN0ZW1zLmNvbVwiIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6OTk5OScsXG4gICAgICAgIGV4dGVuc2lvbmlkOiBcImxpZ3Bhb25kYWFiY2xmaWdhZ2NpZm9iYWVsZW1pZW5hXCIsXG4gICAgICAgIGVycm9yOiBcIi9uby1leHRlbnNpb25cIixcbiAgICAgICAgdHlwZTogXCJhcnRpY2xlXCIsXG4gICAgICAgIHRpbWU6IERhdGUubm93KCksXG4gICAgICAgIHJlZGlyZWN0OiAneyBcIm5vblBheWluZ0FjY291bnRcIjogXCIvaW5zdWZmaWNpZW50LWFtb3VudC9cIiwgXCJub0FjY291bnRcIjogXCIvYWNjb3VudC1ub3QtcGFpcmVkL1wiLCBcImhvbWVQYWdlXCI6IFwiL1wifScsXG4gICAgICAgIHN1Ym1pc3Npb25ub2RlOiBcIjAuMC4xMVwiLFxuICAgICAgICBtZW1vOiBEYXRlLm5vdygpLFxuICAgICAgICByZWNpcGllbnRsaXN0OiAnW3sgXCJ0b1wiOiBcIjAuMC45OVwiLCBcInRpbnliYXJzXCI6IFwiMTY2NjY2N1wiIH1dJyxcbiAgICAgICAgY29udGVudGlkOiAnNzknLFxuICAgICAgICBhdHRySUQ6ICdhcnRpY2xlLTEnLFxuICAgICAgICB0aW1lc3RhbXA6IHRpbWVzdGFtcCxcbiAgICAgICAgLyp0aGlzIG1pZ2h0IG1ha2UgYSBnb29kIGRlZmF1bHQgaWQgZm9yIHRoZSBjb250ZW50Ki9cbiAgICAgICAgaWQ6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSxcbiAgICB9O1xuXG4gICAgLyogKlxuICAgICAgKiBhbGwgbWV0aG9kcyB0aGF0IHdlcmUgY2FsbGVkIHRpbGwgbm93IGFuZCBzdG9yZWQgaW4gcXVldWVcbiAgICAgICogbmVlZHMgdG8gYmUgY2FsbGVkIG5vd1xuICAgICAgKiAqL1xuICAgIGxldCBnbG9iYWxPYmplY3QgPSB3aW5kb3dbd2luZG93WydIQVNILUpTJ11dO1xuICAgIGxldCBxdWV1ZSA9IGdsb2JhbE9iamVjdC5xO1xuICAgIGlmIChxdWV1ZSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHF1ZXVlW2ldWzBdICE9PSAndW5kZWZpbmVkJyAmJiBxdWV1ZVtpXVswXS50b0xvd2VyQ2FzZSgpID09ICdtYWtlcGF5bWVudCcpIHtcbiAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9ucyA9IGV4dGVuZE9iamVjdChjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMV0pO1xuICAgICAgICAgICAgICAgIGNyZWF0ZUhlZGVyYU9iamVjdChjb25maWd1cmF0aW9ucyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0hBU0gtSlMgc3RhcnRlZCcsIGNvbmZpZ3VyYXRpb25zKTtcbiAgICAgICAgICAgICAgICBjaGVja0ZvckV4dGVuc2lvbihjb25maWd1cmF0aW9ucylcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHF1ZXVlW2ldWzBdICE9PSAndW5kZWZpbmVkJyAmJiBxdWV1ZVtpXVswXS50b0xvd2VyQ2FzZSgpID09ICdjcmVhdGVjb250cmFjdG9iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9ucyA9IGV4dGVuZE9iamVjdChjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMV0pO1xuICAgICAgICAgICAgICAgIGFwaUhhbmRsZXIoY29uZmlndXJhdGlvbnMsIHF1ZXVlW2ldWzBdLCBxdWV1ZVtpXVsxXSwgcXVldWVbaV1bMl0pO1xuICAgICAgICAgICAgICAgIGNoZWNrRm9yRXh0ZW5zaW9uKGNvbmZpZ3VyYXRpb25zKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgY2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBxdWV1ZVtpXVsxXSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gcXVldWVbaV1bMV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBxdWV1ZVtpXVtxdWV1ZVswXS5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbnMgPSBleHRlbmRPYmplY3QoY29uZmlndXJhdGlvbnMsIHF1ZXVlW2ldWzFdKTtcbiAgICAgICAgICAgICAgICBhcGlIYW5kbGVyKGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVswXSwgcXVldWVbaV1bMV0sIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBvdmVycmlkZSB0ZW1wb3JhcnkgKHVudGlsIHRoZSBhcHAgbG9hZGVkKSBoYW5kbGVyXG4gICAgLy8gZm9yIHdpZGdldCdzIEFQSSBjYWxsc1xuICAgIGdsb2JhbE9iamVjdCA9IGFwaUhhbmRsZXI7XG4gICAgZ2xvYmFsT2JqZWN0LmNvbmZpZ3VyYXRpb25zID0gY29uZmlndXJhdGlvbnM7XG59XG5cbmZ1bmN0aW9uIGNoZWNrRm9yRXh0ZW5zaW9uKGNvbmZpZ3VyYXRpb25zKSB7XG4gICAgaWYgKCFpc0Nocm9tZSgpKSB7XG4gICAgICAgIHJlZGlyZWN0VG9FcnJvcignL2lzbm90Q2hyb21lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHRhZ3MgPSBjb25maWd1cmF0aW9ucztcbiAgICAgICAgLy8gaWYgdGFncy5hbW91bnQgaXMgbnVsbCBvciB1bmRlZmluZWQsIHdlIHNob3VsZCBhc3N1bWUgdGhhdCB0aGlzIGlzIGEgZnJlZSBwYWdlIGFuZCBkbyBub3RoaW5nIG1vcmVcbiAgICAgICAgaWYgKHRhZ3MuYW1vdW50ID09PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3QgRVhURU5TSU9OX0lEID0gdGFncy5leHRlbnNpb25pZDtcblxuICAgICAgICBkZXRlY3QoRVhURU5TSU9OX0lELCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZWRpcmVjdFRvRXJyb3IodGFncy5lcnJvcik7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2RldGVjdDogdXNlciBoYXMgZXh0ZW5zaW9uIGluc3RhbGxlZCcpO1xuICAgICAgICAgICAgcmVjb3JkUmVzcG9uc2UocmVzcG9uc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQElORk8gOiBUaGlzIHdhcyB1c2VkIGluIG9yZGVyIHRvIGNoZWNrIGlmIHRoZSBleHRlbnNpb24gd2FzIGluc3RhbGxlZCBvciBub3QsXG4gICAgICAgICAqIE5vdyByZXBsYWNlIGJ5XG4gICAgICAgICAqIEBkZXRlY3QoKVxuICAgICAgICAgKiAqL1xuICAgICAgICAvKlxuICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShFWFRFTlNJT05fSUQsICd2ZXJzaW9uJywgcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmVkaXJlY3RUb0Vycm9yKHRhZ3MuZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWNvcmRSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICovXG5cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRldGVjdChleHRlbnNpb25JZCwgbm90SW5zdGFsbGVkQ2FsbGJhY2ssIGluc3RhbGxlZENhbGxiYWNrKSB7XG4gICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGNvbnNvbGUubG9nKGV4dGVuc2lvbklkKTtcbiAgICBpbWcub25lcnJvciA9IG5vdEluc3RhbGxlZENhbGxiYWNrO1xuICAgIGltZy5vbmxvYWQgPSBpbnN0YWxsZWRDYWxsYmFjaztcbiAgICBpbWcuc3JjID0gJ2Nocm9tZS1leHRlbnNpb246Ly8nICsgZXh0ZW5zaW9uSWQgKyAnL2ljb25zL2ljb24xNi5wbmcnO1xufVxuXG5mdW5jdGlvbiByZWNvcmRSZXNwb25zZShyZXMpIHtcbiAgICBpZiAodHlwZW9mIHJlcyAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5Jyk7XG4gICAgICAgIGJvZHkuaW5uZXJIVE1MICs9ICc8ZGl2IHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6NSU7b3BhY2l0eTowLjM7ei1pbmRleDoxMDA7YmFja2dyb3VuZDp5ZWxsb3c7XCI+JyArIHJlcyArICc8L2Rpdj4nO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiByZWRpcmVjdFRvRXJyb3IoZXJyKSB7XG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSAhPSBlcnIpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uod2luZG93Lm9yaWdpbiArIGVycik7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0Nocm9tZSgpIHtcbiAgICByZXR1cm4gJ2Nocm9tZScgaW4gd2luZG93XG59XG5cbi8qKlxuICogTWV0aG9kIHRoYXQgaGFuZGxlcyBhbGwgQVBJIGNhbGxzXG4gKiBAVE9ETyA6IENhbiBiZSBpbXBsZW1lbnRlZCBuZXh0IHdheVxuICogKi9cbmZ1bmN0aW9uIGFwaUhhbmRsZXIoY29uZmlndXJhdGlvbiwgYXBpLCBwYXJhbXMsIGNhbGxiYWNrID0gbnVsbCkge1xuICAgIGlmICghYXBpKSB0aHJvdyBFcnJvcignQVBJIG1ldGhvZCByZXF1aXJlZCcpO1xuICAgIGFwaSA9IGFwaS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnNvbGUubG9nKHN1cHBvcnRlZEFQSSlcbiAgICBpZiAoc3VwcG9ydGVkQVBJLmluZGV4T2YoYXBpKSA9PT0gLTEpIHRocm93IEVycm9yKGBNZXRob2QgJHthcGl9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgICBjb25zb2xlLmxvZyhgSGFuZGxpbmcgQVBJIGNhbGwgJHthcGl9YCwgcGFyYW1zKTtcblxuICAgIHN3aXRjaCAoYXBpKSB7XG4gICAgICAgIC8vIFRPRE86IGFkZCBBUEkgaW1wbGVtZW50YXRpb25cbiAgICAgICAgY2FzZSAnY3JlYXRlaGVkZXJhb2JqZWN0JzpcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVIZWRlcmFPYmplY3QocGFyYW1zKTtcbiAgICAgICAgY2FzZSAnY2hlY2t0cmFuc2FjdGlvbic6XG4gICAgICAgICAgICByZXR1cm4gY2hlY2tUcmFuc2FjdGlvbih7Y29uZmlndXJhdGlvbiwgcGFyYW1zfSwgY2FsbGJhY2spO1xuICAgICAgICBjYXNlICdjcmVhdGVjb250cmFjdG9iamVjdCc6XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlQ29udHJhY3RPYmplY3Qoe2NvbmZpZ3VyYXRpb24sIHBhcmFtc30sIGNhbGxiYWNrKTtcbiAgICAgICAgY2FzZSAnaW5pdCc6XG4gICAgICAgICAgICByZXR1cm4gaW5pdChjb25maWd1cmF0aW9uLCBjYWxsYmFjayk7XG4gICAgICAgIGNhc2UgJ2dldG1vZGFsJzpcbiAgICAgICAgICAgIHJldHVybiBnZXRtb2RhbCgpO1xuICAgICAgICBjYXNlICdtYWtlVHJhbnNhY3Rpb24nOlxuICAgICAgICAgICAgcmV0dXJuIG1ha2VUcmFuc2FjdGlvbihjb25maWd1cmF0aW9uLCBjYWxsYmFjayk7XG4gICAgICAgIGNhc2UgJ3Rlc3QnOlxuICAgICAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgTm8gaGFuZGxlciBkZWZpbmVkIGZvciAke2FwaX1gKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGV4dGVuZE9iamVjdChhLCBiKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGIpXG4gICAgICAgIGlmIChiLmhhc093blByb3BlcnR5KGtleSkpIGFba2V5XSA9IGJba2V5XTtcbiAgICByZXR1cm4gYTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSGVkZXJhT2JqZWN0KHBhcmFtcykge1xuICAgIGxldCBvYmplY3QgPSBbJ3N1Ym1pc3Npb25ub2RlJywgJ3BheW1lbnRzZXJ2ZXInLCAncmVjaXBpZW50bGlzdCcsICdjb250ZW50aWQnLCAndHlwZScsICdtZW1vJywgJ2V4dGVuc2lvbmlkJywgJ3JlZGlyZWN0JywgJ3RpbWUnXTtcbiAgICBsZXQgSGVkZXJhb2JqZWN0ID0gJzxoZWRlcmEtbWljcm9wYXltZW50ICc7XG4gICAgZm9yICh2YXIgaSBpbiBvYmplY3QpIHtcbiAgICAgICAgbGV0IG5vZGUgPSBvYmplY3RbaV07XG4gICAgICAgIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkobm9kZSkpIHtcbiAgICAgICAgICAgIEhlZGVyYW9iamVjdCArPSBcImRhdGEtXCIgKyBub2RlICsgXCI9ICdcIiArIHBhcmFtc1tub2RlXSArIFwiJyAsIFwiICsgXCJcXG5cIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBIZWRlcmFvYmplY3QgKz0gJz48L2hlZGVyYS1taWNyb3BheW1lbnQ+JztcbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmFtc1snYXR0cklEJ10pO1xuICAgIGJvZHkuaW5uZXJIVE1MICs9IEhlZGVyYW9iamVjdDtcbiAgICByZXR1cm4gSGVkZXJhb2JqZWN0O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb250cmFjdE9iamVjdChwYXJhbXMpIHtcbiAgICBsZXQgX19jb25zdHJ1Y3QgPSBbJ2NvbnRyYWN0aWQnLCAnbWF4aW11bScsICdwYXltZW50c2VydmVyJywgJ3BhcmFtcycsICdtZW1vJywgJ2FiaScsICdyZWRpcmVjdCcsICdleHRlbnNpb25pZCddO1xuICAgIGxldCBvYmplY3QgPSB7XG4gICAgICAgIGNvbnRyYWN0aWQ6ICcwLjAuMTExMScsXG4gICAgICAgIG1heGltdW06ICc0MjIzNDIzNDMnLFxuICAgICAgICBwYXltZW50c2VydmVyOiBwYXJhbXMuY29uZmlndXJhdGlvbi5wYXltZW50c2VydmVyLFxuICAgICAgICBwYXJhbXM6IFtcIjg2OVwiLCBcIjEwMDAwMDAwMFwiLCBcIjIxNlwiLCBcIjI1M1wiLCBcIjI3XCIsIFwiMHgyMjZiMDg5NzZhZDBkZDk4MmFlYjZiMjFhNDRmM2VhY2FlNTc5NTY5YzM0ZTcxNzI1YWZmODAxYTJmZTY4NzM5XCIsIFwiMHgzMzNmOTkxZmEzYTg3MDU3NWY4MTk1NjllOWY3MmE3NzFlYTc5MDA3OGQ0NDhjYzg3ODkxMjBlZTE0YWJmM2M1XCJdLFxuICAgICAgICBtZW1vOiAnYTRhN2M0MzI5YWFiNGIxZmFjNDc0ZmY2ZjkzZDg1OGMnLFxuICAgICAgICBhYmk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIFwiY29uc3RhbnRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImlucHV0c1wiOiBbe1wibmFtZVwiOiBcInByb3BlcnR5SURcIiwgXCJ0eXBlXCI6IFwidWludDI0XCJ9LCB7XCJuYW1lXCI6IFwiYW1vdW50XCIsIFwidHlwZVwiOiBcInVpbnQyNTZcIn0sIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJ4XCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidWludDE2XCJcbiAgICAgICAgICAgIH0sIHtcIm5hbWVcIjogXCJ5XCIsIFwidHlwZVwiOiBcInVpbnQxNlwifSwge1wibmFtZVwiOiBcInZcIiwgXCJ0eXBlXCI6IFwidWludDhcIn0sIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJyXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwiXG4gICAgICAgICAgICB9LCB7XCJuYW1lXCI6IFwic1wiLCBcInR5cGVcIjogXCJieXRlczMyXCJ9XSxcbiAgICAgICAgICAgIFwibmFtZVwiOiBcImJ1eVByb3BlcnR5XCIsXG4gICAgICAgICAgICBcIm91dHB1dHNcIjogW3tcIm5hbWVcIjogXCJcIiwgXCJ0eXBlXCI6IFwic3RyaW5nXCJ9XSxcbiAgICAgICAgICAgIFwicGF5YWJsZVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJzdGF0ZU11dGFiaWxpdHlcIjogXCJwYXlhYmxlXCIsXG4gICAgICAgICAgICBcInR5cGVcIjogXCJmdW5jdGlvblwiXG4gICAgICAgIH0pLFxuICAgICAgICByZWRpcmVjdDogJ3tcIm5vblBheWluZ0FjY291bnRcIjogXCIvaW5zdWZmaWNpZW50LWFtb3VudC9cIixcIm5vQWNjb3VudFwiOiBcIi9hY2NvdW50LW5vdC1wYWlyZWRcIixcImhvbWVQYWdlXCI6IFwiL1wifScsXG4gICAgICAgIGV4dGVuc2lvbmlkOiAncGRqanBjb2xnbW1jaWZpanBlamtlbnBiYmltZWRwaWMnLFxuICAgIH07XG5cbiAgICBjb25zb2xlLmxvZyhKU09OLnBhcnNlKG9iamVjdC5hYmkpKTtcbiAgICBsZXQgZXh0ZW5kZWQgPSBleHRlbmRPYmplY3Qob2JqZWN0LCBwYXJhbXMucGFyYW1zKTtcbiAgICBjb25zb2xlLmxvZyhleHRlbmRlZCk7XG4gICAgbGV0IENvbnRyYWN0b2JqZWN0ID0gJzxoZWRlcmEtY29udHJhY3QgJztcbiAgICBmb3IgKHZhciBpIGluIF9fY29uc3RydWN0KSB7XG4gICAgICAgIGxldCBub2RlID0gX19jb25zdHJ1Y3RbaV07XG4gICAgICAgIGlmIChleHRlbmRlZC5oYXNPd25Qcm9wZXJ0eShub2RlKSkge1xuICAgICAgICAgICAgQ29udHJhY3RvYmplY3QgKz0gXCJkYXRhLVwiICsgbm9kZSArIFwiPSAnXCIgKyBleHRlbmRlZFtub2RlXSArIFwiJyBcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBDb250cmFjdG9iamVjdCArPSAnPjwvaGVkZXJhLWNvbnRyYWN0Pic7XG4gICAgY29uc29sZS5sb2coQ29udHJhY3RvYmplY3QpO1xuXG4gICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChleHRlbmRlZFsnYXR0cklEJ10pO1xuICAgIGJvZHkuaW5uZXJIVE1MICs9IENvbnRyYWN0b2JqZWN0O1xuICAgIC8vY29uc29sZS5sb2coKEhlZGVyYW9iamVjdCkpXG4gICAgcmV0dXJuIENvbnRyYWN0b2JqZWN0O1xuICAgIC8vY2FsbGJhY2soSGVkZXJhb2JqZWN0KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tUcmFuc2FjdGlvbihwYXJhbXMpIHtcbiAgICBsZXQgbWVtb19pZCA9IHBhcmFtcy5jb25maWd1cmF0aW9uLm1lbW87XG4gICAgbGV0IHVybCA9IHByb2R1Y3Rpb24gPyBcImh0dHBzOi8vbXBzLmhhc2hpbmdzeXN0ZW1zLmNvbVwiIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6OTk5OSc7XG4gICAgbGV0IHN0cnVjdHVyZSA9IHtcbiAgICAgICAgYmFzZXVybDogdXJsLFxuICAgICAgICBtZW1vX2lkOiBtZW1vX2lkLFxuICAgICAgICByZWNlaXZlcl9pZDogJycsXG4gICAgICAgIHN1Y2Nlc3M6ICcvc3VjY2VzcycsXG4gICAgICAgIGZhaWx1cmU6ICcvcGF5bWVudC1mYWlsZWQnLFxuICAgICAgICB0aW1lb3V0OiAzMDAwLFxuICAgICAgICBsaW1pdDogMVxuICAgIH07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gcGFyYW1zLnBhcmFtcykge1xuICAgICAgICBpZiAocGFyYW1zLnBhcmFtcy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHBhcmFtcy5wYXJhbXNba2V5XSkge1xuICAgICAgICAgICAgc3RydWN0dXJlW2tleV0gPSBwYXJhbXMucGFyYW1zW2tleV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3RydWN0dXJlLnJlY2VpdmVyX2lkICYmIHN0cnVjdHVyZS5tZW1vX2lkKSB7XG4gICAgICAgIFVSTCA9IHN0cnVjdHVyZS5iYXNldXJsICsgXCIvY2hlY2svXCIgKyBzdHJ1Y3R1cmUucmVjZWl2ZXJfaWQgKyBcIi9cIiArIHN0cnVjdHVyZS5tZW1vX2lkXG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHN0cnVjdHVyZS50aW1lc3RhbXApXG4gICAgICAgICAgICBVUkwgPSBzdHJ1Y3R1cmUuYmFzZXVybCArIFwiL21lbW8vXCIgKyBzdHJ1Y3R1cmUubWVtb19pZCArICc/bGltaXQ9JyArIHN0cnVjdHVyZS5saW1pdCArICcmdGltZXN0YW1wPScgKyBzdHJ1Y3R1cmUudGltZXN0YW1wO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBVUkwgPSBzdHJ1Y3R1cmUuYmFzZXVybCArIFwiL21lbW8vXCIgKyBzdHJ1Y3R1cmUubWVtb19pZCArICc/bGltaXQ9JyArIHN0cnVjdHVyZS5saW1pdDtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhzdHJ1Y3R1cmUudGltZW91dCk7XG4gICAgLy9zZXRUaW1lb3V0KHBlcmZvcm1SZXF1ZXN0KHN0cnVjdHVyZSksIHN0cnVjdHVyZS50aW1lb3V0KVxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBwZXJmb3JtUmVxdWVzdChzdHJ1Y3R1cmUpO1xuICAgIH0sIHN0cnVjdHVyZS50aW1lb3V0KTtcbn1cblxudmFyIHBlcmZvcm1SZXF1ZXN0ID0gZnVuY3Rpb24gKHN0cnVjdHVyZSkge1xuICAgIHZhciB4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5yZXNwb25zZS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZXNwb25zZS5sZW5ndGggPj0gMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UucmVzcG9uc2VbMF0ubm9kZXByZWNoZWNrID09PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uod2luZG93Lm9yaWdpbiArIHN0cnVjdHVyZS5zdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIEBUT0RPIDogTmVlZCB0byBjaGVjayBmb3IgcmV0dXJuaW5nIGFwcHJvcHJpYXRlIHZhbHVlcyBvciByZWRpcmVjdGlvblxuICAgICAgICAgICAgICAgICAgICAgKiBlbHNlIGlmKHByZWNoZWNrZXIocmVzcG9uc2UucmVzcG9uc2VbMF0ubm9kZXByZWNoZWNrKT09J0lOU1VGRklDSUVOVF9UWF9GRUUnKVxuICAgICAgICAgICAgICAgICAgICAgKiB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cub3JpZ2luICsgJ2luc3VmZmljaWVudC1hbW91bnQnKTtcbiAgICAgICAgICAgICAgICAgICAgICogKi9cbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocHJlY2hlY2tlcihyZXNwb25zZS5yZXNwb25zZVswXS5ub2RlcHJlY2hlY2spKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uod2luZG93Lm9yaWdpbiArIHN0cnVjdHVyZS5mYWlsdXJlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy93aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cub3JpZ2luICsgc3RydWN0dXJlLnN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgIC8vY2FsbGJhY2sobnVsbCwgdGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vY2FsbGJhY2soe2Vycm9yOiB0cnVlLCBkYXRhOiB0aGlzLnJlc3BvbnNlfSwgbnVsbCk7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uod2luZG93Lm9yaWdpbiArIHN0cnVjdHVyZS5mYWlsdXJlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgeGh0dHAub3BlbihcIkdFVFwiLCBVUkwsIHRydWUpO1xuICAgIHhodHRwLnNlbmQoKTtcbn07XG5cbmZ1bmN0aW9uIGluaXQocGFyYW1zLCBjYWxsYmFjaykge1xuICAgIGxldCByZXNwb25zZSA9IHtcbiAgICAgICAgYWNjb3VudFBhaXJlZDogZmFsc2UsXG4gICAgICAgIGlzbW9iaWxlOiBudWxsLFxuICAgICAgICB2YWxpZEJyb3dzZXI6IG51bGwsXG4gICAgICAgIGV4dGVuc2lvbkluc3RhbGxlZDogbnVsbCxcbiAgICAgICAgYWNjZXNzVG9BY2NvdW50czogbnVsbCxcbiAgICAgICAgYWNjb3VudElkOiBudWxsLFxuICAgICAgICBzdWJtaXNzaW9uTm9kZTogcGFyYW1zLnN1Ym1pc3Npb25ub2RlLFxuICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgdHhuX3N1Y2Nlc3M6IGZhbHNlXG4gICAgfTtcbiAgICByZXNwb25zZS52YWxpZEJyb3dzZXIgPSBpc0Nocm9tZSgpO1xuICAgIHJlc3BvbnNlLmlzbW9iaWxlID0gZGV0ZWN0bW9iKCk7XG4gICAgZGV0ZWN0KHBhcmFtcy5leHRlbnNpb25pZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXNwb25zZS5leHRlbnNpb25JbnN0YWxsZWQgPSBmYWxzZTtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UpO1xuICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVzcG9uc2UuZXh0ZW5zaW9uSW5zdGFsbGVkID0gdHJ1ZTtcbiAgICAgICAgY3JlYXRlSGVkZXJhT2JqZWN0KHBhcmFtcyk7XG4gICAgICAgIGxldCB1cmwgPSBwcm9kdWN0aW9uID8gXCJodHRwczovL21wcy5oYXNoaW5nc3lzdGVtcy5jb21cIiA6ICdodHRwOi8vbG9jYWxob3N0Ojk5OTknO1xuICAgICAgICBVUkwgPSB1cmwgKyBcIi9tZW1vL1wiICsgcGFyYW1zLm1lbW87XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFqYXhyZXNwID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFqYXhyZXNwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhamF4cmVzcC5yZXNwb25zZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocHJlY2hlY2tlcihhamF4cmVzcC5yZXNwb25zZVswXS5ub2RlcHJlY2hlY2spKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5hY2NvdW50SWQgPSBhamF4cmVzcC5yZXNwb25zZVswXS5zZW5kZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuYWNjb3VudFBhaXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuYWNjZXNzVG9BY2NvdW50cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFqYXhyZXNwLnJlc3BvbnNlWzBdLm5vZGVwcmVjaGVjayA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS50eG5fc3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmVycm9yID0gcHJlY2hlY2tlcihhamF4cmVzcC5yZXNwb25zZVswXS5ub2RlcHJlY2hlY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmFjY291bnRQYWlyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmFjY2Vzc1RvQWNjb3VudHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4aHR0cC5vcGVuKFwiR0VUXCIsIFVSTCwgdHJ1ZSk7XG4gICAgICAgICAgICB4aHR0cC5zZW5kKCk7XG4gICAgICAgIH0sIDUwMDApO1xuICAgICAgICAvL2NhbGxiYWNrKG51bGwscmVzcG9uc2UpO1xuICAgIH0pO1xuXG59XG5cbmZ1bmN0aW9uIGRldGVjdG1vYigpIHtcbiAgICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC93ZWJPUy9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGhvbmUvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBhZC9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUG9kL2kpXG4gICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0JsYWNrQmVycnkvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvV2luZG93cyBQaG9uZS9pKVxuICAgICkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRtb2RhbCgpIHtcbiAgICB2YXIgbXlDb250ZW50ID0gZ2VuZXJhbC5nZXRtb2RhbENvbnRlbnQoKTtcbiAgICB2YXIgbXlNb2RhbCA9IG5ldyBNb2RhbCh7XG4gICAgICAgIGNvbnRlbnQ6IG15Q29udGVudFxuICAgIH0pO1xuICAgIG15TW9kYWwub3BlbigpO1xufVxuXG5mdW5jdGlvbiBtYWtlVHJhbnNhY3Rpb24oY29uZmlndXJhdGlvbiwgY2FsbGJhY2spIHtcbiAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgICB0cmFuc2FjdGlvbl9wcm9jZXNpbmc6IHRydWUsXG4gICAgICAgIHRyYW5zYWN0aW9uX2ZhaWxlZDogZmFsc2UsXG4gICAgICAgIHRyYW5zYWN0aW9uX3N1Y2Nlc3M6IGZhbHNlXG4gICAgfTtcbiAgICBpbml0KGNvbmZpZ3VyYXRpb24sIGZ1bmN0aW9uKGVyciwgcmVzKXtcbiAgICAgICAgaWYoZXJyKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgIGlmKHJlcyl7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG59XG5cblxuYXBwKHdpbmRvdyk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWluLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIHBpbmcoKSB7XG4gICAgcmV0dXJuICdwb25nJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByZWNoZWNrZXIobikge1xuICAgIGxldCBqc29uID0gezA6IFwiT0tcIiwgMTogXCJJTlZBTElEX1RSQU5TQUNUSU9OXCIsIDI6IFwiUEFZRVJfQUNDT1VOVF9OT1RfRk9VTkRcIiwgMzogXCJJTlZBTElEX05PREVfQUNDT1VOVFwiLCA0OiBcIlRSQU5TQUNUSU9OX0VYUElSRURcIiwgNTogXCJJTlZBTElEX1RSQU5TQUNUSU9OX1NUQVJUXCIsIDY6IFwiSU5WQUxJRF9UUkFOU0FDVElPTl9EVVJBVElPTlwiLCA3OiBcIklOVkFMSURfU0lHTkFUVVJFXCIsIDg6IFwiTUVNT19UT09fTE9OR1wiLCA5OiBcIklOU1VGRklDSUVOVF9UWF9GRUVcIiwgMTA6IFwiSU5TVUZGSUNJRU5UX1BBWUVSX0JBTEFOQ0VcIiwgMTE6IFwiRFVQTElDQVRFX1RSQU5TQUNUSU9OXCIsIDEyOiBcIkJVU1lcIiwgMTM6IFwiTk9UX1NVUFBPUlRFRFwiLCAxNDogXCJJTlZBTElEX0ZJTEVfSURcIiwgMTU6IFwiSU5WQUxJRF9BQ0NPVU5UX0lEXCIsIDE2OiBcIklOVkFMSURfQ09OVFJBQ1RfSURcIiwgMTc6IFwiSU5WQUxJRF9UUkFOU0FDVElPTl9JRFwiLCAxODogXCJSRUNFSVBUX05PVF9GT1VORFwiLCAxOTogXCJSRUNPUkRfTk9UX0ZPVU5EXCIsIDIwOiBcIklOVkFMSURfU09MSURJVFlfSURcIiwgMjE6IFwiVU5LTk9XTlwiLCAyMjogXCJTVUNDRVNTXCIsIDIzOiBcIkZBSUxfSU5WQUxJRFwiLCAyNDogXCJGQUlMX0ZFRVwiLCAyNTogXCJGQUlMX0JBTEFOQ0VcIiwgMjY6IFwiS0VZX1JFUVVJUkVEXCIsIDI3OiBcIkJBRF9FTkNPRElOR1wiLCAyODogXCJJTlNVRkZJQ0lFTlRfQUNDT1VOVF9CQUxBTkNFXCIsIDI5OiBcIklOVkFMSURfU09MSURJVFlfQUREUkVTU1wiLCAzMDogXCJJTlNVRkZJQ0lFTlRfR0FTXCIsIDMxOiBcIkNPTlRSQUNUX1NJWkVfTElNSVRfRVhDRUVERURcIiwgMzI6IFwiTE9DQUxfQ0FMTF9NT0RJRklDQVRJT05fRVhDRVBUSU9OXCIsIDMzOiBcIkNPTlRSQUNUX1JFVkVSVF9FWEVDVVRFRFwiLCAzNDogXCJDT05UUkFDVF9FWEVDVVRJT05fRVhDRVBUSU9OXCIsIDM1OiBcIklOVkFMSURfUkVDRUlWSU5HX05PREVfQUNDT1VOVFwiLCAzNjogXCJNSVNTSU5HX1FVRVJZX0hFQURFUlwiLCAzNzogXCJBQ0NPVU5UX1VQREFURV9GQUlMRURcIiwgMzg6IFwiSU5WQUxJRF9LRVlfRU5DT0RJTkdcIiwgMzk6IFwiTlVMTF9TT0xJRElUWV9BRERSRVNTXCIsIDQwOiBcIkNPTlRSQUNUX1VQREFURV9GQUlMRURcIiwgNDE6IFwiSU5WQUxJRF9RVUVSWV9IRUFERVJcIiwgNDI6IFwiSU5WQUxJRF9GRUVfU1VCTUlUVEVEXCIsIDQzOiBcIklOVkFMSURfUEFZRVJfU0lHTkFUVVJFXCIsIDQ0OiBcIktFWV9OT1RfUFJPVklERURcIiwgNDU6IFwiSU5WQUxJRF9FWFBJUkFUSU9OX1RJTUVcIiwgNDY6IFwiTk9fV0FDTF9LRVlcIiwgNDc6IFwiRklMRV9DT05URU5UX0VNUFRZXCIsIDQ4OiBcIklOVkFMSURfQUNDT1VOVF9BTU9VTlRTXCIsIDQ5OiBcIkVNUFRZX1RSQU5TQUNUSU9OX0JPRFlcIiwgNTA6IFwiSU5WQUxJRF9UUkFOU0FDVElPTl9CT0RZXCIsIDUxOiBcIklOVkFMSURfU0lHTkFUVVJFX1RZUEVfTUlTTUFUQ0hJTkdfS0VZXCIsIDUyOiBcIklOVkFMSURfU0lHTkFUVVJFX0NPVU5UX01JU01BVENISU5HX0tFWVwiLCA1MzogXCJFTVBUWV9DTEFJTV9CT0RZXCIsIDU0OiBcIkVNUFRZX0NMQUlNX0hBU0hcIiwgNTU6IFwiRU1QVFlfQ0xBSU1fS0VZU1wiLCA1NjogXCJJTlZBTElEX0NMQUlNX0hBU0hfU0laRVwiLCA1NzogXCJFTVBUWV9RVUVSWV9CT0RZXCIsIDU4OiBcIkVNUFRZX0NMQUlNX1FVRVJZXCIsIDU5OiBcIkNMQUlNX05PVF9GT1VORFwiLCA2MDogXCJBQ0NPVU5UX0lEX0RPRVNfTk9UX0VYSVNUXCIsIDYxOiBcIkNMQUlNX0FMUkVBRFlfRVhJU1RTXCIsIDYyOiBcIklOVkFMSURfRklMRV9XQUNMXCIsIDYzOiBcIlNFUklBTElaQVRJT05fRkFJTEVEXCIsIDY0OiBcIlRSQU5TQUNUSU9OX09WRVJTSVpFXCIsIDY1OiBcIlRSQU5TQUNUSU9OX1RPT19NQU5ZX0xBWUVSU1wiLCA2NjogXCJDT05UUkFDVF9ERUxFVEVEXCIsIDY3OiBcIlBMQVRGT1JNX05PVF9BQ1RJVkVcIiwgNjg6IFwiS0VZX1BSRUZJWF9NSVNNQVRDSFwiLCA2OTogXCJQTEFURk9STV9UUkFOU0FDVElPTl9OT1RfQ1JFQVRFRFwiLCA3MDogXCJJTlZBTElEX1JFTkVXQUxfUEVSSU9EXCIsIDcxOiBcIklOVkFMSURfUEFZRVJfQUNDT1VOVF9JRFwiLCA3MjogXCJBQ0NPVU5UX0RFTEVURURcIiwgNzM6IFwiRklMRV9ERUxFVEVEXCIsIDc0OiBcIkFDQ09VTlRfUkVQRUFURURfSU5fQUNDT1VOVF9BTU9VTlRTXCIsIDc1OiBcIlNFVFRJTkdfTkVHQVRJVkVfQUNDT1VOVF9CQUxBTkNFXCIsIDc2OiBcIk9CVEFJTkVSX1JFUVVJUkVEXCIsIDc3OiBcIk9CVEFJTkVSX1NBTUVfQ09OVFJBQ1RfSURcIiwgNzg6IFwiT0JUQUlORVJfRE9FU19OT1RfRVhJU1RcIiwgNzk6IFwiTU9ESUZZSU5HX0lNTVVUQUJMRV9DT05UUkFDVFwiLCA4MDogXCJGSUxFX1NZU1RFTV9FWENFUFRJT05cIiwgODE6IFwiQVVUT1JFTkVXX0RVUkFUSU9OX05PVF9JTl9SQU5HRVwiLCA4MjogXCJFUlJPUl9ERUNPRElOR19CWVRFU1RSSU5HXCIsIDgzOiBcIkNPTlRSQUNUX0ZJTEVfRU1QVFlcIiwgODQ6IFwiQ09OVFJBQ1RfQllURUNPREVfRU1QVFlcIiwgODU6IFwiSU5WQUxJRF9JTklUSUFMX0JBTEFOQ0VcIiwgODY6IFwiSU5WQUxJRF9SRUNFSVZFX1JFQ09SRF9USFJFU0hPTERcIiwgODc6IFwiSU5WQUxJRF9TRU5EX1JFQ09SRF9USFJFU0hPTERcIiwgODg6IFwiQUNDT1VOVF9JU19OT1RfR0VORVNJU19BQ0NPVU5UXCJ9XG4gICAgIHJldHVybiBqc29uW25dO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2VzLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIG1ldGhvZHMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgLy9vYmplY3QgY3JlYXRpb24gbWV0aG9kc1xuICAgICAgICAnY3JlYXRlaGVkZXJhb2JqZWN0JywgJ2NyZWF0ZWNvbnRyYWN0b2JqZWN0JyxcblxuICAgICAgICAvL21haW4gaW5pdGlhbCBtZXRob2RcbiAgICAgICAgJ2luaXQnLFxuXG4gICAgICAgIC8vdHJhbnNhY3Rpb24gcmVsYXRlZCBtZXRob2RzXG4gICAgICAgICdtYWtlcGF5bWVudCcsICdtYWtlVHJhbnNhY3Rpb24nLCAnY2hlY2t0cmFuc2FjdGlvbicsXG5cbiAgICAgICAgLy9tb2RhbCByZWxhdGVkIG1ldGhvZHNcbiAgICAgICAgJ2dldG1vZGFsJ1xuICAgIF07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWV0aG9kcy5qcyIsImV4cG9ydCBmdW5jdGlvbiBnZXRtb2RhbENvbnRlbnQoKSB7XG4gICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwicG9wdXBfb3V0ZXJfd3JhcFwiPlxcbicgK1xuICAgICdcXHQgIFxcdDxkaXYgY2xhc3M9XCJwb3B1cF93cmFwXCI+XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0PGRpdiBjbGFzcz1cInBvcHVwX2hlYWRlclwiPlNldHVwIFRhc2sgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwicG9wdXBfY2xvc2VcIj54PC9hPjwvZGl2PlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnXFx0ICBcXHRcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfaW5uZXJcIj5cXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfaW5uZXJfbGVmdFwiPlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHRcXHQ8Zm9ybSBhY3Rpb249XCIvYWN0aW9uX3BhZ2UucGhwXCIgY2xhc3M9XCJwb3B1cF9mb3JtXCI+XFxuJyArXG4gICAgJ1xcdFxcdFxcdFxcdFxcdCAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG9uY2hhbmdlPSBcImltZ2NoYW5nZUZ1bmN0aW9uKClcIiBpZD1cImltZ19vbmVcIiBjbGFzcz1cInBvcHVwX2Noa2JveCB0b2dnbGVfX2lucHV0XCIgbmFtZT1cImltZ19jaGtib3hcIiB2YWx1ZT1cImltZ19vbmVcIj5cXG4nICtcbiAgICAnXFx0XFx0XFx0XFx0XFx0ICA8bGFiZWwgZm9yPVwiaW1nX29uZVwiPiZuYnNwOyBJbnN0YWxsIEhlZGVyYSBXYWxsZXQ8L2xhYmVsPlxcbicgK1xuICAgICdcXHRcXHRcXHRcXHRcXHQgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBvbmNoYW5nZT0gXCJpbWdjaGFuZ2VGdW5jdGlvbigpXCIgaWQ9XCJpbWdfdHdvXCIgY2xhc3M9XCJwb3B1cF9jaGtib3ggdG9nZ2xlX19pbnB1dFwiIG5hbWU9XCJpbWdfY2hrYm94XCIgdmFsdWU9XCJpbWdfdHdvXCI+XFxuJyArXG4gICAgJ1xcdFxcdFxcdFxcdFxcdCAgPGxhYmVsIGZvcj1cImltZ190d29cIj4mbmJzcDsgXCJQYWlyIHlvdXIgQWNjb3VudFwiPC9sYWJlbD5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJ1xcdFxcdFxcdFxcdFxcdCAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG9uY2hhbmdlPSBcImltZ2NoYW5nZUZ1bmN0aW9uKClcIiBpZD1cImltZ190aHJlZVwiIGNsYXNzPVwicG9wdXBfY2hrYm94IHRvZ2dsZV9faW5wdXRcIiBuYW1lPVwiaW1nX2Noa2JveFwiIHZhbHVlPVwiaW1nX3RocmVlXCI+XFxuJyArXG4gICAgJ1xcdFxcdFxcdFxcdFxcdCAgPGxhYmVsIGZvcj1cImltZ190aHJlZVwiPiZuYnNwOyBcIkFsbG93IFBheW1lbnQgUmVxdWVzdHNcIjwvbGFiZWw+XFxuJyArXG4gICAgJ1xcbicgK1xuICAgICdcXHRcXHRcXHRcXHRcXHQgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBvbmNoYW5nZT0gXCJpbWdjaGFuZ2VGdW5jdGlvbigpXCIgaWQ9XCJpbWdfZm91clwiIGNsYXNzPVwicG9wdXBfY2hrYm94IHRvZ2dsZV9faW5wdXRcIiBuYW1lPVwiaW1nX2Noa2JveFwiIHZhbHVlPVwiaW1nX2ZvdXJcIj5cXG4nICtcbiAgICAnXFx0XFx0XFx0XFx0XFx0ICA8bGFiZWwgZm9yPVwiaW1nX2ZvdXJcIj4mbmJzcDsgXCJHZXQgc29tZSBIQkFSXCI8L2xhYmVsPlxcbicgK1xuICAgICdcXHRcXHRcXHRcXHRcXHQ8L2Zvcm0+XFxuJyArXG4gICAgJ1xcbicgK1xuICAgICdcXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfbG9nb1wiPlxcbicgK1xuICAgICdcXHRcXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwibG9nb190eHRcIj5Qb3dlcmVkIGJ5PC9kaXY+XFxuJyArXG4gICAgJ1xcdFxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJsb2dvX2ljb25cIj48aW1nIHNyYz1cIi8vYXBpLmhhc2hpbmdzeXN0ZW1zLmNvbS9pbWcvcG9wdXBfbG9nby5wbmdcIj48L2Rpdj5cXG4nICtcbiAgICAnXFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0XFx0XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0PC9kaXY+XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0PGRpdiBjbGFzcz1cInBvcHVwX2lubmVyX3JpZ2h0XCI+XFxuJyArXG4gICAgJ1xcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJwb3B1cF9pbWdfc2VjXCI+XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0XFx0XFx0PGltZyBjbGFzcz1cImltZ19vbmVcIiBzcmM9XCIvL2FwaS5oYXNoaW5nc3lzdGVtcy5jb20vaW1nL2ltZ19vbmUucG5nXCI+XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0XFx0XFx0PGltZyBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCIgY2xhc3M9XCJpbWdfdHdvXCIgc3JjPVwiLy9hcGkuaGFzaGluZ3N5c3RlbXMuY29tL2ltZy9pbWdfdHdvLnBuZ1wiPlxcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdFxcdFxcdDxpbWcgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiIGNsYXNzPVwiaW1nX3RocmVlXCIgc3JjPVwiLy9hcGkuaGFzaGluZ3N5c3RlbXMuY29tL2ltZy9pbWdfdGhyZWUucG5nXCI+XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0XFx0XFx0PGltZyBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCIgY2xhc3M9XCJpbWdfZm91clwiIHNyYz1cIi8vYXBpLmhhc2hpbmdzeXN0ZW1zLmNvbS9pbWcvaW1nX2ZvdXIucG5nXCI+XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0XFx0PC9kaXY+XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cInR4dF93cmFwXCI+XFxuJyArXG4gICAgJ1xcdFxcdCAgXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cInR4dF9oZWFkZXJcIj5MZXRzIGdldCB5b3Ugc3RhcnRlZCE8L2Rpdj5cXG4nICtcbiAgICAnXFx0XFx0ICBcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwidHh0X2NvbnRlbnRcIj5Mb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdCwgc2VkIGRvIGVpdXNtb2QgdGVtcG9yIGluY2lkaWR1bnQgdXQgbGFib3JlIGV0IDwvZGl2PlxcbicgK1xuICAgICdcXHRcXHQgIFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJwb3B1cF9idG5cIj5cXG4nICtcbiAgICAnXFx0XFx0ICBcXHRcXHRcXHRcXHRcXHQ8YSBocmVmPVwiXCI+SVxcJ20gUmVhZHk8L2E+XFxuJyArXG4gICAgJ1xcdFxcdCAgXFx0XFx0XFx0XFx0PC9kaXY+XFxuJyArXG4gICAgJ1xcdFxcdCAgXFx0XFx0XFx0PC9kaXY+XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0XFx0XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0PC9kaXY+XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0PC9kaXY+XFxuJyArXG4gICAgJ1xcdCAgXFx0PC9kaXY+Jztcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nZW5lcmFsLmpzIiwiLy8gRGVmaW5lIG91ciBjb25zdHJ1Y3RvclxuZnVuY3Rpb24gTW9kYWwoKSB7XG4gICAgLy8gQ3JlYXRlIGdsb2JhbCBlbGVtZW50IHJlZmVyZW5jZXNcbiAgICB0aGlzLmNsb3NlQnV0dG9uID0gbnVsbDtcbiAgICB0aGlzLm1vZGFsID0gbnVsbDtcbiAgICB0aGlzLm92ZXJsYXkgPSBudWxsO1xuXG4gICAgLy8gRGV0ZXJtaW5lIHByb3BlciBwcmVmaXhcbiAgICB0aGlzLnRyYW5zaXRpb25FbmQgPSB0cmFuc2l0aW9uU2VsZWN0KCk7XG5cbiAgICAvLyBEZWZpbmUgb3B0aW9uIGRlZmF1bHRzXG4gICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICBhdXRvT3BlbjogZmFsc2UsXG4gICAgICAgIGNsYXNzTmFtZTogJ2ZhZGUtYW5kLWRyb3AnLFxuICAgICAgICBjbG9zZUJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgY29udGVudDogXCJcIixcbiAgICAgICAgbWF4V2lkdGg6IDYwMCxcbiAgICAgICAgbWluV2lkdGg6IDI4MCxcbiAgICAgICAgb3ZlcmxheTogZmFsc2VcbiAgICB9O1xuXG4gICAgLy8gQ3JlYXRlIG9wdGlvbnMgYnkgZXh0ZW5kaW5nIGRlZmF1bHRzIHdpdGggdGhlIHBhc3NlZCBpbiBhcnVnbWVudHNcbiAgICBpZiAoYXJndW1lbnRzWzBdICYmIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gZXh0ZW5kRGVmYXVsdHMoZGVmYXVsdHMsIGFyZ3VtZW50c1swXSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvT3BlbiA9PT0gdHJ1ZSkgdGhpcy5vcGVuKCk7XG5cbn1cblxuLy8gUHVibGljIE1ldGhvZHNcbk1vZGFsLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgXyA9IHRoaXM7XG4gICAgdGhpcy5tb2RhbC5jbGFzc05hbWUgPSB0aGlzLm1vZGFsLmNsYXNzTmFtZS5yZXBsYWNlKFwiIGhhc2gtb3BlblwiLCBcIlwiKTtcbiAgICB0aGlzLm92ZXJsYXkuY2xhc3NOYW1lID0gdGhpcy5vdmVybGF5LmNsYXNzTmFtZS5yZXBsYWNlKFwiIGhhc2gtb3BlblwiLCBcIlwiKTtcbiAgICB0aGlzLm1vZGFsLmFkZEV2ZW50TGlzdGVuZXIodGhpcy50cmFuc2l0aW9uRW5kLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF8ubW9kYWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChfLm1vZGFsKTtcbiAgICB9KTtcbiAgICB0aGlzLm92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLnRyYW5zaXRpb25FbmQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKF8ub3ZlcmxheS5wYXJlbnROb2RlKSBfLm92ZXJsYXkucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChfLm92ZXJsYXkpO1xuICAgIH0pO1xufTtcblxuTW9kYWwucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgYnVpbGRPdXQuY2FsbCh0aGlzKTtcbiAgICBpbml0aWFsaXplRXZlbnRzLmNhbGwodGhpcyk7XG4gICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5tb2RhbCkuaGVpZ2h0O1xuICAgIHRoaXMubW9kYWwuY2xhc3NOYW1lID0gdGhpcy5tb2RhbC5jbGFzc05hbWUgKyAodGhpcy5tb2RhbC5vZmZzZXRIZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQgPyBcIiBoYXNoLW9wZW4gaGFzaC1hbmNob3JlZFwiIDogXCIgaGFzaC1vcGVuXCIpO1xuICAgIC8vdGhpcy5vdmVybGF5LmNsYXNzTmFtZSA9IHRoaXMub3ZlcmxheS5jbGFzc05hbWUgKyBcIiBoYXNoLW9wZW5cIjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfY2xvc2UnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9vdXRlcl93cmFwJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH07XG59O1xuXG4vLyBQcml2YXRlIE1ldGhvZHNcbmZ1bmN0aW9uIGJ1aWxkT3V0KCkge1xuXG4gICAgdmFyIGNvbnRlbnQsIGNvbnRlbnRIb2xkZXIsIGRvY0ZyYWc7XG5cbiAgICAvKlxuICAgICAqIElmIGNvbnRlbnQgaXMgYW4gSFRNTCBzdHJpbmcsIGFwcGVuZCB0aGUgSFRNTCBzdHJpbmcuXG4gICAgICogSWYgY29udGVudCBpcyBhIGRvbU5vZGUsIGFwcGVuZCBpdHMgY29udGVudC5cbiAgICAgKi9cblxuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLmNvbnRlbnQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgY29udGVudCA9IHRoaXMub3B0aW9ucy5jb250ZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRlbnQgPSB0aGlzLm9wdGlvbnMuY29udGVudC5pbm5lckhUTUw7XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIGEgRG9jdW1lbnRGcmFnbWVudCB0byBidWlsZCB3aXRoXG4gICAgZG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgIC8vIENyZWF0ZSBtb2RhbCBlbGVtZW50XG4gICAgdGhpcy5tb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5tb2RhbC5jbGFzc05hbWUgPSBcImhhc2gtbW9kYWwgXCIgKyB0aGlzLm9wdGlvbnMuY2xhc3NOYW1lO1xuICAgIC8qdGhpcy5tb2RhbC5zdHlsZS5taW5XaWR0aCA9IHRoaXMub3B0aW9ucy5taW5XaWR0aCArIFwicHhcIjtcbiAgICB0aGlzLm1vZGFsLnN0eWxlLm1heFdpZHRoID0gdGhpcy5vcHRpb25zLm1heFdpZHRoICsgXCJweFwiOyovXG5cbiAgICAvLyBJZiBjbG9zZUJ1dHRvbiBvcHRpb24gaXMgdHJ1ZSwgYWRkIGEgY2xvc2UgYnV0dG9uXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jbG9zZUJ1dHRvbiA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcHVwLWNsb3NlLWJ0bicpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNsb3NlQnV0dG9uKVxuICAgIH1cblxuICAgIC8vIENyZWF0ZSBjb250ZW50IGFyZWEgYW5kIGFwcGVuZCB0byBtb2RhbFxuICAgIGNvbnRlbnRIb2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnRlbnRIb2xkZXIuY2xhc3NOYW1lID0gXCJoYXNoLWNvbnRlbnRcIjtcbiAgICBjb250ZW50SG9sZGVyLmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgdGhpcy5tb2RhbC5hcHBlbmRDaGlsZChjb250ZW50SG9sZGVyKTtcblxuICAgIC8vIEFwcGVuZCBtb2RhbCB0byBEb2N1bWVudEZyYWdtZW50XG4gICAgZG9jRnJhZy5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsKTtcblxuICAgIC8vIEFwcGVuZCBEb2N1bWVudEZyYWdtZW50IHRvIGJvZHlcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvY0ZyYWcpO1xuXG59XG5cbmltZ2NoYW5nZUZ1bmN0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjaGJveHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShcImltZ19jaGtib3hcIik7XG4gICAgdmFyIHZhcl9jaGVjayA9IFwiXCI7XG5cbiAgICB2YXIgaW1nX2FsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJpbWdfYWxsXCIpO1xuXG4gICAgZm9yKHZhciBpPTA7aTxjaGJveHMubGVuZ3RoO2krKykge1xuICAgICAgICBpZihjaGJveHNbaV0uY2hlY2tlZCl7XG4gICAgICAgICAgICB2YXJfY2hlY2sgPSB2YXJfY2hlY2suY29uY2F0KGNoYm94c1tpXS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZih2YXJfY2hlY2sgPT0gJ2ltZ19vbmUnKXtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ190d28nKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfdGhyZWUnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfZm91cicpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ19vbmUnKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBpZih2YXJfY2hlY2sgPT0gJ2ltZ19vbmVpbWdfdHdvJykge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX29uZScpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ190aHJlZScpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ19mb3VyJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX3R3bycpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIGlmKHZhcl9jaGVjayA9PSAnaW1nX29uZWltZ190d29pbWdfdGhyZWUnKXtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ19vbmUnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfdHdvJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX2ZvdXInKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfdGhyZWUnKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBpZih2YXJfY2hlY2sgPT0gJ2ltZ19vbmVpbWdfdHdvaW1nX3RocmVlaW1nX2ZvdXInKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfb25lJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX3R3bycpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ190aHJlZScpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ19mb3VyJykuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBleHRlbmREZWZhdWx0cyhzb3VyY2UsIHByb3BlcnRpZXMpIHtcbiAgICB2YXIgcHJvcGVydHk7XG4gICAgZm9yIChwcm9wZXJ0eSBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICAgICAgc291cmNlW3Byb3BlcnR5XSA9IHByb3BlcnRpZXNbcHJvcGVydHldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2U7XG59XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVFdmVudHMoKSB7XG4gICAgY29uc29sZS5sb2coXCJ0ZXN0XCIpXG4gICAgY29uc29sZS5sb2codGhpcy5jbG9zZUJ1dHRvbilcbiAgICBpZiAodGhpcy5jbG9zZUJ1dHRvbikge1xuICAgICAgICBjb25zb2xlLmxvZyhcInRlc3RcIik7XG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm92ZXJsYXkpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gdHJhbnNpdGlvblNlbGVjdCgpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGlmIChlbC5zdHlsZS5XZWJraXRUcmFuc2l0aW9uKSByZXR1cm4gXCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCI7XG4gICAgaWYgKGVsLnN0eWxlLk9UcmFuc2l0aW9uKSByZXR1cm4gXCJvVHJhbnNpdGlvbkVuZFwiO1xuICAgIHJldHVybiAndHJhbnNpdGlvbmVuZCc7XG59XG5cbi8vZXhwb3J0aW5nIG1vZHVsZVxubW9kdWxlLmV4cG9ydHMuTW9kYWwgPSBNb2RhbDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb2RhbC5qcyJdLCJzb3VyY2VSb290IjoiIn0=