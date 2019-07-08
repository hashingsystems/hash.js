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

var supportedAPI = ['init', 'test', 'createhederaobject', 'checktransaction', 'createcontractobject']; // enlist all methods supported by API (e.g. `mw('event', 'user-login');`)

/**
 The main entry of the application
 */

var production = true;

function app(window) {
  console.log(__WEBPACK_IMPORTED_MODULE_0__services__["a" /* ping */]);
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
      console.log('queue:');
      console.log(queue[i]);

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
        console.log(queue);
        configurations = extendObject(configurations, queue[i][1]);
        apiHandler(configurations, queue[i][0], queue[i][1], queue[i][2]);
      }
    }
  } // override temporary (until the app loaded) handler
  // for widget's API calls


  globalObject = apiHandler;
  globalObject.configurations = configurations;
} // checkForExtension handles 3 scenarios
// returns true (hedera-micropayment tag is present and extension is installed)
// returns false (hedera-micropayment tag is present but extension is NOT installed)
// return null (hedera-micropayment is not present because this website does not implement hedera-micropayment)


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
    redirect: JSON.stringify({
      "nonPayingAccount": "/insufficient-amount/",
      "noAccount": "/account-not-paired",
      "homePage": "/"
    }),
    extensionid: 'niajdeokpngbpgpmaolodhlgobpllajp'
  };
  var extended = extendObject(object, params.params);
  console.log(extended);
  var Contractobject = '<hedera-contract ';

  for (var i in __construct) {
    var node = __construct[i];

    if (extended.hasOwnProperty(node)) {
      Contractobject += "data-" + node + "= '" + extended[node] + "' , " + "\n";
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

        if (response.response.length > 0) {
          /*window.open(
              window.origin + structure.success,
              '_blank'
          );*/
          window.location.replace(window.origin + structure.success);
        } else {} //window.location.replace(window.origin + structure.failure);
        //window.location.replace(window.origin + structure.success);
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

app(window);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ping;
function ping() {
  return 'pong';
}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmUyNDdmNTBkYWRkNGEwNmM2ZWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIl0sIm5hbWVzIjpbInN1cHBvcnRlZEFQSSIsInByb2R1Y3Rpb24iLCJhcHAiLCJ3aW5kb3ciLCJjb25zb2xlIiwibG9nIiwicGluZyIsImNvbmZpZ3VyYXRpb25zIiwicGF5bWVudHNlcnZlciIsImV4dGVuc2lvbmlkIiwiZXJyb3IiLCJ0eXBlIiwidGltZSIsIkRhdGUiLCJub3ciLCJyZWRpcmVjdCIsImlkIiwibG9jYXRpb24iLCJwYXRobmFtZSIsInN1Ym1pc3Npb25ub2RlIiwibWVtbyIsImdsb2JhbE9iamVjdCIsInF1ZXVlIiwicSIsImkiLCJsZW5ndGgiLCJ0b0xvd2VyQ2FzZSIsImV4dGVuZE9iamVjdCIsImNyZWF0ZUhlZGVyYU9iamVjdCIsImNoZWNrRm9yRXh0ZW5zaW9uIiwiYXBpSGFuZGxlciIsImlzQ2hyb21lIiwicmVkaXJlY3RUb0Vycm9yIiwidGFncyIsImFtb3VudCIsIkVYVEVOU0lPTl9JRCIsImRldGVjdCIsInJlc3BvbnNlIiwicmVjb3JkUmVzcG9uc2UiLCJleHRlbnNpb25JZCIsIm5vdEluc3RhbGxlZENhbGxiYWNrIiwiaW5zdGFsbGVkQ2FsbGJhY2siLCJpbWciLCJJbWFnZSIsIm9uZXJyb3IiLCJvbmxvYWQiLCJzcmMiLCJyZXMiLCJib2R5IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImlubmVySFRNTCIsImVyciIsInJlcGxhY2UiLCJvcmlnaW4iLCJjb25maWd1cmF0aW9uIiwiYXBpIiwicGFyYW1zIiwiY2FsbGJhY2siLCJFcnJvciIsImluZGV4T2YiLCJjaGVja1RyYW5zYWN0aW9uIiwiY3JlYXRlQ29udHJhY3RPYmplY3QiLCJ3YXJuIiwiYSIsImIiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsIm9iamVjdCIsIkhlZGVyYW9iamVjdCIsIm5vZGUiLCJnZXRFbGVtZW50QnlJZCIsIl9fY29uc3RydWN0IiwiY29udHJhY3RpZCIsIm1heGltdW0iLCJhYmkiLCJKU09OIiwic3RyaW5naWZ5IiwiZXh0ZW5kZWQiLCJDb250cmFjdG9iamVjdCIsIm1lbW9faWQiLCJ1cmwiLCJzdHJ1Y3R1cmUiLCJiYXNldXJsIiwicmVjZWl2ZXJfaWQiLCJzdWNjZXNzIiwiZmFpbHVyZSIsInRpbWVvdXQiLCJsaW1pdCIsIlVSTCIsInNldFRpbWVvdXQiLCJwZXJmb3JtUmVxdWVzdCIsInhodHRwIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicGFyc2UiLCJvcGVuIiwic2VuZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUFBO0FBQUE7QUFJQSxJQUFNQSxZQUFZLEdBQUcsQ0FBQyxNQUFELEVBQVMsTUFBVCxFQUFpQixvQkFBakIsRUFBdUMsa0JBQXZDLEVBQTBELHNCQUExRCxDQUFyQixDLENBQXdHOztBQUN4Rzs7OztBQUdBLElBQU1DLFVBQVUsR0FBRyxJQUFuQjs7QUFFQSxTQUFTQyxHQUFULENBQWFDLE1BQWIsRUFBcUI7QUFDakJDLFNBQU8sQ0FBQ0MsR0FBUixDQUFZQyx1REFBWjtBQUNB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Q0EzQkQ7O0FBOEJBakcsR0FBRyxDQUFDQyxNQUFELENBQUgsQzs7Ozs7OztBQ3ZSQTtBQUFPLFNBQVNHLElBQVQsR0FBZ0I7QUFDbkIsU0FBTyxNQUFQO0FBQ0gsQyIsImZpbGUiOiJ3aWRnZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyZTI0N2Y1MGRhZGQ0YTA2YzZlYiIsImltcG9ydCB7XG4gICAgcGluZ1xufSBmcm9tICcuL3NlcnZpY2VzJ1xuXG5jb25zdCBzdXBwb3J0ZWRBUEkgPSBbJ2luaXQnLCAndGVzdCcsICdjcmVhdGVoZWRlcmFvYmplY3QnLCAnY2hlY2t0cmFuc2FjdGlvbicsJ2NyZWF0ZWNvbnRyYWN0b2JqZWN0J107IC8vIGVubGlzdCBhbGwgbWV0aG9kcyBzdXBwb3J0ZWQgYnkgQVBJIChlLmcuIGBtdygnZXZlbnQnLCAndXNlci1sb2dpbicpO2ApXG4vKipcbiBUaGUgbWFpbiBlbnRyeSBvZiB0aGUgYXBwbGljYXRpb25cbiAqL1xuY29uc3QgcHJvZHVjdGlvbiA9IHRydWU7XG5cbmZ1bmN0aW9uIGFwcCh3aW5kb3cpIHtcbiAgICBjb25zb2xlLmxvZyhwaW5nKTtcbiAgICBjb25zb2xlLmxvZygnTVBTLUpTIHN0YXJ0aW5nJyk7XG4gICAgbGV0IGNvbmZpZ3VyYXRpb25zID0ge1xuICAgICAgICBwYXltZW50c2VydmVyOiBwcm9kdWN0aW9uID8gXCJodHRwczovL21wcy5oYXNoaW5nc3lzdGVtcy5jb21cIiA6ICdodHRwOi8vbG9jYWxob3N0Ojk5OTknLFxuICAgICAgICBleHRlbnNpb25pZDogXCJsaWdwYW9uZGFhYmNsZmlnYWdjaWZvYmFlbGVtaWVuYVwiLFxuICAgICAgICBlcnJvcjogXCIvbm8tZXh0ZW5zaW9uXCIsXG4gICAgICAgIHR5cGU6IFwiYXJ0aWNsZVwiLFxuICAgICAgICB0aW1lOiBEYXRlLm5vdygpLFxuICAgICAgICByZWRpcmVjdDogJ3sgXCJub25QYXlpbmdBY2NvdW50XCI6IFwiL2luc3VmZmljaWVudC1hbW91bnQvXCIsIFwibm9BY2NvdW50XCI6IFwiL2FjY291bnQtbm90LXBhaXJlZC9cIiwgXCJob21lUGFnZVwiOiBcIi9cIn0nLFxuICAgICAgICAvLyB0aGlzIG1pZ2h0IG1ha2UgYSBnb29kIGRlZmF1bHQgaWQgZm9yIHRoZSBjb250ZW50XG4gICAgICAgIGlkOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgIHN1Ym1pc3Npb25ub2RlOiBcIjAuMC4xMVwiLFxuICAgICAgICBtZW1vOkRhdGUubm93KCksXG4gICAgICAgIC8vcmVkaXJlY3Q6J3sgXCJub25QYXlpbmdBY2NvdW50XCI6IFwiL2luc3VmZmljaWVudC1hbW91bnQvXCIsIFwibm9BY2NvdW50XCI6IFwiL2FjY291bnQtbm90LXBhaXJlZC9cIiwgXCJob21lUGFnZVwiOiBcIi9cIiB9JyxcbiAgICB9O1xuICAgIC8vIGFsbCBtZXRob2RzIHRoYXQgd2VyZSBjYWxsZWQgdGlsbCBub3cgYW5kIHN0b3JlZCBpbiBxdWV1ZVxuICAgIC8vIG5lZWRzIHRvIGJlIGNhbGxlZCBub3dcbiAgICBsZXQgZ2xvYmFsT2JqZWN0ID0gd2luZG93W3dpbmRvd1snTVBTLUpTJ11dO1xuICAgIGxldCBxdWV1ZSA9IGdsb2JhbE9iamVjdC5xO1xuICAgIGlmIChxdWV1ZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncXVldWU6Jyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhxdWV1ZVtpXSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHF1ZXVlW2ldWzBdICE9PSAndW5kZWZpbmVkJyAmJiBxdWV1ZVtpXVswXS50b0xvd2VyQ2FzZSgpID09ICdpbml0Jykge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25zID0gZXh0ZW5kT2JqZWN0KGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgICAgICAgICAgY3JlYXRlSGVkZXJhT2JqZWN0KGNvbmZpZ3VyYXRpb25zKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTVBTLUpTIHN0YXJ0ZWQnLCBjb25maWd1cmF0aW9ucyk7XG4gICAgICAgICAgICAgICAgY2hlY2tGb3JFeHRlbnNpb24oY29uZmlndXJhdGlvbnMpXG4gICAgICAgICAgICB9IGVsc2UgaWYodHlwZW9mIHF1ZXVlW2ldWzBdICE9PSAndW5kZWZpbmVkJyAmJiBxdWV1ZVtpXVswXS50b0xvd2VyQ2FzZSgpID09ICdjcmVhdGVjb250cmFjdG9iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9ucyA9IGV4dGVuZE9iamVjdChjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMV0pO1xuICAgICAgICAgICAgICAgIGFwaUhhbmRsZXIoY29uZmlndXJhdGlvbnMsIHF1ZXVlW2ldWzBdLCBxdWV1ZVtpXVsxXSwgcXVldWVbaV1bMl0pO1xuICAgICAgICAgICAgICAgIGNoZWNrRm9yRXh0ZW5zaW9uKGNvbmZpZ3VyYXRpb25zKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocXVldWUpO1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25zID0gZXh0ZW5kT2JqZWN0KGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgICAgICAgICAgYXBpSGFuZGxlcihjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMF0sIHF1ZXVlW2ldWzFdLCBxdWV1ZVtpXVsyXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gb3ZlcnJpZGUgdGVtcG9yYXJ5ICh1bnRpbCB0aGUgYXBwIGxvYWRlZCkgaGFuZGxlclxuICAgIC8vIGZvciB3aWRnZXQncyBBUEkgY2FsbHNcbiAgICBnbG9iYWxPYmplY3QgPSBhcGlIYW5kbGVyO1xuICAgIGdsb2JhbE9iamVjdC5jb25maWd1cmF0aW9ucyA9IGNvbmZpZ3VyYXRpb25zO1xufVxuXG4vLyBjaGVja0ZvckV4dGVuc2lvbiBoYW5kbGVzIDMgc2NlbmFyaW9zXG4vLyByZXR1cm5zIHRydWUgKGhlZGVyYS1taWNyb3BheW1lbnQgdGFnIGlzIHByZXNlbnQgYW5kIGV4dGVuc2lvbiBpcyBpbnN0YWxsZWQpXG4vLyByZXR1cm5zIGZhbHNlIChoZWRlcmEtbWljcm9wYXltZW50IHRhZyBpcyBwcmVzZW50IGJ1dCBleHRlbnNpb24gaXMgTk9UIGluc3RhbGxlZClcbi8vIHJldHVybiBudWxsIChoZWRlcmEtbWljcm9wYXltZW50IGlzIG5vdCBwcmVzZW50IGJlY2F1c2UgdGhpcyB3ZWJzaXRlIGRvZXMgbm90IGltcGxlbWVudCBoZWRlcmEtbWljcm9wYXltZW50KVxuZnVuY3Rpb24gY2hlY2tGb3JFeHRlbnNpb24oY29uZmlndXJhdGlvbnMpIHtcbiAgICBpZiAoIWlzQ2hyb21lKCkpIHtcbiAgICAgICAgcmVkaXJlY3RUb0Vycm9yKCcvaXNub3RDaHJvbWUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgdGFncyA9IGNvbmZpZ3VyYXRpb25zO1xuICAgICAgICAvLyBpZiB0YWdzLmFtb3VudCBpcyBudWxsIG9yIHVuZGVmaW5lZCwgd2Ugc2hvdWxkIGFzc3VtZSB0aGF0IHRoaXMgaXMgYSBmcmVlIHBhZ2UgYW5kIGRvIG5vdGhpbmcgbW9yZVxuICAgICAgICBpZiAodGFncy5hbW91bnQgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBFWFRFTlNJT05fSUQgPSB0YWdzLmV4dGVuc2lvbmlkO1xuXG4gICAgICAgIGRldGVjdChFWFRFTlNJT05fSUQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJlZGlyZWN0VG9FcnJvcih0YWdzLmVycm9yKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZGV0ZWN0OiB1c2VyIGhhcyBleHRlbnNpb24gaW5zdGFsbGVkJyk7XG4gICAgICAgICAgICByZWNvcmRSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coY2hyb21lLnJ1bnRpbWUuY29ubmVjdChFWFRFTlNJT05fSUQsJ3ZlcnNpb24nKSk7XG4gICAgICAgIC8qY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoRVhURU5TSU9OX0lELCAndmVyc2lvbicsIHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJlZGlyZWN0VG9FcnJvcih0YWdzLmVycm9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVjb3JkUmVzcG9uc2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSovXG4gICAgfVxufVxuXG5mdW5jdGlvbiBkZXRlY3QoZXh0ZW5zaW9uSWQsIG5vdEluc3RhbGxlZENhbGxiYWNrLCBpbnN0YWxsZWRDYWxsYmFjaykge1xuICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcub25lcnJvciA9IG5vdEluc3RhbGxlZENhbGxiYWNrO1xuICAgIGltZy5vbmxvYWQgPSBpbnN0YWxsZWRDYWxsYmFjaygnaW5zdGFsbGVkJyk7XG4gICAgaW1nLnNyYyA9ICdjaHJvbWUtZXh0ZW5zaW9uOi8vJyArIGV4dGVuc2lvbklkICsgJy9pY29ucy9pY29uMTYucG5nJztcbn1cblxuZnVuY3Rpb24gcmVjb3JkUmVzcG9uc2UocmVzKSB7XG4gICAgaWYgKHR5cGVvZiByZXMgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpO1xuICAgICAgICBib2R5LmlubmVySFRNTCArPSAnPGRpdiBzdHlsZT1cIndpZHRoOjEwMCU7aGVpZ2h0OjUlO29wYWNpdHk6MC4zO3otaW5kZXg6MTAwO2JhY2tncm91bmQ6eWVsbG93O1wiPicgKyByZXMgKyAnPC9kaXY+JztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gcmVkaXJlY3RUb0Vycm9yKGVycikge1xuICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgIT0gZXJyKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBlcnIpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNDaHJvbWUoKSB7XG4gICAgcmV0dXJuICdjaHJvbWUnIGluIHdpbmRvd1xufVxuXG4vKipcbiBNZXRob2QgdGhhdCBoYW5kbGVzIGFsbCBBUEkgY2FsbHNcbiAqL1xuZnVuY3Rpb24gYXBpSGFuZGxlcihjb25maWd1cmF0aW9uLCBhcGksIHBhcmFtcywgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgaWYgKCFhcGkpIHRocm93IEVycm9yKCdBUEkgbWV0aG9kIHJlcXVpcmVkJyk7XG4gICAgYXBpID0gYXBpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHN1cHBvcnRlZEFQSS5pbmRleE9mKGFwaSkgPT09IC0xKSB0aHJvdyBFcnJvcihgTWV0aG9kICR7YXBpfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgY29uc29sZS5sb2coYEhhbmRsaW5nIEFQSSBjYWxsICR7YXBpfWAsIHBhcmFtcyk7XG4gICAgc3dpdGNoIChhcGkpIHtcbiAgICAgICAgLy8gVE9ETzogYWRkIEFQSSBpbXBsZW1lbnRhdGlvblxuXG4gICAgICAgIGNhc2UgJ2NyZWF0ZWhlZGVyYW9iamVjdCc6XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlSGVkZXJhT2JqZWN0KHBhcmFtcyk7XG5cbiAgICAgICAgY2FzZSAnY2hlY2t0cmFuc2FjdGlvbic6XG4gICAgICAgICAgICByZXR1cm4gY2hlY2tUcmFuc2FjdGlvbih7Y29uZmlndXJhdGlvbiwgcGFyYW1zfSwgY2FsbGJhY2spO1xuXG4gICAgICAgIGNhc2UgJ2NyZWF0ZWNvbnRyYWN0b2JqZWN0JzpcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVDb250cmFjdE9iamVjdCh7Y29uZmlndXJhdGlvbiwgcGFyYW1zfSwgY2FsbGJhY2spO1xuXG4gICAgICAgIGNhc2UgJ3Rlc3QnOlxuICAgICAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgTm8gaGFuZGxlciBkZWZpbmVkIGZvciAke2FwaX1gKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGV4dGVuZE9iamVjdChhLCBiKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGIpXG4gICAgICAgIGlmIChiLmhhc093blByb3BlcnR5KGtleSkpIGFba2V5XSA9IGJba2V5XTtcbiAgICByZXR1cm4gYTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSGVkZXJhT2JqZWN0KHBhcmFtcykge1xuICAgIGxldCBvYmplY3QgPSBbJ3N1Ym1pc3Npb25ub2RlJywgJ3BheW1lbnRzZXJ2ZXInLCAncmVjaXBpZW50bGlzdCcsICdjb250ZW50aWQnLCAndHlwZScsICdtZW1vJywgJ2V4dGVuc2lvbmlkJywgJ3JlZGlyZWN0JywgJ3RpbWUnXTtcbiAgICBjb25zb2xlLmxvZyhvYmplY3QpO1xuICAgIGxldCBIZWRlcmFvYmplY3QgPSAnPGhlZGVyYS1taWNyb3BheW1lbnQgJztcbiAgICBmb3IgKHZhciBpIGluIG9iamVjdCkge1xuICAgICAgICBsZXQgbm9kZSA9IG9iamVjdFtpXTtcbiAgICAgICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShub2RlKSkge1xuICAgICAgICAgICAgSGVkZXJhb2JqZWN0ICs9IFwiZGF0YS1cIiArIG5vZGUgKyBcIj0gJ1wiICsgcGFyYW1zW25vZGVdICsgXCInICwgXCIgKyBcIlxcblwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIEhlZGVyYW9iamVjdCArPSAnPjwvaGVkZXJhLW1pY3JvcGF5bWVudD4nO1xuICAgIGNvbnNvbGUubG9nKEhlZGVyYW9iamVjdCk7XG5cbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmFtc1snYXR0cklEJ10pO1xuICAgIGJvZHkuaW5uZXJIVE1MICs9IEhlZGVyYW9iamVjdDtcbiAgICAvL2NvbnNvbGUubG9nKChIZWRlcmFvYmplY3QpKVxuICAgIHJldHVybiBIZWRlcmFvYmplY3Q7XG4gICAgLy9jYWxsYmFjayhIZWRlcmFvYmplY3QpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb250cmFjdE9iamVjdChwYXJhbXMpIHtcbiAgICBsZXQgX19jb25zdHJ1Y3QgPSBbJ2NvbnRyYWN0aWQnLCAnbWF4aW11bScsICdwYXltZW50c2VydmVyJywgJ3BhcmFtcycsICdtZW1vJywgJ2FiaScsJ3JlZGlyZWN0JywnZXh0ZW5zaW9uaWQnXTtcbiAgICBsZXQgb2JqZWN0ID0ge1xuICAgICAgICBjb250cmFjdGlkOiAnMC4wLjExMTEnLFxuICAgICAgICBtYXhpbXVtOiAnNDIyMzQyMzQzJyxcbiAgICAgICAgcGF5bWVudHNlcnZlcjogcGFyYW1zLmNvbmZpZ3VyYXRpb24ucGF5bWVudHNlcnZlcixcbiAgICAgICAgcGFyYW1zOiBbXCI4NjlcIiwgXCIxMDAwMDAwMDBcIiwgXCIyMTZcIiwgXCIyNTNcIiwgXCIyN1wiLCBcIjB4MjI2YjA4OTc2YWQwZGQ5ODJhZWI2YjIxYTQ0ZjNlYWNhZTU3OTU2OWMzNGU3MTcyNWFmZjgwMWEyZmU2ODczOVwiLCBcIjB4MzMzZjk5MWZhM2E4NzA1NzVmODE5NTY5ZTlmNzJhNzcxZWE3OTAwNzhkNDQ4Y2M4Nzg5MTIwZWUxNGFiZjNjNVwiXSxcbiAgICAgICAgbWVtbzogJ2E0YTdjNDMyOWFhYjRiMWZhYzQ3NGZmNmY5M2Q4NThjJyxcbiAgICAgICAgYWJpOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBcImNvbnN0YW50XCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJpbnB1dHNcIjogW3tcIm5hbWVcIjogXCJwcm9wZXJ0eUlEXCIsIFwidHlwZVwiOiBcInVpbnQyNFwifSwge1wibmFtZVwiOiBcImFtb3VudFwiLCBcInR5cGVcIjogXCJ1aW50MjU2XCJ9LCB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwieFwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInVpbnQxNlwiXG4gICAgICAgICAgICB9LCB7XCJuYW1lXCI6IFwieVwiLCBcInR5cGVcIjogXCJ1aW50MTZcIn0sIHtcIm5hbWVcIjogXCJ2XCIsIFwidHlwZVwiOiBcInVpbnQ4XCJ9LCB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiclwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ5dGVzMzJcIlxuICAgICAgICAgICAgfSwge1wibmFtZVwiOiBcInNcIiwgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwifV0sXG4gICAgICAgICAgICBcIm5hbWVcIjogXCJidXlQcm9wZXJ0eVwiLFxuICAgICAgICAgICAgXCJvdXRwdXRzXCI6IFt7XCJuYW1lXCI6IFwiXCIsIFwidHlwZVwiOiBcInN0cmluZ1wifV0sXG4gICAgICAgICAgICBcInBheWFibGVcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwic3RhdGVNdXRhYmlsaXR5XCI6IFwicGF5YWJsZVwiLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgICAgICB9KSxcbiAgICAgICAgcmVkaXJlY3Q6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIFwibm9uUGF5aW5nQWNjb3VudFwiOiBcIi9pbnN1ZmZpY2llbnQtYW1vdW50L1wiLFxuICAgICAgICAgICAgXCJub0FjY291bnRcIjogXCIvYWNjb3VudC1ub3QtcGFpcmVkXCIsXG4gICAgICAgICAgICBcImhvbWVQYWdlXCI6IFwiL1wiXG4gICAgICAgIH0pLFxuICAgICAgICBleHRlbnNpb25pZDogJ25pYWpkZW9rcG5nYnBncG1hb2xvZGhsZ29icGxsYWpwJyxcbiAgICB9O1xuICAgIGxldCBleHRlbmRlZCA9IGV4dGVuZE9iamVjdChvYmplY3QsIHBhcmFtcy5wYXJhbXMpO1xuICAgIGNvbnNvbGUubG9nKGV4dGVuZGVkKTtcbiAgICBsZXQgQ29udHJhY3RvYmplY3QgPSAnPGhlZGVyYS1jb250cmFjdCAnO1xuICAgIGZvciAodmFyIGkgaW4gX19jb25zdHJ1Y3QpIHtcbiAgICAgICAgbGV0IG5vZGUgPSBfX2NvbnN0cnVjdFtpXTtcbiAgICAgICAgaWYgKGV4dGVuZGVkLmhhc093blByb3BlcnR5KG5vZGUpKSB7XG4gICAgICAgICAgICBDb250cmFjdG9iamVjdCArPSBcImRhdGEtXCIgKyBub2RlICsgXCI9ICdcIiArIGV4dGVuZGVkW25vZGVdICsgXCInICwgXCIgKyBcIlxcblwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIENvbnRyYWN0b2JqZWN0ICs9ICc+PC9oZWRlcmEtY29udHJhY3Q+JztcbiAgICBjb25zb2xlLmxvZyhDb250cmFjdG9iamVjdCk7XG5cbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGV4dGVuZGVkWydhdHRySUQnXSk7XG4gICAgYm9keS5pbm5lckhUTUwgKz0gQ29udHJhY3RvYmplY3Q7XG4gICAgLy9jb25zb2xlLmxvZygoSGVkZXJhb2JqZWN0KSlcbiAgICByZXR1cm4gQ29udHJhY3RvYmplY3Q7XG4gICAgLy9jYWxsYmFjayhIZWRlcmFvYmplY3QpO1xufVxuXG5mdW5jdGlvbiBjaGVja1RyYW5zYWN0aW9uKHBhcmFtcykge1xuXG4gICAgY29uc29sZS5sb2coXCJpbiBjaGVjayB0cmFuc1wiKVxuICAgIGxldCBtZW1vX2lkID0gcGFyYW1zLmNvbmZpZ3VyYXRpb24ubWVtbztcbiAgICBsZXQgdXJsID0gcHJvZHVjdGlvbiA/IFwiaHR0cHM6Ly9tcHMuaGFzaGluZ3N5c3RlbXMuY29tXCIgOiAnaHR0cDovL2xvY2FsaG9zdDo5OTk5JztcbiAgICBsZXQgc3RydWN0dXJlID0ge1xuICAgICAgICBiYXNldXJsOiB1cmwsXG4gICAgICAgIG1lbW9faWQ6IG1lbW9faWQsXG4gICAgICAgIHJlY2VpdmVyX2lkOiAnJyxcbiAgICAgICAgc3VjY2VzczogJy9zdWNjZXNzJyxcbiAgICAgICAgZmFpbHVyZTogJy9wYXltZW50LWZhaWxlZCcsXG4gICAgICAgIHRpbWVvdXQ6IDMwMDAsXG4gICAgICAgIGxpbWl0OjFcbiAgICB9O1xuXG4gICAgZm9yICh2YXIga2V5IGluIHBhcmFtcy5wYXJhbXMpIHtcbiAgICAgICAgaWYgKHBhcmFtcy5wYXJhbXMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBwYXJhbXMucGFyYW1zW2tleV0pIHtcbiAgICAgICAgICAgIHN0cnVjdHVyZVtrZXldID0gcGFyYW1zLnBhcmFtc1trZXldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN0cnVjdHVyZS5yZWNlaXZlcl9pZCAmJiBzdHJ1Y3R1cmUubWVtb19pZCkge1xuICAgICAgICBVUkwgPSBzdHJ1Y3R1cmUuYmFzZXVybCArIFwiL2NoZWNrL1wiICsgc3RydWN0dXJlLnJlY2VpdmVyX2lkICsgXCIvXCIgKyBzdHJ1Y3R1cmUubWVtb19pZFxuICAgIH0gZWxzZSB7XG4gICAgICAgIFVSTCA9IHN0cnVjdHVyZS5iYXNldXJsICsgXCIvbWVtby9cIiArIHN0cnVjdHVyZS5tZW1vX2lkKyc/bGltaXQ9JytzdHJ1Y3R1cmUubGltaXQ7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHN0cnVjdHVyZS50aW1lb3V0KTtcbiAgICAvL3NldFRpbWVvdXQocGVyZm9ybVJlcXVlc3Qoc3RydWN0dXJlKSwgc3RydWN0dXJlLnRpbWVvdXQpXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBlcmZvcm1SZXF1ZXN0KHN0cnVjdHVyZSk7XG4gICAgfSwgc3RydWN0dXJlLnRpbWVvdXQpO1xufVxuXG52YXIgcGVyZm9ybVJlcXVlc3QgPSBmdW5jdGlvbiAoc3RydWN0dXJlKSB7XG4gICAgY29uc29sZS5sb2coc3RydWN0dXJlKVxuICAgIHZhciB4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLyp3aW5kb3cub3BlbihcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5vcmlnaW4gKyBzdHJ1Y3R1cmUuc3VjY2VzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdfYmxhbmsnXG4gICAgICAgICAgICAgICAgICAgICk7Ki9cbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uod2luZG93Lm9yaWdpbiArIHN0cnVjdHVyZS5zdWNjZXNzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL3dpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBzdHJ1Y3R1cmUuZmFpbHVyZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uod2luZG93Lm9yaWdpbiArIHN0cnVjdHVyZS5zdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAvL2NhbGxiYWNrKG51bGwsIHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL2NhbGxiYWNrKHtlcnJvcjogdHJ1ZSwgZGF0YTogdGhpcy5yZXNwb25zZX0sIG51bGwpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBzdHJ1Y3R1cmUuZmFpbHVyZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHhodHRwLm9wZW4oXCJHRVRcIiwgVVJMLCB0cnVlKTtcbiAgICB4aHR0cC5zZW5kKCk7XG59O1xuXG5cbmFwcCh3aW5kb3cpO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsIlxuZXhwb3J0IGZ1bmN0aW9uIHBpbmcoKSB7XG4gICAgcmV0dXJuICdwb25nJztcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmljZXMuanMiXSwic291cmNlUm9vdCI6IiJ9