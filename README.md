# @saverious/daraja
A nodejs module to simplify integration of daraja api endpoints

# Supported endpoints
- M-Pesa Express

# Install
`npm i @saverious/daraja`

# Usage
```javascript
const Daraja = require('@saverious/daraja');

async function payViaMpesa() {
    try{
        const daraja = new Daraja({
            consumer_key : 'your consumer key',
            consumer_secret : 'your consumer secret',
            environment : 'development' 
        });
        
        const response = await daraja.stkPush({
            sender_phone : '0767456201',
            payBillOrTillNumber : '174379',
            amount : '1',
            callback_url : 'https://ac10-102-135-169-116.ngrok-free.app'
        });
        
        console.log('safaricom response : ', response);
    }catch(error){
        console.log('payment error : ', error);
    }
}

payViaMpesa();

# API
## new Daraja(options)
* `options` <object> Set of configurable options to set on the class. Can have the following fields:
    * `consumer_key` <string> Your consumer key from the safaricom portal
    * `consumer_secret` <string> Your consumer secret from the safaricom portal
    * `environment` <string> The current project environment. One of either `development` or `production`

All the three key/value pairs in `options` are required
### example

## daraja.stkPush(options)
* `options` <object> Options containing payment details. Can have the following fields:
    * `sender_phone` <string> The sender's phone number. `required : true`
    * `payBillOrTillNumber` <string> The account number (Paybill number or Till number) to which funds will  
       be sent. `required : true`
    * `amount` <string> The amount to be sent. `required : true`
    * `callback_url` <string> The URL to which the response from safaricom should be sent. `required : true`
    *  `passkey` <string> The passkey from safaricom. `required : true` only if `environment === production`,  
        otherwise `required : false`
    * `account_reference` <string>  An Identifier of the transaction for the CustomerPayBillOnline transaction type.  
       `required : false`
    * `transaction_desc` <string> Any additional information/comment that can be sent along with the request from  
       your system. `required : false`