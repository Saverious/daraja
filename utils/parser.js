exports.parser1 = (environment) => {
    return environment.trim();
}

exports.parser2 = (args = {}) => {
    for(let key in args){
        if(args.hasOwnProperty(key)){
            args[key] = args[key].trim();
        }
    }

    if(args.sender_phone.startsWith('07') || args.sender_phone.startsWith('01')){
        args.sender_phone = '254' + args.sender_phone.slice(1);
    }else if(args.sender_phone.startsWith('254')){
        args.sender_phone = args.sender_phone;
    }else{
        throw new Error('Invalid phone number');
    }

    return args;
}