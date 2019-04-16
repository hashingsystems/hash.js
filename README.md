# mps.js
This is the micropayment service javascript embeddable. Available through a cdn or you can download for your own project here.


### This is a simple javascript applet

## To run you just
npm install (tested on 8.2.1 runtime)
then run this script:
`./node_modules/.bin/webpack --config webpack.config.js --env.prod`

this will create a dist which will be usable through the /demo/index.html
I've only tested the demo/index through python http server. we do want to have it built into the node script for ease-of-use.


The code currently:
  This would run once when the website loads and do the chrome extension checking and charge the account (if necessary).

It doesn't inject any hedera-micropayment. It simply sends a runtime message to the chrome extension.

![hedera-micropayment object example](https://cdn-images-1.medium.com/max/2600/1*8VBy6SHrMPli_3ms5AAuRw.png)

Future Plans:
We will be releasing further iterations of this to include more complex structures. 
We need to brainstorm them a little.
Wordpress plugins or React/Angular/Vuejs libraries

