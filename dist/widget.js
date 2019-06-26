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
    redirectToError('/isnotChrome/');
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

function checkTransaction(params) {
  var url = production ? "https://mps.hashingsystems.com" : 'http://localhost:9999';
  var structure = {
    baseurl: url,
    memo_id: '',
    receiver_id: '',
    success: '/success',
    failure: '/payment-failed',
    timeout: 3000
  };

  for (var key in params) {
    if (params.hasOwnProperty(key)) structure[key] = params[key];
  }

  if (structure.receiver_id && structure.memo_id) {
    URL = structure.baseurl + "/check/" + structure.receiver_id + "/" + structure.memo_id;
  } else {
    URL = structure.baseurl + "/memo/" + structure.memo_id;
  }

  setTimeout(performRequest(structure), structure.timeout);
}

var performRequest = function performRequest(structure) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        window.location.replace(window.origin + structure.success); //callback(null, this.response);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDVhMTYwNzk0MjQyODczMjkzNWQiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIl0sIm5hbWVzIjpbInN1cHBvcnRlZEFQSSIsInByb2R1Y3Rpb24iLCJhcHAiLCJ3aW5kb3ciLCJjb25zb2xlIiwibG9nIiwicGluZyIsImNvbmZpZ3VyYXRpb25zIiwicGF5bWVudHNlcnZlciIsImV4dGVuc2lvbmlkIiwiZXJyb3IiLCJ0eXBlIiwidGltZSIsIkRhdGUiLCJub3ciLCJyZWRpcmVjdCIsImlkIiwibG9jYXRpb24iLCJwYXRobmFtZSIsInN1Ym1pc3Npb25ub2RlIiwiZ2xvYmFsT2JqZWN0IiwicXVldWUiLCJxIiwiaSIsImxlbmd0aCIsInRvTG93ZXJDYXNlIiwiZXh0ZW5kT2JqZWN0IiwiY3JlYXRlSGVkZXJhT2JqZWN0IiwiY2hlY2tGb3JFeHRlbnNpb24iLCJhcGlIYW5kbGVyIiwiaXNDaHJvbWUiLCJyZWRpcmVjdFRvRXJyb3IiLCJ0YWdzIiwiYW1vdW50IiwiRVhURU5TSU9OX0lEIiwiZGV0ZWN0IiwicmVzcG9uc2UiLCJyZWNvcmRSZXNwb25zZSIsImV4dGVuc2lvbklkIiwibm90SW5zdGFsbGVkQ2FsbGJhY2siLCJpbnN0YWxsZWRDYWxsYmFjayIsImltZyIsIkltYWdlIiwib25lcnJvciIsIm9ubG9hZCIsInNyYyIsInJlcyIsImJvZHkiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwiZXJyIiwicmVwbGFjZSIsIm9yaWdpbiIsImFwaSIsInBhcmFtcyIsImNhbGxiYWNrIiwiRXJyb3IiLCJpbmRleE9mIiwiY2hlY2tUcmFuc2FjdGlvbiIsIndhcm4iLCJhIiwiYiIsImtleSIsImhhc093blByb3BlcnR5Iiwib2JqZWN0IiwiSGVkZXJhb2JqZWN0Iiwibm9kZSIsImdldEVsZW1lbnRCeUlkIiwidXJsIiwic3RydWN0dXJlIiwiYmFzZXVybCIsIm1lbW9faWQiLCJyZWNlaXZlcl9pZCIsInN1Y2Nlc3MiLCJmYWlsdXJlIiwidGltZW91dCIsIlVSTCIsInNldFRpbWVvdXQiLCJwZXJmb3JtUmVxdWVzdCIsInhodHRwIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwib3BlbiIsInNlbmQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM3REE7QUFBQTtBQUFBO0FBSUEsSUFBTUEsWUFBWSxHQUFHLENBQUMsTUFBRCxFQUFTLE1BQVQsRUFBaUIsb0JBQWpCLEVBQXVDLGtCQUF2QyxDQUFyQixDLENBQWlGOztBQUNqRjs7OztBQUdBLElBQU1DLFVBQVUsR0FBRyxJQUFuQjs7QUFFQSxTQUFTQyxHQUFULENBQWFDLE1BQWIsRUFBcUI7QUFDakJDLFNBQU8sQ0FBQ0MsR0FBUixDQUFZQyx1REFBWjtBQUNBRixTQUFPLENBQUNDLEdBQVIsQ0FBWSxpQkFBWjtBQUNBLE1BQUlFLGNBQWMsR0FBRztBQUNqQkMsaUJBQWEsRUFBRVAsVUFBVSxHQUFHLGdDQUFILEdBQXNDLHVCQUQ5QztBQUVqQlEsZUFBVyxFQUFFLGtDQUZJO0FBR2pCQyxTQUFLLEVBQUUsZUFIVTtBQUlqQkMsUUFBSSxFQUFFLFNBSlc7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QyxNQUFJVSxLQUFLLEdBQUcsSUFBSUMsY0FBSixFQUFaOztBQUNBRCxPQUFLLENBQUNFLGtCQUFOLEdBQTJCLFlBQVk7QUFDbkMsUUFBSSxLQUFLQyxVQUFMLElBQW1CLENBQXZCLEVBQTBCO0FBQ3RCLFVBQUksS0FBS0MsTUFBTCxJQUFlLEdBQW5CLEVBQXdCO0FBQ3BCakYsY0FBTSxDQUFDYyxRQUFQLENBQWdCbUMsT0FBaEIsQ0FBd0JqRCxNQUFNLENBQUNrRCxNQUFQLEdBQWdCaUIsU0FBUyxDQUFDSSxPQUFsRCxFQURvQixDQUVwQjtBQUNILE9BSEQsTUFHTztBQUNIO0FBQ0F2RSxjQUFNLENBQUNjLFFBQVAsQ0FBZ0JtQyxPQUFoQixDQUF3QmpELE1BQU0sQ0FBQ2tELE1BQVAsR0FBZ0JpQixTQUFTLENBQUNLLE9BQWxEO0FBQ0g7QUFDSjtBQUNKLEdBVkQ7O0FBV0FLLE9BQUssQ0FBQ0ssSUFBTixDQUFXLEtBQVgsRUFBa0JSLEdBQWxCLEVBQXVCLElBQXZCO0FBQ0FHLE9BQUssQ0FBQ00sSUFBTjtBQUNILENBZkQ7O0FBa0JBcEYsR0FBRyxDQUFDQyxNQUFELENBQUgsQzs7Ozs7OztBQ3JNQTtBQUFPLFNBQVNHLElBQVQsR0FBZ0I7QUFDbkIsU0FBTyxNQUFQO0FBQ0gsQyIsImZpbGUiOiJ3aWRnZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkNWExNjA3OTQyNDI4NzMyOTM1ZCIsImltcG9ydCB7XG4gICAgcGluZ1xufSBmcm9tICcuL3NlcnZpY2VzJ1xuXG5jb25zdCBzdXBwb3J0ZWRBUEkgPSBbJ2luaXQnLCAndGVzdCcsICdjcmVhdGVoZWRlcmFvYmplY3QnLCAnY2hlY2t0cmFuc2FjdGlvbiddOyAvLyBlbmxpc3QgYWxsIG1ldGhvZHMgc3VwcG9ydGVkIGJ5IEFQSSAoZS5nLiBgbXcoJ2V2ZW50JywgJ3VzZXItbG9naW4nKTtgKVxuLyoqXG4gVGhlIG1haW4gZW50cnkgb2YgdGhlIGFwcGxpY2F0aW9uXG4gKi9cbmNvbnN0IHByb2R1Y3Rpb24gPSB0cnVlO1xuXG5mdW5jdGlvbiBhcHAod2luZG93KSB7XG4gICAgY29uc29sZS5sb2cocGluZyk7XG4gICAgY29uc29sZS5sb2coJ01QUy1KUyBzdGFydGluZycpO1xuICAgIGxldCBjb25maWd1cmF0aW9ucyA9IHtcbiAgICAgICAgcGF5bWVudHNlcnZlcjogcHJvZHVjdGlvbiA/IFwiaHR0cHM6Ly9tcHMuaGFzaGluZ3N5c3RlbXMuY29tXCIgOiAnaHR0cDovL2xvY2FsaG9zdDo5OTk5JyxcbiAgICAgICAgZXh0ZW5zaW9uaWQ6IFwibGlncGFvbmRhYWJjbGZpZ2FnY2lmb2JhZWxlbWllbmFcIixcbiAgICAgICAgZXJyb3I6IFwiL25vLWV4dGVuc2lvblwiLFxuICAgICAgICB0eXBlOiBcImFydGljbGVcIixcbiAgICAgICAgdGltZTogRGF0ZS5ub3coKSxcbiAgICAgICAgcmVkaXJlY3Q6ICd7IFwibm9uUGF5aW5nQWNjb3VudFwiOiBcIi9pbnN1ZmZpY2llbnQtYW1vdW50L1wiLCBcIm5vQWNjb3VudFwiOiBcIi9hY2NvdW50LW5vdC1wYWlyZWQvXCIsIFwiaG9tZVBhZ2VcIjogXCIvXCJ9JyxcbiAgICAgICAgLy8gdGhpcyBtaWdodCBtYWtlIGEgZ29vZCBkZWZhdWx0IGlkIGZvciB0aGUgY29udGVudFxuICAgICAgICBpZDogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgICBzdWJtaXNzaW9ubm9kZTogXCIwLjAuMTFcIixcbiAgICAgICAgLy9yZWRpcmVjdDoneyBcIm5vblBheWluZ0FjY291bnRcIjogXCIvaW5zdWZmaWNpZW50LWFtb3VudC9cIiwgXCJub0FjY291bnRcIjogXCIvYWNjb3VudC1ub3QtcGFpcmVkL1wiLCBcImhvbWVQYWdlXCI6IFwiL1wiIH0nLFxuICAgIH07XG4gICAgLy8gYWxsIG1ldGhvZHMgdGhhdCB3ZXJlIGNhbGxlZCB0aWxsIG5vdyBhbmQgc3RvcmVkIGluIHF1ZXVlXG4gICAgLy8gbmVlZHMgdG8gYmUgY2FsbGVkIG5vd1xuICAgIGxldCBnbG9iYWxPYmplY3QgPSB3aW5kb3dbd2luZG93WydNUFMtSlMnXV07XG4gICAgbGV0IHF1ZXVlID0gZ2xvYmFsT2JqZWN0LnE7XG4gICAgaWYgKHF1ZXVlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdxdWV1ZTonKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHF1ZXVlW2ldKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcXVldWVbaV1bMF0gIT09ICd1bmRlZmluZWQnICYmIHF1ZXVlW2ldWzBdLnRvTG93ZXJDYXNlKCkgPT0gJ2luaXQnKSB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbnMgPSBleHRlbmRPYmplY3QoY29uZmlndXJhdGlvbnMsIHF1ZXVlW2ldWzFdKTtcbiAgICAgICAgICAgICAgICBjcmVhdGVIZWRlcmFPYmplY3QoY29uZmlndXJhdGlvbnMpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdNUFMtSlMgc3RhcnRlZCcsIGNvbmZpZ3VyYXRpb25zKTtcbiAgICAgICAgICAgICAgICBjaGVja0ZvckV4dGVuc2lvbihjb25maWd1cmF0aW9ucylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFwaUhhbmRsZXIocXVldWVbaV1bMF0sIHF1ZXVlW2ldWzFdLCBxdWV1ZVtpXVsyXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gb3ZlcnJpZGUgdGVtcG9yYXJ5ICh1bnRpbCB0aGUgYXBwIGxvYWRlZCkgaGFuZGxlclxuICAgIC8vIGZvciB3aWRnZXQncyBBUEkgY2FsbHNcbiAgICBnbG9iYWxPYmplY3QgPSBhcGlIYW5kbGVyO1xuICAgIGdsb2JhbE9iamVjdC5jb25maWd1cmF0aW9ucyA9IGNvbmZpZ3VyYXRpb25zO1xufVxuXG4vLyBjaGVja0ZvckV4dGVuc2lvbiBoYW5kbGVzIDMgc2NlbmFyaW9zXG4vLyByZXR1cm5zIHRydWUgKGhlZGVyYS1taWNyb3BheW1lbnQgdGFnIGlzIHByZXNlbnQgYW5kIGV4dGVuc2lvbiBpcyBpbnN0YWxsZWQpXG4vLyByZXR1cm5zIGZhbHNlIChoZWRlcmEtbWljcm9wYXltZW50IHRhZyBpcyBwcmVzZW50IGJ1dCBleHRlbnNpb24gaXMgTk9UIGluc3RhbGxlZClcbi8vIHJldHVybiBudWxsIChoZWRlcmEtbWljcm9wYXltZW50IGlzIG5vdCBwcmVzZW50IGJlY2F1c2UgdGhpcyB3ZWJzaXRlIGRvZXMgbm90IGltcGxlbWVudCBoZWRlcmEtbWljcm9wYXltZW50KVxuZnVuY3Rpb24gY2hlY2tGb3JFeHRlbnNpb24oY29uZmlndXJhdGlvbnMpIHtcbiAgICBpZiAoIWlzQ2hyb21lKCkpIHtcbiAgICAgICAgcmVkaXJlY3RUb0Vycm9yKCcvaXNub3RDaHJvbWUvJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHRhZ3MgPSBjb25maWd1cmF0aW9ucztcbiAgICAgICAgLy8gaWYgdGFncy5hbW91bnQgaXMgbnVsbCBvciB1bmRlZmluZWQsIHdlIHNob3VsZCBhc3N1bWUgdGhhdCB0aGlzIGlzIGEgZnJlZSBwYWdlIGFuZCBkbyBub3RoaW5nIG1vcmVcbiAgICAgICAgaWYgKHRhZ3MuYW1vdW50ID09PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3QgRVhURU5TSU9OX0lEID0gdGFncy5leHRlbnNpb25pZDtcblxuICAgICAgICBkZXRlY3QoRVhURU5TSU9OX0lELCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZWRpcmVjdFRvRXJyb3IodGFncy5lcnJvcik7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2RldGVjdDogdXNlciBoYXMgZXh0ZW5zaW9uIGluc3RhbGxlZCcpO1xuICAgICAgICAgICAgcmVjb3JkUmVzcG9uc2UocmVzcG9uc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKGNocm9tZS5ydW50aW1lLmNvbm5lY3QoRVhURU5TSU9OX0lELCd2ZXJzaW9uJykpO1xuICAgICAgICAvKmNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKEVYVEVOU0lPTl9JRCwgJ3ZlcnNpb24nLCByZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZWRpcmVjdFRvRXJyb3IodGFncy5lcnJvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlY29yZFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkqL1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZGV0ZWN0KGV4dGVuc2lvbklkLCBub3RJbnN0YWxsZWRDYWxsYmFjaywgaW5zdGFsbGVkQ2FsbGJhY2spIHtcbiAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLm9uZXJyb3IgPSBub3RJbnN0YWxsZWRDYWxsYmFjaztcbiAgICBpbWcub25sb2FkID0gaW5zdGFsbGVkQ2FsbGJhY2soJ2luc3RhbGxlZCcpO1xuICAgIGltZy5zcmMgPSAnY2hyb21lLWV4dGVuc2lvbjovLycgKyBleHRlbnNpb25JZCArICcvaWNvbnMvaWNvbjE2LnBuZyc7XG59XG5cbmZ1bmN0aW9uIHJlY29yZFJlc3BvbnNlKHJlcykge1xuICAgIGlmICh0eXBlb2YgcmVzICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKTtcbiAgICAgICAgYm9keS5pbm5lckhUTUwgKz0gJzxkaXYgc3R5bGU9XCJ3aWR0aDoxMDAlO2hlaWdodDo1JTtvcGFjaXR5OjAuMzt6LWluZGV4OjEwMDtiYWNrZ3JvdW5kOnllbGxvdztcIj4nICsgcmVzICsgJzwvZGl2Pic7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHJlZGlyZWN0VG9FcnJvcihlcnIpIHtcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICE9IGVycikge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cub3JpZ2luICsgZXJyKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzQ2hyb21lKCkge1xuICAgIHJldHVybiAnY2hyb21lJyBpbiB3aW5kb3dcbn1cblxuLyoqXG4gTWV0aG9kIHRoYXQgaGFuZGxlcyBhbGwgQVBJIGNhbGxzXG4gKi9cbmZ1bmN0aW9uIGFwaUhhbmRsZXIoYXBpLCBwYXJhbXMsIGNhbGxiYWNrID0gbnVsbCkge1xuICAgIGlmICghYXBpKSB0aHJvdyBFcnJvcignQVBJIG1ldGhvZCByZXF1aXJlZCcpO1xuICAgIGFwaSA9IGFwaS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChzdXBwb3J0ZWRBUEkuaW5kZXhPZihhcGkpID09PSAtMSkgdGhyb3cgRXJyb3IoYE1ldGhvZCAke2FwaX0gaXMgbm90IHN1cHBvcnRlZGApO1xuICAgIGNvbnNvbGUubG9nKGBIYW5kbGluZyBBUEkgY2FsbCAke2FwaX1gLCBwYXJhbXMpO1xuICAgIHN3aXRjaCAoYXBpKSB7XG4gICAgICAgIC8vIFRPRE86IGFkZCBBUEkgaW1wbGVtZW50YXRpb25cblxuICAgICAgICBjYXNlICdjcmVhdGVoZWRlcmFvYmplY3QnOlxuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUhlZGVyYU9iamVjdChwYXJhbXMpO1xuXG4gICAgICAgIGNhc2UgJ2NoZWNrdHJhbnNhY3Rpb24nOlxuICAgICAgICAgICAgcmV0dXJuIGNoZWNrVHJhbnNhY3Rpb24ocGFyYW1zLCBjYWxsYmFjayk7XG5cbiAgICAgICAgY2FzZSAndGVzdCc6XG4gICAgICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBObyBoYW5kbGVyIGRlZmluZWQgZm9yICR7YXBpfWApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZXh0ZW5kT2JqZWN0KGEsIGIpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gYilcbiAgICAgICAgaWYgKGIuaGFzT3duUHJvcGVydHkoa2V5KSkgYVtrZXldID0gYltrZXldO1xuICAgIHJldHVybiBhO1xufVxuXG5cbmZ1bmN0aW9uIGNyZWF0ZUhlZGVyYU9iamVjdChwYXJhbXMpIHtcbiAgICBsZXQgb2JqZWN0ID0gWydzdWJtaXNzaW9ubm9kZScsICdwYXltZW50c2VydmVyJywgJ3JlY2lwaWVudGxpc3QnLCAnY29udGVudGlkJywgJ3R5cGUnLCAnbWVtbycsICdleHRlbnNpb25pZCcsICdyZWRpcmVjdCcsICd0aW1lJ107XG4gICAgY29uc29sZS5sb2cob2JqZWN0KVxuICAgIGxldCBIZWRlcmFvYmplY3QgPSAnPGhlZGVyYS1taWNyb3BheW1lbnQgJ1xuICAgIGZvciAodmFyIGkgaW4gb2JqZWN0KSB7XG4gICAgICAgIGxldCBub2RlID0gb2JqZWN0W2ldO1xuICAgICAgICBpZiAocGFyYW1zLmhhc093blByb3BlcnR5KG5vZGUpKSB7XG4gICAgICAgICAgICBIZWRlcmFvYmplY3QgKz0gXCJkYXRhLVwiICsgbm9kZSArIFwiPSAnXCIgKyBwYXJhbXNbbm9kZV0gKyBcIicgLCBcIiArIFwiXFxuXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgSGVkZXJhb2JqZWN0ICs9ICc+PC9oZWRlcmEtbWljcm9wYXltZW50Pic7XG4gICAgY29uc29sZS5sb2coSGVkZXJhb2JqZWN0KTtcblxuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyYW1zWydhdHRySUQnXSk7XG4gICAgYm9keS5pbm5lckhUTUwgKz0gSGVkZXJhb2JqZWN0O1xuICAgIC8vY29uc29sZS5sb2coKEhlZGVyYW9iamVjdCkpXG4gICAgcmV0dXJuIEhlZGVyYW9iamVjdDtcbiAgICAvL2NhbGxiYWNrKEhlZGVyYW9iamVjdCk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrVHJhbnNhY3Rpb24ocGFyYW1zKSB7XG4gICAgbGV0IHVybCA9IHByb2R1Y3Rpb24gPyBcImh0dHBzOi8vbXBzLmhhc2hpbmdzeXN0ZW1zLmNvbVwiIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6OTk5OSc7XG4gICAgbGV0IHN0cnVjdHVyZSA9IHtiYXNldXJsOiB1cmwsXG4gICAgICAgIG1lbW9faWQ6ICcnLFxuICAgICAgICByZWNlaXZlcl9pZDogJycsXG4gICAgICAgIHN1Y2Nlc3M6Jy9zdWNjZXNzJyxcbiAgICAgICAgZmFpbHVyZTonL3BheW1lbnQtZmFpbGVkJyxcbiAgICAgICAgdGltZW91dDozMDAwXG4gICAgfTtcbiAgICBmb3IgKHZhciBrZXkgaW4gcGFyYW1zKVxuICAgICAgICBpZiAocGFyYW1zLmhhc093blByb3BlcnR5KGtleSkpIHN0cnVjdHVyZVtrZXldID0gcGFyYW1zW2tleV07XG4gICAgICAgIGlmKHN0cnVjdHVyZS5yZWNlaXZlcl9pZCAmJiBzdHJ1Y3R1cmUubWVtb19pZCl7XG4gICAgICAgICAgICBVUkwgPSBzdHJ1Y3R1cmUuYmFzZXVybCArIFwiL2NoZWNrL1wiICsgc3RydWN0dXJlLnJlY2VpdmVyX2lkICsgXCIvXCIgKyBzdHJ1Y3R1cmUubWVtb19pZFxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIFVSTCA9IHN0cnVjdHVyZS5iYXNldXJsICsgXCIvbWVtby9cIiArIHN0cnVjdHVyZS5tZW1vX2lkO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dChwZXJmb3JtUmVxdWVzdChzdHJ1Y3R1cmUpLHN0cnVjdHVyZS50aW1lb3V0KVxuXG59XG5cbnZhciBwZXJmb3JtUmVxdWVzdCA9IGZ1bmN0aW9uIChzdHJ1Y3R1cmUpe1xuICAgIHZhciB4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uod2luZG93Lm9yaWdpbiArIHN0cnVjdHVyZS5zdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAvL2NhbGxiYWNrKG51bGwsIHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL2NhbGxiYWNrKHtlcnJvcjogdHJ1ZSwgZGF0YTogdGhpcy5yZXNwb25zZX0sIG51bGwpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5vcmlnaW4gKyBzdHJ1Y3R1cmUuZmFpbHVyZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHhodHRwLm9wZW4oXCJHRVRcIiwgVVJMLCB0cnVlKTtcbiAgICB4aHR0cC5zZW5kKCk7XG59O1xuXG5cbmFwcCh3aW5kb3cpO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsIlxuZXhwb3J0IGZ1bmN0aW9uIHBpbmcoKSB7XG4gICAgcmV0dXJuICdwb25nJztcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmljZXMuanMiXSwic291cmNlUm9vdCI6IiJ9