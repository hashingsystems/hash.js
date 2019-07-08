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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDcxNTQ2MTlkYWYyZmY1NjQzOGUiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIl0sIm5hbWVzIjpbInN1cHBvcnRlZEFQSSIsInByb2R1Y3Rpb24iLCJhcHAiLCJ3aW5kb3ciLCJjb25zb2xlIiwibG9nIiwicGluZyIsImNvbmZpZ3VyYXRpb25zIiwicGF5bWVudHNlcnZlciIsImV4dGVuc2lvbmlkIiwiZXJyb3IiLCJ0eXBlIiwidGltZSIsIkRhdGUiLCJub3ciLCJyZWRpcmVjdCIsImlkIiwibG9jYXRpb24iLCJwYXRobmFtZSIsInN1Ym1pc3Npb25ub2RlIiwibWVtbyIsImdsb2JhbE9iamVjdCIsInF1ZXVlIiwicSIsImkiLCJsZW5ndGgiLCJ0b0xvd2VyQ2FzZSIsImV4dGVuZE9iamVjdCIsImNyZWF0ZUhlZGVyYU9iamVjdCIsImNoZWNrRm9yRXh0ZW5zaW9uIiwiYXBpSGFuZGxlciIsImlzQ2hyb21lIiwicmVkaXJlY3RUb0Vycm9yIiwidGFncyIsImFtb3VudCIsIkVYVEVOU0lPTl9JRCIsImRldGVjdCIsInJlc3BvbnNlIiwicmVjb3JkUmVzcG9uc2UiLCJleHRlbnNpb25JZCIsIm5vdEluc3RhbGxlZENhbGxiYWNrIiwiaW5zdGFsbGVkQ2FsbGJhY2siLCJpbWciLCJJbWFnZSIsIm9uZXJyb3IiLCJvbmxvYWQiLCJzcmMiLCJyZXMiLCJib2R5IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImlubmVySFRNTCIsImVyciIsInJlcGxhY2UiLCJvcmlnaW4iLCJjb25maWd1cmF0aW9uIiwiYXBpIiwicGFyYW1zIiwiY2FsbGJhY2siLCJFcnJvciIsImluZGV4T2YiLCJjaGVja1RyYW5zYWN0aW9uIiwiY3JlYXRlQ29udHJhY3RPYmplY3QiLCJ3YXJuIiwiYSIsImIiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsIm9iamVjdCIsIkhlZGVyYW9iamVjdCIsIm5vZGUiLCJnZXRFbGVtZW50QnlJZCIsIl9fY29uc3RydWN0IiwiY29udHJhY3RpZCIsIm1heGltdW0iLCJhYmkiLCJKU09OIiwic3RyaW5naWZ5IiwiZXh0ZW5kZWQiLCJDb250cmFjdG9iamVjdCIsIm1lbW9faWQiLCJ1cmwiLCJzdHJ1Y3R1cmUiLCJiYXNldXJsIiwicmVjZWl2ZXJfaWQiLCJzdWNjZXNzIiwiZmFpbHVyZSIsInRpbWVvdXQiLCJsaW1pdCIsIlVSTCIsInNldFRpbWVvdXQiLCJwZXJmb3JtUmVxdWVzdCIsInhodHRwIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicGFyc2UiLCJvcGVuIiwic2VuZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUFBO0FBQUE7QUFJQSxJQUFNQSxZQUFZLEdBQUcsQ0FBQyxNQUFELEVBQVMsTUFBVCxFQUFpQixvQkFBakIsRUFBdUMsa0JBQXZDLEVBQTBELHNCQUExRCxDQUFyQixDLENBQXdHOztBQUN4Rzs7OztBQUdBLElBQU1DLFVBQVUsR0FBRyxJQUFuQjs7QUFFQSxTQUFTQyxHQUFULENBQWFDLE1BQWIsRUFBcUI7QUFDakJDLFNBQU8sQ0FBQ0MsR0FBUixDQUFZQyx1REFBWjtBQUNB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QUFzQkFNLE9BQUssQ0FBQ00sSUFBTixDQUFXLEtBQVgsRUFBa0JULEdBQWxCLEVBQXVCLElBQXZCO0FBQ0FHLE9BQUssQ0FBQ08sSUFBTjtBQUNILENBM0JEOztBQThCQWpHLEdBQUcsQ0FBQ0MsTUFBRCxDQUFILEM7Ozs7Ozs7QUN2UkE7QUFBTyxTQUFTRyxJQUFULEdBQWdCO0FBQ25CLFNBQU8sTUFBUDtBQUNILEMiLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMDcxNTQ2MTlkYWYyZmY1NjQzOGUiLCJpbXBvcnQge1xuICAgIHBpbmdcbn0gZnJvbSAnLi9zZXJ2aWNlcydcblxuY29uc3Qgc3VwcG9ydGVkQVBJID0gWydpbml0JywgJ3Rlc3QnLCAnY3JlYXRlaGVkZXJhb2JqZWN0JywgJ2NoZWNrdHJhbnNhY3Rpb24nLCdjcmVhdGVjb250cmFjdG9iamVjdCddOyAvLyBlbmxpc3QgYWxsIG1ldGhvZHMgc3VwcG9ydGVkIGJ5IEFQSSAoZS5nLiBgbXcoJ2V2ZW50JywgJ3VzZXItbG9naW4nKTtgKVxuLyoqXG4gVGhlIG1haW4gZW50cnkgb2YgdGhlIGFwcGxpY2F0aW9uXG4gKi9cbmNvbnN0IHByb2R1Y3Rpb24gPSB0cnVlO1xuXG5mdW5jdGlvbiBhcHAod2luZG93KSB7XG4gICAgY29uc29sZS5sb2cocGluZyk7XG4gICAgY29uc29sZS5sb2coJ01QUy1KUyBzdGFydGluZycpO1xuICAgIGxldCBjb25maWd1cmF0aW9ucyA9IHtcbiAgICAgICAgcGF5bWVudHNlcnZlcjogcHJvZHVjdGlvbiA/IFwiaHR0cHM6Ly9tcHMuaGFzaGluZ3N5c3RlbXMuY29tXCIgOiAnaHR0cDovL2xvY2FsaG9zdDo5OTk5JyxcbiAgICAgICAgZXh0ZW5zaW9uaWQ6IFwibGlncGFvbmRhYWJjbGZpZ2FnY2lmb2JhZWxlbWllbmFcIixcbiAgICAgICAgZXJyb3I6IFwiL25vLWV4dGVuc2lvblwiLFxuICAgICAgICB0eXBlOiBcImFydGljbGVcIixcbiAgICAgICAgdGltZTogRGF0ZS5ub3coKSxcbiAgICAgICAgcmVkaXJlY3Q6ICd7IFwibm9uUGF5aW5nQWNjb3VudFwiOiBcIi9pbnN1ZmZpY2llbnQtYW1vdW50L1wiLCBcIm5vQWNjb3VudFwiOiBcIi9hY2NvdW50LW5vdC1wYWlyZWQvXCIsIFwiaG9tZVBhZ2VcIjogXCIvXCJ9JyxcbiAgICAgICAgLy8gdGhpcyBtaWdodCBtYWtlIGEgZ29vZCBkZWZhdWx0IGlkIGZvciB0aGUgY29udGVudFxuICAgICAgICBpZDogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgICBzdWJtaXNzaW9ubm9kZTogXCIwLjAuMTFcIixcbiAgICAgICAgbWVtbzpEYXRlLm5vdygpLFxuICAgICAgICAvL3JlZGlyZWN0Oid7IFwibm9uUGF5aW5nQWNjb3VudFwiOiBcIi9pbnN1ZmZpY2llbnQtYW1vdW50L1wiLCBcIm5vQWNjb3VudFwiOiBcIi9hY2NvdW50LW5vdC1wYWlyZWQvXCIsIFwiaG9tZVBhZ2VcIjogXCIvXCIgfScsXG4gICAgfTtcbiAgICAvLyBhbGwgbWV0aG9kcyB0aGF0IHdlcmUgY2FsbGVkIHRpbGwgbm93IGFuZCBzdG9yZWQgaW4gcXVldWVcbiAgICAvLyBuZWVkcyB0byBiZSBjYWxsZWQgbm93XG4gICAgbGV0IGdsb2JhbE9iamVjdCA9IHdpbmRvd1t3aW5kb3dbJ01QUy1KUyddXTtcbiAgICBsZXQgcXVldWUgPSBnbG9iYWxPYmplY3QucTtcbiAgICBpZiAocXVldWUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3F1ZXVlOicpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocXVldWVbaV0pO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBxdWV1ZVtpXVswXSAhPT0gJ3VuZGVmaW5lZCcgJiYgcXVldWVbaV1bMF0udG9Mb3dlckNhc2UoKSA9PSAnaW5pdCcpIHtcbiAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9ucyA9IGV4dGVuZE9iamVjdChjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMV0pO1xuICAgICAgICAgICAgICAgIGNyZWF0ZUhlZGVyYU9iamVjdChjb25maWd1cmF0aW9ucyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ01QUy1KUyBzdGFydGVkJywgY29uZmlndXJhdGlvbnMpO1xuICAgICAgICAgICAgICAgIGNoZWNrRm9yRXh0ZW5zaW9uKGNvbmZpZ3VyYXRpb25zKVxuICAgICAgICAgICAgfSBlbHNlIGlmKHR5cGVvZiBxdWV1ZVtpXVswXSAhPT0gJ3VuZGVmaW5lZCcgJiYgcXVldWVbaV1bMF0udG9Mb3dlckNhc2UoKSA9PSAnY3JlYXRlY29udHJhY3RvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbnMgPSBleHRlbmRPYmplY3QoY29uZmlndXJhdGlvbnMsIHF1ZXVlW2ldWzFdKTtcbiAgICAgICAgICAgICAgICBhcGlIYW5kbGVyKGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVswXSwgcXVldWVbaV1bMV0sIHF1ZXVlW2ldWzJdKTtcbiAgICAgICAgICAgICAgICBjaGVja0ZvckV4dGVuc2lvbihjb25maWd1cmF0aW9ucylcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHF1ZXVlKTtcbiAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9ucyA9IGV4dGVuZE9iamVjdChjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMV0pO1xuICAgICAgICAgICAgICAgIGFwaUhhbmRsZXIoY29uZmlndXJhdGlvbnMsIHF1ZXVlW2ldWzBdLCBxdWV1ZVtpXVsxXSwgcXVldWVbaV1bMl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIG92ZXJyaWRlIHRlbXBvcmFyeSAodW50aWwgdGhlIGFwcCBsb2FkZWQpIGhhbmRsZXJcbiAgICAvLyBmb3Igd2lkZ2V0J3MgQVBJIGNhbGxzXG4gICAgZ2xvYmFsT2JqZWN0ID0gYXBpSGFuZGxlcjtcbiAgICBnbG9iYWxPYmplY3QuY29uZmlndXJhdGlvbnMgPSBjb25maWd1cmF0aW9ucztcbn1cblxuLy8gY2hlY2tGb3JFeHRlbnNpb24gaGFuZGxlcyAzIHNjZW5hcmlvc1xuLy8gcmV0dXJucyB0cnVlIChoZWRlcmEtbWljcm9wYXltZW50IHRhZyBpcyBwcmVzZW50IGFuZCBleHRlbnNpb24gaXMgaW5zdGFsbGVkKVxuLy8gcmV0dXJucyBmYWxzZSAoaGVkZXJhLW1pY3JvcGF5bWVudCB0YWcgaXMgcHJlc2VudCBidXQgZXh0ZW5zaW9uIGlzIE5PVCBpbnN0YWxsZWQpXG4vLyByZXR1cm4gbnVsbCAoaGVkZXJhLW1pY3JvcGF5bWVudCBpcyBub3QgcHJlc2VudCBiZWNhdXNlIHRoaXMgd2Vic2l0ZSBkb2VzIG5vdCBpbXBsZW1lbnQgaGVkZXJhLW1pY3JvcGF5bWVudClcbmZ1bmN0aW9uIGNoZWNrRm9yRXh0ZW5zaW9uKGNvbmZpZ3VyYXRpb25zKSB7XG4gICAgaWYgKCFpc0Nocm9tZSgpKSB7XG4gICAgICAgIHJlZGlyZWN0VG9FcnJvcignL2lzbm90Q2hyb21lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHRhZ3MgPSBjb25maWd1cmF0aW9ucztcbiAgICAgICAgLy8gaWYgdGFncy5hbW91bnQgaXMgbnVsbCBvciB1bmRlZmluZWQsIHdlIHNob3VsZCBhc3N1bWUgdGhhdCB0aGlzIGlzIGEgZnJlZSBwYWdlIGFuZCBkbyBub3RoaW5nIG1vcmVcbiAgICAgICAgaWYgKHRhZ3MuYW1vdW50ID09PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3QgRVhURU5TSU9OX0lEID0gdGFncy5leHRlbnNpb25pZDtcblxuICAgICAgICBkZXRlY3QoRVhURU5TSU9OX0lELCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZWRpcmVjdFRvRXJyb3IodGFncy5lcnJvcik7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2RldGVjdDogdXNlciBoYXMgZXh0ZW5zaW9uIGluc3RhbGxlZCcpO1xuICAgICAgICAgICAgcmVjb3JkUmVzcG9uc2UocmVzcG9uc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKGNocm9tZS5ydW50aW1lLmNvbm5lY3QoRVhURU5TSU9OX0lELCd2ZXJzaW9uJykpO1xuICAgICAgICAvKmNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKEVYVEVOU0lPTl9JRCwgJ3ZlcnNpb24nLCByZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZWRpcmVjdFRvRXJyb3IodGFncy5lcnJvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlY29yZFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkqL1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZGV0ZWN0KGV4dGVuc2lvbklkLCBub3RJbnN0YWxsZWRDYWxsYmFjaywgaW5zdGFsbGVkQ2FsbGJhY2spIHtcbiAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLm9uZXJyb3IgPSBub3RJbnN0YWxsZWRDYWxsYmFjaztcbiAgICBpbWcub25sb2FkID0gaW5zdGFsbGVkQ2FsbGJhY2soJ2luc3RhbGxlZCcpO1xuICAgIGltZy5zcmMgPSAnY2hyb21lLWV4dGVuc2lvbjovLycgKyBleHRlbnNpb25JZCArICcvaWNvbnMvaWNvbjE2LnBuZyc7XG59XG5cbmZ1bmN0aW9uIHJlY29yZFJlc3BvbnNlKHJlcykge1xuICAgIGlmICh0eXBlb2YgcmVzICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKTtcbiAgICAgICAgYm9keS5pbm5lckhUTUwgKz0gJzxkaXYgc3R5bGU9XCJ3aWR0aDoxMDAlO2hlaWdodDo1JTtvcGFjaXR5OjAuMzt6LWluZGV4OjEwMDtiYWNrZ3JvdW5kOnllbGxvdztcIj4nICsgcmVzICsgJzwvZGl2Pic7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHJlZGlyZWN0VG9FcnJvcihlcnIpIHtcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICE9IGVycikge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cub3JpZ2luICsgZXJyKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzQ2hyb21lKCkge1xuICAgIHJldHVybiAnY2hyb21lJyBpbiB3aW5kb3dcbn1cblxuLyoqXG4gTWV0aG9kIHRoYXQgaGFuZGxlcyBhbGwgQVBJIGNhbGxzXG4gKi9cbmZ1bmN0aW9uIGFwaUhhbmRsZXIoY29uZmlndXJhdGlvbiwgYXBpLCBwYXJhbXMsIGNhbGxiYWNrID0gbnVsbCkge1xuICAgIGlmICghYXBpKSB0aHJvdyBFcnJvcignQVBJIG1ldGhvZCByZXF1aXJlZCcpO1xuICAgIGFwaSA9IGFwaS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChzdXBwb3J0ZWRBUEkuaW5kZXhPZihhcGkpID09PSAtMSkgdGhyb3cgRXJyb3IoYE1ldGhvZCAke2FwaX0gaXMgbm90IHN1cHBvcnRlZGApO1xuICAgIGNvbnNvbGUubG9nKGBIYW5kbGluZyBBUEkgY2FsbCAke2FwaX1gLCBwYXJhbXMpO1xuICAgIHN3aXRjaCAoYXBpKSB7XG4gICAgICAgIC8vIFRPRE86IGFkZCBBUEkgaW1wbGVtZW50YXRpb25cblxuICAgICAgICBjYXNlICdjcmVhdGVoZWRlcmFvYmplY3QnOlxuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUhlZGVyYU9iamVjdChwYXJhbXMpO1xuXG4gICAgICAgIGNhc2UgJ2NoZWNrdHJhbnNhY3Rpb24nOlxuICAgICAgICAgICAgcmV0dXJuIGNoZWNrVHJhbnNhY3Rpb24oe2NvbmZpZ3VyYXRpb24sIHBhcmFtc30sIGNhbGxiYWNrKTtcblxuICAgICAgICBjYXNlICdjcmVhdGVjb250cmFjdG9iamVjdCc6XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlQ29udHJhY3RPYmplY3Qoe2NvbmZpZ3VyYXRpb24sIHBhcmFtc30sIGNhbGxiYWNrKTtcblxuICAgICAgICBjYXNlICd0ZXN0JzpcbiAgICAgICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYE5vIGhhbmRsZXIgZGVmaW5lZCBmb3IgJHthcGl9YCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBleHRlbmRPYmplY3QoYSwgYikge1xuICAgIGZvciAodmFyIGtleSBpbiBiKVxuICAgICAgICBpZiAoYi5oYXNPd25Qcm9wZXJ0eShrZXkpKSBhW2tleV0gPSBiW2tleV07XG4gICAgcmV0dXJuIGE7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUhlZGVyYU9iamVjdChwYXJhbXMpIHtcbiAgICBsZXQgb2JqZWN0ID0gWydzdWJtaXNzaW9ubm9kZScsICdwYXltZW50c2VydmVyJywgJ3JlY2lwaWVudGxpc3QnLCAnY29udGVudGlkJywgJ3R5cGUnLCAnbWVtbycsICdleHRlbnNpb25pZCcsICdyZWRpcmVjdCcsICd0aW1lJ107XG4gICAgY29uc29sZS5sb2cob2JqZWN0KTtcbiAgICBsZXQgSGVkZXJhb2JqZWN0ID0gJzxoZWRlcmEtbWljcm9wYXltZW50ICc7XG4gICAgZm9yICh2YXIgaSBpbiBvYmplY3QpIHtcbiAgICAgICAgbGV0IG5vZGUgPSBvYmplY3RbaV07XG4gICAgICAgIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkobm9kZSkpIHtcbiAgICAgICAgICAgIEhlZGVyYW9iamVjdCArPSBcImRhdGEtXCIgKyBub2RlICsgXCI9ICdcIiArIHBhcmFtc1tub2RlXSArIFwiJyAsIFwiICsgXCJcXG5cIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBIZWRlcmFvYmplY3QgKz0gJz48L2hlZGVyYS1taWNyb3BheW1lbnQ+JztcbiAgICBjb25zb2xlLmxvZyhIZWRlcmFvYmplY3QpO1xuXG4gICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJhbXNbJ2F0dHJJRCddKTtcbiAgICBib2R5LmlubmVySFRNTCArPSBIZWRlcmFvYmplY3Q7XG4gICAgLy9jb25zb2xlLmxvZygoSGVkZXJhb2JqZWN0KSlcbiAgICByZXR1cm4gSGVkZXJhb2JqZWN0O1xuICAgIC8vY2FsbGJhY2soSGVkZXJhb2JqZWN0KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29udHJhY3RPYmplY3QocGFyYW1zKSB7XG4gICAgbGV0IF9fY29uc3RydWN0ID0gWydjb250cmFjdGlkJywgJ21heGltdW0nLCAncGF5bWVudHNlcnZlcicsICdwYXJhbXMnLCAnbWVtbycsICdhYmknLCdyZWRpcmVjdCcsJ2V4dGVuc2lvbmlkJ107XG4gICAgbGV0IG9iamVjdCA9IHtcbiAgICAgICAgY29udHJhY3RpZDogJzAuMC4xMTExJyxcbiAgICAgICAgbWF4aW11bTogJzQyMjM0MjM0MycsXG4gICAgICAgIHBheW1lbnRzZXJ2ZXI6IHBhcmFtcy5jb25maWd1cmF0aW9uLnBheW1lbnRzZXJ2ZXIsXG4gICAgICAgIHBhcmFtczogW1wiODY5XCIsIFwiMTAwMDAwMDAwXCIsIFwiMjE2XCIsIFwiMjUzXCIsIFwiMjdcIiwgXCIweDIyNmIwODk3NmFkMGRkOTgyYWViNmIyMWE0NGYzZWFjYWU1Nzk1NjljMzRlNzE3MjVhZmY4MDFhMmZlNjg3MzlcIiwgXCIweDMzM2Y5OTFmYTNhODcwNTc1ZjgxOTU2OWU5ZjcyYTc3MWVhNzkwMDc4ZDQ0OGNjODc4OTEyMGVlMTRhYmYzYzVcIl0sXG4gICAgICAgIG1lbW86ICdhNGE3YzQzMjlhYWI0YjFmYWM0NzRmZjZmOTNkODU4YycsXG4gICAgICAgIGFiaTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgXCJjb25zdGFudFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiaW5wdXRzXCI6IFt7XCJuYW1lXCI6IFwicHJvcGVydHlJRFwiLCBcInR5cGVcIjogXCJ1aW50MjRcIn0sIHtcIm5hbWVcIjogXCJhbW91bnRcIiwgXCJ0eXBlXCI6IFwidWludDI1NlwifSwge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcInhcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ1aW50MTZcIlxuICAgICAgICAgICAgfSwge1wibmFtZVwiOiBcInlcIiwgXCJ0eXBlXCI6IFwidWludDE2XCJ9LCB7XCJuYW1lXCI6IFwidlwiLCBcInR5cGVcIjogXCJ1aW50OFwifSwge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcInJcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJieXRlczMyXCJcbiAgICAgICAgICAgIH0sIHtcIm5hbWVcIjogXCJzXCIsIFwidHlwZVwiOiBcImJ5dGVzMzJcIn1dLFxuICAgICAgICAgICAgXCJuYW1lXCI6IFwiYnV5UHJvcGVydHlcIixcbiAgICAgICAgICAgIFwib3V0cHV0c1wiOiBbe1wibmFtZVwiOiBcIlwiLCBcInR5cGVcIjogXCJzdHJpbmdcIn1dLFxuICAgICAgICAgICAgXCJwYXlhYmxlXCI6IHRydWUsXG4gICAgICAgICAgICBcInN0YXRlTXV0YWJpbGl0eVwiOiBcInBheWFibGVcIixcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImZ1bmN0aW9uXCJcbiAgICAgICAgfSksXG4gICAgICAgIHJlZGlyZWN0OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBcIm5vblBheWluZ0FjY291bnRcIjogXCIvaW5zdWZmaWNpZW50LWFtb3VudC9cIixcbiAgICAgICAgICAgIFwibm9BY2NvdW50XCI6IFwiL2FjY291bnQtbm90LXBhaXJlZFwiLFxuICAgICAgICAgICAgXCJob21lUGFnZVwiOiBcIi9cIlxuICAgICAgICB9KSxcbiAgICAgICAgZXh0ZW5zaW9uaWQ6ICduaWFqZGVva3BuZ2JwZ3BtYW9sb2RobGdvYnBsbGFqcCcsXG4gICAgfTtcbiAgICBsZXQgZXh0ZW5kZWQgPSBleHRlbmRPYmplY3Qob2JqZWN0LCBwYXJhbXMucGFyYW1zKTtcbiAgICBjb25zb2xlLmxvZyhleHRlbmRlZCk7XG4gICAgbGV0IENvbnRyYWN0b2JqZWN0ID0gJzxoZWRlcmEtY29udHJhY3QgJztcbiAgICBmb3IgKHZhciBpIGluIF9fY29uc3RydWN0KSB7XG4gICAgICAgIGxldCBub2RlID0gX19jb25zdHJ1Y3RbaV07XG4gICAgICAgIGlmIChleHRlbmRlZC5oYXNPd25Qcm9wZXJ0eShub2RlKSkge1xuICAgICAgICAgICAgQ29udHJhY3RvYmplY3QgKz0gXCJkYXRhLVwiICsgbm9kZSArIFwiPSAnXCIgKyBleHRlbmRlZFtub2RlXSArIFwiJyAsIFwiICsgXCJcXG5cIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBDb250cmFjdG9iamVjdCArPSAnPjwvaGVkZXJhLWNvbnRyYWN0Pic7XG4gICAgY29uc29sZS5sb2coQ29udHJhY3RvYmplY3QpO1xuXG4gICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChleHRlbmRlZFsnYXR0cklEJ10pO1xuICAgIGJvZHkuaW5uZXJIVE1MICs9IENvbnRyYWN0b2JqZWN0O1xuICAgIC8vY29uc29sZS5sb2coKEhlZGVyYW9iamVjdCkpXG4gICAgcmV0dXJuIENvbnRyYWN0b2JqZWN0O1xuICAgIC8vY2FsbGJhY2soSGVkZXJhb2JqZWN0KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tUcmFuc2FjdGlvbihwYXJhbXMpIHtcblxuICAgIGNvbnNvbGUubG9nKFwiaW4gY2hlY2sgdHJhbnNcIilcbiAgICBsZXQgbWVtb19pZCA9IHBhcmFtcy5jb25maWd1cmF0aW9uLm1lbW87XG4gICAgbGV0IHVybCA9IHByb2R1Y3Rpb24gPyBcImh0dHBzOi8vbXBzLmhhc2hpbmdzeXN0ZW1zLmNvbVwiIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6OTk5OSc7XG4gICAgbGV0IHN0cnVjdHVyZSA9IHtcbiAgICAgICAgYmFzZXVybDogdXJsLFxuICAgICAgICBtZW1vX2lkOiBtZW1vX2lkLFxuICAgICAgICByZWNlaXZlcl9pZDogJycsXG4gICAgICAgIHN1Y2Nlc3M6ICcvc3VjY2VzcycsXG4gICAgICAgIGZhaWx1cmU6ICcvcGF5bWVudC1mYWlsZWQnLFxuICAgICAgICB0aW1lb3V0OiAzMDAwLFxuICAgICAgICBsaW1pdDoxXG4gICAgfTtcblxuICAgIGZvciAodmFyIGtleSBpbiBwYXJhbXMucGFyYW1zKSB7XG4gICAgICAgIGlmIChwYXJhbXMucGFyYW1zLmhhc093blByb3BlcnR5KGtleSkgJiYgcGFyYW1zLnBhcmFtc1trZXldKSB7XG4gICAgICAgICAgICBzdHJ1Y3R1cmVba2V5XSA9IHBhcmFtcy5wYXJhbXNba2V5XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdHJ1Y3R1cmUucmVjZWl2ZXJfaWQgJiYgc3RydWN0dXJlLm1lbW9faWQpIHtcbiAgICAgICAgVVJMID0gc3RydWN0dXJlLmJhc2V1cmwgKyBcIi9jaGVjay9cIiArIHN0cnVjdHVyZS5yZWNlaXZlcl9pZCArIFwiL1wiICsgc3RydWN0dXJlLm1lbW9faWRcbiAgICB9IGVsc2Uge1xuICAgICAgICBVUkwgPSBzdHJ1Y3R1cmUuYmFzZXVybCArIFwiL21lbW8vXCIgKyBzdHJ1Y3R1cmUubWVtb19pZCsnP2xpbWl0PScrc3RydWN0dXJlLmxpbWl0O1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhzdHJ1Y3R1cmUudGltZW91dCk7XG4gICAgLy9zZXRUaW1lb3V0KHBlcmZvcm1SZXF1ZXN0KHN0cnVjdHVyZSksIHN0cnVjdHVyZS50aW1lb3V0KVxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBwZXJmb3JtUmVxdWVzdChzdHJ1Y3R1cmUpO1xuICAgIH0sIHN0cnVjdHVyZS50aW1lb3V0KTtcbn1cblxudmFyIHBlcmZvcm1SZXF1ZXN0ID0gZnVuY3Rpb24gKHN0cnVjdHVyZSkge1xuICAgIGNvbnNvbGUubG9nKHN0cnVjdHVyZSlcbiAgICB2YXIgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gNCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgICAgIGxldCByZXNwb25zZSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZXNwb25zZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qd2luZG93Lm9wZW4oXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cub3JpZ2luICsgc3RydWN0dXJlLnN1Y2Nlc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAnX2JsYW5rJ1xuICAgICAgICAgICAgICAgICAgICApOyovXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBzdHJ1Y3R1cmUuc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uod2luZG93Lm9yaWdpbiArIHN0cnVjdHVyZS5mYWlsdXJlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy93aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cub3JpZ2luICsgc3RydWN0dXJlLnN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgIC8vY2FsbGJhY2sobnVsbCwgdGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vY2FsbGJhY2soe2Vycm9yOiB0cnVlLCBkYXRhOiB0aGlzLnJlc3BvbnNlfSwgbnVsbCk7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uod2luZG93Lm9yaWdpbiArIHN0cnVjdHVyZS5mYWlsdXJlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgeGh0dHAub3BlbihcIkdFVFwiLCBVUkwsIHRydWUpO1xuICAgIHhodHRwLnNlbmQoKTtcbn07XG5cblxuYXBwKHdpbmRvdyk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWluLmpzIiwiXG5leHBvcnQgZnVuY3Rpb24gcGluZygpIHtcbiAgICByZXR1cm4gJ3BvbmcnO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy5qcyJdLCJzb3VyY2VSb290IjoiIn0=