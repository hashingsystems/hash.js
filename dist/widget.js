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

var supportedAPI = ['makepayment', 'test', 'createhederaobject', 'checktransaction', 'createcontractobject', 'init']; // enlist all methods supported by API (e.g. `mw('event', 'user-login');`)

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
function ping() {
  return 'pong';
}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWY3ODhiNTNkYTBiMDhhODg2YjYiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIl0sIm5hbWVzIjpbInN1cHBvcnRlZEFQSSIsInByb2R1Y3Rpb24iLCJhcHAiLCJ3aW5kb3ciLCJjb25zb2xlIiwibG9nIiwiY29uZmlndXJhdGlvbnMiLCJwYXltZW50c2VydmVyIiwiZXh0ZW5zaW9uaWQiLCJlcnJvciIsInR5cGUiLCJ0aW1lIiwiRGF0ZSIsIm5vdyIsInJlZGlyZWN0IiwiaWQiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwic3VibWlzc2lvbm5vZGUiLCJtZW1vIiwicmVjaXBpZW50bGlzdCIsImNvbnRlbnRpZCIsImF0dHJJRCIsImdsb2JhbE9iamVjdCIsInF1ZXVlIiwicSIsImkiLCJsZW5ndGgiLCJ0b0xvd2VyQ2FzZSIsImV4dGVuZE9iamVjdCIsImNyZWF0ZUhlZGVyYU9iamVjdCIsImNoZWNrRm9yRXh0ZW5zaW9uIiwiYXBpSGFuZGxlciIsImNhbGxiYWNrIiwiaXNDaHJvbWUiLCJyZWRpcmVjdFRvRXJyb3IiLCJ0YWdzIiwiYW1vdW50IiwiRVhURU5TSU9OX0lEIiwiZGV0ZWN0IiwicmVzcG9uc2UiLCJyZWNvcmRSZXNwb25zZSIsImV4dGVuc2lvbklkIiwibm90SW5zdGFsbGVkQ2FsbGJhY2siLCJpbnN0YWxsZWRDYWxsYmFjayIsImltZyIsIkltYWdlIiwib25lcnJvciIsIm9ubG9hZCIsInNyYyIsInJlcyIsImJvZHkiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwiZXJyIiwicmVwbGFjZSIsIm9yaWdpbiIsImNvbmZpZ3VyYXRpb24iLCJhcGkiLCJwYXJhbXMiLCJFcnJvciIsImluZGV4T2YiLCJjaGVja1RyYW5zYWN0aW9uIiwiY3JlYXRlQ29udHJhY3RPYmplY3QiLCJpbml0Iiwid2FybiIsImEiLCJiIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJvYmplY3QiLCJIZWRlcmFvYmplY3QiLCJub2RlIiwiZ2V0RWxlbWVudEJ5SWQiLCJfX2NvbnN0cnVjdCIsImNvbnRyYWN0aWQiLCJtYXhpbXVtIiwiYWJpIiwiSlNPTiIsInN0cmluZ2lmeSIsInBhcnNlIiwiZXh0ZW5kZWQiLCJDb250cmFjdG9iamVjdCIsIm1lbW9faWQiLCJ1cmwiLCJzdHJ1Y3R1cmUiLCJiYXNldXJsIiwicmVjZWl2ZXJfaWQiLCJzdWNjZXNzIiwiZmFpbHVyZSIsInRpbWVvdXQiLCJsaW1pdCIsIlVSTCIsInNldFRpbWVvdXQiLCJwZXJmb3JtUmVxdWVzdCIsInhodHRwIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwib3BlbiIsInNlbmQiLCJyZXNwb25lc2UiLCJjaGVja0lzQ2hyb21lIiwiaXNjaHJvbWUiLCJtb2IiLCJkZXRlY3Rtb2IiLCJpc21vYmlsZSIsImV4dGVuc2lvbkluc3RhbGxlZCIsImFqYXhyZXNwIiwiYWNjb3VudElkIiwic2VuZGVyIiwiYWNjb3VudFBhaXJlZCIsImFjY2Vzc1RvQWNjb3VudHMiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJtYXRjaCIsInBpbmciXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM3REE7QUFBQTtBQUFBO0FBSUEsSUFBTUEsWUFBWSxHQUFHLENBQUMsYUFBRCxFQUFnQixNQUFoQixFQUF3QixvQkFBeEIsRUFBOEMsa0JBQTlDLEVBQWtFLHNCQUFsRSxFQUEwRixNQUExRixDQUFyQixDLENBQXdIOztBQUN4SDs7OztBQUdBLElBQU1DLFVBQVUsR0FBRyxJQUFuQjs7QUFFQSxTQUFTQyxHQUFULENBQWFDLE1BQWIsRUFBcUI7QUFDakJDLFNBQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFaO0FBQ0EsTUFBSUMsY0FBYyxHQUFHO0FBQ2pCQyxpQkFBYSxFQUFFTixVQUFVLEdBQUcsZ0NBQUgsR0FBc0MsdUJBRDlDO0FBRWpCTyxlQUFXLEVBQUUsa0NBRkk7QUFHakJDLFNBQUssRUFBRSxlQUhVO0FBSWpCQyxRQUFJLEVBQUUsU0FKVztBQUtqQkMsUUFBSSxFQUFFQyxJQUFJLENBQUNDLEdBQUwsRUFMVztBQU1qQkMsWUFBUSxFQUFFLHNHQU5PO0FBT2pCO0FBQ0FDLE1BQUUsRUFBRVosTUFBTSxDQUFDYSxRQUFQLENBQWdCQyxRQVJIO0FBU2pCQyxrQkFBYyxFQUFFLFFBVEM7QUFVakJDLFFBQUksRUFBRVAsSUFBSSxDQUFDQyxHQUFMLEVBVlc7QUFXakJPLGlCQUFhLEVBQUUsNkNBWEU7QUFZakJDLGFBQVMsRUFBRSxJQVpNO0FBYWpCQyxVQUFNLEVBQUUsV0FiUyxDQWNqQjs7QUFkaUIsR0FBckIsQ0FGaUIsQ0FrQmpCO0FBQ0E7O0FBQ0EsTUFBSUMsWUFBWSxHQUFHcEIsTUFBTSxDQUFDQSxNQUFNLENBQUMsU0FBRCxDQUFQLENBQXpCO0FBQ0EsTUFBSXFCLEtBQUssR0FBR0QsWUFBWSxDQUFDRSxDQUF6Qjs7QUFDQSxNQUFJRCxLQUFKLEVBQVc7QUFDUCxTQUFLLElBQUlFLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdGLEtBQUssQ0FBQ0csTUFBMUIsRUFBa0NELENBQUMsRUFBbkMsRUFBdUM7QUFDbkMsVUFBSSxPQUFPRixLQUFLLENBQUNFLENBQUQsQ0FBTCxDQUFTLENBQVQsQ0FBUCxLQUF1QixXQUF2QixJQUFzQ0YsS0FBSyxDQUFDRSxDQUFELENBQUwsQ0FBUyxDQUFULEVBQVlFLFdBQVosTUFBNkIsYUFBdkUsRUFBc0Y7QUFDbEZ0QixzQkFBYyxHQUFHdUIsWUFBWSxDQUFDdkIsY0FBRCxFQUFpQmtCLEtBQUssQ0FBQ0UsQ0FBRCxDQUFMLENBQVMsQ0FBVCxDQUFqQixDQUE3QjtBQUNBSSwwQkFBa0IsQ0FBQ3hCLGNBQUQsQ0FBbEI7QUFDQUYsZUFBTyxDQUFDQyxHQUFSLENBQVksaUJBQVosRUFBK0JDLGNBQS9CO0FBQ0F5Qix5QkFBaUIsQ0FBQ3pCLGNBQUQsQ0FBakI7QUFDSCxPQUxELE1BS08sSUFBSSxPQUFPa0IsS0FBSyxDQUFDRSxDQUFELENBQUwsQ0FBUyxDQUFULENBQVAsS0FBdUIsV0FBdkIsSUFBc0NGLEtBQUssQ0FBQ0UsQ0FBRCxDQUFMLENBQVMsQ0FBVCxFQUFZRSxXQUFaLE1BQTZCLHNCQUF2RSxFQUErRjtBQUNsR3RCLHNCQUFjLEdBQUd1QixZQUFZLENBQUN2QixjQUFELEVBQWlCa0IsS0FBSyxDQUFDRSxDQUFELENBQUwsQ0FBUyxDQUFULENBQWpCLENBQTdCO0FBQ0FNLGtCQUFVLENBQUMxQixjQUFELEVBQWlCa0IsS0FBSyxDQUFDRSxDQUFELENBQUwsQ0FBUyxDQUFULENBQWpCLEVBQThCRixLQUFLLENBQUNFLENBQUQsQ0FBTCxDQUFTLENBQVQsQ0FBOUIsRUFBMkNGLEtBQUssQ0FBQ0UsQ0FBRCxDQUFMLENBQVMsQ0FBVCxDQUEzQyxDQUFWO0FBQ0FLLHlCQUFpQixDQUFDekIsY0FBRCxDQUFqQjtBQUNILE9BSk0sTUFJQTtBQUNILFlBQUkyQixRQUFRLFNBQVo7O0FBQ0EsWUFBRyxPQUFPVCxLQUFLLENBQUNFLENBQUQsQ0FBTCxDQUFTLENBQVQsQ0FBUCxJQUFvQixVQUF2QixFQUFrQztBQUM5Qk8sa0JBQVEsR0FBR1QsS0FBSyxDQUFDRSxDQUFELENBQUwsQ0FBUyxDQUFULENBQVg7QUFDSCxTQUZELE1BRUs7QUFDRE8sa0JBQVEsR0FBR1QsS0FBSyxDQUFDRSxDQUFELENBQUwsQ0FBU0YsS0FBSyxDQUFDRyxNQUFOLEdBQWUsQ0FBeEIsQ0FBWDtBQUNIOztBQUNEckIsc0JBQWMsR0FBR3VCLFlBQVksQ0FBQ3ZCLGNBQUQsRUFBaUJrQixLQUFLLENBQUNFLENBQUQsQ0FBTCxDQUFTLENBQVQsQ0FBakIsQ0FBN0I7QUFDQU0sa0JBQVUsQ0FBQzFCLGNBQUQsRUFBaUJrQixLQUFLLENBQUNFLENBQUQsQ0FBTCxDQUFTLENBQVQsQ0FBakIsRUFBOEJGLEtBQUssQ0FBQ0UsQ0FBRCxDQUFMLENBQVMsQ0FBVCxDQUE5QixFQUEyQ08sUUFBM0MsQ0FBVjtBQUNIO0FBQ0o7QUFDSixHQTVDZ0IsQ0E2Q2pCO0FBQ0E7OztBQUNBVixjQUFZLEdBQUdTLFVBQWY7QUFDQVQsY0FBWSxDQUFDakIsY0FBYixHQUE4QkEsY0FBOUI7QUFDSDs7QUFFRCxTQUFTeUIsaUJBQVQsQ0FBMkJ6QixjQUEzQixFQUEyQztBQUN2QyxNQUFJLENBQUM0QixRQUFRLEVBQWIsRUFBaUI7QUFDYkMsbUJBQWUsQ0FBQyxjQUFELENBQWY7QUFDSCxHQUZELE1BRU87QUFDSCxRQUFJQyxJQUFJLEdBQUc5QixjQUFYLENBREcsQ0FFSDs7QUFDQSxRQUFJOEIsSUFBSSxDQUFDQyxNQUFMLEtBQWdCLElBQXBCLEVBQTBCLE9BQU8sSUFBUDtBQUMxQixRQUFNQyxZQUFZLEdBQUdGLElBQUksQ0FBQzVCLFdBQTFCO0FBRUErQixVQUFNLENBQUNELFlBQUQsRUFBZSxZQUFZO0FBQzdCSCxxQkFBZSxDQUFDQyxJQUFJLENBQUMzQixLQUFOLENBQWY7QUFDSCxLQUZLLEVBRUgsVUFBVStCLFFBQVYsRUFBb0I7QUFDbkJwQyxhQUFPLENBQUNDLEdBQVIsQ0FBWSxzQ0FBWjtBQUNBb0Msb0JBQWMsQ0FBQ0QsUUFBRCxDQUFkO0FBQ0gsS0FMSyxDQUFOLENBTkcsQ0FhSDs7QUFDQTs7Ozs7Ozs7O0FBU0g7QUFDSjs7QUFFRCxTQUFTRCxNQUFULENBQWdCRyxXQUFoQixFQUE2QkMsb0JBQTdCLEVBQW1EQyxpQkFBbkQsRUFBc0U7QUFDbEUsTUFBSUMsR0FBRyxHQUFHLElBQUlDLEtBQUosRUFBVjtBQUNBRCxLQUFHLENBQUNFLE9BQUosR0FBY0osb0JBQWQ7QUFDQUUsS0FBRyxDQUFDRyxNQUFKLEdBQWFKLGlCQUFpQixDQUFDLFdBQUQsQ0FBOUI7QUFDQUMsS0FBRyxDQUFDSSxHQUFKLEdBQVUsd0JBQXdCUCxXQUF4QixHQUFzQyxtQkFBaEQ7QUFDSDs7QUFFRCxTQUFTRCxjQUFULENBQXdCUyxHQUF4QixFQUE2QjtBQUN6QixNQUFJLE9BQU9BLEdBQVAsSUFBYyxXQUFsQixFQUErQjtBQUMzQixRQUFJQyxJQUFJLEdBQUdDLFFBQVEsQ0FBQ0Msb0JBQVQsQ0FBOEIsTUFBOUIsQ0FBWDtBQUNBRixRQUFJLENBQUNHLFNBQUwsSUFBa0Isa0ZBQWtGSixHQUFsRixHQUF3RixRQUExRztBQUNBLFdBQU8sSUFBUDtBQUNIOztBQUNELFNBQU8sS0FBUDtBQUNIOztBQUVELFNBQVNmLGVBQVQsQ0FBeUJvQixHQUF6QixFQUE4QjtBQUMxQixNQUFJcEQsTUFBTSxDQUFDYSxRQUFQLENBQWdCQyxRQUFoQixJQUE0QnNDLEdBQWhDLEVBQXFDO0FBQ2pDcEQsVUFBTSxDQUFDYSxRQUFQLENBQWdCd0MsT0FBaEIsQ0FBd0JyRCxNQUFNLENBQUNzRCxNQUFQLEdBQWdCRixHQUF4QztBQUNIO0FBQ0o7O0FBRUQsU0FBU3JCLFFBQVQsR0FBb0I7QUFDaEIsU0FBTyxZQUFZL0IsTUFBbkI7QUFDSDtBQUVEOzs7OztBQUdBLFNBQVM2QixVQUFULENBQW9CMEIsYUFBcEIsRUFBbUNDLEdBQW5DLEVBQXdDQyxNQUF4QyxFQUFpRTtBQUFBLE1BQWpCM0IsUUFBaUIsdUVBQU4sSUFBTTtBQUM3RCxNQUFJLENBQUMwQixHQUFMLEVBQVUsTUFBTUUsS0FBSyxDQUFDLHFCQUFELENBQVg7QUFDVkYsS0FBRyxHQUFHQSxHQUFHLENBQUMvQixXQUFKLEVBQU47QUFDQSxNQUFJNUIsWUFBWSxDQUFDOEQsT0FBYixDQUFxQkgsR0FBckIsTUFBOEIsQ0FBQyxDQUFuQyxFQUFzQyxNQUFNRSxLQUFLLGtCQUFXRixHQUFYLHVCQUFYO0FBQ3RDdkQsU0FBTyxDQUFDQyxHQUFSLDZCQUFpQ3NELEdBQWpDLEdBQXdDQyxNQUF4Qzs7QUFDQSxVQUFRRCxHQUFSO0FBQ0k7QUFFQSxTQUFLLG9CQUFMO0FBQ0ksYUFBTzdCLGtCQUFrQixDQUFDOEIsTUFBRCxDQUF6Qjs7QUFFSixTQUFLLGtCQUFMO0FBQ0ksYUFBT0csZ0JBQWdCLENBQUM7QUFBQ0wscUJBQWEsRUFBYkEsYUFBRDtBQUFnQkUsY0FBTSxFQUFOQTtBQUFoQixPQUFELEVBQTBCM0IsUUFBMUIsQ0FBdkI7O0FBRUosU0FBSyxzQkFBTDtBQUNJLGFBQU8rQixvQkFBb0IsQ0FBQztBQUFDTixxQkFBYSxFQUFiQSxhQUFEO0FBQWdCRSxjQUFNLEVBQU5BO0FBQWhCLE9BQUQsRUFBMEIzQixRQUExQixDQUEzQjs7QUFFSixTQUFLLE1BQUw7QUFDSSxhQUFPZ0MsSUFBSSxDQUFDUCxhQUFELEVBQWdCekIsUUFBaEIsQ0FBWDs7QUFFSixTQUFLLE1BQUw7QUFDSSxhQUFPMkIsTUFBUDs7QUFDSjtBQUNJeEQsYUFBTyxDQUFDOEQsSUFBUixrQ0FBdUNQLEdBQXZDO0FBbEJSO0FBb0JIOztBQUVELFNBQVM5QixZQUFULENBQXNCc0MsQ0FBdEIsRUFBeUJDLENBQXpCLEVBQTRCO0FBQ3hCLE9BQUssSUFBSUMsR0FBVCxJQUFnQkQsQ0FBaEI7QUFDSSxRQUFJQSxDQUFDLENBQUNFLGNBQUYsQ0FBaUJELEdBQWpCLENBQUosRUFBMkJGLENBQUMsQ0FBQ0UsR0FBRCxDQUFELEdBQVNELENBQUMsQ0FBQ0MsR0FBRCxDQUFWO0FBRC9COztBQUVBLFNBQU9GLENBQVA7QUFDSDs7QUFFRCxTQUFTckMsa0JBQVQsQ0FBNEI4QixNQUE1QixFQUFvQztBQUNoQyxNQUFJVyxNQUFNLEdBQUcsQ0FBQyxnQkFBRCxFQUFtQixlQUFuQixFQUFvQyxlQUFwQyxFQUFxRCxXQUFyRCxFQUFrRSxNQUFsRSxFQUEwRSxNQUExRSxFQUFrRixhQUFsRixFQUFpRyxVQUFqRyxFQUE2RyxNQUE3RyxDQUFiO0FBQ0EsTUFBSUMsWUFBWSxHQUFHLHVCQUFuQjs7QUFDQSxPQUFLLElBQUk5QyxDQUFULElBQWM2QyxNQUFkLEVBQXNCO0FBQ2xCLFFBQUlFLElBQUksR0FBR0YsTUFBTSxDQUFDN0MsQ0FBRCxDQUFqQjs7QUFDQSxRQUFJa0MsTUFBTSxDQUFDVSxjQUFQLENBQXNCRyxJQUF0QixDQUFKLEVBQWlDO0FBQzdCRCxrQkFBWSxJQUFJLFVBQVVDLElBQVYsR0FBaUIsS0FBakIsR0FBeUJiLE1BQU0sQ0FBQ2EsSUFBRCxDQUEvQixHQUF3QyxNQUF4QyxHQUFpRCxJQUFqRTtBQUNIO0FBQ0o7O0FBQ0RELGNBQVksSUFBSSx5QkFBaEI7QUFDQSxNQUFJckIsSUFBSSxHQUFHQyxRQUFRLENBQUNzQixjQUFULENBQXdCZCxNQUFNLENBQUMsUUFBRCxDQUE5QixDQUFYO0FBQ0FULE1BQUksQ0FBQ0csU0FBTCxJQUFrQmtCLFlBQWxCO0FBQ0EsU0FBT0EsWUFBUDtBQUNIOztBQUVELFNBQVNSLG9CQUFULENBQThCSixNQUE5QixFQUFzQztBQUNsQyxNQUFJZSxXQUFXLEdBQUcsQ0FBQyxZQUFELEVBQWUsU0FBZixFQUEwQixlQUExQixFQUEyQyxRQUEzQyxFQUFxRCxNQUFyRCxFQUE2RCxLQUE3RCxFQUFvRSxVQUFwRSxFQUFnRixhQUFoRixDQUFsQjtBQUNBLE1BQUlKLE1BQU0sR0FBRztBQUNUSyxjQUFVLEVBQUUsVUFESDtBQUVUQyxXQUFPLEVBQUUsV0FGQTtBQUdUdEUsaUJBQWEsRUFBRXFELE1BQU0sQ0FBQ0YsYUFBUCxDQUFxQm5ELGFBSDNCO0FBSVRxRCxVQUFNLEVBQUUsQ0FBQyxLQUFELEVBQVEsV0FBUixFQUFxQixLQUFyQixFQUE0QixLQUE1QixFQUFtQyxJQUFuQyxFQUF5QyxvRUFBekMsRUFBK0csb0VBQS9HLENBSkM7QUFLVHpDLFFBQUksRUFBRSxrQ0FMRztBQU1UMkQsT0FBRyxFQUFFQyxJQUFJLENBQUNDLFNBQUwsQ0FBZTtBQUNoQixrQkFBWSxLQURJO0FBRWhCLGdCQUFVLENBQUM7QUFBQyxnQkFBUSxZQUFUO0FBQXVCLGdCQUFRO0FBQS9CLE9BQUQsRUFBMkM7QUFBQyxnQkFBUSxRQUFUO0FBQW1CLGdCQUFRO0FBQTNCLE9BQTNDLEVBQWtGO0FBQ3hGLGdCQUFRLEdBRGdGO0FBRXhGLGdCQUFRO0FBRmdGLE9BQWxGLEVBR1A7QUFBQyxnQkFBUSxHQUFUO0FBQWMsZ0JBQVE7QUFBdEIsT0FITyxFQUcwQjtBQUFDLGdCQUFRLEdBQVQ7QUFBYyxnQkFBUTtBQUF0QixPQUgxQixFQUcwRDtBQUNoRSxnQkFBUSxHQUR3RDtBQUVoRSxnQkFBUTtBQUZ3RCxPQUgxRCxFQU1QO0FBQUMsZ0JBQVEsR0FBVDtBQUFjLGdCQUFRO0FBQXRCLE9BTk8sQ0FGTTtBQVNoQixjQUFRLGFBVFE7QUFVaEIsaUJBQVcsQ0FBQztBQUFDLGdCQUFRLEVBQVQ7QUFBYSxnQkFBUTtBQUFyQixPQUFELENBVks7QUFXaEIsaUJBQVcsSUFYSztBQVloQix5QkFBbUIsU0FaSDtBQWFoQixjQUFRO0FBYlEsS0FBZixDQU5JO0FBcUJUbEUsWUFBUSxFQUFFLGtHQXJCRDtBQXNCVE4sZUFBVyxFQUFFO0FBdEJKLEdBQWI7QUF5QkFKLFNBQU8sQ0FBQ0MsR0FBUixDQUFZMEUsSUFBSSxDQUFDRSxLQUFMLENBQVdWLE1BQU0sQ0FBQ08sR0FBbEIsQ0FBWjtBQUNBLE1BQUlJLFFBQVEsR0FBR3JELFlBQVksQ0FBQzBDLE1BQUQsRUFBU1gsTUFBTSxDQUFDQSxNQUFoQixDQUEzQjtBQUNBeEQsU0FBTyxDQUFDQyxHQUFSLENBQVk2RSxRQUFaO0FBQ0EsTUFBSUMsY0FBYyxHQUFHLG1CQUFyQjs7QUFDQSxPQUFLLElBQUl6RCxDQUFULElBQWNpRCxXQUFkLEVBQTJCO0FBQ3ZCLFFBQUlGLElBQUksR0FBR0UsV0FBVyxDQUFDakQsQ0FBRCxDQUF0Qjs7QUFDQSxRQUFJd0QsUUFBUSxDQUFDWixjQUFULENBQXdCRyxJQUF4QixDQUFKLEVBQW1DO0FBQy9CVSxvQkFBYyxJQUFJLFVBQVVWLElBQVYsR0FBaUIsS0FBakIsR0FBeUJTLFFBQVEsQ0FBQ1QsSUFBRCxDQUFqQyxHQUEwQyxJQUE1RDtBQUNIO0FBQ0o7O0FBQ0RVLGdCQUFjLElBQUkscUJBQWxCO0FBQ0EvRSxTQUFPLENBQUNDLEdBQVIsQ0FBWThFLGNBQVo7QUFFQSxNQUFJaEMsSUFBSSxHQUFHQyxRQUFRLENBQUNzQixjQUFULENBQXdCUSxRQUFRLENBQUMsUUFBRCxDQUFoQyxDQUFYO0FBQ0EvQixNQUFJLENBQUNHLFNBQUwsSUFBa0I2QixjQUFsQixDQXpDa0MsQ0EwQ2xDOztBQUNBLFNBQU9BLGNBQVAsQ0EzQ2tDLENBNENsQztBQUNIOztBQUVELFNBQVNwQixnQkFBVCxDQUEwQkgsTUFBMUIsRUFBa0M7QUFFOUIsTUFBSXdCLE9BQU8sR0FBR3hCLE1BQU0sQ0FBQ0YsYUFBUCxDQUFxQnZDLElBQW5DO0FBQ0EsTUFBSWtFLEdBQUcsR0FBR3BGLFVBQVUsR0FBRyxnQ0FBSCxHQUFzQyx1QkFBMUQ7QUFDQSxNQUFJcUYsU0FBUyxHQUFHO0FBQ1pDLFdBQU8sRUFBRUYsR0FERztBQUVaRCxXQUFPLEVBQUVBLE9BRkc7QUFHWkksZUFBVyxFQUFFLEVBSEQ7QUFJWkMsV0FBTyxFQUFFLFVBSkc7QUFLWkMsV0FBTyxFQUFFLGlCQUxHO0FBTVpDLFdBQU8sRUFBRSxJQU5HO0FBT1pDLFNBQUssRUFBRTtBQVBLLEdBQWhCOztBQVVBLE9BQUssSUFBSXZCLEdBQVQsSUFBZ0JULE1BQU0sQ0FBQ0EsTUFBdkIsRUFBK0I7QUFDM0IsUUFBSUEsTUFBTSxDQUFDQSxNQUFQLENBQWNVLGNBQWQsQ0FBNkJELEdBQTdCLEtBQXFDVCxNQUFNLENBQUNBLE1BQVAsQ0FBY1MsR0FBZCxDQUF6QyxFQUE2RDtBQUN6RGlCLGVBQVMsQ0FBQ2pCLEdBQUQsQ0FBVCxHQUFpQlQsTUFBTSxDQUFDQSxNQUFQLENBQWNTLEdBQWQsQ0FBakI7QUFDSDtBQUNKOztBQUVELE1BQUlpQixTQUFTLENBQUNFLFdBQVYsSUFBeUJGLFNBQVMsQ0FBQ0YsT0FBdkMsRUFBZ0Q7QUFDNUNTLE9BQUcsR0FBR1AsU0FBUyxDQUFDQyxPQUFWLEdBQW9CLFNBQXBCLEdBQWdDRCxTQUFTLENBQUNFLFdBQTFDLEdBQXdELEdBQXhELEdBQThERixTQUFTLENBQUNGLE9BQTlFO0FBQ0gsR0FGRCxNQUVPO0FBQ0hTLE9BQUcsR0FBR1AsU0FBUyxDQUFDQyxPQUFWLEdBQW9CLFFBQXBCLEdBQStCRCxTQUFTLENBQUNGLE9BQXpDLEdBQW1ELFNBQW5ELEdBQStERSxTQUFTLENBQUNNLEtBQS9FO0FBQ0g7O0FBQ0R4RixTQUFPLENBQUNDLEdBQVIsQ0FBWWlGLFNBQVMsQ0FBQ0ssT0FBdEIsRUF6QjhCLENBMEI5Qjs7QUFDQUcsWUFBVSxDQUFDLFlBQVk7QUFDbkJDLGtCQUFjLENBQUNULFNBQUQsQ0FBZDtBQUNILEdBRlMsRUFFUEEsU0FBUyxDQUFDSyxPQUZILENBQVY7QUFHSDs7QUFFRCxJQUFJSSxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLENBQVVULFNBQVYsRUFBcUI7QUFDdENsRixTQUFPLENBQUNDLEdBQVIsQ0FBWWlGLFNBQVo7QUFDQSxNQUFJVSxLQUFLLEdBQUcsSUFBSUMsY0FBSixFQUFaOztBQUNBRCxPQUFLLENBQUNFLGtCQUFOLEdBQTJCLFlBQVk7QUFDbkMsUUFBSSxLQUFLQyxVQUFMLElBQW1CLENBQXZCLEVBQTBCO0FBQ3RCLFVBQUksS0FBS0MsTUFBTCxJQUFlLEdBQW5CLEVBQXdCO0FBQ3BCLFlBQUk1RCxRQUFRLEdBQUd1QyxJQUFJLENBQUNFLEtBQUwsQ0FBVyxLQUFLekMsUUFBaEIsQ0FBZjtBQUNBcEMsZUFBTyxDQUFDQyxHQUFSLENBQVltQyxRQUFaO0FBQ0FwQyxlQUFPLENBQUNDLEdBQVIsQ0FBWW1DLFFBQVEsQ0FBQ0EsUUFBVCxDQUFrQmIsTUFBOUI7O0FBQ0EsWUFBSWEsUUFBUSxDQUFDQSxRQUFULENBQWtCYixNQUFsQixJQUE0QixDQUFoQyxFQUFtQztBQUMvQjs7OztBQUlBeEIsZ0JBQU0sQ0FBQ2EsUUFBUCxDQUFnQndDLE9BQWhCLENBQXdCckQsTUFBTSxDQUFDc0QsTUFBUCxHQUFnQjZCLFNBQVMsQ0FBQ0csT0FBbEQ7QUFDSCxTQU5ELE1BTU87QUFDSHRGLGdCQUFNLENBQUNhLFFBQVAsQ0FBZ0J3QyxPQUFoQixDQUF3QnJELE1BQU0sQ0FBQ3NELE1BQVAsR0FBZ0I2QixTQUFTLENBQUNJLE9BQWxEO0FBQ0gsU0FabUIsQ0FhcEI7QUFDQTs7QUFDSCxPQWZELE1BZU87QUFDSDtBQUNBdkYsY0FBTSxDQUFDYSxRQUFQLENBQWdCd0MsT0FBaEIsQ0FBd0JyRCxNQUFNLENBQUNzRCxNQUFQLEdBQWdCNkIsU0FBUyxDQUFDSSxPQUFsRDtBQUNIO0FBQ0o7QUFDSixHQXRCRDs7QUF1QkFNLE9BQUssQ0FBQ0ssSUFBTixDQUFXLEtBQVgsRUFBa0JSLEdBQWxCLEVBQXVCLElBQXZCO0FBQ0FHLE9BQUssQ0FBQ00sSUFBTjtBQUNILENBNUJEOztBQThCQSxTQUFTckMsSUFBVCxDQUFjTCxNQUFkLEVBQXNCM0IsUUFBdEIsRUFBZ0M7QUFDNUIsTUFBSXNFLFNBQVMsR0FBRztBQUNaLGdCQUFZLElBREE7QUFFWixxQkFBaUIsS0FGTDtBQUdaLGdCQUFZLElBSEE7QUFJWixvQkFBZ0IsSUFKSjtBQUtaLDBCQUFzQixJQUxWO0FBTVosd0JBQW9CLElBTlI7QUFPWixpQkFBYSxJQVBEO0FBUVosc0JBQWtCM0MsTUFBTSxDQUFDMUM7QUFSYixHQUFoQjtBQVVBLE1BQUlzRixhQUFhLEdBQUd0RSxRQUFRLEVBQTVCO0FBQ0FxRSxXQUFTLENBQUNFLFFBQVYsR0FBcUJELGFBQXJCO0FBQ0EsTUFBSUUsR0FBRyxHQUFHQyxTQUFTLEVBQW5CO0FBQ0FKLFdBQVMsQ0FBQ0ssUUFBVixHQUFxQkYsR0FBckI7QUFDQW5FLFFBQU0sQ0FBQ3FCLE1BQU0sQ0FBQ3BELFdBQVIsRUFBcUIsWUFBWTtBQUNuQytGLGFBQVMsQ0FBQ00sa0JBQVYsR0FBK0IsS0FBL0I7QUFDQTVFLFlBQVEsQ0FBQyxJQUFELEVBQU1zRSxTQUFOLENBQVI7QUFDSCxHQUhLLEVBR0gsWUFBWTtBQUNYQSxhQUFTLENBQUNNLGtCQUFWLEdBQStCLElBQS9CO0FBQ0EsUUFBSXRDLE1BQU0sR0FBR3pDLGtCQUFrQixDQUFDOEIsTUFBRCxDQUEvQjtBQUNBLFFBQUl5QixHQUFHLEdBQUdwRixVQUFVLEdBQUcsZ0NBQUgsR0FBc0MsdUJBQTFEO0FBQ0E0RixPQUFHLEdBQUdSLEdBQUcsR0FBRyxRQUFOLEdBQWlCekIsTUFBTSxDQUFDekMsSUFBOUI7QUFDQTJFLGNBQVUsQ0FBQyxZQUFZO0FBQ25CLFVBQUlFLEtBQUssR0FBRyxJQUFJQyxjQUFKLEVBQVo7O0FBQ0FELFdBQUssQ0FBQ0Usa0JBQU4sR0FBMkIsWUFBWTtBQUNuQyxZQUFJLEtBQUtDLFVBQUwsSUFBbUIsQ0FBdkIsRUFBMEI7QUFDdEIsY0FBSSxLQUFLQyxNQUFMLElBQWUsR0FBbkIsRUFBd0I7QUFDcEIsZ0JBQUlVLFFBQVEsR0FBRy9CLElBQUksQ0FBQ0UsS0FBTCxDQUFXLEtBQUt6QyxRQUFoQixDQUFmO0FBQ0FwQyxtQkFBTyxDQUFDQyxHQUFSLENBQVl5RyxRQUFaOztBQUNBLGdCQUFHQSxRQUFRLENBQUN0RSxRQUFULENBQWtCYixNQUFsQixHQUEyQixDQUE5QixFQUFnQztBQUM1QjRFLHVCQUFTLENBQUNRLFNBQVYsR0FBc0JELFFBQVEsQ0FBQ3RFLFFBQVQsQ0FBa0IsQ0FBbEIsRUFBcUJ3RSxNQUEzQztBQUNBVCx1QkFBUyxDQUFDVSxhQUFWLEdBQTBCLElBQTFCO0FBQ0FWLHVCQUFTLENBQUNXLGdCQUFWLEdBQTZCLElBQTdCO0FBQ0FqRixzQkFBUSxDQUFDLElBQUQsRUFBTXNFLFNBQU4sQ0FBUjtBQUNILGFBTEQsTUFLSztBQUNEdEUsc0JBQVEsQ0FBQ3NFLFNBQUQsQ0FBUjtBQUNIO0FBQ0osV0FYRCxNQVdPO0FBQ0hBLHFCQUFTLENBQUNVLGFBQVYsR0FBMEIsS0FBMUI7QUFDQVYscUJBQVMsQ0FBQ1csZ0JBQVYsR0FBNkIsS0FBN0I7QUFDQWpGLG9CQUFRLENBQUMsSUFBRCxFQUFNc0UsU0FBTixDQUFSO0FBQ0g7QUFDSjtBQUNKLE9BbkJEOztBQW9CQVAsV0FBSyxDQUFDSyxJQUFOLENBQVcsS0FBWCxFQUFrQlIsR0FBbEIsRUFBdUIsSUFBdkI7QUFDQUcsV0FBSyxDQUFDTSxJQUFOO0FBQ0gsS0F4QlMsRUF3QlIsSUF4QlEsQ0FBVixDQUxXLENBOEJYO0FBQ0gsR0FsQ0ssQ0FBTjtBQW9DSDs7QUFFRCxTQUFTSyxTQUFULEdBQXFCO0FBQ2pCLE1BQUlRLFNBQVMsQ0FBQ0MsU0FBVixDQUFvQkMsS0FBcEIsQ0FBMEIsVUFBMUIsS0FDR0YsU0FBUyxDQUFDQyxTQUFWLENBQW9CQyxLQUFwQixDQUEwQixRQUExQixDQURILElBRUdGLFNBQVMsQ0FBQ0MsU0FBVixDQUFvQkMsS0FBcEIsQ0FBMEIsU0FBMUIsQ0FGSCxJQUdHRixTQUFTLENBQUNDLFNBQVYsQ0FBb0JDLEtBQXBCLENBQTBCLE9BQTFCLENBSEgsSUFJR0YsU0FBUyxDQUFDQyxTQUFWLENBQW9CQyxLQUFwQixDQUEwQixPQUExQixDQUpILElBS0dGLFNBQVMsQ0FBQ0MsU0FBVixDQUFvQkMsS0FBcEIsQ0FBMEIsYUFBMUIsQ0FMSCxJQU1HRixTQUFTLENBQUNDLFNBQVYsQ0FBb0JDLEtBQXBCLENBQTBCLGdCQUExQixDQU5QLEVBT0U7QUFDRSxXQUFPLElBQVA7QUFDSCxHQVRELE1BU087QUFDSCxXQUFPLEtBQVA7QUFDSDtBQUNKOztBQUdEbkgsR0FBRyxDQUFDQyxNQUFELENBQUgsQzs7Ozs7OztBQ3hWQTtBQUFPLFNBQVNtSCxJQUFULEdBQWdCO0FBQ25CLFNBQU8sTUFBUDtBQUNILEMiLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOWY3ODhiNTNkYTBiMDhhODg2YjYiLCJpbXBvcnQge1xuICAgIHBpbmdcbn0gZnJvbSAnLi9zZXJ2aWNlcydcblxuY29uc3Qgc3VwcG9ydGVkQVBJID0gWydtYWtlcGF5bWVudCcsICd0ZXN0JywgJ2NyZWF0ZWhlZGVyYW9iamVjdCcsICdjaGVja3RyYW5zYWN0aW9uJywgJ2NyZWF0ZWNvbnRyYWN0b2JqZWN0JywgJ2luaXQnXTsgLy8gZW5saXN0IGFsbCBtZXRob2RzIHN1cHBvcnRlZCBieSBBUEkgKGUuZy4gYG13KCdldmVudCcsICd1c2VyLWxvZ2luJyk7YClcbi8qKlxuIFRoZSBtYWluIGVudHJ5IG9mIHRoZSBhcHBsaWNhdGlvblxuICovXG5jb25zdCBwcm9kdWN0aW9uID0gdHJ1ZTtcblxuZnVuY3Rpb24gYXBwKHdpbmRvdykge1xuICAgIGNvbnNvbGUubG9nKCdIQVNILUpTIHN0YXJ0aW5nJyk7XG4gICAgbGV0IGNvbmZpZ3VyYXRpb25zID0ge1xuICAgICAgICBwYXltZW50c2VydmVyOiBwcm9kdWN0aW9uID8gXCJodHRwczovL21wcy5oYXNoaW5nc3lzdGVtcy5jb21cIiA6ICdodHRwOi8vbG9jYWxob3N0Ojk5OTknLFxuICAgICAgICBleHRlbnNpb25pZDogXCJsaWdwYW9uZGFhYmNsZmlnYWdjaWZvYmFlbGVtaWVuYVwiLFxuICAgICAgICBlcnJvcjogXCIvbm8tZXh0ZW5zaW9uXCIsXG4gICAgICAgIHR5cGU6IFwiYXJ0aWNsZVwiLFxuICAgICAgICB0aW1lOiBEYXRlLm5vdygpLFxuICAgICAgICByZWRpcmVjdDogJ3sgXCJub25QYXlpbmdBY2NvdW50XCI6IFwiL2luc3VmZmljaWVudC1hbW91bnQvXCIsIFwibm9BY2NvdW50XCI6IFwiL2FjY291bnQtbm90LXBhaXJlZC9cIiwgXCJob21lUGFnZVwiOiBcIi9cIn0nLFxuICAgICAgICAvLyB0aGlzIG1pZ2h0IG1ha2UgYSBnb29kIGRlZmF1bHQgaWQgZm9yIHRoZSBjb250ZW50XG4gICAgICAgIGlkOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgIHN1Ym1pc3Npb25ub2RlOiBcIjAuMC4xMVwiLFxuICAgICAgICBtZW1vOiBEYXRlLm5vdygpLFxuICAgICAgICByZWNpcGllbnRsaXN0OiAnW3sgXCJ0b1wiOiBcIjAuMC45OVwiLCBcInRpbnliYXJzXCI6IFwiMTY2NjY2N1wiIH1dJyxcbiAgICAgICAgY29udGVudGlkOiAnNzknLFxuICAgICAgICBhdHRySUQ6ICdhcnRpY2xlLTEnLFxuICAgICAgICAvL3JlZGlyZWN0Oid7IFwibm9uUGF5aW5nQWNjb3VudFwiOiBcIi9pbnN1ZmZpY2llbnQtYW1vdW50L1wiLCBcIm5vQWNjb3VudFwiOiBcIi9hY2NvdW50LW5vdC1wYWlyZWQvXCIsIFwiaG9tZVBhZ2VcIjogXCIvXCIgfScsXG4gICAgfTtcbiAgICAvLyBhbGwgbWV0aG9kcyB0aGF0IHdlcmUgY2FsbGVkIHRpbGwgbm93IGFuZCBzdG9yZWQgaW4gcXVldWVcbiAgICAvLyBuZWVkcyB0byBiZSBjYWxsZWQgbm93XG4gICAgbGV0IGdsb2JhbE9iamVjdCA9IHdpbmRvd1t3aW5kb3dbJ0hBU0gtSlMnXV07XG4gICAgbGV0IHF1ZXVlID0gZ2xvYmFsT2JqZWN0LnE7XG4gICAgaWYgKHF1ZXVlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcXVldWVbaV1bMF0gIT09ICd1bmRlZmluZWQnICYmIHF1ZXVlW2ldWzBdLnRvTG93ZXJDYXNlKCkgPT0gJ21ha2VwYXltZW50Jykge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25zID0gZXh0ZW5kT2JqZWN0KGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgICAgICAgICAgY3JlYXRlSGVkZXJhT2JqZWN0KGNvbmZpZ3VyYXRpb25zKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSEFTSC1KUyBzdGFydGVkJywgY29uZmlndXJhdGlvbnMpO1xuICAgICAgICAgICAgICAgIGNoZWNrRm9yRXh0ZW5zaW9uKGNvbmZpZ3VyYXRpb25zKVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcXVldWVbaV1bMF0gIT09ICd1bmRlZmluZWQnICYmIHF1ZXVlW2ldWzBdLnRvTG93ZXJDYXNlKCkgPT0gJ2NyZWF0ZWNvbnRyYWN0b2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25zID0gZXh0ZW5kT2JqZWN0KGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgICAgICAgICAgYXBpSGFuZGxlcihjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMF0sIHF1ZXVlW2ldWzFdLCBxdWV1ZVtpXVsyXSk7XG4gICAgICAgICAgICAgICAgY2hlY2tGb3JFeHRlbnNpb24oY29uZmlndXJhdGlvbnMpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBjYWxsYmFjaztcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YgcXVldWVbaV1bMV09PSdmdW5jdGlvbicpe1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayA9IHF1ZXVlW2ldWzFdO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayA9IHF1ZXVlW2ldW3F1ZXVlLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9ucyA9IGV4dGVuZE9iamVjdChjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMV0pO1xuICAgICAgICAgICAgICAgIGFwaUhhbmRsZXIoY29uZmlndXJhdGlvbnMsIHF1ZXVlW2ldWzBdLCBxdWV1ZVtpXVsxXSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIG92ZXJyaWRlIHRlbXBvcmFyeSAodW50aWwgdGhlIGFwcCBsb2FkZWQpIGhhbmRsZXJcbiAgICAvLyBmb3Igd2lkZ2V0J3MgQVBJIGNhbGxzXG4gICAgZ2xvYmFsT2JqZWN0ID0gYXBpSGFuZGxlcjtcbiAgICBnbG9iYWxPYmplY3QuY29uZmlndXJhdGlvbnMgPSBjb25maWd1cmF0aW9ucztcbn1cblxuZnVuY3Rpb24gY2hlY2tGb3JFeHRlbnNpb24oY29uZmlndXJhdGlvbnMpIHtcbiAgICBpZiAoIWlzQ2hyb21lKCkpIHtcbiAgICAgICAgcmVkaXJlY3RUb0Vycm9yKCcvaXNub3RDaHJvbWUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgdGFncyA9IGNvbmZpZ3VyYXRpb25zO1xuICAgICAgICAvLyBpZiB0YWdzLmFtb3VudCBpcyBudWxsIG9yIHVuZGVmaW5lZCwgd2Ugc2hvdWxkIGFzc3VtZSB0aGF0IHRoaXMgaXMgYSBmcmVlIHBhZ2UgYW5kIGRvIG5vdGhpbmcgbW9yZVxuICAgICAgICBpZiAodGFncy5hbW91bnQgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBFWFRFTlNJT05fSUQgPSB0YWdzLmV4dGVuc2lvbmlkO1xuXG4gICAgICAgIGRldGVjdChFWFRFTlNJT05fSUQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJlZGlyZWN0VG9FcnJvcih0YWdzLmVycm9yKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZGV0ZWN0OiB1c2VyIGhhcyBleHRlbnNpb24gaW5zdGFsbGVkJyk7XG4gICAgICAgICAgICByZWNvcmRSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coY2hyb21lLnJ1bnRpbWUuY29ubmVjdChFWFRFTlNJT05fSUQsJ3ZlcnNpb24nKSk7XG4gICAgICAgIC8qY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoRVhURU5TSU9OX0lELCAndmVyc2lvbicsIHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJlZGlyZWN0VG9FcnJvcih0YWdzLmVycm9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVjb3JkUmVzcG9uc2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSovXG4gICAgfVxufVxuXG5mdW5jdGlvbiBkZXRlY3QoZXh0ZW5zaW9uSWQsIG5vdEluc3RhbGxlZENhbGxiYWNrLCBpbnN0YWxsZWRDYWxsYmFjaykge1xuICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcub25lcnJvciA9IG5vdEluc3RhbGxlZENhbGxiYWNrO1xuICAgIGltZy5vbmxvYWQgPSBpbnN0YWxsZWRDYWxsYmFjaygnaW5zdGFsbGVkJyk7XG4gICAgaW1nLnNyYyA9ICdjaHJvbWUtZXh0ZW5zaW9uOi8vJyArIGV4dGVuc2lvbklkICsgJy9pY29ucy9pY29uMTYucG5nJztcbn1cblxuZnVuY3Rpb24gcmVjb3JkUmVzcG9uc2UocmVzKSB7XG4gICAgaWYgKHR5cGVvZiByZXMgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpO1xuICAgICAgICBib2R5LmlubmVySFRNTCArPSAnPGRpdiBzdHlsZT1cIndpZHRoOjEwMCU7aGVpZ2h0OjUlO29wYWNpdHk6MC4zO3otaW5kZXg6MTAwO2JhY2tncm91bmQ6eWVsbG93O1wiPicgKyByZXMgKyAnPC9kaXY+JztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gcmVkaXJlY3RUb0Vycm9yKGVycikge1xuICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgIT0gZXJyKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBlcnIpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNDaHJvbWUoKSB7XG4gICAgcmV0dXJuICdjaHJvbWUnIGluIHdpbmRvd1xufVxuXG4vKipcbiBNZXRob2QgdGhhdCBoYW5kbGVzIGFsbCBBUEkgY2FsbHNcbiAqL1xuZnVuY3Rpb24gYXBpSGFuZGxlcihjb25maWd1cmF0aW9uLCBhcGksIHBhcmFtcywgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgaWYgKCFhcGkpIHRocm93IEVycm9yKCdBUEkgbWV0aG9kIHJlcXVpcmVkJyk7XG4gICAgYXBpID0gYXBpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHN1cHBvcnRlZEFQSS5pbmRleE9mKGFwaSkgPT09IC0xKSB0aHJvdyBFcnJvcihgTWV0aG9kICR7YXBpfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgY29uc29sZS5sb2coYEhhbmRsaW5nIEFQSSBjYWxsICR7YXBpfWAsIHBhcmFtcyk7XG4gICAgc3dpdGNoIChhcGkpIHtcbiAgICAgICAgLy8gVE9ETzogYWRkIEFQSSBpbXBsZW1lbnRhdGlvblxuXG4gICAgICAgIGNhc2UgJ2NyZWF0ZWhlZGVyYW9iamVjdCc6XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlSGVkZXJhT2JqZWN0KHBhcmFtcyk7XG5cbiAgICAgICAgY2FzZSAnY2hlY2t0cmFuc2FjdGlvbic6XG4gICAgICAgICAgICByZXR1cm4gY2hlY2tUcmFuc2FjdGlvbih7Y29uZmlndXJhdGlvbiwgcGFyYW1zfSwgY2FsbGJhY2spO1xuXG4gICAgICAgIGNhc2UgJ2NyZWF0ZWNvbnRyYWN0b2JqZWN0JzpcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVDb250cmFjdE9iamVjdCh7Y29uZmlndXJhdGlvbiwgcGFyYW1zfSwgY2FsbGJhY2spO1xuXG4gICAgICAgIGNhc2UgJ2luaXQnOlxuICAgICAgICAgICAgcmV0dXJuIGluaXQoY29uZmlndXJhdGlvbiwgY2FsbGJhY2spO1xuXG4gICAgICAgIGNhc2UgJ3Rlc3QnOlxuICAgICAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgTm8gaGFuZGxlciBkZWZpbmVkIGZvciAke2FwaX1gKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGV4dGVuZE9iamVjdChhLCBiKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGIpXG4gICAgICAgIGlmIChiLmhhc093blByb3BlcnR5KGtleSkpIGFba2V5XSA9IGJba2V5XTtcbiAgICByZXR1cm4gYTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSGVkZXJhT2JqZWN0KHBhcmFtcykge1xuICAgIGxldCBvYmplY3QgPSBbJ3N1Ym1pc3Npb25ub2RlJywgJ3BheW1lbnRzZXJ2ZXInLCAncmVjaXBpZW50bGlzdCcsICdjb250ZW50aWQnLCAndHlwZScsICdtZW1vJywgJ2V4dGVuc2lvbmlkJywgJ3JlZGlyZWN0JywgJ3RpbWUnXTtcbiAgICBsZXQgSGVkZXJhb2JqZWN0ID0gJzxoZWRlcmEtbWljcm9wYXltZW50ICc7XG4gICAgZm9yICh2YXIgaSBpbiBvYmplY3QpIHtcbiAgICAgICAgbGV0IG5vZGUgPSBvYmplY3RbaV07XG4gICAgICAgIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkobm9kZSkpIHtcbiAgICAgICAgICAgIEhlZGVyYW9iamVjdCArPSBcImRhdGEtXCIgKyBub2RlICsgXCI9ICdcIiArIHBhcmFtc1tub2RlXSArIFwiJyAsIFwiICsgXCJcXG5cIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBIZWRlcmFvYmplY3QgKz0gJz48L2hlZGVyYS1taWNyb3BheW1lbnQ+JztcbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmFtc1snYXR0cklEJ10pO1xuICAgIGJvZHkuaW5uZXJIVE1MICs9IEhlZGVyYW9iamVjdDtcbiAgICByZXR1cm4gSGVkZXJhb2JqZWN0O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb250cmFjdE9iamVjdChwYXJhbXMpIHtcbiAgICBsZXQgX19jb25zdHJ1Y3QgPSBbJ2NvbnRyYWN0aWQnLCAnbWF4aW11bScsICdwYXltZW50c2VydmVyJywgJ3BhcmFtcycsICdtZW1vJywgJ2FiaScsICdyZWRpcmVjdCcsICdleHRlbnNpb25pZCddO1xuICAgIGxldCBvYmplY3QgPSB7XG4gICAgICAgIGNvbnRyYWN0aWQ6ICcwLjAuMTExMScsXG4gICAgICAgIG1heGltdW06ICc0MjIzNDIzNDMnLFxuICAgICAgICBwYXltZW50c2VydmVyOiBwYXJhbXMuY29uZmlndXJhdGlvbi5wYXltZW50c2VydmVyLFxuICAgICAgICBwYXJhbXM6IFtcIjg2OVwiLCBcIjEwMDAwMDAwMFwiLCBcIjIxNlwiLCBcIjI1M1wiLCBcIjI3XCIsIFwiMHgyMjZiMDg5NzZhZDBkZDk4MmFlYjZiMjFhNDRmM2VhY2FlNTc5NTY5YzM0ZTcxNzI1YWZmODAxYTJmZTY4NzM5XCIsIFwiMHgzMzNmOTkxZmEzYTg3MDU3NWY4MTk1NjllOWY3MmE3NzFlYTc5MDA3OGQ0NDhjYzg3ODkxMjBlZTE0YWJmM2M1XCJdLFxuICAgICAgICBtZW1vOiAnYTRhN2M0MzI5YWFiNGIxZmFjNDc0ZmY2ZjkzZDg1OGMnLFxuICAgICAgICBhYmk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIFwiY29uc3RhbnRcIjogZmFsc2UsXG4gICAgICAgICAgICBcImlucHV0c1wiOiBbe1wibmFtZVwiOiBcInByb3BlcnR5SURcIiwgXCJ0eXBlXCI6IFwidWludDI0XCJ9LCB7XCJuYW1lXCI6IFwiYW1vdW50XCIsIFwidHlwZVwiOiBcInVpbnQyNTZcIn0sIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJ4XCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidWludDE2XCJcbiAgICAgICAgICAgIH0sIHtcIm5hbWVcIjogXCJ5XCIsIFwidHlwZVwiOiBcInVpbnQxNlwifSwge1wibmFtZVwiOiBcInZcIiwgXCJ0eXBlXCI6IFwidWludDhcIn0sIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJyXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwiXG4gICAgICAgICAgICB9LCB7XCJuYW1lXCI6IFwic1wiLCBcInR5cGVcIjogXCJieXRlczMyXCJ9XSxcbiAgICAgICAgICAgIFwibmFtZVwiOiBcImJ1eVByb3BlcnR5XCIsXG4gICAgICAgICAgICBcIm91dHB1dHNcIjogW3tcIm5hbWVcIjogXCJcIiwgXCJ0eXBlXCI6IFwic3RyaW5nXCJ9XSxcbiAgICAgICAgICAgIFwicGF5YWJsZVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJzdGF0ZU11dGFiaWxpdHlcIjogXCJwYXlhYmxlXCIsXG4gICAgICAgICAgICBcInR5cGVcIjogXCJmdW5jdGlvblwiXG4gICAgICAgIH0pLFxuICAgICAgICByZWRpcmVjdDogJ3tcIm5vblBheWluZ0FjY291bnRcIjogXCIvaW5zdWZmaWNpZW50LWFtb3VudC9cIixcIm5vQWNjb3VudFwiOiBcIi9hY2NvdW50LW5vdC1wYWlyZWRcIixcImhvbWVQYWdlXCI6IFwiL1wifScsXG4gICAgICAgIGV4dGVuc2lvbmlkOiAncGRqanBjb2xnbW1jaWZpanBlamtlbnBiYmltZWRwaWMnLFxuICAgIH07XG5cbiAgICBjb25zb2xlLmxvZyhKU09OLnBhcnNlKG9iamVjdC5hYmkpKTtcbiAgICBsZXQgZXh0ZW5kZWQgPSBleHRlbmRPYmplY3Qob2JqZWN0LCBwYXJhbXMucGFyYW1zKTtcbiAgICBjb25zb2xlLmxvZyhleHRlbmRlZCk7XG4gICAgbGV0IENvbnRyYWN0b2JqZWN0ID0gJzxoZWRlcmEtY29udHJhY3QgJztcbiAgICBmb3IgKHZhciBpIGluIF9fY29uc3RydWN0KSB7XG4gICAgICAgIGxldCBub2RlID0gX19jb25zdHJ1Y3RbaV07XG4gICAgICAgIGlmIChleHRlbmRlZC5oYXNPd25Qcm9wZXJ0eShub2RlKSkge1xuICAgICAgICAgICAgQ29udHJhY3RvYmplY3QgKz0gXCJkYXRhLVwiICsgbm9kZSArIFwiPSAnXCIgKyBleHRlbmRlZFtub2RlXSArIFwiJyBcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBDb250cmFjdG9iamVjdCArPSAnPjwvaGVkZXJhLWNvbnRyYWN0Pic7XG4gICAgY29uc29sZS5sb2coQ29udHJhY3RvYmplY3QpO1xuXG4gICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChleHRlbmRlZFsnYXR0cklEJ10pO1xuICAgIGJvZHkuaW5uZXJIVE1MICs9IENvbnRyYWN0b2JqZWN0O1xuICAgIC8vY29uc29sZS5sb2coKEhlZGVyYW9iamVjdCkpXG4gICAgcmV0dXJuIENvbnRyYWN0b2JqZWN0O1xuICAgIC8vY2FsbGJhY2soSGVkZXJhb2JqZWN0KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tUcmFuc2FjdGlvbihwYXJhbXMpIHtcblxuICAgIGxldCBtZW1vX2lkID0gcGFyYW1zLmNvbmZpZ3VyYXRpb24ubWVtbztcbiAgICBsZXQgdXJsID0gcHJvZHVjdGlvbiA/IFwiaHR0cHM6Ly9tcHMuaGFzaGluZ3N5c3RlbXMuY29tXCIgOiAnaHR0cDovL2xvY2FsaG9zdDo5OTk5JztcbiAgICBsZXQgc3RydWN0dXJlID0ge1xuICAgICAgICBiYXNldXJsOiB1cmwsXG4gICAgICAgIG1lbW9faWQ6IG1lbW9faWQsXG4gICAgICAgIHJlY2VpdmVyX2lkOiAnJyxcbiAgICAgICAgc3VjY2VzczogJy9zdWNjZXNzJyxcbiAgICAgICAgZmFpbHVyZTogJy9wYXltZW50LWZhaWxlZCcsXG4gICAgICAgIHRpbWVvdXQ6IDMwMDAsXG4gICAgICAgIGxpbWl0OiAxXG4gICAgfTtcblxuICAgIGZvciAodmFyIGtleSBpbiBwYXJhbXMucGFyYW1zKSB7XG4gICAgICAgIGlmIChwYXJhbXMucGFyYW1zLmhhc093blByb3BlcnR5KGtleSkgJiYgcGFyYW1zLnBhcmFtc1trZXldKSB7XG4gICAgICAgICAgICBzdHJ1Y3R1cmVba2V5XSA9IHBhcmFtcy5wYXJhbXNba2V5XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdHJ1Y3R1cmUucmVjZWl2ZXJfaWQgJiYgc3RydWN0dXJlLm1lbW9faWQpIHtcbiAgICAgICAgVVJMID0gc3RydWN0dXJlLmJhc2V1cmwgKyBcIi9jaGVjay9cIiArIHN0cnVjdHVyZS5yZWNlaXZlcl9pZCArIFwiL1wiICsgc3RydWN0dXJlLm1lbW9faWRcbiAgICB9IGVsc2Uge1xuICAgICAgICBVUkwgPSBzdHJ1Y3R1cmUuYmFzZXVybCArIFwiL21lbW8vXCIgKyBzdHJ1Y3R1cmUubWVtb19pZCArICc/bGltaXQ9JyArIHN0cnVjdHVyZS5saW1pdDtcbiAgICB9XG4gICAgY29uc29sZS5sb2coc3RydWN0dXJlLnRpbWVvdXQpO1xuICAgIC8vc2V0VGltZW91dChwZXJmb3JtUmVxdWVzdChzdHJ1Y3R1cmUpLCBzdHJ1Y3R1cmUudGltZW91dClcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcGVyZm9ybVJlcXVlc3Qoc3RydWN0dXJlKTtcbiAgICB9LCBzdHJ1Y3R1cmUudGltZW91dCk7XG59XG5cbnZhciBwZXJmb3JtUmVxdWVzdCA9IGZ1bmN0aW9uIChzdHJ1Y3R1cmUpIHtcbiAgICBjb25zb2xlLmxvZyhzdHJ1Y3R1cmUpXG4gICAgdmFyIHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5yZXNwb25zZS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZXNwb25zZS5sZW5ndGggPj0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvKndpbmRvdy5vcGVuKFxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Lm9yaWdpbiArIHN0cnVjdHVyZS5zdWNjZXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ19ibGFuaydcbiAgICAgICAgICAgICAgICAgICAgKTsqL1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cub3JpZ2luICsgc3RydWN0dXJlLnN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBzdHJ1Y3R1cmUuZmFpbHVyZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uod2luZG93Lm9yaWdpbiArIHN0cnVjdHVyZS5zdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAvL2NhbGxiYWNrKG51bGwsIHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL2NhbGxiYWNrKHtlcnJvcjogdHJ1ZSwgZGF0YTogdGhpcy5yZXNwb25zZX0sIG51bGwpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBzdHJ1Y3R1cmUuZmFpbHVyZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHhodHRwLm9wZW4oXCJHRVRcIiwgVVJMLCB0cnVlKTtcbiAgICB4aHR0cC5zZW5kKCk7XG59O1xuXG5mdW5jdGlvbiBpbml0KHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICBsZXQgcmVzcG9uZXNlID0ge1xuICAgICAgICAnaXNjaHJvbWUnOiB0cnVlLFxuICAgICAgICAnYWNjb3VudFBhaXJlZCc6IGZhbHNlLFxuICAgICAgICAnaXNtb2JpbGUnOiBudWxsLFxuICAgICAgICAndmFsaWRCcm93c2VyJzogbnVsbCxcbiAgICAgICAgJ2V4dGVuc2lvbkluc3RhbGxlZCc6IG51bGwsXG4gICAgICAgICdhY2Nlc3NUb0FjY291bnRzJzogbnVsbCxcbiAgICAgICAgJ2FjY291bnRJZCc6IG51bGwsXG4gICAgICAgICdzdWJtaXNzaW9uTm9kZSc6IHBhcmFtcy5zdWJtaXNzaW9ubm9kZVxuICAgIH07XG4gICAgbGV0IGNoZWNrSXNDaHJvbWUgPSBpc0Nocm9tZSgpO1xuICAgIHJlc3BvbmVzZS5pc2Nocm9tZSA9IGNoZWNrSXNDaHJvbWU7XG4gICAgbGV0IG1vYiA9IGRldGVjdG1vYigpO1xuICAgIHJlc3BvbmVzZS5pc21vYmlsZSA9IG1vYjtcbiAgICBkZXRlY3QocGFyYW1zLmV4dGVuc2lvbmlkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlc3BvbmVzZS5leHRlbnNpb25JbnN0YWxsZWQgPSBmYWxzZTtcbiAgICAgICAgY2FsbGJhY2sobnVsbCxyZXNwb25lc2UpO1xuICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVzcG9uZXNlLmV4dGVuc2lvbkluc3RhbGxlZCA9IHRydWU7XG4gICAgICAgIGxldCBvYmplY3QgPSBjcmVhdGVIZWRlcmFPYmplY3QocGFyYW1zKTtcbiAgICAgICAgbGV0IHVybCA9IHByb2R1Y3Rpb24gPyBcImh0dHBzOi8vbXBzLmhhc2hpbmdzeXN0ZW1zLmNvbVwiIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6OTk5OSc7XG4gICAgICAgIFVSTCA9IHVybCArIFwiL21lbW8vXCIgKyBwYXJhbXMubWVtbztcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHhodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFqYXhyZXNwID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFqYXhyZXNwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFqYXhyZXNwLnJlc3BvbnNlLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbmVzZS5hY2NvdW50SWQgPSBhamF4cmVzcC5yZXNwb25zZVswXS5zZW5kZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uZXNlLmFjY291bnRQYWlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbmVzZS5hY2Nlc3NUb0FjY291bnRzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLHJlc3BvbmVzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXNwb25lc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uZXNlLmFjY291bnRQYWlyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbmVzZS5hY2Nlc3NUb0FjY291bnRzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLHJlc3BvbmVzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGh0dHAub3BlbihcIkdFVFwiLCBVUkwsIHRydWUpO1xuICAgICAgICAgICAgeGh0dHAuc2VuZCgpO1xuICAgICAgICB9LDUwMDApO1xuICAgICAgICAvL2NhbGxiYWNrKG51bGwscmVzcG9uZXNlKTtcbiAgICB9KTtcblxufVxuXG5mdW5jdGlvbiBkZXRlY3Rtb2IoKSB7XG4gICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0FuZHJvaWQvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvd2ViT1MvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBob25lL2kpXG4gICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQYWQvaSlcbiAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBvZC9pKVxuICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9CbGFja0JlcnJ5L2kpXG4gICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1dpbmRvd3MgUGhvbmUvaSlcbiAgICApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuXG5hcHAod2luZG93KTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21haW4uanMiLCJcbmV4cG9ydCBmdW5jdGlvbiBwaW5nKCkge1xuICAgIHJldHVybiAncG9uZyc7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2VzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==