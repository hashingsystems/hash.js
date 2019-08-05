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
      return readynessCheck({
        configuration: configuration
      }, callback);

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
  console.log(object);
  var Hederaobject = '<hedera-micropayment ';

  for (var i in object) {
    var node = object[i];

    if (params.hasOwnProperty(node)) {
      Hederaobject += "data-" + node + "= '" + params[node] + "' , " + "\n";
    }
  }

  Hederaobject += '></hedera-micropayment>';
  console.log(Hederaobject);
  var body = document.getElementById(params['attrID']);
  body.innerHTML += Hederaobject; //console.log((Hederaobject))

  return Hederaobject; //callback(Hederaobject);
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
  console.log("in check trans");
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
  console.log(params.extensionid);
  var responese = {
    'ischrome': true,
    'accountPaired': false,
    'ismobile': null,
    'validBrowser': null,
    'extensionInstalled': null,
    'accessToAccounts': null,
    'accountId': '',
    'submissionNode': ''
  };
  var checkIsChrome = isChrome();
  responese.ischrome = checkIsChrome;
  var mob = detectmob();
  responese.ismobile = mob;
  extensionInstaled(params.extensionid, function (res) {
    console.log(res);
    if (res == 'no') responese.extensionInstalled = false;else responese.extensionInstalled = true;
    callback(null, responese);
  });
}

