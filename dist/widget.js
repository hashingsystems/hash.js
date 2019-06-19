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

function checkTransaction(params, callback) {
  var url = production ? "https://mps.hashingsystems.com" : 'http://localhost:9999';
  var structure = {
    baseurl: url,
    memo_id: '',
    receiver_id: ''
  };

  for (var key in params) {
    if (params.hasOwnProperty(key)) structure[key] = params[key];
  }

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        callback(null, this.response);
      } else {
        callback({
          error: true,
          data: this.response
        }, null);
      }
    }
  };

  xhttp.open("GET", structure.baseurl + "/check/" + structure.receiver_id + "/" + structure.memo_id, true);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWEzMDA2ZDg1ZDY5YTg4MTFmZDYiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIl0sIm5hbWVzIjpbInN1cHBvcnRlZEFQSSIsInByb2R1Y3Rpb24iLCJhcHAiLCJ3aW5kb3ciLCJjb25zb2xlIiwibG9nIiwicGluZyIsImNvbmZpZ3VyYXRpb25zIiwicGF5bWVudHNlcnZlciIsImV4dGVuc2lvbmlkIiwiZXJyb3IiLCJ0eXBlIiwidGltZSIsIkRhdGUiLCJub3ciLCJyZWRpcmVjdCIsImlkIiwibG9jYXRpb24iLCJwYXRobmFtZSIsInN1Ym1pc3Npb25ub2RlIiwiZ2xvYmFsT2JqZWN0IiwicXVldWUiLCJxIiwiaSIsImxlbmd0aCIsInRvTG93ZXJDYXNlIiwiZXh0ZW5kT2JqZWN0IiwiY3JlYXRlSGVkZXJhT2JqZWN0IiwiY2hlY2tGb3JFeHRlbnNpb24iLCJhcGlIYW5kbGVyIiwiaXNDaHJvbWUiLCJyZWRpcmVjdFRvRXJyb3IiLCJ0YWdzIiwiYW1vdW50IiwiRVhURU5TSU9OX0lEIiwiZGV0ZWN0IiwicmVzcG9uc2UiLCJyZWNvcmRSZXNwb25zZSIsImV4dGVuc2lvbklkIiwibm90SW5zdGFsbGVkQ2FsbGJhY2siLCJpbnN0YWxsZWRDYWxsYmFjayIsImltZyIsIkltYWdlIiwib25lcnJvciIsIm9ubG9hZCIsInNyYyIsInJlcyIsImJvZHkiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwiZXJyIiwicmVwbGFjZSIsIm9yaWdpbiIsImFwaSIsInBhcmFtcyIsImNhbGxiYWNrIiwiRXJyb3IiLCJpbmRleE9mIiwiY2hlY2tUcmFuc2FjdGlvbiIsIndhcm4iLCJhIiwiYiIsImtleSIsImhhc093blByb3BlcnR5Iiwib2JqZWN0IiwiSGVkZXJhb2JqZWN0Iiwibm9kZSIsImdldEVsZW1lbnRCeUlkIiwidXJsIiwic3RydWN0dXJlIiwiYmFzZXVybCIsIm1lbW9faWQiLCJyZWNlaXZlcl9pZCIsInhodHRwIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwiZGF0YSIsIm9wZW4iLCJzZW5kIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDN0RBO0FBQUE7QUFBQTtBQUlBLElBQU1BLFlBQVksR0FBRyxDQUFDLE1BQUQsRUFBUyxNQUFULEVBQWlCLG9CQUFqQixFQUF1QyxrQkFBdkMsQ0FBckIsQyxDQUFpRjs7QUFDakY7Ozs7QUFHQSxJQUFNQyxVQUFVLEdBQUcsSUFBbkI7O0FBRUEsU0FBU0MsR0FBVCxDQUFhQyxNQUFiLEVBQXFCO0FBQ2pCQyxTQUFPLENBQUNDLEdBQVIsQ0FBWUMsdURBQVo7QUFDQUYsU0FBTyxDQUFDQyxHQUFSLENBQVksaUJBQVo7QUFDQSxNQUFJRSxjQUFjLEdBQUc7QUFDakJDLGlCQUFhLEVBQUVQLFVBQVUsR0FBRyxnQ0FBSCxHQUFzQyx1QkFEOUM7QUFFakJRLGVBQVcsRUFBRSxrQ0FGSTtBQUdqQkMsU0FBSyxFQUFFLGVBSFU7QUFJakJDLFFBQUksRUFBRSxTQUpXO0FBS2pCQyxRQUFJLEVBQUVDLElBQUksQ0FBQ0MsR0FBTCxFQUxXO0FBTWpCQyxZQUFRLEVBQUUsc0dB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QUFDSDs7QUFHRC9FLEdBQUcsQ0FBQ0MsTUFBRCxDQUFILEM7Ozs7Ozs7QUNwTEE7QUFBTyxTQUFTRyxJQUFULEdBQWdCO0FBQ25CLFNBQU8sTUFBUDtBQUNILEMiLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYWEzMDA2ZDg1ZDY5YTg4MTFmZDYiLCJpbXBvcnQge1xuICAgIHBpbmdcbn0gZnJvbSAnLi9zZXJ2aWNlcydcblxuY29uc3Qgc3VwcG9ydGVkQVBJID0gWydpbml0JywgJ3Rlc3QnLCAnY3JlYXRlaGVkZXJhb2JqZWN0JywgJ2NoZWNrdHJhbnNhY3Rpb24nXTsgLy8gZW5saXN0IGFsbCBtZXRob2RzIHN1cHBvcnRlZCBieSBBUEkgKGUuZy4gYG13KCdldmVudCcsICd1c2VyLWxvZ2luJyk7YClcbi8qKlxuIFRoZSBtYWluIGVudHJ5IG9mIHRoZSBhcHBsaWNhdGlvblxuICovXG5jb25zdCBwcm9kdWN0aW9uID0gdHJ1ZTtcblxuZnVuY3Rpb24gYXBwKHdpbmRvdykge1xuICAgIGNvbnNvbGUubG9nKHBpbmcpO1xuICAgIGNvbnNvbGUubG9nKCdNUFMtSlMgc3RhcnRpbmcnKTtcbiAgICBsZXQgY29uZmlndXJhdGlvbnMgPSB7XG4gICAgICAgIHBheW1lbnRzZXJ2ZXI6IHByb2R1Y3Rpb24gPyBcImh0dHBzOi8vbXBzLmhhc2hpbmdzeXN0ZW1zLmNvbVwiIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6OTk5OScsXG4gICAgICAgIGV4dGVuc2lvbmlkOiBcImxpZ3Bhb25kYWFiY2xmaWdhZ2NpZm9iYWVsZW1pZW5hXCIsXG4gICAgICAgIGVycm9yOiBcIi9uby1leHRlbnNpb25cIixcbiAgICAgICAgdHlwZTogXCJhcnRpY2xlXCIsXG4gICAgICAgIHRpbWU6IERhdGUubm93KCksXG4gICAgICAgIHJlZGlyZWN0OiAneyBcIm5vblBheWluZ0FjY291bnRcIjogXCIvaW5zdWZmaWNpZW50LWFtb3VudC9cIiwgXCJub0FjY291bnRcIjogXCIvYWNjb3VudC1ub3QtcGFpcmVkL1wiLCBcImhvbWVQYWdlXCI6IFwiL1wifScsXG4gICAgICAgIC8vIHRoaXMgbWlnaHQgbWFrZSBhIGdvb2QgZGVmYXVsdCBpZCBmb3IgdGhlIGNvbnRlbnRcbiAgICAgICAgaWQ6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgICAgc3VibWlzc2lvbm5vZGU6IFwiMC4wLjExXCIsXG4gICAgICAgIC8vcmVkaXJlY3Q6J3sgXCJub25QYXlpbmdBY2NvdW50XCI6IFwiL2luc3VmZmljaWVudC1hbW91bnQvXCIsIFwibm9BY2NvdW50XCI6IFwiL2FjY291bnQtbm90LXBhaXJlZC9cIiwgXCJob21lUGFnZVwiOiBcIi9cIiB9JyxcbiAgICB9O1xuICAgIC8vIGFsbCBtZXRob2RzIHRoYXQgd2VyZSBjYWxsZWQgdGlsbCBub3cgYW5kIHN0b3JlZCBpbiBxdWV1ZVxuICAgIC8vIG5lZWRzIHRvIGJlIGNhbGxlZCBub3dcbiAgICBsZXQgZ2xvYmFsT2JqZWN0ID0gd2luZG93W3dpbmRvd1snTVBTLUpTJ11dO1xuICAgIGxldCBxdWV1ZSA9IGdsb2JhbE9iamVjdC5xO1xuICAgIGlmIChxdWV1ZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncXVldWU6Jyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhxdWV1ZVtpXSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHF1ZXVlW2ldWzBdICE9PSAndW5kZWZpbmVkJyAmJiBxdWV1ZVtpXVswXS50b0xvd2VyQ2FzZSgpID09ICdpbml0Jykge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25zID0gZXh0ZW5kT2JqZWN0KGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgICAgICAgICAgY3JlYXRlSGVkZXJhT2JqZWN0KGNvbmZpZ3VyYXRpb25zKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTVBTLUpTIHN0YXJ0ZWQnLCBjb25maWd1cmF0aW9ucyk7XG4gICAgICAgICAgICAgICAgY2hlY2tGb3JFeHRlbnNpb24oY29uZmlndXJhdGlvbnMpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBhcGlIYW5kbGVyKHF1ZXVlW2ldWzBdLCBxdWV1ZVtpXVsxXSwgcXVldWVbaV1bMl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIG92ZXJyaWRlIHRlbXBvcmFyeSAodW50aWwgdGhlIGFwcCBsb2FkZWQpIGhhbmRsZXJcbiAgICAvLyBmb3Igd2lkZ2V0J3MgQVBJIGNhbGxzXG4gICAgZ2xvYmFsT2JqZWN0ID0gYXBpSGFuZGxlcjtcbiAgICBnbG9iYWxPYmplY3QuY29uZmlndXJhdGlvbnMgPSBjb25maWd1cmF0aW9ucztcbn1cblxuLy8gY2hlY2tGb3JFeHRlbnNpb24gaGFuZGxlcyAzIHNjZW5hcmlvc1xuLy8gcmV0dXJucyB0cnVlIChoZWRlcmEtbWljcm9wYXltZW50IHRhZyBpcyBwcmVzZW50IGFuZCBleHRlbnNpb24gaXMgaW5zdGFsbGVkKVxuLy8gcmV0dXJucyBmYWxzZSAoaGVkZXJhLW1pY3JvcGF5bWVudCB0YWcgaXMgcHJlc2VudCBidXQgZXh0ZW5zaW9uIGlzIE5PVCBpbnN0YWxsZWQpXG4vLyByZXR1cm4gbnVsbCAoaGVkZXJhLW1pY3JvcGF5bWVudCBpcyBub3QgcHJlc2VudCBiZWNhdXNlIHRoaXMgd2Vic2l0ZSBkb2VzIG5vdCBpbXBsZW1lbnQgaGVkZXJhLW1pY3JvcGF5bWVudClcbmZ1bmN0aW9uIGNoZWNrRm9yRXh0ZW5zaW9uKGNvbmZpZ3VyYXRpb25zKSB7XG4gICAgaWYgKCFpc0Nocm9tZSgpKSB7XG4gICAgICAgIHJlZGlyZWN0VG9FcnJvcignaXNub3RDaHJvbWUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgdGFncyA9IGNvbmZpZ3VyYXRpb25zO1xuICAgICAgICAvLyBpZiB0YWdzLmFtb3VudCBpcyBudWxsIG9yIHVuZGVmaW5lZCwgd2Ugc2hvdWxkIGFzc3VtZSB0aGF0IHRoaXMgaXMgYSBmcmVlIHBhZ2UgYW5kIGRvIG5vdGhpbmcgbW9yZVxuICAgICAgICBpZiAodGFncy5hbW91bnQgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBFWFRFTlNJT05fSUQgPSB0YWdzLmV4dGVuc2lvbmlkO1xuXG4gICAgICAgIGRldGVjdChFWFRFTlNJT05fSUQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJlZGlyZWN0VG9FcnJvcih0YWdzLmVycm9yKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZGV0ZWN0OiB1c2VyIGhhcyBleHRlbnNpb24gaW5zdGFsbGVkJyk7XG4gICAgICAgICAgICByZWNvcmRSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coY2hyb21lLnJ1bnRpbWUuY29ubmVjdChFWFRFTlNJT05fSUQsJ3ZlcnNpb24nKSk7XG4gICAgICAgIC8qY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoRVhURU5TSU9OX0lELCAndmVyc2lvbicsIHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJlZGlyZWN0VG9FcnJvcih0YWdzLmVycm9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVjb3JkUmVzcG9uc2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSovXG4gICAgfVxufVxuXG5mdW5jdGlvbiBkZXRlY3QoZXh0ZW5zaW9uSWQsIG5vdEluc3RhbGxlZENhbGxiYWNrLCBpbnN0YWxsZWRDYWxsYmFjaykge1xuICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcub25lcnJvciA9IG5vdEluc3RhbGxlZENhbGxiYWNrO1xuICAgIGltZy5vbmxvYWQgPSBpbnN0YWxsZWRDYWxsYmFjaygnaW5zdGFsbGVkJyk7XG4gICAgaW1nLnNyYyA9ICdjaHJvbWUtZXh0ZW5zaW9uOi8vJyArIGV4dGVuc2lvbklkICsgJy9pY29ucy9pY29uMTYucG5nJztcbn1cblxuZnVuY3Rpb24gcmVjb3JkUmVzcG9uc2UocmVzKSB7XG4gICAgaWYgKHR5cGVvZiByZXMgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpO1xuICAgICAgICBib2R5LmlubmVySFRNTCArPSAnPGRpdiBzdHlsZT1cIndpZHRoOjEwMCU7aGVpZ2h0OjUlO29wYWNpdHk6MC4zO3otaW5kZXg6MTAwO2JhY2tncm91bmQ6eWVsbG93O1wiPicgKyByZXMgKyAnPC9kaXY+JztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gcmVkaXJlY3RUb0Vycm9yKGVycikge1xuICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgIT0gZXJyKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBlcnIpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNDaHJvbWUoKSB7XG4gICAgcmV0dXJuICdjaHJvbWUnIGluIHdpbmRvd1xufVxuXG4vKipcbiBNZXRob2QgdGhhdCBoYW5kbGVzIGFsbCBBUEkgY2FsbHNcbiAqL1xuZnVuY3Rpb24gYXBpSGFuZGxlcihhcGksIHBhcmFtcywgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgaWYgKCFhcGkpIHRocm93IEVycm9yKCdBUEkgbWV0aG9kIHJlcXVpcmVkJyk7XG4gICAgYXBpID0gYXBpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHN1cHBvcnRlZEFQSS5pbmRleE9mKGFwaSkgPT09IC0xKSB0aHJvdyBFcnJvcihgTWV0aG9kICR7YXBpfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgY29uc29sZS5sb2coYEhhbmRsaW5nIEFQSSBjYWxsICR7YXBpfWAsIHBhcmFtcyk7XG4gICAgc3dpdGNoIChhcGkpIHtcbiAgICAgICAgLy8gVE9ETzogYWRkIEFQSSBpbXBsZW1lbnRhdGlvblxuXG4gICAgICAgIGNhc2UgJ2NyZWF0ZWhlZGVyYW9iamVjdCc6XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlSGVkZXJhT2JqZWN0KHBhcmFtcyk7XG5cbiAgICAgICAgY2FzZSAnY2hlY2t0cmFuc2FjdGlvbic6XG4gICAgICAgICAgICByZXR1cm4gY2hlY2tUcmFuc2FjdGlvbihwYXJhbXMsIGNhbGxiYWNrKTtcblxuICAgICAgICBjYXNlICd0ZXN0JzpcbiAgICAgICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYE5vIGhhbmRsZXIgZGVmaW5lZCBmb3IgJHthcGl9YCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBleHRlbmRPYmplY3QoYSwgYikge1xuICAgIGZvciAodmFyIGtleSBpbiBiKVxuICAgICAgICBpZiAoYi5oYXNPd25Qcm9wZXJ0eShrZXkpKSBhW2tleV0gPSBiW2tleV07XG4gICAgcmV0dXJuIGE7XG59XG5cblxuZnVuY3Rpb24gY3JlYXRlSGVkZXJhT2JqZWN0KHBhcmFtcykge1xuICAgIGxldCBvYmplY3QgPSBbJ3N1Ym1pc3Npb25ub2RlJywgJ3BheW1lbnRzZXJ2ZXInLCAncmVjaXBpZW50bGlzdCcsICdjb250ZW50aWQnLCAndHlwZScsICdtZW1vJywgJ2V4dGVuc2lvbmlkJywgJ3JlZGlyZWN0JywgJ3RpbWUnXTtcbiAgICBjb25zb2xlLmxvZyhvYmplY3QpXG4gICAgbGV0IEhlZGVyYW9iamVjdCA9ICc8aGVkZXJhLW1pY3JvcGF5bWVudCAnXG4gICAgZm9yICh2YXIgaSBpbiBvYmplY3QpIHtcbiAgICAgICAgbGV0IG5vZGUgPSBvYmplY3RbaV07XG4gICAgICAgIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkobm9kZSkpIHtcbiAgICAgICAgICAgIEhlZGVyYW9iamVjdCArPSBcImRhdGEtXCIgKyBub2RlICsgXCI9ICdcIiArIHBhcmFtc1tub2RlXSArIFwiJyAsIFwiICsgXCJcXG5cIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEhlZGVyYW9iamVjdCArPSAnPjwvaGVkZXJhLW1pY3JvcGF5bWVudD4nO1xuICAgIGNvbnNvbGUubG9nKEhlZGVyYW9iamVjdCk7XG5cbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmFtc1snYXR0cklEJ10pO1xuICAgIGJvZHkuaW5uZXJIVE1MICs9IEhlZGVyYW9iamVjdDtcbiAgICAvL2NvbnNvbGUubG9nKChIZWRlcmFvYmplY3QpKVxuICAgIHJldHVybiBIZWRlcmFvYmplY3Q7XG4gICAgLy9jYWxsYmFjayhIZWRlcmFvYmplY3QpO1xufVxuXG5mdW5jdGlvbiBjaGVja1RyYW5zYWN0aW9uKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICBsZXQgdXJsID0gcHJvZHVjdGlvbiA/IFwiaHR0cHM6Ly9tcHMuaGFzaGluZ3N5c3RlbXMuY29tXCIgOiAnaHR0cDovL2xvY2FsaG9zdDo5OTk5JztcbiAgICBsZXQgc3RydWN0dXJlID0ge2Jhc2V1cmw6IHVybCwgbWVtb19pZDogJycsIHJlY2VpdmVyX2lkOiAnJ307XG4gICAgZm9yICh2YXIga2V5IGluIHBhcmFtcylcbiAgICAgICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSBzdHJ1Y3R1cmVba2V5XSA9IHBhcmFtc1trZXldO1xuXG4gICAgdmFyIHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCB0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soe2Vycm9yOiB0cnVlLCBkYXRhOiB0aGlzLnJlc3BvbnNlfSwgbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHhodHRwLm9wZW4oXCJHRVRcIiwgc3RydWN0dXJlLmJhc2V1cmwgKyBcIi9jaGVjay9cIiArIHN0cnVjdHVyZS5yZWNlaXZlcl9pZCArIFwiL1wiICsgc3RydWN0dXJlLm1lbW9faWQsIHRydWUpO1xuICAgIHhodHRwLnNlbmQoKTtcbn1cblxuXG5hcHAod2luZG93KTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21haW4uanMiLCJcbmV4cG9ydCBmdW5jdGlvbiBwaW5nKCkge1xuICAgIHJldHVybiAncG9uZyc7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2VzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==