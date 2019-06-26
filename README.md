# mps.js

This is the micropayment service javascript embeddable. Available through a cdn or you can download for your own project here.

### This is a simple javascript applet to aid in the interaction with the Hedera Chrome Extension

## Local Testing
npm install (tested on 8.2.1 runtime)
then run this script:
`./node_modules/.bin/webpack --config webpack.config.js --env.prod`

this will create a dist which will be usable through the /demo/index.html
I've only tested the demo/index through python http server. we do want to have it built into the node script for ease-of-use.

## Web Testing

Copy and paste this to your website 

`
<script>
(function(_h, a, s, h, g, ra, ph) {
    _h['MPS-JS'] = h;
    _h[h] = _h[h] || function() {
        (_h[h].q = _h[h].q || []).push(arguments)
    };
    ra = a.createElement(s),
        ph = a.getElementsByTagName(s)[0];
    ra.id = h;
    ra.src = g;
    ra.async = 1;
    console.log(ra);
    console.log(ph);
    ph.parentNode.insertBefore(ra, ph);
}(window, document, 'script', 'mw', 'https://api.hashingsystems.com/js/widget.js'));

mw('init', {
    submissionnode: "0.0.11",
    recipientlist: '[{ "to": "0.0.99", "tinybars": "4666667" }]',
    contentid: '79',
    type: 'article',
    memo: '1275,79',
    attrID: 'feature-4',
});
</script>
`

## Code Status
  -Runs when website loads and do the chrome extension checking and charge the account (if necessary).
  -It injects a hedera-micropayment and triggers payment through the extension
  -Verification of payment can be done using the mps endpoint through a GET request
      -`https://mps.hashingsystems.com/memo/{memo_id}`
      -You can also verify transactions through the function checker
        -checkTransaction(memo_id, success_route)
      
  -You can test your extension's setup by visiting https://mps.hashingsystems.com/

## You can learn more at [api.hashingsystems.com](https://api.hashingsystems.com)

