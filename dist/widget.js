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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__methods__ = __webpack_require__(3);


 // enlist all methods supported by API (e.g. `mw('event', 'user-login');`)

var supportedAPI = __WEBPACK_IMPORTED_MODULE_2__methods__["a" /* methods */];
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
      return makeTransaction();

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
  var myContent = '<div class="popup_outer_wrap">\n' + '\t  \t<div class="popup_wrap">\n' + '\t  \t\t<div class="popup_header">Setup Task <a href="javascript:void(0)" class="popup_close">x</a></div>\n' + '\n' + '\t  \t\t<div class="popup_inner">\n' + '\t  \t\t\t<div class="popup_inner_left">\n' + '\n' + '\t  \t\t\t\t<form action="/action_page.php" class="popup_form">\n' + '\t\t\t\t\t  <input type="checkbox" onchange= "imgchangeFunction()" id="img_one" class="popup_chkbox toggle__input" name="img_chkbox" value="img_one">\n' + '\t\t\t\t\t  <label for="img_one">&nbsp; Install Hedera Wallet</label>\n' + '\t\t\t\t\t  <input type="checkbox" onchange= "imgchangeFunction()" id="img_two" class="popup_chkbox toggle__input" name="img_chkbox" value="img_two">\n' + '\t\t\t\t\t  <label for="img_two">&nbsp; "Pair your Account"</label>\n' + '\n' + '\t\t\t\t\t  <input type="checkbox" onchange= "imgchangeFunction()" id="img_three" class="popup_chkbox toggle__input" name="img_chkbox" value="img_three">\n' + '\t\t\t\t\t  <label for="img_three">&nbsp; "Allow Payment Requests"</label>\n' + '\n' + '\t\t\t\t\t  <input type="checkbox" onchange= "imgchangeFunction()" id="img_four" class="popup_chkbox toggle__input" name="img_chkbox" value="img_four">\n' + '\t\t\t\t\t  <label for="img_four">&nbsp; "Get some HBAR"</label>\n' + '\t\t\t\t\t</form>\n' + '\n' + '\t\t\t\t\t<div class="popup_logo">\n' + '\t\t\t\t\t\t<div class="logo_txt">Powered by</div>\n' + '\t\t\t\t\t\t<div class="logo_icon"><img src="//api.hashingsystems.com/img/popup_logo.png"></div>\n' + '\t\t\t\t\t</div>\n' + '\t  \t\t\t\t\n' + '\t  \t\t\t</div>\n' + '\t  \t\t\t<div class="popup_inner_right">\n' + '\n' + '\t  \t\t\t\t<div class="popup_img_sec">\n' + '\t  \t\t\t\t\t<img class="img_one" src="//api.hashingsystems.com/img/img_one.png">\n' + '\t  \t\t\t\t\t<img style="display: none;" class="img_two" src="//api.hashingsystems.com/img/img_two.png">\n' + '\t  \t\t\t\t\t<img style="display: none;" class="img_three" src="//api.hashingsystems.com/img/img_three.png">\n' + '\t  \t\t\t\t\t<img style="display: none;" class="img_four" src="//api.hashingsystems.com/img/img_four.png">\n' + '\t  \t\t\t\t</div>\n' + '\t  \t\t\t\t<div class="txt_wrap">\n' + '\t\t  \t\t\t\t<div class="txt_header">Lets get you started!</div>\n' + '\t\t  \t\t\t\t<div class="txt_content">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et </div>\n' + '\t\t  \t\t\t\t<div class="popup_btn">\n' + '\t\t  \t\t\t\t\t<a href="">I\'m Ready</a>\n' + '\t\t  \t\t\t\t</div>\n' + '\t\t  \t\t\t</div>\n' + '\t  \t\t\t\t\n' + '\t  \t\t\t</div>\n' + '\t  \t\t</div>\n' + '\t  \t</div>';
  var myModal = new __WEBPACK_IMPORTED_MODULE_1__modal__["Modal"]({
    content: myContent
  });
  myModal.open();
}

