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
  var myContent = '<div class="popup_outer_wrap">\n' + '\t  \t<div class="popup_wrap">\n' + '\t  \t\t<div class="popup_header">Setup Task <a href="javascript:void(0)" class="popup_close">x</a></div>\n' + '\n' + '\t  \t\t<div class="popup_inner">\n' + '\t  \t\t\t<div class="popup_inner_left">\n' + '\n' + '\t  \t\t\t\t<form action="/action_page.php" class="popup_form">\n' + '\t\t\t\t\t  <input type="checkbox" id="img_one" class="popup_chkbox toggle__input" name="img_one" value="img_one" checked>\n' + '\t\t\t\t\t  <label for="img_one">&nbsp; Install Hedera Wallet</label>\n' + '\t\t\t\t\t  <input type="checkbox" id="img_two" class="popup_chkbox toggle__input" name="img_two" value="img_two">\n' + '\t\t\t\t\t  <label for="img_two">&nbsp; "Pair your Account"</label>\n' + '\n' + '\t\t\t\t\t  <input type="checkbox" id="img_three" class="popup_chkbox toggle__input" name="img_three" value="img_three">\n' + '\t\t\t\t\t  <label for="img_three">&nbsp; "Allow Payment Requests"</label>\n' + '\n' + '\t\t\t\t\t  <input type="checkbox" id="img_four" class="popup_chkbox toggle__input" name="img_four" value="img_four">\n' + '\t\t\t\t\t  <label for="img_four">&nbsp; "Get some HBAR"</label>\n' + '\t\t\t\t\t</form>\n' + '\n' + '\t\t\t\t\t<div class="popup_logo">\n' + '\t\t\t\t\t\t<div class="logo_txt">Powered by</div>\n' + '\t\t\t\t\t\t<div class="logo_icon"><img src="img/popup_logo.png"></div>\n' + '\t\t\t\t\t</div>\n' + '\t  \t\t\t\t\n' + '\t  \t\t\t</div>\n' + '\t  \t\t\t<div class="popup_inner_right">\n' + '\n' + '\t  \t\t\t\t<div class="popup_img_sec">\n' + '\t  \t\t\t\t\t<img class="img_one" src="http://localhost/hash-model/img/img_one.png">\n' + '\t  \t\t\t\t\t<img style="display: none;" class="img_two" src="http://localhost/hash-model/img/img_two.png">\n' + '\t  \t\t\t\t\t<img style="display: none;" class="img_three" src="http://localhost/hash-model/img/img_three.png">\n' + '\t  \t\t\t\t\t<img style="display: none;" class="img_four" src="http://localhost/hash-model/img/img_four.png">\n' + '\t  \t\t\t\t</div>\n' + '\t  \t\t\t\t<div class="txt_wrap">\n' + '\t\t  \t\t\t\t<div class="txt_header">Lets get you started!</div>\n' + '\t\t  \t\t\t\t<div class="txt_content">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et </div>\n' + '\t\t  \t\t\t\t<div class="popup_btn">\n' + '\t\t  \t\t\t\t\t<a href="">I\'m Ready</a>\n' + '\t\t  \t\t\t\t</div>\n' + '\t\t  \t\t\t</div>\n' + '\t  \t\t\t\t\n' + '\t  \t\t\t</div>\n' + '\t  \t\t</div>\n' + '\t  \t</div>\n' + '\t</div>\n';
  var myModal = new Modal({
    content: myContent
  }); //var triggerButton = document.getElementById('trigger');

  /*triggerButton.addEventListener('click', function() {
      myModal.open();
  });*/
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
/* unused harmony export modal */
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Create an immediately invoked functional expression to wrap our code
function modal() {
  // Define our constructor
  this.Modal = function () {
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
  }; // Public Methods


  Modal.prototype.close = function () {
    var _ = this;

    this.modal.className = this.modal.className.replace(" scotch-open", "");
    this.overlay.className = this.overlay.className.replace(" scotch-open", "");
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
    this.modal.className = this.modal.className + (this.modal.offsetHeight > window.innerHeight ? " scotch-open scotch-anchored" : " scotch-open");
    this.overlay.className = this.overlay.className + " scotch-open";
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
    this.modal.className = "scotch-modal " + this.options.className;
    this.modal.style.minWidth = this.options.minWidth + "px";
    this.modal.style.maxWidth = this.options.maxWidth + "px"; // If closeButton option is true, add a close button

    if (this.options.closeButton === true) {
      this.closeButton = document.createElement("button");
      this.closeButton.className = "scotch-close close-button";
      this.closeButton.innerHTML = "&times;";
      this.modal.appendChild(this.closeButton);
    } // If overlay is true, add one


    if (this.options.overlay === true) {
      this.overlay = document.createElement("div");
      this.overlay.className = "scotch-overlay " + this.options.className;
      docFrag.appendChild(this.overlay);
    } // Create content area and append to modal


    contentHolder = document.createElement("div");
    contentHolder.className = "scotch-content";
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
  }
}
; //var myContent = document.getElementById('content');

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzgzNGZkM2MyYzhjMTkyOTFhNjUiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2RhbC5qcyJdLCJuYW1lcyI6WyJzdXBwb3J0ZWRBUEkiLCJwcm9kdWN0aW9uIiwiYXBwIiwid2luZG93IiwiY29uc29sZSIsImxvZyIsInRvZGF5IiwiRGF0ZSIsImRhdGUiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsInRpbWUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJkYXRlVGltZSIsInRpbWVzdGFtcCIsImdldFRpbWUiLCJjb25maWd1cmF0aW9ucyIsInBheW1lbnRzZXJ2ZXIiLCJleHRlbnNpb25pZCIsImVycm9yIiwidHlwZSIsIm5vdyIsInJlZGlyZWN0IiwiaWQiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwic3VibWlzc2lvbm5vZGUiLCJtZW1vIiwicmVjaXBpZW50bGlzdCIsImNvbnRlbnRpZCIsImF0dHJJRCIsImdsb2JhbE9iamVjdCIsInF1ZXVlIiwicSIsImkiLCJsZW5ndGgiLCJ0b0xvd2VyQ2FzZSIsImV4dGVuZE9iamVjdCIsImNyZWF0ZUhlZGVyYU9iamVjdCIsImNoZWNrRm9yRXh0ZW5zaW9uIiwiYXBpSGFuZGxlciIsImNhbGxiYWNrIiwiaXNDaHJvbWUiLCJyZWRpcmVjdFRvRXJyb3IiLCJ0YWdzIiwiYW1vdW50IiwiRVhURU5TSU9OX0lEIiwiZGV0ZWN0IiwicmVzcG9uc2UiLCJyZWNvcmRSZXNwb25zZSIsImV4dGVuc2lvbklkIiwibm90SW5zdGFsbGVkQ2FsbGJhY2siLCJpbnN0YWxsZWRDYWxsYmFjayIsImltZyIsIkltYWdlIiwib25lcnJvciIsIm9ubG9hZCIsInNyYyIsInJlcyIsImJvZHkiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwiZXJyIiwicmVwbGFjZSIsIm9yaWdpbiIsImNvbmZpZ3VyYXRpb24iLCJhcGkiLCJwYXJhbXMiLCJFcnJvciIsImluZGV4T2YiLCJjaGVja1RyYW5zYWN0aW9uIiwiY3JlYXRlQ29udHJhY3RPYmplY3QiLCJpbml0IiwiZ2V0bW9kYWwiLCJ3YXJuIiwiYSIsImIiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsIm9iamVjdCIsIkhlZGVyYW9iamVjdCIsIm5vZGUiLCJnZXRFbGVtZW50QnlJZCIsIl9fY29uc3RydWN0IiwiY29udHJhY3RpZCIsIm1heGltdW0iLCJhYmkiLCJKU09OIiwic3RyaW5naWZ5IiwicGFyc2UiLCJleHRlbmRlZCIsIkNvbnRyYWN0b2JqZWN0IiwibWVtb19pZCIsInVybCIsInN0cnVjdHVyZSIsImJhc2V1cmwiLCJyZWNlaXZlcl9pZCIsInN1Y2Nlc3MiLCJmYWlsdXJlIiwidGltZW91dCIsImxpbWl0IiwiVVJMIiwic2V0VGltZW91dCIsInBlcmZvcm1SZXF1ZXN0IiwieGh0dHAiLCJYTUxIdHRwUmVxdWVzdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJub2RlcHJlY2hlY2siLCJwcmVjaGVja2VyIiwib3BlbiIsInNlbmQiLCJpc2Nocm9tZSIsImFjY291bnRQYWlyZWQiLCJpc21vYmlsZSIsInZhbGlkQnJvd3NlciIsImV4dGVuc2lvbkluc3RhbGxlZCIsImFjY2Vzc1RvQWNjb3VudHMiLCJhY2NvdW50SWQiLCJzdWJtaXNzaW9uTm9kZSIsInR4bl9zdWNjZXNzIiwiY2hlY2tJc0Nocm9tZSIsIm1vYiIsImRldGVjdG1vYiIsImFqYXhyZXNwIiwic2VuZGVyIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwibWF0Y2giLCJteUNvbnRlbnQiLCJteU1vZGFsIiwiTW9kYWwiLCJjb250ZW50IiwicGluZyIsIm4iLCJqc29uIiwibW9kYWwiLCJjbG9zZUJ1dHRvbiIsIm92ZXJsYXkiLCJ0cmFuc2l0aW9uRW5kIiwidHJhbnNpdGlvblNlbGVjdCIsImRlZmF1bHRzIiwiYXV0b09wZW4iLCJjbGFzc05hbWUiLCJtYXhXaWR0aCIsIm1pbldpZHRoIiwiYXJndW1lbnRzIiwib3B0aW9ucyIsImV4dGVuZERlZmF1bHRzIiwicHJvdG90eXBlIiwiY2xvc2UiLCJfIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImJ1aWxkT3V0IiwiY2FsbCIsImluaXRpYWxpemVFdmVudHMiLCJnZXRDb21wdXRlZFN0eWxlIiwiaGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJjb250ZW50SG9sZGVyIiwiZG9jRnJhZyIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJhcHBlbmRDaGlsZCIsInNvdXJjZSIsInByb3BlcnRpZXMiLCJwcm9wZXJ0eSIsImJpbmQiLCJlbCIsIldlYmtpdFRyYW5zaXRpb24iLCJPVHJhbnNpdGlvbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUFBO0FBQUE7QUFBQTtDQU1BOztBQUNBLElBQU1BLFlBQVksR0FBRyxDQUFDLGFBQUQsRUFBZ0IsTUFBaEIsRUFBd0Isb0JBQXhCLEVBQThDLGtCQUE5QyxFQUFrRSxVQUFsRSxFQUNqQixzQkFEaUIsRUFDTyxNQURQLEVBQ2Us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QjtBQUN4QixRQUFJZ0MsRUFBRSxHQUFHbEgsUUFBUSxDQUFDMkcsYUFBVCxDQUF1QixLQUF2QixDQUFUO0FBQ0EsUUFBSU8sRUFBRSxDQUFDTixLQUFILENBQVNPLGdCQUFiLEVBQStCLE9BQU8scUJBQVA7QUFDL0IsUUFBSUQsRUFBRSxDQUFDTixLQUFILENBQVNRLFdBQWIsRUFBMEIsT0FBTyxnQkFBUDtBQUMxQixXQUFPLGVBQVA7QUFDSDtBQUVKO0FBQUEsQyxDQUVELHFEIiwiZmlsZSI6IndpZGdldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDc4MzRmZDNjMmM4YzE5MjkxYTY1IiwiaW1wb3J0IHtcbiAgICBwaW5nLCBwcmVjaGVja2VyXG59IGZyb20gJy4vc2VydmljZXMnXG5cbmltcG9ydCBtb2RhbCBmcm9tICcuL21vZGFsJztcblxuLy8gZW5saXN0IGFsbCBtZXRob2RzIHN1cHBvcnRlZCBieSBBUEkgKGUuZy4gYG13KCdldmVudCcsICd1c2VyLWxvZ2luJyk7YClcbmNvbnN0IHN1cHBvcnRlZEFQSSA9IFsnbWFrZXBheW1lbnQnLCAndGVzdCcsICdjcmVhdGVoZWRlcmFvYmplY3QnLCAnY2hlY2t0cmFuc2FjdGlvbicsICdnZXRtb2RhbCcsXG4gICAgJ2NyZWF0ZWNvbnRyYWN0b2JqZWN0JywgJ2luaXQnLCAndHJhbnNhY3Rpb25ub2RlY2hlY2tlciddO1xuLyoqXG4gVGhlIG1haW4gZW50cnkgb2YgdGhlIGFwcGxpY2F0aW9uXG4gKi9cbmNvbnN0IHByb2R1Y3Rpb24gPSB0cnVlO1xuXG5mdW5jdGlvbiBhcHAod2luZG93KSB7XG4gICAgY29uc29sZS5sb2coJ0hBU0gtSlMgc3RhcnRpbmcnKTtcbiAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpLFxuICAgICAgICBkYXRlID0gdG9kYXkuZ2V0RnVsbFllYXIoKSArICctJyArICh0b2RheS5nZXRNb250aCgpICsgMSkgKyAnLScgKyB0b2RheS5nZXREYXRlKCksXG4gICAgICAgIHRpbWUgPSB0b2RheS5nZXRIb3VycygpICsgXCI6XCIgKyB0b2RheS5nZXRNaW51dGVzKCksXG4gICAgICAgIGRhdGVUaW1lID0gZGF0ZSArICcgJyArIHRpbWUsXG4gICAgICAgIHRpbWVzdGFtcCA9IG5ldyBEYXRlKGRhdGVUaW1lKS5nZXRUaW1lKCk7XG5cbiAgICBsZXQgY29uZmlndXJhdGlvbnMgPSB7XG4gICAgICAgIHBheW1lbnRzZXJ2ZXI6IHByb2R1Y3Rpb24gPyBcImh0dHBzOi8vbXBzLmhhc2hpbmdzeXN0ZW1zLmNvbVwiIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6OTk5OScsXG4gICAgICAgIGV4dGVuc2lvbmlkOiBcImxpZ3Bhb25kYWFiY2xmaWdhZ2NpZm9iYWVsZW1pZW5hXCIsXG4gICAgICAgIGVycm9yOiBcIi9uby1leHRlbnNpb25cIixcbiAgICAgICAgdHlwZTogXCJhcnRpY2xlXCIsXG4gICAgICAgIHRpbWU6IERhdGUubm93KCksXG4gICAgICAgIHJlZGlyZWN0OiAneyBcIm5vblBheWluZ0FjY291bnRcIjogXCIvaW5zdWZmaWNpZW50LWFtb3VudC9cIiwgXCJub0FjY291bnRcIjogXCIvYWNjb3VudC1ub3QtcGFpcmVkL1wiLCBcImhvbWVQYWdlXCI6IFwiL1wifScsXG4gICAgICAgIC8vIHRoaXMgbWlnaHQgbWFrZSBhIGdvb2QgZGVmYXVsdCBpZCBmb3IgdGhlIGNvbnRlbnRcbiAgICAgICAgaWQ6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgICAgc3VibWlzc2lvbm5vZGU6IFwiMC4wLjExXCIsXG4gICAgICAgIG1lbW86IERhdGUubm93KCksXG4gICAgICAgIHJlY2lwaWVudGxpc3Q6ICdbeyBcInRvXCI6IFwiMC4wLjk5XCIsIFwidGlueWJhcnNcIjogXCIxNjY2NjY3XCIgfV0nLFxuICAgICAgICBjb250ZW50aWQ6ICc3OScsXG4gICAgICAgIGF0dHJJRDogJ2FydGljbGUtMScsXG4gICAgICAgIHRpbWVzdGFtcDogdGltZXN0YW1wLFxuICAgICAgICAvL3JlZGlyZWN0Oid7IFwibm9uUGF5aW5nQWNjb3VudFwiOiBcIi9pbnN1ZmZpY2llbnQtYW1vdW50L1wiLCBcIm5vQWNjb3VudFwiOiBcIi9hY2NvdW50LW5vdC1wYWlyZWQvXCIsIFwiaG9tZVBhZ2VcIjogXCIvXCIgfScsXG4gICAgfTtcbiAgICAvLyBhbGwgbWV0aG9kcyB0aGF0IHdlcmUgY2FsbGVkIHRpbGwgbm93IGFuZCBzdG9yZWQgaW4gcXVldWVcbiAgICAvLyBuZWVkcyB0byBiZSBjYWxsZWQgbm93XG4gICAgbGV0IGdsb2JhbE9iamVjdCA9IHdpbmRvd1t3aW5kb3dbJ0hBU0gtSlMnXV07XG4gICAgbGV0IHF1ZXVlID0gZ2xvYmFsT2JqZWN0LnE7XG4gICAgaWYgKHF1ZXVlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcXVldWVbaV1bMF0gIT09ICd1bmRlZmluZWQnICYmIHF1ZXVlW2ldWzBdLnRvTG93ZXJDYXNlKCkgPT0gJ21ha2VwYXltZW50Jykge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25zID0gZXh0ZW5kT2JqZWN0KGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgICAgICAgICAgY3JlYXRlSGVkZXJhT2JqZWN0KGNvbmZpZ3VyYXRpb25zKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSEFTSC1KUyBzdGFydGVkJywgY29uZmlndXJhdGlvbnMpO1xuICAgICAgICAgICAgICAgIGNoZWNrRm9yRXh0ZW5zaW9uKGNvbmZpZ3VyYXRpb25zKVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcXVldWVbaV1bMF0gIT09ICd1bmRlZmluZWQnICYmIHF1ZXVlW2ldWzBdLnRvTG93ZXJDYXNlKCkgPT0gJ2NyZWF0ZWNvbnRyYWN0b2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25zID0gZXh0ZW5kT2JqZWN0KGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgICAgICAgICAgYXBpSGFuZGxlcihjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMF0sIHF1ZXVlW2ldWzFdLCBxdWV1ZVtpXVsyXSk7XG4gICAgICAgICAgICAgICAgY2hlY2tGb3JFeHRlbnNpb24oY29uZmlndXJhdGlvbnMpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBjYWxsYmFjaztcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHF1ZXVlW2ldWzFdID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBxdWV1ZVtpXVsxXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayA9IHF1ZXVlW2ldW3F1ZXVlWzBdLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9ucyA9IGV4dGVuZE9iamVjdChjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMV0pO1xuICAgICAgICAgICAgICAgIGFwaUhhbmRsZXIoY29uZmlndXJhdGlvbnMsIHF1ZXVlW2ldWzBdLCBxdWV1ZVtpXVsxXSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIG92ZXJyaWRlIHRlbXBvcmFyeSAodW50aWwgdGhlIGFwcCBsb2FkZWQpIGhhbmRsZXJcbiAgICAvLyBmb3Igd2lkZ2V0J3MgQVBJIGNhbGxzXG4gICAgZ2xvYmFsT2JqZWN0ID0gYXBpSGFuZGxlcjtcbiAgICBnbG9iYWxPYmplY3QuY29uZmlndXJhdGlvbnMgPSBjb25maWd1cmF0aW9ucztcbn1cblxuZnVuY3Rpb24gY2hlY2tGb3JFeHRlbnNpb24oY29uZmlndXJhdGlvbnMpIHtcbiAgICBpZiAoIWlzQ2hyb21lKCkpIHtcbiAgICAgICAgcmVkaXJlY3RUb0Vycm9yKCcvaXNub3RDaHJvbWUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgdGFncyA9IGNvbmZpZ3VyYXRpb25zO1xuICAgICAgICAvLyBpZiB0YWdzLmFtb3VudCBpcyBudWxsIG9yIHVuZGVmaW5lZCwgd2Ugc2hvdWxkIGFzc3VtZSB0aGF0IHRoaXMgaXMgYSBmcmVlIHBhZ2UgYW5kIGRvIG5vdGhpbmcgbW9yZVxuICAgICAgICBpZiAodGFncy5hbW91bnQgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBFWFRFTlNJT05fSUQgPSB0YWdzLmV4dGVuc2lvbmlkO1xuXG4gICAgICAgIGRldGVjdChFWFRFTlNJT05fSUQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJlZGlyZWN0VG9FcnJvcih0YWdzLmVycm9yKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZGV0ZWN0OiB1c2VyIGhhcyBleHRlbnNpb24gaW5zdGFsbGVkJyk7XG4gICAgICAgICAgICByZWNvcmRSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coY2hyb21lLnJ1bnRpbWUuY29ubmVjdChFWFRFTlNJT05fSUQsJ3ZlcnNpb24nKSk7XG4gICAgICAgIC8qY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoRVhURU5TSU9OX0lELCAndmVyc2lvbicsIHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJlZGlyZWN0VG9FcnJvcih0YWdzLmVycm9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVjb3JkUmVzcG9uc2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSovXG4gICAgfVxufVxuXG5mdW5jdGlvbiBkZXRlY3QoZXh0ZW5zaW9uSWQsIG5vdEluc3RhbGxlZENhbGxiYWNrLCBpbnN0YWxsZWRDYWxsYmFjaykge1xuICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBjb25zb2xlLmxvZyhleHRlbnNpb25JZCk7XG4gICAgaW1nLm9uZXJyb3IgPSBub3RJbnN0YWxsZWRDYWxsYmFjaztcbiAgICBpbWcub25sb2FkID0gaW5zdGFsbGVkQ2FsbGJhY2s7XG4gICAgaW1nLnNyYyA9ICdjaHJvbWUtZXh0ZW5zaW9uOi8vJyArIGV4dGVuc2lvbklkICsgJy9pY29ucy9pY29uMTYucG5nJztcbn1cblxuZnVuY3Rpb24gcmVjb3JkUmVzcG9uc2UocmVzKSB7XG4gICAgaWYgKHR5cGVvZiByZXMgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpO1xuICAgICAgICBib2R5LmlubmVySFRNTCArPSAnPGRpdiBzdHlsZT1cIndpZHRoOjEwMCU7aGVpZ2h0OjUlO29wYWNpdHk6MC4zO3otaW5kZXg6MTAwO2JhY2tncm91bmQ6eWVsbG93O1wiPicgKyByZXMgKyAnPC9kaXY+JztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gcmVkaXJlY3RUb0Vycm9yKGVycikge1xuICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgIT0gZXJyKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBlcnIpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNDaHJvbWUoKSB7XG4gICAgcmV0dXJuICdjaHJvbWUnIGluIHdpbmRvd1xufVxuXG4vKipcbiBNZXRob2QgdGhhdCBoYW5kbGVzIGFsbCBBUEkgY2FsbHNcbiAqL1xuZnVuY3Rpb24gYXBpSGFuZGxlcihjb25maWd1cmF0aW9uLCBhcGksIHBhcmFtcywgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgaWYgKCFhcGkpIHRocm93IEVycm9yKCdBUEkgbWV0aG9kIHJlcXVpcmVkJyk7XG4gICAgYXBpID0gYXBpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHN1cHBvcnRlZEFQSS5pbmRleE9mKGFwaSkgPT09IC0xKSB0aHJvdyBFcnJvcihgTWV0aG9kICR7YXBpfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgY29uc29sZS5sb2coYEhhbmRsaW5nIEFQSSBjYWxsICR7YXBpfWAsIHBhcmFtcyk7XG5cbiAgICAvL3JldHVybiBhcGkrJygnK3BhcmFtcysnKSc7XG5cbiAgICBzd2l0Y2ggKGFwaSkge1xuICAgICAgICAvLyBUT0RPOiBhZGQgQVBJIGltcGxlbWVudGF0aW9uXG5cbiAgICAgICAgY2FzZSAnY3JlYXRlaGVkZXJhb2JqZWN0JzpcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVIZWRlcmFPYmplY3QocGFyYW1zKTtcblxuICAgICAgICBjYXNlICdjaGVja3RyYW5zYWN0aW9uJzpcbiAgICAgICAgICAgIHJldHVybiBjaGVja1RyYW5zYWN0aW9uKHtjb25maWd1cmF0aW9uLCBwYXJhbXN9LCBjYWxsYmFjayk7XG5cbiAgICAgICAgY2FzZSAnY3JlYXRlY29udHJhY3RvYmplY3QnOlxuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUNvbnRyYWN0T2JqZWN0KHtjb25maWd1cmF0aW9uLCBwYXJhbXN9LCBjYWxsYmFjayk7XG5cbiAgICAgICAgY2FzZSAnaW5pdCc6XG4gICAgICAgICAgICByZXR1cm4gaW5pdChjb25maWd1cmF0aW9uLCBjYWxsYmFjayk7XG5cbiAgICAgICAgY2FzZSAnZ2V0bW9kYWwnOlxuICAgICAgICAgICAgcmV0dXJuIGdldG1vZGFsKCk7XG5cbiAgICAgICAgY2FzZSAndGVzdCc6XG4gICAgICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBObyBoYW5kbGVyIGRlZmluZWQgZm9yICR7YXBpfWApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZXh0ZW5kT2JqZWN0KGEsIGIpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gYilcbiAgICAgICAgaWYgKGIuaGFzT3duUHJvcGVydHkoa2V5KSkgYVtrZXldID0gYltrZXldO1xuICAgIHJldHVybiBhO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVIZWRlcmFPYmplY3QocGFyYW1zKSB7XG4gICAgbGV0IG9iamVjdCA9IFsnc3VibWlzc2lvbm5vZGUnLCAncGF5bWVudHNlcnZlcicsICdyZWNpcGllbnRsaXN0JywgJ2NvbnRlbnRpZCcsICd0eXBlJywgJ21lbW8nLCAnZXh0ZW5zaW9uaWQnLCAncmVkaXJlY3QnLCAndGltZSddO1xuICAgIGxldCBIZWRlcmFvYmplY3QgPSAnPGhlZGVyYS1taWNyb3BheW1lbnQgJztcbiAgICBmb3IgKHZhciBpIGluIG9iamVjdCkge1xuICAgICAgICBsZXQgbm9kZSA9IG9iamVjdFtpXTtcbiAgICAgICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShub2RlKSkge1xuICAgICAgICAgICAgSGVkZXJhb2JqZWN0ICs9IFwiZGF0YS1cIiArIG5vZGUgKyBcIj0gJ1wiICsgcGFyYW1zW25vZGVdICsgXCInICwgXCIgKyBcIlxcblwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIEhlZGVyYW9iamVjdCArPSAnPjwvaGVkZXJhLW1pY3JvcGF5bWVudD4nO1xuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyYW1zWydhdHRySUQnXSk7XG4gICAgYm9keS5pbm5lckhUTUwgKz0gSGVkZXJhb2JqZWN0O1xuICAgIHJldHVybiBIZWRlcmFvYmplY3Q7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbnRyYWN0T2JqZWN0KHBhcmFtcykge1xuICAgIGxldCBfX2NvbnN0cnVjdCA9IFsnY29udHJhY3RpZCcsICdtYXhpbXVtJywgJ3BheW1lbnRzZXJ2ZXInLCAncGFyYW1zJywgJ21lbW8nLCAnYWJpJywgJ3JlZGlyZWN0JywgJ2V4dGVuc2lvbmlkJ107XG4gICAgbGV0IG9iamVjdCA9IHtcbiAgICAgICAgY29udHJhY3RpZDogJzAuMC4xMTExJyxcbiAgICAgICAgbWF4aW11bTogJzQyMjM0MjM0MycsXG4gICAgICAgIHBheW1lbnRzZXJ2ZXI6IHBhcmFtcy5jb25maWd1cmF0aW9uLnBheW1lbnRzZXJ2ZXIsXG4gICAgICAgIHBhcmFtczogW1wiODY5XCIsIFwiMTAwMDAwMDAwXCIsIFwiMjE2XCIsIFwiMjUzXCIsIFwiMjdcIiwgXCIweDIyNmIwODk3NmFkMGRkOTgyYWViNmIyMWE0NGYzZWFjYWU1Nzk1NjljMzRlNzE3MjVhZmY4MDFhMmZlNjg3MzlcIiwgXCIweDMzM2Y5OTFmYTNhODcwNTc1ZjgxOTU2OWU5ZjcyYTc3MWVhNzkwMDc4ZDQ0OGNjODc4OTEyMGVlMTRhYmYzYzVcIl0sXG4gICAgICAgIG1lbW86ICdhNGE3YzQzMjlhYWI0YjFmYWM0NzRmZjZmOTNkODU4YycsXG4gICAgICAgIGFiaTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgXCJjb25zdGFudFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiaW5wdXRzXCI6IFt7XCJuYW1lXCI6IFwicHJvcGVydHlJRFwiLCBcInR5cGVcIjogXCJ1aW50MjRcIn0sIHtcIm5hbWVcIjogXCJhbW91bnRcIiwgXCJ0eXBlXCI6IFwidWludDI1NlwifSwge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcInhcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ1aW50MTZcIlxuICAgICAgICAgICAgfSwge1wibmFtZVwiOiBcInlcIiwgXCJ0eXBlXCI6IFwidWludDE2XCJ9LCB7XCJuYW1lXCI6IFwidlwiLCBcInR5cGVcIjogXCJ1aW50OFwifSwge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcInJcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJieXRlczMyXCJcbiAgICAgICAgICAgIH0sIHtcIm5hbWVcIjogXCJzXCIsIFwidHlwZVwiOiBcImJ5dGVzMzJcIn1dLFxuICAgICAgICAgICAgXCJuYW1lXCI6IFwiYnV5UHJvcGVydHlcIixcbiAgICAgICAgICAgIFwib3V0cHV0c1wiOiBbe1wibmFtZVwiOiBcIlwiLCBcInR5cGVcIjogXCJzdHJpbmdcIn1dLFxuICAgICAgICAgICAgXCJwYXlhYmxlXCI6IHRydWUsXG4gICAgICAgICAgICBcInN0YXRlTXV0YWJpbGl0eVwiOiBcInBheWFibGVcIixcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImZ1bmN0aW9uXCJcbiAgICAgICAgfSksXG4gICAgICAgIHJlZGlyZWN0OiAne1wibm9uUGF5aW5nQWNjb3VudFwiOiBcIi9pbnN1ZmZpY2llbnQtYW1vdW50L1wiLFwibm9BY2NvdW50XCI6IFwiL2FjY291bnQtbm90LXBhaXJlZFwiLFwiaG9tZVBhZ2VcIjogXCIvXCJ9JyxcbiAgICAgICAgZXh0ZW5zaW9uaWQ6ICdwZGpqcGNvbGdtbWNpZmlqcGVqa2VucGJiaW1lZHBpYycsXG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKEpTT04ucGFyc2Uob2JqZWN0LmFiaSkpO1xuICAgIGxldCBleHRlbmRlZCA9IGV4dGVuZE9iamVjdChvYmplY3QsIHBhcmFtcy5wYXJhbXMpO1xuICAgIGNvbnNvbGUubG9nKGV4dGVuZGVkKTtcbiAgICBsZXQgQ29udHJhY3RvYmplY3QgPSAnPGhlZGVyYS1jb250cmFjdCAnO1xuICAgIGZvciAodmFyIGkgaW4gX19jb25zdHJ1Y3QpIHtcbiAgICAgICAgbGV0IG5vZGUgPSBfX2NvbnN0cnVjdFtpXTtcbiAgICAgICAgaWYgKGV4dGVuZGVkLmhhc093blByb3BlcnR5KG5vZGUpKSB7XG4gICAgICAgICAgICBDb250cmFjdG9iamVjdCArPSBcImRhdGEtXCIgKyBub2RlICsgXCI9ICdcIiArIGV4dGVuZGVkW25vZGVdICsgXCInIFwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIENvbnRyYWN0b2JqZWN0ICs9ICc+PC9oZWRlcmEtY29udHJhY3Q+JztcbiAgICBjb25zb2xlLmxvZyhDb250cmFjdG9iamVjdCk7XG5cbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGV4dGVuZGVkWydhdHRySUQnXSk7XG4gICAgYm9keS5pbm5lckhUTUwgKz0gQ29udHJhY3RvYmplY3Q7XG4gICAgLy9jb25zb2xlLmxvZygoSGVkZXJhb2JqZWN0KSlcbiAgICByZXR1cm4gQ29udHJhY3RvYmplY3Q7XG4gICAgLy9jYWxsYmFjayhIZWRlcmFvYmplY3QpO1xufVxuXG5mdW5jdGlvbiBjaGVja1RyYW5zYWN0aW9uKHBhcmFtcykge1xuXG4gICAgbGV0IG1lbW9faWQgPSBwYXJhbXMuY29uZmlndXJhdGlvbi5tZW1vO1xuICAgIGxldCB1cmwgPSBwcm9kdWN0aW9uID8gXCJodHRwczovL21wcy5oYXNoaW5nc3lzdGVtcy5jb21cIiA6ICdodHRwOi8vbG9jYWxob3N0Ojk5OTknO1xuICAgIGxldCBzdHJ1Y3R1cmUgPSB7XG4gICAgICAgIGJhc2V1cmw6IHVybCxcbiAgICAgICAgbWVtb19pZDogbWVtb19pZCxcbiAgICAgICAgcmVjZWl2ZXJfaWQ6ICcnLFxuICAgICAgICBzdWNjZXNzOiAnL3N1Y2Nlc3MnLFxuICAgICAgICBmYWlsdXJlOiAnL3BheW1lbnQtZmFpbGVkJyxcbiAgICAgICAgdGltZW91dDogMzAwMCxcbiAgICAgICAgbGltaXQ6IDFcbiAgICB9O1xuXG4gICAgZm9yICh2YXIga2V5IGluIHBhcmFtcy5wYXJhbXMpIHtcbiAgICAgICAgaWYgKHBhcmFtcy5wYXJhbXMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBwYXJhbXMucGFyYW1zW2tleV0pIHtcbiAgICAgICAgICAgIHN0cnVjdHVyZVtrZXldID0gcGFyYW1zLnBhcmFtc1trZXldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN0cnVjdHVyZS5yZWNlaXZlcl9pZCAmJiBzdHJ1Y3R1cmUubWVtb19pZCkge1xuICAgICAgICBVUkwgPSBzdHJ1Y3R1cmUuYmFzZXVybCArIFwiL2NoZWNrL1wiICsgc3RydWN0dXJlLnJlY2VpdmVyX2lkICsgXCIvXCIgKyBzdHJ1Y3R1cmUubWVtb19pZFxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzdHJ1Y3R1cmUudGltZXN0YW1wKVxuICAgICAgICAgICAgVVJMID0gc3RydWN0dXJlLmJhc2V1cmwgKyBcIi9tZW1vL1wiICsgc3RydWN0dXJlLm1lbW9faWQgKyAnP2xpbWl0PScgKyBzdHJ1Y3R1cmUubGltaXQgKyAnJnRpbWVzdGFtcD0nICsgc3RydWN0dXJlLnRpbWVzdGFtcDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgVVJMID0gc3RydWN0dXJlLmJhc2V1cmwgKyBcIi9tZW1vL1wiICsgc3RydWN0dXJlLm1lbW9faWQgKyAnP2xpbWl0PScgKyBzdHJ1Y3R1cmUubGltaXQ7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coc3RydWN0dXJlLnRpbWVvdXQpO1xuICAgIC8vc2V0VGltZW91dChwZXJmb3JtUmVxdWVzdChzdHJ1Y3R1cmUpLCBzdHJ1Y3R1cmUudGltZW91dClcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcGVyZm9ybVJlcXVlc3Qoc3RydWN0dXJlKTtcbiAgICB9LCBzdHJ1Y3R1cmUudGltZW91dCk7XG59XG5cbnZhciBwZXJmb3JtUmVxdWVzdCA9IGZ1bmN0aW9uIChzdHJ1Y3R1cmUpIHtcbiAgICBjb25zb2xlLmxvZyhzdHJ1Y3R1cmUpXG4gICAgdmFyIHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5yZXNwb25zZS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZXNwb25zZS5sZW5ndGggPj0gMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UucmVzcG9uc2VbMF0ubm9kZXByZWNoZWNrID09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cub3JpZ2luICsgc3RydWN0dXJlLnN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAvKmVsc2UgaWYocHJlY2hlY2tlcihyZXNwb25zZS5yZXNwb25zZVswXS5ub2RlcHJlY2hlY2spPT0nSU5TVUZGSUNJRU5UX1RYX0ZFRScpXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cub3JpZ2luICsgJ2luc3VmZmljaWVudC1hbW91bnQnKTsqL1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwcmVjaGVja2VyKHJlc3BvbnNlLnJlc3BvbnNlWzBdLm5vZGVwcmVjaGVjaykpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgLy93aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cub3JpZ2luICsgc3RydWN0dXJlLmZhaWx1cmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL3dpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBzdHJ1Y3R1cmUuc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgLy9jYWxsYmFjayhudWxsLCB0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9jYWxsYmFjayh7ZXJyb3I6IHRydWUsIGRhdGE6IHRoaXMucmVzcG9uc2V9LCBudWxsKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cub3JpZ2luICsgc3RydWN0dXJlLmZhaWx1cmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICB4aHR0cC5vcGVuKFwiR0VUXCIsIFVSTCwgdHJ1ZSk7XG4gICAgeGh0dHAuc2VuZCgpO1xufTtcblxuZnVuY3Rpb24gaW5pdChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgbGV0IHJlc3BvbnNlID0ge1xuICAgICAgICBpc2Nocm9tZTogdHJ1ZSxcbiAgICAgICAgYWNjb3VudFBhaXJlZDogZmFsc2UsXG4gICAgICAgIGlzbW9iaWxlOiBudWxsLFxuICAgICAgICB2YWxpZEJyb3dzZXI6IG51bGwsXG4gICAgICAgIGV4dGVuc2lvbkluc3RhbGxlZDogbnVsbCxcbiAgICAgICAgYWNjZXNzVG9BY2NvdW50czogbnVsbCxcbiAgICAgICAgYWNjb3VudElkOiBudWxsLFxuICAgICAgICBzdWJtaXNzaW9uTm9kZTogcGFyYW1zLnN1Ym1pc3Npb25ub2RlLFxuICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgdHhuX3N1Y2Nlc3M6IGZhbHNlXG4gICAgfTtcbiAgICBsZXQgY2hlY2tJc0Nocm9tZSA9IGlzQ2hyb21lKCk7XG4gICAgcmVzcG9uc2UuaXNjaHJvbWUgPSBjaGVja0lzQ2hyb21lO1xuICAgIGxldCBtb2IgPSBkZXRlY3Rtb2IoKTtcbiAgICByZXNwb25zZS5pc21vYmlsZSA9IG1vYjtcbiAgICBkZXRlY3QocGFyYW1zLmV4dGVuc2lvbmlkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlc3BvbnNlLmV4dGVuc2lvbkluc3RhbGxlZCA9IGZhbHNlO1xuICAgICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2tlZFwiKVxuICAgICAgICByZXNwb25zZS5leHRlbnNpb25JbnN0YWxsZWQgPSB0cnVlO1xuICAgICAgICBsZXQgb2JqZWN0ID0gY3JlYXRlSGVkZXJhT2JqZWN0KHBhcmFtcyk7XG4gICAgICAgIGxldCB1cmwgPSBwcm9kdWN0aW9uID8gXCJodHRwczovL21wcy5oYXNoaW5nc3lzdGVtcy5jb21cIiA6ICdodHRwOi8vbG9jYWxob3N0Ojk5OTknO1xuICAgICAgICBVUkwgPSB1cmwgKyBcIi9tZW1vL1wiICsgcGFyYW1zLm1lbW87XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhamF4cmVzcCA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhamF4cmVzcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWpheHJlc3AucmVzcG9uc2UubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHByZWNoZWNrZXIoYWpheHJlc3AucmVzcG9uc2VbMF0ubm9kZXByZWNoZWNrKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuYWNjb3VudElkID0gYWpheHJlc3AucmVzcG9uc2VbMF0uc2VuZGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmFjY291bnRQYWlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmFjY2Vzc1RvQWNjb3VudHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhamF4cmVzcC5yZXNwb25zZVswXS5ub2RlcHJlY2hlY2sgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UudHhuX3N1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5lcnJvciA9IHByZWNoZWNrZXIoYWpheHJlc3AucmVzcG9uc2VbMF0ubm9kZXByZWNoZWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5hY2NvdW50UGFpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5hY2Nlc3NUb0FjY291bnRzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGh0dHAub3BlbihcIkdFVFwiLCBVUkwsIHRydWUpO1xuICAgICAgICAgICAgeGh0dHAuc2VuZCgpO1xuICAgICAgICB9LCA1MDAwKTtcbiAgICAgICAgLy9jYWxsYmFjayhudWxsLHJlc3BvbnNlKTtcbiAgICB9KTtcblxufVxuXG5mdW5jdGlvbiBkZXRlY3Rtb2IoKSB7XG4gICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0FuZHJvaWQvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvd2ViT1MvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBob25lL2kpXG4gICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQYWQvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBvZC9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9CbGFja0JlcnJ5L2kpXG4gICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1dpbmRvd3MgUGhvbmUvaSlcbiAgICApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0bW9kYWwoKSB7XG4gICAgdmFyIG15Q29udGVudCA9ICc8ZGl2IGNsYXNzPVwicG9wdXBfb3V0ZXJfd3JhcFwiPlxcbicgK1xuICAgICAgICAnXFx0ICBcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfd3JhcFwiPlxcbicgK1xuICAgICAgICAnXFx0ICBcXHRcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfaGVhZGVyXCI+U2V0dXAgVGFzayA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJwb3B1cF9jbG9zZVwiPng8L2E+PC9kaXY+XFxuJyArXG4gICAgICAgICdcXG4nICtcbiAgICAgICAgJ1xcdCAgXFx0XFx0PGRpdiBjbGFzcz1cInBvcHVwX2lubmVyXCI+XFxuJyArXG4gICAgICAgICdcXHQgIFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJwb3B1cF9pbm5lcl9sZWZ0XCI+XFxuJyArXG4gICAgICAgICdcXG4nICtcbiAgICAgICAgJ1xcdCAgXFx0XFx0XFx0XFx0PGZvcm0gYWN0aW9uPVwiL2FjdGlvbl9wYWdlLnBocFwiIGNsYXNzPVwicG9wdXBfZm9ybVwiPlxcbicgK1xuICAgICAgICAnXFx0XFx0XFx0XFx0XFx0ICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJpbWdfb25lXCIgY2xhc3M9XCJwb3B1cF9jaGtib3ggdG9nZ2xlX19pbnB1dFwiIG5hbWU9XCJpbWdfb25lXCIgdmFsdWU9XCJpbWdfb25lXCIgY2hlY2tlZD5cXG4nICtcbiAgICAgICAgJ1xcdFxcdFxcdFxcdFxcdCAgPGxhYmVsIGZvcj1cImltZ19vbmVcIj4mbmJzcDsgSW5zdGFsbCBIZWRlcmEgV2FsbGV0PC9sYWJlbD5cXG4nICtcbiAgICAgICAgJ1xcdFxcdFxcdFxcdFxcdCAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiaW1nX3R3b1wiIGNsYXNzPVwicG9wdXBfY2hrYm94IHRvZ2dsZV9faW5wdXRcIiBuYW1lPVwiaW1nX3R3b1wiIHZhbHVlPVwiaW1nX3R3b1wiPlxcbicgK1xuICAgICAgICAnXFx0XFx0XFx0XFx0XFx0ICA8bGFiZWwgZm9yPVwiaW1nX3R3b1wiPiZuYnNwOyBcIlBhaXIgeW91ciBBY2NvdW50XCI8L2xhYmVsPlxcbicgK1xuICAgICAgICAnXFxuJyArXG4gICAgICAgICdcXHRcXHRcXHRcXHRcXHQgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImltZ190aHJlZVwiIGNsYXNzPVwicG9wdXBfY2hrYm94IHRvZ2dsZV9faW5wdXRcIiBuYW1lPVwiaW1nX3RocmVlXCIgdmFsdWU9XCJpbWdfdGhyZWVcIj5cXG4nICtcbiAgICAgICAgJ1xcdFxcdFxcdFxcdFxcdCAgPGxhYmVsIGZvcj1cImltZ190aHJlZVwiPiZuYnNwOyBcIkFsbG93IFBheW1lbnQgUmVxdWVzdHNcIjwvbGFiZWw+XFxuJyArXG4gICAgICAgICdcXG4nICtcbiAgICAgICAgJ1xcdFxcdFxcdFxcdFxcdCAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiaW1nX2ZvdXJcIiBjbGFzcz1cInBvcHVwX2Noa2JveCB0b2dnbGVfX2lucHV0XCIgbmFtZT1cImltZ19mb3VyXCIgdmFsdWU9XCJpbWdfZm91clwiPlxcbicgK1xuICAgICAgICAnXFx0XFx0XFx0XFx0XFx0ICA8bGFiZWwgZm9yPVwiaW1nX2ZvdXJcIj4mbmJzcDsgXCJHZXQgc29tZSBIQkFSXCI8L2xhYmVsPlxcbicgK1xuICAgICAgICAnXFx0XFx0XFx0XFx0XFx0PC9mb3JtPlxcbicgK1xuICAgICAgICAnXFxuJyArXG4gICAgICAgICdcXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfbG9nb1wiPlxcbicgK1xuICAgICAgICAnXFx0XFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cImxvZ29fdHh0XCI+UG93ZXJlZCBieTwvZGl2PlxcbicgK1xuICAgICAgICAnXFx0XFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cImxvZ29faWNvblwiPjxpbWcgc3JjPVwiaW1nL3BvcHVwX2xvZ28ucG5nXCI+PC9kaXY+XFxuJyArXG4gICAgICAgICdcXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXG4nICtcbiAgICAgICAgJ1xcdCAgXFx0XFx0XFx0XFx0XFxuJyArXG4gICAgICAgICdcXHQgIFxcdFxcdFxcdDwvZGl2PlxcbicgK1xuICAgICAgICAnXFx0ICBcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfaW5uZXJfcmlnaHRcIj5cXG4nICtcbiAgICAgICAgJ1xcbicgK1xuICAgICAgICAnXFx0ICBcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfaW1nX3NlY1wiPlxcbicgK1xuICAgICAgICAnXFx0ICBcXHRcXHRcXHRcXHRcXHQ8aW1nIGNsYXNzPVwiaW1nX29uZVwiIHNyYz1cImh0dHA6Ly9sb2NhbGhvc3QvaGFzaC1tb2RlbC9pbWcvaW1nX29uZS5wbmdcIj5cXG4nICtcbiAgICAgICAgJ1xcdCAgXFx0XFx0XFx0XFx0XFx0PGltZyBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCIgY2xhc3M9XCJpbWdfdHdvXCIgc3JjPVwiaHR0cDovL2xvY2FsaG9zdC9oYXNoLW1vZGVsL2ltZy9pbWdfdHdvLnBuZ1wiPlxcbicgK1xuICAgICAgICAnXFx0ICBcXHRcXHRcXHRcXHRcXHQ8aW1nIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIiBjbGFzcz1cImltZ190aHJlZVwiIHNyYz1cImh0dHA6Ly9sb2NhbGhvc3QvaGFzaC1tb2RlbC9pbWcvaW1nX3RocmVlLnBuZ1wiPlxcbicgK1xuICAgICAgICAnXFx0ICBcXHRcXHRcXHRcXHRcXHQ8aW1nIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIiBjbGFzcz1cImltZ19mb3VyXCIgc3JjPVwiaHR0cDovL2xvY2FsaG9zdC9oYXNoLW1vZGVsL2ltZy9pbWdfZm91ci5wbmdcIj5cXG4nICtcbiAgICAgICAgJ1xcdCAgXFx0XFx0XFx0XFx0PC9kaXY+XFxuJyArXG4gICAgICAgICdcXHQgIFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJ0eHRfd3JhcFwiPlxcbicgK1xuICAgICAgICAnXFx0XFx0ICBcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwidHh0X2hlYWRlclwiPkxldHMgZ2V0IHlvdSBzdGFydGVkITwvZGl2PlxcbicgK1xuICAgICAgICAnXFx0XFx0ICBcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwidHh0X2NvbnRlbnRcIj5Mb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdCwgc2VkIGRvIGVpdXNtb2QgdGVtcG9yIGluY2lkaWR1bnQgdXQgbGFib3JlIGV0IDwvZGl2PlxcbicgK1xuICAgICAgICAnXFx0XFx0ICBcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfYnRuXCI+XFxuJyArXG4gICAgICAgICdcXHRcXHQgIFxcdFxcdFxcdFxcdFxcdDxhIGhyZWY9XCJcIj5JXFwnbSBSZWFkeTwvYT5cXG4nICtcbiAgICAgICAgJ1xcdFxcdCAgXFx0XFx0XFx0XFx0PC9kaXY+XFxuJyArXG4gICAgICAgICdcXHRcXHQgIFxcdFxcdFxcdDwvZGl2PlxcbicgK1xuICAgICAgICAnXFx0ICBcXHRcXHRcXHRcXHRcXG4nICtcbiAgICAgICAgJ1xcdCAgXFx0XFx0XFx0PC9kaXY+XFxuJyArXG4gICAgICAgICdcXHQgIFxcdFxcdDwvZGl2PlxcbicgK1xuICAgICAgICAnXFx0ICBcXHQ8L2Rpdj5cXG4nICtcbiAgICAgICAgJ1xcdDwvZGl2Plxcbic7XG5cbiAgICB2YXIgbXlNb2RhbCA9IG5ldyBNb2RhbCh7XG4gICAgICAgIGNvbnRlbnQ6IG15Q29udGVudFxuICAgIH0pO1xuXG4gICAgLy92YXIgdHJpZ2dlckJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmlnZ2VyJyk7XG5cbiAgICAvKnRyaWdnZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbXlNb2RhbC5vcGVuKCk7XG4gICAgfSk7Ki9cblxufVxuXG5cbmFwcCh3aW5kb3cpO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsImV4cG9ydCBmdW5jdGlvbiBwaW5nKCkge1xuICAgIHJldHVybiAncG9uZyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmVjaGVja2VyKG4pIHtcbiAgICBsZXQganNvbiA9IHswOiBcIk9LXCIsIDE6IFwiSU5WQUxJRF9UUkFOU0FDVElPTlwiLCAyOiBcIlBBWUVSX0FDQ09VTlRfTk9UX0ZPVU5EXCIsIDM6IFwiSU5WQUxJRF9OT0RFX0FDQ09VTlRcIiwgNDogXCJUUkFOU0FDVElPTl9FWFBJUkVEXCIsIDU6IFwiSU5WQUxJRF9UUkFOU0FDVElPTl9TVEFSVFwiLCA2OiBcIklOVkFMSURfVFJBTlNBQ1RJT05fRFVSQVRJT05cIiwgNzogXCJJTlZBTElEX1NJR05BVFVSRVwiLCA4OiBcIk1FTU9fVE9PX0xPTkdcIiwgOTogXCJJTlNVRkZJQ0lFTlRfVFhfRkVFXCIsIDEwOiBcIklOU1VGRklDSUVOVF9QQVlFUl9CQUxBTkNFXCIsIDExOiBcIkRVUExJQ0FURV9UUkFOU0FDVElPTlwiLCAxMjogXCJCVVNZXCIsIDEzOiBcIk5PVF9TVVBQT1JURURcIiwgMTQ6IFwiSU5WQUxJRF9GSUxFX0lEXCIsIDE1OiBcIklOVkFMSURfQUNDT1VOVF9JRFwiLCAxNjogXCJJTlZBTElEX0NPTlRSQUNUX0lEXCIsIDE3OiBcIklOVkFMSURfVFJBTlNBQ1RJT05fSURcIiwgMTg6IFwiUkVDRUlQVF9OT1RfRk9VTkRcIiwgMTk6IFwiUkVDT1JEX05PVF9GT1VORFwiLCAyMDogXCJJTlZBTElEX1NPTElESVRZX0lEXCIsIDIxOiBcIlVOS05PV05cIiwgMjI6IFwiU1VDQ0VTU1wiLCAyMzogXCJGQUlMX0lOVkFMSURcIiwgMjQ6IFwiRkFJTF9GRUVcIiwgMjU6IFwiRkFJTF9CQUxBTkNFXCIsIDI2OiBcIktFWV9SRVFVSVJFRFwiLCAyNzogXCJCQURfRU5DT0RJTkdcIiwgMjg6IFwiSU5TVUZGSUNJRU5UX0FDQ09VTlRfQkFMQU5DRVwiLCAyOTogXCJJTlZBTElEX1NPTElESVRZX0FERFJFU1NcIiwgMzA6IFwiSU5TVUZGSUNJRU5UX0dBU1wiLCAzMTogXCJDT05UUkFDVF9TSVpFX0xJTUlUX0VYQ0VFREVEXCIsIDMyOiBcIkxPQ0FMX0NBTExfTU9ESUZJQ0FUSU9OX0VYQ0VQVElPTlwiLCAzMzogXCJDT05UUkFDVF9SRVZFUlRfRVhFQ1VURURcIiwgMzQ6IFwiQ09OVFJBQ1RfRVhFQ1VUSU9OX0VYQ0VQVElPTlwiLCAzNTogXCJJTlZBTElEX1JFQ0VJVklOR19OT0RFX0FDQ09VTlRcIiwgMzY6IFwiTUlTU0lOR19RVUVSWV9IRUFERVJcIiwgMzc6IFwiQUNDT1VOVF9VUERBVEVfRkFJTEVEXCIsIDM4OiBcIklOVkFMSURfS0VZX0VOQ09ESU5HXCIsIDM5OiBcIk5VTExfU09MSURJVFlfQUREUkVTU1wiLCA0MDogXCJDT05UUkFDVF9VUERBVEVfRkFJTEVEXCIsIDQxOiBcIklOVkFMSURfUVVFUllfSEVBREVSXCIsIDQyOiBcIklOVkFMSURfRkVFX1NVQk1JVFRFRFwiLCA0MzogXCJJTlZBTElEX1BBWUVSX1NJR05BVFVSRVwiLCA0NDogXCJLRVlfTk9UX1BST1ZJREVEXCIsIDQ1OiBcIklOVkFMSURfRVhQSVJBVElPTl9USU1FXCIsIDQ2OiBcIk5PX1dBQ0xfS0VZXCIsIDQ3OiBcIkZJTEVfQ09OVEVOVF9FTVBUWVwiLCA0ODogXCJJTlZBTElEX0FDQ09VTlRfQU1PVU5UU1wiLCA0OTogXCJFTVBUWV9UUkFOU0FDVElPTl9CT0RZXCIsIDUwOiBcIklOVkFMSURfVFJBTlNBQ1RJT05fQk9EWVwiLCA1MTogXCJJTlZBTElEX1NJR05BVFVSRV9UWVBFX01JU01BVENISU5HX0tFWVwiLCA1MjogXCJJTlZBTElEX1NJR05BVFVSRV9DT1VOVF9NSVNNQVRDSElOR19LRVlcIiwgNTM6IFwiRU1QVFlfQ0xBSU1fQk9EWVwiLCA1NDogXCJFTVBUWV9DTEFJTV9IQVNIXCIsIDU1OiBcIkVNUFRZX0NMQUlNX0tFWVNcIiwgNTY6IFwiSU5WQUxJRF9DTEFJTV9IQVNIX1NJWkVcIiwgNTc6IFwiRU1QVFlfUVVFUllfQk9EWVwiLCA1ODogXCJFTVBUWV9DTEFJTV9RVUVSWVwiLCA1OTogXCJDTEFJTV9OT1RfRk9VTkRcIiwgNjA6IFwiQUNDT1VOVF9JRF9ET0VTX05PVF9FWElTVFwiLCA2MTogXCJDTEFJTV9BTFJFQURZX0VYSVNUU1wiLCA2MjogXCJJTlZBTElEX0ZJTEVfV0FDTFwiLCA2MzogXCJTRVJJQUxJWkFUSU9OX0ZBSUxFRFwiLCA2NDogXCJUUkFOU0FDVElPTl9PVkVSU0laRVwiLCA2NTogXCJUUkFOU0FDVElPTl9UT09fTUFOWV9MQVlFUlNcIiwgNjY6IFwiQ09OVFJBQ1RfREVMRVRFRFwiLCA2NzogXCJQTEFURk9STV9OT1RfQUNUSVZFXCIsIDY4OiBcIktFWV9QUkVGSVhfTUlTTUFUQ0hcIiwgNjk6IFwiUExBVEZPUk1fVFJBTlNBQ1RJT05fTk9UX0NSRUFURURcIiwgNzA6IFwiSU5WQUxJRF9SRU5FV0FMX1BFUklPRFwiLCA3MTogXCJJTlZBTElEX1BBWUVSX0FDQ09VTlRfSURcIiwgNzI6IFwiQUNDT1VOVF9ERUxFVEVEXCIsIDczOiBcIkZJTEVfREVMRVRFRFwiLCA3NDogXCJBQ0NPVU5UX1JFUEVBVEVEX0lOX0FDQ09VTlRfQU1PVU5UU1wiLCA3NTogXCJTRVRUSU5HX05FR0FUSVZFX0FDQ09VTlRfQkFMQU5DRVwiLCA3NjogXCJPQlRBSU5FUl9SRVFVSVJFRFwiLCA3NzogXCJPQlRBSU5FUl9TQU1FX0NPTlRSQUNUX0lEXCIsIDc4OiBcIk9CVEFJTkVSX0RPRVNfTk9UX0VYSVNUXCIsIDc5OiBcIk1PRElGWUlOR19JTU1VVEFCTEVfQ09OVFJBQ1RcIiwgODA6IFwiRklMRV9TWVNURU1fRVhDRVBUSU9OXCIsIDgxOiBcIkFVVE9SRU5FV19EVVJBVElPTl9OT1RfSU5fUkFOR0VcIiwgODI6IFwiRVJST1JfREVDT0RJTkdfQllURVNUUklOR1wiLCA4MzogXCJDT05UUkFDVF9GSUxFX0VNUFRZXCIsIDg0OiBcIkNPTlRSQUNUX0JZVEVDT0RFX0VNUFRZXCIsIDg1OiBcIklOVkFMSURfSU5JVElBTF9CQUxBTkNFXCIsIDg2OiBcIklOVkFMSURfUkVDRUlWRV9SRUNPUkRfVEhSRVNIT0xEXCIsIDg3OiBcIklOVkFMSURfU0VORF9SRUNPUkRfVEhSRVNIT0xEXCIsIDg4OiBcIkFDQ09VTlRfSVNfTk9UX0dFTkVTSVNfQUNDT1VOVFwifVxuICAgICByZXR1cm4ganNvbltuXTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy5qcyIsIi8vIENyZWF0ZSBhbiBpbW1lZGlhdGVseSBpbnZva2VkIGZ1bmN0aW9uYWwgZXhwcmVzc2lvbiB0byB3cmFwIG91ciBjb2RlXG5leHBvcnQgZnVuY3Rpb24gbW9kYWwoKSB7XG5cbiAgICAvLyBEZWZpbmUgb3VyIGNvbnN0cnVjdG9yXG4gICAgdGhpcy5Nb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInRlc3RcIilcbiAgICAgICAgLy8gQ3JlYXRlIGdsb2JhbCBlbGVtZW50IHJlZmVyZW5jZXNcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbiA9IG51bGw7XG4gICAgICAgIHRoaXMubW9kYWwgPSBudWxsO1xuICAgICAgICB0aGlzLm92ZXJsYXkgPSBudWxsO1xuXG4gICAgICAgIC8vIERldGVybWluZSBwcm9wZXIgcHJlZml4XG4gICAgICAgIHRoaXMudHJhbnNpdGlvbkVuZCA9IHRyYW5zaXRpb25TZWxlY3QoKTtcblxuICAgICAgICAvLyBEZWZpbmUgb3B0aW9uIGRlZmF1bHRzXG4gICAgICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIGF1dG9PcGVuOiBmYWxzZSxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2ZhZGUtYW5kLWRyb3AnLFxuICAgICAgICAgICAgY2xvc2VCdXR0b246IHRydWUsXG4gICAgICAgICAgICBjb250ZW50OiBcIlwiLFxuICAgICAgICAgICAgbWF4V2lkdGg6IDYwMCxcbiAgICAgICAgICAgIG1pbldpZHRoOiAyODAsXG4gICAgICAgICAgICBvdmVybGF5OiB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcblxuICAgICAgICAvLyBDcmVhdGUgb3B0aW9ucyBieSBleHRlbmRpbmcgZGVmYXVsdHMgd2l0aCB0aGUgcGFzc2VkIGluIGFydWdtZW50c1xuICAgICAgICBpZiAoYXJndW1lbnRzWzBdICYmIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IGV4dGVuZERlZmF1bHRzKGRlZmF1bHRzLCBhcmd1bWVudHNbMF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5vcHRpb25zLmF1dG9PcGVuID09PSB0cnVlKSB0aGlzLm9wZW4oKTtcblxuICAgIH1cblxuICAgIC8vIFB1YmxpYyBNZXRob2RzXG5cbiAgICBNb2RhbC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuICAgICAgICB0aGlzLm1vZGFsLmNsYXNzTmFtZSA9IHRoaXMubW9kYWwuY2xhc3NOYW1lLnJlcGxhY2UoXCIgc2NvdGNoLW9wZW5cIiwgXCJcIik7XG4gICAgICAgIHRoaXMub3ZlcmxheS5jbGFzc05hbWUgPSB0aGlzLm92ZXJsYXkuY2xhc3NOYW1lLnJlcGxhY2UoXCIgc2NvdGNoLW9wZW5cIixcbiAgICAgICAgICAgIFwiXCIpO1xuICAgICAgICB0aGlzLm1vZGFsLmFkZEV2ZW50TGlzdGVuZXIodGhpcy50cmFuc2l0aW9uRW5kLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIF8ubW9kYWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChfLm1vZGFsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKHRoaXMudHJhbnNpdGlvbkVuZCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZihfLm92ZXJsYXkucGFyZW50Tm9kZSkgXy5vdmVybGF5LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoXy5vdmVybGF5KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgTW9kYWwucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgYnVpbGRPdXQuY2FsbCh0aGlzKTtcbiAgICAgICAgaW5pdGlhbGl6ZUV2ZW50cy5jYWxsKHRoaXMpO1xuICAgICAgICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLm1vZGFsKS5oZWlnaHQ7XG4gICAgICAgIHRoaXMubW9kYWwuY2xhc3NOYW1lID0gdGhpcy5tb2RhbC5jbGFzc05hbWUgK1xuICAgICAgICAgICAgKHRoaXMubW9kYWwub2Zmc2V0SGVpZ2h0ID4gd2luZG93LmlubmVySGVpZ2h0ID9cbiAgICAgICAgICAgICAgICBcIiBzY290Y2gtb3BlbiBzY290Y2gtYW5jaG9yZWRcIiA6IFwiIHNjb3RjaC1vcGVuXCIpO1xuICAgICAgICB0aGlzLm92ZXJsYXkuY2xhc3NOYW1lID0gdGhpcy5vdmVybGF5LmNsYXNzTmFtZSArIFwiIHNjb3RjaC1vcGVuXCI7XG4gICAgfVxuXG4gICAgLy8gUHJpdmF0ZSBNZXRob2RzXG5cbiAgICBmdW5jdGlvbiBidWlsZE91dCgpIHtcblxuICAgICAgICB2YXIgY29udGVudCwgY29udGVudEhvbGRlciwgZG9jRnJhZztcblxuICAgICAgICAvKlxuICAgICAgICAgKiBJZiBjb250ZW50IGlzIGFuIEhUTUwgc3RyaW5nLCBhcHBlbmQgdGhlIEhUTUwgc3RyaW5nLlxuICAgICAgICAgKiBJZiBjb250ZW50IGlzIGEgZG9tTm9kZSwgYXBwZW5kIGl0cyBjb250ZW50LlxuICAgICAgICAgKi9cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5jb250ZW50ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBjb250ZW50ID0gdGhpcy5vcHRpb25zLmNvbnRlbnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250ZW50ID0gdGhpcy5vcHRpb25zLmNvbnRlbnQuaW5uZXJIVE1MO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgRG9jdW1lbnRGcmFnbWVudCB0byBidWlsZCB3aXRoXG4gICAgICAgIGRvY0ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIG1vZGFsIGVsZW1lbnRcbiAgICAgICAgdGhpcy5tb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMubW9kYWwuY2xhc3NOYW1lID0gXCJzY290Y2gtbW9kYWwgXCIgKyB0aGlzLm9wdGlvbnMuY2xhc3NOYW1lO1xuICAgICAgICB0aGlzLm1vZGFsLnN0eWxlLm1pbldpZHRoID0gdGhpcy5vcHRpb25zLm1pbldpZHRoICsgXCJweFwiO1xuICAgICAgICB0aGlzLm1vZGFsLnN0eWxlLm1heFdpZHRoID0gdGhpcy5vcHRpb25zLm1heFdpZHRoICsgXCJweFwiO1xuXG4gICAgICAgIC8vIElmIGNsb3NlQnV0dG9uIG9wdGlvbiBpcyB0cnVlLCBhZGQgYSBjbG9zZSBidXR0b25cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5jbG9zZUJ1dHRvbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLmNsYXNzTmFtZSA9IFwic2NvdGNoLWNsb3NlIGNsb3NlLWJ1dHRvblwiO1xuICAgICAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSBcIiZ0aW1lcztcIjtcbiAgICAgICAgICAgIHRoaXMubW9kYWwuYXBwZW5kQ2hpbGQodGhpcy5jbG9zZUJ1dHRvbik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBvdmVybGF5IGlzIHRydWUsIGFkZCBvbmVcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5vdmVybGF5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5LmNsYXNzTmFtZSA9IFwic2NvdGNoLW92ZXJsYXkgXCIgKyB0aGlzLm9wdGlvbnMuY2xhc3NOYW1lO1xuICAgICAgICAgICAgZG9jRnJhZy5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIGNvbnRlbnQgYXJlYSBhbmQgYXBwZW5kIHRvIG1vZGFsXG4gICAgICAgIGNvbnRlbnRIb2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjb250ZW50SG9sZGVyLmNsYXNzTmFtZSA9IFwic2NvdGNoLWNvbnRlbnRcIjtcbiAgICAgICAgY29udGVudEhvbGRlci5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgICAgICB0aGlzLm1vZGFsLmFwcGVuZENoaWxkKGNvbnRlbnRIb2xkZXIpO1xuXG4gICAgICAgIC8vIEFwcGVuZCBtb2RhbCB0byBEb2N1bWVudEZyYWdtZW50XG4gICAgICAgIGRvY0ZyYWcuYXBwZW5kQ2hpbGQodGhpcy5tb2RhbCk7XG5cbiAgICAgICAgLy8gQXBwZW5kIERvY3VtZW50RnJhZ21lbnQgdG8gYm9keVxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvY0ZyYWcpO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXh0ZW5kRGVmYXVsdHMoc291cmNlLCBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIHZhciBwcm9wZXJ0eTtcbiAgICAgICAgZm9yIChwcm9wZXJ0eSBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICBzb3VyY2VbcHJvcGVydHldID0gcHJvcGVydGllc1twcm9wZXJ0eV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coc291cmNlKTtcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0aWFsaXplRXZlbnRzKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmNsb3NlQnV0dG9uKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXkpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2UuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zaXRpb25TZWxlY3QoKSB7XG4gICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGlmIChlbC5zdHlsZS5XZWJraXRUcmFuc2l0aW9uKSByZXR1cm4gXCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCI7XG4gICAgICAgIGlmIChlbC5zdHlsZS5PVHJhbnNpdGlvbikgcmV0dXJuIFwib1RyYW5zaXRpb25FbmRcIjtcbiAgICAgICAgcmV0dXJuICd0cmFuc2l0aW9uZW5kJztcbiAgICB9XG5cbn07XG5cbi8vdmFyIG15Q29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50Jyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kYWwuanMiXSwic291cmNlUm9vdCI6IiJ9