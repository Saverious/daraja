require('dotenv').config();

const Daraja = require('../index');
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
        console.log(e);
    }
}

payViaMpesa();