function extensionInstaled(extensionId, callback) {
  var img = new Image();
  img.onerror = callback("no");
  img.onload = callback("yes");
  img.src = 'chrome-extension://' + extensionId + '/icons/icon16.png';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGY4MTVkNDk5ODEyZGQ1YWNkYzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIl0sIm5hbWVzIjpbInN1cHBvcnRlZEFQSSIsInByb2R1Y3Rpb24iLCJhcHAiLCJ3aW5kb3ciLCJjb25zb2xlIiwibG9nIiwiY29uZmlndXJhdGlvbnMiLCJwYXltZW50c2VydmVyIiwiZXh0ZW5zaW9uaWQiLCJlcnJvciIsInR5cGUiLCJ0aW1lIiwiRGF0ZSIsIm5vdyIsInJlZGlyZWN0IiwiaWQiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwic3VibWlzc2lvbm5vZGUiLCJtZW1vIiwiZ2xvYmFsT2JqZWN0IiwicXVldWUiLCJxIiwiaSIsImxlbmd0aCIsInRvTG93ZXJDYXNlIiwiZXh0ZW5kT2JqZWN0IiwiY3JlYXRlSGVkZXJhT2JqZWN0IiwiY2hlY2tGb3JFeHRlbnNpb24iLCJhcGlIYW5kbGVyIiwiaXNDaHJvbWUiLCJyZWRpcmVjdFRvRXJyb3IiLCJ0YWdzIiwiYW1vdW50IiwiRVhURU5TSU9OX0lEIiwiZGV0ZWN0IiwicmVzcG9uc2UiLCJyZWNvcmRSZXNwb25zZSIsImV4dGVuc2lvbklkIiwibm90SW5zdGFsbGVkQ2FsbGJhY2siLCJpbnN0YWxsZWRDYWxsYmFjayIsImltZyIsIkltYWdlIiwib25lcnJvciIsIm9ubG9hZCIsInNyYyIsInJlcyIsImJvZHkiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwiZXJyIiwicmVwbGFjZSIsIm9yaWdpbiIsImNvbmZpZ3VyYXRpb24iLCJhcGkiLCJwYXJhbXMiLCJjYWxsYmFjayIsIkVycm9yIiwiaW5kZXhPZiIsImNoZWNrVHJhbnNhY3Rpb24iLCJjcmVhdGVDb250cmFjdE9iamVjdCIsInJlYWR5bmVzc0NoZWNrIiwid2FybiIsImEiLCJiIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJvYmplY3QiLCJIZWRlcmFvYmplY3QiLCJub2RlIiwiZ2V0RWxlbWVudEJ5SWQiLCJfX2NvbnN0cnVjdCIsImNvbnRyYWN0aWQiLCJtYXhpbXVtIiwiYWJpIiwiSlNPTiIsInN0cmluZ2lmeSIsInBhcnNlIiwiZXh0ZW5kZWQiLCJDb250cmFjdG9iamVjdCIsIm1lbW9faWQiLCJ1cmwiLCJzdHJ1Y3R1cmUiLCJiYXNldXJsIiwicmVjZWl2ZXJfaWQiLCJzdWNjZXNzIiwiZmFpbHVyZSIsInRpbWVvdXQiLCJsaW1pdCIsIlVSTCIsInNldFRpbWVvdXQiLCJwZXJmb3JtUmVxdWVzdCIsInhodHRwIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwib3BlbiIsInNlbmQiLCJyZXNwb25lc2UiLCJjaGVja0lzQ2hyb21lIiwiaXNjaHJvbWUiLCJtb2IiLCJkZXRlY3Rtb2IiLCJpc21vYmlsZSIsImV4dGVuc2lvbkluc3RhbGVkIiwiZXh0ZW5zaW9uSW5zdGFsbGVkIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwibWF0Y2giLCJwaW5nIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDN0RBO0FBQUE7QUFBQTtBQUlBLElBQU1BLFlBQVksR0FBRyxDQUFDLE1BQUQsRUFBUyxNQUFULEVBQWlCLG9CQUFqQixFQUF1QyxrQkFBdkMsRUFBMkQsc0JBQTNELEVBQW1GLGdCQUFuRixDQUFyQixDLENBQTJIOztBQUMzSDs7OztBQUdBLElBQU1DLFVBQVUsR0FBRyxJQUFuQjs7QUFFQSxTQUFTQyxHQUFULENBQWFDLE1BQWIsRUFBcUI7QUFDakJDLFNBQU8sQ0FBQ0MsR0FBUixDQUFZLGlCQUFaO0FBQ0EsTUFBSUMsY0FBYyxHQUFHO0FBQ2pCQyxpQkFBYSxFQUFFTixVQUFVLEdBQUcsZ0NBQUgsR0FBc0MsdUJBRDlDO0FBRWpCTyxlQUFXLEVBQUUsa0NBRkk7QUFHakJDLFNBQUssRUFBRSxlQUhVO0FBSWpCQyxRQUFJLEVBQUUsU0FKVztBQUtqQkMsUUFBSSxFQUFFQyxJQUFJLENBQUNDLEdBQUwsRUFMVztBQU1qQkMsWUFBUSxFQUFFLHNHQU5PO0FBT2pCO0FBQ0FDLE1BQUUsRUFBRVosTUFBTSxDQUFDYSxRQUFQLENBQWdCQyxRQVJIO0FBU2pCQyxrQkFBYyxFQUFFLFFBVEM7QUFVakJDLFFBQUksRUFBRVAsSUFBSSxDQUFDQyxHQUFMLEVBVlcsQ0FXakI7O0FBWGlCLEdBQXJCLENBRmlCLENBZWpCO0FBQ0E7O0FBQ0EsTUFBSU8sWUFBWSxHQUFHakIsTUFBTSxDQUFDQSxNQUFNLENBQUMsUUFBRCxDQUFQLENBQXpCO0FBQ0EsTUFBSWtCLEtBQUssR0FBR0QsWUFBWSxDQUFDRSxDQUF6Qjs7QUFDQSxNQUFJRCxLQUFKLEVBQVc7QUFDUCxTQUFLLElBQUlFLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdGLEtBQUssQ0FBQ0csTUFBMUIsRUFBa0NELENBQUMsRUFBbkMsRUFBdUM7QUFDbkMsVUFBSSxPQUFPRixLQUFLLENBQUNFLENBQUQsQ0FBTCxDQUFTLENBQVQsQ0FBUCxLQUF1QixXQUF2QixJQUFzQ0YsS0FBSyxDQUFDRSxDQUFELENBQUwsQ0FBUyxDQUFULEVBQVlFLFdBQVosTUFBNkIsTUFBdkUsRUFBK0U7QUFDM0VuQixzQkFBYyxHQUFHb0IsWUFBWSxDQUFDcEIsY0FBRCxFQUFpQmUsS0FBSyxDQUFDRSxDQUFELENBQUwsQ0FBUyxDQUFULENBQWpCLENBQTdCO0FBQ0FJLDBCQUFrQixDQUFDckIsY0FBRCxDQUFsQjtBQUNBRixlQUFPLENBQUNDLEdBQVIsQ0FBWSxnQkFBWixFQUE4QkMsY0FBOUI7QUFDQXNCLHlCQUFpQixDQUFDdEIsY0FBRCxDQUFqQjtBQUNILE9BTEQsTUFLTyxJQUFJLE9BQU9lLEtBQUssQ0FBQ0UsQ0FBRCxDQUFMLENBQVMsQ0FBVCxDQUFQLEtBQXVCLFdBQXZCLElBQXNDRixLQUFLLENBQUNFLENBQUQsQ0FBTCxDQUFTLENBQVQsRUFBWUUsV0FBWixNQUE2QixzQkFBdkUsRUFBK0Y7QUFDbEduQixzQkFBYyxHQUFHb0IsWUFBWSxDQUFDcEIsY0FBRCxFQUFpQmUsS0FBSyxDQUFDRSxDQUFELENBQUwsQ0FBUyxDQUFULENBQWpCLENBQTdCO0FBQ0FNLGtCQUFVLENBQUN2QixjQUFELEVBQWlCZSxLQUFLLENBQUNFLENBQUQsQ0FBTCxDQUFTLENBQVQsQ0FBakIsRUFBOEJGLEtBQUssQ0FBQ0UsQ0FBRCxDQUFMLENBQVMsQ0FBVCxDQUE5QixFQUEyQ0YsS0FBSyxDQUFDRSxDQUFELENBQUwsQ0FBUyxDQUFULENBQTNDLENBQVY7QUFDQUsseUJBQWlCLENBQUN0QixjQUFELENBQWpCO0FBQ0gsT0FKTSxNQUlBO0FBQ0hBLHNCQUFjLEdBQUdvQixZQUFZLENBQUNwQixjQUFELEVBQWlCZSxLQUFLLENBQUNFLENBQUQsQ0FBTCxDQUFTLENBQVQsQ0FBakIsQ0FBN0I7QUFDQU0sa0JBQVUsQ0FBQ3ZCLGNBQUQsRUFBaUJlLEtBQUssQ0FBQ0UsQ0FBRCxDQUFMLENBQVMsQ0FBVCxDQUFqQixFQUE4QkYsS0FBSyxDQUFDRSxDQUFELENBQUwsQ0FBUyxDQUFULENBQTlCLEVBQTJDRixLQUFLLENBQUNFLENBQUQsQ0FBTCxDQUFTLENBQVQsQ0FBM0MsQ0FBVjtBQUNIO0FBQ0o7QUFDSixHQW5DZ0IsQ0FvQ2pCO0FBQ0E7OztBQUNBSCxjQUFZLEdBQUdTLFVBQWY7QUFDQVQsY0FBWSxDQUFDZCxjQUFiLEdBQThCQSxjQUE5QjtBQUNIOztBQUVELFNBQVNzQixpQkFBVCxDQUEyQnRCLGNBQTNCLEVBQTJDO0FBQ3ZDLE1BQUksQ0FBQ3dCLFFBQVEsRUFBYixFQUFpQjtBQUNiQyxtQkFBZSxDQUFDLGNBQUQsQ0FBZjtBQUNILEdBRkQsTUFFTztBQUNILFFBQUlDLElBQUksR0FBRzFCLGNBQVgsQ0FERyxDQUVIOztBQUNBLFFBQUkwQixJQUFJLENBQUNDLE1BQUwsS0FBZ0IsSUFBcEIsRUFBMEIsT0FBTyxJQUFQO0FBQzFCLFFBQU1DLFlBQVksR0FBR0YsSUFBSSxDQUFDeEIsV0FBMUI7QUFFQTJCLFVBQU0sQ0FBQ0QsWUFBRCxFQUFlLFlBQVk7QUFDN0JILHFCQUFlLENBQUNDLElBQUksQ0FBQ3ZCLEtBQU4sQ0FBZjtBQUNILEtBRkssRUFFSCxVQUFVMkIsUUFBVixFQUFvQjtBQUNuQmhDLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLHNDQUFaO0FBQ0FnQyxvQkFBYyxDQUFDRCxRQUFELENBQWQ7QUFDSCxLQUxLLENBQU4sQ0FORyxDQWFIOztBQUNBOzs7Ozs7Ozs7QUFTSDtBQUNKOztBQUVELFNBQVNELE1BQVQsQ0FBZ0JHLFdBQWhCLEVBQTZCQyxvQkFBN0IsRUFBbURDLGlCQUFuRCxFQUFzRTtBQUNsRSxNQUFJQyxHQUFHLEdBQUcsSUFBSUMsS0FBSixFQUFWO0FBQ0FELEtBQUcsQ0FBQ0UsT0FBSixHQUFjSixvQkFBZDtBQUNBRSxLQUFHLENBQUNHLE1BQUosR0FBYUosaUJBQWlCLENBQUMsV0FBRCxDQUE5QjtBQUNBQyxLQUFHLENBQUNJLEdBQUosR0FBVSx3QkFBd0JQLFdBQXhCLEdBQXNDLG1CQUFoRDtBQUNIOztBQUVELFNBQVNELGNBQVQsQ0FBd0JTLEdBQXhCLEVBQTZCO0FBQ3pCLE1BQUksT0FBT0EsR0FBUCxJQUFjLFdBQWxCLEVBQStCO0FBQzNCLFFBQUlDLElBQUksR0FBR0MsUUFBUSxDQUFDQyxvQkFBVCxDQUE4QixNQUE5QixDQUFYO0FBQ0FGLFFBQUksQ0FBQ0csU0FBTCxJQUFrQixrRkFBa0ZKLEdBQWxGLEdBQXdGLFFBQTFHO0FBQ0EsV0FBTyxJQUFQO0FBQ0g7O0FBQ0QsU0FBTyxLQUFQO0FBQ0g7O0FBRUQsU0FBU2YsZUFBVCxDQUF5Qm9CLEdBQXpCLEVBQThCO0FBQzFCLE1BQUloRCxNQUFNLENBQUNhLFFBQVAsQ0FBZ0JDLFFBQWhCLElBQTRCa0MsR0FBaEMsRUFBcUM7QUFDakNoRCxVQUFNLENBQUNhLFFBQVAsQ0FBZ0JvQyxPQUFoQixDQUF3QmpELE1BQU0sQ0FBQ2tELE1BQVAsR0FBZ0JGLEdBQXhDO0FBQ0g7QUFDSjs7QUFFRCxTQUFTckIsUUFBVCxHQUFvQjtBQUNoQixTQUFPLFlBQVkzQixNQUFuQjtBQUNIO0FBRUQ7Ozs7O0FBR0EsU0FBUzBCLFVBQVQsQ0FBb0J5QixhQUFwQixFQUFtQ0MsR0FBbkMsRUFBd0NDLE1BQXhDLEVBQWlFO0FBQUEsTUFBakJDLFFBQWlCLHVFQUFOLElBQU07QUFDN0QsTUFBSSxDQUFDRixHQUFMLEVBQVUsTUFBTUcsS0FBSyxDQUFDLHFCQUFELENBQVg7QUFDVkgsS0FBRyxHQUFHQSxHQUFHLENBQUM5QixXQUFKLEVBQU47QUFDQSxNQUFJekIsWUFBWSxDQUFDMkQsT0FBYixDQUFxQkosR0FBckIsTUFBOEIsQ0FBQyxDQUFuQyxFQUFzQyxNQUFNRyxLQUFLLGtCQUFXSCxHQUFYLHVCQUFYO0FBQ3RDbkQsU0FBTyxDQUFDQyxHQUFSLDZCQUFpQ2tELEdBQWpDLEdBQXdDQyxNQUF4Qzs7QUFDQSxVQUFRRCxHQUFSO0FBQ0k7QUFFQSxTQUFLLG9CQUFMO0FBQ0ksYUFBTzVCLGtCQUFrQixDQUFDNkIsTUFBRCxDQUF6Qjs7QUFFSixTQUFLLGtCQUFMO0FBQ0ksYUFBT0ksZ0JBQWdCLENBQUM7QUFBQ04scUJBQWEsRUFBYkEsYUFBRDtBQUFnQkUsY0FBTSxFQUFOQTtBQUFoQixPQUFELEVBQTBCQyxRQUExQixDQUF2Qjs7QUFFSixTQUFLLHNCQUFMO0FBQ0ksYUFBT0ksb0JBQW9CLENBQUM7QUFBQ1AscUJBQWEsRUFBYkEsYUFBRDtBQUFnQkUsY0FBTSxFQUFOQTtBQUFoQixPQUFELEVBQTBCQyxRQUExQixDQUEzQjs7QUFFSixTQUFLLGdCQUFMO0FBQ0ksYUFBT0ssY0FBYyxDQUFDO0FBQUNSLHFCQUFhLEVBQWJBO0FBQUQsT0FBRCxFQUFrQkcsUUFBbEIsQ0FBckI7O0FBRUosU0FBSyxNQUFMO0FBQ0ksYUFBT0QsTUFBUDs7QUFDSjtBQUNJcEQsYUFBTyxDQUFDMkQsSUFBUixrQ0FBdUNSLEdBQXZDO0FBbEJSO0FBb0JIOztBQUVELFNBQVM3QixZQUFULENBQXNCc0MsQ0FBdEIsRUFBeUJDLENBQXpCLEVBQTRCO0FBQ3hCLE9BQUssSUFBSUMsR0FBVCxJQUFnQkQsQ0FBaEI7QUFDSSxRQUFJQSxDQUFDLENBQUNFLGNBQUYsQ0FBaUJELEdBQWpCLENBQUosRUFBMkJGLENBQUMsQ0FBQ0UsR0FBRCxDQUFELEdBQVNELENBQUMsQ0FBQ0MsR0FBRCxDQUFWO0FBRC9COztBQUVBLFNBQU9GLENBQVA7QUFDSDs7QUFFRCxTQUFTckMsa0JBQVQsQ0FBNEI2QixNQUE1QixFQUFvQztBQUNoQyxNQUFJWSxNQUFNLEdBQUcsQ0FBQyxnQkFBRCxFQUFtQixlQUFuQixFQUFvQyxlQUFwQyxFQUFxRCxXQUFyRCxFQUFrRSxNQUFsRSxFQUEwRSxNQUExRSxFQUFrRixhQUFsRixFQUFpRyxVQUFqRyxFQUE2RyxNQUE3RyxDQUFiO0FBQ0FoRSxTQUFPLENBQUNDLEdBQVIsQ0FBWStELE1BQVo7QUFDQSxNQUFJQyxZQUFZLEdBQUcsdUJBQW5COztBQUNBLE9BQUssSUFBSTlDLENBQVQsSUFBYzZDLE1BQWQsRUFBc0I7QUFDbEIsUUFBSUUsSUFBSSxHQUFHRixNQUFNLENBQUM3QyxDQUFELENBQWpCOztBQUNBLFFBQUlpQyxNQUFNLENBQUNXLGNBQVAsQ0FBc0JHLElBQXRCLENBQUosRUFBaUM7QUFDN0JELGtCQUFZLElBQUksVUFBVUMsSUFBVixHQUFpQixLQUFqQixHQUF5QmQsTUFBTSxDQUFDYyxJQUFELENBQS9CLEdBQXdDLE1BQXhDLEdBQWlELElBQWpFO0FBQ0g7QUFDSjs7QUFDREQsY0FBWSxJQUFJLHlCQUFoQjtBQUNBakUsU0FBTyxDQUFDQyxHQUFSLENBQVlnRSxZQUFaO0FBRUEsTUFBSXRCLElBQUksR0FBR0MsUUFBUSxDQUFDdUIsY0FBVCxDQUF3QmYsTUFBTSxDQUFDLFFBQUQsQ0FBOUIsQ0FBWDtBQUNBVCxNQUFJLENBQUNHLFNBQUwsSUFBa0JtQixZQUFsQixDQWRnQyxDQWVoQzs7QUFDQSxTQUFPQSxZQUFQLENBaEJnQyxDQWlCaEM7QUFDSDs7QUFFRCxTQUFTUixvQkFBVCxDQUE4QkwsTUFBOUIsRUFBc0M7QUFDbEMsTUFBSWdCLFdBQVcsR0FBRyxDQUFDLFlBQUQsRUFBZSxTQUFmLEVBQTBCLGVBQTFCLEVBQTJDLFFBQTNDLEVBQXFELE1BQXJELEVBQTZELEtBQTdELEVBQW9FLFVBQXBFLEVBQWdGLGFBQWhGLENBQWxCO0FBQ0EsTUFBSUosTUFBTSxHQUFHO0FBQ1RLLGNBQVUsRUFBRSxVQURIO0FBRVRDLFdBQU8sRUFBRSxXQUZBO0FBR1RuRSxpQkFBYSxFQUFFaUQsTUFBTSxDQUFDRixhQUFQLENBQXFCL0MsYUFIM0I7QUFJVGlELFVBQU0sRUFBRSxDQUFDLEtBQUQsRUFBUSxXQUFSLEVBQXFCLEtBQXJCLEVBQTRCLEtBQTVCLEVBQW1DLElBQW5DLEVBQXlDLG9FQUF6QyxFQUErRyxvRUFBL0csQ0FKQztBQUtUckMsUUFBSSxFQUFFLGtDQUxHO0FBTVR3RCxPQUFHLEVBQUVDLElBQUksQ0FBQ0MsU0FBTCxDQUFlO0FBQ2hCLGtCQUFZLEtBREk7QUFFaEIsZ0JBQVUsQ0FBQztBQUFDLGdCQUFRLFlBQVQ7QUFBdUIsZ0JBQVE7QUFBL0IsT0FBRCxFQUEyQztBQUFDLGdCQUFRLFFBQVQ7QUFBbUIsZ0JBQVE7QUFBM0IsT0FBM0MsRUFBa0Y7QUFDeEYsZ0JBQVEsR0FEZ0Y7QUFFeEYsZ0JBQVE7QUFGZ0YsT0FBbEYsRUFHUDtBQUFDLGdCQUFRLEdBQVQ7QUFBYyxnQkFBUTtBQUF0QixPQUhPLEVBRzBCO0FBQUMsZ0JBQVEsR0FBVDtBQUFjLGdCQUFRO0FBQXRCLE9BSDFCLEVBRzBEO0FBQ2hFLGdCQUFRLEdBRHdEO0FBRWhFLGdCQUFRO0FBRndELE9BSDFELEVBTVA7QUFBQyxnQkFBUSxHQUFUO0FBQWMsZ0JBQVE7QUFBdEIsT0FOTyxDQUZNO0FBU2hCLGNBQVEsYUFUUTtBQVVoQixpQkFBVyxDQUFDO0FBQUMsZ0JBQVEsRUFBVDtBQUFhLGdCQUFRO0FBQXJCLE9BQUQsQ0FWSztBQVdoQixpQkFBVyxJQVhLO0FBWWhCLHlCQUFtQixTQVpIO0FBYWhCLGNBQVE7QUFiUSxLQUFmLENBTkk7QUFxQlQvRCxZQUFRLEVBQUUsa0dBckJEO0FBc0JUTixlQUFXLEVBQUU7QUF0QkosR0FBYjtBQXlCQUosU0FBTyxDQUFDQyxHQUFSLENBQVl1RSxJQUFJLENBQUNFLEtBQUwsQ0FBV1YsTUFBTSxDQUFDTyxHQUFsQixDQUFaO0FBQ0EsTUFBSUksUUFBUSxHQUFHckQsWUFBWSxDQUFDMEMsTUFBRCxFQUFTWixNQUFNLENBQUNBLE1BQWhCLENBQTNCO0FBQ0FwRCxTQUFPLENBQUNDLEdBQVIsQ0FBWTBFLFFBQVo7QUFDQSxNQUFJQyxjQUFjLEdBQUcsbUJBQXJCOztBQUNBLE9BQUssSUFBSXpELENBQVQsSUFBY2lELFdBQWQsRUFBMkI7QUFDdkIsUUFBSUYsSUFBSSxHQUFHRSxXQUFXLENBQUNqRCxDQUFELENBQXRCOztBQUNBLFFBQUl3RCxRQUFRLENBQUNaLGNBQVQsQ0FBd0JHLElBQXhCLENBQUosRUFBbUM7QUFDL0JVLG9CQUFjLElBQUksVUFBVVYsSUFBVixHQUFpQixLQUFqQixHQUF5QlMsUUFBUSxDQUFDVCxJQUFELENBQWpDLEdBQTBDLElBQTVEO0FBQ0g7QUFDSjs7QUFDRFUsZ0JBQWMsSUFBSSxxQkFBbEI7QUFDQTVFLFNBQU8sQ0FBQ0MsR0FBUixDQUFZMkUsY0FBWjtBQUVBLE1BQUlqQyxJQUFJLEdBQUdDLFFBQVEsQ0FBQ3VCLGNBQVQsQ0FBd0JRLFFBQVEsQ0FBQyxRQUFELENBQWhDLENBQVg7QUFDQWhDLE1BQUksQ0FBQ0csU0FBTCxJQUFrQjhCLGNBQWxCLENBekNrQyxDQTBDbEM7O0FBQ0EsU0FBT0EsY0FBUCxDQTNDa0MsQ0E0Q2xDO0FBQ0g7O0FBRUQsU0FBU3BCLGdCQUFULENBQTBCSixNQUExQixFQUFrQztBQUU5QnBELFNBQU8sQ0FBQ0MsR0FBUixDQUFZLGdCQUFaO0FBQ0EsTUFBSTRFLE9BQU8sR0FBR3pCLE1BQU0sQ0FBQ0YsYUFBUCxDQUFxQm5DLElBQW5DO0FBQ0EsTUFBSStELEdBQUcsR0FBR2pGLFVBQVUsR0FBRyxnQ0FBSCxHQUFzQyx1QkFBMUQ7QUFDQSxNQUFJa0YsU0FBUyxHQUFHO0FBQ1pDLFdBQU8sRUFBRUYsR0FERztBQUVaRCxXQUFPLEVBQUVBLE9BRkc7QUFHWkksZUFBVyxFQUFFLEVBSEQ7QUFJWkMsV0FBTyxFQUFFLFVBSkc7QUFLWkMsV0FBTyxFQUFFLGlCQUxHO0FBTVpDLFdBQU8sRUFBRSxJQU5HO0FBT1pDLFNBQUssRUFBRTtBQVBLLEdBQWhCOztBQVVBLE9BQUssSUFBSXZCLEdBQVQsSUFBZ0JWLE1BQU0sQ0FBQ0EsTUFBdkIsRUFBK0I7QUFDM0IsUUFBSUEsTUFBTSxDQUFDQSxNQUFQLENBQWNXLGNBQWQsQ0FBNkJELEdBQTdCLEtBQXFDVixNQUFNLENBQUNBLE1BQVAsQ0FBY1UsR0FBZCxDQUF6QyxFQUE2RDtBQUN6RGlCLGVBQVMsQ0FBQ2pCLEdBQUQsQ0FBVCxHQUFpQlYsTUFBTSxDQUFDQSxNQUFQLENBQWNVLEdBQWQsQ0FBakI7QUFDSDtBQUNKOztBQUVELE1BQUlpQixTQUFTLENBQUNFLFdBQVYsSUFBeUJGLFNBQVMsQ0FBQ0YsT0FBdkMsRUFBZ0Q7QUFDNUNTLE9BQUcsR0FBR1AsU0FBUyxDQUFDQyxPQUFWLEdBQW9CLFNBQXBCLEdBQWdDRCxTQUFTLENBQUNFLFdBQTFDLEdBQXdELEdBQXhELEdBQThERixTQUFTLENBQUNGLE9BQTlFO0FBQ0gsR0FGRCxNQUVPO0FBQ0hTLE9BQUcsR0FBR1AsU0FBUyxDQUFDQyxPQUFWLEdBQW9CLFFBQXBCLEdBQStCRCxTQUFTLENBQUNGLE9BQXpDLEdBQW1ELFNBQW5ELEdBQStERSxTQUFTLENBQUNNLEtBQS9FO0FBQ0g7O0FBQ0RyRixTQUFPLENBQUNDLEdBQVIsQ0FBWThFLFNBQVMsQ0FBQ0ssT0FBdEIsRUExQjhCLENBMkI5Qjs7QUFDQUcsWUFBVSxDQUFDLFlBQVk7QUFDbkJDLGtCQUFjLENBQUNULFNBQUQsQ0FBZDtBQUNILEdBRlMsRUFFUEEsU0FBUyxDQUFDSyxPQUZILENBQVY7QUFHSDs7QUFFRCxJQUFJSSxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLENBQVVULFNBQVYsRUFBcUI7QUFDdEMvRSxTQUFPLENBQUNDLEdBQVIsQ0FBWThFLFNBQVo7QUFDQSxNQUFJVSxLQUFLLEdBQUcsSUFBSUMsY0FBSixFQUFaOztBQUNBRCxPQUFLLENBQUNFLGtCQUFOLEdBQTJCLFlBQVk7QUFDbkMsUUFBSSxLQUFLQyxVQUFMLElBQW1CLENBQXZCLEVBQTBCO0FBQ3RCLFVBQUksS0FBS0MsTUFBTCxJQUFlLEdBQW5CLEVBQXdCO0FBQ3BCLFlBQUk3RCxRQUFRLEdBQUd3QyxJQUFJLENBQUNFLEtBQUwsQ0FBVyxLQUFLMUMsUUFBaEIsQ0FBZjtBQUNBaEMsZUFBTyxDQUFDQyxHQUFSLENBQVkrQixRQUFaO0FBQ0FoQyxlQUFPLENBQUNDLEdBQVIsQ0FBWStCLFFBQVEsQ0FBQ0EsUUFBVCxDQUFrQlosTUFBOUI7O0FBQ0EsWUFBSVksUUFBUSxDQUFDQSxRQUFULENBQWtCWixNQUFsQixHQUEyQixDQUEvQixFQUFrQztBQUM5Qjs7OztBQUlBckIsZ0JBQU0sQ0FBQ2EsUUFBUCxDQUFnQm9DLE9BQWhCLENBQXdCakQsTUFBTSxDQUFDa0QsTUFBUCxHQUFnQjhCLFNBQVMsQ0FBQ0csT0FBbEQ7QUFDSCxTQU5ELE1BTU87QUFDSG5GLGdCQUFNLENBQUNhLFFBQVAsQ0FBZ0JvQyxPQUFoQixDQUF3QmpELE1BQU0sQ0FBQ2tELE1BQVAsR0FBZ0I4QixTQUFTLENBQUNJLE9BQWxEO0FBQ0gsU0FabUIsQ0FhcEI7QUFDQTs7QUFDSCxPQWZELE1BZU87QUFDSDtBQUNBcEYsY0FBTSxDQUFDYSxRQUFQLENBQWdCb0MsT0FBaEIsQ0FBd0JqRCxNQUFNLENBQUNrRCxNQUFQLEdBQWdCOEIsU0FBUyxDQUFDSSxPQUFsRDtBQUNIO0FBQ0o7QUFDSixHQXRCRDs7QUF1QkFNLE9BQUssQ0FBQ0ssSUFBTixDQUFXLEtBQVgsRUFBa0JSLEdBQWxCLEVBQXVCLElBQXZCO0FBQ0FHLE9BQUssQ0FBQ00sSUFBTjtBQUNILENBNUJEOztBQThCQSxTQUFTckMsY0FBVCxDQUF3Qk4sTUFBeEIsRUFBZ0NDLFFBQWhDLEVBQTBDO0FBQ3RDckQsU0FBTyxDQUFDQyxHQUFSLENBQVltRCxNQUFNLENBQUNoRCxXQUFuQjtBQUNBLE1BQUk0RixTQUFTLEdBQUc7QUFDWixnQkFBWSxJQURBO0FBRVoscUJBQWlCLEtBRkw7QUFHWixnQkFBWSxJQUhBO0FBSVosb0JBQWdCLElBSko7QUFLWiwwQkFBc0IsSUFMVjtBQU1aLHdCQUFvQixJQU5SO0FBT1osaUJBQWEsRUFQRDtBQVFaLHNCQUFrQjtBQVJOLEdBQWhCO0FBVUEsTUFBSUMsYUFBYSxHQUFHdkUsUUFBUSxFQUE1QjtBQUNBc0UsV0FBUyxDQUFDRSxRQUFWLEdBQXFCRCxhQUFyQjtBQUNBLE1BQUlFLEdBQUcsR0FBR0MsU0FBUyxFQUFuQjtBQUNBSixXQUFTLENBQUNLLFFBQVYsR0FBcUJGLEdBQXJCO0FBQ0FHLG1CQUFpQixDQUFDbEQsTUFBTSxDQUFDaEQsV0FBUixFQUFxQixVQUFVc0MsR0FBVixFQUFlO0FBQ2pEMUMsV0FBTyxDQUFDQyxHQUFSLENBQVl5QyxHQUFaO0FBQ0EsUUFBSUEsR0FBRyxJQUFJLElBQVgsRUFBaUJzRCxTQUFTLENBQUNPLGtCQUFWLEdBQStCLEtBQS9CLENBQWpCLEtBQ0tQLFNBQVMsQ0FBQ08sa0JBQVYsR0FBK0IsSUFBL0I7QUFDTGxELFlBQVEsQ0FBQyxJQUFELEVBQU0yQyxTQUFOLENBQVI7QUFDSCxHQUxnQixDQUFqQjtBQU9IOztBQUVELFNBQVNNLGlCQUFULENBQTJCcEUsV0FBM0IsRUFBd0NtQixRQUF4QyxFQUFrRDtBQUM5QyxNQUFJaEIsR0FBRyxHQUFHLElBQUlDLEtBQUosRUFBVjtBQUNBRCxLQUFHLENBQUNFLE9BQUosR0FBY2MsUUFBUSxDQUFDLElBQUQsQ0FBdEI7QUFDQWhCLEtBQUcsQ0FBQ0csTUFBSixHQUFhYSxRQUFRLENBQUMsS0FBRCxDQUFyQjtBQUNBaEIsS0FBRyxDQUFDSSxHQUFKLEdBQVUsd0JBQXdCUCxXQUF4QixHQUFzQyxtQkFBaEQ7QUFDSDs7QUFFRCxTQUFTa0UsU0FBVCxHQUFxQjtBQUNqQixNQUFJSSxTQUFTLENBQUNDLFNBQVYsQ0FBb0JDLEtBQXBCLENBQTBCLFVBQTFCLEtBQ0dGLFNBQVMsQ0FBQ0MsU0FBVixDQUFvQkMsS0FBcEIsQ0FBMEIsUUFBMUIsQ0FESCxJQUVHRixTQUFTLENBQUNDLFNBQVYsQ0FBb0JDLEtBQXBCLENBQTBCLFNBQTFCLENBRkgsSUFHR0YsU0FBUyxDQUFDQyxTQUFWLENBQW9CQyxLQUFwQixDQUEwQixPQUExQixDQUhILElBSUdGLFNBQVMsQ0FBQ0MsU0FBVixDQUFvQkMsS0FBcEIsQ0FBMEIsT0FBMUIsQ0FKSCxJQUtHRixTQUFTLENBQUNDLFNBQVYsQ0FBb0JDLEtBQXBCLENBQTBCLGFBQTFCLENBTEgsSUFNR0YsU0FBUyxDQUFDQyxTQUFWLENBQW9CQyxLQUFwQixDQUEwQixnQkFBMUIsQ0FOUCxFQU9FO0FBQ0UsV0FBTyxJQUFQO0FBQ0gsR0FURCxNQVNPO0FBQ0gsV0FBTyxLQUFQO0FBQ0g7QUFDSjs7QUFHRDVHLEdBQUcsQ0FBQ0MsTUFBRCxDQUFILEM7Ozs7Ozs7QUNoVUE7QUFBTyxTQUFTNEcsSUFBVCxHQUFnQjtBQUNuQixTQUFPLE1BQVA7QUFDSCxDIiwiZmlsZSI6IndpZGdldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDBmODE1ZDQ5OTgxMmRkNWFjZGM5IiwiaW1wb3J0IHtcbiAgICBwaW5nXG59IGZyb20gJy4vc2VydmljZXMnXG5cbmNvbnN0IHN1cHBvcnRlZEFQSSA9IFsnaW5pdCcsICd0ZXN0JywgJ2NyZWF0ZWhlZGVyYW9iamVjdCcsICdjaGVja3RyYW5zYWN0aW9uJywgJ2NyZWF0ZWNvbnRyYWN0b2JqZWN0JywgJ3JlYWR5bmVzc2NoZWNrJ107IC8vIGVubGlzdCBhbGwgbWV0aG9kcyBzdXBwb3J0ZWQgYnkgQVBJIChlLmcuIGBtdygnZXZlbnQnLCAndXNlci1sb2dpbicpO2ApXG4vKipcbiBUaGUgbWFpbiBlbnRyeSBvZiB0aGUgYXBwbGljYXRpb25cbiAqL1xuY29uc3QgcHJvZHVjdGlvbiA9IHRydWU7XG5cbmZ1bmN0aW9uIGFwcCh3aW5kb3cpIHtcbiAgICBjb25zb2xlLmxvZygnTVBTLUpTIHN0YXJ0aW5nJyk7XG4gICAgbGV0IGNvbmZpZ3VyYXRpb25zID0ge1xuICAgICAgICBwYXltZW50c2VydmVyOiBwcm9kdWN0aW9uID8gXCJodHRwczovL21wcy5oYXNoaW5nc3lzdGVtcy5jb21cIiA6ICdodHRwOi8vbG9jYWxob3N0Ojk5OTknLFxuICAgICAgICBleHRlbnNpb25pZDogXCJsaWdwYW9uZGFhYmNsZmlnYWdjaWZvYmFlbGVtaWVuYVwiLFxuICAgICAgICBlcnJvcjogXCIvbm8tZXh0ZW5zaW9uXCIsXG4gICAgICAgIHR5cGU6IFwiYXJ0aWNsZVwiLFxuICAgICAgICB0aW1lOiBEYXRlLm5vdygpLFxuICAgICAgICByZWRpcmVjdDogJ3sgXCJub25QYXlpbmdBY2NvdW50XCI6IFwiL2luc3VmZmljaWVudC1hbW91bnQvXCIsIFwibm9BY2NvdW50XCI6IFwiL2FjY291bnQtbm90LXBhaXJlZC9cIiwgXCJob21lUGFnZVwiOiBcIi9cIn0nLFxuICAgICAgICAvLyB0aGlzIG1pZ2h0IG1ha2UgYSBnb29kIGRlZmF1bHQgaWQgZm9yIHRoZSBjb250ZW50XG4gICAgICAgIGlkOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgIHN1Ym1pc3Npb25ub2RlOiBcIjAuMC4xMVwiLFxuICAgICAgICBtZW1vOiBEYXRlLm5vdygpLFxuICAgICAgICAvL3JlZGlyZWN0Oid7IFwibm9uUGF5aW5nQWNjb3VudFwiOiBcIi9pbnN1ZmZpY2llbnQtYW1vdW50L1wiLCBcIm5vQWNjb3VudFwiOiBcIi9hY2NvdW50LW5vdC1wYWlyZWQvXCIsIFwiaG9tZVBhZ2VcIjogXCIvXCIgfScsXG4gICAgfTtcbiAgICAvLyBhbGwgbWV0aG9kcyB0aGF0IHdlcmUgY2FsbGVkIHRpbGwgbm93IGFuZCBzdG9yZWQgaW4gcXVldWVcbiAgICAvLyBuZWVkcyB0byBiZSBjYWxsZWQgbm93XG4gICAgbGV0IGdsb2JhbE9iamVjdCA9IHdpbmRvd1t3aW5kb3dbJ01QUy1KUyddXTtcbiAgICBsZXQgcXVldWUgPSBnbG9iYWxPYmplY3QucTtcbiAgICBpZiAocXVldWUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBxdWV1ZVtpXVswXSAhPT0gJ3VuZGVmaW5lZCcgJiYgcXVldWVbaV1bMF0udG9Mb3dlckNhc2UoKSA9PSAnaW5pdCcpIHtcbiAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9ucyA9IGV4dGVuZE9iamVjdChjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMV0pO1xuICAgICAgICAgICAgICAgIGNyZWF0ZUhlZGVyYU9iamVjdChjb25maWd1cmF0aW9ucyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ01QUy1KUyBzdGFydGVkJywgY29uZmlndXJhdGlvbnMpO1xuICAgICAgICAgICAgICAgIGNoZWNrRm9yRXh0ZW5zaW9uKGNvbmZpZ3VyYXRpb25zKVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcXVldWVbaV1bMF0gIT09ICd1bmRlZmluZWQnICYmIHF1ZXVlW2ldWzBdLnRvTG93ZXJDYXNlKCkgPT0gJ2NyZWF0ZWNvbnRyYWN0b2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25zID0gZXh0ZW5kT2JqZWN0KGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgICAgICAgICAgYXBpSGFuZGxlcihjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMF0sIHF1ZXVlW2ldWzFdLCBxdWV1ZVtpXVsyXSk7XG4gICAgICAgICAgICAgICAgY2hlY2tGb3JFeHRlbnNpb24oY29uZmlndXJhdGlvbnMpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25zID0gZXh0ZW5kT2JqZWN0KGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgICAgICAgICAgYXBpSGFuZGxlcihjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMF0sIHF1ZXVlW2ldWzFdLCBxdWV1ZVtpXVsyXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gb3ZlcnJpZGUgdGVtcG9yYXJ5ICh1bnRpbCB0aGUgYXBwIGxvYWRlZCkgaGFuZGxlclxuICAgIC8vIGZvciB3aWRnZXQncyBBUEkgY2FsbHNcbiAgICBnbG9iYWxPYmplY3QgPSBhcGlIYW5kbGVyO1xuICAgIGdsb2JhbE9iamVjdC5jb25maWd1cmF0aW9ucyA9IGNvbmZpZ3VyYXRpb25zO1xufVxuXG5mdW5jdGlvbiBjaGVja0ZvckV4dGVuc2lvbihjb25maWd1cmF0aW9ucykge1xuICAgIGlmICghaXNDaHJvbWUoKSkge1xuICAgICAgICByZWRpcmVjdFRvRXJyb3IoJy9pc25vdENocm9tZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB0YWdzID0gY29uZmlndXJhdGlvbnM7XG4gICAgICAgIC8vIGlmIHRhZ3MuYW1vdW50IGlzIG51bGwgb3IgdW5kZWZpbmVkLCB3ZSBzaG91bGQgYXNzdW1lIHRoYXQgdGhpcyBpcyBhIGZyZWUgcGFnZSBhbmQgZG8gbm90aGluZyBtb3JlXG4gICAgICAgIGlmICh0YWdzLmFtb3VudCA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IEVYVEVOU0lPTl9JRCA9IHRhZ3MuZXh0ZW5zaW9uaWQ7XG5cbiAgICAgICAgZGV0ZWN0KEVYVEVOU0lPTl9JRCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmVkaXJlY3RUb0Vycm9yKHRhZ3MuZXJyb3IpO1xuICAgICAgICB9LCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkZXRlY3Q6IHVzZXIgaGFzIGV4dGVuc2lvbiBpbnN0YWxsZWQnKTtcbiAgICAgICAgICAgIHJlY29yZFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhjaHJvbWUucnVudGltZS5jb25uZWN0KEVYVEVOU0lPTl9JRCwndmVyc2lvbicpKTtcbiAgICAgICAgLypjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShFWFRFTlNJT05fSUQsICd2ZXJzaW9uJywgcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmVkaXJlY3RUb0Vycm9yKHRhZ3MuZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWNvcmRSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKi9cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRldGVjdChleHRlbnNpb25JZCwgbm90SW5zdGFsbGVkQ2FsbGJhY2ssIGluc3RhbGxlZENhbGxiYWNrKSB7XG4gICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGltZy5vbmVycm9yID0gbm90SW5zdGFsbGVkQ2FsbGJhY2s7XG4gICAgaW1nLm9ubG9hZCA9IGluc3RhbGxlZENhbGxiYWNrKCdpbnN0YWxsZWQnKTtcbiAgICBpbWcuc3JjID0gJ2Nocm9tZS1leHRlbnNpb246Ly8nICsgZXh0ZW5zaW9uSWQgKyAnL2ljb25zL2ljb24xNi5wbmcnO1xufVxuXG5mdW5jdGlvbiByZWNvcmRSZXNwb25zZShyZXMpIHtcbiAgICBpZiAodHlwZW9mIHJlcyAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5Jyk7XG4gICAgICAgIGJvZHkuaW5uZXJIVE1MICs9ICc8ZGl2IHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6NSU7b3BhY2l0eTowLjM7ei1pbmRleDoxMDA7YmFja2dyb3VuZDp5ZWxsb3c7XCI+JyArIHJlcyArICc8L2Rpdj4nO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiByZWRpcmVjdFRvRXJyb3IoZXJyKSB7XG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSAhPSBlcnIpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uod2luZG93Lm9yaWdpbiArIGVycik7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0Nocm9tZSgpIHtcbiAgICByZXR1cm4gJ2Nocm9tZScgaW4gd2luZG93XG59XG5cbi8qKlxuIE1ldGhvZCB0aGF0IGhhbmRsZXMgYWxsIEFQSSBjYWxsc1xuICovXG5mdW5jdGlvbiBhcGlIYW5kbGVyKGNvbmZpZ3VyYXRpb24sIGFwaSwgcGFyYW1zLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBpZiAoIWFwaSkgdGhyb3cgRXJyb3IoJ0FQSSBtZXRob2QgcmVxdWlyZWQnKTtcbiAgICBhcGkgPSBhcGkudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoc3VwcG9ydGVkQVBJLmluZGV4T2YoYXBpKSA9PT0gLTEpIHRocm93IEVycm9yKGBNZXRob2QgJHthcGl9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgICBjb25zb2xlLmxvZyhgSGFuZGxpbmcgQVBJIGNhbGwgJHthcGl9YCwgcGFyYW1zKTtcbiAgICBzd2l0Y2ggKGFwaSkge1xuICAgICAgICAvLyBUT0RPOiBhZGQgQVBJIGltcGxlbWVudGF0aW9uXG5cbiAgICAgICAgY2FzZSAnY3JlYXRlaGVkZXJhb2JqZWN0JzpcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVIZWRlcmFPYmplY3QocGFyYW1zKTtcblxuICAgICAgICBjYXNlICdjaGVja3RyYW5zYWN0aW9uJzpcbiAgICAgICAgICAgIHJldHVybiBjaGVja1RyYW5zYWN0aW9uKHtjb25maWd1cmF0aW9uLCBwYXJhbXN9LCBjYWxsYmFjayk7XG5cbiAgICAgICAgY2FzZSAnY3JlYXRlY29udHJhY3RvYmplY3QnOlxuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUNvbnRyYWN0T2JqZWN0KHtjb25maWd1cmF0aW9uLCBwYXJhbXN9LCBjYWxsYmFjayk7XG5cbiAgICAgICAgY2FzZSAncmVhZHluZXNzY2hlY2snOlxuICAgICAgICAgICAgcmV0dXJuIHJlYWR5bmVzc0NoZWNrKHtjb25maWd1cmF0aW9ufSwgY2FsbGJhY2spO1xuXG4gICAgICAgIGNhc2UgJ3Rlc3QnOlxuICAgICAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgTm8gaGFuZGxlciBkZWZpbmVkIGZvciAke2FwaX1gKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGV4dGVuZE9iamVjdChhLCBiKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGIpXG4gICAgICAgIGlmIChiLmhhc093blByb3BlcnR5KGtleSkpIGFba2V5XSA9IGJba2V5XTtcbiAgICByZXR1cm4gYTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSGVkZXJhT2JqZWN0KHBhcmFtcykge1xuICAgIGxldCBvYmplY3QgPSBbJ3N1Ym1pc3Npb25ub2RlJywgJ3BheW1lbnRzZXJ2ZXInLCAncmVjaXBpZW50bGlzdCcsICdjb250ZW50aWQnLCAndHlwZScsICdtZW1vJywgJ2V4dGVuc2lvbmlkJywgJ3JlZGlyZWN0JywgJ3RpbWUnXTtcbiAgICBjb25zb2xlLmxvZyhvYmplY3QpO1xuICAgIGxldCBIZWRlcmFvYmplY3QgPSAnPGhlZGVyYS1taWNyb3BheW1lbnQgJztcbiAgICBmb3IgKHZhciBpIGluIG9iamVjdCkge1xuICAgICAgICBsZXQgbm9kZSA9IG9iamVjdFtpXTtcbiAgICAgICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShub2RlKSkge1xuICAgICAgICAgICAgSGVkZXJhb2JqZWN0ICs9IFwiZGF0YS1cIiArIG5vZGUgKyBcIj0gJ1wiICsgcGFyYW1zW25vZGVdICsgXCInICwgXCIgKyBcIlxcblwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIEhlZGVyYW9iamVjdCArPSAnPjwvaGVkZXJhLW1pY3JvcGF5bWVudD4nO1xuICAgIGNvbnNvbGUubG9nKEhlZGVyYW9iamVjdCk7XG5cbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmFtc1snYXR0cklEJ10pO1xuICAgIGJvZHkuaW5uZXJIVE1MICs9IEhlZGVyYW9iamVjdDtcbiAgICAvL2NvbnNvbGUubG9nKChIZWRlcmFvYmplY3QpKVxuICAgIHJldHVybiBIZWRlcmFvYmplY3Q7XG4gICAgLy9jYWxsYmFjayhIZWRlcmFvYmplY3QpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb250cmFjdE9iamVjdChwYXJhbXMpIHtcbiAgICBsZXQgX19jb25zdHJ1Y3QgPSBbJ2NvbnRyYWN0aWQnLCAnbWF4aW11bScsICdwYXltZW50c2VydmVyJywgJ3BhcmFtcycsICdtZW1vJywgJ2FiaScsICdyZWRpcmVjdCcsICdleHRlbnNpb25pZCddO1xuICAgIGxldCBvYmplY3QgPSB7XG4gICAgICAgIGNvbnRyYWN0aWQ6ICcwLjAuMTExMScsXG4gICAgICAgIG1heGltdW06ICc0MjIzNDIzNDMnLFxuICAgICAgICBwYXltZW50c2VydmVyOiBwYXJhbXMuY29uZmlndXJhdGlvbi5wYXltZW50c2VydmVyLFxuICAgICAgICBwYXJhbXM6IFtcIjg2OVwiLCBcIjEwMDAwMDAwMFwiLCBcIjIxNlwiLCBcIjI1M1wiLCBcIjI3XCIsIFwiMHgyMjZiMDg5NzZhZDBkZDk4MmFlYjZiMjFhNDRmM2VhY2FlNTc5NTY5YzM0ZTcxNzI1YWZmODAxYTJmZTY4NzM5XCIsIFwiMHgzMzNmOTkxZmEzYTg3MDU3NWY4MTk1NjllOWY3MmE3NzFlYTc5MDA3OGQ0NDhjYzg3ODkxMjBlZTE0YWJmM2M1XCJdLFxuICAgICAgICBtZW1vOiAnYTRhN2M0MzI5YWFiNGIxZmFjNDc0ZmY2ZjkzZDg1OGMnLFxuICAgICAgICBhYmk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIFwiY29uc3RhbnRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImlucHV0c1wiOiBbe1wibmFtZVwiOiBcInByb3BlcnR5SURcIiwgXCJ0eXBlXCI6IFwidWludDI0XCJ9LCB7XCJuYW1lXCI6IFwiYW1vdW50XCIsIFwidHlwZVwiOiBcInVpbnQyNTZcIn0sIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJ4XCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidWludDE2XCJcbiAgICAgICAgICAgIH0sIHtcIm5hbWVcIjogXCJ5XCIsIFwidHlwZVwiOiBcInVpbnQxNlwifSwge1wibmFtZVwiOiBcInZcIiwgXCJ0eXBlXCI6IFwidWludDhcIn0sIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJyXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwiXG4gICAgICAgICAgICB9LCB7XCJuYW1lXCI6IFwic1wiLCBcInR5cGVcIjogXCJieXRlczMyXCJ9XSxcbiAgICAgICAgICAgIFwibmFtZVwiOiBcImJ1eVByb3BlcnR5XCIsXG4gICAgICAgICAgICBcIm91dHB1dHNcIjogW3tcIm5hbWVcIjogXCJcIiwgXCJ0eXBlXCI6IFwic3RyaW5nXCJ9XSxcbiAgICAgICAgICAgIFwicGF5YWJsZVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJzdGF0ZU11dGFiaWxpdHlcIjogXCJwYXlhYmxlXCIsXG4gICAgICAgICAgICBcInR5cGVcIjogXCJmdW5jdGlvblwiXG4gICAgICAgIH0pLFxuICAgICAgICByZWRpcmVjdDogJ3tcIm5vblBheWluZ0FjY291bnRcIjogXCIvaW5zdWZmaWNpZW50LWFtb3VudC9cIixcIm5vQWNjb3VudFwiOiBcIi9hY2NvdW50LW5vdC1wYWlyZWRcIixcImhvbWVQYWdlXCI6IFwiL1wifScsXG4gICAgICAgIGV4dGVuc2lvbmlkOiAncGRqanBjb2xnbW1jaWZpanBlamtlbnBiYmltZWRwaWMnLFxuICAgIH07XG5cbiAgICBjb25zb2xlLmxvZyhKU09OLnBhcnNlKG9iamVjdC5hYmkpKTtcbiAgICBsZXQgZXh0ZW5kZWQgPSBleHRlbmRPYmplY3Qob2JqZWN0LCBwYXJhbXMucGFyYW1zKTtcbiAgICBjb25zb2xlLmxvZyhleHRlbmRlZCk7XG4gICAgbGV0IENvbnRyYWN0b2JqZWN0ID0gJzxoZWRlcmEtY29udHJhY3QgJztcbiAgICBmb3IgKHZhciBpIGluIF9fY29uc3RydWN0KSB7XG4gICAgICAgIGxldCBub2RlID0gX19jb25zdHJ1Y3RbaV07XG4gICAgICAgIGlmIChleHRlbmRlZC5oYXNPd25Qcm9wZXJ0eShub2RlKSkge1xuICAgICAgICAgICAgQ29udHJhY3RvYmplY3QgKz0gXCJkYXRhLVwiICsgbm9kZSArIFwiPSAnXCIgKyBleHRlbmRlZFtub2RlXSArIFwiJyBcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBDb250cmFjdG9iamVjdCArPSAnPjwvaGVkZXJhLWNvbnRyYWN0Pic7XG4gICAgY29uc29sZS5sb2coQ29udHJhY3RvYmplY3QpO1xuXG4gICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChleHRlbmRlZFsnYXR0cklEJ10pO1xuICAgIGJvZHkuaW5uZXJIVE1MICs9IENvbnRyYWN0b2JqZWN0O1xuICAgIC8vY29uc29sZS5sb2coKEhlZGVyYW9iamVjdCkpXG4gICAgcmV0dXJuIENvbnRyYWN0b2JqZWN0O1xuICAgIC8vY2FsbGJhY2soSGVkZXJhb2JqZWN0KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tUcmFuc2FjdGlvbihwYXJhbXMpIHtcblxuICAgIGNvbnNvbGUubG9nKFwiaW4gY2hlY2sgdHJhbnNcIilcbiAgICBsZXQgbWVtb19pZCA9IHBhcmFtcy5jb25maWd1cmF0aW9uLm1lbW87XG4gICAgbGV0IHVybCA9IHByb2R1Y3Rpb24gPyBcImh0dHBzOi8vbXBzLmhhc2hpbmdzeXN0ZW1zLmNvbVwiIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6OTk5OSc7XG4gICAgbGV0IHN0cnVjdHVyZSA9IHtcbiAgICAgICAgYmFzZXVybDogdXJsLFxuICAgICAgICBtZW1vX2lkOiBtZW1vX2lkLFxuICAgICAgICByZWNlaXZlcl9pZDogJycsXG4gICAgICAgIHN1Y2Nlc3M6ICcvc3VjY2VzcycsXG4gICAgICAgIGZhaWx1cmU6ICcvcGF5bWVudC1mYWlsZWQnLFxuICAgICAgICB0aW1lb3V0OiAzMDAwLFxuICAgICAgICBsaW1pdDogMVxuICAgIH07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gcGFyYW1zLnBhcmFtcykge1xuICAgICAgICBpZiAocGFyYW1zLnBhcmFtcy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHBhcmFtcy5wYXJhbXNba2V5XSkge1xuICAgICAgICAgICAgc3RydWN0dXJlW2tleV0gPSBwYXJhbXMucGFyYW1zW2tleV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3RydWN0dXJlLnJlY2VpdmVyX2lkICYmIHN0cnVjdHVyZS5tZW1vX2lkKSB7XG4gICAgICAgIFVSTCA9IHN0cnVjdHVyZS5iYXNldXJsICsgXCIvY2hlY2svXCIgKyBzdHJ1Y3R1cmUucmVjZWl2ZXJfaWQgKyBcIi9cIiArIHN0cnVjdHVyZS5tZW1vX2lkXG4gICAgfSBlbHNlIHtcbiAgICAgICAgVVJMID0gc3RydWN0dXJlLmJhc2V1cmwgKyBcIi9tZW1vL1wiICsgc3RydWN0dXJlLm1lbW9faWQgKyAnP2xpbWl0PScgKyBzdHJ1Y3R1cmUubGltaXQ7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHN0cnVjdHVyZS50aW1lb3V0KTtcbiAgICAvL3NldFRpbWVvdXQocGVyZm9ybVJlcXVlc3Qoc3RydWN0dXJlKSwgc3RydWN0dXJlLnRpbWVvdXQpXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBlcmZvcm1SZXF1ZXN0KHN0cnVjdHVyZSk7XG4gICAgfSwgc3RydWN0dXJlLnRpbWVvdXQpO1xufVxuXG52YXIgcGVyZm9ybVJlcXVlc3QgPSBmdW5jdGlvbiAoc3RydWN0dXJlKSB7XG4gICAgY29uc29sZS5sb2coc3RydWN0dXJlKVxuICAgIHZhciB4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UucmVzcG9uc2UubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UucmVzcG9uc2UubGVuZ3RoID4gNSkge1xuICAgICAgICAgICAgICAgICAgICAvKndpbmRvdy5vcGVuKFxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Lm9yaWdpbiArIHN0cnVjdHVyZS5zdWNjZXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ19ibGFuaydcbiAgICAgICAgICAgICAgICAgICAgKTsqL1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cub3JpZ2luICsgc3RydWN0dXJlLnN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBzdHJ1Y3R1cmUuZmFpbHVyZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uod2luZG93Lm9yaWdpbiArIHN0cnVjdHVyZS5zdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAvL2NhbGxiYWNrKG51bGwsIHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL2NhbGxiYWNrKHtlcnJvcjogdHJ1ZSwgZGF0YTogdGhpcy5yZXNwb25zZX0sIG51bGwpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBzdHJ1Y3R1cmUuZmFpbHVyZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHhodHRwLm9wZW4oXCJHRVRcIiwgVVJMLCB0cnVlKTtcbiAgICB4aHR0cC5zZW5kKCk7XG59O1xuXG5mdW5jdGlvbiByZWFkeW5lc3NDaGVjayhwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgY29uc29sZS5sb2cocGFyYW1zLmV4dGVuc2lvbmlkKVxuICAgIGxldCByZXNwb25lc2UgPSB7XG4gICAgICAgICdpc2Nocm9tZSc6IHRydWUsXG4gICAgICAgICdhY2NvdW50UGFpcmVkJzogZmFsc2UsXG4gICAgICAgICdpc21vYmlsZSc6IG51bGwsXG4gICAgICAgICd2YWxpZEJyb3dzZXInOiBudWxsLFxuICAgICAgICAnZXh0ZW5zaW9uSW5zdGFsbGVkJzogbnVsbCxcbiAgICAgICAgJ2FjY2Vzc1RvQWNjb3VudHMnOiBudWxsLFxuICAgICAgICAnYWNjb3VudElkJzogJycsXG4gICAgICAgICdzdWJtaXNzaW9uTm9kZSc6ICcnXG4gICAgfTtcbiAgICBsZXQgY2hlY2tJc0Nocm9tZSA9IGlzQ2hyb21lKCk7XG4gICAgcmVzcG9uZXNlLmlzY2hyb21lID0gY2hlY2tJc0Nocm9tZTtcbiAgICBsZXQgbW9iID0gZGV0ZWN0bW9iKCk7XG4gICAgcmVzcG9uZXNlLmlzbW9iaWxlID0gbW9iO1xuICAgIGV4dGVuc2lvbkluc3RhbGVkKHBhcmFtcy5leHRlbnNpb25pZCwgZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICBpZiAocmVzID09ICdubycpIHJlc3BvbmVzZS5leHRlbnNpb25JbnN0YWxsZWQgPSBmYWxzZTtcbiAgICAgICAgZWxzZSByZXNwb25lc2UuZXh0ZW5zaW9uSW5zdGFsbGVkID0gdHJ1ZTtcbiAgICAgICAgY2FsbGJhY2sobnVsbCxyZXNwb25lc2UpO1xuICAgIH0pO1xuXG59XG5cbmZ1bmN0aW9uIGV4dGVuc2lvbkluc3RhbGVkKGV4dGVuc2lvbklkLCBjYWxsYmFjaykge1xuICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcub25lcnJvciA9IGNhbGxiYWNrKFwibm9cIik7XG4gICAgaW1nLm9ubG9hZCA9IGNhbGxiYWNrKFwieWVzXCIpO1xuICAgIGltZy5zcmMgPSAnY2hyb21lLWV4dGVuc2lvbjovLycgKyBleHRlbnNpb25JZCArICcvaWNvbnMvaWNvbjE2LnBuZyc7XG59XG5cbmZ1bmN0aW9uIGRldGVjdG1vYigpIHtcbiAgICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC93ZWJPUy9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGhvbmUvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBhZC9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUG9kL2kpXG4gICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0JsYWNrQmVycnkvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvV2luZG93cyBQaG9uZS9pKVxuICAgICkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5cbmFwcCh3aW5kb3cpO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsIlxuZXhwb3J0IGZ1bmN0aW9uIHBpbmcoKSB7XG4gICAgcmV0dXJuICdwb25nJztcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmljZXMuanMiXSwic291cmNlUm9vdCI6IiJ9