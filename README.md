# @saverious/daraja
## About
`@saverious/daraja` module was designed to simplify integration of daraja api endpoints by reducing not only the
syntax complexity of the raw api, but also the number of required arguments

## Limitations
As of the current date, the module supports only the M-Pesa Express API (stk-push)

# Supported endpoints
- M-Pesa Express

# Install
```text
npm i @saverious/daraja
```

# Usage
```javascript
require('dotenv').config();
const Daraja = require('@saverious/daraja');
const { CONSUMER_KEY, CONSUMER_SECRET, PHONE, CALLBACK } = process.env;

async function payViaMpesa() {
    try{
        const daraja = new Daraja({
            consumer_key : CONSUMER_KEY,
            consumer_secret : CONSUMER_SECRET,
            environment : 'development' 
        });
        
        const response = await daraja.stkPush({
            sender_phone : PHONE,
            payBillOrTillNumber : '174379',
            amount : '1',
            callback_url : CALLBACK
        });
        
        console.log('safaricom response : ', response);
    }catch(e){
        console.log('payment error : ', e);
    }
}

payViaMpesa();
```

# API
## new Daraja(options)
* `options` &lt;object&gt; Set of configurable options to set on the class. Can have the following fields:
    * `consumer_key` &lt;string&gt; Your consumer key from the safaricom portal
    * `consumer_secret` &lt;string&gt; Your consumer secret from the safaricom portal
    * `environment` &lt;string&gt; The current project environment. One of either `development` or `production`

All the three key/value pairs in `options` object are required

## daraja.stkPush(options)
* `options` &lt;object&gt; Options containing payment details. Can have the following fields:
    * `sender_phone` &lt;string&gt; The sender's phone number. `required : true`
    * `payBillOrTillNumber` &lt;string&gt; The account number (Paybill number or Till number) to which funds should
       be sent. `required : true`
    * `amount` &lt;string&gt; The amount to be sent. `required : true`
    * `callback_url` &lt;string&gt; The URL to which the response from safaricom should be sent. `required : true`
    *  `passkey` &lt;string&gt; The passkey from safaricom. `required : true` only if `environment === production`,
        otherwise `required : false`
    * `account_reference` &lt;string&gt;  An Identifier of the transaction for the CustomerPayBillOnline transaction type.
       `required : false`
    * `transaction_desc` &lt;string&gt; Any additional information/comment that can be sent along with the request from
       your system. `required : false`

* `Returns` &lt;Promise&gt;