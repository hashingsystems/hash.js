import {
    ping
} from './services'

const supportedAPI = ['init', 'test', 'createhederaobject', 'checktransaction']; // enlist all methods supported by API (e.g. `mw('event', 'user-login');`)
/**
 The main entry of the application
 */
const production = false;

function app(window) {
    console.log(ping);
    console.log('MPS-JS starting');
    let configurations = {
        paymentserver: production ? "https://mps.hashingsystems.com" : 'http://localhost:9999',
        extensionid: "ligpaondaabclfigagcifobaelemiena",
        error: "/no-extension",
        type: "article",
        time: Date.now(),
        redirect: '{ "nonPayingAccount": "/insufficient-amount/", "noAccount": "/account-not-paired/", "homePage": "/"}',
        // this might make a good default id for the content
        id: window.location.pathname,
        submissionnode: "0.0.11",
        //redirect:'{ "nonPayingAccount": "/insufficient-amount/", "noAccount": "/account-not-paired/", "homePage": "/" }',
    };
    // all methods that were called till now and stored in queue
    // needs to be called now
    let globalObject = window[window['MPS-JS']];
    let queue = globalObject.q;
    if (queue) {
        for (var i = 0; i < queue.length; i++) {
            console.log('queue:');
            console.log(queue[i]);
            if (typeof queue[i][0] !== 'undefined' && queue[i][0].toLowerCase() == 'init') {
                configurations = extendObject(configurations, queue[i][1]);
                createHederaObject(configurations);
                console.log('MPS-JS started', configurations);
                checkForExtension(configurations)
            } else {
                console.log(queue[i])
                return apiHandler(queue[i][0], queue[i][1]);
            }
        }
    }
    // override temporary (until the app loaded) handler
    // for widget's API calls
    globalObject = apiHandler;
    globalObject.configurations = configurations;
}

// checkForExtension handles 3 scenarios
// returns true (hedera-micropayment tag is present and extension is installed)
// returns false (hedera-micropayment tag is present but extension is NOT installed)
// return null (hedera-micropayment is not present because this website does not implement hedera-micropayment)
function checkForExtension(configurations) {
    if (!isChrome()) {
        redirectToError('isnotChrome');
    } else {
        let tags = configurations;
        // if tags.amount is null or undefined, we should assume that this is a free page and do nothing more
        if (tags.amount === null) return null;
        const EXTENSION_ID = tags.extensionid;

        detect(EXTENSION_ID, function () {
            redirectToError(tags.error);
        }, function (response) {
            console.log('detect: user has extension installed');
            recordResponse(response);
        });

        //console.log(chrome.runtime.connect(EXTENSION_ID,'version'));
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
    return 'chrome' in window
}

/**
 Method that handles all API calls
 */
function apiHandler(api, params) {
    if (!api) throw Error('API method required');
    api = api.toLowerCase();
    if (supportedAPI.indexOf(api) === -1) throw Error(`Method ${api} is not supported`);
    console.log(`Handling API call ${api}`, params);
    switch (api) {
        // TODO: add API implementation

        case 'createhederaobject':
            return createHederaObject(params);

        case 'checktransaction':
            return checkTransaction(params);

        case 'test':
            return params;
        default:
            console.warn(`No handler defined for ${api}`);
    }
}

function extendObject(a, b) {
    for (var key in b)
        if (b.hasOwnProperty(key)) a[key] = b[key];
    return a;
}


function createHederaObject(params) {
    let object = ['submissionnode', 'paymentserver', 'recipientlist', 'contentid', 'type', 'memo', 'extensionid', 'redirect', 'time'];
    console.log(object)
    let Hederaobject = '<hedera-micropayment '
    for (var i in object) {
        let node = object[i];
        if (params.hasOwnProperty(node)) {
            Hederaobject += "data-" + node + "= '" + params[node] + "' , " + "\n";
        }
    }

    Hederaobject += '></hedera-micropayment>';
    console.log(Hederaobject);

    var body = document.getElementById(params['attrID']);
    body.innerHTML += Hederaobject;
    //console.log((Hederaobject))
    return Hederaobject;
    //callback(Hederaobject);
}

 function checkTransaction(params) {
    let structure = {url:'',memo_id:'',receiver_id:''};
    for (var key in params)
        if (params.hasOwnProperty(key)) structure[key] = params[key];

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);
        }
    };
    xhttp.open("GET", "http://localhost:9999/check/"+structure.receiver_id+"/"+structure.memo_id, true);
    xhttp.send();
}


app(window);

