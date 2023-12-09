const Daraja = require('daraja');

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