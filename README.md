# Hash.js
Hash.js is a micropayment service javascript embeddable library. You can trigger micropayment transactions using the chrome extension through hosting the widget yourself by compiling it locally or use our cdn’ed widget. 
* [Upgrade Notes](#important-notes-for-existing-users)
* [Installation](#installation)
* [API](#api)
* [Browser](#browser)
* [Contributing](#contributing)
* [License](#license)

Hash.js is an Open Source Project, see the Contributing section to find out what this means.


## Important Notes for Existing Users
Look here for any future upgrade notes (version changes, fixes, etc).


## Installation
### What do you need to get started?
Make sure you sign up on portal.hedera.com and download the Hedera Wallet Chrome Extension. Configure it with your own wallet and make sure it’s funded with HBAR.

In order to make payments from your domain you will also have to set up automatic payment values or you will get an “insufficient-amount” error.

### Web Testing:
Copy and paste the script below in html head tag.

```
<script src="https://api.hashingsystems.com/js/widget.js"></script>
```

You can use our hosted CDN or compile it yourself and use it.

### How To Compile It Yourself:

`npm install` (tested on 8.2.1 runtime) then run this script: 
`./node_modules/.bin/webpack --config webpack.config.js --env.prod`
This will create a distribution which will be usable through the /demo/index.html which has been only tested the demo/index through the python http server. 

Once the code above is implemented, you can go ahead and make transactions, given the user has all the necessary components to interact with our micropayment server. 

### Make a payment:
```
window.hash(['makepayment',{
                               submissionnode: "0.0.11", 
                               recipientlist: '[{ "to": "0.0.99", "tinybars": "4666667" }]', 
                               contentid: '79', 
                               type: 'article', 
                               memo: '1275,79', 
                               attrID: 'feature-4', }],function(err, res){
                                   // your code goes here
                               });
```

This makepaymentializes a payment through the Chrome extension. Currently there can only be one recipient in recipientlist. Take note of the memo used so you can verify the payment later.

### Check a Transaction:
```
window.hash([‘checkTransaction’, { memo_id: ‘1275,70’ }], function(err, data) {
	if (err) {
		console.log(err);
	} else {
		console.log(data);
	}
});
```

This checks the transaction for a receipt. It uses the memo as an identification method and you can include more than one receipt by adding a variable limit: memo = memo_id. You can query up to 1MB of transactions.

## API
* mw init()
* mw makepayment()
* mw checkTransaction() 
* mw getmodal()
***
## mw init(recipientlist, contentid, type, memo, time, attrID, *callback* function)
Initializes a payment through the Chrome extension.
Currently you can only have on recipient in the recipientlist.
Make note of the memo used so you can verify the payment later.
Checks all pre-requisites for performing the transaction
Provides the response for transaction failure or success

Arguments:
* `recipientlist`: the money receiver
* `contentid`: ID of the content
* `type`: article, download, video, etc (what is being monetized)
* `memo`: optional memo field, but to query a transaction you must set one and know it
* `time`: optionable field
* `attrID`: HTML object that handles where the Hedera micropayment object is going to be inserted
***

Response:
* `accountPaired` bool: If account is paired
*  `ismobile` bool: If the device is mobile
* `extensionInstalled` bool: If the extension is intalled or not
* `accessToAccunt` bool: Ifaccount is set successfully for performing the transaction
* `accountId` String: Payer account ID
* `SubmissionNode` String: Hedera Submission Node
* `error` (error message) String: The error existence flag, used to check if error
* `txn_success` bool: Transaction success flag
* `time` timestamp: Timestamp at which transaction was requested
* `message` (response message) String: Corresponding message to error or success

```
window.hash(['init',{args}], function(err, res){
  if(err){
     console.log(err);
  }else{
     // you can perform the action in accordance to your need
     // you can see our demo ** site for more information
  }
});
```

## mw assistTransaction(recipientlist, contentid, type, memo, time, attrID , *callback* function)
Similar to mw init, but is used for transaction notification 
It provides the stepwise notification from transaction state, processing to success or failed
Demo is provided on https://mps.hashingsystems.com

##*usage*
``
  mw('assisttransaction',args, function(){
     if(err){
          console.log(err);
          // do your thing here
       }else{
          // you can perform the action in accordance to your need
          // you can see our demo ** site for more information
       }
  });
`` 

## mw makepayment(recipientlist, contentid, type, memo, time, attrID)
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
## mw checkTransaction(memo, *optional* receiver_id, *optional* limit, *optional* timeout)
Checks transaction for a receipt to verify whether transaction was done. This only works for transactions sent via the Hashing Systems micropayment server.
Memo: Query by matching the memo used in the generation of the transaction.
Limit: Integer. It allows you to get more than one transaction with memo
Receiver_id: Account Id where the money was sent
Timeout: this is how long the function should wait to be called (in case the library should do that for you)
You can query up to 1MB of transactions.

Arguments:
* `memo_id`: identification method for transaction
 * To include more than 1 receipt, add a variable "limit" (ex: limit: 10) 
 memo = memo_id
 
 You can view an example return here:
 [mps.hashingsystems.com/memo/1561661493370?limit=5](https://mps.hashingsystems.com/memo/1561661493370?limit=5)

## mw getModal(*callback* function)
Initializes a popup modal for asking user if they have completed all the necessary steps 
for performing transaction.
Steps includes: 
* Is extension added to chrome
* Is account created
* Is Account paired
* Is Hbar loaded in

```
window.hash(['getmodal'], function(err, res){
    if(err){
       console.log(err);
    }else{
       console.log(res);
    }
});
```
## Browser
You can learn more at [api.hashingsystems.com](https://api.hashingsystems.com/)


## Contributing
TBA


## License
See LICENSE for details. Hashing Systems © 2019

