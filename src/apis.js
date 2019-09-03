import * as general from './general';
import {Modal} from './modal';
import * as libraries from './libraries';
import * as Config from './config';
import * as services from './services';
export function test(){
    return 'ting';
}

export function createHederaObject(params, callback) {
    let object = ['submissionnode', 'paymentserver', 'recipientlist', 'contentid', 'type', 'memo', 'extensionid', 'redirect', 'time'];
    let Hederaobject = '<hedera-micropayment ';
    for (var i in object) {
        let node = object[i];
        if (params.hasOwnProperty(node)) {
            Hederaobject += "data-" + node + "= '" + params[node] + "' , " + "\n";
        }
    }
    Hederaobject += '></hedera-micropayment>';
    var body = document.getElementById(params['attrID']);
    body.innerHTML += Hederaobject;
    callback(null,Hederaobject);
}

export function createContractObject(params, callback) {
    let __construct = ['contractid', 'maximum', 'paymentserver', 'params', 'memo', 'abi', 'redirect', 'extensionid'];
    let object = {
        contractid: '0.0.1111',
        maximum: '422342343',
        paymentserver: params.paymentserver,
        params: ["869", "100000000", "216", "253", "27", "0x226b08976ad0dd982aeb6b21a44f3eacae579569c34e71725aff801a2fe68739", "0x333f991fa3a870575f819569e9f72a771ea790078d448cc8789120ee14abf3c5"],
        memo: 'a4a7c4329aab4b1fac474ff6f93d858c',
        abi: JSON.stringify({
            "constant": false,
            "inputs": [{"name": "propertyID", "type": "uint24"}, {"name": "amount", "type": "uint256"}, {
                "name": "x",
                "type": "uint16"
            }, {"name": "y", "type": "uint16"}, {"name": "v", "type": "uint8"}, {
                "name": "r",
                "type": "bytes32"
            }, {"name": "s", "type": "bytes32"}],
            "name": "buyProperty",
            "outputs": [{"name": "", "type": "string"}],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        }),
        redirect: '{"nonPayingAccount": "/insufficient-amount/","noAccount": "/account-not-paired","homePage": "/"}',
        extensionid: 'pdjjpcolgmmcifijpejkenpbbimedpic',
    };

    console.log(JSON.parse(object.abi));
    let extended = libraries.extendObject(object, params);
    console.log(extended);
    let Contractobject = '<hedera-contract ';
    for (var i in __construct) {
        let node = __construct[i];
        if (extended.hasOwnProperty(node)) {
            Contractobject += "data-" + node + "= '" + extended[node] + "' ";
        }
    }
    Contractobject += '></hedera-contract>';
    console.log(Contractobject);

    var body = document.getElementById(extended['attrID']);
    body.innerHTML += Contractobject;
    callback(null,Contractobject);
}

export function checkTransaction(params, callback) {
    let memo_id = params.configuration.memo;
    let url = Config.default.production ? Config.default.productionServer : 'http://localhost:8099';
    let structure = {
        baseurl: url,
        memo_id: memo_id,
        receiver_id: '',
        success: '/success',
        failure: '/payment-failed',
        timeout: 3000,
        limit: 1
    };

    for (var key in params.params) {
        if (params.params.hasOwnProperty(key) && params.params[key]) {
            structure[key] = params.params[key];
        }
    }

    if (structure.receiver_id && structure.memo_id) {
        URL = structure.baseurl + "/check/" + structure.receiver_id + "/" + structure.memo_id
    } else {
        if (structure.timestamp)
            URL = structure.baseurl + "/memo/" + structure.memo_id + '?limit=' + structure.limit + '&timestamp=' + structure.timestamp;
        else
            URL = structure.baseurl + "/memo/" + structure.memo_id + '?limit=' + structure.limit;
    }

    console.log(structure.timeout);
    //setTimeout(performRequest(structure), structure.timeout)
    setTimeout(function () {
        performRequest(structure);
    }, structure.timeout);
}

