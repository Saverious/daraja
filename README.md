# @saverious/daraja
A nodejs module to simplify integration of daraja api endpoints

# supported endpoints
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