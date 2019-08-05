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
  console.log('MPS-JS starting');
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

  var globalObject = window[window['MPS-JS']];
  var queue = globalObject.q;

  if (queue) {
    for (var i = 0; i < queue.length; i++) {
      if (typeof queue[i][0] !== 'undefined' && queue[i][0].toLowerCase() == 'init') {
        configurations = extendObject(configurations, queue[i][1]);
        createHederaObject(configurations);
        console.log('MPS-JS started', configurations);
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

        if (response.response.length > 5) {
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
    'accountId': params.submissionnode,
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
            responese.accountId = true;
            callback(null, responese);
          } else {
            responese.accountPaired = false;
            responese.accountId = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjU2YWZiYTgwNmExNTQ3MWRhZjYiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIl0sIm5hbWVzIjpbInN1cHBvcnRlZEFQSSIsInByb2R1Y3Rpb24iLCJhcHAiLCJ3aW5kb3ciLCJjb25zb2xlIiwibG9nIiwiY29uZmlndXJhdGlvbnMiLCJwYXltZW50c2VydmVyIiwiZXh0ZW5zaW9uaWQiLCJlcnJvciIsInR5cGUiLCJ0aW1lIiwiRGF0ZSIsIm5vdyIsInJlZGlyZWN0IiwiaWQiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwic3VibWlzc2lvbm5vZGUiLCJtZW1vIiwiZ2xvYmFsT2JqZWN0IiwicXVldWUiLCJxIiwiaSIsImxlbmd0aCIsInRvTG93ZXJDYXNlIiwiZXh0ZW5kT2JqZWN0IiwiY3JlYXRlSGVkZXJhT2JqZWN0IiwiY2hlY2tGb3JFeHRlbnNpb24iLCJhcGlIYW5kbGVyIiwiaXNDaHJvbWUiLCJyZWRpcmVjdFRvRXJyb3IiLCJ0YWdzIiwiYW1vdW50IiwiRVhURU5TSU9OX0lEIiwiZGV0ZWN0IiwicmVzcG9uc2UiLCJyZWNvcmRSZXNwb25zZSIsImV4dGVuc2lvbklkIiwibm90SW5zdGFsbGVkQ2FsbGJhY2siLCJpbnN0YWxsZWRDYWxsYmFjayIsImltZyIsIkltYWdlIiwib25lcnJvciIsIm9ubG9hZCIsInNyYyIsInJlcyIsImJvZHkiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwiZXJyIiwicmVwbGFjZSIsIm9yaWdpbiIsImNvbmZpZ3VyYXRpb24iLCJhcGkiLCJwYXJhbXMiLCJjYWxsYmFjayIsIkVycm9yIiwiaW5kZXhPZiIsImNoZWNrVHJhbnNhY3Rpb24iLCJjcmVhdGVDb250cmFjdE9iamVjdCIsInJlYWR5bmVzc0NoZWNrIiwid2FybiIsImEiLCJiIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJvYmplY3QiLCJIZWRlcmFvYmplY3QiLCJub2RlIiwiZ2V0RWxlbWVudEJ5SWQiLCJfX2NvbnN0cnVjdCIsImNvbnRyYWN0aWQiLCJtYXhpbXVtIiwiYWJpIiwiSlNPTiIsInN0cmluZ2lmeSIsInBhcnNlIiwiZXh0ZW5kZWQiLCJDb250cmFjdG9iamVjdCIsIm1lbW9faWQiLCJ1cmwiLCJzdHJ1Y3R1cmUiLCJiYXNldXJsIiwicmVjZWl2ZXJfaWQiLCJzdWNjZXNzIiwiZmFpbHVyZSIsInRpbWVvdXQiLCJsaW1pdCIsIlVSTCIsInNldFRpbWVvdXQiLCJwZXJmb3JtUmVxdWVzdCIsInhodHRwIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwib3BlbiIsInNlbmQiLCJyZXNwb25lc2UiLCJjaGVja0lzQ2hyb21lIiwiaXNjaHJvbWUiLCJtb2IiLCJkZXRlY3Rtb2IiLCJpc21vYmlsZSIsImV4dGVuc2lvbkluc3RhbGxlZCIsImFqYXhyZXNwIiwiYWNjb3VudElkIiwic2VuZGVyIiwiYWNjb3VudFBhaXJlZCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIm1hdGNoIiwicGluZyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUFBO0FBQUE7QUFJQSxJQUFNQSxZQUFZLEdB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Q0FBb0JDLEtBQXBCLENBQTBCLGFBQTFCLENBTEgsSUFNR0YsU0FBUyxDQUFDQyxTQUFWLENBQW9CQyxLQUFwQixDQUEwQixnQkFBMUIsQ0FOUCxFQU9FO0FBQ0UsV0FBTyxJQUFQO0FBQ0gsR0FURCxNQVNPO0FBQ0gsV0FBTyxLQUFQO0FBQ0g7QUFDSjs7QUFHRC9HLEdBQUcsQ0FBQ0MsTUFBRCxDQUFILEM7Ozs7Ozs7QUMzVUE7QUFBTyxTQUFTK0csSUFBVCxHQUFnQjtBQUNuQixTQUFPLE1BQVA7QUFDSCxDIiwiZmlsZSI6IndpZGdldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGY1NmFmYmE4MDZhMTU0NzFkYWY2IiwiaW1wb3J0IHtcbiAgICBwaW5nXG59IGZyb20gJy4vc2VydmljZXMnXG5cbmNvbnN0IHN1cHBvcnRlZEFQSSA9IFsnaW5pdCcsICd0ZXN0JywgJ2NyZWF0ZWhlZGVyYW9iamVjdCcsICdjaGVja3RyYW5zYWN0aW9uJywgJ2NyZWF0ZWNvbnRyYWN0b2JqZWN0JywgJ3JlYWR5bmVzc2NoZWNrJ107IC8vIGVubGlzdCBhbGwgbWV0aG9kcyBzdXBwb3J0ZWQgYnkgQVBJIChlLmcuIGBtdygnZXZlbnQnLCAndXNlci1sb2dpbicpO2ApXG4vKipcbiBUaGUgbWFpbiBlbnRyeSBvZiB0aGUgYXBwbGljYXRpb25cbiAqL1xuY29uc3QgcHJvZHVjdGlvbiA9IHRydWU7XG5cbmZ1bmN0aW9uIGFwcCh3aW5kb3cpIHtcbiAgICBjb25zb2xlLmxvZygnTVBTLUpTIHN0YXJ0aW5nJyk7XG4gICAgbGV0IGNvbmZpZ3VyYXRpb25zID0ge1xuICAgICAgICBwYXltZW50c2VydmVyOiBwcm9kdWN0aW9uID8gXCJodHRwczovL21wcy5oYXNoaW5nc3lzdGVtcy5jb21cIiA6ICdodHRwOi8vbG9jYWxob3N0Ojk5OTknLFxuICAgICAgICBleHRlbnNpb25pZDogXCJsaWdwYW9uZGFhYmNsZmlnYWdjaWZvYmFlbGVtaWVuYVwiLFxuICAgICAgICBlcnJvcjogXCIvbm8tZXh0ZW5zaW9uXCIsXG4gICAgICAgIHR5cGU6IFwiYXJ0aWNsZVwiLFxuICAgICAgICB0aW1lOiBEYXRlLm5vdygpLFxuICAgICAgICByZWRpcmVjdDogJ3sgXCJub25QYXlpbmdBY2NvdW50XCI6IFwiL2luc3VmZmljaWVudC1hbW91bnQvXCIsIFwibm9BY2NvdW50XCI6IFwiL2FjY291bnQtbm90LXBhaXJlZC9cIiwgXCJob21lUGFnZVwiOiBcIi9cIn0nLFxuICAgICAgICAvLyB0aGlzIG1pZ2h0IG1ha2UgYSBnb29kIGRlZmF1bHQgaWQgZm9yIHRoZSBjb250ZW50XG4gICAgICAgIGlkOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgIHN1Ym1pc3Npb25ub2RlOiBcIjAuMC4xMVwiLFxuICAgICAgICBtZW1vOiBEYXRlLm5vdygpLFxuICAgICAgICAvL3JlZGlyZWN0Oid7IFwibm9uUGF5aW5nQWNjb3VudFwiOiBcIi9pbnN1ZmZpY2llbnQtYW1vdW50L1wiLCBcIm5vQWNjb3VudFwiOiBcIi9hY2NvdW50LW5vdC1wYWlyZWQvXCIsIFwiaG9tZVBhZ2VcIjogXCIvXCIgfScsXG4gICAgfTtcbiAgICAvLyBhbGwgbWV0aG9kcyB0aGF0IHdlcmUgY2FsbGVkIHRpbGwgbm93IGFuZCBzdG9yZWQgaW4gcXVldWVcbiAgICAvLyBuZWVkcyB0byBiZSBjYWxsZWQgbm93XG4gICAgbGV0IGdsb2JhbE9iamVjdCA9IHdpbmRvd1t3aW5kb3dbJ01QUy1KUyddXTtcbiAgICBsZXQgcXVldWUgPSBnbG9iYWxPYmplY3QucTtcbiAgICBpZiAocXVldWUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBxdWV1ZVtpXVswXSAhPT0gJ3VuZGVmaW5lZCcgJiYgcXVldWVbaV1bMF0udG9Mb3dlckNhc2UoKSA9PSAnaW5pdCcpIHtcbiAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9ucyA9IGV4dGVuZE9iamVjdChjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMV0pO1xuICAgICAgICAgICAgICAgIGNyZWF0ZUhlZGVyYU9iamVjdChjb25maWd1cmF0aW9ucyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ01QUy1KUyBzdGFydGVkJywgY29uZmlndXJhdGlvbnMpO1xuICAgICAgICAgICAgICAgIGNoZWNrRm9yRXh0ZW5zaW9uKGNvbmZpZ3VyYXRpb25zKVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcXVldWVbaV1bMF0gIT09ICd1bmRlZmluZWQnICYmIHF1ZXVlW2ldWzBdLnRvTG93ZXJDYXNlKCkgPT0gJ2NyZWF0ZWNvbnRyYWN0b2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25zID0gZXh0ZW5kT2JqZWN0KGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgICAgICAgICAgYXBpSGFuZGxlcihjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMF0sIHF1ZXVlW2ldWzFdLCBxdWV1ZVtpXVsyXSk7XG4gICAgICAgICAgICAgICAgY2hlY2tGb3JFeHRlbnNpb24oY29uZmlndXJhdGlvbnMpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25zID0gZXh0ZW5kT2JqZWN0KGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgICAgICAgICAgYXBpSGFuZGxlcihjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMF0sIHF1ZXVlW2ldWzFdLCBxdWV1ZVtpXVsyXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gb3ZlcnJpZGUgdGVtcG9yYXJ5ICh1bnRpbCB0aGUgYXBwIGxvYWRlZCkgaGFuZGxlclxuICAgIC8vIGZvciB3aWRnZXQncyBBUEkgY2FsbHNcbiAgICBnbG9iYWxPYmplY3QgPSBhcGlIYW5kbGVyO1xuICAgIGdsb2JhbE9iamVjdC5jb25maWd1cmF0aW9ucyA9IGNvbmZpZ3VyYXRpb25zO1xufVxuXG5mdW5jdGlvbiBjaGVja0ZvckV4dGVuc2lvbihjb25maWd1cmF0aW9ucykge1xuICAgIGlmICghaXNDaHJvbWUoKSkge1xuICAgICAgICByZWRpcmVjdFRvRXJyb3IoJy9pc25vdENocm9tZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB0YWdzID0gY29uZmlndXJhdGlvbnM7XG4gICAgICAgIC8vIGlmIHRhZ3MuYW1vdW50IGlzIG51bGwgb3IgdW5kZWZpbmVkLCB3ZSBzaG91bGQgYXNzdW1lIHRoYXQgdGhpcyBpcyBhIGZyZWUgcGFnZSBhbmQgZG8gbm90aGluZyBtb3JlXG4gICAgICAgIGlmICh0YWdzLmFtb3VudCA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IEVYVEVOU0lPTl9JRCA9IHRhZ3MuZXh0ZW5zaW9uaWQ7XG5cbiAgICAgICAgZGV0ZWN0KEVYVEVOU0lPTl9JRCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmVkaXJlY3RUb0Vycm9yKHRhZ3MuZXJyb3IpO1xuICAgICAgICB9LCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkZXRlY3Q6IHVzZXIgaGFzIGV4dGVuc2lvbiBpbnN0YWxsZWQnKTtcbiAgICAgICAgICAgIHJlY29yZFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhjaHJvbWUucnVudGltZS5jb25uZWN0KEVYVEVOU0lPTl9JRCwndmVyc2lvbicpKTtcbiAgICAgICAgLypjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShFWFRFTlNJT05fSUQsICd2ZXJzaW9uJywgcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmVkaXJlY3RUb0Vycm9yKHRhZ3MuZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWNvcmRSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKi9cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRldGVjdChleHRlbnNpb25JZCwgbm90SW5zdGFsbGVkQ2FsbGJhY2ssIGluc3RhbGxlZENhbGxiYWNrKSB7XG4gICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGltZy5vbmVycm9yID0gbm90SW5zdGFsbGVkQ2FsbGJhY2s7XG4gICAgaW1nLm9ubG9hZCA9IGluc3RhbGxlZENhbGxiYWNrKCdpbnN0YWxsZWQnKTtcbiAgICBpbWcuc3JjID0gJ2Nocm9tZS1leHRlbnNpb246Ly8nICsgZXh0ZW5zaW9uSWQgKyAnL2ljb25zL2ljb24xNi5wbmcnO1xufVxuXG5mdW5jdGlvbiByZWNvcmRSZXNwb25zZShyZXMpIHtcbiAgICBpZiAodHlwZW9mIHJlcyAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5Jyk7XG4gICAgICAgIGJvZHkuaW5uZXJIVE1MICs9ICc8ZGl2IHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6NSU7b3BhY2l0eTowLjM7ei1pbmRleDoxMDA7YmFja2dyb3VuZDp5ZWxsb3c7XCI+JyArIHJlcyArICc8L2Rpdj4nO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiByZWRpcmVjdFRvRXJyb3IoZXJyKSB7XG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSAhPSBlcnIpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uod2luZG93Lm9yaWdpbiArIGVycik7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0Nocm9tZSgpIHtcbiAgICByZXR1cm4gJ2Nocm9tZScgaW4gd2luZG93XG59XG5cbi8qKlxuIE1ldGhvZCB0aGF0IGhhbmRsZXMgYWxsIEFQSSBjYWxsc1xuICovXG5mdW5jdGlvbiBhcGlIYW5kbGVyKGNvbmZpZ3VyYXRpb24sIGFwaSwgcGFyYW1zLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBpZiAoIWFwaSkgdGhyb3cgRXJyb3IoJ0FQSSBtZXRob2QgcmVxdWlyZWQnKTtcbiAgICBhcGkgPSBhcGkudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoc3VwcG9ydGVkQVBJLmluZGV4T2YoYXBpKSA9PT0gLTEpIHRocm93IEVycm9yKGBNZXRob2QgJHthcGl9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgICBjb25zb2xlLmxvZyhgSGFuZGxpbmcgQVBJIGNhbGwgJHthcGl9YCwgcGFyYW1zKTtcbiAgICBzd2l0Y2ggKGFwaSkge1xuICAgICAgICAvLyBUT0RPOiBhZGQgQVBJIGltcGxlbWVudGF0aW9uXG5cbiAgICAgICAgY2FzZSAnY3JlYXRlaGVkZXJhb2JqZWN0JzpcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVIZWRlcmFPYmplY3QocGFyYW1zKTtcblxuICAgICAgICBjYXNlICdjaGVja3RyYW5zYWN0aW9uJzpcbiAgICAgICAgICAgIHJldHVybiBjaGVja1RyYW5zYWN0aW9uKHtjb25maWd1cmF0aW9uLCBwYXJhbXN9LCBjYWxsYmFjayk7XG5cbiAgICAgICAgY2FzZSAnY3JlYXRlY29udHJhY3RvYmplY3QnOlxuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUNvbnRyYWN0T2JqZWN0KHtjb25maWd1cmF0aW9uLCBwYXJhbXN9LCBjYWxsYmFjayk7XG5cbiAgICAgICAgY2FzZSAncmVhZHluZXNzY2hlY2snOlxuICAgICAgICAgICAgcmV0dXJuIHJlYWR5bmVzc0NoZWNrKGNvbmZpZ3VyYXRpb24sIGNhbGxiYWNrKTtcblxuICAgICAgICBjYXNlICd0ZXN0JzpcbiAgICAgICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYE5vIGhhbmRsZXIgZGVmaW5lZCBmb3IgJHthcGl9YCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBleHRlbmRPYmplY3QoYSwgYikge1xuICAgIGZvciAodmFyIGtleSBpbiBiKVxuICAgICAgICBpZiAoYi5oYXNPd25Qcm9wZXJ0eShrZXkpKSBhW2tleV0gPSBiW2tleV07XG4gICAgcmV0dXJuIGE7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUhlZGVyYU9iamVjdChwYXJhbXMpIHtcbiAgICBsZXQgb2JqZWN0ID0gWydzdWJtaXNzaW9ubm9kZScsICdwYXltZW50c2VydmVyJywgJ3JlY2lwaWVudGxpc3QnLCAnY29udGVudGlkJywgJ3R5cGUnLCAnbWVtbycsICdleHRlbnNpb25pZCcsICdyZWRpcmVjdCcsICd0aW1lJ107XG4gICAgbGV0IEhlZGVyYW9iamVjdCA9ICc8aGVkZXJhLW1pY3JvcGF5bWVudCAnO1xuICAgIGZvciAodmFyIGkgaW4gb2JqZWN0KSB7XG4gICAgICAgIGxldCBub2RlID0gb2JqZWN0W2ldO1xuICAgICAgICBpZiAocGFyYW1zLmhhc093blByb3BlcnR5KG5vZGUpKSB7XG4gICAgICAgICAgICBIZWRlcmFvYmplY3QgKz0gXCJkYXRhLVwiICsgbm9kZSArIFwiPSAnXCIgKyBwYXJhbXNbbm9kZV0gKyBcIicgLCBcIiArIFwiXFxuXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgSGVkZXJhb2JqZWN0ICs9ICc+PC9oZWRlcmEtbWljcm9wYXltZW50Pic7XG4gICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJhbXNbJ2F0dHJJRCddKTtcbiAgICBib2R5LmlubmVySFRNTCArPSBIZWRlcmFvYmplY3Q7XG4gICAgcmV0dXJuIEhlZGVyYW9iamVjdDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29udHJhY3RPYmplY3QocGFyYW1zKSB7XG4gICAgbGV0IF9fY29uc3RydWN0ID0gWydjb250cmFjdGlkJywgJ21heGltdW0nLCAncGF5bWVudHNlcnZlcicsICdwYXJhbXMnLCAnbWVtbycsICdhYmknLCAncmVkaXJlY3QnLCAnZXh0ZW5zaW9uaWQnXTtcbiAgICBsZXQgb2JqZWN0ID0ge1xuICAgICAgICBjb250cmFjdGlkOiAnMC4wLjExMTEnLFxuICAgICAgICBtYXhpbXVtOiAnNDIyMzQyMzQzJyxcbiAgICAgICAgcGF5bWVudHNlcnZlcjogcGFyYW1zLmNvbmZpZ3VyYXRpb24ucGF5bWVudHNlcnZlcixcbiAgICAgICAgcGFyYW1zOiBbXCI4NjlcIiwgXCIxMDAwMDAwMDBcIiwgXCIyMTZcIiwgXCIyNTNcIiwgXCIyN1wiLCBcIjB4MjI2YjA4OTc2YWQwZGQ5ODJhZWI2YjIxYTQ0ZjNlYWNhZTU3OTU2OWMzNGU3MTcyNWFmZjgwMWEyZmU2ODczOVwiLCBcIjB4MzMzZjk5MWZhM2E4NzA1NzVmODE5NTY5ZTlmNzJhNzcxZWE3OTAwNzhkNDQ4Y2M4Nzg5MTIwZWUxNGFiZjNjNVwiXSxcbiAgICAgICAgbWVtbzogJ2E0YTdjNDMyOWFhYjRiMWZhYzQ3NGZmNmY5M2Q4NThjJyxcbiAgICAgICAgYWJpOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBcImNvbnN0YW50XCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJpbnB1dHNcIjogW3tcIm5hbWVcIjogXCJwcm9wZXJ0eUlEXCIsIFwidHlwZVwiOiBcInVpbnQyNFwifSwge1wibmFtZVwiOiBcImFtb3VudFwiLCBcInR5cGVcIjogXCJ1aW50MjU2XCJ9LCB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwieFwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInVpbnQxNlwiXG4gICAgICAgICAgICB9LCB7XCJuYW1lXCI6IFwieVwiLCBcInR5cGVcIjogXCJ1aW50MTZcIn0sIHtcIm5hbWVcIjogXCJ2XCIsIFwidHlwZVwiOiBcInVpbnQ4XCJ9LCB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiclwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ5dGVzMzJcIlxuICAgICAgICAgICAgfSwge1wibmFtZVwiOiBcInNcIiwgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwifV0sXG4gICAgICAgICAgICBcIm5hbWVcIjogXCJidXlQcm9wZXJ0eVwiLFxuICAgICAgICAgICAgXCJvdXRwdXRzXCI6IFt7XCJuYW1lXCI6IFwiXCIsIFwidHlwZVwiOiBcInN0cmluZ1wifV0sXG4gICAgICAgICAgICBcInBheWFibGVcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwic3RhdGVNdXRhYmlsaXR5XCI6IFwicGF5YWJsZVwiLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgICAgICB9KSxcbiAgICAgICAgcmVkaXJlY3Q6ICd7XCJub25QYXlpbmdBY2NvdW50XCI6IFwiL2luc3VmZmljaWVudC1hbW91bnQvXCIsXCJub0FjY291bnRcIjogXCIvYWNjb3VudC1ub3QtcGFpcmVkXCIsXCJob21lUGFnZVwiOiBcIi9cIn0nLFxuICAgICAgICBleHRlbnNpb25pZDogJ3BkampwY29sZ21tY2lmaWpwZWprZW5wYmJpbWVkcGljJyxcbiAgICB9O1xuXG4gICAgY29uc29sZS5sb2coSlNPTi5wYXJzZShvYmplY3QuYWJpKSk7XG4gICAgbGV0IGV4dGVuZGVkID0gZXh0ZW5kT2JqZWN0KG9iamVjdCwgcGFyYW1zLnBhcmFtcyk7XG4gICAgY29uc29sZS5sb2coZXh0ZW5kZWQpO1xuICAgIGxldCBDb250cmFjdG9iamVjdCA9ICc8aGVkZXJhLWNvbnRyYWN0ICc7XG4gICAgZm9yICh2YXIgaSBpbiBfX2NvbnN0cnVjdCkge1xuICAgICAgICBsZXQgbm9kZSA9IF9fY29uc3RydWN0W2ldO1xuICAgICAgICBpZiAoZXh0ZW5kZWQuaGFzT3duUHJvcGVydHkobm9kZSkpIHtcbiAgICAgICAgICAgIENvbnRyYWN0b2JqZWN0ICs9IFwiZGF0YS1cIiArIG5vZGUgKyBcIj0gJ1wiICsgZXh0ZW5kZWRbbm9kZV0gKyBcIicgXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQ29udHJhY3RvYmplY3QgKz0gJz48L2hlZGVyYS1jb250cmFjdD4nO1xuICAgIGNvbnNvbGUubG9nKENvbnRyYWN0b2JqZWN0KTtcblxuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZXh0ZW5kZWRbJ2F0dHJJRCddKTtcbiAgICBib2R5LmlubmVySFRNTCArPSBDb250cmFjdG9iamVjdDtcbiAgICAvL2NvbnNvbGUubG9nKChIZWRlcmFvYmplY3QpKVxuICAgIHJldHVybiBDb250cmFjdG9iamVjdDtcbiAgICAvL2NhbGxiYWNrKEhlZGVyYW9iamVjdCk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrVHJhbnNhY3Rpb24ocGFyYW1zKSB7XG5cbiAgICBsZXQgbWVtb19pZCA9IHBhcmFtcy5jb25maWd1cmF0aW9uLm1lbW87XG4gICAgbGV0IHVybCA9IHByb2R1Y3Rpb24gPyBcImh0dHBzOi8vbXBzLmhhc2hpbmdzeXN0ZW1zLmNvbVwiIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6OTk5OSc7XG4gICAgbGV0IHN0cnVjdHVyZSA9IHtcbiAgICAgICAgYmFzZXVybDogdXJsLFxuICAgICAgICBtZW1vX2lkOiBtZW1vX2lkLFxuICAgICAgICByZWNlaXZlcl9pZDogJycsXG4gICAgICAgIHN1Y2Nlc3M6ICcvc3VjY2VzcycsXG4gICAgICAgIGZhaWx1cmU6ICcvcGF5bWVudC1mYWlsZWQnLFxuICAgICAgICB0aW1lb3V0OiAzMDAwLFxuICAgICAgICBsaW1pdDogMVxuICAgIH07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gcGFyYW1zLnBhcmFtcykge1xuICAgICAgICBpZiAocGFyYW1zLnBhcmFtcy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHBhcmFtcy5wYXJhbXNba2V5XSkge1xuICAgICAgICAgICAgc3RydWN0dXJlW2tleV0gPSBwYXJhbXMucGFyYW1zW2tleV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3RydWN0dXJlLnJlY2VpdmVyX2lkICYmIHN0cnVjdHVyZS5tZW1vX2lkKSB7XG4gICAgICAgIFVSTCA9IHN0cnVjdHVyZS5iYXNldXJsICsgXCIvY2hlY2svXCIgKyBzdHJ1Y3R1cmUucmVjZWl2ZXJfaWQgKyBcIi9cIiArIHN0cnVjdHVyZS5tZW1vX2lkXG4gICAgfSBlbHNlIHtcbiAgICAgICAgVVJMID0gc3RydWN0dXJlLmJhc2V1cmwgKyBcIi9tZW1vL1wiICsgc3RydWN0dXJlLm1lbW9faWQgKyAnP2xpbWl0PScgKyBzdHJ1Y3R1cmUubGltaXQ7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHN0cnVjdHVyZS50aW1lb3V0KTtcbiAgICAvL3NldFRpbWVvdXQocGVyZm9ybVJlcXVlc3Qoc3RydWN0dXJlKSwgc3RydWN0dXJlLnRpbWVvdXQpXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBlcmZvcm1SZXF1ZXN0KHN0cnVjdHVyZSk7XG4gICAgfSwgc3RydWN0dXJlLnRpbWVvdXQpO1xufVxuXG52YXIgcGVyZm9ybVJlcXVlc3QgPSBmdW5jdGlvbiAoc3RydWN0dXJlKSB7XG4gICAgY29uc29sZS5sb2coc3RydWN0dXJlKVxuICAgIHZhciB4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UucmVzcG9uc2UubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UucmVzcG9uc2UubGVuZ3RoID4gNSkge1xuICAgICAgICAgICAgICAgICAgICAvKndpbmRvdy5vcGVuKFxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Lm9yaWdpbiArIHN0cnVjdHVyZS5zdWNjZXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ19ibGFuaydcbiAgICAgICAgICAgICAgICAgICAgKTsqL1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cub3JpZ2luICsgc3RydWN0dXJlLnN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBzdHJ1Y3R1cmUuZmFpbHVyZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uod2luZG93Lm9yaWdpbiArIHN0cnVjdHVyZS5zdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAvL2NhbGxiYWNrKG51bGwsIHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL2NhbGxiYWNrKHtlcnJvcjogdHJ1ZSwgZGF0YTogdGhpcy5yZXNwb25zZX0sIG51bGwpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBzdHJ1Y3R1cmUuZmFpbHVyZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHhodHRwLm9wZW4oXCJHRVRcIiwgVVJMLCB0cnVlKTtcbiAgICB4aHR0cC5zZW5kKCk7XG59O1xuXG5mdW5jdGlvbiByZWFkeW5lc3NDaGVjayhwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgbGV0IHJlc3BvbmVzZSA9IHtcbiAgICAgICAgJ2lzY2hyb21lJzogdHJ1ZSxcbiAgICAgICAgJ2FjY291bnRQYWlyZWQnOiBmYWxzZSxcbiAgICAgICAgJ2lzbW9iaWxlJzogbnVsbCxcbiAgICAgICAgJ3ZhbGlkQnJvd3Nlcic6IG51bGwsXG4gICAgICAgICdleHRlbnNpb25JbnN0YWxsZWQnOiBudWxsLFxuICAgICAgICAnYWNjZXNzVG9BY2NvdW50cyc6IG51bGwsXG4gICAgICAgICdhY2NvdW50SWQnOiBwYXJhbXMuc3VibWlzc2lvbm5vZGUsXG4gICAgICAgICdzdWJtaXNzaW9uTm9kZSc6IHBhcmFtcy5zdWJtaXNzaW9ubm9kZVxuICAgIH07XG4gICAgbGV0IGNoZWNrSXNDaHJvbWUgPSBpc0Nocm9tZSgpO1xuICAgIHJlc3BvbmVzZS5pc2Nocm9tZSA9IGNoZWNrSXNDaHJvbWU7XG4gICAgbGV0IG1vYiA9IGRldGVjdG1vYigpO1xuICAgIHJlc3BvbmVzZS5pc21vYmlsZSA9IG1vYjtcbiAgICBkZXRlY3QocGFyYW1zLmV4dGVuc2lvbmlkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlc3BvbmVzZS5leHRlbnNpb25JbnN0YWxsZWQgPSBmYWxzZTtcbiAgICAgICAgY2FsbGJhY2sobnVsbCxyZXNwb25lc2UpO1xuICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVzcG9uZXNlLmV4dGVuc2lvbkluc3RhbGxlZCA9IHRydWU7XG4gICAgICAgIGxldCBvYmplY3QgPSBjcmVhdGVIZWRlcmFPYmplY3QocGFyYW1zKTtcbiAgICAgICAgbGV0IHVybCA9IHByb2R1Y3Rpb24gPyBcImh0dHBzOi8vbXBzLmhhc2hpbmdzeXN0ZW1zLmNvbVwiIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6OTk5OSc7XG4gICAgICAgIFVSTCA9IHVybCArIFwiL21lbW8vXCIgKyBwYXJhbXMubWVtbztcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHhodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFqYXhyZXNwID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFqYXhyZXNwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbmVzZS5hY2NvdW50SWQgPSBhamF4cmVzcC5yZXNwb25zZS5zZW5kZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25lc2UuYWNjb3VudFBhaXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25lc2UuYWNjb3VudElkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwscmVzcG9uZXNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbmVzZS5hY2NvdW50UGFpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25lc2UuYWNjb3VudElkID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4aHR0cC5vcGVuKFwiR0VUXCIsIFVSTCwgdHJ1ZSk7XG4gICAgICAgICAgICB4aHR0cC5zZW5kKCk7XG4gICAgICAgIH0sNTAwMCk7XG4gICAgICAgIC8vY2FsbGJhY2sobnVsbCxyZXNwb25lc2UpO1xuICAgIH0pO1xuXG59XG5cbmZ1bmN0aW9uIGRldGVjdG1vYigpIHtcbiAgICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC93ZWJPUy9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGhvbmUvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBhZC9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUG9kL2kpXG4gICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0JsYWNrQmVycnkvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvV2luZG93cyBQaG9uZS9pKVxuICAgICkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5cbmFwcCh3aW5kb3cpO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsIlxuZXhwb3J0IGZ1bmN0aW9uIHBpbmcoKSB7XG4gICAgcmV0dXJuICdwb25nJztcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmljZXMuanMiXSwic291cmNlUm9vdCI6IiJ9