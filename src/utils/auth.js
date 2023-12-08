const axios = require('axios');

exports.accessToken = async (api_key, api_secret, domain) => {
    try{
      const response = await axios({
        url:`${domain}/oauth/v1/generate?grant_type=client_credentials`,
        method: 'get',
        auth:{
          username:api_key,
          password:api_secret
        }
      });
    
      return response.data.access_token;
    }catch(error){
      throw new Error('error while getting access token : ', error);
    } 
}