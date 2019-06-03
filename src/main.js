import {
    ping
} from './services'

const supportedAPI = ['init','test','createhederaobject']; // enlist all methods supported by API (e.g. `mw('event', 'user-login');`)
/**
 The main entry of the application
 */
function app(window) {
    console.log(ping);
    console.log('MPS-JS starting');
    let configurations = {
        paymentserver: "http://localhost:9090",
        extensionid: "ligpaondaabclfigagcifobaelemiena",
        error: "/no-extension",
        type: "article",
        // this might make a good default id for the content
        id: window.location.pathname,
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
            if (typeof queue[i][0] !=='undefined' && queue[i][0].toLowerCase() == 'init') {
                configurations = extendObject(configurations, queue[i][1]);
                console.log('MPS-JS started', configurations);
                checkForExtension(configurations)
            } else{ return apiHandler(queue[i][0], queue[i][1]);}
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

        detect(EXTENSION_ID, function(){
            redirectToError(tags.error);
        }, function(response){
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


function createHederaObject(params){
    let Hederaobject =  document.createElement('hedera-micropayment');
    for(var i in params){
        if(params.hasOwnProperty(i) && i!=='attrID'){
            Hederaobject.setAttribute('data-'+i,params[i]);
        }
    }
    document.getElementById(params['attrID']).before(Hederaobject);
    //console.log((Hederaobject))
    return Hederaobject;
    //callback(Hederaobject);
}



app(window);