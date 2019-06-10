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

var supportedAPI = ['init', 'test', 'createhederaobject']; // enlist all methods supported by API (e.g. `mw('event', 'user-login');`)

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
        return apiHandler(queue[i][0], queue[i][1]);
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
    var body = document.getElementById('messagediv');
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
  if (!api) throw Error('API method required');
  api = api.toLowerCase();
  if (supportedAPI.indexOf(api) === -1) throw Error("Method ".concat(api, " is not supported"));
  console.log("Handling API call ".concat(api), params);

  switch (api) {
    // TODO: add API implementation
    case 'createhederaobject':
      return createHederaObject(params);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGI2NzkzMDNjYWVjYWU1YWE2MTIiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIl0sIm5hbWVzIjpbInN1cHBvcnRlZEFQSSIsInByb2R1Y3Rpb24iLCJhcHAiLCJ3aW5kb3ciLCJjb25zb2xlIiwibG9nIiwicGluZyIsImNvbmZpZ3VyYXRpb25zIiwicGF5bWVudHNlcnZlciIsImV4dGVuc2lvbmlkIiwiZXJyb3IiLCJ0eXBlIiwidGltZSIsIkRhdGUiLCJub3ciLCJyZWRpcmVjdCIsImlkIiwibG9jYXRpb24iLCJwYXRobmFtZSIsInN1Ym1pc3Npb25ub2RlIiwiZ2xvYmFsT2JqZWN0IiwicXVldWUiLCJxIiwiaSIsImxlbmd0aCIsInRvTG93ZXJDYXNlIiwiZXh0ZW5kT2JqZWN0IiwiY3JlYXRlSGVkZXJhT2JqZWN0IiwiY2hlY2tGb3JFeHRlbnNpb24iLCJhcGlIYW5kbGVyIiwiaXNDaHJvbWUiLCJyZWRpcmVjdFRvRXJyb3IiLCJ0YWdzIiwiYW1vdW50IiwiRVhURU5TSU9OX0lEIiwiZGV0ZWN0IiwicmVzcG9uc2UiLCJyZWNvcmRSZXNwb25zZSIsImV4dGVuc2lvbklkIiwibm90SW5zdGFsbGVkQ2FsbGJhY2siLCJpbnN0YWxsZWRDYWxsYmFjayIsImltZyIsIkltYWdlIiwib25lcnJvciIsIm9ubG9hZCIsInNyYyIsInJlcyIsImJvZHkiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwiZXJyIiwicmVwbGFjZSIsIm9yaWdpbiIsImFwaSIsInBhcmFtcyIsIkVycm9yIiwiaW5kZXhPZiIsIndhcm4iLCJhIiwiYiIsImtleSIsImhhc093blByb3BlcnR5Iiwib2JqZWN0IiwiSGVkZXJhb2JqZWN0Iiwibm9kZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtB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RCxFQUFrQixlQUFsQixFQUFrQyxlQUFsQyxFQUFrRCxXQUFsRCxFQUE4RCxNQUE5RCxFQUFxRSxNQUFyRSxFQUE0RSxhQUE1RSxFQUEwRixVQUExRixFQUFxRyxNQUFyRyxDQUFiO0FBQ0EzRCxTQUFPLENBQUNDLEdBQVIsQ0FBWTBELE1BQVo7QUFDQSxNQUFJQyxZQUFZLEdBQUksdUJBQXBCOztBQUNBLE9BQUksSUFBSXpDLENBQVIsSUFBYXdDLE1BQWIsRUFBb0I7QUFDaEIsUUFBSUUsSUFBSSxHQUFHRixNQUFNLENBQUN4QyxDQUFELENBQWpCOztBQUNBLFFBQUdnQyxNQUFNLENBQUNPLGNBQVAsQ0FBc0JHLElBQXRCLENBQUgsRUFBK0I7QUFDM0JELGtCQUFZLElBQUksVUFBUUMsSUFBUixHQUFjLEtBQWQsR0FBcUJWLE1BQU0sQ0FBQ1UsSUFBRCxDQUEzQixHQUFvQyxNQUFwQyxHQUE2QyxJQUE3RDtBQUNIO0FBQ0o7O0FBRURELGNBQVksSUFBSSx5QkFBaEI7QUFDQTVELFNBQU8sQ0FBQ0MsR0FBUixDQUFZMkQsWUFBWjtBQUVBLE1BQUlqQixJQUFJLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3Qk0sTUFBTSxDQUFDLFFBQUQsQ0FBOUIsQ0FBWDtBQUNBUixNQUFJLENBQUNHLFNBQUwsSUFBa0JjLFlBQWxCLENBZitCLENBZ0IvQjs7QUFDQSxTQUFPQSxZQUFQLENBakIrQixDQWtCL0I7QUFDSDs7QUFJVDlELEdBQUcsQ0FBQ0MsTUFBRCxDQUFILEM7Ozs7Ozs7QUM1SkE7QUFBTyxTQUFTRyxJQUFULEdBQWdCO0FBQ25CLFNBQU8sTUFBUDtBQUNILEMiLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOGI2NzkzMDNjYWVjYWU1YWE2MTIiLCJpbXBvcnQge1xuICAgIHBpbmdcbn0gZnJvbSAnLi9zZXJ2aWNlcydcblxuY29uc3Qgc3VwcG9ydGVkQVBJID0gWydpbml0JywndGVzdCcsJ2NyZWF0ZWhlZGVyYW9iamVjdCddOyAvLyBlbmxpc3QgYWxsIG1ldGhvZHMgc3VwcG9ydGVkIGJ5IEFQSSAoZS5nLiBgbXcoJ2V2ZW50JywgJ3VzZXItbG9naW4nKTtgKVxuLyoqXG4gVGhlIG1haW4gZW50cnkgb2YgdGhlIGFwcGxpY2F0aW9uXG4gKi9cbmNvbnN0IHByb2R1Y3Rpb24gPSB0cnVlO1xuXG5mdW5jdGlvbiBhcHAod2luZG93KSB7XG4gICAgY29uc29sZS5sb2cocGluZyk7XG4gICAgY29uc29sZS5sb2coJ01QUy1KUyBzdGFydGluZycpO1xuICAgIGxldCBjb25maWd1cmF0aW9ucyA9IHtcbiAgICAgICAgcGF5bWVudHNlcnZlcjogcHJvZHVjdGlvbiA/IFwiaHR0cHM6Ly9tcHMuaGFzaGluZ3N5c3RlbXMuY29tXCIgOiAnaHR0cDovL2xvY2FsaG9zdDo5OTk5JyxcbiAgICAgICAgZXh0ZW5zaW9uaWQ6IFwibGlncGFvbmRhYWJjbGZpZ2FnY2lmb2JhZWxlbWllbmFcIixcbiAgICAgICAgZXJyb3I6IFwiL25vLWV4dGVuc2lvblwiLFxuICAgICAgICB0eXBlOiBcImFydGljbGVcIixcbiAgICAgICAgdGltZTogRGF0ZS5ub3coKSxcbiAgICAgICAgcmVkaXJlY3Q6J3sgXCJub25QYXlpbmdBY2NvdW50XCI6IFwiL2luc3VmZmljaWVudC1hbW91bnQvXCIsIFwibm9BY2NvdW50XCI6IFwiL2FjY291bnQtbm90LXBhaXJlZC9cIiwgXCJob21lUGFnZVwiOiBcIi9cIn0nLFxuICAgICAgICAvLyB0aGlzIG1pZ2h0IG1ha2UgYSBnb29kIGRlZmF1bHQgaWQgZm9yIHRoZSBjb250ZW50XG4gICAgICAgIGlkOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgIHN1Ym1pc3Npb25ub2RlOiBcIjAuMC4xMVwiLFxuICAgICAgICAvL3JlZGlyZWN0Oid7IFwibm9uUGF5aW5nQWNjb3VudFwiOiBcIi9pbnN1ZmZpY2llbnQtYW1vdW50L1wiLCBcIm5vQWNjb3VudFwiOiBcIi9hY2NvdW50LW5vdC1wYWlyZWQvXCIsIFwiaG9tZVBhZ2VcIjogXCIvXCIgfScsXG4gICAgfTtcbiAgICAvLyBhbGwgbWV0aG9kcyB0aGF0IHdlcmUgY2FsbGVkIHRpbGwgbm93IGFuZCBzdG9yZWQgaW4gcXVldWVcbiAgICAvLyBuZWVkcyB0byBiZSBjYWxsZWQgbm93XG4gICAgbGV0IGdsb2JhbE9iamVjdCA9IHdpbmRvd1t3aW5kb3dbJ01QUy1KUyddXTtcbiAgICBsZXQgcXVldWUgPSBnbG9iYWxPYmplY3QucTtcbiAgICBpZiAocXVldWUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3F1ZXVlOicpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocXVldWVbaV0pO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBxdWV1ZVtpXVswXSAhPT0ndW5kZWZpbmVkJyAmJiBxdWV1ZVtpXVswXS50b0xvd2VyQ2FzZSgpID09ICdpbml0Jykge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25zID0gZXh0ZW5kT2JqZWN0KGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgICAgICAgICAgY3JlYXRlSGVkZXJhT2JqZWN0KGNvbmZpZ3VyYXRpb25zKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTVBTLUpTIHN0YXJ0ZWQnLCBjb25maWd1cmF0aW9ucyk7XG4gICAgICAgICAgICAgICAgY2hlY2tGb3JFeHRlbnNpb24oY29uZmlndXJhdGlvbnMpXG4gICAgICAgICAgICB9IGVsc2V7IHJldHVybiBhcGlIYW5kbGVyKHF1ZXVlW2ldWzBdLCBxdWV1ZVtpXVsxXSk7fVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIG92ZXJyaWRlIHRlbXBvcmFyeSAodW50aWwgdGhlIGFwcCBsb2FkZWQpIGhhbmRsZXJcbiAgICAvLyBmb3Igd2lkZ2V0J3MgQVBJIGNhbGxzXG4gICAgZ2xvYmFsT2JqZWN0ID0gYXBpSGFuZGxlcjtcbiAgICBnbG9iYWxPYmplY3QuY29uZmlndXJhdGlvbnMgPSBjb25maWd1cmF0aW9ucztcbn1cblxuLy8gY2hlY2tGb3JFeHRlbnNpb24gaGFuZGxlcyAzIHNjZW5hcmlvc1xuLy8gcmV0dXJucyB0cnVlIChoZWRlcmEtbWljcm9wYXltZW50IHRhZyBpcyBwcmVzZW50IGFuZCBleHRlbnNpb24gaXMgaW5zdGFsbGVkKVxuLy8gcmV0dXJucyBmYWxzZSAoaGVkZXJhLW1pY3JvcGF5bWVudCB0YWcgaXMgcHJlc2VudCBidXQgZXh0ZW5zaW9uIGlzIE5PVCBpbnN0YWxsZWQpXG4vLyByZXR1cm4gbnVsbCAoaGVkZXJhLW1pY3JvcGF5bWVudCBpcyBub3QgcHJlc2VudCBiZWNhdXNlIHRoaXMgd2Vic2l0ZSBkb2VzIG5vdCBpbXBsZW1lbnQgaGVkZXJhLW1pY3JvcGF5bWVudClcbmZ1bmN0aW9uIGNoZWNrRm9yRXh0ZW5zaW9uKGNvbmZpZ3VyYXRpb25zKSB7XG4gICAgaWYgKCFpc0Nocm9tZSgpKSB7XG4gICAgICAgIHJlZGlyZWN0VG9FcnJvcignaXNub3RDaHJvbWUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgdGFncyA9IGNvbmZpZ3VyYXRpb25zO1xuICAgICAgICAvLyBpZiB0YWdzLmFtb3VudCBpcyBudWxsIG9yIHVuZGVmaW5lZCwgd2Ugc2hvdWxkIGFzc3VtZSB0aGF0IHRoaXMgaXMgYSBmcmVlIHBhZ2UgYW5kIGRvIG5vdGhpbmcgbW9yZVxuICAgICAgICBpZiAodGFncy5hbW91bnQgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBFWFRFTlNJT05fSUQgPSB0YWdzLmV4dGVuc2lvbmlkO1xuXG4gICAgICAgIGRldGVjdChFWFRFTlNJT05fSUQsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZWRpcmVjdFRvRXJyb3IodGFncy5lcnJvcik7XG4gICAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkZXRlY3Q6IHVzZXIgaGFzIGV4dGVuc2lvbiBpbnN0YWxsZWQnKTtcbiAgICAgICAgICAgIHJlY29yZFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhjaHJvbWUucnVudGltZS5jb25uZWN0KEVYVEVOU0lPTl9JRCwndmVyc2lvbicpKTtcbiAgICAgICAgLypjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShFWFRFTlNJT05fSUQsICd2ZXJzaW9uJywgcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmVkaXJlY3RUb0Vycm9yKHRhZ3MuZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWNvcmRSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKi9cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRldGVjdChleHRlbnNpb25JZCwgbm90SW5zdGFsbGVkQ2FsbGJhY2ssIGluc3RhbGxlZENhbGxiYWNrKSB7XG4gICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGltZy5vbmVycm9yID0gbm90SW5zdGFsbGVkQ2FsbGJhY2s7XG4gICAgaW1nLm9ubG9hZCA9IGluc3RhbGxlZENhbGxiYWNrKCdpbnN0YWxsZWQnKTtcbiAgICBpbWcuc3JjID0gJ2Nocm9tZS1leHRlbnNpb246Ly8nICsgZXh0ZW5zaW9uSWQgKyAnL2ljb25zL2ljb24xNi5wbmcnO1xufVxuXG5mdW5jdGlvbiByZWNvcmRSZXNwb25zZShyZXMpIHtcbiAgICBpZiAodHlwZW9mIHJlcyAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXNzYWdlZGl2Jyk7XG4gICAgICAgIGJvZHkuaW5uZXJIVE1MICs9ICc8ZGl2IHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6NSU7b3BhY2l0eTowLjM7ei1pbmRleDoxMDA7YmFja2dyb3VuZDp5ZWxsb3c7XCI+JyArIHJlcyArICc8L2Rpdj4nO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiByZWRpcmVjdFRvRXJyb3IoZXJyKSB7XG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSAhPSBlcnIpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uod2luZG93Lm9yaWdpbiArIGVycik7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0Nocm9tZSgpIHtcbiAgICByZXR1cm4gJ2Nocm9tZScgaW4gd2luZG93XG59XG5cbi8qKlxuIE1ldGhvZCB0aGF0IGhhbmRsZXMgYWxsIEFQSSBjYWxsc1xuICovXG5mdW5jdGlvbiBhcGlIYW5kbGVyKGFwaSwgcGFyYW1zKSB7XG4gICAgaWYgKCFhcGkpIHRocm93IEVycm9yKCdBUEkgbWV0aG9kIHJlcXVpcmVkJyk7XG4gICAgYXBpID0gYXBpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHN1cHBvcnRlZEFQSS5pbmRleE9mKGFwaSkgPT09IC0xKSB0aHJvdyBFcnJvcihgTWV0aG9kICR7YXBpfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgY29uc29sZS5sb2coYEhhbmRsaW5nIEFQSSBjYWxsICR7YXBpfWAsIHBhcmFtcyk7XG4gICAgc3dpdGNoIChhcGkpIHtcbiAgICAgICAgLy8gVE9ETzogYWRkIEFQSSBpbXBsZW1lbnRhdGlvblxuXG4gICAgICAgIGNhc2UgJ2NyZWF0ZWhlZGVyYW9iamVjdCc6XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlSGVkZXJhT2JqZWN0KHBhcmFtcyk7XG5cbiAgICAgICAgY2FzZSAndGVzdCc6XG4gICAgICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBObyBoYW5kbGVyIGRlZmluZWQgZm9yICR7YXBpfWApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZXh0ZW5kT2JqZWN0KGEsIGIpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gYilcbiAgICAgICAgaWYgKGIuaGFzT3duUHJvcGVydHkoa2V5KSkgYVtrZXldID0gYltrZXldO1xuICAgIHJldHVybiBhO1xufVxuXG5cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlSGVkZXJhT2JqZWN0KHBhcmFtcyl7XG4gICAgICAgICAgICBsZXQgb2JqZWN0ID0gWydzdWJtaXNzaW9ubm9kZScsJ3BheW1lbnRzZXJ2ZXInLCdyZWNpcGllbnRsaXN0JywnY29udGVudGlkJywndHlwZScsJ21lbW8nLCdleHRlbnNpb25pZCcsJ3JlZGlyZWN0JywndGltZSddO1xuICAgICAgICAgICAgY29uc29sZS5sb2cob2JqZWN0KVxuICAgICAgICAgICAgbGV0IEhlZGVyYW9iamVjdCA9ICAnPGhlZGVyYS1taWNyb3BheW1lbnQgJ1xuICAgICAgICAgICAgZm9yKHZhciBpIGluIG9iamVjdCl7XG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBvYmplY3RbaV07XG4gICAgICAgICAgICAgICAgaWYocGFyYW1zLmhhc093blByb3BlcnR5KG5vZGUpKXtcbiAgICAgICAgICAgICAgICAgICAgSGVkZXJhb2JqZWN0ICs9IFwiZGF0YS1cIitub2RlICtcIj0gJ1wiKyBwYXJhbXNbbm9kZV0gKyBcIicgLCBcIiArIFwiXFxuXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBIZWRlcmFvYmplY3QgKz0gJz48L2hlZGVyYS1taWNyb3BheW1lbnQ+JztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEhlZGVyYW9iamVjdCk7XG5cbiAgICAgICAgICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyYW1zWydhdHRySUQnXSk7XG4gICAgICAgICAgICBib2R5LmlubmVySFRNTCArPSBIZWRlcmFvYmplY3Q7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKChIZWRlcmFvYmplY3QpKVxuICAgICAgICAgICAgcmV0dXJuIEhlZGVyYW9iamVjdDtcbiAgICAgICAgICAgIC8vY2FsbGJhY2soSGVkZXJhb2JqZWN0KTtcbiAgICAgICAgfVxuXG5cblxuYXBwKHdpbmRvdyk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWluLmpzIiwiXG5leHBvcnQgZnVuY3Rpb24gcGluZygpIHtcbiAgICByZXR1cm4gJ3BvbmcnO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy5qcyJdLCJzb3VyY2VSb290IjoiIn0=