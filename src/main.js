import { ping } from './services'

const supportedAPI = ['init']; // enlist all methods supported by API (e.g. `mw('event', 'user-login');`)

/**
    The main entry of the application
    */
function app(window) {
    console.log('MPS-JS starting');

    let configurations = {
        paymentserver: "https://mps.thetimesta.mp",
        extensionID: "ligpaondaabclfigagcifobaelemiena",
        error: "/no-extension",
        type: "article",
    // this might make a good default id for the content
        id: window.location.pathname
    };

    // all methods that were called till now and stored in queue
    // needs to be called now 
    let globalObject = window[window['MPS-JS']];
    let queue = globalObject.q;
    if (queue) {
        for (var i = 0; i < queue.length; i++) {
            if (queue[i][0].toLowerCase() == 'init') {
                configurations = extendObject(configurations, queue[i][1]);
                console.log('MPS-JS started', configurations);
                checkForExtension(configurations)
            }
            else
                apiHandler(queue[i][0], queue[i][1]);
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
        redirectToError()
    } else {
        let tags = configurations;
        // if tags.amount is null or undefined, we should assume that this is a free page and do nothing more
        if (tags.amount === null) return null
        const EXTENSION_ID = tags.extensionID;
        chrome.runtime.sendMessage(EXTENSION_ID, 'version', response => {
            console.log(response)
            if (!response) {
                redirectToError(tags.error);
            }
        })
    }
}

function redirectToError(err) {
    if (window.location.pathname != err) {
        window.location.replace(window.origin + err)
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
        default:
            console.warn(`No handler defined for ${api}`);
    }
}

function extendObject(a, b) {
    for (var key in b)
        if (b.hasOwnProperty(key))
            a[key] = b[key];
    return a;
}

app(window);