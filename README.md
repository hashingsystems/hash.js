# MPS.js
MPS.js is a micropayment service javascript embeddable library. You can trigger micropayment transactions using the chrome extension through hosting the widget yourself by compiling it locally or use our cdn’ed widget. 
* [Upgrade Notes](#Important-Notes-for-Existing-Users)
* [Installation](#Installation)
* [API](#API)
* [Browser](#Browser)
* [Contributing](#Contributing)
* [License](#License)

MPS.js is an Open Source Project, see the Contributing section to find out what this means.


## Important Notes for Existing Users
Look here for any future upgrade notes (version changes, fixes, etc).


## Installation
### What do you need to get started?
Make sure you sign up on portal.hedera.com and download the Hedera Wallet Chrome Extension. Configure it with your own wallet and make sure it’s funded with HBAR.

In order to make payments from your domain you will also have to set up automatic payment values or you will get an “insufficient-amount” error.

### Web Testing:
Copy and paste the code below to your website.

```
<script> 
(function(_h, a, s, h, g, ra, ph) { 
    _h['MPS-JS'] = h;
    _h[h] = _h[h] || function() {
        (_h[h].q = _h[h].q || []).push(arguments) }; ra = a.createElement(s), 
            ph = a.getElementsByTagName(s)[0]; 
        ra.id = h; 
        ra.src = g; 
        ra.async = 1; 
        console.log(ra); 
        console.log(ph); 
        ph.parentNode.insertBefore(ra, ph); 
    }(window, document, 'script', 'mw', 'https://api.hashingsystems.com/js/widget.js')); 
</script>
```

First, the code above must be inserted into your html code. You can use our hosted widget.js file or compile it yourself.

### How To Compile It Yourself:

`npm install` (tested on 8.2.1 runtime) then run this script: 
`./node_modules/.bin/webpack --config webpack.config.js --env.prod`
This will create a distribution which will be usable through the /demo/index.html which has been only tested the demo/index through the python http server. 

Once the code above is implemented, you can go ahead and make transactions, given the user has all the necessary components to interact with our micropayment server. 

### Make a payment:
```
mw('init', { 
    submissionnode: "0.0.11", 
    recipientlist: '[{ "to": "0.0.99", "tinybars": "4666667" }]', 
    contentid: '79', 
    type: 'article', 
    memo: '1275,79', 
    attrID: 'feature-4', });
```

This initializes a payment through the Chrome extension. Currently there can only be one recipient in recipientlist. Take note of the memo used so you can verify the payment later.

### Check a Transaction:
```
mw(‘checkTransaction’, { memo_id: ‘1275,70’ }, function(err, data) {
	if (err) {
		console.log(err);
	} else {
		console.log(data);
	}
});
```

This checks the transaction for a receipt. It uses the memo as an identification method and you can include more than one receipt by adding a variable limit: memo = memo_id. You can query up to 1MB of transactions.

## API
* [mw init()](#mw-init(recipientlist,-contentid,-type,-memo,-time,-attrID)) 
* [mw checkTransaction()](#mw-checkTransaction(memo_id,-optional*-skip)) 
***
## mw init(recipientlist, contentid, type, memo, time, attrID)
Initializes a payment through the Chrome extension.
Currently you can only have on recipient in the recipientlist.
Make note of the memo used so you can verify the payment later.

Arguments:
* `recipientlist`: the money receiver
* `contentid`: ID of the content
* `type`: article, download, video, etc (what is being monetized)
* `memo`: optional memo field, but to query a transaction you must set one and know it
* `time`: optionable field
* `attrID`: HTML object that handles where the Hedera micropayment object is going to be inserted
***
## mw checkTransaction(memo_id, optional* skip)
Checks transaction for a receipt to verify whether transaction was done.
You can query up to 1MB of transactions.

Arguments:
* `memo_id`: identification method for transaction
.* To include more than 1 receipt, add a variable limit: memo = memo_id


## Browser
You can learn more at [api.hashingsystems.com](https://api.hashingsystems.com/)


## Contributing
TBA


## License
TBA

