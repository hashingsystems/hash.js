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
V1.0 is based on new Composer for Hedera Hasphgraph. Injected automatically into window.hash. Extension is available at the [chrome store](https://chrome.google.com/webstore/detail/composer-for-hedera-hashg/hdjnnemgikeoehneddegfcmkljenlean)


## Installation
### What do you need to get started?
Make sure you sign up on portal.hedera.com and download the Hedera Wallet Chrome Extension. Configure it with your own wallet and make sure it’s funded with HBAR.

In order to make payments from your domain you will also have to set up automatic payment values or you will get an “insufficient-amount” error.

### Web Testing:

You can test directly by pulling this repo. The main.js file contains testing functions you can work with.


<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [extensionid][1]
    -   [Examples][2]
-   [enable][5]
    -   [Parameters][6]
    -   [Examples][7]
-   [triggerCryptoTransfer][8]
    -   [Parameters][9]
    -   [Examples][10]
-   [triggerSmartContract][11]
    -   [Parameters][12]
    -   [Examples][13]
-   [deploySmartContract][14]
    -   [Parameters][15]
    -   [Examples][16]
-   [triggerFileCreate][17]
    -   [Parameters][18]
    -   [Examples][19]
-   [triggerFileRetrieve][20]
    -   [Parameters][21]
    -   [Examples][22]
-   [triggerCheckBalance][23]
    -   [Parameters][24]
    -   [Examples][25]
-   [ethAddressToAccountId][26]
    -   [Parameters][27]
    -   [Examples][28]
-   [accountIdToEthAddress][29]
    -   [Parameters][30]
    -   [Examples][31]

## enable

Triggers a prompt on website for composer extension connect guide

### Parameters

-   `cb` **[function][27]** 

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

Returns **[function][27]** callback

## triggerCryptoTransfer

Triggers a Cryptotransfer prompt from composer extension

### Parameters

-   `data` **[object][28]** An object containing
    -   `data.contractid` **[string][26]** contract Id can be of account id type('0.0.1234') or domain name type ('mydomain.hh')
    -   `data.memo` **[string][26]** short message specifying the purpose or message relating to the call
    -   `data.extensionid` **[string][26]** (optional) - extension id of composer
    -   `data.recipientlist` **[string][26]** to addresses of recipients as string of object
    -   `data.contentid` **[string][26]** (optional)
    -   `data.type` **[string][26]** (optional)
    -   `data.redirect` **[string][26]** (optional)
-   `cb` **[function][27]** 

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

Returns **[function][27]** callback


## triggerSmartContract

Triggers a Smart Contract call prompt from composer extension

### Parameters

-   `data` **[object][28]** An object containing
    -   `data.contractid` **[string][26]** contract Id can be of account id type('0.0.1234') or domain name type ('mydomain.hh')
    -   `data.memo` **[string][26]** short message specifying the purpose or message relating to the call
    -   `data.params` **[string][26]** (optional) - string of Array which contains parameters of contract function to be executed
    -   `data.abi` **[string][26]** determines the function call and provides the inputs and outputs for the specific function you’re trying to call
    -   `data.extensionid` **[string][26]** (optional) - extension id of composer
    -   `data.gasfee` **[number][29]** cost of transaction fee(tinybars) needed for call
    -   `data.transactionfee` **[number][29]** cost of transaction fee(tinybars) needed for call
    -   `data.amount` **[number][29]** (optional)
-   `cb` **[function][27]** 

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

Returns **[function][27]** callback

## deploySmartContract

Triggers a Smart Contract Deploy prompt from composer extension

### Parameters

-   `data` **[object][28]** An object containing
    -   `data.fileid` **[string][26]** (alternative to bytecode) - id of the file if created already
    -   `data.memo` **[string][26]** short message specifying the purpose or message relating to the call
    -   `data.params` **[string][26]** (optional) - string of Array which contains parameters of contract function to be executed
    -   `data.abi` **[string][26]** determines the function call and provides the inputs and outputs for the specific function you’re trying to call
    -   `data.bytecode` **[string][26]** (alternative to fileid) - low-level code version of actual file
    -   `data.extensionid` **[string][26]** (optional) - extension id of composer
    -   `data.gasfee` **[number][29]** cost of transaction fee(tinybars) needed for call
    -   `data.transactionfee` **[number][29]** cost of transaction fee(tinybars) needed for call
    -   `data.expirationTime` **[number][29]** (optional) expiry time of contract in milliseconds (optional, default `7890000000`)
    -   `data.amount` **[number][29]** (optional)
-   `cb` **[function][27]** 

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

Returns **[function][33]** callback

## triggerFileCreate

Stores a file and creates a corresponding fileId for the same

### Parameters

-   `data` **[object][34]** An object containing
    -   `data.memo` **[string][32]** short message specifying the purpose or message relating to the call
    -   `data.fileContent` **[string][32]** contents of the file
    -   `data.fileSize-null` **[number][35]** size of file in bytes
    -   `data.extensionid` **[string][32]** (optional) - extension id of composer
    -   `data.transactionfee` **[number][35]** cost of transaction fee(tinybars) needed for call
    -   `data.expirationTime` **[number][35]** (optional) expiry time of contract in milliseconds (optional, default `7890000000`)
-   `cb` **[function][33]** 

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

Returns **[function][33]** callback

## triggerFileRetrieve

Retrieves a file(fileContents) corresponding to a fileId

### Parameters

-   `data` **[object][34]** An object containing
    -   `data.memo` **[string][32]** short message specifying the purpose or message relating to the call
    -   `data.fileid` **[string][32]** id of the file, to retrieve the fileContentses
    -   `data.transactionfee` **[number][35]** cost of transaction fee(tinybars) needed for call
-   `cb` **[function][33]** 

### Examples

```javascript
hash.triggerFileRetrieve(data, (err,res)=>{
  if(err){
      //error case
      console.log('Error:::',err);
  }else{
      //success case
      //{
      //   res:{
      //          contents:{"0":84,"1":104,"2":105,"3":115,"4":32,"5":105,"6":115,"7":32,"8":97,"9":32,"10":116,"11":101,"12":115,"13":116,"14":32,"15":102,"16":105,"17":108,"18":101,"19":44,"20":32,"21":119,"22":104,"23":105,"24":99,"25":104,"26":32,"27":99,"28":111,"29":110,"30":116,"31":97,"32":105,"33":110,"34":115,"35":32,"36":115,"37":97,"38":109,"39":112,"40":108,"41":101,"42":32,"43":100,"44":97,"45":116,"46":97},
      //          contentAsString:"This is a test file, which contains sample data",
      //          walletAccount":"0.0.17210"
      //      }
      //}
      console.log('Success:::',res);
  }
});
// tiggers create file extension prompt
```

Returns **[function][33]** callback

## triggerCheckBalance

Checks balance of current account selected in composer extension or checks the balance of the given account id

### Parameters

-   `accountID` **[string][32]** account id in accountID format("0.0.12345")
-   `cb` **[function][33]** 

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

Returns **[function][33]** callback

## ethAddressToAccountId

Converts hexadecimal eth address to account id type('0.0.1234')

### Parameters

-   `ethAddress` **[string][32]** an hexadecimal value

### Examples

```javascript
hash.ethAddressToAccountId("0000000000000000000000000000000000003039);
//returns "0.0.12345"
```

## accountIdToEthAddress

Converts account id type('0.0.1234') to hexadecimal eth address

### Parameters

-   `accountId`  
-   `ethAddress` **[string][32]** an hexadecimal value

### Examples

```javascript
hash.accountIdToEthAddress("0.0.12345");
```

Returns **[string][32]** "0000000000000000000000000000000000003039"


[1]: #extensionid

[2]: #examples

[3]: #extensionid-1

[4]: #examples-1

[5]: #enable

[6]: #parameters

[7]: #examples-2

[8]: #triggercryptotransfer

[9]: #parameters-1

[10]: #examples-3

[11]: #triggersmartcontract

[12]: #parameters-2

[13]: #examples-4

[14]: #deploysmartcontract

[15]: #parameters-3

[16]: #examples-5

[17]: #triggerfilecreate

[18]: #parameters-4

[19]: #examples-6

[20]: #triggerfileretrieve

[21]: #parameters-5

[22]: #examples-7

[23]: #triggercheckbalance

[24]: #parameters-6

[25]: #examples-8

[26]: #ethaddresstoaccountid

[27]: #parameters-7

[28]: #examples-9

[29]: #accountidtoethaddress

[30]: #parameters-8

[31]: #examples-10

[32]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[33]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[34]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[35]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number



## Browser
You can learn more at [api.hashingsystems.com](https://api.hashingsystems.com/)


## Contributing
You're welcome to contribute code on here. Fork and create a detailed pull request. 

For more info you can chat with us at https://hashingsystems.com

## License
See LICENSE for details. Hashing Systems © 2019

 
