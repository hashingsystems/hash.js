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

var supportedAPI = ['init', 'test', 'createhederaobject', 'checktransaction', 'createcontractobject', 'readynesscheck']; // enlist all methods supported by API (e.g. `mw('event', 'user-login');`)

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
    memo: Date.now() //redirect:'{ "nonPayingAccount": "/insufficient-amount/", "noAccount": "/account-not-paired/", "homePage": "/" }',

  }; // all methods that were called till now and stored in queue
  // needs to be called now

  var globalObject = window[window['HASH-JS']];
  var queue = globalObject.q;

  if (queue) {
    for (var i = 0; i < queue.length; i++) {
      if (typeof queue[i][0] !== 'undefined' && queue[i][0].toLowerCase() == 'init') {
        configurations = extendObject(configurations, queue[i][1]);
        createHederaObject(configurations);
        console.log('HASH-JS started', configurations);
        checkForExtension(configurations);
      } else if (typeof queue[i][0] !== 'undefined' && queue[i][0].toLowerCase() == 'createcontractobject') {
        configurations = extendObject(configurations, queue[i][1]);
        apiHandler(configurations, queue[i][0], queue[i][1], queue[i][2]);
        checkForExtension(configurations);
      } else {
        configurations = extendObject(configurations, queue[i][1]);
        apiHandler(configurations, queue[i][0], queue[i][1], queue[i][2]);
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

    case 'readynesscheck':
      return readynessCheck(configuration, callback);

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
    URL = structure.baseurl + "/memo/" + structure.memo_id + '?limit=' + structure.limit;
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
          window.location.replace(window.origin + structure.success);
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

function readynessCheck(params, callback) {
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
            responese.accountId = ajaxresp.response.sender;
            responese.accountPaired = true;
            responese.accessToAccounts = true;
            callback(null, responese);
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
function ping() {
  return 'pong';
}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjM5Mjc3Y2E4MWYyODcyZWVhMzAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIl0sIm5hbWVzIjpbInN1cHBvcnRlZEFQSSIsInByb2R1Y3Rpb24iLCJhcHAiLCJ3aW5kb3ciLCJjb25zb2xlIiwibG9nIiwiY29uZmlndXJhdGlvbnMiLCJwYXltZW50c2VydmVyIiwiZXh0ZW5zaW9uaWQiLCJlcnJvciIsInR5cGUiLCJ0aW1lIiwiRGF0ZSIsIm5vdyIsInJlZGlyZWN0IiwiaWQiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwic3VibWlzc2lvbm5vZGUiLCJtZW1vIiwiZ2xvYmFsT2JqZWN0IiwicXVldWUiLCJxIiwiaSIsImxlbmd0aCIsInRvTG93ZXJDYXNlIiwiZXh0ZW5kT2JqZWN0IiwiY3JlYXRlSGVkZXJhT2JqZWN0IiwiY2hlY2tGb3JFeHRlbnNpb24iLCJhcGlIYW5kbGVyIiwiaXNDaHJvbWUiLCJyZWRpcmVjdFRvRXJyb3IiLCJ0YWdzIiwiYW1vdW50IiwiRVhURU5TSU9OX0lEIiwiZGV0ZWN0IiwicmVzcG9uc2UiLCJyZWNvcmRSZXNwb25zZSIsImV4dGVuc2lvbklkIiwibm90SW5zdGFsbGVkQ2FsbGJhY2siLCJpbnN0YWxsZWRDYWxsYmFjayIsImltZyIsIkltYWdlIiwib25lcnJvciIsIm9ubG9hZCIsInNyYyIsInJlcyIsImJvZHkiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwiZXJyIiwicmVwbGFjZSIsIm9yaWdpbiIsImNvbmZpZ3VyYXRpb24iLCJhcGkiLCJwYXJhbXMiLCJjYWxsYmFjayIsIkVycm9yIiwiaW5kZXhPZiIsImNoZWNrVHJhbnNhY3Rpb24iLCJjcmVhdGVDb250cmFjdE9iamVjdCIsInJlYWR5bmVzc0NoZWNrIiwid2FybiIsImEiLCJiIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJvYmplY3QiLCJIZWRlcmFvYmplY3QiLCJub2RlIiwiZ2V0RWxlbWVudEJ5SWQiLCJfX2NvbnN0cnVjdCIsImNvbnRyYWN0aWQiLCJtYXhpbXVtIiwiYWJpIiwiSlNPTiIsInN0cmluZ2lmeSIsInBhcnNlIiwiZXh0ZW5kZWQiLCJDb250cmFjdG9iamVjdCIsIm1lbW9faWQiLCJ1cmwiLCJzdHJ1Y3R1cmUiLCJiYXNldXJsIiwicmVjZWl2ZXJfaWQiLCJzdWNjZXNzIiwiZmFpbHVyZSIsInRpbWVvdXQiLCJsaW1pdCIsIlVSTCIsInNldFRpbWVvdXQiLCJwZXJmb3JtUmVxdWVzdCIsInhodHRwIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwib3BlbiIsInNlbmQiLCJyZXNwb25lc2UiLCJjaGVja0lzQ2hyb21lIiwiaXNjaHJvbWUiLCJtb2IiLCJkZXRlY3Rtb2IiLCJpc21vYmlsZSIsImV4dGVuc2lvbkluc3RhbGxlZCIsImFqYXhyZXNwIiwiYWNjb3VudElkIiwic2VuZGVyIiwiYWNjb3VudFBhaXJlZCIsImFjY2Vzc1RvQWNjb3VudHMiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJtYXRjaCIsInBpbmciXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM3REE7QUFBQTtBQUFB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QyxLQUFwQixDQUEwQixPQUExQixDQUpILElBS0dGLFNBQVMsQ0FBQ0MsU0FBVixDQUFvQkMsS0FBcEIsQ0FBMEIsYUFBMUIsQ0FMSCxJQU1HRixTQUFTLENBQUNDLFNBQVYsQ0FBb0JDLEtBQXBCLENBQTBCLGdCQUExQixDQU5QLEVBT0U7QUFDRSxXQUFPLElBQVA7QUFDSCxHQVRELE1BU087QUFDSCxXQUFPLEtBQVA7QUFDSDtBQUNKOztBQUdEaEgsR0FBRyxDQUFDQyxNQUFELENBQUgsQzs7Ozs7OztBQzNVQTtBQUFPLFNBQVNnSCxJQUFULEdBQWdCO0FBQ25CLFNBQU8sTUFBUDtBQUNILEMiLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMjM5Mjc3Y2E4MWYyODcyZWVhMzAiLCJpbXBvcnQge1xuICAgIHBpbmdcbn0gZnJvbSAnLi9zZXJ2aWNlcydcblxuY29uc3Qgc3VwcG9ydGVkQVBJID0gWydpbml0JywgJ3Rlc3QnLCAnY3JlYXRlaGVkZXJhb2JqZWN0JywgJ2NoZWNrdHJhbnNhY3Rpb24nLCAnY3JlYXRlY29udHJhY3RvYmplY3QnLCAncmVhZHluZXNzY2hlY2snXTsgLy8gZW5saXN0IGFsbCBtZXRob2RzIHN1cHBvcnRlZCBieSBBUEkgKGUuZy4gYG13KCdldmVudCcsICd1c2VyLWxvZ2luJyk7YClcbi8qKlxuIFRoZSBtYWluIGVudHJ5IG9mIHRoZSBhcHBsaWNhdGlvblxuICovXG5jb25zdCBwcm9kdWN0aW9uID0gdHJ1ZTtcblxuZnVuY3Rpb24gYXBwKHdpbmRvdykge1xuICAgIGNvbnNvbGUubG9nKCdIQVNILUpTIHN0YXJ0aW5nJyk7XG4gICAgbGV0IGNvbmZpZ3VyYXRpb25zID0ge1xuICAgICAgICBwYXltZW50c2VydmVyOiBwcm9kdWN0aW9uID8gXCJodHRwczovL21wcy5oYXNoaW5nc3lzdGVtcy5jb21cIiA6ICdodHRwOi8vbG9jYWxob3N0Ojk5OTknLFxuICAgICAgICBleHRlbnNpb25pZDogXCJsaWdwYW9uZGFhYmNsZmlnYWdjaWZvYmFlbGVtaWVuYVwiLFxuICAgICAgICBlcnJvcjogXCIvbm8tZXh0ZW5zaW9uXCIsXG4gICAgICAgIHR5cGU6IFwiYXJ0aWNsZVwiLFxuICAgICAgICB0aW1lOiBEYXRlLm5vdygpLFxuICAgICAgICByZWRpcmVjdDogJ3sgXCJub25QYXlpbmdBY2NvdW50XCI6IFwiL2luc3VmZmljaWVudC1hbW91bnQvXCIsIFwibm9BY2NvdW50XCI6IFwiL2FjY291bnQtbm90LXBhaXJlZC9cIiwgXCJob21lUGFnZVwiOiBcIi9cIn0nLFxuICAgICAgICAvLyB0aGlzIG1pZ2h0IG1ha2UgYSBnb29kIGRlZmF1bHQgaWQgZm9yIHRoZSBjb250ZW50XG4gICAgICAgIGlkOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgIHN1Ym1pc3Npb25ub2RlOiBcIjAuMC4xMVwiLFxuICAgICAgICBtZW1vOiBEYXRlLm5vdygpLFxuICAgICAgICAvL3JlZGlyZWN0Oid7IFwibm9uUGF5aW5nQWNjb3VudFwiOiBcIi9pbnN1ZmZpY2llbnQtYW1vdW50L1wiLCBcIm5vQWNjb3VudFwiOiBcIi9hY2NvdW50LW5vdC1wYWlyZWQvXCIsIFwiaG9tZVBhZ2VcIjogXCIvXCIgfScsXG4gICAgfTtcbiAgICAvLyBhbGwgbWV0aG9kcyB0aGF0IHdlcmUgY2FsbGVkIHRpbGwgbm93IGFuZCBzdG9yZWQgaW4gcXVldWVcbiAgICAvLyBuZWVkcyB0byBiZSBjYWxsZWQgbm93XG4gICAgbGV0IGdsb2JhbE9iamVjdCA9IHdpbmRvd1t3aW5kb3dbJ0hBU0gtSlMnXV07XG4gICAgbGV0IHF1ZXVlID0gZ2xvYmFsT2JqZWN0LnE7XG4gICAgaWYgKHF1ZXVlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcXVldWVbaV1bMF0gIT09ICd1bmRlZmluZWQnICYmIHF1ZXVlW2ldWzBdLnRvTG93ZXJDYXNlKCkgPT0gJ2luaXQnKSB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbnMgPSBleHRlbmRPYmplY3QoY29uZmlndXJhdGlvbnMsIHF1ZXVlW2ldWzFdKTtcbiAgICAgICAgICAgICAgICBjcmVhdGVIZWRlcmFPYmplY3QoY29uZmlndXJhdGlvbnMpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdIQVNILUpTIHN0YXJ0ZWQnLCBjb25maWd1cmF0aW9ucyk7XG4gICAgICAgICAgICAgICAgY2hlY2tGb3JFeHRlbnNpb24oY29uZmlndXJhdGlvbnMpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBxdWV1ZVtpXVswXSAhPT0gJ3VuZGVmaW5lZCcgJiYgcXVldWVbaV1bMF0udG9Mb3dlckNhc2UoKSA9PSAnY3JlYXRlY29udHJhY3RvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbnMgPSBleHRlbmRPYmplY3QoY29uZmlndXJhdGlvbnMsIHF1ZXVlW2ldWzFdKTtcbiAgICAgICAgICAgICAgICBhcGlIYW5kbGVyKGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVswXSwgcXVldWVbaV1bMV0sIHF1ZXVlW2ldWzJdKTtcbiAgICAgICAgICAgICAgICBjaGVja0ZvckV4dGVuc2lvbihjb25maWd1cmF0aW9ucylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbnMgPSBleHRlbmRPYmplY3QoY29uZmlndXJhdGlvbnMsIHF1ZXVlW2ldWzFdKTtcbiAgICAgICAgICAgICAgICBhcGlIYW5kbGVyKGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVswXSwgcXVldWVbaV1bMV0sIHF1ZXVlW2ldWzJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBvdmVycmlkZSB0ZW1wb3JhcnkgKHVudGlsIHRoZSBhcHAgbG9hZGVkKSBoYW5kbGVyXG4gICAgLy8gZm9yIHdpZGdldCdzIEFQSSBjYWxsc1xuICAgIGdsb2JhbE9iamVjdCA9IGFwaUhhbmRsZXI7XG4gICAgZ2xvYmFsT2JqZWN0LmNvbmZpZ3VyYXRpb25zID0gY29uZmlndXJhdGlvbnM7XG59XG5cbmZ1bmN0aW9uIGNoZWNrRm9yRXh0ZW5zaW9uKGNvbmZpZ3VyYXRpb25zKSB7XG4gICAgaWYgKCFpc0Nocm9tZSgpKSB7XG4gICAgICAgIHJlZGlyZWN0VG9FcnJvcignL2lzbm90Q2hyb21lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHRhZ3MgPSBjb25maWd1cmF0aW9ucztcbiAgICAgICAgLy8gaWYgdGFncy5hbW91bnQgaXMgbnVsbCBvciB1bmRlZmluZWQsIHdlIHNob3VsZCBhc3N1bWUgdGhhdCB0aGlzIGlzIGEgZnJlZSBwYWdlIGFuZCBkbyBub3RoaW5nIG1vcmVcbiAgICAgICAgaWYgKHRhZ3MuYW1vdW50ID09PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3QgRVhURU5TSU9OX0lEID0gdGFncy5leHRlbnNpb25pZDtcblxuICAgICAgICBkZXRlY3QoRVhURU5TSU9OX0lELCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZWRpcmVjdFRvRXJyb3IodGFncy5lcnJvcik7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2RldGVjdDogdXNlciBoYXMgZXh0ZW5zaW9uIGluc3RhbGxlZCcpO1xuICAgICAgICAgICAgcmVjb3JkUmVzcG9uc2UocmVzcG9uc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKGNocm9tZS5ydW50aW1lLmNvbm5lY3QoRVhURU5TSU9OX0lELCd2ZXJzaW9uJykpO1xuICAgICAgICAvKmNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKEVYVEVOU0lPTl9JRCwgJ3ZlcnNpb24nLCByZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZWRpcmVjdFRvRXJyb3IodGFncy5lcnJvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlY29yZFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkqL1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZGV0ZWN0KGV4dGVuc2lvbklkLCBub3RJbnN0YWxsZWRDYWxsYmFjaywgaW5zdGFsbGVkQ2FsbGJhY2spIHtcbiAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLm9uZXJyb3IgPSBub3RJbnN0YWxsZWRDYWxsYmFjaztcbiAgICBpbWcub25sb2FkID0gaW5zdGFsbGVkQ2FsbGJhY2soJ2luc3RhbGxlZCcpO1xuICAgIGltZy5zcmMgPSAnY2hyb21lLWV4dGVuc2lvbjovLycgKyBleHRlbnNpb25JZCArICcvaWNvbnMvaWNvbjE2LnBuZyc7XG59XG5cbmZ1bmN0aW9uIHJlY29yZFJlc3BvbnNlKHJlcykge1xuICAgIGlmICh0eXBlb2YgcmVzICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKTtcbiAgICAgICAgYm9keS5pbm5lckhUTUwgKz0gJzxkaXYgc3R5bGU9XCJ3aWR0aDoxMDAlO2hlaWdodDo1JTtvcGFjaXR5OjAuMzt6LWluZGV4OjEwMDtiYWNrZ3JvdW5kOnllbGxvdztcIj4nICsgcmVzICsgJzwvZGl2Pic7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHJlZGlyZWN0VG9FcnJvcihlcnIpIHtcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICE9IGVycikge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cub3JpZ2luICsgZXJyKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzQ2hyb21lKCkge1xuICAgIHJldHVybiAnY2hyb21lJyBpbiB3aW5kb3dcbn1cblxuLyoqXG4gTWV0aG9kIHRoYXQgaGFuZGxlcyBhbGwgQVBJIGNhbGxzXG4gKi9cbmZ1bmN0aW9uIGFwaUhhbmRsZXIoY29uZmlndXJhdGlvbiwgYXBpLCBwYXJhbXMsIGNhbGxiYWNrID0gbnVsbCkge1xuICAgIGlmICghYXBpKSB0aHJvdyBFcnJvcignQVBJIG1ldGhvZCByZXF1aXJlZCcpO1xuICAgIGFwaSA9IGFwaS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChzdXBwb3J0ZWRBUEkuaW5kZXhPZihhcGkpID09PSAtMSkgdGhyb3cgRXJyb3IoYE1ldGhvZCAke2FwaX0gaXMgbm90IHN1cHBvcnRlZGApO1xuICAgIGNvbnNvbGUubG9nKGBIYW5kbGluZyBBUEkgY2FsbCAke2FwaX1gLCBwYXJhbXMpO1xuICAgIHN3aXRjaCAoYXBpKSB7XG4gICAgICAgIC8vIFRPRE86IGFkZCBBUEkgaW1wbGVtZW50YXRpb25cblxuICAgICAgICBjYXNlICdjcmVhdGVoZWRlcmFvYmplY3QnOlxuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUhlZGVyYU9iamVjdChwYXJhbXMpO1xuXG4gICAgICAgIGNhc2UgJ2NoZWNrdHJhbnNhY3Rpb24nOlxuICAgICAgICAgICAgcmV0dXJuIGNoZWNrVHJhbnNhY3Rpb24oe2NvbmZpZ3VyYXRpb24sIHBhcmFtc30sIGNhbGxiYWNrKTtcblxuICAgICAgICBjYXNlICdjcmVhdGVjb250cmFjdG9iamVjdCc6XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlQ29udHJhY3RPYmplY3Qoe2NvbmZpZ3VyYXRpb24sIHBhcmFtc30sIGNhbGxiYWNrKTtcblxuICAgICAgICBjYXNlICdyZWFkeW5lc3NjaGVjayc6XG4gICAgICAgICAgICByZXR1cm4gcmVhZHluZXNzQ2hlY2soY29uZmlndXJhdGlvbiwgY2FsbGJhY2spO1xuXG4gICAgICAgIGNhc2UgJ3Rlc3QnOlxuICAgICAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgTm8gaGFuZGxlciBkZWZpbmVkIGZvciAke2FwaX1gKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGV4dGVuZE9iamVjdChhLCBiKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGIpXG4gICAgICAgIGlmIChiLmhhc093blByb3BlcnR5KGtleSkpIGFba2V5XSA9IGJba2V5XTtcbiAgICByZXR1cm4gYTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSGVkZXJhT2JqZWN0KHBhcmFtcykge1xuICAgIGxldCBvYmplY3QgPSBbJ3N1Ym1pc3Npb25ub2RlJywgJ3BheW1lbnRzZXJ2ZXInLCAncmVjaXBpZW50bGlzdCcsICdjb250ZW50aWQnLCAndHlwZScsICdtZW1vJywgJ2V4dGVuc2lvbmlkJywgJ3JlZGlyZWN0JywgJ3RpbWUnXTtcbiAgICBsZXQgSGVkZXJhb2JqZWN0ID0gJzxoZWRlcmEtbWljcm9wYXltZW50ICc7XG4gICAgZm9yICh2YXIgaSBpbiBvYmplY3QpIHtcbiAgICAgICAgbGV0IG5vZGUgPSBvYmplY3RbaV07XG4gICAgICAgIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkobm9kZSkpIHtcbiAgICAgICAgICAgIEhlZGVyYW9iamVjdCArPSBcImRhdGEtXCIgKyBub2RlICsgXCI9ICdcIiArIHBhcmFtc1tub2RlXSArIFwiJyAsIFwiICsgXCJcXG5cIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBIZWRlcmFvYmplY3QgKz0gJz48L2hlZGVyYS1taWNyb3BheW1lbnQ+JztcbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmFtc1snYXR0cklEJ10pO1xuICAgIGJvZHkuaW5uZXJIVE1MICs9IEhlZGVyYW9iamVjdDtcbiAgICByZXR1cm4gSGVkZXJhb2JqZWN0O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb250cmFjdE9iamVjdChwYXJhbXMpIHtcbiAgICBsZXQgX19jb25zdHJ1Y3QgPSBbJ2NvbnRyYWN0aWQnLCAnbWF4aW11bScsICdwYXltZW50c2VydmVyJywgJ3BhcmFtcycsICdtZW1vJywgJ2FiaScsICdyZWRpcmVjdCcsICdleHRlbnNpb25pZCddO1xuICAgIGxldCBvYmplY3QgPSB7XG4gICAgICAgIGNvbnRyYWN0aWQ6ICcwLjAuMTExMScsXG4gICAgICAgIG1heGltdW06ICc0MjIzNDIzNDMnLFxuICAgICAgICBwYXltZW50c2VydmVyOiBwYXJhbXMuY29uZmlndXJhdGlvbi5wYXltZW50c2VydmVyLFxuICAgICAgICBwYXJhbXM6IFtcIjg2OVwiLCBcIjEwMDAwMDAwMFwiLCBcIjIxNlwiLCBcIjI1M1wiLCBcIjI3XCIsIFwiMHgyMjZiMDg5NzZhZDBkZDk4MmFlYjZiMjFhNDRmM2VhY2FlNTc5NTY5YzM0ZTcxNzI1YWZmODAxYTJmZTY4NzM5XCIsIFwiMHgzMzNmOTkxZmEzYTg3MDU3NWY4MTk1NjllOWY3MmE3NzFlYTc5MDA3OGQ0NDhjYzg3ODkxMjBlZTE0YWJmM2M1XCJdLFxuICAgICAgICBtZW1vOiAnYTRhN2M0MzI5YWFiNGIxZmFjNDc0ZmY2ZjkzZDg1OGMnLFxuICAgICAgICBhYmk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIFwiY29uc3RhbnRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImlucHV0c1wiOiBbe1wibmFtZVwiOiBcInByb3BlcnR5SURcIiwgXCJ0eXBlXCI6IFwidWludDI0XCJ9LCB7XCJuYW1lXCI6IFwiYW1vdW50XCIsIFwidHlwZVwiOiBcInVpbnQyNTZcIn0sIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJ4XCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidWludDE2XCJcbiAgICAgICAgICAgIH0sIHtcIm5hbWVcIjogXCJ5XCIsIFwidHlwZVwiOiBcInVpbnQxNlwifSwge1wibmFtZVwiOiBcInZcIiwgXCJ0eXBlXCI6IFwidWludDhcIn0sIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJyXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwiXG4gICAgICAgICAgICB9LCB7XCJuYW1lXCI6IFwic1wiLCBcInR5cGVcIjogXCJieXRlczMyXCJ9XSxcbiAgICAgICAgICAgIFwibmFtZVwiOiBcImJ1eVByb3BlcnR5XCIsXG4gICAgICAgICAgICBcIm91dHB1dHNcIjogW3tcIm5hbWVcIjogXCJcIiwgXCJ0eXBlXCI6IFwic3RyaW5nXCJ9XSxcbiAgICAgICAgICAgIFwicGF5YWJsZVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJzdGF0ZU11dGFiaWxpdHlcIjogXCJwYXlhYmxlXCIsXG4gICAgICAgICAgICBcInR5cGVcIjogXCJmdW5jdGlvblwiXG4gICAgICAgIH0pLFxuICAgICAgICByZWRpcmVjdDogJ3tcIm5vblBheWluZ0FjY291bnRcIjogXCIvaW5zdWZmaWNpZW50LWFtb3VudC9cIixcIm5vQWNjb3VudFwiOiBcIi9hY2NvdW50LW5vdC1wYWlyZWRcIixcImhvbWVQYWdlXCI6IFwiL1wifScsXG4gICAgICAgIGV4dGVuc2lvbmlkOiAncGRqanBjb2xnbW1jaWZpanBlamtlbnBiYmltZWRwaWMnLFxuICAgIH07XG5cbiAgICBjb25zb2xlLmxvZyhKU09OLnBhcnNlKG9iamVjdC5hYmkpKTtcbiAgICBsZXQgZXh0ZW5kZWQgPSBleHRlbmRPYmplY3Qob2JqZWN0LCBwYXJhbXMucGFyYW1zKTtcbiAgICBjb25zb2xlLmxvZyhleHRlbmRlZCk7XG4gICAgbGV0IENvbnRyYWN0b2JqZWN0ID0gJzxoZWRlcmEtY29udHJhY3QgJztcbiAgICBmb3IgKHZhciBpIGluIF9fY29uc3RydWN0KSB7XG4gICAgICAgIGxldCBub2RlID0gX19jb25zdHJ1Y3RbaV07XG4gICAgICAgIGlmIChleHRlbmRlZC5oYXNPd25Qcm9wZXJ0eShub2RlKSkge1xuICAgICAgICAgICAgQ29udHJhY3RvYmplY3QgKz0gXCJkYXRhLVwiICsgbm9kZSArIFwiPSAnXCIgKyBleHRlbmRlZFtub2RlXSArIFwiJyBcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBDb250cmFjdG9iamVjdCArPSAnPjwvaGVkZXJhLWNvbnRyYWN0Pic7XG4gICAgY29uc29sZS5sb2coQ29udHJhY3RvYmplY3QpO1xuXG4gICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChleHRlbmRlZFsnYXR0cklEJ10pO1xuICAgIGJvZHkuaW5uZXJIVE1MICs9IENvbnRyYWN0b2JqZWN0O1xuICAgIC8vY29uc29sZS5sb2coKEhlZGVyYW9iamVjdCkpXG4gICAgcmV0dXJuIENvbnRyYWN0b2JqZWN0O1xuICAgIC8vY2FsbGJhY2soSGVkZXJhb2JqZWN0KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tUcmFuc2FjdGlvbihwYXJhbXMpIHtcblxuICAgIGxldCBtZW1vX2lkID0gcGFyYW1zLmNvbmZpZ3VyYXRpb24ubWVtbztcbiAgICBsZXQgdXJsID0gcHJvZHVjdGlvbiA/IFwiaHR0cHM6Ly9tcHMuaGFzaGluZ3N5c3RlbXMuY29tXCIgOiAnaHR0cDovL2xvY2FsaG9zdDo5OTk5JztcbiAgICBsZXQgc3RydWN0dXJlID0ge1xuICAgICAgICBiYXNldXJsOiB1cmwsXG4gICAgICAgIG1lbW9faWQ6IG1lbW9faWQsXG4gICAgICAgIHJlY2VpdmVyX2lkOiAnJyxcbiAgICAgICAgc3VjY2VzczogJy9zdWNjZXNzJyxcbiAgICAgICAgZmFpbHVyZTogJy9wYXltZW50LWZhaWxlZCcsXG4gICAgICAgIHRpbWVvdXQ6IDMwMDAsXG4gICAgICAgIGxpbWl0OiAxXG4gICAgfTtcblxuICAgIGZvciAodmFyIGtleSBpbiBwYXJhbXMucGFyYW1zKSB7XG4gICAgICAgIGlmIChwYXJhbXMucGFyYW1zLmhhc093blByb3BlcnR5KGtleSkgJiYgcGFyYW1zLnBhcmFtc1trZXldKSB7XG4gICAgICAgICAgICBzdHJ1Y3R1cmVba2V5XSA9IHBhcmFtcy5wYXJhbXNba2V5XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdHJ1Y3R1cmUucmVjZWl2ZXJfaWQgJiYgc3RydWN0dXJlLm1lbW9faWQpIHtcbiAgICAgICAgVVJMID0gc3RydWN0dXJlLmJhc2V1cmwgKyBcIi9jaGVjay9cIiArIHN0cnVjdHVyZS5yZWNlaXZlcl9pZCArIFwiL1wiICsgc3RydWN0dXJlLm1lbW9faWRcbiAgICB9IGVsc2Uge1xuICAgICAgICBVUkwgPSBzdHJ1Y3R1cmUuYmFzZXVybCArIFwiL21lbW8vXCIgKyBzdHJ1Y3R1cmUubWVtb19pZCArICc/bGltaXQ9JyArIHN0cnVjdHVyZS5saW1pdDtcbiAgICB9XG4gICAgY29uc29sZS5sb2coc3RydWN0dXJlLnRpbWVvdXQpO1xuICAgIC8vc2V0VGltZW91dChwZXJmb3JtUmVxdWVzdChzdHJ1Y3R1cmUpLCBzdHJ1Y3R1cmUudGltZW91dClcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcGVyZm9ybVJlcXVlc3Qoc3RydWN0dXJlKTtcbiAgICB9LCBzdHJ1Y3R1cmUudGltZW91dCk7XG59XG5cbnZhciBwZXJmb3JtUmVxdWVzdCA9IGZ1bmN0aW9uIChzdHJ1Y3R1cmUpIHtcbiAgICBjb25zb2xlLmxvZyhzdHJ1Y3R1cmUpXG4gICAgdmFyIHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5yZXNwb25zZS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZXNwb25zZS5sZW5ndGggPj0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvKndpbmRvdy5vcGVuKFxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Lm9yaWdpbiArIHN0cnVjdHVyZS5zdWNjZXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ19ibGFuaydcbiAgICAgICAgICAgICAgICAgICAgKTsqL1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cub3JpZ2luICsgc3RydWN0dXJlLnN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBzdHJ1Y3R1cmUuZmFpbHVyZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uod2luZG93Lm9yaWdpbiArIHN0cnVjdHVyZS5zdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAvL2NhbGxiYWNrKG51bGwsIHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL2NhbGxiYWNrKHtlcnJvcjogdHJ1ZSwgZGF0YTogdGhpcy5yZXNwb25zZX0sIG51bGwpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBzdHJ1Y3R1cmUuZmFpbHVyZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHhodHRwLm9wZW4oXCJHRVRcIiwgVVJMLCB0cnVlKTtcbiAgICB4aHR0cC5zZW5kKCk7XG59O1xuXG5mdW5jdGlvbiByZWFkeW5lc3NDaGVjayhwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgbGV0IHJlc3BvbmVzZSA9IHtcbiAgICAgICAgJ2lzY2hyb21lJzogdHJ1ZSxcbiAgICAgICAgJ2FjY291bnRQYWlyZWQnOiBmYWxzZSxcbiAgICAgICAgJ2lzbW9iaWxlJzogbnVsbCxcbiAgICAgICAgJ3ZhbGlkQnJvd3Nlcic6IG51bGwsXG4gICAgICAgICdleHRlbnNpb25JbnN0YWxsZWQnOiBudWxsLFxuICAgICAgICAnYWNjZXNzVG9BY2NvdW50cyc6IG51bGwsXG4gICAgICAgICdhY2NvdW50SWQnOiBudWxsLFxuICAgICAgICAnc3VibWlzc2lvbk5vZGUnOiBwYXJhbXMuc3VibWlzc2lvbm5vZGVcbiAgICB9O1xuICAgIGxldCBjaGVja0lzQ2hyb21lID0gaXNDaHJvbWUoKTtcbiAgICByZXNwb25lc2UuaXNjaHJvbWUgPSBjaGVja0lzQ2hyb21lO1xuICAgIGxldCBtb2IgPSBkZXRlY3Rtb2IoKTtcbiAgICByZXNwb25lc2UuaXNtb2JpbGUgPSBtb2I7XG4gICAgZGV0ZWN0KHBhcmFtcy5leHRlbnNpb25pZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXNwb25lc2UuZXh0ZW5zaW9uSW5zdGFsbGVkID0gZmFsc2U7XG4gICAgICAgIGNhbGxiYWNrKG51bGwscmVzcG9uZXNlKTtcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlc3BvbmVzZS5leHRlbnNpb25JbnN0YWxsZWQgPSB0cnVlO1xuICAgICAgICBsZXQgb2JqZWN0ID0gY3JlYXRlSGVkZXJhT2JqZWN0KHBhcmFtcyk7XG4gICAgICAgIGxldCB1cmwgPSBwcm9kdWN0aW9uID8gXCJodHRwczovL21wcy5oYXNoaW5nc3lzdGVtcy5jb21cIiA6ICdodHRwOi8vbG9jYWxob3N0Ojk5OTknO1xuICAgICAgICBVUkwgPSB1cmwgKyBcIi9tZW1vL1wiICsgcGFyYW1zLm1lbW87XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhamF4cmVzcCA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhamF4cmVzcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25lc2UuYWNjb3VudElkID0gYWpheHJlc3AucmVzcG9uc2Uuc2VuZGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uZXNlLmFjY291bnRQYWlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uZXNlLmFjY2Vzc1RvQWNjb3VudHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCxyZXNwb25lc2UpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uZXNlLmFjY291bnRQYWlyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbmVzZS5hY2Nlc3NUb0FjY291bnRzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLHJlc3BvbmVzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGh0dHAub3BlbihcIkdFVFwiLCBVUkwsIHRydWUpO1xuICAgICAgICAgICAgeGh0dHAuc2VuZCgpO1xuICAgICAgICB9LDUwMDApO1xuICAgICAgICAvL2NhbGxiYWNrKG51bGwscmVzcG9uZXNlKTtcbiAgICB9KTtcblxufVxuXG5mdW5jdGlvbiBkZXRlY3Rtb2IoKSB7XG4gICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0FuZHJvaWQvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvd2ViT1MvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBob25lL2kpXG4gICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQYWQvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBvZC9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9CbGFja0JlcnJ5L2kpXG4gICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1dpbmRvd3MgUGhvbmUvaSlcbiAgICApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuXG5hcHAod2luZG93KTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21haW4uanMiLCJcbmV4cG9ydCBmdW5jdGlvbiBwaW5nKCkge1xuICAgIHJldHVybiAncG9uZyc7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2VzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==