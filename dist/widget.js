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

var supportedAPI = ['init']; // enlist all methods supported by API (e.g. `mw('event', 'user-login');`)

/**
 The main entry of the application
 */

function app(window) {
  console.log(__WEBPACK_IMPORTED_MODULE_0__services__["a" /* ping */]);
  console.log('MPS-JS starting');
  var configurations = {
    paymentserver: "http://localhost:9090",
    extensionID: "ligpaondaabclfigagcifobaelemiena",
    error: "/no-extension",
    type: "article",
    // this might make a good default id for the content
    id: window.location.pathname
  }; // all methods that were called till now and stored in queue
  // needs to be called now 

  var globalObject = window[window['MPS-JS']];
  var queue = globalObject.q;

  if (queue) {
    for (var i = 0; i < queue.length; i++) {
      if (queue[i][0].toLowerCase() == 'init') {
        configurations = extendObject(configurations, queue[i][1]);
        console.log('MPS-JS started', configurations);
        checkForExtension(configurations);
      } else apiHandler(queue[i][0], queue[i][1]);
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
    var EXTENSION_ID = tags.extensionID;
    chrome.runtime.sendMessage(EXTENSION_ID, 'version', function (response) {
      console.log(response);

      if (!response) {
        redirectToError(tags.error);
      } else {
        recordResponse(response);
      }
    });
  }
}

function recordResponse(res) {
  if (typeof res != 'undefined') {
    var body = document.getElementsByTagName('body');
    document.body.innerHTML += '<div style="position:absolute;width:100%;height:20%;opacity:0.3;z-index:100;background:#000;">' + res + '</div>';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODYzMmMwY2Q3ZDRiMTAwZTcxMTkiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIl0sIm5hbWVzIjpbInN1cHBvcnRlZEFQSSIsImFwcCIsIndpbmRvdyIsImNvbnNvbGUiLCJsb2ciLCJwaW5nIiwiY29uZmlndXJhdGlvbnMiLCJwYXltZW50c2VydmVyIiwiZXh0ZW5zaW9uSUQiLCJlcnJvciIsInR5cGUiLCJpZCIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJnbG9iYWxPYmplY3QiLCJxdWV1ZSIsInEiLCJpIiwibGVuZ3RoIiwidG9Mb3dlckNhc2UiLCJleHRlbmRPYmplY3QiLCJjaGVja0ZvckV4dGVuc2lvbiIsImFwaUhhbmRsZXIiLCJpc0Nocm9tZSIsInJlZGlyZWN0VG9FcnJvciIsInRhZ3MiLCJhbW91bnQiLCJFWFRFTlNJT05fSUQiLCJjaHJvbWUiLCJydW50aW1lIiwic2VuZE1lc3NhZ2UiLCJyZXNwb25zZSIsInJlY29yZFJlc3BvbnNlIiwicmVzIiwiYm9keSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJpbm5lckhUTUwiLCJlcnIiLCJyZXBsYWNlIiwib3JpZ2luIiwiYXBpIiwicGFyYW1zIiwiRXJyb3IiLCJpbmRleE9mIiwid2FybiIsImEiLCJiIiwia2V5IiwiaGFzT3duUHJvcGVydHkiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM3REE7QUFBQTtBQUFBO0FBSUEsSUFBTUEsWUFBWSxHQUFHLENBQUMsTUFBRCxDQUFyQixDLENBQStCOztBQUMvQjs7OztBQUdBLFNBQVNDLEdBQVQsQ0FBYUMsTUFBYixFQUFxQjtBQUNqQkMsU0FBTyxDQUFDQyxHQUFSLENBQVlDLHVEQUFaO0FBQ0FGLFNBQU8sQ0FBQ0MsR0FBUixDQUFZLGlCQUFaO0FBQ0EsTUFBSUUsY0FBYyxHQUFHO0FBQ2pCQyxpQkFBYSxFQUFFLHVCQURFO0FBRWpCQyxlQUFXLEVBQUUsa0NBRkk7QUFHakJDLFNBQUssRUFBRSxlQUhVO0FBSWpCQyxRQUFJLEVBQUUsU0FKVztBQUtqQjtBQUNBQyxNQUFFLEVBQUVULE1BQU0sQ0FBQ1UsUUFBUCxDQUFnQkM7QUFOSCxHQUFyQixDQUhpQixDQVdqQjtBQUNBOztBQUNBLE1BQUlDLFlBQVksR0FBR1osTUFBTSxDQUFDQSxNQUFNLENBQUMsUUFBRCxDQUFQLENBQXpCO0FBQ0EsTUFBSWEsS0FBSyxHQUFHRCxZQUFZLENBQUNFLENBQXpCOztBQUNBLE1BQUlELEtBQUosRUFBVztBQUNQLFNBQUssSUFBSUUsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0YsS0FBSyxDQUFDRyxNQUExQixFQUFrQ0QsQ0FBQyxFQUFuQyxFQUF1QztBQUNuQyxVQUFJRixLQUFLLENBQUNFLENBQUQsQ0FBTCxDQUFTLENBQVQsRUFBWUUsV0FBWixNQUE2QixNQUFqQyxFQUF5QztBQUNyQ2Isc0JBQWMsR0FBR2MsWUFBWSxDQUFDZCxjQUFELEVBQWlCUyxLQUFLLENBQUNFLENBQUQsQ0FBTCxDQUFTLENBQVQsQ0FBakIsQ0FBN0I7QUFDQWQsZUFBTyxDQUFDQyxHQUFSLENBQVksZ0JBQVosRUFBOEJFLGNBQTlCO0FBQ0FlLHlCQUFpQixDQUFDZixjQUFELENBQWpCO0FBQ0gsT0FKRCxNQUlPZ0IsVUFBVSxDQUFDUCxLQUFLLENBQUNFLENBQUQsQ0FBTCxDQUFTLENBQVQsQ0FBRCxFQUFjRixLQUFLLENBQUNFLENBQUQsQ0FBTCxDQUFTLENBQVQsQ0FBZCxDQUFWO0FBQ1Y7QUFDSixHQXZCZ0IsQ0F3QmpCO0FBQ0E7OztBQUNBSCxjQUFZLEdBQUdRLFVBQWY7QUFDQVIsY0FBWSxDQUFDUixjQUFiLEdBQThCQSxjQUE5QjtBQUNILEMsQ0FFRDtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsU0FBU2UsaUJBQVQsQ0FBMkJmLGNBQTNCLEVBQTJDO0FBQ3ZDLE1BQUksQ0FBQ2lCLFFBQVEsRUFBYixFQUFpQjtBQUNiQyxtQkFBZSxDQUFDLGFBQUQsQ0FBZjtBQUNILEdBRkQsTUFFTztBQUNILFFBQUlDLElBQUksR0FBR25CLGNBQVgsQ0FERyxDQUVIOztBQUNBLFFBQUltQixJQUFJLENBQUNDLE1BQUwsS0FBZ0IsSUFBcEIsRUFBMEIsT0FBTyxJQUFQO0FBQzFCLFFBQU1DLFlBQVksR0FBR0YsSUFBSSxDQUFDakIsV0FBMUI7QUFDQW9CLFVBQU0sQ0FBQ0MsT0FBUCxDQUFlQyxXQUFmLENBQTJCSCxZQUEzQixFQUF5QyxTQUF6QyxFQUFvRCxVQUFBSSxRQUFRLEVBQUk7QUFDNUQ1QixhQUFPLENBQUNDLEdBQVIsQ0FBWTJCLFFBQVo7O0FBQ0EsVUFBSSxDQUFDQSxRQUFMLEVBQWU7QUFDWFAsdUJBQWUsQ0FBQ0MsSUFBSSxDQUFDaEIsS0FBTixDQUFmO0FBQ0gsT0FGRCxNQUVPO0FBQ0h1QixzQkFBYyxDQUFDRCxRQUFELENBQWQ7QUFDSDtBQUNKLEtBUEQ7QUFRSDtBQUNKOztBQUVELFNBQVNDLGNBQVQsQ0FBd0JDLEdBQXhCLEVBQTZCO0FBQ3pCLE1BQUksT0FBT0EsR0FBUCxJQUFjLFdBQWxCLEVBQStCO0FBQzNCLFFBQUlDLElBQUksR0FBR0MsUUFBUSxDQUFDQyxvQkFBVCxDQUE4QixNQUE5QixDQUFYO0FBQ0FELFlBQVEsQ0FBQ0QsSUFBVCxDQUFjRyxTQUFkLElBQTJCLG1HQUFtR0osR0FBbkcsR0FBeUcsUUFBcEk7QUFDQSxXQUFPLElBQVA7QUFDSDs7QUFDRCxTQUFPLEtBQVA7QUFDSDs7QUFFRCxTQUFTVCxlQUFULENBQXlCYyxHQUF6QixFQUE4QjtBQUMxQixNQUFJcEMsTUFBTSxDQUFDVSxRQUFQLENBQWdCQyxRQUFoQixJQUE0QnlCLEdBQWhDLEVBQXFDO0FBQ2pDcEMsVUFBTSxDQUFDVSxRQUFQLENBQWdCMkIsT0FBaEIsQ0FBd0JyQyxNQUFNLENBQUNzQyxNQUFQLEdBQWdCRixHQUF4QztBQUNIO0FBQ0o7O0FBRUQsU0FBU2YsUUFBVCxHQUFvQjtBQUNoQixTQUFPLFlBQVlyQixNQUFuQjtBQUNIO0FBRUQ7Ozs7O0FBR0EsU0FBU29CLFVBQVQsQ0FBb0JtQixHQUFwQixFQUF5QkMsTUFBekIsRUFBaUM7QUFDN0IsTUFBSSxDQUFDRCxHQUFMLEVBQVUsTUFBTUUsS0FBSyxDQUFDLHFCQUFELENBQVg7QUFDVkYsS0FBRyxHQUFHQSxHQUFHLENBQUN0QixXQUFKLEVBQU47QUFDQSxNQUFJbkIsWUFBWSxDQUFDNEMsT0FBYixDQUFxQkgsR0FBckIsTUFBOEIsQ0FBQyxDQUFuQyxFQUFzQyxNQUFNRSxLQUFLLGtCQUFXRixHQUFYLHVCQUFYO0FBQ3RDdEMsU0FBTyxDQUFDQyxHQUFSLDZCQUFpQ3FDLEdBQWpDLEdBQXdDQyxNQUF4Qzs7QUFDQSxVQUFRRCxHQUFSO0FBQ0k7QUFDQTtBQUNJdEMsYUFBTyxDQUFDMEMsSUFBUixrQ0FBdUNKLEdBQXZDO0FBSFI7QUFLSDs7QUFFRCxTQUFTckIsWUFBVCxDQUFzQjBCLENBQXRCLEVBQXlCQyxDQUF6QixFQUE0QjtBQUN4QixPQUFLLElBQUlDLEdBQVQsSUFBZ0JELENBQWhCO0FBQ0ksUUFBSUEsQ0FBQyxDQUFDRSxjQUFGLENBQWlCRCxHQUFqQixDQUFKLEVBQTJCRixDQUFDLENBQUNFLEdBQUQsQ0FBRCxHQUFTRCxDQUFDLENBQUNDLEdBQUQsQ0FBVjtBQUQvQjs7QUFFQSxTQUFPRixDQUFQO0FBQ0g7O0FBRUQ3QyxHQUFHLENBQUNDLE1BQUQsQ0FBSCxDOzs7Ozs7O0FDcEdBO0FBQU8sU0FBU0csSUFBVCxHQUFnQjtBQUNuQixTQUFPLE1BQVA7QUFDSCxDIiwiZmlsZSI6IndpZGdldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDg2MzJjMGNkN2Q0YjEwMGU3MTE5IiwiaW1wb3J0IHtcbiAgICBwaW5nXG59IGZyb20gJy4vc2VydmljZXMnXG5cbmNvbnN0IHN1cHBvcnRlZEFQSSA9IFsnaW5pdCddOyAvLyBlbmxpc3QgYWxsIG1ldGhvZHMgc3VwcG9ydGVkIGJ5IEFQSSAoZS5nLiBgbXcoJ2V2ZW50JywgJ3VzZXItbG9naW4nKTtgKVxuLyoqXG4gVGhlIG1haW4gZW50cnkgb2YgdGhlIGFwcGxpY2F0aW9uXG4gKi9cbmZ1bmN0aW9uIGFwcCh3aW5kb3cpIHtcbiAgICBjb25zb2xlLmxvZyhwaW5nKTtcbiAgICBjb25zb2xlLmxvZygnTVBTLUpTIHN0YXJ0aW5nJyk7XG4gICAgbGV0IGNvbmZpZ3VyYXRpb25zID0ge1xuICAgICAgICBwYXltZW50c2VydmVyOiBcImh0dHA6Ly9sb2NhbGhvc3Q6OTA5MFwiLFxuICAgICAgICBleHRlbnNpb25JRDogXCJsaWdwYW9uZGFhYmNsZmlnYWdjaWZvYmFlbGVtaWVuYVwiLFxuICAgICAgICBlcnJvcjogXCIvbm8tZXh0ZW5zaW9uXCIsXG4gICAgICAgIHR5cGU6IFwiYXJ0aWNsZVwiLFxuICAgICAgICAvLyB0aGlzIG1pZ2h0IG1ha2UgYSBnb29kIGRlZmF1bHQgaWQgZm9yIHRoZSBjb250ZW50XG4gICAgICAgIGlkOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWVcbiAgICB9O1xuICAgIC8vIGFsbCBtZXRob2RzIHRoYXQgd2VyZSBjYWxsZWQgdGlsbCBub3cgYW5kIHN0b3JlZCBpbiBxdWV1ZVxuICAgIC8vIG5lZWRzIHRvIGJlIGNhbGxlZCBub3cgXG4gICAgbGV0IGdsb2JhbE9iamVjdCA9IHdpbmRvd1t3aW5kb3dbJ01QUy1KUyddXTtcbiAgICBsZXQgcXVldWUgPSBnbG9iYWxPYmplY3QucTtcbiAgICBpZiAocXVldWUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHF1ZXVlW2ldWzBdLnRvTG93ZXJDYXNlKCkgPT0gJ2luaXQnKSB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbnMgPSBleHRlbmRPYmplY3QoY29uZmlndXJhdGlvbnMsIHF1ZXVlW2ldWzFdKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTVBTLUpTIHN0YXJ0ZWQnLCBjb25maWd1cmF0aW9ucyk7XG4gICAgICAgICAgICAgICAgY2hlY2tGb3JFeHRlbnNpb24oY29uZmlndXJhdGlvbnMpXG4gICAgICAgICAgICB9IGVsc2UgYXBpSGFuZGxlcihxdWV1ZVtpXVswXSwgcXVldWVbaV1bMV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIG92ZXJyaWRlIHRlbXBvcmFyeSAodW50aWwgdGhlIGFwcCBsb2FkZWQpIGhhbmRsZXJcbiAgICAvLyBmb3Igd2lkZ2V0J3MgQVBJIGNhbGxzXG4gICAgZ2xvYmFsT2JqZWN0ID0gYXBpSGFuZGxlcjtcbiAgICBnbG9iYWxPYmplY3QuY29uZmlndXJhdGlvbnMgPSBjb25maWd1cmF0aW9ucztcbn1cblxuLy8gY2hlY2tGb3JFeHRlbnNpb24gaGFuZGxlcyAzIHNjZW5hcmlvc1xuLy8gcmV0dXJucyB0cnVlIChoZWRlcmEtbWljcm9wYXltZW50IHRhZyBpcyBwcmVzZW50IGFuZCBleHRlbnNpb24gaXMgaW5zdGFsbGVkKVxuLy8gcmV0dXJucyBmYWxzZSAoaGVkZXJhLW1pY3JvcGF5bWVudCB0YWcgaXMgcHJlc2VudCBidXQgZXh0ZW5zaW9uIGlzIE5PVCBpbnN0YWxsZWQpXG4vLyByZXR1cm4gbnVsbCAoaGVkZXJhLW1pY3JvcGF5bWVudCBpcyBub3QgcHJlc2VudCBiZWNhdXNlIHRoaXMgd2Vic2l0ZSBkb2VzIG5vdCBpbXBsZW1lbnQgaGVkZXJhLW1pY3JvcGF5bWVudClcbmZ1bmN0aW9uIGNoZWNrRm9yRXh0ZW5zaW9uKGNvbmZpZ3VyYXRpb25zKSB7XG4gICAgaWYgKCFpc0Nocm9tZSgpKSB7XG4gICAgICAgIHJlZGlyZWN0VG9FcnJvcignaXNub3RDaHJvbWUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgdGFncyA9IGNvbmZpZ3VyYXRpb25zO1xuICAgICAgICAvLyBpZiB0YWdzLmFtb3VudCBpcyBudWxsIG9yIHVuZGVmaW5lZCwgd2Ugc2hvdWxkIGFzc3VtZSB0aGF0IHRoaXMgaXMgYSBmcmVlIHBhZ2UgYW5kIGRvIG5vdGhpbmcgbW9yZVxuICAgICAgICBpZiAodGFncy5hbW91bnQgPT09IG51bGwpIHJldHVybiBudWxsXG4gICAgICAgIGNvbnN0IEVYVEVOU0lPTl9JRCA9IHRhZ3MuZXh0ZW5zaW9uSUQ7XG4gICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKEVYVEVOU0lPTl9JRCwgJ3ZlcnNpb24nLCByZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZWRpcmVjdFRvRXJyb3IodGFncy5lcnJvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlY29yZFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlY29yZFJlc3BvbnNlKHJlcykge1xuICAgIGlmICh0eXBlb2YgcmVzICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgKz0gJzxkaXYgc3R5bGU9XCJwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxMDAlO2hlaWdodDoyMCU7b3BhY2l0eTowLjM7ei1pbmRleDoxMDA7YmFja2dyb3VuZDojMDAwO1wiPicgKyByZXMgKyAnPC9kaXY+JztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gcmVkaXJlY3RUb0Vycm9yKGVycikge1xuICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgIT0gZXJyKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBlcnIpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNDaHJvbWUoKSB7XG4gICAgcmV0dXJuICdjaHJvbWUnIGluIHdpbmRvd1xufVxuXG4vKipcbiBNZXRob2QgdGhhdCBoYW5kbGVzIGFsbCBBUEkgY2FsbHNcbiAqL1xuZnVuY3Rpb24gYXBpSGFuZGxlcihhcGksIHBhcmFtcykge1xuICAgIGlmICghYXBpKSB0aHJvdyBFcnJvcignQVBJIG1ldGhvZCByZXF1aXJlZCcpO1xuICAgIGFwaSA9IGFwaS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChzdXBwb3J0ZWRBUEkuaW5kZXhPZihhcGkpID09PSAtMSkgdGhyb3cgRXJyb3IoYE1ldGhvZCAke2FwaX0gaXMgbm90IHN1cHBvcnRlZGApO1xuICAgIGNvbnNvbGUubG9nKGBIYW5kbGluZyBBUEkgY2FsbCAke2FwaX1gLCBwYXJhbXMpO1xuICAgIHN3aXRjaCAoYXBpKSB7XG4gICAgICAgIC8vIFRPRE86IGFkZCBBUEkgaW1wbGVtZW50YXRpb25cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgTm8gaGFuZGxlciBkZWZpbmVkIGZvciAke2FwaX1gKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGV4dGVuZE9iamVjdChhLCBiKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGIpXG4gICAgICAgIGlmIChiLmhhc093blByb3BlcnR5KGtleSkpIGFba2V5XSA9IGJba2V5XTtcbiAgICByZXR1cm4gYTtcbn1cblxuYXBwKHdpbmRvdyk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21haW4uanMiLCJcbmV4cG9ydCBmdW5jdGlvbiBwaW5nKCkge1xuICAgIHJldHVybiAncG9uZyc7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2VzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==