const https = require('node:https');
const { Buffer } = require('node:buffer');

exports.stk_push = async (info = {}) => {
  try {
    const myDate = new Date();

    const timeStamp = myDate.getFullYear() + ("0" + (myDate.getMonth() + 1))
    .slice(-2) + ("0" + myDate.getDate())
    .slice(-2) + ("0" + myDate.getHours())
    .slice(-2) + ("0" + myDate.getMinutes())
    .slice(-2) + ("0" + myDate.getSeconds())
    .slice(-2);

    const password = Buffer.from(info.payBillOrTillNumber + info.passkey + timeStamp, 'utf-8')
    .toString('base64');
    
    const data = JSON.stringify({
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
    });
        
    const options = {
      hostname: info.domain,
      path: '/mpesa/stkpush/v1/processrequest',
      port: 443,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'Authorization': `Bearer ${info.access_token}`,
      }
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, res => {
        let response = '';

        res.on('error', e => reject(e));
        res.on('data', chunk => response += chunk);
        res.on('end', () => {
          const msg = JSON.parse(response);
          
          if(msg.ResponseCode === '0'){
            resolve(msg);
          }

          if(msg.errorMessage){
            reject(msg.errorMessage);
          }

          reject('Error in stk-push response');
        });
      });

      req.on('error', e => reject(e));
      req.write(data);
      req.end();
    });
    
  } catch (e) {
    throw new Error('Error in stk-push request : ', e);
  }
}