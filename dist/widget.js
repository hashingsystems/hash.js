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
    redirect: '{ "nonPayingAccount": "/insufficient-amount/", "noAccount": "/account-not-paired/", "homePage": "/", "success:/success"}',
    submissionnode: "0.0.11",
    memo: Date.now(),
    recipientlist: '[{ "to": "0.0.99", "tinybars": "10000000" }]',
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
  production: false
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
  'createhederaobject', 'createcontractobject', //main initial method to check readyness for performing transaction
  'init', //transaction related methods
  'makepayment', 'makeTransaction', 'checktransaction', 'assist_transaction', //modal related methods
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
/* harmony export (immutable) */ __webpack_exports__["assist_transaction"] = assist_transaction;
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
    txn_success: false,
    time: params.time,
    message: null
  };
  response.validBrowser = __WEBPACK_IMPORTED_MODULE_2__libraries__["d" /* isChrome */]();
  if (response.validBrowser === false) response.message = "The browser is not chrome";
  response.ismobile = __WEBPACK_IMPORTED_MODULE_2__libraries__["b" /* detectmob */]();
  __WEBPACK_IMPORTED_MODULE_2__libraries__["a" /* detect */](params.extensionid, function () {
    response.extensionInstalled = false;
    response.message = "Extension Not Installed";
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
                  response.message = __WEBPACK_IMPORTED_MODULE_4__services__["a" /* prechecker */](ajaxresp.response[0].nodeprecheck);
                  callback(null, response);
                } else {
                  console.log(response);
                  response.message = 'Transaction failed, this is mostly due to extension not being able to detect hedera object, please refresh the page.';
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
        response.message = "Hedera object could not be detected, please try again refreshing the page.";
        callback(false, response);
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
function assist_transaction(configuration, callback) {
  var response = {
    accountPaired: false,
    ismobile: null,
    validBrowser: null,
    extensionInstalled: null,
    accessToAccounts: null,
    accountId: null,
    submissionNode: params.submissionnode,
    error: null,
    txn_success: false,
    time: configuration.time
  };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2IxNzYxNWRlMWRlNDg0MmVmZTMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9nZW5lcmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYnJhcmllcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWV0aG9kcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kYWwuanMiXSwibmFtZXMiOlsicGluZyIsInByZWNoZWNrZXIiLCJuIiwianNvbiIsInByb2R1Y3Rpb24iLCJDb25maWciLCJ0b2RheSIsIkRhdGUiLCJkYXRlIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImdldERhdGUiLCJ0aW1lIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZGF0ZVRpbWUiLCJ0aW1lc3RhbXAiLCJnZXRUaW1lIiwiZ2V0bW9kYWxDb250ZW50IiwiY29uc3RydWN0Q29uZmlndXJhdGlvbiIsInBheW1lbnRzZXJ2ZXIiLCJleHRlbnNpb25pZCIsImVycm9yIiwidHlwZSIsIm5vdyIsInJlZGlyZWN0Iiwic3VibWlzc2lvbm5vZGUiLCJtZW1vIiwicmVjaXBpZW50bGlzdCIsImNvbnRlbnRpZCIsImF0dHJJRCIsImlkIiwid2luZG93IiwibG9jYXRpb24iLCJwYXRobmFtZSIsImNvbmZpZyIsImRldGVjdG1vYiIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIm1hdGNoIiwiZGV0ZWN0IiwiZXh0ZW5zaW9uSWQiLCJub3RJbnN0YWxsZWRDYWxsYmFjayIsImluc3RhbGxlZENhbGxiYWNrIiwiaW1nIiwiSW1hZ2UiLCJjb25zb2xlIiwibG9nIiwib25lcnJvciIsIm9ubG9hZCIsInNyYyIsImV4dGVuZE9iamVjdCIsImEiLCJiIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJpc0Nocm9tZSIsInN1cHBvcnRlZEFQSSIsIm1ldGhvZHMiLCJjb25maWd1cmF0aW9ucyIsImdlbmVyYWwiLCJhcHAiLCJnbG9iYWxPYmplY3QiLCJxdWV1ZSIsInEiLCJpIiwibGVuZ3RoIiwibGlicmFyaWVzIiwibWV0aG9kIiwiY2FsbGJhY2siLCJpbmRleE9mIiwiRXJyb3IiLCJBcGlzIiwidGVzdCIsImNyZWF0ZUhlZGVyYU9iamVjdCIsInBhcmFtcyIsIm9iamVjdCIsIkhlZGVyYW9iamVjdCIsIm5vZGUiLCJib2R5IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsImNyZWF0ZUNvbnRyYWN0T2JqZWN0IiwiX19jb25zdHJ1Y3QiLCJjb250cmFjdGlkIiwibWF4aW11bSIsImFiaSIsIkpTT04iLCJzdHJpbmdpZnkiLCJwYXJzZSIsImV4dGVuZGVkIiwiQ29udHJhY3RvYmplY3QiLCJjaGVja1RyYW5zYWN0aW9uIiwibWVtb19pZCIsImNvbmZpZ3VyYXRpb24iLCJ1cmwiLCJzdHJ1Y3R1cmUiLCJiYXNldXJsIiwicmVjZWl2ZXJfaWQiLCJzdWNjZXNzIiwiZmFpbHVyZSIsInRpbWVvdXQiLCJsaW1pdCIsIlVSTCIsInNldFRpbWVvdXQiLCJwZXJmb3JtUmVxdWVzdCIsImluaXQiLCJyZXNwb25zZSIsImFjY291bnRQYWlyZWQiLCJpc21vYmlsZSIsInZhbGlkQnJvd3NlciIsImV4dGVuc2lvbkluc3RhbGxlZCIsImFjY2Vzc1RvQWNjb3VudHMiLCJhY2NvdW50SWQiLCJzdWJtaXNzaW9uTm9kZSIsInR4bl9zdWNjZXNzIiwibWVzc2FnZSIsImVyciIsImhvYmplY3QiLCJ4aHR0cCIsIlhNTEh0dHBSZXF1ZXN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsImFqYXhyZXNwIiwic2VydmljZXMiLCJub2RlcHJlY2hlY2siLCJzZW5kZXIiLCJvcGVuIiwic2VuZCIsImdldG1vZGFsIiwibXlDb250ZW50IiwibXlNb2RhbCIsIk1vZGFsIiwiY29udGVudCIsIm1ha2VUcmFuc2FjdGlvbiIsInRyYW5zYWN0aW9uX3Byb2Nlc2luZyIsInRyYW5zYWN0aW9uX2ZhaWxlZCIsInRyYW5zYWN0aW9uX3N1Y2Nlc3MiLCJyZXMiLCJhc3Npc3RfdHJhbnNhY3Rpb24iLCJjbG9zZUJ1dHRvbiIsIm1vZGFsIiwib3ZlcmxheSIsInRyYW5zaXRpb25FbmQiLCJ0cmFuc2l0aW9uU2VsZWN0IiwiZGVmYXVsdHMiLCJhdXRvT3BlbiIsImNsYXNzTmFtZSIsIm1heFdpZHRoIiwibWluV2lkdGgiLCJhcmd1bWVudHMiLCJvcHRpb25zIiwiZXh0ZW5kRGVmYXVsdHMiLCJwcm90b3R5cGUiLCJjbG9zZSIsIl8iLCJyZXBsYWNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImJ1aWxkT3V0IiwiY2FsbCIsImluaXRpYWxpemVFdmVudHMiLCJnZXRDb21wdXRlZFN0eWxlIiwiaGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJxdWVyeVNlbGVjdG9yIiwib25jbGljayIsInN0eWxlIiwiZGlzcGxheSIsImNvbnRlbnRIb2xkZXIiLCJkb2NGcmFnIiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImltZ2NoYW5nZUZ1bmN0aW9uIiwiY2hib3hzIiwiZ2V0RWxlbWVudHNCeU5hbWUiLCJ2YXJfY2hlY2siLCJpbWdfYWxsIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImNoZWNrZWQiLCJjb25jYXQiLCJ2YWx1ZSIsInNvdXJjZSIsInByb3BlcnRpZXMiLCJwcm9wZXJ0eSIsImJpbmQiLCJlbCIsIldlYmtpdFRyYW5zaXRpb24iLCJPVHJhbnNpdGlvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUExQixDQUFKLEVBQXlDO0FBQ3JDRixZQUFNLENBQUNFLFFBQUQsQ0FBTixHQUFtQkQsVUFBVSxDQUFDQyxRQUFELENBQTdCO0FBQ0g7QUFDSjs7QUFDRCxTQUFPRixNQUFQO0FBQ0g7O0FBRUQsU0FBU3ZCLGdCQUFULEdBQTRCO0FBQ3hCLE1BQUksS0FBS3RCLFdBQVQsRUFBc0I7QUFDbEIsU0FBS0EsV0FBTCxDQUFpQmlCLGdCQUFqQixDQUFrQyxPQUFsQyxFQUEyQyxLQUFLSCxLQUFMLENBQVdrQyxJQUFYLENBQWdCLElBQWhCLENBQTNDO0FBQ0g7O0FBRUQsTUFBSSxLQUFLOUMsT0FBVCxFQUFrQjtBQUNkLFNBQUtBLE9BQUwsQ0FBYWUsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUMsS0FBS0gsS0FBTCxDQUFXa0MsSUFBWCxDQUFnQixJQUFoQixDQUF2QztBQUNIO0FBRUo7O0FBRUQsU0FBUzVDLGdCQUFULEdBQTRCO0FBQ3hCLE1BQUk2QyxFQUFFLEdBQUcvRyxRQUFRLENBQUNnRyxhQUFULENBQXVCLEtBQXZCLENBQVQ7QUFDQSxNQUFJZSxFQUFFLENBQUNwQixLQUFILENBQVNxQixnQkFBYixFQUErQixPQUFPLHFCQUFQO0FBQy9CLE1BQUlELEVBQUUsQ0FBQ3BCLEtBQUgsQ0FBU3NCLFdBQWIsRUFBMEIsT0FBTyxnQkFBUDtBQUMxQixTQUFPLGVBQVA7QUFDSCxDLENBQ0Q7OztBQUNBQyxNQUFNLENBQUNDLE9BQVAsQ0FBZTdELEtBQWYsR0FBdUJBLEtBQXZCLEMiLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgN2IxNzYxNWRlMWRlNDg0MmVmZTMiLCJleHBvcnQgZnVuY3Rpb24gcGluZygpIHtcbiAgICByZXR1cm4gJ3BvbmcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJlY2hlY2tlcihuKSB7XG4gICAgbGV0IGpzb24gPSB7MDogXCJPS1wiLCAxOiBcIklOVkFMSURfVFJBTlNBQ1RJT05cIiwgMjogXCJQQVlFUl9BQ0NPVU5UX05PVF9GT1VORFwiLCAzOiBcIklOVkFMSURfTk9ERV9BQ0NPVU5UXCIsIDQ6IFwiVFJBTlNBQ1RJT05fRVhQSVJFRFwiLCA1OiBcIklOVkFMSURfVFJBTlNBQ1RJT05fU1RBUlRcIiwgNjogXCJJTlZBTElEX1RSQU5TQUNUSU9OX0RVUkFUSU9OXCIsIDc6IFwiSU5WQUxJRF9TSUdOQVRVUkVcIiwgODogXCJNRU1PX1RPT19MT05HXCIsIDk6IFwiSU5TVUZGSUNJRU5UX1RYX0ZFRVwiLCAxMDogXCJJTlNVRkZJQ0lFTlRfUEFZRVJfQkFMQU5DRVwiLCAxMTogXCJEVVBMSUNBVEVfVFJBTlNBQ1RJT05cIiwgMTI6IFwiQlVTWVwiLCAxMzogXCJOT1RfU1VQUE9SVEVEXCIsIDE0OiBcIklOVkFMSURfRklMRV9JRFwiLCAxNTogXCJJTlZBTElEX0FDQ09VTlRfSURcIiwgMTY6IFwiSU5WQUxJRF9DT05UUkFDVF9JRFwiLCAxNzogXCJJTlZBTElEX1RSQU5TQUNUSU9OX0lEXCIsIDE4OiBcIlJFQ0VJUFRfTk9UX0ZPVU5EXCIsIDE5OiBcIlJFQ09SRF9OT1RfRk9VTkRcIiwgMjA6IFwiSU5WQUxJRF9TT0xJRElUWV9JRFwiLCAyMTogXCJVTktOT1dOXCIsIDIyOiBcIlNVQ0NFU1NcIiwgMjM6IFwiRkFJTF9JTlZBTElEXCIsIDI0OiBcIkZBSUxfRkVFXCIsIDI1OiBcIkZBSUxfQkFMQU5DRVwiLCAyNjogXCJLRVlfUkVRVUlSRURcIiwgMjc6IFwiQkFEX0VOQ09ESU5HXCIsIDI4OiBcIklOU1VGRklDSUVOVF9BQ0NPVU5UX0JBTEFOQ0VcIiwgMjk6IFwiSU5WQUxJRF9TT0xJRElUWV9BRERSRVNTXCIsIDMwOiBcIklOU1VGRklDSUVOVF9HQVNcIiwgMzE6IFwiQ09OVFJBQ1RfU0laRV9MSU1JVF9FWENFRURFRFwiLCAzMjogXCJMT0NBTF9DQUxMX01PRElGSUNBVElPTl9FWENFUFRJT05cIiwgMzM6IFwiQ09OVFJBQ1RfUkVWRVJUX0VYRUNVVEVEXCIsIDM0OiBcIkNPTlRSQUNUX0VYRUNVVElPTl9FWENFUFRJT05cIiwgMzU6IFwiSU5WQUxJRF9SRUNFSVZJTkdfTk9ERV9BQ0NPVU5UXCIsIDM2OiBcIk1JU1NJTkdfUVVFUllfSEVBREVSXCIsIDM3OiBcIkFDQ09VTlRfVVBEQVRFX0ZBSUxFRFwiLCAzODogXCJJTlZBTElEX0tFWV9FTkNPRElOR1wiLCAzOTogXCJOVUxMX1NPTElESVRZX0FERFJFU1NcIiwgNDA6IFwiQ09OVFJBQ1RfVVBEQVRFX0ZBSUxFRFwiLCA0MTogXCJJTlZBTElEX1FVRVJZX0hFQURFUlwiLCA0MjogXCJJTlZBTElEX0ZFRV9TVUJNSVRURURcIiwgNDM6IFwiSU5WQUxJRF9QQVlFUl9TSUdOQVRVUkVcIiwgNDQ6IFwiS0VZX05PVF9QUk9WSURFRFwiLCA0NTogXCJJTlZBTElEX0VYUElSQVRJT05fVElNRVwiLCA0NjogXCJOT19XQUNMX0tFWVwiLCA0NzogXCJGSUxFX0NPTlRFTlRfRU1QVFlcIiwgNDg6IFwiSU5WQUxJRF9BQ0NPVU5UX0FNT1VOVFNcIiwgNDk6IFwiRU1QVFlfVFJBTlNBQ1RJT05fQk9EWVwiLCA1MDogXCJJTlZBTElEX1RSQU5TQUNUSU9OX0JPRFlcIiwgNTE6IFwiSU5WQUxJRF9TSUdOQVRVUkVfVFlQRV9NSVNNQVRDSElOR19LRVlcIiwgNTI6IFwiSU5WQUxJRF9TSUdOQVRVUkVfQ09VTlRfTUlTTUFUQ0hJTkdfS0VZXCIsIDUzOiBcIkVNUFRZX0NMQUlNX0JPRFlcIiwgNTQ6IFwiRU1QVFlfQ0xBSU1fSEFTSFwiLCA1NTogXCJFTVBUWV9DTEFJTV9LRVlTXCIsIDU2OiBcIklOVkFMSURfQ0xBSU1fSEFTSF9TSVpFXCIsIDU3OiBcIkVNUFRZX1FVRVJZX0JPRFlcIiwgNTg6IFwiRU1QVFlfQ0xBSU1fUVVFUllcIiwgNTk6IFwiQ0xBSU1fTk9UX0ZPVU5EXCIsIDYwOiBcIkFDQ09VTlRfSURfRE9FU19OT1RfRVhJU1RcIiwgNjE6IFwiQ0xBSU1fQUxSRUFEWV9FWElTVFNcIiwgNjI6IFwiSU5WQUxJRF9GSUxFX1dBQ0xcIiwgNjM6IFwiU0VSSUFMSVpBVElPTl9GQUlMRURcIiwgNjQ6IFwiVFJBTlNBQ1RJT05fT1ZFUlNJWkVcIiwgNjU6IFwiVFJBTlNBQ1RJT05fVE9PX01BTllfTEFZRVJTXCIsIDY2OiBcIkNPTlRSQUNUX0RFTEVURURcIiwgNjc6IFwiUExBVEZPUk1fTk9UX0FDVElWRVwiLCA2ODogXCJLRVlfUFJFRklYX01JU01BVENIXCIsIDY5OiBcIlBMQVRGT1JNX1RSQU5TQUNUSU9OX05PVF9DUkVBVEVEXCIsIDcwOiBcIklOVkFMSURfUkVORVdBTF9QRVJJT0RcIiwgNzE6IFwiSU5WQUxJRF9QQVlFUl9BQ0NPVU5UX0lEXCIsIDcyOiBcIkFDQ09VTlRfREVMRVRFRFwiLCA3MzogXCJGSUxFX0RFTEVURURcIiwgNzQ6IFwiQUNDT1VOVF9SRVBFQVRFRF9JTl9BQ0NPVU5UX0FNT1VOVFNcIiwgNzU6IFwiU0VUVElOR19ORUdBVElWRV9BQ0NPVU5UX0JBTEFOQ0VcIiwgNzY6IFwiT0JUQUlORVJfUkVRVUlSRURcIiwgNzc6IFwiT0JUQUlORVJfU0FNRV9DT05UUkFDVF9JRFwiLCA3ODogXCJPQlRBSU5FUl9ET0VTX05PVF9FWElTVFwiLCA3OTogXCJNT0RJRllJTkdfSU1NVVRBQkxFX0NPTlRSQUNUXCIsIDgwOiBcIkZJTEVfU1lTVEVNX0VYQ0VQVElPTlwiLCA4MTogXCJBVVRPUkVORVdfRFVSQVRJT05fTk9UX0lOX1JBTkdFXCIsIDgyOiBcIkVSUk9SX0RFQ09ESU5HX0JZVEVTVFJJTkdcIiwgODM6IFwiQ09OVFJBQ1RfRklMRV9FTVBUWVwiLCA4NDogXCJDT05UUkFDVF9CWVRFQ09ERV9FTVBUWVwiLCA4NTogXCJJTlZBTElEX0lOSVRJQUxfQkFMQU5DRVwiLCA4NjogXCJJTlZBTElEX1JFQ0VJVkVfUkVDT1JEX1RIUkVTSE9MRFwiLCA4NzogXCJJTlZBTElEX1NFTkRfUkVDT1JEX1RIUkVTSE9MRFwiLCA4ODogXCJBQ0NPVU5UX0lTX05PVF9HRU5FU0lTX0FDQ09VTlRcIn1cbiAgICAgcmV0dXJuIGpzb25bbl07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmljZXMuanMiLCJpbXBvcnQgKiBhcyBDb25maWcgZnJvbSAnLi9jb25maWcnO1xuXG5sZXQgcHJvZHVjdGlvbiA9IENvbmZpZy5kZWZhdWx0LnByb2R1Y3Rpb247XG5cbmxldCB0b2RheSA9IG5ldyBEYXRlKCksXG4gICAgZGF0ZSA9IHRvZGF5LmdldEZ1bGxZZWFyKCkgKyAnLScgKyAodG9kYXkuZ2V0TW9udGgoKSArIDEpICsgJy0nICsgdG9kYXkuZ2V0RGF0ZSgpLFxuICAgIHRpbWUgPSB0b2RheS5nZXRIb3VycygpICsgXCI6XCIgKyB0b2RheS5nZXRNaW51dGVzKCksXG4gICAgZGF0ZVRpbWUgPSBkYXRlICsgJyAnICsgdGltZSxcbiAgICB0aW1lc3RhbXAgPSBuZXcgRGF0ZShkYXRlVGltZSkuZ2V0VGltZSgpO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0bW9kYWxDb250ZW50KCkge1xuICAgIHJldHVybiAnPGRpdiBjbGFzcz1cInBvcHVwX291dGVyX3dyYXBcIj5cXG4nICtcbiAgICAnXFx0ICBcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfd3JhcFwiPlxcbicgK1xuICAgICdcXHQgIFxcdFxcdDxkaXYgY2xhc3M9XCJwb3B1cF9oZWFkZXJcIj5TZXR1cCBUYXNrIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBjbGFzcz1cInBvcHVwX2Nsb3NlXCIgaWQ9XCJwb3B1cC1jbG9zZS1idG5cIj54PC9hPjwvZGl2PlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnXFx0ICBcXHRcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfaW5uZXJcIj5cXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfaW5uZXJfbGVmdFwiPlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHRcXHQ8Zm9ybSBhY3Rpb249XCIvYWN0aW9uX3BhZ2UucGhwXCIgY2xhc3M9XCJwb3B1cF9mb3JtXCI+XFxuJyArXG4gICAgJ1xcdFxcdFxcdFxcdFxcdCAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG9uY2hhbmdlPSBcImltZ2NoYW5nZUZ1bmN0aW9uKClcIiBpZD1cImltZ19vbmVcIiBjbGFzcz1cInBvcHVwX2Noa2JveCB0b2dnbGVfX2lucHV0XCIgbmFtZT1cImltZ19jaGtib3hcIiB2YWx1ZT1cImltZ19vbmVcIj5cXG4nICtcbiAgICAnXFx0XFx0XFx0XFx0XFx0ICA8bGFiZWwgZm9yPVwiaW1nX29uZVwiPiZuYnNwOyBJbnN0YWxsIEhlZGVyYSBXYWxsZXQ8L2xhYmVsPlxcbicgK1xuICAgICdcXHRcXHRcXHRcXHRcXHQgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBvbmNoYW5nZT0gXCJpbWdjaGFuZ2VGdW5jdGlvbigpXCIgaWQ9XCJpbWdfdHdvXCIgY2xhc3M9XCJwb3B1cF9jaGtib3ggdG9nZ2xlX19pbnB1dFwiIG5hbWU9XCJpbWdfY2hrYm94XCIgdmFsdWU9XCJpbWdfdHdvXCI+XFxuJyArXG4gICAgJ1xcdFxcdFxcdFxcdFxcdCAgPGxhYmVsIGZvcj1cImltZ190d29cIj4mbmJzcDsgXCJQYWlyIHlvdXIgQWNjb3VudFwiPC9sYWJlbD5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJ1xcdFxcdFxcdFxcdFxcdCAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG9uY2hhbmdlPSBcImltZ2NoYW5nZUZ1bmN0aW9uKClcIiBpZD1cImltZ190aHJlZVwiIGNsYXNzPVwicG9wdXBfY2hrYm94IHRvZ2dsZV9faW5wdXRcIiBuYW1lPVwiaW1nX2Noa2JveFwiIHZhbHVlPVwiaW1nX3RocmVlXCI+XFxuJyArXG4gICAgJ1xcdFxcdFxcdFxcdFxcdCAgPGxhYmVsIGZvcj1cImltZ190aHJlZVwiPiZuYnNwOyBcIkFsbG93IFBheW1lbnQgUmVxdWVzdHNcIjwvbGFiZWw+XFxuJyArXG4gICAgJ1xcbicgK1xuICAgICdcXHRcXHRcXHRcXHRcXHQgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBvbmNoYW5nZT0gXCJpbWdjaGFuZ2VGdW5jdGlvbigpXCIgaWQ9XCJpbWdfZm91clwiIGNsYXNzPVwicG9wdXBfY2hrYm94IHRvZ2dsZV9faW5wdXRcIiBuYW1lPVwiaW1nX2Noa2JveFwiIHZhbHVlPVwiaW1nX2ZvdXJcIj5cXG4nICtcbiAgICAnXFx0XFx0XFx0XFx0XFx0ICA8bGFiZWwgZm9yPVwiaW1nX2ZvdXJcIj4mbmJzcDsgXCJHZXQgc29tZSBIQkFSXCI8L2xhYmVsPlxcbicgK1xuICAgICdcXHRcXHRcXHRcXHRcXHQ8L2Zvcm0+XFxuJyArXG4gICAgJ1xcbicgK1xuICAgICdcXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfbG9nb1wiPlxcbicgK1xuICAgICdcXHRcXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwibG9nb190eHRcIj5Qb3dlcmVkIGJ5PC9kaXY+XFxuJyArXG4gICAgJ1xcdFxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJsb2dvX2ljb25cIj48aW1nIHNyYz1cIi8vYXBpLmhhc2hpbmdzeXN0ZW1zLmNvbS9pbWcvcG9wdXBfbG9nby5wbmdcIj48L2Rpdj5cXG4nICtcbiAgICAnXFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0XFx0XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0PC9kaXY+XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0PGRpdiBjbGFzcz1cInBvcHVwX2lubmVyX3JpZ2h0XCI+XFxuJyArXG4gICAgJ1xcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJwb3B1cF9pbWdfc2VjXCI+XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0XFx0XFx0PGltZyBjbGFzcz1cImltZ19vbmVcIiBzcmM9XCIvL2FwaS5oYXNoaW5nc3lzdGVtcy5jb20vaW1nL2ltZ19vbmUucG5nXCI+XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0XFx0XFx0PGltZyBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCIgY2xhc3M9XCJpbWdfdHdvXCIgc3JjPVwiLy9hcGkuaGFzaGluZ3N5c3RlbXMuY29tL2ltZy9pbWdfdHdvLnBuZ1wiPlxcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdFxcdFxcdDxpbWcgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiIGNsYXNzPVwiaW1nX3RocmVlXCIgc3JjPVwiLy9hcGkuaGFzaGluZ3N5c3RlbXMuY29tL2ltZy9pbWdfdGhyZWUucG5nXCI+XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0XFx0XFx0PGltZyBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCIgY2xhc3M9XCJpbWdfZm91clwiIHNyYz1cIi8vYXBpLmhhc2hpbmdzeXN0ZW1zLmNvbS9pbWcvaW1nX2ZvdXIucG5nXCI+XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0XFx0PC9kaXY+XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cInR4dF93cmFwXCI+XFxuJyArXG4gICAgJ1xcdFxcdCAgXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cInR4dF9oZWFkZXJcIj5MZXRzIGdldCB5b3Ugc3RhcnRlZCE8L2Rpdj5cXG4nICtcbiAgICAnXFx0XFx0ICBcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwidHh0X2NvbnRlbnRcIj5Mb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdCwgc2VkIGRvIGVpdXNtb2QgdGVtcG9yIGluY2lkaWR1bnQgdXQgbGFib3JlIGV0IDwvZGl2PlxcbicgK1xuICAgICdcXHRcXHQgIFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJwb3B1cF9idG5cIj5cXG4nICtcbiAgICAnXFx0XFx0ICBcXHRcXHRcXHRcXHRcXHQ8YSBocmVmPVwiXCI+SVxcJ20gUmVhZHk8L2E+XFxuJyArXG4gICAgJ1xcdFxcdCAgXFx0XFx0XFx0XFx0PC9kaXY+XFxuJyArXG4gICAgJ1xcdFxcdCAgXFx0XFx0XFx0PC9kaXY+XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0XFx0XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0PC9kaXY+XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0PC9kaXY+XFxuJyArXG4gICAgJ1xcdCAgXFx0PC9kaXY+Jztcbn1cblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjb25zdHJ1Y3RDb25maWd1cmF0aW9uKCl7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGF5bWVudHNlcnZlcjogcHJvZHVjdGlvbiA/IFwiaHR0cHM6Ly9tcHMuaGFzaGluZ3N5c3RlbXMuY29tXCIgOiAnaHR0cDovL2xvY2FsaG9zdDo5OTk5JyxcbiAgICAgICAgZXh0ZW5zaW9uaWQ6IFwibGlncGFvbmRhYWJjbGZpZ2FnY2lmb2JhZWxlbWllbmFcIixcbiAgICAgICAgZXJyb3I6IFwiL25vLWV4dGVuc2lvblwiLFxuICAgICAgICB0eXBlOiBcImFydGljbGVcIixcbiAgICAgICAgdGltZTogRGF0ZS5ub3coKSxcbiAgICAgICAgcmVkaXJlY3Q6ICd7IFwibm9uUGF5aW5nQWNjb3VudFwiOiBcIi9pbnN1ZmZpY2llbnQtYW1vdW50L1wiLCBcIm5vQWNjb3VudFwiOiBcIi9hY2NvdW50LW5vdC1wYWlyZWQvXCIsIFwiaG9tZVBhZ2VcIjogXCIvXCIsIFwic3VjY2Vzczovc3VjY2Vzc1wifScsXG4gICAgICAgIHN1Ym1pc3Npb25ub2RlOiBcIjAuMC4xMVwiLFxuICAgICAgICBtZW1vOiBEYXRlLm5vdygpLFxuICAgICAgICByZWNpcGllbnRsaXN0OiAnW3sgXCJ0b1wiOiBcIjAuMC45OVwiLCBcInRpbnliYXJzXCI6IFwiMTAwMDAwMDBcIiB9XScsXG4gICAgICAgIGNvbnRlbnRpZDogJzc5JyxcbiAgICAgICAgYXR0cklEOiAnYXJ0aWNsZS0xJyxcbiAgICAgICAgdGltZXN0YW1wOiB0aW1lc3RhbXAsXG4gICAgICAgIC8qdGhpcyBtaWdodCBtYWtlIGEgZ29vZCBkZWZhdWx0IGlkIGZvciB0aGUgY29udGVudCovXG4gICAgICAgIGlkOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nZW5lcmFsLmpzIiwiY29uc3QgY29uZmlnID0ge1xuICAgICBwcm9kdWN0aW9uIDogZmFsc2Vcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZ1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbmZpZy5qcyIsImV4cG9ydCBmdW5jdGlvbiBkZXRlY3Rtb2IoKSB7XG4gICAgcmV0dXJuIChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9BbmRyb2lkL2kpXG4gICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL3dlYk9TL2kpXG4gICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQaG9uZS9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGFkL2kpXG4gICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQb2QvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQmxhY2tCZXJyeS9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9XaW5kb3dzIFBob25lL2kpXG4gICAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRldGVjdChleHRlbnNpb25JZCwgbm90SW5zdGFsbGVkQ2FsbGJhY2ssIGluc3RhbGxlZENhbGxiYWNrKSB7XG4gICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGNvbnNvbGUubG9nKGV4dGVuc2lvbklkKTtcbiAgICBpbWcub25lcnJvciA9IG5vdEluc3RhbGxlZENhbGxiYWNrO1xuICAgIGltZy5vbmxvYWQgPSBpbnN0YWxsZWRDYWxsYmFjaztcbiAgICBpbWcuc3JjID0gJ2Nocm9tZS1leHRlbnNpb246Ly8nICsgZXh0ZW5zaW9uSWQgKyAnL2ljb25zL2ljb24xNi5wbmcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kT2JqZWN0KGEsIGIpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gYilcbiAgICAgICAgaWYgKGIuaGFzT3duUHJvcGVydHkoa2V5KSkgYVtrZXldID0gYltrZXldO1xuICAgIHJldHVybiBhO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDaHJvbWUoKSB7XG4gICAgcmV0dXJuICdjaHJvbWUnIGluIHdpbmRvd1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xpYnJhcmllcy5qcyIsImltcG9ydCB7cGluZywgcHJlY2hlY2tlcn0gZnJvbSAnLi9zZXJ2aWNlcyc7XG5pbXBvcnQgKiBhcyBtZXRob2RzIGZyb20gJy4vbWV0aG9kcyc7XG5pbXBvcnQgKiBhcyBnZW5lcmFsIGZyb20gJy4vZ2VuZXJhbCc7XG5pbXBvcnQgKiBhcyBBcGlzIGZyb20gJy4vYXBpcyc7XG5pbXBvcnQgKiBhcyBsaWJyYXJpZXMgZnJvbSAnLi9saWJyYXJpZXMnO1xuXG4vLyBlbmxpc3QgYWxsIG1ldGhvZHMgc3VwcG9ydGVkIGJ5IEFQSSAoZS5nLiBgbXcoJ2V2ZW50JywgJ3VzZXItbG9naW4nKTtgKVxuY29uc3Qgc3VwcG9ydGVkQVBJID0gbWV0aG9kcy5tZXRob2RzKCk7XG4vKipcbiAqIFRoZSBtYWluIGVudHJ5IG9mIHRoZSBhcHBsaWNhdGlvblxuICovXG5cbmxldCBjb25maWd1cmF0aW9ucyA9IGdlbmVyYWwuY29uc3RydWN0Q29uZmlndXJhdGlvbigpO1xuXG5mdW5jdGlvbiBhcHAod2luZG93KSB7XG4gICAgLyogKlxuICAgICAgKiBhbGwgbWV0aG9kcyB0aGF0IHdlcmUgY2FsbGVkIHRpbGwgbm93IGFuZCBzdG9yZWQgaW4gcXVldWVcbiAgICAgICogbmVlZHMgdG8gYmUgY2FsbGVkIG5vd1xuICAgICAgKiAqL1xuICAgIGxldCBnbG9iYWxPYmplY3QgPSB3aW5kb3dbd2luZG93WydIQVNILUpTJ11dO1xuICAgIGxldCBxdWV1ZSA9IGdsb2JhbE9iamVjdC5xO1xuICAgIGNvbnNvbGUubG9nKHF1ZXVlKTtcbiAgICBpZiAocXVldWUpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBjb25maWd1cmF0aW9ucyA9IGxpYnJhcmllcy5leHRlbmRPYmplY3QoY29uZmlndXJhdGlvbnMsIHF1ZXVlW2ldWzFdKTtcbiAgICAgICAgICAgIGxldCBtZXRob2QgPSBxdWV1ZVtpXVswXTtcbiAgICAgICAgICAgIGxldCBjYWxsYmFjaztcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcXVldWVbaV1bMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IHF1ZXVlW2ldWzFdO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcXVldWVbaV1bcXVldWVbMF0ubGVuZ3RoIC0gMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IHF1ZXVlW2ldW3F1ZXVlWzBdLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coc3VwcG9ydGVkQVBJLmluZGV4T2YobWV0aG9kKSk7XG4gICAgICAgICAgICBpZiAoc3VwcG9ydGVkQVBJLmluZGV4T2YobWV0aG9kKSA9PT0gLTEpXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoYE1ldGhvZCAke21ldGhvZH0gaXMgbm90IHN1cHBvcnRlZGApO1xuICAgICAgICAgICAgQXBpc1ttZXRob2RdKGNvbmZpZ3VyYXRpb25zLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gb3ZlcnJpZGUgdGVtcG9yYXJ5ICh1bnRpbCB0aGUgYXBwIGxvYWRlZCkgaGFuZGxlclxuICAgIC8vIGZvciB3aWRnZXQncyBBUEkgY2FsbHNcbiAgICBnbG9iYWxPYmplY3QgPSBBcGlzO1xuICAgIGdsb2JhbE9iamVjdC5jb25maWd1cmF0aW9ucyA9IGNvbmZpZ3VyYXRpb25zO1xufVxuXG5hcHAod2luZG93KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWluLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIG1ldGhvZHMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgLy9vYmplY3QgY3JlYXRpb24gbWV0aG9kc1xuICAgICAgICAnY3JlYXRlaGVkZXJhb2JqZWN0JywgJ2NyZWF0ZWNvbnRyYWN0b2JqZWN0JyxcblxuICAgICAgICAvL21haW4gaW5pdGlhbCBtZXRob2QgdG8gY2hlY2sgcmVhZHluZXNzIGZvciBwZXJmb3JtaW5nIHRyYW5zYWN0aW9uXG4gICAgICAgICdpbml0JyxcblxuICAgICAgICAvL3RyYW5zYWN0aW9uIHJlbGF0ZWQgbWV0aG9kc1xuICAgICAgICAnbWFrZXBheW1lbnQnLCAnbWFrZVRyYW5zYWN0aW9uJywgJ2NoZWNrdHJhbnNhY3Rpb24nLCAnYXNzaXN0X3RyYW5zYWN0aW9uJyxcblxuICAgICAgICAvL21vZGFsIHJlbGF0ZWQgbWV0aG9kc1xuICAgICAgICAnZ2V0bW9kYWwnXG4gICAgXTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tZXRob2RzLmpzIiwiaW1wb3J0ICogYXMgZ2VuZXJhbCBmcm9tICcuL2dlbmVyYWwnO1xuaW1wb3J0IHtNb2RhbH0gZnJvbSAnLi9tb2RhbCc7XG5pbXBvcnQgKiBhcyBsaWJyYXJpZXMgZnJvbSAnLi9saWJyYXJpZXMnO1xuaW1wb3J0ICogYXMgQ29uZmlnIGZyb20gJy4vY29uZmlnJztcbmltcG9ydCAqIGFzIHNlcnZpY2VzIGZyb20gJy4vc2VydmljZXMnO1xuZXhwb3J0IGZ1bmN0aW9uIHRlc3QoKXtcbiAgICByZXR1cm4gJ3RpbmcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSGVkZXJhT2JqZWN0KHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICBsZXQgb2JqZWN0ID0gWydzdWJtaXNzaW9ubm9kZScsICdwYXltZW50c2VydmVyJywgJ3JlY2lwaWVudGxpc3QnLCAnY29udGVudGlkJywgJ3R5cGUnLCAnbWVtbycsICdleHRlbnNpb25pZCcsICdyZWRpcmVjdCcsICd0aW1lJ107XG4gICAgbGV0IEhlZGVyYW9iamVjdCA9ICc8aGVkZXJhLW1pY3JvcGF5bWVudCAnO1xuICAgIGZvciAodmFyIGkgaW4gb2JqZWN0KSB7XG4gICAgICAgIGxldCBub2RlID0gb2JqZWN0W2ldO1xuICAgICAgICBpZiAocGFyYW1zLmhhc093blByb3BlcnR5KG5vZGUpKSB7XG4gICAgICAgICAgICBIZWRlcmFvYmplY3QgKz0gXCJkYXRhLVwiICsgbm9kZSArIFwiPSAnXCIgKyBwYXJhbXNbbm9kZV0gKyBcIicgLCBcIiArIFwiXFxuXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgSGVkZXJhb2JqZWN0ICs9ICc+PC9oZWRlcmEtbWljcm9wYXltZW50Pic7XG4gICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJhbXNbJ2F0dHJJRCddKTtcbiAgICBib2R5LmlubmVySFRNTCArPSBIZWRlcmFvYmplY3Q7XG4gICAgY2FsbGJhY2sobnVsbCxIZWRlcmFvYmplY3QpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29udHJhY3RPYmplY3QocGFyYW1zLCBjYWxsYmFjaykge1xuICAgIGxldCBfX2NvbnN0cnVjdCA9IFsnY29udHJhY3RpZCcsICdtYXhpbXVtJywgJ3BheW1lbnRzZXJ2ZXInLCAncGFyYW1zJywgJ21lbW8nLCAnYWJpJywgJ3JlZGlyZWN0JywgJ2V4dGVuc2lvbmlkJ107XG4gICAgbGV0IG9iamVjdCA9IHtcbiAgICAgICAgY29udHJhY3RpZDogJzAuMC4xMTExJyxcbiAgICAgICAgbWF4aW11bTogJzQyMjM0MjM0MycsXG4gICAgICAgIHBheW1lbnRzZXJ2ZXI6IHBhcmFtcy5wYXltZW50c2VydmVyLFxuICAgICAgICBwYXJhbXM6IFtcIjg2OVwiLCBcIjEwMDAwMDAwMFwiLCBcIjIxNlwiLCBcIjI1M1wiLCBcIjI3XCIsIFwiMHgyMjZiMDg5NzZhZDBkZDk4MmFlYjZiMjFhNDRmM2VhY2FlNTc5NTY5YzM0ZTcxNzI1YWZmODAxYTJmZTY4NzM5XCIsIFwiMHgzMzNmOTkxZmEzYTg3MDU3NWY4MTk1NjllOWY3MmE3NzFlYTc5MDA3OGQ0NDhjYzg3ODkxMjBlZTE0YWJmM2M1XCJdLFxuICAgICAgICBtZW1vOiAnYTRhN2M0MzI5YWFiNGIxZmFjNDc0ZmY2ZjkzZDg1OGMnLFxuICAgICAgICBhYmk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIFwiY29uc3RhbnRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImlucHV0c1wiOiBbe1wibmFtZVwiOiBcInByb3BlcnR5SURcIiwgXCJ0eXBlXCI6IFwidWludDI0XCJ9LCB7XCJuYW1lXCI6IFwiYW1vdW50XCIsIFwidHlwZVwiOiBcInVpbnQyNTZcIn0sIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJ4XCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidWludDE2XCJcbiAgICAgICAgICAgIH0sIHtcIm5hbWVcIjogXCJ5XCIsIFwidHlwZVwiOiBcInVpbnQxNlwifSwge1wibmFtZVwiOiBcInZcIiwgXCJ0eXBlXCI6IFwidWludDhcIn0sIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJyXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwiXG4gICAgICAgICAgICB9LCB7XCJuYW1lXCI6IFwic1wiLCBcInR5cGVcIjogXCJieXRlczMyXCJ9XSxcbiAgICAgICAgICAgIFwibmFtZVwiOiBcImJ1eVByb3BlcnR5XCIsXG4gICAgICAgICAgICBcIm91dHB1dHNcIjogW3tcIm5hbWVcIjogXCJcIiwgXCJ0eXBlXCI6IFwic3RyaW5nXCJ9XSxcbiAgICAgICAgICAgIFwicGF5YWJsZVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJzdGF0ZU11dGFiaWxpdHlcIjogXCJwYXlhYmxlXCIsXG4gICAgICAgICAgICBcInR5cGVcIjogXCJmdW5jdGlvblwiXG4gICAgICAgIH0pLFxuICAgICAgICByZWRpcmVjdDogJ3tcIm5vblBheWluZ0FjY291bnRcIjogXCIvaW5zdWZmaWNpZW50LWFtb3VudC9cIixcIm5vQWNjb3VudFwiOiBcIi9hY2NvdW50LW5vdC1wYWlyZWRcIixcImhvbWVQYWdlXCI6IFwiL1wifScsXG4gICAgICAgIGV4dGVuc2lvbmlkOiAncGRqanBjb2xnbW1jaWZpanBlamtlbnBiYmltZWRwaWMnLFxuICAgIH07XG5cbiAgICBjb25zb2xlLmxvZyhKU09OLnBhcnNlKG9iamVjdC5hYmkpKTtcbiAgICBsZXQgZXh0ZW5kZWQgPSBsaWJyYXJpZXMuZXh0ZW5kT2JqZWN0KG9iamVjdCwgcGFyYW1zKTtcbiAgICBjb25zb2xlLmxvZyhleHRlbmRlZCk7XG4gICAgbGV0IENvbnRyYWN0b2JqZWN0ID0gJzxoZWRlcmEtY29udHJhY3QgJztcbiAgICBmb3IgKHZhciBpIGluIF9fY29uc3RydWN0KSB7XG4gICAgICAgIGxldCBub2RlID0gX19jb25zdHJ1Y3RbaV07XG4gICAgICAgIGlmIChleHRlbmRlZC5oYXNPd25Qcm9wZXJ0eShub2RlKSkge1xuICAgICAgICAgICAgQ29udHJhY3RvYmplY3QgKz0gXCJkYXRhLVwiICsgbm9kZSArIFwiPSAnXCIgKyBleHRlbmRlZFtub2RlXSArIFwiJyBcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBDb250cmFjdG9iamVjdCArPSAnPjwvaGVkZXJhLWNvbnRyYWN0Pic7XG4gICAgY29uc29sZS5sb2coQ29udHJhY3RvYmplY3QpO1xuXG4gICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChleHRlbmRlZFsnYXR0cklEJ10pO1xuICAgIGJvZHkuaW5uZXJIVE1MICs9IENvbnRyYWN0b2JqZWN0O1xuICAgIGNhbGxiYWNrKG51bGwsQ29udHJhY3RvYmplY3QpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tUcmFuc2FjdGlvbihwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgbGV0IG1lbW9faWQgPSBwYXJhbXMuY29uZmlndXJhdGlvbi5tZW1vO1xuICAgIGxldCB1cmwgPSBDb25maWcuZGVmYXVsdC5wcm9kdWN0aW9uID8gXCJodHRwczovL21wcy5oYXNoaW5nc3lzdGVtcy5jb21cIiA6ICdodHRwOi8vbG9jYWxob3N0Ojk5OTknO1xuICAgIGxldCBzdHJ1Y3R1cmUgPSB7XG4gICAgICAgIGJhc2V1cmw6IHVybCxcbiAgICAgICAgbWVtb19pZDogbWVtb19pZCxcbiAgICAgICAgcmVjZWl2ZXJfaWQ6ICcnLFxuICAgICAgICBzdWNjZXNzOiAnL3N1Y2Nlc3MnLFxuICAgICAgICBmYWlsdXJlOiAnL3BheW1lbnQtZmFpbGVkJyxcbiAgICAgICAgdGltZW91dDogMzAwMCxcbiAgICAgICAgbGltaXQ6IDFcbiAgICB9O1xuXG4gICAgZm9yICh2YXIga2V5IGluIHBhcmFtcy5wYXJhbXMpIHtcbiAgICAgICAgaWYgKHBhcmFtcy5wYXJhbXMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBwYXJhbXMucGFyYW1zW2tleV0pIHtcbiAgICAgICAgICAgIHN0cnVjdHVyZVtrZXldID0gcGFyYW1zLnBhcmFtc1trZXldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN0cnVjdHVyZS5yZWNlaXZlcl9pZCAmJiBzdHJ1Y3R1cmUubWVtb19pZCkge1xuICAgICAgICBVUkwgPSBzdHJ1Y3R1cmUuYmFzZXVybCArIFwiL2NoZWNrL1wiICsgc3RydWN0dXJlLnJlY2VpdmVyX2lkICsgXCIvXCIgKyBzdHJ1Y3R1cmUubWVtb19pZFxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzdHJ1Y3R1cmUudGltZXN0YW1wKVxuICAgICAgICAgICAgVVJMID0gc3RydWN0dXJlLmJhc2V1cmwgKyBcIi9tZW1vL1wiICsgc3RydWN0dXJlLm1lbW9faWQgKyAnP2xpbWl0PScgKyBzdHJ1Y3R1cmUubGltaXQgKyAnJnRpbWVzdGFtcD0nICsgc3RydWN0dXJlLnRpbWVzdGFtcDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgVVJMID0gc3RydWN0dXJlLmJhc2V1cmwgKyBcIi9tZW1vL1wiICsgc3RydWN0dXJlLm1lbW9faWQgKyAnP2xpbWl0PScgKyBzdHJ1Y3R1cmUubGltaXQ7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coc3RydWN0dXJlLnRpbWVvdXQpO1xuICAgIC8vc2V0VGltZW91dChwZXJmb3JtUmVxdWVzdChzdHJ1Y3R1cmUpLCBzdHJ1Y3R1cmUudGltZW91dClcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcGVyZm9ybVJlcXVlc3Qoc3RydWN0dXJlKTtcbiAgICB9LCBzdHJ1Y3R1cmUudGltZW91dCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICBsZXQgcmVzcG9uc2UgPSB7XG4gICAgICAgIGFjY291bnRQYWlyZWQ6IGZhbHNlLFxuICAgICAgICBpc21vYmlsZTogbnVsbCxcbiAgICAgICAgdmFsaWRCcm93c2VyOiBudWxsLFxuICAgICAgICBleHRlbnNpb25JbnN0YWxsZWQ6IG51bGwsXG4gICAgICAgIGFjY2Vzc1RvQWNjb3VudHM6IG51bGwsXG4gICAgICAgIGFjY291bnRJZDogbnVsbCxcbiAgICAgICAgc3VibWlzc2lvbk5vZGU6IHBhcmFtcy5zdWJtaXNzaW9ubm9kZSxcbiAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgIHR4bl9zdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgdGltZTogcGFyYW1zLnRpbWUsXG4gICAgICAgIG1lc3NhZ2U6IG51bGxcbiAgICB9O1xuICAgIHJlc3BvbnNlLnZhbGlkQnJvd3NlciA9IGxpYnJhcmllcy5pc0Nocm9tZSgpO1xuICAgIGlmKHJlc3BvbnNlLnZhbGlkQnJvd3Nlcj09PWZhbHNlKVxuICAgICAgICByZXNwb25zZS5tZXNzYWdlID0gXCJUaGUgYnJvd3NlciBpcyBub3QgY2hyb21lXCI7XG4gICAgcmVzcG9uc2UuaXNtb2JpbGUgPSBsaWJyYXJpZXMuZGV0ZWN0bW9iKCk7XG4gICAgbGlicmFyaWVzLmRldGVjdChwYXJhbXMuZXh0ZW5zaW9uaWQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVzcG9uc2UuZXh0ZW5zaW9uSW5zdGFsbGVkID0gZmFsc2U7XG4gICAgICAgIHJlc3BvbnNlLm1lc3NhZ2UgPSBcIkV4dGVuc2lvbiBOb3QgSW5zdGFsbGVkXCI7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlc3BvbnNlLmV4dGVuc2lvbkluc3RhbGxlZCA9IHRydWU7XG4gICAgICAgIGNyZWF0ZUhlZGVyYU9iamVjdChwYXJhbXMsIGZ1bmN0aW9uKGVyciwgaG9iamVjdCl7XG4gICAgICAgICAgICBpZihob2JqZWN0KXtcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gQ29uZmlnLmRlZmF1bHQucHJvZHVjdGlvbiA/IFwiaHR0cHM6Ly9tcHMuaGFzaGluZ3N5c3RlbXMuY29tXCIgOiAnaHR0cDovL2xvY2FsaG9zdDo5OTk5JztcbiAgICAgICAgICAgICAgICBVUkwgPSB1cmwgKyBcIi9tZW1vL1wiICsgcGFyYW1zLm1lbW87XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgICAgICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFqYXhyZXNwID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYWpheHJlc3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWpheHJlc3AucmVzcG9uc2UubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2VydmljZXMucHJlY2hlY2tlcihhamF4cmVzcC5yZXNwb25zZVswXS5ub2RlcHJlY2hlY2spKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmFjY291bnRJZCA9IGFqYXhyZXNwLnJlc3BvbnNlWzBdLnNlbmRlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmFjY291bnRQYWlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuYWNjZXNzVG9BY2NvdW50cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWpheHJlc3AucmVzcG9uc2VbMF0ubm9kZXByZWNoZWNrID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UudHhuX3N1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZXJyb3IgPSBzZXJ2aWNlcy5wcmVjaGVja2VyKGFqYXhyZXNwLnJlc3BvbnNlWzBdLm5vZGVwcmVjaGVjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5tZXNzYWdlID0gc2VydmljZXMucHJlY2hlY2tlcihhamF4cmVzcC5yZXNwb25zZVswXS5ub2RlcHJlY2hlY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UubWVzc2FnZSA9ICdUcmFuc2FjdGlvbiBmYWlsZWQsIHRoaXMgaXMgbW9zdGx5IGR1ZSB0byBleHRlbnNpb24gbm90IGJlaW5nIGFibGUgdG8gZGV0ZWN0IGhlZGVyYSBvYmplY3QsIHBsZWFzZSByZWZyZXNoIHRoZSBwYWdlLic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5hY2NvdW50UGFpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmFjY2Vzc1RvQWNjb3VudHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgeGh0dHAub3BlbihcIkdFVFwiLCBVUkwsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB4aHR0cC5zZW5kKCk7XG4gICAgICAgICAgICAgICAgfSwgNTAwMCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5tZXNzYWdlID0gXCJIZWRlcmEgb2JqZWN0IGNvdWxkIG5vdCBiZSBkZXRlY3RlZCwgcGxlYXNlIHRyeSBhZ2FpbiByZWZyZXNoaW5nIHRoZSBwYWdlLlwiO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGZhbHNlLCByZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvL2NhbGxiYWNrKG51bGwscmVzcG9uc2UpO1xuICAgIH0pO1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRtb2RhbCgpIHtcbiAgICB2YXIgbXlDb250ZW50ID0gZ2VuZXJhbC5nZXRtb2RhbENvbnRlbnQoKTtcbiAgICB2YXIgbXlNb2RhbCA9IG5ldyBNb2RhbCh7XG4gICAgICAgIGNvbnRlbnQ6IG15Q29udGVudFxuICAgIH0pO1xuICAgIG15TW9kYWwub3BlbigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZVRyYW5zYWN0aW9uKGNvbmZpZ3VyYXRpb24sIGNhbGxiYWNrKSB7XG4gICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgICAgdHJhbnNhY3Rpb25fcHJvY2VzaW5nOiB0cnVlLFxuICAgICAgICB0cmFuc2FjdGlvbl9mYWlsZWQ6IGZhbHNlLFxuICAgICAgICB0cmFuc2FjdGlvbl9zdWNjZXNzOiBmYWxzZVxuICAgIH07XG4gICAgaW5pdChjb25maWd1cmF0aW9uLCBmdW5jdGlvbihlcnIsIHJlcyl7XG4gICAgICAgIGlmKGVycil7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgICBpZihyZXMpe1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzaXN0X3RyYW5zYWN0aW9uKGNvbmZpZ3VyYXRpb24sIGNhbGxiYWNrKSB7XG4gICAgbGV0IHJlc3BvbnNlID0ge1xuICAgICAgICBhY2NvdW50UGFpcmVkOiBmYWxzZSxcbiAgICAgICAgaXNtb2JpbGU6IG51bGwsXG4gICAgICAgIHZhbGlkQnJvd3NlcjogbnVsbCxcbiAgICAgICAgZXh0ZW5zaW9uSW5zdGFsbGVkOiBudWxsLFxuICAgICAgICBhY2Nlc3NUb0FjY291bnRzOiBudWxsLFxuICAgICAgICBhY2NvdW50SWQ6IG51bGwsXG4gICAgICAgIHN1Ym1pc3Npb25Ob2RlOiBwYXJhbXMuc3VibWlzc2lvbm5vZGUsXG4gICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICB0eG5fc3VjY2VzczogZmFsc2UsXG4gICAgICAgIHRpbWU6IGNvbmZpZ3VyYXRpb24udGltZVxuICAgIH07XG4gICAgY3JlYXRlSGVkZXJhT2JqZWN0KHBhcmFtcywgZnVuY3Rpb24oZXJyLCBob2JqZWN0KXtcbiAgICAgICAgaWYoaG9iamVjdCl7XG4gICAgICAgICAgICBsZXQgdXJsID0gQ29uZmlnLmRlZmF1bHQucHJvZHVjdGlvbiA/IFwiaHR0cHM6Ly9tcHMuaGFzaGluZ3N5c3RlbXMuY29tXCIgOiAnaHR0cDovL2xvY2FsaG9zdDo5OTk5JztcbiAgICAgICAgICAgIFVSTCA9IHVybCArIFwiL21lbW8vXCIgKyBwYXJhbXMubWVtbztcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxldCB4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgIHhodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWpheHJlc3AgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFqYXhyZXNwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWpheHJlc3AucmVzcG9uc2UubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzZXJ2aWNlcy5wcmVjaGVja2VyKGFqYXhyZXNwLnJlc3BvbnNlWzBdLm5vZGVwcmVjaGVjaykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5hY2NvdW50SWQgPSBhamF4cmVzcC5yZXNwb25zZVswXS5zZW5kZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmFjY291bnRQYWlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5hY2Nlc3NUb0FjY291bnRzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFqYXhyZXNwLnJlc3BvbnNlWzBdLm5vZGVwcmVjaGVjayA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UudHhuX3N1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmVycm9yID0gc2VydmljZXMucHJlY2hlY2tlcihhamF4cmVzcC5yZXNwb25zZVswXS5ub2RlcHJlY2hlY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5hY2NvdW50UGFpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuYWNjZXNzVG9BY2NvdW50cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgeGh0dHAub3BlbihcIkdFVFwiLCBVUkwsIHRydWUpO1xuICAgICAgICAgICAgICAgIHhodHRwLnNlbmQoKTtcbiAgICAgICAgICAgIH0sIDUwMDApO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNhbGxiYWNrKHsnc3VjY2Vzcyc6ZmFsc2UsJ21lc3NhZ2UnOidDb3VsZCBub3QgY3JlYXRlIGhlZGVyYSBvYmplY3QnfSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBpcy5qcyIsIi8vIERlZmluZSBvdXIgY29uc3RydWN0b3JcbmZ1bmN0aW9uIE1vZGFsKCkge1xuICAgIC8vIENyZWF0ZSBnbG9iYWwgZWxlbWVudCByZWZlcmVuY2VzXG4gICAgdGhpcy5jbG9zZUJ1dHRvbiA9IG51bGw7XG4gICAgdGhpcy5tb2RhbCA9IG51bGw7XG4gICAgdGhpcy5vdmVybGF5ID0gbnVsbDtcblxuICAgIC8vIERldGVybWluZSBwcm9wZXIgcHJlZml4XG4gICAgdGhpcy50cmFuc2l0aW9uRW5kID0gdHJhbnNpdGlvblNlbGVjdCgpO1xuXG4gICAgLy8gRGVmaW5lIG9wdGlvbiBkZWZhdWx0c1xuICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgYXV0b09wZW46IGZhbHNlLFxuICAgICAgICBjbGFzc05hbWU6ICdmYWRlLWFuZC1kcm9wJyxcbiAgICAgICAgY2xvc2VCdXR0b246IHRydWUsXG4gICAgICAgIGNvbnRlbnQ6IFwiXCIsXG4gICAgICAgIG1heFdpZHRoOiA2MDAsXG4gICAgICAgIG1pbldpZHRoOiAyODAsXG4gICAgICAgIG92ZXJsYXk6IGZhbHNlXG4gICAgfTtcblxuICAgIC8vIENyZWF0ZSBvcHRpb25zIGJ5IGV4dGVuZGluZyBkZWZhdWx0cyB3aXRoIHRoZSBwYXNzZWQgaW4gYXJ1Z21lbnRzXG4gICAgaWYgKGFyZ3VtZW50c1swXSAmJiB0eXBlb2YgYXJndW1lbnRzWzBdID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGV4dGVuZERlZmF1bHRzKGRlZmF1bHRzLCBhcmd1bWVudHNbMF0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b09wZW4gPT09IHRydWUpIHRoaXMub3BlbigpO1xuXG59XG5cbi8vIFB1YmxpYyBNZXRob2RzXG5Nb2RhbC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF8gPSB0aGlzO1xuICAgIHRoaXMubW9kYWwuY2xhc3NOYW1lID0gdGhpcy5tb2RhbC5jbGFzc05hbWUucmVwbGFjZShcIiBoYXNoLW9wZW5cIiwgXCJcIik7XG4gICAgdGhpcy5vdmVybGF5LmNsYXNzTmFtZSA9IHRoaXMub3ZlcmxheS5jbGFzc05hbWUucmVwbGFjZShcIiBoYXNoLW9wZW5cIiwgXCJcIik7XG4gICAgdGhpcy5tb2RhbC5hZGRFdmVudExpc3RlbmVyKHRoaXMudHJhbnNpdGlvbkVuZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICBfLm1vZGFsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoXy5tb2RhbCk7XG4gICAgfSk7XG4gICAgdGhpcy5vdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIodGhpcy50cmFuc2l0aW9uRW5kLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChfLm92ZXJsYXkucGFyZW50Tm9kZSkgXy5vdmVybGF5LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoXy5vdmVybGF5KTtcbiAgICB9KTtcbn07XG5cbk1vZGFsLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgIGJ1aWxkT3V0LmNhbGwodGhpcyk7XG4gICAgaW5pdGlhbGl6ZUV2ZW50cy5jYWxsKHRoaXMpO1xuICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMubW9kYWwpLmhlaWdodDtcbiAgICB0aGlzLm1vZGFsLmNsYXNzTmFtZSA9IHRoaXMubW9kYWwuY2xhc3NOYW1lICsgKHRoaXMubW9kYWwub2Zmc2V0SGVpZ2h0ID4gd2luZG93LmlubmVySGVpZ2h0ID8gXCIgaGFzaC1vcGVuIGhhc2gtYW5jaG9yZWRcIiA6IFwiIGhhc2gtb3BlblwiKTtcbiAgICAvL3RoaXMub3ZlcmxheS5jbGFzc05hbWUgPSB0aGlzLm92ZXJsYXkuY2xhc3NOYW1lICsgXCIgaGFzaC1vcGVuXCI7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX2Nsb3NlJykub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfb3V0ZXJfd3JhcCcpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9O1xufTtcblxuLy8gUHJpdmF0ZSBNZXRob2RzXG5mdW5jdGlvbiBidWlsZE91dCgpIHtcblxuICAgIHZhciBjb250ZW50LCBjb250ZW50SG9sZGVyLCBkb2NGcmFnO1xuXG4gICAgLypcbiAgICAgKiBJZiBjb250ZW50IGlzIGFuIEhUTUwgc3RyaW5nLCBhcHBlbmQgdGhlIEhUTUwgc3RyaW5nLlxuICAgICAqIElmIGNvbnRlbnQgaXMgYSBkb21Ob2RlLCBhcHBlbmQgaXRzIGNvbnRlbnQuXG4gICAgICovXG5cbiAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5jb250ZW50ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGNvbnRlbnQgPSB0aGlzLm9wdGlvbnMuY29udGVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb250ZW50ID0gdGhpcy5vcHRpb25zLmNvbnRlbnQuaW5uZXJIVE1MO1xuICAgIH1cblxuICAgIC8vIENyZWF0ZSBhIERvY3VtZW50RnJhZ21lbnQgdG8gYnVpbGQgd2l0aFxuICAgIGRvY0ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICAvLyBDcmVhdGUgbW9kYWwgZWxlbWVudFxuICAgIHRoaXMubW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMubW9kYWwuY2xhc3NOYW1lID0gXCJoYXNoLW1vZGFsIFwiICsgdGhpcy5vcHRpb25zLmNsYXNzTmFtZTtcbiAgICAvKnRoaXMubW9kYWwuc3R5bGUubWluV2lkdGggPSB0aGlzLm9wdGlvbnMubWluV2lkdGggKyBcInB4XCI7XG4gICAgdGhpcy5tb2RhbC5zdHlsZS5tYXhXaWR0aCA9IHRoaXMub3B0aW9ucy5tYXhXaWR0aCArIFwicHhcIjsqL1xuXG4gICAgLy8gSWYgY2xvc2VCdXR0b24gb3B0aW9uIGlzIHRydWUsIGFkZCBhIGNsb3NlIGJ1dHRvblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2VCdXR0b24gPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3B1cC1jbG9zZS1idG4nKTtcbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgY29udGVudCBhcmVhIGFuZCBhcHBlbmQgdG8gbW9kYWxcbiAgICBjb250ZW50SG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb250ZW50SG9sZGVyLmNsYXNzTmFtZSA9IFwiaGFzaC1jb250ZW50XCI7XG4gICAgY29udGVudEhvbGRlci5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgIHRoaXMubW9kYWwuYXBwZW5kQ2hpbGQoY29udGVudEhvbGRlcik7XG5cbiAgICAvLyBBcHBlbmQgbW9kYWwgdG8gRG9jdW1lbnRGcmFnbWVudFxuICAgIGRvY0ZyYWcuYXBwZW5kQ2hpbGQodGhpcy5tb2RhbCk7XG5cbiAgICAvLyBBcHBlbmQgRG9jdW1lbnRGcmFnbWVudCB0byBib2R5XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb2NGcmFnKTtcblxufVxuXG5pbWdjaGFuZ2VGdW5jdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2hib3hzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoXCJpbWdfY2hrYm94XCIpO1xuICAgIHZhciB2YXJfY2hlY2sgPSBcIlwiO1xuXG4gICAgdmFyIGltZ19hbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaW1nX2FsbFwiKTtcblxuICAgIGZvcih2YXIgaT0wO2k8Y2hib3hzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgaWYoY2hib3hzW2ldLmNoZWNrZWQpe1xuICAgICAgICAgICAgdmFyX2NoZWNrID0gdmFyX2NoZWNrLmNvbmNhdChjaGJveHNbaV0udmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYodmFyX2NoZWNrID09ICdpbWdfb25lJyl7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfdHdvJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX3RocmVlJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX2ZvdXInKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfb25lJykuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgaWYodmFyX2NoZWNrID09ICdpbWdfb25laW1nX3R3bycpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ19vbmUnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfdGhyZWUnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfZm91cicpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ190d28nKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBpZih2YXJfY2hlY2sgPT0gJ2ltZ19vbmVpbWdfdHdvaW1nX3RocmVlJyl7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfb25lJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX3R3bycpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ19mb3VyJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX3RocmVlJykuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgaWYodmFyX2NoZWNrID09ICdpbWdfb25laW1nX3R3b2ltZ190aHJlZWltZ19mb3VyJykge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX29uZScpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ190d28nKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfdGhyZWUnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfZm91cicpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gZXh0ZW5kRGVmYXVsdHMoc291cmNlLCBwcm9wZXJ0aWVzKSB7XG4gICAgdmFyIHByb3BlcnR5O1xuICAgIGZvciAocHJvcGVydHkgaW4gcHJvcGVydGllcykge1xuICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgIHNvdXJjZVtwcm9wZXJ0eV0gPSBwcm9wZXJ0aWVzW3Byb3BlcnR5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc291cmNlO1xufVxuXG5mdW5jdGlvbiBpbml0aWFsaXplRXZlbnRzKCkge1xuICAgIGlmICh0aGlzLmNsb3NlQnV0dG9uKSB7XG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm92ZXJsYXkpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gdHJhbnNpdGlvblNlbGVjdCgpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGlmIChlbC5zdHlsZS5XZWJraXRUcmFuc2l0aW9uKSByZXR1cm4gXCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCI7XG4gICAgaWYgKGVsLnN0eWxlLk9UcmFuc2l0aW9uKSByZXR1cm4gXCJvVHJhbnNpdGlvbkVuZFwiO1xuICAgIHJldHVybiAndHJhbnNpdGlvbmVuZCc7XG59XG4vL2V4cG9ydGluZyBtb2R1bGVcbm1vZHVsZS5leHBvcnRzLk1vZGFsID0gTW9kYWw7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kYWwuanMiXSwic291cmNlUm9vdCI6IiJ9