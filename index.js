const { accessToken } = require('./utils/auth');
const { parser1, parser2 } = require('./utils/parser');
const { stk_push } = require('./apis/stkPush');

class Daraja {
    constructor(args = {}){
        const missingArgs = [];
        if (!args.consumer_key) missingArgs.push('consumer_key');
        if (!args.consumer_secret) missingArgs.push('consumer_secret');
        if (!args.environment) missingArgs.push('environment');

        if (missingArgs.length) {
            throw new Error(`Missing required arguments: ${missingArgs.join(', ')}`);
        }

        this.api_key = args.consumer_key;
        this.api_secret = args.consumer_secret;

        this.environment = parser1(args.environment) === 'production'
            ? 'production'
            : 'development';

        this.domain = this.environment === 'production'
            ? 'api.safaricom.co.ke'
            : 'sandbox.safaricom.co.ke';

        this.accessToken = accessToken.bind(this)(this.api_key, this.api_secret, this.domain);
    }

    async stkPush(args = {}) {
        const stkPushArgs = []

        if (!args.sender_phone) stkPushArgs.push('sender_phone');
        if (!args.payBillOrTillNumber) stkPushArgs.push('payBillOrTillNumber');
        if (!args.amount) stkPushArgs.push('amount');
        if (!args.callback_url) stkPushArgs.push('callback_url');
        
        if (stkPushArgs.length) {
            throw new Error(`Missing required arguments in stkPush: ${stkPushArgs.join(', ')}. `);
        }

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