function makeTransaction() {
  var params = {
    transaction_procesing: true,
    transaction_failed: false,
    transaction_success: false
  };

  if (checkTransaction()) {}
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

/***/ }),
/* 3 */
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGJkZTFjNTk5Yzc4NmRjYjIyMjciLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWV0aG9kcy5qcyJdLCJuYW1lcyI6WyJzdXBwb3J0ZWRBUEkiLCJtZXRob2RzIiwicHJvZHVjdGlvbiIsImFwcCIsIndpbmRvdyIsImNvbnNvbGUiLCJsb2ciLCJ0b2RheSIsIkRhdGUiLCJkYXRlIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImdldERhdGUiLCJ0aW1lIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZGF0ZVRpbWUiLCJ0aW1lc3RhbXAiLCJnZXRUaW1lIiwiY29uZmlndXJhdGlvbnMiLCJwYXltZW50c2VydmVyIiwiZXh0ZW5zaW9uaWQiLCJlcnJvciIsInR5cGUiLCJub3ciLCJyZWRpcmVjdCIsInN1Ym1pc3Npb25ub2RlIiwibWVtbyIsInJlY2lwaWVudGxpc3QiLCJjb250ZW50aWQiLCJhdHRySUQiLCJpZCIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJnbG9iYWxPYmplY3QiLCJxdWV1ZSIsInEiLCJpIiwibGVuZ3RoIiwidG9Mb3dlckNhc2UiLCJleHRlbmRPYmplY3QiLCJjcmVhdGVIZWRlcmFPYmplY3QiLCJjaGVja0ZvckV4dGVuc2lvbiIsImFwaUhhbmRsZXIiLCJjYWxsYmFjayIsImlzQ2hyb21lIiwicmVkaXJlY3RUb0Vycm9yIiwidGFncyIsImFtb3VudCIsIkVYVEVOU0lPTl9JRCIsImRldGVjdCIsInJlc3BvbnNlIiwicmVjb3JkUmVzcG9uc2UiLCJleHRlbnNpb25JZCIsIm5vdEluc3RhbGxlZENhbGxiYWNrIiwiaW5zdGFsbGVkQ2FsbGJhY2siLCJpbWciLCJJbWFnZSIsIm9uZXJyb3IiLCJvbmxvYWQiLCJzcmMiLCJyZXMiLCJib2R5IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImlubmVySFRNTCIsImVyciIsInJlcGxhY2UiLCJvcmlnaW4iLCJjb25maWd1cmF0aW9uIiwiYXBpIiwicGFyYW1zIiwiRXJyb3IiLCJpbmRleE9mIiwiY2hlY2tUcmFuc2FjdGlvbiIsImNyZWF0ZUNvbnRyYWN0T2JqZWN0IiwiaW5pdCIsImdldG1vZGFsIiwibWFrZVRyYW5zYWN0aW9uIiwid2FybiIsImEiLCJiIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJvYmplY3QiLCJIZWRlcmFvYmplY3QiLCJub2RlIiwiZ2V0RWxlbWVudEJ5SWQiLCJfX2NvbnN0cnVjdCIsImNvbnRyYWN0aWQiLCJtYXhpbXVtIiwiYWJpIiwiSlNPTiIsInN0cmluZ2lmeSIsInBhcnNlIiwiZXh0ZW5kZWQiLCJDb250cmFjdG9iamVjdCIsIm1lbW9faWQiLCJ1cmwiLCJzdHJ1Y3R1cmUiLCJiYXNldXJsIiwicmVjZWl2ZXJfaWQiLCJzdWNjZXNzIiwiZmFpbHVyZSIsInRpbWVvdXQiLCJsaW1pdCIsIlVSTCIsInNldFRpbWVvdXQiLCJwZXJmb3JtUmVxdWVzdCIsInhodHRwIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwibm9kZXByZWNoZWNrIiwicHJlY2hlY2tlciIsIm9wZW4iLCJzZW5kIiwiYWNjb3VudFBhaXJlZCIsImlzbW9iaWxlIiwidmFsaWRCcm93c2VyIiwiZXh0ZW5zaW9uSW5zdGFsbGVkIiwiYWNjZXNzVG9BY2NvdW50cyIsImFjY291bnRJZCIsInN1Ym1pc3Npb25Ob2RlIiwidHhuX3N1Y2Nlc3MiLCJkZXRlY3Rtb2IiLCJhamF4cmVzcCIsInNlbmRlciIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIm1hdGNoIiwibXlDb250ZW50IiwibXlNb2RhbCIsIk1vZGFsIiwiY29udGVudCIsInRyYW5zYWN0aW9uX3Byb2Nlc2luZyIsInRyYW5zYWN0aW9uX2ZhaWxlZCIsInRyYW5zYWN0aW9uX3N1Y2Nlc3MiLCJwaW5nIiwibiIsImpzb24iLCJjbG9zZUJ1dHRvbiIsIm1vZGFsIiwib3ZlcmxheSIsInRyYW5zaXRpb25FbmQiLCJ0cmFuc2l0aW9uU2VsZWN0IiwiZGVmYXVsdHMiLCJhdXRvT3BlbiIsImNsYXNzTmFtZSIsIm1heFdpZHRoIiwibWluV2lkdGgiLCJhcmd1bWVudHMiLCJvcHRpb25zIiwiZXh0ZW5kRGVmYXVsdHMiLCJwcm90b3R5cGUiLCJjbG9zZSIsIl8iLCJhZGRFdmVudExpc3RlbmVyIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiYnVpbGRPdXQiLCJjYWxsIiwiaW5pdGlhbGl6ZUV2ZW50cyIsImdldENvbXB1dGVkU3R5bGUiLCJoZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJpbm5lckhlaWdodCIsInF1ZXJ5U2VsZWN0b3IiLCJvbmNsaWNrIiwic3R5bGUiLCJkaXNwbGF5IiwiY29udGVudEhvbGRlciIsImRvY0ZyYWciLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiaW1nY2hhbmdlRnVuY3Rpb24iLCJjaGJveHMiLCJnZXRFbGVtZW50c0J5TmFtZSIsInZhcl9jaGVjayIsImltZ19hbGwiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY2hlY2tlZCIsImNvbmNhdCIsInZhbHVlIiwic291cmNlIiwicHJvcGVydGllcyIsInByb3BlcnR5IiwiYmluZCIsImVsIiwiV2Via2l0VHJhbnNpdGlvbiIsIk9UcmFuc2l0aW9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7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LENBQ0g7QUFDQSxzQkFGRyxFQUVtQixzQkFGbkIsRUFJSDtBQUNBLFFBTEcsRUFPSDtBQUNBLGVBUkcsRUFRWSxpQkFSWixFQVErQixrQkFSL0IsRUFVSDtBQUNBLFlBWEcsQ0FBUDtBQWFILEMiLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZGJkZTFjNTk5Yzc4NmRjYjIyMjciLCJpbXBvcnQge3BpbmcsIHByZWNoZWNrZXJ9IGZyb20gJy4vc2VydmljZXMnXG5pbXBvcnQge01vZGFsfSBmcm9tICcuL21vZGFsJztcbmltcG9ydCB7bWV0aG9kc30gZnJvbSAnLi9tZXRob2RzJztcblxuLy8gZW5saXN0IGFsbCBtZXRob2RzIHN1cHBvcnRlZCBieSBBUEkgKGUuZy4gYG13KCdldmVudCcsICd1c2VyLWxvZ2luJyk7YClcbmNvbnN0IHN1cHBvcnRlZEFQSSA9IG1ldGhvZHM7XG4vKipcbiAqIFRoZSBtYWluIGVudHJ5IG9mIHRoZSBhcHBsaWNhdGlvblxuICovXG5jb25zdCBwcm9kdWN0aW9uID0gdHJ1ZTtcblxuZnVuY3Rpb24gYXBwKHdpbmRvdykge1xuICAgIGNvbnNvbGUubG9nKCdIQVNILUpTIHN0YXJ0aW5nJyk7XG4gICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKSxcbiAgICAgICAgZGF0ZSA9IHRvZGF5LmdldEZ1bGxZZWFyKCkgKyAnLScgKyAodG9kYXkuZ2V0TW9udGgoKSArIDEpICsgJy0nICsgdG9kYXkuZ2V0RGF0ZSgpLFxuICAgICAgICB0aW1lID0gdG9kYXkuZ2V0SG91cnMoKSArIFwiOlwiICsgdG9kYXkuZ2V0TWludXRlcygpLFxuICAgICAgICBkYXRlVGltZSA9IGRhdGUgKyAnICcgKyB0aW1lLFxuICAgICAgICB0aW1lc3RhbXAgPSBuZXcgRGF0ZShkYXRlVGltZSkuZ2V0VGltZSgpO1xuXG4gICAgbGV0IGNvbmZpZ3VyYXRpb25zID0ge1xuICAgICAgICBwYXltZW50c2VydmVyOiBwcm9kdWN0aW9uID8gXCJodHRwczovL21wcy5oYXNoaW5nc3lzdGVtcy5jb21cIiA6ICdodHRwOi8vbG9jYWxob3N0Ojk5OTknLFxuICAgICAgICBleHRlbnNpb25pZDogXCJsaWdwYW9uZGFhYmNsZmlnYWdjaWZvYmFlbGVtaWVuYVwiLFxuICAgICAgICBlcnJvcjogXCIvbm8tZXh0ZW5zaW9uXCIsXG4gICAgICAgIHR5cGU6IFwiYXJ0aWNsZVwiLFxuICAgICAgICB0aW1lOiBEYXRlLm5vdygpLFxuICAgICAgICByZWRpcmVjdDogJ3sgXCJub25QYXlpbmdBY2NvdW50XCI6IFwiL2luc3VmZmljaWVudC1hbW91bnQvXCIsIFwibm9BY2NvdW50XCI6IFwiL2FjY291bnQtbm90LXBhaXJlZC9cIiwgXCJob21lUGFnZVwiOiBcIi9cIn0nLFxuICAgICAgICBzdWJtaXNzaW9ubm9kZTogXCIwLjAuMTFcIixcbiAgICAgICAgbWVtbzogRGF0ZS5ub3coKSxcbiAgICAgICAgcmVjaXBpZW50bGlzdDogJ1t7IFwidG9cIjogXCIwLjAuOTlcIiwgXCJ0aW55YmFyc1wiOiBcIjE2NjY2NjdcIiB9XScsXG4gICAgICAgIGNvbnRlbnRpZDogJzc5JyxcbiAgICAgICAgYXR0cklEOiAnYXJ0aWNsZS0xJyxcbiAgICAgICAgdGltZXN0YW1wOiB0aW1lc3RhbXAsXG4gICAgICAgIC8qdGhpcyBtaWdodCBtYWtlIGEgZ29vZCBkZWZhdWx0IGlkIGZvciB0aGUgY29udGVudCovXG4gICAgICAgIGlkOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgfTtcblxuICAgIC8qICpcbiAgICAgICogYWxsIG1ldGhvZHMgdGhhdCB3ZXJlIGNhbGxlZCB0aWxsIG5vdyBhbmQgc3RvcmVkIGluIHF1ZXVlXG4gICAgICAqIG5lZWRzIHRvIGJlIGNhbGxlZCBub3dcbiAgICAgICogKi9cbiAgICBsZXQgZ2xvYmFsT2JqZWN0ID0gd2luZG93W3dpbmRvd1snSEFTSC1KUyddXTtcbiAgICBsZXQgcXVldWUgPSBnbG9iYWxPYmplY3QucTtcbiAgICBpZiAocXVldWUpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBxdWV1ZVtpXVswXSAhPT0gJ3VuZGVmaW5lZCcgJiYgcXVldWVbaV1bMF0udG9Mb3dlckNhc2UoKSA9PSAnbWFrZXBheW1lbnQnKSB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbnMgPSBleHRlbmRPYmplY3QoY29uZmlndXJhdGlvbnMsIHF1ZXVlW2ldWzFdKTtcbiAgICAgICAgICAgICAgICBjcmVhdGVIZWRlcmFPYmplY3QoY29uZmlndXJhdGlvbnMpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdIQVNILUpTIHN0YXJ0ZWQnLCBjb25maWd1cmF0aW9ucyk7XG4gICAgICAgICAgICAgICAgY2hlY2tGb3JFeHRlbnNpb24oY29uZmlndXJhdGlvbnMpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBxdWV1ZVtpXVswXSAhPT0gJ3VuZGVmaW5lZCcgJiYgcXVldWVbaV1bMF0udG9Mb3dlckNhc2UoKSA9PSAnY3JlYXRlY29udHJhY3RvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbnMgPSBleHRlbmRPYmplY3QoY29uZmlndXJhdGlvbnMsIHF1ZXVlW2ldWzFdKTtcbiAgICAgICAgICAgICAgICBhcGlIYW5kbGVyKGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVswXSwgcXVldWVbaV1bMV0sIHF1ZXVlW2ldWzJdKTtcbiAgICAgICAgICAgICAgICBjaGVja0ZvckV4dGVuc2lvbihjb25maWd1cmF0aW9ucylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhbGxiYWNrO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcXVldWVbaV1bMV0gPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayA9IHF1ZXVlW2ldWzFdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gcXVldWVbaV1bcXVldWVbMF0ubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25zID0gZXh0ZW5kT2JqZWN0KGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgICAgICAgICAgYXBpSGFuZGxlcihjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMF0sIHF1ZXVlW2ldWzFdLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gb3ZlcnJpZGUgdGVtcG9yYXJ5ICh1bnRpbCB0aGUgYXBwIGxvYWRlZCkgaGFuZGxlclxuICAgIC8vIGZvciB3aWRnZXQncyBBUEkgY2FsbHNcbiAgICBnbG9iYWxPYmplY3QgPSBhcGlIYW5kbGVyO1xuICAgIGdsb2JhbE9iamVjdC5jb25maWd1cmF0aW9ucyA9IGNvbmZpZ3VyYXRpb25zO1xufVxuXG5mdW5jdGlvbiBjaGVja0ZvckV4dGVuc2lvbihjb25maWd1cmF0aW9ucykge1xuICAgIGlmICghaXNDaHJvbWUoKSkge1xuICAgICAgICByZWRpcmVjdFRvRXJyb3IoJy9pc25vdENocm9tZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB0YWdzID0gY29uZmlndXJhdGlvbnM7XG4gICAgICAgIC8vIGlmIHRhZ3MuYW1vdW50IGlzIG51bGwgb3IgdW5kZWZpbmVkLCB3ZSBzaG91bGQgYXNzdW1lIHRoYXQgdGhpcyBpcyBhIGZyZWUgcGFnZSBhbmQgZG8gbm90aGluZyBtb3JlXG4gICAgICAgIGlmICh0YWdzLmFtb3VudCA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IEVYVEVOU0lPTl9JRCA9IHRhZ3MuZXh0ZW5zaW9uaWQ7XG5cbiAgICAgICAgZGV0ZWN0KEVYVEVOU0lPTl9JRCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmVkaXJlY3RUb0Vycm9yKHRhZ3MuZXJyb3IpO1xuICAgICAgICB9LCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkZXRlY3Q6IHVzZXIgaGFzIGV4dGVuc2lvbiBpbnN0YWxsZWQnKTtcbiAgICAgICAgICAgIHJlY29yZFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBJTkZPIDogVGhpcyB3YXMgdXNlZCBpbiBvcmRlciB0byBjaGVjayBpZiB0aGUgZXh0ZW5zaW9uIHdhcyBpbnN0YWxsZWQgb3Igbm90LFxuICAgICAgICAgKiBOb3cgcmVwbGFjZSBieVxuICAgICAgICAgKiBAZGV0ZWN0KClcbiAgICAgICAgICogKi9cbiAgICAgICAgLypcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoRVhURU5TSU9OX0lELCAndmVyc2lvbicsIHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJlZGlyZWN0VG9FcnJvcih0YWdzLmVycm9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVjb3JkUmVzcG9uc2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAqL1xuXG4gICAgfVxufVxuXG5mdW5jdGlvbiBkZXRlY3QoZXh0ZW5zaW9uSWQsIG5vdEluc3RhbGxlZENhbGxiYWNrLCBpbnN0YWxsZWRDYWxsYmFjaykge1xuICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBjb25zb2xlLmxvZyhleHRlbnNpb25JZCk7XG4gICAgaW1nLm9uZXJyb3IgPSBub3RJbnN0YWxsZWRDYWxsYmFjaztcbiAgICBpbWcub25sb2FkID0gaW5zdGFsbGVkQ2FsbGJhY2s7XG4gICAgaW1nLnNyYyA9ICdjaHJvbWUtZXh0ZW5zaW9uOi8vJyArIGV4dGVuc2lvbklkICsgJy9pY29ucy9pY29uMTYucG5nJztcbn1cblxuZnVuY3Rpb24gcmVjb3JkUmVzcG9uc2UocmVzKSB7XG4gICAgaWYgKHR5cGVvZiByZXMgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpO1xuICAgICAgICBib2R5LmlubmVySFRNTCArPSAnPGRpdiBzdHlsZT1cIndpZHRoOjEwMCU7aGVpZ2h0OjUlO29wYWNpdHk6MC4zO3otaW5kZXg6MTAwO2JhY2tncm91bmQ6eWVsbG93O1wiPicgKyByZXMgKyAnPC9kaXY+JztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gcmVkaXJlY3RUb0Vycm9yKGVycikge1xuICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgIT0gZXJyKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBlcnIpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNDaHJvbWUoKSB7XG4gICAgcmV0dXJuICdjaHJvbWUnIGluIHdpbmRvd1xufVxuXG4vKipcbiAqIE1ldGhvZCB0aGF0IGhhbmRsZXMgYWxsIEFQSSBjYWxsc1xuICogQFRPRE8gOiBDYW4gYmUgaW1wbGVtZW50ZWQgbmV4dCB3YXlcbiAqICovXG5mdW5jdGlvbiBhcGlIYW5kbGVyKGNvbmZpZ3VyYXRpb24sIGFwaSwgcGFyYW1zLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBpZiAoIWFwaSkgdGhyb3cgRXJyb3IoJ0FQSSBtZXRob2QgcmVxdWlyZWQnKTtcbiAgICBhcGkgPSBhcGkudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoc3VwcG9ydGVkQVBJLmluZGV4T2YoYXBpKSA9PT0gLTEpIHRocm93IEVycm9yKGBNZXRob2QgJHthcGl9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgICBjb25zb2xlLmxvZyhgSGFuZGxpbmcgQVBJIGNhbGwgJHthcGl9YCwgcGFyYW1zKTtcblxuICAgIHN3aXRjaCAoYXBpKSB7XG4gICAgICAgIC8vIFRPRE86IGFkZCBBUEkgaW1wbGVtZW50YXRpb25cbiAgICAgICAgY2FzZSAnY3JlYXRlaGVkZXJhb2JqZWN0JzpcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVIZWRlcmFPYmplY3QocGFyYW1zKTtcbiAgICAgICAgY2FzZSAnY2hlY2t0cmFuc2FjdGlvbic6XG4gICAgICAgICAgICByZXR1cm4gY2hlY2tUcmFuc2FjdGlvbih7Y29uZmlndXJhdGlvbiwgcGFyYW1zfSwgY2FsbGJhY2spO1xuICAgICAgICBjYXNlICdjcmVhdGVjb250cmFjdG9iamVjdCc6XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlQ29udHJhY3RPYmplY3Qoe2NvbmZpZ3VyYXRpb24sIHBhcmFtc30sIGNhbGxiYWNrKTtcbiAgICAgICAgY2FzZSAnaW5pdCc6XG4gICAgICAgICAgICByZXR1cm4gaW5pdChjb25maWd1cmF0aW9uLCBjYWxsYmFjayk7XG4gICAgICAgIGNhc2UgJ2dldG1vZGFsJzpcbiAgICAgICAgICAgIHJldHVybiBnZXRtb2RhbCgpO1xuICAgICAgICBjYXNlICdtYWtlVHJhbnNhY3Rpb24nOlxuICAgICAgICAgICAgcmV0dXJuIG1ha2VUcmFuc2FjdGlvbigpO1xuICAgICAgICBjYXNlICd0ZXN0JzpcbiAgICAgICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYE5vIGhhbmRsZXIgZGVmaW5lZCBmb3IgJHthcGl9YCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBleHRlbmRPYmplY3QoYSwgYikge1xuICAgIGZvciAodmFyIGtleSBpbiBiKVxuICAgICAgICBpZiAoYi5oYXNPd25Qcm9wZXJ0eShrZXkpKSBhW2tleV0gPSBiW2tleV07XG4gICAgcmV0dXJuIGE7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUhlZGVyYU9iamVjdChwYXJhbXMpIHtcbiAgICBsZXQgb2JqZWN0ID0gWydzdWJtaXNzaW9ubm9kZScsICdwYXltZW50c2VydmVyJywgJ3JlY2lwaWVudGxpc3QnLCAnY29udGVudGlkJywgJ3R5cGUnLCAnbWVtbycsICdleHRlbnNpb25pZCcsICdyZWRpcmVjdCcsICd0aW1lJ107XG4gICAgbGV0IEhlZGVyYW9iamVjdCA9ICc8aGVkZXJhLW1pY3JvcGF5bWVudCAnO1xuICAgIGZvciAodmFyIGkgaW4gb2JqZWN0KSB7XG4gICAgICAgIGxldCBub2RlID0gb2JqZWN0W2ldO1xuICAgICAgICBpZiAocGFyYW1zLmhhc093blByb3BlcnR5KG5vZGUpKSB7XG4gICAgICAgICAgICBIZWRlcmFvYmplY3QgKz0gXCJkYXRhLVwiICsgbm9kZSArIFwiPSAnXCIgKyBwYXJhbXNbbm9kZV0gKyBcIicgLCBcIiArIFwiXFxuXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgSGVkZXJhb2JqZWN0ICs9ICc+PC9oZWRlcmEtbWljcm9wYXltZW50Pic7XG4gICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJhbXNbJ2F0dHJJRCddKTtcbiAgICBib2R5LmlubmVySFRNTCArPSBIZWRlcmFvYmplY3Q7XG4gICAgcmV0dXJuIEhlZGVyYW9iamVjdDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29udHJhY3RPYmplY3QocGFyYW1zKSB7XG4gICAgbGV0IF9fY29uc3RydWN0ID0gWydjb250cmFjdGlkJywgJ21heGltdW0nLCAncGF5bWVudHNlcnZlcicsICdwYXJhbXMnLCAnbWVtbycsICdhYmknLCAncmVkaXJlY3QnLCAnZXh0ZW5zaW9uaWQnXTtcbiAgICBsZXQgb2JqZWN0ID0ge1xuICAgICAgICBjb250cmFjdGlkOiAnMC4wLjExMTEnLFxuICAgICAgICBtYXhpbXVtOiAnNDIyMzQyMzQzJyxcbiAgICAgICAgcGF5bWVudHNlcnZlcjogcGFyYW1zLmNvbmZpZ3VyYXRpb24ucGF5bWVudHNlcnZlcixcbiAgICAgICAgcGFyYW1zOiBbXCI4NjlcIiwgXCIxMDAwMDAwMDBcIiwgXCIyMTZcIiwgXCIyNTNcIiwgXCIyN1wiLCBcIjB4MjI2YjA4OTc2YWQwZGQ5ODJhZWI2YjIxYTQ0ZjNlYWNhZTU3OTU2OWMzNGU3MTcyNWFmZjgwMWEyZmU2ODczOVwiLCBcIjB4MzMzZjk5MWZhM2E4NzA1NzVmODE5NTY5ZTlmNzJhNzcxZWE3OTAwNzhkNDQ4Y2M4Nzg5MTIwZWUxNGFiZjNjNVwiXSxcbiAgICAgICAgbWVtbzogJ2E0YTdjNDMyOWFhYjRiMWZhYzQ3NGZmNmY5M2Q4NThjJyxcbiAgICAgICAgYWJpOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBcImNvbnN0YW50XCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJpbnB1dHNcIjogW3tcIm5hbWVcIjogXCJwcm9wZXJ0eUlEXCIsIFwidHlwZVwiOiBcInVpbnQyNFwifSwge1wibmFtZVwiOiBcImFtb3VudFwiLCBcInR5cGVcIjogXCJ1aW50MjU2XCJ9LCB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwieFwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInVpbnQxNlwiXG4gICAgICAgICAgICB9LCB7XCJuYW1lXCI6IFwieVwiLCBcInR5cGVcIjogXCJ1aW50MTZcIn0sIHtcIm5hbWVcIjogXCJ2XCIsIFwidHlwZVwiOiBcInVpbnQ4XCJ9LCB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiclwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ5dGVzMzJcIlxuICAgICAgICAgICAgfSwge1wibmFtZVwiOiBcInNcIiwgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwifV0sXG4gICAgICAgICAgICBcIm5hbWVcIjogXCJidXlQcm9wZXJ0eVwiLFxuICAgICAgICAgICAgXCJvdXRwdXRzXCI6IFt7XCJuYW1lXCI6IFwiXCIsIFwidHlwZVwiOiBcInN0cmluZ1wifV0sXG4gICAgICAgICAgICBcInBheWFibGVcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwic3RhdGVNdXRhYmlsaXR5XCI6IFwicGF5YWJsZVwiLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgICAgICB9KSxcbiAgICAgICAgcmVkaXJlY3Q6ICd7XCJub25QYXlpbmdBY2NvdW50XCI6IFwiL2luc3VmZmljaWVudC1hbW91bnQvXCIsXCJub0FjY291bnRcIjogXCIvYWNjb3VudC1ub3QtcGFpcmVkXCIsXCJob21lUGFnZVwiOiBcIi9cIn0nLFxuICAgICAgICBleHRlbnNpb25pZDogJ3BkampwY29sZ21tY2lmaWpwZWprZW5wYmJpbWVkcGljJyxcbiAgICB9O1xuXG4gICAgY29uc29sZS5sb2coSlNPTi5wYXJzZShvYmplY3QuYWJpKSk7XG4gICAgbGV0IGV4dGVuZGVkID0gZXh0ZW5kT2JqZWN0KG9iamVjdCwgcGFyYW1zLnBhcmFtcyk7XG4gICAgY29uc29sZS5sb2coZXh0ZW5kZWQpO1xuICAgIGxldCBDb250cmFjdG9iamVjdCA9ICc8aGVkZXJhLWNvbnRyYWN0ICc7XG4gICAgZm9yICh2YXIgaSBpbiBfX2NvbnN0cnVjdCkge1xuICAgICAgICBsZXQgbm9kZSA9IF9fY29uc3RydWN0W2ldO1xuICAgICAgICBpZiAoZXh0ZW5kZWQuaGFzT3duUHJvcGVydHkobm9kZSkpIHtcbiAgICAgICAgICAgIENvbnRyYWN0b2JqZWN0ICs9IFwiZGF0YS1cIiArIG5vZGUgKyBcIj0gJ1wiICsgZXh0ZW5kZWRbbm9kZV0gKyBcIicgXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQ29udHJhY3RvYmplY3QgKz0gJz48L2hlZGVyYS1jb250cmFjdD4nO1xuICAgIGNvbnNvbGUubG9nKENvbnRyYWN0b2JqZWN0KTtcblxuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZXh0ZW5kZWRbJ2F0dHJJRCddKTtcbiAgICBib2R5LmlubmVySFRNTCArPSBDb250cmFjdG9iamVjdDtcbiAgICAvL2NvbnNvbGUubG9nKChIZWRlcmFvYmplY3QpKVxuICAgIHJldHVybiBDb250cmFjdG9iamVjdDtcbiAgICAvL2NhbGxiYWNrKEhlZGVyYW9iamVjdCk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrVHJhbnNhY3Rpb24ocGFyYW1zKSB7XG4gICAgbGV0IG1lbW9faWQgPSBwYXJhbXMuY29uZmlndXJhdGlvbi5tZW1vO1xuICAgIGxldCB1cmwgPSBwcm9kdWN0aW9uID8gXCJodHRwczovL21wcy5oYXNoaW5nc3lzdGVtcy5jb21cIiA6ICdodHRwOi8vbG9jYWxob3N0Ojk5OTknO1xuICAgIGxldCBzdHJ1Y3R1cmUgPSB7XG4gICAgICAgIGJhc2V1cmw6IHVybCxcbiAgICAgICAgbWVtb19pZDogbWVtb19pZCxcbiAgICAgICAgcmVjZWl2ZXJfaWQ6ICcnLFxuICAgICAgICBzdWNjZXNzOiAnL3N1Y2Nlc3MnLFxuICAgICAgICBmYWlsdXJlOiAnL3BheW1lbnQtZmFpbGVkJyxcbiAgICAgICAgdGltZW91dDogMzAwMCxcbiAgICAgICAgbGltaXQ6IDFcbiAgICB9O1xuXG4gICAgZm9yICh2YXIga2V5IGluIHBhcmFtcy5wYXJhbXMpIHtcbiAgICAgICAgaWYgKHBhcmFtcy5wYXJhbXMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBwYXJhbXMucGFyYW1zW2tleV0pIHtcbiAgICAgICAgICAgIHN0cnVjdHVyZVtrZXldID0gcGFyYW1zLnBhcmFtc1trZXldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN0cnVjdHVyZS5yZWNlaXZlcl9pZCAmJiBzdHJ1Y3R1cmUubWVtb19pZCkge1xuICAgICAgICBVUkwgPSBzdHJ1Y3R1cmUuYmFzZXVybCArIFwiL2NoZWNrL1wiICsgc3RydWN0dXJlLnJlY2VpdmVyX2lkICsgXCIvXCIgKyBzdHJ1Y3R1cmUubWVtb19pZFxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzdHJ1Y3R1cmUudGltZXN0YW1wKVxuICAgICAgICAgICAgVVJMID0gc3RydWN0dXJlLmJhc2V1cmwgKyBcIi9tZW1vL1wiICsgc3RydWN0dXJlLm1lbW9faWQgKyAnP2xpbWl0PScgKyBzdHJ1Y3R1cmUubGltaXQgKyAnJnRpbWVzdGFtcD0nICsgc3RydWN0dXJlLnRpbWVzdGFtcDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgVVJMID0gc3RydWN0dXJlLmJhc2V1cmwgKyBcIi9tZW1vL1wiICsgc3RydWN0dXJlLm1lbW9faWQgKyAnP2xpbWl0PScgKyBzdHJ1Y3R1cmUubGltaXQ7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coc3RydWN0dXJlLnRpbWVvdXQpO1xuICAgIC8vc2V0VGltZW91dChwZXJmb3JtUmVxdWVzdChzdHJ1Y3R1cmUpLCBzdHJ1Y3R1cmUudGltZW91dClcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcGVyZm9ybVJlcXVlc3Qoc3RydWN0dXJlKTtcbiAgICB9LCBzdHJ1Y3R1cmUudGltZW91dCk7XG59XG5cbnZhciBwZXJmb3JtUmVxdWVzdCA9IGZ1bmN0aW9uIChzdHJ1Y3R1cmUpIHtcbiAgICB2YXIgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UucmVzcG9uc2UubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UucmVzcG9uc2UubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlWzBdLm5vZGVwcmVjaGVjayA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBzdHJ1Y3R1cmUuc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBAVE9ETyA6IE5lZWQgdG8gY2hlY2sgZm9yIHJldHVybmluZyBhcHByb3ByaWF0ZSB2YWx1ZXMgb3IgcmVkaXJlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICogZWxzZSBpZihwcmVjaGVja2VyKHJlc3BvbnNlLnJlc3BvbnNlWzBdLm5vZGVwcmVjaGVjayk9PSdJTlNVRkZJQ0lFTlRfVFhfRkVFJylcbiAgICAgICAgICAgICAgICAgICAgICogd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uod2luZG93Lm9yaWdpbiArICdpbnN1ZmZpY2llbnQtYW1vdW50Jyk7XG4gICAgICAgICAgICAgICAgICAgICAqICovXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHByZWNoZWNrZXIocmVzcG9uc2UucmVzcG9uc2VbMF0ubm9kZXByZWNoZWNrKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAvL3dpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBzdHJ1Y3R1cmUuZmFpbHVyZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uod2luZG93Lm9yaWdpbiArIHN0cnVjdHVyZS5zdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAvL2NhbGxiYWNrKG51bGwsIHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL2NhbGxiYWNrKHtlcnJvcjogdHJ1ZSwgZGF0YTogdGhpcy5yZXNwb25zZX0sIG51bGwpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBzdHJ1Y3R1cmUuZmFpbHVyZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHhodHRwLm9wZW4oXCJHRVRcIiwgVVJMLCB0cnVlKTtcbiAgICB4aHR0cC5zZW5kKCk7XG59O1xuXG5mdW5jdGlvbiBpbml0KHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICBsZXQgcmVzcG9uc2UgPSB7XG4gICAgICAgIGFjY291bnRQYWlyZWQ6IGZhbHNlLFxuICAgICAgICBpc21vYmlsZTogbnVsbCxcbiAgICAgICAgdmFsaWRCcm93c2VyOiBudWxsLFxuICAgICAgICBleHRlbnNpb25JbnN0YWxsZWQ6IG51bGwsXG4gICAgICAgIGFjY2Vzc1RvQWNjb3VudHM6IG51bGwsXG4gICAgICAgIGFjY291bnRJZDogbnVsbCxcbiAgICAgICAgc3VibWlzc2lvbk5vZGU6IHBhcmFtcy5zdWJtaXNzaW9ubm9kZSxcbiAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgIHR4bl9zdWNjZXNzOiBmYWxzZVxuICAgIH07XG4gICAgcmVzcG9uc2UudmFsaWRCcm93c2VyID0gaXNDaHJvbWUoKTtcbiAgICByZXNwb25zZS5pc21vYmlsZSA9IGRldGVjdG1vYigpO1xuICAgIGRldGVjdChwYXJhbXMuZXh0ZW5zaW9uaWQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVzcG9uc2UuZXh0ZW5zaW9uSW5zdGFsbGVkID0gZmFsc2U7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlc3BvbnNlLmV4dGVuc2lvbkluc3RhbGxlZCA9IHRydWU7XG4gICAgICAgIGNyZWF0ZUhlZGVyYU9iamVjdChwYXJhbXMpO1xuICAgICAgICBsZXQgdXJsID0gcHJvZHVjdGlvbiA/IFwiaHR0cHM6Ly9tcHMuaGFzaGluZ3N5c3RlbXMuY29tXCIgOiAnaHR0cDovL2xvY2FsaG9zdDo5OTk5JztcbiAgICAgICAgVVJMID0gdXJsICsgXCIvbWVtby9cIiArIHBhcmFtcy5tZW1vO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCB4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgeGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhamF4cmVzcCA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhamF4cmVzcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWpheHJlc3AucmVzcG9uc2UubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHByZWNoZWNrZXIoYWpheHJlc3AucmVzcG9uc2VbMF0ubm9kZXByZWNoZWNrKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuYWNjb3VudElkID0gYWpheHJlc3AucmVzcG9uc2VbMF0uc2VuZGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmFjY291bnRQYWlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmFjY2Vzc1RvQWNjb3VudHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhamF4cmVzcC5yZXNwb25zZVswXS5ub2RlcHJlY2hlY2sgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UudHhuX3N1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5lcnJvciA9IHByZWNoZWNrZXIoYWpheHJlc3AucmVzcG9uc2VbMF0ubm9kZXByZWNoZWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5hY2NvdW50UGFpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5hY2Nlc3NUb0FjY291bnRzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGh0dHAub3BlbihcIkdFVFwiLCBVUkwsIHRydWUpO1xuICAgICAgICAgICAgeGh0dHAuc2VuZCgpO1xuICAgICAgICB9LCA1MDAwKTtcbiAgICAgICAgLy9jYWxsYmFjayhudWxsLHJlc3BvbnNlKTtcbiAgICB9KTtcblxufVxuXG5mdW5jdGlvbiBkZXRlY3Rtb2IoKSB7XG4gICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0FuZHJvaWQvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvd2ViT1MvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBob25lL2kpXG4gICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQYWQvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBvZC9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9CbGFja0JlcnJ5L2kpXG4gICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1dpbmRvd3MgUGhvbmUvaSlcbiAgICApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0bW9kYWwoKSB7XG4gICAgdmFyIG15Q29udGVudCA9ICc8ZGl2IGNsYXNzPVwicG9wdXBfb3V0ZXJfd3JhcFwiPlxcbicgK1xuICAgICAgICAnXFx0ICBcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfd3JhcFwiPlxcbicgK1xuICAgICAgICAnXFx0ICBcXHRcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfaGVhZGVyXCI+U2V0dXAgVGFzayA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJwb3B1cF9jbG9zZVwiPng8L2E+PC9kaXY+XFxuJyArXG4gICAgICAgICdcXG4nICtcbiAgICAgICAgJ1xcdCAgXFx0XFx0PGRpdiBjbGFzcz1cInBvcHVwX2lubmVyXCI+XFxuJyArXG4gICAgICAgICdcXHQgIFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJwb3B1cF9pbm5lcl9sZWZ0XCI+XFxuJyArXG4gICAgICAgICdcXG4nICtcbiAgICAgICAgJ1xcdCAgXFx0XFx0XFx0XFx0PGZvcm0gYWN0aW9uPVwiL2FjdGlvbl9wYWdlLnBocFwiIGNsYXNzPVwicG9wdXBfZm9ybVwiPlxcbicgK1xuICAgICAgICAnXFx0XFx0XFx0XFx0XFx0ICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgb25jaGFuZ2U9IFwiaW1nY2hhbmdlRnVuY3Rpb24oKVwiIGlkPVwiaW1nX29uZVwiIGNsYXNzPVwicG9wdXBfY2hrYm94IHRvZ2dsZV9faW5wdXRcIiBuYW1lPVwiaW1nX2Noa2JveFwiIHZhbHVlPVwiaW1nX29uZVwiPlxcbicgK1xuICAgICAgICAnXFx0XFx0XFx0XFx0XFx0ICA8bGFiZWwgZm9yPVwiaW1nX29uZVwiPiZuYnNwOyBJbnN0YWxsIEhlZGVyYSBXYWxsZXQ8L2xhYmVsPlxcbicgK1xuICAgICAgICAnXFx0XFx0XFx0XFx0XFx0ICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgb25jaGFuZ2U9IFwiaW1nY2hhbmdlRnVuY3Rpb24oKVwiIGlkPVwiaW1nX3R3b1wiIGNsYXNzPVwicG9wdXBfY2hrYm94IHRvZ2dsZV9faW5wdXRcIiBuYW1lPVwiaW1nX2Noa2JveFwiIHZhbHVlPVwiaW1nX3R3b1wiPlxcbicgK1xuICAgICAgICAnXFx0XFx0XFx0XFx0XFx0ICA8bGFiZWwgZm9yPVwiaW1nX3R3b1wiPiZuYnNwOyBcIlBhaXIgeW91ciBBY2NvdW50XCI8L2xhYmVsPlxcbicgK1xuICAgICAgICAnXFxuJyArXG4gICAgICAgICdcXHRcXHRcXHRcXHRcXHQgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBvbmNoYW5nZT0gXCJpbWdjaGFuZ2VGdW5jdGlvbigpXCIgaWQ9XCJpbWdfdGhyZWVcIiBjbGFzcz1cInBvcHVwX2Noa2JveCB0b2dnbGVfX2lucHV0XCIgbmFtZT1cImltZ19jaGtib3hcIiB2YWx1ZT1cImltZ190aHJlZVwiPlxcbicgK1xuICAgICAgICAnXFx0XFx0XFx0XFx0XFx0ICA8bGFiZWwgZm9yPVwiaW1nX3RocmVlXCI+Jm5ic3A7IFwiQWxsb3cgUGF5bWVudCBSZXF1ZXN0c1wiPC9sYWJlbD5cXG4nICtcbiAgICAgICAgJ1xcbicgK1xuICAgICAgICAnXFx0XFx0XFx0XFx0XFx0ICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgb25jaGFuZ2U9IFwiaW1nY2hhbmdlRnVuY3Rpb24oKVwiIGlkPVwiaW1nX2ZvdXJcIiBjbGFzcz1cInBvcHVwX2Noa2JveCB0b2dnbGVfX2lucHV0XCIgbmFtZT1cImltZ19jaGtib3hcIiB2YWx1ZT1cImltZ19mb3VyXCI+XFxuJyArXG4gICAgICAgICdcXHRcXHRcXHRcXHRcXHQgIDxsYWJlbCBmb3I9XCJpbWdfZm91clwiPiZuYnNwOyBcIkdldCBzb21lIEhCQVJcIjwvbGFiZWw+XFxuJyArXG4gICAgICAgICdcXHRcXHRcXHRcXHRcXHQ8L2Zvcm0+XFxuJyArXG4gICAgICAgICdcXG4nICtcbiAgICAgICAgJ1xcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJwb3B1cF9sb2dvXCI+XFxuJyArXG4gICAgICAgICdcXHRcXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwibG9nb190eHRcIj5Qb3dlcmVkIGJ5PC9kaXY+XFxuJyArXG4gICAgICAgICdcXHRcXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwibG9nb19pY29uXCI+PGltZyBzcmM9XCIvL2FwaS5oYXNoaW5nc3lzdGVtcy5jb20vaW1nL3BvcHVwX2xvZ28ucG5nXCI+PC9kaXY+XFxuJyArXG4gICAgICAgICdcXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXG4nICtcbiAgICAgICAgJ1xcdCAgXFx0XFx0XFx0XFx0XFxuJyArXG4gICAgICAgICdcXHQgIFxcdFxcdFxcdDwvZGl2PlxcbicgK1xuICAgICAgICAnXFx0ICBcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfaW5uZXJfcmlnaHRcIj5cXG4nICtcbiAgICAgICAgJ1xcbicgK1xuICAgICAgICAnXFx0ICBcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfaW1nX3NlY1wiPlxcbicgK1xuICAgICAgICAnXFx0ICBcXHRcXHRcXHRcXHRcXHQ8aW1nIGNsYXNzPVwiaW1nX29uZVwiIHNyYz1cIi8vYXBpLmhhc2hpbmdzeXN0ZW1zLmNvbS9pbWcvaW1nX29uZS5wbmdcIj5cXG4nICtcbiAgICAgICAgJ1xcdCAgXFx0XFx0XFx0XFx0XFx0PGltZyBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCIgY2xhc3M9XCJpbWdfdHdvXCIgc3JjPVwiLy9hcGkuaGFzaGluZ3N5c3RlbXMuY29tL2ltZy9pbWdfdHdvLnBuZ1wiPlxcbicgK1xuICAgICAgICAnXFx0ICBcXHRcXHRcXHRcXHRcXHQ8aW1nIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIiBjbGFzcz1cImltZ190aHJlZVwiIHNyYz1cIi8vYXBpLmhhc2hpbmdzeXN0ZW1zLmNvbS9pbWcvaW1nX3RocmVlLnBuZ1wiPlxcbicgK1xuICAgICAgICAnXFx0ICBcXHRcXHRcXHRcXHRcXHQ8aW1nIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIiBjbGFzcz1cImltZ19mb3VyXCIgc3JjPVwiLy9hcGkuaGFzaGluZ3N5c3RlbXMuY29tL2ltZy9pbWdfZm91ci5wbmdcIj5cXG4nICtcbiAgICAgICAgJ1xcdCAgXFx0XFx0XFx0XFx0PC9kaXY+XFxuJyArXG4gICAgICAgICdcXHQgIFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJ0eHRfd3JhcFwiPlxcbicgK1xuICAgICAgICAnXFx0XFx0ICBcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwidHh0X2hlYWRlclwiPkxldHMgZ2V0IHlvdSBzdGFydGVkITwvZGl2PlxcbicgK1xuICAgICAgICAnXFx0XFx0ICBcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwidHh0X2NvbnRlbnRcIj5Mb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdCwgc2VkIGRvIGVpdXNtb2QgdGVtcG9yIGluY2lkaWR1bnQgdXQgbGFib3JlIGV0IDwvZGl2PlxcbicgK1xuICAgICAgICAnXFx0XFx0ICBcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfYnRuXCI+XFxuJyArXG4gICAgICAgICdcXHRcXHQgIFxcdFxcdFxcdFxcdFxcdDxhIGhyZWY9XCJcIj5JXFwnbSBSZWFkeTwvYT5cXG4nICtcbiAgICAgICAgJ1xcdFxcdCAgXFx0XFx0XFx0XFx0PC9kaXY+XFxuJyArXG4gICAgICAgICdcXHRcXHQgIFxcdFxcdFxcdDwvZGl2PlxcbicgK1xuICAgICAgICAnXFx0ICBcXHRcXHRcXHRcXHRcXG4nICtcbiAgICAgICAgJ1xcdCAgXFx0XFx0XFx0PC9kaXY+XFxuJyArXG4gICAgICAgICdcXHQgIFxcdFxcdDwvZGl2PlxcbicgK1xuICAgICAgICAnXFx0ICBcXHQ8L2Rpdj4nO1xuXG4gICAgdmFyIG15TW9kYWwgPSBuZXcgTW9kYWwoe1xuICAgICAgICBjb250ZW50OiBteUNvbnRlbnRcbiAgICB9KTtcbiAgICBteU1vZGFsLm9wZW4oKTtcbn1cblxuZnVuY3Rpb24gbWFrZVRyYW5zYWN0aW9uKCkge1xuICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgIHRyYW5zYWN0aW9uX3Byb2Nlc2luZzogdHJ1ZSxcbiAgICAgICAgdHJhbnNhY3Rpb25fZmFpbGVkOiBmYWxzZSxcbiAgICAgICAgdHJhbnNhY3Rpb25fc3VjY2VzczogZmFsc2VcbiAgICB9XG5cbiAgICBpZiAoY2hlY2tUcmFuc2FjdGlvbigpKSB7XG5cbiAgICB9XG59XG5cblxuYXBwKHdpbmRvdyk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWluLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIHBpbmcoKSB7XG4gICAgcmV0dXJuICdwb25nJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByZWNoZWNrZXIobikge1xuICAgIGxldCBqc29uID0gezA6IFwiT0tcIiwgMTogXCJJTlZBTElEX1RSQU5TQUNUSU9OXCIsIDI6IFwiUEFZRVJfQUNDT1VOVF9OT1RfRk9VTkRcIiwgMzogXCJJTlZBTElEX05PREVfQUNDT1VOVFwiLCA0OiBcIlRSQU5TQUNUSU9OX0VYUElSRURcIiwgNTogXCJJTlZBTElEX1RSQU5TQUNUSU9OX1NUQVJUXCIsIDY6IFwiSU5WQUxJRF9UUkFOU0FDVElPTl9EVVJBVElPTlwiLCA3OiBcIklOVkFMSURfU0lHTkFUVVJFXCIsIDg6IFwiTUVNT19UT09fTE9OR1wiLCA5OiBcIklOU1VGRklDSUVOVF9UWF9GRUVcIiwgMTA6IFwiSU5TVUZGSUNJRU5UX1BBWUVSX0JBTEFOQ0VcIiwgMTE6IFwiRFVQTElDQVRFX1RSQU5TQUNUSU9OXCIsIDEyOiBcIkJVU1lcIiwgMTM6IFwiTk9UX1NVUFBPUlRFRFwiLCAxNDogXCJJTlZBTElEX0ZJTEVfSURcIiwgMTU6IFwiSU5WQUxJRF9BQ0NPVU5UX0lEXCIsIDE2OiBcIklOVkFMSURfQ09OVFJBQ1RfSURcIiwgMTc6IFwiSU5WQUxJRF9UUkFOU0FDVElPTl9JRFwiLCAxODogXCJSRUNFSVBUX05PVF9GT1VORFwiLCAxOTogXCJSRUNPUkRfTk9UX0ZPVU5EXCIsIDIwOiBcIklOVkFMSURfU09MSURJVFlfSURcIiwgMjE6IFwiVU5LTk9XTlwiLCAyMjogXCJTVUNDRVNTXCIsIDIzOiBcIkZBSUxfSU5WQUxJRFwiLCAyNDogXCJGQUlMX0ZFRVwiLCAyNTogXCJGQUlMX0JBTEFOQ0VcIiwgMjY6IFwiS0VZX1JFUVVJUkVEXCIsIDI3OiBcIkJBRF9FTkNPRElOR1wiLCAyODogXCJJTlNVRkZJQ0lFTlRfQUNDT1VOVF9CQUxBTkNFXCIsIDI5OiBcIklOVkFMSURfU09MSURJVFlfQUREUkVTU1wiLCAzMDogXCJJTlNVRkZJQ0lFTlRfR0FTXCIsIDMxOiBcIkNPTlRSQUNUX1NJWkVfTElNSVRfRVhDRUVERURcIiwgMzI6IFwiTE9DQUxfQ0FMTF9NT0RJRklDQVRJT05fRVhDRVBUSU9OXCIsIDMzOiBcIkNPTlRSQUNUX1JFVkVSVF9FWEVDVVRFRFwiLCAzNDogXCJDT05UUkFDVF9FWEVDVVRJT05fRVhDRVBUSU9OXCIsIDM1OiBcIklOVkFMSURfUkVDRUlWSU5HX05PREVfQUNDT1VOVFwiLCAzNjogXCJNSVNTSU5HX1FVRVJZX0hFQURFUlwiLCAzNzogXCJBQ0NPVU5UX1VQREFURV9GQUlMRURcIiwgMzg6IFwiSU5WQUxJRF9LRVlfRU5DT0RJTkdcIiwgMzk6IFwiTlVMTF9TT0xJRElUWV9BRERSRVNTXCIsIDQwOiBcIkNPTlRSQUNUX1VQREFURV9GQUlMRURcIiwgNDE6IFwiSU5WQUxJRF9RVUVSWV9IRUFERVJcIiwgNDI6IFwiSU5WQUxJRF9GRUVfU1VCTUlUVEVEXCIsIDQzOiBcIklOVkFMSURfUEFZRVJfU0lHTkFUVVJFXCIsIDQ0OiBcIktFWV9OT1RfUFJPVklERURcIiwgNDU6IFwiSU5WQUxJRF9FWFBJUkFUSU9OX1RJTUVcIiwgNDY6IFwiTk9fV0FDTF9LRVlcIiwgNDc6IFwiRklMRV9DT05URU5UX0VNUFRZXCIsIDQ4OiBcIklOVkFMSURfQUNDT1VOVF9BTU9VTlRTXCIsIDQ5OiBcIkVNUFRZX1RSQU5TQUNUSU9OX0JPRFlcIiwgNTA6IFwiSU5WQUxJRF9UUkFOU0FDVElPTl9CT0RZXCIsIDUxOiBcIklOVkFMSURfU0lHTkFUVVJFX1RZUEVfTUlTTUFUQ0hJTkdfS0VZXCIsIDUyOiBcIklOVkFMSURfU0lHTkFUVVJFX0NPVU5UX01JU01BVENISU5HX0tFWVwiLCA1MzogXCJFTVBUWV9DTEFJTV9CT0RZXCIsIDU0OiBcIkVNUFRZX0NMQUlNX0hBU0hcIiwgNTU6IFwiRU1QVFlfQ0xBSU1fS0VZU1wiLCA1NjogXCJJTlZBTElEX0NMQUlNX0hBU0hfU0laRVwiLCA1NzogXCJFTVBUWV9RVUVSWV9CT0RZXCIsIDU4OiBcIkVNUFRZX0NMQUlNX1FVRVJZXCIsIDU5OiBcIkNMQUlNX05PVF9GT1VORFwiLCA2MDogXCJBQ0NPVU5UX0lEX0RPRVNfTk9UX0VYSVNUXCIsIDYxOiBcIkNMQUlNX0FMUkVBRFlfRVhJU1RTXCIsIDYyOiBcIklOVkFMSURfRklMRV9XQUNMXCIsIDYzOiBcIlNFUklBTElaQVRJT05fRkFJTEVEXCIsIDY0OiBcIlRSQU5TQUNUSU9OX09WRVJTSVpFXCIsIDY1OiBcIlRSQU5TQUNUSU9OX1RPT19NQU5ZX0xBWUVSU1wiLCA2NjogXCJDT05UUkFDVF9ERUxFVEVEXCIsIDY3OiBcIlBMQVRGT1JNX05PVF9BQ1RJVkVcIiwgNjg6IFwiS0VZX1BSRUZJWF9NSVNNQVRDSFwiLCA2OTogXCJQTEFURk9STV9UUkFOU0FDVElPTl9OT1RfQ1JFQVRFRFwiLCA3MDogXCJJTlZBTElEX1JFTkVXQUxfUEVSSU9EXCIsIDcxOiBcIklOVkFMSURfUEFZRVJfQUNDT1VOVF9JRFwiLCA3MjogXCJBQ0NPVU5UX0RFTEVURURcIiwgNzM6IFwiRklMRV9ERUxFVEVEXCIsIDc0OiBcIkFDQ09VTlRfUkVQRUFURURfSU5fQUNDT1VOVF9BTU9VTlRTXCIsIDc1OiBcIlNFVFRJTkdfTkVHQVRJVkVfQUNDT1VOVF9CQUxBTkNFXCIsIDc2OiBcIk9CVEFJTkVSX1JFUVVJUkVEXCIsIDc3OiBcIk9CVEFJTkVSX1NBTUVfQ09OVFJBQ1RfSURcIiwgNzg6IFwiT0JUQUlORVJfRE9FU19OT1RfRVhJU1RcIiwgNzk6IFwiTU9ESUZZSU5HX0lNTVVUQUJMRV9DT05UUkFDVFwiLCA4MDogXCJGSUxFX1NZU1RFTV9FWENFUFRJT05cIiwgODE6IFwiQVVUT1JFTkVXX0RVUkFUSU9OX05PVF9JTl9SQU5HRVwiLCA4MjogXCJFUlJPUl9ERUNPRElOR19CWVRFU1RSSU5HXCIsIDgzOiBcIkNPTlRSQUNUX0ZJTEVfRU1QVFlcIiwgODQ6IFwiQ09OVFJBQ1RfQllURUNPREVfRU1QVFlcIiwgODU6IFwiSU5WQUxJRF9JTklUSUFMX0JBTEFOQ0VcIiwgODY6IFwiSU5WQUxJRF9SRUNFSVZFX1JFQ09SRF9USFJFU0hPTERcIiwgODc6IFwiSU5WQUxJRF9TRU5EX1JFQ09SRF9USFJFU0hPTERcIiwgODg6IFwiQUNDT1VOVF9JU19OT1RfR0VORVNJU19BQ0NPVU5UXCJ9XG4gICAgIHJldHVybiBqc29uW25dO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2VzLmpzIiwiLy8gRGVmaW5lIG91ciBjb25zdHJ1Y3RvclxuZnVuY3Rpb24gTW9kYWwoKSB7XG4gICAgLy8gQ3JlYXRlIGdsb2JhbCBlbGVtZW50IHJlZmVyZW5jZXNcbiAgICB0aGlzLmNsb3NlQnV0dG9uID0gbnVsbDtcbiAgICB0aGlzLm1vZGFsID0gbnVsbDtcbiAgICB0aGlzLm92ZXJsYXkgPSBudWxsO1xuXG4gICAgLy8gRGV0ZXJtaW5lIHByb3BlciBwcmVmaXhcbiAgICB0aGlzLnRyYW5zaXRpb25FbmQgPSB0cmFuc2l0aW9uU2VsZWN0KCk7XG5cbiAgICAvLyBEZWZpbmUgb3B0aW9uIGRlZmF1bHRzXG4gICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICBhdXRvT3BlbjogZmFsc2UsXG4gICAgICAgIGNsYXNzTmFtZTogJ2ZhZGUtYW5kLWRyb3AnLFxuICAgICAgICBjbG9zZUJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgY29udGVudDogXCJcIixcbiAgICAgICAgbWF4V2lkdGg6IDYwMCxcbiAgICAgICAgbWluV2lkdGg6IDI4MCxcbiAgICAgICAgb3ZlcmxheTogZmFsc2VcbiAgICB9O1xuXG4gICAgLy8gQ3JlYXRlIG9wdGlvbnMgYnkgZXh0ZW5kaW5nIGRlZmF1bHRzIHdpdGggdGhlIHBhc3NlZCBpbiBhcnVnbWVudHNcbiAgICBpZiAoYXJndW1lbnRzWzBdICYmIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gZXh0ZW5kRGVmYXVsdHMoZGVmYXVsdHMsIGFyZ3VtZW50c1swXSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvT3BlbiA9PT0gdHJ1ZSkgdGhpcy5vcGVuKCk7XG5cbn1cblxuLy8gUHVibGljIE1ldGhvZHNcbk1vZGFsLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgXyA9IHRoaXM7XG4gICAgdGhpcy5tb2RhbC5jbGFzc05hbWUgPSB0aGlzLm1vZGFsLmNsYXNzTmFtZS5yZXBsYWNlKFwiIGhhc2gtb3BlblwiLCBcIlwiKTtcbiAgICB0aGlzLm92ZXJsYXkuY2xhc3NOYW1lID0gdGhpcy5vdmVybGF5LmNsYXNzTmFtZS5yZXBsYWNlKFwiIGhhc2gtb3BlblwiLCBcIlwiKTtcbiAgICB0aGlzLm1vZGFsLmFkZEV2ZW50TGlzdGVuZXIodGhpcy50cmFuc2l0aW9uRW5kLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF8ubW9kYWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChfLm1vZGFsKTtcbiAgICB9KTtcbiAgICB0aGlzLm92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLnRyYW5zaXRpb25FbmQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKF8ub3ZlcmxheS5wYXJlbnROb2RlKSBfLm92ZXJsYXkucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChfLm92ZXJsYXkpO1xuICAgIH0pO1xufTtcblxuTW9kYWwucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgYnVpbGRPdXQuY2FsbCh0aGlzKTtcbiAgICBpbml0aWFsaXplRXZlbnRzLmNhbGwodGhpcyk7XG4gICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5tb2RhbCkuaGVpZ2h0O1xuICAgIHRoaXMubW9kYWwuY2xhc3NOYW1lID0gdGhpcy5tb2RhbC5jbGFzc05hbWUgKyAodGhpcy5tb2RhbC5vZmZzZXRIZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQgPyBcIiBoYXNoLW9wZW4gaGFzaC1hbmNob3JlZFwiIDogXCIgaGFzaC1vcGVuXCIpO1xuICAgIC8vdGhpcy5vdmVybGF5LmNsYXNzTmFtZSA9IHRoaXMub3ZlcmxheS5jbGFzc05hbWUgKyBcIiBoYXNoLW9wZW5cIjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfY2xvc2UnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9vdXRlcl93cmFwJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH07XG59O1xuXG4vLyBQcml2YXRlIE1ldGhvZHNcbmZ1bmN0aW9uIGJ1aWxkT3V0KCkge1xuXG4gICAgdmFyIGNvbnRlbnQsIGNvbnRlbnRIb2xkZXIsIGRvY0ZyYWc7XG5cbiAgICAvKlxuICAgICAqIElmIGNvbnRlbnQgaXMgYW4gSFRNTCBzdHJpbmcsIGFwcGVuZCB0aGUgSFRNTCBzdHJpbmcuXG4gICAgICogSWYgY29udGVudCBpcyBhIGRvbU5vZGUsIGFwcGVuZCBpdHMgY29udGVudC5cbiAgICAgKi9cblxuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLmNvbnRlbnQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgY29udGVudCA9IHRoaXMub3B0aW9ucy5jb250ZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRlbnQgPSB0aGlzLm9wdGlvbnMuY29udGVudC5pbm5lckhUTUw7XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIGEgRG9jdW1lbnRGcmFnbWVudCB0byBidWlsZCB3aXRoXG4gICAgZG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgIC8vIENyZWF0ZSBtb2RhbCBlbGVtZW50XG4gICAgdGhpcy5tb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5tb2RhbC5jbGFzc05hbWUgPSBcImhhc2gtbW9kYWwgXCIgKyB0aGlzLm9wdGlvbnMuY2xhc3NOYW1lO1xuICAgIC8qdGhpcy5tb2RhbC5zdHlsZS5taW5XaWR0aCA9IHRoaXMub3B0aW9ucy5taW5XaWR0aCArIFwicHhcIjtcbiAgICB0aGlzLm1vZGFsLnN0eWxlLm1heFdpZHRoID0gdGhpcy5vcHRpb25zLm1heFdpZHRoICsgXCJweFwiOyovXG5cbiAgICAvLyBJZiBjbG9zZUJ1dHRvbiBvcHRpb24gaXMgdHJ1ZSwgYWRkIGEgY2xvc2UgYnV0dG9uXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jbG9zZUJ1dHRvbiA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcHVwLWNsb3NlLWJ0bicpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNsb3NlQnV0dG9uKVxuICAgIH1cblxuICAgIC8vIENyZWF0ZSBjb250ZW50IGFyZWEgYW5kIGFwcGVuZCB0byBtb2RhbFxuICAgIGNvbnRlbnRIb2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnRlbnRIb2xkZXIuY2xhc3NOYW1lID0gXCJoYXNoLWNvbnRlbnRcIjtcbiAgICBjb250ZW50SG9sZGVyLmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgdGhpcy5tb2RhbC5hcHBlbmRDaGlsZChjb250ZW50SG9sZGVyKTtcblxuICAgIC8vIEFwcGVuZCBtb2RhbCB0byBEb2N1bWVudEZyYWdtZW50XG4gICAgZG9jRnJhZy5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsKTtcblxuICAgIC8vIEFwcGVuZCBEb2N1bWVudEZyYWdtZW50IHRvIGJvZHlcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvY0ZyYWcpO1xuXG59XG5cbmltZ2NoYW5nZUZ1bmN0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjaGJveHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShcImltZ19jaGtib3hcIik7XG4gICAgdmFyIHZhcl9jaGVjayA9IFwiXCI7XG5cbiAgICB2YXIgaW1nX2FsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJpbWdfYWxsXCIpO1xuXG4gICAgZm9yKHZhciBpPTA7aTxjaGJveHMubGVuZ3RoO2krKykge1xuICAgICAgICBpZihjaGJveHNbaV0uY2hlY2tlZCl7XG4gICAgICAgICAgICB2YXJfY2hlY2sgPSB2YXJfY2hlY2suY29uY2F0KGNoYm94c1tpXS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZih2YXJfY2hlY2sgPT0gJ2ltZ19vbmUnKXtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ190d28nKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfdGhyZWUnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfZm91cicpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ19vbmUnKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBpZih2YXJfY2hlY2sgPT0gJ2ltZ19vbmVpbWdfdHdvJykge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX29uZScpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ190aHJlZScpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ19mb3VyJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX3R3bycpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIGlmKHZhcl9jaGVjayA9PSAnaW1nX29uZWltZ190d29pbWdfdGhyZWUnKXtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ19vbmUnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfdHdvJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX2ZvdXInKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfdGhyZWUnKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBpZih2YXJfY2hlY2sgPT0gJ2ltZ19vbmVpbWdfdHdvaW1nX3RocmVlaW1nX2ZvdXInKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfb25lJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX3R3bycpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ190aHJlZScpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ19mb3VyJykuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBleHRlbmREZWZhdWx0cyhzb3VyY2UsIHByb3BlcnRpZXMpIHtcbiAgICB2YXIgcHJvcGVydHk7XG4gICAgZm9yIChwcm9wZXJ0eSBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICAgICAgc291cmNlW3Byb3BlcnR5XSA9IHByb3BlcnRpZXNbcHJvcGVydHldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2U7XG59XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVFdmVudHMoKSB7XG4gICAgY29uc29sZS5sb2coXCJ0ZXN0XCIpXG4gICAgY29uc29sZS5sb2codGhpcy5jbG9zZUJ1dHRvbilcbiAgICBpZiAodGhpcy5jbG9zZUJ1dHRvbikge1xuICAgICAgICBjb25zb2xlLmxvZyhcInRlc3RcIik7XG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm92ZXJsYXkpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gdHJhbnNpdGlvblNlbGVjdCgpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGlmIChlbC5zdHlsZS5XZWJraXRUcmFuc2l0aW9uKSByZXR1cm4gXCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCI7XG4gICAgaWYgKGVsLnN0eWxlLk9UcmFuc2l0aW9uKSByZXR1cm4gXCJvVHJhbnNpdGlvbkVuZFwiO1xuICAgIHJldHVybiAndHJhbnNpdGlvbmVuZCc7XG59XG5cbi8vZXhwb3J0aW5nIG1vZHVsZVxubW9kdWxlLmV4cG9ydHMuTW9kYWwgPSBNb2RhbDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb2RhbC5qcyIsImV4cG9ydCBmdW5jdGlvbiBtZXRob2RzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAgIC8vb2JqZWN0IGNyZWF0aW9uIG1ldGhvZHNcbiAgICAgICAgJ2NyZWF0ZWhlZGVyYW9iamVjdCcsICdjcmVhdGVjb250cmFjdG9iamVjdCcsXG5cbiAgICAgICAgLy9tYWluIGluaXRpYWwgbWV0aG9kXG4gICAgICAgICdpbml0JyxcblxuICAgICAgICAvL3RyYW5zYWN0aW9uIHJlbGF0ZWQgbWV0aG9kc1xuICAgICAgICAnbWFrZXBheW1lbnQnLCAnbWFrZVRyYW5zYWN0aW9uJywgJ2NoZWNrdHJhbnNhY3Rpb24nLFxuXG4gICAgICAgIC8vbW9kYWwgcmVsYXRlZCBtZXRob2RzXG4gICAgICAgICdnZXRtb2RhbCdcbiAgICBdO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21ldGhvZHMuanMiXSwic291cmNlUm9vdCI6IiJ9