const axios = require('axios');
const { Buffer } = require('node:buffer');

exports.stk_push = async (info = {}) => {
    try{
        const myDate = new Date();
        const timeStamp = myDate.getFullYear() + ("0" + (myDate.getMonth() + 1)).slice(-2) + ("0" + myDate.getDate()).slice(-2) + ("0" + myDate.getHours()).slice(-2) + ("0" + myDate.getMinutes()).slice(-2) + ("0" + myDate.getSeconds()).slice(-2);
        const password = Buffer.from(info.payBillOrTillNumber + info.passkey + timeStamp, 'utf-8').toString('base64');
        
        const response = await axios({
            url:`${info.domain}/mpesa/stkpush/v1/processrequest`,
            method:'post',
            headers:{
                'Authorization' : `Bearer ${info.access_token}`
            },
            data:{
              'BusinessShortCode': `${info.payBillOrTillNumber}`,
              'Password': `${password}`,
              'Timestamp':`${timeStamp}`,
              'TransactionType': 'CustomerPayBillOnline',
              'Amount': `${info.amount}`,
              'PartyA':`${info.sender_phone}`,
              'PartyB':`${info.payBillOrTillNumber}`,
              'PhoneNumber':`${info.sender_phone}`,
              'CallBackURL': `${info.callback_url}`,
              'AccountReference': `${info.account_reference}`,
              'TransactionDesc': `${info.transaction_desc}`
            }
        });
        
        return response.data;
    }catch(error){
      throw new Error('error while forwarding stk-push request : ', error);
    }
}