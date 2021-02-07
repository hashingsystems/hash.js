//Via window event
// window.hash.onCryptoTransferError = (res) => {
//     console.log('Main :: onCryptoTransferError:::',res);
// }

// window.hash.onCryptoTransferSuccess = (res) => {
//     console.log('Main :: onCryptoTransferSuccess:::',res);
// }

// window.hash.onSmartContractError = (res) => {
//     console.log('Main :: onSmartContractError:::',res);
// }

// window.hash.onSmartContractSuccess = (res) => {
//     console.log('Main :: onSmartContractSuccess:::',res);
// }

document.addEventListener('DOMContentLoaded', () => {
    
    document.getElementById('popup-button').addEventListener('click',(e) => {
        
        e.preventDefault();
        let data = {
            time:"1",
            memo:"My First Hedera Transaction",
            contentid:'test1',
            redirect:'{"nonPayingAccount": "/nomicropaymentreceived.html"}',
            recipientlist:'[{"tinybars": "444", "to":"0.0.1107"}]',
            type:'article'
        }

        window.hash.triggerCryptoTransfer(data, (err, res) => {
            console.log("Callback::Error:", err)
            console.log("Callback::Response:", res)
        });  

    });

    document.getElementById('transfer-token-button').addEventListener('click',(e) => {
        let extensionid = "hdjnnemgikeoehneddegfcmkljenlean";

        e.preventDefault();
        let data = {
            memo:"My First Hedera Transaction",
            contentid:'test1',
            recipientlist:'[{"tokenId": "0.0.1234", "token": "444", "to":"0.0.1107"}]'
        }

        let transferToken = (cb) => {
            let contractDiv = document.getElementsByTagName('body')[0];
            let hederaTag = document.createElement("hedera-micropayment");
                hederaTag.setAttribute("data-time", data.contractid || '');
                hederaTag.setAttribute("data-memo", data.memo || ' ');
                hederaTag.setAttribute("data-contentid", data.contentid || '');
                hederaTag.setAttribute("data-type", data.type || '');
                hederaTag.setAttribute("data-redirect", data.redirect || '');
                hederaTag.setAttribute("data-extensionid", extensionid);
                hederaTag.setAttribute("data-recipientlist", data.recipientlist || '');
            contractDiv.appendChild(hederaTag);
            if (cb) {
                _callback = cb;
            } else {
                return new Promise((resolve, reject) => {
                    _resolve = resolve;
                    _reject = reject;
                })
            }
        }

        transferToken()
            .then(res => console.log('Promise:::Resolve::', res))
            .catch(err => console.log("Promise::Error::", err))
    });

    document.getElementById('contract-button').addEventListener('click',(e) => {
        e.preventDefault();
        
        let data = {
            contractid:"0.0.15372",
            memo:"My First Hedera Transaction",
            params:'[7]',
            amount:0,
            abi:`[{"constant":false,"inputs":[{"name":"_status","type":"uint256"}],"name":"setNewStatus","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]`
        }

        window.hash.triggerSmartContract(data)
        .then(res => console.log('Promise:::Resolve::', res))
        .catch(err => console.log("Promise::Error::", err))

    })

    document.getElementById('account-button').addEventListener('click',(e) => {
        e.preventDefault();

        window.hash.triggerCheckBalance()
        .then(res => console.log('Promise:::Resolve::', res))
        .catch(err => console.log("Promise::Error::", err))
    })

    document.getElementById('token-button').addEventListener('click',(e) => {
        e.preventDefault();
        let extensionid = "hdjnnemgikeoehneddegfcmkljenlean";
        let connectToken = (cb) => {
            let contractDiv = document.getElementsByTagName('body')[0];
            let hederaTag = document.createElement("hedera-token-connect");
            hederaTag.setAttribute("data-tokenid", '0.0.145669');
            hederaTag.setAttribute("data-host", window.location.host || '');
            hederaTag.setAttribute("data-extensionid", extensionid);
            contractDiv.appendChild(hederaTag);
                if (cb) {
                    _callback = cb;
                } else {
                    return new Promise((resolve, reject) => {
                        _resolve = resolve;
                        _reject = reject;
                    })
                }
            }

        connectToken()
        .then(res => console.log('Promise:::Resolve::', res))
        .catch(err => console.log("Promise::Error::", err))

        })
});