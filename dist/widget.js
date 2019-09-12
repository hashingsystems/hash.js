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
    paymentserver: production ? __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].productionServer : 'http://localhost:8099',
    //extensionid: "dafkdmjifphnfjcajcbkhdjlkohanphh",
    extensionid: "ialacmdboeeibeonceeefibpfggkdddh",
    error: "/no-extension",
    type: "article",
    time: Date.now(),
    redirect: '{ "nonPayingAccount": "/insufficient-amount/", "noAccount": "/account-not-paired/", "homePage": "/", "success:/success"}',
    submissionnode: "0.0.3",
    memo: Date.now(),
    recipientlist: '[{ "to": "0.0.99", "tinybars": "200000" }]',
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
  production: true,
  productionServer: 'https://mps.hashingsystems.com'
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

      if (supportedAPI.indexOf(method) === -1) throw Error("Method ".concat(method, " is not supported"));
      __WEBPACK_IMPORTED_MODULE_3__apis__[method](configurations, callback);
    }
  } // override temporary (until the app loaded) handler
  // for widget's API calls


  globalObject = __WEBPACK_IMPORTED_MODULE_3__apis__;
  globalObject.configurations = configurations;
} //app(window);


window.hash = function (params, callback) {
  var queue = params;
  console.log(queue);

  if (queue) {
    configurations = __WEBPACK_IMPORTED_MODULE_4__libraries__["c" /* extendObject */](configurations, queue[1]);
    var method = queue[0];
    /*let callback;
    if (typeof queue[1] === 'function') {
        callback = queue[1];
    } else if (typeof queue[queue[0].length - 1] === 'function') {
        callback = queue[queue[0].length - 1];
    } else {
        callback = false;
    }*/

    console.log(supportedAPI.indexOf(method));
    if (supportedAPI.indexOf(method.toLowerCase()) === -1) throw Error("Method ".concat(method, " is not supported"));
    __WEBPACK_IMPORTED_MODULE_3__apis__[method](configurations, callback);
  }
};

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
  var __construct = ['contractid', 'memo', 'paymentserver', 'params', 'abi', 'abi', 'extensionid'];
  var object = {
    contractid: '0.0.15065',
    memo: 'a4a7c4329aab4b1fac474ff6f93d858c',
    params: '["pablo"]',
    abi: JSON.stringify({
      "constant": false,
      "inputs": [{
        "name": "domainName",
        "type": "string"
      }],
      "name": "lookup",
      "outputs": [{
        "name": "domain",
        "type": "string"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }),
    //redirect: '{"nonPayingAccount": "/insufficient-amount/","noAccount": "/account-not-paired","homePage": "/"}',
    extensionid: 'ialacmdboeeibeonceeefibpfggkdddh'
  }; //console.log(JSON.parse(object.abi));

  var extended = __WEBPACK_IMPORTED_MODULE_2__libraries__["c" /* extendObject */](object, params); //console.log(extended);

  var Contractobject = '<hedera-contract ';

  for (var i in __construct) {
    var node = __construct[i];

    if (extended.hasOwnProperty(node)) {
      Contractobject += "data-" + node + "= '" + extended[node] + "' ";
    }
  }

  Contractobject += '></hedera-contract>'; //console.log(Contractobject);

  if (extended['attrID']) {
    var body = document.getElementById(extended['attrID']);
    body.innerHTML += Contractobject;
  }

  callback(null, Contractobject);
}
function checkTransaction(params, callback) {
  var memo_id = params.configuration.memo;
  var url = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].production ? __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].productionServer : 'http://localhost:8099';
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
        var url = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].production ? __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].productionServer : 'http://localhost:8099';
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

                  if (parseInt(ajaxresp.response[0].nodeprecheck) === 0) {
                    response.txn_success = true;
                  } else {
                    response.error = __WEBPACK_IMPORTED_MODULE_4__services__["a" /* prechecker */](ajaxresp.response[0].nodeprecheck);
                  }

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
function getmodal(callback) {
  var myContent = __WEBPACK_IMPORTED_MODULE_0__general__["b" /* getmodalContent */]();
  var myModal = new __WEBPACK_IMPORTED_MODULE_1__modal__["Modal"]({
    content: myContent
  });

  if (callback && typeof callback === 'function') {
    callback(myContent);
  }

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
  var params = configuration;
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
      var url = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].production ? __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].productionServer : 'http://localhost:8099';
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

                if (parseInt(ajaxresp.response[0].nodeprecheck) === 0) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODk1NGRhNWE4MzhhNGNmMTMwZmUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9nZW5lcmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYnJhcmllcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWV0aG9kcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kYWwuanMiXSwibmFtZXMiOlsicGluZyIsInByZWNoZWNrZXIiLCJuIiwianNvbiIsInByb2R1Y3Rpb24iLCJDb25maWciLCJ0b2RheSIsIkRhdGUiLCJkYXRlIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImdldERhdGUiLCJ0aW1lIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZGF0ZVRpbWUiLCJ0aW1lc3RhbXAiLCJnZXRUaW1lIiwiZ2V0bW9kYWxDb250ZW50IiwiY29uc3RydWN0Q29uZmlndXJhdGlvbiIsInBheW1lbnRzZXJ2ZXIiLCJwcm9kdWN0aW9uU2VydmVyIiwiZXh0ZW5zaW9uaWQiLCJlcnJvciIsInR5cGUiLCJub3ciLCJyZWRpcmVjdCIsInN1Ym1pc3Npb25ub2RlIiwibWVtbyIsInJlY2lwaWVudGxpc3QiLCJjb250ZW50aWQiLCJhdHRySUQiLCJpZCIsIndpbmRvdyIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJjb25maWciLCJkZXRlY3Rtb2IiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJtYXRjaCIsImRldGVjdCIsImV4dGVuc2lvbklkIiwibm90SW5zdGFsbGVkQ2FsbGJhY2siLCJpbnN0YWxsZWRDYWxsYmFjayIsImltZyIsIkltYWdlIiwiY29uc29sZSIsImxvZyIsIm9uZXJyb3IiLCJvbmxvYWQiLCJzcmMiLCJleHRlbmRPYmplY3QiLCJhIiwiYiIsImtleSIsImhhc093blByb3BlcnR5IiwiaXNDaHJvbWUiLCJzdXBwb3J0ZWRBUEkiLCJtZXRob2RzIiwiY29uZmlndXJhdGlvbnMiLCJnZW5lcmFsIiwiYXBwIiwiZ2xvYmFsT2JqZWN0IiwicXVldWUiLCJxIiwiaSIsImxlbmd0aCIsImxpYnJhcmllcyIsIm1ldGhvZCIsImNhbGxiYWNrIiwiaW5kZXhPZiIsIkVycm9yIiwiQXBpcyIsImhhc2giLCJwYXJhbXMiLCJ0b0xvd2VyQ2FzZSIsInRlc3QiLCJjcmVhdGVIZWRlcmFPYmplY3QiLCJvYmplY3QiLCJIZWRlcmFvYmplY3QiLCJub2RlIiwiYm9keSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJpbm5lckhUTUwiLCJjcmVhdGVDb250cmFjdE9iamVjdCIsIl9fY29uc3RydWN0IiwiY29udHJhY3RpZCIsImFiaSIsIkpTT04iLCJzdHJpbmdpZnkiLCJleHRlbmRlZCIsIkNvbnRyYWN0b2JqZWN0IiwiY2hlY2tUcmFuc2FjdGlvbiIsIm1lbW9faWQiLCJjb25maWd1cmF0aW9uIiwidXJsIiwic3RydWN0dXJlIiwiYmFzZXVybCIsInJlY2VpdmVyX2lkIiwic3VjY2VzcyIsImZhaWx1cmUiLCJ0aW1lb3V0IiwibGltaXQiLCJVUkwiLCJzZXRUaW1lb3V0IiwicGVyZm9ybVJlcXVlc3QiLCJpbml0IiwicmVzcG9uc2UiLCJhY2NvdW50UGFpcmVkIiwiaXNtb2JpbGUiLCJ2YWxpZEJyb3dzZXIiLCJleHRlbnNpb25JbnN0YWxsZWQiLCJhY2Nlc3NUb0FjY291bnRzIiwiYWNjb3VudElkIiwic3VibWlzc2lvbk5vZGUiLCJ0eG5fc3VjY2VzcyIsIm1lc3NhZ2UiLCJlcnIiLCJob2JqZWN0IiwieGh0dHAiLCJYTUxIdHRwUmVxdWVzdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJhamF4cmVzcCIsInBhcnNlIiwic2VydmljZXMiLCJub2RlcHJlY2hlY2siLCJzZW5kZXIiLCJwYXJzZUludCIsIm9wZW4iLCJzZW5kIiwiZ2V0bW9kYWwiLCJteUNvbnRlbnQiLCJteU1vZGFsIiwiTW9kYWwiLCJjb250ZW50IiwibWFrZVRyYW5zYWN0aW9uIiwidHJhbnNhY3Rpb25fcHJvY2VzaW5nIiwidHJhbnNhY3Rpb25fZmFpbGVkIiwidHJhbnNhY3Rpb25fc3VjY2VzcyIsInJlcyIsImFzc2lzdF90cmFuc2FjdGlvbiIsImNsb3NlQnV0dG9uIiwibW9kYWwiLCJvdmVybGF5IiwidHJhbnNpdGlvbkVuZCIsInRyYW5zaXRpb25TZWxlY3QiLCJkZWZhdWx0cyIsImF1dG9PcGVuIiwiY2xhc3NOYW1lIiwibWF4V2lkdGgiLCJtaW5XaWR0aCIsImFyZ3VtZW50cyIsIm9wdGlvbnMiLCJleHRlbmREZWZhdWx0cyIsInByb3RvdHlwZSIsImNsb3NlIiwiXyIsInJlcGxhY2UiLCJhZGRFdmVudExpc3RlbmVyIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiYnVpbGRPdXQiLCJjYWxsIiwiaW5pdGlhbGl6ZUV2ZW50cyIsImdldENvbXB1dGVkU3R5bGUiLCJoZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJpbm5lckhlaWdodCIsInF1ZXJ5U2VsZWN0b3IiLCJvbmNsaWNrIiwic3R5bGUiLCJkaXNwbGF5IiwiY29udGVudEhvbGRlciIsImRvY0ZyYWciLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiaW1nY2hhbmdlRnVuY3Rpb24iLCJjaGJveHMiLCJnZXRFbGVtZW50c0J5TmFtZSIsInZhcl9jaGVjayIsImltZ19hbGwiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY2hlY2tlZCIsImNvbmNhdCIsInZhbHVlIiwic291cmNlIiwicHJvcGVydGllcyIsInByb3BlcnR5IiwiYmluZCIsImVsIiwiV2Via2l0VHJhbnNpdGlvbiIsIk9UcmFuc2l0aW9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFF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ZSI6IndpZGdldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDg5NTRkYTVhODM4YTRjZjEzMGZlIiwiZXhwb3J0IGZ1bmN0aW9uIHBpbmcoKSB7XG4gICAgcmV0dXJuICdwb25nJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByZWNoZWNrZXIobikge1xuICAgIGxldCBqc29uID0gezA6IFwiT0tcIiwgMTogXCJJTlZBTElEX1RSQU5TQUNUSU9OXCIsIDI6IFwiUEFZRVJfQUNDT1VOVF9OT1RfRk9VTkRcIiwgMzogXCJJTlZBTElEX05PREVfQUNDT1VOVFwiLCA0OiBcIlRSQU5TQUNUSU9OX0VYUElSRURcIiwgNTogXCJJTlZBTElEX1RSQU5TQUNUSU9OX1NUQVJUXCIsIDY6IFwiSU5WQUxJRF9UUkFOU0FDVElPTl9EVVJBVElPTlwiLCA3OiBcIklOVkFMSURfU0lHTkFUVVJFXCIsIDg6IFwiTUVNT19UT09fTE9OR1wiLCA5OiBcIklOU1VGRklDSUVOVF9UWF9GRUVcIiwgMTA6IFwiSU5TVUZGSUNJRU5UX1BBWUVSX0JBTEFOQ0VcIiwgMTE6IFwiRFVQTElDQVRFX1RSQU5TQUNUSU9OXCIsIDEyOiBcIkJVU1lcIiwgMTM6IFwiTk9UX1NVUFBPUlRFRFwiLCAxNDogXCJJTlZBTElEX0ZJTEVfSURcIiwgMTU6IFwiSU5WQUxJRF9BQ0NPVU5UX0lEXCIsIDE2OiBcIklOVkFMSURfQ09OVFJBQ1RfSURcIiwgMTc6IFwiSU5WQUxJRF9UUkFOU0FDVElPTl9JRFwiLCAxODogXCJSRUNFSVBUX05PVF9GT1VORFwiLCAxOTogXCJSRUNPUkRfTk9UX0ZPVU5EXCIsIDIwOiBcIklOVkFMSURfU09MSURJVFlfSURcIiwgMjE6IFwiVU5LTk9XTlwiLCAyMjogXCJTVUNDRVNTXCIsIDIzOiBcIkZBSUxfSU5WQUxJRFwiLCAyNDogXCJGQUlMX0ZFRVwiLCAyNTogXCJGQUlMX0JBTEFOQ0VcIiwgMjY6IFwiS0VZX1JFUVVJUkVEXCIsIDI3OiBcIkJBRF9FTkNPRElOR1wiLCAyODogXCJJTlNVRkZJQ0lFTlRfQUNDT1VOVF9CQUxBTkNFXCIsIDI5OiBcIklOVkFMSURfU09MSURJVFlfQUREUkVTU1wiLCAzMDogXCJJTlNVRkZJQ0lFTlRfR0FTXCIsIDMxOiBcIkNPTlRSQUNUX1NJWkVfTElNSVRfRVhDRUVERURcIiwgMzI6IFwiTE9DQUxfQ0FMTF9NT0RJRklDQVRJT05fRVhDRVBUSU9OXCIsIDMzOiBcIkNPTlRSQUNUX1JFVkVSVF9FWEVDVVRFRFwiLCAzNDogXCJDT05UUkFDVF9FWEVDVVRJT05fRVhDRVBUSU9OXCIsIDM1OiBcIklOVkFMSURfUkVDRUlWSU5HX05PREVfQUNDT1VOVFwiLCAzNjogXCJNSVNTSU5HX1FVRVJZX0hFQURFUlwiLCAzNzogXCJBQ0NPVU5UX1VQREFURV9GQUlMRURcIiwgMzg6IFwiSU5WQUxJRF9LRVlfRU5DT0RJTkdcIiwgMzk6IFwiTlVMTF9TT0xJRElUWV9BRERSRVNTXCIsIDQwOiBcIkNPTlRSQUNUX1VQREFURV9GQUlMRURcIiwgNDE6IFwiSU5WQUxJRF9RVUVSWV9IRUFERVJcIiwgNDI6IFwiSU5WQUxJRF9GRUVfU1VCTUlUVEVEXCIsIDQzOiBcIklOVkFMSURfUEFZRVJfU0lHTkFUVVJFXCIsIDQ0OiBcIktFWV9OT1RfUFJPVklERURcIiwgNDU6IFwiSU5WQUxJRF9FWFBJUkFUSU9OX1RJTUVcIiwgNDY6IFwiTk9fV0FDTF9LRVlcIiwgNDc6IFwiRklMRV9DT05URU5UX0VNUFRZXCIsIDQ4OiBcIklOVkFMSURfQUNDT1VOVF9BTU9VTlRTXCIsIDQ5OiBcIkVNUFRZX1RSQU5TQUNUSU9OX0JPRFlcIiwgNTA6IFwiSU5WQUxJRF9UUkFOU0FDVElPTl9CT0RZXCIsIDUxOiBcIklOVkFMSURfU0lHTkFUVVJFX1RZUEVfTUlTTUFUQ0hJTkdfS0VZXCIsIDUyOiBcIklOVkFMSURfU0lHTkFUVVJFX0NPVU5UX01JU01BVENISU5HX0tFWVwiLCA1MzogXCJFTVBUWV9DTEFJTV9CT0RZXCIsIDU0OiBcIkVNUFRZX0NMQUlNX0hBU0hcIiwgNTU6IFwiRU1QVFlfQ0xBSU1fS0VZU1wiLCA1NjogXCJJTlZBTElEX0NMQUlNX0hBU0hfU0laRVwiLCA1NzogXCJFTVBUWV9RVUVSWV9CT0RZXCIsIDU4OiBcIkVNUFRZX0NMQUlNX1FVRVJZXCIsIDU5OiBcIkNMQUlNX05PVF9GT1VORFwiLCA2MDogXCJBQ0NPVU5UX0lEX0RPRVNfTk9UX0VYSVNUXCIsIDYxOiBcIkNMQUlNX0FMUkVBRFlfRVhJU1RTXCIsIDYyOiBcIklOVkFMSURfRklMRV9XQUNMXCIsIDYzOiBcIlNFUklBTElaQVRJT05fRkFJTEVEXCIsIDY0OiBcIlRSQU5TQUNUSU9OX09WRVJTSVpFXCIsIDY1OiBcIlRSQU5TQUNUSU9OX1RPT19NQU5ZX0xBWUVSU1wiLCA2NjogXCJDT05UUkFDVF9ERUxFVEVEXCIsIDY3OiBcIlBMQVRGT1JNX05PVF9BQ1RJVkVcIiwgNjg6IFwiS0VZX1BSRUZJWF9NSVNNQVRDSFwiLCA2OTogXCJQTEFURk9STV9UUkFOU0FDVElPTl9OT1RfQ1JFQVRFRFwiLCA3MDogXCJJTlZBTElEX1JFTkVXQUxfUEVSSU9EXCIsIDcxOiBcIklOVkFMSURfUEFZRVJfQUNDT1VOVF9JRFwiLCA3MjogXCJBQ0NPVU5UX0RFTEVURURcIiwgNzM6IFwiRklMRV9ERUxFVEVEXCIsIDc0OiBcIkFDQ09VTlRfUkVQRUFURURfSU5fQUNDT1VOVF9BTU9VTlRTXCIsIDc1OiBcIlNFVFRJTkdfTkVHQVRJVkVfQUNDT1VOVF9CQUxBTkNFXCIsIDc2OiBcIk9CVEFJTkVSX1JFUVVJUkVEXCIsIDc3OiBcIk9CVEFJTkVSX1NBTUVfQ09OVFJBQ1RfSURcIiwgNzg6IFwiT0JUQUlORVJfRE9FU19OT1RfRVhJU1RcIiwgNzk6IFwiTU9ESUZZSU5HX0lNTVVUQUJMRV9DT05UUkFDVFwiLCA4MDogXCJGSUxFX1NZU1RFTV9FWENFUFRJT05cIiwgODE6IFwiQVVUT1JFTkVXX0RVUkFUSU9OX05PVF9JTl9SQU5HRVwiLCA4MjogXCJFUlJPUl9ERUNPRElOR19CWVRFU1RSSU5HXCIsIDgzOiBcIkNPTlRSQUNUX0ZJTEVfRU1QVFlcIiwgODQ6IFwiQ09OVFJBQ1RfQllURUNPREVfRU1QVFlcIiwgODU6IFwiSU5WQUxJRF9JTklUSUFMX0JBTEFOQ0VcIiwgODY6IFwiSU5WQUxJRF9SRUNFSVZFX1JFQ09SRF9USFJFU0hPTERcIiwgODc6IFwiSU5WQUxJRF9TRU5EX1JFQ09SRF9USFJFU0hPTERcIiwgODg6IFwiQUNDT1VOVF9JU19OT1RfR0VORVNJU19BQ0NPVU5UXCJ9XG4gICAgIHJldHVybiBqc29uW25dO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2VzLmpzIiwiaW1wb3J0ICogYXMgQ29uZmlnIGZyb20gJy4vY29uZmlnJztcblxubGV0IHByb2R1Y3Rpb24gPSBDb25maWcuZGVmYXVsdC5wcm9kdWN0aW9uO1xuXG5sZXQgdG9kYXkgPSBuZXcgRGF0ZSgpLFxuICAgIGRhdGUgPSB0b2RheS5nZXRGdWxsWWVhcigpICsgJy0nICsgKHRvZGF5LmdldE1vbnRoKCkgKyAxKSArICctJyArIHRvZGF5LmdldERhdGUoKSxcbiAgICB0aW1lID0gdG9kYXkuZ2V0SG91cnMoKSArIFwiOlwiICsgdG9kYXkuZ2V0TWludXRlcygpLFxuICAgIGRhdGVUaW1lID0gZGF0ZSArICcgJyArIHRpbWUsXG4gICAgdGltZXN0YW1wID0gbmV3IERhdGUoZGF0ZVRpbWUpLmdldFRpbWUoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldG1vZGFsQ29udGVudCgpIHtcbiAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJwb3B1cF9vdXRlcl93cmFwXCI+XFxuJyArXG4gICAgJ1xcdCAgXFx0PGRpdiBjbGFzcz1cInBvcHVwX3dyYXBcIj5cXG4nICtcbiAgICAnXFx0ICBcXHRcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfaGVhZGVyXCI+U2V0dXAgVGFzayA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJwb3B1cF9jbG9zZVwiIGlkPVwicG9wdXAtY2xvc2UtYnRuXCI+eDwvYT48L2Rpdj5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0PGRpdiBjbGFzcz1cInBvcHVwX2lubmVyXCI+XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0PGRpdiBjbGFzcz1cInBvcHVwX2lubmVyX2xlZnRcIj5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0XFx0PGZvcm0gYWN0aW9uPVwiL2FjdGlvbl9wYWdlLnBocFwiIGNsYXNzPVwicG9wdXBfZm9ybVwiPlxcbicgK1xuICAgICdcXHRcXHRcXHRcXHRcXHQgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBvbmNoYW5nZT0gXCJpbWdjaGFuZ2VGdW5jdGlvbigpXCIgaWQ9XCJpbWdfb25lXCIgY2xhc3M9XCJwb3B1cF9jaGtib3ggdG9nZ2xlX19pbnB1dFwiIG5hbWU9XCJpbWdfY2hrYm94XCIgdmFsdWU9XCJpbWdfb25lXCI+XFxuJyArXG4gICAgJ1xcdFxcdFxcdFxcdFxcdCAgPGxhYmVsIGZvcj1cImltZ19vbmVcIj4mbmJzcDsgSW5zdGFsbCBIZWRlcmEgV2FsbGV0PC9sYWJlbD5cXG4nICtcbiAgICAnXFx0XFx0XFx0XFx0XFx0ICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgb25jaGFuZ2U9IFwiaW1nY2hhbmdlRnVuY3Rpb24oKVwiIGlkPVwiaW1nX3R3b1wiIGNsYXNzPVwicG9wdXBfY2hrYm94IHRvZ2dsZV9faW5wdXRcIiBuYW1lPVwiaW1nX2Noa2JveFwiIHZhbHVlPVwiaW1nX3R3b1wiPlxcbicgK1xuICAgICdcXHRcXHRcXHRcXHRcXHQgIDxsYWJlbCBmb3I9XCJpbWdfdHdvXCI+Jm5ic3A7IFwiUGFpciB5b3VyIEFjY291bnRcIjwvbGFiZWw+XFxuJyArXG4gICAgJ1xcbicgK1xuICAgICdcXHRcXHRcXHRcXHRcXHQgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBvbmNoYW5nZT0gXCJpbWdjaGFuZ2VGdW5jdGlvbigpXCIgaWQ9XCJpbWdfdGhyZWVcIiBjbGFzcz1cInBvcHVwX2Noa2JveCB0b2dnbGVfX2lucHV0XCIgbmFtZT1cImltZ19jaGtib3hcIiB2YWx1ZT1cImltZ190aHJlZVwiPlxcbicgK1xuICAgICdcXHRcXHRcXHRcXHRcXHQgIDxsYWJlbCBmb3I9XCJpbWdfdGhyZWVcIj4mbmJzcDsgXCJBbGxvdyBQYXltZW50IFJlcXVlc3RzXCI8L2xhYmVsPlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnXFx0XFx0XFx0XFx0XFx0ICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgb25jaGFuZ2U9IFwiaW1nY2hhbmdlRnVuY3Rpb24oKVwiIGlkPVwiaW1nX2ZvdXJcIiBjbGFzcz1cInBvcHVwX2Noa2JveCB0b2dnbGVfX2lucHV0XCIgbmFtZT1cImltZ19jaGtib3hcIiB2YWx1ZT1cImltZ19mb3VyXCI+XFxuJyArXG4gICAgJ1xcdFxcdFxcdFxcdFxcdCAgPGxhYmVsIGZvcj1cImltZ19mb3VyXCI+Jm5ic3A7IFwiR2V0IHNvbWUgSEJBUlwiPC9sYWJlbD5cXG4nICtcbiAgICAnXFx0XFx0XFx0XFx0XFx0PC9mb3JtPlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnXFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cInBvcHVwX2xvZ29cIj5cXG4nICtcbiAgICAnXFx0XFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cImxvZ29fdHh0XCI+UG93ZXJlZCBieTwvZGl2PlxcbicgK1xuICAgICdcXHRcXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwibG9nb19pY29uXCI+PGltZyBzcmM9XCIvL2FwaS5oYXNoaW5nc3lzdGVtcy5jb20vaW1nL3BvcHVwX2xvZ28ucG5nXCI+PC9kaXY+XFxuJyArXG4gICAgJ1xcdFxcdFxcdFxcdFxcdDwvZGl2PlxcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdFxcdFxcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdDwvZGl2PlxcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJwb3B1cF9pbm5lcl9yaWdodFwiPlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfaW1nX3NlY1wiPlxcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdFxcdFxcdDxpbWcgY2xhc3M9XCJpbWdfb25lXCIgc3JjPVwiLy9hcGkuaGFzaGluZ3N5c3RlbXMuY29tL2ltZy9pbWdfb25lLnBuZ1wiPlxcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdFxcdFxcdDxpbWcgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiIGNsYXNzPVwiaW1nX3R3b1wiIHNyYz1cIi8vYXBpLmhhc2hpbmdzeXN0ZW1zLmNvbS9pbWcvaW1nX3R3by5wbmdcIj5cXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHRcXHRcXHQ8aW1nIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIiBjbGFzcz1cImltZ190aHJlZVwiIHNyYz1cIi8vYXBpLmhhc2hpbmdzeXN0ZW1zLmNvbS9pbWcvaW1nX3RocmVlLnBuZ1wiPlxcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdFxcdFxcdDxpbWcgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiIGNsYXNzPVwiaW1nX2ZvdXJcIiBzcmM9XCIvL2FwaS5oYXNoaW5nc3lzdGVtcy5jb20vaW1nL2ltZ19mb3VyLnBuZ1wiPlxcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdFxcdDwvZGl2PlxcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJ0eHRfd3JhcFwiPlxcbicgK1xuICAgICdcXHRcXHQgIFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJ0eHRfaGVhZGVyXCI+TGV0cyBnZXQgeW91IHN0YXJ0ZWQhPC9kaXY+XFxuJyArXG4gICAgJ1xcdFxcdCAgXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cInR4dF9jb250ZW50XCI+TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQsIHNlZCBkbyBlaXVzbW9kIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZSBldCA8L2Rpdj5cXG4nICtcbiAgICAnXFx0XFx0ICBcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfYnRuXCI+XFxuJyArXG4gICAgJ1xcdFxcdCAgXFx0XFx0XFx0XFx0XFx0PGEgaHJlZj1cIlwiPklcXCdtIFJlYWR5PC9hPlxcbicgK1xuICAgICdcXHRcXHQgIFxcdFxcdFxcdFxcdDwvZGl2PlxcbicgK1xuICAgICdcXHRcXHQgIFxcdFxcdFxcdDwvZGl2PlxcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdFxcdFxcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdDwvZGl2PlxcbicgK1xuICAgICdcXHQgIFxcdFxcdDwvZGl2PlxcbicgK1xuICAgICdcXHQgIFxcdDwvZGl2Pic7XG59XG5cblxuXG5leHBvcnQgZnVuY3Rpb24gY29uc3RydWN0Q29uZmlndXJhdGlvbigpe1xuICAgIHJldHVybiB7XG4gICAgICAgIHBheW1lbnRzZXJ2ZXI6IHByb2R1Y3Rpb24gPyBDb25maWcuZGVmYXVsdC5wcm9kdWN0aW9uU2VydmVyIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA5OScsXG4gICAgICAgIC8vZXh0ZW5zaW9uaWQ6IFwiZGFma2RtamlmcGhuZmpjYWpjYmtoZGpsa29oYW5waGhcIixcbiAgICAgICAgZXh0ZW5zaW9uaWQ6IFwiaWFsYWNtZGJvZWVpYmVvbmNlZWVmaWJwZmdna2RkZGhcIixcbiAgICAgICAgZXJyb3I6IFwiL25vLWV4dGVuc2lvblwiLFxuICAgICAgICB0eXBlOiBcImFydGljbGVcIixcbiAgICAgICAgdGltZTogRGF0ZS5ub3coKSxcbiAgICAgICAgcmVkaXJlY3Q6ICd7IFwibm9uUGF5aW5nQWNjb3VudFwiOiBcIi9pbnN1ZmZpY2llbnQtYW1vdW50L1wiLCBcIm5vQWNjb3VudFwiOiBcIi9hY2NvdW50LW5vdC1wYWlyZWQvXCIsIFwiaG9tZVBhZ2VcIjogXCIvXCIsIFwic3VjY2Vzczovc3VjY2Vzc1wifScsXG4gICAgICAgIHN1Ym1pc3Npb25ub2RlOiBcIjAuMC4zXCIsXG4gICAgICAgIG1lbW86IERhdGUubm93KCksXG4gICAgICAgIHJlY2lwaWVudGxpc3Q6ICdbeyBcInRvXCI6IFwiMC4wLjk5XCIsIFwidGlueWJhcnNcIjogXCIyMDAwMDBcIiB9XScsXG4gICAgICAgIGNvbnRlbnRpZDogJzc5JyxcbiAgICAgICAgYXR0cklEOiAnYXJ0aWNsZS0xJyxcbiAgICAgICAgdGltZXN0YW1wOiB0aW1lc3RhbXAsXG4gICAgICAgIC8qdGhpcyBtaWdodCBtYWtlIGEgZ29vZCBkZWZhdWx0IGlkIGZvciB0aGUgY29udGVudCovXG4gICAgICAgIGlkOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nZW5lcmFsLmpzIiwiY29uc3QgY29uZmlnID0ge1xuICAgIHByb2R1Y3Rpb246IHRydWUsXG4gICAgcHJvZHVjdGlvblNlcnZlcjogJ2h0dHBzOi8vbXBzLmhhc2hpbmdzeXN0ZW1zLmNvbSdcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZ1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbmZpZy5qcyIsImV4cG9ydCBmdW5jdGlvbiBkZXRlY3Rtb2IoKSB7XG4gICAgcmV0dXJuIChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9BbmRyb2lkL2kpXG4gICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL3dlYk9TL2kpXG4gICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQaG9uZS9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGFkL2kpXG4gICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQb2QvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQmxhY2tCZXJyeS9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9XaW5kb3dzIFBob25lL2kpXG4gICAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRldGVjdChleHRlbnNpb25JZCwgbm90SW5zdGFsbGVkQ2FsbGJhY2ssIGluc3RhbGxlZENhbGxiYWNrKSB7XG4gICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGNvbnNvbGUubG9nKGV4dGVuc2lvbklkKTtcbiAgICBpbWcub25lcnJvciA9IG5vdEluc3RhbGxlZENhbGxiYWNrO1xuICAgIGltZy5vbmxvYWQgPSBpbnN0YWxsZWRDYWxsYmFjaztcbiAgICBpbWcuc3JjID0gJ2Nocm9tZS1leHRlbnNpb246Ly8nICsgZXh0ZW5zaW9uSWQgKyAnL2ljb25zL2ljb24xNi5wbmcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kT2JqZWN0KGEsIGIpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gYilcbiAgICAgICAgaWYgKGIuaGFzT3duUHJvcGVydHkoa2V5KSkgYVtrZXldID0gYltrZXldO1xuICAgIHJldHVybiBhO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDaHJvbWUoKSB7XG4gICAgcmV0dXJuICdjaHJvbWUnIGluIHdpbmRvd1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xpYnJhcmllcy5qcyIsImltcG9ydCB7cGluZywgcHJlY2hlY2tlcn0gZnJvbSAnLi9zZXJ2aWNlcyc7XG5pbXBvcnQgKiBhcyBtZXRob2RzIGZyb20gJy4vbWV0aG9kcyc7XG5pbXBvcnQgKiBhcyBnZW5lcmFsIGZyb20gJy4vZ2VuZXJhbCc7XG5pbXBvcnQgKiBhcyBBcGlzIGZyb20gJy4vYXBpcyc7XG5pbXBvcnQgKiBhcyBsaWJyYXJpZXMgZnJvbSAnLi9saWJyYXJpZXMnO1xuXG4vLyBlbmxpc3QgYWxsIG1ldGhvZHMgc3VwcG9ydGVkIGJ5IEFQSSAoZS5nLiBgbXcoJ2V2ZW50JywgJ3VzZXItbG9naW4nKTtgKVxuY29uc3Qgc3VwcG9ydGVkQVBJID0gbWV0aG9kcy5tZXRob2RzKCk7XG4vKipcbiAqIFRoZSBtYWluIGVudHJ5IG9mIHRoZSBhcHBsaWNhdGlvblxuICovXG5cbmxldCBjb25maWd1cmF0aW9ucyA9IGdlbmVyYWwuY29uc3RydWN0Q29uZmlndXJhdGlvbigpO1xuXG5mdW5jdGlvbiBhcHAod2luZG93KSB7XG4gICAgLyogKlxuICAgICAgKiBhbGwgbWV0aG9kcyB0aGF0IHdlcmUgY2FsbGVkIHRpbGwgbm93IGFuZCBzdG9yZWQgaW4gcXVldWVcbiAgICAgICogbmVlZHMgdG8gYmUgY2FsbGVkIG5vd1xuICAgICAgKiAqL1xuICAgIGxldCBnbG9iYWxPYmplY3QgPSB3aW5kb3dbd2luZG93WydIQVNILUpTJ11dO1xuICAgIGxldCBxdWV1ZSA9IGdsb2JhbE9iamVjdC5xO1xuICAgIGNvbnNvbGUubG9nKHF1ZXVlKTtcbiAgICBpZiAocXVldWUpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBjb25maWd1cmF0aW9ucyA9IGxpYnJhcmllcy5leHRlbmRPYmplY3QoY29uZmlndXJhdGlvbnMsIHF1ZXVlW2ldWzFdKTtcbiAgICAgICAgICAgIGxldCBtZXRob2QgPSBxdWV1ZVtpXVswXTtcbiAgICAgICAgICAgIGxldCBjYWxsYmFjaztcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcXVldWVbaV1bMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IHF1ZXVlW2ldWzFdO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcXVldWVbaV1bcXVldWVbMF0ubGVuZ3RoIC0gMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IHF1ZXVlW2ldW3F1ZXVlWzBdLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN1cHBvcnRlZEFQSS5pbmRleE9mKG1ldGhvZCkgPT09IC0xKVxuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKGBNZXRob2QgJHttZXRob2R9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgICAgICAgICAgIEFwaXNbbWV0aG9kXShjb25maWd1cmF0aW9ucywgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIG92ZXJyaWRlIHRlbXBvcmFyeSAodW50aWwgdGhlIGFwcCBsb2FkZWQpIGhhbmRsZXJcbiAgICAvLyBmb3Igd2lkZ2V0J3MgQVBJIGNhbGxzXG4gICAgZ2xvYmFsT2JqZWN0ID0gQXBpcztcbiAgICBnbG9iYWxPYmplY3QuY29uZmlndXJhdGlvbnMgPSBjb25maWd1cmF0aW9ucztcbn1cbi8vYXBwKHdpbmRvdyk7XG5cbndpbmRvdy5oYXNoID0gZnVuY3Rpb24ocGFyYW1zLCBjYWxsYmFjayl7XG4gICAgbGV0IHF1ZXVlID0gcGFyYW1zO1xuICAgIGNvbnNvbGUubG9nKHF1ZXVlKTtcbiAgICBpZiAocXVldWUpIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25zID0gbGlicmFyaWVzLmV4dGVuZE9iamVjdChjb25maWd1cmF0aW9ucywgcXVldWVbMV0pO1xuICAgICAgICAgICAgbGV0IG1ldGhvZCA9IHF1ZXVlWzBdO1xuXG4gICAgICAgICAgICAvKmxldCBjYWxsYmFjaztcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcXVldWVbMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IHF1ZXVlWzFdO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcXVldWVbcXVldWVbMF0ubGVuZ3RoIC0gMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IHF1ZXVlW3F1ZXVlWzBdLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IGZhbHNlO1xuICAgICAgICAgICAgfSovXG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHN1cHBvcnRlZEFQSS5pbmRleE9mKG1ldGhvZCkpO1xuICAgICAgICAgICAgaWYgKHN1cHBvcnRlZEFQSS5pbmRleE9mKG1ldGhvZC50b0xvd2VyQ2FzZSgpKSA9PT0gLTEpXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoYE1ldGhvZCAke21ldGhvZH0gaXMgbm90IHN1cHBvcnRlZGApO1xuICAgICAgICAgICAgQXBpc1ttZXRob2RdKGNvbmZpZ3VyYXRpb25zLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsImV4cG9ydCBmdW5jdGlvbiBtZXRob2RzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAgIC8vb2JqZWN0IGNyZWF0aW9uIG1ldGhvZHNcbiAgICAgICAgJ2NyZWF0ZWhlZGVyYW9iamVjdCcsICdjcmVhdGVjb250cmFjdG9iamVjdCcsXG5cbiAgICAgICAgLy9tYWluIGluaXRpYWwgbWV0aG9kIHRvIGNoZWNrIHJlYWR5bmVzcyBmb3IgcGVyZm9ybWluZyB0cmFuc2FjdGlvblxuICAgICAgICAnaW5pdCcsXG5cbiAgICAgICAgLy90cmFuc2FjdGlvbiByZWxhdGVkIG1ldGhvZHNcbiAgICAgICAgJ21ha2VwYXltZW50JywgJ21ha2VUcmFuc2FjdGlvbicsICdjaGVja3RyYW5zYWN0aW9uJywgJ2Fzc2lzdF90cmFuc2FjdGlvbicsXG5cbiAgICAgICAgLy9tb2RhbCByZWxhdGVkIG1ldGhvZHNcbiAgICAgICAgJ2dldG1vZGFsJ1xuICAgIF07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWV0aG9kcy5qcyIsImltcG9ydCAqIGFzIGdlbmVyYWwgZnJvbSAnLi9nZW5lcmFsJztcbmltcG9ydCB7TW9kYWx9IGZyb20gJy4vbW9kYWwnO1xuaW1wb3J0ICogYXMgbGlicmFyaWVzIGZyb20gJy4vbGlicmFyaWVzJztcbmltcG9ydCAqIGFzIENvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgKiBhcyBzZXJ2aWNlcyBmcm9tICcuL3NlcnZpY2VzJztcbmV4cG9ydCBmdW5jdGlvbiB0ZXN0KCl7XG4gICAgcmV0dXJuICd0aW5nJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUhlZGVyYU9iamVjdChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgbGV0IG9iamVjdCA9IFsnc3VibWlzc2lvbm5vZGUnLCAncGF5bWVudHNlcnZlcicsICdyZWNpcGllbnRsaXN0JywgJ2NvbnRlbnRpZCcsICd0eXBlJywgJ21lbW8nLCAnZXh0ZW5zaW9uaWQnLCAncmVkaXJlY3QnLCAndGltZSddO1xuICAgIGxldCBIZWRlcmFvYmplY3QgPSAnPGhlZGVyYS1taWNyb3BheW1lbnQgJztcbiAgICBmb3IgKHZhciBpIGluIG9iamVjdCkge1xuICAgICAgICBsZXQgbm9kZSA9IG9iamVjdFtpXTtcbiAgICAgICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShub2RlKSkge1xuICAgICAgICAgICAgSGVkZXJhb2JqZWN0ICs9IFwiZGF0YS1cIiArIG5vZGUgKyBcIj0gJ1wiICsgcGFyYW1zW25vZGVdICsgXCInICwgXCIgKyBcIlxcblwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIEhlZGVyYW9iamVjdCArPSAnPjwvaGVkZXJhLW1pY3JvcGF5bWVudD4nO1xuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyYW1zWydhdHRySUQnXSk7XG4gICAgYm9keS5pbm5lckhUTUwgKz0gSGVkZXJhb2JqZWN0O1xuICAgIGNhbGxiYWNrKG51bGwsSGVkZXJhb2JqZWN0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbnRyYWN0T2JqZWN0KHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICBsZXQgX19jb25zdHJ1Y3QgPSBbJ2NvbnRyYWN0aWQnLCAnbWVtbycsICdwYXltZW50c2VydmVyJywgJ3BhcmFtcycsICdhYmknLCAnYWJpJywgJ2V4dGVuc2lvbmlkJ107XG4gICAgbGV0IG9iamVjdCA9IHtcbiAgICAgICAgY29udHJhY3RpZDogJzAuMC4xNTA2NScsXG4gICAgICAgIG1lbW86ICdhNGE3YzQzMjlhYWI0YjFmYWM0NzRmZjZmOTNkODU4YycsXG4gICAgICAgIHBhcmFtczogJ1tcInBhYmxvXCJdJyxcbiAgICAgICAgYWJpOiBKU09OLnN0cmluZ2lmeSh7XCJjb25zdGFudFwiOmZhbHNlLFwiaW5wdXRzXCI6W3tcIm5hbWVcIjogXCJkb21haW5OYW1lXCIsXCJ0eXBlXCI6IFwic3RyaW5nXCJ9XSxcIm5hbWVcIjogXCJsb29rdXBcIixcIm91dHB1dHNcIjogW3tcIm5hbWVcIjogXCJkb21haW5cIixcInR5cGVcIjogXCJzdHJpbmdcIn1dLFwicGF5YWJsZVwiOiBmYWxzZSxcInN0YXRlTXV0YWJpbGl0eVwiOiBcIm5vbnBheWFibGVcIixcInR5cGVcIjogXCJmdW5jdGlvblwifSksXG4gICAgICAgIC8vcmVkaXJlY3Q6ICd7XCJub25QYXlpbmdBY2NvdW50XCI6IFwiL2luc3VmZmljaWVudC1hbW91bnQvXCIsXCJub0FjY291bnRcIjogXCIvYWNjb3VudC1ub3QtcGFpcmVkXCIsXCJob21lUGFnZVwiOiBcIi9cIn0nLFxuICAgICAgICBleHRlbnNpb25pZDogJ2lhbGFjbWRib2VlaWJlb25jZWVlZmlicGZnZ2tkZGRoJyxcbiAgICB9O1xuXG4gICAgLy9jb25zb2xlLmxvZyhKU09OLnBhcnNlKG9iamVjdC5hYmkpKTtcbiAgICBsZXQgZXh0ZW5kZWQgPSBsaWJyYXJpZXMuZXh0ZW5kT2JqZWN0KG9iamVjdCwgcGFyYW1zKTtcbiAgICAvL2NvbnNvbGUubG9nKGV4dGVuZGVkKTtcbiAgICBsZXQgQ29udHJhY3RvYmplY3QgPSAnPGhlZGVyYS1jb250cmFjdCAnO1xuICAgIGZvciAodmFyIGkgaW4gX19jb25zdHJ1Y3QpIHtcbiAgICAgICAgbGV0IG5vZGUgPSBfX2NvbnN0cnVjdFtpXTtcbiAgICAgICAgaWYgKGV4dGVuZGVkLmhhc093blByb3BlcnR5KG5vZGUpKSB7XG4gICAgICAgICAgICBDb250cmFjdG9iamVjdCArPSBcImRhdGEtXCIgKyBub2RlICsgXCI9ICdcIiArIGV4dGVuZGVkW25vZGVdICsgXCInIFwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIENvbnRyYWN0b2JqZWN0ICs9ICc+PC9oZWRlcmEtY29udHJhY3Q+JztcbiAgICAvL2NvbnNvbGUubG9nKENvbnRyYWN0b2JqZWN0KTtcbiAgICBpZihleHRlbmRlZFsnYXR0cklEJ10pe1xuICAgICAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGV4dGVuZGVkWydhdHRySUQnXSk7XG4gICAgICAgIGJvZHkuaW5uZXJIVE1MICs9IENvbnRyYWN0b2JqZWN0O1xuICAgIH1cblxuICAgIGNhbGxiYWNrKG51bGwsQ29udHJhY3RvYmplY3QpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tUcmFuc2FjdGlvbihwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgbGV0IG1lbW9faWQgPSBwYXJhbXMuY29uZmlndXJhdGlvbi5tZW1vO1xuICAgIGxldCB1cmwgPSBDb25maWcuZGVmYXVsdC5wcm9kdWN0aW9uID8gQ29uZmlnLmRlZmF1bHQucHJvZHVjdGlvblNlcnZlciA6ICdodHRwOi8vbG9jYWxob3N0OjgwOTknO1xuICAgIGxldCBzdHJ1Y3R1cmUgPSB7XG4gICAgICAgIGJhc2V1cmw6IHVybCxcbiAgICAgICAgbWVtb19pZDogbWVtb19pZCxcbiAgICAgICAgcmVjZWl2ZXJfaWQ6ICcnLFxuICAgICAgICBzdWNjZXNzOiAnL3N1Y2Nlc3MnLFxuICAgICAgICBmYWlsdXJlOiAnL3BheW1lbnQtZmFpbGVkJyxcbiAgICAgICAgdGltZW91dDogMzAwMCxcbiAgICAgICAgbGltaXQ6IDFcbiAgICB9O1xuXG4gICAgZm9yICh2YXIga2V5IGluIHBhcmFtcy5wYXJhbXMpIHtcbiAgICAgICAgaWYgKHBhcmFtcy5wYXJhbXMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBwYXJhbXMucGFyYW1zW2tleV0pIHtcbiAgICAgICAgICAgIHN0cnVjdHVyZVtrZXldID0gcGFyYW1zLnBhcmFtc1trZXldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN0cnVjdHVyZS5yZWNlaXZlcl9pZCAmJiBzdHJ1Y3R1cmUubWVtb19pZCkge1xuICAgICAgICBVUkwgPSBzdHJ1Y3R1cmUuYmFzZXVybCArIFwiL2NoZWNrL1wiICsgc3RydWN0dXJlLnJlY2VpdmVyX2lkICsgXCIvXCIgKyBzdHJ1Y3R1cmUubWVtb19pZFxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzdHJ1Y3R1cmUudGltZXN0YW1wKVxuICAgICAgICAgICAgVVJMID0gc3RydWN0dXJlLmJhc2V1cmwgKyBcIi9tZW1vL1wiICsgc3RydWN0dXJlLm1lbW9faWQgKyAnP2xpbWl0PScgKyBzdHJ1Y3R1cmUubGltaXQgKyAnJnRpbWVzdGFtcD0nICsgc3RydWN0dXJlLnRpbWVzdGFtcDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgVVJMID0gc3RydWN0dXJlLmJhc2V1cmwgKyBcIi9tZW1vL1wiICsgc3RydWN0dXJlLm1lbW9faWQgKyAnP2xpbWl0PScgKyBzdHJ1Y3R1cmUubGltaXQ7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coc3RydWN0dXJlLnRpbWVvdXQpO1xuICAgIC8vc2V0VGltZW91dChwZXJmb3JtUmVxdWVzdChzdHJ1Y3R1cmUpLCBzdHJ1Y3R1cmUudGltZW91dClcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcGVyZm9ybVJlcXVlc3Qoc3RydWN0dXJlKTtcbiAgICB9LCBzdHJ1Y3R1cmUudGltZW91dCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICBsZXQgcmVzcG9uc2UgPSB7XG4gICAgICAgIGFjY291bnRQYWlyZWQ6IGZhbHNlLFxuICAgICAgICBpc21vYmlsZTogbnVsbCxcbiAgICAgICAgdmFsaWRCcm93c2VyOiBudWxsLFxuICAgICAgICBleHRlbnNpb25JbnN0YWxsZWQ6IG51bGwsXG4gICAgICAgIGFjY2Vzc1RvQWNjb3VudHM6IG51bGwsXG4gICAgICAgIGFjY291bnRJZDogbnVsbCxcbiAgICAgICAgc3VibWlzc2lvbk5vZGU6IHBhcmFtcy5zdWJtaXNzaW9ubm9kZSxcbiAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgIHR4bl9zdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgdGltZTogcGFyYW1zLnRpbWUsXG4gICAgICAgIG1lc3NhZ2U6IG51bGxcbiAgICB9O1xuICAgIHJlc3BvbnNlLnZhbGlkQnJvd3NlciA9IGxpYnJhcmllcy5pc0Nocm9tZSgpO1xuICAgIGlmKHJlc3BvbnNlLnZhbGlkQnJvd3Nlcj09PWZhbHNlKVxuICAgICAgICByZXNwb25zZS5tZXNzYWdlID0gXCJUaGUgYnJvd3NlciBpcyBub3QgY2hyb21lXCI7XG4gICAgcmVzcG9uc2UuaXNtb2JpbGUgPSBsaWJyYXJpZXMuZGV0ZWN0bW9iKCk7XG4gICAgbGlicmFyaWVzLmRldGVjdChwYXJhbXMuZXh0ZW5zaW9uaWQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVzcG9uc2UuZXh0ZW5zaW9uSW5zdGFsbGVkID0gZmFsc2U7XG4gICAgICAgIHJlc3BvbnNlLm1lc3NhZ2UgPSBcIkV4dGVuc2lvbiBOb3QgSW5zdGFsbGVkXCI7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlc3BvbnNlLmV4dGVuc2lvbkluc3RhbGxlZCA9IHRydWU7XG4gICAgICAgIGNyZWF0ZUhlZGVyYU9iamVjdChwYXJhbXMsIGZ1bmN0aW9uKGVyciwgaG9iamVjdCl7XG4gICAgICAgICAgICBpZihob2JqZWN0KXtcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gQ29uZmlnLmRlZmF1bHQucHJvZHVjdGlvbiA/IENvbmZpZy5kZWZhdWx0LnByb2R1Y3Rpb25TZXJ2ZXIgOiAnaHR0cDovL2xvY2FsaG9zdDo4MDk5JztcbiAgICAgICAgICAgICAgICBVUkwgPSB1cmwgKyBcIi9tZW1vL1wiICsgcGFyYW1zLm1lbW87XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgICAgICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFqYXhyZXNwID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYWpheHJlc3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWpheHJlc3AucmVzcG9uc2UubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2VydmljZXMucHJlY2hlY2tlcihhamF4cmVzcC5yZXNwb25zZVswXS5ub2RlcHJlY2hlY2spKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmFjY291bnRJZCA9IGFqYXhyZXNwLnJlc3BvbnNlWzBdLnNlbmRlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmFjY291bnRQYWlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuYWNjZXNzVG9BY2NvdW50cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoYWpheHJlc3AucmVzcG9uc2VbMF0ubm9kZXByZWNoZWNrKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnR4bl9zdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmVycm9yID0gc2VydmljZXMucHJlY2hlY2tlcihhamF4cmVzcC5yZXNwb25zZVswXS5ub2RlcHJlY2hlY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UubWVzc2FnZSA9IHNlcnZpY2VzLnByZWNoZWNrZXIoYWpheHJlc3AucmVzcG9uc2VbMF0ubm9kZXByZWNoZWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLm1lc3NhZ2UgPSAnVHJhbnNhY3Rpb24gZmFpbGVkLCB0aGlzIGlzIG1vc3RseSBkdWUgdG8gZXh0ZW5zaW9uIG5vdCBiZWluZyBhYmxlIHRvIGRldGVjdCBoZWRlcmEgb2JqZWN0LCBwbGVhc2UgcmVmcmVzaCB0aGUgcGFnZS4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuYWNjb3VudFBhaXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5hY2Nlc3NUb0FjY291bnRzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHhodHRwLm9wZW4oXCJHRVRcIiwgVVJMLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgeGh0dHAuc2VuZCgpO1xuICAgICAgICAgICAgICAgIH0sIDUwMDApO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UubWVzc2FnZSA9IFwiSGVkZXJhIG9iamVjdCBjb3VsZCBub3QgYmUgZGV0ZWN0ZWQsIHBsZWFzZSB0cnkgYWdhaW4gcmVmcmVzaGluZyB0aGUgcGFnZS5cIjtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhmYWxzZSwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy9jYWxsYmFjayhudWxsLHJlc3BvbnNlKTtcbiAgICB9KTtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0bW9kYWwoY2FsbGJhY2spIHtcbiAgICB2YXIgbXlDb250ZW50ID0gZ2VuZXJhbC5nZXRtb2RhbENvbnRlbnQoKTtcbiAgICB2YXIgbXlNb2RhbCA9IG5ldyBNb2RhbCh7XG4gICAgICAgIGNvbnRlbnQ6IG15Q29udGVudFxuICAgIH0pO1xuICAgIGlmKGNhbGxiYWNrICYmIHR5cGVvZiBjYWxsYmFjaz09PSdmdW5jdGlvbicpe1xuICAgICAgICBjYWxsYmFjayhteUNvbnRlbnQpO1xuICAgIH1cbiAgICBteU1vZGFsLm9wZW4oKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VUcmFuc2FjdGlvbihjb25maWd1cmF0aW9uLCBjYWxsYmFjaykge1xuICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgIHRyYW5zYWN0aW9uX3Byb2Nlc2luZzogdHJ1ZSxcbiAgICAgICAgdHJhbnNhY3Rpb25fZmFpbGVkOiBmYWxzZSxcbiAgICAgICAgdHJhbnNhY3Rpb25fc3VjY2VzczogZmFsc2VcbiAgICB9O1xuICAgIGluaXQoY29uZmlndXJhdGlvbiwgZnVuY3Rpb24oZXJyLCByZXMpe1xuICAgICAgICBpZihlcnIpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgICAgaWYocmVzKXtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2lzdF90cmFuc2FjdGlvbihjb25maWd1cmF0aW9uLCBjYWxsYmFjaykge1xuICAgIGxldCBwYXJhbXMgPSBjb25maWd1cmF0aW9uO1xuICAgIGxldCByZXNwb25zZSA9IHtcbiAgICAgICAgYWNjb3VudFBhaXJlZDogZmFsc2UsXG4gICAgICAgIGlzbW9iaWxlOiBudWxsLFxuICAgICAgICB2YWxpZEJyb3dzZXI6IG51bGwsXG4gICAgICAgIGV4dGVuc2lvbkluc3RhbGxlZDogbnVsbCxcbiAgICAgICAgYWNjZXNzVG9BY2NvdW50czogbnVsbCxcbiAgICAgICAgYWNjb3VudElkOiBudWxsLFxuICAgICAgICBzdWJtaXNzaW9uTm9kZTogcGFyYW1zLnN1Ym1pc3Npb25ub2RlLFxuICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgdHhuX3N1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICB0aW1lOiBjb25maWd1cmF0aW9uLnRpbWVcbiAgICB9O1xuICAgIGNyZWF0ZUhlZGVyYU9iamVjdChwYXJhbXMsIGZ1bmN0aW9uKGVyciwgaG9iamVjdCl7XG4gICAgICAgIGlmKGhvYmplY3Qpe1xuICAgICAgICAgICAgbGV0IHVybCA9IENvbmZpZy5kZWZhdWx0LnByb2R1Y3Rpb24gPyBDb25maWcuZGVmYXVsdC5wcm9kdWN0aW9uU2VydmVyIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA5OSc7XG4gICAgICAgICAgICBVUkwgPSB1cmwgKyBcIi9tZW1vL1wiICsgcGFyYW1zLm1lbW87XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFqYXhyZXNwID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhamF4cmVzcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFqYXhyZXNwLnJlc3BvbnNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2VydmljZXMucHJlY2hlY2tlcihhamF4cmVzcC5yZXNwb25zZVswXS5ub2RlcHJlY2hlY2spKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuYWNjb3VudElkID0gYWpheHJlc3AucmVzcG9uc2VbMF0uc2VuZGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5hY2NvdW50UGFpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuYWNjZXNzVG9BY2NvdW50cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChhamF4cmVzcC5yZXNwb25zZVswXS5ub2RlcHJlY2hlY2spID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS50eG5fc3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZXJyb3IgPSBzZXJ2aWNlcy5wcmVjaGVja2VyKGFqYXhyZXNwLnJlc3BvbnNlWzBdLm5vZGVwcmVjaGVjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmFjY291bnRQYWlyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5hY2Nlc3NUb0FjY291bnRzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB4aHR0cC5vcGVuKFwiR0VUXCIsIFVSTCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgeGh0dHAuc2VuZCgpO1xuICAgICAgICAgICAgfSwgNTAwMCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY2FsbGJhY2soeydzdWNjZXNzJzpmYWxzZSwnbWVzc2FnZSc6J0NvdWxkIG5vdCBjcmVhdGUgaGVkZXJhIG9iamVjdCd9LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcGlzLmpzIiwiLy8gRGVmaW5lIG91ciBjb25zdHJ1Y3RvclxuZnVuY3Rpb24gTW9kYWwoKSB7XG4gICAgLy8gQ3JlYXRlIGdsb2JhbCBlbGVtZW50IHJlZmVyZW5jZXNcbiAgICB0aGlzLmNsb3NlQnV0dG9uID0gbnVsbDtcbiAgICB0aGlzLm1vZGFsID0gbnVsbDtcbiAgICB0aGlzLm92ZXJsYXkgPSBudWxsO1xuXG4gICAgLy8gRGV0ZXJtaW5lIHByb3BlciBwcmVmaXhcbiAgICB0aGlzLnRyYW5zaXRpb25FbmQgPSB0cmFuc2l0aW9uU2VsZWN0KCk7XG5cbiAgICAvLyBEZWZpbmUgb3B0aW9uIGRlZmF1bHRzXG4gICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICBhdXRvT3BlbjogZmFsc2UsXG4gICAgICAgIGNsYXNzTmFtZTogJ2ZhZGUtYW5kLWRyb3AnLFxuICAgICAgICBjbG9zZUJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgY29udGVudDogXCJcIixcbiAgICAgICAgbWF4V2lkdGg6IDYwMCxcbiAgICAgICAgbWluV2lkdGg6IDI4MCxcbiAgICAgICAgb3ZlcmxheTogZmFsc2VcbiAgICB9O1xuXG4gICAgLy8gQ3JlYXRlIG9wdGlvbnMgYnkgZXh0ZW5kaW5nIGRlZmF1bHRzIHdpdGggdGhlIHBhc3NlZCBpbiBhcnVnbWVudHNcbiAgICBpZiAoYXJndW1lbnRzWzBdICYmIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gZXh0ZW5kRGVmYXVsdHMoZGVmYXVsdHMsIGFyZ3VtZW50c1swXSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvT3BlbiA9PT0gdHJ1ZSkgdGhpcy5vcGVuKCk7XG5cbn1cblxuLy8gUHVibGljIE1ldGhvZHNcbk1vZGFsLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgXyA9IHRoaXM7XG4gICAgdGhpcy5tb2RhbC5jbGFzc05hbWUgPSB0aGlzLm1vZGFsLmNsYXNzTmFtZS5yZXBsYWNlKFwiIGhhc2gtb3BlblwiLCBcIlwiKTtcbiAgICB0aGlzLm92ZXJsYXkuY2xhc3NOYW1lID0gdGhpcy5vdmVybGF5LmNsYXNzTmFtZS5yZXBsYWNlKFwiIGhhc2gtb3BlblwiLCBcIlwiKTtcbiAgICB0aGlzLm1vZGFsLmFkZEV2ZW50TGlzdGVuZXIodGhpcy50cmFuc2l0aW9uRW5kLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF8ubW9kYWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChfLm1vZGFsKTtcbiAgICB9KTtcbiAgICB0aGlzLm92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLnRyYW5zaXRpb25FbmQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKF8ub3ZlcmxheS5wYXJlbnROb2RlKSBfLm92ZXJsYXkucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChfLm92ZXJsYXkpO1xuICAgIH0pO1xufTtcblxuTW9kYWwucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgYnVpbGRPdXQuY2FsbCh0aGlzKTtcbiAgICBpbml0aWFsaXplRXZlbnRzLmNhbGwodGhpcyk7XG4gICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5tb2RhbCkuaGVpZ2h0O1xuICAgIHRoaXMubW9kYWwuY2xhc3NOYW1lID0gdGhpcy5tb2RhbC5jbGFzc05hbWUgKyAodGhpcy5tb2RhbC5vZmZzZXRIZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQgPyBcIiBoYXNoLW9wZW4gaGFzaC1hbmNob3JlZFwiIDogXCIgaGFzaC1vcGVuXCIpO1xuICAgIC8vdGhpcy5vdmVybGF5LmNsYXNzTmFtZSA9IHRoaXMub3ZlcmxheS5jbGFzc05hbWUgKyBcIiBoYXNoLW9wZW5cIjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfY2xvc2UnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9vdXRlcl93cmFwJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH07XG59O1xuXG4vLyBQcml2YXRlIE1ldGhvZHNcbmZ1bmN0aW9uIGJ1aWxkT3V0KCkge1xuXG4gICAgdmFyIGNvbnRlbnQsIGNvbnRlbnRIb2xkZXIsIGRvY0ZyYWc7XG5cbiAgICAvKlxuICAgICAqIElmIGNvbnRlbnQgaXMgYW4gSFRNTCBzdHJpbmcsIGFwcGVuZCB0aGUgSFRNTCBzdHJpbmcuXG4gICAgICogSWYgY29udGVudCBpcyBhIGRvbU5vZGUsIGFwcGVuZCBpdHMgY29udGVudC5cbiAgICAgKi9cblxuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLmNvbnRlbnQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgY29udGVudCA9IHRoaXMub3B0aW9ucy5jb250ZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRlbnQgPSB0aGlzLm9wdGlvbnMuY29udGVudC5pbm5lckhUTUw7XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIGEgRG9jdW1lbnRGcmFnbWVudCB0byBidWlsZCB3aXRoXG4gICAgZG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgIC8vIENyZWF0ZSBtb2RhbCBlbGVtZW50XG4gICAgdGhpcy5tb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5tb2RhbC5jbGFzc05hbWUgPSBcImhhc2gtbW9kYWwgXCIgKyB0aGlzLm9wdGlvbnMuY2xhc3NOYW1lO1xuICAgIC8qdGhpcy5tb2RhbC5zdHlsZS5taW5XaWR0aCA9IHRoaXMub3B0aW9ucy5taW5XaWR0aCArIFwicHhcIjtcbiAgICB0aGlzLm1vZGFsLnN0eWxlLm1heFdpZHRoID0gdGhpcy5vcHRpb25zLm1heFdpZHRoICsgXCJweFwiOyovXG5cbiAgICAvLyBJZiBjbG9zZUJ1dHRvbiBvcHRpb24gaXMgdHJ1ZSwgYWRkIGEgY2xvc2UgYnV0dG9uXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jbG9zZUJ1dHRvbiA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcHVwLWNsb3NlLWJ0bicpO1xuICAgIH1cblxuICAgIC8vIENyZWF0ZSBjb250ZW50IGFyZWEgYW5kIGFwcGVuZCB0byBtb2RhbFxuICAgIGNvbnRlbnRIb2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnRlbnRIb2xkZXIuY2xhc3NOYW1lID0gXCJoYXNoLWNvbnRlbnRcIjtcbiAgICBjb250ZW50SG9sZGVyLmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgdGhpcy5tb2RhbC5hcHBlbmRDaGlsZChjb250ZW50SG9sZGVyKTtcblxuICAgIC8vIEFwcGVuZCBtb2RhbCB0byBEb2N1bWVudEZyYWdtZW50XG4gICAgZG9jRnJhZy5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsKTtcblxuICAgIC8vIEFwcGVuZCBEb2N1bWVudEZyYWdtZW50IHRvIGJvZHlcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvY0ZyYWcpO1xuXG59XG5cbmltZ2NoYW5nZUZ1bmN0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjaGJveHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShcImltZ19jaGtib3hcIik7XG4gICAgdmFyIHZhcl9jaGVjayA9IFwiXCI7XG5cbiAgICB2YXIgaW1nX2FsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJpbWdfYWxsXCIpO1xuXG4gICAgZm9yKHZhciBpPTA7aTxjaGJveHMubGVuZ3RoO2krKykge1xuICAgICAgICBpZihjaGJveHNbaV0uY2hlY2tlZCl7XG4gICAgICAgICAgICB2YXJfY2hlY2sgPSB2YXJfY2hlY2suY29uY2F0KGNoYm94c1tpXS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZih2YXJfY2hlY2sgPT0gJ2ltZ19vbmUnKXtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ190d28nKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfdGhyZWUnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfZm91cicpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ19vbmUnKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBpZih2YXJfY2hlY2sgPT0gJ2ltZ19vbmVpbWdfdHdvJykge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX29uZScpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ190aHJlZScpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ19mb3VyJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX3R3bycpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIGlmKHZhcl9jaGVjayA9PSAnaW1nX29uZWltZ190d29pbWdfdGhyZWUnKXtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ19vbmUnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfdHdvJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX2ZvdXInKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfdGhyZWUnKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBpZih2YXJfY2hlY2sgPT0gJ2ltZ19vbmVpbWdfdHdvaW1nX3RocmVlaW1nX2ZvdXInKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfb25lJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX3R3bycpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ190aHJlZScpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ19mb3VyJykuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBleHRlbmREZWZhdWx0cyhzb3VyY2UsIHByb3BlcnRpZXMpIHtcbiAgICB2YXIgcHJvcGVydHk7XG4gICAgZm9yIChwcm9wZXJ0eSBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICAgICAgc291cmNlW3Byb3BlcnR5XSA9IHByb3BlcnRpZXNbcHJvcGVydHldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2U7XG59XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVFdmVudHMoKSB7XG4gICAgaWYgKHRoaXMuY2xvc2VCdXR0b24pIHtcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2UuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3ZlcmxheSkge1xuICAgICAgICB0aGlzLm92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlLmJpbmQodGhpcykpO1xuICAgIH1cblxufVxuXG5mdW5jdGlvbiB0cmFuc2l0aW9uU2VsZWN0KCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgaWYgKGVsLnN0eWxlLldlYmtpdFRyYW5zaXRpb24pIHJldHVybiBcIndlYmtpdFRyYW5zaXRpb25FbmRcIjtcbiAgICBpZiAoZWwuc3R5bGUuT1RyYW5zaXRpb24pIHJldHVybiBcIm9UcmFuc2l0aW9uRW5kXCI7XG4gICAgcmV0dXJuICd0cmFuc2l0aW9uZW5kJztcbn1cbi8vZXhwb3J0aW5nIG1vZHVsZVxubW9kdWxlLmV4cG9ydHMuTW9kYWwgPSBNb2RhbDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb2RhbC5qcyJdLCJzb3VyY2VSb290IjoiIn0=