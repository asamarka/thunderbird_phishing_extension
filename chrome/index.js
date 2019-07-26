// index.js 
var lodash = require('lodash');
var DKIMSignature = require( 'dkim-signature' )

var output = lodash.without([1, 2, 3], 1);
console.log(output);