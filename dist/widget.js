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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTkzZDZmZjY3NjgzZGRiZjVhMzgiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9nZW5lcmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYnJhcmllcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWV0aG9kcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kYWwuanMiXSwibmFtZXMiOlsicGluZyIsInByZWNoZWNrZXIiLCJuIiwianNvbiIsInByb2R1Y3Rpb24iLCJDb25maWciLCJ0b2RheSIsIkRhdGUiLCJkYXRlIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImdldERhdGUiLCJ0aW1lIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZGF0ZVRpbWUiLCJ0aW1lc3RhbXAiLCJnZXRUaW1lIiwiZ2V0bW9kYWxDb250ZW50IiwiY29uc3RydWN0Q29uZmlndXJhdGlvbiIsInBheW1lbnRzZXJ2ZXIiLCJwcm9kdWN0aW9uU2VydmVyIiwiZXh0ZW5zaW9uaWQiLCJlcnJvciIsInR5cGUiLCJub3ciLCJyZWRpcmVjdCIsInN1Ym1pc3Npb25ub2RlIiwibWVtbyIsInJlY2lwaWVudGxpc3QiLCJjb250ZW50aWQiLCJhdHRySUQiLCJpZCIsIndpbmRvdyIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJjb25maWciLCJkZXRlY3Rtb2IiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJtYXRjaCIsImRldGVjdCIsImV4dGVuc2lvbklkIiwibm90SW5zdGFsbGVkQ2FsbGJhY2siLCJpbnN0YWxsZWRDYWxsYmFjayIsImltZyIsIkltYWdlIiwiY29uc29sZSIsImxvZyIsIm9uZXJyb3IiLCJvbmxvYWQiLCJzcmMiLCJleHRlbmRPYmplY3QiLCJhIiwiYiIsImtleSIsImhhc093blByb3BlcnR5IiwiaXNDaHJvbWUiLCJzdXBwb3J0ZWRBUEkiLCJtZXRob2RzIiwiY29uZmlndXJhdGlvbnMiLCJnZW5lcmFsIiwiYXBwIiwiZ2xvYmFsT2JqZWN0IiwicXVldWUiLCJxIiwiaSIsImxlbmd0aCIsImxpYnJhcmllcyIsIm1ldGhvZCIsImNhbGxiYWNrIiwiaW5kZXhPZiIsIkVycm9yIiwiQXBpcyIsImhhc2giLCJwYXJhbXMiLCJ0ZXN0IiwiY3JlYXRlSGVkZXJhT2JqZWN0Iiwib2JqZWN0IiwiSGVkZXJhb2JqZWN0Iiwibm9kZSIsImJvZHkiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwiY3JlYXRlQ29udHJhY3RPYmplY3QiLCJfX2NvbnN0cnVjdCIsImNvbnRyYWN0aWQiLCJtYXhpbXVtIiwiYWJpIiwiSlNPTiIsInN0cmluZ2lmeSIsInBhcnNlIiwiZXh0ZW5kZWQiLCJDb250cmFjdG9iamVjdCIsImNoZWNrVHJhbnNhY3Rpb24iLCJtZW1vX2lkIiwiY29uZmlndXJhdGlvbiIsInVybCIsInN0cnVjdHVyZSIsImJhc2V1cmwiLCJyZWNlaXZlcl9pZCIsInN1Y2Nlc3MiLCJmYWlsdXJlIiwidGltZW91dCIsImxpbWl0IiwiVVJMIiwic2V0VGltZW91dCIsInBlcmZvcm1SZXF1ZXN0IiwiaW5pdCIsInJlc3BvbnNlIiwiYWNjb3VudFBhaXJlZCIsImlzbW9iaWxlIiwidmFsaWRCcm93c2VyIiwiZXh0ZW5zaW9uSW5zdGFsbGVkIiwiYWNjZXNzVG9BY2NvdW50cyIsImFjY291bnRJZCIsInN1Ym1pc3Npb25Ob2RlIiwidHhuX3N1Y2Nlc3MiLCJtZXNzYWdlIiwiZXJyIiwiaG9iamVjdCIsInhodHRwIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwiYWpheHJlc3AiLCJzZXJ2aWNlcyIsIm5vZGVwcmVjaGVjayIsInNlbmRlciIsInBhcnNlSW50Iiwib3BlbiIsInNlbmQiLCJnZXRtb2RhbCIsIm15Q29udGVudCIsIm15TW9kYWwiLCJNb2RhbCIsImNvbnRlbnQiLCJtYWtlVHJhbnNhY3Rpb24iLCJ0cmFuc2FjdGlvbl9wcm9jZXNpbmciLCJ0cmFuc2FjdGlvbl9mYWlsZWQiLCJ0cmFuc2FjdGlvbl9zdWNjZXNzIiwicmVzIiwiYXNzaXN0X3RyYW5zYWN0aW9uIiwiY2xvc2VCdXR0b24iLCJtb2RhbCIsIm92ZXJsYXkiLCJ0cmFuc2l0aW9uRW5kIiwidHJhbnNpdGlvblNlbGVjdCIsImRlZmF1bHRzIiwiYXV0b09wZW4iLCJjbGFzc05hbWUiLCJtYXhXaWR0aCIsIm1pbldpZHRoIiwiYXJndW1lbnRzIiwib3B0aW9ucyIsImV4dGVuZERlZmF1bHRzIiwicHJvdG90eXBlIiwiY2xvc2UiLCJfIiwicmVwbGFjZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJidWlsZE91dCIsImNhbGwiLCJpbml0aWFsaXplRXZlbnRzIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImhlaWdodCIsIm9mZnNldEhlaWdodCIsImlubmVySGVpZ2h0IiwicXVlcnlTZWxlY3RvciIsIm9uY2xpY2siLCJzdHlsZSIsImRpc3BsYXkiLCJjb250ZW50SG9sZGVyIiwiZG9jRnJhZyIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJpbWdjaGFuZ2VGdW5jdGlvbiIsImNoYm94cyIsImdldEVsZW1lbnRzQnlOYW1lIiwidmFyX2NoZWNrIiwiaW1nX2FsbCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjaGVja2VkIiwiY29uY2F0IiwidmFsdWUiLCJzb3VyY2UiLCJwcm9wZXJ0aWVzIiwicHJvcGVydHkiLCJiaW5kIiwiZWwiLCJXZWJraXRUcmFuc2l0aW9uIiwiT1RyYW5zaXRpb24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FB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QWtDLE9BQWxDLEVBQTJDLEtBQUtILEtBQUwsQ0FBV2tDLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBM0M7QUFDSDs7QUFFRCxNQUFJLEtBQUs5QyxPQUFULEVBQWtCO0FBQ2QsU0FBS0EsT0FBTCxDQUFhZSxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxLQUFLSCxLQUFMLENBQVdrQyxJQUFYLENBQWdCLElBQWhCLENBQXZDO0FBQ0g7QUFFSjs7QUFFRCxTQUFTNUMsZ0JBQVQsR0FBNEI7QUFDeEIsTUFBSTZDLEVBQUUsR0FBR2hILFFBQVEsQ0FBQ2lHLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBVDtBQUNBLE1BQUllLEVBQUUsQ0FBQ3BCLEtBQUgsQ0FBU3FCLGdCQUFiLEVBQStCLE9BQU8scUJBQVA7QUFDL0IsTUFBSUQsRUFBRSxDQUFDcEIsS0FBSCxDQUFTc0IsV0FBYixFQUEwQixPQUFPLGdCQUFQO0FBQzFCLFNBQU8sZUFBUDtBQUNILEMsQ0FDRDs7O0FBQ0FDLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlN0QsS0FBZixHQUF1QkEsS0FBdkIsQyIsImZpbGUiOiJ3aWRnZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA5OTNkNmZmNjc2ODNkZGJmNWEzOCIsImV4cG9ydCBmdW5jdGlvbiBwaW5nKCkge1xuICAgIHJldHVybiAncG9uZyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmVjaGVja2VyKG4pIHtcbiAgICBsZXQganNvbiA9IHswOiBcIk9LXCIsIDE6IFwiSU5WQUxJRF9UUkFOU0FDVElPTlwiLCAyOiBcIlBBWUVSX0FDQ09VTlRfTk9UX0ZPVU5EXCIsIDM6IFwiSU5WQUxJRF9OT0RFX0FDQ09VTlRcIiwgNDogXCJUUkFOU0FDVElPTl9FWFBJUkVEXCIsIDU6IFwiSU5WQUxJRF9UUkFOU0FDVElPTl9TVEFSVFwiLCA2OiBcIklOVkFMSURfVFJBTlNBQ1RJT05fRFVSQVRJT05cIiwgNzogXCJJTlZBTElEX1NJR05BVFVSRVwiLCA4OiBcIk1FTU9fVE9PX0xPTkdcIiwgOTogXCJJTlNVRkZJQ0lFTlRfVFhfRkVFXCIsIDEwOiBcIklOU1VGRklDSUVOVF9QQVlFUl9CQUxBTkNFXCIsIDExOiBcIkRVUExJQ0FURV9UUkFOU0FDVElPTlwiLCAxMjogXCJCVVNZXCIsIDEzOiBcIk5PVF9TVVBQT1JURURcIiwgMTQ6IFwiSU5WQUxJRF9GSUxFX0lEXCIsIDE1OiBcIklOVkFMSURfQUNDT1VOVF9JRFwiLCAxNjogXCJJTlZBTElEX0NPTlRSQUNUX0lEXCIsIDE3OiBcIklOVkFMSURfVFJBTlNBQ1RJT05fSURcIiwgMTg6IFwiUkVDRUlQVF9OT1RfRk9VTkRcIiwgMTk6IFwiUkVDT1JEX05PVF9GT1VORFwiLCAyMDogXCJJTlZBTElEX1NPTElESVRZX0lEXCIsIDIxOiBcIlVOS05PV05cIiwgMjI6IFwiU1VDQ0VTU1wiLCAyMzogXCJGQUlMX0lOVkFMSURcIiwgMjQ6IFwiRkFJTF9GRUVcIiwgMjU6IFwiRkFJTF9CQUxBTkNFXCIsIDI2OiBcIktFWV9SRVFVSVJFRFwiLCAyNzogXCJCQURfRU5DT0RJTkdcIiwgMjg6IFwiSU5TVUZGSUNJRU5UX0FDQ09VTlRfQkFMQU5DRVwiLCAyOTogXCJJTlZBTElEX1NPTElESVRZX0FERFJFU1NcIiwgMzA6IFwiSU5TVUZGSUNJRU5UX0dBU1wiLCAzMTogXCJDT05UUkFDVF9TSVpFX0xJTUlUX0VYQ0VFREVEXCIsIDMyOiBcIkxPQ0FMX0NBTExfTU9ESUZJQ0FUSU9OX0VYQ0VQVElPTlwiLCAzMzogXCJDT05UUkFDVF9SRVZFUlRfRVhFQ1VURURcIiwgMzQ6IFwiQ09OVFJBQ1RfRVhFQ1VUSU9OX0VYQ0VQVElPTlwiLCAzNTogXCJJTlZBTElEX1JFQ0VJVklOR19OT0RFX0FDQ09VTlRcIiwgMzY6IFwiTUlTU0lOR19RVUVSWV9IRUFERVJcIiwgMzc6IFwiQUNDT1VOVF9VUERBVEVfRkFJTEVEXCIsIDM4OiBcIklOVkFMSURfS0VZX0VOQ09ESU5HXCIsIDM5OiBcIk5VTExfU09MSURJVFlfQUREUkVTU1wiLCA0MDogXCJDT05UUkFDVF9VUERBVEVfRkFJTEVEXCIsIDQxOiBcIklOVkFMSURfUVVFUllfSEVBREVSXCIsIDQyOiBcIklOVkFMSURfRkVFX1NVQk1JVFRFRFwiLCA0MzogXCJJTlZBTElEX1BBWUVSX1NJR05BVFVSRVwiLCA0NDogXCJLRVlfTk9UX1BST1ZJREVEXCIsIDQ1OiBcIklOVkFMSURfRVhQSVJBVElPTl9USU1FXCIsIDQ2OiBcIk5PX1dBQ0xfS0VZXCIsIDQ3OiBcIkZJTEVfQ09OVEVOVF9FTVBUWVwiLCA0ODogXCJJTlZBTElEX0FDQ09VTlRfQU1PVU5UU1wiLCA0OTogXCJFTVBUWV9UUkFOU0FDVElPTl9CT0RZXCIsIDUwOiBcIklOVkFMSURfVFJBTlNBQ1RJT05fQk9EWVwiLCA1MTogXCJJTlZBTElEX1NJR05BVFVSRV9UWVBFX01JU01BVENISU5HX0tFWVwiLCA1MjogXCJJTlZBTElEX1NJR05BVFVSRV9DT1VOVF9NSVNNQVRDSElOR19LRVlcIiwgNTM6IFwiRU1QVFlfQ0xBSU1fQk9EWVwiLCA1NDogXCJFTVBUWV9DTEFJTV9IQVNIXCIsIDU1OiBcIkVNUFRZX0NMQUlNX0tFWVNcIiwgNTY6IFwiSU5WQUxJRF9DTEFJTV9IQVNIX1NJWkVcIiwgNTc6IFwiRU1QVFlfUVVFUllfQk9EWVwiLCA1ODogXCJFTVBUWV9DTEFJTV9RVUVSWVwiLCA1OTogXCJDTEFJTV9OT1RfRk9VTkRcIiwgNjA6IFwiQUNDT1VOVF9JRF9ET0VTX05PVF9FWElTVFwiLCA2MTogXCJDTEFJTV9BTFJFQURZX0VYSVNUU1wiLCA2MjogXCJJTlZBTElEX0ZJTEVfV0FDTFwiLCA2MzogXCJTRVJJQUxJWkFUSU9OX0ZBSUxFRFwiLCA2NDogXCJUUkFOU0FDVElPTl9PVkVSU0laRVwiLCA2NTogXCJUUkFOU0FDVElPTl9UT09fTUFOWV9MQVlFUlNcIiwgNjY6IFwiQ09OVFJBQ1RfREVMRVRFRFwiLCA2NzogXCJQTEFURk9STV9OT1RfQUNUSVZFXCIsIDY4OiBcIktFWV9QUkVGSVhfTUlTTUFUQ0hcIiwgNjk6IFwiUExBVEZPUk1fVFJBTlNBQ1RJT05fTk9UX0NSRUFURURcIiwgNzA6IFwiSU5WQUxJRF9SRU5FV0FMX1BFUklPRFwiLCA3MTogXCJJTlZBTElEX1BBWUVSX0FDQ09VTlRfSURcIiwgNzI6IFwiQUNDT1VOVF9ERUxFVEVEXCIsIDczOiBcIkZJTEVfREVMRVRFRFwiLCA3NDogXCJBQ0NPVU5UX1JFUEVBVEVEX0lOX0FDQ09VTlRfQU1PVU5UU1wiLCA3NTogXCJTRVRUSU5HX05FR0FUSVZFX0FDQ09VTlRfQkFMQU5DRVwiLCA3NjogXCJPQlRBSU5FUl9SRVFVSVJFRFwiLCA3NzogXCJPQlRBSU5FUl9TQU1FX0NPTlRSQUNUX0lEXCIsIDc4OiBcIk9CVEFJTkVSX0RPRVNfTk9UX0VYSVNUXCIsIDc5OiBcIk1PRElGWUlOR19JTU1VVEFCTEVfQ09OVFJBQ1RcIiwgODA6IFwiRklMRV9TWVNURU1fRVhDRVBUSU9OXCIsIDgxOiBcIkFVVE9SRU5FV19EVVJBVElPTl9OT1RfSU5fUkFOR0VcIiwgODI6IFwiRVJST1JfREVDT0RJTkdfQllURVNUUklOR1wiLCA4MzogXCJDT05UUkFDVF9GSUxFX0VNUFRZXCIsIDg0OiBcIkNPTlRSQUNUX0JZVEVDT0RFX0VNUFRZXCIsIDg1OiBcIklOVkFMSURfSU5JVElBTF9CQUxBTkNFXCIsIDg2OiBcIklOVkFMSURfUkVDRUlWRV9SRUNPUkRfVEhSRVNIT0xEXCIsIDg3OiBcIklOVkFMSURfU0VORF9SRUNPUkRfVEhSRVNIT0xEXCIsIDg4OiBcIkFDQ09VTlRfSVNfTk9UX0dFTkVTSVNfQUNDT1VOVFwifVxuICAgICByZXR1cm4ganNvbltuXTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy5qcyIsImltcG9ydCAqIGFzIENvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5cbmxldCBwcm9kdWN0aW9uID0gQ29uZmlnLmRlZmF1bHQucHJvZHVjdGlvbjtcblxubGV0IHRvZGF5ID0gbmV3IERhdGUoKSxcbiAgICBkYXRlID0gdG9kYXkuZ2V0RnVsbFllYXIoKSArICctJyArICh0b2RheS5nZXRNb250aCgpICsgMSkgKyAnLScgKyB0b2RheS5nZXREYXRlKCksXG4gICAgdGltZSA9IHRvZGF5LmdldEhvdXJzKCkgKyBcIjpcIiArIHRvZGF5LmdldE1pbnV0ZXMoKSxcbiAgICBkYXRlVGltZSA9IGRhdGUgKyAnICcgKyB0aW1lLFxuICAgIHRpbWVzdGFtcCA9IG5ldyBEYXRlKGRhdGVUaW1lKS5nZXRUaW1lKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRtb2RhbENvbnRlbnQoKSB7XG4gICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwicG9wdXBfb3V0ZXJfd3JhcFwiPlxcbicgK1xuICAgICdcXHQgIFxcdDxkaXYgY2xhc3M9XCJwb3B1cF93cmFwXCI+XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0PGRpdiBjbGFzcz1cInBvcHVwX2hlYWRlclwiPlNldHVwIFRhc2sgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwicG9wdXBfY2xvc2VcIiBpZD1cInBvcHVwLWNsb3NlLWJ0blwiPng8L2E+PC9kaXY+XFxuJyArXG4gICAgJ1xcbicgK1xuICAgICdcXHQgIFxcdFxcdDxkaXYgY2xhc3M9XCJwb3B1cF9pbm5lclwiPlxcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJwb3B1cF9pbm5lcl9sZWZ0XCI+XFxuJyArXG4gICAgJ1xcbicgK1xuICAgICdcXHQgIFxcdFxcdFxcdFxcdDxmb3JtIGFjdGlvbj1cIi9hY3Rpb25fcGFnZS5waHBcIiBjbGFzcz1cInBvcHVwX2Zvcm1cIj5cXG4nICtcbiAgICAnXFx0XFx0XFx0XFx0XFx0ICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgb25jaGFuZ2U9IFwiaW1nY2hhbmdlRnVuY3Rpb24oKVwiIGlkPVwiaW1nX29uZVwiIGNsYXNzPVwicG9wdXBfY2hrYm94IHRvZ2dsZV9faW5wdXRcIiBuYW1lPVwiaW1nX2Noa2JveFwiIHZhbHVlPVwiaW1nX29uZVwiPlxcbicgK1xuICAgICdcXHRcXHRcXHRcXHRcXHQgIDxsYWJlbCBmb3I9XCJpbWdfb25lXCI+Jm5ic3A7IEluc3RhbGwgSGVkZXJhIFdhbGxldDwvbGFiZWw+XFxuJyArXG4gICAgJ1xcdFxcdFxcdFxcdFxcdCAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG9uY2hhbmdlPSBcImltZ2NoYW5nZUZ1bmN0aW9uKClcIiBpZD1cImltZ190d29cIiBjbGFzcz1cInBvcHVwX2Noa2JveCB0b2dnbGVfX2lucHV0XCIgbmFtZT1cImltZ19jaGtib3hcIiB2YWx1ZT1cImltZ190d29cIj5cXG4nICtcbiAgICAnXFx0XFx0XFx0XFx0XFx0ICA8bGFiZWwgZm9yPVwiaW1nX3R3b1wiPiZuYnNwOyBcIlBhaXIgeW91ciBBY2NvdW50XCI8L2xhYmVsPlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnXFx0XFx0XFx0XFx0XFx0ICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgb25jaGFuZ2U9IFwiaW1nY2hhbmdlRnVuY3Rpb24oKVwiIGlkPVwiaW1nX3RocmVlXCIgY2xhc3M9XCJwb3B1cF9jaGtib3ggdG9nZ2xlX19pbnB1dFwiIG5hbWU9XCJpbWdfY2hrYm94XCIgdmFsdWU9XCJpbWdfdGhyZWVcIj5cXG4nICtcbiAgICAnXFx0XFx0XFx0XFx0XFx0ICA8bGFiZWwgZm9yPVwiaW1nX3RocmVlXCI+Jm5ic3A7IFwiQWxsb3cgUGF5bWVudCBSZXF1ZXN0c1wiPC9sYWJlbD5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJ1xcdFxcdFxcdFxcdFxcdCAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG9uY2hhbmdlPSBcImltZ2NoYW5nZUZ1bmN0aW9uKClcIiBpZD1cImltZ19mb3VyXCIgY2xhc3M9XCJwb3B1cF9jaGtib3ggdG9nZ2xlX19pbnB1dFwiIG5hbWU9XCJpbWdfY2hrYm94XCIgdmFsdWU9XCJpbWdfZm91clwiPlxcbicgK1xuICAgICdcXHRcXHRcXHRcXHRcXHQgIDxsYWJlbCBmb3I9XCJpbWdfZm91clwiPiZuYnNwOyBcIkdldCBzb21lIEhCQVJcIjwvbGFiZWw+XFxuJyArXG4gICAgJ1xcdFxcdFxcdFxcdFxcdDwvZm9ybT5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJ1xcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJwb3B1cF9sb2dvXCI+XFxuJyArXG4gICAgJ1xcdFxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJsb2dvX3R4dFwiPlBvd2VyZWQgYnk8L2Rpdj5cXG4nICtcbiAgICAnXFx0XFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cImxvZ29faWNvblwiPjxpbWcgc3JjPVwiLy9hcGkuaGFzaGluZ3N5c3RlbXMuY29tL2ltZy9wb3B1cF9sb2dvLnBuZ1wiPjwvZGl2PlxcbicgK1xuICAgICdcXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHRcXHRcXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHQ8L2Rpdj5cXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwicG9wdXBfaW5uZXJfcmlnaHRcIj5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cInBvcHVwX2ltZ19zZWNcIj5cXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHRcXHRcXHQ8aW1nIGNsYXNzPVwiaW1nX29uZVwiIHNyYz1cIi8vYXBpLmhhc2hpbmdzeXN0ZW1zLmNvbS9pbWcvaW1nX29uZS5wbmdcIj5cXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHRcXHRcXHQ8aW1nIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIiBjbGFzcz1cImltZ190d29cIiBzcmM9XCIvL2FwaS5oYXNoaW5nc3lzdGVtcy5jb20vaW1nL2ltZ190d28ucG5nXCI+XFxuJyArXG4gICAgJ1xcdCAgXFx0XFx0XFx0XFx0XFx0PGltZyBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCIgY2xhc3M9XCJpbWdfdGhyZWVcIiBzcmM9XCIvL2FwaS5oYXNoaW5nc3lzdGVtcy5jb20vaW1nL2ltZ190aHJlZS5wbmdcIj5cXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHRcXHRcXHQ8aW1nIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIiBjbGFzcz1cImltZ19mb3VyXCIgc3JjPVwiLy9hcGkuaGFzaGluZ3N5c3RlbXMuY29tL2ltZy9pbWdfZm91ci5wbmdcIj5cXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHRcXHQ8L2Rpdj5cXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwidHh0X3dyYXBcIj5cXG4nICtcbiAgICAnXFx0XFx0ICBcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwidHh0X2hlYWRlclwiPkxldHMgZ2V0IHlvdSBzdGFydGVkITwvZGl2PlxcbicgK1xuICAgICdcXHRcXHQgIFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJ0eHRfY29udGVudFwiPkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LCBzZWQgZG8gZWl1c21vZCB0ZW1wb3IgaW5jaWRpZHVudCB1dCBsYWJvcmUgZXQgPC9kaXY+XFxuJyArXG4gICAgJ1xcdFxcdCAgXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cInBvcHVwX2J0blwiPlxcbicgK1xuICAgICdcXHRcXHQgIFxcdFxcdFxcdFxcdFxcdDxhIGhyZWY9XCJcIj5JXFwnbSBSZWFkeTwvYT5cXG4nICtcbiAgICAnXFx0XFx0ICBcXHRcXHRcXHRcXHQ8L2Rpdj5cXG4nICtcbiAgICAnXFx0XFx0ICBcXHRcXHRcXHQ8L2Rpdj5cXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHRcXHRcXG4nICtcbiAgICAnXFx0ICBcXHRcXHRcXHQ8L2Rpdj5cXG4nICtcbiAgICAnXFx0ICBcXHRcXHQ8L2Rpdj5cXG4nICtcbiAgICAnXFx0ICBcXHQ8L2Rpdj4nO1xufVxuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnN0cnVjdENvbmZpZ3VyYXRpb24oKXtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYXltZW50c2VydmVyOiBwcm9kdWN0aW9uID8gQ29uZmlnLmRlZmF1bHQucHJvZHVjdGlvblNlcnZlciA6ICdodHRwOi8vbG9jYWxob3N0OjgwOTknLFxuICAgICAgICBleHRlbnNpb25pZDogXCJkYWZrZG1qaWZwaG5mamNhamNia2hkamxrb2hhbnBoaFwiLFxuICAgICAgICBlcnJvcjogXCIvbm8tZXh0ZW5zaW9uXCIsXG4gICAgICAgIHR5cGU6IFwiYXJ0aWNsZVwiLFxuICAgICAgICB0aW1lOiBEYXRlLm5vdygpLFxuICAgICAgICByZWRpcmVjdDogJ3sgXCJub25QYXlpbmdBY2NvdW50XCI6IFwiL2luc3VmZmljaWVudC1hbW91bnQvXCIsIFwibm9BY2NvdW50XCI6IFwiL2FjY291bnQtbm90LXBhaXJlZC9cIiwgXCJob21lUGFnZVwiOiBcIi9cIiwgXCJzdWNjZXNzOi9zdWNjZXNzXCJ9JyxcbiAgICAgICAgc3VibWlzc2lvbm5vZGU6IFwiMC4wLjNcIixcbiAgICAgICAgbWVtbzogRGF0ZS5ub3coKSxcbiAgICAgICAgcmVjaXBpZW50bGlzdDogJ1t7IFwidG9cIjogXCIwLjAuOTlcIiwgXCJ0aW55YmFyc1wiOiBcIjIwMDAwMFwiIH1dJyxcbiAgICAgICAgY29udGVudGlkOiAnNzknLFxuICAgICAgICBhdHRySUQ6ICdhcnRpY2xlLTEnLFxuICAgICAgICB0aW1lc3RhbXA6IHRpbWVzdGFtcCxcbiAgICAgICAgLyp0aGlzIG1pZ2h0IG1ha2UgYSBnb29kIGRlZmF1bHQgaWQgZm9yIHRoZSBjb250ZW50Ki9cbiAgICAgICAgaWQ6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSxcbiAgICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dlbmVyYWwuanMiLCJjb25zdCBjb25maWcgPSB7XG4gICAgcHJvZHVjdGlvbjogdHJ1ZSxcbiAgICBwcm9kdWN0aW9uU2VydmVyOiAnaHR0cHM6Ly9tcHMuaGFzaGluZ3N5c3RlbXMuY29tJ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29uZmlnLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIGRldGVjdG1vYigpIHtcbiAgICByZXR1cm4gKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0FuZHJvaWQvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvd2ViT1MvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBob25lL2kpXG4gICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQYWQvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBvZC9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9CbGFja0JlcnJ5L2kpXG4gICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1dpbmRvd3MgUGhvbmUvaSlcbiAgICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGV0ZWN0KGV4dGVuc2lvbklkLCBub3RJbnN0YWxsZWRDYWxsYmFjaywgaW5zdGFsbGVkQ2FsbGJhY2spIHtcbiAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgY29uc29sZS5sb2coZXh0ZW5zaW9uSWQpO1xuICAgIGltZy5vbmVycm9yID0gbm90SW5zdGFsbGVkQ2FsbGJhY2s7XG4gICAgaW1nLm9ubG9hZCA9IGluc3RhbGxlZENhbGxiYWNrO1xuICAgIGltZy5zcmMgPSAnY2hyb21lLWV4dGVuc2lvbjovLycgKyBleHRlbnNpb25JZCArICcvaWNvbnMvaWNvbjE2LnBuZyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRlbmRPYmplY3QoYSwgYikge1xuICAgIGZvciAodmFyIGtleSBpbiBiKVxuICAgICAgICBpZiAoYi5oYXNPd25Qcm9wZXJ0eShrZXkpKSBhW2tleV0gPSBiW2tleV07XG4gICAgcmV0dXJuIGE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Nocm9tZSgpIHtcbiAgICByZXR1cm4gJ2Nocm9tZScgaW4gd2luZG93XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGlicmFyaWVzLmpzIiwiaW1wb3J0IHtwaW5nLCBwcmVjaGVja2VyfSBmcm9tICcuL3NlcnZpY2VzJztcbmltcG9ydCAqIGFzIG1ldGhvZHMgZnJvbSAnLi9tZXRob2RzJztcbmltcG9ydCAqIGFzIGdlbmVyYWwgZnJvbSAnLi9nZW5lcmFsJztcbmltcG9ydCAqIGFzIEFwaXMgZnJvbSAnLi9hcGlzJztcbmltcG9ydCAqIGFzIGxpYnJhcmllcyBmcm9tICcuL2xpYnJhcmllcyc7XG5cbi8vIGVubGlzdCBhbGwgbWV0aG9kcyBzdXBwb3J0ZWQgYnkgQVBJIChlLmcuIGBtdygnZXZlbnQnLCAndXNlci1sb2dpbicpO2ApXG5jb25zdCBzdXBwb3J0ZWRBUEkgPSBtZXRob2RzLm1ldGhvZHMoKTtcbi8qKlxuICogVGhlIG1haW4gZW50cnkgb2YgdGhlIGFwcGxpY2F0aW9uXG4gKi9cblxubGV0IGNvbmZpZ3VyYXRpb25zID0gZ2VuZXJhbC5jb25zdHJ1Y3RDb25maWd1cmF0aW9uKCk7XG5cbmZ1bmN0aW9uIGFwcCh3aW5kb3cpIHtcbiAgICAvKiAqXG4gICAgICAqIGFsbCBtZXRob2RzIHRoYXQgd2VyZSBjYWxsZWQgdGlsbCBub3cgYW5kIHN0b3JlZCBpbiBxdWV1ZVxuICAgICAgKiBuZWVkcyB0byBiZSBjYWxsZWQgbm93XG4gICAgICAqICovXG4gICAgbGV0IGdsb2JhbE9iamVjdCA9IHdpbmRvd1t3aW5kb3dbJ0hBU0gtSlMnXV07XG4gICAgbGV0IHF1ZXVlID0gZ2xvYmFsT2JqZWN0LnE7XG4gICAgY29uc29sZS5sb2cocXVldWUpO1xuICAgIGlmIChxdWV1ZSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25zID0gbGlicmFyaWVzLmV4dGVuZE9iamVjdChjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMV0pO1xuICAgICAgICAgICAgbGV0IG1ldGhvZCA9IHF1ZXVlW2ldWzBdO1xuICAgICAgICAgICAgbGV0IGNhbGxiYWNrO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBxdWV1ZVtpXVsxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gcXVldWVbaV1bMV07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBxdWV1ZVtpXVtxdWV1ZVswXS5sZW5ndGggLSAxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gcXVldWVbaV1bcXVldWVbMF0ubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3VwcG9ydGVkQVBJLmluZGV4T2YobWV0aG9kKSA9PT0gLTEpXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoYE1ldGhvZCAke21ldGhvZH0gaXMgbm90IHN1cHBvcnRlZGApO1xuICAgICAgICAgICAgQXBpc1ttZXRob2RdKGNvbmZpZ3VyYXRpb25zLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gb3ZlcnJpZGUgdGVtcG9yYXJ5ICh1bnRpbCB0aGUgYXBwIGxvYWRlZCkgaGFuZGxlclxuICAgIC8vIGZvciB3aWRnZXQncyBBUEkgY2FsbHNcbiAgICBnbG9iYWxPYmplY3QgPSBBcGlzO1xuICAgIGdsb2JhbE9iamVjdC5jb25maWd1cmF0aW9ucyA9IGNvbmZpZ3VyYXRpb25zO1xufVxuLy9hcHAod2luZG93KTtcblxud2luZG93Lmhhc2ggPSBmdW5jdGlvbihwYXJhbXMsIGNhbGxiYWNrKXtcbiAgICBsZXQgcXVldWUgPSBwYXJhbXM7XG4gICAgY29uc29sZS5sb2cocXVldWUpO1xuICAgIGlmIChxdWV1ZSkge1xuICAgICAgICAgICAgY29uZmlndXJhdGlvbnMgPSBsaWJyYXJpZXMuZXh0ZW5kT2JqZWN0KGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVsxXSk7XG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gcXVldWVbMF07XG5cbiAgICAgICAgICAgIC8qbGV0IGNhbGxiYWNrO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBxdWV1ZVsxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gcXVldWVbMV07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBxdWV1ZVtxdWV1ZVswXS5sZW5ndGggLSAxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gcXVldWVbcXVldWVbMF0ubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gZmFsc2U7XG4gICAgICAgICAgICB9Ki9cblxuICAgICAgICAgICAgY29uc29sZS5sb2coc3VwcG9ydGVkQVBJLmluZGV4T2YobWV0aG9kKSk7XG4gICAgICAgICAgICBpZiAoc3VwcG9ydGVkQVBJLmluZGV4T2YobWV0aG9kKSA9PT0gLTEpXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoYE1ldGhvZCAke21ldGhvZH0gaXMgbm90IHN1cHBvcnRlZGApO1xuICAgICAgICAgICAgQXBpc1ttZXRob2RdKGNvbmZpZ3VyYXRpb25zLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsImV4cG9ydCBmdW5jdGlvbiBtZXRob2RzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAgIC8vb2JqZWN0IGNyZWF0aW9uIG1ldGhvZHNcbiAgICAgICAgJ2NyZWF0ZWhlZGVyYW9iamVjdCcsICdjcmVhdGVjb250cmFjdG9iamVjdCcsXG5cbiAgICAgICAgLy9tYWluIGluaXRpYWwgbWV0aG9kIHRvIGNoZWNrIHJlYWR5bmVzcyBmb3IgcGVyZm9ybWluZyB0cmFuc2FjdGlvblxuICAgICAgICAnaW5pdCcsXG5cbiAgICAgICAgLy90cmFuc2FjdGlvbiByZWxhdGVkIG1ldGhvZHNcbiAgICAgICAgJ21ha2VwYXltZW50JywgJ21ha2VUcmFuc2FjdGlvbicsICdjaGVja3RyYW5zYWN0aW9uJywgJ2Fzc2lzdF90cmFuc2FjdGlvbicsXG5cbiAgICAgICAgLy9tb2RhbCByZWxhdGVkIG1ldGhvZHNcbiAgICAgICAgJ2dldG1vZGFsJ1xuICAgIF07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWV0aG9kcy5qcyIsImltcG9ydCAqIGFzIGdlbmVyYWwgZnJvbSAnLi9nZW5lcmFsJztcbmltcG9ydCB7TW9kYWx9IGZyb20gJy4vbW9kYWwnO1xuaW1wb3J0ICogYXMgbGlicmFyaWVzIGZyb20gJy4vbGlicmFyaWVzJztcbmltcG9ydCAqIGFzIENvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgKiBhcyBzZXJ2aWNlcyBmcm9tICcuL3NlcnZpY2VzJztcbmV4cG9ydCBmdW5jdGlvbiB0ZXN0KCl7XG4gICAgcmV0dXJuICd0aW5nJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUhlZGVyYU9iamVjdChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgbGV0IG9iamVjdCA9IFsnc3VibWlzc2lvbm5vZGUnLCAncGF5bWVudHNlcnZlcicsICdyZWNpcGllbnRsaXN0JywgJ2NvbnRlbnRpZCcsICd0eXBlJywgJ21lbW8nLCAnZXh0ZW5zaW9uaWQnLCAncmVkaXJlY3QnLCAndGltZSddO1xuICAgIGxldCBIZWRlcmFvYmplY3QgPSAnPGhlZGVyYS1taWNyb3BheW1lbnQgJztcbiAgICBmb3IgKHZhciBpIGluIG9iamVjdCkge1xuICAgICAgICBsZXQgbm9kZSA9IG9iamVjdFtpXTtcbiAgICAgICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShub2RlKSkge1xuICAgICAgICAgICAgSGVkZXJhb2JqZWN0ICs9IFwiZGF0YS1cIiArIG5vZGUgKyBcIj0gJ1wiICsgcGFyYW1zW25vZGVdICsgXCInICwgXCIgKyBcIlxcblwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIEhlZGVyYW9iamVjdCArPSAnPjwvaGVkZXJhLW1pY3JvcGF5bWVudD4nO1xuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyYW1zWydhdHRySUQnXSk7XG4gICAgYm9keS5pbm5lckhUTUwgKz0gSGVkZXJhb2JqZWN0O1xuICAgIGNhbGxiYWNrKG51bGwsSGVkZXJhb2JqZWN0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbnRyYWN0T2JqZWN0KHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICBsZXQgX19jb25zdHJ1Y3QgPSBbJ2NvbnRyYWN0aWQnLCAnbWF4aW11bScsICdwYXltZW50c2VydmVyJywgJ3BhcmFtcycsICdtZW1vJywgJ2FiaScsICdyZWRpcmVjdCcsICdleHRlbnNpb25pZCddO1xuICAgIGxldCBvYmplY3QgPSB7XG4gICAgICAgIGNvbnRyYWN0aWQ6ICcwLjAuMTExMScsXG4gICAgICAgIG1heGltdW06ICc0MjIzNDIzNDMnLFxuICAgICAgICBwYXltZW50c2VydmVyOiBwYXJhbXMucGF5bWVudHNlcnZlcixcbiAgICAgICAgcGFyYW1zOiBbXCI4NjlcIiwgXCIxMDAwMDAwMDBcIiwgXCIyMTZcIiwgXCIyNTNcIiwgXCIyN1wiLCBcIjB4MjI2YjA4OTc2YWQwZGQ5ODJhZWI2YjIxYTQ0ZjNlYWNhZTU3OTU2OWMzNGU3MTcyNWFmZjgwMWEyZmU2ODczOVwiLCBcIjB4MzMzZjk5MWZhM2E4NzA1NzVmODE5NTY5ZTlmNzJhNzcxZWE3OTAwNzhkNDQ4Y2M4Nzg5MTIwZWUxNGFiZjNjNVwiXSxcbiAgICAgICAgbWVtbzogJ2E0YTdjNDMyOWFhYjRiMWZhYzQ3NGZmNmY5M2Q4NThjJyxcbiAgICAgICAgYWJpOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBcImNvbnN0YW50XCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJpbnB1dHNcIjogW3tcIm5hbWVcIjogXCJwcm9wZXJ0eUlEXCIsIFwidHlwZVwiOiBcInVpbnQyNFwifSwge1wibmFtZVwiOiBcImFtb3VudFwiLCBcInR5cGVcIjogXCJ1aW50MjU2XCJ9LCB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwieFwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInVpbnQxNlwiXG4gICAgICAgICAgICB9LCB7XCJuYW1lXCI6IFwieVwiLCBcInR5cGVcIjogXCJ1aW50MTZcIn0sIHtcIm5hbWVcIjogXCJ2XCIsIFwidHlwZVwiOiBcInVpbnQ4XCJ9LCB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiclwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ5dGVzMzJcIlxuICAgICAgICAgICAgfSwge1wibmFtZVwiOiBcInNcIiwgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwifV0sXG4gICAgICAgICAgICBcIm5hbWVcIjogXCJidXlQcm9wZXJ0eVwiLFxuICAgICAgICAgICAgXCJvdXRwdXRzXCI6IFt7XCJuYW1lXCI6IFwiXCIsIFwidHlwZVwiOiBcInN0cmluZ1wifV0sXG4gICAgICAgICAgICBcInBheWFibGVcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwic3RhdGVNdXRhYmlsaXR5XCI6IFwicGF5YWJsZVwiLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgICAgICB9KSxcbiAgICAgICAgcmVkaXJlY3Q6ICd7XCJub25QYXlpbmdBY2NvdW50XCI6IFwiL2luc3VmZmljaWVudC1hbW91bnQvXCIsXCJub0FjY291bnRcIjogXCIvYWNjb3VudC1ub3QtcGFpcmVkXCIsXCJob21lUGFnZVwiOiBcIi9cIn0nLFxuICAgICAgICBleHRlbnNpb25pZDogJ3BkampwY29sZ21tY2lmaWpwZWprZW5wYmJpbWVkcGljJyxcbiAgICB9O1xuXG4gICAgY29uc29sZS5sb2coSlNPTi5wYXJzZShvYmplY3QuYWJpKSk7XG4gICAgbGV0IGV4dGVuZGVkID0gbGlicmFyaWVzLmV4dGVuZE9iamVjdChvYmplY3QsIHBhcmFtcyk7XG4gICAgY29uc29sZS5sb2coZXh0ZW5kZWQpO1xuICAgIGxldCBDb250cmFjdG9iamVjdCA9ICc8aGVkZXJhLWNvbnRyYWN0ICc7XG4gICAgZm9yICh2YXIgaSBpbiBfX2NvbnN0cnVjdCkge1xuICAgICAgICBsZXQgbm9kZSA9IF9fY29uc3RydWN0W2ldO1xuICAgICAgICBpZiAoZXh0ZW5kZWQuaGFzT3duUHJvcGVydHkobm9kZSkpIHtcbiAgICAgICAgICAgIENvbnRyYWN0b2JqZWN0ICs9IFwiZGF0YS1cIiArIG5vZGUgKyBcIj0gJ1wiICsgZXh0ZW5kZWRbbm9kZV0gKyBcIicgXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQ29udHJhY3RvYmplY3QgKz0gJz48L2hlZGVyYS1jb250cmFjdD4nO1xuICAgIGNvbnNvbGUubG9nKENvbnRyYWN0b2JqZWN0KTtcblxuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZXh0ZW5kZWRbJ2F0dHJJRCddKTtcbiAgICBib2R5LmlubmVySFRNTCArPSBDb250cmFjdG9iamVjdDtcbiAgICBjYWxsYmFjayhudWxsLENvbnRyYWN0b2JqZWN0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrVHJhbnNhY3Rpb24ocGFyYW1zLCBjYWxsYmFjaykge1xuICAgIGxldCBtZW1vX2lkID0gcGFyYW1zLmNvbmZpZ3VyYXRpb24ubWVtbztcbiAgICBsZXQgdXJsID0gQ29uZmlnLmRlZmF1bHQucHJvZHVjdGlvbiA/IENvbmZpZy5kZWZhdWx0LnByb2R1Y3Rpb25TZXJ2ZXIgOiAnaHR0cDovL2xvY2FsaG9zdDo4MDk5JztcbiAgICBsZXQgc3RydWN0dXJlID0ge1xuICAgICAgICBiYXNldXJsOiB1cmwsXG4gICAgICAgIG1lbW9faWQ6IG1lbW9faWQsXG4gICAgICAgIHJlY2VpdmVyX2lkOiAnJyxcbiAgICAgICAgc3VjY2VzczogJy9zdWNjZXNzJyxcbiAgICAgICAgZmFpbHVyZTogJy9wYXltZW50LWZhaWxlZCcsXG4gICAgICAgIHRpbWVvdXQ6IDMwMDAsXG4gICAgICAgIGxpbWl0OiAxXG4gICAgfTtcblxuICAgIGZvciAodmFyIGtleSBpbiBwYXJhbXMucGFyYW1zKSB7XG4gICAgICAgIGlmIChwYXJhbXMucGFyYW1zLmhhc093blByb3BlcnR5KGtleSkgJiYgcGFyYW1zLnBhcmFtc1trZXldKSB7XG4gICAgICAgICAgICBzdHJ1Y3R1cmVba2V5XSA9IHBhcmFtcy5wYXJhbXNba2V5XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdHJ1Y3R1cmUucmVjZWl2ZXJfaWQgJiYgc3RydWN0dXJlLm1lbW9faWQpIHtcbiAgICAgICAgVVJMID0gc3RydWN0dXJlLmJhc2V1cmwgKyBcIi9jaGVjay9cIiArIHN0cnVjdHVyZS5yZWNlaXZlcl9pZCArIFwiL1wiICsgc3RydWN0dXJlLm1lbW9faWRcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc3RydWN0dXJlLnRpbWVzdGFtcClcbiAgICAgICAgICAgIFVSTCA9IHN0cnVjdHVyZS5iYXNldXJsICsgXCIvbWVtby9cIiArIHN0cnVjdHVyZS5tZW1vX2lkICsgJz9saW1pdD0nICsgc3RydWN0dXJlLmxpbWl0ICsgJyZ0aW1lc3RhbXA9JyArIHN0cnVjdHVyZS50aW1lc3RhbXA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIFVSTCA9IHN0cnVjdHVyZS5iYXNldXJsICsgXCIvbWVtby9cIiArIHN0cnVjdHVyZS5tZW1vX2lkICsgJz9saW1pdD0nICsgc3RydWN0dXJlLmxpbWl0O1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKHN0cnVjdHVyZS50aW1lb3V0KTtcbiAgICAvL3NldFRpbWVvdXQocGVyZm9ybVJlcXVlc3Qoc3RydWN0dXJlKSwgc3RydWN0dXJlLnRpbWVvdXQpXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBlcmZvcm1SZXF1ZXN0KHN0cnVjdHVyZSk7XG4gICAgfSwgc3RydWN0dXJlLnRpbWVvdXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgbGV0IHJlc3BvbnNlID0ge1xuICAgICAgICBhY2NvdW50UGFpcmVkOiBmYWxzZSxcbiAgICAgICAgaXNtb2JpbGU6IG51bGwsXG4gICAgICAgIHZhbGlkQnJvd3NlcjogbnVsbCxcbiAgICAgICAgZXh0ZW5zaW9uSW5zdGFsbGVkOiBudWxsLFxuICAgICAgICBhY2Nlc3NUb0FjY291bnRzOiBudWxsLFxuICAgICAgICBhY2NvdW50SWQ6IG51bGwsXG4gICAgICAgIHN1Ym1pc3Npb25Ob2RlOiBwYXJhbXMuc3VibWlzc2lvbm5vZGUsXG4gICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICB0eG5fc3VjY2VzczogZmFsc2UsXG4gICAgICAgIHRpbWU6IHBhcmFtcy50aW1lLFxuICAgICAgICBtZXNzYWdlOiBudWxsXG4gICAgfTtcbiAgICByZXNwb25zZS52YWxpZEJyb3dzZXIgPSBsaWJyYXJpZXMuaXNDaHJvbWUoKTtcbiAgICBpZihyZXNwb25zZS52YWxpZEJyb3dzZXI9PT1mYWxzZSlcbiAgICAgICAgcmVzcG9uc2UubWVzc2FnZSA9IFwiVGhlIGJyb3dzZXIgaXMgbm90IGNocm9tZVwiO1xuICAgIHJlc3BvbnNlLmlzbW9iaWxlID0gbGlicmFyaWVzLmRldGVjdG1vYigpO1xuICAgIGxpYnJhcmllcy5kZXRlY3QocGFyYW1zLmV4dGVuc2lvbmlkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlc3BvbnNlLmV4dGVuc2lvbkluc3RhbGxlZCA9IGZhbHNlO1xuICAgICAgICByZXNwb25zZS5tZXNzYWdlID0gXCJFeHRlbnNpb24gTm90IEluc3RhbGxlZFwiO1xuICAgICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXNwb25zZS5leHRlbnNpb25JbnN0YWxsZWQgPSB0cnVlO1xuICAgICAgICBjcmVhdGVIZWRlcmFPYmplY3QocGFyYW1zLCBmdW5jdGlvbihlcnIsIGhvYmplY3Qpe1xuICAgICAgICAgICAgaWYoaG9iamVjdCl7XG4gICAgICAgICAgICAgICAgbGV0IHVybCA9IENvbmZpZy5kZWZhdWx0LnByb2R1Y3Rpb24gPyBDb25maWcuZGVmYXVsdC5wcm9kdWN0aW9uU2VydmVyIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA5OSc7XG4gICAgICAgICAgICAgICAgVVJMID0gdXJsICsgXCIvbWVtby9cIiArIHBhcmFtcy5tZW1vO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgeGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhamF4cmVzcCA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFqYXhyZXNwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFqYXhyZXNwLnJlc3BvbnNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlcnZpY2VzLnByZWNoZWNrZXIoYWpheHJlc3AucmVzcG9uc2VbMF0ubm9kZXByZWNoZWNrKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5hY2NvdW50SWQgPSBhamF4cmVzcC5yZXNwb25zZVswXS5zZW5kZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5hY2NvdW50UGFpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmFjY2Vzc1RvQWNjb3VudHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KGFqYXhyZXNwLnJlc3BvbnNlWzBdLm5vZGVwcmVjaGVjaykgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS50eG5fc3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5lcnJvciA9IHNlcnZpY2VzLnByZWNoZWNrZXIoYWpheHJlc3AucmVzcG9uc2VbMF0ubm9kZXByZWNoZWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLm1lc3NhZ2UgPSBzZXJ2aWNlcy5wcmVjaGVja2VyKGFqYXhyZXNwLnJlc3BvbnNlWzBdLm5vZGVwcmVjaGVjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5tZXNzYWdlID0gJ1RyYW5zYWN0aW9uIGZhaWxlZCwgdGhpcyBpcyBtb3N0bHkgZHVlIHRvIGV4dGVuc2lvbiBub3QgYmVpbmcgYWJsZSB0byBkZXRlY3QgaGVkZXJhIG9iamVjdCwgcGxlYXNlIHJlZnJlc2ggdGhlIHBhZ2UuJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmFjY291bnRQYWlyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuYWNjZXNzVG9BY2NvdW50cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB4aHR0cC5vcGVuKFwiR0VUXCIsIFVSTCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHhodHRwLnNlbmQoKTtcbiAgICAgICAgICAgICAgICB9LCA1MDAwKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLm1lc3NhZ2UgPSBcIkhlZGVyYSBvYmplY3QgY291bGQgbm90IGJlIGRldGVjdGVkLCBwbGVhc2UgdHJ5IGFnYWluIHJlZnJlc2hpbmcgdGhlIHBhZ2UuXCI7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZmFsc2UsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vY2FsbGJhY2sobnVsbCxyZXNwb25zZSk7XG4gICAgfSk7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldG1vZGFsKGNhbGxiYWNrKSB7XG4gICAgdmFyIG15Q29udGVudCA9IGdlbmVyYWwuZ2V0bW9kYWxDb250ZW50KCk7XG4gICAgdmFyIG15TW9kYWwgPSBuZXcgTW9kYWwoe1xuICAgICAgICBjb250ZW50OiBteUNvbnRlbnRcbiAgICB9KTtcbiAgICBpZihjYWxsYmFjayAmJiB0eXBlb2YgY2FsbGJhY2s9PT0nZnVuY3Rpb24nKXtcbiAgICAgICAgY2FsbGJhY2sobXlDb250ZW50KTtcbiAgICB9XG4gICAgbXlNb2RhbC5vcGVuKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlVHJhbnNhY3Rpb24oY29uZmlndXJhdGlvbiwgY2FsbGJhY2spIHtcbiAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgICB0cmFuc2FjdGlvbl9wcm9jZXNpbmc6IHRydWUsXG4gICAgICAgIHRyYW5zYWN0aW9uX2ZhaWxlZDogZmFsc2UsXG4gICAgICAgIHRyYW5zYWN0aW9uX3N1Y2Nlc3M6IGZhbHNlXG4gICAgfTtcbiAgICBpbml0KGNvbmZpZ3VyYXRpb24sIGZ1bmN0aW9uKGVyciwgcmVzKXtcbiAgICAgICAgaWYoZXJyKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgIGlmKHJlcyl7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3Npc3RfdHJhbnNhY3Rpb24oY29uZmlndXJhdGlvbiwgY2FsbGJhY2spIHtcbiAgICBsZXQgcGFyYW1zID0gY29uZmlndXJhdGlvbjtcbiAgICBsZXQgcmVzcG9uc2UgPSB7XG4gICAgICAgIGFjY291bnRQYWlyZWQ6IGZhbHNlLFxuICAgICAgICBpc21vYmlsZTogbnVsbCxcbiAgICAgICAgdmFsaWRCcm93c2VyOiBudWxsLFxuICAgICAgICBleHRlbnNpb25JbnN0YWxsZWQ6IG51bGwsXG4gICAgICAgIGFjY2Vzc1RvQWNjb3VudHM6IG51bGwsXG4gICAgICAgIGFjY291bnRJZDogbnVsbCxcbiAgICAgICAgc3VibWlzc2lvbk5vZGU6IHBhcmFtcy5zdWJtaXNzaW9ubm9kZSxcbiAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgIHR4bl9zdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgdGltZTogY29uZmlndXJhdGlvbi50aW1lXG4gICAgfTtcbiAgICBjcmVhdGVIZWRlcmFPYmplY3QocGFyYW1zLCBmdW5jdGlvbihlcnIsIGhvYmplY3Qpe1xuICAgICAgICBpZihob2JqZWN0KXtcbiAgICAgICAgICAgIGxldCB1cmwgPSBDb25maWcuZGVmYXVsdC5wcm9kdWN0aW9uID8gQ29uZmlnLmRlZmF1bHQucHJvZHVjdGlvblNlcnZlciA6ICdodHRwOi8vbG9jYWxob3N0OjgwOTknO1xuICAgICAgICAgICAgVVJMID0gdXJsICsgXCIvbWVtby9cIiArIHBhcmFtcy5tZW1vO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgeGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhamF4cmVzcCA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYWpheHJlc3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhamF4cmVzcC5yZXNwb25zZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlcnZpY2VzLnByZWNoZWNrZXIoYWpheHJlc3AucmVzcG9uc2VbMF0ubm9kZXByZWNoZWNrKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmFjY291bnRJZCA9IGFqYXhyZXNwLnJlc3BvbnNlWzBdLnNlbmRlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuYWNjb3VudFBhaXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmFjY2Vzc1RvQWNjb3VudHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoYWpheHJlc3AucmVzcG9uc2VbMF0ubm9kZXByZWNoZWNrKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UudHhuX3N1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmVycm9yID0gc2VydmljZXMucHJlY2hlY2tlcihhamF4cmVzcC5yZXNwb25zZVswXS5ub2RlcHJlY2hlY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5hY2NvdW50UGFpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuYWNjZXNzVG9BY2NvdW50cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgeGh0dHAub3BlbihcIkdFVFwiLCBVUkwsIHRydWUpO1xuICAgICAgICAgICAgICAgIHhodHRwLnNlbmQoKTtcbiAgICAgICAgICAgIH0sIDUwMDApO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNhbGxiYWNrKHsnc3VjY2Vzcyc6ZmFsc2UsJ21lc3NhZ2UnOidDb3VsZCBub3QgY3JlYXRlIGhlZGVyYSBvYmplY3QnfSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBpcy5qcyIsIi8vIERlZmluZSBvdXIgY29uc3RydWN0b3JcbmZ1bmN0aW9uIE1vZGFsKCkge1xuICAgIC8vIENyZWF0ZSBnbG9iYWwgZWxlbWVudCByZWZlcmVuY2VzXG4gICAgdGhpcy5jbG9zZUJ1dHRvbiA9IG51bGw7XG4gICAgdGhpcy5tb2RhbCA9IG51bGw7XG4gICAgdGhpcy5vdmVybGF5ID0gbnVsbDtcblxuICAgIC8vIERldGVybWluZSBwcm9wZXIgcHJlZml4XG4gICAgdGhpcy50cmFuc2l0aW9uRW5kID0gdHJhbnNpdGlvblNlbGVjdCgpO1xuXG4gICAgLy8gRGVmaW5lIG9wdGlvbiBkZWZhdWx0c1xuICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgYXV0b09wZW46IGZhbHNlLFxuICAgICAgICBjbGFzc05hbWU6ICdmYWRlLWFuZC1kcm9wJyxcbiAgICAgICAgY2xvc2VCdXR0b246IHRydWUsXG4gICAgICAgIGNvbnRlbnQ6IFwiXCIsXG4gICAgICAgIG1heFdpZHRoOiA2MDAsXG4gICAgICAgIG1pbldpZHRoOiAyODAsXG4gICAgICAgIG92ZXJsYXk6IGZhbHNlXG4gICAgfTtcblxuICAgIC8vIENyZWF0ZSBvcHRpb25zIGJ5IGV4dGVuZGluZyBkZWZhdWx0cyB3aXRoIHRoZSBwYXNzZWQgaW4gYXJ1Z21lbnRzXG4gICAgaWYgKGFyZ3VtZW50c1swXSAmJiB0eXBlb2YgYXJndW1lbnRzWzBdID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGV4dGVuZERlZmF1bHRzKGRlZmF1bHRzLCBhcmd1bWVudHNbMF0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b09wZW4gPT09IHRydWUpIHRoaXMub3BlbigpO1xuXG59XG5cbi8vIFB1YmxpYyBNZXRob2RzXG5Nb2RhbC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF8gPSB0aGlzO1xuICAgIHRoaXMubW9kYWwuY2xhc3NOYW1lID0gdGhpcy5tb2RhbC5jbGFzc05hbWUucmVwbGFjZShcIiBoYXNoLW9wZW5cIiwgXCJcIik7XG4gICAgdGhpcy5vdmVybGF5LmNsYXNzTmFtZSA9IHRoaXMub3ZlcmxheS5jbGFzc05hbWUucmVwbGFjZShcIiBoYXNoLW9wZW5cIiwgXCJcIik7XG4gICAgdGhpcy5tb2RhbC5hZGRFdmVudExpc3RlbmVyKHRoaXMudHJhbnNpdGlvbkVuZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICBfLm1vZGFsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoXy5tb2RhbCk7XG4gICAgfSk7XG4gICAgdGhpcy5vdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIodGhpcy50cmFuc2l0aW9uRW5kLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChfLm92ZXJsYXkucGFyZW50Tm9kZSkgXy5vdmVybGF5LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoXy5vdmVybGF5KTtcbiAgICB9KTtcbn07XG5cbk1vZGFsLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgIGJ1aWxkT3V0LmNhbGwodGhpcyk7XG4gICAgaW5pdGlhbGl6ZUV2ZW50cy5jYWxsKHRoaXMpO1xuICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMubW9kYWwpLmhlaWdodDtcbiAgICB0aGlzLm1vZGFsLmNsYXNzTmFtZSA9IHRoaXMubW9kYWwuY2xhc3NOYW1lICsgKHRoaXMubW9kYWwub2Zmc2V0SGVpZ2h0ID4gd2luZG93LmlubmVySGVpZ2h0ID8gXCIgaGFzaC1vcGVuIGhhc2gtYW5jaG9yZWRcIiA6IFwiIGhhc2gtb3BlblwiKTtcbiAgICAvL3RoaXMub3ZlcmxheS5jbGFzc05hbWUgPSB0aGlzLm92ZXJsYXkuY2xhc3NOYW1lICsgXCIgaGFzaC1vcGVuXCI7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX2Nsb3NlJykub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfb3V0ZXJfd3JhcCcpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9O1xufTtcblxuLy8gUHJpdmF0ZSBNZXRob2RzXG5mdW5jdGlvbiBidWlsZE91dCgpIHtcblxuICAgIHZhciBjb250ZW50LCBjb250ZW50SG9sZGVyLCBkb2NGcmFnO1xuXG4gICAgLypcbiAgICAgKiBJZiBjb250ZW50IGlzIGFuIEhUTUwgc3RyaW5nLCBhcHBlbmQgdGhlIEhUTUwgc3RyaW5nLlxuICAgICAqIElmIGNvbnRlbnQgaXMgYSBkb21Ob2RlLCBhcHBlbmQgaXRzIGNvbnRlbnQuXG4gICAgICovXG5cbiAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5jb250ZW50ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGNvbnRlbnQgPSB0aGlzLm9wdGlvbnMuY29udGVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb250ZW50ID0gdGhpcy5vcHRpb25zLmNvbnRlbnQuaW5uZXJIVE1MO1xuICAgIH1cblxuICAgIC8vIENyZWF0ZSBhIERvY3VtZW50RnJhZ21lbnQgdG8gYnVpbGQgd2l0aFxuICAgIGRvY0ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICAvLyBDcmVhdGUgbW9kYWwgZWxlbWVudFxuICAgIHRoaXMubW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMubW9kYWwuY2xhc3NOYW1lID0gXCJoYXNoLW1vZGFsIFwiICsgdGhpcy5vcHRpb25zLmNsYXNzTmFtZTtcbiAgICAvKnRoaXMubW9kYWwuc3R5bGUubWluV2lkdGggPSB0aGlzLm9wdGlvbnMubWluV2lkdGggKyBcInB4XCI7XG4gICAgdGhpcy5tb2RhbC5zdHlsZS5tYXhXaWR0aCA9IHRoaXMub3B0aW9ucy5tYXhXaWR0aCArIFwicHhcIjsqL1xuXG4gICAgLy8gSWYgY2xvc2VCdXR0b24gb3B0aW9uIGlzIHRydWUsIGFkZCBhIGNsb3NlIGJ1dHRvblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2VCdXR0b24gPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3B1cC1jbG9zZS1idG4nKTtcbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgY29udGVudCBhcmVhIGFuZCBhcHBlbmQgdG8gbW9kYWxcbiAgICBjb250ZW50SG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb250ZW50SG9sZGVyLmNsYXNzTmFtZSA9IFwiaGFzaC1jb250ZW50XCI7XG4gICAgY29udGVudEhvbGRlci5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgIHRoaXMubW9kYWwuYXBwZW5kQ2hpbGQoY29udGVudEhvbGRlcik7XG5cbiAgICAvLyBBcHBlbmQgbW9kYWwgdG8gRG9jdW1lbnRGcmFnbWVudFxuICAgIGRvY0ZyYWcuYXBwZW5kQ2hpbGQodGhpcy5tb2RhbCk7XG5cbiAgICAvLyBBcHBlbmQgRG9jdW1lbnRGcmFnbWVudCB0byBib2R5XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb2NGcmFnKTtcblxufVxuXG5pbWdjaGFuZ2VGdW5jdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2hib3hzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoXCJpbWdfY2hrYm94XCIpO1xuICAgIHZhciB2YXJfY2hlY2sgPSBcIlwiO1xuXG4gICAgdmFyIGltZ19hbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaW1nX2FsbFwiKTtcblxuICAgIGZvcih2YXIgaT0wO2k8Y2hib3hzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgaWYoY2hib3hzW2ldLmNoZWNrZWQpe1xuICAgICAgICAgICAgdmFyX2NoZWNrID0gdmFyX2NoZWNrLmNvbmNhdChjaGJveHNbaV0udmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYodmFyX2NoZWNrID09ICdpbWdfb25lJyl7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfdHdvJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX3RocmVlJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX2ZvdXInKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfb25lJykuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgaWYodmFyX2NoZWNrID09ICdpbWdfb25laW1nX3R3bycpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ19vbmUnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfdGhyZWUnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfZm91cicpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ190d28nKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBpZih2YXJfY2hlY2sgPT0gJ2ltZ19vbmVpbWdfdHdvaW1nX3RocmVlJyl7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfb25lJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX3R3bycpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ19mb3VyJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX3RocmVlJykuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgaWYodmFyX2NoZWNrID09ICdpbWdfb25laW1nX3R3b2ltZ190aHJlZWltZ19mb3VyJykge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nX29uZScpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZ190d28nKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfdGhyZWUnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWdfZm91cicpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gZXh0ZW5kRGVmYXVsdHMoc291cmNlLCBwcm9wZXJ0aWVzKSB7XG4gICAgdmFyIHByb3BlcnR5O1xuICAgIGZvciAocHJvcGVydHkgaW4gcHJvcGVydGllcykge1xuICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgIHNvdXJjZVtwcm9wZXJ0eV0gPSBwcm9wZXJ0aWVzW3Byb3BlcnR5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc291cmNlO1xufVxuXG5mdW5jdGlvbiBpbml0aWFsaXplRXZlbnRzKCkge1xuICAgIGlmICh0aGlzLmNsb3NlQnV0dG9uKSB7XG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm92ZXJsYXkpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gdHJhbnNpdGlvblNlbGVjdCgpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGlmIChlbC5zdHlsZS5XZWJraXRUcmFuc2l0aW9uKSByZXR1cm4gXCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCI7XG4gICAgaWYgKGVsLnN0eWxlLk9UcmFuc2l0aW9uKSByZXR1cm4gXCJvVHJhbnNpdGlvbkVuZFwiO1xuICAgIHJldHVybiAndHJhbnNpdGlvbmVuZCc7XG59XG4vL2V4cG9ydGluZyBtb2R1bGVcbm1vZHVsZS5leHBvcnRzLk1vZGFsID0gTW9kYWw7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kYWwuanMiXSwic291cmNlUm9vdCI6IiJ9