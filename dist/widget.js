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

var supportedAPI = ['makepayment', 'test', 'createhederaobject', 'checktransaction', 'createcontractobject', 'init', 'transactionnodechecker']; // enlist all methods supported by API (e.g. `mw('event', 'user-login');`)

/**
 The main entry of the application
 */

var production = true;

function app(window) {
  console.log('HASH-JS starting');
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
    attrID: 'article-1' //redirect:'{ "nonPayingAccount": "/insufficient-amount/", "noAccount": "/account-not-paired/", "homePage": "/" }',

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
          callback = queue[i][queue.length - 1];
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
  img.onerror = notInstalledCallback;
  img.onload = installedCallback('installed');
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
          /*window.open(
              window.origin + structure.success,
              '_blank'
          );*/
          if (response.response[0].nodeprecheck == 0) window.location.replace(window.origin + structure.success);else console.log(Object(__WEBPACK_IMPORTED_MODULE_0__services__["a" /* prechecker */])(response.response[0].nodeprecheck));
        } else {
          window.location.replace(window.origin + structure.failure);
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
  var responese = {
    'ischrome': true,
    'accountPaired': false,
    'ismobile': null,
    'validBrowser': null,
    'extensionInstalled': null,
    'accessToAccounts': null,
    'accountId': null,
    'submissionNode': params.submissionnode
  };
  var checkIsChrome = isChrome();
  responese.ischrome = checkIsChrome;
  var mob = detectmob();
  responese.ismobile = mob;
  detect(params.extensionid, function () {
    responese.extensionInstalled = false;
    callback(null, responese);
  }, function () {
    responese.extensionInstalled = true;
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
              responese.accountId = ajaxresp.response[0].sender;
              responese.accountPaired = true;
              responese.accessToAccounts = true;
              callback(null, responese);
            } else {
              callback(responese);
            }
          } else {
            responese.accountPaired = false;
            responese.accessToAccounts = false;
            callback(null, responese);
          }
        }
      };

      xhttp.open("GET", URL, true);
      xhttp.send();
    }, 5000); //callback(null,responese);
  });
}

