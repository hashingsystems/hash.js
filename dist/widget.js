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

var supportedAPI = ['init', 'test', 'createhederaobject', 'checktransaction']; // enlist all methods supported by API (e.g. `mw('event', 'user-login');`)

/**
 The main entry of the application
 */

var production = false;

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
    submissionnode: "0.0.11" //redirect:'{ "nonPayingAccount": "/insufficient-amount/", "noAccount": "/account-not-paired/", "homePage": "/" }',

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
      } else {
        return apiHandler(queue[i][0], queue[i][1], queue[i][2]);
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
    redirectToError('isnotChrome');
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


function apiHandler(api, params) {
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  if (!api) throw Error('API method required');
  api = api.toLowerCase();
  if (supportedAPI.indexOf(api) === -1) throw Error("Method ".concat(api, " is not supported"));
  console.log("Handling API call ".concat(api), params);

  switch (api) {
    // TODO: add API implementation
    case 'createhederaobject':
      return createHederaObject(params);

    case 'checktransaction':
      return checkTransaction(params, callback);

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

function checkTransaction(params, urls) {
  var url = production ? "https://mps.hashingsystems.com" : 'http://localhost:9999';
  var structure = {
    baseurl: url,
    memo_id: '',
    receiver_id: ''
  };

  for (var key in params) {
    if (params.hasOwnProperty(key)) structure[key] = params[key];
  }

  if (structure.receiver_id && structure.memo_id) {
    URL = structure.baseurl + "/check/" + structure.receiver_id + "/" + structure.memo_id;
  } else {
    URL = structure.baseurl + "/memo/" + structure.memo_id;
  }

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        window.location.replace(window.origin + urls.success); //callback(null, this.response);
      } else {
        //callback({error: true, data: this.response}, null);
        window.location.replace(window.origin + urls.failure);
      }
    }
  };

  xhttp.open("GET", URL, true);
  xhttp.send();
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjJjNzk5NGYxMzNmZTE3NDU5YjMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIl0sIm5hbWVzIjpbInN1cHBvcnRlZEFQSSIsInByb2R1Y3Rpb24iLCJhcHAiLCJ3aW5kb3ciLCJjb25zb2xlIiwibG9nIiwicGluZyIsImNvbmZpZ3VyYXRpb25zIiwicGF5bWVudHNlcnZlciIsImV4dGVuc2lvbmlkIiwiZXJyb3IiLCJ0eXBlIiwidGltZSIsIkRhdGUiLCJub3ciLCJyZWRpcmVjdCIsImlkIiwibG9jYXRpb24iLCJwYXRobmFtZSIsInN1Ym1pc3Npb25ub2RlIiwiZ2xvYmFsT2JqZWN0IiwicXVldWUiLCJxIiwiaSIsImxlbmd0aCIsInRvTG93ZXJDYXNlIiwiZXh0ZW5kT2JqZWN0IiwiY3JlYXRlSGVkZXJhT2JqZWN0IiwiY2hlY2tGb3JFeHRlbnNpb24iLCJhcGlIYW5kbGVyIiwiaXNDaHJvbWUiLCJyZWRpcmVjdFRvRXJyb3IiLCJ0YWdzIiwiYW1vdW50IiwiRVhURU5TSU9OX0lEIiwiZGV0ZWN0IiwicmVzcG9uc2UiLCJyZWNvcmRSZXNwb25zZSIsImV4dGVuc2lvbklkIiwibm90SW5zdGFsbGVkQ2FsbGJhY2siLCJpbnN0YWxsZWRDYWxsYmFjayIsImltZyIsIkltYWdlIiwib25lcnJvciIsIm9ubG9hZCIsInNyYyIsInJlcyIsImJvZHkiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwiZXJyIiwicmVwbGFjZSIsIm9yaWdpbiIsImFwaSIsInBhcmFtcyIsImNhbGxiYWNrIiwiRXJyb3IiLCJpbmRleE9mIiwiY2hlY2tUcmFuc2FjdGlvbiIsIndhcm4iLCJhIiwiYiIsImtleSIsImhhc093blByb3BlcnR5Iiwib2JqZWN0IiwiSGVkZXJhb2JqZWN0Iiwibm9kZSIsImdldEVsZW1lbnRCeUlkIiwidXJscyIsInVybCIsInN0cnVjdHVyZSIsImJhc2V1cmwiLCJtZW1vX2lkIiwicmVjZWl2ZXJfaWQiLCJVUkwiLCJ4aHR0cCIsIlhNTEh0dHBSZXF1ZXN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInN1Y2Nlc3MiLCJmYWlsdXJlIiwib3BlbiIsInNlbmQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM3REE7QUFBQTtBQUFBO0FBSUEsSUFBTUEsWUFBWSxHQUFHLENBQUMsTUFBRCxFQUFTLE1BQVQsRUFBaUIsb0JBQWpCLEVBQXVDLGtCQUF2QyxDQUFyQixDLENBQWlGOztBQUNqRjs7OztBQUdBLElBQU1DLFVBQVUsR0FBRyxLQUFuQjs7QUFFQSxTQUFTQyxHQUFULENBQWFDLE1BQWIsRUFBcUI7QUFDakJDLFNBQU8sQ0FBQ0MsR0FBUixDQUFZQyx1REFBWjtBQUNBRixTQUFPLENBQUNDLEdBQVIsQ0FBWSxpQkFBWjtBQUNBLE1BQUlFLGNBQWMsR0FBRztBQUNqQkMsaUJBQWEsRUFBRVAsVUFBVSxHQUFHLGdDQUFILEdBQXNDLHVCQUQ5QztBQUVqQlEsZUFBVyxFQUFFLGtDQUZJO0FBR2pCQyxTQUFLLEVBQUUsZUFIVTtBQUlqQkMsUUFBSSxFQUFFLFNBSlc7QUFLakJDLFFBQUksRUFBRUMsSUFBSSxDQUFDQyxHQUFM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TUFBUCxHQUFnQmdCLElBQUksQ0FBQ1ksT0FBN0MsRUFEb0IsQ0FFcEI7QUFDSCxPQUhELE1BR087QUFDSDtBQUNBOUUsY0FBTSxDQUFDYyxRQUFQLENBQWdCbUMsT0FBaEIsQ0FBd0JqRCxNQUFNLENBQUNrRCxNQUFQLEdBQWdCZ0IsSUFBSSxDQUFDYSxPQUE3QztBQUNIO0FBQ0o7QUFDSixHQVZEOztBQVdBTixPQUFLLENBQUNPLElBQU4sQ0FBVyxLQUFYLEVBQWtCUixHQUFsQixFQUF1QixJQUF2QjtBQUNBQyxPQUFLLENBQUNRLElBQU47QUFDSDs7QUFHRGxGLEdBQUcsQ0FBQ0MsTUFBRCxDQUFILEM7Ozs7Ozs7QUMzTEE7QUFBTyxTQUFTRyxJQUFULEdBQWdCO0FBQ25CLFNBQU8sTUFBUDtBQUNILEMiLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMjJjNzk5NGYxMzNmZTE3NDU5YjMiLCJpbXBvcnQge1xuICAgIHBpbmdcbn0gZnJvbSAnLi9zZXJ2aWNlcydcblxuY29uc3Qgc3VwcG9ydGVkQVBJID0gWydpbml0JywgJ3Rlc3QnLCAnY3JlYXRlaGVkZXJhb2JqZWN0JywgJ2NoZWNrdHJhbnNhY3Rpb24nXTsgLy8gZW5saXN0IGFsbCBtZXRob2RzIHN1cHBvcnRlZCBieSBBUEkgKGUuZy4gYG13KCdldmVudCcsICd1c2VyLWxvZ2luJyk7YClcbi8qKlxuIFRoZSBtYWluIGVudHJ5IG9mIHRoZSBhcHBsaWNhdGlvblxuICovXG5jb25zdCBwcm9kdWN0aW9uID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGFwcCh3aW5kb3cpIHtcbiAgICBjb25zb2xlLmxvZyhwaW5nKTtcbiAgICBjb25zb2xlLmxvZygnTVBTLUpTIHN0YXJ0aW5nJyk7XG4gICAgbGV0IGNvbmZpZ3VyYXRpb25zID0ge1xuICAgICAgICBwYXltZW50c2VydmVyOiBwcm9kdWN0aW9uID8gXCJodHRwczovL21wcy5oYXNoaW5nc3lzdGVtcy5jb21cIiA6ICdodHRwOi8vbG9jYWxob3N0Ojk5OTknLFxuICAgICAgICBleHRlbnNpb25pZDogXCJsaWdwYW9uZGFhYmNsZmlnYWdjaWZvYmFlbGVtaWVuYVwiLFxuICAgICAgICBlcnJvcjogXCIvbm8tZXh0ZW5zaW9uXCIsXG4gICAgICAgIHR5cGU6IFwiYXJ0aWNsZVwiLFxuICAgICAgICB0aW1lOiBEYXRlLm5vdygpLFxuICAgICAgICByZWRpcmVjdDogJ3sgXCJub25QYXlpbmdBY2NvdW50XCI6IFwiL2luc3VmZmljaWVudC1hbW91bnQvXCIsIFwibm9BY2NvdW50XCI6IFwiL2FjY291bnQtbm90LXBhaXJlZC9cIiwgXCJob21lUGFnZVwiOiBcIi9cIn0nLFxuICAgICAgICAvLyB0aGlzIG1pZ2h0IG1ha2UgYSBnb29kIGRlZmF1bHQgaWQgZm9yIHRoZSBjb250ZW50XG4gICAgICAgIGlkOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgIHN1Ym1pc3Npb25ub2RlOiBcIjAuMC4xMVwiLFxuICAgICAgICAvL3JlZGlyZWN0Oid7IFwibm9uUGF5aW5nQWNjb3VudFwiOiBcIi9pbnN1ZmZpY2llbnQtYW1vdW50L1wiLCBcIm5vQWNjb3VudFwiOiBcIi9hY2NvdW50LW5vdC1wYWlyZWQvXCIsIFwiaG9tZVBhZ2VcIjogXCIvXCIgfScsXG4gICAgfTtcbiAgICAvLyBhbGwgbWV0aG9kcyB0aGF0IHdlcmUgY2FsbGVkIHRpbGwgbm93IGFuZCBzdG9yZWQgaW4gcXVldWVcbiAgICAvLyBuZWVkcyB0byBiZSBjYWxsZWQgbm93XG4gICAgbGV0IGdsb2JhbE9iamVjdCA9IHdpbmRvd1t3aW5kb3dbJ01QUy1KUyddXTtcbiAgICBsZXQgcXVldWUgPSBnbG9iYWxPYmplY3QucTtcbiAgICBpZiAocXVldWUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3F1ZXVlOicpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocXVldWVbaV0pO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBxdWV1ZVtpXVswXSAhPT0gJ3VuZGVmaW5lZCcgJiYgcXVldWVbaV1bMF0udG9Mb3dlckNhc2UoKSA9PSAnaW5pdCcpIHtcbiAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9ucyA9IGV4dGVuZE9iamVjdChjb25maWd1cmF0aW9ucywgcXVldWVbaV1bMV0pO1xuICAgICAgICAgICAgICAgIGNyZWF0ZUhlZGVyYU9iamVjdChjb25maWd1cmF0aW9ucyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ01QUy1KUyBzdGFydGVkJywgY29uZmlndXJhdGlvbnMpO1xuICAgICAgICAgICAgICAgIGNoZWNrRm9yRXh0ZW5zaW9uKGNvbmZpZ3VyYXRpb25zKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXBpSGFuZGxlcihxdWV1ZVtpXVswXSwgcXVldWVbaV1bMV0sIHF1ZXVlW2ldWzJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBvdmVycmlkZSB0ZW1wb3JhcnkgKHVudGlsIHRoZSBhcHAgbG9hZGVkKSBoYW5kbGVyXG4gICAgLy8gZm9yIHdpZGdldCdzIEFQSSBjYWxsc1xuICAgIGdsb2JhbE9iamVjdCA9IGFwaUhhbmRsZXI7XG4gICAgZ2xvYmFsT2JqZWN0LmNvbmZpZ3VyYXRpb25zID0gY29uZmlndXJhdGlvbnM7XG59XG5cbi8vIGNoZWNrRm9yRXh0ZW5zaW9uIGhhbmRsZXMgMyBzY2VuYXJpb3Ncbi8vIHJldHVybnMgdHJ1ZSAoaGVkZXJhLW1pY3JvcGF5bWVudCB0YWcgaXMgcHJlc2VudCBhbmQgZXh0ZW5zaW9uIGlzIGluc3RhbGxlZClcbi8vIHJldHVybnMgZmFsc2UgKGhlZGVyYS1taWNyb3BheW1lbnQgdGFnIGlzIHByZXNlbnQgYnV0IGV4dGVuc2lvbiBpcyBOT1QgaW5zdGFsbGVkKVxuLy8gcmV0dXJuIG51bGwgKGhlZGVyYS1taWNyb3BheW1lbnQgaXMgbm90IHByZXNlbnQgYmVjYXVzZSB0aGlzIHdlYnNpdGUgZG9lcyBub3QgaW1wbGVtZW50IGhlZGVyYS1taWNyb3BheW1lbnQpXG5mdW5jdGlvbiBjaGVja0ZvckV4dGVuc2lvbihjb25maWd1cmF0aW9ucykge1xuICAgIGlmICghaXNDaHJvbWUoKSkge1xuICAgICAgICByZWRpcmVjdFRvRXJyb3IoJ2lzbm90Q2hyb21lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHRhZ3MgPSBjb25maWd1cmF0aW9ucztcbiAgICAgICAgLy8gaWYgdGFncy5hbW91bnQgaXMgbnVsbCBvciB1bmRlZmluZWQsIHdlIHNob3VsZCBhc3N1bWUgdGhhdCB0aGlzIGlzIGEgZnJlZSBwYWdlIGFuZCBkbyBub3RoaW5nIG1vcmVcbiAgICAgICAgaWYgKHRhZ3MuYW1vdW50ID09PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3QgRVhURU5TSU9OX0lEID0gdGFncy5leHRlbnNpb25pZDtcblxuICAgICAgICBkZXRlY3QoRVhURU5TSU9OX0lELCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZWRpcmVjdFRvRXJyb3IodGFncy5lcnJvcik7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2RldGVjdDogdXNlciBoYXMgZXh0ZW5zaW9uIGluc3RhbGxlZCcpO1xuICAgICAgICAgICAgcmVjb3JkUmVzcG9uc2UocmVzcG9uc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKGNocm9tZS5ydW50aW1lLmNvbm5lY3QoRVhURU5TSU9OX0lELCd2ZXJzaW9uJykpO1xuICAgICAgICAvKmNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKEVYVEVOU0lPTl9JRCwgJ3ZlcnNpb24nLCByZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZWRpcmVjdFRvRXJyb3IodGFncy5lcnJvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlY29yZFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkqL1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZGV0ZWN0KGV4dGVuc2lvbklkLCBub3RJbnN0YWxsZWRDYWxsYmFjaywgaW5zdGFsbGVkQ2FsbGJhY2spIHtcbiAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLm9uZXJyb3IgPSBub3RJbnN0YWxsZWRDYWxsYmFjaztcbiAgICBpbWcub25sb2FkID0gaW5zdGFsbGVkQ2FsbGJhY2soJ2luc3RhbGxlZCcpO1xuICAgIGltZy5zcmMgPSAnY2hyb21lLWV4dGVuc2lvbjovLycgKyBleHRlbnNpb25JZCArICcvaWNvbnMvaWNvbjE2LnBuZyc7XG59XG5cbmZ1bmN0aW9uIHJlY29yZFJlc3BvbnNlKHJlcykge1xuICAgIGlmICh0eXBlb2YgcmVzICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKTtcbiAgICAgICAgYm9keS5pbm5lckhUTUwgKz0gJzxkaXYgc3R5bGU9XCJ3aWR0aDoxMDAlO2hlaWdodDo1JTtvcGFjaXR5OjAuMzt6LWluZGV4OjEwMDtiYWNrZ3JvdW5kOnllbGxvdztcIj4nICsgcmVzICsgJzwvZGl2Pic7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHJlZGlyZWN0VG9FcnJvcihlcnIpIHtcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICE9IGVycikge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cub3JpZ2luICsgZXJyKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzQ2hyb21lKCkge1xuICAgIHJldHVybiAnY2hyb21lJyBpbiB3aW5kb3dcbn1cblxuLyoqXG4gTWV0aG9kIHRoYXQgaGFuZGxlcyBhbGwgQVBJIGNhbGxzXG4gKi9cbmZ1bmN0aW9uIGFwaUhhbmRsZXIoYXBpLCBwYXJhbXMsIGNhbGxiYWNrID0gbnVsbCkge1xuICAgIGlmICghYXBpKSB0aHJvdyBFcnJvcignQVBJIG1ldGhvZCByZXF1aXJlZCcpO1xuICAgIGFwaSA9IGFwaS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChzdXBwb3J0ZWRBUEkuaW5kZXhPZihhcGkpID09PSAtMSkgdGhyb3cgRXJyb3IoYE1ldGhvZCAke2FwaX0gaXMgbm90IHN1cHBvcnRlZGApO1xuICAgIGNvbnNvbGUubG9nKGBIYW5kbGluZyBBUEkgY2FsbCAke2FwaX1gLCBwYXJhbXMpO1xuICAgIHN3aXRjaCAoYXBpKSB7XG4gICAgICAgIC8vIFRPRE86IGFkZCBBUEkgaW1wbGVtZW50YXRpb25cblxuICAgICAgICBjYXNlICdjcmVhdGVoZWRlcmFvYmplY3QnOlxuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUhlZGVyYU9iamVjdChwYXJhbXMpO1xuXG4gICAgICAgIGNhc2UgJ2NoZWNrdHJhbnNhY3Rpb24nOlxuICAgICAgICAgICAgcmV0dXJuIGNoZWNrVHJhbnNhY3Rpb24ocGFyYW1zLCBjYWxsYmFjayk7XG5cbiAgICAgICAgY2FzZSAndGVzdCc6XG4gICAgICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBObyBoYW5kbGVyIGRlZmluZWQgZm9yICR7YXBpfWApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZXh0ZW5kT2JqZWN0KGEsIGIpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gYilcbiAgICAgICAgaWYgKGIuaGFzT3duUHJvcGVydHkoa2V5KSkgYVtrZXldID0gYltrZXldO1xuICAgIHJldHVybiBhO1xufVxuXG5cbmZ1bmN0aW9uIGNyZWF0ZUhlZGVyYU9iamVjdChwYXJhbXMpIHtcbiAgICBsZXQgb2JqZWN0ID0gWydzdWJtaXNzaW9ubm9kZScsICdwYXltZW50c2VydmVyJywgJ3JlY2lwaWVudGxpc3QnLCAnY29udGVudGlkJywgJ3R5cGUnLCAnbWVtbycsICdleHRlbnNpb25pZCcsICdyZWRpcmVjdCcsICd0aW1lJ107XG4gICAgY29uc29sZS5sb2cob2JqZWN0KVxuICAgIGxldCBIZWRlcmFvYmplY3QgPSAnPGhlZGVyYS1taWNyb3BheW1lbnQgJ1xuICAgIGZvciAodmFyIGkgaW4gb2JqZWN0KSB7XG4gICAgICAgIGxldCBub2RlID0gb2JqZWN0W2ldO1xuICAgICAgICBpZiAocGFyYW1zLmhhc093blByb3BlcnR5KG5vZGUpKSB7XG4gICAgICAgICAgICBIZWRlcmFvYmplY3QgKz0gXCJkYXRhLVwiICsgbm9kZSArIFwiPSAnXCIgKyBwYXJhbXNbbm9kZV0gKyBcIicgLCBcIiArIFwiXFxuXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgSGVkZXJhb2JqZWN0ICs9ICc+PC9oZWRlcmEtbWljcm9wYXltZW50Pic7XG4gICAgY29uc29sZS5sb2coSGVkZXJhb2JqZWN0KTtcblxuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyYW1zWydhdHRySUQnXSk7XG4gICAgYm9keS5pbm5lckhUTUwgKz0gSGVkZXJhb2JqZWN0O1xuICAgIC8vY29uc29sZS5sb2coKEhlZGVyYW9iamVjdCkpXG4gICAgcmV0dXJuIEhlZGVyYW9iamVjdDtcbiAgICAvL2NhbGxiYWNrKEhlZGVyYW9iamVjdCk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrVHJhbnNhY3Rpb24ocGFyYW1zLCB1cmxzKSB7XG4gICAgbGV0IHVybCA9IHByb2R1Y3Rpb24gPyBcImh0dHBzOi8vbXBzLmhhc2hpbmdzeXN0ZW1zLmNvbVwiIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6OTk5OSc7XG4gICAgbGV0IHN0cnVjdHVyZSA9IHtiYXNldXJsOiB1cmwsIG1lbW9faWQ6ICcnLCByZWNlaXZlcl9pZDogJyd9O1xuICAgIGZvciAodmFyIGtleSBpbiBwYXJhbXMpXG4gICAgICAgIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkoa2V5KSkgc3RydWN0dXJlW2tleV0gPSBwYXJhbXNba2V5XTtcblxuICAgICAgICBpZihzdHJ1Y3R1cmUucmVjZWl2ZXJfaWQgJiYgc3RydWN0dXJlLm1lbW9faWQpe1xuICAgICAgICAgICAgVVJMID0gc3RydWN0dXJlLmJhc2V1cmwgKyBcIi9jaGVjay9cIiArIHN0cnVjdHVyZS5yZWNlaXZlcl9pZCArIFwiL1wiICsgc3RydWN0dXJlLm1lbW9faWRcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBVUkwgPSBzdHJ1Y3R1cmUuYmFzZXVybCArIFwiL21lbW8vXCIgKyBzdHJ1Y3R1cmUubWVtb19pZDtcbiAgICAgICAgfVxuXG4gICAgdmFyIHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cub3JpZ2luICsgdXJscy5zdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAvL2NhbGxiYWNrKG51bGwsIHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL2NhbGxiYWNrKHtlcnJvcjogdHJ1ZSwgZGF0YTogdGhpcy5yZXNwb25zZX0sIG51bGwpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyB1cmxzLmZhaWx1cmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICB4aHR0cC5vcGVuKFwiR0VUXCIsIFVSTCwgdHJ1ZSk7XG4gICAgeGh0dHAuc2VuZCgpO1xufVxuXG5cbmFwcCh3aW5kb3cpO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsIlxuZXhwb3J0IGZ1bmN0aW9uIHBpbmcoKSB7XG4gICAgcmV0dXJuICdwb25nJztcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmljZXMuanMiXSwic291cmNlUm9vdCI6IiJ9