# mps.js

This is the micropayment service javascript embeddable. Available through a cdn or you can download for your own project here.

### This is a simple javascript applet to aid in the interaction with the Hedera Chrome Extension

## To run you just
npm install (tested on 8.2.1 runtime)
then run this script:
`./node_modules/.bin/webpack --config webpack.config.js --env.prod`

this will create a dist which will be usable through the /demo/index.html
I've only tested the demo/index through python http server. we do want to have it built into the node script for ease-of-use.


The code currently:
  -This would run once when the website loads and do the chrome extension checking and charge the account (if necessary).
  -It injects a hedera-micropayment and triggers payment through the extension
  -Verification of payment can be done using the mps endpoint through a GET request
      -`https://mps.hashingsystems.com/check/{receiver_acount_id}/{memo}`
      
  -You can test your extension's setup by visiting https://mps.hashingsystems.com/

## You can learn more at [api.hashingsystems.com](https://api.hashingsystems.com)

