let hash = {};
hash.onSmartContractSuccess = null;
hash.onSmartContractError = null;
hash.onCryptoTransferSuccess = null;
hash.onCryptoTransferError = null;

let _callback = null;

let _resolve = null;
let _reject = null;

let paymentserver = 'https://mps.hashingsystems.com';
let extensionid = 'ppcphoibgicedepnccfgakecfelmdngk';

hash.init = (data, cb) => {
    /*
    Coming Soon
    We perform a series of checks on the user:
        They are using a compatible browser
        They have Composer wallet installed
        Their wallet is paired to the extension
        The wallet contains at least "minBalance" ins tinybar
    */
    let response = {
        compatibleBrowser: false,
        composerInstalled: false,
        walletPaired: false,
        minBalance: false
    }
}

hash.onboard = (data, cb) => {
    /*
    Coming Soon
    We trigger a modal tutorial. 
    A step-by-step guide to making sure the users got a clue. 
        They have Composer wallet installed
        Their wallet is paired to the extension
        The wallet contains at least "minBalance" ins tinybar
    */
    
}

hash.triggerCryptoTransfer = (data, cb) => {
    //validation
    let contractDiv = document.getElementsByTagName('body')[0];
    let hederaTag = document.createElement("hedera-micropayment");
    hederaTag.setAttribute("data-time",data.contractid || '');
    hederaTag.setAttribute("data-memo",data.memo || '');
    hederaTag.setAttribute("data-paymentserver",data.paymentserver || paymentserver);
    hederaTag.setAttribute("data-contentid",data.contentid || '');
    hederaTag.setAttribute("data-type", data.type || '');
    hederaTag.setAttribute("data-redirect", data.redirect || '');
    hederaTag.setAttribute("data-extensionid",data.extensionid || extensionid);
    hederaTag.setAttribute("data-recipientlist",data.recipientlist || '');
    contractDiv.appendChild(hederaTag);   
    if (cb) {
        _callback = cb;
    } else {
        return new Promise((resolve, reject)=>{
            _resolve = resolve;
            _reject = reject;
        })
    }
}

hash.triggerSmartContract = (data, cb) => {
    //validation
    let contractDiv = document.getElementsByTagName('body')[0];
    let hederaTag = document.createElement("hedera-contract");
    hederaTag.setAttribute("data-contractid",data.contractid || '');
    hederaTag.setAttribute("data-memo",data.memo || '');
    hederaTag.setAttribute("data-paymentserver",data.paymentserver || paymentserver);
    hederaTag.setAttribute("data-params",data.params || '');
    hederaTag.setAttribute("data-abi", data.abi || '');
    hederaTag.setAttribute("data-extensionid",data.extensionid) || extensionid;
    hederaTag.setAttribute("data-amount",data.amount || '');
    contractDiv.appendChild(hederaTag); 
    if (cb) {
        _callback = cb;
    } else {
        return new Promise((resolve, reject)=>{
            _resolve = resolve;
            _reject = reject;
        })
    }  
}

window.hash = hash;

document.addEventListener('DOMNodeInserted', () => {
    
    let banner = document.getElementById("hedera-banner-wrapper")
    console.log("Banner:", banner);
    
    if(banner) {
        let chromeExtensionId = banner.getAttribute('data-id')
        let smartContractTrigger = banner.getAttribute('data-smart-contract-trigger')
        console.log(smartContractTrigger)
        if(smartContractTrigger === 'true') {
            banner.style.display = 'none';
            console.log (`chrome-extension://${chromeExtensionId}/html/smart-contract-details.html?sender_url=${window.location.origin}`)
            let popupWindow = window.open(`chrome-extension://${chromeExtensionId}/html/smart-contract-details.html?sender_url=${window.location.origin}`, "extension_popup", "height=520,width=350,status=1,scrollbars=1,resizable=no");
            console.log('open popup window')
            popupWindow.onbeforeunload = function() {
                console.log('popupWindow closed..');
            }
            return;
        }

        let microPaymentTrigger = banner.getAttribute('data-crypto-transfer-trigger')
        if(microPaymentTrigger === 'true') {
            banner.style.display = 'none';
            window.open(`chrome-extension://${chromeExtensionId}/html/crypto-transfer-details.html?sender_url=${window.location.origin}`, "extension_popup", "height=520,width=350,status=1,scrollbars=1,resizable=no");
            return;
        }
    }
});

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
    if(event.data.type && event.origin === window.location.origin) {
        console.log("receiveMessage::")
        console.log(event.origin);
        console.log(event.data.type);
        console.log(event.data.res);
        switch(event.data.type) {
            case 'smart-contract-deny':
                    window.hash.onSmartContractError && window.hash.onSmartContractError(event.data.res)
                    _callback && _callback(event.data.res, null)
                    _reject && _reject(event.data.res)
            break;
            case 'smart-contract-success':
                    window.hash.onSmartContractSuccess && window.hash.onSmartContractSuccess(event.data.res)
                    _callback && _callback(null, event.data.res)
                    _resolve && _resolve(event.data.res)
            break;
            case 'micro-payment-deny':
                    window.hash.onCryptoTransferError && window.hash.onCryptoTransferError(event.data.res)
                    _callback && _callback(event.data.res, null)
                    _reject && _reject(event.data.res)
            break;
            case 'micro-payment-success':
                    window.hash.onCryptoTransferSuccess && window.hash.onCryptoTransferSuccess(event.data.res)
                    _callback && _callback(null, event.data.res)
                    _resolve && _resolve(event.data.res)
            break;
        }
    }
}