function detectmob() {
  if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
    return true;
  } else {
    return false;
  }
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWU2ZjE4NWVlYmVmNzExZmIxYTQiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIl0sIm5hbWVzIjpbInN1cHBvcnRlZEFQSSIsInByb2R1Y3Rpb24iLCJhcHAiLCJ3aW5kb3ciLCJjb25zb2xlIiwibG9nIiwiY29uZmlndXJhdGlvbnMiLCJwYXltZW50c2VydmVyIiwiZXh0ZW5zaW9uaWQiLCJlcnJvciIsInR5cGUiLCJ0aW1lIiwiRGF0ZSIsIm5vdyIsInJlZGlyZWN0IiwiaWQiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwic3VibWlzc2lvbm5vZGUiLCJtZW1vIiwicmVjaXBpZW50bGlzdCIsImNvbnRlbnRpZCIsImF0dHJJRCIsImdsb2JhbE9iamVjdCIsInF1ZXVlIiwicSIsImkiLCJsZW5ndGgiLCJ0b0xvd2VyQ2FzZSIsImV4dGVuZE9iamVjdCIsImNyZWF0ZUhlZGVyYU9iamVjdCIsImNoZWNrRm9yRXh0ZW5zaW9uIiwiYXBpSGFuZGxlciIsImNhbGxiYWNrIiwiaXNDaHJvbWUiLCJyZWRpcmVjdFRvRXJyb3IiLCJ0YWdzIiwiYW1vdW50IiwiRVhURU5TSU9OX0lEIiwiZGV0ZWN0IiwicmVzcG9uc2UiLCJyZWNvcmRSZXNwb25zZSIsImV4dGVuc2lvbklkIiwibm90SW5zdGFsbGVkQ2FsbGJhY2siLCJpbnN0YWxsZWRDYWxsYmFjayIsImltZyIsIkltYWdlIiwib25lcnJvciIsIm9ubG9hZCIsInNyYyIsInJlcyIsImJvZHkiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwiZXJyIiwicmVwbGFjZSIsIm9yaWdpbiIsImNvbmZpZ3VyYXRpb24iLCJhcGkiLCJwYXJhbXMiLCJFcnJvciIsImluZGV4T2YiLCJjaGVja1RyYW5zYWN0aW9uIiwiY3JlYXRlQ29udHJhY3RPYmplY3QiLCJpbml0Iiwid2FybiIsImEiLCJiIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJvYmplY3QiLCJIZWRlcmFvYmplY3QiLCJub2RlIiwiZ2V0RWxlbWVudEJ5SWQiLCJfX2NvbnN0cnVjdCIsImNvbnRyYWN0aWQiLCJtYXhpbXVtIiwiYWJpIiwiSlNPTiIsInN0cmluZ2lmeSIsInBhcnNlIiwiZXh0ZW5kZWQiLCJDb250cmFjdG9iamVjdCIsIm1lbW9faWQiLCJ1cmwiLCJzdHJ1Y3R1cmUiLCJiYXNldXJsIiwicmVjZWl2ZXJfaWQiLCJzdWNjZXNzIiwiZmFpbHVyZSIsInRpbWVvdXQiLCJsaW1pdCIsIlVSTCIsInRpbWVzdGFtcCIsInNldFRpbWVvdXQiLCJwZXJmb3JtUmVxdWVzdCIsInhodHRwIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwibm9kZXByZWNoZWNrIiwicHJlY2hlY2tlciIsIm9wZW4iLCJzZW5kIiwicmVzcG9uZXNlIiwiY2hlY2tJc0Nocm9tZSIsImlzY2hyb21lIiwibW9iIiwiZGV0ZWN0bW9iIiwiaXNtb2JpbGUiLCJleHRlbnNpb25JbnN0YWxsZWQiLCJhamF4cmVzcCIsImFjY291bnRJZCIsInNlbmRlciIsImFjY291bnRQYWlyZWQiLCJhY2Nlc3NUb0FjY291bnRzIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwibWF0Y2giLCJwaW5nIiwibiIsImpzb24iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FB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QUFJLGNBQTU5RDtBQUE0K0QsUUFBSSxxQ0FBaC9EO0FBQXVoRSxRQUFJLGtDQUEzaEU7QUFBK2pFLFFBQUksbUJBQW5rRTtBQUF3bEUsUUFBSSwyQkFBNWxFO0FBQXluRSxRQUFJLHlCQUE3bkU7QUFBd3BFLFFBQUksOEJBQTVwRTtBQUE0ckUsUUFBSSx1QkFBaHNFO0FBQXl0RSxRQUFJLGlDQUE3dEU7QUFBZ3dFLFFBQUksMkJBQXB3RTtBQUFpeUUsUUFBSSxxQkFBcnlFO0FBQTR6RSxRQUFJLHlCQUFoMEU7QUFBMjFFLFFBQUkseUJBQS8xRTtBQUEwM0UsUUFBSSxrQ0FBOTNFO0FBQWs2RSxRQUFJLCtCQUF0NkU7QUFBdThFLFFBQUk7QUFBMzhFLEdBQVg7QUFDQyxTQUFPQSxJQUFJLENBQUNELENBQUQsQ0FBWDtBQUNKLEMiLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYWU2ZjE4NWVlYmVmNzExZmIxYTQiLCJpbXBvcnQge1xuICAgIHBpbmcscHJlY2hlY2tlclxufSBmcm9tICcuL3NlcnZpY2VzJ1xuXG5jb25zdCBzdXBwb3J0ZWRBUEkgPSBbJ21ha2VwYXltZW50JywgJ3Rlc3QnLCAnY3JlYXRlaGVkZXJhb2JqZWN0JywgJ2NoZWNrdHJhbnNhY3Rpb24nLFxuICAgICdjcmVhdGVjb250cmFjdG9iamVjdCcsICdpbml0JywndHJhbnNhY3Rpb25ub2RlY2hlY2tlciddOyAvLyBlbmxpc3QgYWxsIG1ldGhvZHMgc3VwcG9ydGVkIGJ5IEFQSSAoZS5nLiBgbXcoJ2V2ZW50JywgJ3VzZXItbG9naW4nKTtgKVxuLyoqXG4gVGhlIG1haW4gZW50cnkgb2YgdGhlIGFwcGxpY2F0aW9uXG4gKi9cbmNvbnN0IHByb2R1Y3Rpb24gPSB0cnVlO1xuXG5mdW5jdGlvbiBhcHAod2luZG93KSB7XG4gICAgY29uc29sZS5sb2coJ0hBU0gtSlMgc3RhcnRpbmcnKTtcbiAgICBsZXQgY29uZmlndXJhdGlvbnMgPSB7XG4gICAgICAgIHBheW1lbnRzZXJ2ZXI6IHByb2R1Y3Rpb24gPyBcImh0dHBzOi8vbXBzLmhhc2hpbmdzeXN0ZW1zLmNvbVwiIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6OTk5OScsXG4gICAgICAgIGV4dGVuc2lvbmlkOiBcImxpZ3Bhb25kYWFiY2xmaWdhZ2NpZm9iYWVsZW1pZW5hXCIsXG4gICAgICAgIGVycm9yOiBcIi9uby1leHRlbnNpb25cIixcbiAgICAgICAgdHlwZTogXCJhcnRpY2xlXCIsXG4gICAgICAgIHRpbWU6IERhdGUubm93KCksXG4gICAgICAgIHJlZGlyZWN0OiAneyBcIm5vblBheWluZ0FjY291bnRcIjogXCIvaW5zdWZmaWNpZW50LWFtb3VudC9cIiwgXCJub0FjY291bnRcIjogXCIvYWNjb3VudC1ub3QtcGFpcmVkL1wiLCBcImhvbWVQYWdlXCI6IFwiL1wifScsXG4gICAgICAgIC8vIHRoaXMgbWlnaHQgbWFrZSBhIGdvb2QgZGVmYXVsdCBpZCBmb3IgdGhlIGNvbnRlbnRcbiAgICAgICAgaWQ6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgICAgc3VibWlzc2lvbm5vZGU6IFwiMC4wLjExXCIsXG4gICAgICAgIG1lbW86IERhdGUubm93KCksXG4gICAgICAgIHJlY2lwaWVudGxpc3Q6ICdbeyBcInRvXCI6IFwiMC4wLjk5XCIsIFwidGlueWJhcnNcIjogXCIxNjY2NjY3XCIgfV0nLFxuICAgICAgICBjb250ZW50aWQ6ICc3OScsXG4gICAgICAgIGF0dHJJRDogJ2FydGljbGUtMScsXG4gICAgICAgIC8vcmVkaXJlY3Q6J3sgXCJub25QYXlpbmdBY2NvdW50XCI6IFwiL2luc3VmZmljaWVudC1hbW91bnQvXCIsIFwibm9BY2NvdW50XCI6IFwiL2FjY291bnQtbm90LXBhaXJlZC9cIiwgXCJob21lUGFnZVwiOiBcIi9cIiB9JyxcbiAgICB9O1xuICAgIC8vIGFsbCBtZXRob2RzIHRoYXQgd2VyZSBjYWxsZWQgdGlsbCBub3cgYW5kIHN0b3JlZCBpbiBxdWV1ZVxuICAgIC8vIG5lZWRzIHRvIGJlIGNhbGxlZCBub3dcbiAgICBsZXQgZ2xvYmFsT2JqZWN0ID0gd2luZG93W3dpbmRvd1snSEFTSC1KUyddXTtcbiAgICBsZXQgcXVldWUgPSBnbG9iYWxPYmplY3QucTtcbiAgICBpZiAocXVldWUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBxdWV1ZVtpXVswXSAhPT0gJ3VuZGVmaW5lZCcgJiYgcXVldWVbaV1bMF0udG9Mb3dlckNhc2UoKSA9PSAnbWFrZXBheW1lbnQnKSB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbnMgPSBleHRlbmRPYmplY3QoY29uZmlndXJhdGlvbnMsIHF1ZXVlW2ldWzFdKTtcbiAgICAgICAgICAgICAgICBjcmVhdGVIZWRlcmFPYmplY3QoY29uZmlndXJhdGlvbnMpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdIQVNILUpTIHN0YXJ0ZWQnLCBjb25maWd1cmF0aW9ucyk7XG4gICAgICAgICAgICAgICAgY2hlY2tGb3JFeHRlbnNpb24oY29uZmlndXJhdGlvbnMpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBxdWV1ZVtpXVswXSAhPT0gJ3VuZGVmaW5lZCcgJiYgcXVldWVbaV1bMF0udG9Mb3dlckNhc2UoKSA9PSAnY3JlYXRlY29udHJhY3RvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbnMgPSBleHRlbmRPYmplY3QoY29uZmlndXJhdGlvbnMsIHF1ZXVlW2ldWzFdKTtcbiAgICAgICAgICAgICAgICBhcGlIYW5kbGVyKGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVswXSwgcXVldWVbaV1bMV0sIHF1ZXVlW2ldWzJdKTtcbiAgICAgICAgICAgICAgICBjaGVja0ZvckV4dGVuc2lvbihjb25maWd1cmF0aW9ucylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhbGxiYWNrO1xuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBxdWV1ZVtpXVsxXT09J2Z1bmN0aW9uJyl7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gcXVldWVbaV1bMV07XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gcXVldWVbaV1bcXVldWUubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25zID0gZXh0ZW5kT2JqZWN0KGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgICAgICAgICAgYXBpSGFuZGxlcihjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMF0sIHF1ZXVlW2ldWzFdLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gb3ZlcnJpZGUgdGVtcG9yYXJ5ICh1bnRpbCB0aGUgYXBwIGxvYWRlZCkgaGFuZGxlclxuICAgIC8vIGZvciB3aWRnZXQncyBBUEkgY2FsbHNcbiAgICBnbG9iYWxPYmplY3QgPSBhcGlIYW5kbGVyO1xuICAgIGdsb2JhbE9iamVjdC5jb25maWd1cmF0aW9ucyA9IGNvbmZpZ3VyYXRpb25zO1xufVxuXG5mdW5jdGlvbiBjaGVja0ZvckV4dGVuc2lvbihjb25maWd1cmF0aW9ucykge1xuICAgIGlmICghaXNDaHJvbWUoKSkge1xuICAgICAgICByZWRpcmVjdFRvRXJyb3IoJy9pc25vdENocm9tZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB0YWdzID0gY29uZmlndXJhdGlvbnM7XG4gICAgICAgIC8vIGlmIHRhZ3MuYW1vdW50IGlzIG51bGwgb3IgdW5kZWZpbmVkLCB3ZSBzaG91bGQgYXNzdW1lIHRoYXQgdGhpcyBpcyBhIGZyZWUgcGFnZSBhbmQgZG8gbm90aGluZyBtb3JlXG4gICAgICAgIGlmICh0YWdzLmFtb3VudCA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IEVYVEVOU0lPTl9JRCA9IHRhZ3MuZXh0ZW5zaW9uaWQ7XG5cbiAgICAgICAgZGV0ZWN0KEVYVEVOU0lPTl9JRCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmVkaXJlY3RUb0Vycm9yKHRhZ3MuZXJyb3IpO1xuICAgICAgICB9LCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkZXRlY3Q6IHVzZXIgaGFzIGV4dGVuc2lvbiBpbnN0YWxsZWQnKTtcbiAgICAgICAgICAgIHJlY29yZFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhjaHJvbWUucnVudGltZS5jb25uZWN0KEVYVEVOU0lPTl9JRCwndmVyc2lvbicpKTtcbiAgICAgICAgLypjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShFWFRFTlNJT05fSUQsICd2ZXJzaW9uJywgcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmVkaXJlY3RUb0Vycm9yKHRhZ3MuZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWNvcmRSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKi9cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRldGVjdChleHRlbnNpb25JZCwgbm90SW5zdGFsbGVkQ2FsbGJhY2ssIGluc3RhbGxlZENhbGxiYWNrKSB7XG4gICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGltZy5vbmVycm9yID0gbm90SW5zdGFsbGVkQ2FsbGJhY2s7XG4gICAgaW1nLm9ubG9hZCA9IGluc3RhbGxlZENhbGxiYWNrKCdpbnN0YWxsZWQnKTtcbiAgICBpbWcuc3JjID0gJ2Nocm9tZS1leHRlbnNpb246Ly8nICsgZXh0ZW5zaW9uSWQgKyAnL2ljb25zL2ljb24xNi5wbmcnO1xufVxuXG5mdW5jdGlvbiByZWNvcmRSZXNwb25zZShyZXMpIHtcbiAgICBpZiAodHlwZW9mIHJlcyAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5Jyk7XG4gICAgICAgIGJvZHkuaW5uZXJIVE1MICs9ICc8ZGl2IHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6NSU7b3BhY2l0eTowLjM7ei1pbmRleDoxMDA7YmFja2dyb3VuZDp5ZWxsb3c7XCI+JyArIHJlcyArICc8L2Rpdj4nO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiByZWRpcmVjdFRvRXJyb3IoZXJyKSB7XG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSAhPSBlcnIpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uod2luZG93Lm9yaWdpbiArIGVycik7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0Nocm9tZSgpIHtcbiAgICByZXR1cm4gJ2Nocm9tZScgaW4gd2luZG93XG59XG5cbi8qKlxuIE1ldGhvZCB0aGF0IGhhbmRsZXMgYWxsIEFQSSBjYWxsc1xuICovXG5mdW5jdGlvbiBhcGlIYW5kbGVyKGNvbmZpZ3VyYXRpb24sIGFwaSwgcGFyYW1zLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBpZiAoIWFwaSkgdGhyb3cgRXJyb3IoJ0FQSSBtZXRob2QgcmVxdWlyZWQnKTtcbiAgICBhcGkgPSBhcGkudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoc3VwcG9ydGVkQVBJLmluZGV4T2YoYXBpKSA9PT0gLTEpIHRocm93IEVycm9yKGBNZXRob2QgJHthcGl9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgICBjb25zb2xlLmxvZyhgSGFuZGxpbmcgQVBJIGNhbGwgJHthcGl9YCwgcGFyYW1zKTtcblxuICAgICAvL3JldHVybiBhcGkrJygnK3BhcmFtcysnKSc7XG5cbiAgICAgc3dpdGNoIChhcGkpIHtcbiAgICAgICAgLy8gVE9ETzogYWRkIEFQSSBpbXBsZW1lbnRhdGlvblxuXG4gICAgICAgIGNhc2UgJ2NyZWF0ZWhlZGVyYW9iamVjdCc6XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlSGVkZXJhT2JqZWN0KHBhcmFtcyk7XG5cbiAgICAgICAgY2FzZSAnY2hlY2t0cmFuc2FjdGlvbic6XG4gICAgICAgICAgICByZXR1cm4gY2hlY2tUcmFuc2FjdGlvbih7Y29uZmlndXJhdGlvbiwgcGFyYW1zfSwgY2FsbGJhY2spO1xuXG4gICAgICAgIGNhc2UgJ2NyZWF0ZWNvbnRyYWN0b2JqZWN0JzpcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVDb250cmFjdE9iamVjdCh7Y29uZmlndXJhdGlvbiwgcGFyYW1zfSwgY2FsbGJhY2spO1xuXG4gICAgICAgIGNhc2UgJ2luaXQnOlxuICAgICAgICAgICAgcmV0dXJuIGluaXQoY29uZmlndXJhdGlvbiwgY2FsbGJhY2spO1xuXG4gICAgICAgIGNhc2UgJ3Rlc3QnOlxuICAgICAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgTm8gaGFuZGxlciBkZWZpbmVkIGZvciAke2FwaX1gKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGV4dGVuZE9iamVjdChhLCBiKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGIpXG4gICAgICAgIGlmIChiLmhhc093blByb3BlcnR5KGtleSkpIGFba2V5XSA9IGJba2V5XTtcbiAgICByZXR1cm4gYTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSGVkZXJhT2JqZWN0KHBhcmFtcykge1xuICAgIGxldCBvYmplY3QgPSBbJ3N1Ym1pc3Npb25ub2RlJywgJ3BheW1lbnRzZXJ2ZXInLCAncmVjaXBpZW50bGlzdCcsICdjb250ZW50aWQnLCAndHlwZScsICdtZW1vJywgJ2V4dGVuc2lvbmlkJywgJ3JlZGlyZWN0JywgJ3RpbWUnXTtcbiAgICBsZXQgSGVkZXJhb2JqZWN0ID0gJzxoZWRlcmEtbWljcm9wYXltZW50ICc7XG4gICAgZm9yICh2YXIgaSBpbiBvYmplY3QpIHtcbiAgICAgICAgbGV0IG5vZGUgPSBvYmplY3RbaV07XG4gICAgICAgIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkobm9kZSkpIHtcbiAgICAgICAgICAgIEhlZGVyYW9iamVjdCArPSBcImRhdGEtXCIgKyBub2RlICsgXCI9ICdcIiArIHBhcmFtc1tub2RlXSArIFwiJyAsIFwiICsgXCJcXG5cIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBIZWRlcmFvYmplY3QgKz0gJz48L2hlZGVyYS1taWNyb3BheW1lbnQ+JztcbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmFtc1snYXR0cklEJ10pO1xuICAgIGJvZHkuaW5uZXJIVE1MICs9IEhlZGVyYW9iamVjdDtcbiAgICByZXR1cm4gSGVkZXJhb2JqZWN0O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb250cmFjdE9iamVjdChwYXJhbXMpIHtcbiAgICBsZXQgX19jb25zdHJ1Y3QgPSBbJ2NvbnRyYWN0aWQnLCAnbWF4aW11bScsICdwYXltZW50c2VydmVyJywgJ3BhcmFtcycsICdtZW1vJywgJ2FiaScsICdyZWRpcmVjdCcsICdleHRlbnNpb25pZCddO1xuICAgIGxldCBvYmplY3QgPSB7XG4gICAgICAgIGNvbnRyYWN0aWQ6ICcwLjAuMTExMScsXG4gICAgICAgIG1heGltdW06ICc0MjIzNDIzNDMnLFxuICAgICAgICBwYXltZW50c2VydmVyOiBwYXJhbXMuY29uZmlndXJhdGlvbi5wYXltZW50c2VydmVyLFxuICAgICAgICBwYXJhbXM6IFtcIjg2OVwiLCBcIjEwMDAwMDAwMFwiLCBcIjIxNlwiLCBcIjI1M1wiLCBcIjI3XCIsIFwiMHgyMjZiMDg5NzZhZDBkZDk4MmFlYjZiMjFhNDRmM2VhY2FlNTc5NTY5YzM0ZTcxNzI1YWZmODAxYTJmZTY4NzM5XCIsIFwiMHgzMzNmOTkxZmEzYTg3MDU3NWY4MTk1NjllOWY3MmE3NzFlYTc5MDA3OGQ0NDhjYzg3ODkxMjBlZTE0YWJmM2M1XCJdLFxuICAgICAgICBtZW1vOiAnYTRhN2M0MzI5YWFiNGIxZmFjNDc0ZmY2ZjkzZDg1OGMnLFxuICAgICAgICBhYmk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIFwiY29uc3RhbnRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImlucHV0c1wiOiBbe1wibmFtZVwiOiBcInByb3BlcnR5SURcIiwgXCJ0eXBlXCI6IFwidWludDI0XCJ9LCB7XCJuYW1lXCI6IFwiYW1vdW50XCIsIFwidHlwZVwiOiBcInVpbnQyNTZcIn0sIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJ4XCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidWludDE2XCJcbiAgICAgICAgICAgIH0sIHtcIm5hbWVcIjogXCJ5XCIsIFwidHlwZVwiOiBcInVpbnQxNlwifSwge1wibmFtZVwiOiBcInZcIiwgXCJ0eXBlXCI6IFwidWludDhcIn0sIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJyXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwiXG4gICAgICAgICAgICB9LCB7XCJuYW1lXCI6IFwic1wiLCBcInR5cGVcIjogXCJieXRlczMyXCJ9XSxcbiAgICAgICAgICAgIFwibmFtZVwiOiBcImJ1eVByb3BlcnR5XCIsXG4gICAgICAgICAgICBcIm91dHB1dHNcIjogW3tcIm5hbWVcIjogXCJcIiwgXCJ0eXBlXCI6IFwic3RyaW5nXCJ9XSxcbiAgICAgICAgICAgIFwicGF5YWJsZVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJzdGF0ZU11dGFiaWxpdHlcIjogXCJwYXlhYmxlXCIsXG4gICAgICAgICAgICBcInR5cGVcIjogXCJmdW5jdGlvblwiXG4gICAgICAgIH0pLFxuICAgICAgICByZWRpcmVjdDogJ3tcIm5vblBheWluZ0FjY291bnRcIjogXCIvaW5zdWZmaWNpZW50LWFtb3VudC9cIixcIm5vQWNjb3VudFwiOiBcIi9hY2NvdW50LW5vdC1wYWlyZWRcIixcImhvbWVQYWdlXCI6IFwiL1wifScsXG4gICAgICAgIGV4dGVuc2lvbmlkOiAncGRqanBjb2xnbW1jaWZpanBlamtlbnBiYmltZWRwaWMnLFxuICAgIH07XG5cbiAgICBjb25zb2xlLmxvZyhKU09OLnBhcnNlKG9iamVjdC5hYmkpKTtcbiAgICBsZXQgZXh0ZW5kZWQgPSBleHRlbmRPYmplY3Qob2JqZWN0LCBwYXJhbXMucGFyYW1zKTtcbiAgICBjb25zb2xlLmxvZyhleHRlbmRlZCk7XG4gICAgbGV0IENvbnRyYWN0b2JqZWN0ID0gJzxoZWRlcmEtY29udHJhY3QgJztcbiAgICBmb3IgKHZhciBpIGluIF9fY29uc3RydWN0KSB7XG4gICAgICAgIGxldCBub2RlID0gX19jb25zdHJ1Y3RbaV07XG4gICAgICAgIGlmIChleHRlbmRlZC5oYXNPd25Qcm9wZXJ0eShub2RlKSkge1xuICAgICAgICAgICAgQ29udHJhY3RvYmplY3QgKz0gXCJkYXRhLVwiICsgbm9kZSArIFwiPSAnXCIgKyBleHRlbmRlZFtub2RlXSArIFwiJyBcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBDb250cmFjdG9iamVjdCArPSAnPjwvaGVkZXJhLWNvbnRyYWN0Pic7XG4gICAgY29uc29sZS5sb2coQ29udHJhY3RvYmplY3QpO1xuXG4gICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChleHRlbmRlZFsnYXR0cklEJ10pO1xuICAgIGJvZHkuaW5uZXJIVE1MICs9IENvbnRyYWN0b2JqZWN0O1xuICAgIC8vY29uc29sZS5sb2coKEhlZGVyYW9iamVjdCkpXG4gICAgcmV0dXJuIENvbnRyYWN0b2JqZWN0O1xuICAgIC8vY2FsbGJhY2soSGVkZXJhb2JqZWN0KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tUcmFuc2FjdGlvbihwYXJhbXMpIHtcblxuICAgIGxldCBtZW1vX2lkID0gcGFyYW1zLmNvbmZpZ3VyYXRpb24ubWVtbztcbiAgICBsZXQgdXJsID0gcHJvZHVjdGlvbiA/IFwiaHR0cHM6Ly9tcHMuaGFzaGluZ3N5c3RlbXMuY29tXCIgOiAnaHR0cDovL2xvY2FsaG9zdDo5OTk5JztcbiAgICBsZXQgc3RydWN0dXJlID0ge1xuICAgICAgICBiYXNldXJsOiB1cmwsXG4gICAgICAgIG1lbW9faWQ6IG1lbW9faWQsXG4gICAgICAgIHJlY2VpdmVyX2lkOiAnJyxcbiAgICAgICAgc3VjY2VzczogJy9zdWNjZXNzJyxcbiAgICAgICAgZmFpbHVyZTogJy9wYXltZW50LWZhaWxlZCcsXG4gICAgICAgIHRpbWVvdXQ6IDMwMDAsXG4gICAgICAgIGxpbWl0OiAxXG4gICAgfTtcblxuICAgIGZvciAodmFyIGtleSBpbiBwYXJhbXMucGFyYW1zKSB7XG4gICAgICAgIGlmIChwYXJhbXMucGFyYW1zLmhhc093blByb3BlcnR5KGtleSkgJiYgcGFyYW1zLnBhcmFtc1trZXldKSB7XG4gICAgICAgICAgICBzdHJ1Y3R1cmVba2V5XSA9IHBhcmFtcy5wYXJhbXNba2V5XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdHJ1Y3R1cmUucmVjZWl2ZXJfaWQgJiYgc3RydWN0dXJlLm1lbW9faWQpIHtcbiAgICAgICAgVVJMID0gc3RydWN0dXJlLmJhc2V1cmwgKyBcIi9jaGVjay9cIiArIHN0cnVjdHVyZS5yZWNlaXZlcl9pZCArIFwiL1wiICsgc3RydWN0dXJlLm1lbW9faWRcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZihzdHJ1Y3R1cmUudGltZXN0YW1wKVxuICAgICAgICAgICAgVVJMID0gc3RydWN0dXJlLmJhc2V1cmwgKyBcIi9tZW1vL1wiICsgc3RydWN0dXJlLm1lbW9faWQgKyAnP2xpbWl0PScgKyBzdHJ1Y3R1cmUubGltaXQgKyAnJnRpbWVzdGFtcD0nK3N0cnVjdHVyZS50aW1lc3RhbXA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIFVSTCA9IHN0cnVjdHVyZS5iYXNldXJsICsgXCIvbWVtby9cIiArIHN0cnVjdHVyZS5tZW1vX2lkICsgJz9saW1pdD0nICsgc3RydWN0dXJlLmxpbWl0O1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKHN0cnVjdHVyZS50aW1lb3V0KTtcbiAgICAvL3NldFRpbWVvdXQocGVyZm9ybVJlcXVlc3Qoc3RydWN0dXJlKSwgc3RydWN0dXJlLnRpbWVvdXQpXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBlcmZvcm1SZXF1ZXN0KHN0cnVjdHVyZSk7XG4gICAgfSwgc3RydWN0dXJlLnRpbWVvdXQpO1xufVxuXG52YXIgcGVyZm9ybVJlcXVlc3QgPSBmdW5jdGlvbiAoc3RydWN0dXJlKSB7XG4gICAgY29uc29sZS5sb2coc3RydWN0dXJlKVxuICAgIHZhciB4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UucmVzcG9uc2UubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UucmVzcG9uc2UubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLyp3aW5kb3cub3BlbihcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5vcmlnaW4gKyBzdHJ1Y3R1cmUuc3VjY2VzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdfYmxhbmsnXG4gICAgICAgICAgICAgICAgICAgICk7Ki9cbiAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2UucmVzcG9uc2VbMF0ubm9kZXByZWNoZWNrPT0wKVxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uod2luZG93Lm9yaWdpbiArIHN0cnVjdHVyZS5zdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocHJlY2hlY2tlcihyZXNwb25zZS5yZXNwb25zZVswXS5ub2RlcHJlY2hlY2spKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cub3JpZ2luICsgc3RydWN0dXJlLmZhaWx1cmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL3dpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBzdHJ1Y3R1cmUuc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgLy9jYWxsYmFjayhudWxsLCB0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9jYWxsYmFjayh7ZXJyb3I6IHRydWUsIGRhdGE6IHRoaXMucmVzcG9uc2V9LCBudWxsKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cub3JpZ2luICsgc3RydWN0dXJlLmZhaWx1cmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICB4aHR0cC5vcGVuKFwiR0VUXCIsIFVSTCwgdHJ1ZSk7XG4gICAgeGh0dHAuc2VuZCgpO1xufTtcblxuZnVuY3Rpb24gaW5pdChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgbGV0IHJlc3BvbmVzZSA9IHtcbiAgICAgICAgJ2lzY2hyb21lJzogdHJ1ZSxcbiAgICAgICAgJ2FjY291bnRQYWlyZWQnOiBmYWxzZSxcbiAgICAgICAgJ2lzbW9iaWxlJzogbnVsbCxcbiAgICAgICAgJ3ZhbGlkQnJvd3Nlcic6IG51bGwsXG4gICAgICAgICdleHRlbnNpb25JbnN0YWxsZWQnOiBudWxsLFxuICAgICAgICAnYWNjZXNzVG9BY2NvdW50cyc6IG51bGwsXG4gICAgICAgICdhY2NvdW50SWQnOiBudWxsLFxuICAgICAgICAnc3VibWlzc2lvbk5vZGUnOiBwYXJhbXMuc3VibWlzc2lvbm5vZGVcbiAgICB9O1xuICAgIGxldCBjaGVja0lzQ2hyb21lID0gaXNDaHJvbWUoKTtcbiAgICByZXNwb25lc2UuaXNjaHJvbWUgPSBjaGVja0lzQ2hyb21lO1xuICAgIGxldCBtb2IgPSBkZXRlY3Rtb2IoKTtcbiAgICByZXNwb25lc2UuaXNtb2JpbGUgPSBtb2I7XG4gICAgZGV0ZWN0KHBhcmFtcy5leHRlbnNpb25pZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXNwb25lc2UuZXh0ZW5zaW9uSW5zdGFsbGVkID0gZmFsc2U7XG4gICAgICAgIGNhbGxiYWNrKG51bGwscmVzcG9uZXNlKTtcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlc3BvbmVzZS5leHRlbnNpb25JbnN0YWxsZWQgPSB0cnVlO1xuICAgICAgICBsZXQgb2JqZWN0ID0gY3JlYXRlSGVkZXJhT2JqZWN0KHBhcmFtcyk7XG4gICAgICAgIGxldCB1cmwgPSBwcm9kdWN0aW9uID8gXCJodHRwczovL21wcy5oYXNoaW5nc3lzdGVtcy5jb21cIiA6ICdodHRwOi8vbG9jYWxob3N0Ojk5OTknO1xuICAgICAgICBVUkwgPSB1cmwgKyBcIi9tZW1vL1wiICsgcGFyYW1zLm1lbW87XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhamF4cmVzcCA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhamF4cmVzcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhamF4cmVzcC5yZXNwb25zZS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwcmVjaGVja2VyKGFqYXhyZXNwLnJlc3BvbnNlWzBdLm5vZGVwcmVjaGVjaykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbmVzZS5hY2NvdW50SWQgPSBhamF4cmVzcC5yZXNwb25zZVswXS5zZW5kZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uZXNlLmFjY291bnRQYWlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbmVzZS5hY2Nlc3NUb0FjY291bnRzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLHJlc3BvbmVzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXNwb25lc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uZXNlLmFjY291bnRQYWlyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbmVzZS5hY2Nlc3NUb0FjY291bnRzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLHJlc3BvbmVzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGh0dHAub3BlbihcIkdFVFwiLCBVUkwsIHRydWUpO1xuICAgICAgICAgICAgeGh0dHAuc2VuZCgpO1xuICAgICAgICB9LDUwMDApO1xuICAgICAgICAvL2NhbGxiYWNrKG51bGwscmVzcG9uZXNlKTtcbiAgICB9KTtcblxufVxuXG5mdW5jdGlvbiBkZXRlY3Rtb2IoKSB7XG4gICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0FuZHJvaWQvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvd2ViT1MvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBob25lL2kpXG4gICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQYWQvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBvZC9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9CbGFja0JlcnJ5L2kpXG4gICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1dpbmRvd3MgUGhvbmUvaSlcbiAgICApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuXG5cbmFwcCh3aW5kb3cpO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsImV4cG9ydCBmdW5jdGlvbiBwaW5nKCkge1xuICAgIHJldHVybiAncG9uZyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmVjaGVja2VyKG4pIHtcbiAgICBsZXQganNvbiA9IHswOiBcIk9LXCIsIDE6IFwiSU5WQUxJRF9UUkFOU0FDVElPTlwiLCAyOiBcIlBBWUVSX0FDQ09VTlRfTk9UX0ZPVU5EXCIsIDM6IFwiSU5WQUxJRF9OT0RFX0FDQ09VTlRcIiwgNDogXCJUUkFOU0FDVElPTl9FWFBJUkVEXCIsIDU6IFwiSU5WQUxJRF9UUkFOU0FDVElPTl9TVEFSVFwiLCA2OiBcIklOVkFMSURfVFJBTlNBQ1RJT05fRFVSQVRJT05cIiwgNzogXCJJTlZBTElEX1NJR05BVFVSRVwiLCA4OiBcIk1FTU9fVE9PX0xPTkdcIiwgOTogXCJJTlNVRkZJQ0lFTlRfVFhfRkVFXCIsIDEwOiBcIklOU1VGRklDSUVOVF9QQVlFUl9CQUxBTkNFXCIsIDExOiBcIkRVUExJQ0FURV9UUkFOU0FDVElPTlwiLCAxMjogXCJCVVNZXCIsIDEzOiBcIk5PVF9TVVBQT1JURURcIiwgMTQ6IFwiSU5WQUxJRF9GSUxFX0lEXCIsIDE1OiBcIklOVkFMSURfQUNDT1VOVF9JRFwiLCAxNjogXCJJTlZBTElEX0NPTlRSQUNUX0lEXCIsIDE3OiBcIklOVkFMSURfVFJBTlNBQ1RJT05fSURcIiwgMTg6IFwiUkVDRUlQVF9OT1RfRk9VTkRcIiwgMTk6IFwiUkVDT1JEX05PVF9GT1VORFwiLCAyMDogXCJJTlZBTElEX1NPTElESVRZX0lEXCIsIDIxOiBcIlVOS05PV05cIiwgMjI6IFwiU1VDQ0VTU1wiLCAyMzogXCJGQUlMX0lOVkFMSURcIiwgMjQ6IFwiRkFJTF9GRUVcIiwgMjU6IFwiRkFJTF9CQUxBTkNFXCIsIDI2OiBcIktFWV9SRVFVSVJFRFwiLCAyNzogXCJCQURfRU5DT0RJTkdcIiwgMjg6IFwiSU5TVUZGSUNJRU5UX0FDQ09VTlRfQkFMQU5DRVwiLCAyOTogXCJJTlZBTElEX1NPTElESVRZX0FERFJFU1NcIiwgMzA6IFwiSU5TVUZGSUNJRU5UX0dBU1wiLCAzMTogXCJDT05UUkFDVF9TSVpFX0xJTUlUX0VYQ0VFREVEXCIsIDMyOiBcIkxPQ0FMX0NBTExfTU9ESUZJQ0FUSU9OX0VYQ0VQVElPTlwiLCAzMzogXCJDT05UUkFDVF9SRVZFUlRfRVhFQ1VURURcIiwgMzQ6IFwiQ09OVFJBQ1RfRVhFQ1VUSU9OX0VYQ0VQVElPTlwiLCAzNTogXCJJTlZBTElEX1JFQ0VJVklOR19OT0RFX0FDQ09VTlRcIiwgMzY6IFwiTUlTU0lOR19RVUVSWV9IRUFERVJcIiwgMzc6IFwiQUNDT1VOVF9VUERBVEVfRkFJTEVEXCIsIDM4OiBcIklOVkFMSURfS0VZX0VOQ09ESU5HXCIsIDM5OiBcIk5VTExfU09MSURJVFlfQUREUkVTU1wiLCA0MDogXCJDT05UUkFDVF9VUERBVEVfRkFJTEVEXCIsIDQxOiBcIklOVkFMSURfUVVFUllfSEVBREVSXCIsIDQyOiBcIklOVkFMSURfRkVFX1NVQk1JVFRFRFwiLCA0MzogXCJJTlZBTElEX1BBWUVSX1NJR05BVFVSRVwiLCA0NDogXCJLRVlfTk9UX1BST1ZJREVEXCIsIDQ1OiBcIklOVkFMSURfRVhQSVJBVElPTl9USU1FXCIsIDQ2OiBcIk5PX1dBQ0xfS0VZXCIsIDQ3OiBcIkZJTEVfQ09OVEVOVF9FTVBUWVwiLCA0ODogXCJJTlZBTElEX0FDQ09VTlRfQU1PVU5UU1wiLCA0OTogXCJFTVBUWV9UUkFOU0FDVElPTl9CT0RZXCIsIDUwOiBcIklOVkFMSURfVFJBTlNBQ1RJT05fQk9EWVwiLCA1MTogXCJJTlZBTElEX1NJR05BVFVSRV9UWVBFX01JU01BVENISU5HX0tFWVwiLCA1MjogXCJJTlZBTElEX1NJR05BVFVSRV9DT1VOVF9NSVNNQVRDSElOR19LRVlcIiwgNTM6IFwiRU1QVFlfQ0xBSU1fQk9EWVwiLCA1NDogXCJFTVBUWV9DTEFJTV9IQVNIXCIsIDU1OiBcIkVNUFRZX0NMQUlNX0tFWVNcIiwgNTY6IFwiSU5WQUxJRF9DTEFJTV9IQVNIX1NJWkVcIiwgNTc6IFwiRU1QVFlfUVVFUllfQk9EWVwiLCA1ODogXCJFTVBUWV9DTEFJTV9RVUVSWVwiLCA1OTogXCJDTEFJTV9OT1RfRk9VTkRcIiwgNjA6IFwiQUNDT1VOVF9JRF9ET0VTX05PVF9FWElTVFwiLCA2MTogXCJDTEFJTV9BTFJFQURZX0VYSVNUU1wiLCA2MjogXCJJTlZBTElEX0ZJTEVfV0FDTFwiLCA2MzogXCJTRVJJQUxJWkFUSU9OX0ZBSUxFRFwiLCA2NDogXCJUUkFOU0FDVElPTl9PVkVSU0laRVwiLCA2NTogXCJUUkFOU0FDVElPTl9UT09fTUFOWV9MQVlFUlNcIiwgNjY6IFwiQ09OVFJBQ1RfREVMRVRFRFwiLCA2NzogXCJQTEFURk9STV9OT1RfQUNUSVZFXCIsIDY4OiBcIktFWV9QUkVGSVhfTUlTTUFUQ0hcIiwgNjk6IFwiUExBVEZPUk1fVFJBTlNBQ1RJT05fTk9UX0NSRUFURURcIiwgNzA6IFwiSU5WQUxJRF9SRU5FV0FMX1BFUklPRFwiLCA3MTogXCJJTlZBTElEX1BBWUVSX0FDQ09VTlRfSURcIiwgNzI6IFwiQUNDT1VOVF9ERUxFVEVEXCIsIDczOiBcIkZJTEVfREVMRVRFRFwiLCA3NDogXCJBQ0NPVU5UX1JFUEVBVEVEX0lOX0FDQ09VTlRfQU1PVU5UU1wiLCA3NTogXCJTRVRUSU5HX05FR0FUSVZFX0FDQ09VTlRfQkFMQU5DRVwiLCA3NjogXCJPQlRBSU5FUl9SRVFVSVJFRFwiLCA3NzogXCJPQlRBSU5FUl9TQU1FX0NPTlRSQUNUX0lEXCIsIDc4OiBcIk9CVEFJTkVSX0RPRVNfTk9UX0VYSVNUXCIsIDc5OiBcIk1PRElGWUlOR19JTU1VVEFCTEVfQ09OVFJBQ1RcIiwgODA6IFwiRklMRV9TWVNURU1fRVhDRVBUSU9OXCIsIDgxOiBcIkFVVE9SRU5FV19EVVJBVElPTl9OT1RfSU5fUkFOR0VcIiwgODI6IFwiRVJST1JfREVDT0RJTkdfQllURVNUUklOR1wiLCA4MzogXCJDT05UUkFDVF9GSUxFX0VNUFRZXCIsIDg0OiBcIkNPTlRSQUNUX0JZVEVDT0RFX0VNUFRZXCIsIDg1OiBcIklOVkFMSURfSU5JVElBTF9CQUxBTkNFXCIsIDg2OiBcIklOVkFMSURfUkVDRUlWRV9SRUNPUkRfVEhSRVNIT0xEXCIsIDg3OiBcIklOVkFMSURfU0VORF9SRUNPUkRfVEhSRVNIT0xEXCIsIDg4OiBcIkFDQ09VTlRfSVNfTk9UX0dFTkVTSVNfQUNDT1VOVFwifVxuICAgICByZXR1cm4ganNvbltuXTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy5qcyJdLCJzb3VyY2VSb290IjoiIn0=