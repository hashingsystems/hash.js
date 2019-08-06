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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTIyMjc1MDBkYmE1NWUzYThlZmQiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIl0sIm5hbWVzIjpbInN1cHBvcnRlZEFQSSIsInByb2R1Y3Rpb24iLCJhcHAiLCJ3aW5kb3ciLCJjb25zb2xlIiwibG9nIiwiY29uZmlndXJhdGlvbnMiLCJwYXltZW50c2VydmVyIiwiZXh0ZW5zaW9uaWQiLCJlcnJvciIsInR5cGUiLCJ0aW1lIiwiRGF0ZSIsIm5vdyIsInJlZGlyZWN0IiwiaWQiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwic3VibWlzc2lvbm5vZGUiLCJtZW1vIiwicmVjaXBpZW50bGlzdCIsImNvbnRlbnRpZCIsImF0dHJJRCIsImdsb2JhbE9iamVjdCIsInF1ZXVlIiwicSIsImkiLCJsZW5ndGgiLCJ0b0xvd2VyQ2FzZSIsImV4dGVuZE9iamVjdCIsImNyZWF0ZUhlZGVyYU9iamVjdCIsImNoZWNrRm9yRXh0ZW5zaW9uIiwiYXBpSGFuZGxlciIsImlzQ2hyb21lIiwicmVkaXJlY3RUb0Vycm9yIiwidGFncyIsImFtb3VudCIsIkVYVEVOU0lPTl9JRCIsImRldGVjdCIsInJlc3BvbnNlIiwicmVjb3JkUmVzcG9uc2UiLCJleHRlbnNpb25JZCIsIm5vdEluc3RhbGxlZENhbGxiYWNrIiwiaW5zdGFsbGVkQ2FsbGJhY2siLCJpbWciLCJJbWFnZSIsIm9uZXJyb3IiLCJvbmxvYWQiLCJzcmMiLCJyZXMiLCJib2R5IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImlubmVySFRNTCIsImVyciIsInJlcGxhY2UiLCJvcmlnaW4iLCJjb25maWd1cmF0aW9uIiwiYXBpIiwicGFyYW1zIiwiY2FsbGJhY2siLCJFcnJvciIsImluZGV4T2YiLCJjaGVja1RyYW5zYWN0aW9uIiwiY3JlYXRlQ29udHJhY3RPYmplY3QiLCJyZWFkeW5lc3NDaGVjayIsIndhcm4iLCJhIiwiYiIsImtleSIsImhhc093blByb3BlcnR5Iiwib2JqZWN0IiwiSGVkZXJhb2JqZWN0Iiwibm9kZSIsImdldEVsZW1lbnRCeUlkIiwiX19jb25zdHJ1Y3QiLCJjb250cmFjdGlkIiwibWF4aW11bSIsImFiaSIsIkpTT04iLCJzdHJpbmdpZnkiLCJwYXJzZSIsImV4dGVuZGVkIiwiQ29udHJhY3RvYmplY3QiLCJtZW1vX2lkIiwidXJsIiwic3RydWN0dXJlIiwiYmFzZXVybCIsInJlY2VpdmVyX2lkIiwic3VjY2VzcyIsImZhaWx1cmUiLCJ0aW1lb3V0IiwibGltaXQiLCJVUkwiLCJzZXRUaW1lb3V0IiwicGVyZm9ybVJlcXVlc3QiLCJ4aHR0cCIsIlhNTEh0dHBSZXF1ZXN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsIm9wZW4iLCJzZW5kIiwicmVzcG9uZXNlIiwiY2hlY2tJc0Nocm9tZSIsImlzY2hyb21lIiwibW9iIiwiZGV0ZWN0bW9iIiwiaXNtb2JpbGUiLCJleHRlbnNpb25JbnN0YWxsZWQiLCJhamF4cmVzcCIsImFjY291bnRJZCIsInNlbmRlciIsImFjY291bnRQYWlyZWQiLCJhY2Nlc3NUb0FjY291bnRzIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwibWF0Y2giLCJwaW5nIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDN0RBO0FBQUE7QUFBQTtBQUlBLElBQU1BLFlBQVksR0FBRyxDQUFDLE1BQUQsRUFBUyxNQUFULEVBQWlCLG9CQUFqQixFQUF1QyxrQkFBdkMsRUFBMkQsc0JBQTNELEVBQW1GLGdCQUFuRixDQUFyQixDLENBQTJIOztBQUMzSDs7OztBQUdBLElBQU1DLFVBQVUsR0FBRyxJQUFuQjs7QUFFQSxTQUFTQyxHQUFULENBQWFDLE1BQWIsRUFBcUI7QUFDakJDLFNBQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFaO0FBQ0EsTUFBSUMsY0FBYyxHQUFHO0FBQ2pCQyxpQkFBYSxFQUFFTixVQUFVLEdBQUcsZ0NBQUgsR0FBc0MsdUJBRDlDO0FBRWpCTyxlQUFXLEVBQUUsa0NBRkk7QUFHakJDLFNBQUssRUFBRSxlQUhVO0FBSWpCQyxRQUFJLEVBQUUsU0FKVztBQUtqQkMsUUFBSSxFQUFFQyxJQUFJLENBQUNDLEdBQUwsRUFMVztBQU1qQkMsWUFBUSxFQUFFLHNHQU5PO0FBT2pCO0FBQ0FDLE1BQUUsRUFBRVosTUFBTSxDQUFDYSxRQUFQLENBQWdCQyxRQVJIO0FBU2pCQyxrQkFBYyxFQUFFLFFBVEM7QUFVakJDLFFBQUksRUFBRVAsSUFBSSxDQUFDQyxHQUFMLEVBVlc7QUFXakJPLGlCQUFhLEVBQUUsNkNBWEU7QUFZakJDLGFBQVMsRUFBRSxJQVpNO0FBYWpCQyxVQUFNLEVBQUUsV0FiUyxDQWNqQjs7QUFkaUIsR0FBckIsQ0FGaUIsQ0FrQmpCO0FBQ0E7O0FBQ0EsTUFBSUMsWUFBWSxHQUFHcEIsTUFBTSxDQUFDQSxNQUFNLENBQUMsU0FBRCxDQUFQLENBQXpCO0FBQ0EsTUFBSXFCLEtBQUssR0FBR0QsWUFBWSxDQUFDRSxDQUF6Qjs7QUFDQSxNQUFJRCxLQUFKLEVBQVc7QUFDUCxTQUFLLElBQUlFLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdGLEtBQUssQ0FBQ0csTUFBMUIsRUFBa0NELENBQUMsRUFBbkMsRUFBdUM7QUFDbkMsVUFBSSxPQUFPRixLQUFLLENBQUNFLENBQUQsQ0FBTCxDQUFTLENBQVQsQ0FBUCxLQUF1QixXQUF2QixJQUFzQ0YsS0FBSyxDQUFDRSxDQUFELENBQUwsQ0FBUyxDQUFULEVBQVlFLFdBQVosTUFBNkIsTUFBdkUsRUFBK0U7QUFDM0V0QixzQkFBYyxHQUFHdUIsWUFBWSxDQUFDdkIsY0FBRCxFQUFpQmtCLEtBQUssQ0FBQ0UsQ0FBRCxDQUFMLENBQVMsQ0FBVCxDQUFqQixDQUE3QjtBQUNBSSwwQkFBa0IsQ0FBQ3hCLGNBQUQsQ0FBbEI7QUFDQUYsZUFBTyxDQUFDQyxHQUFSLENBQVksaUJBQVosRUFBK0JDLGNBQS9CO0FBQ0F5Qix5QkFBaUIsQ0FBQ3pCLGNBQUQsQ0FBakI7QUFDSCxPQUxELE1BS08sSUFBSSxPQUFPa0IsS0FBSyxDQUFDRSxDQUFELENBQUwsQ0FBUyxDQUFULENBQVAsS0FBdUIsV0FBdkIsSUFBc0NGLEtBQUssQ0FBQ0UsQ0FBRCxDQUFMLENBQVMsQ0FBVCxFQUFZRSxXQUFaLE1BQTZCLHNCQUF2RSxFQUErRjtBQUNsR3RCLHNCQUFjLEdBQUd1QixZQUFZLENBQUN2QixjQUFELEVBQWlCa0IsS0FBSyxDQUFDRSxDQUFELENBQUwsQ0FBUyxDQUFULENBQWpCLENBQTdCO0FBQ0FNLGtCQUFVLENBQUMxQixjQUFELEVBQWlCa0IsS0FBSyxDQUFDRSxDQUFELENBQUwsQ0FBUyxDQUFULENBQWpCLEVBQThCRixLQUFLLENBQUNFLENBQUQsQ0FBTCxDQUFTLENBQVQsQ0FBOUIsRUFBMkNGLEtBQUssQ0FBQ0UsQ0FBRCxDQUFMLENBQVMsQ0FBVCxDQUEzQyxDQUFWO0FBQ0FLLHlCQUFpQixDQUFDekIsY0FBRCxDQUFqQjtBQUNILE9BSk0sTUFJQTtBQUNIQSxzQkFBYyxHQUFHdUIsWUFBWSxDQUFDdkIsY0FBRCxFQUFpQmtCLEtBQUssQ0FBQ0UsQ0FBRCxDQUFMLENBQVMsQ0FBVCxDQUFqQixDQUE3QjtBQUNBTSxrQkFBVSxDQUFDMUIsY0FBRCxFQUFpQmtCLEtBQUssQ0FBQ0UsQ0FBRCxDQUFMLENBQVMsQ0FBVCxDQUFqQixFQUE4QkYsS0FBSyxDQUFDRSxDQUFELENBQUwsQ0FBUyxDQUFULENBQTlCLEVBQTJDRixLQUFLLENBQUNFLENBQUQsQ0FBTCxDQUFTLENBQVQsQ0FBM0MsQ0FBVjtBQUNIO0FBQ0o7QUFDSixHQXRDZ0IsQ0F1Q2pCO0FBQ0E7OztBQUNBSCxjQUFZLEdBQUdTLFVBQWY7QUFDQVQsY0FBWSxDQUFDakIsY0FBYixHQUE4QkEsY0FBOUI7QUFDSDs7QUFFRCxTQUFTeUIsaUJBQVQsQ0FBMkJ6QixjQUEzQixFQUEyQztBQUN2QyxNQUFJLENBQUMyQixRQUFRLEVBQWIsRUFBaUI7QUFDYkMsbUJBQWUsQ0FBQyxjQUFELENBQWY7QUFDSCxHQUZELE1BRU87QUFDSCxRQUFJQyxJQUFJLEdBQUc3QixjQUFYLENBREcsQ0FFSDs7QUFDQSxRQUFJNkIsSUFBSSxDQUFDQyxNQUFMLEtBQWdCLElBQXBCLEVBQTBCLE9BQU8sSUFBUDtBQUMxQixRQUFNQyxZQUFZLEdBQUdGLElBQUksQ0FBQzNCLFdBQTFCO0FBRUE4QixVQUFNLENBQUNELFlBQUQsRUFBZSxZQUFZO0FBQzdCSCxxQkFBZSxDQUFDQyxJQUFJLENBQUMxQixLQUFOLENBQWY7QUFDSCxLQUZLLEVBRUgsVUFBVThCLFFBQVYsRUFBb0I7QUFDbkJuQyxhQUFPLENBQUNDLEdBQVIsQ0FBWSxzQ0FBWjtBQUNBbUMsb0JBQWMsQ0FBQ0QsUUFBRCxDQUFkO0FBQ0gsS0FMSyxDQUFOLENBTkcsQ0FhSDs7QUFDQTs7Ozs7Ozs7O0FBU0g7QUFDSjs7QUFFRCxTQUFTRCxNQUFULENBQWdCRyxXQUFoQixFQUE2QkMsb0JBQTdCLEVBQW1EQyxpQkFBbkQsRUFBc0U7QUFDbEUsTUFBSUMsR0FBRyxHQUFHLElBQUlDLEtBQUosRUFBVjtBQUNBRCxLQUFHLENBQUNFLE9BQUosR0FBY0osb0JBQWQ7QUFDQUUsS0FBRyxDQUFDRyxNQUFKLEdBQWFKLGlCQUFpQixDQUFDLFdBQUQsQ0FBOUI7QUFDQUMsS0FBRyxDQUFDSSxHQUFKLEdBQVUsd0JBQXdCUCxXQUF4QixHQUFzQyxtQkFBaEQ7QUFDSDs7QUFFRCxTQUFTRCxjQUFULENBQXdCUyxHQUF4QixFQUE2QjtBQUN6QixNQUFJLE9BQU9BLEdBQVAsSUFBYyxXQUFsQixFQUErQjtBQUMzQixRQUFJQyxJQUFJLEdBQUdDLFFBQVEsQ0FBQ0Msb0JBQVQsQ0FBOEIsTUFBOUIsQ0FBWDtBQUNBRixRQUFJLENBQUNHLFNBQUwsSUFBa0Isa0ZBQWtGSixHQUFsRixHQUF3RixRQUExRztBQUNBLFdBQU8sSUFBUDtBQUNIOztBQUNELFNBQU8sS0FBUDtBQUNIOztBQUVELFNBQVNmLGVBQVQsQ0FBeUJvQixHQUF6QixFQUE4QjtBQUMxQixNQUFJbkQsTUFBTSxDQUFDYSxRQUFQLENBQWdCQyxRQUFoQixJQUE0QnFDLEdBQWhDLEVBQXFDO0FBQ2pDbkQsVUFBTSxDQUFDYSxRQUFQLENBQWdCdUMsT0FBaEIsQ0FBd0JwRCxNQUFNLENBQUNxRCxNQUFQLEdBQWdCRixHQUF4QztBQUNIO0FBQ0o7O0FBRUQsU0FBU3JCLFFBQVQsR0FBb0I7QUFDaEIsU0FBTyxZQUFZOUIsTUFBbkI7QUFDSDtBQUVEOzs7OztBQUdBLFNBQVM2QixVQUFULENBQW9CeUIsYUFBcEIsRUFBbUNDLEdBQW5DLEVBQXdDQyxNQUF4QyxFQUFpRTtBQUFBLE1BQWpCQyxRQUFpQix1RUFBTixJQUFNO0FBQzdELE1BQUksQ0FBQ0YsR0FBTCxFQUFVLE1BQU1HLEtBQUssQ0FBQyxxQkFBRCxDQUFYO0FBQ1ZILEtBQUcsR0FBR0EsR0FBRyxDQUFDOUIsV0FBSixFQUFOO0FBQ0EsTUFBSTVCLFlBQVksQ0FBQzhELE9BQWIsQ0FBcUJKLEdBQXJCLE1BQThCLENBQUMsQ0FBbkMsRUFBc0MsTUFBTUcsS0FBSyxrQkFBV0gsR0FBWCx1QkFBWDtBQUN0Q3RELFNBQU8sQ0FBQ0MsR0FBUiw2QkFBaUNxRCxHQUFqQyxHQUF3Q0MsTUFBeEM7O0FBQ0EsVUFBUUQsR0FBUjtBQUNJO0FBRUEsU0FBSyxvQkFBTDtBQUNJLGFBQU81QixrQkFBa0IsQ0FBQzZCLE1BQUQsQ0FBekI7O0FBRUosU0FBSyxrQkFBTDtBQUNJLGFBQU9JLGdCQUFnQixDQUFDO0FBQUNOLHFCQUFhLEVBQWJBLGFBQUQ7QUFBZ0JFLGNBQU0sRUFBTkE7QUFBaEIsT0FBRCxFQUEwQkMsUUFBMUIsQ0FBdkI7O0FBRUosU0FBSyxzQkFBTDtBQUNJLGFBQU9JLG9CQUFvQixDQUFDO0FBQUNQLHFCQUFhLEVBQWJBLGFBQUQ7QUFBZ0JFLGNBQU0sRUFBTkE7QUFBaEIsT0FBRCxFQUEwQkMsUUFBMUIsQ0FBM0I7O0FBRUosU0FBSyxnQkFBTDtBQUNJLGFBQU9LLGNBQWMsQ0FBQ1IsYUFBRCxFQUFnQkcsUUFBaEIsQ0FBckI7O0FBRUosU0FBSyxNQUFMO0FBQ0ksYUFBT0QsTUFBUDs7QUFDSjtBQUNJdkQsYUFBTyxDQUFDOEQsSUFBUixrQ0FBdUNSLEdBQXZDO0FBbEJSO0FBb0JIOztBQUVELFNBQVM3QixZQUFULENBQXNCc0MsQ0FBdEIsRUFBeUJDLENBQXpCLEVBQTRCO0FBQ3hCLE9BQUssSUFBSUMsR0FBVCxJQUFnQkQsQ0FBaEI7QUFDSSxRQUFJQSxDQUFDLENBQUNFLGNBQUYsQ0FBaUJELEdBQWpCLENBQUosRUFBMkJGLENBQUMsQ0FBQ0UsR0FBRCxDQUFELEdBQVNELENBQUMsQ0FBQ0MsR0FBRCxDQUFWO0FBRC9COztBQUVBLFNBQU9GLENBQVA7QUFDSDs7QUFFRCxTQUFTckMsa0JBQVQsQ0FBNEI2QixNQUE1QixFQUFvQztBQUNoQyxNQUFJWSxNQUFNLEdBQUcsQ0FBQyxnQkFBRCxFQUFtQixlQUFuQixFQUFvQyxlQUFwQyxFQUFxRCxXQUFyRCxFQUFrRSxNQUFsRSxFQUEwRSxNQUExRSxFQUFrRixhQUFsRixFQUFpRyxVQUFqRyxFQUE2RyxNQUE3RyxDQUFiO0FBQ0EsTUFBSUMsWUFBWSxHQUFHLHVCQUFuQjs7QUFDQSxPQUFLLElBQUk5QyxDQUFULElBQWM2QyxNQUFkLEVBQXNCO0FBQ2xCLFFBQUlFLElBQUksR0FBR0YsTUFBTSxDQUFDN0MsQ0FBRCxDQUFqQjs7QUFDQSxRQUFJaUMsTUFBTSxDQUFDVyxjQUFQLENBQXNCRyxJQUF0QixDQUFKLEVBQWlDO0FBQzdCRCxrQkFBWSxJQUFJLFVBQVVDLElBQVYsR0FBaUIsS0FBakIsR0FBeUJkLE1BQU0sQ0FBQ2MsSUFBRCxDQUEvQixHQUF3QyxNQUF4QyxHQUFpRCxJQUFqRTtBQUNIO0FBQ0o7O0FBQ0RELGNBQVksSUFBSSx5QkFBaEI7QUFDQSxNQUFJdEIsSUFBSSxHQUFHQyxRQUFRLENBQUN1QixjQUFULENBQXdCZixNQUFNLENBQUMsUUFBRCxDQUE5QixDQUFYO0FBQ0FULE1BQUksQ0FBQ0csU0FBTCxJQUFrQm1CLFlBQWxCO0FBQ0EsU0FBT0EsWUFBUDtBQUNIOztBQUVELFNBQVNSLG9CQUFULENBQThCTCxNQUE5QixFQUFzQztBQUNsQyxNQUFJZ0IsV0FBVyxHQUFHLENBQUMsWUFBRCxFQUFlLFNBQWYsRUFBMEIsZUFBMUIsRUFBMkMsUUFBM0MsRUFBcUQsTUFBckQsRUFBNkQsS0FBN0QsRUFBb0UsVUFBcEUsRUFBZ0YsYUFBaEYsQ0FBbEI7QUFDQSxNQUFJSixNQUFNLEdBQUc7QUFDVEssY0FBVSxFQUFFLFVBREg7QUFFVEMsV0FBTyxFQUFFLFdBRkE7QUFHVHRFLGlCQUFhLEVBQUVvRCxNQUFNLENBQUNGLGFBQVAsQ0FBcUJsRCxhQUgzQjtBQUlUb0QsVUFBTSxFQUFFLENBQUMsS0FBRCxFQUFRLFdBQVIsRUFBcUIsS0FBckIsRUFBNEIsS0FBNUIsRUFBbUMsSUFBbkMsRUFBeUMsb0VBQXpDLEVBQStHLG9FQUEvRyxDQUpDO0FBS1R4QyxRQUFJLEVBQUUsa0NBTEc7QUFNVDJELE9BQUcsRUFBRUMsSUFBSSxDQUFDQyxTQUFMLENBQWU7QUFDaEIsa0JBQVksS0FESTtBQUVoQixnQkFBVSxDQUFDO0FBQUMsZ0JBQVEsWUFBVDtBQUF1QixnQkFBUTtBQUEvQixPQUFELEVBQTJDO0FBQUMsZ0JBQVEsUUFBVDtBQUFtQixnQkFBUTtBQUEzQixPQUEzQyxFQUFrRjtBQUN4RixnQkFBUSxHQURnRjtBQUV4RixnQkFBUTtBQUZnRixPQUFsRixFQUdQO0FBQUMsZ0JBQVEsR0FBVDtBQUFjLGdCQUFRO0FBQXRCLE9BSE8sRUFHMEI7QUFBQyxnQkFBUSxHQUFUO0FBQWMsZ0JBQVE7QUFBdEIsT0FIMUIsRUFHMEQ7QUFDaEUsZ0JBQVEsR0FEd0Q7QUFFaEUsZ0JBQVE7QUFGd0QsT0FIMUQsRUFNUDtBQUFDLGdCQUFRLEdBQVQ7QUFBYyxnQkFBUTtBQUF0QixPQU5PLENBRk07QUFTaEIsY0FBUSxhQVRRO0FBVWhCLGlCQUFXLENBQUM7QUFBQyxnQkFBUSxFQUFUO0FBQWEsZ0JBQVE7QUFBckIsT0FBRCxDQVZLO0FBV2hCLGlCQUFXLElBWEs7QUFZaEIseUJBQW1CLFNBWkg7QUFhaEIsY0FBUTtBQWJRLEtBQWYsQ0FOSTtBQXFCVGxFLFlBQVEsRUFBRSxrR0FyQkQ7QUFzQlROLGVBQVcsRUFBRTtBQXRCSixHQUFiO0FBeUJBSixTQUFPLENBQUNDLEdBQVIsQ0FBWTBFLElBQUksQ0FBQ0UsS0FBTCxDQUFXVixNQUFNLENBQUNPLEdBQWxCLENBQVo7QUFDQSxNQUFJSSxRQUFRLEdBQUdyRCxZQUFZLENBQUMwQyxNQUFELEVBQVNaLE1BQU0sQ0FBQ0EsTUFBaEIsQ0FBM0I7QUFDQXZELFNBQU8sQ0FBQ0MsR0FBUixDQUFZNkUsUUFBWjtBQUNBLE1BQUlDLGNBQWMsR0FBRyxtQkFBckI7O0FBQ0EsT0FBSyxJQUFJekQsQ0FBVCxJQUFjaUQsV0FBZCxFQUEyQjtBQUN2QixRQUFJRixJQUFJLEdBQUdFLFdBQVcsQ0FBQ2pELENBQUQsQ0FBdEI7O0FBQ0EsUUFBSXdELFFBQVEsQ0FBQ1osY0FBVCxDQUF3QkcsSUFBeEIsQ0FBSixFQUFtQztBQUMvQlUsb0JBQWMsSUFBSSxVQUFVVixJQUFWLEdBQWlCLEtBQWpCLEdBQXlCUyxRQUFRLENBQUNULElBQUQsQ0FBakMsR0FBMEMsSUFBNUQ7QUFDSDtBQUNKOztBQUNEVSxnQkFBYyxJQUFJLHFCQUFsQjtBQUNBL0UsU0FBTyxDQUFDQyxHQUFSLENBQVk4RSxjQUFaO0FBRUEsTUFBSWpDLElBQUksR0FBR0MsUUFBUSxDQUFDdUIsY0FBVCxDQUF3QlEsUUFBUSxDQUFDLFFBQUQsQ0FBaEMsQ0FBWDtBQUNBaEMsTUFBSSxDQUFDRyxTQUFMLElBQWtCOEIsY0FBbEIsQ0F6Q2tDLENBMENsQzs7QUFDQSxTQUFPQSxjQUFQLENBM0NrQyxDQTRDbEM7QUFDSDs7QUFFRCxTQUFTcEIsZ0JBQVQsQ0FBMEJKLE1BQTFCLEVBQWtDO0FBRTlCLE1BQUl5QixPQUFPLEdBQUd6QixNQUFNLENBQUNGLGFBQVAsQ0FBcUJ0QyxJQUFuQztBQUNBLE1BQUlrRSxHQUFHLEdBQUdwRixVQUFVLEdBQUcsZ0NBQUgsR0FBc0MsdUJBQTFEO0FBQ0EsTUFBSXFGLFNBQVMsR0FBRztBQUNaQyxXQUFPLEVBQUVGLEdBREc7QUFFWkQsV0FBTyxFQUFFQSxPQUZHO0FBR1pJLGVBQVcsRUFBRSxFQUhEO0FBSVpDLFdBQU8sRUFBRSxVQUpHO0FBS1pDLFdBQU8sRUFBRSxpQkFMRztBQU1aQyxXQUFPLEVBQUUsSUFORztBQU9aQyxTQUFLLEVBQUU7QUFQSyxHQUFoQjs7QUFVQSxPQUFLLElBQUl2QixHQUFULElBQWdCVixNQUFNLENBQUNBLE1BQXZCLEVBQStCO0FBQzNCLFFBQUlBLE1BQU0sQ0FBQ0EsTUFBUCxDQUFjVyxjQUFkLENBQTZCRCxHQUE3QixLQUFxQ1YsTUFBTSxDQUFDQSxNQUFQLENBQWNVLEdBQWQsQ0FBekMsRUFBNkQ7QUFDekRpQixlQUFTLENBQUNqQixHQUFELENBQVQsR0FBaUJWLE1BQU0sQ0FBQ0EsTUFBUCxDQUFjVSxHQUFkLENBQWpCO0FBQ0g7QUFDSjs7QUFFRCxNQUFJaUIsU0FBUyxDQUFDRSxXQUFWLElBQXlCRixTQUFTLENBQUNGLE9BQXZDLEVBQWdEO0FBQzVDUyxPQUFHLEdBQUdQLFNBQVMsQ0FBQ0MsT0FBVixHQUFvQixTQUFwQixHQUFnQ0QsU0FBUyxDQUFDRSxXQUExQyxHQUF3RCxHQUF4RCxHQUE4REYsU0FBUyxDQUFDRixPQUE5RTtBQUNILEdBRkQsTUFFTztBQUNIUyxPQUFHLEdBQUdQLFNBQVMsQ0FBQ0MsT0FBVixHQUFvQixRQUFwQixHQUErQkQsU0FBUyxDQUFDRixPQUF6QyxHQUFtRCxTQUFuRCxHQUErREUsU0FBUyxDQUFDTSxLQUEvRTtBQUNIOztBQUNEeEYsU0FBTyxDQUFDQyxHQUFSLENBQVlpRixTQUFTLENBQUNLLE9BQXRCLEVBekI4QixDQTBCOUI7O0FBQ0FHLFlBQVUsQ0FBQyxZQUFZO0FBQ25CQyxrQkFBYyxDQUFDVCxTQUFELENBQWQ7QUFDSCxHQUZTLEVBRVBBLFNBQVMsQ0FBQ0ssT0FGSCxDQUFWO0FBR0g7O0FBRUQsSUFBSUksY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFVVCxTQUFWLEVBQXFCO0FBQ3RDbEYsU0FBTyxDQUFDQyxHQUFSLENBQVlpRixTQUFaO0FBQ0EsTUFBSVUsS0FBSyxHQUFHLElBQUlDLGNBQUosRUFBWjs7QUFDQUQsT0FBSyxDQUFDRSxrQkFBTixHQUEyQixZQUFZO0FBQ25DLFFBQUksS0FBS0MsVUFBTCxJQUFtQixDQUF2QixFQUEwQjtBQUN0QixVQUFJLEtBQUtDLE1BQUwsSUFBZSxHQUFuQixFQUF3QjtBQUNwQixZQUFJN0QsUUFBUSxHQUFHd0MsSUFBSSxDQUFDRSxLQUFMLENBQVcsS0FBSzFDLFFBQWhCLENBQWY7QUFDQW5DLGVBQU8sQ0FBQ0MsR0FBUixDQUFZa0MsUUFBWjtBQUNBbkMsZUFBTyxDQUFDQyxHQUFSLENBQVlrQyxRQUFRLENBQUNBLFFBQVQsQ0FBa0JaLE1BQTlCOztBQUNBLFlBQUlZLFFBQVEsQ0FBQ0EsUUFBVCxDQUFrQlosTUFBbEIsSUFBNEIsQ0FBaEMsRUFBbUM7QUFDL0I7Ozs7QUFJQXhCLGdCQUFNLENBQUNhLFFBQVAsQ0FBZ0J1QyxPQUFoQixDQUF3QnBELE1BQU0sQ0FBQ3FELE1BQVAsR0FBZ0I4QixTQUFTLENBQUNHLE9BQWxEO0FBQ0gsU0FORCxNQU1PO0FBQ0h0RixnQkFBTSxDQUFDYSxRQUFQLENBQWdCdUMsT0FBaEIsQ0FBd0JwRCxNQUFNLENBQUNxRCxNQUFQLEdBQWdCOEIsU0FBUyxDQUFDSSxPQUFsRDtBQUNILFNBWm1CLENBYXBCO0FBQ0E7O0FBQ0gsT0FmRCxNQWVPO0FBQ0g7QUFDQXZGLGNBQU0sQ0FBQ2EsUUFBUCxDQUFnQnVDLE9BQWhCLENBQXdCcEQsTUFBTSxDQUFDcUQsTUFBUCxHQUFnQjhCLFNBQVMsQ0FBQ0ksT0FBbEQ7QUFDSDtBQUNKO0FBQ0osR0F0QkQ7O0FBdUJBTSxPQUFLLENBQUNLLElBQU4sQ0FBVyxLQUFYLEVBQWtCUixHQUFsQixFQUF1QixJQUF2QjtBQUNBRyxPQUFLLENBQUNNLElBQU47QUFDSCxDQTVCRDs7QUE4QkEsU0FBU3JDLGNBQVQsQ0FBd0JOLE1BQXhCLEVBQWdDQyxRQUFoQyxFQUEwQztBQUN0QyxNQUFJMkMsU0FBUyxHQUFHO0FBQ1osZ0JBQVksSUFEQTtBQUVaLHFCQUFpQixLQUZMO0FBR1osZ0JBQVksSUFIQTtBQUlaLG9CQUFnQixJQUpKO0FBS1osMEJBQXNCLElBTFY7QUFNWix3QkFBb0IsSUFOUjtBQU9aLGlCQUFhLElBUEQ7QUFRWixzQkFBa0I1QyxNQUFNLENBQUN6QztBQVJiLEdBQWhCO0FBVUEsTUFBSXNGLGFBQWEsR0FBR3ZFLFFBQVEsRUFBNUI7QUFDQXNFLFdBQVMsQ0FBQ0UsUUFBVixHQUFxQkQsYUFBckI7QUFDQSxNQUFJRSxHQUFHLEdBQUdDLFNBQVMsRUFBbkI7QUFDQUosV0FBUyxDQUFDSyxRQUFWLEdBQXFCRixHQUFyQjtBQUNBcEUsUUFBTSxDQUFDcUIsTUFBTSxDQUFDbkQsV0FBUixFQUFxQixZQUFZO0FBQ25DK0YsYUFBUyxDQUFDTSxrQkFBVixHQUErQixLQUEvQjtBQUNBakQsWUFBUSxDQUFDLElBQUQsRUFBTTJDLFNBQU4sQ0FBUjtBQUNILEdBSEssRUFHSCxZQUFZO0FBQ1hBLGFBQVMsQ0FBQ00sa0JBQVYsR0FBK0IsSUFBL0I7QUFDQSxRQUFJdEMsTUFBTSxHQUFHekMsa0JBQWtCLENBQUM2QixNQUFELENBQS9CO0FBQ0EsUUFBSTBCLEdBQUcsR0FBR3BGLFVBQVUsR0FBRyxnQ0FBSCxHQUFzQyx1QkFBMUQ7QUFDQTRGLE9BQUcsR0FBR1IsR0FBRyxHQUFHLFFBQU4sR0FBaUIxQixNQUFNLENBQUN4QyxJQUE5QjtBQUNBMkUsY0FBVSxDQUFDLFlBQVk7QUFDbkIsVUFBSUUsS0FBSyxHQUFHLElBQUlDLGNBQUosRUFBWjs7QUFDQUQsV0FBSyxDQUFDRSxrQkFBTixHQUEyQixZQUFZO0FBQ25DLFlBQUksS0FBS0MsVUFBTCxJQUFtQixDQUF2QixFQUEwQjtBQUN0QixjQUFJLEtBQUtDLE1BQUwsSUFBZSxHQUFuQixFQUF3QjtBQUNwQixnQkFBSVUsUUFBUSxHQUFHL0IsSUFBSSxDQUFDRSxLQUFMLENBQVcsS0FBSzFDLFFBQWhCLENBQWY7QUFDQW5DLG1CQUFPLENBQUNDLEdBQVIsQ0FBWXlHLFFBQVo7QUFDQVAscUJBQVMsQ0FBQ1EsU0FBVixHQUFzQkQsUUFBUSxDQUFDdkUsUUFBVCxDQUFrQnlFLE1BQXhDO0FBQ0FULHFCQUFTLENBQUNVLGFBQVYsR0FBMEIsSUFBMUI7QUFDQVYscUJBQVMsQ0FBQ1csZ0JBQVYsR0FBNkIsSUFBN0I7QUFDQXRELG9CQUFRLENBQUMsSUFBRCxFQUFNMkMsU0FBTixDQUFSO0FBQ0gsV0FQRCxNQU9PO0FBQ0hBLHFCQUFTLENBQUNVLGFBQVYsR0FBMEIsS0FBMUI7QUFDQVYscUJBQVMsQ0FBQ1csZ0JBQVYsR0FBNkIsS0FBN0I7QUFDQXRELG9CQUFRLENBQUMsSUFBRCxFQUFNMkMsU0FBTixDQUFSO0FBQ0g7QUFDSjtBQUNKLE9BZkQ7O0FBZ0JBUCxXQUFLLENBQUNLLElBQU4sQ0FBVyxLQUFYLEVBQWtCUixHQUFsQixFQUF1QixJQUF2QjtBQUNBRyxXQUFLLENBQUNNLElBQU47QUFDSCxLQXBCUyxFQW9CUixJQXBCUSxDQUFWLENBTFcsQ0EwQlg7QUFDSCxHQTlCSyxDQUFOO0FBZ0NIOztBQUVELFNBQVNLLFNBQVQsR0FBcUI7QUFDakIsTUFBSVEsU0FBUyxDQUFDQyxTQUFWLENBQW9CQyxLQUFwQixDQUEwQixVQUExQixLQUNHRixTQUFTLENBQUNDLFNBQVYsQ0FBb0JDLEtBQXBCLENBQTBCLFFBQTFCLENBREgsSUFFR0YsU0FBUyxDQUFDQyxTQUFWLENBQW9CQyxLQUFwQixDQUEwQixTQUExQixDQUZILElBR0dGLFNBQVMsQ0FBQ0MsU0FBVixDQUFvQkMsS0FBcEIsQ0FBMEIsT0FBMUIsQ0FISCxJQUlHRixTQUFTLENBQUNDLFNBQVYsQ0FBb0JDLEtBQXBCLENBQTBCLE9BQTFCLENBSkgsSUFLR0YsU0FBUyxDQUFDQyxTQUFWLENBQW9CQyxLQUFwQixDQUEwQixhQUExQixDQUxILElBTUdGLFNBQVMsQ0FBQ0MsU0FBVixDQUFvQkMsS0FBcEIsQ0FBMEIsZ0JBQTFCLENBTlAsRUFPRTtBQUNFLFdBQU8sSUFBUDtBQUNILEdBVEQsTUFTTztBQUNILFdBQU8sS0FBUDtBQUNIO0FBQ0o7O0FBR0RuSCxHQUFHLENBQUNDLE1BQUQsQ0FBSCxDOzs7Ozs7O0FDOVVBO0FBQU8sU0FBU21ILElBQVQsR0FBZ0I7QUFDbkIsU0FBTyxNQUFQO0FBQ0gsQyIsImZpbGUiOiJ3aWRnZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlMjIyNzUwMGRiYTU1ZTNhOGVmZCIsImltcG9ydCB7XG4gICAgcGluZ1xufSBmcm9tICcuL3NlcnZpY2VzJ1xuXG5jb25zdCBzdXBwb3J0ZWRBUEkgPSBbJ2luaXQnLCAndGVzdCcsICdjcmVhdGVoZWRlcmFvYmplY3QnLCAnY2hlY2t0cmFuc2FjdGlvbicsICdjcmVhdGVjb250cmFjdG9iamVjdCcsICdyZWFkeW5lc3NjaGVjayddOyAvLyBlbmxpc3QgYWxsIG1ldGhvZHMgc3VwcG9ydGVkIGJ5IEFQSSAoZS5nLiBgbXcoJ2V2ZW50JywgJ3VzZXItbG9naW4nKTtgKVxuLyoqXG4gVGhlIG1haW4gZW50cnkgb2YgdGhlIGFwcGxpY2F0aW9uXG4gKi9cbmNvbnN0IHByb2R1Y3Rpb24gPSB0cnVlO1xuXG5mdW5jdGlvbiBhcHAod2luZG93KSB7XG4gICAgY29uc29sZS5sb2coJ0hBU0gtSlMgc3RhcnRpbmcnKTtcbiAgICBsZXQgY29uZmlndXJhdGlvbnMgPSB7XG4gICAgICAgIHBheW1lbnRzZXJ2ZXI6IHByb2R1Y3Rpb24gPyBcImh0dHBzOi8vbXBzLmhhc2hpbmdzeXN0ZW1zLmNvbVwiIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6OTk5OScsXG4gICAgICAgIGV4dGVuc2lvbmlkOiBcImxpZ3Bhb25kYWFiY2xmaWdhZ2NpZm9iYWVsZW1pZW5hXCIsXG4gICAgICAgIGVycm9yOiBcIi9uby1leHRlbnNpb25cIixcbiAgICAgICAgdHlwZTogXCJhcnRpY2xlXCIsXG4gICAgICAgIHRpbWU6IERhdGUubm93KCksXG4gICAgICAgIHJlZGlyZWN0OiAneyBcIm5vblBheWluZ0FjY291bnRcIjogXCIvaW5zdWZmaWNpZW50LWFtb3VudC9cIiwgXCJub0FjY291bnRcIjogXCIvYWNjb3VudC1ub3QtcGFpcmVkL1wiLCBcImhvbWVQYWdlXCI6IFwiL1wifScsXG4gICAgICAgIC8vIHRoaXMgbWlnaHQgbWFrZSBhIGdvb2QgZGVmYXVsdCBpZCBmb3IgdGhlIGNvbnRlbnRcbiAgICAgICAgaWQ6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgICAgc3VibWlzc2lvbm5vZGU6IFwiMC4wLjExXCIsXG4gICAgICAgIG1lbW86IERhdGUubm93KCksXG4gICAgICAgIHJlY2lwaWVudGxpc3Q6ICdbeyBcInRvXCI6IFwiMC4wLjk5XCIsIFwidGlueWJhcnNcIjogXCIxNjY2NjY3XCIgfV0nLFxuICAgICAgICBjb250ZW50aWQ6ICc3OScsXG4gICAgICAgIGF0dHJJRDogJ2FydGljbGUtMScsXG4gICAgICAgIC8vcmVkaXJlY3Q6J3sgXCJub25QYXlpbmdBY2NvdW50XCI6IFwiL2luc3VmZmljaWVudC1hbW91bnQvXCIsIFwibm9BY2NvdW50XCI6IFwiL2FjY291bnQtbm90LXBhaXJlZC9cIiwgXCJob21lUGFnZVwiOiBcIi9cIiB9JyxcbiAgICB9O1xuICAgIC8vIGFsbCBtZXRob2RzIHRoYXQgd2VyZSBjYWxsZWQgdGlsbCBub3cgYW5kIHN0b3JlZCBpbiBxdWV1ZVxuICAgIC8vIG5lZWRzIHRvIGJlIGNhbGxlZCBub3dcbiAgICBsZXQgZ2xvYmFsT2JqZWN0ID0gd2luZG93W3dpbmRvd1snSEFTSC1KUyddXTtcbiAgICBsZXQgcXVldWUgPSBnbG9iYWxPYmplY3QucTtcbiAgICBpZiAocXVldWUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBxdWV1ZVtpXVswXSAhPT0gJ3VuZGVmaW5lZCcgJiYgcXVldWVbaV1bMF0udG9Mb3dlckNhc2UoKSA9PSAnaW5pdCcpIHtcbiAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9ucyA9IGV4dGVuZE9iamVjdChjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMV0pO1xuICAgICAgICAgICAgICAgIGNyZWF0ZUhlZGVyYU9iamVjdChjb25maWd1cmF0aW9ucyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0hBU0gtSlMgc3RhcnRlZCcsIGNvbmZpZ3VyYXRpb25zKTtcbiAgICAgICAgICAgICAgICBjaGVja0ZvckV4dGVuc2lvbihjb25maWd1cmF0aW9ucylcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHF1ZXVlW2ldWzBdICE9PSAndW5kZWZpbmVkJyAmJiBxdWV1ZVtpXVswXS50b0xvd2VyQ2FzZSgpID09ICdjcmVhdGVjb250cmFjdG9iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9ucyA9IGV4dGVuZE9iamVjdChjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMV0pO1xuICAgICAgICAgICAgICAgIGFwaUhhbmRsZXIoY29uZmlndXJhdGlvbnMsIHF1ZXVlW2ldWzBdLCBxdWV1ZVtpXVsxXSwgcXVldWVbaV1bMl0pO1xuICAgICAgICAgICAgICAgIGNoZWNrRm9yRXh0ZW5zaW9uKGNvbmZpZ3VyYXRpb25zKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9ucyA9IGV4dGVuZE9iamVjdChjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMV0pO1xuICAgICAgICAgICAgICAgIGFwaUhhbmRsZXIoY29uZmlndXJhdGlvbnMsIHF1ZXVlW2ldWzBdLCBxdWV1ZVtpXVsxXSwgcXVldWVbaV1bMl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIG92ZXJyaWRlIHRlbXBvcmFyeSAodW50aWwgdGhlIGFwcCBsb2FkZWQpIGhhbmRsZXJcbiAgICAvLyBmb3Igd2lkZ2V0J3MgQVBJIGNhbGxzXG4gICAgZ2xvYmFsT2JqZWN0ID0gYXBpSGFuZGxlcjtcbiAgICBnbG9iYWxPYmplY3QuY29uZmlndXJhdGlvbnMgPSBjb25maWd1cmF0aW9ucztcbn1cblxuZnVuY3Rpb24gY2hlY2tGb3JFeHRlbnNpb24oY29uZmlndXJhdGlvbnMpIHtcbiAgICBpZiAoIWlzQ2hyb21lKCkpIHtcbiAgICAgICAgcmVkaXJlY3RUb0Vycm9yKCcvaXNub3RDaHJvbWUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgdGFncyA9IGNvbmZpZ3VyYXRpb25zO1xuICAgICAgICAvLyBpZiB0YWdzLmFtb3VudCBpcyBudWxsIG9yIHVuZGVmaW5lZCwgd2Ugc2hvdWxkIGFzc3VtZSB0aGF0IHRoaXMgaXMgYSBmcmVlIHBhZ2UgYW5kIGRvIG5vdGhpbmcgbW9yZVxuICAgICAgICBpZiAodGFncy5hbW91bnQgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBFWFRFTlNJT05fSUQgPSB0YWdzLmV4dGVuc2lvbmlkO1xuXG4gICAgICAgIGRldGVjdChFWFRFTlNJT05fSUQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJlZGlyZWN0VG9FcnJvcih0YWdzLmVycm9yKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZGV0ZWN0OiB1c2VyIGhhcyBleHRlbnNpb24gaW5zdGFsbGVkJyk7XG4gICAgICAgICAgICByZWNvcmRSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coY2hyb21lLnJ1bnRpbWUuY29ubmVjdChFWFRFTlNJT05fSUQsJ3ZlcnNpb24nKSk7XG4gICAgICAgIC8qY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoRVhURU5TSU9OX0lELCAndmVyc2lvbicsIHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJlZGlyZWN0VG9FcnJvcih0YWdzLmVycm9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVjb3JkUmVzcG9uc2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSovXG4gICAgfVxufVxuXG5mdW5jdGlvbiBkZXRlY3QoZXh0ZW5zaW9uSWQsIG5vdEluc3RhbGxlZENhbGxiYWNrLCBpbnN0YWxsZWRDYWxsYmFjaykge1xuICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcub25lcnJvciA9IG5vdEluc3RhbGxlZENhbGxiYWNrO1xuICAgIGltZy5vbmxvYWQgPSBpbnN0YWxsZWRDYWxsYmFjaygnaW5zdGFsbGVkJyk7XG4gICAgaW1nLnNyYyA9ICdjaHJvbWUtZXh0ZW5zaW9uOi8vJyArIGV4dGVuc2lvbklkICsgJy9pY29ucy9pY29uMTYucG5nJztcbn1cblxuZnVuY3Rpb24gcmVjb3JkUmVzcG9uc2UocmVzKSB7XG4gICAgaWYgKHR5cGVvZiByZXMgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpO1xuICAgICAgICBib2R5LmlubmVySFRNTCArPSAnPGRpdiBzdHlsZT1cIndpZHRoOjEwMCU7aGVpZ2h0OjUlO29wYWNpdHk6MC4zO3otaW5kZXg6MTAwO2JhY2tncm91bmQ6eWVsbG93O1wiPicgKyByZXMgKyAnPC9kaXY+JztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gcmVkaXJlY3RUb0Vycm9yKGVycikge1xuICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgIT0gZXJyKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBlcnIpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNDaHJvbWUoKSB7XG4gICAgcmV0dXJuICdjaHJvbWUnIGluIHdpbmRvd1xufVxuXG4vKipcbiBNZXRob2QgdGhhdCBoYW5kbGVzIGFsbCBBUEkgY2FsbHNcbiAqL1xuZnVuY3Rpb24gYXBpSGFuZGxlcihjb25maWd1cmF0aW9uLCBhcGksIHBhcmFtcywgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgaWYgKCFhcGkpIHRocm93IEVycm9yKCdBUEkgbWV0aG9kIHJlcXVpcmVkJyk7XG4gICAgYXBpID0gYXBpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHN1cHBvcnRlZEFQSS5pbmRleE9mKGFwaSkgPT09IC0xKSB0aHJvdyBFcnJvcihgTWV0aG9kICR7YXBpfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgY29uc29sZS5sb2coYEhhbmRsaW5nIEFQSSBjYWxsICR7YXBpfWAsIHBhcmFtcyk7XG4gICAgc3dpdGNoIChhcGkpIHtcbiAgICAgICAgLy8gVE9ETzogYWRkIEFQSSBpbXBsZW1lbnRhdGlvblxuXG4gICAgICAgIGNhc2UgJ2NyZWF0ZWhlZGVyYW9iamVjdCc6XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlSGVkZXJhT2JqZWN0KHBhcmFtcyk7XG5cbiAgICAgICAgY2FzZSAnY2hlY2t0cmFuc2FjdGlvbic6XG4gICAgICAgICAgICByZXR1cm4gY2hlY2tUcmFuc2FjdGlvbih7Y29uZmlndXJhdGlvbiwgcGFyYW1zfSwgY2FsbGJhY2spO1xuXG4gICAgICAgIGNhc2UgJ2NyZWF0ZWNvbnRyYWN0b2JqZWN0JzpcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVDb250cmFjdE9iamVjdCh7Y29uZmlndXJhdGlvbiwgcGFyYW1zfSwgY2FsbGJhY2spO1xuXG4gICAgICAgIGNhc2UgJ3JlYWR5bmVzc2NoZWNrJzpcbiAgICAgICAgICAgIHJldHVybiByZWFkeW5lc3NDaGVjayhjb25maWd1cmF0aW9uLCBjYWxsYmFjayk7XG5cbiAgICAgICAgY2FzZSAndGVzdCc6XG4gICAgICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBObyBoYW5kbGVyIGRlZmluZWQgZm9yICR7YXBpfWApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZXh0ZW5kT2JqZWN0KGEsIGIpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gYilcbiAgICAgICAgaWYgKGIuaGFzT3duUHJvcGVydHkoa2V5KSkgYVtrZXldID0gYltrZXldO1xuICAgIHJldHVybiBhO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVIZWRlcmFPYmplY3QocGFyYW1zKSB7XG4gICAgbGV0IG9iamVjdCA9IFsnc3VibWlzc2lvbm5vZGUnLCAncGF5bWVudHNlcnZlcicsICdyZWNpcGllbnRsaXN0JywgJ2NvbnRlbnRpZCcsICd0eXBlJywgJ21lbW8nLCAnZXh0ZW5zaW9uaWQnLCAncmVkaXJlY3QnLCAndGltZSddO1xuICAgIGxldCBIZWRlcmFvYmplY3QgPSAnPGhlZGVyYS1taWNyb3BheW1lbnQgJztcbiAgICBmb3IgKHZhciBpIGluIG9iamVjdCkge1xuICAgICAgICBsZXQgbm9kZSA9IG9iamVjdFtpXTtcbiAgICAgICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShub2RlKSkge1xuICAgICAgICAgICAgSGVkZXJhb2JqZWN0ICs9IFwiZGF0YS1cIiArIG5vZGUgKyBcIj0gJ1wiICsgcGFyYW1zW25vZGVdICsgXCInICwgXCIgKyBcIlxcblwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIEhlZGVyYW9iamVjdCArPSAnPjwvaGVkZXJhLW1pY3JvcGF5bWVudD4nO1xuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyYW1zWydhdHRySUQnXSk7XG4gICAgYm9keS5pbm5lckhUTUwgKz0gSGVkZXJhb2JqZWN0O1xuICAgIHJldHVybiBIZWRlcmFvYmplY3Q7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbnRyYWN0T2JqZWN0KHBhcmFtcykge1xuICAgIGxldCBfX2NvbnN0cnVjdCA9IFsnY29udHJhY3RpZCcsICdtYXhpbXVtJywgJ3BheW1lbnRzZXJ2ZXInLCAncGFyYW1zJywgJ21lbW8nLCAnYWJpJywgJ3JlZGlyZWN0JywgJ2V4dGVuc2lvbmlkJ107XG4gICAgbGV0IG9iamVjdCA9IHtcbiAgICAgICAgY29udHJhY3RpZDogJzAuMC4xMTExJyxcbiAgICAgICAgbWF4aW11bTogJzQyMjM0MjM0MycsXG4gICAgICAgIHBheW1lbnRzZXJ2ZXI6IHBhcmFtcy5jb25maWd1cmF0aW9uLnBheW1lbnRzZXJ2ZXIsXG4gICAgICAgIHBhcmFtczogW1wiODY5XCIsIFwiMTAwMDAwMDAwXCIsIFwiMjE2XCIsIFwiMjUzXCIsIFwiMjdcIiwgXCIweDIyNmIwODk3NmFkMGRkOTgyYWViNmIyMWE0NGYzZWFjYWU1Nzk1NjljMzRlNzE3MjVhZmY4MDFhMmZlNjg3MzlcIiwgXCIweDMzM2Y5OTFmYTNhODcwNTc1ZjgxOTU2OWU5ZjcyYTc3MWVhNzkwMDc4ZDQ0OGNjODc4OTEyMGVlMTRhYmYzYzVcIl0sXG4gICAgICAgIG1lbW86ICdhNGE3YzQzMjlhYWI0YjFmYWM0NzRmZjZmOTNkODU4YycsXG4gICAgICAgIGFiaTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgXCJjb25zdGFudFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiaW5wdXRzXCI6IFt7XCJuYW1lXCI6IFwicHJvcGVydHlJRFwiLCBcInR5cGVcIjogXCJ1aW50MjRcIn0sIHtcIm5hbWVcIjogXCJhbW91bnRcIiwgXCJ0eXBlXCI6IFwidWludDI1NlwifSwge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcInhcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ1aW50MTZcIlxuICAgICAgICAgICAgfSwge1wibmFtZVwiOiBcInlcIiwgXCJ0eXBlXCI6IFwidWludDE2XCJ9LCB7XCJuYW1lXCI6IFwidlwiLCBcInR5cGVcIjogXCJ1aW50OFwifSwge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcInJcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJieXRlczMyXCJcbiAgICAgICAgICAgIH0sIHtcIm5hbWVcIjogXCJzXCIsIFwidHlwZVwiOiBcImJ5dGVzMzJcIn1dLFxuICAgICAgICAgICAgXCJuYW1lXCI6IFwiYnV5UHJvcGVydHlcIixcbiAgICAgICAgICAgIFwib3V0cHV0c1wiOiBbe1wibmFtZVwiOiBcIlwiLCBcInR5cGVcIjogXCJzdHJpbmdcIn1dLFxuICAgICAgICAgICAgXCJwYXlhYmxlXCI6IHRydWUsXG4gICAgICAgICAgICBcInN0YXRlTXV0YWJpbGl0eVwiOiBcInBheWFibGVcIixcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImZ1bmN0aW9uXCJcbiAgICAgICAgfSksXG4gICAgICAgIHJlZGlyZWN0OiAne1wibm9uUGF5aW5nQWNjb3VudFwiOiBcIi9pbnN1ZmZpY2llbnQtYW1vdW50L1wiLFwibm9BY2NvdW50XCI6IFwiL2FjY291bnQtbm90LXBhaXJlZFwiLFwiaG9tZVBhZ2VcIjogXCIvXCJ9JyxcbiAgICAgICAgZXh0ZW5zaW9uaWQ6ICdwZGpqcGNvbGdtbWNpZmlqcGVqa2VucGJiaW1lZHBpYycsXG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKEpTT04ucGFyc2Uob2JqZWN0LmFiaSkpO1xuICAgIGxldCBleHRlbmRlZCA9IGV4dGVuZE9iamVjdChvYmplY3QsIHBhcmFtcy5wYXJhbXMpO1xuICAgIGNvbnNvbGUubG9nKGV4dGVuZGVkKTtcbiAgICBsZXQgQ29udHJhY3RvYmplY3QgPSAnPGhlZGVyYS1jb250cmFjdCAnO1xuICAgIGZvciAodmFyIGkgaW4gX19jb25zdHJ1Y3QpIHtcbiAgICAgICAgbGV0IG5vZGUgPSBfX2NvbnN0cnVjdFtpXTtcbiAgICAgICAgaWYgKGV4dGVuZGVkLmhhc093blByb3BlcnR5KG5vZGUpKSB7XG4gICAgICAgICAgICBDb250cmFjdG9iamVjdCArPSBcImRhdGEtXCIgKyBub2RlICsgXCI9ICdcIiArIGV4dGVuZGVkW25vZGVdICsgXCInIFwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIENvbnRyYWN0b2JqZWN0ICs9ICc+PC9oZWRlcmEtY29udHJhY3Q+JztcbiAgICBjb25zb2xlLmxvZyhDb250cmFjdG9iamVjdCk7XG5cbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGV4dGVuZGVkWydhdHRySUQnXSk7XG4gICAgYm9keS5pbm5lckhUTUwgKz0gQ29udHJhY3RvYmplY3Q7XG4gICAgLy9jb25zb2xlLmxvZygoSGVkZXJhb2JqZWN0KSlcbiAgICByZXR1cm4gQ29udHJhY3RvYmplY3Q7XG4gICAgLy9jYWxsYmFjayhIZWRlcmFvYmplY3QpO1xufVxuXG5mdW5jdGlvbiBjaGVja1RyYW5zYWN0aW9uKHBhcmFtcykge1xuXG4gICAgbGV0IG1lbW9faWQgPSBwYXJhbXMuY29uZmlndXJhdGlvbi5tZW1vO1xuICAgIGxldCB1cmwgPSBwcm9kdWN0aW9uID8gXCJodHRwczovL21wcy5oYXNoaW5nc3lzdGVtcy5jb21cIiA6ICdodHRwOi8vbG9jYWxob3N0Ojk5OTknO1xuICAgIGxldCBzdHJ1Y3R1cmUgPSB7XG4gICAgICAgIGJhc2V1cmw6IHVybCxcbiAgICAgICAgbWVtb19pZDogbWVtb19pZCxcbiAgICAgICAgcmVjZWl2ZXJfaWQ6ICcnLFxuICAgICAgICBzdWNjZXNzOiAnL3N1Y2Nlc3MnLFxuICAgICAgICBmYWlsdXJlOiAnL3BheW1lbnQtZmFpbGVkJyxcbiAgICAgICAgdGltZW91dDogMzAwMCxcbiAgICAgICAgbGltaXQ6IDFcbiAgICB9O1xuXG4gICAgZm9yICh2YXIga2V5IGluIHBhcmFtcy5wYXJhbXMpIHtcbiAgICAgICAgaWYgKHBhcmFtcy5wYXJhbXMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBwYXJhbXMucGFyYW1zW2tleV0pIHtcbiAgICAgICAgICAgIHN0cnVjdHVyZVtrZXldID0gcGFyYW1zLnBhcmFtc1trZXldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN0cnVjdHVyZS5yZWNlaXZlcl9pZCAmJiBzdHJ1Y3R1cmUubWVtb19pZCkge1xuICAgICAgICBVUkwgPSBzdHJ1Y3R1cmUuYmFzZXVybCArIFwiL2NoZWNrL1wiICsgc3RydWN0dXJlLnJlY2VpdmVyX2lkICsgXCIvXCIgKyBzdHJ1Y3R1cmUubWVtb19pZFxuICAgIH0gZWxzZSB7XG4gICAgICAgIFVSTCA9IHN0cnVjdHVyZS5iYXNldXJsICsgXCIvbWVtby9cIiArIHN0cnVjdHVyZS5tZW1vX2lkICsgJz9saW1pdD0nICsgc3RydWN0dXJlLmxpbWl0O1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhzdHJ1Y3R1cmUudGltZW91dCk7XG4gICAgLy9zZXRUaW1lb3V0KHBlcmZvcm1SZXF1ZXN0KHN0cnVjdHVyZSksIHN0cnVjdHVyZS50aW1lb3V0KVxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBwZXJmb3JtUmVxdWVzdChzdHJ1Y3R1cmUpO1xuICAgIH0sIHN0cnVjdHVyZS50aW1lb3V0KTtcbn1cblxudmFyIHBlcmZvcm1SZXF1ZXN0ID0gZnVuY3Rpb24gKHN0cnVjdHVyZSkge1xuICAgIGNvbnNvbGUubG9nKHN0cnVjdHVyZSlcbiAgICB2YXIgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gNCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgICAgIGxldCByZXNwb25zZSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLnJlc3BvbnNlLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qd2luZG93Lm9wZW4oXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cub3JpZ2luICsgc3RydWN0dXJlLnN1Y2Nlc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAnX2JsYW5rJ1xuICAgICAgICAgICAgICAgICAgICApOyovXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBzdHJ1Y3R1cmUuc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uod2luZG93Lm9yaWdpbiArIHN0cnVjdHVyZS5mYWlsdXJlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy93aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cub3JpZ2luICsgc3RydWN0dXJlLnN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgIC8vY2FsbGJhY2sobnVsbCwgdGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vY2FsbGJhY2soe2Vycm9yOiB0cnVlLCBkYXRhOiB0aGlzLnJlc3BvbnNlfSwgbnVsbCk7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uod2luZG93Lm9yaWdpbiArIHN0cnVjdHVyZS5mYWlsdXJlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgeGh0dHAub3BlbihcIkdFVFwiLCBVUkwsIHRydWUpO1xuICAgIHhodHRwLnNlbmQoKTtcbn07XG5cbmZ1bmN0aW9uIHJlYWR5bmVzc0NoZWNrKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICBsZXQgcmVzcG9uZXNlID0ge1xuICAgICAgICAnaXNjaHJvbWUnOiB0cnVlLFxuICAgICAgICAnYWNjb3VudFBhaXJlZCc6IGZhbHNlLFxuICAgICAgICAnaXNtb2JpbGUnOiBudWxsLFxuICAgICAgICAndmFsaWRCcm93c2VyJzogbnVsbCxcbiAgICAgICAgJ2V4dGVuc2lvbkluc3RhbGxlZCc6IG51bGwsXG4gICAgICAgICdhY2Nlc3NUb0FjY291bnRzJzogbnVsbCxcbiAgICAgICAgJ2FjY291bnRJZCc6IG51bGwsXG4gICAgICAgICdzdWJtaXNzaW9uTm9kZSc6IHBhcmFtcy5zdWJtaXNzaW9ubm9kZVxuICAgIH07XG4gICAgbGV0IGNoZWNrSXNDaHJvbWUgPSBpc0Nocm9tZSgpO1xuICAgIHJlc3BvbmVzZS5pc2Nocm9tZSA9IGNoZWNrSXNDaHJvbWU7XG4gICAgbGV0IG1vYiA9IGRldGVjdG1vYigpO1xuICAgIHJlc3BvbmVzZS5pc21vYmlsZSA9IG1vYjtcbiAgICBkZXRlY3QocGFyYW1zLmV4dGVuc2lvbmlkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlc3BvbmVzZS5leHRlbnNpb25JbnN0YWxsZWQgPSBmYWxzZTtcbiAgICAgICAgY2FsbGJhY2sobnVsbCxyZXNwb25lc2UpO1xuICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVzcG9uZXNlLmV4dGVuc2lvbkluc3RhbGxlZCA9IHRydWU7XG4gICAgICAgIGxldCBvYmplY3QgPSBjcmVhdGVIZWRlcmFPYmplY3QocGFyYW1zKTtcbiAgICAgICAgbGV0IHVybCA9IHByb2R1Y3Rpb24gPyBcImh0dHBzOi8vbXBzLmhhc2hpbmdzeXN0ZW1zLmNvbVwiIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6OTk5OSc7XG4gICAgICAgIFVSTCA9IHVybCArIFwiL21lbW8vXCIgKyBwYXJhbXMubWVtbztcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHhodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFqYXhyZXNwID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFqYXhyZXNwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbmVzZS5hY2NvdW50SWQgPSBhamF4cmVzcC5yZXNwb25zZS5zZW5kZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25lc2UuYWNjb3VudFBhaXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25lc2UuYWNjZXNzVG9BY2NvdW50cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLHJlc3BvbmVzZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25lc2UuYWNjb3VudFBhaXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uZXNlLmFjY2Vzc1RvQWNjb3VudHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwscmVzcG9uZXNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4aHR0cC5vcGVuKFwiR0VUXCIsIFVSTCwgdHJ1ZSk7XG4gICAgICAgICAgICB4aHR0cC5zZW5kKCk7XG4gICAgICAgIH0sNTAwMCk7XG4gICAgICAgIC8vY2FsbGJhY2sobnVsbCxyZXNwb25lc2UpO1xuICAgIH0pO1xuXG59XG5cbmZ1bmN0aW9uIGRldGVjdG1vYigpIHtcbiAgICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC93ZWJPUy9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGhvbmUvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBhZC9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUG9kL2kpXG4gICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0JsYWNrQmVycnkvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvV2luZG93cyBQaG9uZS9pKVxuICAgICkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5cbmFwcCh3aW5kb3cpO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsIlxuZXhwb3J0IGZ1bmN0aW9uIHBpbmcoKSB7XG4gICAgcmV0dXJuICdwb25nJztcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmljZXMuanMiXSwic291cmNlUm9vdCI6IiJ9