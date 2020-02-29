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

V1.6.0 Adds full Hashgraph Consensus Service support, and pre-approved balances for accounts

V1.5.0 adds file create and retrieve. 

V1.4.1 implements a few key fixes for smart contract developers. 

Latest Extension is available at the [chrome store](https://chrome.google.com/webstore/detail/composer-for-hedera-hashg/hdjnnemgikeoehneddegfcmkljenlean)


## Installation
### What do you need to get started?
Make sure you sign up on portal.hedera.com and download the Hedera Wallet Chrome Extension. Configure it with your own wallet and make sure it’s funded with HBAR.

In order to make payments from your domain you will also have to set up automatic payment values or you will get an “insufficient-amount” error.

### Web Testing:

You can test directly by pulling this repo. The main.js file contains testing functions you can work with.

### Table of Contents

-   [extensionid][1]
    -   [Examples][2]
-   [enable][3]
    -   [Parameters][4]
    -   [Examples][5]
-   [triggerCryptoTransfer][6]
    -   [Parameters][7]
    -   [Examples][8]
-   [triggerSmartContract][9]
    -   [Parameters][10]
    -   [Examples][11]
-   [deploySmartContract][12]
    -   [Parameters][13]
    -   [Examples][14]
-   [triggerFileCreate][15]
    -   [Parameters][16]
    -   [Examples][17]
-   [triggerFileRetrieve][18]
    -   [Parameters][19]
    -   [Examples][20]
-   [triggerTopicCreate][21]
    -   [Parameters][22]
    -   [Examples][23]
-   [triggerTopicUpdate][24]
    -   [Parameters][25]
    -   [Examples][26]
-   [triggerTopicInfo][27]
    -   [Parameters][28]
    -   [Examples][29]
-   [triggerTopicDelete][30]
    -   [Parameters][31]
    -   [Examples][32]
-   [triggerMessageSubmit][33]
    -   [Parameters][34]
    -   [Examples][35]
-   [triggerCheckBalance][36]
    -   [Parameters][37]
    -   [Examples][38]
-   [ethAddressToAccountId][39]
    -   [Parameters][40]
    -   [Examples][41]
-   [accountIdToEthAddress][42]
    -   [Parameters][43]
    -   [Examples][44]

## extensionid

Variable that gives id of extension when the composer extension is up and running

### Examples

```javascript
console.log(extensionid);
```

Returns **[string][45]** "hdjnnemgikeoehneddegfcmkljenlean"

## enable

Triggers a prompt on website for composer extension connect guide

### Parameters

-   `cb` **[function][46]** 

### Examples

```javascript
hash.enable((err,res)=>{
  if(err){
      //error case
      console.log('Error:::',err);
  }else{
      //success case
      console.log('Success:::',res);
  }
});
// triggers a prompt window on your website
```

Returns **[function][46]** callback

## triggerCryptoTransfer

Triggers a Cryptotransfer prompt from composer extension

### Parameters

-   `data`  
-   `cb` **[function][46]** 

### Examples

```javascript
hash.triggerCryptoTransfer(data, (err,res)=>{
  if(err){
      //error case
      console.log('Error:::',err);
  }else{
      //success case
      console.log('Success:::',res);
  }
});
// tiggers cryptotransfer extension prompt
```

Returns **[function][46]** callback

## triggerSmartContract

Triggers a Smart Contract call prompt from composer extension

### Parameters

-   `data` **[object][47]** An object containing
    -   `data.contractid` **[string][45]** contract Id can be of account id type('0.0.1234') or domain name type ('mydomain.hh')
    -   `data.memo` **[string][45]** short message specifying the purpose or message relating to the call
    -   `data.params` **[string][45]** (optional) - string of Array which contains parameters of contract function to be executed
    -   `data.abi-null` **[string][45]** string array of objects which contains details of contract function
    -   `data.extensionid` **[string][45]** (optional) - extension id of composer
    -   `data.gasfee` **[number][48]** cost of transaction fee(tinybars) needed for call
    -   `data.transactionfee` **[number][48]** cost of transaction fee(tinybars) needed for call
    -   `data.amount` **[number][48]** (optional)
-   `cb` **[function][46]** 

### Examples

```javascript
hash.triggerSmartContract(data, (err,res)=>{
  if(err){
      //error case
      console.log('Error:::',err);
  }else{
      //success case
      console.log('Success:::',res);
  }
});
// tiggers smart contract call extension prompt
```

Returns **[function][46]** callback

## deploySmartContract

Triggers a Smart Contract Deploy prompt from composer extension

### Parameters

-   `data` **[object][47]** An object containing
    -   `data.fileid` **[string][45]** (alternative to bytecode) - id of the file if created already
    -   `data.memo` **[string][45]** short message specifying the purpose or message relating to the call
    -   `data.params` **[string][45]** (optional) - string of Array which contains parameters of contract function to be executed
    -   `data.abi-null` **[string][45]** string array of objects which contains details of contract function
    -   `data.bytecode` **[string][45]** (alternative to fileid) - low-level code version of actual file
    -   `data.extensionid` **[string][45]** (optional) - extension id of composer
    -   `data.gasfee` **[number][48]** cost of transaction fee(tinybars) needed for call
    -   `data.transactionfee` **[number][48]** cost of transaction fee(tinybars) needed for call
    -   `data.expirationTime` **[number][48]** (optional) expiry time of contract in milliseconds (optional, default `7890000000`)
    -   `data.amount` **[number][48]** (optional)
-   `cb` **[function][46]** 

### Examples

```javascript
hash.deploySmartContract(data, (err,res)=>{
  if(err){
      //error case
      console.log('Error:::',err);
  }else{
      //success case
      console.log('Success:::',res);
  }
});
// tiggers smart contract deploy extension prompt
```

Returns **[function][46]** callback

## triggerFileCreate

Stores a file and creates a corresponding fileId for the same

### Parameters

-   `data` **[object][47]** An object containing
    -   `data.memo` **[string][45]** short message specifying the purpose or message relating to the call
    -   `data.fileContent` **[string][45]** contents of the file
    -   `data.fileSize-null` **[number][48]** size of file in bytes
    -   `data.extensionid` **[string][45]** (optional) - extension id of composer
    -   `data.transactionfee` **[number][48]** cost of transaction fee(tinybars) needed for call
    -   `data.expirationTime` **[number][48]** (optional) expiry time of contract in milliseconds (optional, default `7890000000`)
-   `cb` **[function][46]** 

### Examples

```javascript
hash.triggerFileCreate(data, (err,res)=>{
  if(err){
      //error case
      console.log('Error:::',err);
  }else{
      //success case
      console.log('Success:::',res);
  }
});
// tiggers create file extension prompt
```

Returns **[function][46]** callback

## triggerFileRetrieve

Retrieves a file(fileContents) corresponding to a fileId

### Parameters

-   `data` **[object][47]** An object containing
    -   `data.memo` **[string][45]** short message specifying the purpose or message relating to the call
    -   `data.fileid` **[string][45]** id of the file, to retrieve the fileContentses
    -   `data.transactionfee` **[number][48]** cost of transaction fee(tinybars) needed for call
-   `cb` **[function][46]** 

### Examples

```javascript
hash.triggerFileRetrieve(data, (err,res)=>{
  if(err){
      //error case
      console.log('Error:::',err);
  }else{
      //success case
      console.log('Success:::',res);
  }
});
// tiggers create file extension prompt
```

Returns **[function][46]** callback

## triggerTopicCreate

Create a topic using hedera consensus service

### Parameters

-   `data` **[object][47]** An object containing
    -   `data.memo` **[string][45]** short message specifying the purpose or message relating to the call
    -   `data.transactionfee` **[number][48]** (optional) - cost of transaction fee(tinybars) needed for call
    -   `data.submitKeyList` **[string][45]** (optional) - list of public keys (stringified array of public keys)
    -   `data.expirationTime` **[number][48]** (optional) - expiry time in milliseconds
    -   `data.autoRenewPeriod` **[number][48]** (optional) - auto renew time in milliseconds
    -   `data.autoRenewAccount` **[string][45]** (optional) - auto renew account in accountId(0.0.1234) like format
-   `cb` **[function][46]** 

### Examples

```javascript
hash.triggerTopicCreate(data, (err,res)=>{
  if(err){
      //error case
      console.log('Error:::',err);
  }else{
      //success case
      console.log('Success:::',res);
  }
});
// tiggers create topic extension prompt
```

Returns **[function][46]** callback

## triggerTopicUpdate

Update a topic using hedera consensus service

### Parameters

-   `data` **[object][47]** An object containing
    -   `data.topicId` **[string][45]** id of the destination topic in accountId like format (0.0.12345)
    -   `data.memo` **[string][45]** (optional) - short message specifying the purpose or message relating to the call
    -   `data.transactionfee` **[number][48]** (optional) - cost of transaction fee(tinybars) needed for call
    -   `data.submitKeyList` **[string][45]** (optional) - list of public keys (stringified array of public keys)
    -   `data.expirationTime` **[number][48]** (optional) - expiry time in milliseconds
    -   `data.autoRenewPeriod` **[number][48]** (optional) - auto renew time in milliseconds
    -   `data.autoRenewAccount` **[string][45]** (optional) - auto renew account in accountId(0.0.1234) like format
-   `cb` **[function][46]** 

### Examples

```javascript
hash.triggerTopicUpdate(data, (err,res)=>{
  if(err){
      //error case
      console.log('Error:::',err);
  }else{
      //success case
      console.log('Success:::',res);
  }
});
// tiggers update topic extension prompt
```

Returns **[function][46]** callback

## triggerTopicInfo

Get info about a topic using hedera consensus service

### Parameters

-   `data` **[object][47]** An object containing
    -   `data.topicId` **[string][45]** id of the destination topic in accountId like format (0.0.12345)
    -   `data.transactionfee` **[number][48]** (optional) - cost of transaction fee(tinybars) needed for call
    -   `data.memo` **[string][45]** (optional) - short message specifying the purpose or message relating to the call
-   `cb` **[function][46]** 

### Examples

```javascript
hash.triggerTopicInfo(data, (err,res)=>{
  if(err){
      //error case
      console.log('Error:::',err);
  }else{
      //success case
      console.log('Success:::',res);
  }
});
// tiggers info topic extension prompt
```

Returns **[function][46]** callback

## triggerTopicDelete

Delete a topic using hedera consensus service

### Parameters

-   `data` **[object][47]** An object containing
    -   `data.topicId` **[string][45]** id of the destination topic in accountId like format (0.0.12345)
    -   `data.transactionfee` **[number][48]** (optional) - cost of transaction fee(tinybars) needed for call
    -   `data.memo` **[string][45]** (optional) - short message specifying the purpose or message relating to the call
-   `cb` **[function][46]** 

### Examples

```javascript
hash.triggerTopicDelete(data, (err,res)=>{
  if(err){
      //error case
      console.log('Error:::',err);
  }else{
      //success case
      console.log('Success:::',res);
  }
});
// tiggers info topic extension prompt
```

Returns **[function][46]** callback

## triggerMessageSubmit

Submit a message on a topic that is already created

### Parameters

-   `data` **[object][47]** An object containing
    -   `data.memo` **[string][45]** short message specifying the purpose or message relating to the call
    -   `data.topicId` **[string][45]** id of the destination topic in accountId like format (0.0.12345)
    -   `data.message` **[string][45]** message to be submitted
    -   `data.transactionfee` **[number][48]** (optional) - cost of transaction fee(tinybars) needed for call
-   `cb` **[function][46]** 

### Examples

```javascript
hash.triggerMessageSubmit(data, (err,res)=>{
  if(err){
      //error case
      console.log('Error:::',err);
  }else{
      //success case
      console.log('Success:::',res);
  }
});
// tiggers message submit extension prompt
```

Returns **[function][46]** callback

## triggerCheckBalance

Checks balance of current account selected in composer extension or checks the balance of the given account id

### Parameters

-   `accountID` **[string][45]** account id in accountID format("0.0.12345")
-   `cb` **[function][46]** 

### Examples

```javascript
hash.triggerCheckBalance("0.0.12345", (err,res)=>{
  if(err){
      //error case
      console.log('Error:::',err);
  }else{
      //success case
      // {
      //   res:{
      //           balance:"2363161",
      //           currentAccount:"0.0.12345",
      //           currentNetwork:"mainnet"
      //       }
      // }
      console.log('Success:::',res);
  }
});
```

Returns **[function][46]** callback

## ethAddressToAccountId

Converts hexadecimal eth address to account id type('0.0.1234')

### Parameters

-   `ethAddress` **[string][45]** an hexadecimal value

### Examples

```javascript
hash.ethAddressToAccountId("0000000000000000000000000000000000003039);
//returns "0.0.12345"
```

## accountIdToEthAddress

Converts account id type('0.0.1234') to hexadecimal eth address

### Parameters

-   `accountId`  
-   `ethAddress` **[string][45]** an hexadecimal value

### Examples

```javascript
hash.accountIdToEthAddress("0.0.12345");
```

Returns **[string][45]** "0000000000000000000000000000000000003039"

[1]: #extensionid

[2]: #examples

[3]: #enable

[4]: #parameters

[5]: #examples-1

[6]: #triggercryptotransfer

[7]: #parameters-1

[8]: #examples-2

[9]: #triggersmartcontract

[10]: #parameters-2

[11]: #examples-3

[12]: #deploysmartcontract

[13]: #parameters-3

[14]: #examples-4

[15]: #triggerfilecreate

[16]: #parameters-4

[17]: #examples-5

[18]: #triggerfileretrieve

[19]: #parameters-5

[20]: #examples-6

[21]: #triggertopiccreate

[22]: #parameters-6

[23]: #examples-7

[24]: #triggertopicupdate

[25]: #parameters-7

[26]: #examples-8

[27]: #triggertopicinfo

[28]: #parameters-8

[29]: #examples-9

[30]: #triggertopicdelete

[31]: #parameters-9

[32]: #examples-10

[33]: #triggermessagesubmit

[34]: #parameters-10

[35]: #examples-11

[36]: #triggercheckbalance

[37]: #parameters-11

[38]: #examples-12

[39]: #ethaddresstoaccountid

[40]: #parameters-12

[41]: #examples-13

[42]: #accountidtoethaddress

[43]: #parameters-13

[44]: #examples-14

[45]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[46]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[47]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[48]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number



## Browser
You can learn more at [api.hashingsystems.com](https://api.hashingsystems.com/)


## Contributing
You're welcome to contribute code on here. Fork and create a detailed pull request. 

For more info you can chat with us at https://hashingsystems.com

## License
See LICENSE for details. Hashing Systems © 2019