export function init(params, callback) {
    let response = {
        accountPaired: false,
        ismobile: null,
        validBrowser: null,
        extensionInstalled: null,
        accessToAccounts: null,
        accountId: null,
        submissionNode: params.submissionnode,
        error: null,
        txn_success: false,
        time: params.time,
        message: null
    };
    response.validBrowser = libraries.isChrome();
    if(response.validBrowser===false)
        response.message = "The browser is not chrome";
    response.ismobile = libraries.detectmob();
    libraries.detect(params.extensionid, function () {
        response.extensionInstalled = false;
        response.message = "Extension Not Installed";
        callback(null, response);
    }, function () {
        response.extensionInstalled = true;
        createHederaObject(params, function(err, hobject){
            if(hobject){
                let url = Config.default.production ? Config.default.productionServer : 'http://localhost:8099';
                URL = url + "/memo/" + params.memo;
                setTimeout(function () {
                    let xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            if (this.status === 200) {
                                let ajaxresp = JSON.parse(this.response);
                                console.log(ajaxresp);
                                if (ajaxresp.response.length > 0) {
                                    console.log(services.prechecker(ajaxresp.response[0].nodeprecheck));
                                    response.accountId = ajaxresp.response[0].sender;
                                    response.accountPaired = true;
                                    response.accessToAccounts = true;
                                    if (parseInt(ajaxresp.response[0].nodeprecheck) === 0) {
                                        response.txn_success = true;
                                    }else{
                                        response.error = services.prechecker(ajaxresp.response[0].nodeprecheck);
                                    }
                                    response.message = services.prechecker(ajaxresp.response[0].nodeprecheck);
                                    callback(null, response);
                                } else {
                                    console.log(response);
                                    response.message = 'Transaction failed, this is mostly due to extension not being able to detect hedera object, please refresh the page.';
                                    callback(null, response);
                                }
                            } else {
                                response.accountPaired = false;
                                response.accessToAccounts = false;
                                callback(null, response);
                            }
                        }
                    };
                    xhttp.open("GET", URL, true);
                    xhttp.send();
                }, 5000);
            }else{
                response.message = "Hedera object could not be detected, please try again refreshing the page.";
                callback(false, response);
            }
        });
        //callback(null,response);
    });

}

export function getmodal(callback) {
    var myContent = general.getmodalContent();
    var myModal = new Modal({
        content: myContent
    });
    if(callback && typeof callback==='function'){
        callback(myContent);
    }
    myModal.open();
}

export function makeTransaction(configuration, callback) {
    let params = {
        transaction_procesing: true,
        transaction_failed: false,
        transaction_success: false
    };
    init(configuration, function(err, res){
        if(err){
            console.log(err);
        }else{
            console.log(res);
            if(res){
                callback(res);
            }
        }
    });

}

export function assist_transaction(configuration, callback) {
    let params = configuration;
    let response = {
        accountPaired: false,
        ismobile: null,
        validBrowser: null,
        extensionInstalled: null,
        accessToAccounts: null,
        accountId: null,
        submissionNode: params.submissionnode,
        error: null,
        txn_success: false,
        time: configuration.time
    };
    createHederaObject(params, function(err, hobject){
        if(hobject){
            let url = Config.default.production ? Config.default.productionServer : 'http://localhost:8099';
            URL = url + "/memo/" + params.memo;
            setTimeout(function () {
                let xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                            let ajaxresp = JSON.parse(this.response);
                            console.log(ajaxresp);
                            if (ajaxresp.response.length > 0) {
                                console.log(services.prechecker(ajaxresp.response[0].nodeprecheck));
                                response.accountId = ajaxresp.response[0].sender;
                                response.accountPaired = true;
                                response.accessToAccounts = true;
                                if (parseInt(ajaxresp.response[0].nodeprecheck) === 0) {
                                    response.txn_success = true;
                                }
                                response.error = services.prechecker(ajaxresp.response[0].nodeprecheck);
                                callback(null, response);
                            } else {
                                console.log(response);
                                callback(null, response);
                            }
                        } else {
                            response.accountPaired = false;
                            response.accessToAccounts = false;
                            callback(null, response);
                        }
                    }
                };
                xhttp.open("GET", URL, true);
                xhttp.send();
            }, 5000);
        }else{
            callback({'success':false,'message':'Could not create hedera object'}, false);
        }
    });
}
