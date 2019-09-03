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
    extensionid: "dafkdmjifphnfjcajcbkhdjlkohanphh",
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
}

app(window);

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
    if (supportedAPI.indexOf(method) === -1) throw Error("Method ".concat(method, " is not supported"));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDJmYzI5MzdjYzg5YjlhYTMzMzgiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9nZW5lcmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYnJhcmllcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWV0aG9kcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kYWwuanMiXSwibmFtZXMiOlsicGluZyIsInByZWNoZWNrZXIiLCJuIiwianNvbiIsInByb2R1Y3Rpb24iLCJDb25maWciLCJ0b2RheSIsIkRhdGUiLCJkYXRlIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImdldERhdGUiLCJ0aW1lIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZGF0ZVRpbWUiLCJ0aW1lc3RhbXAiLCJnZXRUaW1lIiwiZ2V0bW9kYWxDb250ZW50IiwiY29uc3RydWN0Q29uZmlndXJhdGlvbiIsInBheW1lbnRzZXJ2ZXIiLCJwcm9kdWN0aW9uU2VydmVyIiwiZXh0ZW5zaW9uaWQiLCJlcnJvciIsInR5cGUiLCJub3ciLCJyZWRpcmVjdCIsInN1Ym1pc3Npb25ub2RlIiwibWVtbyIsInJlY2lwaWVudGxpc3QiLCJjb250ZW50aWQiLCJhdHRySUQiLCJpZCIsIndpbmRvdyIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJjb25maWciLCJkZXRlY3Rtb2IiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJtYXRjaCIsImRldGVjdCIsImV4dGVuc2lvbklkIiwibm90SW5zdGFsbGVkQ2FsbGJhY2siLCJpbnN0YWxsZWRDYWxsYmFjayIsImltZyIsIkltYWdlIiwiY29uc29sZSIsImxvZyIsIm9uZXJyb3IiLCJvbmxvYWQiLCJzcmMiLCJleHRlbmRPYmplY3QiLCJhIiwiYiIsImtleSIsImhhc093blByb3BlcnR5IiwiaXNDaHJvbWUiLCJzdXBwb3J0ZWRBUEkiLCJtZXRob2RzIiwiY29uZmlndXJhdGlvbnMiLCJnZW5lcmFsIiwiYXBwIiwiZ2xvYmFsT2JqZWN0IiwicXVldWUiLCJxIiwiaSIsImxlbmd0aCIsImxpYnJhcmllcyIsIm1ldGhvZCIsImNhbGxiYWNrIiwiaW5kZXhPZiIsIkVycm9yIiwiQXBpcyIsImhhc2giLCJwYXJhbXMiLCJ0ZXN0IiwiY3JlYXRlSGVkZXJhT2JqZWN0Iiwib2JqZWN0IiwiSGVkZXJhb2JqZWN0Iiwibm9kZSIsImJvZHkiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwiY3JlYXRlQ29udHJhY3RPYmplY3QiLCJfX2NvbnN0cnVjdCIsImNvbnRyYWN0aWQiLCJtYXhpbXVtIiwiYWJpIiwiSlNPTiIsInN0cmluZ2lmeSIsInBhcnNlIiwiZXh0ZW5kZWQiLCJDb250cmFjdG9iamVjdCIsImNoZWNrVHJhbnNhY3Rpb24iLCJtZW1vX2lkIiwiY29uZmlndXJhdGlvbiIsInVybCIsInN0cnVjdHVyZSIsImJhc2V1cmwiLCJyZWNlaXZlcl9pZCIsInN1Y2Nlc3MiLCJmYWlsdXJlIiwidGltZW91dCIsImxpbWl0IiwiVVJMIiwic2V0VGltZW91dCIsInBlcmZvcm1SZXF1ZXN0IiwiaW5pdCIsInJlc3BvbnNlIiwiYWNjb3VudFBhaXJlZCIsImlzbW9iaWxlIiwidmFsaWRCcm93c2VyIiwiZXh0ZW5zaW9uSW5zdGFsbGVkIiwiYWNjZXNzVG9BY2NvdW50cyIsImFjY291bnRJZCIsInN1Ym1pc3Npb25Ob2RlIiwidHhuX3N1Y2Nlc3MiLCJtZXNzYWdlIiwiZXJyIiwiaG9iamVjdCIsInhodHRwIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwiYWpheHJlc3AiLCJzZXJ2aWNlcyIsIm5vZGVwcmVjaGVjayIsInNlbmRlciIsInBhcnNlSW50Iiwib3BlbiIsInNlbmQiLCJnZXRtb2RhbCIsIm15Q29udGVudCIsIm15TW9kYWwiLCJNb2RhbCIsImNvbnRlbnQiLCJtYWtlVHJhbnNhY3Rpb24iLCJ0cmFuc2FjdGlvbl9wcm9jZXNpbmciLCJ0cmFuc2FjdGlvbl9mYWlsZWQiLCJ0cmFuc2FjdGlvbl9zdWNjZXNzIiwicmVzIiwiYXNzaXN0X3RyYW5zYWN0aW9uIiwiY2xvc2VCdXR0b24iLCJtb2RhbCIsIm92ZXJsYXkiLCJ0cmFuc2l0aW9uRW5kIiwidHJhbnNpdGlvblNlbGVjdCIsImRlZmF1bHRzIiwiYXV0b09wZW4iLCJjbGFzc05hbWUiLCJtYXhXaWR0aCIsIm1pbldpZHRoIiwiYXJndW1lbnRzIiwib3B0aW9ucyIsImV4dGVuZERlZmF1bHRzIiwicHJvdG90eXBlIiwiY2xvc2UiLCJfIiwicmVwbGFjZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJidWlsZE91dCIsImNhbGwiLCJpbml0aWFsaXplRXZlbnRzIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImhlaWdodCIsIm9mZnNldEhlaWdodCIsImlubmVySGVpZ2h0IiwicXVlcnlTZWxlY3RvciIsIm9uY2xpY2siLCJzdHlsZSIsImRpc3BsYXkiLCJjb250ZW50SG9sZGVyIiwiZG9jRnJhZyIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJpbWdjaGFuZ2VGdW5jdGlvbiIsImNoYm94cyIsImdldEVsZW1lbnRzQnlOYW1lIiwidmFyX2NoZWNrIiwiaW1nX2FsbCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjaGVja2VkIiwiY29uY2F0IiwidmFsdWUiLCJzb3VyY2UiLCJwcm9wZXJ0aWVzIiwicHJvcGVydHkiLCJiaW5kIiwiZWwiLCJXZWJraXRUcmFuc2l0aW9uIiwiT1RyYW5zaXRpb24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FB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QUwsQ0FBaUJpQixnQkFBakIsQ0FBa0MsT0FBbEMsRUFBMkMsS0FBS0gsS0FBTCxDQUFXa0MsSUFBWCxDQUFnQixJQUFoQixDQUEzQztBQUNIOztBQUVELE1BQUksS0FBSzlDLE9BQVQsRUFBa0I7QUFDZCxTQUFLQSxPQUFMLENBQWFlLGdCQUFiLENBQThCLE9BQTlCLEVBQXVDLEtBQUtILEtBQUwsQ0FBV2tDLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBdkM7QUFDSDtBQUVKOztBQUVELFNBQVM1QyxnQkFBVCxHQUE0QjtBQUN4QixNQUFJNkMsRUFBRSxHQUFHaEgsUUFBUSxDQUFDaUcsYUFBVCxDQUF1QixLQUF2QixDQUFUO0FBQ0EsTUFBSWUsRUFBRSxDQUFDcEIsS0FBSCxDQUFTcUIsZ0JBQWIsRUFBK0IsT0FBTyxxQkFBUDtBQUMvQixNQUFJRCxFQUFFLENBQUNwQixLQUFILENBQVNzQixXQUFiLEVBQTBCLE9BQU8sZ0JBQVA7QUFDMUIsU0FBTyxlQUFQO0FBQ0gsQyxDQUNEOzs7QUFDQUMsTUFBTSxDQUFDQyxPQUFQLENBQWU3RCxLQUFmLEdBQXVCQSxLQUF2QixDIiwiZmlsZSI6IndpZGdldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGQyZmMyOTM3Y2M4OWI5YWEzMzM4IiwiZXhwb3J0IGZ1bmN0aW9uIHBpbmcoKSB7XG4gICAgcmV0dXJuICdwb25nJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByZWNoZWNrZXIobikge1xuICAgIGxldCBqc29uID0gezA6IFwiT0tcIiwgMTogXCJJTlZBTElEX1RSQU5TQUNUSU9OXCIsIDI6IFwiUEFZRVJfQUNDT1VOVF9OT1RfRk9VTkRcIiwgMzogXCJJTlZBTElEX05PREVfQUNDT1VOVFwiLCA0OiBcIlRSQU5TQUNUSU9OX0VYUElSRURcIiwgNTogXCJJTlZBTElEX1RSQU5TQUNUSU9OX1NUQVJUXCIsIDY6IFwiSU5WQUxJRF9UUkFOU0FDVElPTl9EVVJBVElPTlwiLCA3OiBcIklOVkFMSURfU0lHTkFUVVJFXCIsIDg6IFwiTUVNT19UT09fTE9OR1wiLCA5OiBcIklOU1VGRklDSUVOVF9UWF9GRUVcIiwgMTA6IFwiSU5TVUZGSUNJRU5UX1BBWUVSX0JBTEFOQ0VcIiwgMTE6IFwiRFVQTElDQVRFX1RSQU5TQUNUSU9OXCIsIDEyOiBcIkJVU1lcIiwgMTM6IFwiTk9UX1NVUFBPUlRFRFwiLCAxNDogXCJJTlZBTElEX0ZJTEVfSURcIiwgMTU6IFwiSU5WQUxJRF9BQ0NPVU5UX0lEXCIsIDE2OiBcIklOVkFMSURfQ09OVFJBQ1RfSURcIiwgMTc6IFwiSU5WQUxJRF9UUkFOU0FDVElPTl9JRFwiLCAxODogXCJSRUNFSVBUX05PVF9GT1VORFwiLCAxOTogXCJSRUNPUkRfTk9UX0ZPVU5EXCIsIDIwOiBcIklOVkFMSURfU09MSURJVFlfSURcIiwgMjE6IFwiVU5LTk9XTlwiLCAyMjogXCJTVUNDRVNTXCIsIDIzOiBcIkZBSUxfSU5WQUxJRFwiLCAyNDogXCJGQUlMX0ZFRVwiLCAyNTogXCJGQUlMX0JBTEFOQ0VcIiwgMjY6IFwiS0VZX1JFUVVJUkVEXCIsIDI3OiBcIkJBRF9FTkNPRElOR1wiLCAyODogXCJJTlNVRkZJQ0lFTlRfQUNDT1VOVF9CQUxBTkNFXCIsIDI5OiBcIklOVkFMSURfU09MSURJVFlfQUREUkVTU1wiLCAzMDogXCJJTlNVRkZJQ0lFTlRfR0FTXCIsIDMxOiBcIkNPTlRSQUNUX1NJWkVfTElNSVRfRVhDRUVERURcIiwgMzI6IFwiTE9DQUxfQ0FMTF9NT0RJRklDQVRJT05fRVhDRVBUSU9OXCIsIDMzOiBcIkNPTlRSQUNUX1JFVkVSVF9FWEVDVVRFRFwiLCAzNDogXCJDT05UUkFDVF9FWEVDVVRJT05fRVhDRVBUSU9OXCIsIDM1OiBcIklOVkFMSURfUkVDRUlWSU5HX05PREVfQUNDT1VOVFwiLCAzNjogXCJNSVNTSU5HX1FVRVJZX0hFQURFUlwiLCAzNzogXCJBQ0NPVU5UX1VQREFURV9GQUlMRURcIiwgMzg6IFwiSU5WQUxJRF9LRVlfRU5DT0RJTkdcIiwgMzk6IFwiTlVMTF9TT0xJRElUWV9BRERSRVNTXCIsIDQwOiBcIkNPTlRSQUNUX1VQREFURV9GQUlMRURcIiwgNDE6IFwiSU5WQUxJRF9RVUVSWV9IRUFERVJcIiwgNDI6IFwiSU5WQUxJRF9GRUVfU1VCTUlUVEVEXCIsIDQzOiBcIklOVkFMSURfUEFZRVJfU0lHTkFUVVJFXCIsIDQ0OiBcIktFWV9OT1RfUFJPVklERURcIiwgNDU6IFwiSU5WQUxJRF9FWFBJUkFUSU9OX1RJTUVcIiwgNDY6IFwiTk9fV0FDTF9LRVlcIiwgNDc6IFwiRklMRV9DT05URU5UX0VNUFRZXCIsIDQ4OiBcIklOVkFMSURfQUNDT1VOVF9BTU9VTlRTXCIsIDQ5OiBcIkVNUFRZX1RSQU5TQUNUSU9OX0JPRFlcIiwgNTA6IFwiSU5WQUxJRF9UUkFOU0FDVElPTl9CT0RZXCIsIDUxOiBcIklOVkFMSURfU0lHTkFUVVJFX1RZUEVfTUlTTUFUQ0hJTkdfS0VZXCIsIDUyOiBcIklOVkFMSURfU0lHTkFUVVJFX0NPVU5UX01JU01BVENISU5HX0tFWVwiLCA1MzogXCJFTVBUWV9DTEFJTV9CT0RZXCIsIDU0OiBcIkVNUFRZX0NMQUlNX0hBU0hcIiwgNTU6IFwiRU1QVFlfQ0xBSU1fS0VZU1wiLCA1NjogXCJJTlZBTElEX0NMQUlNX0hBU0hfU0laRVwiLCA1NzogXCJFTVBUWV9RVUVSWV9CT0RZXCIsIDU4OiBcIkVNUFRZX0NMQUlNX1FVRVJZXCIsIDU5OiBcIkNMQUlNX05PVF9GT1VORFwiLCA2MDogXCJBQ0NPVU5UX0lEX0RPRVNfTk9UX0VYSVNUXCIsIDYxOiBcIkNMQUlNX0FMUkVBRFlfRVhJU1RTXCIsIDYyOiBcIklOVkFMSURfRklMRV9XQUNMXCIsIDYzOiBcIlNFUklBTElaQVRJT05fRkFJTEVEXCIsIDY0OiBcIlRSQU5TQUNUSU9OX09WRVJTSVpFXCIsIDY1OiBcIlRSQU5TQUNUSU9OX1RPT19NQU5ZX0xBWUVSU1wiLCA2NjogXCJDT05UUkFDVF9ERUxFVEVEXCIsIDY3OiBcIlBMQVRGT1JNX05PVF9BQ1RJVkVcIiwgNjg6IFwiS0VZX1BSRUZJWF9NSVNNQVRDSFwiLCA2OTogXCJQTEFURk9STV9UUkFOU0FDVElPTl9OT1RfQ1JFQVRFRFwiLCA3MDogXCJJTlZBTElEX1JFTkVXQUxfUEVSSU9EXCIsIDcxOiBcIklOVkFMSURfUEFZRVJfQUNDT1VOVF9JRFwiLCA3MjogXCJBQ0NPVU5UX0RFTEVURURcIiwgNzM6IFwiRklMRV9ERUxFVEVEXCIsIDc0OiBcIkFDQ09VTlRfUkVQRUFURURfSU5fQUNDT1VOVF9BTU9VTlRTXCIsIDc1OiBcIlNFVFRJTkdfTkVHQVRJVkVfQUNDT1VOVF9CQUxBTkNFXCIsIDc2OiBcIk9CVEFJTkVSX1JFUVVJUkVEXCIsIDc3OiBcIk9CVEFJTkVSX1NBTUVfQ09OVFJBQ1RfSURcIiwgNzg6IFwiT0JUQUlORVJfRE9FU19OT1RfRVhJU1RcIiwgNzk6IFwiTU9ESUZZSU5HX0lNTVVUQUJMRV9DT05UUkFDVFwiLCA4MDogXCJGSUxFX1NZU1RFTV9FWENFUFRJT05cIiwgODE6IFwiQVVUT1JFTkVXX0RVUkFUSU9OX05PVF9JTl9SQU5HRVwiLCA4MjogXCJFUlJPUl9ERUNPRElOR19CWVRFU1RSSU5HXCIsIDgzOiBcIkNPTlRSQUNUX0ZJTEVfRU1QVFlcIiwgODQ6IFwiQ09OVFJBQ1RfQllURUNPREVfRU1QVFlcIiwgODU6IFwiSU5WQUxJRF9JTklUSUFMX0JBTEFOQ0VcIiwgODY6IFwiSU5WQUxJRF9SRUNFSVZFX1JFQ09SRF9USFJFU0hPTERcIiwgODc6IFwiSU5WQUxJRF9TRU5EX1JFQ09SRF9USFJFU0hPTERcIiwgODg6IFwiQUNDT1VOVF9JU19OT1RfR0VORVNJU19BQ0NPVU5UXCJ9XG4gICAgIHJldHVybiBqc29uW25dO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2VzLmpzIiwiaW1wb3J0ICogYXMgQ29uZmlnIGZyb20gJy4vY29uZmlnJztcblxubGV0IHByb2R1Y3Rpb24gPSBDb25maWcuZGVmYXVsdC5wcm9kdWN0aW9uO1xuXG5sZXQgdG9kYXkgPSBuZXcgRGF0ZSgpLFxuICAgIGRhdGUgPSB0b2RheS5nZXRGdWxsWWVhcigpICsgJy0nICsgKHRvZGF5LmdldE1vbnRoKCkgKyAxKSArICctJyArIHRvZGF5LmdldERhdGUoKSxcbiAgICB0aW1lID0gdG9kYXkuZ2V0SG91cnMoKSArIFwiOlwiICsgdG9kYXkuZ2V0TWludXRlcygpLFxuICAgIGRhdGVUaW1lID0gZGF0ZSArICcgJyArIHRpbWUsXG4gICAgdGltZXN0YW1wID0gbmV3IERhdGUoZGF0ZVRpbWUpLmdldFRpbWUoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldG1vZGFsQ29udGVudCgpIHtcbiAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJwb3B1cF9vdXRlcl93cmFwXCI+XFxuJyArXG4gICAgJ1xcdCAgXFx0PGRpdiBjbGFzcz1cInBvcHVwX3dyYXBcIj5cXG4nICtcbiAgICAnXFx0ICBcXHRcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfaGVhZGVyXCI+U2V0dXAgVGFzayA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJwb3B1cF9jbG9zZVwiIGlkPVwicG9wdXAtY2xvc2UtYnRuXCI+eDwvYT48L2Rpdj5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0PGRpdiBjbGFzcz1cInBvcHVwX2lubmVyXCI+XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0PGRpdiBjbGFzcz1cInBvcHVwX2lubmVyX2xlZnRcIj5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0XFx0PGZvcm0gYWN0aW9uPVwiL2FjdGlvbl9wYWdlLnBocFwiIGNsYXNzPVwicG9wdXBfZm9ybVwiPlxcbicgK1xuICAgICdcXHRcXHRcXHRcXHRcXHQgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBvbmNoYW5nZT0gXCJpbWdjaGFuZ2VGdW5jdGlvbigpXCIgaWQ9XCJpbWdfb25lXCIgY2xhc3M9XCJwb3B1cF9jaGtib3ggdG9nZ2xlX19pbnB1dFwiIG5hbWU9XCJpbWdfY2hrYm94XCIgdmFsdWU9XCJpbWdfb25lXCI+XFxuJyArXG4gICAgJ1xcdFxcdFxcdFxcdFxcdCAgPGxhYmVsIGZvcj1cImltZ19vbmVcIj4mbmJzcDsgSW5zdGFsbCBIZWRlcmEgV2FsbGV0PC9sYWJlbD5cXG4nICtcbiAgICAnXFx0XFx0XFx0XFx0XFx0ICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgb25jaGFuZ2U9IFwiaW1nY2hhbmdlRnVuY3Rpb24oKVwiIGlkPVwiaW1nX3R3b1wiIGNsYXNzPVwicG9wdXBfY2hrYm94IHRvZ2dsZV9faW5wdXRcIiBuYW1lPVwiaW1nX2Noa2JveFwiIHZhbHVlPVwiaW1nX3R3b1wiPlxcbicgK1xuICAgICdcXHRcXHRcXHRcXHRcXHQgIDxsYWJlbCBmb3I9XCJpbWdfdHdvXCI+Jm5ic3A7IFwiUGFpciB5b3VyIEFjY291bnRcIjwvbGFiZWw+XFxuJyArXG4gICAgJ1xcbicgK1xuICAgICdcXHRcXHRcXHRcXHRcXHQgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBvbmNoYW5nZT0gXCJpbWdjaGFuZ2VGdW5jdGlvbigpXCIgaWQ9XCJpbWdfdGhyZWVcIiBjbGFzcz1cInBvcHVwX2Noa2JveCB0b2dnbGVfX2lucHV0XCIgbmFtZT1cImltZ19jaGtib3hcIiB2YWx1ZT1cImltZ190aHJlZVwiPlxcbicgK1xuICAgICdcXHRcXHRcXHRcXHRcXHQgIDxsYWJlbCBmb3I9XCJpbWdfdGhyZWVcIj4mbmJzcDsgXCJBbGxvdyBQYXltZW50IFJlcXVlc3RzXCI8L2xhYmVsPlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnXFx0XFx0XFx0XFx0XFx0ICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgb25jaGFuZ2U9IFwiaW1nY2hhbmdlRnVuY3Rpb24oKVwiIGlkPVwiaW1nX2ZvdXJcIiBjbGFzcz1cInBvcHVwX2Noa2JveCB0b2dnbGVfX2lucHV0XCIgbmFtZT1cImltZ19jaGtib3hcIiB2YWx1ZT1cImltZ19mb3VyXCI+XFxuJyArXG4gICAgJ1xcdFxcdFxcdFxcdFxcdCAgPGxhYmVsIGZvcj1cImltZ19mb3VyXCI+Jm5ic3A7IFwiR2V0IHNvbWUgSEJBUlwiPC9sYWJlbD5cXG4nICtcbiAgICAnXFx0XFx0XFx0XFx0XFx0PC9mb3JtPlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnXFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cInBvcHVwX2xvZ29cIj5cXG4nICtcbiAgICAnXFx0XFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cImxvZ29fdHh0XCI+UG93ZXJlZCBieTwvZGl2PlxcbicgK1xuICAgICdcXHRcXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwibG9nb19pY29uXCI+PGltZyBzcmM9XCIvL2FwaS5oYXNoaW5nc3lzdGVtcy5jb20vaW1nL3BvcHVwX2xvZ28ucG5nXCI+PC9kaXY+XFxuJyArXG4gICAgJ1xcdFxcdFxcdFxcdFxcdDwvZGl2PlxcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdFxcdFxcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdDwvZGl2PlxcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJwb3B1cF9pbm5lcl9yaWdodFwiPlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfaW1nX3NlY1wiPlxcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdFxcdFxcdDxpbWcgY2xhc3M9XCJpbWdfb25lXCIgc3JjPVwiLy9hcGkuaGFzaGluZ3N5c3RlbXMuY29tL2ltZy9pbWdfb25lLnBuZ1wiPlxcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdFxcdFxcdDxpbWcgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiIGNsYXNzPVwiaW1nX3R3b1wiIHNyYz1cIi8vYXBpLmhhc2hpbmdzeXN0ZW1zLmNvbS9pbWcvaW1nX3R3by5wbmdcIj5cXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHRcXHRcXHQ8aW1nIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIiBjbGFzcz1cImltZ190aHJlZVwiIHNyYz1cIi8vYXBpLmhhc2hpbmdzeXN0ZW1zLmNvbS9pbWcvaW1nX3RocmVlLnBuZ1wiPlxcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdFxcdFxcdDxpbWcgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiIGNsYXNzPVwiaW1nX2ZvdXJcIiBzcmM9XCIvL2FwaS5oYXNoaW5nc3lzdGVtcy5jb20vaW1nL2ltZ19mb3VyLnBuZ1wiPlxcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdFxcdDwvZGl2PlxcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJ0eHRfd3JhcFwiPlxcbicgK1xuICAgICdcXHRcXHQgIFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJ0eHRfaGVhZGVyXCI+TGV0cyBnZXQgeW91IHN0YXJ0ZWQhPC9kaXY+XFxuJyArXG4gICAgJ1xcdFxcdCAgXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cInR4dF9jb250ZW50XCI+TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQsIHNlZCBkbyBlaXVzbW9kIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZSBldCA8L2Rpdj5cXG4nICtcbiAgICAnXFx0XFx0ICBcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfYnRuXCI+XFxuJyArXG4gICAgJ1xcdFxcdCAgXFx0XFx0XFx0XFx0XFx0PGEgaHJlZj1cIlwiPklcXCdtIFJlYWR5PC9hPlxcbicgK1xuICAgICdcXHRcXHQgIFxcdFxcdFxcdFxcdDwvZGl2PlxcbicgK1xuICAgICdcXHRcXHQgIFxcdFxcdFxcdDwvZGl2PlxcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdFxcdFxcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdDwvZGl2PlxcbicgK1xuICAgICdcXHQgIFxcdFxcdDwvZGl2PlxcbicgK1xuICAgICdcXHQgIFxcdDwvZGl2Pic7XG59XG5cblxuXG5leHBvcnQgZnVuY3Rpb24gY29uc3RydWN0Q29uZmlndXJhdGlvbigpe1xuICAgIHJldHVybiB7XG4gICAgICAgIHBheW1lbnRzZXJ2ZXI6IHByb2R1Y3Rpb24gPyBDb25maWcuZGVmYXVsdC5wcm9kdWN0aW9uU2VydmVyIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA5OScsXG4gICAgICAgIGV4dGVuc2lvbmlkOiBcImRhZmtkbWppZnBobmZqY2FqY2JraGRqbGtvaGFucGhoXCIsXG4gICAgICAgIGVycm9yOiBcIi9uby1leHRlbnNpb25cIixcbiAgICAgICAgdHlwZTogXCJhcnRpY2xlXCIsXG4gICAgICAgIHRpbWU6IERhdGUubm93KCksXG4gICAgICAgIHJlZGlyZWN0OiAneyBcIm5vblBheWluZ0FjY291bnRcIjogXCIvaW5zdWZmaWNpZW50LWFtb3VudC9cIiwgXCJub0FjY291bnRcIjogXCIvYWNjb3VudC1ub3QtcGFpcmVkL1wiLCBcImhvbWVQYWdlXCI6IFwiL1wiLCBcInN1Y2Nlc3M6L3N1Y2Nlc3NcIn0nLFxuICAgICAgICBzdWJtaXNzaW9ubm9kZTogXCIwLjAuM1wiLFxuICAgICAgICBtZW1vOiBEYXRlLm5vdygpLFxuICAgICAgICByZWNpcGllbnRsaXN0OiAnW3sgXCJ0b1wiOiBcIjAuMC45OVwiLCBcInRpbnliYXJzXCI6IFwiMjAwMDAwXCIgfV0nLFxuICAgICAgICBjb250ZW50aWQ6ICc3OScsXG4gICAgICAgIGF0dHJJRDogJ2FydGljbGUtMScsXG4gICAgICAgIHRpbWVzdGFtcDogdGltZXN0YW1wLFxuICAgICAgICAvKnRoaXMgbWlnaHQgbWFrZSBhIGdvb2QgZGVmYXVsdCBpZCBmb3IgdGhlIGNvbnRlbnQqL1xuICAgICAgICBpZDogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLFxuICAgIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2VuZXJhbC5qcyIsImNvbnN0IGNvbmZpZyA9IHtcbiAgICBwcm9kdWN0aW9uOiB0cnVlLFxuICAgIHByb2R1Y3Rpb25TZXJ2ZXI6ICdodHRwczovL21wcy5oYXNoaW5nc3lzdGVtcy5jb20nXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWdcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb25maWcuanMiLCJleHBvcnQgZnVuY3Rpb24gZGV0ZWN0bW9iKCkge1xuICAgIHJldHVybiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC93ZWJPUy9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGhvbmUvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBhZC9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUG9kL2kpXG4gICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0JsYWNrQmVycnkvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvV2luZG93cyBQaG9uZS9pKVxuICAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3QoZXh0ZW5zaW9uSWQsIG5vdEluc3RhbGxlZENhbGxiYWNrLCBpbnN0YWxsZWRDYWxsYmFjaykge1xuICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBjb25zb2xlLmxvZyhleHRlbnNpb25JZCk7XG4gICAgaW1nLm9uZXJyb3IgPSBub3RJbnN0YWxsZWRDYWxsYmFjaztcbiAgICBpbWcub25sb2FkID0gaW5zdGFsbGVkQ2FsbGJhY2s7XG4gICAgaW1nLnNyYyA9ICdjaHJvbWUtZXh0ZW5zaW9uOi8vJyArIGV4dGVuc2lvbklkICsgJy9pY29ucy9pY29uMTYucG5nJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZE9iamVjdChhLCBiKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGIpXG4gICAgICAgIGlmIChiLmhhc093blByb3BlcnR5KGtleSkpIGFba2V5XSA9IGJba2V5XTtcbiAgICByZXR1cm4gYTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2hyb21lKCkge1xuICAgIHJldHVybiAnY2hyb21lJyBpbiB3aW5kb3dcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9saWJyYXJpZXMuanMiLCJpbXBvcnQge3BpbmcsIHByZWNoZWNrZXJ9IGZyb20gJy4vc2VydmljZXMnO1xuaW1wb3J0ICogYXMgbWV0aG9kcyBmcm9tICcuL21ldGhvZHMnO1xuaW1wb3J0ICogYXMgZ2VuZXJhbCBmcm9tICcuL2dlbmVyYWwnO1xuaW1wb3J0ICogYXMgQXBpcyBmcm9tICcuL2FwaXMnO1xuaW1wb3J0ICogYXMgbGlicmFyaWVzIGZyb20gJy4vbGlicmFyaWVzJztcblxuLy8gZW5saXN0IGFsbCBtZXRob2RzIHN1cHBvcnRlZCBieSBBUEkgKGUuZy4gYG13KCdldmVudCcsICd1c2VyLWxvZ2luJyk7YClcbmNvbnN0IHN1cHBvcnRlZEFQSSA9IG1ldGhvZHMubWV0aG9kcygpO1xuLyoqXG4gKiBUaGUgbWFpbiBlbnRyeSBvZiB0aGUgYXBwbGljYXRpb25cbiAqL1xuXG5sZXQgY29uZmlndXJhdGlvbnMgPSBnZW5lcmFsLmNvbnN0cnVjdENvbmZpZ3VyYXRpb24oKTtcblxuZnVuY3Rpb24gYXBwKHdpbmRvdykge1xuICAgIC8qICpcbiAgICAgICogYWxsIG1ldGhvZHMgdGhhdCB3ZXJlIGNhbGxlZCB0aWxsIG5vdyBhbmQgc3RvcmVkIGluIHF1ZXVlXG4gICAgICAqIG5lZWRzIHRvIGJlIGNhbGxlZCBub3dcbiAgICAgICogKi9cbiAgICBsZXQgZ2xvYmFsT2JqZWN0ID0gd2luZG93W3dpbmRvd1snSEFTSC1KUyddXTtcbiAgICBsZXQgcXVldWUgPSBnbG9iYWxPYmplY3QucTtcbiAgICBjb25zb2xlLmxvZyhxdWV1ZSk7XG4gICAgaWYgKHF1ZXVlKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgY29uZmlndXJhdGlvbnMgPSBsaWJyYXJpZXMuZXh0ZW5kT2JqZWN0KGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gcXVldWVbaV1bMF07XG4gICAgICAgICAgICBsZXQgY2FsbGJhY2s7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHF1ZXVlW2ldWzFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBxdWV1ZVtpXVsxXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHF1ZXVlW2ldW3F1ZXVlWzBdLmxlbmd0aCAtIDFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBxdWV1ZVtpXVtxdWV1ZVswXS5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdXBwb3J0ZWRBUEkuaW5kZXhPZihtZXRob2QpID09PSAtMSlcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihgTWV0aG9kICR7bWV0aG9kfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgICAgICAgICBBcGlzW21ldGhvZF0oY29uZmlndXJhdGlvbnMsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBvdmVycmlkZSB0ZW1wb3JhcnkgKHVudGlsIHRoZSBhcHAgbG9hZGVkKSBoYW5kbGVyXG4gICAgLy8gZm9yIHdpZGdldCdzIEFQSSBjYWxsc1xuICAgIGdsb2JhbE9iamVjdCA9IEFwaXM7XG4gICAgZ2xvYmFsT2JqZWN0LmNvbmZpZ3VyYXRpb25zID0gY29uZmlndXJhdGlvbnM7XG59XG5hcHAod2luZG93KTtcblxud2luZG93Lmhhc2ggPSBmdW5jdGlvbihwYXJhbXMsIGNhbGxiYWNrKXtcbiAgICBsZXQgcXVldWUgPSBwYXJhbXM7XG4gICAgY29uc29sZS5sb2cocXVldWUpO1xuICAgIGlmIChxdWV1ZSkge1xuICAgICAgICAgICAgY29uZmlndXJhdGlvbnMgPSBsaWJyYXJpZXMuZXh0ZW5kT2JqZWN0KGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVsxXSk7XG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gcXVldWVbMF07XG5cbiAgICAgICAgICAgIC8qbGV0IGNhbGxiYWNrO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBxdWV1ZVsxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gcXVldWVbMV07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBxdWV1ZVtxdWV1ZVswXS5sZW5ndGggLSAxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gcXVldWVbcXVldWVbMF0ubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gZmFsc2U7XG4gICAgICAgICAgICB9Ki9cblxuICAgICAgICAgICAgY29uc29sZS5sb2coc3VwcG9ydGVkQVBJLmluZGV4T2YobWV0aG9kKSk7XG4gICAgICAgICAgICBpZiAoc3VwcG9ydGVkQVBJLmluZGV4T2YobWV0aG9kKSA9PT0gLTEpXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoYE1ldGhvZCAke21ldGhvZH0gaXMgbm90IHN1cHBvcnRlZGApO1xuICAgICAgICAgICAgQXBpc1ttZXRob2RdKGNvbmZpZ3VyYXRpb25zLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsImV4cG9ydCBmdW5jdGlvbiBtZXRob2RzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAgIC8vb2JqZWN0IGNyZWF0aW9uIG1ldGhvZHNcbiAgICAgICAgJ2NyZWF0ZWhlZGVyYW9iamVjdCcsICdjcmVhdGVjb250cmFjdG9iamVjdCcsXG5cbiAgICAgICAgLy9tYWluIGluaXRpYWwgbWV0aG9kIHRvIGNoZWNrIHJlYWR5bmVzcyBmb3IgcGVyZm9ybWluZyB0cmFuc2FjdGlvblxuICAgICAgICAnaW5pdCcsXG5cbiAgICAgICAgLy90cmFuc2FjdGlvbiByZWxhdGVkIG1ldGhvZHNcbiAgICAgICAgJ21ha2VwYXltZW50JywgJ21ha2VUcmFuc2FjdGlvbicsICdjaGVja3RyYW5zYWN0aW9uJywgJ2Fzc2lzdF90cmFuc2FjdGlvbicsXG5cbiAgICAgICAgLy9tb2RhbCByZWxhdGVkIG1ldGhvZHNcbiAgICAgICAgJ2dldG1vZGFsJ1xuICAgIF07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWV0aG9kcy5qcyIsImltcG9ydCAqIGFzIGdlbmVyYWwgZnJvbSAnLi9nZW5lcmFsJztcbmltcG9ydCB7TW9kYWx9IGZyb20gJy4vbW9kYWwnO1xuaW1wb3J0ICogYXMgbGlicmFyaWVzIGZyb20gJy4vbGlicmFyaWVzJztcbmltcG9ydCAqIGFzIENvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgKiBhcyBzZXJ2aWNlcyBmcm9tICcuL3NlcnZpY2VzJztcbmV4cG9ydCBmdW5jdGlvbiB0ZXN0KCl7XG4gICAgcmV0dXJuICd0aW5nJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUhlZGVyYU9iamVjdChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgbGV0IG9iamVjdCA9IFsnc3VibWlzc2lvbm5vZGUnLCAncGF5bWVudHNlcnZlcicsICdyZWNpcGllbnRsaXN0JywgJ2NvbnRlbnRpZCcsICd0eXBlJywgJ21lbW8nLCAnZXh0ZW5zaW9uaWQnLCAncmVkaXJlY3QnLCAndGltZSddO1xuICAgIGxldCBIZWRlcmFvYmplY3QgPSAnPGhlZGVyYS1taWNyb3BheW1lbnQgJztcbiAgICBmb3IgKHZhciBpIGluIG9iamVjdCkge1xuICAgICAgICBsZXQgbm9kZSA9IG9iamVjdFtpXTtcbiAgICAgICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShub2RlKSkge1xuICAgICAgICAgICAgSGVkZXJhb2JqZWN0ICs9IFwiZGF0YS1cIiArIG5vZGUgKyBcIj0gJ1wiICsgcGFyYW1zW25vZGVdICsgXCInICwgXCIgKyBcIlxcblwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIEhlZGVyYW9iamVjdCArPSAnPjwvaGVkZXJhLW1pY3JvcGF5bWVudD4nO1xuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyYW1zWydhdHRySUQnXSk7XG4gICAgYm9keS5pbm5lckhUTUwgKz0gSGVkZXJhb2JqZWN0O1xuICAgIGNhbGxiYWNrKG51bGwsSGVkZXJhb2JqZWN0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbnRyYWN0T2JqZWN0KHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICBsZXQgX19jb25zdHJ1Y3QgPSBbJ2NvbnRyYWN0aWQnLCAnbWF4aW11bScsICdwYXltZW50c2VydmVyJywgJ3BhcmFtcycsICdtZW1vJywgJ2FiaScsICdyZWRpcmVjdCcsICdleHRlbnNpb25pZCddO1xuICAgIGxldCBvYmplY3QgPSB7XG4gICAgICAgIGNvbnRyYWN0aWQ6ICcwLjAuMTExMScsXG4gICAgICAgIG1heGltdW06ICc0MjIzNDIzNDMnLFxuICAgICAgICBwYXltZW50c2VydmVyOiBwYXJhbXMucGF5bWVudHNlcnZlcixcbiAgICAgICAgcGFyYW1zOiBbXCI4NjlcIiwgXCIxMDAwMDAwMDBcIiwgXCIyMTZcIiwgXCIyNTNcIiwgXCIyN1wiLCBcIjB4MjI2YjA4OTc2YWQwZGQ5ODJhZWI2YjIxYTQ0ZjNlYWNhZTU3OTU2OWMzNGU3MTcyNWFmZjgwMWEyZmU2ODczOVwiLCBcIjB4MzMzZjk5MWZhM2E4NzA1NzVmODE5NTY5ZTlmNzJhNzcxZWE3OTAwNzhkNDQ4Y2M4Nzg5MTIwZWUxNGFiZjNjNVwiXSxcbiAgICAgICAgbWVtbzogJ2E0YTdjNDMyOWFhYjRiMWZhYzQ3NGZmNmY5M2Q4NThjJyxcbiAgICAgICAgYWJpOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBcImNvbnN0YW50XCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJpbnB1dHNcIjogW3tcIm5hbWVcIjogXCJwcm9wZXJ0eUlEXCIsIFwidHlwZVwiOiBcInVpbnQyNFwifSwge1wibmFtZVwiOiBcImFtb3VudFwiLCBcInR5cGVcIjogXCJ1aW50MjU2XCJ9LCB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwieFwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInVpbnQxNlwiXG4gICAgICAgICAgICB9LCB7XCJuYW1lXCI6IFwieVwiLCBcInR5cGVcIjogXCJ1aW50MTZcIn0sIHtcIm5hbWVcIjogXCJ2XCIsIFwidHlwZVwiOiBcInVpbnQ4XCJ9LCB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiclwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ5dGVzMzJcIlxuICAgICAgICAgICAgfSwge1wibmFtZVwiOiBcInNcIiwgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwifV0sXG4gICAgICAgICAgICBcIm5hbWVcIjogXCJidXlQcm9wZXJ0eVwiLFxuICAgICAgICAgICAgXCJvdXRwdXRzXCI6IFt7XCJuYW1lXCI6IFwiXCIsIFwidHlwZVwiOiBcInN0cmluZ1wifV0sXG4gICAgICAgICAgICBcInBheWFibGVcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwic3RhdGVNdXRhYmlsaXR5XCI6IFwicGF5YWJsZVwiLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgICAgICB9KSxcbiAgICAgICAgcmVkaXJlY3Q6ICd7XCJub25QYXlpbmdBY2NvdW50XCI6IFwiL2luc3VmZmljaWVudC1hbW91bnQvXCIsXCJub0FjY291bnRcIjogXCIvYWNjb3VudC1ub3QtcGFpcmVkXCIsXCJob21lUGFnZVwiOiBcIi9cIn0nLFxuICAgICAgICBleHRlbnNpb25pZDogJ3BkampwY29sZ21tY2lmaWpwZWprZW5wYmJpbWVkcGljJyxcbiAgICB9O1xuXG4gICAgY29uc29sZS5sb2coSlNPTi5wYXJzZShvYmplY3QuYWJpKSk7XG4gICAgbGV0IGV4dGVuZGVkID0gbGlicmFyaWVzLmV4dGVuZE9iamVjdChvYmplY3QsIHBhcmFtcyk7XG4gICAgY29uc29sZS5sb2coZXh0ZW5kZWQpO1xuICAgIGxldCBDb250cmFjdG9iamVjdCA9ICc8aGVkZXJhLWNvbnRyYWN0ICc7XG4gICAgZm9yICh2YXIgaSBpbiBfX2NvbnN0cnVjdCkge1xuICAgICAgICBsZXQgbm9kZSA9IF9fY29uc3RydWN0W2ldO1xuICAgICAgICBpZiAoZXh0ZW5kZWQuaGFzT3duUHJvcGVydHkobm9kZSkpIHtcbiAgICAgICAgICAgIENvbnRyYWN0b2JqZWN0ICs9IFwiZGF0YS1cIiArIG5vZGUgKyBcIj0gJ1wiICsgZXh0ZW5kZWRbbm9kZV0gKyBcIicgXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQ29udHJhY3RvYmplY3QgKz0gJz48L2hlZGVyYS1jb250cmFjdD4nO1xuICAgIGNvbnNvbGUubG9nKENvbnRyYWN0b2JqZWN0KTtcblxuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZXh0ZW5kZWRbJ2F0dHJJRCddKTtcbiAgICBib2R5LmlubmVySFRNTCArPSBDb250cmFjdG9iamVjdDtcbiAgICBjYWxsYmFjayhudWxsLENvbnRyYWN0b2JqZWN0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrVHJhbnNhY3Rpb24ocGFyYW1zLCBjYWxsYmFjaykge1xuICAgIGxldCBtZW1vX2lkID0gcGFyYW1zLmNvbmZpZ3VyYXRpb24ubWVtbztcbiAgICBsZXQgdXJsID0gQ29uZmlnLmRlZmF1bHQucHJvZHVjdGlvbiA/IENvbmZpZy5kZWZhdWx0LnByb2R1Y3Rpb25TZXJ2ZXIgOiAnaHR0cDovL2xvY2FsaG9zdDo4MDk5JztcbiAgICBsZXQgc3RydWN0dXJlID0ge1xuICAgICAgICBiYXNldXJsOiB1cmwsXG4gICAgICAgIG1lbW9faWQ6IG1lbW9faWQsXG4gICAgICAgIHJlY2VpdmVyX2lkOiAnJyxcbiAgICAgICAgc3VjY2VzczogJy9zdWNjZXNzJyxcbiAgICAgICAgZmFpbHVyZTogJy9wYXltZW50LWZhaWxlZCcsXG4gICAgICAgIHRpbWVvdXQ6IDMwMDAsXG4gICAgICAgIGxpbWl0OiAxXG4gICAgfTtcblxuICAgIGZvciAodmFyIGtleSBpbiBwYXJhbXMucGFyYW1zKSB7XG4gICAgICAgIGlmIChwYXJhbXMucGFyYW1zLmhhc093blByb3BlcnR5KGtleSkgJiYgcGFyYW1zLnBhcmFtc1trZXldKSB7XG4gICAgICAgICAgICBzdHJ1Y3R1cmVba2V5XSA9IHBhcmFtcy5wYXJhbXNba2V5XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdHJ1Y3R1cmUucmVjZWl2ZXJfaWQgJiYgc3RydWN0dXJlLm1lbW9faWQpIHtcbiAgICAgICAgVVJMID0gc3RydWN0dXJlLmJhc2V1cmwgKyBcIi9jaGVjay9cIiArIHN0cnVjdHVyZS5yZWNlaXZlcl9pZCArIFwiL1wiICsgc3RydWN0dXJlLm1lbW9faWRcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc3RydWN0dXJlLnRpbWVzdGFtcClcbiAgICAgICAgICAgIFVSTCA9IHN0cnVjdHVyZS5iYXNldXJsICsgXCIvbWVtby9cIiArIHN0cnVjdHVyZS5tZW1vX2lkICsgJz9saW1pdD0nICsgc3RydWN0dXJlLmxpbWl0ICsgJyZ0aW1lc3RhbXA9JyArIHN0cnVjdHVyZS50aW1lc3RhbXA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIFVSTCA9IHN0cnVjdHVyZS5iYXNldXJsICsgXCIvbWVtby9cIiArIHN0cnVjdHVyZS5tZW1vX2lkICsgJz9saW1pdD0nICsgc3RydWN0dXJlLmxpbWl0O1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKHN0cnVjdHVyZS50aW1lb3V0KTtcbiAgICAvL3NldFRpbWVvdXQocGVyZm9ybVJlcXVlc3Qoc3RydWN0dXJlKSwgc3RydWN0dXJlLnRpbWVvdXQpXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBlcmZvcm1SZXF1ZXN0KHN0cnVjdHVyZSk7XG4gICAgfSwgc3RydWN0dXJlLnRpbWVvdXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgbGV0IHJlc3BvbnNlID0ge1xuICAgICAgICBhY2NvdW50UGFpcmVkOiBmYWxzZSxcbiAgICAgICAgaXNtb2JpbGU6IG51bGwsXG4gICAgICAgIHZhbGlkQnJvd3NlcjogbnVsbCxcbiAgICAgICAgZXh0ZW5zaW9uSW5zdGFsbGVkOiBudWxsLFxuICAgICAgICBhY2Nlc3NUb0FjY291bnRzOiBudWxsLFxuICAgICAgICBhY2NvdW50SWQ6IG51bGwsXG4gICAgICAgIHN1Ym1pc3Npb25Ob2RlOiBwYXJhbXMuc3VibWlzc2lvbm5vZGUsXG4gICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICB0eG5fc3VjY2VzczogZmFsc2UsXG4gICAgICAgIHRpbWU6IHBhcmFtcy50aW1lLFxuICAgICAgICBtZXNzYWdlOiBudWxsXG4gICAgfTtcbiAgICByZXNwb25zZS52YWxpZEJyb3dzZXIgPSBsaWJyYXJpZXMuaXNDaHJvbWUoKTtcbiAgICBpZihyZXNwb25zZS52YWxpZEJyb3dzZXI9PT1mYWxzZSlcbiAgICAgICAgcmVzcG9uc2UubWVzc2FnZSA9IFwiVGhlIGJyb3dzZXIgaXMgbm90IGNocm9tZVwiO1xuICAgIHJlc3BvbnNlLmlzbW9iaWxlID0gbGlicmFyaWVzLmRldGVjdG1vYigpO1xuICAgIGxpYnJhcmllcy5kZXRlY3QocGFyYW1zLmV4dGVuc2lvbmlkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlc3BvbnNlLmV4dGVuc2lvbkluc3RhbGxlZCA9IGZhbHNlO1xuICAgICAgICByZXNwb25zZS5tZXNzYWdlID0gXCJFeHRlbnNpb24gTm90IEluc3RhbGxlZFwiO1xuICAgICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXNwb25zZS5leHRlbnNpb25JbnN0YWxsZWQgPSB0cnVlO1xuICAgICAgICBjcmVhdGVIZWRlcmFPYmplY3QocGFyYW1zLCBmdW5jdGlvbihlcnIsIGhvYmplY3Qpe1xuICAgICAgICAgICAgaWYoaG9iamVjdCl7XG4gICAgICAgICAgICAgICAgbGV0IHVybCA9IENvbmZpZy5kZWZhdWx0LnByb2R1Y3Rpb24gPyBDb25maWcuZGVmYXVsdC5wcm9kdWN0aW9uU2VydmVyIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA5OSc7XG4gICAgICAgICAgICAgICAgVVJMID0gdXJsICsgXCIvbWVtby9cIiArIHBhcmFtcy5tZW1vO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgeGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhamF4cmVzcCA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFqYXhyZXNwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFqYXhyZXNwLnJlc3BvbnNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlcnZpY2VzLnByZWNoZWNrZXIoYWpheHJlc3AucmVzcG9uc2VbMF0ubm9kZXByZWNoZWNrKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5hY2NvdW50SWQgPSBhamF4cmVzcC5yZXNwb25zZVswXS5zZW5kZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5hY2NvdW50UGFpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmFjY2Vzc1RvQWNjb3VudHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KGFqYXhyZXNwLnJlc3BvbnNlWzBdLm5vZGVwcmVjaGVjaykgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS50eG5fc3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5lcnJvciA9IHNlcnZpY2VzLnByZWNoZWNrZXIoYWpheHJlc3AucmVzcG9uc2VbMF0ubm9kZXByZWNoZWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLm1lc3NhZ2UgPSBzZXJ2aWNlcy5wcmVjaGVja2VyKGFqYXhyZXNwLnJlc3BvbnNlWzBdLm5vZGVwcmVjaGVjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5tZXNzYWdlID0gJ1RyYW5zYWN0aW9uIGZhaWxlZCwgdGhpcyBpcyBtb3N0bHkgZHVlIHRvIGV4dGVuc2lvbiBub3QgYmVpbmcgYWJsZSB0byBkZXRlY3QgaGVkZXJhIG9iamVjdCwgcGxlYXNlIHJlZnJlc2ggdGhlIHBhZ2UuJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmFjY291bnRQYWlyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuYWNjZXNzVG9BY2NvdW50cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB4aHR0cC5vcGVuKFwiR0VUXCIsIFVSTCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHhodHRwLnNlbmQoKTtcbiAgICAgICAgICAgICAgICB9LCA1MDAwKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLm1lc3NhZ2UgPSBcIkhlZGVyYSBvYmplY3QgY291bGQgbm90IGJlIGRldGVjdGVkLCBwbGVhc2UgdHJ5IGFnYWluIHJlZnJlc2hpbmcgdGhlIHBhZ2UuXCI7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZmFsc2UsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vY2FsbGJhY2sobnVsbCxyZXNwb25zZSk7XG4gICAgfSk7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldG1vZGFsKGNhbGxiYWNrKSB7XG4gICAgdmFyIG15Q29udGVudCA9IGdlbmVyYWwuZ2V0bW9kYWxDb250ZW50KCk7XG4gICAgdmFyIG15TW9kYWwgPSBuZXcgTW9kYWwoe1xuICAgICAgICBjb250ZW50OiBteUNvbnRlbnRcbiAgICB9KTtcbiAgICBpZihjYWxsYmFjayAmJiB0eXBlb2YgY2FsbGJhY2s9PT0nZnVuY3Rpb24nKXtcbiAgICAgICAgY2FsbGJhY2sobXlDb250ZW50KTtcbiAgICB9XG4gICAgbXlNb2RhbC5vcGVuKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlVHJhbnNhY3Rpb24oY29uZmlndXJhdGlvbiwgY2FsbGJhY2spIHtcbiAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgICB0cmFuc2FjdGlvbl9wcm9jZXNpbmc6IHRydWUsXG4gICAgICAgIHRyYW5zYWN0aW9uX2ZhaWxlZDogZmFsc2UsXG4gICAgICAgIHRyYW5zYWN0aW9uX3N1Y2Nlc3M6IGZhbHNlXG4gICAgfTtcbiAgICBpbml0KGNvbmZpZ3VyYXRpb24sIGZ1bmN0aW9uKGVyciwgcmVzKXtcbiAgICAgICAgaWYoZXJyKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgIGlmKHJlcyl7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3Npc3RfdHJhbnNhY3Rpb24oY29uZmlndXJhdGlvbiwgY2FsbGJhY2spIHtcbiAgICBsZXQgcGFyYW1zID0gY29uZmlndXJhdGlvbjtcbiAgICBsZXQgcmVzcG9uc2UgPSB7XG4gICAgICAgIGFjY291bnRQYWlyZWQ6IGZhbHNlLFxuICAgICAgICBpc21vYmlsZTogbnVsbCxcbiAgICAgICAgdmFsaWRCcm93c2VyOiBudWxsLFxuICAgICAgICBleHRlbnNpb25JbnN0YWxsZWQ6IG51bGwsXG4gICAgICAgIGFjY2Vzc1RvQWNjb3VudHM6IG51bGwsXG4gICAgICAgIGFjY291bnRJZDogbnVsbCxcbiAgICAgICAgc3VibWlzc2lvbk5vZGU6IHBhcmFtcy5zdWJtaXNzaW9ubm9kZSxcbiAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgIHR4bl9zdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgdGltZTogY29uZmlndXJhdGlvbi50aW1lXG4gICAgfTtcbiAgICBjcmVhdGVIZWRlcmFPYmplY3QocGFyYW1zLCBmdW5jdGlvbihlcnIsIGhvYmplY3Qpe1xuICAgICAgICBpZihob2JqZWN0KXtcbiAgICAgICAgICAgIGxldCB1cmwgPSBDb25maWcuZGVmYXVsdC5wcm9kdWN0aW9uID8gQ29uZmlnLmRlZmF1bHQucHJvZHVjdGlvblNlcnZlciA6ICdodHRwOi8vbG9jYWxob3N0OjgwOTknO1xuICAgICAgICAgICAgVVJMID0gdXJsICsgXCIvbWVtby9cIiArIHBhcmFtcy5tZW1vO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgeGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhamF4cmVzcCA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYWpheHJlc3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhamF4cmVzcC5yZXNwb25zZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlcnZpY2VzLnByZWNoZWNrZXIoYWpheHJlc3AucmVzcG9uc2VbMF0ubm9kZXByZWNoZWNrKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmFjY291bnRJZCA9IGFqYXhyZXNwLnJlc3BvbnNlWzBdLnNlbmRlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuYWNjb3VudFBhaXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmFjY2Vzc1RvQWNjb3VudHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoYWpheHJlc3AucmVzcG9uc2VbMF0ubm9kZXByZWNoZWNrKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UudHhuX3N1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmVycm9yID0gc2VydmljZXMucHJlY2hlY2tlcihhamF4cmVzcC5yZXNwb25zZVswXS5ub2RlcHJlY2hlY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5hY2NvdW50UGFpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuYWNjZXNzVG9BY2NvdW50cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgeGh0dHAub3BlbihcIkdFVFwiLCBVUkwsIHRydWUpO1xuICAgICAgICAgICAgICAgIHhodHRwLnNlbmQoKTtcbiAgICAgICAgICAgIH0sIDUwMDApO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNhbGxiYWNrKHsnc3VjY2Vzcyc6ZmFsc2UsJ21lc3NhZ2UnOidDb3VsZCBub3QgY3JlYXRlIGhlZGVyYSBvYmplY3QnfSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBpcy5qcyIsIi8vIERlZmluZSBvdXIgY29uc3RydWN0b3JcbmZ1bmN0aW9uIE1vZGFsKCkge1xuICAgIC8vIENyZWF0ZSBnbG9iYWwgZWxlbWVudCByZWZlcmVuY2VzXG4gICAgdGhpcy5jbG9zZUJ1dHRvbiA9IG51bGw7XG4gICAgdGhpcy5tb2RhbCA9IG51bGw7XG4gICAgdGhpcy5vdmVybGF5ID0gbnVsbDtcblxuICAgIC8vIERldGVybWluZSBwcm9wZXIgcHJlZml4XG4gICAgdGhpcy50cmFuc2l0aW9uRW5kID0gdHJhbnNpdGlvblNlbGVjdCgpO1xuXG4gICAgLy8gRGVmaW5lIG9wdGlvbiBkZWZhdWx0c1xuICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgYXV0b09wZW46IGZhbHNlLFxuICAgICAgICBjbGFzc05hbWU6ICdmYWRlLWFuZC1kcm9wJyxcbiAgICAgICAgY2xvc2VCdXR0b246IHRydWUsXG4gICAgICAgIGNvbnRlbnQ6IFwiXCIsXG4gICAgICAgIG1heFdpZHRoOiA2MDAsXG4gICAgICAgIG1pbldpZHRoOiAyODAsXG4gICAgICAgIG92ZXJsYXk6IGZhbHNlXG4gICAgfTtcblxuICAgIC8vIENyZWF0ZSBvcHRpb25zIGJ5IGV4dGVuZGluZyBkZWZhdWx0cyB3aXRoIHRoZSBwYXNzZWQgaW4gYXJ1Z21lbnRzXG4gICAgaWYgKGFyZ3VtZW50c1swXSAmJiB0eXBlb2YgYXJndW1lbnRzWzBdID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGV4dGVuZERlZmF1bHRzKGRlZmF1bHRzLCBhcmd1bWVudHNbMF0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b09wZW4gPT09IHRydWUpIHRoaXMub3BlbigpO1xuXG59XG5cbi8vIFB1YmxpYyBNZXRob2RzXG5Nb2RhbC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF8gPSB0aGlzO1xuICAgIHRoaXMubW9kYWwuY2xhc3NOYW1lID0gdGhpcy5tb2RhbC5jbGFzc05hbWUucmVwbGFjZShcIiBoYXNoLW9wZW5cIiwgXCJcIik7XG4gICAgdGhpcy5vdmVybGF5LmNsYXNzTmFtZSA9IHRoaXMub3ZlcmxheS5jbGFzc05hbWUucmVwbGFjZShcIiBoYXNoLW9wZW5cIiwgXCJcIik7XG4gICAgdGhpcy5tb2RhbC5hZGRFdmVudExpc3RlbmVyKHRoaXMudHJhbnNpdGlvbkVuZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICBfLm1vZGFsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoXy5tb2RhbCk7XG4gICAgfSk7XG4gICAgdGhpcy5vdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIodGhpcy50cmFuc2l0aW9uRW5kLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChfLm92ZXJsYXkucGFyZW50Tm9kZSkgXy5vdmVybGF5LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoXy5vdmVybGF5KTtcbiAgICB9KTtcbn07XG5cbk1vZGFsLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgIGJ1aWxkT3V0LmNhbGwodGhpcyk7XG4gICAgaW5pdGlhbGl6ZUV2ZW50cy5jYWxsKHRoaXMpO1xuICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMubW9kYWwpLmhlaWdodDtcbiAgICB0aGlzLm1vZGFsLmNsYXNzTmFtZSA9IHRoaXMubW9kYWwuY2xhc3NOYW1lICsgKHRoaXMubW9kYWwub2Zmc2V0SGVpZ2h0ID4gd2luZG93LmlubmVySGVpZ2h0ID8gXCIgaGFzaC1vcGVuIGhhc2gtYW5jaG9yZWRcIiA6IFwiIGhhc2gtb3BlblwiKTtcbiAgICAvL3RoaXMub3ZlcmxheS5jbGFzc05hbWUgPSB0aGlzLm92ZXJsYXkuY2xhc3NOYW1lICsgXCIgaGFzaC1vcGVuXCI7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX2Nsb3NlJykub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfb3V0ZXJfd3JhcCcpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9O1xufTtcblxuLy8gUHJpdmF0ZSBNZXRob2RzXG5mdW5jdGlvbiBidWlsZE91dCgpIHtcblxuICAgIHZhciBjb250ZW50LCBjb250ZW50SG9sZGVyLCBkb2NGcmFnO1xuXG4gICAgLypcbiAgICAgKiBJZiBjb250ZW50IGlzIGFuIEhUTUwgc3RyaW5nLCBhcHBlbmQgdGhlIEhUTUwgc3RyaW5nLlxuICAgICAqIElmIGNvbnRlbnQgaXMgYSBkb21Ob2RlLCBhcHBlbmQgaXRzIGNvbnRlbnQuXG4gICAgICovXG5cbiAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5jb250ZW50ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGNvbnRlbnQgPSB0aGlzLm9wdGlvbnMuY29udGVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb250ZW50ID0gdGhpcy5vcHRpb25zLmNvbnRlbnQuaW5uZXJIVE1MO1xuICAgIH1cblxuICAgIC8vIENyZWF0ZSBhIERvY3VtZW50RnJhZ21lbnQgdG8gYnVpbGQgd2l0aFxuICAgIGRvY0ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICAvLyBDcmVhdGUgbW9kYWwgZWxlbWVudFxuICAgIHRoaXMubW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMubW9kYWwuY2xhc3NOYW1lID0gXCJoYXNoLW1vZGFsIFwiICsgdGhpcy5vcHRpb25zLmNsYXNzTmFtZTtcbiAgICAvKnRoaXMubW9kYWwuc3R5bGUubWluV2lkdGggPSB0aGlzLm9wdGlvbnMubWluV2lkdGggKyBcInB4XCI7XG4gICAgdGhpcy5tb2RhbC5zdHlsZS5tYXhXaWR0aCA9IHRoaXMub3B0aW9ucy5tYXhXaWR0aCArIFwicHhcIjsqL1xuXG4gICAgLy8gSWYgY2xvc2VCdXR0b24gb3B0aW9uIGlzIHRydWUsIGFkZCBhIGNsb3NlIGJ1dHRvblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2VCdXR0b24gPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3B1cC1jbG9zZS1idG4nKTtcbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgY29udGVudCBhcmVhIGFuZCBhcHBlbmQgdG8gbW9kYWxcbiAgICBjb250ZW50SG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb250ZW50SG9sZGVyLmNsYXNzTmFtZSA9IFwiaGFzaC1jb250ZW50XCI7XG4gICAgY29udGVudEhvbGRlci5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgIHRoaXMubW9kYWwuYXBwZW5kQ2hpbGQoY29udGVudEhvbGRlcik7XG5cbiAgICAvLyBBcHBlbmQgbW9kYWwgdG8gRG9jdW1lbnRGcmFnbWVudFxuICAgIGRvY0ZyYWcuYXBwZW5kQ2hpbGQodGhpcy5tb2RhbCk7XG5cbiAgICAvLyBBcHBlbmQgRG9jdW1lbnRGcmFnbWVudCB0byBib2R5XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb2NGcmFnKTtcblxufVxuXG5pbWdjaGFuZ2VGdW5jdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2hib3hzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoXCJpbWdfY2hrYm94XCIpO1xuICAgIHZhciB2YXJfY2hlY2sgPSBcIlwiO1xuXG4gICAgdmFyIGltZ19hbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaW1nX2FsbFwiKTtcblxuICAgIGZvcih2YXIgaT0wO2k8Y2hib3hzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgaWYoY2hib3hzW2ldLmNoZWNrZWQpe1xuICAgICAgICAgICAgdmFyX2NoZWNrID0gdmFyX2NoZWNrLmNvbmNhdChjaGJveHNbaV0udmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYodmFyX2NoZWNrID09ICdpbWdfb25lJyl7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfdHdvJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX3RocmVlJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX2ZvdXInKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfb25lJykuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgaWYodmFyX2NoZWNrID09ICdpbWdfb25laW1nX3R3bycpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ19vbmUnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfdGhyZWUnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfZm91cicpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ190d28nKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBpZih2YXJfY2hlY2sgPT0gJ2ltZ19vbmVpbWdfdHdvaW1nX3RocmVlJyl7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfb25lJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX3R3bycpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ19mb3VyJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX3RocmVlJykuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgaWYodmFyX2NoZWNrID09ICdpbWdfb25laW1nX3R3b2ltZ190aHJlZWltZ19mb3VyJykge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX29uZScpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ190d28nKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfdGhyZWUnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfZm91cicpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gZXh0ZW5kRGVmYXVsdHMoc291cmNlLCBwcm9wZXJ0aWVzKSB7XG4gICAgdmFyIHByb3BlcnR5O1xuICAgIGZvciAocHJvcGVydHkgaW4gcHJvcGVydGllcykge1xuICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgIHNvdXJjZVtwcm9wZXJ0eV0gPSBwcm9wZXJ0aWVzW3Byb3BlcnR5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc291cmNlO1xufVxuXG5mdW5jdGlvbiBpbml0aWFsaXplRXZlbnRzKCkge1xuICAgIGlmICh0aGlzLmNsb3NlQnV0dG9uKSB7XG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm92ZXJsYXkpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gdHJhbnNpdGlvblNlbGVjdCgpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGlmIChlbC5zdHlsZS5XZWJraXRUcmFuc2l0aW9uKSByZXR1cm4gXCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCI7XG4gICAgaWYgKGVsLnN0eWxlLk9UcmFuc2l0aW9uKSByZXR1cm4gXCJvVHJhbnNpdGlvbkVuZFwiO1xuICAgIHJldHVybiAndHJhbnNpdGlvbmVuZCc7XG59XG4vL2V4cG9ydGluZyBtb2R1bGVcbm1vZHVsZS5leHBvcnRzLk1vZGFsID0gTW9kYWw7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kYWwuanMiXSwic291cmNlUm9vdCI6IiJ9