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
        console.log(queue[i]);
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

    case 'checktransaction':
      return checkTransaction(params);

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
    receiver_id: ''
  };

  for (var key in params) {
    if (params.hasOwnProperty(key)) structure[key] = params[key];
  }

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.response);
    }
  };

  xhttp.open("GET", url + "/check/" + structure.receiver_id + "/" + structure.memo_id, true);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODA3ZmUwN2YxMDRmZGU5NjAzNzYiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIl0sIm5hbWVzIjpbInN1cHBvcnRlZEFQSSIsInByb2R1Y3Rpb24iLCJhcHAiLCJ3aW5kb3ciLCJjb25zb2xlIiwibG9nIiwicGluZyIsImNvbmZpZ3VyYXRpb25zIiwicGF5bWVudHNlcnZlciIsImV4dGVuc2lvbmlkIiwiZXJyb3IiLCJ0eXBlIiwidGltZSIsIkRhdGUiLCJub3ciLCJyZWRpcmVjdCIsImlkIiwibG9jYXRpb24iLCJwYXRobmFtZSIsInN1Ym1pc3Npb25ub2RlIiwiZ2xvYmFsT2JqZWN0IiwicXVldWUiLCJxIiwiaSIsImxlbmd0aCIsInRvTG93ZXJDYXNlIiwiZXh0ZW5kT2JqZWN0IiwiY3JlYXRlSGVkZXJhT2JqZWN0IiwiY2hlY2tGb3JFeHRlbnNpb24iLCJhcGlIYW5kbGVyIiwiaXNDaHJvbWUiLCJyZWRpcmVjdFRvRXJyb3IiLCJ0YWdzIiwiYW1vdW50IiwiRVhURU5TSU9OX0lEIiwiZGV0ZWN0IiwicmVzcG9uc2UiLCJyZWNvcmRSZXNwb25zZSIsImV4dGVuc2lvbklkIiwibm90SW5zdGFsbGVkQ2FsbGJhY2siLCJpbnN0YWxsZWRDYWxsYmFjayIsImltZyIsIkltYWdlIiwib25lcnJvciIsIm9ubG9hZCIsInNyYyIsInJlcyIsImJvZHkiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwiZXJyIiwicmVwbGFjZSIsIm9yaWdpbiIsImFwaSIsInBhcmFtcyIsIkVycm9yIiwiaW5kZXhPZiIsImNoZWNrVHJhbnNhY3Rpb24iLCJ3YXJuIiwiYSIsImIiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsIm9iamVjdCIsIkhlZGVyYW9iamVjdCIsIm5vZGUiLCJ1cmwiLCJzdHJ1Y3R1cmUiLCJiYXNldXJsIiwibWVtb19pZCIsInJlY2VpdmVyX2lkIiwieGh0dHAiLCJYTUxIdHRwUmVxdWVzdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJvcGVuIiwic2VuZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUFBO0FBQUE7QUFJQSxJQUFNQSxZQUFZLEdBQUcsQ0FBQyxNQUFELEVBQVMsTUFBVCxFQUFpQixvQkFBakIsRUFBdUMsa0JBQXZDLENBQXJCLEMsQ0FBaUY7O0FBQ2pGOzs7O0FBR0EsSUFBTUMsVUFBVSxHQUFHLEtBQW5COztBQUVBLFNBQVNDLEdBQVQsQ0FBYUMsTUFBYixFQUFxQjtBQUNqQkMsU0FBTyxDQUFDQyxHQUFSLENBQVlDLHVEQUFaO0FBQ0FGLFNBQU8sQ0FBQ0MsR0FBUixDQUFZLGlCQUFaO0FBQ0EsTUFBSUUsY0FBYyxHQUFHO0FBQ2pCQyxpQkFBYSxFQUFFUCxVQUFVLEdBQUcsZ0NBQUgsR0FBc0MsdUJBRDlDO0FBRWpCUSxlQUFXLEVBQUUsa0NBRkk7QUFHakJDLFNBQUssRUFBRSxlQUhVO0FBSWpCQyxRQUFJLEVBQUUsU0FKVztBQUtqQkMsUUFBSSxFQUFFQyxJQUFJLENBQUNDLEdBQUwsRUFMVztBQU1qQkMsWUFBUSxFQUFFLHNHQU5PO0FBT2pCO0FBQ0FDLE1BQUUsRUFBRWIsTUFBTSxDQUFDYyxRQUFQ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QUFTUCxnQkFBVCxDQUEwQkgsTUFBMUIsRUFBa0M7QUFDL0IsTUFBSVksR0FBRyxHQUFHbEUsVUFBVSxHQUFHLGdDQUFILEdBQXNDLHVCQUExRDtBQUNBLE1BQUltRSxTQUFTLEdBQUc7QUFBQ0MsV0FBTyxFQUFDRixHQUFUO0FBQWFHLFdBQU8sRUFBQyxFQUFyQjtBQUF3QkMsZUFBVyxFQUFDO0FBQXBDLEdBQWhCOztBQUNBLE9BQUssSUFBSVQsR0FBVCxJQUFnQlAsTUFBaEI7QUFDSSxRQUFJQSxNQUFNLENBQUNRLGNBQVAsQ0FBc0JELEdBQXRCLENBQUosRUFBZ0NNLFNBQVMsQ0FBQ04sR0FBRCxDQUFULEdBQWlCUCxNQUFNLENBQUNPLEdBQUQsQ0FBdkI7QUFEcEM7O0FBR0EsTUFBSVUsS0FBSyxHQUFHLElBQUlDLGNBQUosRUFBWjs7QUFDQUQsT0FBSyxDQUFDRSxrQkFBTixHQUEyQixZQUFXO0FBQ2xDLFFBQUksS0FBS0MsVUFBTCxJQUFtQixDQUFuQixJQUF3QixLQUFLQyxNQUFMLElBQWUsR0FBM0MsRUFBZ0Q7QUFDNUN4RSxhQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLK0IsUUFBakI7QUFDSDtBQUNKLEdBSkQ7O0FBS0FvQyxPQUFLLENBQUNLLElBQU4sQ0FBVyxLQUFYLEVBQWtCVixHQUFHLEdBQUMsU0FBSixHQUFjQyxTQUFTLENBQUNHLFdBQXhCLEdBQW9DLEdBQXBDLEdBQXdDSCxTQUFTLENBQUNFLE9BQXBFLEVBQTZFLElBQTdFO0FBQ0FFLE9BQUssQ0FBQ00sSUFBTjtBQUNIOztBQUdENUUsR0FBRyxDQUFDQyxNQUFELENBQUgsQzs7Ozs7OztBQ2pMQTtBQUFPLFNBQVNHLElBQVQsR0FBZ0I7QUFDbkIsU0FBTyxNQUFQO0FBQ0gsQyIsImZpbGUiOiJ3aWRnZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA4MDdmZTA3ZjEwNGZkZTk2MDM3NiIsImltcG9ydCB7XG4gICAgcGluZ1xufSBmcm9tICcuL3NlcnZpY2VzJ1xuXG5jb25zdCBzdXBwb3J0ZWRBUEkgPSBbJ2luaXQnLCAndGVzdCcsICdjcmVhdGVoZWRlcmFvYmplY3QnLCAnY2hlY2t0cmFuc2FjdGlvbiddOyAvLyBlbmxpc3QgYWxsIG1ldGhvZHMgc3VwcG9ydGVkIGJ5IEFQSSAoZS5nLiBgbXcoJ2V2ZW50JywgJ3VzZXItbG9naW4nKTtgKVxuLyoqXG4gVGhlIG1haW4gZW50cnkgb2YgdGhlIGFwcGxpY2F0aW9uXG4gKi9cbmNvbnN0IHByb2R1Y3Rpb24gPSBmYWxzZTtcblxuZnVuY3Rpb24gYXBwKHdpbmRvdykge1xuICAgIGNvbnNvbGUubG9nKHBpbmcpO1xuICAgIGNvbnNvbGUubG9nKCdNUFMtSlMgc3RhcnRpbmcnKTtcbiAgICBsZXQgY29uZmlndXJhdGlvbnMgPSB7XG4gICAgICAgIHBheW1lbnRzZXJ2ZXI6IHByb2R1Y3Rpb24gPyBcImh0dHBzOi8vbXBzLmhhc2hpbmdzeXN0ZW1zLmNvbVwiIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6OTk5OScsXG4gICAgICAgIGV4dGVuc2lvbmlkOiBcImxpZ3Bhb25kYWFiY2xmaWdhZ2NpZm9iYWVsZW1pZW5hXCIsXG4gICAgICAgIGVycm9yOiBcIi9uby1leHRlbnNpb25cIixcbiAgICAgICAgdHlwZTogXCJhcnRpY2xlXCIsXG4gICAgICAgIHRpbWU6IERhdGUubm93KCksXG4gICAgICAgIHJlZGlyZWN0OiAneyBcIm5vblBheWluZ0FjY291bnRcIjogXCIvaW5zdWZmaWNpZW50LWFtb3VudC9cIiwgXCJub0FjY291bnRcIjogXCIvYWNjb3VudC1ub3QtcGFpcmVkL1wiLCBcImhvbWVQYWdlXCI6IFwiL1wifScsXG4gICAgICAgIC8vIHRoaXMgbWlnaHQgbWFrZSBhIGdvb2QgZGVmYXVsdCBpZCBmb3IgdGhlIGNvbnRlbnRcbiAgICAgICAgaWQ6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgICAgc3VibWlzc2lvbm5vZGU6IFwiMC4wLjExXCIsXG4gICAgICAgIC8vcmVkaXJlY3Q6J3sgXCJub25QYXlpbmdBY2NvdW50XCI6IFwiL2luc3VmZmljaWVudC1hbW91bnQvXCIsIFwibm9BY2NvdW50XCI6IFwiL2FjY291bnQtbm90LXBhaXJlZC9cIiwgXCJob21lUGFnZVwiOiBcIi9cIiB9JyxcbiAgICB9O1xuICAgIC8vIGFsbCBtZXRob2RzIHRoYXQgd2VyZSBjYWxsZWQgdGlsbCBub3cgYW5kIHN0b3JlZCBpbiBxdWV1ZVxuICAgIC8vIG5lZWRzIHRvIGJlIGNhbGxlZCBub3dcbiAgICBsZXQgZ2xvYmFsT2JqZWN0ID0gd2luZG93W3dpbmRvd1snTVBTLUpTJ11dO1xuICAgIGxldCBxdWV1ZSA9IGdsb2JhbE9iamVjdC5xO1xuICAgIGlmIChxdWV1ZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncXVldWU6Jyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhxdWV1ZVtpXSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHF1ZXVlW2ldWzBdICE9PSAndW5kZWZpbmVkJyAmJiBxdWV1ZVtpXVswXS50b0xvd2VyQ2FzZSgpID09ICdpbml0Jykge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25zID0gZXh0ZW5kT2JqZWN0KGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgICAgICAgICAgY3JlYXRlSGVkZXJhT2JqZWN0KGNvbmZpZ3VyYXRpb25zKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTVBTLUpTIHN0YXJ0ZWQnLCBjb25maWd1cmF0aW9ucyk7XG4gICAgICAgICAgICAgICAgY2hlY2tGb3JFeHRlbnNpb24oY29uZmlndXJhdGlvbnMpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHF1ZXVlW2ldKVxuICAgICAgICAgICAgICAgIHJldHVybiBhcGlIYW5kbGVyKHF1ZXVlW2ldWzBdLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gb3ZlcnJpZGUgdGVtcG9yYXJ5ICh1bnRpbCB0aGUgYXBwIGxvYWRlZCkgaGFuZGxlclxuICAgIC8vIGZvciB3aWRnZXQncyBBUEkgY2FsbHNcbiAgICBnbG9iYWxPYmplY3QgPSBhcGlIYW5kbGVyO1xuICAgIGdsb2JhbE9iamVjdC5jb25maWd1cmF0aW9ucyA9IGNvbmZpZ3VyYXRpb25zO1xufVxuXG4vLyBjaGVja0ZvckV4dGVuc2lvbiBoYW5kbGVzIDMgc2NlbmFyaW9zXG4vLyByZXR1cm5zIHRydWUgKGhlZGVyYS1taWNyb3BheW1lbnQgdGFnIGlzIHByZXNlbnQgYW5kIGV4dGVuc2lvbiBpcyBpbnN0YWxsZWQpXG4vLyByZXR1cm5zIGZhbHNlIChoZWRlcmEtbWljcm9wYXltZW50IHRhZyBpcyBwcmVzZW50IGJ1dCBleHRlbnNpb24gaXMgTk9UIGluc3RhbGxlZClcbi8vIHJldHVybiBudWxsIChoZWRlcmEtbWljcm9wYXltZW50IGlzIG5vdCBwcmVzZW50IGJlY2F1c2UgdGhpcyB3ZWJzaXRlIGRvZXMgbm90IGltcGxlbWVudCBoZWRlcmEtbWljcm9wYXltZW50KVxuZnVuY3Rpb24gY2hlY2tGb3JFeHRlbnNpb24oY29uZmlndXJhdGlvbnMpIHtcbiAgICBpZiAoIWlzQ2hyb21lKCkpIHtcbiAgICAgICAgcmVkaXJlY3RUb0Vycm9yKCdpc25vdENocm9tZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB0YWdzID0gY29uZmlndXJhdGlvbnM7XG4gICAgICAgIC8vIGlmIHRhZ3MuYW1vdW50IGlzIG51bGwgb3IgdW5kZWZpbmVkLCB3ZSBzaG91bGQgYXNzdW1lIHRoYXQgdGhpcyBpcyBhIGZyZWUgcGFnZSBhbmQgZG8gbm90aGluZyBtb3JlXG4gICAgICAgIGlmICh0YWdzLmFtb3VudCA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IEVYVEVOU0lPTl9JRCA9IHRhZ3MuZXh0ZW5zaW9uaWQ7XG5cbiAgICAgICAgZGV0ZWN0KEVYVEVOU0lPTl9JRCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmVkaXJlY3RUb0Vycm9yKHRhZ3MuZXJyb3IpO1xuICAgICAgICB9LCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkZXRlY3Q6IHVzZXIgaGFzIGV4dGVuc2lvbiBpbnN0YWxsZWQnKTtcbiAgICAgICAgICAgIHJlY29yZFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhjaHJvbWUucnVudGltZS5jb25uZWN0KEVYVEVOU0lPTl9JRCwndmVyc2lvbicpKTtcbiAgICAgICAgLypjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShFWFRFTlNJT05fSUQsICd2ZXJzaW9uJywgcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmVkaXJlY3RUb0Vycm9yKHRhZ3MuZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWNvcmRSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKi9cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRldGVjdChleHRlbnNpb25JZCwgbm90SW5zdGFsbGVkQ2FsbGJhY2ssIGluc3RhbGxlZENhbGxiYWNrKSB7XG4gICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGltZy5vbmVycm9yID0gbm90SW5zdGFsbGVkQ2FsbGJhY2s7XG4gICAgaW1nLm9ubG9hZCA9IGluc3RhbGxlZENhbGxiYWNrKCdpbnN0YWxsZWQnKTtcbiAgICBpbWcuc3JjID0gJ2Nocm9tZS1leHRlbnNpb246Ly8nICsgZXh0ZW5zaW9uSWQgKyAnL2ljb25zL2ljb24xNi5wbmcnO1xufVxuXG5mdW5jdGlvbiByZWNvcmRSZXNwb25zZShyZXMpIHtcbiAgICBpZiAodHlwZW9mIHJlcyAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXNzYWdlZGl2Jyk7XG4gICAgICAgIGJvZHkuaW5uZXJIVE1MICs9ICc8ZGl2IHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6NSU7b3BhY2l0eTowLjM7ei1pbmRleDoxMDA7YmFja2dyb3VuZDp5ZWxsb3c7XCI+JyArIHJlcyArICc8L2Rpdj4nO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiByZWRpcmVjdFRvRXJyb3IoZXJyKSB7XG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSAhPSBlcnIpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2Uod2luZG93Lm9yaWdpbiArIGVycik7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0Nocm9tZSgpIHtcbiAgICByZXR1cm4gJ2Nocm9tZScgaW4gd2luZG93XG59XG5cbi8qKlxuIE1ldGhvZCB0aGF0IGhhbmRsZXMgYWxsIEFQSSBjYWxsc1xuICovXG5mdW5jdGlvbiBhcGlIYW5kbGVyKGFwaSwgcGFyYW1zKSB7XG4gICAgaWYgKCFhcGkpIHRocm93IEVycm9yKCdBUEkgbWV0aG9kIHJlcXVpcmVkJyk7XG4gICAgYXBpID0gYXBpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHN1cHBvcnRlZEFQSS5pbmRleE9mKGFwaSkgPT09IC0xKSB0aHJvdyBFcnJvcihgTWV0aG9kICR7YXBpfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgY29uc29sZS5sb2coYEhhbmRsaW5nIEFQSSBjYWxsICR7YXBpfWAsIHBhcmFtcyk7XG4gICAgc3dpdGNoIChhcGkpIHtcbiAgICAgICAgLy8gVE9ETzogYWRkIEFQSSBpbXBsZW1lbnRhdGlvblxuXG4gICAgICAgIGNhc2UgJ2NyZWF0ZWhlZGVyYW9iamVjdCc6XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlSGVkZXJhT2JqZWN0KHBhcmFtcyk7XG5cbiAgICAgICAgY2FzZSAnY2hlY2t0cmFuc2FjdGlvbic6XG4gICAgICAgICAgICByZXR1cm4gY2hlY2tUcmFuc2FjdGlvbihwYXJhbXMpO1xuXG4gICAgICAgIGNhc2UgJ3Rlc3QnOlxuICAgICAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgTm8gaGFuZGxlciBkZWZpbmVkIGZvciAke2FwaX1gKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGV4dGVuZE9iamVjdChhLCBiKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGIpXG4gICAgICAgIGlmIChiLmhhc093blByb3BlcnR5KGtleSkpIGFba2V5XSA9IGJba2V5XTtcbiAgICByZXR1cm4gYTtcbn1cblxuXG5mdW5jdGlvbiBjcmVhdGVIZWRlcmFPYmplY3QocGFyYW1zKSB7XG4gICAgbGV0IG9iamVjdCA9IFsnc3VibWlzc2lvbm5vZGUnLCAncGF5bWVudHNlcnZlcicsICdyZWNpcGllbnRsaXN0JywgJ2NvbnRlbnRpZCcsICd0eXBlJywgJ21lbW8nLCAnZXh0ZW5zaW9uaWQnLCAncmVkaXJlY3QnLCAndGltZSddO1xuICAgIGNvbnNvbGUubG9nKG9iamVjdClcbiAgICBsZXQgSGVkZXJhb2JqZWN0ID0gJzxoZWRlcmEtbWljcm9wYXltZW50ICdcbiAgICBmb3IgKHZhciBpIGluIG9iamVjdCkge1xuICAgICAgICBsZXQgbm9kZSA9IG9iamVjdFtpXTtcbiAgICAgICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShub2RlKSkge1xuICAgICAgICAgICAgSGVkZXJhb2JqZWN0ICs9IFwiZGF0YS1cIiArIG5vZGUgKyBcIj0gJ1wiICsgcGFyYW1zW25vZGVdICsgXCInICwgXCIgKyBcIlxcblwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgSGVkZXJhb2JqZWN0ICs9ICc+PC9oZWRlcmEtbWljcm9wYXltZW50Pic7XG4gICAgY29uc29sZS5sb2coSGVkZXJhb2JqZWN0KTtcblxuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyYW1zWydhdHRySUQnXSk7XG4gICAgYm9keS5pbm5lckhUTUwgKz0gSGVkZXJhb2JqZWN0O1xuICAgIC8vY29uc29sZS5sb2coKEhlZGVyYW9iamVjdCkpXG4gICAgcmV0dXJuIEhlZGVyYW9iamVjdDtcbiAgICAvL2NhbGxiYWNrKEhlZGVyYW9iamVjdCk7XG59XG5cbiBmdW5jdGlvbiBjaGVja1RyYW5zYWN0aW9uKHBhcmFtcykge1xuICAgIGxldCB1cmwgPSBwcm9kdWN0aW9uID8gXCJodHRwczovL21wcy5oYXNoaW5nc3lzdGVtcy5jb21cIiA6ICdodHRwOi8vbG9jYWxob3N0Ojk5OTknO1xuICAgIGxldCBzdHJ1Y3R1cmUgPSB7YmFzZXVybDp1cmwsbWVtb19pZDonJyxyZWNlaXZlcl9pZDonJ307XG4gICAgZm9yICh2YXIga2V5IGluIHBhcmFtcylcbiAgICAgICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSBzdHJ1Y3R1cmVba2V5XSA9IHBhcmFtc1trZXldO1xuXG4gICAgdmFyIHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gNCAmJiB0aGlzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB4aHR0cC5vcGVuKFwiR0VUXCIsIHVybCtcIi9jaGVjay9cIitzdHJ1Y3R1cmUucmVjZWl2ZXJfaWQrXCIvXCIrc3RydWN0dXJlLm1lbW9faWQsIHRydWUpO1xuICAgIHhodHRwLnNlbmQoKTtcbn1cblxuXG5hcHAod2luZG93KTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21haW4uanMiLCJcbmV4cG9ydCBmdW5jdGlvbiBwaW5nKCkge1xuICAgIHJldHVybiAncG9uZyc7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2VzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==