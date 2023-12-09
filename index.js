const { accessToken } = require('./utils/auth');
const { parser1, parser2 } = require('./utils/parser');
const { stk_push } = require('./apis/stkPush');

class Daraja {
    constructor(args = {}){
        if(!args.consumer_key || !args.consumer_secret || !args.environment)
            throw new Error('Missing required arguments');

        this.api_key = args.consumer_key;
        this.api_secret = args.consumer_secret;

        this.environment = parser1(args.environment) === 'production'
            ? 'production'
            : 'development';

        this.domain = this.environment === 'production'
            ? 'https://api.safaricom.co.ke'
            : 'https://sandbox.safaricom.co.ke';

        this.accessToken = accessToken.bind(this)(this.api_key, this.api_secret, this.domain);
    }

    async stkPush(args = {}){
        if(!args.sender_phone || !args.payBillOrTillNumber || !args.amount || !args.callback_url)
            throw new Error('Missing required arguments');

        if(this.environment === 'production' && !args.passkey)
            throw new Error('passkey is undefined');

        if(typeof(args.sender_phone) !== 'string')
            throw new Error('phone number must be of type string');
        
        args = parser2(args);

        args.passkey = this.environment === 'production'
            ? args.passkey
            : 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';

        args.account_reference = args.account_reference
            ? args.account_reference
            : args.payBillOrTillNumber

        args.transaction_desc = args.transaction_desc
        ? args.transaction_desc
        : args.account_reference

        args.domain = this.domain;
        args.access_token = await this.accessToken
        return stk_push(args);
    }
}

module.exports = Daraja;